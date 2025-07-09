export enum SelectMenuAlignment {
  START = "start",
  CENTER = "center",
  END = "end",
}

export enum SelectMenuVariant {
  CONTAINER = "container",
  NO_CONTAINER = "no-container",
}

export enum SelectMenuSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum SelectMenuSide {
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM = "bottom",
}

export type SelectMenuGroupType = {
  groupLabel?: string;
  items: SelectMenuItemType[];
  showSeparator?: boolean;
};

export type SelectMenuProps = {
  trigger?: React.ReactNode;
  items: SelectMenuGroupType[];
  asModal?: boolean;
  alignment?: SelectMenuAlignment;
  side?: SelectMenuSide;
  sideOffset?: number;
  alignOffset?: number;
  collisonBoundaryRef?: Element | null | Array<Element | null>;
  maxHeight?: number;
  selected?: string | string[];
  onSelect?: (value: string | string[]) => void;
  allowMultiSelect?: boolean;
  enableSearch?: boolean;
};

export type SelectMenuItemType = {
  label: string;
  value: string;
  checked?: boolean;
  subLabel?: string;
  slot1?: React.ReactNode;
  slot2?: React.ReactNode;
  slot3?: React.ReactNode;
  slot4?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  subMenu?: SelectMenuItemType[];
};

export const dummyMenuItemsLong: SelectMenuGroupType[] = Array.from(
  { length: 5 },
  (_, groupIndex) => ({
    groupLabel: `Group ${groupIndex + 1}`,
    showSeparator: groupIndex < 99,
    items: Array.from({ length: 2 }, (_, itemIndex) => {
      const itemNumber = groupIndex * 10 + itemIndex + 1;
      return {
        label: `Item ${itemNumber}`,
        value: `item-${itemNumber}`,
        subMenu:
          itemNumber % 20 === 0
            ? [
                {
                  label: `Sub Item ${itemNumber}-1`,
                  value: `sub-item-${itemNumber}-1`,
                },
                {
                  label: `Sub Item ${itemNumber}-2`,
                  value: `sub-item-${itemNumber}-2`,
                },
              ]
            : undefined,
      };
    }),
  }),
);
