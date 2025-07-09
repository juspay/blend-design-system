export type OTPProps = {
  label: string;
  sublabel?: string;
  helpIconHintText?: string;
  error?: boolean;
  errorMessage?: string;
  hintText?: string;
  value?: string;
  onChange?: (value: string) => void;
  form?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "style" | "className"
>;
