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

    const [otp, setOtp] = useState('')

    const handleOTPChange = (value: string) => {
        setOtp(value)
    }

    return (
        <ComponentPreview ts={tsCode}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: 'var(--surface)',
                    borderRadius: '8px',
                }}
            >
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
                            backgroundColor: 'var(--success-bg)',
                            border: '1px solid var(--success-border)',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: 'var(--success-foreground)',
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
