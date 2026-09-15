import { forwardRef } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { styled, css } from 'styled-components'
import {
    getSliderTokenStyles,
    formatSliderValue,
    getSliderLabelStyles,
    buildThumbAriaAttributes,
} from './utils'
import type { SliderTokensType } from './slider.tokens.types'
import {
    SliderProps as BaseSliderProps,
    SliderSize,
    SliderVariant,
    SliderLabelPosition,
} from './types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'

type SliderProps = BaseSliderProps &
    Omit<
        React.ComponentProps<typeof SliderPrimitive.Root>,
        keyof BaseSliderProps
    >

type StyledSliderProps = {
    $variant: SliderVariant
    $size: SliderSize
    $tokens: SliderTokensType
}

const StyledRoot = styled(SliderPrimitive.Root)<StyledSliderProps>`
    ${({ $variant, $size, $tokens }) => {
        const styles = getSliderTokenStyles($variant, $size, $tokens)
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
        width: ${({ $size, $tokens }) => {
            const styles = getSliderTokenStyles(
                SliderVariant.PRIMARY,
                $size,
                $tokens
            )
            return styles.root.height
        }};
        height: 100%;
    }

    &[data-disabled] {
        opacity: ${({ $tokens }) => $tokens.disabledOpacity};
        cursor: not-allowed;
    }
`

const StyledTrack = styled(SliderPrimitive.Track)<StyledSliderProps>`
    ${({ $variant, $size, $tokens }) => {
        const styles = getSliderTokenStyles($variant, $size, $tokens)
        return css`
            position: relative;
            flex-grow: 1;
            background-color: ${styles.track.backgroundColor};
            height: ${styles.track.height};
            border-radius: ${styles.track.borderRadius};
        `
    }}

    &[data-orientation="vertical"] {
        width: ${({ $variant, $size, $tokens }) => {
            const styles = getSliderTokenStyles($variant, $size, $tokens)
            return styles.track.height
        }};
        height: 100%;
    }
`

const StyledRange = styled(SliderPrimitive.Range)<StyledSliderProps>`
    ${({ $variant, $size, $tokens }) => {
        const styles = getSliderTokenStyles($variant, $size, $tokens)
        return css`
            position: absolute;
            background-color: ${styles.range.backgroundColor};
            height: ${styles.range.height};
            border-radius: ${styles.range.borderRadius};
        `
    }}

    &[data-orientation="vertical"] {
        width: ${({ $variant, $size, $tokens }) => {
            const styles = getSliderTokenStyles($variant, $size, $tokens)
            return styles.range.height
        }};
        height: var(--radix-slider-range-height);
    }
`

const StyledThumb = styled(SliderPrimitive.Thumb)<StyledSliderProps>`
    ${({ $variant, $size, $tokens }) => {
        const styles = getSliderTokenStyles($variant, $size, $tokens)
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
        ${({ $variant, $size, $tokens }) => {
            const styles = getSliderTokenStyles($variant, $size, $tokens)
            return css`
                box-shadow: ${styles.thumb['&:hover']?.boxShadow};
            `
        }}
    }

    &:focus {
        ${({ $variant, $size, $tokens }) => {
            const styles = getSliderTokenStyles($variant, $size, $tokens)
            return css`
                outline: ${styles.thumb['&:focus']?.outline};
                outline-offset: ${styles.thumb['&:focus']?.outlineOffset};
                @supports (
                    box-shadow: 0 0 0 2px
                        color-mix(in srgb, black 12%, transparent)
                ) {
                    outline: none;
                    box-shadow: ${styles.thumb['&:focus']?.boxShadow};
                }
            `
        }}
    }

    &:focus-visible {
        ${({ $variant, $size, $tokens }) => {
            const styles = getSliderTokenStyles($variant, $size, $tokens)
            return css`
                outline: ${styles.thumb['&:focus-visible']?.outline};
                outline-offset: ${styles.thumb['&:focus-visible']
                    ?.outlineOffset};
                @supports (
                    box-shadow: 0 0 0 2px
                        color-mix(in srgb, black 12%, transparent)
                ) {
                    outline: none;
                    box-shadow: ${styles.thumb['&:focus-visible']?.boxShadow ||
                    styles.thumb['&:focus']?.boxShadow};
                }
            `
        }}
    }

    &:active {
        ${({ $variant, $size, $tokens }) => {
            const styles = getSliderTokenStyles($variant, $size, $tokens)
            return css`
                cursor: ${styles.thumb['&:active']?.cursor};
            `
        }}
    }

    &[data-disabled] {
        ${({ $variant, $size, $tokens }) => {
            const styles = getSliderTokenStyles($variant, $size, $tokens)
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
    $tokens: SliderTokensType
}>`
    ${({ $position, $tokens }) => {
        const styles = getSliderLabelStyles($position, $tokens)
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
>(
    (
        {
            variant = SliderVariant.PRIMARY,
            size = SliderSize.MEDIUM,
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
        const tokens = useResponsiveTokens<SliderTokensType>('SLIDER')
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
                $tokens={tokens}
                value={value}
                defaultValue={defaultValue}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                orientation={orientation}
                {...props}
            >
                <StyledTrack $variant={variant} $size={size} $tokens={tokens}>
                    <StyledRange
                        $variant={variant}
                        $size={size}
                        $tokens={tokens}
                    />
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
                            $tokens={tokens}
                            {...thumbAriaProps}
                        >
                            {showValueLabels && (
                                <StyledValueLabel
                                    $size={size}
                                    $position={labelPosition}
                                    $tokens={tokens}
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

Slider.displayName = 'Slider'

export default Slider
