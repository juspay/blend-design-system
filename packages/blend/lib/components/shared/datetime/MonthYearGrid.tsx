import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled, { CSSObject } from 'styled-components'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Block from '../../Primitives/Block/Block'
import PrimitiveButton from '../../Primitives/PrimitiveButton/PrimitiveButton'
import type { CalendarTokenType } from '../../DateRangePicker/dateRangePicker.tokens'
import type {
    CustomDateDisableFunction,
    DateRange,
} from '../../DateRangePicker/types'
import {
    calculateDayCellProps,
    getMonthName,
} from '../../DateRangePicker/utils'
import { DATE_RANGE_PICKER_CONSTANTS } from '../../DateRangePicker/constants'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import { FOUNDATION_THEME } from '../../../tokens'
import {
    normalizeRangeToPeriodStarts,
    startOfPeriod,
    type PickerGranularity,
} from './granularity'

/**
 * The month and year selection surfaces behind `granularity="month"` and
 * `granularity="year"`.
 *
 * Note on the brief this was built from: the repo had **no** existing month or
 * year grid to promote. `CalendarGrid` is a continuously scrolling, virtualised
 * list of months whose month headers are static text with no click target, and
 * the only month/year *selection* UI anywhere was `ScrollablePicker`, a
 * mobile-only scroll wheel. So this grid is new — but it is not a fork: every
 * cell's state and styling comes from `calculateDayCellProps`, the same
 * function that styles `CalendarGrid`'s day cells, fed period-start dates. A
 * selected month therefore renders with the identical pill, an interior month
 * of a range with the identical range fill, and the current month with the
 * identical today dot.
 *
 * Day granularity never reaches this file.
 */
export type MonthYearGridProps = {
    /** `'month'` renders 12 month cells plus year navigation; `'year'` a year grid. */
    granularity: Exclude<PickerGranularity, 'day'>
    /**
     * The draft selection. Both ends are collapsed onto their period starts
     * before matching, so a month range committed as 1 Sep → 30 Sep still
     * highlights September as a single cell.
     */
    selectedRange: DateRange | undefined
    /** Receives the first day of the clicked period, at local midnight. */
    onSelect: (periodStart: Date) => void
    today: Date
    /**
     * Range mode draws start/end caps and an interior fill; otherwise a single
     * selected cell is drawn as a pill.
     */
    isRange?: boolean
    /**
     * Bounds are compared at period resolution, so a `minDate` of 15 Sep leaves
     * September selectable in month mode — the useful reading for billing
     * periods, where the month containing the boundary is still a valid month.
     */
    minDate?: Date
    maxDate?: Date
    timezone?: string
    disableFutureDates?: boolean
    disablePastDates?: boolean
    hideFutureDates?: boolean
    hidePastDates?: boolean
    /** Called with the period's first day, not with every day inside it. */
    customDisableDates?: CustomDateDisableFunction
    /** Bumped by the pickers on close so the view re-derives from the selection. */
    resetScrollPosition?: number
    maxYearOffset?: number
}

const COLUMNS = 4
const CONTAINER_HEIGHT = DATE_RANGE_PICKER_CONSTANTS.CALENDAR_CONTAINER_HEIGHT

/**
 * Mirrors `CalendarGrid`'s `StyledDayCell` so hover and focus rings match the
 * day grid exactly. `$cellStyles` is whatever `calculateDayCellProps` returned.
 */
const StyledPeriodCell = styled(Block)<{
    $cellStyles: CSSObject
    $textColor: string
    $isDisabled: boolean
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

const NavButton = styled(PrimitiveButton)<{ $color: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    border-radius: ${FOUNDATION_THEME.border.radius[4]};
    width: ${FOUNDATION_THEME.unit[32]};
    height: ${FOUNDATION_THEME.unit[32]};
    padding: ${FOUNDATION_THEME.unit[8]};
    color: ${(props) => props.$color};
    cursor: pointer;

    &:hover:not(:disabled) {
        background: ${FOUNDATION_THEME.colors.gray[50]};
    }

    &:active:not(:disabled) {
        background: ${FOUNDATION_THEME.colors.gray[100]};
    }

    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }

    &:focus-visible {
        outline: none;
        box-shadow: ${FOUNDATION_THEME.shadows.focusPrimary};
    }
`

const MonthYearGrid = ({
    granularity,
    selectedRange,
    onSelect,
    today,
    isRange = false,
    minDate,
    maxDate,
    timezone,
    disableFutureDates = false,
    disablePastDates = false,
    hideFutureDates = false,
    hidePastDates = false,
    customDisableDates,
    resetScrollPosition,
    maxYearOffset,
}: MonthYearGridProps) => {
    const calendarToken = useResponsiveTokens<CalendarTokenType>('CALENDAR')
    const cellsRef = useRef<HTMLDivElement[]>([])
    const selectedCellRef = useRef<HTMLDivElement | null>(null)

    const minYear = DATE_RANGE_PICKER_CONSTANTS.MIN_YEAR
    const maxYear =
        today.getFullYear() +
        (maxYearOffset !== undefined && maxYearOffset >= 0
            ? maxYearOffset
            : DATE_RANGE_PICKER_CONSTANTS.MAX_YEAR_OFFSET)

    // Every date the grid compares against is collapsed to the same resolution
    // as the cells themselves, so `calculateDayCellProps` — which compares
    // whole days — answers month and year questions correctly.
    const displayRange = useMemo(
        () => normalizeRangeToPeriodStarts(selectedRange, granularity),
        [selectedRange, granularity]
    )
    const periodToday = useMemo(
        () => startOfPeriod(today, granularity),
        [today, granularity]
    )
    const periodMinDate = useMemo(
        () => (minDate ? startOfPeriod(minDate, granularity) : undefined),
        [minDate, granularity]
    )
    const periodMaxDate = useMemo(
        () => (maxDate ? startOfPeriod(maxDate, granularity) : undefined),
        [maxDate, granularity]
    )

    const anchorYear = (displayRange?.startDate ?? today).getFullYear()
    const [viewYear, setViewYear] = useState(anchorYear)

    // Reopening the popover must show the year the current selection lives in,
    // not wherever the user browsed to before closing — same contract as
    // `CalendarGrid`'s scroll reset.
    useEffect(() => {
        setViewYear(anchorYear)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetScrollPosition])

    const cells = useMemo(() => {
        if (granularity === 'month') {
            return Array.from({ length: 12 }, (_, month) => ({
                date: new Date(viewYear, month, 1),
                label: getMonthName(month).slice(0, 3),
                fullLabel: `${getMonthName(month)} ${viewYear}`,
                id: `${viewYear}-${month}`,
            }))
        }
        return Array.from({ length: maxYear - minYear + 1 }, (_, index) => {
            const year = minYear + index
            return {
                date: new Date(year, 0, 1),
                label: String(year),
                fullLabel: String(year),
                id: String(year),
            }
        })
    }, [granularity, viewYear, minYear, maxYear])

    const visibleCells = useMemo(
        () =>
            cells.filter(({ date }) => {
                const period = startOfPeriod(date, granularity)
                return (
                    !(hideFutureDates && period > periodToday) &&
                    !(hidePastDates && period < periodToday)
                )
            }),
        [cells, granularity, hideFutureDates, hidePastDates, periodToday]
    )

    useEffect(() => {
        cellsRef.current = cellsRef.current.slice(0, visibleCells.length)
    }, [visibleCells.length])

    // The year grid spans ~a century, so bring the selection into view the way
    // `CalendarGrid` scrolls to the selected month.
    useEffect(() => {
        const cell = selectedCellRef.current
        if (granularity !== 'year' || !cell) return
        if (typeof cell.scrollIntoView !== 'function') return
        cell.scrollIntoView({ block: 'center' })
    }, [granularity, resetScrollPosition])

    const handleKeyDown = useCallback(
        (
            e: React.KeyboardEvent<HTMLElement>,
            index: number,
            date: Date,
            isDisabled: boolean
        ) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                if (!isDisabled) onSelect(date)
                return
            }

            const step: Record<string, number> = {
                ArrowLeft: -1,
                ArrowRight: 1,
                ArrowUp: -COLUMNS,
                ArrowDown: COLUMNS,
            }
            const delta = step[e.key]
            if (delta === undefined) return

            e.preventDefault()
            e.stopPropagation()
            const next = cellsRef.current[index + delta]
            if (next && next.getAttribute('aria-disabled') !== 'true') {
                next.focus()
            }
        },
        [onSelect]
    )

    const navigationMinYear = Math.max(
        minYear,
        hidePastDates ? today.getFullYear() : minYear
    )
    const navigationMaxYear = Math.min(
        maxYear,
        hideFutureDates ? today.getFullYear() : maxYear
    )
    const canGoPrevYear = viewYear > navigationMinYear
    const canGoNextYear = viewYear < navigationMaxYear

    const cellEntries = visibleCells.map((cell) => {
        const cellProps = calculateDayCellProps(
            cell.date,
            displayRange,
            periodToday,
            disableFutureDates,
            disablePastDates,
            calendarToken,
            customDisableDates,
            timezone,
            !isRange,
            periodMinDate,
            periodMaxDate
        )
        const isSelected =
            cellProps.dateStates.isStart ||
            cellProps.dateStates.isEnd ||
            cellProps.dateStates.isSingleDate
        const isDisabled = cellProps.dateStates.isDisabled

        return {
            cell,
            cellProps,
            isSelected,
            isDisabled,
            isYearAnchor:
                granularity === 'year' &&
                !displayRange &&
                !isDisabled &&
                cell.date.getFullYear() === periodToday.getFullYear(),
        }
    })

    const selectedIndex = cellEntries.findIndex(
        (entry) => entry.isSelected && !entry.isDisabled
    )
    const anchorIndex = cellEntries.findIndex((entry) => entry.isYearAnchor)
    const firstEnabledIndex = cellEntries.findIndex(
        (entry) => !entry.isDisabled
    )
    const focusableIndex =
        selectedIndex >= 0
            ? selectedIndex
            : anchorIndex >= 0
              ? anchorIndex
              : firstEnabledIndex

    return (
        <Block
            display="flex"
            flexDirection="column"
            data-element={granularity === 'month' ? 'month-grid' : 'year-grid'}
        >
            {granularity === 'month' && (
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    paddingX={
                        calendarToken.calendar.calendarGrid.week.padding.x
                    }
                    paddingY={
                        calendarToken.calendar.calendarGrid.month.header.padding
                            .y
                    }
                >
                    <NavButton
                        type="button"
                        aria-label="Previous year"
                        disabled={!canGoPrevYear}
                        onClick={() =>
                            canGoPrevYear && setViewYear(viewYear - 1)
                        }
                        $color={
                            calendarToken.calendar.calendarGrid.month.header
                                .color as string
                        }
                    >
                        <ChevronLeft size={16} />
                    </NavButton>
                    <Block
                        aria-live="polite"
                        data-element="month-year"
                        data-id={String(viewYear)}
                        style={{
                            fontSize:
                                calendarToken.calendar.calendarGrid.month.header
                                    .fontSize,
                            fontWeight:
                                calendarToken.calendar.calendarGrid.month.header
                                    .fontWeight,
                            color: calendarToken.calendar.calendarGrid.month
                                .header.color,
                        }}
                    >
                        {viewYear}
                    </Block>
                    <NavButton
                        type="button"
                        aria-label="Next year"
                        disabled={!canGoNextYear}
                        onClick={() =>
                            canGoNextYear && setViewYear(viewYear + 1)
                        }
                        $color={
                            calendarToken.calendar.calendarGrid.month.header
                                .color as string
                        }
                    >
                        <ChevronRight size={16} />
                    </NavButton>
                </Block>
            )}

            <Block
                role="grid"
                aria-label={
                    granularity === 'month' ? 'Select month' : 'Select year'
                }
                style={{
                    display: 'grid',
                    rowGap: calendarToken.calendar.calendarGrid.week.gap,
                    padding: `${calendarToken.calendar.calendarGrid.week.padding.y} ${calendarToken.calendar.calendarGrid.week.padding.x}`,
                    maxHeight: CONTAINER_HEIGHT,
                    overflowY: granularity === 'year' ? 'auto' : 'visible',
                }}
            >
                {Array.from(
                    { length: Math.ceil(cellEntries.length / COLUMNS) },
                    (_, rowIndex) => (
                        <Block
                            key={`row-${rowIndex}`}
                            role="row"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`,
                                gap: calendarToken.calendar.calendarGrid.week
                                    .row.gap,
                            }}
                        >
                            {cellEntries
                                .slice(
                                    rowIndex * COLUMNS,
                                    (rowIndex + 1) * COLUMNS
                                )
                                .map((entry, rowCellIndex) => {
                                    const index =
                                        rowIndex * COLUMNS + rowCellIndex
                                    const {
                                        cell,
                                        cellProps,
                                        isSelected,
                                        isDisabled,
                                        isYearAnchor,
                                    } = entry

                                    return (
                                        <StyledPeriodCell
                                            key={cell.id}
                                            ref={(
                                                el: HTMLDivElement | null
                                            ) => {
                                                if (!el) return
                                                cellsRef.current[index] = el
                                                if (
                                                    (isSelected &&
                                                        !isDisabled) ||
                                                    isYearAnchor
                                                ) {
                                                    selectedCellRef.current = el
                                                }
                                            }}
                                            $cellStyles={
                                                cellProps.styles as CSSObject
                                            }
                                            $textColor={String(
                                                cellProps.textColor || ''
                                            )}
                                            $isDisabled={isDisabled}
                                            $calendarToken={calendarToken}
                                            role="gridcell"
                                            tabIndex={
                                                isDisabled
                                                    ? -1
                                                    : index === focusableIndex
                                                      ? 0
                                                      : -1
                                            }
                                            aria-label={`${cell.fullLabel}${isSelected ? ', selected' : ''}${cellProps.dateStates.isTodayDay ? ', today' : ''}${isDisabled ? ', disabled' : ''}`}
                                            aria-selected={isSelected}
                                            aria-disabled={isDisabled}
                                            onClick={() =>
                                                !isDisabled &&
                                                onSelect(cell.date)
                                            }
                                            onKeyDown={(
                                                e: React.KeyboardEvent<HTMLElement>
                                            ) =>
                                                handleKeyDown(
                                                    e,
                                                    index,
                                                    cell.date,
                                                    isDisabled
                                                )
                                            }
                                            data-element={
                                                granularity === 'month'
                                                    ? 'months'
                                                    : 'years'
                                            }
                                            data-id={cell.id}
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
                                        >
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {cell.label}
                                            </span>
                                            {cellProps.showTodayIndicator && (
                                                <Block
                                                    style={{
                                                        width: calendarToken
                                                            .calendar
                                                            .calendarGrid.day
                                                            .todayIndicator
                                                            .width,
                                                        height: calendarToken
                                                            .calendar
                                                            .calendarGrid.day
                                                            .todayIndicator
                                                            .width,
                                                        backgroundColor:
                                                            calendarToken
                                                                .calendar
                                                                .calendarGrid
                                                                .day
                                                                .todayIndicator
                                                                .backgroundColor,
                                                        borderRadius: '50%',
                                                        position: 'absolute',
                                                        bottom: FOUNDATION_THEME
                                                            .unit[2],
                                                        left: '50%',
                                                        transform:
                                                            'translateX(-50%)',
                                                    }}
                                                />
                                            )}
                                        </StyledPeriodCell>
                                    )
                                })}
                        </Block>
                    )
                )}
            </Block>
        </Block>
    )
}

MonthYearGrid.displayName = 'MonthYearGrid'

export default MonthYearGrid
