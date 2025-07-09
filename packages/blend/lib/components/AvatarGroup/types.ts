import { HTMLAttributes } from "react";
import { AvatarProps, AvatarSize, AvatarShape } from "../Avatar/types";

export interface AvatarData extends Omit<AvatarProps, "className" | "id"> {
  id: string | number;
  alt?: string;
  fallback?: string | React.ReactNode;
}

export type AvatarGroupProps = {
  avatars: AvatarData[];
  maxCount?: number;
  size?: AvatarSize;
  shape?: AvatarShape;
  selectedAvatarIds?: (string | number)[];
  onSelectionChange?: (selectedIds: (string | number)[]) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

export type StyledAvatarGroupContainerProps = {
  $spacing?: string;
};

export type StyledAvatarWrapperProps = {
  $index: number;
  $total: number;
  $isSelected: boolean;
  $size: AvatarSize;
};

export type StyledOverflowCounterProps = {
  $size: AvatarSize;
  $shape: AvatarShape;
  $isOpen: boolean;
};
