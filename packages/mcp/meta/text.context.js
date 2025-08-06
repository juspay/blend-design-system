const textMeta = {
    componentName: 'Text',
    componentDescription:
        'A typography component with various text styles, weights, and semantic HTML elements.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic Text',
            description: 'Simple text usage',
            code: '<Text />',
        },
    ],
    props: [
        {
            propName: 'children',
            propType: 'React.ReactNode',
            typeDefinition: `React.ReactNode`,
            propDescription: 'children prop for Text',
            llmContext: 'children prop for Text - content property for Text',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
        {
            propName: 'variant',
            propType: 'VariantType',
            typeDefinition: `VariantType`,
            propDescription: 'variant prop for Text',
            llmContext: 'variant prop for Text - appearance property for Text',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'as',
            propType: 'SemanticTagType',
            typeDefinition: `SemanticTagType`,
            propDescription: 'as prop for Text',
            llmContext: 'as prop for Text - general property for Text',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'style',
            propType: 'React.CSSProperties',
            typeDefinition: `React.CSSProperties`,
            propDescription: 'style prop for Text',
            llmContext: 'style prop for Text - appearance property for Text',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
    ],
}

export default textMeta
