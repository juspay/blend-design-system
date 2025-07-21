import React from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ProgressBarSize, ProgressBarVariant, ProgressBarType } from './types'
import type { ProgressBarProps } from './types'
import { useComponentToken } from '../../context/useComponentToken'
import type { ProgressBarTokenType } from './progressbar.tokens'

const CircularProgressBar: React.FC<{
    value: number
    size: ProgressBarSize
    type: ProgressBarType
    tokens: ProgressBarTokenType
    showLabel: boolean
}> = ({ value, size, type, tokens, showLabel }) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const circularSize = String(tokens.circular.size[size])
    const strokeWidth = tokens.circular.strokeWidth[size]
    const radius = (parseInt(circularSize) - strokeWidth) / 2
    const circumference = 2 * Math.PI * radius
    const center = parseInt(circularSize) / 2

    // Calculate dash array for segmented style to match linear segmented
    const segmentLength = 8
    const gapLength = 4
    const dashArray = `${segmentLength} ${gapLength}`

    const totalDashLength = segmentLength + gapLength
    const totalSegments = Math.floor(circumference / totalDashLength)
    const progressSegments = Math.floor((clampedValue / 100) * totalSegments)
    const progressLength = progressSegments * totalDashLength

    const strokeDasharray =
        type === ProgressBarType.SEGMENTED ? dashArray : circumference
    const strokeDashoffset =
        type === ProgressBarType.SEGMENTED
            ? circumference - progressLength
            : circumference - (clampedValue / 100) * circumference

    return (
        <Block
            position="relative"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            width={circularSize}
            height={circularSize}
        >
            <svg
                width={circularSize}
                height={circularSize}
                style={{ transform: 'rotate(-90deg)' }}
            >
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={tokens.circular[type].background}
                    strokeWidth={strokeWidth}
                    strokeDasharray={
                        type === ProgressBarType.SEGMENTED
                            ? dashArray
                            : undefined
                    }
                />
                <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={tokens.circular[type].stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap={
                        type === ProgressBarType.SOLID ? 'round' : 'butt'
                    }
                    style={{
                        transition: 'stroke-dashoffset 0.3s ease-in-out',
                    }}
                />
            </svg>
            {showLabel && (
                <Block
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text
                        as="span"
                        variant="body.xs"
                        fontWeight={tokens.label.fontWeight}
                        color={tokens.label.color}
                    >
                        {Math.round(clampedValue)}%
                    </Text>
                </Block>
            )}
        </Block>
    )
}

const LinearProgressBar: React.FC<{
    value: number
    size: ProgressBarSize
    variant: ProgressBarVariant
    tokens: ProgressBarTokenType
    showLabel: boolean
}> = ({ value, size, variant, tokens, showLabel }) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const containerHeight = tokens.height[size]
    const fillStyles = tokens.fill[variant as keyof typeof tokens.fill]
    const emptyStyles = tokens.empty[variant as keyof typeof tokens.empty]

    const containerBorderRadius =
        variant === ProgressBarVariant.SEGMENTED ? '0px' : '8px'

    return (
        <Block display="flex" alignItems="center" gap="8px" width="100%">
            <Block
                width="100%"
                height={containerHeight}
                display="flex"
                flexGrow={1}
                borderRadius={containerBorderRadius}
                overflow={tokens.container.overflow}
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
                        transition: tokens.transition,
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
                        fontWeight={tokens.label.fontWeight}
                        color={tokens.label.color}
                    >
                        {Math.round(clampedValue)}%
                    </Text>
                </Block>
            )}
        </Block>
    )
}

const ProgressBar: React.FC<ProgressBarProps> = ({
    value,
    size = ProgressBarSize.MEDIUM,
    variant = ProgressBarVariant.SOLID,
    type = ProgressBarType.SOLID,
    showLabel = false,
    className,
}) => {
    const progressBarToken = useComponentToken(
        'PROGRESS_BAR'
    ) as ProgressBarTokenType

    if (variant === ProgressBarVariant.CIRCULAR) {
        return (
            <Block className={className}>
                <CircularProgressBar
                    value={value}
                    size={size}
                    type={type}
                    tokens={progressBarToken}
                    showLabel={showLabel}
                />
            </Block>
        )
    }

    return (
        <Block className={className}>
            <LinearProgressBar
                value={value}
                size={size}
                variant={variant}
                tokens={progressBarToken}
                showLabel={showLabel}
            />
        </Block>
    )
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
