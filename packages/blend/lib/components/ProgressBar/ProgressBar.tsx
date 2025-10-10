import React from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ProgressBarSize, ProgressBarVariant, ProgressBarType } from './types'
import type { ProgressBarProps } from './types'
import type { ProgressBarTokenType } from './progressbar.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

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
                    stroke={tokens.circular.background[type]}
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
                    stroke={tokens.circular.stroke[type]}
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
                        fontSize={tokens.label.fontSize}
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
    variant: Exclude<ProgressBarVariant, ProgressBarVariant.CIRCULAR>
    tokens: ProgressBarTokenType
    showLabel: boolean
}> = ({ value, size, variant, tokens, showLabel }) => {
    const clampedValue = Math.min(100, Math.max(0, value))
    const containerHeight = tokens.linear.height[size]
    const fillBackgroundColor = tokens.linear.fill.backgroundColor[variant]
    const fillBorderRadius = tokens.linear.fill.borderRadius[variant]
    const emptyBackgroundColor = tokens.linear.empty.backgroundColor[variant]
    const containerBorderRadius = tokens.linear.borderRadius[variant]

    return (
        <Block display="flex" alignItems="center" gap="8px" width="100%">
            <Block
                width="100%"
                height={containerHeight}
                display="flex"
                flexGrow={1}
                borderRadius={containerBorderRadius}
                overflow={'hidden'}
                backgroundColor={
                    variant === ProgressBarVariant.SOLID
                        ? emptyBackgroundColor
                        : 'transparent'
                }
            >
                <Block
                    height="100%"
                    backgroundColor={fillBackgroundColor}
                    borderRadius={fillBorderRadius}
                    style={{
                        width: `${clampedValue}%`,
                        transition: tokens.transition,
                    }}
                />
                {variant === ProgressBarVariant.SEGMENTED && (
                    <Block
                        height="100%"
                        backgroundColor={emptyBackgroundColor}
                        backgroundImage={
                            tokens.linear.empty.backgroundImage.segmented
                        }
                        backgroundSize={
                            tokens.linear.empty.backgroundSize.segmented
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
                        fontWeight={tokens.label.fontWeight}
                        color={tokens.label.color}
                        fontSize={tokens.label.fontSize}
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
    const progressBarToken =
        useResponsiveTokens<ProgressBarTokenType>('PROGRESS_BAR')

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
