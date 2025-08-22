import { forwardRef } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { styled, css } from 'styled-components'
import {
    getSliderTokenStyles,
    formatSliderValue,
    getSliderLabelStyles,
} from './utils'
import { useSliderTelemetry } from '../../telemetry/componentHooks'
import {
    SliderProps as BaseSliderProps,
    SliderSize,
    SliderVariant,
    SliderLabelPosition,
} from './types'

type SliderProps = BaseSliderProps &
    Omit<
        React.ComponentProps<typeof SliderPrimitive.Root>,
        keyof BaseSliderProps
    >

const StyledRoot = styled(SliderPrimitive.Root)<{
    $variant: SliderVariant
    $size: SliderSize
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderTokenStyles($variant, $size)
        return css`
            position: relative;
            display: flex;
            align-items: center;
            user-select: none;
            touch-action: none;
            width: 100%;
            height: ${styles.root.height};
            cursor: ${styles.root.cursor};
        `
    }}

    &[data-orientation="vertical"] {
        flex-direction: column;
        width: ${({ $size }) => {
            const styles = getSliderTokenStyles(SliderVariant.PRIMARY, $size)
            return styles.root.height
        }};
        height: 100%;
    }

    &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

const StyledTrack = styled(SliderPrimitive.Track)<{
    $variant: SliderVariant
    $size: SliderSize
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderTokenStyles($variant, $size)
        return css`
            position: relative;
            flex-grow: 1;
            background-color: ${styles.track.backgroundColor};
            height: ${styles.track.height};
            border-radius: ${styles.track.borderRadius};
        `
    }}

    &[data-orientation="vertical"] {
        width: ${({ $variant, $size }) => {
            const styles = getSliderTokenStyles($variant, $size)
            return styles.track.height
        }};
        height: 100%;
    }
`

const StyledRange = styled(SliderPrimitive.Range)<{
    $variant: SliderVariant
    $size: SliderSize
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderTokenStyles($variant, $size)
        return css`
            position: absolute;
            background-color: ${styles.range.backgroundColor};
            height: ${styles.range.height};
            border-radius: ${styles.range.borderRadius};
        `
    }}

    &[data-orientation="vertical"] {
        width: ${({ $variant, $size }) => {
            const styles = getSliderTokenStyles($variant, $size)
            return styles.range.height
        }};
        height: var(--radix-slider-range-height);
    }
`

const StyledThumb = styled(SliderPrimitive.Thumb)<{
    $variant: SliderVariant
    $size: SliderSize
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderTokenStyles($variant, $size)
        return css`
            display: block;
            width: ${styles.thumb.width};
            height: ${styles.thumb.height};
            background-color: ${styles.thumb.backgroundColor};
            border: ${styles.thumb.border};
            border-radius: ${styles.thumb.borderRadius};
            box-shadow: ${styles.thumb.boxShadow};
            cursor: ${styles.thumb.cursor};
        `
    }}

    &:hover {
        ${({ $variant, $size }) => {
            const styles = getSliderTokenStyles($variant, $size)
            return css`
                box-shadow: ${styles.thumb['&:hover']?.boxShadow};
            `
        }}
    }

    &:focus {
        ${({ $variant, $size }) => {
            const styles = getSliderTokenStyles($variant, $size)
            return css`
                outline: none;
                box-shadow: ${styles.thumb['&:focus']?.boxShadow};
            `
        }}
    }

    &:active {
        ${({ $variant, $size }) => {
            const styles = getSliderTokenStyles($variant, $size)
            return css`
                cursor: ${styles.thumb['&:active']?.cursor};
            `
        }}
    }

    &[data-disabled] {
        ${({ $variant, $size }) => {
            const styles = getSliderTokenStyles($variant, $size)
            return css`
                cursor: ${styles.thumb['&:disabled']?.cursor};
                opacity: ${styles.thumb['&:disabled']?.opacity};
            `
        }}
    }
`

const StyledValueLabel = styled.div<{
    $size: SliderSize
    $position: SliderLabelPosition
}>`
    ${({ $position }) => {
        const styles = getSliderLabelStyles($position)
        return css`
            position: ${styles.position};
            font-size: ${styles.fontSize};
            color: ${styles.color};
            font-weight: ${styles.fontWeight};
            white-space: ${styles.whiteSpace};
            pointer-events: ${styles.pointerEvents};
            transform: ${styles.transform};
            ${styles.bottom && `bottom: ${styles.bottom};`}
            ${styles.marginBottom && `margin-bottom: ${styles.marginBottom};`}
      ${styles.top && `top: ${styles.top};`}
      ${styles.marginTop && `margin-top: ${styles.marginTop};`}
      ${styles.backgroundColor &&
            `background-color: ${styles.backgroundColor};`}
      ${styles.padding && `padding: ${styles.padding};`}
      ${styles.borderRadius && `border-radius: ${styles.borderRadius};`}
      ${styles.boxShadow && `box-shadow: ${styles.boxShadow};`}
      ${styles.border && `border: ${styles.border};`}
        `
    }}
`

const Slider = forwardRef<
    React.ComponentRef<typeof SliderPrimitive.Root>,
    SliderProps
>((sliderProps, ref) => {
    const {
        variant = SliderVariant.PRIMARY,
        size = SliderSize.MEDIUM,
        value,
        defaultValue,
        valueFormat,
        showValueLabels = false,
        labelPosition = 'top',
        ...props
    } = sliderProps

    useSliderTelemetry(sliderProps)

    const currentValues = value || defaultValue || [0]
    const thumbCount = currentValues.length

    return (
        <StyledRoot
            ref={ref}
            $variant={variant}
            $size={size}
            value={value}
            defaultValue={defaultValue}
            {...props}
        >
            <StyledTrack $variant={variant} $size={size}>
                <StyledRange $variant={variant} $size={size} />
            </StyledTrack>
            {Array.from({ length: thumbCount }, (_, index) => (
                <StyledThumb key={index} $variant={variant} $size={size}>
                    {showValueLabels && (
                        <StyledValueLabel
                            $size={size}
                            $position={labelPosition}
                        >
                            {formatSliderValue(
                                currentValues[index],
                                valueFormat
                            )}
                        </StyledValueLabel>
                    )}
                </StyledThumb>
            ))}
        </StyledRoot>
    )
})

Slider.displayName = 'Slider'

export default Slider
