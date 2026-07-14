import { createContext, useContext } from 'react'
import type { CardV2TokensType } from './cardV2.tokens'

export type CardV2ContextValue = {
    tokens: CardV2TokensType
    centered: boolean
    scrollable: boolean
    ids: {
        eyebrow: string
        title: string
        subtitle: string
        description: string
    }
}

export const CardV2Context = createContext<CardV2ContextValue | null>(null)

export const useCardV2Context = () => useContext(CardV2Context)
