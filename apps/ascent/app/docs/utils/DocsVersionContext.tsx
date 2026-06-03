'use client'

import { createContext, useContext, type ReactNode } from 'react'

const DocsVersionContext = createContext<Map<string, string>>(new Map())

export function DocsVersionProvider({
    children,
    value,
}: {
    children: ReactNode
    value: Map<string, string>
}) {
    return (
        <DocsVersionContext.Provider value={value}>
            {children}
        </DocsVersionContext.Provider>
    )
}

export function useVersionPeerMap(): Map<string, string> {
    return useContext(DocsVersionContext)
}
