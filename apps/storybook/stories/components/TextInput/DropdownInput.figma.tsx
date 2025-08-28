import { figma } from '@figma/code-connect'
import { DropdownInput, TextInputSize } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR DROPDOWNINPUT COMPONENT
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
 *    - leftSlot (Figma) → slot (Code) - Left slot in Figma maps to slot prop in code
 *    - state=error (Figma) → error=true (Code) - Error state in Figma maps to error prop
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - dropdownPosition - Not available in code implementation
 *    - state - Other interaction states (hover, focus, etc.) are handled automatically
 *    - showInfo - Help icon is shown automatically when helpIconHintText is provided
 *    - showLabel - Label is shown automatically when label prop is provided
 *    - showSublabel - Sublabel is shown automatically when sublabel prop is provided
 *    - showHint - Hint is shown automatically when hintText prop is provided
 *    - showRightSlot - Not used in DropdownInput (dropdown is always on the right)
 *    - rightSlot - Not used in DropdownInput
 *    - showLeftSlot - Left slot is shown automatically when slot prop is provided
 *    - mandatory - Not directly supported in code
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - onChange: Callback function for handling input changes
 *    - onDropDownChange: Callback function for handling dropdown selection changes
 *    - dropDownItems: Array of items for the dropdown menu
 *    - dropDownValue: Currently selected dropdown value
 *    - error: Boolean to indicate error state
 *    - errorMessage: Error message to display
 *    - helpIconHintText: Tooltip text for help icon
 *    - disabled: Whether the input is disabled
 *    - All standard HTML input attributes
 */

// Base connection
figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-513927&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Size mapping
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),

            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),

            // Placeholder maps to value in code
            value: figma.string('placeholder'),

            // Left slot mapping (leftSlot in Figma → slot in code)
            slot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
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

            // Note: The following Figma props are not mapped:
            // - dropdownPosition: Not available in code
            // - state: Other states handled automatically by component interactions
            // - showInfo: Determined by presence of helpIconHintText
            // - showLabel: Determined by presence of label
            // - showSublabel: Determined by presence of sublabel
            // - showHint: Determined by presence of hintText
            // - showRightSlot: Not applicable (dropdown is always on right)
            // - rightSlot: Not applicable
            // - mandatory: Can be passed as 'required' HTML attribute
        },

        example: ({ size, label, sublabel, hintText, value, slot, error }) => (
            <DropdownInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                slot={slot}
                error={error}
                onChange={() => {}}
                onDropDownChange={() => {}}
                dropDownItems={[]}
                dropDownValue=""
            />
        ),

        imports: [
            "import { DropdownInput, TextInputSize } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/DropdownInput',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-inputs-dropdowninput--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-513927&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLabel: true },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            slot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
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
        example: ({ size, label, sublabel, hintText, value, slot, error }) => (
            <DropdownInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                slot={slot}
                error={error}
                onChange={() => {}}
                onDropDownChange={() => {}}
                dropDownItems={[]}
                dropDownValue=""
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-513927&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLabel: false },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            slot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
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
        example: ({ size, hintText, value, slot, error }) => (
            <DropdownInput
                size={size}
                hintText={hintText}
                value={value}
                slot={slot}
                error={error}
                onChange={() => {}}
                onDropDownChange={() => {}}
                dropDownItems={[]}
                dropDownValue=""
            />
        ),
    }
)

// Variant: With left slot
figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-513927&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { showLeftSlot: true },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            slot: figma.instance('leftSlot'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
        },
        example: ({ size, label, sublabel, hintText, value, slot, error }) => (
            <DropdownInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                slot={slot}
                error={error}
                onChange={() => {}}
                onDropDownChange={() => {}}
                dropDownItems={[]}
                dropDownValue=""
            />
        ),
    }
)

// Variant: Medium size
figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-513927&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'md' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            slot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
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
        example: ({ label, sublabel, hintText, value, slot, error }) => (
            <DropdownInput
                size={TextInputSize.MEDIUM}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                slot={slot}
                error={error}
                onChange={() => {}}
                onDropDownChange={() => {}}
                dropDownItems={[]}
                dropDownValue=""
            />
        ),
    }
)

// Variant: Large size
figma.connect(
    DropdownInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-513927&t=2L1Yl830ZKZjFcrt-4',
    {
        variant: { size: 'lg' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            slot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
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
        example: ({ label, sublabel, hintText, value, slot, error }) => (
            <DropdownInput
                size={TextInputSize.LARGE}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                slot={slot}
                error={error}
                onChange={() => {}}
                onDropDownChange={() => {}}
                dropDownItems={[]}
                dropDownValue=""
            />
        ),
    }
)

/**
 * Example of DropdownInput usage in code:
 *
 * // Basic usage
 * const dropdownItems = [
 *   {
 *     label: 'Options',
 *     items: [
 *       { label: 'USD', value: 'usd' },
 *       { label: 'EUR', value: 'eur' },
 *       { label: 'GBP', value: 'gbp' }
 *     ]
 *   }
 * ];
 *
 * <DropdownInput
 *   value={amount}
 *   onChange={(e) => setAmount(e.target.value)}
 *   dropDownValue={currency}
 *   onDropDownChange={setCurrency}
 *   dropDownItems={dropdownItems}
 *   placeholder="Enter amount"
 * />
 *
 * // With label and hint
 * <DropdownInput
 *   label="Price"
 *   sublabel="Required"
 *   hintText="Enter the product price"
 *   value={price}
 *   onChange={(e) => setPrice(e.target.value)}
 *   dropDownValue={selectedCurrency}
 *   onDropDownChange={setSelectedCurrency}
 *   dropDownItems={currencyOptions}
 *   size={TextInputSize.MEDIUM}
 * />
 *
 * // With error state
 * <DropdownInput
 *   label="Amount"
 *   value={amount}
 *   onChange={(e) => setAmount(e.target.value)}
 *   dropDownValue={currency}
 *   onDropDownChange={setCurrency}
 *   dropDownItems={currencyList}
 *   error={true}
 *   errorMessage="Amount must be greater than 0"
 * />
 *
 * // With left slot
 * <DropdownInput
 *   label="Phone Number"
 *   value={phoneNumber}
 *   onChange={(e) => setPhoneNumber(e.target.value)}
 *   dropDownValue={countryCode}
 *   onDropDownChange={setCountryCode}
 *   dropDownItems={countryCodeOptions}
 *   slot={<PhoneIcon />}
 * />
 *
 * // With help icon
 * <DropdownInput
 *   label="Exchange Rate"
 *   value={rate}
 *   onChange={(e) => setRate(e.target.value)}
 *   dropDownValue={baseCurrency}
 *   onDropDownChange={setBaseCurrency}
 *   dropDownItems={currencyPairs}
 *   helpIconHintText="The exchange rate will be updated daily"
 * />
 */
