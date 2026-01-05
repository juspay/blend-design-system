import React, { useMemo } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { ProgressBarSize, ProgressBarVariant, ProgressBarType } from './types'
import type { ProgressBarProps } from './types'
import type { ProgressBarTokenType } from './progressbar.tokens'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import {
    clampValue,
    calculatePercentage,
    extractAriaProps,
    generateDefaultAriaLabel,
    getCircularDimensions,
    calculateCircularStroke,
} from './utils'
import { FOUNDATION_THEME } from '../../tokens'

type ProgressBarInternalProps = {
    value: number
    min: number
    max: number
    ariaLabel?: string
    ariaLabelledby?: string
    showLabel: boolean
    tokens: ProgressBarTokenType
}

const CircularProgressBar: React.FC<
    ProgressBarInternalProps & {
        size: ProgressBarSize
        type: ProgressBarType
    }
> = ({
    value,
    size,
    type,
    tokens,
    showLabel,
    ariaLabel,
    ariaLabelledby,
    min,
    max,
}) => {
    const clampedValue = useMemo(
        () => clampValue(value, min, max),
        [value, min, max]
    )
    const percentage = useMemo(
        () => calculatePercentage(value, min, max),
        [value, min, max]
    )

    const { circularSize, strokeWidth, radius, center, circumference } =
        useMemo(() => getCircularDimensions(size, tokens), [size, tokens])

    const { strokeDasharray, strokeDashoffset, dashArray } = useMemo(
        () =>
            calculateCircularStroke(
                type === ProgressBarType.SEGMENTED ? 'segmented' : 'solid',
                circumference,
                percentage
            ),
        [type, circumference, percentage]
    )

    return (
        <Block
            position="relative"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            width={circularSize}
            height={circularSize}
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
        >
            <svg
                width={circularSize}
                height={circularSize}
                style={{ transform: 'rotate(-90deg)' }}
                aria-hidden="true"
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
                    data-color={tokens.circular.stroke[type]}
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
                    data-element="progress-bar-value-now"
                    data-value={`${Math.round(percentage)}%`}
                >
                    <Text
                        as="span"
                        fontSize={tokens.label.fontSize}
                        fontWeight={tokens.label.fontWeight}
                        color={tokens.label.color}
                        aria-hidden="true"
                    >
                        {Math.round(percentage)}%
                    </Text>
                </Block>
            )}
        </Block>
    )
}

const LinearProgressBar: React.FC<
    ProgressBarInternalProps & {
        size: ProgressBarSize
        variant: Exclude<ProgressBarVariant, ProgressBarVariant.CIRCULAR>
    }
> = ({
    value,
    size,
    variant,
    tokens,
    showLabel,
    ariaLabel,
    ariaLabelledby,
    min,
    max,
}) => {
    const clampedValue = useMemo(
        () => clampValue(value, min, max),
        [value, min, max]
    )
    const percentage = useMemo(
        () => calculatePercentage(value, min, max),
        [value, min, max]
    )

    const containerHeight = tokens.linear.height[size]
    const fillBackgroundColor = tokens.linear.fill.backgroundColor[variant]
    const fillBorderRadius = tokens.linear.fill.borderRadius[variant]
    const emptyBackgroundColor = tokens.linear.empty.backgroundColor[variant]
    const containerBorderRadius = tokens.linear.borderRadius[variant]

    return (
        <Block
            display="flex"
            alignItems="center"
            gap={FOUNDATION_THEME.unit[8]}
            width="100%"
            role="progressbar"
            aria-valuenow={clampedValue}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledby}
        >
            <Block
                width="100%"
                height={containerHeight}
                display="flex"
                flexGrow={1}
                borderRadius={containerBorderRadius}
                overflow="hidden"
                backgroundColor={
                    variant === ProgressBarVariant.SOLID
                        ? emptyBackgroundColor
                        : 'transparent'
                }
                aria-hidden="true"
            >
                <Block
                    data-color={fillBackgroundColor}
                    height="100%"
                    backgroundColor={fillBackgroundColor}
                    borderRadius={fillBorderRadius}
                    style={{
                        width: `${percentage}%`,
                        transition: tokens.transition,
                    }}
                />
                {variant === ProgressBarVariant.SEGMENTED && (
                    <Block
                        height="100%"
                        data-color={emptyBackgroundColor}
                        backgroundColor={emptyBackgroundColor}
                        backgroundImage={
                            tokens.linear.empty.backgroundImage.segmented
                        }
                        backgroundSize={
                            tokens.linear.empty.backgroundSize.segmented
                        }
                        style={{
                            width: `${100 - percentage}%`,
                        }}
                    />
                )}
            </Block>

            {showLabel && (
                <Block
                    flexShrink={0}
                    data-element="progress-bar-value-now"
                    data-value={`${Math.round(percentage)}%`}
                >
                    <Text
                        as="span"
                        fontWeight={tokens.label.fontWeight}
                        color={tokens.label.color}
                        fontSize={tokens.label.fontSize}
                        aria-hidden="true"
                    >
                        {Math.round(percentage)}%
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
    min = 0,
    max = 100,
    ...rest
}) => {
    const progressBarToken =
        useResponsiveTokens<ProgressBarTokenType>('PROGRESS_BAR')

    const {
        'aria-label': ariaLabel,
        'aria-labelledby': ariaLabelledby,
        restProps,
    } = extractAriaProps(rest)

    const defaultAriaLabel = useMemo(() => {
        if (ariaLabel || ariaLabelledby) return ariaLabel
        return generateDefaultAriaLabel(value, min, max)
    }, [value, min, max, ariaLabel, ariaLabelledby])

    const sharedProps: ProgressBarInternalProps = {
        value,
        min,
        max,
        ariaLabel: defaultAriaLabel,
        ariaLabelledby,
        showLabel,
        tokens: progressBarToken,
    }

    if (variant === ProgressBarVariant.CIRCULAR) {
        return (
            <Block {...restProps} data-progressbar="progressbar">
                <CircularProgressBar {...sharedProps} size={size} type={type} />
            </Block>
        )
    }

    return (
        <Block {...restProps} data-progressbar="progressbar">
            <LinearProgressBar {...sharedProps} size={size} variant={variant} />
        </Block>
    )
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
