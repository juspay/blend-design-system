'use client'

import { createContext, useContext, type ReactNode } from 'react'

type DocsVersionContextValue = {
    peerMap: Map<string, string>
    versionMap: Map<string, number>
}

const DocsVersionContext = createContext<DocsVersionContextValue>({
    peerMap: new Map(),
    versionMap: new Map(),
})

export function DocsVersionProvider({
    children,
    peerMap,
    versionMap,
}: {
    children: ReactNode
    peerMap: Map<string, string>
    versionMap: Map<string, number>
}) {
    return (
        <DocsVersionContext.Provider value={{ peerMap, versionMap }}>
            {children}
        </DocsVersionContext.Provider>
    )
}

export function useVersionPeerMap(): Map<string, string> {
    return useContext(DocsVersionContext).peerMap
}

export function useDocVersionMap(): Map<string, number> {
    return useContext(DocsVersionContext).versionMap
}
