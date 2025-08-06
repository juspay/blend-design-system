const checkboxMeta = {
    componentName: 'Checkbox',
    componentDescription:
        'A form control that allows users to select one or more options from a set.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic Checkbox',
            description: 'Simple checkbox usage',
            code: '<Checkbox />',
        },
    ],
    props: [
        {
            propName: 'id',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'id prop for Checkbox',
            llmContext: 'id prop for Checkbox - general property for Checkbox',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'value',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'value prop for Checkbox',
            llmContext:
                'value prop for Checkbox - general property for Checkbox',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'checked',
            propType: "boolean | 'indeterminate'",
            typeDefinition: `boolean | \'indeterminate\'`,
            propDescription: 'checked prop for Checkbox',
            llmContext:
                'checked prop for Checkbox - general property for Checkbox',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'defaultChecked',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'defaultChecked prop for Checkbox',
            llmContext:
                'defaultChecked prop for Checkbox - general property for Checkbox',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'onCheckedChange',
            propType: "(checked: boolean | 'indeterminate') => void",
            typeDefinition: `(checked: boolean | \'indeterminate\') => void`,
            propDescription: 'onCheckedChange prop for Checkbox',
            llmContext:
                'onCheckedChange prop for Checkbox - events property for Checkbox',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'disabled',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'disabled prop for Checkbox',
            llmContext:
                'disabled prop for Checkbox - state property for Checkbox',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'required',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'required prop for Checkbox',
            llmContext:
                'required prop for Checkbox - general property for Checkbox',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'error',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'error prop for Checkbox',
            llmContext:
                'error prop for Checkbox - general property for Checkbox',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'size',
            propType: 'CheckboxSize',
            typeDefinition: `CheckboxSize`,
            propDescription: 'size prop for Checkbox',
            llmContext:
                'size prop for Checkbox - appearance property for Checkbox',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'children',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'children prop for Checkbox',
            llmContext:
                'children prop for Checkbox - content property for Checkbox',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'subtext',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'subtext prop for Checkbox',
            llmContext:
                'subtext prop for Checkbox - content property for Checkbox',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'slot',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'slot prop for Checkbox',
            llmContext:
                'slot prop for Checkbox - general property for Checkbox',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
    ],
}

export default checkboxMeta
