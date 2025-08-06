const splittagMeta = {
    componentName: 'SplitTag',
    componentDescription:
        'A tag component with split functionality for displaying categorized information.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic SplitTag',
            description: 'Simple splittag usage',
            code: '<SplitTag />',
        },
    ],
    props: [
        {
            propName: 'primaryTag',
            propType: "Omit<TagProps, 'splitTagPosition' | 'size' | 'shape'>",
            typeDefinition: `Omit<TagProps, \'splitTagPosition\' | \'size\' | \'shape\'>`,
            propDescription: 'primaryTag prop for SplitTag',
            llmContext:
                'primaryTag prop for SplitTag - general property for SplitTag',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'secondaryTag',
            propType: "Omit<TagProps, 'splitTagPosition' | 'size' | 'shape'>",
            typeDefinition: `Omit<TagProps, \'splitTagPosition\' | \'size\' | \'shape\'>`,
            propDescription: 'secondaryTag prop for SplitTag',
            llmContext:
                'secondaryTag prop for SplitTag - events property for SplitTag',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'leadingSlot',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'leadingSlot prop for SplitTag',
            llmContext:
                'leadingSlot prop for SplitTag - general property for SplitTag',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'trailingSlot',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'trailingSlot prop for SplitTag',
            llmContext:
                'trailingSlot prop for SplitTag - general property for SplitTag',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'size',
            propType: 'TagSize',
            typeDefinition: `TagSize`,
            propDescription: 'size prop for SplitTag',
            llmContext:
                'size prop for SplitTag - appearance property for SplitTag',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'shape',
            propType: 'TagShape',
            typeDefinition: `TagShape`,
            propDescription: 'shape prop for SplitTag',
            llmContext:
                'shape prop for SplitTag - general property for SplitTag',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
    ],
}

export default splittagMeta
