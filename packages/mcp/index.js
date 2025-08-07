#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
    McpError,
    ErrorCode,
} from '@modelcontextprotocol/sdk/types.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { getComponentMeta, hasComponentMeta } from './metaReader.js'
import { parseComponentFromSource, getAvailableComponents } from './tsParser.js'
import {
    getComponentRelationship,
    getPropDependencies,
    isComplexComponent,
    getRequiredChildren,
} from './componentRelationships.js'

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Function to find the blend library path
function findBlendLibraryPath() {
    // First check if explicitly set via environment variable
    if (process.env.BLEND_LIBRARY_PATH) {
        return process.env.BLEND_LIBRARY_PATH
    }

    // Try to find it relative to the MCP package
    const possiblePaths = [
        path.join(__dirname, '..', 'blend', 'lib', 'components'),
        path.join(
            __dirname,
            '..',
            '..',
            'packages',
            'blend',
            'lib',
            'components'
        ),
        path.join(process.cwd(), 'packages', 'blend', 'lib', 'components'),
        path.join(
            process.cwd(),
            'node_modules',
            'blend-v1',
            'dist',
            'components'
        ),
        path.join(
            process.cwd(),
            'node_modules',
            'blend-v1',
            'lib',
            'components'
        ),
    ]

    for (const possiblePath of possiblePaths) {
        if (fs.existsSync(possiblePath)) {
            return possiblePath
        }
    }

    // If not found, return a descriptive error path
    return null
}

const BLEND_LIBRARY_PATH = findBlendLibraryPath()
const BLEND_LIBRARY_PACKAGE_NAME =
    process.env.BLEND_LIBRARY_PACKAGE_NAME || 'blend-v1'

if (!BLEND_LIBRARY_PATH) {
    console.error(
        `[WARNING] Could not find Blend library components directory.`
    )
    console.error(`The MCP server will work with embedded metadata only.`)
    console.error(
        `For full functionality, install blend-v1: npm install blend-v1`
    )
    console.error(
        `Or set BLEND_LIBRARY_PATH: export BLEND_LIBRARY_PATH="/path/to/blend/lib/components"`
    )
    // Don't exit - continue with embedded metadata
} else {
    console.error(`[INFO] Using Blend library path: ${BLEND_LIBRARY_PATH}`)
}

console.error(`[INFO] Using Blend package name: ${BLEND_LIBRARY_PACKAGE_NAME}`)

function formatPropValue(value, propTypeString, componentData = null) {
    const normalizedPropType = propTypeString
        ?.toLowerCase()
        .replace(/\s*\|\s*undefined$/, '')
        .trim()

    if (typeof value === 'string') {
        // Handle enum values like ButtonType.PRIMARY
        if (value.includes('.') && value.match(/^[A-Z][a-zA-Z]*\.[A-Z_]+$/)) {
            return `{${value}}`
        }

        // Check if this is an enum value that needs to be formatted
        if (componentData && componentData.enums) {
            for (const [enumName, enumValues] of Object.entries(
                componentData.enums
            )) {
                const enumValue = enumValues.find(
                    (ev) => ev.value === value || ev.key === value
                )
                if (enumValue) {
                    return `{${enumName}.${enumValue.key}}`
                }
            }
        }

        // Handle JSX expressions that are already wrapped
        if (value.startsWith('{') && value.endsWith('}')) {
            return value
        }

        // Handle string literals - always wrap in quotes for string types
        if (
            normalizedPropType === 'string' ||
            normalizedPropType?.includes('string') ||
            !normalizedPropType ||
            (normalizedPropType && normalizedPropType.includes("'"))
        ) {
            return `"${value.replace(/"/g, '\\"')}"`
        }

        // For other types, wrap in JSX expression
        return `{${value}}`
    }

    if (typeof value === 'boolean') return `{${value}}`
    if (typeof value === 'number') return `{${value}}`
    if (typeof value === 'object') return `{${JSON.stringify(value)}}`

    return `{${String(value)}}`
}

// New meta-based functions
async function generateComponentDocumentationFromMeta(componentName) {
    try {
        const componentMeta = await getComponentMeta(componentName)

        let md = `# ${componentMeta.componentName} Component Documentation\n\n`

        // Description
        md += `## Description\n${componentMeta.componentDescription || 'No description available.'}\n\n`

        // Features
        md += `## Features\n`
        if (componentMeta.features && componentMeta.features.length > 0) {
            componentMeta.features.forEach((feature) => {
                md += `- ${feature}\n`
            })
        } else {
            md += 'No features documented.\n'
        }
        md += '\n'

        // Props grouped by category
        md += `## Props\n\n`
        const groupedProps = groupPropsByCategory(componentMeta.props)

        Object.entries(groupedProps).forEach(([category, props]) => {
            md += `### ${category}\n\n`
            md +=
                '| Prop Name | Type | Required | Description | Default Value |\n'
            md +=
                '|-----------|------|----------|-------------|---------------|\n'

            props.forEach((prop) => {
                md += `| \`${prop.propName}\` | \`${prop.propType.replace(/\|/g, '\\|')}\` | ${prop.required ? 'Yes' : 'No'} | ${prop.propDescription} | \`${prop.propDefault}\` |\n`
            })
            md += '\n'
        })

        // Usage Examples
        md += `## Usage Examples\n\n`
        if (
            componentMeta.usageExamples &&
            componentMeta.usageExamples.length > 0
        ) {
            componentMeta.usageExamples.forEach((example) => {
                md += `### ${example.title}\n`
                if (example.description) {
                    md += `${example.description}\n\n`
                }
                md += '```tsx\n'
                md += `${example.code}\n`
                md += '```\n\n'
            })
        } else {
            md += 'No specific usage examples provided.\n\n'
        }

        return md.trim()
    } catch (error) {
        throw new McpError(
            ErrorCode.InternalError,
            `Error generating documentation from meta: ${error.message}`
        )
    }
}

function groupPropsByCategory(props) {
    const grouped = {}
    props.forEach((prop) => {
        const category = prop.category || 'General'
        if (!grouped[category]) {
            grouped[category] = []
        }
        grouped[category].push(prop)
    })
    return grouped
}

async function getBlendComponentPropsFromMeta(componentName) {
    try {
        const componentMeta = await getComponentMeta(componentName)

        const propsData = {
            componentDescription: componentMeta.componentDescription || '',
            props: componentMeta.props.map((prop) => ({
                name: prop.propName,
                type: prop.propType,
                required: prop.required || false,
                description: prop.llmContext || prop.propDescription,
                category: prop.category || 'General',
                defaultValue: prop.propDefault,
            })),
        }

        return propsData
    } catch (error) {
        throw new McpError(
            ErrorCode.InternalError,
            `Error getting props from meta: ${error.message}`
        )
    }
}

// Enhanced component generation with smart logic
function generateSmartComponent(
    componentName,
    componentProps,
    childrenInput,
    componentData = null
) {
    // Check if this is a complex component that needs special handling
    const relationship = getComponentRelationship(componentName)

    if (relationship && relationship.type === 'container' && !childrenInput) {
        // Auto-generate children for container components like Accordion
        return generateContainerComponent(
            componentName,
            componentProps,
            relationship,
            componentData
        )
    }

    // For regular components, use enhanced generation with component data
    return _generateSingleComponentJSX(
        componentName,
        componentProps,
        childrenInput,
        componentData
    )
}

function generateContainerComponent(
    componentName,
    componentProps,
    relationship,
    componentData
) {
    // Generate default children based on relationship configuration
    const defaultChildren = []
    const childCount = relationship.defaultChildCount || 2

    for (let i = 0; i < childCount; i++) {
        const childComponentName = relationship.requiredChildren[0] // Use first required child type
        const childConfig = relationship.childProps[childComponentName]

        if (childConfig) {
            const childProps = {}

            // Generate required props
            childConfig.required.forEach((propName) => {
                if (childConfig.defaults && childConfig.defaults[propName]) {
                    const defaultFunc = childConfig.defaults[propName]
                    childProps[propName] =
                        typeof defaultFunc === 'function'
                            ? defaultFunc(i)
                            : defaultFunc
                }
            })

            // Generate suggested props
            if (childConfig.suggested) {
                childConfig.suggested.forEach((propName) => {
                    if (
                        childConfig.defaults &&
                        childConfig.defaults[propName]
                    ) {
                        const defaultFunc = childConfig.defaults[propName]
                        childProps[propName] =
                            typeof defaultFunc === 'function'
                                ? defaultFunc(i)
                                : defaultFunc
                    }
                })
            }

            defaultChildren.push({
                componentName: childComponentName,
                props: childProps,
                children: childProps.children || null,
            })
        }
    }

    return _generateSingleComponentJSX(
        componentName,
        componentProps,
        defaultChildren,
        componentData
    )
}

function _generateSingleComponentJSX(
    componentName,
    componentProps,
    childrenInput,
    componentData = null
) {
    if (!componentName || typeof componentName !== 'string') {
        throw new McpError(
            ErrorCode.InvalidParams,
            'Missing or invalid componentName for (child) component.'
        )
    }
    if (!componentProps || typeof componentProps !== 'object') {
        throw new McpError(
            ErrorCode.InvalidParams,
            'Missing or invalid props for (child) component.'
        )
    }

    // Validate prop combinations
    const warnings = validatePropCombinations(componentName, componentProps)
    if (warnings.length > 0) {
        console.warn(
            `[WARNING] ${componentName} prop issues:`,
            warnings.join(', ')
        )
    }

    let propsString = ''
    for (const [key, value] of Object.entries(componentProps)) {
        if (typeof value === 'boolean' && value === true) {
            propsString += ` ${key}`
        } else {
            // Get prop type for better formatting
            const propType = componentData?.props?.find(
                (p) => p.propName === key
            )?.propType
            propsString += ` ${key}=${formatPropValue(value, propType, componentData)}`
        }
    }

    let childrenContent = ''
    if (typeof childrenInput === 'string') {
        childrenContent =
            childrenInput.trim() !== ''
                ? `\n  ${childrenInput
                      .split('\n')
                      .map((line) => `  ${line}`)
                      .join('\n')}\n`
                : ''
    } else if (Array.isArray(childrenInput)) {
        childrenContent =
            '\n' +
            childrenInput
                .map((childReq) =>
                    _generateSingleComponentJSX(
                        childReq.componentName,
                        childReq.props,
                        childReq.children,
                        componentData
                    )
                        .split('\n')
                        .map((line) => `  ${line}`)
                        .join('\n')
                )
                .join('\n') +
            '\n'
    }

    let componentCode = `<${componentName}${propsString.trimEnd()}`
    if (childrenContent) {
        componentCode += `>${childrenContent}</${componentName}>`
    } else {
        componentCode += ` />`
    }
    return componentCode
}

// Prop validation function
function validatePropCombinations(componentName, props) {
    const dependencies = getPropDependencies(componentName)
    const warnings = []

    Object.entries(dependencies).forEach(([propName, rule]) => {
        if (rule.required && !props[propName]) {
            warnings.push(`Missing required prop: ${propName}`)
        }

        if (rule.suggested && !props[propName]) {
            warnings.push(
                `Suggested prop missing: ${propName} (${rule.description || 'recommended for better functionality'})`
            )
        }

        if (rule.affects && props[propName]) {
            const affectedProp = rule.affects
            if (propName === 'isMultiple' && props[propName] === true) {
                if (props.value && typeof props.value === 'string') {
                    warnings.push(
                        `When isMultiple=true, value should be an array, not string`
                    )
                }
            }
        }
    })

    return warnings
}

// Enhanced import generation with enum support
function generateImportsWithEnums(componentNames, componentData) {
    const imports = new Set(componentNames)

    // Add enum imports based on component data
    if (componentData?.enums) {
        Object.keys(componentData.enums).forEach((enumName) => {
            imports.add(enumName)
        })
    }

    // Always add ThemeProvider
    imports.add('ThemeProvider')

    return `import { ${Array.from(imports).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";`
}

function generateFintechKpiSummaryWithChart(options, includeImports) {
    if (options.title && typeof options.title !== 'string')
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.title must be a string.'
        )
    if (options.kpis) {
        if (
            !Array.isArray(options.kpis) ||
            !options.kpis.every(
                (kpi) =>
                    typeof kpi === 'object' &&
                    kpi !== null &&
                    typeof kpi.title === 'string' &&
                    typeof kpi.value === 'string'
            )
        ) {
            throw new McpError(
                ErrorCode.InvalidParams,
                "options.kpis must be an array of objects with string 'title' and 'value'."
            )
        }
    }
    if (options.chartRawData && !Array.isArray(options.chartRawData)) {
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.chartRawData must be an array.'
        )
    }
    if (options.chartXKey && typeof options.chartXKey !== 'string') {
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.chartXKey must be a string.'
        )
    }
    if (
        options.chartYKeys &&
        (!Array.isArray(options.chartYKeys) ||
            !options.chartYKeys.every((key) => typeof key === 'string'))
    ) {
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.chartYKeys must be an array of strings.'
        )
    }
    if (
        options.chartType &&
        !['line', 'bar', 'pie'].includes(options.chartType.toLowerCase())
    ) {
        throw new McpError(
            ErrorCode.InvalidParams,
            "options.chartType must be 'line', 'bar', or 'pie'."
        )
    }
    ;['xAxisLabel', 'yAxisLabel', 'chartHeaderSlotString'].forEach((key) => {
        if (options[key] && typeof options[key] !== 'string') {
            throw new McpError(
                ErrorCode.InvalidParams,
                `options.${key} must be a string.`
            )
        }
    })

    const {
        title = 'Financial Overview',
        kpis = [
            {
                title: 'Total Revenue',
                value: '$1.2M',
                changeValue: 15,
                changeDirection: 'positive',
                variant: 'NUMBER',
            },
            {
                title: 'Net Profit',
                value: '$300K',
                changeValue: 8,
                changeDirection: 'positive',
                variant: 'NUMBER',
            },
            {
                title: 'Active Users',
                value: '1,500',
                changeValue: 2,
                changeDirection: 'negative',
                variant: 'NUMBER',
            },
        ],
        chartRawData = [
            { month: 'Jan', sales: 120000, profit: 70000 },
            { month: 'Feb', sales: 150000, profit: 90000 },
        ],
        chartXKey = 'month',
        chartYKeys = ['sales', 'profit'],
        chartType = 'line',
        xAxisLabel = options.chartXKey || 'Category',
        yAxisLabel = 'Value',
        chartHeaderSlotString = options.chartTitle || 'Chart Overview',
    } = options

    const kpiCardsString = kpis
        .map((kpi) => {
            const changeTypeVal =
                kpi.changeDirection === 'positive'
                    ? 'ChangeType.INCREASE'
                    : kpi.changeDirection === 'negative'
                      ? 'ChangeType.DECREASE'
                      : undefined
            const statCardVariantVal =
                kpi.variant &&
                ['LINE', 'PROGRESS_BAR', 'BAR', 'NUMBER'].includes(
                    kpi.variant.toUpperCase()
                )
                    ? `StatCardVariant.${kpi.variant.toUpperCase()}`
                    : 'StatCardVariant.NUMBER'

            let changePropString = ''
            if (changeTypeVal && kpi.changeValue !== undefined) {
                changePropString = `change={{ value: ${Math.abs(Number(kpi.changeValue))}, type: ${changeTypeVal} }}`
            }

            let chartDataPropString = ''
            if (
                kpi.chartData &&
                (statCardVariantVal === 'StatCardVariant.LINE' ||
                    statCardVariantVal === 'StatCardVariant.BAR')
            ) {
                const chartDataContent = Array.isArray(kpi.chartData)
                    ? kpi.chartData
                          .map(
                              (dp) =>
                                  `{label: "${dp.label}", value: ${dp.value}}`
                          )
                          .join(', ')
                    : '[]'
                chartDataPropString = `chartData={[${chartDataContent}]}`
            }

            let progressValuePropString = ''
            if (
                kpi.progressValue !== undefined &&
                statCardVariantVal === 'StatCardVariant.PROGRESS_BAR'
            ) {
                progressValuePropString = `progressValue={${Number(kpi.progressValue)}}`
            }

            return `      <div style={{ flex: 1, minWidth: '200px' }}>
        <StatCard
          title="${kpi.title}"
          value="${kpi.value}"
          variant={${statCardVariantVal}}
          ${changePropString}
          ${chartDataPropString}
          ${progressValuePropString}
        />
      </div>`
        })
        .join('\n')

    const transformedChartData = chartRawData.map((item) => {
        const dataPointData = {}
        for (const yKey of chartYKeys) {
            if (item[yKey] !== undefined) {
                dataPointData[yKey] = {
                    primary: { label: yKey, val: Number(item[yKey]) },
                }
            }
        }
        return { name: String(item[chartXKey]), data: dataPointData }
    })
    const chartDataString = JSON.stringify(transformedChartData)
    const chartTypeVal = `ChartType.${chartType.toUpperCase()}`

    const chartString = `    <Charts
      chartHeaderSlot={"${chartHeaderSlotString}"}
      data={${chartDataString}}
      chartType={${chartTypeVal}}
      ${xAxisLabel ? `xAxisLabel="${xAxisLabel}"` : ''}
      ${yAxisLabel ? `yAxisLabel="${yAxisLabel}"` : ''}
    />`

    let code = `
<div>
  <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>
    ${title}
  </h2>
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
${kpiCardsString}
  </div>
  <div style={{ marginTop: '20px' }}>
${chartString}
  </div>
</div>`

    if (includeImports) {
        const imports = `import { StatCard, Charts, StatCardVariant, ChangeType, ChartType, ThemeProvider } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`
        code = `${imports}<ThemeProvider>\n  ${code
            .split('\n')
            .map((line) => `  ${line}`)
            .join('\n')}\n</ThemeProvider>`
    }
    return code.trim()
}

function generateTransactionListWithControls(options, includeImports) {
    if (options.title && typeof options.title !== 'string') {
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.title must be a string for transaction_list_with_controls.'
        )
    }
    if (
        options.columns &&
        !(typeof options.columns === 'string' || Array.isArray(options.columns))
    ) {
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.columns must be an array or a string representing an array.'
        )
    }
    if (
        options.data &&
        !(typeof options.data === 'string' || Array.isArray(options.data))
    ) {
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.data must be an array or a string representing an array.'
        )
    }
    if (
        options.filters &&
        (!Array.isArray(options.filters) ||
            !options.filters.every(
                (f) =>
                    typeof f === 'object' &&
                    f !== null &&
                    typeof f.type === 'string' &&
                    typeof f.label === 'string'
            ))
    ) {
        throw new McpError(
            ErrorCode.InvalidParams,
            "options.filters must be an array of objects with string 'type' and 'label'."
        )
    }
    if (
        options.mainActions &&
        (!Array.isArray(options.mainActions) ||
            !options.mainActions.every(
                (a) =>
                    typeof a === 'object' &&
                    a !== null &&
                    typeof a.component === 'string'
            ))
    ) {
        throw new McpError(
            ErrorCode.InvalidParams,
            "options.mainActions must be an array of objects with string 'component'."
        )
    }
    if (
        options.dataTableIdField &&
        typeof options.dataTableIdField !== 'string'
    ) {
        throw new McpError(
            ErrorCode.InvalidParams,
            'options.dataTableIdField must be a string.'
        )
    }

    const {
        title = 'Transactions',
        columns = '[{ "header": "ID", "field": "id" }, { "header": "Date", "field": "date" }, { "header": "Amount", "field": "amount" }, { "header": "Status", "field": "status" }]',
        data = '[{ "id": "T001", "date": "2023-01-15", "amount": "$250.00", "status": "Completed" }]',
        filters = [
            {
                type: 'TextInput',
                label: 'Search',
                props: { placeholder: 'Search transactions...' },
            },
            {
                type: 'SingleSelect',
                label: 'Status',
                props: {
                    placeholder: 'Any Status',
                    items: '[{ "items": [{value: "all", label: "All"}, {value: "completed", label: "Completed"}, {value: "pending", label: "Pending"}]}]',
                },
            },
        ],
        mainActions = [
            {
                component: 'Button',
                props: {
                    text: 'Export CSV',
                    buttonType: 'ButtonType.SECONDARY',
                },
            },
            {
                component: 'Button',
                props: {
                    text: 'Add Transaction',
                    buttonType: 'ButtonType.PRIMARY',
                    style: "{ marginLeft: '10px' }",
                },
            },
        ],
        dataTableIdField = 'id',
    } = options

    const columnsValue =
        typeof columns === 'string' && columns.startsWith('[')
            ? columns
            : JSON.stringify(columns)
    const dataValue =
        typeof data === 'string' && data.startsWith('[')
            ? data
            : JSON.stringify(data)

    const filterControlsString = filters
        .map((filter) => {
            const filterProps = Object.entries(filter.props || {})
                .map(([key, value]) => `${key}=${formatPropValue(value, '')}`)
                .join(' ')
            const labelProp =
                (filter.type === 'SingleSelect' ||
                    filter.type === 'TextInput') &&
                filter.label
                    ? `label="${filter.label}"`
                    : ''
            return `    <${filter.type} ${labelProp} ${filterProps} style={{ marginRight: '10px' }} />`
        })
        .join('\n')

    const mainActionsString = mainActions
        .map((action) => {
            const actionProps = Object.entries(action.props || {})
                .map(([key, value]) => `${key}=${formatPropValue(value, '')}`)
                .join(' ')
            return `  <${action.component} ${actionProps} />`
        })
        .join('\n  ')

    let code = `
<div>
  <h2 style={{ marginBottom: '20px', fontSize: '1.5rem', fontWeight: '600' }}>
    ${title}
  </h2>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
${filterControlsString}
    </div>
    <div style={{ display: 'flex', gap: '10px' }}>
${mainActionsString}
    </div>
  </div>
  <DataTable columns={${columnsValue}} data={${dataValue}} idField="${dataTableIdField}" />
</div>`

    if (includeImports) {
        const usedComponents = new Set(['DataTable'])
        filters.forEach((f) => usedComponents.add(f.type))
        mainActions.forEach((a) => usedComponents.add(a.component))
        if (Array.from(usedComponents).some((c) => c === 'Button')) {
            usedComponents.add('ButtonType')
        }
        usedComponents.add('ThemeProvider')
        const imports = `import { ${Array.from(usedComponents).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`
        code = `${imports}<ThemeProvider>\n  ${code
            .split('\n')
            .map((line) => `  ${line}`)
            .join('\n')}\n</ThemeProvider>`
    }
    return code.trim()
}

const server = new Server(
    { name: 'blend', version: '0.1.0' },
    { capabilities: { tools: {} } }
)

const childComponentSchema = {
    type: 'object',
    properties: {
        componentName: { type: 'string' },
        props: { type: 'object', additionalProperties: true },
        children: { type: ['string', 'array'], items: { type: 'object' } },
    },
    required: ['componentName', 'props'],
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'list_blend_components',
                description:
                    'Lists all available components in blend-v1 that can be used.',
                inputSchema: { type: 'object', properties: {}, required: [] },
            },
            {
                name: 'get_blend_component_props',
                description:
                    'Retrieves the props and their descriptions for a specified blend-v1 component.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description: 'The name of the blend-v1 component.',
                        },
                    },
                    required: ['componentName'],
                },
            },
            {
                name: 'generate_blend_component',
                description:
                    'Generates React code for a specified blend-v1 component with given props.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description:
                                'The name of the blend-v1 component (e.g., Button, Alert).',
                        },
                        props: {
                            type: 'object',
                            description:
                                'An object of key-value pairs for component props.',
                            additionalProperties: true,
                        },
                        children: {
                            oneOf: [
                                { type: 'string' },
                                { type: 'array', items: childComponentSchema },
                            ],
                            description:
                                'String content or an array of child component generation requests.',
                        },
                        includeImports: {
                            type: 'boolean',
                            description:
                                'Whether to include necessary import statements. Defaults to true.',
                            default: true,
                        },
                    },
                    required: ['componentName', 'props'],
                },
            },
            {
                name: 'scaffold_dashboard_section',
                description:
                    'Generates React code for common FinTech dashboard section patterns using blend-v1 components.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sectionType: {
                            type: 'string',
                            description:
                                'The type of dashboard section pattern to generate.',
                            enum: [
                                'fintech_kpi_summary_with_chart',
                                'transaction_list_with_controls',
                                'interactive_modal',
                            ],
                        },
                        options: {
                            type: 'object',
                            description:
                                'Configuration options specific to the chosen sectionType.',
                        },
                        includeImports: {
                            type: 'boolean',
                            description:
                                'Whether to include necessary import statements. Defaults to true.',
                            default: true,
                        },
                    },
                    required: ['sectionType', 'options'],
                },
            },
            {
                name: 'generate_component_documentation',
                description:
                    'Generates documentation for a specified blend-v1 component.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description:
                                'The name of the blend-v1 component (e.g., Button, Alert).',
                        },
                    },
                    required: ['componentName'],
                },
            },
        ],
    }
})

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case 'list_blend_components': {
            try {
                let componentNames = []

                // Try library path first using TypeScript parser
                if (BLEND_LIBRARY_PATH) {
                    try {
                        componentNames =
                            getAvailableComponents(BLEND_LIBRARY_PATH)
                        // Filter out Text component as requested
                        componentNames = componentNames.filter(
                            (name) => name !== 'Text'
                        )
                    } catch (libraryError) {
                        console.warn(
                            `Failed to read library path: ${libraryError.message}`
                        )
                        // Continue to fallback
                    }
                }

                // Fallback to embedded metadata if library path failed or is empty
                if (componentNames.length === 0) {
                    const metaDir = path.join(__dirname, 'meta')
                    if (fs.existsSync(metaDir)) {
                        const metaFiles = fs.readdirSync(metaDir)
                        componentNames = metaFiles
                            .filter((file) => file.endsWith('.context.js'))
                            .map((file) => {
                                const baseName = file.replace('.context.js', '')
                                return (
                                    baseName.charAt(0).toUpperCase() +
                                    baseName.slice(1)
                                )
                            })
                    }
                }

                return {
                    content: [
                        { type: 'text', text: JSON.stringify(componentNames) },
                    ],
                }
            } catch (error) {
                throw new McpError(
                    ErrorCode.InternalError,
                    `Error listing components: ${error.message}`
                )
            }
        }
        case 'get_blend_component_props': {
            const componentName = request.params.arguments?.componentName
            if (!componentName)
                throw new McpError(
                    ErrorCode.InvalidParams,
                    'Missing componentName argument.'
                )

            // Try TypeScript parser first if library path is available
            if (BLEND_LIBRARY_PATH) {
                try {
                    const componentData = await parseComponentFromSource(
                        componentName,
                        BLEND_LIBRARY_PATH
                    )

                    const propsData = {
                        componentDescription:
                            componentData.componentDescription,
                        requiresThemeProvider:
                            componentData.requiresThemeProvider,
                        enums: componentData.enums,
                        nestedTypes: componentData.nestedTypes,
                        props: componentData.props.map((prop) => ({
                            name: prop.propName,
                            type: prop.propType,
                            required: prop.required,
                            description: prop.propDescription,
                            category: prop.category,
                            defaultValue: prop.propDefault,
                        })),
                        usageExamples: componentData.usageExamples,
                    }

                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(propsData, null, 2),
                            },
                        ],
                    }
                } catch (tsError) {
                    console.warn(
                        `TypeScript parsing failed for ${componentName}: ${tsError.message}`
                    )
                    // Fall back to meta-based approach
                }
            }

            // Fallback to meta-based approach
            if (hasComponentMeta(componentName)) {
                try {
                    const propsData =
                        await getBlendComponentPropsFromMeta(componentName)
                    return {
                        content: [
                            { type: 'text', text: JSON.stringify(propsData) },
                        ],
                    }
                } catch (error) {
                    console.warn(
                        `Meta-based props retrieval failed for ${componentName}, no fallback available: ${error.message}`
                    )
                    throw new McpError(
                        ErrorCode.InternalError,
                        `Error getting props for ${componentName}: ${error.message}`
                    )
                }
            } else {
                throw new McpError(
                    ErrorCode.InvalidParams,
                    `No component information found for ${componentName}`
                )
            }
        }
        case 'generate_blend_component': {
            const {
                componentName,
                props: componentProps,
                children,
                includeImports = true,
                includeThemeProvider = true,
            } = request.params.arguments

            if (!componentName || typeof componentName !== 'string')
                throw new McpError(
                    ErrorCode.InvalidParams,
                    'Missing or invalid componentName argument.'
                )
            if (!componentProps || typeof componentProps !== 'object')
                throw new McpError(
                    ErrorCode.InvalidParams,
                    'Missing or invalid props argument.'
                )

            // Get component data for enhanced generation
            let componentData = null
            if (BLEND_LIBRARY_PATH) {
                try {
                    componentData = await parseComponentFromSource(
                        componentName,
                        BLEND_LIBRARY_PATH
                    )
                } catch (error) {
                    console.warn(
                        `Could not parse component data for ${componentName}: ${error.message}`
                    )
                }
            }

            // Use smart component generation
            let componentCode = generateSmartComponent(
                componentName,
                componentProps,
                children,
                componentData
            )

            // Collect all component names (including auto-generated children)
            const allComponentNames = new Set([componentName])

            function collectComponentNames(childInput) {
                if (Array.isArray(childInput)) {
                    childInput.forEach((child) => {
                        allComponentNames.add(child.componentName)
                        collectComponentNames(child.children)
                    })
                }
            }
            collectComponentNames(children)

            // Add required children for complex components
            const relationship = getComponentRelationship(componentName)
            if (relationship && relationship.requiredChildren) {
                relationship.requiredChildren.forEach((childName) => {
                    allComponentNames.add(childName)
                })
            }

            if (includeImports) {
                // Generate enhanced imports with enums
                let imports = generateImportsWithEnums(
                    Array.from(allComponentNames),
                    componentData
                )

                // Always wrap with ThemeProvider
                componentCode = `${imports}\n\n<ThemeProvider>\n  ${componentCode
                    .split('\n')
                    .map((line) => `  ${line}`)
                    .join('\n')}\n</ThemeProvider>`
            }

            return { content: [{ type: 'text', text: componentCode }] }
        }
        case 'scaffold_dashboard_section': {
            const {
                sectionType,
                options,
                includeImports = true,
            } = request.params.arguments
            if (!sectionType)
                throw new McpError(
                    ErrorCode.InvalidParams,
                    'Missing sectionType argument.'
                )
            if (options && typeof options !== 'object') {
                throw new McpError(
                    ErrorCode.InvalidParams,
                    'options parameter must be an object.'
                )
            }

            let scaffoldedCode = ''
            switch (sectionType) {
                case 'fintech_kpi_summary_with_chart':
                    scaffoldedCode = generateFintechKpiSummaryWithChart(
                        options || {},
                        includeImports
                    )
                    break
                case 'transaction_list_with_controls':
                    scaffoldedCode = generateTransactionListWithControls(
                        options || {},
                        includeImports
                    )
                    break
                default:
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        `Unknown sectionType: ${sectionType}`
                    )
            }
            return { content: [{ type: 'text', text: scaffoldedCode }] }
        }
        case 'generate_component_documentation': {
            const componentName = request.params.arguments?.componentName
            if (!componentName)
                throw new McpError(
                    ErrorCode.InvalidParams,
                    'Missing componentName argument.'
                )

            // Try meta-based approach first
            if (hasComponentMeta(componentName)) {
                try {
                    const markdownDocumentation =
                        await generateComponentDocumentationFromMeta(
                            componentName
                        )
                    return {
                        content: [
                            { type: 'text', text: markdownDocumentation },
                        ],
                    }
                } catch (error) {
                    console.warn(
                        `Meta-based documentation generation failed for ${componentName}: ${error.message}`
                    )
                    throw new McpError(
                        ErrorCode.InternalError,
                        `Error generating documentation for ${componentName}: ${error.message}`
                    )
                }
            } else {
                throw new McpError(
                    ErrorCode.InvalidParams,
                    `No meta file found for component ${componentName}`
                )
            }
        }
        default:
            throw new McpError(
                ErrorCode.MethodNotFound,
                `Unknown tool: ${request.params.name}`
            )
    }
})

async function main() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.error('Blend MCP server running on stdio')
}

main().catch((error) => {
    console.error('Server error:', error.message)
    process.exit(1)
})
