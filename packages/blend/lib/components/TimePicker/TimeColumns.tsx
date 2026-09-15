import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import type { TimePickerTokensType } from './timePicker.tokens.types'
import {
    type TimeFormat,
    type TimeValue,
    from12Hour,
    generateHourOptions,
    generateMinuteOptions,
    generateSecondOptions,
    isTimeWithinBounds,
    MAX_TIME,
    to12Hour,
    timeValueToSeconds,
} from '../shared/datetime/timeCore'

export type TimeColumnsSize = 'sm' | 'md' | 'lg'

export type TimeColumnsProps = {
    value: TimeValue
    onChange: (next: TimeValue) => void
    format?: TimeFormat
    showSeconds?: boolean
    minuteStep?: number
    minTime?: TimeValue
    maxTime?: TimeValue
    size?: TimeColumnsSize
    tokens: TimePickerTokensType
    disabled?: boolean
    /** Prefix for the generated option ids used by `aria-activedescendant`. */
    idPrefix: string
}

type ColumnKind = 'hour' | 'minute' | 'second' | 'period'

type ColumnOption = {
    /** Raw value: 0-23 / 0-59 for numeric columns, 0=AM 1=PM for period. */
    raw: number
    label: string
    disabled: boolean
}

const COLUMN_LABELS: Record<ColumnKind, string> = {
    hour: 'Hours',
    minute: 'Minutes',
    second: 'Seconds',
    period: 'AM/PM',
}

const pad = (n: number) => n.toString().padStart(2, '0')

/**
 * A time-of-day selector rendered as one `listbox` per unit.
 *
 * Shared by `TimePicker` and by `SingleDatePicker`'s optional time section, so
 * both get the same bounds handling, keyboard model and ARIA semantics.
 *
 * Each column is a single tab stop driven by `aria-activedescendant` rather
 * than a roving tabindex — with up to 60 options per column, moving real DOM
 * focus per keystroke is both slower and noisier for screen readers.
 */
const TimeColumns = ({
    value,
    onChange,
    format = '12h',
    showSeconds = false,
    minuteStep = 1,
    minTime,
    maxTime,
    size = 'md',
    tokens,
    disabled = false,
    idPrefix,
}: TimeColumnsProps) => {
    const optionTokens = tokens.dropdown.option
    const columnTokens = tokens.dropdown.column

    // ---- Bounds helpers ----------------------------------------------------

    /** True when any second within [from, to] is selectable. */
    const rangeIsSelectable = useCallback(
        (from: TimeValue, to: TimeValue): boolean => {
            const lo = timeValueToSeconds(from)
            const hi = timeValueToSeconds(to)
            const minSec = minTime ? timeValueToSeconds(minTime) : 0
            const maxSec = maxTime
                ? timeValueToSeconds(maxTime)
                : timeValueToSeconds(MAX_TIME)
            return lo <= maxSec && hi >= minSec
        },
        [minTime, maxTime]
    )

    const isHourSelectable = useCallback(
        (hours: number) =>
            rangeIsSelectable(
                { hours, minutes: 0, seconds: 0 },
                { hours, minutes: 59, seconds: 59 }
            ),
        [rangeIsSelectable]
    )

    // ---- Column definitions ------------------------------------------------

    const columns = useMemo(() => {
        const list: { kind: ColumnKind; options: ColumnOption[] }[] = []

        const hourValues = generateHourOptions(format)
        const { period: currentPeriod } = to12Hour(value.hours)

        list.push({
            kind: 'hour',
            options: hourValues.map((displayHour) => {
                const actual =
                    format === '24h'
                        ? displayHour
                        : from12Hour(displayHour, currentPeriod)
                return {
                    raw: actual,
                    label: format === '24h' ? pad(actual) : String(displayHour),
                    disabled: !isHourSelectable(actual),
                }
            }),
        })

        list.push({
            kind: 'minute',
            options: generateMinuteOptions(minuteStep).map((minutes) => ({
                raw: minutes,
                label: pad(minutes),
                disabled: !rangeIsSelectable(
                    { hours: value.hours, minutes, seconds: 0 },
                    {
                        hours: value.hours,
                        minutes,
                        seconds: showSeconds ? 59 : 0,
                    }
                ),
            })),
        })

        if (showSeconds) {
            list.push({
                kind: 'second',
                options: generateSecondOptions().map((seconds) => ({
                    raw: seconds,
                    label: pad(seconds),
                    disabled: !isTimeWithinBounds(
                        { hours: value.hours, minutes: value.minutes, seconds },
                        minTime,
                        maxTime
                    ),
                })),
            })
        }

        if (format === '12h') {
            list.push({
                kind: 'period',
                options: (['AM', 'PM'] as const).map((label, index) => ({
                    raw: index,
                    label,
                    disabled: !rangeIsSelectable(
                        { hours: index === 0 ? 0 : 12, minutes: 0, seconds: 0 },
                        {
                            hours: index === 0 ? 11 : 23,
                            minutes: 59,
                            seconds: 59,
                        }
                    ),
                })),
            })
        }

        return list
    }, [
        format,
        showSeconds,
        minuteStep,
        value.hours,
        value.minutes,
        minTime,
        maxTime,
        isHourSelectable,
        rangeIsSelectable,
    ])

    /** The currently-selected raw value for a given column. */
    const selectedRawFor = useCallback(
        (kind: ColumnKind): number => {
            switch (kind) {
                case 'hour':
                    return value.hours
                case 'minute':
                    return value.minutes
                case 'second':
                    return value.seconds
                case 'period':
                    return value.hours >= 12 ? 1 : 0
            }
        },
        [value]
    )

    const commit = useCallback(
        (kind: ColumnKind, raw: number) => {
            if (disabled) return
            let next: TimeValue
            switch (kind) {
                case 'hour':
                    next = { ...value, hours: raw }
                    break
                case 'minute':
                    next = { ...value, minutes: raw }
                    break
                case 'second':
                    next = { ...value, seconds: raw }
                    break
                case 'period': {
                    const { hour } = to12Hour(value.hours)
                    next = {
                        ...value,
                        hours: from12Hour(hour, raw === 1 ? 'PM' : 'AM'),
                    }
                    break
                }
            }
            onChange(next)
        },
        [disabled, onChange, value]
    )

    return (
        <Block
            display="flex"
            gap={tokens.dropdown.gap}
            data-element="time-columns"
        >
            {columns.map((column, columnIndex) => (
                <TimeColumn
                    key={column.kind}
                    kind={column.kind}
                    options={column.options}
                    selectedRaw={selectedRawFor(column.kind)}
                    onSelect={(raw) => commit(column.kind, raw)}
                    tokens={tokens}
                    optionTokens={optionTokens}
                    columnTokens={columnTokens}
                    size={size}
                    disabled={disabled}
                    idPrefix={`${idPrefix}-${column.kind}`}
                    showSeparator={columnIndex > 0}
                />
            ))}
        </Block>
    )
}

type TimeColumnProps = {
    kind: ColumnKind
    options: ColumnOption[]
    selectedRaw: number
    onSelect: (raw: number) => void
    tokens: TimePickerTokensType
    optionTokens: TimePickerTokensType['dropdown']['option']
    columnTokens: TimePickerTokensType['dropdown']['column']
    size: TimeColumnsSize
    disabled: boolean
    idPrefix: string
    showSeparator: boolean
}

const TimeColumn = ({
    kind,
    options,
    selectedRaw,
    onSelect,
    tokens,
    optionTokens,
    columnTokens,
    size,
    disabled,
    idPrefix,
    showSeparator,
}: TimeColumnProps) => {
    const listRef = useRef<HTMLDivElement>(null)
    const optionRefs = useRef<Map<number, HTMLDivElement>>(new Map())

    /**
     * A value can legitimately sit off the option grid — `minuteStep={7}` with
     * a value of `:30`, for instance — and snapping it here would fire an
     * `onChange` the user never asked for. So the *display* falls back to the
     * nearest option instead: `aria-activedescendant` and `aria-selected`
     * agree on exactly one option, which is what a listbox has to expose even
     * when the underlying value is between two slots.
     */
    const selectedIndex = useMemo(() => {
        if (options.length === 0) return -1
        const exact = options.findIndex((option) => option.raw === selectedRaw)
        if (exact !== -1) return exact

        let nearest = 0
        let nearestDistance = Number.POSITIVE_INFINITY
        options.forEach((option, index) => {
            const distance = Math.abs(option.raw - selectedRaw)
            if (distance < nearestDistance) {
                nearestDistance = distance
                nearest = index
            }
        })
        return nearest
    }, [options, selectedRaw])

    const activeId =
        selectedIndex === -1
            ? undefined
            : `${idPrefix}-option-${options[selectedIndex].raw}`

    // Keep the selected option visible without scrolling the whole popover.
    useEffect(() => {
        const node = optionRefs.current.get(options[selectedIndex]?.raw)
        const list = listRef.current
        if (!node || !list) return
        const nodeTop = node.offsetTop
        const nodeBottom = nodeTop + node.offsetHeight
        if (nodeTop < list.scrollTop) {
            list.scrollTop = nodeTop
        } else if (nodeBottom > list.scrollTop + list.clientHeight) {
            list.scrollTop = nodeBottom - list.clientHeight
        }
    }, [selectedIndex, options])

    const moveTo = useCallback(
        (startIndex: number, step: 1 | -1, allowReverse = false) => {
            // Skip over out-of-bounds options rather than landing on them.
            const scan = (from: number, direction: 1 | -1): boolean => {
                for (
                    let i = from;
                    i >= 0 && i < options.length;
                    i += direction
                ) {
                    if (!options[i].disabled) {
                        onSelect(options[i].raw)
                        return true
                    }
                }
                return false
            }

            if (scan(startIndex, step)) return
            // Only the paging keys reverse: they jump a fixed distance and can
            // land inside a fully-disabled tail, where doing nothing feels
            // broken. Arrow/Home/End keep strict directional semantics — an
            // ArrowUp at the top boundary must NOT bounce back down.
            if (allowReverse) scan(startIndex, step === 1 ? -1 : 1)
        },
        [options, onSelect]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (disabled) return
            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault()
                    moveTo(selectedIndex + 1, 1)
                    break
                case 'ArrowUp':
                    e.preventDefault()
                    moveTo(selectedIndex - 1, -1)
                    break
                case 'Home':
                    e.preventDefault()
                    moveTo(0, 1)
                    break
                case 'End':
                    e.preventDefault()
                    moveTo(options.length - 1, -1)
                    break
                case 'PageDown':
                    e.preventDefault()
                    moveTo(
                        Math.min(options.length - 1, selectedIndex + 5),
                        1,
                        true
                    )
                    break
                case 'PageUp':
                    e.preventDefault()
                    moveTo(Math.max(0, selectedIndex - 5), -1, true)
                    break
                default:
                    break
            }
        },
        [disabled, moveTo, options.length, selectedIndex]
    )

    return (
        <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={columnTokens.gap}
            style={
                showSeparator
                    ? { borderLeft: columnTokens.separator as string }
                    : undefined
            }
            paddingLeft={showSeparator ? tokens.dropdown.gap : undefined}
        >
            <PrimitiveText
                as="span"
                id={`${idPrefix}-label`}
                color={columnTokens.header.color}
                fontSize={columnTokens.header.fontSize}
                fontWeight={columnTokens.header.fontWeight}
                style={{ paddingBlock: columnTokens.header.paddingY as string }}
            >
                {COLUMN_LABELS[kind]}
            </PrimitiveText>
            <Block
                ref={listRef}
                role="listbox"
                aria-labelledby={`${idPrefix}-label`}
                aria-activedescendant={activeId}
                aria-disabled={disabled || undefined}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                data-element={`time-column-${kind}`}
                width={columnTokens.width}
                maxHeight={tokens.dropdown.maxHeight}
                overflow="auto"
                display="flex"
                flexDirection="column"
                gap={columnTokens.gap}
                _focusVisible={{ outline: optionTokens.focusOutline as string }}
            >
                {options.map((option, index) => {
                    const isSelected = index === selectedIndex
                    return (
                        <Block
                            key={option.raw}
                            ref={(node: HTMLDivElement | null) => {
                                if (node)
                                    optionRefs.current.set(option.raw, node)
                                else optionRefs.current.delete(option.raw)
                            }}
                            id={`${idPrefix}-option-${option.raw}`}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={option.disabled || undefined}
                            data-element="time-option"
                            data-selected={isSelected ? 'true' : 'false'}
                            onClick={() => {
                                if (!option.disabled && !disabled)
                                    onSelect(option.raw)
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexShrink={0}
                            height={optionTokens.height}
                            paddingX={optionTokens.paddingX}
                            borderRadius={optionTokens.borderRadius}
                            backgroundColor={
                                option.disabled
                                    ? optionTokens.backgroundColor.disabled
                                    : isSelected
                                      ? optionTokens.backgroundColor.selected
                                      : optionTokens.backgroundColor.default
                            }
                            color={
                                option.disabled
                                    ? optionTokens.color.disabled
                                    : isSelected
                                      ? optionTokens.color.selected
                                      : optionTokens.color.default
                            }
                            style={{
                                fontSize: optionTokens.fontSize[size] as string,
                                fontWeight: optionTokens.fontWeight as number,
                                cursor:
                                    option.disabled || disabled
                                        ? 'not-allowed'
                                        : 'pointer',
                            }}
                            _hover={
                                option.disabled || disabled || isSelected
                                    ? undefined
                                    : {
                                          backgroundColor: optionTokens
                                              .backgroundColor.hover as string,
                                      }
                            }
                        >
                            {option.label}
                        </Block>
                    )
                })}
            </Block>
        </Block>
    )
}

TimeColumns.displayName = 'TimeColumns'

export default TimeColumns
