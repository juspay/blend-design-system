import { ReactNode } from "react";
import { TagColor, TagProps, TagShape, TagSize, TagVariant } from "../Tags";

export type TagConfig = {
  text: string;
  variant?: TagVariant;
  style?: TagColor;
  onClick?: () => void;
};

export type SplitTagProps = {
  primaryTag: Omit<TagProps, "splitTagPosition" | "size" | "shape">;
  secondaryTag?: Omit<TagProps, "splitTagPosition" | "size" | "shape">;
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  size?: TagSize;
  shape?: TagShape;
};
