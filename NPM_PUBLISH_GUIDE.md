# NPM Publishing Guide for Blend Design System

This guide provides step-by-step instructions for publishing the `@juspay/blend-design-system` package to npm.

## Quick Reference

| Command                    | Purpose                               |
| -------------------------- | ------------------------------------- |
| `npm whoami`               | Verify npm login                      |
| `pnpm build:blend`         | Build the package                     |
| `pnpm publish:blend:dry`   | Dry run (test what will be published) |
| `pnpm publish:blend`       | Publish to npm                        |
| `pnpm version:blend patch` | Bump patch version                    |

---

## Prerequisites

### 1. npm Account Setup

You need:

- An npm account ([signup here](https://www.npmjs.com/signup))
- Access to the `@juspay` organization
- Publish permissions for this package

### 2. Login to npm

```bash
npm login
# Enter your username, password, and OTP if 2FA is enabled

# Verify you're logged in
npm whoami

# Check @juspay scope access
npm access list packages @juspay
```

---

## Publishing Workflow

### Step 1: Prepare Your Environment

```bash
# Ensure you're on the correct branch
git checkout feature/shadow-dom-support
git pull origin feature/shadow-dom-support

# Install dependencies
pnpm install

# Ensure working tree is clean
git status
```

### Step 2: Check Current Published Version

```bash
# See what's currently on npm
npm view @juspay/blend-design-system version

# View full package info
npm view @juspay/blend-design-system
```

### Step 3: Update Version

The current version in `packages/blend/package.json` is `0.0.36-beta.1`.

**Choose version type:**

```bash
# From root directory - use these convenience scripts:

# Patch: 0.0.36-beta.1 → 0.0.37 (bug fixes)
pnpm version:blend patch

# Minor: 0.0.36-beta.1 → 0.1.0 (new features, backward compatible)
pnpm version:blend minor

# Major: 0.0.36-beta.1 → 1.0.0 (breaking changes)
pnpm version:blend major

# Or set specific version:
cd packages/blend && npm version 0.0.37-beta.2
```

### Step 4: Build the Package

```bash
# Build from root (recommended)
pnpm build:blend
```

This executes:

1. ✅ ESLint checks (`pnpm lint`)
2. ✅ TypeScript compilation (`tsc`)
3. ✅ Vite bundling (creates `dist/main.js`)
4. ✅ Type definitions (`dist/main.d.ts`)
5. ✅ CSS bundling (`dist/style.css`)

### Step 5: Dry Run (Optional but Recommended)

Test what will be published without actually publishing:

```bash
# From root
pnpm publish:blend:dry

# Or manually
cd packages/blend && npm publish --dry-run --access public
```

**What to check in dry run output:**

- Package name: `@juspay/blend-design-system`
- Version: matches what you set
- Files: includes `dist/` and `README.md`
- Total size: should be reasonable (typically < 5MB)

### Step 6: Publish to npm

```bash
# From root (recommended)
pnpm publish:blend

# Or manually
cd packages/blend && pnpm publish --access public
```

**Important:** The `--access public` flag is **required** for scoped packages (packages starting with `@`). Without it, npm will try to publish as private, which requires a paid plan.

### Step 7: Verify Publication

```bash
# Check the published version
npm view @juspay/blend-design-system version

# Visit npm page
open https://www.npmjs.com/package/@juspay/blend-design-system
```

### Step 8: Commit Version Changes

```bash
# Stage the version bump
git add packages/blend/package.json

# Commit
git commit -m "chore(release): bump version to X.X.X"

# Push to remote
git push origin feature/shadow-dom-support
```

---

## Testing the Published Package

Create a test project to verify the package works:

```bash
# Create test directory
mkdir test-blend-publish
cd test-blend-publish

# Initialize project
npm init -y

# Install your published package
npm install @juspay/blend-design-system

# Check installed version
cat node_modules/@juspay/blend-design-system/package.json | grep version

# Create a test file
cat > test.js << 'EOF'
import { Button } from '@juspay/blend-design-system';
console.log('Button component imported successfully:', Button);
EOF

# If using ESM, add to package.json
echo '{"type": "module"}' > package.json

# Run test
node test.js
```

---

## Package Structure

What gets published to npm:

```
@juspay/blend-design-system/
├── dist/
│   ├── main.js          # Main entry (ES modules)
│   ├── main.d.ts        # TypeScript definitions
│   ├── style.css        # Bundled CSS styles
│   └── assets/          # Static assets (if any)
├── README.md            # Package documentation
└── package.json         # Package metadata
```

Configured in `packages/blend/package.json`:

- `main`: `./dist/main.js`
- `types`: `./dist/main.d.ts`
- `exports`: ES modules + CSS entry point
- `files`: `["dist", "README.md"]` (whitelist approach)

---

## Versioning Strategy

We follow [Semantic Versioning](https://semver.org/):

| Version Change    | When to Use                       | Example                              |
| ----------------- | --------------------------------- | ------------------------------------ |
| **MAJOR** (X.0.0) | Breaking API changes              | Removing a component, changing props |
| **MINOR** (1.X.0) | New features, backward compatible | Adding a new component               |
| **PATCH** (1.0.X) | Bug fixes, backward compatible    | Fixing a styling issue               |

### Pre-release Versions

For beta/alpha releases:

```bash
# Beta version
npm version 0.1.0-beta.1

# Alpha version
npm version 0.1.0-alpha.1

# RC (Release Candidate)
npm version 0.1.0-rc.1
```

Users install pre-releases with:

```bash
npm install @juspay/blend-design-system@beta
# or specific version
npm install @juspay/blend-design-system@0.1.0-beta.1
```

---

## Troubleshooting

### Authentication Issues

```bash
# Check if logged in
npm whoami

# If not logged in
npm login

# Check npm config
npm config list

# For persistent login issues, clear credentials
npm logout
npm login
```

### Permission Denied

```bash
# Check package access
npm access list packages @juspay

# If you don't have access, contact the @juspay npm org admin
# to add you as a maintainer for this package
```

### Version Already Exists

```bash
# Check current npm version
npm view @juspay/blend-design-system version

# Bump to new version
pnpm version:blend patch
```

### Build Failures

```bash
# Clean and reinstall
pnpm clean
pnpm install

# Rebuild
pnpm build:blend
```

### Publish Fails with 403

Common causes:

1. **Version already exists** → Bump version
2. **Not logged in** → Run `npm login`
3. **No publish permission** → Contact org admin
4. **Package name taken** → Choose different name (unlikely for scoped packages)

---

## Available Scripts Reference

### Root package.json (`/`)

| Script              | Command                          |
| ------------------- | -------------------------------- |
| `build:blend`       | Build the blend package          |
| `publish:blend`     | Publish to npm                   |
| `publish:blend:dry` | Dry run publish                  |
| `version:blend`     | Bump version (patch/minor/major) |

### Blend package.json (`packages/blend/`)

| Script           | Command                        |
| ---------------- | ------------------------------ |
| `build`          | Lint + TypeScript + Vite build |
| `prepublishOnly` | Auto-runs build before publish |
| `lint`           | ESLint checks                  |

---

## Security Best Practices

1. **Never commit npm tokens** to the repository
2. **Use 2FA** on your npm account
3. **Regularly audit dependencies**: `pnpm audit`
4. **Keep tokens secure** in `~/.npmrc`, never in project files
5. **Review published files** with dry run before publishing

---

## Related Documentation

- [PUBLISHING.md](./PUBLISHING.md) - Original publishing guide
- [CHANGELOG.md](./docs/CHANGELOG.md) - Version history
- [npm documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)

---

## Need Help?

1. Check existing docs: `PUBLISHING.md`, `CHANGELOG.md`
2. npm docs: https://docs.npmjs.com/
3. Contact the Juspay development team
