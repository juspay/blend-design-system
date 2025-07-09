import React, { JSX, forwardRef } from "react";
import styled, { css, CSSObject } from "styled-components";

type SpacingValue = string | number;

type StateStyles = {
  _hover?: StyledBlockProps;
  _focus?: StyledBlockProps;
  _active?: StyledBlockProps;
  _disabled?: StyledBlockProps;
  _visited?: StyledBlockProps;
  _focusVisible?: StyledBlockProps;
};

type StyledBlockProps = StateStyles & {
  color?: CSSObject["color"];

  // Positioning
  position?: CSSObject["position"];
  inset?: CSSObject["inset"];
  top?: CSSObject["top"];
  right?: CSSObject["right"];
  bottom?: CSSObject["bottom"];
  left?: CSSObject["left"];
  zIndex?: CSSObject["zIndex"];
  pointerEvents?: CSSObject["pointerEvents"];
  opacity?: CSSObject["opacity"];

  // Padding
  padding?: SpacingValue;
  paddingTop?: SpacingValue;
  paddingBottom?: SpacingValue;
  paddingLeft?: SpacingValue;
  paddingRight?: SpacingValue;
  paddingX?: SpacingValue;
  paddingY?: SpacingValue;

  // Margin
  margin?: SpacingValue;
  marginTop?: SpacingValue;
  marginBottom?: SpacingValue;
  marginLeft?: SpacingValue;
  marginRight?: SpacingValue;
  marginX?: SpacingValue;
  marginY?: SpacingValue;

  // Layout / Flexbox
  display?: CSSObject["display"];
  flexDirection?: CSSObject["flexDirection"];
  justifyContent?: CSSObject["justifyContent"];
  alignItems?: CSSObject["alignItems"];
  flexWrap?: CSSObject["flexWrap"];
  flexGrow?: CSSObject["flexGrow"];
  flexShrink?: CSSObject["flexShrink"];
  flexBasis?: CSSObject["flexBasis"];
  gap?: CSSObject["gap"];
  rowGap?: CSSObject["rowGap"];
  columnGap?: CSSObject["columnGap"];
  alignContent?: CSSObject["alignContent"];
  alignSelf?: CSSObject["alignSelf"];
  justifySelf?: CSSObject["justifySelf"];

  // Border Radius
  borderRadius?: CSSObject["borderRadius"];
  borderTopLeftRadius?: CSSObject["borderTopLeftRadius"];
  borderTopRightRadius?: CSSObject["borderTopRightRadius"];
  borderBottomLeftRadius?: CSSObject["borderBottomLeftRadius"];
  borderBottomRightRadius?: CSSObject["borderBottomRightRadius"];

  // Outline
  outline?: CSSObject["outline"];
  outlineColor?: CSSObject["outlineColor"];
  outlineWidth?: CSSObject["outlineWidth"];
  outlineStyle?: CSSObject["outlineStyle"];
  outlineOffset?: CSSObject["outlineOffset"];

  // Sizing
  width?: CSSObject["width"];
  height?: CSSObject["height"];
  minWidth?: CSSObject["minWidth"];
  minHeight?: CSSObject["minHeight"];
  maxWidth?: CSSObject["maxWidth"];
  maxHeight?: CSSObject["maxHeight"];
  size?: SpacingValue;

  // Background
  backgroundColor?: CSSObject["backgroundColor"];
  backgroundImage?: CSSObject["backgroundImage"];
  backgroundSize?: CSSObject["backgroundSize"];

  // Border
  border?: CSSObject["border"];
  borderTop?: CSSObject["borderTop"];
  borderBottom?: CSSObject["borderBottom"];
  borderLeft?: CSSObject["borderLeft"];
  borderRight?: CSSObject["borderRight"];
  boxShadow?: CSSObject["boxShadow"];

  // Overflow
  overflow?: CSSObject["overflow"];
  overflowX?: CSSObject["overflowX"];
  overflowY?: CSSObject["overflowY"];
  whiteSpace?: CSSObject["whiteSpace"];

  // Transitions
  transition?: CSSObject["transition"];

  // Shortcuts
  contentCentered?: boolean;

  // Cursor
  cursor?: CSSObject["cursor"];

  //font
  fontSize?: CSSObject["fontSize"];
  fontWeight?: CSSObject["fontWeight"];
  lineHeight?: CSSObject["lineHeight"];
  letterSpacing?: CSSObject["letterSpacing"];
  textAlign?: CSSObject["textAlign"];
  textTransform?: CSSObject["textTransform"];
  textOverflow?: CSSObject["textOverflow"];
};

const blockedProps = [
  // All base props
  "padding",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingX",
  "paddingY",
  "margin",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginX",
  "marginY",
  "display",
  "flexDirection",
  "justifyContent",
  "alignItems",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "gap",
  "rowGap",
  "columnGap",
  "alignContent",
  "alignSelf",
  "justifySelf",
  "borderRadius",
  "borderTopLeftRadius",
  "borderTopRightRadius",
  "borderBottomLeftRadius",
  "borderBottomRightRadius",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "size",
  "contentCentered",
  "backgroundColor",
  "backgroundImage",
  "backgroundSize",
  "border",
  "outline",
  "borderTop",
  "borderBottom",
  "borderLeft",
  "borderRight",
  "boxShadow",
  "cursor",
  "overflow",
  "overflowX",
  "overflowY",
  "whiteSpace",
  "transition",
  // Positioning
  "position",
  "inset",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "pointerEvents",
  "opacity",
  // Pseudo states
  "_hover",
  "_focus",
  "_active",
  "_disabled",
  "_visited",
  "_focusVisible",

  //font
  "fontSize",
  "fontWeight",
  "lineHeight",
  "letterSpacing",
  "textAlign",
  "textTransform",
];

const shouldForwardProp = (prop: string) => !blockedProps.includes(prop);

const getStyles = (props: StyledBlockProps): CSSObject => {
  const styles: CSSObject = {};

  if (props.color !== undefined) styles.color = props.color;

  if (props.position !== undefined) styles.position = props.position;
  if (props.inset !== undefined) styles.inset = props.inset;
  if (props.top !== undefined) styles.top = props.top;
  if (props.right !== undefined) styles.right = props.right;
  if (props.bottom !== undefined) styles.bottom = props.bottom;
  if (props.left !== undefined) styles.left = props.left;
  if (props.zIndex !== undefined) styles.zIndex = props.zIndex;
  if (props.pointerEvents !== undefined)
    styles.pointerEvents = props.pointerEvents;
  if (props.opacity !== undefined) styles.opacity = props.opacity;

  if (props.contentCentered) {
    styles.display = props.display ?? "flex";
    styles.justifyContent = props.justifyContent ?? "center";
    styles.alignItems = props.alignItems ?? "center";
  } else {
    if (props.display !== undefined) styles.display = props.display;
    if (props.justifyContent !== undefined)
      styles.justifyContent = props.justifyContent;
    if (props.alignItems !== undefined) styles.alignItems = props.alignItems;
  }

  if (props.size !== undefined) {
    styles.width = props.size;
    styles.height = props.size;
  } else {
    if (props.width !== undefined) styles.width = props.width;
    if (props.height !== undefined) styles.height = props.height;
  }

  if (props.padding !== undefined) styles.padding = props.padding;
  if (props.paddingTop !== undefined) styles.paddingTop = props.paddingTop;
  if (props.paddingBottom !== undefined)
    styles.paddingBottom = props.paddingBottom;
  if (props.paddingLeft !== undefined) styles.paddingLeft = props.paddingLeft;
  if (props.paddingRight !== undefined)
    styles.paddingRight = props.paddingRight;
  if (props.paddingX !== undefined) {
    styles.paddingLeft = props.paddingX;
    styles.paddingRight = props.paddingX;
  }
  if (props.paddingY !== undefined) {
    styles.paddingTop = props.paddingY;
    styles.paddingBottom = props.paddingY;
  }

  if (props.margin !== undefined) styles.margin = props.margin;
  if (props.marginTop !== undefined) styles.marginTop = props.marginTop;
  if (props.marginBottom !== undefined)
    styles.marginBottom = props.marginBottom;
  if (props.marginLeft !== undefined) styles.marginLeft = props.marginLeft;
  if (props.marginRight !== undefined) styles.marginRight = props.marginRight;
  if (props.marginX !== undefined) {
    styles.marginLeft = props.marginX;
    styles.marginRight = props.marginX;
  }
  if (props.marginY !== undefined) {
    styles.marginTop = props.marginY;
    styles.marginBottom = props.marginY;
  }

  if (props.flexDirection !== undefined)
    styles.flexDirection = props.flexDirection;
  if (props.flexWrap !== undefined) styles.flexWrap = props.flexWrap;
  if (props.flexGrow !== undefined) styles.flexGrow = props.flexGrow;
  if (props.flexShrink !== undefined) styles.flexShrink = props.flexShrink;
  if (props.flexBasis !== undefined) styles.flexBasis = props.flexBasis;
  if (props.gap !== undefined) styles.gap = props.gap;
  if (props.rowGap !== undefined) styles.rowGap = props.rowGap;
  if (props.columnGap !== undefined) styles.columnGap = props.columnGap;
  if (props.alignContent !== undefined)
    styles.alignContent = props.alignContent;
  if (props.alignSelf !== undefined) styles.alignSelf = props.alignSelf;
  if (props.justifySelf !== undefined) styles.justifySelf = props.justifySelf;

  if (props.borderRadius !== undefined)
    styles.borderRadius = props.borderRadius;
  if (props.borderTopLeftRadius !== undefined)
    styles.borderTopLeftRadius = props.borderTopLeftRadius;
  if (props.borderTopRightRadius !== undefined)
    styles.borderTopRightRadius = props.borderTopRightRadius;
  if (props.borderBottomLeftRadius !== undefined)
    styles.borderBottomLeftRadius = props.borderBottomLeftRadius;
  if (props.borderBottomRightRadius !== undefined)
    styles.borderBottomRightRadius = props.borderBottomRightRadius;

  if (props.minWidth !== undefined) styles.minWidth = props.minWidth;
  if (props.minHeight !== undefined) styles.minHeight = props.minHeight;
  if (props.maxWidth !== undefined) styles.maxWidth = props.maxWidth;
  if (props.maxHeight !== undefined) styles.maxHeight = props.maxHeight;

  if (props.backgroundColor !== undefined)
    styles.backgroundColor = props.backgroundColor;
  if (props.backgroundImage !== undefined)
    styles.backgroundImage = props.backgroundImage;
  if (props.backgroundSize !== undefined)
    styles.backgroundSize = props.backgroundSize;

  if (props.border !== undefined) styles.border = props.border;
  if (props.borderTop !== undefined) styles.borderTop = props.borderTop;
  if (props.borderBottom !== undefined)
    styles.borderBottom = props.borderBottom;
  if (props.borderLeft !== undefined) styles.borderLeft = props.borderLeft;
  if (props.borderRight !== undefined) styles.borderRight = props.borderRight;
  if (props.boxShadow !== undefined) styles.boxShadow = props.boxShadow;

  if (props.outline !== undefined) styles.outline = props.outline;
  if (props.outlineColor !== undefined)
    styles.outlineColor = props.outlineColor;
  if (props.outlineWidth !== undefined)
    styles.outlineWidth = props.outlineWidth;
  if (props.outlineStyle !== undefined)
    styles.outlineStyle = props.outlineStyle;
  if (props.outlineOffset !== undefined)
    styles.outlineOffset = props.outlineOffset;

  if (props.overflow !== undefined) styles.overflow = props.overflow;
  if (props.overflowX !== undefined) styles.overflowX = props.overflowX;
  if (props.overflowY !== undefined) styles.overflowY = props.overflowY;
  if (props.whiteSpace !== undefined) styles.whiteSpace = props.whiteSpace;
  if (props.transition !== undefined) styles.transition = props.transition;

  if (props.transition !== undefined) styles.transition = props.transition;

  if (props.cursor !== undefined) styles.cursor = props.cursor;

  if (props.fontSize !== undefined) styles.fontSize = props.fontSize;
  if (props.fontWeight !== undefined) styles.fontWeight = props.fontWeight;
  if (props.lineHeight !== undefined) styles.lineHeight = props.lineHeight;
  if (props.letterSpacing !== undefined)
    styles.letterSpacing = props.letterSpacing;
  if (props.textAlign !== undefined) styles.textAlign = props.textAlign;
  if (props.textTransform !== undefined)
    styles.textTransform = props.textTransform;
  if (props.textOverflow !== undefined)
    styles.textOverflow = props.textOverflow;

  return styles;
};

const stateToSelector: Record<keyof StateStyles, string> = {
  _hover: "&:hover",
  _focus: "&:focus",
  _active: "&:active",
  _disabled: "&:disabled",
  _visited: "&:visited",
  _focusVisible: "&:focus-visible",
};

const StyledBlock = styled.div.withConfig({
  shouldForwardProp,
})<StyledBlockProps>((props) => {
  const base = getStyles(props);

  const stateStyles = Object.entries(stateToSelector).reduce(
    (acc, [key, selector]) => {
      const stateProps = props[key as keyof StateStyles];
      if (stateProps) {
        acc[selector] = getStyles(stateProps);
      }
      return acc;
    },
    {} as CSSObject,
  );

  return css({ ...base, ...stateStyles });
});

type SemanticTagType = keyof Pick<
  JSX.IntrinsicElements,
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "main"
  | "span"
  | "nav"
  | "hr"
>;

export type BlockProps = StyledBlockProps &
  Omit<React.HTMLAttributes<HTMLElement>, "as" | "color"> & {
    children?: React.ReactNode;
    as?: SemanticTagType;
  };

/**
 * Block Component
 * @description
 * The Block component is a primitive component that renders a styled div element.
 * It is used to create consistent spacing and layout patterns across the application.
 *
 * @todo
 * - Add support for focus-visible outline
 */
const Block = forwardRef<HTMLDivElement, BlockProps>(
  ({ children, ...rest }, ref) => {
    return (
      <StyledBlock ref={ref} {...rest}>
        {children}
      </StyledBlock>
    );
  },
);

Block.displayName = "Block";

export default Block;
