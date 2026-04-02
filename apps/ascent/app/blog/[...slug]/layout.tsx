import { SharedDocLayout } from '@/components'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <SharedDocLayout
                baseRoute="/blog"
                showSidebar={false}
                showFooter={false}
            >
                {children}
            </SharedDocLayout>
        </div>
    )
}

export default layout
