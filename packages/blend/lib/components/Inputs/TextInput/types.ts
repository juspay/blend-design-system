export enum TextInputSize {
  MEDIUM = "md",
  LARGE = "lg",
}

export enum TextInputState {
  DEFAULT = "default",
  HOVER = "hover",
  FOCUS = "focus",
  ERROR = "error",
  DISABLED = "disabled",
}

export type TextInputProps = {
  label: string;
  sublabel?: string;
  hintText?: string;
  helpIconHintText?: string;
  error?: boolean;
  errorMessage?: string;
  size?: TextInputSize;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "style" | "className"
>;
