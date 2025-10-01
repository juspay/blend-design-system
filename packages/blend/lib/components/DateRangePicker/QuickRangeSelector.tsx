import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { DateRangePreset, DateRangePickerSize } from './types'
import { getPresetLabel } from './utils'
import { CalendarTokenType } from './dateRangePicker.tokens'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import SingleSelect from '../SingleSelect/SingleSelect'
import {
    SelectMenuGroupType,
    SelectMenuSize,
    SelectMenuVariant,
} from '../SingleSelect/types'

type QuickRangeSelectorProps = {
    isOpen: boolean
    onToggle: () => void
    activePreset: DateRangePreset
    onPresetSelect: (preset: DateRangePreset) => void
    excludeCustom?: boolean
    className?: string
    disableFutureDates?: boolean
    disablePastDates?: boolean
    isDisabled?: boolean
    size?: DateRangePickerSize
    maxMenuHeight?: number
}

const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(
    (
        {
            activePreset,
            onPresetSelect,
            excludeCustom = false,
            className,
            disableFutureDates = false,
            disablePastDates = false,
            isDisabled = false,
            size = DateRangePickerSize.MEDIUM,
            maxMenuHeight = 200,
        },
        ref
    ) => {
        const responsiveCalendarTokens =
            useResponsiveTokens<CalendarTokenType>('CALENDAR')
        const calendarToken = responsiveCalendarTokens

        const getFilteredPresets = () => {
            const pastPresets = [
                DateRangePreset.YESTERDAY,
                DateRangePreset.LAST_30_MINS,
                DateRangePreset.LAST_1_HOUR,
                DateRangePreset.LAST_6_HOURS,
                DateRangePreset.LAST_24_HOURS,
                DateRangePreset.LAST_7_DAYS,
                DateRangePreset.LAST_30_DAYS,
                DateRangePreset.LAST_3_MONTHS,
                DateRangePreset.LAST_12_MONTHS,
            ]

            const futurePresets = [
                DateRangePreset.TOMORROW,
                DateRangePreset.NEXT_7_DAYS,
                DateRangePreset.NEXT_30_DAYS,
                DateRangePreset.NEXT_3_MONTHS,
                DateRangePreset.NEXT_12_MONTHS,
            ]

            const neutralPresets = [DateRangePreset.TODAY]

            let availablePresets = [...neutralPresets]

            if (!disablePastDates) {
                availablePresets = [...availablePresets, ...pastPresets]
            }

            if (!disableFutureDates) {
                availablePresets = [...availablePresets, ...futurePresets]
            }

            if (!excludeCustom) {
                availablePresets.push(DateRangePreset.CUSTOM)
            }

            return availablePresets
        }

        const filteredPresets = getFilteredPresets()

        const selectItems: SelectMenuGroupType[] = [
            {
                items: filteredPresets.map((preset) => ({
                    label: getPresetLabel(preset),
                    value: preset,
                })),
            },
        ]

        const handlePresetSelect = (value: string) => {
            if (!isDisabled) {
                onPresetSelect(value as DateRangePreset)
            }
        }

        const getSelectSize = (
            pickerSize: DateRangePickerSize
        ): SelectMenuSize => {
            switch (pickerSize) {
                case DateRangePickerSize.SMALL:
                    return SelectMenuSize.SMALL
                case DateRangePickerSize.LARGE:
                    return SelectMenuSize.LARGE
                case DateRangePickerSize.MEDIUM:
                default:
                    return SelectMenuSize.MEDIUM
            }
        }

        return (
            <Block
                position="relative"
                ref={ref}
                className={className}
                style={{
                    borderLeft: isDisabled
                        ? calendarToken.quickRange.trigger.disabled.borderLeft
                        : calendarToken.quickRange.trigger.borderLeft,
                    borderTop: isDisabled
                        ? calendarToken.quickRange.trigger.disabled.borderTop
                        : calendarToken.quickRange.trigger.borderTop,
                    borderBottom: isDisabled
                        ? calendarToken.quickRange.trigger.disabled.borderBottom
                        : calendarToken.quickRange.trigger.borderBottom,
                    borderTopLeftRadius:
                        calendarToken.quickRange.trigger.borderTopLeftRadius,
                    borderBottomLeftRadius:
                        calendarToken.quickRange.trigger.borderBottomLeftRadius,
                    backgroundColor:
                        calendarToken.quickRange.trigger.backgroundColor,
                }}
            >
                <SingleSelect
                    placeholder={getPresetLabel(activePreset)}
                    items={selectItems}
                    selected={activePreset}
                    onSelect={handlePresetSelect}
                    disabled={isDisabled}
                    size={getSelectSize(size)}
                    variant={SelectMenuVariant.NO_CONTAINER}
                    useDrawerOnMobile={false}
                    customTrigger={
                        <Block
                            style={{
                                display:
                                    calendarToken.quickRange.trigger.display,
                                justifyContent:
                                    calendarToken.quickRange.trigger
                                        .justifyContent,
                                alignItems:
                                    calendarToken.quickRange.trigger.alignItems,
                                cursor: isDisabled
                                    ? 'not-allowed'
                                    : calendarToken.quickRange.trigger.cursor,
                                width: calendarToken.quickRange.trigger.width,
                                backgroundColor:
                                    calendarToken.quickRange.trigger
                                        .backgroundColor,
                                padding:
                                    calendarToken.quickRange.trigger.padding[
                                        size
                                    ],
                                gap: calendarToken.quickRange.trigger.gap,
                                opacity: isDisabled ? 0.5 : 1,
                                border: 'none',
                                borderRadius: 0,
                            }}
                        >
                            <Block
                                as="span"
                                color={
                                    calendarToken.quickRange.trigger.text.color
                                }
                                fontSize={
                                    calendarToken.quickRange.trigger.fontSize[
                                        size
                                    ]
                                }
                                fontWeight={
                                    calendarToken.quickRange.trigger.text
                                        .fontWeight
                                }
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {getPresetLabel(activePreset)}
                            </Block>
                            <ChevronDown
                                size={
                                    calendarToken.quickRange.trigger
                                        .iconSize as number
                                }
                                color={
                                    calendarToken.quickRange.trigger.text.color
                                }
                            />
                        </Block>
                    }
                    maxMenuHeight={maxMenuHeight}
                    minMenuWidth={150}
                    maxMenuWidth={200}
                />
            </Block>
        )
    }
)

QuickRangeSelector.displayName = 'QuickRangeSelector'

export default QuickRangeSelector
