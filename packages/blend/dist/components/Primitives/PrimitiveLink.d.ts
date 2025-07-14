import { default as React, JSX } from 'react'
import { CSSObject } from 'styled-components'
type StateStyles = {
    _hover?: StyledLinkProps
    _focus?: StyledLinkProps
    _active?: StyledLinkProps
    _disabled?: StyledLinkProps
    _visited?: StyledLinkProps
}
type StyledLinkProps = StateStyles & {
    color?: CSSObject['color']
    gap?: CSSObject['gap']
    fontSize?: CSSObject['fontSize']
    fontWeight?: CSSObject['fontWeight']
    lineHeight?: CSSObject['lineHeight']
    letterSpacing?: CSSObject['letterSpacing']
    textAlign?: CSSObject['textAlign']
    textTransform?: CSSObject['textTransform']
    textOverflow?: CSSObject['textOverflow']
    textDecoration?: CSSObject['textDecoration']
    padding?: CSSObject['padding']
    paddingX?: CSSObject['paddingX']
    paddingY?: CSSObject['paddingY']
    paddingTop?: CSSObject['paddingTop']
    paddingBottom?: CSSObject['paddingBottom']
    paddingLeft?: CSSObject['paddingLeft']
    paddingRight?: CSSObject['paddingRight']
    margin?: CSSObject['margin']
    marginX?: CSSObject['marginX']
    marginY?: CSSObject['marginY']
    marginTop?: CSSObject['marginTop']
    marginBottom?: CSSObject['marginBottom']
    marginLeft?: CSSObject['marginLeft']
    marginRight?: CSSObject['marginRight']
    display?: CSSObject['display']
    width?: CSSObject['width']
    height?: CSSObject['height']
    cursor?: CSSObject['cursor']
    whiteSpace?: CSSObject['whiteSpace']
    transition?: CSSObject['transition']
    backgroundColor?: CSSObject['backgroundColor']
    border?: CSSObject['border']
    borderRadius?: CSSObject['borderRadius']
    opacity?: CSSObject['opacity']
}
type SemanticLinkTag = keyof Pick<JSX.IntrinsicElements, 'a' | 'span' | 'div'>
export type PrimitiveLinkProps = StyledLinkProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'color' | 'as'> & {
        as?: SemanticLinkTag
        children?: React.ReactNode
        ref?: React.Ref<HTMLAnchorElement>
    }
/**
 * PrimitiveLink Component
 * @description
 * A highly customizable anchor component styled via props.
 */
declare const PrimitiveLink: React.ForwardRefExoticComponent<
    Omit<PrimitiveLinkProps, 'ref'> & React.RefAttributes<HTMLAnchorElement>
>
export default PrimitiveLink
