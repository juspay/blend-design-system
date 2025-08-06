const searchinputMeta = {
    componentName: 'SearchInput',
    componentDescription:
        'A searchinput component for the Blend design system.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
    ],
    usageExamples: [
        {
            title: 'Basic SearchInput',
            description: 'Simple searchinput usage',
            code: `<SearchInput />`,
        },
    ],
    props: [
        {
            propName: 'leftSlot',
            propType: 'React.ReactNode',
            typeDefinition: `React.ReactNode`,
            propDescription: 'leftSlot prop for SearchInput',
            llmContext: 'leftSlot prop for SearchInput',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'rightSlot',
            propType: 'React.ReactNode',
            typeDefinition: `React.ReactNode`,
            propDescription: 'rightSlot prop for SearchInput',
            llmContext: 'rightSlot prop for SearchInput',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'error',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'error prop for SearchInput',
            llmContext: 'error prop for SearchInput',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'value',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'value prop for SearchInput',
            llmContext: 'value prop for SearchInput',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'onChange',
            propType: '(e: React.ChangeEvent<HTMLInputElement>) => void',
            typeDefinition: `(e: React.ChangeEvent<HTMLInputElement>) => void`,
            propDescription: 'onChange prop for SearchInput',
            llmContext: 'onChange prop for SearchInput',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default searchinputMeta
