import React from "react";
import PrimitiveText, {
  PrimitiveTextProps,
} from "../Primitives/PrimitiveText/PrimitiveText";
import { JSX } from "react";
import { FOUNDATION_THEME } from "../../tokens";

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

export type TextProps = PrimitiveTextProps & {
  children: React.ReactNode;
  variant?: VariantType;
  as?: SemanticTagType;
  style?: React.CSSProperties;
};

export type VariantType =
  | "body.xs"
  | "body.sm"
  | "body.md"
  | "body.lg"
  | "display.sm"
  | "display.md"
  | "display.lg"
  | "display.xl"
  | "heading.sm"
  | "heading.md"
  | "heading.lg"
  | "heading.xl"
  | "heading.2xl"
  | "code.sm"
  | "code.md"
  | "code.lg";

const getFontGroup = (
  variant?: VariantType,
): { fontSize: number; lineHeight: number } | null => {
  if (!variant) return null;
  const [type, size] = variant.split(".") as [
    keyof typeof FOUNDATION_THEME.font.size,
    keyof (typeof FOUNDATION_THEME.font.size)[keyof typeof FOUNDATION_THEME.font.size],
  ];

  return FOUNDATION_THEME.font.size[type]?.[size] || null;
};

const getSemanticTag = (
  variant?: VariantType,
  as?: SemanticTagType,
): SemanticTagType => {
  if (as) return as;
  if (!variant) return "p";

  if (variant.startsWith("display")) return "h1";
  if (variant.startsWith("heading")) {
    const size = variant.split(".")[1];
    switch (size) {
      case "2xl":
        return "h1";
      case "xl":
        return "h2";
      case "lg":
        return "h3";
      case "md":
        return "h4";
      case "sm":
        return "h5";
      default:
        return "p";
    }
  }
  return "p";
};

const Text = ({
  children,
  variant,
  as,
  color,
  fontWeight,
  fontSize,
  truncate,
  style,
  ...rest
}: TextProps) => {
  const Tag = getSemanticTag(variant, as);

  // treat as PrimitiveText if variant is undefined
  if (variant === undefined) {
    return (
      <PrimitiveText
        as={Tag}
        fontSize={fontSize}
        fontWeight={fontWeight}
        color={color ?? "inherit"}
        style={style}
      >
        {children}
      </PrimitiveText>
    );
  }

  const fontGroup = getFontGroup(variant);

  return (
    <PrimitiveText
      as={Tag}
      fontSize={fontGroup?.fontSize}
      fontWeight={fontWeight}
      color={color ?? "inherit"}
      truncate={truncate}
      style={style}
      {...rest}
    >
      {children}
    </PrimitiveText>
  );
};

export default Text;
