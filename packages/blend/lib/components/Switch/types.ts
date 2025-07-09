import { ReactNode } from "react";

export enum SwitchSize {
  SMALL = "sm",
  MEDIUM = "md",
}

export type SwitchProps = {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  size?: SwitchSize;
  label?: ReactNode;
  subtext?: ReactNode;
  slot?: ReactNode;
  name?: string;
  value?: string;
};

export type SwitchGroupProps = {
  id?: string;
  label?: string;
  name?: string;
  children: ReactNode;
  disabled?: boolean;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};
