import { createContext, useContext } from 'react'
import { AccordionV2Type } from '@juspay/blend-design-system/node'

export type AccordionContextValue = {
    expandedValues: readonly string[]
    toggle: (value: string) => void
    accordionType: AccordionV2Type
}

export const AccordionContext = createContext<AccordionContextValue | null>(
    null
)

export function useAccordionContext(part: string): AccordionContextValue {
    const context = useContext(AccordionContext)
    if (!context) {
        throw new Error(
            `[blend-native] <${part}> must be rendered inside <Accordion>.`
        )
    }
    return context
}
