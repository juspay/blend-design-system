import {
    forwardRef,
    useEffect,
    useRef,
    useState,
    useCallback,
    useMemo,
} from 'react'
import styled, { CSSObject } from 'styled-components'
import { DateRange } from './types'
import { CalendarTokenType } from './dateRangePicker.tokens'
import Block from '../Primitives/Block/Block'
import {
    handleEnhancedCalendarDateClick,
    getDayNames,
    getMonthHeight,
    findCurrentMonthIndex,
    generateInitialMonths,
    handleLoadMoreMonths,
    handleCalendarScroll,
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
    showDateTimePicker?: boolean
}

const CONTAINER_HEIGHT = 340
const LOAD_THRESHOLD = 100

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
      outline: ${props.$calendarToken.calendar.calendarGrid.day.hover.outline};
      border-radius: ${props.$calendarToken.calendar.calendarGrid.day.hover.borderRadius};
      z-index: 10;
      position: relative;
    }
  `}
`

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
            showDateTimePicker = true,
        },
        ref
    ) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null)
        const [scrollTop, setScrollTop] = useState(0)
        const animationFrameRef = useRef<number | undefined>(undefined)
        const isInitialized = useRef(false)
        const [isLoadingPast, setIsLoadingPast] = useState(false)
        const [isLoadingFuture, setIsLoadingFuture] = useState(false)
        const [months, setMonths] = useState<{ month: number; year: number }[]>(
            []
        )
        const responsiveCalendarTokens =
            useResponsiveTokens<CalendarTokenType>('CALENDAR')
        const calendarToken = responsiveCalendarTokens

        useEffect(() => {
            const initialMonths = generateInitialMonths(today)
            setMonths(initialMonths)
        }, [today])

        const dayNames = useMemo(() => getDayNames(), [])

        const monthHeights = useMemo(() => {
            return months.map(({ year, month }) => {
                // Check if entire month should be hidden
                const monthData = createCalendarMonthData(year, month, 0, 0)
                const shouldHideEntireMonth = monthData.weeks.every((week) =>
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

                // Return 0 height for hidden months
                return shouldHideEntireMonth ? 0 : getMonthHeight(year, month)
            })
        }, [months, today, hideFutureDates, hidePastDates])

        const cumulativeHeights = useMemo(() => {
            const heights = [0]
            for (let i = 0; i < monthHeights.length; i++) {
                heights.push(heights[i] + monthHeights[i])
            }
            return heights
        }, [monthHeights])

        const totalHeight = cumulativeHeights[cumulativeHeights.length - 1] || 0

        const visibleMonths = useMemo(() => {
            const buffer = 2
            const visibleItems: {
                month: number
                year: number
                index: number
            }[] = []

            for (let i = 0; i < months.length; i++) {
                const monthTop = cumulativeHeights[i]
                const monthBottom = cumulativeHeights[i + 1]

                if (
                    monthBottom >= scrollTop - buffer * 300 &&
                    monthTop <= scrollTop + CONTAINER_HEIGHT + buffer * 300
                ) {
                    visibleItems.push({
                        ...months[i],
                        index: i,
                    })
                }
            }

            return visibleItems
        }, [months, cumulativeHeights, scrollTop])

        const loadMoreMonths = useCallback(
            async (direction: 'past' | 'future') => {
                if (direction === 'past') setIsLoadingPast(true)
                else setIsLoadingFuture(true)

                const currentScrollTop =
                    scrollContainerRef.current?.scrollTop || 0

                try {
                    const newChunk = await handleLoadMoreMonths(
                        months,
                        direction,
                        isLoadingPast,
                        isLoadingFuture
                    )

                    if (newChunk) {
                        setMonths((prevMonths) => {
                            const newMonths =
                                direction === 'past'
                                    ? [...newChunk, ...prevMonths]
                                    : [...prevMonths, ...newChunk]

                            requestAnimationFrame(() => {
                                if (
                                    scrollContainerRef.current &&
                                    direction === 'past'
                                ) {
                                    const addedHeight = newChunk.reduce(
                                        (total, { year, month }) =>
                                            total + getMonthHeight(year, month),
                                        0
                                    )
                                    scrollContainerRef.current.scrollTop =
                                        currentScrollTop + addedHeight
                                }
                            })

                            return newMonths
                        })
                    }
                } finally {
                    if (direction === 'past') setIsLoadingPast(false)
                    else setIsLoadingFuture(false)
                }
            },
            [months, isLoadingPast, isLoadingFuture]
        )

        const handleScroll = useCallback(
            (e: React.UIEvent<HTMLDivElement>) => {
                const newScrollTop = e.currentTarget.scrollTop
                const scrollHeight = e.currentTarget.scrollHeight
                const clientHeight = e.currentTarget.clientHeight

                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current)
                }

                animationFrameRef.current = requestAnimationFrame(() => {
                    setScrollTop(newScrollTop)
                })

                const { shouldLoadPast, shouldLoadFuture } =
                    handleCalendarScroll(
                        newScrollTop,
                        scrollHeight,
                        clientHeight,
                        LOAD_THRESHOLD
                    )

                if (shouldLoadPast && !isLoadingPast) {
                    loadMoreMonths('past')
                }

                if (shouldLoadFuture && !isLoadingFuture) {
                    loadMoreMonths('future')
                }
            },
            [loadMoreMonths, isLoadingPast, isLoadingFuture]
        )

        useEffect(() => {
            if (
                !isInitialized.current &&
                scrollContainerRef.current &&
                months.length > 0 &&
                cumulativeHeights.length > 0
            ) {
                const currentMonthIndex = findCurrentMonthIndex(months, today)
                if (currentMonthIndex !== -1) {
                    const scrollPosition = cumulativeHeights[currentMonthIndex]
                    const currentMonthHeight =
                        monthHeights[currentMonthIndex] || getMonthHeight()

                    // Adjust to center the month in the viewport
                    const centeredPosition = Math.max(
                        0,
                        scrollPosition -
                            CONTAINER_HEIGHT / 2 +
                            currentMonthHeight / 2
                    )

                    requestAnimationFrame(() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTop =
                                centeredPosition
                            setScrollTop(centeredPosition)
                            isInitialized.current = true
                        }
                    })
                }
            }
        }, [months, today, cumulativeHeights, monthHeights])

        useEffect(() => {
            return () => {
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current)
                }
            }
        }, [])

        const handleDateClick = useCallback(
            (
                year: number,
                month: number,
                day: number,
                isDoubleClick: boolean = false
            ) => {
                const clickedDate = new Date(year, month, day)
                const newRange = handleEnhancedCalendarDateClick(
                    clickedDate,
                    selectedRange,
                    allowSingleDateSelection,
                    today,
                    disableFutureDates,
                    disablePastDates,
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
                onDateSelect,
            ]
        )

        const renderMonthCalendar = useCallback(
            (year: number, month: number, monthIndex: number) => {
                const monthHeight = getMonthHeight(year, month)
                const topOffset = cumulativeHeights[monthIndex] || 0

                const monthData = createCalendarMonthData(
                    year,
                    month,
                    monthIndex,
                    monthHeight
                )

                // Check if entire month should be hidden
                const shouldHideEntireMonth = monthData.weeks.every((week) =>
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
                            ...calendarToken.calendar.calendarGrid.month
                                .container,
                            position: 'absolute',
                            top: topOffset,
                            left: 0,
                            right: 0,
                            height: monthHeight,
                            marginBottom:
                                calendarToken.calendar.calendarGrid.month
                                    .container.marginBottom,
                            display: 'flex',
                            flexDirection: 'column',
                            paddingTop: FOUNDATION_THEME.unit[16],
                            paddingBottom: FOUNDATION_THEME.unit[16],
                        }}
                    >
                        <Block
                            style={{
                                ...calendarToken.calendar.calendarGrid.month
                                    .header,
                                flexShrink: 0,
                                marginBottom: FOUNDATION_THEME.unit[16],
                            }}
                        >
                            {monthData.monthName} {year}
                        </Block>

                        <Block
                            style={{
                                ...calendarToken.calendar.calendarGrid.week
                                    .container,
                                flex: 1,
                            }}
                        >
                            {monthData.weeks.map(
                                (
                                    week: (number | null)[],
                                    weekIndex: number
                                ) => (
                                    <Block
                                        style={{
                                            ...calendarToken.calendar
                                                .calendarGrid.week.row,
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
                                                                ...calendarToken
                                                                    .calendar
                                                                    .calendarGrid
                                                                    .day.empty,
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

                                                // Hide dates if hideFutureDates or hidePastDates is true
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
                                                                ...calendarToken
                                                                    .calendar
                                                                    .calendarGrid
                                                                    .day.empty,
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
                                                        calendarToken
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
                                                                // width: '24px',
                                                                // height: '20px',
                                                                // lineHeight: '20px',
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
                handleDateClick,
                calendarToken,
                cumulativeHeights,
            ]
        )

        const renderLoader = (position: 'top' | 'bottom') => (
            <Block
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: position === 'top' ? 'sticky' : 'relative',
                    top: position === 'top' ? 0 : 'auto',
                    zIndex: 5,
                    padding: '16px',
                }}
            >
                <Block
                    style={{
                        width: FOUNDATION_THEME.unit[20],
                        height: FOUNDATION_THEME.unit[20],
                        border: `2px solid ${FOUNDATION_THEME.colors.gray[200]}`,
                        borderTop: `2px solid ${FOUNDATION_THEME.colors.primary[500]}`,
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                    }}
                />

                <style>
                    {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
                </style>
            </Block>
        )

        return (
            <Block
                style={{
                    ...calendarToken.calendar.calendarGrid.container,
                    overflow: 'hidden',
                }}
                ref={ref}
            >
                <Block
                    style={{
                        ...calendarToken.calendar.calendarGrid.week.header,
                        borderTopLeftRadius: !showDateTimePicker
                            ? FOUNDATION_THEME.border.radius[8]
                            : '0',
                        borderTopRightRadius: !showDateTimePicker
                            ? FOUNDATION_THEME.border.radius[8]
                            : '0',
                        overflow: 'hidden',
                    }}
                >
                    {dayNames.map((day, index) => (
                        <Block
                            style={{
                                ...calendarToken.calendar.calendarGrid.week
                                    .dayName,
                            }}
                            key={index}
                        >
                            {day}
                        </Block>
                    ))}
                </Block>

                <Block
                    ref={scrollContainerRef}
                    style={{ ...calendarToken.calendar.calendarGrid.container }}
                    onScroll={handleScroll}
                >
                    {isLoadingPast && renderLoader('top')}

                    <Block
                        style={{ height: totalHeight, position: 'relative' }}
                    >
                        {visibleMonths.map(({ year, month, index }) =>
                            renderMonthCalendar(year, month, index)
                        )}
                    </Block>

                    {isLoadingFuture && renderLoader('bottom')}
                </Block>
            </Block>
        )
    }
)

CalendarGrid.displayName = 'CalendarGrid'

export default CalendarGrid
