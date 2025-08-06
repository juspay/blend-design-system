const tagsMeta = {
    componentName: 'Tags',
    componentDescription: 'A tags component for the Blend design system.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
    ],
    usageExamples: [
        {
            title: 'Basic Tags',
            description: 'Simple tags usage',
            code: `<Tags />`,
        },
    ],
    props: [
        {
            propName: 'text',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'text prop for Tags',
            llmContext: 'text prop for Tags',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
        {
            propName: 'variant',
            propType: 'TagVariant',
            typeDefinition: `enum TagVariant {
        NO_FILL = "noFill",
        ATTENTIVE = "attentive",
        SUBTLE = "subtle"
      }`,
            propDescription: 'variant prop for Tags',
            llmContext: 'variant prop for Tags',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'color',
            propType: 'TagColor',
            typeDefinition: `enum TagColor {
        NEUTRAL = "neutral",
        PRIMARY = "primary",
        SUCCESS = "success",
        ERROR = "error",
        WARNING = "warning",
        PURPLE = "purple"
      }`,
            propDescription: 'color prop for Tags',
            llmContext: 'color prop for Tags',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'size',
            propType: 'TagSize',
            typeDefinition: `enum TagSize {
        XS = "xs",
        SM = "sm",
        MD = "md",
        LG = "lg"
      }`,
            propDescription: 'size prop for Tags',
            llmContext: 'size prop for Tags',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'shape',
            propType: 'TagShape',
            typeDefinition: `enum TagShape {
        ROUNDED = "rounded",
        SQUARICAL = "squarical"
      }`,
            propDescription: 'shape prop for Tags',
            llmContext: 'shape prop for Tags',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'leftSlot',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'leftSlot prop for Tags',
            llmContext: 'leftSlot prop for Tags',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'rightSlot',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'rightSlot prop for Tags',
            llmContext: 'rightSlot prop for Tags',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'onClick',
            propType: '() => void',
            typeDefinition: `() => void`,
            propDescription: 'onClick prop for Tags',
            llmContext: 'onClick prop for Tags',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'splitTagPosition',
            propType: "'left' | 'right'",
            typeDefinition: `'left' | 'right'`,
            propDescription: 'splitTagPosition prop for Tags',
            llmContext: 'splitTagPosition prop for Tags',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default tagsMeta
