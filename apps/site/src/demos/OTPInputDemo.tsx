import { OTPInput } from '../../../../packages/blend/lib/components/Inputs/OTPInput'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import {
    addSnackbar,
    SnackbarVariant,
} from '../../../../packages/blend/lib/components/Snackbar'
import { useState } from 'react'

const OTPInputDemo = () => {
    const [playgroundLabel, setPlaygroundLabel] = useState('Enter OTP Code')
    const [playgroundSublabel, setPlaygroundSublabel] = useState(
        'We sent a 6-digit code to your phone'
    )
    const [playgroundHintText, setPlaygroundHintText] = useState(
        'Please enter the 6-digit code'
    )
    const [playgroundHelpText, setPlaygroundHelpText] = useState(
        'Check your messages for the verification code'
    )
    const [playgroundLength, setPlaygroundLength] = useState(6)
    const [isDisabled, setIsDisabled] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [isRequired, setIsRequired] = useState(false)
    const [hasAutoFocus, setHasAutoFocus] = useState(false)
    const [playgroundValue, setPlaygroundValue] = useState('')

    // Example states for different use cases
    const [loginOtp, setLoginOtp] = useState('')
    const [verificationOtp, setVerificationOtp] = useState('')
    const [resetPasswordOtp, setResetPasswordOtp] = useState('')
    const [errorOtp, setErrorOtp] = useState('')

    // Length options for the select
    const lengthOptions = [
        { value: '4', label: '4 digits' },
        { value: '5', label: '5 digits' },
        { value: '6', label: '6 digits' },
        { value: '7', label: '7 digits' },
        { value: '8', label: '8 digits' },
    ]

    const handleOtpComplete = (value: string) => {
        if (value.length === playgroundLength) {
            addSnackbar({
                header: 'OTP Complete',
                description: `OTP Entered: ${value}`,
                variant: SnackbarVariant.SUCCESS,
            })
        }
    }

    return (
        <div className="p-8 space-y-12">
            {/* Playground Section */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Playground</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <TextInput
                            label="Label"
                            value={playgroundLabel}
                            onChange={(e) => setPlaygroundLabel(e.target.value)}
                            placeholder="Enter label text"
                        />

                        <TextInput
                            label="Sublabel"
                            value={playgroundSublabel}
                            onChange={(e) =>
                                setPlaygroundSublabel(e.target.value)
                            }
                            placeholder="Enter sublabel text"
                        />

                        <SingleSelect
                            label="Length"
                            items={[{ items: lengthOptions }]}
                            selected={playgroundLength.toString()}
                            onSelect={(value) => {
                                setPlaygroundLength(parseInt(value as string))
                                setPlaygroundValue('')
                            }}
                            placeholder="Select length"
                        />

                        <TextInput
                            label="Hint Text"
                            value={playgroundHintText}
                            onChange={(e) =>
                                setPlaygroundHintText(e.target.value)
                            }
                            placeholder="Enter hint text"
                        />

                        <TextInput
                            label="Help Text"
                            value={playgroundHelpText}
                            onChange={(e) =>
                                setPlaygroundHelpText(e.target.value)
                            }
                            placeholder="Enter help text"
                        />
                    </div>

                    <div className="flex items-center gap-6 flex-wrap">
                        <Switch
                            label="Disabled"
                            checked={isDisabled}
                            onChange={() => setIsDisabled(!isDisabled)}
                        />
                        <Switch
                            label="Error State"
                            checked={hasError}
                            onChange={() => setHasError(!hasError)}
                        />
                        <Switch
                            label="Required"
                            checked={isRequired}
                            onChange={() => setIsRequired(!isRequired)}
                        />
                        <Switch
                            label="Auto Focus"
                            checked={hasAutoFocus}
                            onChange={() => setHasAutoFocus(!hasAutoFocus)}
                        />
                    </div>

                    <div className="min-h-40 rounded-2xl w-full flex justify-center items-center outline-1 outline-gray-200 p-8">
                        <div className="w-full max-w-md">
                            <OTPInput
                                label={playgroundLabel}
                                sublabel={playgroundSublabel}
                                value={playgroundValue}
                                length={playgroundLength}
                                autoFocus={hasAutoFocus}
                                onChange={(value: string) => {
                                    setPlaygroundValue(value)
                                    handleOtpComplete(value)
                                }}
                                disabled={isDisabled}
                                error={hasError}
                                errorMessage={
                                    hasError
                                        ? 'Invalid OTP code. Please try again.'
                                        : undefined
                                }
                                hintText={playgroundHintText}
                                helpIconHintText={playgroundHelpText}
                                required={isRequired}
                                name="playground-otp"
                                onKeyDown={(e) => {
                                    console.log('onKeyDown', e)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Basic Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Basic Examples</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Default 6-digit OTP
                        </h3>
                        <OTPInput
                            label="Verification Code"
                            value={loginOtp}
                            onChange={(value: string) => setLoginOtp(value)}
                            name="login-otp"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">4-digit PIN</h3>
                        <OTPInput
                            label="Security PIN"
                            sublabel="Enter your 4-digit security PIN"
                            value={verificationOtp}
                            length={4}
                            onChange={(value: string) =>
                                setVerificationOtp(value)
                            }
                            name="verification-otp"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">8-digit Code</h3>
                        <OTPInput
                            label="Long Security Code"
                            sublabel="Enter the 8-digit verification code"
                            value={resetPasswordOtp}
                            length={8}
                            onChange={(value: string) =>
                                setResetPasswordOtp(value)
                            }
                            required
                            hintText="Check your email for the verification code"
                            name="security-otp"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Error State</h3>
                        <OTPInput
                            label="Verification Code"
                            sublabel="Code expires in 5 minutes"
                            value={errorOtp}
                            onChange={(value: string) => setErrorOtp(value)}
                            error
                            errorMessage="Invalid code. Please check your messages and try again."
                            name="error-otp"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            With Auto Focus
                        </h3>
                        <OTPInput
                            label="Auto-focused Input"
                            sublabel="This input automatically focuses when rendered"
                            value=""
                            autoFocus
                            onChange={() => {}}
                            name="autofocus-otp"
                        />
                    </div>
                </div>
            </div>

            {/* Advanced Examples */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Advanced Examples</h2>
                <div className="grid grid-cols-1 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Different Lengths
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm">
                                    5-digit Code
                                </h4>
                                <OTPInput
                                    label="Bank Code"
                                    value=""
                                    length={5}
                                    onChange={() => {}}
                                    name="bank-code"
                                />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm">
                                    6-digit Code (Default)
                                </h4>
                                <OTPInput
                                    label="SMS Code"
                                    value=""
                                    onChange={() => {}}
                                    name="sms-code"
                                />
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-sm">
                                    7-digit Code
                                </h4>
                                <OTPInput
                                    label="App Code"
                                    value=""
                                    length={7}
                                    onChange={() => {}}
                                    name="app-code"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Disabled State
                        </h3>
                        <div className="max-w-md">
                            <OTPInput
                                label="Two-Factor Authentication"
                                sublabel="This field is currently disabled"
                                value="123456"
                                onChange={() => {}}
                                disabled
                                hintText="Please enable 2FA in your settings first"
                                name="disabled-otp"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Complete Flow Example
                        </h3>
                        <div className="max-w-md space-y-4">
                            <OTPInput
                                label="Phone Verification"
                                sublabel="We've sent a code to your phone number"
                                value=""
                                autoFocus
                                onChange={(value: string) => {
                                    if (value.length === 6) {
                                        addSnackbar({
                                            header: 'Verification Success',
                                            description:
                                                'Phone verified successfully!',
                                            variant: SnackbarVariant.SUCCESS,
                                        })
                                    }
                                }}
                                required
                                hintText="Didn't receive the code? Check spam or request a new one"
                                helpIconHintText="SMS verification helps secure your account by confirming your phone number"
                                name="phone-verification-otp"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold">Common Use Cases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-6 border border-gray-200 rounded-lg space-y-4">
                        <h4 className="font-semibold">
                            Two-Factor Authentication
                        </h4>
                        <OTPInput
                            label="2FA Code"
                            sublabel="Enter code from your authenticator app"
                            value=""
                            length={6}
                            onChange={() => {}}
                            name="2fa-login"
                        />
                    </div>

                    <div className="p-6 border border-gray-200 rounded-lg space-y-4">
                        <h4 className="font-semibold">ATM PIN</h4>
                        <OTPInput
                            label="PIN"
                            sublabel="Enter your 4-digit PIN"
                            value=""
                            length={4}
                            onChange={() => {}}
                            name="atm-pin"
                        />
                    </div>

                    <div className="p-6 border border-gray-200 rounded-lg space-y-4">
                        <h4 className="font-semibold">Account Recovery</h4>
                        <OTPInput
                            label="Recovery Code"
                            sublabel="8-digit backup code"
                            value=""
                            length={8}
                            onChange={() => {}}
                            required
                            name="account-recovery"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OTPInputDemo
