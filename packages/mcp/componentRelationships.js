// Component relationship mappings for complex components

export const COMPONENT_RELATIONSHIPS = {
    Accordion: {
        type: 'container',
        requiredChildren: ['AccordionItem'],
        childrenProp: 'children',
        defaultChildCount: 2,
        childProps: {
            AccordionItem: {
                required: ['value', 'title', 'children'],
                suggested: ['subtext'],
                defaults: {
                    value: (index) => `item${index + 1}`,
                    title: (index) => `Item ${index + 1}`,
                    children: (index) => `Content for item ${index + 1}`,
                },
            },
        },
        description:
            'Accordion requires AccordionItem children to function properly',
    },
    Radio: {
        type: 'group',
        requiredChildren: ['RadioGroup'],
        childrenProp: 'children',
        defaultChildCount: 1,
        childProps: {
            RadioGroup: {
                required: ['children'],
                suggested: ['name'],
                defaults: {
                    name: () => 'radioGroup',
                    children: () => 'Radio options content',
                },
            },
        },
        description: 'Radio components work within RadioGroup containers',
    },
    DataTable: {
        type: 'data',
        requiredProps: ['columns', 'data'],
        propDependencies: {
            columns: {
                type: 'array',
                required: true,
                description: 'Array of column definitions',
            },
            data: {
                type: 'array',
                required: true,
                description: 'Array of data objects',
            },
            idField: {
                type: 'string',
                suggested: true,
                default: 'id',
                description: 'Field to use as unique identifier',
            },
        },
        description:
            'DataTable requires columns and data props to display content',
    },
    Charts: {
        type: 'data',
        requiredProps: ['data', 'chartType'],
        propDependencies: {
            data: {
                type: 'array',
                required: true,
                description: 'Chart data array',
            },
            chartType: {
                type: 'enum',
                required: true,
                enum: 'ChartType',
                description: 'Type of chart to render',
            },
        },
        description: 'Charts requires data and chartType props',
    },
}

export const PROP_DEPENDENCIES = {
    Accordion: {
        children: {
            required: true,
            type: 'AccordionItem[]',
            minCount: 1,
            description: 'Accordion must contain AccordionItem children',
        },
        isMultiple: {
            affects: 'value',
            rule: 'when isMultiple=true, value should be string[] instead of string',
            description: 'Multiple selection affects value type',
        },
        value: {
            dependsOn: 'isMultiple',
            rule: 'type should match isMultiple setting',
            description: 'Value type depends on isMultiple prop',
        },
    },
    DataTable: {
        columns: {
            required: true,
            type: 'array',
            description: 'Column definitions are required',
        },
        data: {
            required: true,
            type: 'array',
            description: 'Data array is required',
        },
        idField: {
            suggested: true,
            default: 'id',
            description: 'Recommended for performance',
        },
    },
    Charts: {
        data: {
            required: true,
            type: 'array',
            description: 'Chart data is required',
        },
        chartType: {
            required: true,
            type: 'enum',
            enum: 'ChartType',
            description: 'Chart type must be specified',
        },
    },
    Button: {
        buttonType: {
            type: 'enum',
            enum: 'ButtonType',
            default: 'PRIMARY',
            description: 'Button appearance type',
        },
        size: {
            type: 'enum',
            enum: 'ButtonSize',
            default: 'MEDIUM',
            description: 'Button size',
        },
    },
    Alert: {
        variant: {
            type: 'enum',
            enum: 'AlertVariant',
            default: 'INFO',
            description: 'Alert style variant',
        },
    },
}

// Helper function to get relationship info
export function getComponentRelationship(componentName) {
    return COMPONENT_RELATIONSHIPS[componentName] || null
}

// Helper function to get prop dependencies
export function getPropDependencies(componentName) {
    return PROP_DEPENDENCIES[componentName] || {}
}

// Helper function to check if component is complex
export function isComplexComponent(componentName) {
    const relationship = COMPONENT_RELATIONSHIPS[componentName]
    return (
        relationship &&
        (relationship.type === 'container' || relationship.type === 'group')
    )
}

// Helper function to get required children for a component
export function getRequiredChildren(componentName) {
    const relationship = COMPONENT_RELATIONSHIPS[componentName]
    return relationship?.requiredChildren || []
}
