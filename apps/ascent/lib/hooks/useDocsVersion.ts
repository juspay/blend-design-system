'use client'

import { useCallback, useSyncExternalStore } from 'react'

export type Version = '1' | '2'
export const VERSION_STORAGE_KEY = 'docs-version'
const DEFAULT_VERSION: Version = '1'

// Store definition
function isValidVersion(v: string | null): v is Version {
    return v === '1' || v === '2'
}

function inferVersionFromUrl(): Version {
    if (typeof window === 'undefined') return DEFAULT_VERSION
    return window.location.pathname.match(/-v2(\/|$)/i) ? '2' : DEFAULT_VERSION
}

function getSnapshot(): Version {
    const stored = localStorage.getItem(VERSION_STORAGE_KEY)
    if (isValidVersion(stored)) return stored
    return inferVersionFromUrl()
}

// Server always renders the default — no localStorage on the server
function getServerSnapshot(): Version {
    return DEFAULT_VERSION
}

function subscribe(callback: () => void): () => void {
    const handleStorage = (e: StorageEvent) => {
        if (e.key === VERSION_STORAGE_KEY) callback()
    }

    window.addEventListener('storage', handleStorage)
    window.addEventListener('docs-version-change', callback)

    return () => {
        window.removeEventListener('storage', handleStorage)
        window.removeEventListener('docs-version-change', callback)
    }
}

// Hook
export function useDocsVersion(): [Version, (version: Version) => void] {
    const version = useSyncExternalStore(
        subscribe,
        getSnapshot,
        getServerSnapshot // eliminates the hydration mismatch
    )

    const setVersion = useCallback((newVersion: Version) => {
        if (!isValidVersion(newVersion)) return
        localStorage.setItem(VERSION_STORAGE_KEY, newVersion)
        window.dispatchEvent(new Event('docs-version-change'))
    }, [])

    return [version, setVersion]
}
