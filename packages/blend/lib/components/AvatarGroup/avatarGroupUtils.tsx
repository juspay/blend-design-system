import React, { RefObject } from "react";
import { AvatarData } from "./types";
import { AvatarProps, AvatarSize } from "../Avatar/types";

// Temporary type definition until Menu component is fully implemented
interface MenuItemProps {
  id: string;
  text: string;
  hasSlotL?: boolean;
  slotL?: React.ReactNode;
  onClick?: () => void;
  data?: Record<string, boolean | string | number>;
}

/**
 * Positions the menu relative to the overflow counter
 */
export const positionMenu = (
  menuRef: RefObject<HTMLDivElement>,
  counterRef: RefObject<HTMLButtonElement>,
): void => {
  if (!menuRef?.current || !counterRef?.current) return;

  const counterRect = counterRef.current.getBoundingClientRect();
  const menuElement = menuRef.current;
  const menuWidth = 320; // Standard menu width

  // Position the menu below the counter
  menuElement.style.position = "fixed";
  menuElement.style.top = `${counterRect.bottom + 4}px`;
  menuElement.style.left = `${counterRect.left + counterRect.width / 2 - menuWidth / 2}px`;
  menuElement.style.zIndex = "50";

  // Make sure menu doesn't go off the right edge of the screen
  const rightEdge = parseFloat(menuElement.style.left) + menuWidth;
  const windowRight = window.innerWidth;
  if (rightEdge > windowRight - 4) {
    menuElement.style.left = `${windowRight - menuWidth - 4}px`;
  }

  // Make sure menu doesn't go off the left edge
  if (parseFloat(menuElement.style.left) < 4) {
    menuElement.style.left = "4px";
  }
};

/**
 * Creates menu items from avatar data array
 */
export const createMenuItems = (
  avatars: AvatarData[],
  selectedIds: (string | number)[],
  onSelect: (id: string | number) => void,
  AvatarComponent: React.ComponentType<AvatarProps>,
): MenuItemProps[] => {
  return avatars.map((avatar): MenuItemProps => {
    const isSelected = selectedIds.includes(avatar.id);

    return {
      id: avatar.id.toString(),
      text:
        avatar.alt ||
        (typeof avatar.fallback === "string"
          ? avatar.fallback
          : `Avatar ${avatar.id}`),
      hasSlotL: true,
      slotL: (
        <AvatarComponent
          size={AvatarSize.SM} // Always use small size in menu
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          data-selected={isSelected}
        />
      ),
      onClick: () => onSelect(avatar.id),
      data: { isSelected }, // Store selection state for styling
    };
  });
};

/**
 * Filters avatars based on search term
 */
export const filterAvatars = (
  avatars: AvatarData[],
  searchTerm: string,
): AvatarData[] => {
  if (!searchTerm) return avatars;

  const lowerSearchTerm = searchTerm.toLowerCase();

  return avatars.filter((avatar) => {
    const altText = (avatar.alt || "").toLowerCase();
    const fallbackText =
      typeof avatar.fallback === "string" ? avatar.fallback.toLowerCase() : "";

    return (
      altText.includes(lowerSearchTerm) ||
      fallbackText.includes(lowerSearchTerm)
    );
  });
};
