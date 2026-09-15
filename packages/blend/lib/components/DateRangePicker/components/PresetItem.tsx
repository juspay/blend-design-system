import React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { DateRangePreset, HapticFeedbackType } from '../types'
import { getPresetDisplayLabel, triggerHapticFeedback } from '../utils'
import { PresetItemProps } from '../types'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'
import { useTheme } from '../../../context'
import { getMobileToken } from './mobile.tokens'

const PresetItem: React.FC<PresetItemProps> = ({
    preset,
    isActive,
    isCustomExpanded = false,
    onPresetSelect,
    onCustomToggle,
    setDrawerOpen,
    isDisabled = false,
}) => {
    const isCustom = preset === DateRangePreset.CUSTOM
    const { foundationTokens, theme } = useTheme()
    const tokens = getMobileToken(foundationTokens, theme).sm

    const handleClick = () => {
        if (isDisabled) return

        triggerHapticFeedback(
            isCustom ? HapticFeedbackType.SELECTION : HapticFeedbackType.IMPACT
        )

        if (isCustom && onCustomToggle) {
            onCustomToggle()
            onPresetSelect(preset)
        } else {
            onPresetSelect(preset)
            if (setDrawerOpen) {
                setDrawerOpen(false)
            }
        }
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isDisabled) return
        const target = e.currentTarget as HTMLElement
        target.style.backgroundColor = String(
            tokens.presets.hoverBackgroundColor
        )
        target.style.transform = 'scale(0.98)'
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (isDisabled) return
        const target = e.currentTarget as HTMLElement
        target.style.backgroundColor = String(tokens.presets.backgroundColor)
        target.style.transform = 'scale(1)'
    }

    const handleTouchCancel = (e: React.TouchEvent) => {
        if (isDisabled) return
        const target = e.currentTarget as HTMLElement
        target.style.backgroundColor = String(tokens.presets.backgroundColor)
        target.style.transform = 'scale(1)'
    }

    return (
        <Block
            key={preset}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={`${tokens.presets.padding.y} ${tokens.presets.padding.x}`}
            borderBottom={tokens.presets.borderBottom}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            backgroundColor={tokens.presets.backgroundColor}
            style={{
                transition: 'background-color 0.15s ease, transform 0.1s ease',
                touchAction: 'manipulation',
                opacity: isDisabled ? 0.5 : 1,
                pointerEvents: isDisabled ? 'none' : 'auto',
            }}
            onClick={handleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
        >
            <PrimitiveText
                fontSize={foundationTokens.font.size.body.md.fontSize}
                fontWeight={
                    isActive
                        ? foundationTokens.font.weight[600]
                        : foundationTokens.font.weight[400]
                }
                color={
                    isDisabled
                        ? tokens.presets.text.disabled
                        : isActive
                          ? tokens.presets.text.selected
                          : tokens.presets.text.default
                }
            >
                {getPresetDisplayLabel(preset)}
            </PrimitiveText>

            {isActive && !isCustom && (
                <Block
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Check
                        size={16}
                        color={
                            isDisabled
                                ? tokens.presets.text.disabled
                                : tokens.presets.text.selected
                        }
                    />
                </Block>
            )}

            {isCustom && (
                <ChevronDown
                    size={16}
                    color={
                        isDisabled
                            ? tokens.presets.text.disabled
                            : tokens.presets.text.default
                    }
                    style={{
                        transform: isCustomExpanded
                            ? 'rotate(180deg)'
                            : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                    }}
                />
            )}
        </Block>
    )
}

export default PresetItem
