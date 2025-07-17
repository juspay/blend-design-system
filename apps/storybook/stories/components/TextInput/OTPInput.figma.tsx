import { figma } from '@figma/code-connect'
import { OTPInput } from 'blend-v1'

/**
 * FIGMA CODE CONNECT FOR OTPINPUT COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - label → label (when provided)
 *    - sublabel → sublabel
 *    - hintText → hintText
 *
 * 2. SPECIAL MAPPINGS:
 *    - digits (Figma) → Not available in code (hardcoded to 6 digits)
 *      Note: The current implementation only supports 6-digit OTP
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state - Interaction states (hover, focus, etc.) are handled automatically
 *    - showInfo - Not available in current implementation
 *    - showLabel - Label is shown automatically when label prop is provided
 *    - showSublabel - Sublabel is shown automatically when sublabel prop is provided
 *    - mandatory - Not directly supported in code
 *    - showHint - Hint is shown automatically when hintText prop is provided
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Current OTP value as a string
 *    - onChange: Callback function when OTP changes
 *    - error: Boolean to indicate error state
 *    - errorMessage: Error message to display
 *    - helpIconHintText: Tooltip text for help icon
 *    - disabled: Whether the input is disabled
 *    - form: Form ID for form association
 *    - All standard HTML input attributes (except size, style, className)
 */

// Base connection
figma.connect(
    OTPInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-1899&t=fl3OkGf4BoUjX5Nr-11',
    {
        props: {
            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),

            // Note: digits prop from Figma is not supported in code
            // The component is hardcoded to 6 digits

            // Note: The following Figma props are not mapped:
            // - state: Handled automatically by component interactions
            // - showInfo: Not available in current implementation
            // - showLabel: Determined by presence of label
            // - showSublabel: Determined by presence of sublabel
            // - mandatory: Not directly supported
            // - showHint: Determined by presence of hintText
        },

        example: ({ label, sublabel, hintText }) => (
            <OTPInput
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value=""
                onChange={(value) => console.log(value)}
            />
        ),

        imports: ["import { OTPInput } from 'blend-v1'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/OTPInput',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-inputs-otpinput--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    OTPInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-1899&t=fl3OkGf4BoUjX5Nr-11',
    {
        variant: { showLabel: true },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
        },
        example: ({ label, sublabel, hintText }) => (
            <OTPInput
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value=""
                onChange={(value) => console.log(value)}
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    OTPInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-1899&t=fl3OkGf4BoUjX5Nr-11',
    {
        variant: { showLabel: false },
        props: {
            hintText: figma.string('hintText'),
        },
        example: ({ hintText }) => (
            <OTPInput
                hintText={hintText}
                value=""
                onChange={(value) => console.log(value)}
            />
        ),
    }
)

// Variant: With sublabel
figma.connect(
    OTPInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-1899&t=fl3OkGf4BoUjX5Nr-11',
    {
        variant: { showSublabel: true },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
        },
        example: ({ label, sublabel, hintText }) => (
            <OTPInput
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value=""
                onChange={(value) => console.log(value)}
            />
        ),
    }
)

// Variant: With hint
figma.connect(
    OTPInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-1899&t=fl3OkGf4BoUjX5Nr-11',
    {
        variant: { showHint: true },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
        },
        example: ({ label, sublabel, hintText }) => (
            <OTPInput
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value=""
                onChange={(value) => console.log(value)}
            />
        ),
    }
)

// Note: The digits variant cannot be properly implemented because
// the component is hardcoded to 6 digits. This would need to be
// fixed in the component implementation first.

/**
 * Example of OTPInput usage in code:
 *
 * // Basic usage
 * const [otp, setOtp] = useState('');
 *
 * <OTPInput
 *   value={otp}
 *   onChange={setOtp}
 * />
 *
 * // With label and hint
 * <OTPInput
 *   label="Verification Code"
 *   sublabel="Required"
 *   hintText="Enter the 6-digit code sent to your email"
 *   value={otp}
 *   onChange={setOtp}
 * />
 *
 * // With error state
 * <OTPInput
 *   label="OTP"
 *   value={otp}
 *   onChange={setOtp}
 *   error={true}
 *   errorMessage="Invalid OTP. Please try again."
 * />
 *
 * // Disabled state
 * <OTPInput
 *   label="Verification Code"
 *   value={otp}
 *   onChange={setOtp}
 *   disabled={true}
 *   hintText="OTP verification is currently disabled"
 * />
 *
 * // With help icon
 * <OTPInput
 *   label="Security Code"
 *   value={otp}
 *   onChange={setOtp}
 *   helpIconHintText="The code was sent to your registered mobile number"
 * />
 *
 * // Form integration
 * <form id="otp-form">
 *   <OTPInput
 *     label="Enter OTP"
 *     value={otp}
 *     onChange={setOtp}
 *     form="otp-form"
 *     required={true}
 *   />
 * </form>
 *
 * // Complete example with validation
 * const [otp, setOtp] = useState('');
 * const [error, setError] = useState(false);
 *
 * const handleOtpChange = (value: string) => {
 *   setOtp(value);
 *   setError(false);
 * };
 *
 * const handleSubmit = () => {
 *   if (otp.length !== 6) {
 *     setError(true);
 *     return;
 *   }
 *   // Process OTP
 * };
 *
 * <OTPInput
 *   label="Enter OTP"
 *   sublabel="6 digits"
 *   value={otp}
 *   onChange={handleOtpChange}
 *   error={error}
 *   errorMessage="Please enter a valid 6-digit OTP"
 *   hintText="Check your SMS for the verification code"
 * />
 */
