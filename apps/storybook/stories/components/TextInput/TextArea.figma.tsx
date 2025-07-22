import { figma } from '@figma/code-connect'
import { TextArea } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TEXTAREA COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - label → label
 *    - sublabel → sublabel
 *    - hintText → hintText
 *    - placeholder → placeholder
 *
 * 2. SPECIAL MAPPINGS:
 *    - state=disabled (Figma) → disabled=true (Code) - Disabled state in Figma maps to disabled prop
 *    - state=error (Figma) → error=true (Code) - Error state in Figma maps to error prop
 *    - mandatory (Figma) → required (Code) - mandatory in Figma maps to required prop in code
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - showInfo - Not available in current implementation
 *    - showLabel - Label is shown automatically when label prop is provided
 *    - showSublabel - Sublabel is shown automatically when sublabel prop is provided
 *    - showHint - Hint is shown automatically when hintText prop is provided
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Current textarea value
 *    - onChange: Required callback function for handling changes
 *    - onFocus: Focus event handler
 *    - onBlur: Blur event handler
 *    - rows: Number of visible text lines
 *    - cols: Visible width of the text control
 *    - error: Boolean to indicate error state
 *    - errorMessage: Error message to display
 *    - helpIconHintText: Tooltip text for help icon
 *    - helpIconText: Text for help icon
 *    - resize: Controls textarea resize behavior
 *    - wrap: Text wrapping behavior
 *    - autoFocus: Auto focus on mount
 *    - All standard HTML textarea attributes (except size, style, className)
 */

// Base connection
figma.connect(
    TextArea,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-4101&t=p1mQD533Vr5OGOUG-11',
    {
        props: {
            // Direct string mappings
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),

            // State to disabled mapping
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
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
            // - showInfo: Not available in current implementation
            // - showLabel: Determined by presence of label
            // - showSublabel: Determined by presence of sublabel
            // - showHint: Determined by presence of hintText
        },

        example: ({
            label,
            sublabel,
            hintText,
            placeholder,
            disabled,
            error,
            required,
        }) => (
            <TextArea
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                required={required}
                value=""
                onChange={() => {}}
            />
        ),

        imports: ["import { TextArea } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Inputs/TextArea',
            },
            {
                name: 'Storybook',
                url: 'https://juspay.design/storybook/?path=/docs/components-inputs-textarea--docs',
            },
        ],
    }
)

// Variant: With label
figma.connect(
    TextArea,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-4101&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { showLabel: true },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
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
            placeholder,
            disabled,
            error,
            required,
        }) => (
            <TextArea
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                required={required}
                value=""
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Without label
figma.connect(
    TextArea,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-4101&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { showLabel: false },
        props: {
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
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
        example: ({ hintText, placeholder, disabled, error, required }) => (
            <TextArea
                hintText={hintText}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                required={required}
                value=""
                onChange={() => {}}
            />
        ),
    }
)

// Variant: With sublabel
figma.connect(
    TextArea,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-4101&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { showSublabel: true },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
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
            placeholder,
            disabled,
            error,
            required,
        }) => (
            <TextArea
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                required={required}
                value=""
                onChange={() => {}}
            />
        ),
    }
)

// Variant: With hint
figma.connect(
    TextArea,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-4101&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { showHint: true },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
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
            placeholder,
            disabled,
            error,
            required,
        }) => (
            <TextArea
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                required={required}
                value=""
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Disabled state
figma.connect(
    TextArea,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-4101&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { state: 'disabled' },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            required: figma.boolean('mandatory'),
        },
        example: ({ label, sublabel, hintText, placeholder, required }) => (
            <TextArea
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                disabled={true}
                required={required}
                value=""
                onChange={() => {}}
            />
        ),
    }
)

// Variant: Required field
figma.connect(
    TextArea,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=3940-4101&t=p1mQD533Vr5OGOUG-11',
    {
        variant: { mandatory: true },
        props: {
            label: figma.string('label'),
            sublabel: figma.string('sublabel'),
            hintText: figma.string('hintText'),
            placeholder: figma.string('placeholder'),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
                error: false,
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
            label,
            sublabel,
            hintText,
            placeholder,
            disabled,
            error,
        }) => (
            <TextArea
                label={label}
                sublabel={sublabel}
                hintText={hintText}
                placeholder={placeholder}
                disabled={disabled}
                error={error}
                required={true}
                value=""
                onChange={() => {}}
            />
        ),
    }
)

/**
 * Example of TextArea usage in code:
 *
 * // Basic usage
 * const [description, setDescription] = useState('');
 *
 * <TextArea
 *   value={description}
 *   onChange={(e) => setDescription(e.target.value)}
 *   placeholder="Enter description..."
 * />
 *
 * // With label and hint
 * <TextArea
 *   label="Product Description"
 *   sublabel="Required"
 *   hintText="Provide detailed information about the product"
 *   value={description}
 *   onChange={(e) => setDescription(e.target.value)}
 *   placeholder="Describe your product..."
 *   rows={4}
 *   required={true}
 * />
 *
 * // With error state
 * <TextArea
 *   label="Comments"
 *   value={comments}
 *   onChange={(e) => setComments(e.target.value)}
 *   placeholder="Add your comments..."
 *   error={true}
 *   errorMessage="Comments must be at least 10 characters"
 * />
 *
 * // Disabled state
 * <TextArea
 *   label="Notes"
 *   value={notes}
 *   onChange={() => {}}
 *   placeholder="This field is disabled"
 *   disabled={true}
 *   hintText="This field is currently read-only"
 * />
 *
 * // With help icon
 * <TextArea
 *   label="Feedback"
 *   value={feedback}
 *   onChange={(e) => setFeedback(e.target.value)}
 *   placeholder="Share your feedback..."
 *   helpIconHintText="Your feedback helps us improve our service"
 *   rows={6}
 * />
 *
 * // With resize control
 * <TextArea
 *   label="Message"
 *   value={message}
 *   onChange={(e) => setMessage(e.target.value)}
 *   placeholder="Type your message..."
 *   resize="vertical"
 *   rows={3}
 * />
 *
 * // Complete form example
 * const [bio, setBio] = useState('');
 * const [bioError, setBioError] = useState(false);
 *
 * const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
 *   setBio(e.target.value);
 *   setBioError(e.target.value.length < 20);
 * };
 *
 * <TextArea
 *   label="Bio"
 *   sublabel="Tell us about yourself"
 *   value={bio}
 *   onChange={handleBioChange}
 *   placeholder="Write a short bio..."
 *   required={true}
 *   error={bioError}
 *   errorMessage="Bio must be at least 20 characters"
 *   hintText="This will be displayed on your public profile"
 *   rows={4}
 *   resize="vertical"
 * />
 */
