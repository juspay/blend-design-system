import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ComponentPropsWithoutRef, ReactNode } from "react";

export enum TabsVariant {
  BOXED = "boxed",
  FLOATING = "floating",
  UNDERLINE = "underline",
}

export enum TabsSize {
  MD = "md",
  LG = "lg",
}
export type TabsProps = ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
  variant?: TabsVariant;
  size?: TabsSize;
};

export type TabsListProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
> & {
  variant?: TabsVariant;
  size?: TabsSize;
  expanded?: boolean;
  fitContent?: boolean;
};

export type TabsTriggerProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Trigger
> & {
  value: string;
  variant?: TabsVariant;
  size?: TabsSize;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  children: string | number;
};

export type TabsContentProps = ComponentPropsWithoutRef<
  typeof TabsPrimitive.Content
>;
export type TabsStyles = {
  list: string;
  trigger: string;
};
