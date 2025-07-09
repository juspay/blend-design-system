# Blend MCP Server

An MCP (Model Context Protocol) server for the Blend design system that provides tools for generating React components, documentation, and UI patterns.

## Features

- **List Components**: Get a list of all available Blend components
- **Component Props**: Retrieve detailed prop information for any component
- **Generate Components**: Create React code with proper props and children
- **Scaffold Patterns**: Generate common UI patterns like dashboards and data tables
- **Documentation**: Generate comprehensive component documentation

## Installation

### Using npx (Recommended for testing)

You can run the MCP server directly from GitHub without installing:

```bash
# Clone and run in one command
npx degit design-juspay/cloved/packages/mcp blend-mcp-temp && cd blend-mcp-temp && npm install && node index.js
```

Or use node directly with the raw file from GitHub:

```bash
curl -s https://raw.githubusercontent.com/design-juspay/cloved/main/packages/mcp/index.js | node -
```

### Local Installation

1. Clone the repository:
```bash
git clone https://github.com/design-juspay/cloved.git
cd cloved/packages/mcp
```

2. Install dependencies:
```bash
npm install
```

3. Run the server:
```bash
node index.js
```

## Configuration

### Environment Variables

- `BLEND_LIBRARY_PATH`: Path to the Blend components directory (auto-detected by default)
- `BLEND_LIBRARY_PACKAGE_NAME`: Package name for imports (default: "blend-v1")
- `META_PATH`: Path to component metadata files (auto-detected by default)

### MCP Client Configuration

#### Claude Desktop

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "blend": {
      "command": "node",
      "args": ["/path/to/cloved/packages/mcp/index.js"],
      "env": {
        "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1"
      }
    }
  }
}
```

Or if you have blend-v1 installed as a dependency:

```json
{
  "mcpServers": {
    "blend": {
      "command": "npx",
      "args": ["degit", "design-juspay/cloved/packages/mcp", "blend-mcp-temp", "&&", "cd", "blend-mcp-temp", "&&", "npm", "install", "&&", "node", "index.js"],
      "env": {
        "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1",
        "BLEND_LIBRARY_PATH": "./node_modules/blend-v1/lib/components"
      }
    }
  }
}
```

#### VS Code with Continue/Cline

Add to your MCP settings:

```json
{
  "mcpServers": {
    "blend": {
      "command": "node", 
      "args": ["/path/to/cloved/packages/mcp/index.js"],
      "env": {
        "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1"
      }
    }
  }
}
```

## Available Tools

### 1. list_blend_components

Lists all available components in the Blend design system.

**Usage:**
```
Tool: list_blend_components
Arguments: {}
```

**Returns:** Array of component names

### 2. get_blend_component_props

Retrieves detailed prop information for a specific component.

**Usage:**
```
Tool: get_blend_component_props
Arguments: {
  "componentName": "Button"
}
```

**Returns:** Object with component description and prop details

### 3. generate_blend_component

Generates React code for a component with specified props.

**Usage:**
```
Tool: generate_blend_component
Arguments: {
  "componentName": "Button",
  "props": {
    "text": "Click me",
    "variant": "primary"
  },
  "includeImports": true
}
```

**Returns:** React component code with imports

### 4. scaffold_dashboard_section

Generates common UI patterns for dashboards.

**Available patterns:**
- `fintech_kpi_summary_with_chart`: KPI cards with charts
- `transaction_list_with_controls`: Data table with filters

**Usage:**
```
Tool: scaffold_dashboard_section
Arguments: {
  "sectionType": "fintech_kpi_summary_with_chart",
  "options": {
    "title": "Financial Overview",
    "kpis": [
      {
        "title": "Revenue",
        "value": "$1.2M",
        "changeValue": 15,
        "changeDirection": "positive"
      }
    ]
  }
}
```

### 5. generate_component_documentation

Generates markdown documentation for a component.

**Usage:**
```
Tool: generate_component_documentation
Arguments: {
  "componentName": "Button"
}
```

**Returns:** Markdown documentation with props, features, and examples

## Examples

### Example 1: Generate a Button

```javascript
// Request
{
  "tool": "generate_blend_component",
  "arguments": {
    "componentName": "Button",
    "props": {
      "text": "Submit",
      "variant": "primary",
      "size": "medium"
    }
  }
}

// Response
import { Button } from "blend-v1";

<Button text="Submit" variant="primary" size="medium" />
```

### Example 2: Create a Dashboard Section

```javascript
// Request
{
  "tool": "scaffold_dashboard_section",
  "arguments": {
    "sectionType": "transaction_list_with_controls",
    "options": {
      "title": "Recent Transactions",
      "columns": [
        { "header": "ID", "field": "id" },
        { "header": "Amount", "field": "amount" },
        { "header": "Status", "field": "status" }
      ]
    }
  }
}
```

## Development

### Running Locally

1. Make sure you have Node.js 18+ installed
2. Clone the repository
3. Install dependencies: `npm install`
4. Run the server: `node index.js`

### Testing with MCP Inspector

```bash
npm run inspector
```

This will open the MCP Inspector to test the server's tools interactively.

## Troubleshooting

### "Could not find Blend library" Error

If you see this error, the server cannot locate the Blend components. Set the path explicitly:

```bash
export BLEND_LIBRARY_PATH="/path/to/blend/lib/components"
node /path/to/cloved/packages/mcp/index.js
```

### Meta Features Not Available

If component documentation features aren't working, ensure the meta files are available or set:

```bash
export META_PATH="/path/to/meta/files"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](../../LICENSE) file for details.

## Support

For issues and questions:
- Open an issue on [GitHub](https://github.com/design-juspay/cloved/issues)
- Check existing issues for solutions
- Ensure you're using the latest version

## Changelog

### v1.0.0
- Initial release with core MCP tools
- Support for component generation and documentation
- Dashboard scaffolding patterns
- Auto-detection of Blend library paths
