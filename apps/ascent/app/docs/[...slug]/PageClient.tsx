'use client'

import { useEffect } from 'react'
import { useTableOfContents } from '../context/TableOfContentsContext'
import { TOCItem } from '../../../components/layout/Navigation/TableOfContents'

type PageClientProps = {
    headings: TOCItem[]
}

export const PageClient: React.FC<PageClientProps> = ({ headings }) => {
    const { setHeadings } = useTableOfContents()

    useEffect(() => {
        setHeadings(headings)
    }, [headings, setHeadings])

    return null
}
