import { ReactNode } from "react";

export enum RadioSize {
  SMALL = "sm",
  MEDIUM = "md",
}

export type RadioProps = {
  id?: string;
  value?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  size?: RadioSize;
  children?: ReactNode;
  subtext?: string;
  slot?: ReactNode;
  name?: string;
};

export type RadioGroupProps = {
  id?: string;
  label?: string;
  name: string;
  defaultValue?: string;
  value?: string;
  children: ReactNode;
  onChange?: (value: string) => void;
  disabled?: boolean;
};
