import React, {
    forwardRef,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useState,
} from 'react'
import { Clock } from 'lucide-react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import Popover from '../Popover/Popover'
import TimeColumns from './TimeColumns'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { renderPickerTrigger } from '../shared/datetime/PickerTrigger'
import type { CalendarTokenType } from '../DateRangePicker/dateRangePicker.tokens'
import type { DateRangePickerSize } from '../DateRangePicker/types'
import type { TimePickerTokensType } from './timePicker.tokens.types'
import { TimePickerSize, type TimePickerProps } from './timePicker.types'
import {
    type TimeValue,
    clampTimeValue,
    sanitizeStep,
    isTimeWithinBounds,
    MIN_TIME,
    SECONDS_PER_DAY,
    formatTimeValue,
    getTimePlaceholder,
    secondsToTimeValue,
    snapToMinuteStep,
    timeValueToSeconds,
    timeValueToString,
} from '../shared/datetime/timeCore'

/**
 * `snapToMinuteStep` rounds to the *nearest* slot, which rolls into the next
 * hour once the minute passes the last slot of the current one (e.g. 09:55
 * with a 15-minute step becomes 10:00). Doing that here would silently
 * override the hour the user just clicked, and land on a minute the minutes
 * column never offered, so the rounding is kept inside the current hour.
 */
const snapWithinHour = (time: TimeValue, stepMinutes: number): TimeValue => {
    // Sanitize exactly as `snapToMinuteStep` does. Using the raw prop here let
    // `minuteStep={Infinity}` / `NaN` / `0` produce `minutes: NaN`, which then
    // survived clamping and serialized as "09:NaN" into the hidden form input.
    // Shared with every other step consumer so a future fix reaches them all.
    const step = sanitizeStep(stepMinutes)
    const snapped = snapToMinuteStep(time, step)
    if (snapped.hours === time.hours) return snapped
    return { ...time, minutes: Math.floor(59 / step) * step }
}

/** 23:59:00 — the last whole minute of the day. */
const LAST_WHOLE_MINUTE_SECONDS = SECONDS_PER_DAY - 60

/**
 * With the seconds column hidden every selectable time has `seconds: 0`, so a
 * bound carrying non-zero seconds has no exact representation: `minTime`
 * `09:00:30` would leave minute `00` disabled while still allowing a value of
 * `09:00:30` that the `"HH:mm"` form input truncates to an out-of-bounds
 * `"09:00"`.
 *
 * Rather than let the disabled state, the clamped value and the serialized
 * value disagree, the bounds are *tightened* to whole minutes — `minTime`
 * rounds up, `maxTime` rounds down. Widening instead would offer times the
 * caller explicitly excluded.
 *
 * A `minTime` inside the final minute of the day has no whole minute at or
 * above it, so it saturates at 23:59.
 */
const roundBoundToMinute = (
    totalSeconds: number | undefined,
    direction: 'up' | 'down',
    showSeconds: boolean
): TimeValue | undefined => {
    if (totalSeconds === undefined) return undefined
    if (showSeconds) return secondsToTimeValue(totalSeconds)

    const floored = totalSeconds - (totalSeconds % 60)
    if (floored === totalSeconds || direction === 'down') {
        return secondsToTimeValue(floored)
    }
    return secondsToTimeValue(Math.min(floored + 60, LAST_WHOLE_MINUTE_SECONDS))
}

/**
 * A time-of-day picker: the shared picker trigger plus a popover of
 * `listbox` columns.
 *
 * The trigger deliberately reads from the `CALENDAR` token slot rather than
 * `TIME_PICKER` — DateRangePicker, SingleDatePicker and TimePicker must be
 * pixel-identical as form controls, so they all share one trigger sub-tree.
 * `TIME_PICKER` owns the dropdown and the error message only.
 *
 * Only branch 4 of `renderPickerTrigger` is ever used here: `displayRange` is
 * always `undefined` and no `triggerConfig` / `triggerElement` /
 * `isMobileDrawer` is passed, so branches 1-3 (custom render, caller-supplied
 * element, mobile drawer button) are unreachable by construction. TimePicker
 * has no date range to hand a custom renderer in the first place.
 */
const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
    (
        {
            value,
            onChange,
            format = '12h',
            showSeconds = false,
            minuteStep = 1,
            minTime,
            maxTime,
            disabled = false,
            error = false,
            errorMessage,
            size = TimePickerSize.MEDIUM,
            placeholder,
            name,
            'aria-label': ariaLabel,
        },
        ref
    ) => {
        const calendarToken = useResponsiveTokens<CalendarTokenType>('CALENDAR')
        const timeToken =
            useResponsiveTokens<TimePickerTokensType>('TIME_PICKER')

        const baseId = useId()
        const errorId = `${baseId}-error`

        const [isOpen, setIsOpen] = useState(false)

        // Bounds are normalised once, here, so the disabled options, the
        // clamped value and the serialized form value all read the same range.
        const minBoundSeconds = minTime
            ? timeValueToSeconds(minTime)
            : undefined
        const maxBoundSeconds = maxTime
            ? timeValueToSeconds(maxTime)
            : undefined

        const effectiveMinTime = useMemo(
            () => roundBoundToMinute(minBoundSeconds, 'up', showSeconds),
            [minBoundSeconds, showSeconds]
        )
        const roundedMaxTime = useMemo(
            () => roundBoundToMinute(maxBoundSeconds, 'down', showSeconds),
            [maxBoundSeconds, showSeconds]
        )

        // Two different situations look alike after rounding, and they need
        // opposite handling:
        //
        //  1. The caller genuinely inverted the bounds (raw min > raw max).
        //     Every option would be disabled and the listboxes keyboard-dead,
        //     so follow `clampTimeValue`'s documented "the min wins" and drop
        //     the contradictory max.
        //
        //  2. The raw bounds are valid but span no whole minute (e.g.
        //     09:00:30 -> 09:00:45 with `showSeconds` off). Rounding inverts
        //     them. Dropping the max here would silently widen the range to
        //     end-of-day — the exact thing `roundBoundToMinute` exists to
        //     prevent — so collapse to the single minute at `effectiveMinTime`
        //     instead. That never offers a time before the caller's minimum.
        const rawBoundsInverted =
            minBoundSeconds !== undefined &&
            maxBoundSeconds !== undefined &&
            maxBoundSeconds < minBoundSeconds

        const effectiveMaxTime = useMemo(() => {
            if (!effectiveMinTime || !roundedMaxTime) return roundedMaxTime
            if (
                timeValueToSeconds(roundedMaxTime) >=
                timeValueToSeconds(effectiveMinTime)
            ) {
                return roundedMaxTime
            }
            return rawBoundsInverted ? undefined : effectiveMinTime
        }, [effectiveMinTime, roundedMaxTime, rawBoundsInverted])

        // Uncontrolled draft. Exists so the columns always have a value to
        // render against; it is never the source of truth for a consumer,
        // which observes selections through `onChange` alone.
        const [draft, setDraft] = useState<TimeValue>(() =>
            clampTimeValue(MIN_TIME, effectiveMinTime, effectiveMaxTime)
        )
        const [hasDraftSelection, setHasDraftSelection] = useState(false)

        const isControlled = value !== undefined

        // Bounds usually arrive *after* mount — "end time must be after start
        // time" moves `minTime` on every start-time edit — so a draft clamped
        // only at mount would sit on a now-disabled option.
        useEffect(() => {
            if (isControlled) return
            setDraft((current) =>
                isTimeWithinBounds(current, effectiveMinTime, effectiveMaxTime)
                    ? current
                    : clampTimeValue(
                          current,
                          effectiveMinTime,
                          effectiveMaxTime
                      )
            )
        }, [isControlled, effectiveMinTime, effectiveMaxTime])

        // A controlled `value` outside the bounds is clamped for display, for
        // the columns and for the hidden input. Nothing is emitted: clamping
        // on the way in is presentation, and firing `onChange` for a value the
        // consumer set itself would be a surprise write-back.
        const valueSeconds = value ? timeValueToSeconds(value) : undefined
        const clampedValue = useMemo(
            () =>
                valueSeconds === undefined
                    ? undefined
                    : clampTimeValue(
                          secondsToTimeValue(valueSeconds),
                          effectiveMinTime,
                          effectiveMaxTime
                      ),
            [valueSeconds, effectiveMinTime, effectiveMaxTime]
        )

        const columnValue = clampedValue ?? draft

        // The trigger stays on the placeholder until there is a real
        // selection — an untouched draft is scaffolding, not a value.
        const displayValue = isControlled
            ? clampedValue
            : hasDraftSelection
              ? draft
              : undefined

        const displayText = displayValue
            ? formatTimeValue(displayValue, { format, showSeconds })
            : (placeholder ?? getTimePlaceholder({ format, showSeconds }))

        const handleChange = useCallback(
            (next: TimeValue) => {
                const snapped =
                    minuteStep > 1 ? snapWithinHour(next, minuteStep) : next
                const clamped = clampTimeValue(
                    snapped,
                    effectiveMinTime,
                    effectiveMaxTime
                )

                if (!isControlled) {
                    setDraft(clamped)
                    setHasDraftSelection(true)
                }
                onChange?.(clamped)
            },
            [
                isControlled,
                effectiveMaxTime,
                effectiveMinTime,
                minuteStep,
                onChange,
            ]
        )

        const triggerElement = renderPickerTrigger({
            displayText,
            // TimePicker has no date range, so branches 1-3 never run.
            displayRange: undefined,
            isOpen,
            isDisabled: disabled,
            size: size as unknown as DateRangePickerSize,
            calendarToken,
            onToggle: () => setIsOpen((open) => !open),
            ariaLabel: ariaLabel ?? `Time picker, ${displayText}`,
            dataDatePicker: 'timePicker-Filter',
            defaultIcon: (
                <Clock size={calendarToken?.trigger?.dateInput?.iconSize} />
            ),
            hasError: error,
        })

        const trigger = errorMessage
            ? React.cloneElement(
                  triggerElement as React.ReactElement<{
                      'aria-describedby'?: string
                  }>,
                  { 'aria-describedby': errorId }
              )
            : triggerElement

        return (
            <Block
                ref={ref}
                display="flex"
                flexDirection="column"
                width="100%"
                data-component="TimePicker"
            >
                <Popover
                    open={disabled ? false : isOpen}
                    onOpenChange={(next) => {
                        if (disabled) return
                        setIsOpen(next)
                    }}
                    trigger={trigger}
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    shadow="sm"
                >
                    {/*
                     * `role="group"`, not `role="dialog"`: Radix's
                     * `Popover.Content` already renders a `dialog` around
                     * these children, and nesting a second one made screen
                     * readers announce two dialogs for one popup. `group`
                     * keeps the columns named without inventing a landmark.
                     */}
                    <Block
                        role="group"
                        aria-label="Choose time"
                        backgroundColor={timeToken.dropdown.backgroundColor}
                        border={timeToken.dropdown.border}
                        borderRadius={timeToken.dropdown.borderRadius}
                        boxShadow={timeToken.dropdown.boxShadow}
                        padding={timeToken.dropdown.padding as string | number}
                    >
                        <TimeColumns
                            value={columnValue}
                            onChange={handleChange}
                            format={format}
                            showSeconds={showSeconds}
                            minuteStep={minuteStep}
                            minTime={effectiveMinTime}
                            maxTime={effectiveMaxTime}
                            size={size}
                            tokens={timeToken}
                            disabled={disabled}
                            idPrefix={`${baseId}-time`}
                        />
                    </Block>
                </Popover>

                {name && (
                    <input
                        type="hidden"
                        name={name}
                        value={
                            displayValue
                                ? timeValueToString(displayValue, showSeconds)
                                : ''
                        }
                    />
                )}

                {errorMessage && (
                    <PrimitiveText
                        as="span"
                        id={errorId}
                        role="alert"
                        color={timeToken.errorMessage.color}
                        fontSize={timeToken.errorMessage.fontSize}
                        fontWeight={timeToken.errorMessage.fontWeight}
                        style={{
                            marginTop: timeToken.errorMessage
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

TimePicker.displayName = 'TimePicker'

export default TimePicker
