import React from 'react'
import { ChevronDown } from 'lucide-react'
import { DateRangePreset, HapticFeedbackType } from '../types'
import { getPresetDisplayLabel, triggerHapticFeedback } from '../utils'
import { FOUNDATION_THEME } from '../../../tokens'
import Block from '../../Primitives/Block/Block'
import Text from '../../Text/Text'
import { PresetItemProps } from '../types'

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
            padding="16px 20px"
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
            <Text
                variant="body.md"
                fontWeight={isActive ? 600 : 500}
                color={
                    isDisabled
                        ? FOUNDATION_THEME.colors.gray[400]
                        : isActive
                          ? FOUNDATION_THEME.colors.gray[700]
                          : FOUNDATION_THEME.colors.gray[600]
                }
            >
                {getPresetDisplayLabel(preset)}
            </Text>

            {isActive && !isCustom && (
                <Block
                    width="20px"
                    height="20px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                            d="M13.5 4.5L6 12L2.5 8.5"
                            stroke={
                                isDisabled
                                    ? FOUNDATION_THEME.colors.gray[400]
                                    : FOUNDATION_THEME.colors.gray[700]
                            }
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </Block>
            )}

            {isCustom && (
                <ChevronDown
                    size={16}
                    color={
                        isDisabled
                            ? FOUNDATION_THEME.colors.gray[500]
                            : FOUNDATION_THEME.colors.gray[500]
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
