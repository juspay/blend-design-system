import { CSSObject } from "styled-components";

export type TextAreaProps = {
  value: string;
  placeholder: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
  label: string;
  sublabel?: string;
  hintText?: string;
  helpIconHintText?: string;
  helpIconText?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  resize?: "none" | "both" | "horizontal" | "vertical" | "block" | "inline";
  wrap?: CSSObject["whiteSpace"];
} & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size" | "style" | "className"
>;
