'use client'

import React, { useState } from 'react'
import { OTPInputV2 } from '@juspay/blend-design-system'

import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const OTPInputV2Preview = () => {
    const tsCode = `import { OTPInputV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [otp, setOtp] = useState('')

    return (
        <OTPInputV2
            length={6}
            value={otp}
            onChange={setOtp}
        />
    )
}`

    const reCode = `@react.component
let make = () => {
  let (otp, setOtp) = React.useState(() => "")

  <OTPInputV2Binding
    length={6}
    value={otp}
    onChange={setOtp}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~length: int,
  ~value: string,
  ~onChange: string => unit,
  ~masked: bool=?,
  ~autoFocus: bool=?,
) => React.element = "OTPInputV2"`

    const [otp, setOtp] = useState('')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <OTPInputV2 length={6} value={otp} onChange={setOtp} />
        </ComponentPreview>
    )
}

export default OTPInputV2Preview
