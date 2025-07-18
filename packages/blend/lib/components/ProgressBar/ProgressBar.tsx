import React from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ProgressBarProps, ProgressBarSize, ProgressBarVariant } from './types'
import { useComponentToken } from '../../context/useComponentToken'
import type { ProgressBarTokenType } from './progressbar.tokens'

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    size = ProgressBarSize.MEDIUM,
    variant = ProgressBarVariant.SOLID,
    showLabel = false,
    className,
}) => {
    const progressBarToken = useComponentToken(
        'PROGRESS_BAR'
    ) as ProgressBarTokenType

    const clampedValue = Math.min(100, Math.max(0, value))

    const containerHeight = progressBarToken.height[size]
    const fillStyles = progressBarToken.fill[variant]
    const emptyStyles = progressBarToken.empty[variant]

    const containerBorderRadius =
        variant === ProgressBarVariant.SEGMENTED ? '0px' : '8px'

    return (
        <Block
            display="flex"
            alignItems="center"
            gap="8px"
            width="100%"
            className={className}
        >
            <Block
                width="100%"
                height={containerHeight}
                display="flex"
                flexGrow={1}
                borderRadius={containerBorderRadius}
                overflow={progressBarToken.container.overflow}
                backgroundColor={
                    variant === ProgressBarVariant.SOLID
                        ? emptyStyles.backgroundColor
                        : 'transparent'
                }
            >
                <Block
                    height="100%"
                    backgroundColor={fillStyles.backgroundColor}
                    borderRadius={fillStyles.borderRadius}
                    style={{
                        width: `${clampedValue}%`,
                        transition: progressBarToken.transition,
                    }}
                />
                {variant === ProgressBarVariant.SEGMENTED && (
                    <Block
                        height="100%"
                        backgroundColor={emptyStyles.backgroundColor}
                        backgroundImage={
                            'backgroundImage' in emptyStyles
                                ? emptyStyles.backgroundImage
                                : undefined
                        }
                        backgroundSize={
                            'backgroundSize' in emptyStyles
                                ? emptyStyles.backgroundSize
                                : undefined
                        }
                        style={{
                            width: `${100 - clampedValue}%`,
                        }}
                    />
                )}
            </Block>

            {showLabel && (
                <Block flexShrink={0}>
                    <Text
                        as="span"
                        variant="body.xs"
                        fontWeight={progressBarToken.label.fontWeight}
                        color={progressBarToken.label.color}
                    >
                        {Math.round(clampedValue)}%
                    </Text>
                </Block>
            )}
        </Block>
    )
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
