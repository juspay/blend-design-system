import type { AvatarGroupItem } from './avatarGroup.types'

export type AvatarId = string | number

export function splitAvatars<T>(avatars: T[], maxCount: number) {
    const safeMax = Math.max(1, maxCount)
    return {
        visible: avatars.slice(0, safeMax),
        overflow: avatars.slice(safeMax),
    }
}

export function toggleSelection(
    selected: AvatarId[],
    id: AvatarId
): AvatarId[] {
    return selected.includes(id)
        ? selected.filter((selectedId) => selectedId !== id)
        : [...selected, id]
}

export function getAvatarName(avatar: AvatarGroupItem): string {
    return avatar.alt || avatar.fallbackText || `Avatar ${avatar.id}`
}

export function getGroupLabel(total: number, selectedCount: number): string {
    const selected = selectedCount > 0 ? `, ${selectedCount} selected` : ''
    return `Group of ${total} avatars${selected}`
}

export function getItemLabel(name: string, selected: boolean): string {
    return selected ? `${name}, selected` : name
}

export function getPositionHint(
    index: number,
    visibleCount: number,
    overflowCount: number
): string {
    const more = overflowCount > 0 ? `, ${overflowCount} more available` : ''
    return `Avatar ${index + 1} of ${visibleCount}${more}`
}

export function getOverflowLabel(count: number): string {
    return `${count} more avatar${count > 1 ? 's' : ''}, press to view and select`
}
