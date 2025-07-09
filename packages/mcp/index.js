#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { getComponentMeta, listAvailableComponents, hasComponentMeta } from "./metaReader.js";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to find the blend library path
function findBlendLibraryPath() {
  // First check if explicitly set via environment variable
  if (process.env.BLEND_LIBRARY_PATH) {
    return process.env.BLEND_LIBRARY_PATH;
  }
  
  // Try to find it relative to the MCP package
  const possiblePaths = [
    path.join(__dirname, '..', 'blend', 'lib', 'components'),
    path.join(__dirname, '..', '..', 'packages', 'blend', 'lib', 'components'),
    path.join(process.cwd(), 'packages', 'blend', 'lib', 'components'),
    path.join(process.cwd(), 'node_modules', 'blend-v1', 'lib', 'components'),
  ];
  
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }
  
  // If not found, return a descriptive error path
  return null;
}

const BLEND_LIBRARY_PATH = findBlendLibraryPath();
const BLEND_LIBRARY_PACKAGE_NAME = process.env.BLEND_LIBRARY_PACKAGE_NAME || "blend-v1";

if (!BLEND_LIBRARY_PATH) {
  console.error(`[ERROR] Could not find Blend library components directory.`);
  console.error(`Please set the BLEND_LIBRARY_PATH environment variable to the path containing Blend components.`);
  console.error(`Example: export BLEND_LIBRARY_PATH="/path/to/blend/lib/components"`);
  process.exit(1);
}

console.error(`[INFO] Using Blend library path: ${BLEND_LIBRARY_PATH}`);
console.error(`[INFO] Using Blend package name: ${BLEND_LIBRARY_PACKAGE_NAME}`);

function formatPropValue(value, propTypeString) {
  const normalizedPropType = propTypeString?.toLowerCase().replace(/\s*\|\s*undefined$/, "").trim();

  if (typeof value === 'string') {
    if (value.startsWith('{') && value.endsWith('}')) {
      return value;
    }
    if (normalizedPropType === 'string' || (normalizedPropType && normalizedPropType.includes("'"))) {
      return `"${value.replace(/"/g, '\\"')}"`;
    }
    return `{${value}}`;
  }

  if (typeof value === 'boolean') return `{${value}}`; 
  if (typeof value === 'number') return `{${value}}`;
  if (typeof value === 'object') return `{${JSON.stringify(value)}}`;
  
  return `{${String(value)}}`; 
}

// New meta-based functions
async function generateComponentDocumentationFromMeta(componentName) {
  try {
    const componentMeta = await getComponentMeta(componentName);
    
    let md = `# ${componentMeta.componentName} Component Documentation\n\n`;
    
    // Description
    md += `## Description\n${componentMeta.componentDescription || "No description available."}\n\n`;
    
    // Features
    md += `## Features\n`;
    if (componentMeta.features && componentMeta.features.length > 0) {
      componentMeta.features.forEach(feature => {
        md += `- ${feature}\n`;
      });
    } else {
      md += "No features documented.\n";
    }
    md += "\n";
    
    // Props grouped by category
    md += `## Props\n\n`;
    const groupedProps = groupPropsByCategory(componentMeta.props);
    
    Object.entries(groupedProps).forEach(([category, props]) => {
      md += `### ${category}\n\n`;
      md += "| Prop Name | Type | Required | Description | Default Value |\n";
      md += "|-----------|------|----------|-------------|---------------|\n";
      
      props.forEach(prop => {
        md += `| \`${prop.propName}\` | \`${prop.propType.replace(/\|/g, '\\|')}\` | ${prop.required ? 'Yes' : 'No'} | ${prop.propDescription} | \`${prop.propDefault}\` |\n`;
      });
      md += "\n";
    });
    
    // Usage Examples
    md += `## Usage Examples\n\n`;
    if (componentMeta.usageExamples && componentMeta.usageExamples.length > 0) {
      componentMeta.usageExamples.forEach(example => {
        md += `### ${example.title}\n`;
        if (example.description) {
          md += `${example.description}\n\n`;
        }
        md += "```tsx\n";
        md += `${example.code}\n`;
        md += "```\n\n";
      });
    } else {
      md += "No specific usage examples provided.\n\n";
    }
    
    return md.trim();
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Error generating documentation from meta: ${error.message}`);
  }
}

function groupPropsByCategory(props) {
  const grouped = {};
  props.forEach(prop => {
    const category = prop.category || "General";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(prop);
  });
  return grouped;
}

async function getBlendComponentPropsFromMeta(componentName) {
  try {
    const componentMeta = await getComponentMeta(componentName);
    
    const propsData = {
      componentDescription: componentMeta.componentDescription || "",
      props: componentMeta.props.map(prop => ({
        name: prop.propName,
        type: prop.propType,
        required: prop.required || false,
        description: prop.llmContext || prop.propDescription,
        category: prop.category || "General",
        defaultValue: prop.propDefault
      }))
    };
    
    return propsData;
  } catch (error) {
    throw new McpError(ErrorCode.InternalError, `Error getting props from meta: ${error.message}`);
  }
}

async function generateSingleComponentJSXFromMeta(componentName, componentProps, childrenInput) {
  try {
    const componentMeta = await getComponentMeta(componentName);
    const propTypesMap = new Map();
    
    // Build prop types map from meta
    componentMeta.props.forEach(prop => {
      propTypesMap.set(prop.propName, prop.propType);
    });
    
    // Use the existing component generation logic with the meta-based prop types
    let propsString = "";
    for (const [key, value] of Object.entries(componentProps)) {
      const propTypeString = propTypesMap.get(key);
      if (typeof value === 'boolean' && value === true && (!propTypeString || propTypeString.toLowerCase().includes('boolean'))) {
        propsString += ` ${key}`;
      } else {
        propsString += ` ${key}=${formatPropValue(value, propTypeString)}`;
      }
    }

    let childrenContent = "";
    if (typeof childrenInput === 'string') {
      childrenContent = childrenInput.trim() !== "" ? `\n  ${childrenInput.split('\n').map(line => `  ${line}`).join('\n')}\n` : "";
    } else if (Array.isArray(childrenInput)) {
      childrenContent = "\n" + childrenInput.map(childReq => 
        _generateSingleComponentJSX(childReq.componentName, childReq.props, childReq.children)
          .split('\n').map(line => `  ${line}`).join('\n') 
      ).join('\n') + "\n";
    }
    
    let componentCode = `<${componentName}${propsString.trimEnd()}`;
    if (childrenContent) {
      componentCode += `>${childrenContent}</${componentName}>`;
    } else {
      componentCode += ` />`;
    }
    return componentCode;
  } catch (error) {
    // Fallback to original method if meta fails
    return _generateSingleComponentJSX(componentName, componentProps, childrenInput);
  }
}

function _generateSingleComponentJSX(componentName, componentProps, childrenInput) {
    if (!componentName || typeof componentName !== 'string') {
        throw new McpError(ErrorCode.InvalidParams, "Missing or invalid componentName for (child) component.");
    }
    if (!componentProps || typeof componentProps !== 'object') {
        throw new McpError(ErrorCode.InvalidParams, "Missing or invalid props for (child) component.");
    }

    let propsString = "";
    for (const [key, value] of Object.entries(componentProps)) {
        if (typeof value === 'boolean' && value === true) {
            propsString += ` ${key}`;
        } else {
            propsString += ` ${key}=${formatPropValue(value)}`;
        }
    }

    let childrenContent = "";
    if (typeof childrenInput === 'string') {
        childrenContent = childrenInput.trim() !== "" ? `\n  ${childrenInput.split('\n').map(line => `  ${line}`).join('\n')}\n` : "";
    } else if (Array.isArray(childrenInput)) {
        childrenContent = "\n" + childrenInput.map(childReq => 
            _generateSingleComponentJSX(childReq.componentName, childReq.props, childReq.children)
                .split('\n').map(line => `  ${line}`).join('\n') 
        ).join('\n') + "\n";
    }
    
    let componentCode = `<${componentName}${propsString.trimEnd()}`;
    if (childrenContent) {
        componentCode += `>${childrenContent}</${componentName}>`;
    } else {
        componentCode += ` />`;
    }
    return componentCode;
}

function generateFintechKpiSummaryWithChart(options, includeImports) {
  if (options.title && typeof options.title !== 'string') throw new McpError(ErrorCode.InvalidParams, "options.title must be a string.");
  if (options.kpis) {
    if (!Array.isArray(options.kpis) || !options.kpis.every((kpi) => typeof kpi === 'object' && kpi !== null && typeof kpi.title === 'string' && typeof kpi.value === 'string')) {
      throw new McpError(ErrorCode.InvalidParams, "options.kpis must be an array of objects with string 'title' and 'value'.");
    }
  }
  if (options.chartRawData && !Array.isArray(options.chartRawData)) {
    throw new McpError(ErrorCode.InvalidParams, "options.chartRawData must be an array.");
  }
  if (options.chartXKey && typeof options.chartXKey !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "options.chartXKey must be a string.");
  }
  if (options.chartYKeys && (!Array.isArray(options.chartYKeys) || !options.chartYKeys.every((key) => typeof key === 'string'))) {
    throw new McpError(ErrorCode.InvalidParams, "options.chartYKeys must be an array of strings.");
  }
  if (options.chartType && !['line', 'bar', 'pie'].includes(options.chartType.toLowerCase())) {
    throw new McpError(ErrorCode.InvalidParams, "options.chartType must be 'line', 'bar', or 'pie'.");
  }
  ['xAxisLabel', 'yAxisLabel', 'chartHeaderSlotString'].forEach(key => {
    if (options[key] && typeof options[key] !== 'string') {
      throw new McpError(ErrorCode.InvalidParams, `options.${key} must be a string.`);
    }
  });

  const {
    title = "Financial Overview",
    kpis = [ 
      { title: "Total Revenue", value: "$1.2M", changeValue: 15, changeDirection: "positive", variant: "NUMBER" },
      { title: "Net Profit", value: "$300K", changeValue: 8, changeDirection: "positive", variant: "NUMBER" },
      { title: "Active Users", value: "1,500", changeValue: 2, changeDirection: "negative", variant: "NUMBER" },
    ],
    chartRawData = [{ month: "Jan", sales: 120000, profit: 70000 }, { month: "Feb", sales: 150000, profit: 90000 }],
    chartXKey = "month", 
    chartYKeys = ["sales", "profit"], 
    chartType = "line",   
    xAxisLabel = options.chartXKey || "Category",
    yAxisLabel = "Value", 
    chartHeaderSlotString = options.chartTitle || 'Chart Overview' 
  } = options;

  let kpiCardsString = kpis.map((kpi) => {
    const changeTypeVal = kpi.changeDirection === "positive" ? "ChangeType.INCREASE" : (kpi.changeDirection === "negative" ? "ChangeType.DECREASE" : undefined);
    const statCardVariantVal = kpi.variant && ["LINE", "PROGRESS_BAR", "BAR", "NUMBER"].includes(kpi.variant.toUpperCase()) 
      ? `StatCardVariant.${kpi.variant.toUpperCase()}` 
      : "StatCardVariant.NUMBER";
    
    let changePropString = "";
    if (changeTypeVal && kpi.changeValue !== undefined) {
        changePropString = `change={{ value: ${Math.abs(Number(kpi.changeValue))}, type: ${changeTypeVal} }}`;
    }

    let chartDataPropString = "";
    if (kpi.chartData && (statCardVariantVal === "StatCardVariant.LINE" || statCardVariantVal === "StatCardVariant.BAR")) {
        const chartDataContent = Array.isArray(kpi.chartData) 
            ? kpi.chartData.map((dp) => `{label: "${dp.label}", value: ${dp.value}}`).join(', ')
            : "[]";
        chartDataPropString = `chartData={[${chartDataContent}]}`;
    }
    
    let progressValuePropString = "";
    if (kpi.progressValue !== undefined && statCardVariantVal === "StatCardVariant.PROGRESS_BAR") {
        progressValuePropString = `progressValue={${Number(kpi.progressValue)}}`;
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
      </div>`;
  }).join('\n');

  const transformedChartData = chartRawData.map((item) => {
      const dataPointData = {};
      for (const yKey of chartYKeys) {
          if (item[yKey] !== undefined) {
              dataPointData[yKey] = { primary: { label: yKey, val: Number(item[yKey]) } };
          }
      }
      return { name: String(item[chartXKey]), data: dataPointData };
  });
  const chartDataString = JSON.stringify(transformedChartData);
  const chartTypeVal = `ChartType.${chartType.toUpperCase()}`;

  let chartString = `    <Charts
      chartHeaderSlot={"${chartHeaderSlotString}"}
      data={${chartDataString}}
      chartType={${chartTypeVal}}
      ${xAxisLabel ? `xAxisLabel="${xAxisLabel}"` : ''}
      ${yAxisLabel ? `yAxisLabel="${yAxisLabel}"` : ''}
    />`;
  
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
</div>`;

  if (includeImports) {
    const imports = `import { Text, StatCard, Charts, StatCardVariant, ChangeType, ChartType } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`;
    code = imports + code;
  }
  return code.trim();
}

function generateTransactionListWithControls(options, includeImports) {
  if (options.title && typeof options.title !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "options.title must be a string for transaction_list_with_controls.");
  }
   if (options.columns && !(typeof options.columns === 'string' || Array.isArray(options.columns))) {
    throw new McpError(ErrorCode.InvalidParams, "options.columns must be an array or a string representing an array.");
  }
  if (options.data && !(typeof options.data === 'string' || Array.isArray(options.data))) {
    throw new McpError(ErrorCode.InvalidParams, "options.data must be an array or a string representing an array.");
  }
  if (options.filters && (!Array.isArray(options.filters) || !options.filters.every((f) => typeof f === 'object' && f !== null && typeof f.type === 'string' && typeof f.label === 'string'))) {
    throw new McpError(ErrorCode.InvalidParams, "options.filters must be an array of objects with string 'type' and 'label'.");
  }
  if (options.mainActions && (!Array.isArray(options.mainActions) || !options.mainActions.every((a) => typeof a === 'object' && a !== null && typeof a.component === 'string'))) {
    throw new McpError(ErrorCode.InvalidParams, "options.mainActions must be an array of objects with string 'component'.");
  }
  if (options.dataTableIdField && typeof options.dataTableIdField !== 'string') {
    throw new McpError(ErrorCode.InvalidParams, "options.dataTableIdField must be a string.");
  }

  const {
    title = "Transactions",
    columns = '[{ "header": "ID", "field": "id" }, { "header": "Date", "field": "date" }, { "header": "Amount", "field": "amount" }, { "header": "Status", "field": "status" }]', 
    data = '[{ "id": "T001", "date": "2023-01-15", "amount": "$250.00", "status": "Completed" }]',
    filters = [
      { type: 'TextInput', label: 'Search', props: { placeholder: 'Search transactions...' } },
      { type: 'SingleSelect', label: 'Status', props: { placeholder: 'Any Status', items: '[{ "items": [{value: "all", label: "All"}, {value: "completed", label: "Completed"}, {value: "pending", label: "Pending"}]}]' } } 
    ],
    mainActions = [
      { component: 'Button', props: { text: 'Export CSV', buttonType: 'ButtonType.SECONDARY' } },
      { component: 'Button', props: { text: 'Add Transaction', buttonType: 'ButtonType.PRIMARY', style: "{ marginLeft: '10px' }" } }
    ],
    dataTableIdField = "id" 
  } = options;

  const columnsValue = (typeof columns === 'string' && columns.startsWith('[')) ? columns : JSON.stringify(columns);
  const dataValue = (typeof data === 'string' && data.startsWith('[')) ? data : JSON.stringify(data);

  let filterControlsString = filters.map((filter) => {
    const filterProps = Object.entries(filter.props || {})
      .map(([key, value]) => `${key}=${formatPropValue(value, '')}`) 
      .join(' ');
    const labelProp = (filter.type === 'SingleSelect' || filter.type === 'TextInput') && filter.label ? `label="${filter.label}"` : '';
    return `    <${filter.type} ${labelProp} ${filterProps} style={{ marginRight: '10px' }} />`;
  }).join('\n');

  let mainActionsString = mainActions.map((action) => {
     const actionProps = Object.entries(action.props || {})
      .map(([key, value]) => `${key}=${formatPropValue(value, '')}`)
      .join(' ');
    return `  <${action.component} ${actionProps} />`;
  }).join('\n  ');

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
</div>`;

  if (includeImports) {
    const usedComponents = new Set(['Text', 'DataTable']);
    filters.forEach((f) => usedComponents.add(f.type)); 
    mainActions.forEach((a) => usedComponents.add(a.component)); 
    if (Array.from(usedComponents).some(c => c === 'Button')) {
        usedComponents.add('ButtonType');
    }
    const imports = `import { ${Array.from(usedComponents).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n`;
    code = imports + code;
  }
  return code.trim();
}

const server = new Server(
  { name: "blend", version: "0.1.0" },
  { capabilities: { tools: {} } }
);

const childComponentSchema = { 
    type: "object",
    properties: {
        componentName: { type: "string" },
        props: { type: "object", additionalProperties: true },
        children: { type: ["string", "array"], items: { type: "object" } } 
    },
    required: ["componentName", "props"]
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      { name: "list_blend_components", description: "Lists all available components in blend-v1 that can be used.", inputSchema: { type: "object", properties: {}, required: [] }},
      { name: "get_blend_component_props", description: "Retrieves the props and their descriptions for a specified blend-v1 component.", inputSchema: { type: "object", properties: { componentName: { type: "string", description: "The name of the blend-v1 component." } }, required: ["componentName"] }},
      { 
        name: "generate_blend_component", 
        description: "Generates React code for a specified blend-v1 component with given props.", 
        inputSchema: { 
          type: "object", 
          properties: { 
            componentName: { type: "string", description: "The name of the blend-v1 component (e.g., Button, Alert)." }, 
            props: { type: "object", description: "An object of key-value pairs for component props.", additionalProperties: true }, 
            children: { 
              oneOf: [ 
                { type: "string" },
                { type: "array", items: childComponentSchema }
              ],
              description: "String content or an array of child component generation requests." 
            }, 
            includeImports: { type: "boolean", description: "Whether to include necessary import statements. Defaults to true.", default: true }
          }, 
          required: ["componentName", "props"] 
        }
      },
      { name: "scaffold_dashboard_section", description: "Generates React code for common FinTech dashboard section patterns using blend-v1 components.", inputSchema: { type: "object", properties: { sectionType: { type: "string", description: "The type of dashboard section pattern to generate.", enum: ["fintech_kpi_summary_with_chart", "transaction_list_with_controls", "interactive_modal"] }, options: { type: "object", description: "Configuration options specific to the chosen sectionType." }, includeImports: { type: "boolean", description: "Whether to include necessary import statements. Defaults to true.", default: true }}, required: ["sectionType", "options"] }},
      { 
        name: "generate_component_documentation", 
        description: "Generates documentation for a specified blend-v1 component.", 
        inputSchema: { 
          type: "object", 
          properties: { 
            componentName: { type: "string", description: "The name of the blend-v1 component (e.g., Button, Alert)." }
          }, 
          required: ["componentName"] 
        }
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  switch (request.params.name) {
    case "list_blend_components": {
      try {
        const entries = fs.readdirSync(BLEND_LIBRARY_PATH, { withFileTypes: true });
        const componentNames = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
        return { content: [{ type: "text", text: JSON.stringify(componentNames) }] };
      } catch (error) {
        throw new McpError(ErrorCode.InternalError, `Error listing components: ${error.message}`);
      }
    }
    case "get_blend_component_props": {
      const componentName = request.params.arguments?.componentName;
      if (!componentName) throw new McpError(ErrorCode.InvalidParams, "Missing componentName argument.");
      
      // Try meta-based approach first
      if (hasComponentMeta(componentName)) {
        try {
          const propsData = await getBlendComponentPropsFromMeta(componentName);
          return { content: [{ type: "text", text: JSON.stringify(propsData) }] };
        } catch (error) {
          console.warn(`Meta-based props retrieval failed for ${componentName}, no fallback available: ${error.message}`);
          throw new McpError(ErrorCode.InternalError, `Error getting props for ${componentName}: ${error.message}`);
        }
      } else {
        throw new McpError(ErrorCode.InvalidParams, `No meta file found for component ${componentName}`);
      }
    }
    case "generate_blend_component": {
      const { componentName, props: componentProps, children, includeImports = true } = request.params.arguments;
      
      if (!componentName || typeof componentName !== 'string') throw new McpError(ErrorCode.InvalidParams, "Missing or invalid componentName argument.");
      if (!componentProps || typeof componentProps !== 'object') throw new McpError(ErrorCode.InvalidParams, "Missing or invalid props argument.");

      let componentCode = _generateSingleComponentJSX(componentName, componentProps, children);

      if (includeImports) {
        const allComponentNames = new Set([componentName]);
        function collectComponentNames(childInput) {
            if (Array.isArray(childInput)) {
                childInput.forEach(child => {
                    allComponentNames.add(child.componentName);
                    collectComponentNames(child.children);
                });
            }
        }
        collectComponentNames(children);
        componentCode = `import { ${Array.from(allComponentNames).sort().join(', ')} } from "${BLEND_LIBRARY_PACKAGE_NAME}";\n\n${componentCode}`;
      }

      return { content: [{ type: "text", text: componentCode }] };
    }
    case "scaffold_dashboard_section": {
      const { sectionType, options, includeImports = true } = request.params.arguments;
      if (!sectionType) throw new McpError(ErrorCode.InvalidParams, "Missing sectionType argument.");
      if (options && typeof options !== 'object') { 
        throw new McpError(ErrorCode.InvalidParams, "options parameter must be an object.");
      }

      let scaffoldedCode = "";
      switch (sectionType) {
        case "fintech_kpi_summary_with_chart":
          scaffoldedCode = generateFintechKpiSummaryWithChart(options || {}, includeImports); 
          break;
        case "transaction_list_with_controls":
          scaffoldedCode = generateTransactionListWithControls(options || {}, includeImports); 
          break;
        default:
          throw new McpError(ErrorCode.InvalidParams, `Unknown sectionType: ${sectionType}`);
      }
      return { content: [{ type: "text", text: scaffoldedCode }] };
    }
    case "generate_component_documentation": {
      const componentName = request.params.arguments?.componentName;
      if (!componentName) throw new McpError(ErrorCode.InvalidParams, "Missing componentName argument.");
      
      // Try meta-based approach first
      if (hasComponentMeta(componentName)) {
        try {
          const markdownDocumentation = await generateComponentDocumentationFromMeta(componentName);
          return { content: [{ type: "text", text: markdownDocumentation }] };
        } catch (error) {
          console.warn(`Meta-based documentation generation failed for ${componentName}: ${error.message}`);
          throw new McpError(ErrorCode.InternalError, `Error generating documentation for ${componentName}: ${error.message}`);
        }
      } else {
        throw new McpError(ErrorCode.InvalidParams, `No meta file found for component ${componentName}`);
      }
    }
    default:
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Blend MCP server running on stdio"); 
}

main().catch((error) => {
  console.error("Server error:", error.message); 
  process.exit(1);
});
