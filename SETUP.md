# Blend Design System — Developer Setup Guide

> **For infrastructure deployment (GCP/Firebase/NPM), see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**  
> **For Token Engine API & CLI reference, see [BLEND_TOKEN_STUDIO.md](./BLEND_TOKEN_STUDIO.md)**

This file covers: How to install and use Blend components in your project.

---

## Overview

Blend Design System has two pieces:

| Piece                 | Package                       | What it does                                                 |
| --------------------- | ----------------------------- | ------------------------------------------------------------ |
| **Component Library** | `@juspay/blend-design-system` | React components (Button, Input, Alert, etc.) + Token Engine |
| **CLI**               | `blend-token-studio`          | Scaffolds projects, generates tokens, syncs with Studio      |

The flow:

```
Studio (web editor)  →  brand.json  →  CLI pull  →  tokens.ts  →  <ThemeProvider>  →  Your App
```

You write ~20 lines of JSON (your brand colors, radius, font). The token engine expands it into ~10,000+ resolved token values that every Blend component consumes.

---

## Quick Start (5 minutes)

```bash
# 1. Install the component library
npm install @juspay/blend-design-system styled-components

# 2. Scaffold your project
npx blend-token-studio init

# 3. Apply a brand preset
npx blend-token-studio brand --preset juspay

# 4. Wrap your app
# In your root layout:
import { BlendProvider } from './src/blend/provider'
<BlendProvider><App /></BlendProvider>
```

That's it. All Blend components now use your brand colors and radius.

---

## Installing the Component Library

### Prerequisites

- React 18+
- styled-components 6+

### Install

```bash
# With pnpm (recommended)
pnpm add @juspay/blend-design-system styled-components

# With npm
npm install @juspay/blend-design-system styled-components

# With yarn
yarn add @juspay/blend-design-system styled-components
```

### Verify

```tsx
import { ButtonV2 } from '@juspay/blend-design-system'

function App() {
    return <ButtonV2>Click me</ButtonV2>
}
```

If this renders, the component library is installed correctly.

---

## CLI Setup & Authentication

### Install the CLI

The CLI is used via `npx` — no global install needed:

```bash
npx blend-token-studio --version
```

### Login

```bash
# Interactive login (opens prompt for JWT token)
npx blend-token-studio login

# Or with a token directly
npx blend-token-studio login --token <your-jwt>

# Or via environment variable (for CI)
export BLEND_STUDIO_API_TOKEN=<your-jwt>
```

### Get an API Token

1. Open [Blend Token Studio](https://studio.blend.juspay.design)
2. Sign in with Google
3. Open the user menu (top right) → **API Token (for CLI)**
4. Copy the token

### Verify Authentication

```bash
npx blend-token-studio whoami
# Output: Logged in as: you@company.com
```

### Logout

```bash
npx blend-token-studio logout
```

---

## Scaffolding Your Project

```bash
npx blend-token-studio init
```

This command:

1. **Detects** your project type (Next.js, Vite, CRA, or ReScript)
2. **Installs** missing dependencies (`@juspay/blend-design-system`, `styled-components`)
3. **Creates** `blend.config.json` with defaults
4. **Generates** `src/blend/provider.tsx` — the wrapper component
5. **Generates** `src/blend/tokens.ts` — default (Blend) tokens

### Options

| Flag         | Description                |
| ------------ | -------------------------- |
| `--defaults` | Skip prompts, use defaults |
| `--force`    | Overwrite existing files   |

### What gets created

```
your-project/
├── blend.config.json       # Project config (brand, output dir, studio URL)
└── src/blend/
    ├── provider.tsx         # <BlendProvider> wrapper — safe to edit
    └── tokens.ts            # Resolved tokens — auto-generated, don't edit
```

### Use the provider

```tsx
// app/layout.tsx (Next.js) or src/main.tsx (Vite)
import { BlendProvider } from './src/blend/provider'

export default function RootLayout({ children }) {
    return <BlendProvider theme="light">{children}</BlendProvider>
}
```

---

## Applying a Brand

### Interactive

```bash
npx blend-token-studio brand
```

Walks you through picking a primary color, radius style, etc.

### Using a preset

```bash
npx blend-token-studio brand --preset juspay
```

Available presets: `blend`, `juspay`, `purple`, `green`, `orange`

### With specific colors

```bash
npx blend-token-studio brand --primary "#E11D48" --radius rounded
```

### What this does

1. Updates `src/blend/tokens.ts` with your branded tokens
2. All Blend components immediately reflect your brand when the app reloads

---

## Using Blend Token Studio

Blend Token Studio is the web UI for visually editing brand tokens.

### Access

Open [studio.blend.juspay.design](https://studio.blend.juspay.design) and sign in with Google.

### Workflow

1. **Create a Workspace** — each workspace holds a brand config
2. **Edit tokens** — change colors, radius, shadows, typography, per-component overrides
3. **Preview** — see live component previews with your brand
4. **Publish** — version your brand config
5. **Pull** — CLI downloads the published config into your project

### Vocabulary

| Developer Concept | Studio UI Label |
| ----------------- | --------------- |
| Branch            | Workspace       |
| Default Branch    | Master Theme    |
| Fork              | Duplicate       |
| Merge Request     | Change Request  |
| Publish           | Release         |

---

## Pulling Tokens from Studio

```bash
# Pull the latest version of a workspace
npx blend-token-studio pull my-org/retail

# Pull a specific version
npx blend-token-studio pull my-org/retail --version 1.2.0

# Pull with ReScript output
npx blend-token-studio pull my-org/retail --language rescript

# Pull for CI (no prompts, JSON output)
npx blend-token-studio pull my-org/retail --ci --format json
```

### What gets generated

| File          | Contents                                      |
| ------------- | --------------------------------------------- |
| `tokens.ts`   | Resolved light + dark tokens as TypeScript    |
| `brand.json`  | The raw brand config (for version control)    |
| `studio.json` | Metadata (branch ID, version, pull timestamp) |

### Offline generation

If you have a `brand.json` but no Studio access:

```bash
npx blend-token-studio generate ./brand.json
npx blend-token-studio generate ./brand.json --language rescript
```

---

## ReScript Projects

### Detection

The CLI auto-detects ReScript projects via:

- `rescript.json` or `bsconfig.json` in project root
- `rescript` or `@rescript/core` in dependencies

### Setup

```bash
npx blend-token-studio init
# The CLI will detect ReScript and configure accordingly
```

### Generate ReScript tokens

```bash
# From Studio
npx blend-token-studio pull my-org/retail --language rescript

# From local brand.json
npx blend-token-studio generate ./brand.json --language rescript
```

### Output

Generates `src/blend/BlendTokens.res`:

```rescript
/** Light theme */
let componentTokens: JSON.t = %raw(`{ ... }`)

/** Dark theme */
let darkComponentTokens: JSON.t = %raw(`{ ... }`)
```

---

## CI/CD Integration

### Environment Variables

| Variable                 | Description              | Required |
| ------------------------ | ------------------------ | -------- |
| `BLEND_STUDIO_API_TOKEN` | JWT token for Studio API | Yes      |
| `BLEND_STUDIO_API_URL`   | Override Studio API URL  | No       |

### Example GitHub Actions workflow

```yaml
name: Update Tokens

on:
    workflow_dispatch:

jobs:
    pull-tokens:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4

            - uses: actions/setup-node@v4
              with:
                  node-version: 22

            - name: Pull tokens
              env:
                  BLEND_STUDIO_API_TOKEN: ${{ secrets.BLEND_STUDIO_API_TOKEN }}
              run: npx blend-token-studio pull my-org/retail --ci --format json

            - name: Commit updated tokens
              run: |
                  git config user.name "github-actions[bot]"
                  git config user.email "github-actions[bot]@users.noreply.github.com"
                  git add src/blend/
                  git diff --cached --quiet || git commit -m "chore: update brand tokens"
                  git push
```

### CLI exit codes

| Code | Meaning                             |
| ---- | ----------------------------------- |
| 0    | Success                             |
| 1    | Failure (auth, network, validation) |

The `--ci` flag ensures:

- No interactive prompts
- Non-zero exit on failure
- `--format json` outputs machine-readable JSON

---

## Token Inheritance & Locking

Blend uses a 3-tier inheritance model:

```
Blend Foundation (default theme)
  └── Org Master Theme (org-level overrides, some tokens locked)
        └── Product Workspace (product overrides, respects locks)
```

### How it works

1. The org admin sets brand defaults and marks certain tokens as **locked** (e.g. primary color must stay blue)
2. Product teams create workspaces that inherit from the org master
3. Product teams can override any non-locked token
4. If a product tries to override a locked token, the system blocks it

### Lock management (Studio)

Org admins can lock tokens in Studio:

1. Go to Organization Settings → Token Locks
2. Add a token path (e.g. `colors.primary.500`) and a reason
3. All child workspaces must respect this lock

### Change Requests

When an editor wants to promote changes from a workspace to the master theme:

1. Create a **Change Request** (Merge Request)
2. Org admin reviews the diff
3. Approve or reject with comments

---

## GitHub Actions — Publishing the CLI

> **For full publishing workflow, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md#phase-5-npm-publishing)**

### Setup

1. Create an NPM token at [npmjs.com](https://www.npmjs.com) → Access Tokens → Generate New Token
2. Add the secret to your GitHub repository:
    - Go to Settings → Secrets and variables → Actions
    - Create an Environment called `npm`
    - Add `NPM_TOKEN` secret to that environment

### Trigger

1. Go to Actions → **Publish CLI (blend-token-studio)**
2. Click **Run workflow**
3. Select version bump type, tag, and confirm

---

## Troubleshooting

### "Not authenticated" error

```bash
npx blend-token-studio login
# Or: export BLEND_STUDIO_API_TOKEN=<your-token>
```

### "Token has expired"

Get a fresh token from Studio → User Menu → API Token.

### "blend.config.json not found"

```bash
npx blend-token-studio init
```

### Components don't reflect my brand

1. Make sure `<BlendProvider>` wraps your app
2. Make sure `tokens.ts` has actual values (not empty `{}`)
3. Run `npx blend-token-studio brand` to regenerate

### "Invalid hex color" validation error

Brand config colors must be in `#RGB` or `#RRGGBB` format. No `rgb()`, `hsl()`, or named colors.

### WCAG contrast warnings

The validator checks color scales against white and dark backgrounds. Pick a darker or lighter shade for that color.

### ReScript output not generated

```bash
npx blend-token-studio pull my-org/retail --language rescript
npx blend-token-studio generate ./brand.json --language rescript
```
