import React, { forwardRef } from "react";
import styled, { css, CSSObject } from "styled-components";

// State-specific style overrides
type StateStyles = {
  _hover?: PrimitiveButtonProps;
  _focus?: PrimitiveButtonProps;
  _active?: PrimitiveButtonProps;
  _disabled?: PrimitiveButtonProps;
  _visited?: PrimitiveButtonProps;
  _focusVisible?: PrimitiveButtonProps;
  _focusWithin?: PrimitiveButtonProps;
};

// Base props type
type PrimitiveButtonProps = StateStyles & {
  // Spacing
  padding?: CSSObject["padding"];
  paddingX?: CSSObject["padding"];
  paddingY?: CSSObject["padding"];
  margin?: CSSObject["margin"];
  marginX?: CSSObject["margin"];
  marginY?: CSSObject["margin"];

  // Layout
  display?: CSSObject["display"];
  justifyContent?: CSSObject["justifyContent"];
  alignItems?: CSSObject["alignItems"];
  gap?: CSSObject["gap"];
  contentCentered?: boolean;

  // Sizing
  width?: CSSObject["width"];
  height?: CSSObject["height"];
  size?: CSSObject["width"] | CSSObject["height"];
  minWidth?: CSSObject["minWidth"];
  maxWidth?: CSSObject["maxWidth"];
  minHeight?: CSSObject["minHeight"];
  maxHeight?: CSSObject["maxHeight"];

  // Flex
  flexGrow?: CSSObject["flexGrow"];
  flexShrink?: CSSObject["flexShrink"];
  flexBasis?: CSSObject["flexBasis"];

  // Positioning
  position?: CSSObject["position"];
  top?: CSSObject["top"];
  right?: CSSObject["right"];
  bottom?: CSSObject["bottom"];
  left?: CSSObject["left"];
  zIndex?: CSSObject["zIndex"];

  // Visual
  backgroundColor?: CSSObject["backgroundColor"];
  background?: CSSObject["background"];
  color?: CSSObject["color"];
  border?: CSSObject["border"];
  borderTop?: CSSObject["borderTop"];
  borderRight?: CSSObject["borderRight"];
  borderBottom?: CSSObject["borderBottom"];
  borderLeft?: CSSObject["borderLeft"];
  borderRadius?: CSSObject["borderRadius"];
  boxShadow?: CSSObject["boxShadow"];
  textAlign?: CSSObject["textAlign"];
  whiteSpace?: CSSObject["whiteSpace"];
  overflow?: CSSObject["overflow"];
  overflowX?: CSSObject["overflowX"];
  overflowY?: CSSObject["overflowY"];
  cursor?: CSSObject["cursor"];

  // Outline
  outline?: CSSObject["outline"];
  outlineOffset?: CSSObject["outlineOffset"];
  outlineStyle?: CSSObject["outlineStyle"];
  outlineWidth?: CSSObject["outlineWidth"];
  outlineColor?: CSSObject["outlineColor"];

  // State
  disabled?: boolean;

  // Text
  fontWeight?: CSSObject["fontWeight"];
  fontSize?: CSSObject["fontSize"];
  fontFamily?: CSSObject["fontFamily"];
  textDecoration?: CSSObject["textDecoration"];
  textUnderlineOffset?: CSSObject["textUnderlineOffset"];
  textTransform?: CSSObject["textTransform"];
};

// Prevent these props from reaching the DOM
const blockedProps = [
  "padding",
  "paddingX",
  "paddingY",
  "margin",
  "marginX",
  "marginY",
  "display",
  "justifyContent",
  "alignItems",
  "gap",
  "contentCentered",
  "width",
  "height",
  "size",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "backgroundColor",
  "background",
  "color",
  "border",
  "borderTop",
  "borderRight",
  "borderBottom",
  "borderLeft",
  "borderRadius",
  "boxShadow",
  "textAlign",
  "whiteSpace",
  "overflow",
  "overflowX",
  "overflowY",
  "cursor",
  "outline",
  "outlineOffset",
  "outlineStyle",
  "outlineWidth",
  "outlineColor",
  "variant",
  "_hover",
  "_focus",
  "_active",
  "_disabled",
  "_visited",
  "_focusVisible",
  "_focusWithin",
  "fontWeight",
  "fontSize",
  "fontFamily",
  "textDecoration",
  "textUnderlineOffset",
  "textTransform",
];

const shouldForwardProp = (prop: string) => !blockedProps.includes(prop);

// Convert props to CSSObject
const getStyles = (props: PrimitiveButtonProps): CSSObject => {
  const styles: CSSObject = {
    appearance: "none",
    outline: "none",
    border: "none",
    font: "inherit",
    cursor: props.disabled ? "not-allowed" : (props.cursor ?? "pointer"),
    opacity: props.disabled ? 0.6 : 1,
  };

  // Layout
  if (props.contentCentered) {
    styles.display = props.display ?? "flex";
    styles.justifyContent = props.justifyContent ?? "center";
    styles.alignItems = props.alignItems ?? "center";
  } else {
    if (props.display) styles.display = props.display;
    if (props.justifyContent) styles.justifyContent = props.justifyContent;
    if (props.alignItems) styles.alignItems = props.alignItems;
  }

  if (props.gap) styles.gap = props.gap;

  // Spacing
  if (props.padding) styles.padding = props.padding;
  if (props.paddingX) {
    styles.paddingLeft = props.paddingX;
    styles.paddingRight = props.paddingX;
  }
  if (props.paddingY) {
    styles.paddingTop = props.paddingY;
    styles.paddingBottom = props.paddingY;
  }
  if (props.margin) styles.margin = props.margin;
  if (props.marginX) {
    styles.marginLeft = props.marginX;
    styles.marginRight = props.marginX;
  }
  if (props.marginY) {
    styles.marginTop = props.marginY;
    styles.marginBottom = props.marginY;
  }

  // Sizing
  if (props.size) {
    styles.width = props.size;
    styles.height = props.size;
  } else {
    if (props.width) styles.width = props.width;
    if (props.height) styles.height = props.height;
  }

  if (props.minWidth) styles.minWidth = props.minWidth;
  if (props.maxWidth) styles.maxWidth = props.maxWidth;
  if (props.minHeight) styles.minHeight = props.minHeight;
  if (props.maxHeight) styles.maxHeight = props.maxHeight;

  // Flex
  if (props.flexGrow) styles.flexGrow = props.flexGrow;
  if (props.flexShrink) styles.flexShrink = props.flexShrink;
  if (props.flexBasis) styles.flexBasis = props.flexBasis;

  // Position
  if (props.position) styles.position = props.position;
  if (props.top) styles.top = props.top;
  if (props.right) styles.right = props.right;
  if (props.bottom) styles.bottom = props.bottom;
  if (props.left) styles.left = props.left;
  if (props.zIndex) styles.zIndex = props.zIndex;

  // Visual
  if (props.backgroundColor) styles.backgroundColor = props.backgroundColor;
  if (props.background) styles.background = props.background;
  if (props.color) styles.color = props.color;
  if (props.border) styles.border = props.border;
  if (props.borderTop) styles.borderTop = props.borderTop;
  if (props.borderRight) styles.borderRight = props.borderRight;
  if (props.borderBottom) styles.borderBottom = props.borderBottom;
  if (props.borderLeft) styles.borderLeft = props.borderLeft;
  if (props.borderRadius) styles.borderRadius = props.borderRadius;
  if (props.boxShadow) styles.boxShadow = props.boxShadow;
  if (props.textAlign) styles.textAlign = props.textAlign;
  if (props.whiteSpace) styles.whiteSpace = props.whiteSpace;
  if (props.overflow) styles.overflow = props.overflow;
  if (props.overflowX) styles.overflowX = props.overflowX;
  if (props.overflowY) styles.overflowY = props.overflowY;

  // Outline
  if (props.outline) styles.outline = props.outline;
  if (props.outlineOffset) styles.outlineOffset = props.outlineOffset;
  if (props.outlineStyle) styles.outlineStyle = props.outlineStyle;
  if (props.outlineWidth) styles.outlineWidth = props.outlineWidth;
  if (props.outlineColor) styles.outlineColor = props.outlineColor;

  return styles;
};

// Map state props to CSS pseudo-selectors
const stateToSelector: Record<keyof StateStyles, string> = {
  _hover: "&:hover",
  _focus: "&:focus",
  _active: "&:active",
  _disabled: "&:disabled",
  _visited: "&:visited",
  _focusVisible: "&:focus-visible",
  _focusWithin: "&:focus-within",
};

// Styled button
const StyledButton = styled.button.withConfig({
  shouldForwardProp,
})<PrimitiveButtonProps>((props) => {
  const base = getStyles(props);
  const stateStyles = Object.entries(stateToSelector).reduce(
    (acc, [key, selector]) => {
      const stateProps = props[key as keyof StateStyles];
      if (stateProps) acc[selector] = getStyles(stateProps);
      return acc;
    },
    {} as CSSObject,
  );

  return css({ ...base, ...stateStyles });
});

// Exported props
export type ButtonProps = PrimitiveButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> & {
    children?: React.ReactNode;
  };

// Component
const PrimitiveButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled, cursor, ...rest }, ref) => {
    return (
      <StyledButton cursor={cursor} ref={ref} disabled={disabled} {...rest}>
        {children}
      </StyledButton>
    );
  },
);

PrimitiveButton.displayName = "PrimitiveButton";

export default PrimitiveButton;
