const statcardMeta = {
    componentName: 'StatCard',
    componentDescription:
        'A card component for displaying key statistics and metrics with visual indicators.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic StatCard',
            description: 'Simple statcard usage',
            code: '<StatCard />',
        },
    ],
    props: [
        {
            propName: 'title',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'title prop for StatCard',
            llmContext:
                'title prop for StatCard - content property for StatCard',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
        {
            propName: 'value',
            propType: 'string | number',
            typeDefinition: `string | number`,
            propDescription: 'value prop for StatCard',
            llmContext:
                'value prop for StatCard - general property for StatCard',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'change',
            propType: 'StatCardChange',
            typeDefinition: `StatCardChange`,
            propDescription: 'change prop for StatCard',
            llmContext:
                'change prop for StatCard - general property for StatCard',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'subtitle',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'subtitle prop for StatCard',
            llmContext:
                'subtitle prop for StatCard - content property for StatCard',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'variant',
            propType: 'StatCardVariant',
            typeDefinition: `StatCardVariant`,
            propDescription: 'variant prop for StatCard',
            llmContext:
                'variant prop for StatCard - appearance property for StatCard',
            propDefault: '-',
            category: 'Appearance',
            required: true,
        },
        {
            propName: 'chartData',
            propType: 'ChartDataPoint[]',
            typeDefinition: `ChartDataPoint[]`,
            propDescription: 'chartData prop for StatCard',
            llmContext:
                'chartData prop for StatCard - general property for StatCard',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'progressValue',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'progressValue prop for StatCard',
            llmContext:
                'progressValue prop for StatCard - general property for StatCard',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'titleIcon',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'titleIcon prop for StatCard',
            llmContext:
                'titleIcon prop for StatCard - events property for StatCard',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'actionIcon',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'actionIcon prop for StatCard',
            llmContext:
                'actionIcon prop for StatCard - events property for StatCard',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'helpIconText',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'helpIconText prop for StatCard',
            llmContext:
                'helpIconText prop for StatCard - events property for StatCard',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default statcardMeta
