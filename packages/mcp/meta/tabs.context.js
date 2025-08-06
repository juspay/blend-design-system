const tabsMeta = {
    componentName: 'Tabs',
    componentDescription:
        'A navigation component that organizes content into multiple panels.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic Tabs',
            description: 'Simple tabs usage',
            code: '<Tabs />',
        },
    ],
    props: [
        {
            propName: 'variant',
            propType: 'TabsVariant',
            typeDefinition: `TabsVariant`,
            propDescription: 'variant prop for Tabs',
            llmContext: 'variant prop for Tabs - appearance property for Tabs',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'size',
            propType: 'TabsSize',
            typeDefinition: `TabsSize`,
            propDescription: 'size prop for Tabs',
            llmContext: 'size prop for Tabs - appearance property for Tabs',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
    ],
}

export default tabsMeta
