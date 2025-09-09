'use client'

import { useEffect } from 'react'
import { useTableOfContents } from '../context/TableOfContentsContext'
import { TOCItem } from '@/app/components/layout/Navigation/TableOfContents'

interface PageClientProps {
    headings: TOCItem[]
}

export const PageClient: React.FC<PageClientProps> = ({ headings }) => {
    const { setHeadings } = useTableOfContents()

    useEffect(() => {
        setHeadings(headings)
    }, [headings, setHeadings])

    return null
}
