export type SearchInputProps = {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  error?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "style" | "className"
>;
