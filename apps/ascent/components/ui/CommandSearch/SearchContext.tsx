'use client'

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'

type SearchContextValue = {
    open: boolean
    openSearch: () => void
    closeSearch: () => void
}

const SearchContext = createContext<SearchContextValue | null>(null)

export const useCommandSearch = () => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error('useCommandSearch must be used within a SearchProvider')
    }
    return context
}

/**
 * Owns the command palette's open state.
 *
 * It lives outside CommandSearch so that visible triggers can open the modal,
 * and so the keyboard shortcut keeps working while the modal's chunk — which
 * carries the ~900KB search index — is still loading.
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false)
    // Whatever had focus when the modal opened: the trigger for a click, the
    // last focused element for the shortcut. Focus goes back there on close.
    const lastFocusedRef = useRef<HTMLElement | null>(null)

    const openSearch = useCallback(() => {
        lastFocusedRef.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null
        setOpen(true)
    }, [])

    const closeSearch = useCallback(() => {
        setOpen(false)
        lastFocusedRef.current?.focus()
        lastFocusedRef.current = null
    }, [])

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!(e.metaKey || e.ctrlKey) || e.key.toLowerCase() !== 'k') return
            e.preventDefault()
            if (open) closeSearch()
            else openSearch()
        }

        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [open, openSearch, closeSearch])

    const value = useMemo(
        () => ({ open, openSearch, closeSearch }),
        [open, openSearch, closeSearch]
    )

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}
