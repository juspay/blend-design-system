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
    getDatePartsInTimezone,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { DATE_RANGE_PICKER_CONSTANTS } from './constants'

type CalendarGridProps = {
    selectedRange: DateRange | undefined
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
    timezone?: string
    isSingleDatePicker?: boolean
    maxYearOffset?: number
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
    position: relative;

    ${(props) =>
        !props.$isDisabled &&
        `
    &:hover:not(:focus-visible) {
      outline: ${props.$calendarToken.calendar.calendarGrid.day.cell.border.hover};
      outline-offset: -1px;
      border-radius: ${props.$calendarToken.calendar.calendarGrid.day.cell.borderRadius};
      z-index: 1;
    }
  `}

    ${(props) =>
        !props.$isDisabled &&
        `
    &:focus-visible {
      outline: 1px solid ${FOUNDATION_THEME.colors.primary[500]};
      border-radius: ${props.$calendarToken.calendar.calendarGrid.day.cell.borderRadius};
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
    hidePastDates: boolean = false,
    maxYearOffset?: number
): { month: number; year: number }[] {
    const months = []
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const startYear = DATE_RANGE_PICKER_CONSTANTS.MIN_YEAR
    const endYear =
        currentYear +
        (maxYearOffset && maxYearOffset >= 0
            ? maxYearOffset
            : DATE_RANGE_PICKER_CONSTANTS.MAX_YEAR_OFFSET)

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
            timezone,
            isSingleDatePicker,
            maxYearOffset,
        },
        ref
    ) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const cellsRef = useRef<Map<string, HTMLDivElement>>(new Map())
        const activeCellRef = useRef<HTMLDivElement | null>(null)
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
            () =>
                generateMonthsList(
                    today,
                    hideFutureDates,
                    hidePastDates,
                    maxYearOffset
                ),
            [today, hideFutureDates, hidePastDates, maxYearOffset]
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
            const parts = timezone
                ? getDatePartsInTimezone(
                      selectedRange?.startDate || today,
                      timezone
                  )
                : {
                      year: targetDate.getFullYear(),
                      month: targetDate.getMonth(),
                      day: targetDate.getDate(),
                  }
            const currentMonthIndex = findCurrentMonthIndex(
                months,
                parts.month,
                parts.year
            )

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
        }, [
            monthData,
            months,
            selectedRange,
            today,
            resetScrollPosition,
            timezone,
        ])

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
                    allowSingleDateSelection,
                    today,
                    disableFutureDates,
                    disablePastDates,
                    customRangeConfig,
                    isDoubleClick,
                    timezone,
                    selectedRange,
                    isSingleDatePicker
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
                timezone,
            ]
        )

        const getCellKey = (year: number, month: number, day: number) => {
            return `${year}-${month}-${day}`
        }

        useEffect(() => {
            if (selectedRange?.startDate) {
                const activeDate = selectedRange.startDate
                const parts = timezone
                    ? getDatePartsInTimezone(activeDate, timezone)
                    : {
                          year: activeDate.getFullYear(),
                          month: activeDate.getMonth(),
                          day: activeDate.getDate(),
                      }
                const key = getCellKey(parts.year, parts.month, parts.day)
                const cell = cellsRef.current.get(key)
                if (cell) {
                    activeCellRef.current = cell
                    const isFocusOnCalendar = Array.from(
                        cellsRef.current.values()
                    ).some((c) => c === document.activeElement)
                    if (!isFocusOnCalendar && document.activeElement) {
                        cell.focus()
                    }
                }
            }
        }, [selectedRange, timezone])

        const findNextCell = useCallback(
            (
                currentYear: number,
                currentMonth: number,
                currentDay: number,
                direction: 'left' | 'right' | 'up' | 'down'
            ): HTMLDivElement | null => {
                const date = new Date(currentYear, currentMonth, currentDay)

                switch (direction) {
                    case 'left':
                        date.setDate(date.getDate() - 1)
                        break
                    case 'right':
                        date.setDate(date.getDate() + 1)
                        break
                    case 'up':
                        date.setDate(date.getDate() - 7)
                        break
                    case 'down':
                        date.setDate(date.getDate() + 7)
                        break
                }

                const parts = timezone
                    ? getDatePartsInTimezone(date, timezone)
                    : {
                          year: date.getFullYear(),
                          month: date.getMonth(),
                          day: date.getDate(),
                      }
                const key = getCellKey(parts.year, parts.month, parts.day)
                const cell = cellsRef.current.get(key)

                if (cell && cell.getAttribute('aria-disabled') !== 'true') {
                    return cell
                }

                return null
            },
            [timezone]
        )

        const handleCellKeyDown = useCallback(
            (
                e: React.KeyboardEvent<HTMLElement>,
                year: number,
                month: number,
                day: number
            ) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleDateClick(year, month, day, false)
                    return
                }

                const arrowKeys: Record<
                    string,
                    'left' | 'right' | 'up' | 'down'
                > = {
                    ArrowLeft: 'left',
                    ArrowRight: 'right',
                    ArrowUp: 'up',
                    ArrowDown: 'down',
                }

                const direction = arrowKeys[e.key]
                if (direction) {
                    e.preventDefault()
                    e.stopPropagation()

                    const nextCell = findNextCell(year, month, day, direction)
                    if (nextCell) {
                        nextCell.setAttribute('tabindex', '0')
                        nextCell.focus()
                        const currentCell = e.currentTarget as HTMLDivElement
                        currentCell.setAttribute('tabindex', '-1')
                    }
                }
            },
            [handleDateClick, findNextCell]
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
                            data-element="month-year"
                            data-id={`${monthCalendarData.monthName} ${year}`}
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
                                                        customDisableDates,
                                                        timezone,
                                                        isSingleDatePicker
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

                                                const cellKey = getCellKey(
                                                    year,
                                                    month,
                                                    day
                                                )

                                                return (
                                                    <StyledDayCell
                                                        key={cellKey}
                                                        ref={(
                                                            el: HTMLDivElement | null
                                                        ) => {
                                                            if (el) {
                                                                cellsRef.current.set(
                                                                    cellKey,
                                                                    el
                                                                )
                                                                if (
                                                                    isSelected
                                                                ) {
                                                                    activeCellRef.current =
                                                                        el
                                                                    el.setAttribute(
                                                                        'tabindex',
                                                                        '0'
                                                                    )
                                                                }
                                                            } else {
                                                                cellsRef.current.delete(
                                                                    cellKey
                                                                )
                                                                if (
                                                                    activeCellRef.current ===
                                                                    el
                                                                ) {
                                                                    activeCellRef.current =
                                                                        null
                                                                }
                                                            }
                                                        }}
                                                        onFocus={(e) => {
                                                            const cell =
                                                                e.currentTarget
                                                            cell.setAttribute(
                                                                'tabindex',
                                                                '0'
                                                            )
                                                            cellsRef.current.forEach(
                                                                (otherCell) => {
                                                                    if (
                                                                        otherCell !==
                                                                        cell
                                                                    ) {
                                                                        const isOtherSelected =
                                                                            otherCell.getAttribute(
                                                                                'aria-pressed'
                                                                            ) ===
                                                                            'true'
                                                                        if (
                                                                            !isOtherSelected
                                                                        ) {
                                                                            otherCell.setAttribute(
                                                                                'tabindex',
                                                                                '-1'
                                                                            )
                                                                        }
                                                                    }
                                                                }
                                                            )
                                                        }}
                                                        onBlur={(e) => {
                                                            const cell =
                                                                e.currentTarget
                                                            const isSelected =
                                                                cell.getAttribute(
                                                                    'aria-pressed'
                                                                ) === 'true'
                                                            if (!isSelected) {
                                                                cell.setAttribute(
                                                                    'tabindex',
                                                                    '-1'
                                                                )
                                                            }
                                                        }}
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
                                                        role="button"
                                                        tabIndex={
                                                            isDisabled
                                                                ? -1
                                                                : isSelected
                                                                  ? 0
                                                                  : -1
                                                        }
                                                        aria-label={`${new Date(year, month, day).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}${isSelected ? ', selected' : ''}${isToday ? ', today' : ''}${isDisabled ? ', disabled' : ''}`}
                                                        aria-selected={
                                                            isSelected
                                                        }
                                                        aria-pressed={
                                                            isSelected
                                                        }
                                                        aria-disabled={
                                                            isDisabled
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
                                                        onKeyDown={(e) =>
                                                            handleCellKeyDown(
                                                                e,
                                                                year,
                                                                month,
                                                                day
                                                            )
                                                        }
                                                        data-element="days"
                                                        data-id={day}
                                                        data-state={
                                                            isSelected
                                                                ? 'selected'
                                                                : 'not selected'
                                                        }
                                                        data-status={
                                                            isDisabled
                                                                ? 'disabled'
                                                                : 'enabled'
                                                        }
                                                        data-calendar-date-today={
                                                            isToday
                                                                ? 'today'
                                                                : 'not today'
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
                timezone,
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
                {/* Day Names Header - Not keyboard accessible */}
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
                    role="presentation"
                    aria-hidden="true"
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
                            data-element="weekday"
                            data-id={day}
                            tabIndex={-1}
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
