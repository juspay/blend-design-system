import type { ComponentPropsWithoutRef, ElementType } from "react";

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  SUCCESS = "success",
}

export enum ButtonSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum ButtonSubType {
  DEFAULT = "default",
  ICON_ONLY = "iconOnly",
  LINK = "link",
  PLAIN_ICON = "plainIcon",
}

export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  buttonType?: ButtonType;
  size?: ButtonSize;
  subType?: ButtonSubType;
  text?: string;
  leadingIcon?: ElementType;
  trailingIcon?: ElementType;
  isLoading?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaPressed?: boolean | "mixed";
  ariaHasPopup?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
};
