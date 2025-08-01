import React, { forwardRef } from 'react'
import styled, { css, type CSSObject } from 'styled-components'

type StateStyles = {
    _hover?: PrimitiveInputProps
    _focus?: PrimitiveInputProps
    _active?: PrimitiveInputProps
    _disabled?: PrimitiveInputProps
    _visited?: PrimitiveInputProps
    _focusVisible?: PrimitiveInputProps
    _focusWithin?: PrimitiveInputProps
    _focusActive?: PrimitiveInputProps
}

type PrimitiveInputProps = StateStyles & {
    color?: CSSObject['color']
    fontSize?: CSSObject['fontSize']
    fontWeight?: CSSObject['fontWeight']
    // Positioning
    position?: CSSObject['position']
    inset?: CSSObject['inset']
    top?: CSSObject['top']
    right?: CSSObject['right']
    bottom?: CSSObject['bottom']
    left?: CSSObject['left']
    zIndex?: CSSObject['zIndex']
    pointerEvents?: CSSObject['pointerEvents']
    opacity?: CSSObject['opacity']

    // Padding
    padding?: CSSObject['padding']
    paddingTop?: CSSObject['paddingTop']
    paddingBottom?: CSSObject['paddingBottom']
    paddingLeft?: CSSObject['paddingLeft']
    paddingRight?: CSSObject['paddingRight']
    paddingX?: CSSObject['padding']
    paddingY?: CSSObject['padding']

    paddingInlineStart?: CSSObject['paddingInlineStart']
    paddingInlineEnd?: CSSObject['paddingInlineEnd']

    // Margin
    margin?: CSSObject['margin']
    marginTop?: CSSObject['marginTop']
    marginBottom?: CSSObject['marginBottom']
    marginLeft?: CSSObject['marginLeft']
    marginRight?: CSSObject['marginRight']
    marginX?: CSSObject['margin']
    marginY?: CSSObject['margin']

    // Layout / Flexbox
    display?: CSSObject['display']
    flexDirection?: CSSObject['flexDirection']
    justifyContent?: CSSObject['justifyContent']
    alignItems?: CSSObject['alignItems']
    flexWrap?: CSSObject['flexWrap']
    flexGrow?: CSSObject['flexGrow']
    flexShrink?: CSSObject['flexShrink']
    flexBasis?: CSSObject['flexBasis']
    gap?: CSSObject['gap']
    rowGap?: CSSObject['rowGap']
    columnGap?: CSSObject['columnGap']
    alignContent?: CSSObject['alignContent']
    alignSelf?: CSSObject['alignSelf']
    justifySelf?: CSSObject['justifySelf']

    // Border Radius
    borderRadius?: CSSObject['borderRadius']
    borderTopLeftRadius?: CSSObject['borderTopLeftRadius']
    borderTopRightRadius?: CSSObject['borderTopRightRadius']
    borderBottomLeftRadius?: CSSObject['borderBottomLeftRadius']
    borderBottomRightRadius?: CSSObject['borderBottomRightRadius']

    // Outline
    outline?: CSSObject['outline']
    outlineColor?: CSSObject['outlineColor']
    outlineWidth?: CSSObject['outlineWidth']
    outlineStyle?: CSSObject['outlineStyle']
    outlineOffset?: CSSObject['outlineOffset']

    // Sizing
    width?: CSSObject['width']
    height?: CSSObject['height']
    minWidth?: CSSObject['minWidth']
    minHeight?: CSSObject['minHeight']
    maxWidth?: CSSObject['maxWidth']
    maxHeight?: CSSObject['maxHeight']
    size?: CSSObject['width'] | CSSObject['height']

    // Background
    backgroundColor?: CSSObject['backgroundColor']

    // Border
    border?: CSSObject['border']
    borderTop?: CSSObject['borderTop']
    borderBottom?: CSSObject['borderBottom']
    borderLeft?: CSSObject['borderLeft']
    borderRight?: CSSObject['borderRight']
    boxShadow?: CSSObject['boxShadow']

    // Overflow
    overflow?: CSSObject['overflow']
    overflowX?: CSSObject['overflowX']
    overflowY?: CSSObject['overflowY']

    // Shortcuts
    contentCentered?: boolean

    // Cursor
    cursor?: CSSObject['cursor']

    // Placeholder
    placeholderStyles?: CSSObject
}

const blockedProps = [
    // All base props
    'padding',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'paddingX',
    'paddingY',
    'paddingInlineStart',
    'paddingInlineEnd',
    'margin',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'marginX',
    'marginY',
    'display',
    'flexDirection',
    'justifyContent',
    'alignItems',
    'flexWrap',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'gap',
    'rowGap',
    'columnGap',
    'alignContent',
    'alignSelf',
    'justifySelf',
    'borderRadius',
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius',
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'size',
    'contentCentered',
    'backgroundColor',
    'border',
    'borderTop',
    'borderBottom',
    'borderLeft',
    'borderRight',
    'boxShadow',
    'cursor',
    'overflow',
    'overflowX',
    'overflowY',
    // Positioning
    'position',
    'inset',
    'top',
    'right',
    'bottom',
    'left',
    'zIndex',
    'pointerEvents',
    'opacity',
    // Pseudo states
    '_hover',
    '_focus',
    '_active',
    '_disabled',
    '_visited',
    '_focusVisible',

    // Placeholder
    'placeholderStyles',
]

// Map state props to CSS pseudo-selectors
const stateToSelector: Record<keyof StateStyles, string> = {
    _hover: '&:hover',
    _focus: '&:focus',
    _focusVisible: '&:focus-visible',
    _focusWithin: '&:focus-within',
    _active: '&:active',
    _disabled: '&:disabled',
    _visited: '&:visited',
    _focusActive: '&:focus-active',
}

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
    PrimitiveInputProps & {
        as?: 'input' | 'textarea'
        key?: string | number
        ref?: React.Ref<HTMLInputElement>
    }

const getStyles = (props: PrimitiveInputProps): CSSObject => {
    const styles: CSSObject = {}

    if (props.color !== undefined) styles.color = props.color
    if (props.fontSize !== undefined) styles.fontSize = props.fontSize
    if (props.fontWeight !== undefined) styles.fontWeight = props.fontWeight

    if (props.position !== undefined) styles.position = props.position
    if (props.inset !== undefined) styles.inset = props.inset
    if (props.top !== undefined) styles.top = props.top
    if (props.right !== undefined) styles.right = props.right
    if (props.bottom !== undefined) styles.bottom = props.bottom
    if (props.left !== undefined) styles.left = props.left
    if (props.zIndex !== undefined) styles.zIndex = props.zIndex
    if (props.pointerEvents !== undefined)
        styles.pointerEvents = props.pointerEvents
    if (props.opacity !== undefined) styles.opacity = props.opacity

    if (props.contentCentered) {
        styles.display = props.display ?? 'flex'
        styles.justifyContent = props.justifyContent ?? 'center'
        styles.alignItems = props.alignItems ?? 'center'
    } else {
        if (props.display !== undefined) styles.display = props.display
        if (props.justifyContent !== undefined)
            styles.justifyContent = props.justifyContent
        if (props.alignItems !== undefined) styles.alignItems = props.alignItems
    }

    if (props.size !== undefined) {
        styles.width = props.size
        styles.height = props.size
    } else {
        if (props.width !== undefined) styles.width = props.width
        if (props.height !== undefined) styles.height = props.height
    }

    if (props.padding !== undefined) styles.padding = props.padding
    if (props.paddingTop !== undefined) styles.paddingTop = props.paddingTop
    if (props.paddingBottom !== undefined)
        styles.paddingBottom = props.paddingBottom
    if (props.paddingLeft !== undefined) styles.paddingLeft = props.paddingLeft
    if (props.paddingRight !== undefined)
        styles.paddingRight = props.paddingRight
    if (props.paddingInlineStart !== undefined)
        styles.paddingInlineStart = props.paddingInlineStart
    if (props.paddingInlineEnd !== undefined)
        styles.paddingInlineEnd = props.paddingInlineEnd
    if (props.paddingX !== undefined) {
        styles.paddingLeft = props.paddingX
        styles.paddingRight = props.paddingX
    }
    if (props.paddingY !== undefined) {
        styles.paddingTop = props.paddingY
        styles.paddingBottom = props.paddingY
    }

    if (props.margin !== undefined) styles.margin = props.margin
    if (props.marginTop !== undefined) styles.marginTop = props.marginTop
    if (props.marginBottom !== undefined)
        styles.marginBottom = props.marginBottom
    if (props.marginLeft !== undefined) styles.marginLeft = props.marginLeft
    if (props.marginRight !== undefined) styles.marginRight = props.marginRight
    if (props.marginX !== undefined) {
        styles.marginLeft = props.marginX
        styles.marginRight = props.marginX
    }
    if (props.marginY !== undefined) {
        styles.marginTop = props.marginY
        styles.marginBottom = props.marginY
    }

    if (props.flexDirection !== undefined)
        styles.flexDirection = props.flexDirection
    if (props.flexWrap !== undefined) styles.flexWrap = props.flexWrap
    if (props.flexGrow !== undefined) styles.flexGrow = props.flexGrow
    if (props.flexShrink !== undefined) styles.flexShrink = props.flexShrink
    if (props.flexBasis !== undefined) styles.flexBasis = props.flexBasis
    if (props.gap !== undefined) styles.gap = props.gap
    if (props.rowGap !== undefined) styles.rowGap = props.rowGap
    if (props.columnGap !== undefined) styles.columnGap = props.columnGap
    if (props.alignContent !== undefined)
        styles.alignContent = props.alignContent
    if (props.alignSelf !== undefined) styles.alignSelf = props.alignSelf
    if (props.justifySelf !== undefined) styles.justifySelf = props.justifySelf

    if (props.borderRadius !== undefined)
        styles.borderRadius = props.borderRadius
    if (props.borderTopLeftRadius !== undefined)
        styles.borderTopLeftRadius = props.borderTopLeftRadius
    if (props.borderTopRightRadius !== undefined)
        styles.borderTopRightRadius = props.borderTopRightRadius
    if (props.borderBottomLeftRadius !== undefined)
        styles.borderBottomLeftRadius = props.borderBottomLeftRadius
    if (props.borderBottomRightRadius !== undefined)
        styles.borderBottomRightRadius = props.borderBottomRightRadius

    if (props.minWidth !== undefined) styles.minWidth = props.minWidth
    if (props.minHeight !== undefined) styles.minHeight = props.minHeight
    if (props.maxWidth !== undefined) styles.maxWidth = props.maxWidth
    if (props.maxHeight !== undefined) styles.maxHeight = props.maxHeight

    if (props.backgroundColor !== undefined)
        styles.backgroundColor = props.backgroundColor

    if (props.border !== undefined) styles.border = props.border
    if (props.borderTop !== undefined) styles.borderTop = props.borderTop
    if (props.borderBottom !== undefined)
        styles.borderBottom = props.borderBottom
    if (props.borderLeft !== undefined) styles.borderLeft = props.borderLeft
    if (props.borderRight !== undefined) styles.borderRight = props.borderRight
    if (props.boxShadow !== undefined) styles.boxShadow = props.boxShadow

    if (props.overflow !== undefined) styles.overflow = props.overflow
    if (props.overflowX !== undefined) styles.overflowX = props.overflowX
    if (props.overflowY !== undefined) styles.overflowY = props.overflowY

    if (props.cursor !== undefined) styles.cursor = props.cursor

    return styles
}

const StyledInput = styled.input.withConfig({
    shouldForwardProp: (prop) => !blockedProps.includes(prop),
})<InputProps>((props) => {
    const base = getStyles(props)

    const stateStyles = Object.entries(stateToSelector).reduce(
        (acc, [key, selector]) => {
            const stateProps = props[key as keyof StateStyles]
            if (stateProps) {
                acc[selector] = getStyles(stateProps)
            }
            return acc
        },
        {} as CSSObject
    )

    const placeholderStyle = props.placeholderStyles
        ? {
              '::placeholder': props.placeholderStyles,
              '::-webkit-input-placeholder': props.placeholderStyles, // Safari / Chrome
              '::-moz-placeholder': props.placeholderStyles, // Firefox
              ':-ms-input-placeholder': props.placeholderStyles, // IE
              ':-moz-placeholder': props.placeholderStyles, // Old Firefox
          }
        : {}

    // Hide the spin button for number input
    //TODO: How to make this better
    const hideSpinButton: CSSObject = {
        '&::-webkit-inner-spin-button': {
            display: 'none',
            margin: 0,
        },
        '&::-webkit-outer-spin-button': {
            display: 'none',
            margin: 0,
        },
    }

    const outline: CSSObject = {
        '&:focus-visible': {
            outline: 'none !important',
        },
    }

    return css({
        ...base,
        ...placeholderStyle,
        ...stateStyles,
        ...outline,
        ...hideSpinButton,
    })
})

const PrimitiveInput: React.FC<InputProps> = forwardRef<
    HTMLInputElement,
    InputProps
>(({ as, ...props }, ref) => {
    return <StyledInput as={as} {...props} ref={ref} />
})

export default PrimitiveInput
