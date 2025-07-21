import { default as React } from 'react';
import { CSSObject } from 'styled-components';
export declare enum ButtonType {
    PRIMARY = "primary",
    SECONDARY = "secondary",
    DANGER = "danger",
    SUCCESS = "success"
}
export declare enum ButtonSize {
    SMALL = "sm",
    MEDIUM = "md",
    LARGE = "lg"
}
export declare enum ButtonSubType {
    DEFAULT = "default",
    ICON_ONLY = "iconOnly",
    INLINE = "inline"
}
export type ButtonV2Props = {
    buttonType?: ButtonType;
    size?: ButtonSize;
    subType?: ButtonSubType;
    text?: string;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    isLoading?: boolean;
    isDisabled?: boolean;
    disabled?: boolean;
    onClick?: () => void;
    loading?: boolean;
    buttonGroupPosition?: 'center' | 'left' | 'right';
    fullWidth?: boolean;
    justifyContent?: CSSObject['justifyContent'];
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>;
