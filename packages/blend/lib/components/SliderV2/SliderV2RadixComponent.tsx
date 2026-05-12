import { styled, css } from 'styled-components'
import * as SliderPrimitive from '@radix-ui/react-slider'
import { getSliderV2TokenStyles } from './SliderV2.tokens'
import {
    SliderV2Size,
    SliderV2Variant,
    SliderV2LabelPosition,
} from './SliderV2.types'
import { getSliderLabelStyles } from './utils'

export const StyledRoot = styled(SliderPrimitive.Root)<{
    $variant: SliderV2Variant
    $size: SliderV2Size
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderV2TokenStyles($variant, $size)
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
            const styles = getSliderV2TokenStyles(
                SliderV2Variant.PRIMARY,
                $size
            )
            return styles.root.height
        }};
        height: 100%;
    }

    &[data-disabled] {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

export const StyledTrack = styled(SliderPrimitive.Track)<{
    $variant: SliderV2Variant
    $size: SliderV2Size
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderV2TokenStyles($variant, $size)
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
            const styles = getSliderV2TokenStyles($variant, $size)
            return styles.track.height
        }};
        height: 100%;
    }
`

export const StyledRange = styled(SliderPrimitive.Range)<{
    $variant: SliderV2Variant
    $size: SliderV2Size
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderV2TokenStyles($variant, $size)
        return css`
            position: absolute;
            background-color: ${styles.range.backgroundColor};
            height: ${styles.range.height};
            border-radius: ${styles.range.borderRadius};
        `
    }}

    &[data-orientation="vertical"] {
        width: ${({ $variant, $size }) => {
            const styles = getSliderV2TokenStyles($variant, $size)
            return styles.range.height
        }};
        height: var(--radix-slider-range-height);
    }
`

export const StyledThumb = styled(SliderPrimitive.Thumb)<{
    $variant: SliderV2Variant
    $size: SliderV2Size
}>`
    ${({ $variant, $size }) => {
        const styles = getSliderV2TokenStyles($variant, $size)
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
            const styles = getSliderV2TokenStyles($variant, $size)
            return css`
                box-shadow: ${styles.thumb['&:hover']?.boxShadow};
            `
        }}
    }

    &:focus {
        ${({ $variant, $size }) => {
            const styles = getSliderV2TokenStyles($variant, $size)
            return css`
                outline: none;
                box-shadow: ${styles.thumb['&:focus']?.boxShadow};
            `
        }}
    }

    &:focus-visible {
        ${({ $variant, $size }) => {
            const styles = getSliderV2TokenStyles($variant, $size)
            return css`
                outline: none;
                box-shadow: ${styles.thumb['&:focus-visible']?.boxShadow ||
                styles.thumb['&:focus']?.boxShadow};
            `
        }}
    }

    &:active {
        ${({ $variant, $size }) => {
            const styles = getSliderV2TokenStyles($variant, $size)
            return css`
                cursor: ${styles.thumb['&:active']?.cursor};
            `
        }}
    }

    &[data-disabled] {
        ${({ $variant, $size }) => {
            const styles = getSliderV2TokenStyles($variant, $size)
            return css`
                cursor: ${styles.thumb['&:disabled']?.cursor};
                opacity: ${styles.thumb['&:disabled']?.opacity};
            `
        }}
    }
`

export const StyledValueLabel = styled.div<{
    $size: SliderV2Size
    $position: SliderV2LabelPosition
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
