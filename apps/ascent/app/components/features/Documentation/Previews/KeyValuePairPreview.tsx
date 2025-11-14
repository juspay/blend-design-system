'use client'
import { KeyValuePair } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const KeyValuePairPreview = () => {
    const tsCode = `import { KeyValuePair, KeyValuePairSize, KeyValuePairStateType } from 'blend-v1'

function MyComponent() {
    return (
        <KeyValuePair
            keyString="Name"
            value="John Doe"
            size={KeyValuePairSize.MEDIUM}
            keyValuePairState={KeyValuePairStateType.vertical}
        />
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <KeyValuePair keyString="Name" value="John Doe" />
        </ComponentPreview>
    )
}

export default KeyValuePairPreview
