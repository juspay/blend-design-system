import { useState } from 'react'
import { OTPInput } from '../../../Inputs'

const OTPInputLightHouse = () => {
    const [basicOtp, setBasicOtp] = useState('')
    const [requiredOtp, setRequiredOtp] = useState('')
    const [errorOtp, setErrorOtp] = useState('123')
    const [disabledOtp] = useState('123456')
    const [fourDigitOtp, setFourDigitOtp] = useState('')
    const [eightDigitOtp, setEightDigitOtp] = useState('')

    return (
        <div className="flex flex-col gap-4">
            {/* Basic OTPInput */}
            <OTPInput
                label="Verification Code"
                placeholder="0"
                value={basicOtp}
                onChange={setBasicOtp}
                length={6}
            />

            {/* With sublabel and hint */}
            <OTPInput
                label="Two-Factor Authentication"
                sublabel="Enter the 6-digit code from your authenticator app"
                hintText="Code expires in 60 seconds"
                length={6}
                value={basicOtp}
                onChange={setBasicOtp}
            />

            {/* Required field */}
            <OTPInput
                label="Required Verification Code"
                placeholder="0"
                value={requiredOtp}
                onChange={setRequiredOtp}
                length={6}
                required
                hintText="This field is required"
            />

            {/* Error state */}
            <OTPInput
                label="Verification Code (Error Example)"
                placeholder="0"
                value={errorOtp}
                onChange={setErrorOtp}
                length={6}
                error={errorOtp.length > 0 && errorOtp.length < 6}
                errorMessage="Please enter all 6 digits"
            />

            {/* Disabled state */}
            <OTPInput
                label="Disabled OTP Input"
                placeholder="0"
                value={disabledOtp}
                onChange={() => {}}
                length={6}
                disabled
                hintText="This field is disabled"
            />

            {/* Different lengths */}
            <OTPInput
                label="4-Digit PIN"
                placeholder="0"
                value={fourDigitOtp}
                onChange={setFourDigitOtp}
                length={4}
                hintText="Enter 4-digit PIN"
            />
            <OTPInput
                label="8-Digit Security Code"
                placeholder="0"
                value={eightDigitOtp}
                onChange={setEightDigitOtp}
                length={8}
                hintText="Enter 8-digit security code"
            />

            {/* With help icon */}
            <OTPInput
                label="Verification Code"
                helpIconHintText="If you don't receive a code, check your email or contact support"
                placeholder="0"
                value={basicOtp}
                onChange={setBasicOtp}
                length={6}
            />
        </div>
    )
}

export default OTPInputLightHouse
