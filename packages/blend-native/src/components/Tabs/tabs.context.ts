import { createContext, useContext } from 'react'
import type { MutableRefObject } from 'react'
import { TabsV2Size, TabsV2Variant } from '@juspay/blend-design-system/node'

export type TriggerLayout = { x: number; width: number; height: number }

export type TabsContextValue = {
    value: string | undefined
    setValue: (value: string) => void
    variant: TabsV2Variant
    size: TabsV2Size
    disabled: boolean
    expanded: boolean
    /** Trigger x/width registry driving the indicator and auto-scroll. */
    layouts: MutableRefObject<Map<string, TriggerLayout>>
    /** Bumped on every layout registration so the list re-positions. */
    layoutsVersion: number
    registerLayout: (value: string, layout: TriggerLayout) => void
}

export const TabsContext = createContext<TabsContextValue | null>(null)

export function useTabsContext(part: string): TabsContextValue {
    const context = useContext(TabsContext)
    if (!context) {
        throw new Error(
            `[blend-native] <${part}> must be rendered inside <Tabs>.`
        )
    }
    return context
}
