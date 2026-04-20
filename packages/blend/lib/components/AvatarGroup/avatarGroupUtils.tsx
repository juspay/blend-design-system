import React from 'react'
import type { AvatarData } from './types'
import type { AvatarProps } from '../Avatar/types'
import { AvatarSize } from '../Avatar/types'
import type { MenuGroupType, MenuItemType } from '../Menu/types'

/**
 * Creates Menu groups/items from avatar data array
 */
export const createMenuItems = (
    avatars: AvatarData[],
    selectedIds: (string | number)[],
    onSelect: (id: string | number) => void,
    AvatarComponent: React.ComponentType<AvatarProps>
): MenuGroupType[] => {
    const items: MenuItemType[] = avatars.map((avatar) => {
        const isSelected = selectedIds.includes(avatar.id)

        return {
            label:
                avatar.alt ||
                (typeof avatar.fallback === 'string'
                    ? avatar.fallback
                    : `Avatar ${avatar.id}`),
            slot1: (
                <AvatarComponent
                    size={AvatarSize.SM} // Always use small size in menu
                    src={avatar.src}
                    alt={avatar.alt}
                    fallback={avatar.fallback}
                    data-selected={isSelected}
                />
            ),
            onClick: () => onSelect(avatar.id),
        }
    })

    return [
        {
            items,
        },
    ]
}

/**
 * Filters avatars based on search term
 */
export const filterAvatars = (
    avatars: AvatarData[],
    searchTerm: string
): AvatarData[] => {
    if (!searchTerm) return avatars

    const lowerSearchTerm = searchTerm.toLowerCase()

    return avatars.filter((avatar) => {
        const altText = (avatar.alt || '').toLowerCase()
        const fallbackText =
            typeof avatar.fallback === 'string'
                ? avatar.fallback.toLowerCase()
                : ''

        return (
            altText.includes(lowerSearchTerm) ||
            fallbackText.includes(lowerSearchTerm)
        )
    })
}
