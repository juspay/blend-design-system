'use client'
import { createContext, useContext } from 'react'

const DocsVersionContext = createContext<Set<string>>(new Set())

export function DocsVersionProvider({
    children,
    value,
}: {
    children: React.ReactNode
    value: Set<string>
}) {
    return (
        <DocsVersionContext.Provider value={value}>
            {children}
        </DocsVersionContext.Provider>
    )
}

export function useVersionedSlugs() {
    return useContext(DocsVersionContext)
}
