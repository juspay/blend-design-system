import { useMemo } from 'react'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
} from './progressBarV2.types'
import { ProgressBarV2InternalProps } from './progressBarV2.types'
import {
    calculatePercentage,
    clampValue,
    getCircularDimensions,
    calculateCircularProgressStroke,
    parseCircularDashToken,
} from './utils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'

export const CircularProgressBarV2: React.FC<
    ProgressBarV2InternalProps & {
        size: ProgressBarV2Size
        appearance: ProgressBarV2Appearance
    }
> = ({
    value,
    size,
    appearance,
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

    const [segmentLen, gapLen] = useMemo(
        () =>
            parseCircularDashToken(
                tokens.circular.dashArray[ProgressBarV2Appearance.SEGMENTED]
            ),
        [tokens]
    )

    const trackDashArray =
        appearance === ProgressBarV2Appearance.SEGMENTED
            ? `${segmentLen} ${gapLen}`
            : undefined

    const { strokeDasharray, strokeDashoffset } = useMemo(
        () => calculateCircularProgressStroke(circumference, percentage),
        [circumference, percentage]
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
                    stroke={tokens.circular.background[appearance]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={trackDashArray}
                />
                <circle
                    data-id={tokens.circular.stroke[appearance]}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={tokens.circular.stroke[appearance]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
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
                    data-id={`${Math.round(percentage)}%`}
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
