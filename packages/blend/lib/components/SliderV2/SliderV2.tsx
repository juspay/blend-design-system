import { forwardRef } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { formatSliderValue, buildThumbAriaAttributes } from './utils'
import { SliderV2Size, SliderV2Variant } from './SliderV2.types'
import {
    StyledRoot,
    StyledTrack,
    StyledRange,
    StyledThumb,
    StyledValueLabel,
} from './SliderV2RadixComponent'
import { SliderV2Props } from './SliderV2.types'

const SliderV2 = forwardRef<
    React.ComponentRef<typeof SliderPrimitive.Root>,
    SliderV2Props
>(
    (
        {
            variant = SliderV2Variant.PRIMARY,
            size = SliderV2Size.MD,
            value,
            defaultValue,
            valueFormat,
            showValueLabels = false,
            labelPosition = 'top',
            min = 0,
            max = 100,
            step = 1,
            disabled,
            orientation,
            ...props
        },
        ref
    ) => {
        const currentValues = value || defaultValue || [min]
        const thumbCount = currentValues.length

        const propsRecord = props as Record<string, unknown>
        const ariaLabel = propsRecord['aria-label'] as string | undefined
        const ariaLabelledBy = propsRecord['aria-labelledby'] as
            | string
            | undefined
        const ariaDescribedBy = propsRecord['aria-describedby'] as
            | string
            | undefined

        return (
            <StyledRoot
                ref={ref}
                $variant={variant}
                $size={size}
                value={value}
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                orientation={orientation}
                {...props}
            >
                <StyledTrack $variant={variant} $size={size}>
                    <StyledRange $variant={variant} $size={size} />
                </StyledTrack>
                {Array.from({ length: thumbCount }, (_, index) => {
                    const currentValue = currentValues[index]
                    const formattedValue = formatSliderValue(
                        currentValue,
                        valueFormat
                    )

                    const thumbAriaProps = buildThumbAriaAttributes({
                        min,
                        max,
                        value: currentValue,
                        formattedValue,
                        disabled,
                        ariaLabel,
                        ariaLabelledBy,
                        ariaDescribedBy,
                        thumbIndex: index,
                        thumbCount,
                    })

                    return (
                        <StyledThumb
                            key={index}
                            $variant={variant}
                            $size={size}
                            {...thumbAriaProps}
                        >
                            {showValueLabels && (
                                <StyledValueLabel
                                    $size={size}
                                    $position={labelPosition}
                                    aria-hidden="true"
                                >
                                    {formattedValue}
                                </StyledValueLabel>
                            )}
                        </StyledThumb>
                    )
                })}
            </StyledRoot>
        )
    }
)

SliderV2.displayName = 'SliderV2'

export default SliderV2
