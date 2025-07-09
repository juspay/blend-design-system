export enum NumberInputSize {
  MEDIUM = "md",
  LARGE = "lg",
}

export type NumberInputProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  error?: boolean;
  errorMessage?: string;
  size?: NumberInputSize;
  label: string;
  sublabel?: string;
  helpIconHintText?: string;
  hintText?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "style" | "className" | "value"
>;
