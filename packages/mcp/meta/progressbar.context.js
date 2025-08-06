const progressbarMeta = {
    componentName: 'ProgressBar',
    componentDescription:
        'A component for showing the progress of a task or operation.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic ProgressBar',
            description: 'Simple progressbar usage',
            code: '<ProgressBar />',
        },
    ],
    props: [
        {
            propName: 'value',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'value prop for ProgressBar',
            llmContext:
                'value prop for ProgressBar - general property for ProgressBar',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'size',
            propType: 'ProgressBarSize',
            typeDefinition: `ProgressBarSize`,
            propDescription: 'size prop for ProgressBar',
            llmContext:
                'size prop for ProgressBar - appearance property for ProgressBar',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'variant',
            propType: 'ProgressBarVariant',
            typeDefinition: `ProgressBarVariant`,
            propDescription: 'variant prop for ProgressBar',
            llmContext:
                'variant prop for ProgressBar - appearance property for ProgressBar',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'type',
            propType: 'ProgressBarType',
            typeDefinition: `ProgressBarType`,
            propDescription: 'type prop for ProgressBar',
            llmContext:
                'type prop for ProgressBar - general property for ProgressBar',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'showLabel',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'showLabel prop for ProgressBar',
            llmContext:
                'showLabel prop for ProgressBar - content property for ProgressBar',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'className',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'className prop for ProgressBar',
            llmContext:
                'className prop for ProgressBar - styling property for ProgressBar',
            propDefault: 'undefined',
            category: 'Styling',
            required: false,
        },
    ],
}

export default progressbarMeta
