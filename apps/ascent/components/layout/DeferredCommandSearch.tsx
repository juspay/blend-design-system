'use client'

import dynamic from 'next/dynamic'
import { useCommandSearch } from '../ui/CommandSearch/SearchContext'

const loadCommandSearch = () => import('../ui/CommandSearch/CommandSearch')

const CommandSearch = dynamic(loadCommandSearch, { ssr: false })

/**
 * Warms the modal's chunk — which statically imports the ~900KB search index —
 * before the user commits to opening it. Triggers call this on hover/focus.
 */
export const preloadCommandSearch = () => {
    void loadCommandSearch()
}

export default function DeferredCommandSearch() {
    const { open } = useCommandSearch()

    if (!open) return null

    return <CommandSearch />
}
