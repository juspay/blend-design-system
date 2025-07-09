export enum SnackbarVariant {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

export type AddToastOptions = {
  header: string;
  description?: string;
  variant?: SnackbarVariant;
  onClose?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
};

export type CustomToastProps = {
  header: string;
  description?: string;
  variant: SnackbarVariant;
  onClose?: () => void;
  actionButton?: {
    label: string;
    onClick: () => void;
  };
};
