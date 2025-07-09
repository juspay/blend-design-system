import { ButtonV2Props } from "../ButtonV2";

export type PopoverActionType = Omit<
  ButtonV2Props,
  "buttonGroupPosition" | "subType"
>;

export enum PopoverSize {
  SMALL = "small",
  MEDIUM = "medium",
}

export type PopoverProps = {
  heading?: string;
  description?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
  showCloseButton?: boolean;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  asModal?: boolean;
  primaryAction?: PopoverActionType;
  secondaryAction?: PopoverActionType;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  alignOffset?: number;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  height?: number;
  minHeight?: number;
  maxHeight?: number;
  zIndex?: number;
  size?: PopoverSize;
  onClose?: () => void;
};
