'use client'
import { Card, ButtonType } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const CardPreview = () => {
    const tsCode = `import { Card, CardVariant, Button, ButtonType } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <Card
            variant={CardVariant.DEFAULT}
            headerTitle="Card Title"
            subHeader="Card subtitle"
            bodyTitle="Body Title"
            content="This is the card content"
            actionButton={{
                buttonType: ButtonType.PRIMARY,
                children: 'Action',
                onClick: () => console.log('Action clicked'),
            }}
        />
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <Card
                headerTitle="Card Title"
                subHeader="Card subtitle"
                bodyTitle="Body Title"
                content="This is the card content. You can add any React content here."
                actionButton={{
                    buttonType: ButtonType.PRIMARY,
                    children: 'Action',
                    onClick: () => console.log('Action clicked'),
                }}
            />
        </ComponentPreview>
    )
}

export default CardPreview
