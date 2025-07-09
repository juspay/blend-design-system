import { ReactNode } from "react";

export enum AccordionType {
  BORDER = "border",
  NO_BORDER = "noBorder",
}

export enum AccordionChevronPosition {
  LEFT = "left",
  RIGHT = "right",
}

export type AccordionItemProps = {
  value: string;
  title: string;
  subtext?: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  subtextSlot?: ReactNode;
  children: ReactNode;
  isDisabled?: boolean;
  className?: string;
  chevronPosition?: AccordionChevronPosition;
};

export type AccordionProps = {
  children: ReactNode;
  accordionType?: AccordionType;
  defaultValue?: string | string[];
  value?: string | string[];
  isMultiple?: boolean;
  onValueChange?: (value: string | string[]) => void;
} 
