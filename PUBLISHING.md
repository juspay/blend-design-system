# Publishing Guide for Blend Design System

This guide explains how to publish the Blend Design System package to npm.

## Package Information

- **Package Name**: `@juspay/blend-design-system`
- **Current Version**: `0.2.43`
- **Registry**: npm (public)
- **Scope**: `@juspay`

## Prerequisites

1. **npm Account**: Ensure you have an npm account with publish permissions for the `@juspay` scope
2. **Authentication**: Login to npm using `npm login`
3. **Permissions**: You need to be added as a maintainer/owner of the `@juspay` organization

## Publishing Process

### 1. Prepare for Publishing

```bash
# Ensure you're on the main branch and up to date
git checkout main
git pull origin main

# Install dependencies
pnpm install

# Run tests and linting
pnpm lint
```

### 2. Version Management

Update the version in `packages/blend/package.json` before publishing:

```bash
# From root directory - patch version (1.0.0 -> 1.0.1)
pnpm version:blend patch

# Or minor version (1.0.0 -> 1.1.0)
pnpm version:blend minor

# Or major version (1.0.0 -> 2.0.0)
pnpm version:blend major

# Or specific version
cd packages/blend && npm version 1.2.3
```

### 3. Build the Package

```bash
# Build from root directory (monorepo)
pnpm -w run build:blend
```

This will:

- Run ESLint checks
- Compile TypeScript
- Bundle with Vite
- Generate type definitions

### 4. Test the Build (Optional)

```bash
# Dry run to see what would be published
pnpm -w run publish:blend:dry
```

### 5. Publish to npm

```bash
# Publish from root directory
pnpm -w run publish:blend
```

Or manually:

```bash
cd packages/blend
pnpm publish --access public
```

**Note**: The `--access public` flag is required for scoped packages (packages with `@` prefix like `@juspay/blend-design-system`) to make them publicly accessible on npm.

### 6. Verify Publication

1. Check the package on npm: https://www.npmjs.com/package/@juspay/blend-design-system
2. Test installation in a new project:

```bash
mkdir test-blend
cd test-blend
npm init -y
npm install @juspay/blend-design-system
```

## Package Structure

The published package includes:

```
dist/
├── main.js          # Main entry point
├── main.d.ts        # TypeScript definitions
├── style.css        # Bundled styles
└── assets/          # Additional assets
README.md            # Package documentation
```

## Version Strategy

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes
- **MINOR** (1.X.0): New features, backward compatible
- **PATCH** (1.0.X): Bug fixes, backward compatible

## For Other Contributors

If you want to publish your own version or fork:

### 1. Update Package Name

Edit `packages/blend/package.json`:

```json
{
    "name": "@juspay/blend-design-system",
    "version": "1.0.0",
    "repository": {
        "type": "git",
        "url": "https://github.com/your-username/your-repo.git"
    },
    "bugs": {
        "url": "https://github.com/your-username/your-repo/issues"
    },
    "homepage": "https://your-website.com/"
}
```

### 2. Update README

Update the installation instructions in `packages/blend/README.md`:

```bash
npm install @juspay/blend-design-system
```

### 3. Update Import Examples

```tsx
import { Button } from '@juspay/blend-design-system'
import '@juspay/blend-design-system/style.css'
```

## Troubleshooting

### Authentication Issues

```bash
# Login to npm
npm login

# Check if you're logged in
npm whoami

# Check access to @juspay scope
npm access list packages @juspay
```

### Build Issues

```bash
# Clean and rebuild
pnpm clean
pnpm install
pnpm build:blend
```

### Permission Issues

If you get permission errors:

1. Ensure you're a member of the `@juspay` organization
2. Check if the package exists and you have publish rights
3. Contact the organization admin to add you as a maintainer

### Version Conflicts

If the version already exists:

```bash
# Check current published version
npm view @juspay/blend-design-system version

# Update to a new version
cd packages/blend && npm version patch
```

## Automation (Future)

Consider setting up GitHub Actions for automated publishing:

1. **On Release**: Automatically publish when a GitHub release is created
2. **On Tag**: Publish when a version tag is pushed
3. **Manual Trigger**: Workflow dispatch for manual publishing

## Security

- Never commit npm tokens to the repository
- Use npm automation tokens for CI/CD
- Regularly audit dependencies: `npm audit`
- Keep the package updated with security patches

## Support

For questions about publishing:

1. Check npm documentation: https://docs.npmjs.com/
2. Contact the Juspay development team
3. Create an issue in the repository

---

**Note**: Always test the package thoroughly before publishing to ensure it works correctly for end users.
