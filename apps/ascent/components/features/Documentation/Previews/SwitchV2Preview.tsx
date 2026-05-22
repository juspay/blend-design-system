'use client'
import { SwitchV2, SelectorV2Size } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const SwitchV2Preview = () => {
    const [enabled, setEnabled] = useState(false)

    const tsCode = `import {
    SwitchV2,
    SelectorV2Size,
} from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [enabled, setEnabled] = useState(false)

    return (
        <SwitchV2
            checked={enabled}
            onCheckedChange={setEnabled}
            size={SelectorV2Size.MD}
            label="Enable notifications"
            subLabel="Receive updates via email"
        />
    )
}`

    const reCode = `type selectorV2Size = [#sm | #md | #lg]

@react.component
let make = () => {
  let (enabled, setEnabled) = React.useState(() => false)

  <SwitchV2Binding
    checked={enabled}
    onCheckedChange={newVal => setEnabled(_ => newVal)}
    size=#md
    label="Enable notifications"
    subLabel="Receive updates via email"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~checked: bool=?,
  ~onCheckedChange: bool => unit=?,
  ~size: [#sm | #md | #lg]=?,
  ~label: string=?,
  ~subLabel: string=?,
  ~required: bool=?,
  ~error: bool=?,
  ~disabled: bool=?,
  ~slot: {slot: React.element, maxHeight?: string}=?,
  ~maxLength: {label?: int, subLabel?: int}=?,
) => React.element = "SwitchV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <SwitchV2
                checked={enabled}
                onCheckedChange={setEnabled}
                size={SelectorV2Size.MD}
                label="Enable notifications"
                subLabel="Receive updates via email"
            />
        </ComponentPreview>
    )
}

export default SwitchV2Preview
