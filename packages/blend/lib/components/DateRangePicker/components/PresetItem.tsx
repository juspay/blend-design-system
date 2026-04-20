import React from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { DateRangePreset, HapticFeedbackType } from '../types'
import { getPresetDisplayLabel, triggerHapticFeedback } from '../utils'
import { PresetItemProps } from '../types'
import { useResponsiveTokens } from '../../../hooks/useResponsiveTokens'
import type { SingleSelectTokensType } from '../../SingleSelect/singleSelect.tokens'
import { FOUNDATION_THEME } from '../../../tokens'
import Block from '../../Primitives/Block/Block'
import PrimitiveText from '../../Primitives/PrimitiveText/PrimitiveText'

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
    const tokens = useResponsiveTokens<SingleSelectTokensType>('SINGLE_SELECT')

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
        target.style.backgroundColor = String(FOUNDATION_THEME.colors.gray[50])
        target.style.transform = 'scale(0.98)'
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (isDisabled) return
        const target = e.currentTarget as HTMLElement
        target.style.backgroundColor = 'transparent'
        target.style.transform = 'scale(1)'
    }

    const handleTouchCancel = (e: React.TouchEvent) => {
        if (isDisabled) return
        const target = e.currentTarget as HTMLElement
        target.style.backgroundColor = 'transparent'
        target.style.transform = 'scale(1)'
    }

    return (
        <Block
            key={preset}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            padding={`${FOUNDATION_THEME.unit[12]} ${FOUNDATION_THEME.unit[16]}`}
            borderBottom={`1px solid ${FOUNDATION_THEME.colors.gray[150]}`}
            cursor={isDisabled ? 'not-allowed' : 'pointer'}
            backgroundColor="transparent"
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
                fontSize={tokens?.menu?.item?.option?.fontSize}
                fontWeight={
                    isActive
                        ? tokens?.menu?.item?.option?.fontWeight
                        : tokens?.menu?.item?.option?.fontWeight
                }
                color={
                    isDisabled
                        ? tokens?.menu?.item?.option?.color?.disabled
                        : isActive
                          ? tokens?.menu?.item?.option?.color?.selected
                          : tokens?.menu?.item?.option?.color?.default
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
                                ? tokens?.menu?.item?.option?.color?.disabled
                                : tokens?.menu?.item?.option?.color?.selected
                        }
                    />
                </Block>
            )}

            {isCustom && (
                <ChevronDown
                    size={16}
                    color={
                        isDisabled
                            ? tokens?.menu?.item?.option?.color?.disabled
                            : tokens?.menu?.item?.option?.color?.default
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
