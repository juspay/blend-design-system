'use client'
import { KeyValuePairV2, KeyValuePairV2Size } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const KeyValuePairV2Preview = () => {
    const tsCode = `import {
    KeyValuePairV2,
    KeyValuePairV2Size,
    KeyValuePairV2StateType
} from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <>
            <KeyValuePairV2
                keyString="Email Address"
                value="user@example.com"
                size={KeyValuePairV2Size.MD}
                keyValuePairState={KeyValuePairV2StateType.HORIZONTAL}
            />
            <KeyValuePairV2
                keyString="Status"
                value="Active"
                size={KeyValuePairV2Size.MD}
                keyValuePairState={KeyValuePairV2StateType.VERTICAL}
            />
        </>
    )
}`

    const reCode = `type keyValuePairV2Size = [#sm | #md | #lg]
type keyValuePairV2State = [#horizontal | #vertical]

@react.component
let make = () => {
  <>
    <KeyValuePairV2Binding
      keyString="Email Address"
      value="user@example.com"
      size=#md
      keyValuePairState=#horizontal
    />
    <KeyValuePairV2Binding
      keyString="Status"
      value="Active"
      size=#md
      keyValuePairState=#vertical
    />
  </>
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~keyString: string,
  ~value: string=?,
  ~size: [#sm | #md | #lg]=?,
  ~keyValuePairState: [#horizontal | #vertical]=?,
  ~maxWidth: string=?,
) => React.element = "KeyValuePairV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <KeyValuePairV2
                    keyString="Email Address"
                    value="user@example.com"
                    size={KeyValuePairV2Size.MD}
                />
                <KeyValuePairV2
                    keyString="Status"
                    value="Active"
                    size={KeyValuePairV2Size.MD}
                />
            </div>
        </ComponentPreview>
    )
}

export default KeyValuePairV2Preview
