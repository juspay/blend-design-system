import { HTMLAttributes } from "react";

export enum AvatarSize {
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export enum AvatarShape {
  CIRCULAR = "circular",
  ROUNDED = "rounded",
}

export type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  size?: AvatarSize;
  shape?: AvatarShape;
  online?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type StyledAvatarContainerProps = {
  $size: AvatarSize;
  $shape: AvatarShape;
  $hasImage: boolean;
};

export type StyledAvatarIndicatorProps = {
  $size: AvatarSize;
};
