# Publishing `blend-ui-mcp`

This guide explains how to publish the MCP package in `packages/mcp` to npm.

## Package details

- **Package name**: `blend-ui-mcp`
- **Path**: `packages/mcp`
- **Registry**: npm (public)
- **Node engine**: `>=18`

## Prerequisites

1. npm account with publish permission
2. Logged in locally:

```bash
npm whoami
```

If not logged in:

```bash
npm login
```

## Publish steps

From repository root:

```bash
cd packages/mcp
```

### 1) Update version

```bash
npm version patch
# or: npm version minor
# or: npm version major
```

### 2) Build and verify package contents

```bash
npm run build
npm pack --dry-run
```

Expected publish files (from `package.json`):

- `index.js`
- `validators.js`
- `manifest.json`
- `README.md`

### 3) Publish

```bash
npm publish
```

`blend-ui-mcp` is **unscoped**, so `--access public` is not required.

## Post-publish verification

```bash
npm view blend-ui-mcp version
```

Also validate install in a clean folder:

```bash
mkdir -p /tmp/mcp-publish-check && cd /tmp/mcp-publish-check
npm init -y
npm install blend-ui-mcp@latest
```

## Troubleshooting

### Version already exists

```bash
npm view blend-ui-mcp version
npm version patch
```

### Permission denied / 403

- Verify account access to package
- Confirm you are logged in with the correct npm account
- Ask package owners to grant maintainer access
