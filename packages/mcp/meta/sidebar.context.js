const sidebarMeta = {
    componentName: 'Sidebar',
    componentDescription:
        'A navigation panel component typically used for main application navigation.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic Sidebar',
            description: 'Simple sidebar usage',
            code: '<Sidebar />',
        },
    ],
    props: [
        {
            propName: 'tenants',
            propType: 'TenantInfo[]',
            typeDefinition: `TenantInfo[]`,
            propDescription: 'tenants prop for Sidebar',
            llmContext:
                'tenants prop for Sidebar - general property for Sidebar',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'merchants',
            propType: 'MerchantInfo[]',
            typeDefinition: `MerchantInfo[]`,
            propDescription: 'merchants prop for Sidebar',
            llmContext:
                'merchants prop for Sidebar - general property for Sidebar',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'children',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'children prop for Sidebar',
            llmContext:
                'children prop for Sidebar - content property for Sidebar',
            propDefault: '-',
            category: 'Content',
            required: true,
        },
        {
            propName: 'data',
            propType: 'DirectoryData[]',
            typeDefinition: `DirectoryData[]`,
            propDescription: 'data prop for Sidebar',
            llmContext: 'data prop for Sidebar - general property for Sidebar',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'topbar',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'topbar prop for Sidebar',
            llmContext:
                'topbar prop for Sidebar - general property for Sidebar',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'activeTenant',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'activeTenant prop for Sidebar',
            llmContext:
                'activeTenant prop for Sidebar - state property for Sidebar',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'setActiveTenant',
            propType: '(tenant: string) => void',
            typeDefinition: `(tenant: string) => void`,
            propDescription: 'setActiveTenant prop for Sidebar',
            llmContext:
                'setActiveTenant prop for Sidebar - state property for Sidebar',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'activeMerchant',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'activeMerchant prop for Sidebar',
            llmContext:
                'activeMerchant prop for Sidebar - state property for Sidebar',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'setActiveMerchant',
            propType: '(merchant: string) => void',
            typeDefinition: `(merchant: string) => void`,
            propDescription: 'setActiveMerchant prop for Sidebar',
            llmContext:
                'setActiveMerchant prop for Sidebar - state property for Sidebar',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'footer',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'footer prop for Sidebar',
            llmContext:
                'footer prop for Sidebar - general property for Sidebar',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
    ],
}

export default sidebarMeta
