const singleselectMeta = {
    componentName: 'SingleSelect',
    componentDescription:
        'A form control for selecting a single option from a dropdown list.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic SingleSelect',
            description: 'Simple singleselect usage',
            code: '<SingleSelect />',
        },
    ],
    props: [
        {
            propName: 'label',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'label prop for SingleSelect',
            llmContext:
                'label prop for SingleSelect - content property for SingleSelect',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
        {
            propName: 'subLabel',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'subLabel prop for SingleSelect',
            llmContext:
                'subLabel prop for SingleSelect - content property for SingleSelect',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'hintText',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'hintText prop for SingleSelect',
            llmContext:
                'hintText prop for SingleSelect - content property for SingleSelect',
            propDefault: 'undefined',
            category: 'Content',
            required: false,
        },
        {
            propName: 'required',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'required prop for SingleSelect',
            llmContext:
                'required prop for SingleSelect - general property for SingleSelect',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'helpIconText',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'helpIconText prop for SingleSelect',
            llmContext:
                'helpIconText prop for SingleSelect - events property for SingleSelect',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'placeholder',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'placeholder prop for SingleSelect',
            llmContext:
                'placeholder prop for SingleSelect - general property for SingleSelect',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'size',
            propType: 'SelectMenuSize',
            typeDefinition: `SelectMenuSize`,
            propDescription: 'size prop for SingleSelect',
            llmContext:
                'size prop for SingleSelect - appearance property for SingleSelect',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'items',
            propType: 'SelectMenuGroupType[]',
            typeDefinition: `SelectMenuGroupType[]`,
            propDescription: 'items prop for SingleSelect',
            llmContext:
                'items prop for SingleSelect - general property for SingleSelect',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'variant',
            propType: 'SelectMenuVariant',
            typeDefinition: `SelectMenuVariant`,
            propDescription: 'variant prop for SingleSelect',
            llmContext:
                'variant prop for SingleSelect - appearance property for SingleSelect',
            propDefault: 'undefined',
            category: 'Appearance',
            required: false,
        },
        {
            propName: 'selected',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'selected prop for SingleSelect',
            llmContext:
                'selected prop for SingleSelect - general property for SingleSelect',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'onSelect',
            propType: '(value: string) => void',
            typeDefinition: `(value: string) => void`,
            propDescription: 'onSelect prop for SingleSelect',
            llmContext:
                'onSelect prop for SingleSelect - events property for SingleSelect',
            propDefault: '-',
            category: 'Events',
            required: true,
        },
        {
            propName: 'enableSearch',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'enableSearch prop for SingleSelect',
            llmContext:
                'enableSearch prop for SingleSelect - general property for SingleSelect',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'slot',
            propType: 'React.ReactNode',
            typeDefinition: `React.ReactNode`,
            propDescription: 'slot prop for SingleSelect',
            llmContext:
                'slot prop for SingleSelect - general property for SingleSelect',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'disabled',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'disabled prop for SingleSelect',
            llmContext:
                'disabled prop for SingleSelect - state property for SingleSelect',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'name',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'name prop for SingleSelect',
            llmContext:
                'name prop for SingleSelect - general property for SingleSelect',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'useDrawerOnMobile',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'useDrawerOnMobile prop for SingleSelect',
            llmContext:
                'useDrawerOnMobile prop for SingleSelect - events property for SingleSelect',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'alignment',
            propType: 'SelectMenuAlignment',
            typeDefinition: `SelectMenuAlignment`,
            propDescription: 'alignment prop for SingleSelect',
            llmContext:
                'alignment prop for SingleSelect - layout property for SingleSelect',
            propDefault: 'undefined',
            category: 'Layout',
            required: false,
        },
        {
            propName: 'side',
            propType: 'SelectMenuSide',
            typeDefinition: `SelectMenuSide`,
            propDescription: 'side prop for SingleSelect',
            llmContext:
                'side prop for SingleSelect - general property for SingleSelect',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'sideOffset',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'sideOffset prop for SingleSelect',
            llmContext:
                'sideOffset prop for SingleSelect - general property for SingleSelect',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'alignOffset',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'alignOffset prop for SingleSelect',
            llmContext:
                'alignOffset prop for SingleSelect - layout property for SingleSelect',
            propDefault: 'undefined',
            category: 'Layout',
            required: false,
        },
        {
            propName: 'minWidth',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'minWidth prop for SingleSelect',
            llmContext:
                'minWidth prop for SingleSelect - layout property for SingleSelect',
            propDefault: 'undefined',
            category: 'Layout',
            required: false,
        },
        {
            propName: 'maxWidth',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'maxWidth prop for SingleSelect',
            llmContext:
                'maxWidth prop for SingleSelect - layout property for SingleSelect',
            propDefault: 'undefined',
            category: 'Layout',
            required: false,
        },
        {
            propName: 'maxHeight',
            propType: 'number',
            typeDefinition: `number`,
            propDescription: 'maxHeight prop for SingleSelect',
            llmContext:
                'maxHeight prop for SingleSelect - layout property for SingleSelect',
            propDefault: 'undefined',
            category: 'Layout',
            required: false,
        },
    ],
}

export default singleselectMeta
