import {
    cloneElement,
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Popover from '../Popover/Popover'
import Button from '../Button/Button'
import { ButtonSize, ButtonType } from '../Button/types'
import CalendarGrid from '../DateRangePicker/CalendarGrid'
import MonthYearGrid from '../shared/datetime/MonthYearGrid'
import { startOfPeriod } from '../shared/datetime/granularity'
import { DateRangePickerSize, type DateRange } from '../DateRangePicker/types'
import type { CalendarTokenType } from '../DateRangePicker/dateRangePicker.tokens'
import {
    formatDate,
    formatTriggerDisplay,
    getTodayInTimezone,
} from '../DateRangePicker/utils'
import {
    renderPickerTrigger,
    PickerClearButton,
} from '../shared/datetime/PickerTrigger'
import {
    applyTimeValueToDate,
    clampTimeValue,
    formatTimeValue,
    isSameCalendarDayInTimezone,
    timeValueFromDate,
    MIN_TIME,
    type TimeValue,
} from '../shared/datetime/timeCore'
import TimeColumns from '../TimePicker/TimeColumns'
import type { TimePickerTokensType } from '../TimePicker/timePicker.tokens.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { useTheme } from '../../context'
import { FOUNDATION_THEME } from '../../tokens'
import type { SingleDatePickerProps } from './singleDatePicker.types'

/**
 * Single-date selection, optionally with a time-of-day.
 *
 * This is a thin adapter, not a fork: the month list, the day cells, keyboard
 * navigation and every disable rule come from `DateRangePicker`'s
 * `CalendarGrid` running in its existing `isSingleDatePicker` mode, where a
 * click yields `{ startDate }` with no `endDate`. The trigger is the shared
 * `renderPickerTrigger`, and all time maths lives in `shared/datetime/timeCore`.
 *
 * Interaction model matches `DateRangePicker`: selections mutate an internal
 * *draft*, `Apply` commits it through `onChange`, `Cancel` restores it from
 * the committed value. The trigger therefore always shows the committed value,
 * never the draft.
 *
 * Optionally controlled, like `DateRangePicker` and `TimePicker`: with a
 * `value` the caller owns the committed value, without one the component
 * keeps it internally and `onChange` is pure notification.
 *
 * Token slots: the calendar, the trigger and the footer come from `CALENDAR`
 * (shared with `DateRangePicker` so the two are pixel-identical). The optional
 * time section *and the error message* come from `TIME_PICKER`, shared with
 * `TimePicker` — overriding that slot restyles this component's error text and
 * time columns too. There is deliberately no `SINGLE_DATE_PICKER` slot.
 *
 * `granularity` swaps only the selection surface: `'month'` and `'year'` render
 * `MonthYearGrid` in place of `CalendarGrid` and normalise the committed value
 * to the period's first day. Everything else — the draft/Apply model, the
 * trigger, the optional time section, clearing — is shared with day mode, and
 * day mode itself takes no new branches.
 */
/**
 * Day granularity keeps every historical default verbatim. The coarser modes
 * pick a pattern `formatDate` can actually render — it substitutes `dd`, `MM`,
 * `yyyy`, `HH` and `mm` and has no month-name token — plus a matching
 * placeholder and in-popover label.
 */
const GRANULARITY_DEFAULTS = {
    day: {
        dateFormat: 'dd/MM/yyyy',
        placeholder: 'Select date',
        label: 'Date',
        ariaLabel: 'Choose date',
    },
    month: {
        dateFormat: 'MM/yyyy',
        placeholder: 'Select month',
        label: 'Month',
        ariaLabel: 'Choose month',
    },
    year: {
        dateFormat: 'yyyy',
        placeholder: 'Select year',
        label: 'Year',
        ariaLabel: 'Choose year',
    },
} as const

const SingleDatePicker = forwardRef<HTMLDivElement, SingleDatePickerProps>(
    (
        {
            value,
            onChange,
            minDate,
            maxDate,
            granularity = 'day',
            disableDates,
            showTime = false,
            timeFormat = '12h',
            showSeconds = false,
            timezone,
            dateFormat,
            formatConfig,
            placeholder,
            disabled = false,
            error = false,
            errorMessage,
            allowClear = false,
            size = DateRangePickerSize.MEDIUM,
            triggerConfig,
            popoverConfig,
        },
        ref
    ) => {
        const calendarToken = useResponsiveTokens<CalendarTokenType>('CALENDAR')
        const { foundationTokens } = useTheme()
        const timePickerToken =
            useResponsiveTokens<TimePickerTokensType>('TIME_PICKER')

        const granularityDefaults = GRANULARITY_DEFAULTS[granularity]
        const isDayGranularity = granularity === 'day'
        const showTimeForGranularity = showTime && isDayGranularity
        const resolvedDateFormat = dateFormat ?? granularityDefaults.dateFormat
        const resolvedPlaceholder =
            placeholder ?? granularityDefaults.placeholder

        const [isOpen, setIsOpen] = useState(false)
        // Bumped on every close so `CalendarGrid` re-derives its scroll offset
        // from the current selection instead of restoring the stale one.
        const [popoverKey, setPopoverKey] = useState(0)
        const [draftDate, setDraftDate] = useState<Date | undefined>(value)

        // Uncontrolled fallback for the committed value.
        const [internalDate, setInternalDate] = useState<Date | undefined>(
            undefined
        )
        const isControlled = value !== undefined
        const committedDate = isControlled ? value : internalDate

        // Dropped once the component becomes controlled. Without this, a
        // caller that starts uncontrolled, then supplies `value`, then clears
        // it back to `undefined` would fall through to a stale internal date
        // instead of the placeholder.
        useEffect(() => {
            if (isControlled && internalDate !== undefined) {
                setInternalDate(undefined)
            }
        }, [isControlled, internalDate])

        const errorId = useId()
        const timeColumnsId = useId()

        // Re-seed the draft only when the committed value actually changes.
        // Comparing timestamps (not identity) keeps callers that rebuild the
        // `Date` on every render from looping through this effect.
        const lastValueTimeRef = useRef<number | null>(
            value && !Number.isNaN(value.getTime()) ? value.getTime() : null
        )
        useEffect(() => {
            const raw = value ? value.getTime() : null
            const nextTime = raw !== null && Number.isNaN(raw) ? null : raw
            if (nextTime === lastValueTimeRef.current) return
            lastValueTimeRef.current = nextTime
            setDraftDate(value)
        }, [value])

        // Every other close path routes through `closeAndReset`; being disabled
        // mid-edit must discard the draft too, or re-enabling and reopening
        // restores a selection the user never committed.
        useEffect(() => {
            if (!disabled) return
            setIsOpen(false)
            setDraftDate(committedDate)
            setPopoverKey((prev) => prev + 1)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [disabled])

        const today = useMemo(() => getTodayInTimezone(timezone), [timezone])

        const displayRange = useMemo<DateRange | undefined>(
            () => (committedDate ? { startDate: committedDate } : undefined),
            [committedDate]
        )
        const draftRange = useMemo<DateRange | undefined>(
            () => (draftDate ? { startDate: draftDate } : undefined),
            [draftDate]
        )

        // `formatConfig` used to drop the component's own time props on the
        // floor: it emitted a time only for `includeTime` and only in its own
        // `timeFormat`, so `showTime` rendered a time selector the trigger
        // never reflected. Seed both from the component and let the config
        // override them. `showSeconds` has no `DateFormatConfig` equivalent,
        // so it stays a popover-readout-only concern here.
        const resolvedFormatConfig = useMemo(
            () =>
                formatConfig && {
                    ...formatConfig,
                    includeTime:
                        isDayGranularity &&
                        (formatConfig.includeTime ?? showTime),
                    timeFormat: formatConfig.timeFormat ?? timeFormat,
                },
            [formatConfig, isDayGranularity, showTime, timeFormat]
        )

        // Without a `formatConfig` the trigger uses the same `dateFormat` as
        // the in-popover readout, plus the time-of-day when one is selectable,
        // so the two never disagree and `placeholder` is honoured in both.
        const displayText = resolvedFormatConfig
            ? formatTriggerDisplay(
                  displayRange,
                  resolvedFormatConfig,
                  true,
                  resolvedPlaceholder,
                  timezone
              )
            : committedDate
              ? `${formatDate(committedDate, resolvedDateFormat, timezone)}${
                    showTimeForGranularity
                        ? ` ${formatTimeValue(
                              timeValueFromDate(committedDate, timezone),
                              {
                                  format: timeFormat,
                                  showSeconds,
                              }
                          )}`
                        : ''
                }`
              : resolvedPlaceholder

        // `minDate` / `maxDate` bound the *day* in the calendar; on the boundary
        // day they also bound the selectable time, otherwise the time columns
        // could push the value back outside the range.
        const timeBoundsFor = useCallback(
            (date: Date) => ({
                minTime:
                    minDate &&
                    isSameCalendarDayInTimezone(date, minDate, timezone)
                        ? timeValueFromDate(minDate, timezone)
                        : undefined,
                maxTime:
                    maxDate &&
                    isSameCalendarDayInTimezone(date, maxDate, timezone)
                        ? timeValueFromDate(maxDate, timezone)
                        : undefined,
            }),
            [minDate, maxDate, timezone]
        )

        const handleDateSelect = useCallback(
            (range: DateRange) => {
                // A no-op for day granularity; for month/year it is what makes
                // the committed value the period's first day rather than
                // whatever day the grid happened to build its cell from.
                const picked = startOfPeriod(range.startDate, granularity)

                if (!showTimeForGranularity) {
                    if (!isDayGranularity) {
                        setDraftDate(picked)
                        return
                    }

                    // CalendarGrid returns start-of-day. When minDate/maxDate
                    // carry a time-of-day on this same day, midnight would sit
                    // outside the caller's range, so clamp here as well.
                    const { minTime, maxTime } = timeBoundsFor(picked)
                    setDraftDate(
                        minTime || maxTime
                            ? applyTimeValueToDate(
                                  picked,
                                  clampTimeValue(
                                      timeValueFromDate(picked, timezone),
                                      minTime,
                                      maxTime
                                  ),
                                  timezone
                              )
                            : picked
                    )
                    return
                }

                // CalendarGrid hands back a start-of-day date, so carry the
                // time-of-day the user already chose over to the new day.
                const carried = draftDate
                    ? timeValueFromDate(draftDate, timezone)
                    : timeValueFromDate(picked, timezone)
                const { minTime, maxTime } = timeBoundsFor(picked)
                setDraftDate(
                    applyTimeValueToDate(
                        picked,
                        clampTimeValue(carried, minTime, maxTime),
                        timezone
                    )
                )
            },
            [
                showTimeForGranularity,
                isDayGranularity,
                draftDate,
                timeBoundsFor,
                timezone,
                granularity,
            ]
        )

        const handleTimeChange = useCallback(
            (next: TimeValue) => {
                if (!draftDate) return
                const { minTime, maxTime } = timeBoundsFor(draftDate)
                setDraftDate(
                    applyTimeValueToDate(
                        draftDate,
                        clampTimeValue(next, minTime, maxTime),
                        timezone
                    )
                )
            },
            [draftDate, timeBoundsFor, timezone]
        )

        // Re-seeds the draft from the committed value on EVERY close, so
        // Apply, Cancel, Clear and Escape all converge on the same invariant:
        // reopening always shows what is actually committed. Without this a
        // controlled parent that rejects an applied value (validation, failed
        // save, or simply not updating `value`) left the trigger and the
        // popover disagreeing permanently, with no way back.
        // Every close re-seeds the draft, so Apply, Cancel, Clear and Escape
        // converge on one invariant: reopening shows what is actually
        // committed. `nextCommitted` must be passed explicitly because this
        // closure captures the PRE-action `committedDate` — after an
        // uncontrolled Apply the new committed value is the draft itself.
        //
        // In controlled mode callers always re-seed from `committedDate`
        // (i.e. `value`): if the parent rejects the change, the popover falls
        // back to the truth instead of holding a value nobody accepted.
        const closeAndReset = useCallback((nextCommitted: Date | undefined) => {
            setDraftDate(nextCommitted)
            setIsOpen(false)
            setPopoverKey((prev) => prev + 1)
        }, [])

        const handleApply = useCallback(() => {
            if (!draftDate) return
            const valueToApply = isDayGranularity
                ? draftDate
                : startOfPeriod(draftDate, granularity)
            if (!isControlled) setInternalDate(valueToApply)
            onChange?.(valueToApply)
            closeAndReset(isControlled ? committedDate : valueToApply)
        }, [
            draftDate,
            granularity,
            isDayGranularity,
            isControlled,
            committedDate,
            onChange,
            closeAndReset,
        ])

        const handleCancel = useCallback(() => {
            closeAndReset(committedDate)
        }, [committedDate, closeAndReset])

        const showClear = Boolean(allowClear && committedDate && !disabled)

        const handleClear = useCallback(() => {
            if (!isControlled) setInternalDate(undefined)
            onChange?.(undefined)
            closeAndReset(isControlled ? committedDate : undefined)
        }, [isControlled, committedDate, onChange, closeAndReset])

        const draftTime = draftDate
            ? timeValueFromDate(draftDate, timezone)
            : MIN_TIME
        // Memoised: TimeColumns keys its option memo on the whole bounds
        // objects, so fresh references here rebuild every column each render.
        const draftTimeBounds = useMemo(
            () =>
                draftDate
                    ? timeBoundsFor(draftDate)
                    : { minTime: undefined, maxTime: undefined },
            [draftDate, timeBoundsFor]
        )

        const trigger = renderPickerTrigger({
            displayText,
            displayRange,
            isOpen,
            isDisabled: disabled,
            size,
            calendarToken,
            foundationTokens,
            triggerConfig,
            onToggle: () => setIsOpen(!isOpen),
            ariaLabel: `Date picker, ${displayText || 'Select date'}`,
            dataDatePicker: 'singleDatePicker-Filter',
            hasError: error,
            // Only reserves layout space. The clear control itself is rendered
            // below as a DOM sibling — nesting a button inside the trigger
            // button is invalid ARIA and unreachable by keyboard.
            showClearSpacer: showClear,
        })

        return (
            <Block
                ref={ref}
                display="flex"
                flexDirection="column"
                width="100%"
                data-datepicker="singleDatePicker"
            >
                <Block position="relative" width="100%" display="flex">
                    <Popover
                        key={popoverKey}
                        open={disabled ? false : isOpen}
                        onOpenChange={(open) => {
                            if (disabled) return
                            // Escape / outside-click never reach handleCancel,
                            // so discard the draft here too. Otherwise the
                            // abandoned selection survives into the next open
                            // and a single Apply commits a date the user
                            // explicitly walked away from.
                            if (!open) {
                                closeAndReset(committedDate)
                                return
                            }
                            setIsOpen(open)
                        }}
                        trigger={
                            errorMessage
                                ? cloneElement(
                                      trigger as ReactElement<{
                                          'aria-describedby'?: string
                                      }>,
                                      { 'aria-describedby': errorId }
                                  )
                                : trigger
                        }
                        side={popoverConfig?.side || 'bottom'}
                        align={popoverConfig?.align || 'start'}
                        sideOffset={popoverConfig?.sideOffset ?? 4}
                        shadow="sm"
                    >
                        {/*
                         * `role="group"`, not `role="dialog"`: Radix's
                         * `Popover.Content` already renders a `dialog` around
                         * these children, and nesting a second one made screen
                         * readers announce two dialogs for one popup.
                         */}
                        <Block
                            role="group"
                            aria-label={granularityDefaults.ariaLabel}
                            style={{ ...calendarToken.calendar }}
                            maxHeight="var(--radix-popper-available-height)"
                            display="flex"
                            flexDirection="column"
                            overflow="hidden"
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                gap={
                                    calendarToken?.calendar?.header?.dateInput
                                        ?.gap
                                }
                                paddingX={
                                    calendarToken?.calendar?.header?.padding?.x
                                }
                                paddingY={
                                    calendarToken?.calendar?.header?.padding?.y
                                }
                            >
                                <PrimitiveText
                                    as="span"
                                    color={
                                        calendarToken?.calendar?.header
                                            ?.dateInput?.label?.color
                                    }
                                    fontSize={
                                        calendarToken?.calendar?.header
                                            ?.dateInput?.label?.fontSize
                                    }
                                    fontWeight={
                                        calendarToken?.calendar?.header
                                            ?.dateInput?.label?.fontWeight
                                    }
                                >
                                    {granularityDefaults.label}
                                </PrimitiveText>
                                <PrimitiveText
                                    as="span"
                                    data-element="single-date-readout"
                                    color={
                                        calendarToken?.calendar?.header
                                            ?.dateInput?.label?.color
                                    }
                                    fontSize={
                                        calendarToken?.calendar?.header
                                            ?.dateInput?.label?.fontSize
                                    }
                                >
                                    {draftDate
                                        ? formatDate(
                                              draftDate,
                                              resolvedDateFormat,
                                              timezone
                                          )
                                        : resolvedPlaceholder}
                                </PrimitiveText>
                            </Block>

                            <Block flexGrow={1} minHeight={0} overflow="auto">
                                {granularity === 'day' ? (
                                    <CalendarGrid
                                        selectedRange={draftRange}
                                        onDateSelect={handleDateSelect}
                                        today={today}
                                        customDisableDates={disableDates}
                                        showDateTimePicker={
                                            showTimeForGranularity
                                        }
                                        resetScrollPosition={popoverKey}
                                        timezone={timezone}
                                        isSingleDatePicker
                                        minDate={minDate}
                                        maxDate={maxDate}
                                    />
                                ) : (
                                    <MonthYearGrid
                                        granularity={granularity}
                                        selectedRange={draftRange}
                                        onSelect={(periodStart) =>
                                            handleDateSelect({
                                                startDate: periodStart,
                                            })
                                        }
                                        today={today}
                                        timezone={timezone}
                                        customDisableDates={disableDates}
                                        resetScrollPosition={popoverKey}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                    />
                                )}
                            </Block>

                            {showTimeForGranularity && (
                                <Block
                                    display="flex"
                                    flexDirection="column"
                                    gap={timePickerToken.dropdown.column.gap}
                                    paddingX={
                                        calendarToken?.calendar?.footer?.padding
                                            ?.x
                                    }
                                    paddingY={
                                        calendarToken?.calendar?.footer?.padding
                                            ?.y
                                    }
                                    borderTop={
                                        calendarToken?.calendar?.footer
                                            ?.borderTop
                                    }
                                    // Foreground comes from TIME_PICKER, so
                                    // the background must too — otherwise dark
                                    // option text lands on the light-only
                                    // CALENDAR panel (~1.13:1 contrast).
                                    backgroundColor={
                                        timePickerToken.dropdown.backgroundColor
                                    }
                                >
                                    <PrimitiveText
                                        as="span"
                                        id={`${timeColumnsId}-readout`}
                                        color={
                                            calendarToken?.calendar?.header
                                                ?.dateInput?.label?.color
                                        }
                                        fontSize={
                                            calendarToken?.calendar?.header
                                                ?.dateInput?.label?.fontSize
                                        }
                                        fontWeight={
                                            calendarToken?.calendar?.header
                                                ?.dateInput?.label?.fontWeight
                                        }
                                    >
                                        {formatTimeValue(draftTime, {
                                            format: timeFormat,
                                            showSeconds,
                                        })}
                                    </PrimitiveText>
                                    <TimeColumns
                                        value={draftTime}
                                        onChange={handleTimeChange}
                                        format={timeFormat}
                                        showSeconds={showSeconds}
                                        minTime={draftTimeBounds.minTime}
                                        maxTime={draftTimeBounds.maxTime}
                                        size={size}
                                        tokens={timePickerToken}
                                        disabled={!draftDate}
                                        idPrefix={timeColumnsId}
                                    />
                                </Block>
                            )}

                            <Block
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-end"
                                paddingX={
                                    calendarToken?.calendar?.footer?.padding?.x
                                }
                                paddingY={
                                    calendarToken?.calendar?.footer?.padding?.y
                                }
                                borderTop={
                                    calendarToken?.calendar?.footer?.borderTop
                                }
                            >
                                <Block
                                    display="flex"
                                    gap={calendarToken?.calendar?.footer?.gap}
                                >
                                    <Button
                                        buttonType={ButtonType.SECONDARY}
                                        size={ButtonSize.SMALL}
                                        onClick={handleCancel}
                                        text="Cancel"
                                    />
                                    <Button
                                        buttonType={ButtonType.PRIMARY}
                                        size={ButtonSize.SMALL}
                                        onClick={handleApply}
                                        text="Apply"
                                        disabled={!draftDate}
                                    />
                                </Block>
                            </Block>
                        </Block>
                    </Popover>
                    {showClear && (
                        <Block
                            position="absolute"
                            top="0"
                            bottom="0"
                            display="flex"
                            alignItems="center"
                            style={{
                                // Sits over the space reserved by
                                // `showClearSpacer`, just left of the chevron.
                                right: `calc(${
                                    calendarToken?.trigger?.dateInput
                                        ?.padding?.[
                                        size as keyof CalendarTokenType['trigger']['dateInput']['padding']
                                    ]?.x ?? FOUNDATION_THEME.unit[0]
                                } + ${
                                    (calendarToken?.trigger?.dateInput
                                        ?.iconSize as string) ??
                                    FOUNDATION_THEME.unit[16]
                                } + ${
                                    (calendarToken?.trigger?.dateInput
                                        ?.gap as string) ??
                                    FOUNDATION_THEME.unit[8]
                                })`,
                            }}
                        >
                            <PickerClearButton
                                onClear={handleClear}
                                calendarToken={calendarToken}
                            />
                        </Block>
                    )}
                </Block>

                {/*
                 * Styled from TIME_PICKER, not CALENDAR: CALENDAR has no error
                 * slot, and sharing TimePicker's keeps the two error texts
                 * identical. Documented on the `errorMessage` prop because
                 * overriding TIME_PICKER silently restyles this too.
                 */}
                {errorMessage && (
                    <PrimitiveText
                        as="span"
                        id={errorId}
                        role="alert"
                        data-element="singledatepicker-error"
                        color={timePickerToken.errorMessage.color}
                        fontSize={timePickerToken.errorMessage.fontSize}
                        fontWeight={timePickerToken.errorMessage.fontWeight}
                        style={{
                            marginTop: timePickerToken.errorMessage
                                .marginTop as string,
                        }}
                    >
                        {errorMessage}
                    </PrimitiveText>
                )}
            </Block>
        )
    }
)

SingleDatePicker.displayName = 'SingleDatePicker'

export default SingleDatePicker
