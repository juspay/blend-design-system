const snackbarMeta = {
    componentName: 'Snackbar',
    componentDescription: 'A snackbar component for the Blend design system.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
    ],
    usageExamples: [
        {
            title: 'Basic Snackbar',
            description: 'Simple snackbar usage',
            code: `<Snackbar />`,
        },
    ],
    props: [
        {
            propName: 'header',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'header prop for Snackbar',
            llmContext: 'header prop for Snackbar',
            propDefault: '-',
            category: 'General',
            required: true,
        },
        {
            propName: 'description',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'description prop for Snackbar',
            llmContext: 'description prop for Snackbar',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'variant',
            propType: 'SnackbarVariant',
            typeDefinition: `enum SnackbarVariant {
        INFO = "info",
        SUCCESS = "success",
        WARNING = "warning",
        ERROR = "error"
      }`,
            propDescription: 'variant prop for Snackbar',
            llmContext: 'variant prop for Snackbar',
            propDefault: '-',
            category: 'Appearance',
            required: true,
        },
        {
            propName: 'onClose',
            propType: '() => void',
            typeDefinition: `() => void`,
            propDescription: 'onClose prop for Snackbar',
            llmContext: 'onClose prop for Snackbar',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'actionButton',
            propType: '{ label: string onClick: () => void }',
            typeDefinition: '{ label: string onClick: () => void }',
            propDescription: 'actionButton prop for Snackbar',
            llmContext: 'actionButton prop for Snackbar',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default snackbarMeta
