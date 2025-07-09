import { ReactNode } from "react";
import { ButtonSize } from "../Button/types";

export enum ButtonGroupSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum ButtonGroupMode {
  SINGLE_PRIMARY = "singlePrimary",
  ALL_SECONDARY = "allSecondary",
  NO_TRANSFORM = "noTransform",
}

export interface ButtonGroupProps {
  size?: ButtonSize;
  isStacked?: boolean;
  mode?: ButtonGroupMode;
  children: ReactNode;
}
