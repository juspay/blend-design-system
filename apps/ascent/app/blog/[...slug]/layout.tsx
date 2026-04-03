import { SharedLayout } from '@/components/layout'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <SharedLayout
                baseRoute="/blog"
                showSidebar={false}
                showFooter={false}
            >
                {children}
            </SharedLayout>
        </div>
    )
}

export default layout
