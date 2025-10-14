import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from 'react'
import styled, { CSSObject } from 'styled-components'
import { DateRange, CustomRangeConfig } from './types'
import { CalendarTokenType } from './dateRangePicker.tokens'
import Block from '../Primitives/Block/Block'
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
}

const CONTAINER_HEIGHT = 340

const StyledDayCell = styled(Block)<{
    $cellStyles: CSSObject
    $textColor: string
    $isDisabled: boolean
    $isSelected: boolean
    $calendarToken: CalendarTokenType
}>`
    ${(props) => props.$cellStyles}
    color: ${(props) => props.$textColor};
    cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};

    ${(props) =>
        !props.$isDisabled &&
        `
    &:hover {
      outline: ${props.$calendarToken.calendar.calendarGrid.day.cell.outline.hover};
      border-radius: ${props.$calendarToken.calendar.calendarGrid.day.cell.borderRadius};
      z-index: 10;
      position: relative;
    }
  `}
`

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
        },
        ref
    ) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const [scrollTop, setScrollTop] = useState(0)
        const isInitialized = useRef(false)

        const calendarToken = useResponsiveTokens<CalendarTokenType>('CALENDAR')

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

        useEffect(() => {
            if (
                !isInitialized.current &&
                scrollContainerRef.current &&
                monthData.length > 0
            ) {
                isInitialized.current = true

                const currentMonthIndex = findCurrentMonthIndex(months, today)
                if (currentMonthIndex !== -1) {
                    const monthInfo = monthData[currentMonthIndex]
                    if (monthInfo) {
                        const centeredPosition = Math.max(
                            0,
                            monthInfo.topPosition -
                                CONTAINER_HEIGHT / 2 +
                                monthInfo.height / 2
                        )

                        requestAnimationFrame(() => {
                            if (scrollContainerRef.current) {
                                scrollContainerRef.current.scrollTop =
                                    centeredPosition
                                setScrollTop(centeredPosition)
                            }
                        })
                    }
                }
            }
        }, [monthData, months, today])

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
                const { year, month, topPosition, height } = monthInfo

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
                    <Block
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
                                                        $isDisabled={
                                                            cellProps.dateStates
                                                                .isDisabled
                                                        }
                                                        $isSelected={isSelected}
                                                        $calendarToken={
                                                            calendarToken
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
                                                                    ...calendarToken
                                                                        .calendar
                                                                        .calendarGrid
                                                                        .day
                                                                        .todayIndicator,
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
                    </Block>
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

        return (
            <Block
                style={{
                    maxHeight: CONTAINER_HEIGHT,
                    overflowY: 'auto',
                    overflow: 'auto',
                    position: 'relative',
                }}
                ref={ref}
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
                        >
                            {day}
                        </Block>
                    ))}
                </Block>

                <Block
                    ref={scrollContainerRef}
                    style={{
                        maxHeight: CONTAINER_HEIGHT,
                        overflowY: 'auto',
                        overflow: 'auto',
                        position: 'relative',
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
            </Block>
        )
    }
)

CalendarGrid.displayName = 'CalendarGrid'

export default CalendarGrid
