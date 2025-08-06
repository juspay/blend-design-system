const buttongroupMeta = {
    componentName: 'ButtonGroup',
    componentDescription:
        'A component for grouping related buttons together with consistent spacing and styling.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic ButtonGroup',
            description: 'Simple buttongroup usage',
            code: '<ButtonGroup />',
        },
    ],
    props: [
        {
            propName: 'stacked',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'stacked prop for ButtonGroup',
            llmContext:
                'stacked prop for ButtonGroup - general property for ButtonGroup',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'children',
            propType:
                'ReactElement<ButtonV2Props> | ReactElement<ButtonV2Props>[]',
            typeDefinition: `ReactElement<ButtonV2Props> | ReactElement<ButtonV2Props>[]`,
            propDescription: 'children prop for ButtonGroup',
            llmContext:
                'children prop for ButtonGroup - content property for ButtonGroup',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
    ],
}

export default buttongroupMeta
