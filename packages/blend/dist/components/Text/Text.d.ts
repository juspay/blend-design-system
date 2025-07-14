import { default as React, JSX } from 'react';
import { PrimitiveTextProps } from '../Primitives/PrimitiveText/PrimitiveText';
export type SemanticTagType = keyof Pick<JSX.IntrinsicElements, 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'code' | 'q' | 'small' | 'label'>;
export type TextProps = PrimitiveTextProps & {
    children: React.ReactNode;
    variant?: VariantType;
    as?: SemanticTagType;
    style?: React.CSSProperties;
};
export type VariantType = 'body.xs' | 'body.sm' | 'body.md' | 'body.lg' | 'display.sm' | 'display.md' | 'display.lg' | 'display.xl' | 'heading.sm' | 'heading.md' | 'heading.lg' | 'heading.xl' | 'heading.2xl' | 'code.sm' | 'code.md' | 'code.lg';
declare const Text: ({ children, variant, as, color, fontWeight, fontSize, truncate, style, ...rest }: TextProps) => import("react/jsx-runtime").JSX.Element;
export default Text;
