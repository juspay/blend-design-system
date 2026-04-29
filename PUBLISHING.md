# Publishing Guide — CLI & MCP

> **For full infrastructure deployment (GCP/Firebase), see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

This file covers: Publishing `blend-studio` (CLI) and `blend-ui-mcp`.

> **Note:** `@juspay/blend-design-system` (component library) is already published. See its existing workflow for that.

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
