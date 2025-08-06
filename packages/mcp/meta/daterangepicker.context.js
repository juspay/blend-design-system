const daterangepickerMeta = {
    componentName: 'DateRangePicker',
    componentDescription:
        'A date selection component that allows users to pick a range of dates.',
    features: [
        'Customizable appearance and behavior',
        'Accessible design',
        'Responsive layout',
        'Part of the Blend design system',
    ],
    usageExamples: [
        {
            title: 'Basic DateRangePicker',
            description: 'Simple daterangepicker usage',
            code: '<DateRangePicker />',
        },
    ],
    props: [
        {
            propName: 'value',
            propType: 'DateRange',
            typeDefinition: `DateRange`,
            propDescription: 'value prop for DateRangePicker',
            llmContext:
                'value prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'onChange',
            propType: '(range: DateRange) => void',
            typeDefinition: `(range: DateRange) => void`,
            propDescription: 'onChange prop for DateRangePicker',
            llmContext:
                'onChange prop for DateRangePicker - events property for DateRangePicker',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'showTimePicker',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'showTimePicker prop for DateRangePicker',
            llmContext:
                'showTimePicker prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'showPresets',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'showPresets prop for DateRangePicker',
            llmContext:
                'showPresets prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'placeholder',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'placeholder prop for DateRangePicker',
            llmContext:
                'placeholder prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'isDisabled',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'isDisabled prop for DateRangePicker',
            llmContext:
                'isDisabled prop for DateRangePicker - state property for DateRangePicker',
            propDefault: 'undefined',
            category: 'State',
            required: false,
        },
        {
            propName: 'icon',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'icon prop for DateRangePicker',
            llmContext:
                'icon prop for DateRangePicker - events property for DateRangePicker',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'minDate',
            propType: 'Date',
            typeDefinition: `Date`,
            propDescription: 'minDate prop for DateRangePicker',
            llmContext:
                'minDate prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'maxDate',
            propType: 'Date',
            typeDefinition: `Date`,
            propDescription: 'maxDate prop for DateRangePicker',
            llmContext:
                'maxDate prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'dateFormat',
            propType: 'string',
            typeDefinition: `string`,
            propDescription: 'dateFormat prop for DateRangePicker',
            llmContext:
                'dateFormat prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'allowSingleDateSelection',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription:
                'allowSingleDateSelection prop for DateRangePicker',
            llmContext:
                'allowSingleDateSelection prop for DateRangePicker - events property for DateRangePicker',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'disableFutureDates',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'disableFutureDates prop for DateRangePicker',
            llmContext:
                'disableFutureDates prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'disablePastDates',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'disablePastDates prop for DateRangePicker',
            llmContext:
                'disablePastDates prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'triggerElement',
            propType: 'ReactNode',
            typeDefinition: `ReactNode`,
            propDescription: 'triggerElement prop for DateRangePicker',
            llmContext:
                'triggerElement prop for DateRangePicker - general property for DateRangePicker',
            propDefault: 'undefined',
            category: 'General',
            required: false,
        },
        {
            propName: 'useDrawerOnMobile',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription: 'useDrawerOnMobile prop for DateRangePicker',
            llmContext:
                'useDrawerOnMobile prop for DateRangePicker - events property for DateRangePicker',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
        {
            propName: 'skipQuickFiltersOnMobile',
            propType: 'boolean',
            typeDefinition: `boolean`,
            propDescription:
                'skipQuickFiltersOnMobile prop for DateRangePicker',
            llmContext:
                'skipQuickFiltersOnMobile prop for DateRangePicker - events property for DateRangePicker',
            propDefault: 'undefined',
            category: 'Events',
            required: false,
        },
    ],
}

export default daterangepickerMeta
