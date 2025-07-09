import { MenuItemV2Type, MenuV2GroupType } from "./types";

// Utility: Recursively filter menu items and groups by search text
export const filterMenuGroups = (
  groups: MenuV2GroupType[],
  searchText: string,
): MenuV2GroupType[] => {
  if (!searchText) return groups;
  const lower = searchText.toLowerCase();
  return groups
    .map((group: MenuV2GroupType) => {
      // TODO: Should we include the whole group if the label matches?
      // if (group.label && group.label.toLowerCase().includes(lower)) {
      //   return group;
      // }
      const filteredItems = group.items
        .map((item: MenuItemV2Type) => filterMenuItem(item, lower))
        .filter(Boolean) as MenuItemV2Type[];
      if (filteredItems.length === 0) return null;
      return { ...group, items: filteredItems };
    })
    .filter(Boolean) as MenuV2GroupType[];
};

export const filterMenuItem = (
  item: MenuItemV2Type,
  lower: string,
): MenuItemV2Type | null => {
  // Check if this item matches
  const matches =
    (item.label && item.label.toLowerCase().includes(lower)) ||
    (item.subLabel && item.subLabel.toLowerCase().includes(lower));
  // If it has a submenu, filter recursively
  if (item.subMenu) {
    const filteredSub = item.subMenu
      .map((sub: MenuItemV2Type) => filterMenuItem(sub, lower))
      .filter(Boolean) as MenuItemV2Type[];
    if (filteredSub.length > 0 || matches) {
      return { ...item, subMenu: filteredSub };
    }
    return null;
  }
  return matches ? item : null;
};
