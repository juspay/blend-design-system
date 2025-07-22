import { figma } from '@figma/code-connect'
import { NumberInput, NumberInputSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR NUMBERINPUT COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - size → size
 *    - label → label
 *    - sublabel → sublabel
 *    - hintText → hintText
 *
 * 2. SPECIAL MAPPINGS:
 *    - placeholder (Figma) → value (Code) - Placeholder text in Figma maps to value prop
 *    - state=error (Figma) → error=true (Code) - Error state in Figma maps to error prop
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state - Other interaction states (hover, focus, etc.) are handled automatically
 *    - rightSlot - Not available in NumberInput component
 *    - leftSlot - Not available in NumberInput component
 *    - showRightSlot - Not available in NumberInput component
 *    - showLeftSlot - Not available in NumberInput component
 *    - showStepper - Not available in current implementation
 *    - showInfo - Not available in current implementation
 *    - showLabel - Label is shown automatically when label prop is provided
 *    - showSublabel - Sublabel is shown automatically when sublabel prop is provided
 *    - mandatory - Not directly supported in code
 *    - showHint - Hint is shown automatically when hintText prop is provided
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - onChange: Required callback function for handling input changes
 *    - step: Step value for number increment/decrement
 *    - errorMessage: Error message to display
 *    - helpIconHintText: Tooltip text for help icon
 *    - All standard HTML input attributes (except size, style, className, value)
 */

// Base connection
figma.connect(
    NumberInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4299-6919&t=p1mQD533Vr5OGOUG-11',
    {
        props: {
            // Size mapping
            size: figma.enum('size', {
                md: NumberInputSize.MEDIUM,
                lg: NumberInputSize.LARGE,
            }),

            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),

            // Placeholder maps to value in code (converted to number)
            value: figma.string('placeholder'),

            // State to error mapping
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),

            // Note: The following Figma props are not mapped:
            // - state: Other states handled automatically by component interactions
            // - leftSlot, rightSlot: Not available in NumberInput component
            // - showLeftSlot, showRightSlot: Not available in NumberInput component
            // - showStepper: Not available in current implementation
            // - showInfo: Not available in current implementation
            // - showLabel: Determined by presence of label
            // - showSublabel: Determined by presence of sublabel
            // - mandatory: Not directly supported
            // - showHint: Determined by presence of hintText
        },

        example: ({ size, label, sublabel, hintText, value, error }) => (
            <NumberInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                error={error}
                onChange={() => {}}
            />
        ),

        imports: [
            "import { NumberInput, NumberInputSize } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/NumberInput',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-inputs-numberinput--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    NumberInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4299-6919&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { showLabel: true },
        props: {
            size: figma.enum('size', {
                md: NumberInputSize.MEDIUM,
                lg: NumberInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ size, label, sublabel, hintText, value, error }) => (
            <NumberInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                error={error}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    NumberInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4299-6919&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { showLabel: false },
        props: {
            size: figma.enum('size', {
                md: NumberInputSize.MEDIUM,
                lg: NumberInputSize.LARGE,
            }),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ size, hintText, value, error }) => (
            <NumberInput
                size={size}
                hintText={hintText}
                value={Number(value) || 0}
                error={error}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Medium size
figma.connect(
    NumberInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4299-6919&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { size: 'md' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ label, sublabel, hintText, value, error }) => (
            <NumberInput
                size={NumberInputSize.MEDIUM}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                error={error}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Large size
figma.connect(
    NumberInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4299-6919&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { size: 'lg' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ label, sublabel, hintText, value, error }) => (
            <NumberInput
                size={NumberInputSize.LARGE}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                error={error}
                onChange={() => {}}
            />
        ),
    }
)

/**
 * Example of NumberInput usage in code:
 *
 * // Basic usage
 * const [quantity, setQuantity] = useState(1);
 *
 * <NumberInput
 *   value={quantity}
 *   onChange={(e) => setQuantity(Number(e.target.value))}
 *   min={1}
 *   max={100}
 * />
 *
 * // With label and hint
 * <NumberInput
 *   label="Quantity"
 *   sublabel="Required"
 *   hintText="Enter the number of items (1-100)"
 *   value={quantity}
 *   onChange={(e) => setQuantity(Number(e.target.value))}
 *   min={1}
 *   max={100}
 *   step={1}
 *   size={NumberInputSize.MEDIUM}
 * />
 *
 * // With error state
 * <NumberInput
 *   label="Price"
 *   value={price}
 *   onChange={(e) => setPrice(Number(e.target.value))}
 *   error={true}
 *   errorMessage="Price must be greater than 0"
 *   min={0.01}
 *   step={0.01}
 * />
 *
 * // With min/max constraints
 * <NumberInput
 *   label="Percentage"
 *   value={percentage}
 *   onChange={(e) => setPercentage(Number(e.target.value))}
 *   min={0}
 *   max={100}
 *   step={5}
 * />
 *
 * // With decimal steps
 * <NumberInput
 *   label="Amount"
 *   value={amount}
 *   onChange={(e) => setAmount(Number(e.target.value))}
 *   min={0}
 *   step={0.01}
 * />
 *
 * // With help icon
 * <NumberInput
 *   label="Tax Rate"
 *   value={taxRate}
 *   onChange={(e) => setTaxRate(Number(e.target.value))}
 *   helpIconHintText="The tax rate will be applied to all items in the cart"
 *   min={0}
 *   max={100}
 *   step={0.1}
 * />
 *
 * // Complete form example
 * const [age, setAge] = useState(18);
 * const [ageError, setAgeError] = useState(false);
 *
 * const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const newAge = Number(e.target.value);
 *   setAge(newAge);
 *   setAgeError(newAge < 18 || newAge > 120);
 * };
 *
 * <NumberInput
 *   label="Age"
 *   sublabel="Must be 18 or older"
 *   value={age}
 *   onChange={handleAgeChange}
 *   error={ageError}
 *   errorMessage={ageError ? "Age must be between 18 and 120" : undefined}
 *   hintText="Enter your age in years"
 *   min={1}
 *   max={120}
 *   step={1}
 *   required={true}
 * />
 */
