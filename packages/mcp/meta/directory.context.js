const directoryMeta = {
    componentName: 'Directory',
    componentDescription:
        'A file system navigation component for browsing folders and files.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic Directory',
            description: 'Simple directory usage',
            code: '<Directory />',
        },
    ],
    props: [
        {
            propName: 'className',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'className prop for Directory',
            llmContext:
                'className prop for Directory - styling property for Directory',
            propDefault: 'undefined',
            category: 'Styling',
            required: false,
        },
        {
            propName: 'directoryData',
            propType: 'DirectoryData[]',
            typeDefinition: `DirectoryData[]`,
            propDescription: 'directoryData prop for Directory',
            llmContext:
                'directoryData prop for Directory - general property for Directory',
            propDefault: '-',
            category: 'General',
            required: true,
        },
    ],
}

export default directoryMeta
