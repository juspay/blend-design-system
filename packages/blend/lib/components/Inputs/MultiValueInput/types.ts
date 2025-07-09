import { TextInputSize } from "../TextInput/types";

export enum MultiValueInputSize {
  MD = "md",
  LG = "lg",
}

export enum MultiValueInputState {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
  ERROR = "error",
  DISABLED = "disabled",
}

export type MultiValueInputProps = {
  label: string;
  sublabel?: string;
  helpIconHintText?: string;
  error?: boolean;
  errorMessage?: string;
  hintText?: string;
  disabled?: boolean;
  tags?: string[];
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  size?: TextInputSize;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "style" | "className"
>;
