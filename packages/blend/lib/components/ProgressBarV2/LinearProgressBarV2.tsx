import { useMemo } from 'react'
import {
    ProgressBarV2Appearance,
    ProgressBarV2Size,
} from './progressBarV2.types'
import { ProgressBarV2InternalProps } from './progressBarV2.types'
import { calculatePercentage, clampValue } from './utils'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'

export const LinearProgressBarV2: React.FC<
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

    const containerHeight = tokens.linear.height[size]
    const fillBackgroundColor = tokens.linear.fill.backgroundColor[appearance]
    const fillBorderRadius = tokens.linear.fill.borderRadius[appearance]
    const emptyBackgroundColor = tokens.linear.empty.backgroundColor[appearance]
    const containerBorderRadius = tokens.linear.borderRadius[appearance]

    return (
        <Block
            display="flex"
            alignItems="center"
            gap={tokens.linear.gap}
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
                    appearance === ProgressBarV2Appearance.SOLID
                        ? emptyBackgroundColor
                        : 'transparent'
                }
                aria-hidden="true"
            >
                <Block
                    data-id={fillBackgroundColor}
                    height="100%"
                    backgroundColor={fillBackgroundColor}
                    borderRadius={fillBorderRadius}
                    style={{
                        width: `${percentage}%`,
                        transition: tokens.transition,
                    }}
                />
                {appearance === ProgressBarV2Appearance.SEGMENTED && (
                    <Block
                        height="100%"
                        data-id={emptyBackgroundColor}
                        backgroundColor={emptyBackgroundColor}
                        backgroundImage={
                            tokens.linear.empty.backgroundImage[appearance]
                        }
                        backgroundSize={
                            tokens.linear.empty.backgroundSize[appearance]
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
                    data-id={`${Math.round(percentage)}%`}
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
