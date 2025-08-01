const buttonv2Meta = {
    componentName: 'Button',
    componentDescription:
        'An enhanced button component with comprehensive styling options, multiple variants, loading states, and flexible layout configurations for modern user interfaces.',
    features: [
        'Four button types (primary, secondary, danger, success)',
        'Three sizes (small, medium, large)',
        'Multiple subtypes (default, icon-only, inline)',
        'Loading state with spinner',
        'Leading and trailing icon support',
        'Full width option',
        'Button group integration',
        'Disabled state handling',
        'Flexible content justification',
        'Accessible design',
    ],
    props: [
        {
            propName: 'buttonType',
            propType: 'ButtonType',
            typeDefinition: `enum ButtonType {
        PRIMARY = "primary",
        SECONDARY = "secondary",
        DANGER = "danger",
        SUCCESS = "success",
      }`,
            propDescription: 'The visual type/variant of the button',
            propDefault: 'ButtonType.PRIMARY',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'size',
            propType: 'ButtonSize',
            typeDefinition: `enum ButtonSize {
        SMALL = "sm",
        MEDIUM = "md",
        LARGE = "lg",
      }`,
            propDescription: 'The size of the button',
            propDefault: 'ButtonSize.SMALL',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'subType',
            propType: 'ButtonSubType',
            typeDefinition: `enum ButtonSubType {
        DEFAULT = "default",
        ICON_ONLY = "iconOnly",
        INLINE = "inline",
      }`,
            propDescription:
                'The subtype that affects button styling and behavior',
            propDefault: 'ButtonSubType.DEFAULT',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'text',
            propType: 'string',
            typeDefinition: 'string',
            propDescription: 'The text content displayed in the button',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'leadingIcon',
            propType: 'React.ReactNode',
            typeDefinition: 'React.ReactNode',
            propDescription: 'Icon element to display before the button text',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'trailingIcon',
            propType: 'React.ReactNode',
            typeDefinition: 'React.ReactNode',
            propDescription: 'Icon element to display after the button text',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'disabled',
            propType: 'boolean',
            typeDefinition: 'boolean',
            propDescription:
                'Whether the button is disabled and non-interactive',
            propDefault: 'false',
            category: 'State',
            required: false,
        },
        {
            propName: 'onClick',
            propType: '() => void',
            typeDefinition: '() => void',
            propDescription:
                'Callback function called when the button is clicked',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'loading',
            propType: 'boolean',
            typeDefinition: 'boolean',
            propDescription:
                'Whether the button is in a loading state with spinner',
            propDefault: 'false',
            category: 'State',
            required: false,
        },
        {
            propName: 'buttonGroupPosition',
            propType: "'center' | 'left' | 'right'",
            typeDefinition: "'center' | 'left' | 'right'",
            propDescription: 'Position of the button within a button group',
            propDefault: 'undefined',
            category: 'Layout',
            required: false,
        },
        {
            propName: 'fullWidth',
            propType: 'boolean',
            typeDefinition: 'boolean',
            propDescription:
                'Whether the button should take the full width of its container',
            propDefault: 'false',
            category: 'Layout',
            required: false,
        },
        {
            propName: 'justifyContent',
            propType: "CSSObject['justifyContent']",
            typeDefinition: "CSSObject['justifyContent']",
            propDescription:
                'CSS justify-content property for button content alignment',
            propDefault: 'center',
            category: 'Layout',
            required: false,
        },
    ],
}

export default buttonv2Meta
