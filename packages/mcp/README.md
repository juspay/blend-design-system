# blend-ui-mcp

[![npm version](https://img.shields.io/npm/v/blend-ui-mcp)](https://www.npmjs.com/package/blend-ui-mcp)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-green)](package.json)
[![License](https://img.shields.io/badge/license-MIT-green)](https://github.com/juspay/blend-design-system/blob/main/LICENSE)
[![MCP](https://img.shields.io/badge/protocol-MCP-purple)](https://modelcontextprotocol.io)

An MCP (Model Context Protocol) server for the [Blend Design System](https://github.com/juspay/blend-design-system) ([npm](https://www.npmjs.com/package/@juspay/blend-design-system)). It enables AI assistants (Claude, Cursor, Cline, Windsurf, etc.) to discover components, understand props and variants, generate correct React code, validate usage, retrieve design tokens, and scaffold full UI sections — all grounded in the real Blend component manifest rather than hallucinated APIs.

- **MCP server source**: [github.com/juspay/blend-design-system/tree/dev/packages/mcp](https://github.com/juspay/blend-design-system/tree/dev/packages/mcp)
- **MCP server npm**: [npmjs.com/package/blend-ui-mcp](https://www.npmjs.com/package/blend-ui-mcp)
- **Blend Design System**: [github.com/juspay/blend-design-system](https://github.com/juspay/blend-design-system)
- **Blend npm package**: [npmjs.com/package/@juspay/blend-design-system](https://www.npmjs.com/package/@juspay/blend-design-system)

---

## Installation

### Claude Desktop

**Step 1** — Open your Claude Desktop config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Step 2** — Add the `blend-design-system` entry under `mcpServers`:

```json
{
    "mcpServers": {
        "blend-design-system": {
            "command": "npx",
            "args": ["-y", "blend-ui-mcp"]
        }
    }
}
```

**Step 3** — Save the file and **restart Claude Desktop**.

**Step 4** — Verify it's working. Ask Claude:

> _"List all Blend design system components"_

Claude should call `list_blend_components` and return the full component catalog.

---

### Cursor

**Step 1** — Open Cursor Settings → MCP → Add new server, or create `.cursor/mcp.json` in your project root:

```json
{
    "mcpServers": {
        "blend-design-system": {
            "command": "npx",
            "args": ["-y", "blend-ui-mcp"]
        }
    }
}
```

**Step 2** — Restart Cursor or reload the MCP servers.

---

### Windsurf

**Step 1** — Edit `~/.codeium/windsurf/mcp_config.json`:

```json
{
    "mcpServers": {
        "blend-design-system": {
            "command": "npx",
            "args": ["-y", "blend-ui-mcp"]
        }
    }
}
```

**Step 2** — Restart Windsurf.

---

### Cline (VS Code)

**Step 1** — Open the Cline panel in VS Code → MCP Servers tab → click **Edit Config**.

**Step 2** — Add:

```json
{
    "mcpServers": {
        "blend-design-system": {
            "command": "npx",
            "args": ["-y", "blend-ui-mcp"]
        }
    }
}
```

**Step 3** — Save and let Cline reconnect.

---

## Tools

### 1. `list_blend_components`

Lists all available Blend components, optionally filtered by category.

**Input params:**

| Param      | Type   | Required | Description                                                                       |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------- |
| `category` | string | No       | Filter by: `action`, `input`, `data-display`, `feedback`, `navigation`, `overlay` |

**Example:**

```json
{ "tool": "list_blend_components", "arguments": { "category": "input" } }
```

---

### 2. `search_components`

Searches components by keyword, use-case, or feature description. Use this when you don't know the exact component name.

**Input params:**

| Param   | Type   | Required | Description                                |
| ------- | ------ | -------- | ------------------------------------------ |
| `query` | string | Yes      | Keywords, use-case, or feature description |

**Example:**

```json
{
    "tool": "search_components",
    "arguments": { "query": "dropdown select options" }
}
```

---

### 3. `get_blend_component_props`

Returns the full prop list for a component: names, types, required flags, defaults, enum references, and LLM guidance.

**Input params:**

| Param           | Type   | Required | Description                       |
| --------------- | ------ | -------- | --------------------------------- |
| `componentName` | string | Yes      | Component name (case-insensitive) |

**Example:**

```json
{
    "tool": "get_blend_component_props",
    "arguments": { "componentName": "Button" }
}
```

**Example output (abbreviated):**

```json
{
    "componentName": "Button",
    "props": [
        {
            "propName": "buttonType",
            "propType": "ButtonType",
            "required": false
        },
        { "propName": "text", "propType": "string", "required": false },
        { "propName": "loading", "propType": "boolean", "required": false }
    ]
}
```

---

### 4. `get_component_variants`

Returns all enum types and their valid members for a component. Use this before generating code to know valid enum values.

**Input params:**

| Param           | Type   | Required | Description    |
| --------------- | ------ | -------- | -------------- |
| `componentName` | string | Yes      | Component name |

**Example:**

```json
{ "tool": "get_component_variants", "arguments": { "componentName": "Button" } }
```

**Example output:**

```json
{
    "componentName": "Button",
    "enums": {
        "ButtonType": {
            "PRIMARY": "primary",
            "SECONDARY": "secondary",
            "DANGER": "danger",
            "SUCCESS": "success"
        },
        "ButtonSize": { "SMALL": "sm", "MEDIUM": "md", "LARGE": "lg" },
        "ButtonSubType": {
            "DEFAULT": "default",
            "ICON_ONLY": "iconOnly",
            "INLINE": "inline"
        }
    }
}
```

---

### 5. `get_component_composition`

Returns compound component structure, composition pattern, and usage examples. Essential for components like Accordion, Radio, Switch, and Tabs that require specific parent-child relationships.

**Input params:**

| Param           | Type   | Required | Description    |
| --------------- | ------ | -------- | -------------- |
| `componentName` | string | Yes      | Component name |

**Example:**

```json
{
    "tool": "get_component_composition",
    "arguments": { "componentName": "Accordion" }
}
```

**Example output (abbreviated):**

```json
{
    "componentName": "Accordion",
    "isCompound": true,
    "subComponents": ["AccordionItem"],
    "compositionPattern": "Accordion wraps AccordionItem children. Each AccordionItem needs a unique 'value' and a 'title'.",
    "subComponentProps": {
        "AccordionItem": [
            { "propName": "value", "propType": "string", "required": true },
            { "propName": "title", "propType": "string", "required": true }
        ]
    }
}
```

---

### 6. `generate_blend_component`

Generates ready-to-use React JSX for a Blend component with correct prop syntax and import statements.

**Input params:**

| Param            | Type            | Required | Description                                    |
| ---------------- | --------------- | -------- | ---------------------------------------------- |
| `componentName`  | string          | Yes      | Component to generate                          |
| `props`          | object          | Yes      | Props key-value map                            |
| `children`       | string \| array | No       | String content or nested child component specs |
| `includeImports` | boolean         | No       | Include import statement (default: `true`)     |

**Example:**

```json
{
    "tool": "generate_blend_component",
    "arguments": {
        "componentName": "Button",
        "props": {
            "buttonType": "ButtonType.DANGER",
            "size": "ButtonSize.MEDIUM",
            "text": "Delete account",
            "loading": false
        }
    }
}
```

**Output:**

```tsx
import { Button, ButtonSize, ButtonType } from '@juspay/blend-design-system'
;<Button
    buttonType={ButtonType.DANGER}
    size={ButtonSize.MEDIUM}
    text="Delete account"
    loading={false}
/>
```

---

### 7. `scaffold_blend_section`

Generates a complete multi-component UI section for common layout patterns. Returns production-ready JSX with imports.

**Input params:**

| Param            | Type    | Required | Description                                 |
| ---------------- | ------- | -------- | ------------------------------------------- |
| `sectionType`    | string  | Yes      | One of the 5 section types below            |
| `options`        | object  | No       | Section-specific configuration              |
| `includeImports` | boolean | No       | Include import statements (default: `true`) |

**Available `sectionType` values:**

| Value                            | Description                                                                             |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| `fintech_kpi_summary_with_chart` | KPI stat cards with a chart — for dashboards showing revenue, volume, or growth metrics |
| `transaction_list_with_controls` | DataTable with search input, filter dropdowns, and action buttons                       |
| `interactive_modal_with_form`    | Modal containing a form with TextInputs and submit/cancel Buttons                       |
| `settings_form`                  | Settings page with Card sections, TextInputs, SingleSelects, and a save Button          |
| `data_table_with_filters`        | DataTable with filter bar, search, and export controls                                  |

**Example:**

```json
{
    "tool": "scaffold_blend_section",
    "arguments": {
        "sectionType": "fintech_kpi_summary_with_chart",
        "options": { "title": "Financial Overview" }
    }
}
```

---

### 8. `validate_component_usage`

Validates a props object against the manifest for a component. Catches unknown props, suggests corrections for typos (fuzzy match), and flags invalid enum values.

**Input params:**

| Param           | Type   | Required | Description                   |
| --------------- | ------ | -------- | ----------------------------- |
| `componentName` | string | Yes      | Component to validate against |
| `props`         | object | Yes      | Props object to validate      |

**Example:**

```json
{
    "tool": "validate_component_usage",
    "arguments": {
        "componentName": "Button",
        "props": { "typ": "primary", "txt": "Submit" }
    }
}
```

**Output:**

```json
{
    "valid": false,
    "errors": [
        "Unknown prop 'typ' on Button. Did you mean 'buttonType'?",
        "Unknown prop 'txt' on Button. Did you mean 'text'?"
    ],
    "warnings": [],
    "suggestions": [
        "Use the 'get_blend_component_props' tool to see all valid props for Button."
    ]
}
```

---

### 9. `get_theme_tokens`

Returns Blend design token values by category: colors, spacing, borders, shadows, or typography.

**Input params:**

| Param      | Type   | Required | Description                                                                                         |
| ---------- | ------ | -------- | --------------------------------------------------------------------------------------------------- |
| `category` | string | No       | `colors`, `spacing`, `borders`, `shadows`, or `typography`. Omit for an overview of all categories. |

**Example:**

```json
{ "tool": "get_theme_tokens", "arguments": { "category": "colors" } }
```

---

### 10. `generate_component_documentation`

Generates complete Markdown documentation for a component including props table, enum values, usage examples, and composition guide.

**Input params:**

| Param           | Type   | Required | Description           |
| --------------- | ------ | -------- | --------------------- |
| `componentName` | string | Yes      | Component to document |

**Example:**

```json
{
    "tool": "generate_component_documentation",
    "arguments": { "componentName": "TextInput" }
}
```

---

### 11. `get_server_info`

Returns MCP server status, manifest metadata, component count by category, and tool inventory.

**Input params:** none

**Example output:**

```json
{
    "serverVersion": "2.0.1",
    "sdkVersion": "1.27.1",
    "mcpPackage": "blend-ui-mcp",
    "blendPackage": "@juspay/blend-design-system",
    "blendPackageVersion": "0.0.36",
    "manifestGeneratedAt": "2026-03-17T08:37:47.811Z",
    "componentCount": 50,
    "toolCount": 11,
    "categories": {
        "input": 20,
        "data-display": 13,
        "navigation": 7,
        "feedback": 4,
        "action": 2,
        "overlay": 4
    }
}
```

---

## Keeping Up to Date

`npx` caches packages by version. When a new `blend-ui-mcp` version is published, users get it automatically on the next Claude Desktop restart. To force the latest immediately:

```bash
npx -y blend-ui-mcp@latest
```

---

## For Contributors

### Regenerating the manifest

The manifest (`manifest.json`) is a pre-built snapshot of all component props and enums generated from the Blend TypeScript source. It is auto-regenerated before every npm publish via `prepublishOnly`. To regenerate manually after component source changes:

```bash
cd packages/mcp
node generateManifest.js
```

Commit the updated `manifest.json` alongside any component type changes.

### Adding LLM context via meta-overrides

Each component can have a `meta-overrides/<componentname>.json` file with hand-authored descriptions, usage examples, and prop guidance that gets merged into the manifest at generation time:

```json
{
    "componentDescription": "Human-written description for the LLM.",
    "features": ["Feature 1", "Feature 2"],
    "compositionPattern": "Explain how to compose this component.",
    "usageExamples": [
        {
            "title": "Example title",
            "description": "What this example shows.",
            "code": "<MyComponent prop=\"value\" />"
        }
    ],
    "propOverrides": {
        "propName": {
            "llmContext": "Guidance for the LLM on when and how to use this prop.",
            "propDescription": "Short description for the props table."
        }
    }
}
```

> **Note:** Keys in `propOverrides` must exactly match a prop name in the manifest. To list valid prop names:
>
> ```bash
> node -e "const m=JSON.parse(require('fs').readFileSync('manifest.json','utf-8')); console.log(m.components['Button'].props.map(p=>p.propName))"
> ```

### Running tests

```bash
cd packages/mcp
node test.js
```

57 assertions across manifest integrity, compound components, enum extraction, meta-override application, validator logic, and prop count sanity. Exits with code 0 on all pass.

---

## Environment Variables

| Variable                     | Default                       | Description                                                                                                          |
| ---------------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `BLEND_LIBRARY_PACKAGE_NAME` | `@juspay/blend-design-system` | The package name used in generated import statements. Override only if you have forked or renamed the Blend package. |

---

## Links

|                              |                                                                                                                                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Blend Design System (GitHub) | [github.com/juspay/blend-design-system](https://github.com/juspay/blend-design-system)                                             |
| Blend Design System (npm)    | [npmjs.com/package/@juspay/blend-design-system](https://www.npmjs.com/package/@juspay/blend-design-system)                         |
| MCP Server (GitHub)          | [github.com/juspay/blend-design-system/tree/dev/packages/mcp](https://github.com/juspay/blend-design-system/tree/dev/packages/mcp) |
| MCP Server (npm)             | [npmjs.com/package/blend-ui-mcp](https://www.npmjs.com/package/blend-ui-mcp)                                                       |
| Model Context Protocol       | [modelcontextprotocol.io](https://modelcontextprotocol.io)                                                                         |
| Issues                       | [github.com/juspay/blend-design-system/issues](https://github.com/juspay/blend-design-system/issues)                               |

---

## License

MIT — see [LICENSE](https://github.com/juspay/blend-design-system/blob/main/LICENSE).
