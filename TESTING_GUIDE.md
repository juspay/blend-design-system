# Blend Token Studio - Unified Testing and Release Guide

This is the single source of truth for testing Blend Token Studio end-to-end:

- local monorepo development
- external project validation
- npm canary and stable publish checks

Quick command (root):

```bash
pnpm test:token-studio:release-gate
```

NPM-like consumer smoke only:

```bash
pnpm test:token-studio:npm-smoke
```

---

## 1) Goal

Ensure this flow works for any React/Next/Vite project without per-component binding:

1. `npx blend-token-studio init`
2. wrap app with generated `BlendProvider`
3. `npx blend-token-studio brand ...` or `npx blend-token-studio pull <branchId>`
4. run app and confirm Blend components render with resolved tokens

---

## 2) Pre-flight Checks (Monorepo)

Run from repo root:

```bash
pnpm install
pnpm --filter @juspay/blend-design-system build
pnpm --filter @blend-design/token-engine build
pnpm --filter blend-token-studio build
pnpm --filter @blend-design/token-engine typecheck
pnpm --filter blend-token-studio typecheck
```

Pass criteria:

- all commands succeed
- `packages/token-engine/dist` exists with `.js` and `.d.ts`
- `packages/cli/dist/index.js` exists

---

## 3) Local Product Testing (Studio + Engine + CLI)

### A. Studio workflow

```bash
cd apps/blend-studio
pnpm dev
```

Verify:

1. create branch at `/studio`
2. edit colors/radius/components
3. preview updates live
4. publish version

### B. CLI workflow inside repo

From repo root:

```bash
pnpm --filter blend-token-studio build
pnpm --filter @blend-design/token-engine build
```

Then test commands in a sample app folder:

```bash
npx blend-token-studio --help
npx blend-token-studio init --defaults
npx blend-token-studio brand --preset blend
npx blend-token-studio validate
npx blend-token-studio diff
```

Pass criteria:

- `blend.config.json` created
- `src/blend/provider.tsx` created
- `src/blend/brand.json` created
- `src/blend/tokens.ts` generated with light + dark tokens

---

## 4) External Project Compatibility Test (Critical)

Create fresh projects and run same flow:

- Vite React (TS)
- Next.js app router (TS)

For each:

```bash
npx blend-token-studio init --defaults
npx blend-token-studio brand --primary "#E31837" --radius sharp
```

Then:

1. import generated `BlendProvider`
2. render `ButtonV2`, `TextInputV2`, `AlertV2`
3. run dev server
4. verify light/dark behavior

Pass criteria:

- no manual token wiring
- no component-level binding
- app compiles and renders with branded styles

---

## 5) Canary Publish Validation (Before Stable)

Publish canary versions first:

1. publish `@blend-design/token-engine` with canary tag
2. publish `blend-token-studio` with canary tag
3. test in a fresh external project using only npm packages

Checklist:

- `npx blend-token-studio@next init` works
- `brand` generation works
- `pull/list/login` behavior is correct against target API

If any failure occurs, fix and republish canary; do not publish stable.

---

## 6) Stable Publish Gate

Publish stable only if all below pass:

1. monorepo build + typecheck pass
2. studio manual workflow pass
3. external Vite test pass
4. external Next.js test pass
5. canary validation pass

---

## 7) Recommended CI Gates

Add CI jobs:

1. `build-packages`: build blend + token-engine + cli
2. `typecheck-packages`: token-engine + cli
3. `smoke-cli`: run `init` + `brand` in temp fixture project
4. `studio-e2e`: minimal editor create/edit/preview test

---

## 8) Known Good Contract

`tokens.ts` is generated; users should not edit it manually.  
`brand.json` is the user-editable source of truth and must be committed.

`provider.tsx` is generated once and can be edited safely by consumers.

---

## 9) Fast Troubleshooting

- **d.ts build failure in token-engine**: check for inferred exported return types in blend token utilities; add explicit return types.
- **CLI write errors**: ensure commands create output directory before writing files.
- **missing auth for pull/list/push**: run `blend-token-studio login` or provide token env vars.
- **npm-smoke pnpm store errors**: by default the smoke runs an npm consumer only. To also run the pnpm consumer, set `TOKEN_STUDIO_SMOKE_PNPM=1`.

---

## 10) Versioning Policy (Non-Hacky)

- `blend-token-studio` and `@blend-design/token-engine` can remain on `0.1.x` while `@juspay/blend-design-system` is on `0.0.x`; they are separate packages with separate semver lifecycles.
- Internal monorepo links should use semver ranges (e.g. `^0.1.0`) so npm installs work. Use changesets so these ranges update automatically during release.
- `@blend-design/token-engine` keeps `@juspay/blend-design-system` as a peer dependency with a bounded range (`>=0.0.37-0 <1.0.0`) to avoid accidental major-version breakage.
- Use changesets to bump and publish; avoid manual cross-editing package versions.
