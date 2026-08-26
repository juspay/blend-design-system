import type { ComponentType } from 'react'
import { LayoutGrid, SlidersHorizontal } from 'lucide-react-native'

/**
 * Contract shared by the three `PlaygroundTabBar` implementations.
 *
 * Metro picks the file: `.ios` on iOS, `.android` on Android, and the
 * suffix-less `PlaygroundTabBar.tsx` everywhere else (which is also the one
 * TypeScript resolves, so the shared props type is what keeps the platform
 * variants from drifting apart).
 */
export type TabKey = 'preview' | 'gallery'

export type TabItem = {
    key: TabKey
    label: string
    icon: ComponentType<{ size?: number; color?: string }>
}

export const TAB_ITEMS: Record<TabKey, TabItem> = {
    preview: { key: 'preview', label: 'Preview', icon: SlidersHorizontal },
    gallery: { key: 'gallery', label: 'Gallery', icon: LayoutGrid },
}

export type TabBarProps = {
    value: TabKey
    onChange: (value: TabKey) => void
    /** Specs without a gallery pass `['preview']` so the item disappears. */
    tabs: readonly TabKey[]
}
