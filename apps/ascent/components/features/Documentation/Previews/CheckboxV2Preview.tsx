'use client'
import { CheckboxV2, SelectorV2Size } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const CheckboxV2Preview = () => {
    const [checked, setChecked] = useState(false)

    const tsCode = `import {
    CheckboxV2,
    SelectorV2Size,
} from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [checked, setChecked] = useState(false)

    return (
        <CheckboxV2
            checked={checked}
            onCheckedChange={setChecked}
            size={SelectorV2Size.MD}
            label="Accept terms and conditions"
            subLabel="You must agree to continue"
        />
    )
}`

    const reCode = `type selectorV2Size = [#sm | #md | #lg]

@react.component
let make = () => {
  let (checked, setChecked) = React.useState(() => false)

  <CheckboxV2
    checked={checked}
    onCheckedChange={newChecked => setChecked(_ => newChecked)}
    size=#md
    label="Accept terms and conditions"
    subLabel="You must agree to continue"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~checked: bool=?,
  ~onCheckedChange: (bool | string) => unit=?,
  ~size: [#sm | #md | #lg]=?,
  ~label: string=?,
  ~subLabel: string=?,
  ~required: bool=?,
  ~error: bool=?,
  ~disabled: bool=?,
  ~slot: {slot: React.element, maxHeight: string}=?,
  ~maxLength: {label: int, subLabel: int}=?,
) => React.element = "CheckboxV2"`

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <CheckboxV2
                checked={checked}
                onCheckedChange={(value) => setChecked(value === true)}
                size={SelectorV2Size.MD}
                label="Accept terms and conditions"
                subLabel="You must agree to continue"
            />
        </ComponentPreview>
    )
}

export default CheckboxV2Preview
