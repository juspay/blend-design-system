'use client'
import { Topbar } from '@juspay/blend-design-system/deprecated/topbar'
import { Button } from '@juspay/blend-design-system/deprecated/button'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TopbarPreview = () => {
    const tsCode = `import { Button, Topbar } from '@juspay/blend-design-system/deprecated/topbar'

function MyComponent() {
    return (
        <Topbar
            showBackButton
            onBackClick={() => history.back()}
            rightActions={<Button text="Create" />}
        >
            Dashboard
        </Topbar>
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div className="w-full overflow-hidden rounded-xl border border-border">
                <Topbar
                    showBackButton
                    onBackClick={() => console.log('back')}
                    rightActions={<Button text="Create" />}
                >
                    Dashboard
                </Topbar>
                <div className="min-h-24 bg-muted/40 p-4 text-sm text-muted-foreground">
                    Page content
                </div>
            </div>
        </ComponentPreview>
    )
}

export default TopbarPreview
