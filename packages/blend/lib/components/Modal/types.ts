import { ReactNode } from "react";
import { ButtonV2Props } from "../ButtonV2";

type ModalButtonAction = Omit<ButtonV2Props, "buttonGroupPosition">;

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  primaryAction?: ModalButtonAction;
  secondaryAction?: ModalButtonAction;
  className?: string;
  showCloseButton?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
  closeOnBackdropClick?: boolean;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  headerRightSlot?: ReactNode;
  showDivider?: boolean;
};
