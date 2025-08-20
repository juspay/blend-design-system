import React from 'react'
import { SharedDocLayout } from '@/components/layout'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SharedDocLayout
            title="Blend Docs"
            baseRoute="/docs"
            contentPath="app/docs/content"
        >
            {children}
        </SharedDocLayout>
    )
}

export default layout
