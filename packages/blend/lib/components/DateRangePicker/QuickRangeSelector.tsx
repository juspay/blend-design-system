import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import {
    DateRangePreset,
    DateRangePickerSize,
    CustomPresetConfig,
} from './types'
import {
    getPresetLabel,
    getPresetLabelWithCustom,
    getFilteredPresets,
} from './utils'
import { CalendarTokenType } from './dateRangePicker.tokens'
import Block from '../Primitives/Block/Block'
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
    customPresets?: CustomPresetConfig[]
    className?: string
    disableFutureDates?: boolean
    disablePastDates?: boolean
    isDisabled?: boolean
    size?: DateRangePickerSize
    maxMenuHeight?: number
    isStandalone?: boolean
    calendarToken?: CalendarTokenType
}

const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(
    (
        {
            activePreset,
            onPresetSelect,
            excludeCustom = false,
            customPresets,
            className,
            disableFutureDates = false,
            disablePastDates = false,
            isDisabled = false,
            size = DateRangePickerSize.MEDIUM,
            maxMenuHeight = 200,
            isStandalone = false,
            calendarToken,
        },
        ref
    ) => {
        // Use the already processed presets directly
        const presetConfigs = customPresets || []

        // Get filtered presets based on configuration and restrictions
        const filteredPresets = getFilteredPresets(
            presetConfigs,
            disableFutureDates,
            disablePastDates
        )

        // Add CUSTOM preset if not excluded
        const presetsToShow = excludeCustom
            ? filteredPresets.filter((p) => p !== DateRangePreset.CUSTOM)
            : filteredPresets

        const selectItems: SelectMenuGroupType[] = [
            {
                items: presetsToShow.map((preset) => ({
                    label: getPresetLabelWithCustom(preset, presetConfigs),
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

        const getContainerStyle = () => {
            const baseStyle = {
                backgroundColor:
                    calendarToken?.trigger?.quickSelector?.backgroundColor,
            }

            if (isStandalone) {
                const borderColor = isDisabled
                    ? calendarToken?.trigger?.quickSelector?.border?.disabled
                          ?.left
                    : calendarToken?.trigger?.quickSelector?.border?.default
                          ?.left

                return {
                    ...baseStyle,
                    border: borderColor,
                    borderRadius:
                        calendarToken?.trigger?.quickSelector?.borderRadius
                            ?.topLeft,
                }
            } else {
                const stateKey = isDisabled ? 'disabled' : 'default'
                return {
                    ...baseStyle,
                    borderLeft:
                        calendarToken?.trigger?.quickSelector?.border?.[
                            stateKey
                        ]?.left,
                    borderTop:
                        calendarToken?.trigger?.quickSelector?.border?.[
                            stateKey
                        ]?.top,
                    borderBottom:
                        calendarToken?.trigger?.quickSelector?.border?.[
                            stateKey
                        ]?.bottom,
                    borderTopLeftRadius:
                        calendarToken?.trigger?.quickSelector?.borderRadius
                            ?.topLeft,
                    borderBottomLeftRadius:
                        calendarToken?.trigger?.quickSelector?.borderRadius
                            ?.bottomLeft,
                }
            }
        }

        return (
            <Block
                data-preset-selector="presetSelector"
                position="relative"
                ref={ref}
                className={className}
                style={getContainerStyle()}
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
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                width: '100%',
                                backgroundColor:
                                    calendarToken?.trigger?.quickSelector
                                        ?.backgroundColor,
                                padding: `${calendarToken?.trigger?.quickSelector?.padding?.[size as keyof CalendarTokenType['trigger']['quickSelector']['padding']]?.y} ${calendarToken?.trigger?.quickSelector?.padding?.[size as keyof CalendarTokenType['trigger']['quickSelector']['padding']]?.x}`,
                                gap: calendarToken?.trigger?.quickSelector?.gap,
                                opacity: isDisabled ? 0.5 : 1,
                                border: 'none',
                                borderRadius: 0,
                            }}
                        >
                            <Block
                                data-button-text={getPresetLabelWithCustom(
                                    activePreset,
                                    presetConfigs
                                )}
                                as="span"
                                color={
                                    calendarToken?.trigger?.quickSelector?.text
                                        ?.color
                                }
                                fontSize={
                                    calendarToken?.trigger?.quickSelector?.text
                                        ?.fontSize?.[
                                        size as keyof CalendarTokenType['trigger']['quickSelector']['text']['fontSize']
                                    ]
                                }
                                fontWeight={
                                    calendarToken?.trigger?.quickSelector?.text
                                        ?.fontWeight
                                }
                                style={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {getPresetLabelWithCustom(
                                    activePreset,
                                    presetConfigs
                                )}
                            </Block>
                            <ChevronDown
                                size={
                                    calendarToken?.trigger?.quickSelector
                                        ?.iconSize
                                }
                                color={
                                    calendarToken?.trigger?.quickSelector?.text
                                        ?.color
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
