export enum MenuAlignment {
  START = "start",
  CENTER = "center",
  END = "end",
}

export enum MenuSide {
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM = "bottom",
}

export type MenuV2Props = {
  trigger: React.ReactNode;
  items?: MenuV2GroupType[];

  maxHeight?: number;
  minHeight?: number;
  maxWidth?: number;
  minWidth?: number;
  // width?: number;
  // height?: number;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  // Radix Menu Props
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  asModal?: boolean;
  alignment?: MenuAlignment;
  side?: MenuSide;
  sideOffset?: number;
  alignOffset?: number;
  collisonBoundaryRef?: Element | null | Array<Element | null>;
};

export enum MenuItemV2Variant {
  DEFAULT = "default",
  ACTION = "action",
}

export enum MenuItemV2ActionType {
  PRIMARY = "primary",
  DANGER = "danger",
}

export type MenuItemV2Type = {
  label: string;
  subLabel?: string;
  slot1?: React.ReactNode;
  slot2?: React.ReactNode;
  slot3?: React.ReactNode;
  slot4?: React.ReactNode;
  variant?: MenuItemV2Variant;
  actionType?: MenuItemV2ActionType;
  disabled?: boolean;
  onClick?: () => void;
  subMenu?: MenuItemV2Type[];
};

export type MenuV2GroupType = {
  label?: string;
  items: MenuItemV2Type[];
  showSeparator?: boolean;
};
