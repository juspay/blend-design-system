import { useMemo } from 'react'
import { ProgressBarV2Appearance } from './progressBarV2.types'
import { CircularProgressBarV2Props } from './progressBarV2.types'
import {
    getProgressBarValueState,
    getCircularDimensions,
    calculateCircularProgressStroke,
    parseCircularDashToken,
} from './utils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'

export const CircularProgressBarV2 = ({
    value,
    size,
    appearance,
    tokens,
    showLabel,
    ariaLabel,
    ariaLabelledby,
    min,
    max,
}: CircularProgressBarV2Props) => {
    const { rangeMin, rangeMax, clampedValue, percentage } = useMemo(
        () => getProgressBarValueState(value, min, max),
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
            aria-valuemin={rangeMin}
            aria-valuemax={rangeMax}
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
                        transition: tokens.circular.motion,
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
