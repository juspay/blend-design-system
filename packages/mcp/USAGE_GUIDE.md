# 🚀 How to Use Blend MCP Server in Different Projects

The Blend MCP Server is now published on npm as `blend-mcp-server` and can be used in any project outside this monorepo.

## 📦 Installation Options

### 1️⃣ Global Installation (Recommended)

```bash
npm install -g blend-mcp-server
# Then use: blend-mcp-server
```

### 2️⃣ Project-Specific Installation

```bash
npm install blend-mcp-server
# Then use: npx blend-mcp-server
```

### 3️⃣ Direct Usage (No Installation)

```bash
npx blend-mcp-server
# Downloads and runs automatically
```

## 🔧 MCP Client Configurations

### 📱 Claude Desktop

**File Location:**

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

**Configuration:**

```json
{
    "mcpServers": {
        "blend": {
            "command": "npx",
            "args": ["blend-mcp-server"],
            "env": {
                "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1"
            }
        }
    }
}
```

### 💻 VS Code with Cline

Add to your MCP settings:

```json
{
    "mcpServers": {
        "blend": {
            "command": "npx",
            "args": ["blend-mcp-server"],
            "env": {
                "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1"
            }
        }
    }
}
```

## 🏗️ Project Setup Examples

### Example 1: React Project with Blend Components

```bash
# Create new project
mkdir my-blend-project
cd my-blend-project
npm init -y

# Install Blend library and MCP server
npm install blend-v1 blend-mcp-server

# Configure MCP client (Claude Desktop example)
# Add the configuration above to claude_desktop_config.json
```

### Example 2: Next.js Project

```bash
# Create Next.js project
npx create-next-app@latest my-nextjs-blend-app
cd my-nextjs-blend-app

# Install Blend library
npm install blend-v1

# Install MCP server (optional, can use npx)
npm install blend-mcp-server

# Configure MCP client
# Add configuration to your MCP client
```

### Example 3: Existing Project

```bash
# In your existing project
cd your-existing-project

# Install Blend library
npm install blend-v1

# MCP server can be used directly with npx
# No need to install if using npx
```

## 🎯 Usage Scenarios

### Scenario 1: Project with Blend Library Installed

When you have `blend-v1` installed in your project:

```json
{
    "mcpServers": {
        "blend": {
            "command": "npx",
            "args": ["blend-mcp-server"],
            "env": {
                "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1",
                "BLEND_LIBRARY_PATH": "./node_modules/blend-v1/lib/components"
            }
        }
    }
}
```

### Scenario 2: Project without Blend Library

The MCP server includes all component metadata, so it works even without the library:

```json
{
    "mcpServers": {
        "blend": {
            "command": "npx",
            "args": ["blend-mcp-server"],
            "env": {
                "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1"
            }
        }
    }
}
```

### Scenario 3: Custom Blend Package Name

If you're using a custom build or fork:

```json
{
    "mcpServers": {
        "blend": {
            "command": "npx",
            "args": ["blend-mcp-server"],
            "env": {
                "BLEND_LIBRARY_PACKAGE_NAME": "your-custom-blend-package",
                "BLEND_LIBRARY_PATH": "./node_modules/your-custom-blend-package/lib/components"
            }
        }
    }
}
```

## 🛠️ Available Tools

Once configured, you'll have access to these MCP tools:

1. **`list_blend_components`** - Lists all 35 Blend components
2. **`get_blend_component_props`** - Gets detailed prop information
3. **`generate_blend_component`** - Generates React code with props
4. **`scaffold_dashboard_section`** - Creates dashboard patterns
5. **`generate_component_documentation`** - Generates component docs

## 🧪 Testing Your Setup

### Test 1: Verify Installation

```bash
npx blend-mcp-server
# Should show: [ERROR] Could not find Blend library components directory.
# This is expected when no Blend library is installed
```

### Test 2: With Blend Library

```bash
npm install blend-v1
npx blend-mcp-server
# Should start the MCP server successfully
```

### Test 3: MCP Client Connection

1. Configure your MCP client (Claude Desktop/VS Code)
2. Restart the client
3. Ask: "List all available Blend components"
4. You should get a list of 35 components

## 🔍 Troubleshooting

### Issue: "Could not find Blend library"

**Solution:** Set the `BLEND_LIBRARY_PATH` environment variable:

```json
{
    "env": {
        "BLEND_LIBRARY_PATH": "./node_modules/blend-v1/lib/components"
    }
}
```

### Issue: MCP server not connecting

**Solutions:**

1. Restart your MCP client
2. Check the configuration file path
3. Verify JSON syntax is correct
4. Check if `npx blend-mcp-server` runs manually

### Issue: Components not generating correctly

**Solution:** Ensure `BLEND_LIBRARY_PACKAGE_NAME` matches your installed package:

```json
{
    "env": {
        "BLEND_LIBRARY_PACKAGE_NAME": "blend-v1"
    }
}
```

## 📚 Example Usage

Once set up, you can ask your AI assistant:

- "Generate a Button component with primary variant"
- "Create a dashboard with KPI cards and charts"
- "Show me all available Blend components"
- "What are the props for the DataTable component?"
- "Generate documentation for the Modal component"

## 🎉 Success!

You now have the complete Blend design system available through AI-assisted development in any project!

The MCP server provides:

- ✅ 35 Blend components
- ✅ 300+ component props
- ✅ Accurate TypeScript definitions
- ✅ Code generation with proper imports
- ✅ Dashboard scaffolding patterns
- ✅ Complete component documentation

Happy coding with Blend! 🚀
