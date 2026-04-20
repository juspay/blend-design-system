# Blend Token Studio — Platform Design Document

> **Status**: Proposal · **Version**: 1.0 · **Author**: Blend Design System Team

---

## 1. Executive Summary

Blend Token Studio is a **white-label component customization platform** built on top of the Blend Design System. It lets any team — internal product squads, bank partners, fintech startups — fork the Blend component library, customize every visual token (color, radius, spacing, typography) through a web dashboard, and export a production-ready `componentTokens` object that drops straight into `<ThemeProvider>`.

Think of it as **shadcn/ui CLI v4 meets GitHub branching**, but for design tokens specifically.

---

## 1.1 Quick Start (End-to-End) — Make It Work

This section is the **practical setup guide** for running the full Token Studio flow:

- **Dashboard**: edit brand configs (JSON) + preview components
- **API**: store branches, versions, and artifacts
- **CLI**: pull a published brand and generate TypeScript for a consumer app
- **Consumer app**: apply the generated `componentTokens` via `ThemeProvider`

### Step A — See it working in this repo (today)

The repo already demonstrates the critical platform contract: a **small brand config** can deterministically produce **component token anatomy**.

1. Open:
    - `apps/site/src/demos/MultiSelectDemoV2.tsx`
2. Use the **White Label Studio** section.
3. Observe the “Token Studio Export” panel:
    - **Layer 1**: `brandConfig` (designer-editable JSON)
    - **Layer 2**: CSS variables (optional runtime layer for the platform)
    - **Layer 3**: `ThemeProvider.componentTokens.MULTI_SELECT_V2` (what the component library consumes)

### Step B — Platform repos/services (recommended layout)

To ship this as a real product, keep platform code **outside** `packages/blend` (the component library). Suggested structure:

```
token-studio/
├── apps/
│   ├── dashboard/                 # Next.js dashboard UI
│   └── preview-host/              # Renders Blend components in an iframe
├── packages/
│   ├── token-engine/              # resolveTokens(), diffTokens(), validateTokens()
│   ├── token-schema/              # JSON schemas + TypeScript types for brand config
│   └── cli/                       # blend-cli pull/push/diff/watch
└── services/
    └── api/                       # branches, publish, artifacts, auth, sharing
```

### Step C — Brand config (source of truth)

The dashboard edits and the API stores a **small JSON** that is stable across time and easy to diff/merge:

```json
{
    "brandId": "hdfc/retail",
    "version": "1.0.0",
    "semantic": {
        "brand": { "primary": "#E31837" },
        "border": { "default": "#E31837" },
        "radius": { "trigger": "4px", "menu": "4px" }
    }
}
```

### Step D — Token engine: resolve Brand → Component tokens

The token engine produces the **exact object** the component library expects:

```ts
const componentTokens = resolveComponentTokens(brandConfig)
// { MULTI_SELECT_V2: { sm: {...}, lg: {...} }, SINGLE_SELECT_V2: ... }
```

### Step E — Publish + pull via CLI

1. User clicks **Publish** in dashboard
2. API stores an immutable version and generates an artifact
3. Consumer runs:

```bash
blend-cli pull hdfc/retail --output ./src/tokens/
```

This writes:

```ts
// src/tokens/hdfc-retail.componentTokens.ts
export const COMPONENT_TOKENS = { MULTI_SELECT_V2: /* resolved tokens */ }
```

### Step F — Apply in consumer app

```tsx
import { ThemeProvider, Theme } from '@blend-design/blend'
import { COMPONENT_TOKENS } from './tokens/hdfc-retail.componentTokens'

export function App() {
    return (
        <ThemeProvider theme={Theme.LIGHT} componentTokens={COMPONENT_TOKENS}>
            <YourApp />
        </ThemeProvider>
    )
}
```

---

## 2. The Problem

Today, if HDFC Bank wants red borders on every dropdown and 4px corners instead of 10px corners, they have three bad options:

| Option                          | Pain                                         |
| ------------------------------- | -------------------------------------------- |
| Override CSS globally           | Fragile, specificity wars, breaks on updates |
| Fork the entire design system   | Massive maintenance burden                   |
| Request changes from Blend team | Slow, not scalable across dozens of clients  |

What they actually need is a **structured override layer** — something the component system was designed to accept, with a UI to manage it.

---

## 3. Token Architecture

The platform rests on a **three-tier token system**:

```
Foundation Tokens  →  Semantic Tokens  →  Component Tokens
     (raw values)        (roles/intent)      (anatomy-mapped)
```

### Tier 1 — Foundation Tokens (`FOUNDATION_THEME`)

Raw design primitives. Never consumed directly by components.

```
colors.primary[600]   = "#4A6FA5"
colors.gray[200]      = "#EAECF0"
unit[10]              = "10px"
font.weight[500]      = 500
shadows.xs            = "0 1px 2px rgba(0,0,0,0.05)"
```

**Rule**: Foundation tokens never change per brand. They are the universe of possible values.

---

### Tier 2 — Semantic Tokens _(currently missing — must add)_

Named by **role** not value. This is the white-label injection point.

```typescript
// semantic.light.ts
export const semanticLight = {
    brand: {
        primary: FOUNDATION_THEME.colors.primary[600],
        primaryHover: FOUNDATION_THEME.colors.primary[700],
        error: FOUNDATION_THEME.colors.red[600],
    },
    surface: {
        default: FOUNDATION_THEME.colors.gray[0],
        subtle: FOUNDATION_THEME.colors.gray[25],
        muted: FOUNDATION_THEME.colors.gray[50],
    },
    border: {
        default: FOUNDATION_THEME.colors.gray[200],
        strong: FOUNDATION_THEME.colors.gray[400],
        focus: FOUNDATION_THEME.colors.primary[600],
    },
    text: {
        primary: FOUNDATION_THEME.colors.gray[700],
        secondary: FOUNDATION_THEME.colors.gray[400],
        disabled: FOUNDATION_THEME.colors.gray[300],
    },
    radius: {
        trigger: FOUNDATION_THEME.unit[10],
        menu: FOUNDATION_THEME.unit[8],
        item: FOUNDATION_THEME.unit[10],
        badge: FOUNDATION_THEME.unit[4],
    },
}
```

A brand override only needs to change semantic tokens:

```typescript
// hdfc.semantic.ts
export const hdfcSemantic = {
    ...semanticLight,
    brand: {
        primary: '#E31837',
        primaryHover: '#C01530',
        error: '#E31837',
    },
    border: {
        default: '#E31837',
        strong: '#E31837',
        focus: '#E31837',
    },
    radius: {
        trigger: '4px',
        menu: '4px',
        item: '4px',
        badge: '2px',
    },
}
```

---

### Tier 3 — Component Tokens (`MultiSelectV2TokensType`, etc.)

Anatomy-mapped. Each key describes a _specific part_ of a _specific component_.

```typescript
trigger.outline[variant][state] // the border of the trigger button
trigger.selectionTag[variant][type].color // the count badge text color
menu.item.backgroundColor[state] // item row hover background
```

Component tokens reference semantic tokens. The platform generates component tokens from semantic tokens. Developers rarely write component tokens by hand.

---

## 4. Data-First Token Format

The platform stores tokens as **JSON**, not TypeScript. TypeScript is a generated artifact.

### Brand config JSON (what the dashboard saves)

```json
{
    "brandId": "hdfc-retail",
    "name": "HDFC Bank Retail",
    "version": "2.1.0",
    "semantic": {
        "brand": {
            "primary": "#E31837",
            "primaryHover": "#C01530",
            "error": "#E31837"
        },
        "surface": {
            "default": "#FFF5F6",
            "subtle": "#FFEBEE",
            "muted": "#FFD7DC"
        },
        "border": {
            "default": "#E31837",
            "strong": "#C01530",
            "focus": "#E31837"
        },
        "text": {
            "primary": "#1A1A1A",
            "secondary": "#666666",
            "disabled": "#BBBBBB"
        },
        "radius": {
            "trigger": "4px",
            "menu": "4px",
            "item": "4px",
            "badge": "2px"
        }
    }
}
```

### Generated TypeScript (CLI artifact, committed to client repo)

```typescript
// generated/hdfc-retail.componentTokens.ts
// ⚠️ Auto-generated by Blend Token Studio CLI — do not edit manually

import { createMultiSelectV2BrandTokens } from '@blend-design/blend'

export const HDFC_RETAIL_TOKENS = {
    MULTI_SELECT_V2: createMultiSelectV2BrandTokens({
        primaryColor: '#E31837',
        borderColor: '#E31837',
        surfaceColor: '#FFF5F6',
        surfaceHoverColor: '#FFEBEE',
        textPrimaryColor: '#1A1A1A',
        triggerBorderRadius: 4,
        menuBorderRadius: 4,
    }),
    // ... other components
}
```

Usage in the client app:

```tsx
import { ThemeProvider, Theme } from '@blend-design/blend'
import { HDFC_RETAIL_TOKENS } from './generated/hdfc-retail.componentTokens'

export function App() {
    return (
        <ThemeProvider theme={Theme.LIGHT} componentTokens={HDFC_RETAIL_TOKENS}>
            <YourApp />
        </ThemeProvider>
    )
}
```

---

## 5. Branching Model

Inspired by GitHub. Every brand config lives in a **branch** (not a git branch — a platform concept).

```
main (Blend defaults)
  ├── hdfc/retail       ← HDFC retail banking app
  ├── hdfc/private      ← HDFC private wealth
  ├── neobank/light     ← NeoBank light theme
  ├── neobank/dark      ← NeoBank dark theme
  └── my-startup/v1     ← any SaaS using Blend
```

### Branch lifecycle

```
create branch from main
     ↓
edit tokens in dashboard
     ↓
preview in live sandbox
     ↓
publish branch
     ↓
pull via CLI  →  committed to client repo
     ↓
create PR with generated token files
```

### Branch operations

| Operation | Description                                  |
| --------- | -------------------------------------------- |
| `fork`    | Create a new branch from any existing branch |
| `diff`    | See what changed vs parent branch            |
| `merge`   | Pull upstream Blend updates into a branch    |
| `publish` | Lock a version, generate release artifact    |
| `share`   | Send a preview URL to collaborators          |
| `revert`  | Roll back to any previous snapshot           |

---

## 6. Platform Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BLEND TOKEN STUDIO                        │
├───────────────────┬──────────────────┬──────────────────────┤
│  Dashboard (Web)  │   CLI Tool       │   REST/GraphQL API   │
│  Next.js + Figma  │   Node.js        │   NestJS             │
│  plugin bridge    │   npx blend-cli  │                      │
└───────────────────┴──────────────────┴──────────────────────┘
         │                   │                    │
         ▼                   ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│               Token Engine (Core)                            │
│  resolveTokens(brandConfig) → ResponsiveComponentTokens      │
│  diffTokens(branchA, branchB) → TokenDiff[]                  │
│  validateTokens(tokens) → ValidationResult                   │
└─────────────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Token Storage                               │
│  PostgreSQL (branches, versions, users, teams)               │
│  S3 (generated artifacts, snapshots)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 7. Dashboard — UI Specification

### 7.1 Overview Screen

```
┌─────────────────────────────────────────────────┐
│  Blend Token Studio        [New Branch ▾]        │
├─────────────────────────────────────────────────┤
│  Branches                                        │
│  ┌────────────────────────────────────────────┐ │
│  │ 🔵 main        Blend Defaults    Published  │ │
│  │ 🔴 hdfc/retail HDFC Bank Retail  v2.1.0    │ │
│  │ 🟣 neobank     NeoBank           Draft      │ │
│  └────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 7.2 Token Editor Screen

Split into three panels:

```
┌──────────────┬──────────────────────────┬────────────────┐
│  Token Tree  │     Visual Editor         │  Live Preview  │
│              │                           │                │
│ ▾ Semantic   │  Brand / Primary Color    │  [MultiSelect] │
│   brand      │  ┌──────────────────┐    │  [Button]      │
│   surface    │  │  #E31837    [●]  │    │  [TextInput]   │
│   border     │  └──────────────────┘    │                │
│   text       │                           │  ◉ Light       │
│   radius     │  Trigger Border Radius    │  ○ Dark        │
│              │  ────────●──────── 4px    │                │
│ ▾ Component  │                           │  Screen:       │
│   MultiSelect│  Menu Border Radius       │  ◉ Desktop     │
│   Button     │  ──●─────────────── 4px   │  ○ Mobile      │
│   TextInput  │                           │                │
└──────────────┴──────────────────────────┴────────────────┘
```

### 7.3 Diff View

Like GitHub's pull request diff — shows what changed vs the parent branch:

```
trigger.outline.CONTAINER.closed
  - 1px solid #D0D5DD !important
  + 1px solid #E31837 !important

trigger.selectionTag.CONTAINER.COUNT.backgroundColor
  - #4A6FA5
  + #E31837

trigger.borderRadius.sm.CONTAINER
  - 10px
  + 4px
```

### 7.4 Figma Bridge

A Figma plugin syncs variable values bidirectionally:

- Designer changes brand color in Figma → auto-updates token branch
- Dev publishes token branch → Figma variables stay in sync

---

## 8. CLI Design

```bash
npx blend-token-studio@latest
```

### Commands

```bash
# Initialize a project
blend-cli init

# List branches
blend-cli branches list

# Pull a branch (generates TypeScript files)
blend-cli pull hdfc/retail --output ./src/tokens/

# Diff current tokens against upstream Blend
blend-cli diff hdfc/retail

# Push local changes back to platform
blend-cli push --branch hdfc/retail --message "Adjust border radius"

# Watch mode — live reload on token changes
blend-cli watch hdfc/retail

# Generate from a local JSON file (offline)
blend-cli generate ./hdfc-brand.json --output ./src/tokens/
```

### Generated file structure

```
src/tokens/
├── hdfc-retail.componentTokens.ts    ← auto-generated
├── hdfc-retail.brand.json            ← source of truth (committed)
└── blend.lock                        ← version lockfile
```

---

## 9. API Design

```
POST   /api/v1/branches                 Create branch
GET    /api/v1/branches/:id             Get branch
PATCH  /api/v1/branches/:id/tokens      Update tokens
GET    /api/v1/branches/:id/diff        Diff vs parent
POST   /api/v1/branches/:id/publish     Publish a version
GET    /api/v1/branches/:id/artifact    Download generated TypeScript
GET    /api/v1/branches/:id/preview     Get shareable preview URL
POST   /api/v1/branches/:id/fork        Fork branch
```

---

## 10. White-labeling Workflow (End-to-End)

```
Designer opens Token Studio dashboard
         ↓
Creates branch: "hdfc/retail" forked from "main"
         ↓
Edits semantic tokens:
  brand.primary      → #E31837 (HDFC red)
  radius.trigger     → 4px (sharp corners)
  surface.default    → #FFF5F6 (warm white)
         ↓
Platform runs resolveTokens() → generates all component tokens
         ↓
Live preview updates in real time (right panel of dashboard)
         ↓
Shares preview URL with stakeholder → stakeholder approves
         ↓
Publishes branch → generates versioned artifact
         ↓
Developer runs: blend-cli pull hdfc/retail --output ./src/tokens/
         ↓
Generated file committed to client repo:
  hdfc-retail.componentTokens.ts
         ↓
Developer wraps app:
  <ThemeProvider componentTokens={HDFC_RETAIL_TOKENS}>
         ↓
Every Blend component in the app adopts HDFC branding
```

---

## 11. Runtime Architecture — CSS Variables vs Styled-Components Props

### The Class-Explosion Problem

`PrimitiveButton` is a `styled.button` using dynamic interpolations (`getStyles(props)`). Every unique combination of `outline`, `backgroundColor`, `borderRadius`, `_hover`, and `_focus` values generates a new CSS class. This creates **200+ classes** when a brand color picker is moved interactively — one class per unique color value.

### The Fix: CSS Custom Properties

Instead of passing dynamic token values as styled-component props, set them as **CSS variables** via the `style` prop on the element. The styled component reads from those variables and has **zero dynamic interpolations** — it generates exactly **one CSS class forever**.

```
BEFORE (class explosion)                   AFTER (CSS variables)
─────────────────────────────────          ──────────────────────────────────
<PrimitiveButton                           <TriggerButton style={{
  outline="1px solid #E31837"                '--ms-outline': '1px solid #E31837',
  backgroundColor="#FFF5F6"                  '--ms-bg': '#FFF5F6',
  _hover={{                                  '--ms-hover-outline': '1px solid #C01530',
    outline: "1px solid #C01530",            '--ms-hover-bg': '#FFEBEE',
    backgroundColor: "#FFEBEE"             }}>
  }}>
→ NEW CSS CLASS PER BRAND COLOR            → SAME CSS CLASS, DIFFERENT VAR VALUES
```

**`MultiSelectV2Trigger` was refactored** to this model. The `TriggerButton` styled component in that file has no dynamic interpolations and generates one CSS class. All brand values flow through CSS variables.

### Three-Layer Export Architecture

The Token Studio platform generates all three layers from a single brand config:

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Brand Config JSON (designer edits)                 │
│  { primaryColor, borderColor, triggerBorderRadius, ... }     │
│                         │                                    │
│                         ▼ createMultiSelectV2CSSVars()       │
│                                                              │
│  Layer 2: CSS Variables (injected into DOM via style prop)   │
│  { '--blend-ms-primary': '#E31837',                          │
│    '--blend-ms-border': '#E31837',                           │
│    '--blend-ms-radius-trigger': '4px', ... }                 │
│                         │                                    │
│                         ▼ createMultiSelectV2BrandTokens()   │
│                                                              │
│  Layer 3: Component Tokens (ThemeProvider.componentTokens)   │
│  { trigger.outline.CONTAINER.closed: '...',                  │
│    trigger.backgroundColor.CONTAINER.hover: '...',           │
│    menu.item.backgroundColor.hover: '...', ... }             │
└─────────────────────────────────────────────────────────────┘
```

| Layer            | Purpose                        | Who uses it                        |
| ---------------- | ------------------------------ | ---------------------------------- |
| Brand Config     | Human-editable source of truth | Designer in dashboard              |
| CSS Variables    | Zero-cost runtime theming      | Components via `var(--blend-ms-*)` |
| Component Tokens | Anatomy-level overrides        | `ThemeProvider.componentTokens`    |

The demo's "Token Studio Export" panel shows all three layers live.

## 12. What Needs to Change in the Codebase

### 11.1 Keep platform token engine outside the component library

Do **not** ship Token Studio “brand factories” inside `packages/blend` (the component library). Keep them in a platform package (e.g. `token-engine` / `cli`) so the library remains focused on component runtime + default tokens.

In this repo, the MultiSelect brand mapping is demonstrated **inside the demo** (`apps/site/src/demos/MultiSelectDemoV2.tsx`) to prove the concept without adding platform helpers to the Blend package.

### 11.2 Stop building composite CSS strings in token values

**Current (not platform-friendly)**:

```typescript
outline: `1px solid ${foundationToken.colors.gray[200]} !important`
```

**Target (serializable)**:

```typescript
outline: {
  width: "1px",
  style: "solid",
  color: foundationToken.colors.gray[200],
}
```

This allows the platform to extract `color` alone without string parsing. Migration can be incremental — the platform token engine can support both formats during transition.

### 11.3 Add a semantic token layer

Add `packages/blend/lib/tokens/semantic.light.ts` and `semantic.dark.ts`. Component token files should reference semantic tokens instead of foundation tokens directly. This is the biggest structural change and should be done as a dedicated sprint.

### 11.4 Differentiate `sm` / `lg` responsive tokens

Currently most components return `{ sm: baseTokens, lg: baseTokens }` (identical). The platform benefits from genuine differentiation for:

- `drawer.*` tokens → only used on `sm` (mobile)
- `menu.*` tokens → only used on `lg` (desktop)
- Typography sizes → potentially differ across breakpoints

### 11.5 Export `componentTokens` type as a public API

```typescript
// packages/blend/lib/index.ts
export type { ComponentTokenType } from './context/ThemeContext'
// Token Studio engine exports live in the platform repo/package, not here.
```

---

## 12. Working Demo

The `MultiSelectDemoV2` page (`apps/site/src/demos/MultiSelectDemoV2.tsx`) includes a **White Label Studio** section demonstrating the full concept:

1. **Four brand presets** — Blend, HDFC Bank, NeoBank, FinTech
2. **Live color picker** — custom primary color and border radius
3. **Live preview** — MultiSelectV2 wrapped in a nested `ThemeProvider` with brand tokens applied in real time
4. **Generated JSON** — shows the exact `brandConfig` JSON that would be stored in the platform and pulled by the CLI

This demonstrates the full chain:

```
BrandConfig JSON  →  createMultiSelectV2BrandTokens()  →  ThemeProvider  →  UI
```

---

## 13. Competitive Analysis

| Platform               | Customization depth        | Branching              | Component coverage       | Framework agnostic |
| ---------------------- | -------------------------- | ---------------------- | ------------------------ | ------------------ |
| Shadcn CLI v4          | CSS variables only         | No                     | shadcn components        | Partial            |
| Supernova              | Figma → tokens             | No                     | Design tokens only       | Yes                |
| Style Dictionary       | Static generation          | No                     | Tokens only              | Yes                |
| **Blend Token Studio** | **Full component anatomy** | **Yes (GitHub-style)** | **All Blend components** | **React**          |

Blend Token Studio's unique edge: **anatomy-level control** (not just CSS variables) with a **branching model** that lets teams manage multiple client brands in one place, with version control and diff views.

---

## 14. Roadmap

| Phase                | Scope                                                                                              | Timeline     |
| -------------------- | -------------------------------------------------------------------------------------------------- | ------------ |
| **Phase 0** _(done)_ | Brand factory functions for MultiSelectV2. Live demo with ThemeProvider.                           | Now          |
| **Phase 1**          | Add `create*BrandTokens` to all V2 components (ButtonV2, TextInputV2, etc.). Export as public API. | Sprint 1–2   |
| **Phase 2**          | Add semantic token layer. Migrate component tokens to reference semantic.                          | Sprint 3–4   |
| **Phase 3**          | CLI tool — `blend-cli pull/push/diff`. JSON brand config format.                                   | Sprint 5–6   |
| **Phase 4**          | Token Studio dashboard — Next.js app with live preview iframe.                                     | Sprint 7–10  |
| **Phase 5**          | Figma plugin bridge. GitHub Actions integration. Multi-tenant API.                                 | Sprint 11–14 |
