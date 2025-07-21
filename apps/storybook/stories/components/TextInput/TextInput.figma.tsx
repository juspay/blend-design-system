import React from 'react'
import { figma } from '@figma/code-connect'
import { TextInput, TextInputSize } from 'blend-v1'

/**
 * FIGMA CODE CONNECT FOR TEXTINPUT COMPONENT
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
 *
 * 2. SPECIAL MAPPINGS:
 *    - placeholder (Figma) → value (Code) - Placeholder text in Figma maps to value prop
 *    - mandatory (Figma) → required (Code) - Though not directly exposed in types, it's available via HTML attributes
 *    - state=error (Figma) → error=true (Code) - Error state in Figma maps to error prop
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state - Other interaction states (hover, focus, etc.) are handled automatically
 *    - showInfo - Help icon is shown automatically when helpIconHintText is provided
 *    - showLabel - Label is shown automatically when label prop is provided
 *    - showSubLabel - Sublabel is shown automatically when sublabel prop is provided
 *    - showHint - Hint is shown automatically when hintText prop is provided
 *    - showRightSlot - Right slot is shown automatically when rightSlot prop is provided
 *    - showLeftSlot - Left slot is shown automatically when leftSlot prop is provided
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - onChange: Required callback function for handling input changes
 *    - error: Boolean to indicate error state
 *    - errorMessage: Error message to display
 *    - helpIconHintText: Tooltip text for help icon
 *    - disabled: Whether the input is disabled
 *    - All standard HTML input attributes
 */

// Base connection
figma.connect(
    TextInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3150-5112&t=n62fssG7t2NIbGYp-11',
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

            // Required onChange handler
            onChange: () => {},

            // Note: The following Figma props are not mapped:
            // - state: Other states handled automatically by component interactions
            // - showInfo: Determined by presence of helpIconHintText
            // - showLabel: Determined by presence of label
            // - showSubLabel: Determined by presence of sublabel
            // - showHint: Determined by presence of hintText
            // - mandatory: Can be passed as 'required' HTML attribute
        },

        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            leftSlot,
            rightSlot,
            error,
            onChange,
        }) => (
            <TextInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                onChange={onChange}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
            />
        ),

        imports: ["import { TextInput, TextInputSize } from 'blend-v1'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/TextInput',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-inputs-textinput--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    TextInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3150-5112&t=n62fssG7t2NIbGYp-11',
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
            onChange: () => {},
        },
        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            leftSlot,
            rightSlot,
            error,
            onChange,
        }) => (
            <TextInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                onChange={onChange}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    TextInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3150-5112&t=n62fssG7t2NIbGYp-11',
    {
        variant: { showLabel: false },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
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
            onChange: () => {},
        },
        example: ({
            size,
            hintText,
            value,
            leftSlot,
            rightSlot,
            error,
            onChange,
        }) => (
            <TextInput
                size={size}
                hintText={hintText}
                value={value}
                onChange={onChange}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
            />
        ),
    }
)

// Variant: With slots
figma.connect(
    TextInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3150-5112&t=n62fssG7t2NIbGYp-11',
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
            leftSlot: figma.instance('leftSlot'),
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
            onChange: () => {},
        },
        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            leftSlot,
            rightSlot,
            error,
            onChange,
        }) => (
            <TextInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                onChange={onChange}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
            />
        ),
    }
)

// Variant: With right slot
figma.connect(
    TextInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3150-5112&t=n62fssG7t2NIbGYp-11',
    {
        variant: { showRightSlot: true },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
            leftSlot: figma.boolean('showLeftSlot', {
                true: figma.instance('leftSlot'),
                false: undefined,
            }),
            rightSlot: figma.instance('rightSlot'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            onChange: () => {},
        },
        example: ({
            size,
            label,
            sublabel,
            hintText,
            value,
            leftSlot,
            rightSlot,
            error,
            onChange,
        }) => (
            <TextInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                onChange={onChange}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
            />
        ),
    }
)

// Variant: Medium size
figma.connect(
    TextInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3150-5112&t=n62fssG7t2NIbGYp-11',
    {
        variant: { size: 'md' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
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
            onChange: () => {},
        },
        example: ({
            label,
            sublabel,
            hintText,
            value,
            leftSlot,
            rightSlot,
            error,
            onChange,
        }) => (
            <TextInput
                size={TextInputSize.MEDIUM}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                onChange={onChange}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
            />
        ),
    }
)

// Variant: Large size
figma.connect(
    TextInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3150-5112&t=n62fssG7t2NIbGYp-11',
    {
        variant: { size: 'lg' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            value: figma.string('placeholder'),
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
            onChange: () => {},
        },
        example: ({
            label,
            sublabel,
            hintText,
            value,
            leftSlot,
            rightSlot,
            error,
            onChange,
        }) => (
            <TextInput
                size={TextInputSize.LARGE}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                value={value}
                onChange={onChange}
                leftSlot={leftSlot}
                rightSlot={rightSlot}
                error={error}
            />
        ),
    }
)

/**
 * Example of TextInput usage in code:
 *
 * // Basic usage
 * <TextInput
 *   value={inputValue}
 *   onChange={(e) => setInputValue(e.target.value)}
 *   placeholder="Enter text"
 * />
 *
 * // With label and hint
 * <TextInput
 *   label="Email Address"
 *   sublabel="Required"
 *   hintText="Enter your work email"
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   size={TextInputSize.MEDIUM}
 * />
 *
 * // With error state
 * <TextInput
 *   label="Password"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   error={true}
 *   errorMessage="Password must be at least 8 characters"
 * />
 *
 * // With slots
 * <TextInput
 *   label="Search"
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   leftSlot={<SearchIcon />}
 *   rightSlot={<ClearButton onClick={clearSearch} />}
 * />
 *
 * // With help icon
 * <TextInput
 *   label="API Key"
 *   value={apiKey}
 *   onChange={(e) => setApiKey(e.target.value)}
 *   helpIconHintText="Your API key can be found in the dashboard settings"
 * />
 */
