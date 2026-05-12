'use client'
import { OTPInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const OTPInputV2Preview = () => {
    const tsCode = `import { OTPInputV2, InputSizeV2 } from '@juspay/blend-design-system'
import { useState } from 'react'

function MyComponent() {
    const [otp, setOtp] = useState('')

    return (
        <OTPInputV2
            length={6}
            value={otp}
            onChange={setOtp}
            size={InputSizeV2.MD}
            onComplete={(value) => console.log('OTP entered:', value)}
        />
    )
}`

    const reCode = `type inputSizeV2 = [#sm | #md | #lg]

@react.component
let make = () => {
  let (otp, setOtp) = React.useState(() => "")

  <OTPInputV2Binding
    length={6}
    value={otp}
    onChange={setOtp}
    size=#md
    onComplete={value => Console.log(value)}
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~length: int,
  ~value: string,
  ~onChange: string => unit,
  ~size: [#sm | #md | #lg]=?,
  ~masked: bool=?,
  ~onComplete: string => unit=?,
  ~autoFocus: bool=?,
) => React.element = "OTPInputV2"`

    const [otp, setOtp] = useState('')

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <OTPInputV2
                length={6}
                value={otp}
                onChange={setOtp}
                size={InputSizeV2.MD}
                onComplete={(value) => console.log('OTP entered:', value)}
            />
        </ComponentPreview>
    )
}

export default OTPInputV2Preview
