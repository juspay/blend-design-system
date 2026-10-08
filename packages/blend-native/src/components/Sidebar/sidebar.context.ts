import { createContext, useContext } from 'react'
import type { SharedValue } from 'react-native-reanimated'
import type { SidebarPalette } from './sidebar.theme'

export type SidebarContextValue = {
    palette: SidebarPalette
    iconOnlyMode: boolean
    activeItem: string | null
    setActiveItem: (id: string) => void
    /**
     * Resolved once at the root and threaded down, rather than every
     * `SidebarItem`/`SidebarSection` calling `useReduceMotion()`
     * independently — a tree with N rows would otherwise open N separate
     * `AccessibilityInfo` subscriptions for the same OS setting.
     */
    reduceMotion: boolean
    /**
     * Drives the rail's own width tween (0 collapsed, 1 expanded). Rows read
     * this directly, rather than switching their label on the instant
     * `iconOnlyMode` boolean, so the label's width/opacity grow in lockstep
     * with the rail instead of popping to full width inside a still-narrow
     * container — the "text wraps then snaps" jitter that mismatch caused.
     */
    expandProgress: SharedValue<number>
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebarContext(part: string): SidebarContextValue {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error(
            `[blend-native] <${part}> must be rendered inside <Sidebar>.`
        )
    }
    return context
}
