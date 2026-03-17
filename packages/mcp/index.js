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
import { validateComponentUsage } from './validators.js'

// ---------------------------------------------------------------------------
// Module-level setup
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const BLEND_LIBRARY_PACKAGE_NAME =
    process.env.BLEND_LIBRARY_PACKAGE_NAME || '@juspay/blend-design-system'

// Read own package.json for version info
let SERVER_VERSION = '2.0.0'
let SDK_VERSION = 'unknown'
try {
    const ownPkg = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
    )
    SERVER_VERSION = ownPkg.version || SERVER_VERSION
} catch (_) {}
try {
    const sdkPkg = JSON.parse(
        fs.readFileSync(
            path.join(
                __dirname,
                'node_modules/@modelcontextprotocol/sdk/package.json'
            ),
            'utf-8'
        )
    )
    SDK_VERSION = sdkPkg.version || SDK_VERSION
} catch (_) {}

// Load manifest.json at startup
let manifest = { components: {}, tokens: {} }
const manifestPath = path.join(__dirname, 'manifest.json')
try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'))
} catch (err) {
    console.error(
        `[WARN] Could not load manifest.json at ${manifestPath}: ${err.message}`
    )
    console.error(
        '[WARN] Continuing with empty manifest — component data will be unavailable.'
    )
}

console.error(`[INFO] Blend MCP Server v${SERVER_VERSION}`)
console.error(
    `[INFO] Manifest: ${manifest.generatedAt || 'unknown'} | Components: ${Object.keys(manifest.components || {}).length}`
)
console.error(`[INFO] Package: ${BLEND_LIBRARY_PACKAGE_NAME}`)

// ---------------------------------------------------------------------------
// Case-insensitive component lookup helper
// ---------------------------------------------------------------------------

function findComponent(manifest, name) {
    if (!name || !manifest.components) return null
    // Exact match first
    if (manifest.components[name]) return manifest.components[name]
    // Case-insensitive match
    const lower = name.toLowerCase()
    const key = Object.keys(manifest.components).find(
        (k) => k.toLowerCase() === lower
    )
    return key ? manifest.components[key] : null
}

function findComponentKey(manifest, name) {
    if (!name || !manifest.components) return null
    if (manifest.components[name]) return name
    const lower = name.toLowerCase()
    return (
        Object.keys(manifest.components).find(
            (k) => k.toLowerCase() === lower
        ) || null
    )
}

// ---------------------------------------------------------------------------
// JSX generation helpers (preserved from original index.js)
// ---------------------------------------------------------------------------

function formatPropValue(value, propTypeString) {
    const normalizedPropType = propTypeString
        ?.toLowerCase()
        .replace(/\s*\|\s*undefined$/, '')
        .trim()

    if (typeof value === 'string') {
        if (value.startsWith('{') && value.endsWith('}')) {
            return value
        }
        if (
            normalizedPropType === 'string' ||
            (normalizedPropType && normalizedPropType.includes("'"))
        ) {
            return `"${value.replace(/"/g, '\\"')}"`
        }
        return `{${value}}`
    }

    if (typeof value === 'boolean') return `{${value}}`
    if (typeof value === 'number') return `{${value}}`
    if (typeof value === 'object') return `{${JSON.stringify(value)}}`

    return `{${String(value)}}`
}

function _generateSingleComponentJSX(
    componentName,
    componentProps,
    childrenInput
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

    // Build a propType map from the manifest so formatPropValue can quote strings correctly
    const comp = findComponent(manifest, componentName)
    const propTypeMap = {}
    if (comp?.props) {
        comp.props.forEach((p) => {
            propTypeMap[p.propName] = p.propType
        })
    }

    let propsString = ''
    for (const [key, value] of Object.entries(componentProps)) {
        if (typeof value === 'boolean' && value === true) {
            propsString += ` ${key}`
        } else {
            propsString += ` ${key}=${formatPropValue(value, propTypeMap[key] || '')}`
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
                        childReq.children
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

function groupPropsByCategory(props) {
    const grouped = {}
    props.forEach((prop) => {
        const category = prop.category || prop.propCategory || 'General'
        if (!grouped[category]) {
            grouped[category] = []
        }
        grouped[category].push(prop)
    })
    return grouped
}

// ---------------------------------------------------------------------------
// Scaffold generators (preserved from original index.js)
// ---------------------------------------------------------------------------

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
  <Text variant="heading.lg" style={{ marginBottom: '20px' }}>
    ${title}
  </Text>
  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '30px' }}>
${kpiCardsString}
  </div>
  <div style={{ marginTop: '20px' }}>
${chartString}
  </div>
</div>`

    if (includeImports) {
        const imports = `import { Text, StatCard, Charts, StatCardVariant, ChangeType, ChartType } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`
        code = imports + code
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
  <Text variant="heading.lg" style={{ marginBottom: '20px' }}>
    ${title}
  </Text>
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
        const usedComponents = new Set(['Text', 'DataTable'])
        filters.forEach((f) => usedComponents.add(f.type))
        mainActions.forEach((a) => usedComponents.add(a.component))
        if (Array.from(usedComponents).some((c) => c === 'Button')) {
            usedComponents.add('ButtonType')
        }
        const imports = `import { ${Array.from(usedComponents).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`
        code = imports + code
    }
    return code.trim()
}

// ---------------------------------------------------------------------------
// New scaffold generators
// ---------------------------------------------------------------------------

function generateInteractiveModalWithForm(options, includeImports) {
    const {
        title = 'Modal Title',
        subtitle = '',
        fields = [
            {
                label: 'Name',
                type: 'text',
                name: 'name',
                required: true,
                placeholder: 'Enter name',
            },
        ],
        primaryButtonText = 'Submit',
        secondaryButtonText = 'Cancel',
    } = options || {}

    const usedComponents = new Set(['Modal', 'Button', 'ButtonType'])

    const fieldsString = fields
        .map((field) => {
            const placeholder = field.placeholder
                ? `placeholder="${field.placeholder}"`
                : ''
            const label = field.label ? `label="${field.label}"` : ''
            const required = field.required ? `required` : ''

            if (field.type === 'select') {
                usedComponents.add('SingleSelect')
                return `        <SingleSelect
          ${label}
          ${required}
          ${placeholder}
          name="${field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'field'}"
        />`
            } else if (field.type === 'checkbox') {
                usedComponents.add('Checkbox')
                return `        <Checkbox
          label="${field.label || ''}"
          ${required}
          name="${field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'field'}"
        />`
            } else {
                usedComponents.add('TextInput')
                return `        <TextInput
          ${label}
          ${required}
          ${placeholder}
          name="${field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'field'}"
        />`
            }
        })
        .join('\n')

    let code = `
<Modal
  headerSlot={
    <div>
      <div style={{ fontWeight: 600, fontSize: '18px' }}>${title}</div>
      ${subtitle ? `<div style={{ color: '#666', marginTop: '4px' }}>${subtitle}</div>` : ''}
    </div>
  }
  footerSlot={
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
      <Button
        text="${secondaryButtonText}"
        buttonType={ButtonType.SECONDARY}
        onClick={() => {}}
      />
      <Button
        text="${primaryButtonText}"
        buttonType={ButtonType.PRIMARY}
        onClick={() => {}}
      />
    </div>
  }
>
  <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
${fieldsString}
  </form>
</Modal>`

    if (includeImports) {
        const imports = `import { ${Array.from(usedComponents).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`
        code = imports + code
    }
    return code.trim()
}

function generateSettingsForm(options, includeImports) {
    const {
        title = 'Settings',
        sections = [
            {
                title: 'General',
                fields: [
                    {
                        label: 'Display Name',
                        type: 'text',
                        name: 'displayName',
                        description: 'Your public name',
                        required: false,
                    },
                ],
            },
        ],
    } = options || {}

    const usedComponents = new Set(['Card', 'Button', 'ButtonType', 'Text'])

    const sectionsString = sections
        .map((section) => {
            const fieldsString = (section.fields || [])
                .map((field) => {
                    const placeholder = field.placeholder
                        ? `placeholder="${field.placeholder}"`
                        : ''
                    const label = field.label ? `label="${field.label}"` : ''
                    const required = field.required ? `required` : ''
                    const description = field.description
                        ? `\n        <span style={{ fontSize: '12px', color: '#888' }}>${field.description}</span>`
                        : ''

                    let fieldJsx = ''
                    if (field.type === 'select') {
                        usedComponents.add('SingleSelect')
                        fieldJsx = `        <SingleSelect
          ${label}
          ${required}
          ${placeholder}
          name="${field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'field'}"
        />`
                    } else if (field.type === 'checkbox') {
                        usedComponents.add('Checkbox')
                        fieldJsx = `        <Checkbox
          label="${field.label || ''}"
          ${required}
          name="${field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'field'}"
        />`
                    } else if (field.type === 'toggle') {
                        usedComponents.add('Toggle')
                        fieldJsx = `        <Toggle
          label="${field.label || ''}"
          name="${field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'field'}"
        />`
                    } else {
                        usedComponents.add('TextInput')
                        fieldJsx = `        <TextInput
          ${label}
          ${required}
          ${placeholder}
          name="${field.name || field.label?.toLowerCase().replace(/\s+/g, '_') || 'field'}"
        />`
                    }

                    return `      <div style={{ marginBottom: '16px' }}>
${fieldJsx}${description}
      </div>`
                })
                .join('\n')

            return `    <div style={{ marginBottom: '24px' }}>
      <Text variant="heading.sm" style={{ marginBottom: '16px' }}>
        ${section.title}
      </Text>
${fieldsString}
    </div>`
        })
        .join('\n')

    let code = `
<Card>
  <div style={{ padding: '24px' }}>
    <Text variant="heading.lg" style={{ marginBottom: '24px' }}>
      ${title}
    </Text>
    <form>
${sectionsString}
      <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          text="Save Changes"
          buttonType={ButtonType.PRIMARY}
          onClick={() => {}}
        />
      </div>
    </form>
  </div>
</Card>`

    if (includeImports) {
        const imports = `import { ${Array.from(usedComponents).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`
        code = imports + code
    }
    return code.trim()
}

function generateDataTableWithFilters(options, includeImports) {
    const {
        title = 'Data',
        columns = '[{ "header": "ID", "field": "id" }, { "header": "Name", "field": "name" }]',
        data = '[]',
        filters = [
            {
                type: 'TextInput',
                label: 'Search',
                props: { placeholder: 'Search...' },
            },
        ],
        actions = [
            {
                component: 'Button',
                props: { text: 'Add New', buttonType: 'ButtonType.PRIMARY' },
            },
        ],
        idField = 'id',
    } = options || {}

    const usedComponents = new Set([
        'Text',
        'DataTable',
        'Button',
        'ButtonType',
    ])

    const columnsValue =
        typeof columns === 'string' && columns.startsWith('[')
            ? columns
            : JSON.stringify(columns)
    const dataValue =
        typeof data === 'string' && data.startsWith('[')
            ? data
            : JSON.stringify(data)

    const filtersString = (filters || [])
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

            if (filter.type === 'SingleSelect')
                usedComponents.add('SingleSelect')
            if (filter.type === 'TextInput') usedComponents.add('TextInput')

            return `      <${filter.type} ${labelProp} ${filterProps} />`
        })
        .join('\n')

    const actionsString = (actions || [])
        .map((action) => {
            const actionProps = Object.entries(action.props || {})
                .map(([key, value]) => `${key}=${formatPropValue(value, '')}`)
                .join(' ')
            usedComponents.add(action.component)
            return `      <${action.component} ${actionProps} />`
        })
        .join('\n')

    let code = `
<div>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
    <Text variant="heading.lg">${title}</Text>
    <div style={{ display: 'flex', gap: '10px' }}>
${actionsString}
    </div>
  </div>
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
${filtersString}
  </div>
  <DataTable
    columns={${columnsValue}}
    data={${dataValue}}
    idField="${idField}"
  />
</div>`

    if (includeImports) {
        const imports = `import { ${Array.from(usedComponents).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`
        code = imports + code
    }
    return code.trim()
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new Server(
    { name: 'blend-design-system', version: '2.0.0' },
    { capabilities: { tools: {} } }
)

// ---------------------------------------------------------------------------
// Tool registration
// ---------------------------------------------------------------------------

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
                    'Lists all available Blend design system components. Optionally filter by category (action, input, data-display, feedback, navigation, overlay).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        category: {
                            type: 'string',
                            description: 'Optional category filter.',
                            enum: [
                                'action',
                                'input',
                                'data-display',
                                'feedback',
                                'navigation',
                                'overlay',
                            ],
                        },
                    },
                    required: [],
                },
            },
            {
                name: 'search_components',
                description:
                    "Search for Blend components by keyword, use-case, or feature description. Use this when you don't know the exact component name.",
                inputSchema: {
                    type: 'object',
                    properties: {
                        query: {
                            type: 'string',
                            description:
                                'Search query — keywords, use-case, or feature description.',
                        },
                    },
                    required: ['query'],
                },
            },
            {
                name: 'get_blend_component_props',
                description:
                    'Get full prop documentation for a specific Blend component including types, defaults, required flags, and usage guidance.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description:
                                'The name of the Blend component (e.g., Button, Modal).',
                        },
                    },
                    required: ['componentName'],
                },
            },
            {
                name: 'get_component_variants',
                description:
                    'Get all enum variants and their valid values for a Blend component. Use this before generating code to know valid enum values.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description: 'The name of the Blend component.',
                        },
                    },
                    required: ['componentName'],
                },
            },
            {
                name: 'get_component_composition',
                description:
                    'Get composition patterns for compound components that require sub-components (e.g., Accordion+AccordionItem, RadioGroup+Radio).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description: 'The name of the Blend component.',
                        },
                    },
                    required: ['componentName'],
                },
            },
            {
                name: 'generate_blend_component',
                description:
                    'Generate React JSX code for a Blend component with specified props. Includes correct import statements with enum types.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description:
                                'The name of the Blend component (e.g., Button, Alert).',
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
                                'Whether to include import statements. Defaults to true.',
                            default: true,
                        },
                    },
                    required: ['componentName', 'props'],
                },
            },
            {
                name: 'scaffold_blend_section',
                description:
                    'Generate complete React section patterns using multiple Blend components (KPI dashboards, data tables, forms, modals).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        sectionType: {
                            type: 'string',
                            description:
                                'The type of section pattern to generate.',
                            enum: [
                                'fintech_kpi_summary_with_chart',
                                'transaction_list_with_controls',
                                'interactive_modal_with_form',
                                'settings_form',
                                'data_table_with_filters',
                            ],
                        },
                        options: {
                            type: 'object',
                            description:
                                'Configuration options for the chosen section type.',
                            additionalProperties: true,
                        },
                        includeImports: {
                            type: 'boolean',
                            description:
                                'Whether to include import statements. Defaults to true.',
                            default: true,
                        },
                    },
                    required: ['sectionType', 'options'],
                },
            },
            {
                name: 'validate_component_usage',
                description:
                    'Validate component props before generating code. Returns errors for unknown props, invalid enum values, and missing required props.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description:
                                'The name of the Blend component to validate against.',
                        },
                        props: {
                            type: 'object',
                            description: 'The props object to validate.',
                            additionalProperties: true,
                        },
                    },
                    required: ['componentName', 'props'],
                },
            },
            {
                name: 'get_theme_tokens',
                description:
                    'Get Blend design token values for customizing ThemeProvider. Categories: colors, spacing, borders, shadows, typography.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        category: {
                            type: 'string',
                            description:
                                'Token category to retrieve. Omit for an overview of all categories.',
                            enum: [
                                'colors',
                                'spacing',
                                'borders',
                                'shadows',
                                'typography',
                            ],
                        },
                    },
                    required: [],
                },
            },
            {
                name: 'generate_component_documentation',
                description:
                    'Generate comprehensive Markdown documentation for a Blend component including props table, enum values, and usage examples.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        componentName: {
                            type: 'string',
                            description:
                                'The name of the Blend component (e.g., Button, Alert).',
                        },
                    },
                    required: ['componentName'],
                },
            },
            {
                name: 'get_server_info',
                description:
                    'Get MCP server status, manifest metadata, and component inventory.',
                inputSchema: {
                    type: 'object',
                    properties: {},
                    required: [],
                },
            },
        ],
    }
})

// ---------------------------------------------------------------------------
// Tool handlers
// ---------------------------------------------------------------------------

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const toolName = request.params.name

    try {
        switch (toolName) {
            // ----------------------------------------------------------------
            // Tool 1: list_blend_components
            // ----------------------------------------------------------------
            case 'list_blend_components': {
                const { category } = request.params.arguments || {}
                let components = Object.values(manifest.components || {})

                if (category) {
                    components = components.filter(
                        (c) => c.category === category
                    )
                }

                components.sort((a, b) =>
                    (a.componentName || '').localeCompare(b.componentName || '')
                )

                const result = {
                    components: components.map((c) => ({
                        name: c.componentName,
                        category: c.category,
                        description: c.componentDescription,
                        isCompound: c.isCompound,
                        subComponents: c.subComponents,
                    })),
                    count: components.length,
                }

                return {
                    content: [
                        { type: 'text', text: JSON.stringify(result, null, 2) },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Tool 2: search_components
            // ----------------------------------------------------------------
            case 'search_components': {
                const { query } = request.params.arguments || {}
                if (!query) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing query argument.'
                    )
                }

                const queryWords = query
                    .toLowerCase()
                    .split(/\s+/)
                    .filter(Boolean)
                const scored = []

                for (const component of Object.values(
                    manifest.components || {}
                )) {
                    const nameLower = (
                        component.componentName || ''
                    ).toLowerCase()
                    const descLower = (
                        component.componentDescription || ''
                    ).toLowerCase()
                    const features = component.features || []
                    const catLower = (component.category || '').toLowerCase()

                    let score = 0
                    const reasons = []

                    for (const word of queryWords) {
                        if (nameLower.includes(word)) {
                            score += 10
                            reasons.push(`name matches '${word}'`)
                        }
                        if (descLower.includes(word)) {
                            score += 5
                            reasons.push(`description mentions '${word}'`)
                        }
                        for (const feature of features) {
                            if (
                                typeof feature === 'string' &&
                                feature.toLowerCase().includes(word)
                            ) {
                                score += 3
                                reasons.push(`feature mentions '${word}'`)
                                break
                            }
                        }
                        if (catLower.includes(word)) {
                            score += 2
                            reasons.push(`category matches '${word}'`)
                        }
                    }

                    if (score > 0) {
                        scored.push({
                            name: component.componentName,
                            category: component.category,
                            description: component.componentDescription,
                            relevanceReason: [...new Set(reasons)].join('; '),
                            score,
                        })
                    }
                }

                scored.sort((a, b) => b.score - a.score)

                const matches = scored.map(({ score: _score, ...rest }) => rest)

                const result =
                    matches.length > 0
                        ? { matches, query }
                        : {
                              matches: [],
                              query,
                              suggestion:
                                  "No components matched your query. Use 'list_blend_components' to browse all available components.",
                          }

                return {
                    content: [
                        { type: 'text', text: JSON.stringify(result, null, 2) },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Tool 3: get_blend_component_props
            // ----------------------------------------------------------------
            case 'get_blend_component_props': {
                const { componentName } = request.params.arguments || {}
                if (!componentName) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing componentName argument.'
                    )
                }

                const component = findComponent(manifest, componentName)
                if (!component) {
                    const available = Object.keys(manifest.components || {})
                        .slice(0, 10)
                        .join(', ')
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        `Component '${componentName}' not found. Available components: ${available}. Use list_blend_components to see all.`
                    )
                }

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(component, null, 2),
                        },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Tool 4: get_component_variants
            // ----------------------------------------------------------------
            case 'get_component_variants': {
                const { componentName } = request.params.arguments || {}
                if (!componentName) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing componentName argument.'
                    )
                }

                const component = findComponent(manifest, componentName)
                if (!component) {
                    const available = Object.keys(manifest.components || {})
                        .slice(0, 10)
                        .join(', ')
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        `Component '${componentName}' not found. Available components: ${available}. Use list_blend_components to see all.`
                    )
                }

                const enums = component.enums || {}
                const hasEnums = Object.keys(enums).length > 0

                const result = hasEnums
                    ? { componentName: component.componentName, enums }
                    : {
                          componentName: component.componentName,
                          enums: {},
                          message:
                              'This component has no enum variants. All props accept plain values.',
                      }

                return {
                    content: [
                        { type: 'text', text: JSON.stringify(result, null, 2) },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Tool 5: get_component_composition
            // ----------------------------------------------------------------
            case 'get_component_composition': {
                const { componentName } = request.params.arguments || {}
                if (!componentName) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing componentName argument.'
                    )
                }

                const component = findComponent(manifest, componentName)
                if (!component) {
                    const available = Object.keys(manifest.components || {})
                        .slice(0, 10)
                        .join(', ')
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        `Component '${componentName}' not found. Available components: ${available}. Use list_blend_components to see all.`
                    )
                }

                if (!component.isCompound) {
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(
                                    {
                                        componentName: component.componentName,
                                        isCompound: false,
                                        message:
                                            'This is a standalone component, no sub-components needed.',
                                    },
                                    null,
                                    2
                                ),
                            },
                        ],
                    }
                }

                // Build sub-component props map
                const subComponentProps = {}
                for (const subName of component.subComponents || []) {
                    const subComponent = findComponent(manifest, subName)
                    if (subComponent && Array.isArray(subComponent.props)) {
                        subComponentProps[subName] = subComponent.props
                    }
                }

                const result = {
                    componentName: component.componentName,
                    isCompound: true,
                    subComponents: component.subComponents,
                    compositionPattern: component.compositionPattern,
                    subComponentProps,
                }

                return {
                    content: [
                        { type: 'text', text: JSON.stringify(result, null, 2) },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Tool 6: generate_blend_component
            // ----------------------------------------------------------------
            case 'generate_blend_component': {
                const {
                    componentName,
                    props: componentProps,
                    children,
                    includeImports = true,
                } = request.params.arguments || {}

                if (!componentName || typeof componentName !== 'string') {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing or invalid componentName argument.'
                    )
                }
                if (!componentProps || typeof componentProps !== 'object') {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing or invalid props argument.'
                    )
                }

                let componentCode = _generateSingleComponentJSX(
                    componentName,
                    componentProps,
                    children
                )

                if (includeImports) {
                    const allComponentNames = new Set([componentName])
                    const allEnumNames = new Set()

                    // Collect component names from children recursively
                    function collectComponentNames(childInput) {
                        if (Array.isArray(childInput)) {
                            childInput.forEach((child) => {
                                allComponentNames.add(child.componentName)
                                collectComponentNames(child.children)
                            })
                        }
                    }
                    collectComponentNames(children)

                    // For each component, look up its enum imports from manifest
                    function collectEnumsForComponent(cName, cProps) {
                        const comp = findComponent(manifest, cName)
                        const compImports = comp?.imports

                        // Add enum names from the imports definition
                        if (compImports?.enums) {
                            compImports.enums.forEach((e) =>
                                allEnumNames.add(e)
                            )
                        }

                        // Also detect enum usage in props (values like ButtonType.PRIMARY)
                        if (cProps && typeof cProps === 'object') {
                            for (const value of Object.values(cProps)) {
                                if (
                                    typeof value === 'string' &&
                                    value.includes('.')
                                ) {
                                    const enumName = value.split('.')[0]
                                    allEnumNames.add(enumName)
                                }
                            }
                        }
                    }

                    collectEnumsForComponent(componentName, componentProps)

                    // Also collect enums from child components
                    function collectEnumsFromChildren(childInput) {
                        if (Array.isArray(childInput)) {
                            childInput.forEach((child) => {
                                collectEnumsForComponent(
                                    child.componentName,
                                    child.props
                                )
                                collectEnumsFromChildren(child.children)
                            })
                        }
                    }
                    collectEnumsFromChildren(children)

                    // Check if manifest has the component; if not, add a warning comment
                    const inManifest = findComponent(manifest, componentName)
                    const warningComment = inManifest
                        ? ''
                        : `// Note: ${componentName} not found in manifest, imports may be incomplete\n`

                    const allImports = [
                        ...Array.from(allComponentNames).sort(),
                        ...Array.from(allEnumNames).sort(),
                    ]

                    componentCode = `${warningComment}import { ${allImports.join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n${componentCode}`
                }

                return { content: [{ type: 'text', text: componentCode }] }
            }

            // ----------------------------------------------------------------
            // Tool 7: scaffold_blend_section
            // ----------------------------------------------------------------
            case 'scaffold_blend_section': {
                const {
                    sectionType,
                    options,
                    includeImports = true,
                } = request.params.arguments || {}

                if (!sectionType) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing sectionType argument.'
                    )
                }
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
                    case 'interactive_modal_with_form':
                        scaffoldedCode = generateInteractiveModalWithForm(
                            options || {},
                            includeImports
                        )
                        break
                    case 'settings_form':
                        scaffoldedCode = generateSettingsForm(
                            options || {},
                            includeImports
                        )
                        break
                    case 'data_table_with_filters':
                        scaffoldedCode = generateDataTableWithFilters(
                            options || {},
                            includeImports
                        )
                        break
                    default:
                        throw new McpError(
                            ErrorCode.InvalidParams,
                            `Unknown sectionType: '${sectionType}'. Valid types: fintech_kpi_summary_with_chart, transaction_list_with_controls, interactive_modal_with_form, settings_form, data_table_with_filters`
                        )
                }

                return { content: [{ type: 'text', text: scaffoldedCode }] }
            }

            // ----------------------------------------------------------------
            // Tool 8: validate_component_usage
            // ----------------------------------------------------------------
            case 'validate_component_usage': {
                const { componentName, props } = request.params.arguments || {}

                if (!componentName) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing componentName argument.'
                    )
                }
                if (!props || typeof props !== 'object') {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing or invalid props argument. Must be an object.'
                    )
                }

                const result = validateComponentUsage(
                    manifest,
                    componentName,
                    props
                )
                return {
                    content: [
                        { type: 'text', text: JSON.stringify(result, null, 2) },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Tool 9: get_theme_tokens
            // ----------------------------------------------------------------
            case 'get_theme_tokens': {
                const { category } = request.params.arguments || {}
                const tokens = manifest.tokens || {}

                if (category) {
                    const categoryTokens = tokens[category]
                    if (categoryTokens === undefined) {
                        const available = Object.keys(tokens).join(', ')
                        throw new McpError(
                            ErrorCode.InvalidParams,
                            `Token category '${category}' not found. Available categories: ${available}`
                        )
                    }
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify(
                                    { category, tokens: categoryTokens },
                                    null,
                                    2
                                ),
                            },
                        ],
                    }
                }

                // Return overview — just keys of each category
                const overview = {
                    available_categories: Object.keys(tokens),
                    hint: 'Provide a category to get full token values',
                    summary: Object.fromEntries(
                        Object.entries(tokens).map(([cat, vals]) => [
                            cat,
                            typeof vals === 'object' && vals !== null
                                ? `${Object.keys(vals).length} tokens`
                                : typeof vals,
                        ])
                    ),
                }

                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify(overview, null, 2),
                        },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Tool 10: generate_component_documentation
            // ----------------------------------------------------------------
            case 'generate_component_documentation': {
                const { componentName } = request.params.arguments || {}
                if (!componentName) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Missing componentName argument.'
                    )
                }

                const component = findComponent(manifest, componentName)
                if (!component) {
                    const available = Object.keys(manifest.components || {})
                        .slice(0, 10)
                        .join(', ')
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        `Component '${componentName}' not found. Available components: ${available}. Use list_blend_components to see all.`
                    )
                }

                let md = `# ${component.componentName}\n\n`

                // Description
                md += `## Description\n\n${component.componentDescription || 'No description available.'}\n\n`

                // Features
                if (component.features && component.features.length > 0) {
                    md += `## Features\n\n`
                    component.features.forEach((feature) => {
                        md += `- ${feature}\n`
                    })
                    md += '\n'
                }

                // Composition (if compound)
                if (component.isCompound) {
                    md += `## Composition\n\n`
                    md += `This is a compound component. It requires the following sub-components:\n\n`
                    ;(component.subComponents || []).forEach((sub) => {
                        md += `- \`${sub}\`\n`
                    })
                    if (component.compositionPattern) {
                        md += `\n**Pattern:**\n\`\`\`tsx\n${component.compositionPattern}\n\`\`\`\n`
                    }
                    md += '\n'
                }

                // Props grouped by category
                if (
                    Array.isArray(component.props) &&
                    component.props.length > 0
                ) {
                    md += `## Props\n\n`
                    const grouped = groupPropsByCategory(component.props)

                    Object.entries(grouped).forEach(([category, props]) => {
                        md += `### ${category}\n\n`
                        md += `| Prop | Type | Required | Default | Description |\n`
                        md += `|------|------|----------|---------|-------------|\n`
                        props.forEach((prop) => {
                            const propName = prop.propName || prop.name || ''
                            const propType = (
                                prop.propType ||
                                prop.type ||
                                ''
                            ).replace(/\|/g, '\\|')
                            const required = prop.required ? 'Yes' : 'No'
                            const defaultVal =
                                prop.propDefault ?? prop.defaultValue ?? '—'
                            const desc =
                                prop.propDescription || prop.description || ''
                            md += `| \`${propName}\` | \`${propType}\` | ${required} | \`${defaultVal}\` | ${desc} |\n`
                        })
                        md += '\n'
                    })
                }

                // Enum Values
                const enums = component.enums || {}
                if (Object.keys(enums).length > 0) {
                    md += `## Enum Values\n\n`
                    Object.entries(enums).forEach(([enumName, members]) => {
                        md += `### ${enumName}\n\n`
                        md += `| Value | Description |\n`
                        md += `|-------|-------------|\n`
                        Object.entries(members).forEach(
                            ([memberKey, memberVal]) => {
                                const desc =
                                    typeof memberVal === 'object'
                                        ? memberVal.description || ''
                                        : ''
                                md += `| \`${enumName}.${memberKey}\` | ${desc} |\n`
                            }
                        )
                        md += '\n'
                    })
                }

                // Usage Examples
                if (
                    component.usageExamples &&
                    component.usageExamples.length > 0
                ) {
                    md += `## Usage Examples\n\n`
                    component.usageExamples.forEach((example) => {
                        md += `### ${example.title || 'Example'}\n\n`
                        if (example.description) {
                            md += `${example.description}\n\n`
                        }
                        md += '```tsx\n'
                        md += `${example.code}\n`
                        md += '```\n\n'
                    })
                }

                return { content: [{ type: 'text', text: md.trim() }] }
            }

            // ----------------------------------------------------------------
            // Tool 11: get_server_info
            // ----------------------------------------------------------------
            case 'get_server_info': {
                const components = Object.values(manifest.components || {})
                const categoryCounts = {}
                for (const comp of components) {
                    const cat = comp.category || 'uncategorized'
                    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1
                }

                const result = {
                    serverVersion: SERVER_VERSION,
                    sdkVersion: SDK_VERSION,
                    mcpPackage: 'blend-ui-mcp',
                    blendPackage: BLEND_LIBRARY_PACKAGE_NAME,
                    blendPackageVersion: manifest.blendPackageVersion || null,
                    manifestGeneratedAt: manifest.generatedAt || null,
                    componentCount: components.length,
                    toolCount: 11,
                    categories: categoryCounts,
                }

                return {
                    content: [
                        { type: 'text', text: JSON.stringify(result, null, 2) },
                    ],
                }
            }

            // ----------------------------------------------------------------
            // Unknown tool
            // ----------------------------------------------------------------
            default:
                throw new McpError(
                    ErrorCode.MethodNotFound,
                    `Unknown tool: ${toolName}`
                )
        }
    } catch (error) {
        if (error instanceof McpError) throw error

        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        error: error.message,
                        tool: toolName,
                    }),
                },
            ],
            isError: true,
        }
    }
})

// ---------------------------------------------------------------------------
// Server startup
// ---------------------------------------------------------------------------

async function main() {
    const transport = new StdioServerTransport()
    await server.connect(transport)
    console.error('Blend MCP server v2.0.0 running on stdio')
}

main().catch((error) => {
    console.error('Server error:', error.message)
    process.exit(1)
})
