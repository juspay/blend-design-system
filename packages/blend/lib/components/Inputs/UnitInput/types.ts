export enum UnitInputSize {
  MEDIUM = "md",
  LARGE = "lg",
}

export enum UnitPosition {
  LEFT = "left",
  RIGHT = "right",
}

export type UnitInputProps = {
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  step?: number;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  size?: UnitInputSize;
  label: string;
  sublabel?: string;
  helpIconHintText?: string;
  hintText?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  unit: string;
  unitPosition?: UnitPosition;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "style" | "className"
>;
