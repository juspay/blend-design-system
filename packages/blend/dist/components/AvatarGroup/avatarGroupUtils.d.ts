import { default as React, RefObject } from 'react'
import { AvatarData } from './types'
import { AvatarProps } from '../Avatar/types'
interface MenuItemProps {
    id: string
    text: string
    hasSlotL?: boolean
    slotL?: React.ReactNode
    onClick?: () => void
    data?: Record<string, boolean | string | number>
}
/**
 * Positions the menu relative to the overflow counter
 */
export declare const positionMenu: (
    menuRef: RefObject<HTMLDivElement>,
    counterRef: RefObject<HTMLButtonElement>
) => void
/**
 * Creates menu items from avatar data array
 */
export declare const createMenuItems: (
    avatars: AvatarData[],
    selectedIds: (string | number)[],
    onSelect: (id: string | number) => void,
    AvatarComponent: React.ComponentType<AvatarProps>
) => MenuItemProps[]
/**
 * Filters avatars based on search term
 */
export declare const filterAvatars: (
    avatars: AvatarData[],
    searchTerm: string
) => AvatarData[]
export {}
