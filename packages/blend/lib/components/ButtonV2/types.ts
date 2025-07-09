import React from "react";
import { CSSObject } from "styled-components";

export enum ButtonTypeV2 {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  SUCCESS = "success",
}

export enum ButtonSizeV2 {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum ButtonSubTypeV2 {
  DEFAULT = "default",
  ICON_ONLY = "iconOnly",
  INLINE = "inline",
}

export type ButtonV2Props = {
  buttonType?: ButtonTypeV2;
  size?: ButtonSizeV2;
  subType?: ButtonSubTypeV2;
  text?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  isLoading?: boolean;
  isDisabled?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  loading?: boolean;
  buttonGroupPosition?: "center" | "left" | "right";
  fullWidth?: boolean;
  justifyContent?: CSSObject["justifyContent"];
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style" | "className">;
