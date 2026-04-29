# Blend Token Studio — API & CLI Reference

> **For infrastructure deployment (GCP/Firebase/NPM), see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

This file covers: Token Engine API, CLI commands, and local development.

---

## Two Components

| Component  | Package        | Purpose                       |
| ---------- | -------------- | ----------------------------- |
| **CLI**    | `blend-studio` | Developer commands for tokens |
| **Studio** | `blend-studio` | Visual web editor             |

### How They Work Together

```
┌─────────────────┐     ┌─────────────────────────────────────┐     ┌─────────────────┐
│   Studio Web    │────▶│  Token Engine (@juspay/blend-       │────▶│  Your React App │
│  (Edit Colors)  │     │   design-system/tokens)             │     │ (Use Tokens)    │
└─────────────────┘     └─────────────────────────────────────┘     └─────────────────┘
        │                              ▲                                    ▲
        │                              │                                    │
        ▼                              │                                    │
   brand.json ◀────────────────────────┴────────────────────────────────────┘
   (download/pull)                                           CLI
```

---

## Quick Start (Local Development)

### Prerequisites

- Node.js 18+
- pnpm 10+ (`npm install -g pnpm`)

### Run in 4 Commands

```bash
# 1. Install
pnpm install

# 2. Build packages
cd packages/token-engine && pnpm build && cd ../cli && pnpm build && cd ../..

# 3. Start Studio
cd apps/blend-studio && pnpm dev

# 4. Open in browser
# http://localhost:3000/studio/test
```

> **Note**: The test page at `/studio/test` is always accessible without authentication.

---

## Token Engine API

### Import

```typescript
// Main import (includes React components)
import { resolveBrandTokens } from '@juspay/blend-design-system/tokens'

// Server-safe import (no React components)
import { resolveBrandTokens } from '@juspay/blend-design-system/tokens/server'
```

### Functions

#### `resolveBrandTokens(brandConfig, theme)`

Resolves a brand configuration into component tokens.

```typescript
import {
    resolveBrandTokens,
    type BrandConfig,
} from '@juspay/blend-design-system/tokens'

const brand: BrandConfig = {
    brandId: 'my-brand',
    name: 'My Brand',
    version: '1.0.0',
    colors: {
        primary: { '500': '#E31837' },
        gray: { '100': '#F3F4F6' },
    },
    radius: {
        '8': '8px',
        '10': '10px',
    },
}

const lightTokens = resolveBrandTokens(brand, 'light')
const darkTokens = resolveBrandTokens(brand, 'dark')

// Returns tokens for 26+ components
console.log(Object.keys(lightTokens))
// ['BUTTONV2', 'ALERTV2', 'TEXTINPUTV2', ...]
```

#### `validateBrandConfig(brandConfig)`

Validates a brand configuration.

```typescript
import { validateBrandConfig } from '@juspay/blend-design-system/tokens'

const result = validateBrandConfig(brand)

if (result.valid) {
    console.log('Valid!')
} else {
    result.errors.forEach((err) => {
        console.log(`${err.path}: ${err.message}`)
    })
    result.warnings.forEach((warn) => {
        console.log(`Warning: ${warn.path}: ${warn.message}`)
    })
}
```

#### `generateColorScale(hex)`

Generates a full color scale (50-950) from a single hex color.

```typescript
import { generateColorScale } from '@juspay/blend-design-system/tokens'

const scale = generateColorScale('#E31837')
// Returns: { '50': '#FFF1F3', '100': '#FFE0E4', ..., '500': '#E31837', ..., '950': '#4C050D' }
```

#### `diffBrandConfigs(oldConfig, newConfig)`

Compares two brand configurations.

```typescript
import { diffBrandConfigs } from '@juspay/blend-design-system/tokens'

const diff = diffBrandConfigs(oldBrand, newBrand)
// Returns array of changes:
// [{ path: 'colors.primary.500', oldValue: '#E31837', newValue: '#FF0000' }, ...]
```

### Types

```typescript
interface BrandConfig {
    brandId: string
    name: string
    version: string
    colors?: BrandColors
    radius?: RadiusOverrides
    shadows?: ShadowOverrides
    font?: FontOverrides
}

interface BrandColors {
    primary?: ColorOverrides
    gray?: ColorOverrides
    red?: ColorOverrides
    green?: ColorOverrides
    yellow?: ColorOverrides
    orange?: ColorOverrides
    purple?: ColorOverrides
}

type ColorOverrides = Partial<Record<string, string>>
type RadiusOverrides = Partial<Record<string, string>>

interface ValidationResult {
    valid: boolean
    errors: ValidationError[]
    warnings: ValidationWarning[]
}
```

---

## CLI Reference

### Installation

```bash
# Global install
npm install -g blend-studio

# Or use npx (no install needed)
npx blend-studio <command>
```

### Commands

#### `init` — Initialize Project

```bash
blend-studio init [options]

Options:
  --defaults    Skip prompts, use defaults
  --force       Overwrite existing files
  --template    Template: nextjs, vite, cra

Examples:
  blend-studio init
  blend-studio init --defaults --template nextjs
```

Creates:

- `blend.config.json` — Configuration
- `src/blend/provider.tsx` — React provider
- `src/blend/tokens.ts` — Token exports

#### `brand` — Apply Branding

```bash
blend-studio brand [options]

Options:
  --preset <name>      Preset: blend, hdfc, neobank, fintech
  --primary <hex>      Primary color (#E31837)
  --secondary <hex>    Secondary color
  --radius <type>      Border radius: sharp, soft, round, pill

Examples:
  blend-studio brand --preset hdfc
  blend-studio brand --primary "#E31837" --radius soft
```

#### `pull` — Pull from Studio

```bash
blend-studio pull <branch> [options]

Options:
  --version <v>    Pull specific version
  --theme <mode>   Theme: light, dark

Examples:
  blend-studio pull hdfc/retail
  blend-studio pull hdfc/retail --version 1.2.0
```

#### `push` — Push to Studio

```bash
blend-studio push [branch] [options]

Options:
  --new           Create branch if not exists
  --publish       Publish as version
  --minor         B minor version
  --major         Bump major version
  --patch         Bump patch version

Examples:
  blend-studio push hdfc/retail
  blend-studio push mycompany/brand --new
  blend-studio push hdfc/retail --publish --minor
```

#### `list` — List Branches

```bash
blend-studio list [options]

Options:
  --status <filter>    Filter: draft, published, archived
  --search <query>     Search query
  --json               JSON output
  --limit <n>          Max results
```

#### `login` / `logout` — Authentication

```bash
# Interactive login
blend-studio login

# With token (for CI/CD)
blend-studio login --token "your-firebase-token"

# Check current user
blend-studio whoami

# Logout
blend-studio logout
```

#### `validate` — Validate Config

```bash
blend-studio validate [file]

Examples:
  blend-studio validate
  blend-studio validate ./configs/brand.json
```

#### `generate` — Generate Tokens Offline

```bash
blend-studio generate <file> [options]

Options:
  --output <path>   Output directory
  --theme <mode>    Theme: light, dark, both
  --format <type>   Format: ts, js, json

Examples:
  blend-studio generate ./brand.json
  blend-studio generate ./brand.json --theme both
```

#### `preview` — Open Browser Preview

```bash
blend-studio preview [options]

Options:
  --port <port>    Dev server port (default: 3000)
```

---

## Testing Locally

### Test Studio (Without Firebase)

```bash
cd apps/blend-studio
pnpm dev
# Open: http://localhost:3000/studio/test
```

You can edit primary color, border radius, see live preview, and export brand.json.

### Test Studio (With Firebase)

1. Create `.env` with Firebase credentials (see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md))
2. Restart: `pnpm dev`
3. Open: `http://localhost:3000/`
4. Login with Google

### Test CLI

```bash
cd packages/cli && pnpm build && pnpm link --global

mkdir /tmp/test-blend && cd /tmp/test-blend
blend-studio init --defaults
blend-studio brand --preset hdfc
cat src/blend/brand.json
```

### Test Token Engine

```bash
cd packages/blend && pnpm build

node -e "
const { resolveBrandTokens } = require('@juspay/blend-design-system/tokens');
const tokens = resolveBrandTokens({
  brandId: 'test', name: 'Test', version: '1.0.0',
  colors: { primary: { '500': '#E31837' } }
}, 'light');
console.log('Components:', Object.keys(tokens).length);
"
```

---

## Data Architecture

### PostgreSQL vs Firestore Split

| Data Type                 | Storage             | Why                             |
| ------------------------- | ------------------- | ------------------------------- |
| Users, Teams, Memberships | PostgreSQL          | Relational data, fuzzy search   |
| Roles, Permissions        | PostgreSQL          | Complex queries, joins          |
| Authentication            | PostgreSQL+Firebase | Firebase Auth → PostgreSQL sync |
| Brand configs (JSON)      | Firestore           | Document storage, real-time     |
| Branches                  | Firestore           | JSON blobs, live preview        |
| Versions                  | Firestore           | Immutable snapshots             |
| Snapshots                 | Firestore           | Auto-saved drafts               |

### Team Roles & Permissions

| Role       | Manage Team | Invite Members | Create Branches | Edit Branches | Publish | Delete Branches |
| ---------- | ----------- | -------------- | --------------- | ------------- | ------- | --------------- |
| **Owner**  | ✅          | ✅             | ✅              | ✅            | ✅      | ✅              |
| **Admin**  | ✅          | ✅             | ✅              | ✅            | ✅      | ✅              |
| **Editor** | ❌          | ❌             | ✅              | ✅            | ✅      | ❌              |
| **Viewer** | ❌          | ❌             | ❌              | ❌            | ❌      | ❌              |

### User Preferences (localStorage)

```typescript
// Key: 'blend_studio_preferences'
interface UserPreferences {
    theme: 'light' | 'dark' | 'system'
    defaultTheme: 'light' | 'dark'
    emailNotifications: boolean
    branchCreatedNotifications: boolean
    branchPublishedNotifications: boolean
    teamInviteNotifications: boolean
}

// Key: 'blend_studio_onboarding'
interface OnboardingState {
    hasCompletedOnboarding: boolean
    completedAt: string | null
    skippedAt: string | null
}
```

---

## Troubleshooting

### "Nothing found" at /test

```
✅ http://localhost:3000/studio/test
❌ http://localhost:3000/test
```

### Module not found @juspay/blend-design-system/tokens

```bash
cd packages/blend && pnpm build
```

### CLI command not found

```bash
cd packages/cli && pnpm build && pnpm link --global
```

### Build TypeScript Errors

```bash
rm -rf node_modules dist && pnpm install && pnpm build
```

### Debug Mode

```bash
DEBUG=* blend-studio init
firebase deploy --debug
```

---

## Quick Reference

```bash
# === LOCAL DEVELOPMENT ===
pnpm install                                    # Install everything
cd packages/blend && pnpm build                 # Build blend (includes tokens)
cd packages/cli && pnpm build                   # Build CLI
cd apps/blend-studio && pnpm dev                # Start Studio

# === TESTING ===
http://localhost:3000/studio/test               # Open Studio
blend-studio init --defaults              # Test CLI

# === FOR DEPLOYMENT ===
See DEPLOYMENT_GUIDE.md
```
