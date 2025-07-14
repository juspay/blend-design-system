import { default as React } from 'react';
import { NavItemProps } from './types';
export declare const ActiveItemProvider: React.FC<{
    children: React.ReactNode;
}>;
declare const NavItem: ({ item, index, onNavigate }: NavItemProps) => import("react/jsx-runtime").JSX.Element;
export default NavItem;
