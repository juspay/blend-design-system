'use client'
import { ButtonV2, TopbarV2 } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TopbarV2Preview = () => {
    const tsCode = `import { ButtonV2, TopbarV2 } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <TopbarV2
            showBackButton
            onBackClick={() => history.back()}
            rightActions={<ButtonV2 text="Create" />}
        >
            Dashboard
        </TopbarV2>
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div className="w-full overflow-hidden rounded-xl border border-border">
                <TopbarV2
                    showBackButton
                    onBackClick={() => console.log('back')}
                    rightActions={<ButtonV2 text="Create" />}
                >
                    Dashboard
                </TopbarV2>
                <div className="min-h-24 bg-muted/40 p-4 text-sm text-muted-foreground">
                    Page content
                </div>
            </div>
        </ComponentPreview>
    )
}

export default TopbarV2Preview
