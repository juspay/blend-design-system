import { ReactNode } from "react";
import { DirectoryData } from "../Directory/types";

export type SidebarNavItem = {
  label: string;
  leftSlot?: ReactNode;
  rightSlot?: ReactNode;
  onClick?: () => void;
};

export type SidebarNavSection = {
  label?: string;
  navItems: SidebarNavItem[];
};

export type MerchantData = {
  label: string;
  sections: SidebarNavSection[];
};

export type TenantData = {
  label: string;
  icon: ReactNode;
  merchantData: MerchantData[];
};

type TenantInfo = {
  label: string;
  icon: ReactNode;
  id?: string;
};

type MerchantInfo = {
  label: string;
  icon: ReactNode;
  id?: string;
};

export type SidebarProps = {
  tenants: TenantInfo[];
  merchants: MerchantInfo[];
  children: ReactNode;
  data: DirectoryData[];
  topbar: ReactNode;
  activeTenant?: string;
  setActiveTenant?: (tenant: string) => void;
  activeMerchant?: string;
  setActiveMerchant?: (merchant: string) => void;
  footer?: ReactNode;
};
