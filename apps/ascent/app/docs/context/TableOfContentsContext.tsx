'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { TOCItem } from '@/app/components/layout/Navigation/TableOfContents'

interface TableOfContentsContextType {
    headings: TOCItem[]
    setHeadings: (headings: TOCItem[]) => void
}

const TableOfContentsContext = createContext<
    TableOfContentsContextType | undefined
>(undefined)

export const useTableOfContents = () => {
    const context = useContext(TableOfContentsContext)
    if (context === undefined) {
        throw new Error(
            'useTableOfContents must be used within a TableOfContentsProvider'
        )
    }
    return context
}

interface TableOfContentsProviderProps {
    children: ReactNode
}

export const TableOfContentsProvider: React.FC<
    TableOfContentsProviderProps
> = ({ children }) => {
    const [headings, setHeadings] = useState<TOCItem[]>([])

    const value = {
        headings,
        setHeadings,
    }

    return (
        <TableOfContentsContext.Provider value={value}>
            {children}
        </TableOfContentsContext.Provider>
    )
}
