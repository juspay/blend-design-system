# Blend Design System - Integration Guide

> Add Blend to your existing project

---

## 🎯 Supported Projects

Blend works with any React project:

- ✅ Vite
- ✅ Next.js
- ✅ Create React App
- ✅ Remix
- ✅ ReScript React (with component bindings)
- ✅ Any React framework

---

## 📦 PART 1: Install Blend (2 Steps)

### Step 1: Install Packages

```bash
# In your existing project folder
npm install @juspay/blend-design-system blend-token-studio

# OR with pnpm
pnpm add @juspay/blend-design-system blend-token-studio

# OR with yarn
yarn add @juspay/blend-design-system blend-token-studio
```

### Step 2: Import Styles

Add to your app's entry file:

**For Vite/CRA:** `src/main.tsx` or `src/index.tsx`

```tsx
import '@juspay/blend-design-system/style.css'
```

**For Next.js:** `pages/_app.tsx`

```tsx
import '@juspay/blend-design-system/style.css'
```

---

## ⚙️ PART 2: Setup Blend Config

### Let CLI create `blend.config.json` for you (recommended)

You do **not** need to create this file manually in normal setup.

Run:

```bash
npx blend-token-studio init
```

This automatically creates `blend.config.json` and the `src/blend` folder.

### If you need custom values, update `blend.config.json`:

```json
{
    "$schema": "https://blend-studio-staging-2oyuucbkoa-uc.a.run.app/studio/schemas/blend-config.json",
    "brand": "blend/default",
    "theme": "light",
    "output": "src/blend",
    "components": [],
    "studio": {
        "apiUrl": "https://blend-studio-staging-2oyuucbkoa-uc.a.run.app/studio",
        "autoSync": false
    },
    "generate": {
        "typescript": true,
        "cssVariables": false,
        "reactNative": false
    }
}
```

---

## 🎨 PART 3: Initialize Blend (One-time)

### Option A: Using npx (No install needed)

```bash
# 1) Create blend config + generated files
npx blend-token-studio init

# 2) Apply default Blend brand
npx blend-token-studio brand --preset blend
```

### Option B: Add to package.json scripts

```json
{
    "scripts": {
        "blend:init": "blend-token-studio init",
        "blend:brand": "blend-token-studio brand --preset blend",
        "blend:login": "blend-token-studio login",
        "blend:pull": "blend-token-studio pull",
        "blend:push": "blend-token-studio push"
    }
}
```

Then run:

```bash
npm run blend:init
npm run blend:brand
```

---

## 🧩 PART 4: Use Blend Components

### Wrap Your App with Provider

**Vite/CRA:** `src/main.tsx`

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BlendProvider } from './blend/provider'
import App from './App'
import '@juspay/blend-design-system/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BlendProvider theme="light">
            <App />
        </BlendProvider>
    </React.StrictMode>
)
```

**Next.js:** `pages/_app.tsx`

```tsx
import { BlendProvider } from '../blend/provider'
import '@juspay/blend-design-system/style.css'

export default function MyApp({ Component, pageProps }) {
    return (
        <BlendProvider theme="light">
            <Component {...pageProps} />
        </BlendProvider>
    )
}
```

### Use Components Anywhere

```tsx
import {
    ButtonV2,
    ButtonV2Type,
    TextInputV2,
} from '@juspay/blend-design-system'

function MyPage() {
    return (
        <div>
            <TextInputV2 label="Name" placeholder="Enter name" />
            <ButtonV2 buttonType={ButtonV2Type.PRIMARY} text="Submit" />
        </div>
    )
}
```

### ReScript projects

If your app is built with ReScript React, Blend is supported.

- Install and initialize Blend the same way as JS/TS projects.
- Import Blend CSS in your app entry.
- Create ReScript externals/bindings for the Blend components you use.

This keeps the CLI + Studio workflow identical, with only a thin binding layer in your ReScript app.

---

## 🔄 PART 5: Sync with Studio

### Login to Studio

```bash
npx blend-token-studio login
# OR
npm run blend:login
```

### When Designer Updates Tokens

```bash
npx blend-token-studio pull
# OR
npm run blend:pull
```

Your app automatically gets new colors/fonts!

### Push Your Changes (If you edited tokens)

```bash
npx blend-token-studio push
# OR
npm run blend:push
```

### After init + publish branch: what should I do?

Use this flow to avoid confusion:

1. Run `npx blend-token-studio init` and `npx blend-token-studio brand --preset blend`
2. Verify app runs with `BlendProvider` and at least one Blend component
3. Commit generated files (`blend.config.json` and `src/blend/*`)
4. Push branch and open PR
5. After PR is merged, run `blend-token-studio login` once on your machine
6. Day-to-day:
    - Designer changed tokens? run `blend-token-studio pull`
    - You changed tokens locally? run `blend-token-studio push`

**Tip:** Keep token sync (`pull`/`push`) in small, focused commits so review is easy.

---

## 📝 Quick Reference

### Package Install

```bash
npm i @juspay/blend-design-system blend-token-studio
```

### Required Imports

```tsx
// In your app entry file
import '@juspay/blend-design-system/style.css'
import { BlendProvider } from './blend/provider'
```

### Using Components

```tsx
import { ButtonV2, TextInputV2, CardV2 } from '@juspay/blend-design-system'
```

### Studio Commands

| Command                        | Action                       |
| ------------------------------ | ---------------------------- |
| `npx blend-token-studio init`  | Create config + blend folder |
| `npx blend-token-studio brand` | Apply default brand          |
| `npx blend-token-studio login` | Login to Studio              |
| `npx blend-token-studio pull`  | Get latest designs           |
| `npx blend-token-studio push`  | Send your designs            |

---

## 🌐 Studio URLs

| Environment    | URL                                                           | Use When  |
| -------------- | ------------------------------------------------------------- | --------- |
| **Staging**    | `https://blend-studio-staging-2oyuucbkoa-uc.a.run.app/studio` | Testing   |
| **Production** | `https://blend.juspay.design`                                 | Live apps |

Update `blend.config.json` → `studio.apiUrl` to switch.

---

## 📂 What Gets Added to Your Project

```
your-existing-project/
├── blend.config.json      ← NEW: Studio connection
├── src/
│   └── blend/             ← NEW: Auto-generated
│       ├── provider.tsx   ← Theme wrapper
│       ├── tokens.ts      ← Colors/fonts
│       └── theme.css      ← Styles
└── package.json           ← MODIFIED: Added deps
```

---

## 🐛 Troubleshooting

### "Cannot find module '@juspay/blend-design-system'"

```bash
npm install
# Ensure you're in a workspace if using monorepo
```

### Styles not applied

Check CSS import exists in your entry file:

```tsx
import '@juspay/blend-design-system/style.css'
```

### TypeScript errors

Add to `tsconfig.json`:

```json
{
    "compilerOptions": {
        "moduleResolution": "bundler"
    }
}
```

### Blend folder not found

Run init again:

```bash
npx blend-token-studio init
```

---

## ✅ Checklist

- [ ] Installed packages (`npm i @juspay/blend-design-system`)
- [ ] Added CSS import
- [ ] Ran `npx blend-token-studio init` (creates `blend.config.json`)
- [ ] Ran `npx blend-token-studio brand`
- [ ] Wrapped app with `<BlendProvider>`
- [ ] Used a component (`<ButtonV2>`)
- [ ] Can login to Studio
- [ ] Can pull tokens

---

## 🎯 Example: Adding to Existing Vite App

```bash
# 1. Go to your project
cd my-existing-vite-app

# 2. Install
npm i @juspay/blend-design-system blend-token-studio

# 3. Add CSS import to src/main.tsx
import '@juspay/blend-design-system/style.css'

# 4. Initialize (creates blend.config.json automatically)
npx blend-token-studio init
npx blend-token-studio brand

# 5. Wrap your app with BlendProvider

# 6. Use components!
```

Done! 🎉
