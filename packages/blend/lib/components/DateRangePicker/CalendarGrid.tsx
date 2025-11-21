import {
    forwardRef,
    useLayoutEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
    useEffect,
} from 'react'
import styled, { CSSObject } from 'styled-components'
import { motion } from 'framer-motion'
import { DateRange, CustomRangeConfig } from './types'
import { CalendarTokenType } from './dateRangePicker.tokens'
import Block from '../Primitives/Block/Block'
import Skeleton from '../Skeleton/Skeleton'
import {
    handleCustomRangeCalendarDateClick,
    getDayNames,
    getMonthHeight,
    findCurrentMonthIndex,
    createCalendarMonthData,
    calculateDayCellProps,
    shouldHideDateFromCalendar,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

type CalendarGridProps = {
    selectedRange: DateRange
    onDateSelect: (range: DateRange) => void
    today: Date
    allowSingleDateSelection?: boolean
    disableFutureDates?: boolean
    disablePastDates?: boolean
    hideFutureDates?: boolean
    hidePastDates?: boolean
    customDisableDates?: (date: Date) => boolean
    customRangeConfig?: CustomRangeConfig
    showDateTimePicker?: boolean
    resetScrollPosition?: number // Used to trigger scroll reset when popover reopens
}

const CONTAINER_HEIGHT = 340

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.2,
            ease: [0.4, 0, 0.2, 1] as const, 
        },
    },
}

const monthVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            delay: custom * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94] as const, 
        },
    }),
}

const dayCellVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (custom: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            delay: custom * 0.008,
            ease: [0.4, 0, 0.2, 1] as const,
        },
    }),
}

// Styled Components with Motion
const MotionBlock = motion(Block)

const StyledDayCell = styled(MotionBlock)<{
    $cellStyles: CSSObject
    $textColor: string
    $isDisabled: boolean
    $isSelected: boolean
    $calendarToken: CalendarTokenType
}>`
    ${(props) => props.$cellStyles}
    color: ${(props) => props.$textColor};
    cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
    transition: transform 0.15s ease-in-out;

    ${(props) =>
        !props.$isDisabled &&
        `
    &:hover {
      outline: ${props.$calendarToken.calendar.calendarGrid.day.cell.border.hover};
      outline-offset: -1px;
      border-radius: ${props.$calendarToken.calendar.calendarGrid.day.cell.borderRadius};
      z-index: 10;
      position: relative;
      transform: scale(1.05);
    }
  `}

    ${(props) =>
        !props.$isDisabled &&
        `
    &:active {
      transform: scale(0.95);
    }
  `}
`

const CalendarSkeleton = ({
    calendarToken,
}: {
    calendarToken: CalendarTokenType
}) => {
    return (
        <Block
            style={{
                maxHeight: CONTAINER_HEIGHT,
                padding: FOUNDATION_THEME.unit[16],
            }}
        >
            <Skeleton
                width="100%"
                height="24px"
                variant="wave"
                shape="rounded"
                style={{
                    marginBottom: FOUNDATION_THEME.unit[16],
                    marginLeft:
                        calendarToken.calendar.calendarGrid.week.padding.x,
                    marginRight:
                        calendarToken.calendar.calendarGrid.week.padding.x,
                }}
            />

            <Block
                style={{
                    padding: `0 ${calendarToken.calendar.calendarGrid.week.padding.x}`,
                }}
            >
                <Skeleton
                    width="140px"
                    height="24px"
                    variant="wave"
                    shape="rounded"
                    style={{ marginBottom: FOUNDATION_THEME.unit[12] }}
                />

                {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <Skeleton
                        key={rowIndex}
                        width="100%"
                        height="36px"
                        variant="wave"
                        shape="rounded"
                        style={{
                            marginBottom:
                                calendarToken.calendar.calendarGrid.week.gap,
                        }}
                    />
                ))}
            </Block>
        </Block>
    )
}

function generateMonthsList(
    today: Date,
    hideFutureDates: boolean = false,
    hidePastDates: boolean = false
): { month: number; year: number }[] {
    const months = []
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const startYear = 2012
    const endYear = currentYear + 5

    for (let year = startYear; year <= endYear; year++) {
        for (let month = 0; month <= 11; month++) {
            if (hideFutureDates) {
                if (
                    year > currentYear ||
                    (year === currentYear && month > currentMonth)
                ) {
                    continue
                }
            }

            if (hidePastDates) {
                if (
                    year < currentYear ||
                    (year === currentYear && month < currentMonth)
                ) {
                    continue
                }
            }

            months.push({ month, year })
        }
    }

    return months
}

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(
    (
        {
            selectedRange,
            onDateSelect,
            today,
            allowSingleDateSelection = false,
            disableFutureDates = false,
            disablePastDates = false,
            hideFutureDates = false,
            hidePastDates = false,
            customDisableDates,
            customRangeConfig,
            showDateTimePicker = true,
            resetScrollPosition,
        },
        ref
    ) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const calendarToken = useResponsiveTokens<CalendarTokenType>('CALENDAR')

        // Internal loading state for initial render
        const [isInternalLoading, setIsInternalLoading] = useState(true)

        useEffect(() => {
            // Brief loading delay for skeleton to show
            const timer = setTimeout(() => {
                setIsInternalLoading(false)
            }, 300)
            return () => clearTimeout(timer)
        }, [])

        const months = useMemo(
            () => generateMonthsList(today, hideFutureDates, hidePastDates),
            [today, hideFutureDates, hidePastDates]
        )

        const dayNames = useMemo(() => getDayNames(), [])

        const monthData = useMemo(() => {
            let cumulativeHeight = 0
            return months.map(({ year, month }, index) => {
                const height = getMonthHeight(year, month)
                const topPosition = cumulativeHeight
                cumulativeHeight += height

                return {
                    year,
                    month,
                    index,
                    height,
                    topPosition,
                }
            })
        }, [months])

        const initialScrollTop = useMemo(() => {
            if (monthData.length === 0) return 0

            const targetDate = selectedRange?.startDate || today
            const currentMonthIndex = findCurrentMonthIndex(months, targetDate)

            if (currentMonthIndex !== -1) {
                const monthInfo = monthData[currentMonthIndex]
                if (monthInfo) {
                    return Math.max(
                        0,
                        monthInfo.topPosition -
                            CONTAINER_HEIGHT / 2 +
                            monthInfo.height / 2
                    )
                }
            }
            return 0
        }, [monthData, months, selectedRange, today, resetScrollPosition])

        const [scrollTop, setScrollTop] = useState(initialScrollTop)
        const [isScrollPositioned, setIsScrollPositioned] = useState(false)

        const totalHeight =
            monthData.length > 0
                ? monthData[monthData.length - 1].topPosition +
                  monthData[monthData.length - 1].height
                : 0

        const visibleMonths = useMemo(() => {
            const buffer = 300
            const startY = Math.max(0, scrollTop - buffer)
            const endY = scrollTop + CONTAINER_HEIGHT + buffer

            return monthData.filter(({ topPosition, height }) => {
                const monthBottom = topPosition + height
                return monthBottom >= startY && topPosition <= endY
            })
        }, [monthData, scrollTop])

        const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
            setScrollTop(e.currentTarget.scrollTop)
        }, [])
        useLayoutEffect(() => {
            if (scrollContainerRef.current) {
                scrollContainerRef.current.scrollTop = initialScrollTop
                setScrollTop(initialScrollTop)
                setIsScrollPositioned(true)
            }
        }, [initialScrollTop])

        const handleDateClick = useCallback(
            (
                year: number,
                month: number,
                day: number,
                isDoubleClick: boolean = false
            ) => {
                const clickedDate = new Date(year, month, day)

                const newRange = handleCustomRangeCalendarDateClick(
                    clickedDate,
                    selectedRange,
                    allowSingleDateSelection,
                    today,
                    disableFutureDates,
                    disablePastDates,
                    customRangeConfig,
                    isDoubleClick
                )

                if (newRange) {
                    onDateSelect(newRange)
                }
            },
            [
                selectedRange,
                allowSingleDateSelection,
                today,
                disableFutureDates,
                disablePastDates,
                customRangeConfig,
                onDateSelect,
            ]
        )

        const renderMonth = useCallback(
            (monthInfo: (typeof monthData)[0]) => {
                const { year, month, topPosition, height, index } = monthInfo

                const monthCalendarData = createCalendarMonthData(
                    year,
                    month,
                    0,
                    height
                )

                const shouldHideEntireMonth = monthCalendarData.weeks.every(
                    (week) =>
                        week.every((day) => {
                            if (day === null) return true
                            const date = new Date(year, month, day)
                            return shouldHideDateFromCalendar(
                                date,
                                today,
                                hideFutureDates,
                                hidePastDates
                            )
                        })
                )

                if (shouldHideEntireMonth) {
                    return null
                }

                return (
                    <MotionBlock
                        key={`month-${year}-${month}`}
                        style={{
                            position: 'absolute',
                            top: topPosition,
                            left: 0,
                            right: 0,
                            height: height,
                            display: 'flex',
                            flexDirection: 'column',
                            paddingTop: FOUNDATION_THEME.unit[16],
                            paddingBottom: FOUNDATION_THEME.unit[16],
                        }}
                        variants={monthVariants}
                        initial="hidden"
                        animate="visible"
                        custom={index % 3}
                    >
                        {/* Month Header */}
                        <Block
                            style={{
                                fontSize:
                                    calendarToken.calendar.calendarGrid.month
                                        .header.fontSize,
                                fontWeight:
                                    calendarToken.calendar.calendarGrid.month
                                        .header.fontWeight,
                                color: calendarToken.calendar.calendarGrid.month
                                    .header.color,
                                padding: `${calendarToken.calendar.calendarGrid.month.header.padding.y} ${calendarToken.calendar.calendarGrid.month.header.padding.x}`,
                                flexShrink: 0,
                                marginBottom:
                                    calendarToken.calendar.calendarGrid.month
                                        .header.gap,
                            }}
                            data-calendar-month={monthCalendarData.monthName}
                            data-calendar-year={year}
                            data-calendar-month-year={`${monthCalendarData.monthName} ${year}`}
                        >
                            {monthCalendarData.monthName} {year}
                        </Block>

                        {/* Month Grid */}
                        <Block
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: calendarToken.calendar.calendarGrid.week
                                    .gap,
                                flex: 1,
                            }}
                        >
                            {monthCalendarData.weeks.map(
                                (
                                    week: (number | null)[],
                                    weekIndex: number
                                ) => (
                                    <Block
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns:
                                                'repeat(7, 1fr)',
                                            padding: `0 ${calendarToken.calendar.calendarGrid.week.padding.x}`,
                                            gap: calendarToken.calendar
                                                .calendarGrid.week.row.gap,
                                        }}
                                        key={weekIndex}
                                    >
                                        {week.map(
                                            (
                                                day: number | null,
                                                dayIndex: number
                                            ) => {
                                                if (day === null) {
                                                    return (
                                                        <Block
                                                            style={{
                                                                padding: `${calendarToken.calendar.calendarGrid.day.cell.padding.y} ${calendarToken.calendar.calendarGrid.day.cell.padding.x}`,
                                                            }}
                                                            key={dayIndex}
                                                        />
                                                    )
                                                }

                                                const date = new Date(
                                                    year,
                                                    month,
                                                    day
                                                )

                                                const shouldHide =
                                                    shouldHideDateFromCalendar(
                                                        date,
                                                        today,
                                                        hideFutureDates,
                                                        hidePastDates
                                                    )

                                                if (shouldHide) {
                                                    return (
                                                        <Block
                                                            style={{
                                                                padding: `${calendarToken.calendar.calendarGrid.day.cell.padding.y} ${calendarToken.calendar.calendarGrid.day.cell.padding.x}`,
                                                            }}
                                                            key={dayIndex}
                                                        />
                                                    )
                                                }

                                                const cellProps =
                                                    calculateDayCellProps(
                                                        date,
                                                        selectedRange,
                                                        today,
                                                        disableFutureDates,
                                                        disablePastDates,
                                                        calendarToken,
                                                        customDisableDates
                                                    )

                                                const isSelected =
                                                    cellProps.dateStates
                                                        .isStart ||
                                                    cellProps.dateStates
                                                        .isEnd ||
                                                    cellProps.dateStates
                                                        .isSingleDate

                                                const isToday =
                                                    cellProps.dateStates
                                                        .isTodayDay

                                                const isDisabled =
                                                    cellProps.dateStates
                                                        .isDisabled

                                                const cellIndex =
                                                    weekIndex * 7 + dayIndex

                                                return (
                                                    <StyledDayCell
                                                        key={`${year}-${month}-${day}`}
                                                        $cellStyles={
                                                            cellProps.styles as CSSObject
                                                        }
                                                        $textColor={String(
                                                            cellProps.textColor ||
                                                                ''
                                                        )}
                                                        $isDisabled={isDisabled}
                                                        $isSelected={isSelected}
                                                        $calendarToken={
                                                            calendarToken
                                                        }
                                                        variants={
                                                            dayCellVariants
                                                        }
                                                        initial="hidden"
                                                        animate="visible"
                                                        custom={cellIndex}
                                                        whileHover={
                                                            !isDisabled
                                                                ? {
                                                                      scale: 1.05,
                                                                      transition:
                                                                          {
                                                                              duration: 0.15,
                                                                          },
                                                                  }
                                                                : undefined
                                                        }
                                                        whileTap={
                                                            !isDisabled
                                                                ? {
                                                                      scale: 0.95,
                                                                      transition:
                                                                          {
                                                                              duration: 0.1,
                                                                          },
                                                                  }
                                                                : undefined
                                                        }
                                                        onClick={() =>
                                                            handleDateClick(
                                                                year,
                                                                month,
                                                                day,
                                                                false
                                                            )
                                                        }
                                                        onDoubleClick={() =>
                                                            handleDateClick(
                                                                year,
                                                                month,
                                                                day,
                                                                true
                                                            )
                                                        }
                                                        data-calendar-date={
                                                            isSelected
                                                                ? 'selected'
                                                                : 'not selected'
                                                        }
                                                        data-calendar-date-disabled={
                                                            isDisabled
                                                                ? 'disabled'
                                                                : 'enabled'
                                                        }
                                                        data-calendar-date-today={
                                                            isToday
                                                                ? 'true'
                                                                : 'false'
                                                        }
                                                    >
                                                        <span
                                                            style={{
                                                                display:
                                                                    'inline-block',
                                                                textAlign:
                                                                    'center',
                                                            }}
                                                        >
                                                            {day}
                                                        </span>
                                                        {cellProps.showTodayIndicator && (
                                                            <Block
                                                                style={{
                                                                    width: calendarToken
                                                                        .calendar
                                                                        .calendarGrid
                                                                        .day
                                                                        .todayIndicator
                                                                        .width,
                                                                    height: calendarToken
                                                                        .calendar
                                                                        .calendarGrid
                                                                        .day
                                                                        .todayIndicator
                                                                        .width,
                                                                    backgroundColor:
                                                                        calendarToken
                                                                            .calendar
                                                                            .calendarGrid
                                                                            .day
                                                                            .todayIndicator
                                                                            .backgroundColor,
                                                                    borderRadius:
                                                                        '50%',
                                                                    position:
                                                                        'absolute',
                                                                    bottom: FOUNDATION_THEME
                                                                        .unit[2],
                                                                    left: '50%',
                                                                    transform:
                                                                        'translateX(-50%)',
                                                                }}
                                                            />
                                                        )}
                                                    </StyledDayCell>
                                                )
                                            }
                                        )}
                                    </Block>
                                )
                            )}
                        </Block>
                    </MotionBlock>
                )
            },
            [
                selectedRange,
                today,
                disableFutureDates,
                disablePastDates,
                hideFutureDates,
                hidePastDates,
                customDisableDates,
                handleDateClick,
                calendarToken,
            ]
        )

        // Show skeleton during initial load
        if (isInternalLoading) {
            return <CalendarSkeleton calendarToken={calendarToken} />
        }

        return (
            <MotionBlock
                style={{
                    maxHeight: CONTAINER_HEIGHT,
                    overflowY: 'auto',
                    overflow: 'auto',
                    position: 'relative',
                }}
                ref={ref}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Day Names Header */}
                <Block
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        textAlign: 'center',
                        color: calendarToken.calendar.calendarGrid.week.color,
                        padding: `0 ${calendarToken.calendar.calendarGrid.week.padding.x}`,
                        position: 'sticky',
                        top: 0,
                        zIndex: 10,
                        backgroundColor: calendarToken.calendar.backgroundColor,
                        boxShadow:
                            calendarToken.calendar.calendarGrid.week.boxShadow,
                        borderTopLeftRadius: !showDateTimePicker
                            ? calendarToken.calendar.borderRadius
                            : '0',
                        borderTopRightRadius: !showDateTimePicker
                            ? calendarToken.calendar.borderRadius
                            : '0',
                        overflow: 'hidden',
                    }}
                >
                    {dayNames.map((day, index) => (
                        <Block
                            style={{
                                padding: `${calendarToken.calendar.calendarGrid.week.padding.y} ${calendarToken.calendar.calendarGrid.week.padding.x}`,
                                fontSize:
                                    calendarToken.calendar.calendarGrid.week
                                        .fontSize,
                                fontWeight:
                                    calendarToken.calendar.calendarGrid.week
                                        .fontWeight,
                                color: calendarToken.calendar.calendarGrid.week
                                    .color,
                            }}
                            key={index}
                            data-weekday={day}
                        >
                            {day}
                        </Block>
                    ))}
                </Block>

                <Block
                    ref={(node) => {
                        if (node && scrollContainerRef.current !== node) {
                            scrollContainerRef.current = node as HTMLDivElement
                            node.scrollTop = initialScrollTop
                            setIsScrollPositioned(true)
                        }
                    }}
                    style={{
                        maxHeight: CONTAINER_HEIGHT,
                        overflowY: 'auto',
                        overflow: 'auto',
                        position: 'relative',
                        visibility: isScrollPositioned ? 'visible' : 'hidden',
                        scrollBehavior: 'auto',
                    }}
                    onScroll={handleScroll}
                >
                    <Block
                        style={{
                            height: totalHeight,
                            position: 'relative',
                        }}
                    >
                        {visibleMonths.map(renderMonth)}
                    </Block>
                </Block>
            </MotionBlock>
        )
    }
)

CalendarGrid.displayName = 'CalendarGrid'

export default CalendarGrid
