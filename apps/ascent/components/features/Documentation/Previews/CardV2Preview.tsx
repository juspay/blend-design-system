'use client'
import {
    CardV2,
    CardV2ActionPlacement,
    CardV2Padding,
    CardV2Variant,
} from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const CardV2Preview = () => {
    const tsCode = `import {
    CardV2,
    CardV2ActionPlacement,
    CardV2Padding,
    CardV2Variant,
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <CardV2
            variant={CardV2Variant.OUTLINED}
            padding={CardV2Padding.COMFORTABLE}
            title="Card title"
            subtitle="Supporting information"
            description="Use CardV2 to group related content and actions."
            actions={{ text: 'Open', onClick: () => console.log('open') }}
            actionPlacement={CardV2ActionPlacement.FOOTER}
        />
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div className="w-full max-w-md">
                <CardV2
                    variant={CardV2Variant.OUTLINED}
                    padding={CardV2Padding.COMFORTABLE}
                    title="Card title"
                    subtitle="Supporting information"
                    description="Use CardV2 to group related content and actions."
                    actions={{
                        text: 'Open',
                        onClick: () => console.log('open'),
                    }}
                    actionPlacement={CardV2ActionPlacement.FOOTER}
                />
            </div>
        </ComponentPreview>
    )
}

export default CardV2Preview
