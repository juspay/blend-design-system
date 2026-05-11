# Publishing Guide — CLI & MCP

> **For full infrastructure deployment (GCP/Firebase), see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

This file covers: Publishing `blend-studio` (CLI) and `blend-ui-mcp`.

> **Note:** `@juspay/blend-design-system` (component library) is already published. See its existing workflow for that.

- `packages/mcp/PUBLISHING.md` for `blend-ui-mcp`

## Preview releases (pkg.pr.new)

Every pull request to `main` or `dev` automatically publishes an ephemeral preview of `@juspay/blend-design-system` to [pkg.pr.new](https://pkg.pr.new). Reviewers and consumer teams can install the preview directly from a URL in the sticky PR comment:

```bash
pnpm add https://pkg.pr.new/@juspay/blend-design-system@<commit-sha>
```

These previews are **not** real npm releases. They are tied to the PR's HEAD commit, are ephemeral by design, and **must not be used in production**. Real releases continue to go through the changesets → beta / stable flow described below.

The preview is published by the `preview` job in `.github/workflows/ci.yml`, gated on a successful build (`needs: lint-build`), and uses the [pkg.pr.new GitHub App](https://github.com/apps/pkg-pr-new) — no `NPM_TOKEN` or secrets required.

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

## Publishing Order

```
1. blend-studio                   (CLI tool)
2. blend-ui-mcp                  (MCP package)
```

---

## Prerequisites

```bash
npm login
npm whoami
```

You need publish permissions for:

- `@juspay` scope (blend-design-system)
- Unscoped packages (CLI, MCP)

---

## 1. Publish CLI

### Build

```bash
cd packages/cli
pnpm build

# Verify binary works
node dist/index.js --help
```

### Dry Run

```bash
npm pack --dry-run
```

### Publish

```bash
npm publish --access public
```

### Verify

```bash
npm view blend-studio

# Test global install
npm install -g blend-studio
blend-studio --version
```

### Version Bump

```bash
# Patch (0.1.0 → 0.1.1)
npm version patch && npm publish

# Minor (0.1.0 → 0.2.0)
npm version minor && npm publish

# Major (0.1.0 → 1.0.0)
npm version major && npm publish
```

---

## 2. Publish MCP

See `packages/mcp/PUBLISHING.md` for the full MCP runbook.

Quick commands:

```bash
cd packages/mcp
npm version patch
npm run build
npm pack --dry-run
npm publish
```

---

## Automated Publishing via GitHub Actions

The CLI has a GitHub Actions workflow at `.github/workflows/publish-cli.yml`.

### Setup

1. Create an NPM token at [npmjs.com](https://www.npmjs.com) → Access Tokens → Generate New Token
2. Add `NPM_TOKEN` secret to GitHub:
    - Go to Settings → Secrets and variables → Actions
    - Create an Environment called `npm`
    - Add `NPM_TOKEN` secret

### Trigger

1. Go to Actions → **Publish CLI (blend-studio)**
2. Click **Run workflow**
3. Select:
    - **Version bump**: `patch`, `minor`, or `major`
    - **Tag**: `latest` (stable) or `beta` (pre-release)
    - **Confirm**: type `PUBLISH`

The workflow will:

1. Bump the CLI version
2. Build the CLI
3. Publish to NPM under the selected tag
4. Commit the version bump back to the repo

---

## Troubleshooting

### NPM 403 — Permission Denied

```bash
npm whoami
npm access list packages @juspay
# Contact org admin to add you as maintainer
```

### NPM 404 — Package Not Found

Package hasn't been published yet. Run `npm publish --access public`.

### Build Fails

```bash
rm -rf node_modules dist
pnpm install
pnpm build
```

### Token Engine Not Found in CLI

The token engine is now part of `@juspay/blend-design-system`. Ensure CLI's `package.json` references `@juspay/blend-design-system` with the tokens submodule:

```json
{
    "dependencies": {
        "@juspay/blend-design-system": "^0.x.x"
    }
}
```

Then run `pnpm install`.

---

## Security

- Never commit npm tokens to the repository
- Use npm automation tokens for CI/CD
- Regularly audit dependencies: `npm audit`
