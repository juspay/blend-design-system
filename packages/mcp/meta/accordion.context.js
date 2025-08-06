const accordionMeta = {
    componentName: 'Accordion',
    componentDescription:
        'A collapsible content component that allows users to expand and collapse sections of content.',
    features: [
        'Collapsible content sections',
        'Single or multiple panel expansion',
        'Smooth animations',
        'Keyboard navigation support',
        'Customizable icons and styling',
    ],
    usageExamples: [
        {
            title: 'Basic Accordion',
            description: 'Simple accordion usage',
            code: '<Accordion />',
        },
    ],
    props: [
        {
            propName: 'children',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'children prop for Accordion',
            llmContext:
                'children prop for Accordion - content property for Accordion',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
        {
            propName: 'accordionType',
            propType: 'AccordionType',
            typeDefinition: `AccordionType`,
            propDescription: 'accordionType prop for Accordion',
            llmContext:
                'accordionType prop for Accordion - events property for Accordion',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'defaultValue',
            propType: 'string | string[]',
            typeDefinition: `string | string[]`,
            propDescription: 'defaultValue prop for Accordion',
            llmContext:
                'defaultValue prop for Accordion - general property for Accordion',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'value',
            propType: 'string | string[]',
            typeDefinition: `string | string[]`,
            propDescription: 'value prop for Accordion',
            llmContext:
                'value prop for Accordion - general property for Accordion',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'isMultiple',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'isMultiple prop for Accordion',
            llmContext:
                'isMultiple prop for Accordion - general property for Accordion',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'onValueChange',
            propType: '(value: string | string[]) => void',
            typeDefinition: `(value: string | string[]) => void`,
            propDescription: 'onValueChange prop for Accordion',
            llmContext:
                'onValueChange prop for Accordion - events property for Accordion',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default accordionMeta
