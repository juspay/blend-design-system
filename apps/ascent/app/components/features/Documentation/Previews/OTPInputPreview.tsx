'use client'
import { OTPInput } from '@juspay/blend-design-system'
import React, { useState } from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const OTPInputPreview = () => {
    const tsCode = `import { OTPInput } from "@juspay/blend-design-system";

function MyComponent() {
  const [otp, setOtp] = useState('');
  
  const handleOTPChange = (value: string) => {
    setOtp(value);
    if (value.length === 6) {
      console.log('Complete OTP:', value);
    }
  };
  
  return (
    <OTPInput
      label="Verification Code"
      value={otp}
      onChange={handleOTPChange}
      length={6}
      autoFocus
      hintText="Enter the 6-digit code sent to your phone"
    />
  );
}`

    const reCode = `@react.component
let make = () => {
  let (otp, setOtp) = React.useState(() => "")
  
  let handleOTPChange = value => {
    setOtp(_ => value)
    if String.length(value) === 6 {
      Js.log("Complete OTP: " ++ value)
    }
  }
  
  <OTPInputBinding
    label="Verification Code"
    value=otp
    onChange=handleOTPChange
    length=6
    autoFocus=true
    hintText="Enter the 6-digit code sent to your phone"
  />
}`

    const bindingCode = `@module("@juspay/blend-design-system") @react.component
external make: (
  ~label: string=?,
  ~sublabel: string=?,
  ~helpIconHintText: string=?,
  ~error: bool=?,
  ~errorMessage: string=?,
  ~hintText: string=?,
  ~value: string=?,
  ~length: int=?,
  ~autoFocus: bool=?,
  ~onChange: string => unit=?,
  ~form: string=?,
  ~disabled: bool=?,
  ~required: bool=?,
  ~name: string=?,
) => React.element = "OTPInput"`

    const [otp, setOtp] = useState('')

    const handleOTPChange = (value: string) => {
        setOtp(value)
    }

    return (
        <ComponentPreview
            ts={tsCode}
            rescript={reCode}
            rescriptBinding={bindingCode}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                }}
            >
                <style>
                    {`
                    .otp-input-preview input {
                        color: #374151 !important;
                    }
                    .otp-input-preview input::placeholder {
                        color: #9CA3AF !important;
                    }
                `}
                </style>
                <div className="otp-input-preview">
                    <OTPInput
                        label="Verification Code"
                        value={otp}
                        onChange={handleOTPChange}
                        length={6}
                        hintText="Enter the 6-digit code sent to your device"
                    />
                </div>
                {otp.length === 6 && (
                    <div
                        style={{
                            padding: '12px',
                            backgroundColor: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: '#166534',
                        }}
                    >
                        ✓ Complete OTP entered: {otp}
                    </div>
                )}
            </div>
        </ComponentPreview>
    )
}

export default OTPInputPreview
