import { ReactNode } from "react";

export enum TooltipSlotDirection {
  LEFT = "left",
  RIGHT = "right",
}

export enum TooltipSide {
  TOP = "top",
  RIGHT = "right",
  LEFT = "left",
  BOTTOM = "bottom",
}

export enum TooltipAlign {
  START = "start",
  END = "end",
  CENTER = "center",
}

export enum TooltipSize {
  SMALL = "sm",
  LARGE = "lg",
}

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode | string;
  open?: boolean;
  side?: TooltipSide;
  align?: TooltipAlign;
  showArrow?: boolean;
  size?: TooltipSize;
  slot?: ReactNode;
  slotDirection?: TooltipSlotDirection;
  delayDuration?: number;
  offset?: number;
};
