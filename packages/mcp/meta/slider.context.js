const sliderMeta = {
    componentName: 'Slider',
    componentDescription:
        'An input component that allows users to select a value from a range by dragging a handle.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic Slider',
            description: 'Simple slider usage',
            code: '<Slider />',
        },
    ],
    props: [
        {
            propName: 'variant',
            propType: 'SliderVariant',
            typeDefinition: `SliderVariant`,
            propDescription: 'variant prop for Slider',
            llmContext:
                'variant prop for Slider - appearance property for Slider',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'size',
            propType: 'SliderSize',
            typeDefinition: `SliderSize`,
            propDescription: 'size prop for Slider',
            llmContext: 'size prop for Slider - appearance property for Slider',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'valueFormat',
            propType: 'SliderValueFormatConfig',
            typeDefinition: `SliderValueFormatConfig`,
            propDescription: 'valueFormat prop for Slider',
            llmContext:
                'valueFormat prop for Slider - general property for Slider',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'showValueLabels',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'showValueLabels prop for Slider',
            llmContext:
                'showValueLabels prop for Slider - content property for Slider',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'labelPosition',
            propType: 'SliderLabelPosition',
            typeDefinition: `SliderLabelPosition`,
            propDescription: 'labelPosition prop for Slider',
            llmContext:
                'labelPosition prop for Slider - events property for Slider',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default sliderMeta
