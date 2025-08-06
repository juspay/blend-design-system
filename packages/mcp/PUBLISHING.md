# Publishing Guide for Blend MCP Server

This guide explains how to publish the Blend MCP Server to npm.

## Prerequisites

1. **npm account**: You need an npm account with access to the `@design-juspay` organization
2. **npm CLI**: Make sure you have npm CLI installed and are logged in
3. **Node.js**: Version 18 or higher

## Pre-publishing Checklist

- [ ] Version number is correct in `package.json`
- [ ] All dependencies are properly listed
- [ ] README.md is up to date
- [ ] Meta files are bundled in `meta/` directory
- [ ] Build script works: `npm run build`
- [ ] Package files are correctly specified in `files` array

## Publishing Steps

### 1. Verify Package Contents

Check what will be included in the published package:

```bash
cd packages/mcp
npm pack --dry-run
```

### 2. Test the Package Locally

Test the package locally before publishing:

```bash
# Build the package
npm run build

# Test the server starts correctly
node index.js
# (Press Ctrl+C to stop)
```

### 3. Login to npm

Make sure you're logged in to npm:

```bash
npm whoami
# If not logged in:
npm login
```

### 4. Publish to npm

For first-time publishing:

```bash
npm publish --access public
```

For subsequent updates:

```bash
# Update version first
npm version patch  # or minor/major
npm publish
```

### 5. Verify Publication

Check that the package was published successfully:

```bash
npm info @design-juspay/blend-mcp-server
```

Test installation:

```bash
npx @design-juspay/blend-mcp-server --help
```

## Version Management

Follow semantic versioning:

- **Patch** (1.0.1): Bug fixes, small improvements
- **Minor** (1.1.0): New features, backward compatible
- **Major** (2.0.0): Breaking changes

Update version using npm:

```bash
npm version patch   # 1.0.0 -> 1.0.1
npm version minor   # 1.0.0 -> 1.1.0
npm version major   # 1.0.0 -> 2.0.0
```

## Troubleshooting

### Permission Issues

If you get permission errors:

1. Make sure you're a member of the `@design-juspay` organization on npm
2. Contact the organization admin to add you
3. Alternatively, publish under your own scope: `@yourusername/blend-mcp-server`

### Package Already Exists

If the package name is taken:

1. Choose a different name in `package.json`
2. Update all references in README.md
3. Consider using a more specific name like `@design-juspay/blend-design-system-mcp`

### Build Failures

If the build fails:

1. Check Node.js version (must be 18+)
2. Verify all dependencies are installed: `npm install`
3. Check file permissions on `index.js`

## Post-Publishing

After successful publishing:

1. Update the main repository README to mention the npm package
2. Create a GitHub release with changelog
3. Update documentation with new installation instructions
4. Test the package in different environments

## Automation (Optional)

Consider setting up GitHub Actions for automated publishing:

1. Create `.github/workflows/publish.yml`
2. Set up npm token as GitHub secret
3. Trigger publishing on version tags

This ensures consistent and reliable publishing process.
