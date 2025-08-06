const tooltipMeta = {
    componentName: 'Tooltip',
    componentDescription:
        'A small popup component that provides additional information when hovering over elements.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic Tooltip',
            description: 'Simple tooltip usage',
            code: '<Tooltip />',
        },
    ],
    props: [
        {
            propName: 'children',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'children prop for Tooltip',
            llmContext:
                'children prop for Tooltip - content property for Tooltip',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
        {
            propName: 'content',
            propType: 'ReactNode | string',
            typeDefinition: `ReactNode | string`,
            propDescription: 'content prop for Tooltip',
            llmContext:
                'content prop for Tooltip - events property for Tooltip',
            propDefault: '-',
            category: 'Events',
            required: true,
        },
        {
            propName: 'open',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'open prop for Tooltip',
            llmContext: 'open prop for Tooltip - state property for Tooltip',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'side',
            propType: 'TooltipSide',
            typeDefinition: `TooltipSide`,
            propDescription: 'side prop for Tooltip',
            llmContext: 'side prop for Tooltip - general property for Tooltip',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'align',
            propType: 'TooltipAlign',
            typeDefinition: `TooltipAlign`,
            propDescription: 'align prop for Tooltip',
            llmContext: 'align prop for Tooltip - layout property for Tooltip',
            propDefault: 'undefined',
            category: 'Layout',
            required: false,
        },
        {
            propName: 'showArrow',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'showArrow prop for Tooltip',
            llmContext:
                'showArrow prop for Tooltip - general property for Tooltip',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'size',
            propType: 'TooltipSize',
            typeDefinition: `TooltipSize`,
            propDescription: 'size prop for Tooltip',
            llmContext:
                'size prop for Tooltip - appearance property for Tooltip',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'slot',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'slot prop for Tooltip',
            llmContext: 'slot prop for Tooltip - general property for Tooltip',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'slotDirection',
            propType: 'TooltipSlotDirection',
            typeDefinition: `TooltipSlotDirection`,
            propDescription: 'slotDirection prop for Tooltip',
            llmContext:
                'slotDirection prop for Tooltip - events property for Tooltip',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'delayDuration',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'delayDuration prop for Tooltip',
            llmContext:
                'delayDuration prop for Tooltip - events property for Tooltip',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'offset',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'offset prop for Tooltip',
            llmContext:
                'offset prop for Tooltip - general property for Tooltip',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
    ],
}

export default tooltipMeta
