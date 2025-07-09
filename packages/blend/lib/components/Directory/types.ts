import { ReactNode } from "react";

export type DirectoryProps = {
  className?: string;
  directoryData: DirectoryData[];
};

export type DirectoryData = {
  label?: string;
  items?: NavbarItem[];
  isCollapsible?: boolean;
  defaultOpen?: boolean;
};

export type NavbarItem = {
  label: string;
  items?: NavbarItem[];
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onClick?: () => void;
  href?: string;
};

export type SectionProps = {
  section: DirectoryData;
  sectionIndex: number;
  // totalSections: number;
  onNavigateBetweenSections: (
    direction: "up" | "down",
    currentIndex: number,
  ) => void;
};

export type NavItemProps = {
  item: NavbarItem;
  index: number;
  // totalItems: number;
  onNavigate: (direction: "up" | "down", currentIndex: number) => void;
};
