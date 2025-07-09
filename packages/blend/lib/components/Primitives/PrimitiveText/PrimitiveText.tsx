import React, { JSX } from "react";
import styled, { css, CSSObject } from "styled-components";

// --------------------
// Types
// --------------------

export type SemanticTagType = keyof Pick<
  JSX.IntrinsicElements,
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "span"
  | "code"
  | "q"
  | "small"
  | "label"
>;

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

export type TextProps = PrimitiveTextProps &
  Omit<React.HTMLAttributes<HTMLElement>, "color"> & {
    children: React.ReactNode;
    as?: SemanticTagType;
  };

// --------------------
// Styled Component
// --------------------

const blockedProps = [
  "fontWeight",
  "color",
  "textAlign",
  "letterSpacing",
  "fontFamily",
  "opacity",
  "margin",
  "marginX",
  "marginY",
  "padding",
  "paddingX",
  "paddingY",
  "fontSize",
  "truncate",
  "userSelect",
  "textTransform",
];

const shouldForwardProp = (prop: string) => !blockedProps.includes(prop);

const getStyles = (props: PrimitiveTextProps): CSSObject => {
  const {
    fontWeight = 400,
    color,
    fontFamily,
    textAlign = "left",
    letterSpacing = "normal",
    opacity = 1,
    fontSize,
    textTransform,
  } = props;

  const styles: CSSObject = {};

  if (fontSize !== undefined) styles.fontSize = fontSize;
  if (fontWeight !== undefined) styles.fontWeight = fontWeight;
  if (letterSpacing !== undefined) styles.letterSpacing = letterSpacing;
  if (textAlign !== undefined) styles.textAlign = textAlign;
  if (opacity !== undefined) styles.opacity = opacity;
  if (fontFamily !== undefined) {
    styles.fontFamily = fontFamily;
  } else {
    styles.fontFamily = "inherit";
  }
  if (color !== undefined) styles.color = color;
  if (textTransform !== undefined) styles.textTransform = textTransform;
  // Spacing
  if (props.margin) styles.margin = props.margin;
  if (props.marginX) {
    styles.marginLeft = props.marginX;
    styles.marginRight = props.marginX;
  }
  if (props.marginY) {
    styles.marginTop = props.marginY;
    styles.marginBottom = props.marginY;
  }
  if (props.padding) styles.padding = props.padding;
  if (props.paddingX) {
    styles.paddingLeft = props.paddingX;
    styles.paddingRight = props.paddingX;
  }
  if (props.paddingY) {
    styles.paddingTop = props.paddingY;
    styles.paddingBottom = props.paddingY;
  }

  if (props.userSelect) styles.userSelect = props.userSelect;

  // Truncation
  if (props.truncate) {
    styles.overflow = "hidden";
    styles.textOverflow = "ellipsis";
    styles.whiteSpace = "nowrap";
  }

  return styles;
};

const StyledPrimitiveText = styled.p.withConfig({
  shouldForwardProp,
})<PrimitiveTextProps>((props) => css(getStyles(props)));

// --------------------
// Component
// --------------------

/**
 * PrimitiveText Component
 * @description
 * A low-level text primitive that renders styled text without variant abstraction.
 *
 * @param {React.ReactNode} children - The content to render.
 * @param {SemanticTagType} as - Optional semantic tag to render as.
 * @param {PrimitiveTextProps} rest - Styling props.
 */
const PrimitiveText: React.FC<TextProps> = ({ children, as, ...rest }) => {
  return (
    <StyledPrimitiveText as={as} {...rest}>
      {children}
    </StyledPrimitiveText>
  );
};

export default PrimitiveText;
