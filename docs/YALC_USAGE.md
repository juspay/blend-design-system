# Using Blend Design System with Yalc

This guide explains how to use the Blend Design System package locally with yalc for development and testing before publishing to npm.

## What is Yalc?

Yalc is a tool for managing local package development. It's better than `npm link` or `pnpm link` because it actually simulates publishing by copying files to a local store, avoiding the issues that symlinks can cause.

## Prerequisites

Yalc has been installed globally on this machine. If you need to install it on another machine:

```bash
pnpm add -g yalc
# or
npm install -g yalc
```

## Quick Start

### 1. Publish to Yalc (Already Done! ✓)

The package has already been published to yalc. You can verify by running:

```bash
yalc installations show @juspay/blend-design-system
```

### 2. Use in Another Project

Navigate to your consuming project and run:

```bash
yalc add @juspay/blend-design-system
```

This will:

- Copy the package from yalc store to your `node_modules`
- Add a `.yalc` folder to your project
- Update your `package.json` with a `file:.yalc/...` reference

### 3. Install Dependencies

After adding with yalc, install dependencies:

```bash
npm install
# or
pnpm install
```

### 4. Use the Package

Import and use as normal:

```tsx
import { Button, ThemeProvider } from '@juspay/blend-design-system'
import '@juspay/blend-design-system/style.css'

function App() {
    return (
        <ThemeProvider>
            <Button>Click me</Button>
        </ThemeProvider>
    )
}
```

## Development Workflow

### Making Changes and Updating

When you make changes to the Blend package:

**Option 1: Using the convenience script (Recommended)**

From the root of this monorepo:

```bash
pnpm yalc:push
```

This will automatically:

1. Build the package
2. Push the updates to yalc
3. Update all projects that have added the package via yalc

**Option 2: Manual steps**

```bash
# 1. Build the package
pnpm build:blend

# 2. Push updates
cd packages/blend
yalc push
```

### Initial Publish (when needed)

To publish/re-publish to yalc:

```bash
pnpm yalc:publish
```

Or manually:

```bash
cd packages/blend
yalc publish
```

## Common Commands

### From the Root Directory

```bash
# Publish to yalc
pnpm yalc:publish

# Build and push updates to all linked projects
pnpm yalc:push

# Build the package (without publishing)
pnpm build:blend
```

### From Your Consuming Project

```bash
# Add the package
yalc add @juspay/blend-design-system

# Update to latest version from yalc
yalc update @juspay/blend-design-system

# Remove yalc package and restore from npm (if previously installed)
yalc remove @juspay/blend-design-system

# Remove all yalc packages
yalc remove --all

# Show what packages are using this package via yalc
yalc installations show @juspay/blend-design-system
```

## Cleanup

### In Your Consuming Project

When you're done with local development and want to switch back to the npm version:

```bash
# Remove the yalc package
yalc remove @juspay/blend-design-system

# Install the npm version
pnpm install @juspay/blend-design-system
# or
npm install @juspay/blend-design-system
```

### Clean Yalc Store (Optional)

To clean up the global yalc store:

```bash
yalc installations clean @juspay/blend-design-system
```

## Using Within This Monorepo

If you want to use the yalc version in the `apps/site` or other apps within this monorepo:

```bash
# Navigate to the app
cd apps/site

# Add the package via yalc
yalc add @juspay/blend-design-system

# Install dependencies
pnpm install
```

Then whenever you make changes:

```bash
# From the root directory
pnpm yalc:push
```

The app will automatically receive the updates.

## Advantages Over npm link

1. **No symlink issues**: Yalc copies files, avoiding common symlink problems
2. **Closer to real publishing**: Simulates the actual npm publish process
3. **Works better with bundlers**: Vite, Webpack, etc. handle it better
4. **Automatic updates**: `yalc push` updates all linked projects
5. **Preserves dependencies**: Package dependencies work correctly

## Troubleshooting

### Package not updating in consuming project

Try:

```bash
# In consuming project
yalc update @juspay/blend-design-system
pnpm install

# Or force push from the package
cd packages/blend
yalc push --replace
```

### Build errors in consuming project

Make sure you've installed dependencies after adding the yalc package:

```bash
pnpm install
# or
npm install
```

### Want to see what's in the yalc store

```bash
yalc installations show @juspay/blend-design-system
```

### Reset everything

```bash
# In consuming project
yalc remove --all
rm -rf node_modules .yalc
pnpm install

# In this monorepo
cd packages/blend
yalc publish --push
```

## Notes

- The yalc store is located at `~/.yalc`
- Yalc doesn't interfere with git - the `.yalc` folder should be gitignored
- Always remove yalc packages before committing to ensure your project uses the npm version in production
- The `file:.yalc/...` reference in package.json should not be committed

## Next Steps

After testing with yalc and you're satisfied with the changes:

1. Remove the yalc package from your projects
2. Update the version in `packages/blend/package.json`
3. Follow the [PUBLISHING.md](./PUBLISHING.md) guide to publish to npm

---

For more information about yalc, visit: https://github.com/wclr/yalc
