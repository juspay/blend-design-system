'use client'
import { KeyValuePair } from '@juspay/blend-design-system/deprecated/key-value-pair'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const KeyValuePairPreview = () => {
    const tsCode = `import { KeyValuePair, KeyValuePairSize, KeyValuePairStateType } from '@juspay/blend-design-system/deprecated/key-value-pair'

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
