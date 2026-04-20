import { figma } from '@figma/code-connect'
import {
    UnitInput,
    UnitInputSize,
    UnitPosition,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR UNITINPUT COMPONENT
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
 *    - rightSlot → rightSlot
 *    - leftSlot → leftSlot
 *    - unitPosition → unitPosition
 *
 * 2. SPECIAL MAPPINGS:
 *    - placeholder (Figma) → value (Code) - Placeholder text in Figma maps to value prop
 *    - state=error (Figma) → error=true (Code) - Error state in Figma maps to error prop
 *    - mandatory (Figma) → required (Code) - Mandatory in Figma maps to required prop
 *    - unitText (Figma) → unit (Code) - Unit text in Figma maps to unit prop
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state - Other interaction states (hover, focus, etc.) are handled automatically
 *    - showRightSlot - Right slot is shown automatically when rightSlot prop is provided
 *    - showLeftSlot - Left slot is shown automatically when leftSlot prop is provided
 *    - showInfo - Not available in current implementation
 *    - showLabel - Label is shown automatically when label prop is provided
 *    - showSublabel - Sublabel is shown automatically when sublabel prop is provided
 *    - showHint - Hint is shown automatically when hintText prop is provided
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - onChange: Required callback function for handling input changes
 *    - step: Step value for number increment/decrement
 *    - errorMessage: Error message to display
 *    - helpIconHintText: Tooltip text for help icon
 *    - All standard HTML input attributes (except size, style, className)
 */

// Base connection
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping
            size: figma.enum('size', {
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),

            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),

            // Placeholder maps to value in code (converted to number)
            value: figma.string('placeholder'),

            // Unit text mapping
            unit: figma.string('unitText'),

            // Unit position mapping
            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),

            // Slot mappings
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),

            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),

            // State to error mapping
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),

            // Mandatory to required mapping
            required: figma.boolean('mandatory'),

            // Note: The following Figma props are not mapped:
            // - state: Other states handled automatically by component interactions
            // - showInfo: Not available in current implementation
            // - showLabel: Determined by presence of label
            // - showSublabel: Determined by presence of sublabel
            // - showHint: Determined by presence of hintText
        },

        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
            required,
        }) => (
            <UnitInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={required}
                onChange={() => {}}
            />
        ),

        imports: [
            "import { UnitInput, UnitInputSize, UnitPosition } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/UnitInput',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-inputs-unitinput--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLabel: true },
        props: {
            size: figma.enum('size', {
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            unit: figma.string('unitText'),
            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            required: figma.boolean('mandatory'),
        },
        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
            required,
        }) => (
            <UnitInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={required}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLabel: false },
        props: {
            size: figma.enum('size', {
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            unit: figma.string('unitText'),
            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            required: figma.boolean('mandatory'),
        },
        example: ({
            size,
            hintText,
            value,
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
            required,
        }) => (
            <UnitInput
                size={size}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={required}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Unit on left
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { unitPosition: 'left' },
        props: {
            size: figma.enum('size', {
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            unit: figma.string('unitText'),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            required: figma.boolean('mandatory'),
        },
        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            unit,
            leftSlot,
            rightSlot,
            error,
            required,
        }) => (
            <UnitInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={UnitPosition.LEFT}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={required}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Unit on right
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { unitPosition: 'right' },
        props: {
            size: figma.enum('size', {
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            unit: figma.string('unitText'),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            required: figma.boolean('mandatory'),
        },
        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            unit,
            leftSlot,
            rightSlot,
            error,
            required,
        }) => (
            <UnitInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={UnitPosition.RIGHT}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={required}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Medium size
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'md' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            unit: figma.string('unitText'),
            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            required: figma.boolean('mandatory'),
        },
        example: ({
            label,
            sublabel,
            hintText,
            value,
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
            required,
        }) => (
            <UnitInput
                size={UnitInputSize.MEDIUM}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={required}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Large size
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'lg' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            unit: figma.string('unitText'),
            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            required: figma.boolean('mandatory'),
        },
        example: ({
            label,
            sublabel,
            hintText,
            value,
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
            required,
        }) => (
            <UnitInput
                size={UnitInputSize.LARGE}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={required}
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Required field
figma.connect(
    UnitInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-514810&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { mandatory: true },
        props: {
            size: figma.enum('size', {
                md: UnitInputSize.MEDIUM,
                lg: UnitInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            unit: figma.string('unitText'),
            unitPosition: figma.enum('unitPosition', {
                left: UnitPosition.LEFT,
                right: UnitPosition.RIGHT,
            }),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.boolean('showRightSlot', {
                true: figma.instance('rightSlot'),
                false: undefined,
            }),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            unit,
            unitPosition,
            leftSlot,
            rightSlot,
            error,
        }) => (
            <UnitInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={Number(value) || 0}
                unit={unit}
                unitPosition={unitPosition}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
                required={true}
                onChange={() => {}}
            />
        ),
    }
)

/**
 * Example of UnitInput usage in code:
 *
 * // Basic usage
 * const [weight, setWeight] = useState(0);
 *
 * <UnitInput
 *   value={weight}
 *   onChange={(e) => setWeight(Number(e.target.value))}
 *   unit="kg"
 *   unitPosition={UnitPosition.RIGHT}
 * />
 *
 * // With label and hint
 * <UnitInput
 *   label="Weight"
 *   sublabel="Required"
 *   hintText="Enter your weight"
 *   value={weight}
 *   onChange={(e) => setWeight(Number(e.target.value))}
 *   unit="kg"
 *   unitPosition={UnitPosition.RIGHT}
 *   size={UnitInputSize.MEDIUM}
 *   required={true}
 * />
 *
 * // With error state
 * <UnitInput
 *   label="Height"
 *   value={height}
 *   onChange={(e) => setHeight(Number(e.target.value))}
 *   unit="cm"
 *   unitPosition={UnitPosition.RIGHT}
 *   error={true}
 *   errorMessage="Height must be between 50 and 300 cm"
 *   min={50}
 *   max={300}
 * />
 *
 * // With unit on left
 * import { DollarSign } from 'lucide-react';
 *
 * <UnitInput
 *   label="Price"
 *   value={price}
 *   onChange={(e) => setPrice(Number(e.target.value))}
 *   unit="$"
 *   unitPosition={UnitPosition.LEFT}
 *   min={0}
 *   step={0.01}
 * />
 *
 * // With slots
 * import { Calculator } from 'lucide-react';
 *
 * <UnitInput
 *   label="Distance"
 *   value={distance}
 *   onChange={(e) => setDistance(Number(e.target.value))}
 *   unit="km"
 *   unitPosition={UnitPosition.RIGHT}
 *   leftSlot={<Calculator size={18} />}
 *   rightSlot={
 *     <button onClick={convertToMiles}>
 *       Convert
 *     </button>
 *   }
 * />
 *
 * // With percentage
 * <UnitInput
 *   label="Interest Rate"
 *   value={interestRate}
 *   onChange={(e) => setInterestRate(Number(e.target.value))}
 *   unit="%"
 *   unitPosition={UnitPosition.RIGHT}
 *   min={0}
 *   max={100}
 *   step={0.1}
 * />
 *
 * // With help icon
 * <UnitInput
 *   label="Temperature"
 *   value={temperature}
 *   onChange={(e) => setTemperature(Number(e.target.value))}
 *   unit="°C"
 *   unitPosition={UnitPosition.RIGHT}
 *   helpIconHintText="Body temperature in Celsius"
 *   min={35}
 *   max={42}
 *   step={0.1}
 * />
 *
 * // Complete form example
 * const [speed, setSpeed] = useState(0);
 * const [speedError, setSpeedError] = useState(false);
 *
 * const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
 *   const newSpeed = Number(e.target.value);
 *   setSpeed(newSpeed);
 *   setSpeedError(newSpeed < 0 || newSpeed > 200);
 * };
 *
 * <UnitInput
 *   label="Speed Limit"
 *   sublabel="Maximum allowed speed"
 *   value={speed}
 *   onChange={handleSpeedChange}
 *   unit="km/h"
 *   unitPosition={UnitPosition.RIGHT}
 *   error={speedError}
 *   errorMessage={speedError ? "Speed must be between 0 and 200 km/h" : undefined}
 *   hintText="Enter the speed limit for this road"
 *   min={0}
 *   max={200}
 *   step={10}
 *   required={true}
 *   size={UnitInputSize.LARGE}
 * />
 */
