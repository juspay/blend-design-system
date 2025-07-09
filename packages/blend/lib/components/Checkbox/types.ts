import { ReactNode } from "react";

export enum CheckboxSize {
  SMALL = "sm",
  MEDIUM = "md",
}

export type CheckboxCheckedState = "checked" | "unchecked" | "indeterminate";
export type CheckboxInteractionState =
  | "default"
  | "hover"
  | "disabled"
  | "error";

export type CheckboxProps = {
  id?: string;
  value?: string;
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  size?: CheckboxSize;
  children?: ReactNode;
  subtext?: string;
  slot?: ReactNode;
};
