'use client'

import { TOCItem } from '../../../components/layout/Navigation/TableOfContents'

type PageClientProps = {
    headings: TOCItem[]
}

// PageClient is kept for potential future client-side logic
// Headings are now passed directly to SharedDocLayout to avoid hydration layout shift
export const PageClient: React.FC<PageClientProps> = () => {
    return null
}
