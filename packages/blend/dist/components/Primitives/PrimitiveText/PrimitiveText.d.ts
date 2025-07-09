import { default as React, JSX } from 'react';
import { CSSObject } from 'styled-components';
export type SemanticTagType = keyof Pick<JSX.IntrinsicElements, "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "span" | "code" | "q" | "small" | "label">;
export type PrimitiveTextProps = {
    fontWeight?: CSSObject["fontWeight"];
    color?: CSSObject["color"];
    textAlign?: CSSObject["textAlign"];
    letterSpacing?: CSSObject["letterSpacing"];
    fontFamily?: CSSObject["fontFamily"];
    opacity?: CSSObject["opacity"];
    margin?: CSSObject["margin"];
    marginX?: CSSObject["margin"];
    marginY?: CSSObject["margin"];
    padding?: CSSObject["padding"];
    paddingX?: CSSObject["padding"];
    paddingY?: CSSObject["padding"];
    fontSize?: CSSObject["fontSize"];
    truncate?: boolean;
    userSelect?: CSSObject["userSelect"];
    name?: CSSObject["name"];
    htmlFor?: CSSObject["htmlFor"];
    textTransform?: CSSObject["textTransform"];
};
export type TextProps = PrimitiveTextProps & Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
    children: React.ReactNode;
    as?: SemanticTagType;
};
/**
 * PrimitiveText Component
 * @description
 * A low-level text primitive that renders styled text without variant abstraction.
 *
 * @param {React.ReactNode} children - The content to render.
 * @param {SemanticTagType} as - Optional semantic tag to render as.
 * @param {PrimitiveTextProps} rest - Styling props.
 */
declare const PrimitiveText: React.FC<TextProps>;
export default PrimitiveText;
