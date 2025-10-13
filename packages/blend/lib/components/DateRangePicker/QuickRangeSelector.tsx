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
                backgroundColor: 'transparent',
            }

            if (isStandalone) {
                const border = isDisabled
                    ? '1px solid #e5e7eb'
                    : '1px solid #d1d5db'

                return {
                    ...baseStyle,
                    border: border,
                    borderRadius: '8px',
                }
            } else {
                return {
                    ...baseStyle,
                    borderLeft: isDisabled
                        ? '1px solid #e5e7eb'
                        : '1px solid #d1d5db',
                    borderTop: isDisabled
                        ? '1px solid #e5e7eb'
                        : '1px solid #d1d5db',
                    borderBottom: isDisabled
                        ? '1px solid #e5e7eb'
                        : '1px solid #d1d5db',
                    borderTopLeftRadius: '8px',
                    borderBottomLeftRadius: '8px',
                }
            }
        }

        return (
            <Block
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
                                backgroundColor: 'transparent',
                                padding:
                                    size === 'sm'
                                        ? '6px 14px'
                                        : size === 'lg'
                                          ? '8.5px 14px'
                                          : '6.5px 14px',
                                gap: '8px',
                                opacity: isDisabled ? 0.5 : 1,
                                border: 'none',
                                borderRadius: 0,
                            }}
                        >
                            <Block
                                as="span"
                                color="#6b7280"
                                fontSize={size === 'sm' ? '14px' : '16px'}
                                fontWeight="500"
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
                            <ChevronDown size={16} color="#6b7280" />
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
