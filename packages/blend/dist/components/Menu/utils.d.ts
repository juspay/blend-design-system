import { MenuItemV2Type, MenuV2GroupType } from './types';
export declare const filterMenuGroups: (groups: MenuV2GroupType[], searchText: string) => MenuV2GroupType[];
export declare const filterMenuItem: (item: MenuItemV2Type, lower: string) => MenuItemV2Type | null;
