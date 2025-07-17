import { figma } from '@figma/code-connect'
import { MultiValueInput, TextInputSize } from 'blend-v1'

/**
 * FIGMA CODE CONNECT FOR MULTIVALUEINPUT COMPONENT
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
 *    - state=error (Figma) → error=true (Code) - Error state in Figma maps to error prop
 *    - state=disabled (Figma) → disabled=true (Code) - Disabled state in Figma maps to disabled prop
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state - Other interaction states (hover, focus, etc.) are handled automatically
 *    - placeholder - Not available in MultiValueInput component
 *    - rightSlot - Not available in MultiValueInput component
 *    - leftSlot - Not available in MultiValueInput component
 *    - showRightSlot - Not available in MultiValueInput component
 *    - showLeftSlot - Not available in MultiValueInput component
 *    - showInfo - Not available in current implementation
 *    - showLabel - Label is shown automatically when label prop is provided
 *    - showSublabel - Sublabel is shown automatically when sublabel prop is provided
 *    - showHint - Hint is shown automatically when hintText prop is provided
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - tags: Array of tag strings
 *    - onTagAdd: Callback function for adding tags
 *    - onTagRemove: Callback function for removing tags
 *    - errorMessage: Error message to display
 *    - helpIconHintText: Tooltip text for help icon
 *    - All standard HTML input attributes (except size, style, className)
 */

// Base connection
figma.connect(
    MultiValueInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4616-10576&t=p1mQD533Vr5OGOUG-11',
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

            // State to error/disabled mapping
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),

            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),

            // Note: The following Figma props are not mapped:
            // - state: Other states handled automatically by component interactions
            // - placeholder: Not available in MultiValueInput
            // - rightSlot, leftSlot: Not available in MultiValueInput
            // - showRightSlot, showLeftSlot: Not available in MultiValueInput
            // - showInfo: Not available in current implementation
            // - showLabel: Determined by presence of label
            // - showSublabel: Determined by presence of sublabel
            // - showHint: Determined by presence of hintText
        },

        example: ({ size, label, sublabel, hintText, error, disabled }) => (
            <MultiValueInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                tags={['tag1', 'tag2']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),

        imports: ["import { MultiValueInput, TextInputSize } from 'blend-v1'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/MultiValueInput',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-inputs-multivalueinput--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    MultiValueInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4616-10576&t=p1mQD533Vr5OGOUG-11',
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
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ size, label, sublabel, hintText, error, disabled }) => (
            <MultiValueInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                tags={['tag1', 'tag2']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    MultiValueInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4616-10576&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { showLabel: false },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            hintText: figma.string('hintText'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ size, hintText, error, disabled }) => (
            <MultiValueInput
                size={size}
                hintText={hintText}
                error={error}
                disabled={disabled}
                tags={['tag1', 'tag2']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Error state
figma.connect(
    MultiValueInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4616-10576&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { state: 'error' },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            disabled: false,
        },
        example: ({ size, label, sublabel, hintText }) => (
            <MultiValueInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={true}
                disabled={false}
                tags={['tag1', 'tag2']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Disabled state
figma.connect(
    MultiValueInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4616-10576&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { state: 'disabled' },
        props: {
            size: figma.enum('size', {
                md: TextInputSize.MEDIUM,
                lg: TextInputSize.LARGE,
            }),
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            error: false,
        },
        example: ({ size, label, sublabel, hintText }) => (
            <MultiValueInput
                size={size}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={false}
                disabled={true}
                tags={['tag1', 'tag2']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Medium size
figma.connect(
    MultiValueInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4616-10576&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { size: 'md' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ label, sublabel, hintText, error, disabled }) => (
            <MultiValueInput
                size={TextInputSize.MEDIUM}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                tags={['tag1', 'tag2']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

// Variant: Large size
figma.connect(
    MultiValueInput,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=4616-10576&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { size: 'lg' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            error: figma.enum('state', {
                error: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                disabled: false,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
            }),
        },
        example: ({ label, sublabel, hintText, error, disabled }) => (
            <MultiValueInput
                size={TextInputSize.LARGE}
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                error={error}
                disabled={disabled}
                tags={['tag1', 'tag2']}
                onTagAdd={() => {}}
                onTagRemove={() => {}}
            />
        ),
    }
)

/**
 * Example of MultiValueInput usage in code:
 *
 * // Basic usage
 * const [tags, setTags] = useState(['tag1', 'tag2']);
 *
 * <MultiValueInput
 *   tags={tags}
 *   onTagAdd={(tag) => setTags([...tags, tag])}
 *   onTagRemove={(tag) => setTags(tags.filter(t => t !== tag))}
 * />
 *
 * // With label and hint
 * <MultiValueInput
 *   label="Skills"
 *   sublabel="Add your skills"
 *   hintText="Press Enter to add a skill"
 *   tags={skills}
 *   onTagAdd={handleAddSkill}
 *   onTagRemove={handleRemoveSkill}
 *   size={TextInputSize.MEDIUM}
 * />
 *
 * // With error state
 * <MultiValueInput
 *   label="Keywords"
 *   tags={keywords}
 *   onTagAdd={handleAddKeyword}
 *   onTagRemove={handleRemoveKeyword}
 *   error={true}
 *   errorMessage="At least 3 keywords are required"
 * />
 *
 * // Disabled state
 * <MultiValueInput
 *   label="Categories"
 *   tags={categories}
 *   onTagAdd={() => {}}
 *   onTagRemove={() => {}}
 *   disabled={true}
 *   hintText="Categories cannot be edited"
 * />
 *
 * // With help icon
 * <MultiValueInput
 *   label="Email Recipients"
 *   sublabel="Add email addresses"
 *   tags={recipients}
 *   onTagAdd={handleAddRecipient}
 *   onTagRemove={handleRemoveRecipient}
 *   helpIconHintText="Enter valid email addresses and press Enter"
 *   placeholder="Enter email address"
 * />
 *
 * // Complete form example
 * const [interests, setInterests] = useState<string[]>([]);
 * const [interestsError, setInterestsError] = useState(false);
 *
 * const handleAddInterest = (interest: string) => {
 *   if (interest.trim()) {
 *     setInterests([...interests, interest.trim()]);
 *     setInterestsError(false);
 *   }
 * };
 *
 * const handleRemoveInterest = (interest: string) => {
 *   const updated = interests.filter(i => i !== interest);
 *   setInterests(updated);
 *   setInterestsError(updated.length === 0);
 * };
 *
 * <MultiValueInput
 *   label="Areas of Interest"
 *   sublabel="Add at least one interest"
 *   tags={interests}
 *   onTagAdd={handleAddInterest}
 *   onTagRemove={handleRemoveInterest}
 *   error={interestsError}
 *   errorMessage={interestsError ? "Please add at least one interest" : undefined}
 *   hintText="Type an interest and press Enter"
 *   size={TextInputSize.LARGE}
 * />
 */
