# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Blend is Juspay's React design system, published to npm as `@juspay/blend-design-system` from `packages/blend`. The repo is a pnpm + Turborepo monorepo (`pnpm-workspace.yaml`: `apps/*`, `packages/*`), pinned to `pnpm@10.21.0` with `engine-strict=true`.

Almost all product work happens in `packages/blend/lib`. The apps are consumers or tooling around it.

## Commands

```bash
pnpm install                  # bootstrap (installs husky hooks via `prepare`)
pnpm build                    # turbo build, all workspaces
pnpm build:blend              # lint + vite build + check:dist for the library
pnpm dev                      # turbo dev, all workspaces
pnpm storybook                # component playground (apps/storybook, :6006)
pnpm ascent:dev               # docs site (apps/ascent, Next.js)

pnpm test:blend               # vitest watch
pnpm test:blend:run           # vitest single run
pnpm test:blend:coverage      # what CI runs
pnpm test:a11y                # jest-axe suites only (see caveat below)

pnpm format                   # prettier write — CI gates on format:check
pnpm lint                     # eslint, --max-warnings 0
pnpm check:circular           # madge cycle gate over packages/blend/lib
```

Run a single test file: `cd packages/blend && pnpm vitest run __tests__/components/Button/Button.test.tsx`.

Prettier config is unusual and non-negotiable: **4-space indent, no semicolons, single quotes**. The `pre-commit` hook auto-formats and re-stages rather than blocking, so a badly formatted commit silently rewrites your files.

## Workspace map

**`packages/`**

| Path                | Package                       | Notes                                                                                                      |
| ------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `blend`             | `@juspay/blend-design-system` | The library. Public. Everything below is about this.                                                       |
| `token-engine`      | `@blend-design/token-engine`  | Private, but **bundled into** blend and re-exported as `/tokens`. Mutually dependent with blend by design. |
| `cli`               | `blend-studio`                | Token CLI (`init`/`brand`/`pull`/`push`). Bins: `blend-studio`, `blend`.                                   |
| `mcp`               | `blend-ui-mcp`                | MCP server; owns the turbo `generate-manifest` task (`generateManifest.js` → `manifest.json`).             |
| `blend-telemetry`   | `blend-telemetry`             | Scans consumer repos for Blend component usage.                                                            |
| `typescript-config` | `@repo/typescript-config`     | Shared tsconfig bases.                                                                                     |

**`apps/`** — `ascent` (Next.js 15 docs site, MDX + `next-mdx-remote/rsc`), `storybook` (Storybook 8 + Chromatic), `blend-studio` (Vite token editor UI + its own Express API), `backend` (Express + Prisma API for Token Studio), `site` and `tokenizer-sandbox` (small consumer demos). All private.

## The library: `packages/blend/lib`

```
components/     83 dirs — V1 and V2 generations coexist
  Primitives/   Block, PrimitiveButton, PrimitiveText, ... — the styling layer
  common/ shared/ animations/
tokens/         foundation tokens only (color, font, unit, border, shadows, ...)
context/        ThemeProvider, ThemeContext, initComponentTokens, useComponentToken
hooks/          useResponsiveTokens, useBreakPoints, useScrollLock, ...
breakpoints/    only two: { sm: 320, lg: 1024 }
main.ts node.ts token-engine.ts token-engine-server.ts   ← the four build entries
```

`components/shared/` holds cross-component internals, not components. `shared/datetime/` is the date+time layer: `timeCore.ts` (pure time math — parsing, clamping, `minuteStep` snapping, 12h/24h formatting), `granularity.ts` (period normalization), `MonthYearGrid.tsx` (month/year selection), and `PickerTrigger.tsx` (the shared trigger button) back `DateRangePicker`, `SingleDatePicker` and `TimePicker`. A change there hits all three, so test all three.

Tests live **outside** `lib/`, in `packages/blend/__tests__/`, mirroring the component tree. `packages/blend/rfcs/` holds the authoritative standards docs (0002 testing, 0003 accessibility, 0005 token naming, 0007 refactoring).

### V1 vs V2

Many components exist twice: `Button/` and `ButtonV2/`, `Alert/` and `AlertV2/`. V2 is the current generation and supports dark mode. Most V1 components remain light-only, but legacy Modal, Card, Upload, Tags, Badge, Timeline, `AvatarGroup`, `ButtonGroup`, `CodeBlock`, `Directory`, `Skeleton`, and `SidebarMobile` factories support light/dark token dispatch; DateRangePicker is also an exception because its calendar and mobile tokens resolve through the active theme. Some V2 components are grouped under umbrella dirs (`InputsV2/TextInputV2`, `SelectorV2/CheckboxV2`, `ButtonV2/ButtonGroupV2`).

New work should target V2. `useResponsiveTokens` emits a one-time deprecation `console.warn` for V1 slots via `v1TokenReplacementMap` (`lib/hooks/useResponsiveTokens.ts`) — keep that map in sync with `lib/main.ts` when adding or retiring components.

### The token system

Three layers, and the middle one is where mistakes happen.

1. **Foundation** — `lib/tokens/theme.token.ts` exports `FOUNDATION_THEME` (colors, spacing, shadows, borders). Values are typed against styled-components' `CSSObject`, not raw strings.
2. **Component tokens** — every component ships a `getXTokens(foundation, theme?)` factory returning a **responsive** object keyed by breakpoint: `{ sm: {...}, lg: {...} }`. That's what every `ResponsiveXTokens` type means.
    - V1: themed factories such as `getTagTokens(foundation, theme = Theme.LIGHT)` dispatch to separate light/dark token modules (including retrofitted `AvatarGroup`, `ButtonGroup`, `CodeBlock`, `Directory`, `MOBILE_NAVIGATION`, and `Skeleton`); older factories may remain light-only.
    - V2: `getButtonV2Tokens(foundation, theme = Theme.LIGHT)`, dispatching to separate `buttonV2.light.tokens.ts` / `buttonV2.dark.tokens.ts` files.
    - A component that reuses another component's slot ships no factory of its own — `SingleDatePicker` styles itself from `CALENDAR` and `TIME_PICKER`.
3. **Consumption** — components call `useResponsiveTokens<XTokensType>('BUTTONV2')`, which resolves the slot and returns the values already flattened for the current breakpoint. It **throws** on an unknown slot.

`ThemeProvider` accepts `{ foundationTokens?, componentTokens?, breakpoints?, theme?, target? }`. Component token overrides are **deep-merged on top of the active theme defaults** — consumers can provide only the token paths they want to change, and unmodified paths keep the light or dark theme values. Passing `target` enables Shadow DOM support via `ShadowAware`.

Components also work without a `ThemeProvider`; `ThemeContext.tsx` builds a full default token set at module scope.

**Adding a new component token slot means editing three files in lockstep:** `context/ThemeContext.tsx` (type + default), `context/initComponentTokens.ts` (`??` fallback), `context/useComponentToken.ts` (union return type + `switch` case). Miss one and it throws at runtime. If Token Studio should be able to re-resolve the slot for a brand, also export the factory from `lib/node.ts` and register it in `V2_RESOLVERS` (`packages/token-engine/src/resolve-all-tokens.ts`) — that map is what `resolveBrandTokens` iterates.

`useBreakPoints` maps only 320–1023px to `'sm'`; everything else (including below 320) returns `'lg'`.

### Component file convention

A V2 component directory looks like this — mirror it exactly:

```
ButtonV2/
  ButtonV2.tsx               forwardRef; composes Block / PrimitiveButton / Text
  buttonV2.types.ts          props + enums (enums, not string unions)
  buttonV2.tokens.types.ts   TYPES ONLY — ButtonV2TokensType, ResponsiveButtonV2Tokens
  buttonV2.light.tokens.ts   values
  buttonV2.dark.tokens.ts    values
  buttonV2.tokens.ts         thin getButtonV2Tokens theme dispatch
  utils.ts                   pure style helpers
  index.ts                   barrel
```

The `*.tokens.types.ts` / `*.tokens.ts` split is **load-bearing cycle avoidance**: `useComponentToken.ts` imports types from the leaf `.tokens.types` module and the factory from `.tokens`. Do not collapse them.

**Styling**: there is no styled-components `ThemeProvider`. `styled` belongs inside `Primitives/*` (which use a `shouldForwardProp` blocklist). Components style themselves by passing token values as props to `<Block>` / `<PrimitiveButton>` / `<Text>`. Legacy V1 files still import `styled-components` directly; new V2 work should not (RFC 0007).

**Compound components** (see `Skeleton/SkeletonCompound.tsx`) use `Object.assign` **plus an explicit type annotation** where each static is declared as `typeof <FlatExport>`. Inlining a static's props instead of aliasing it fails the build.

### Entry points

Four vite lib entries map to `package.json#exports`:

| Subpath           | Source                       | Emits                   |
| ----------------- | ---------------------------- | ----------------------- |
| `.`               | `lib/main.ts`                | `dist/main.js`          |
| `./node`          | `lib/node.ts`                | `dist/node.js`          |
| `./tokens`        | `lib/token-engine.ts`        | `dist/token-engine.js`  |
| `./tokens/server` | `lib/token-engine-server.ts` | `dist/tokens-server.js` |

- **The `./tokens` entry file must stay named `token-engine`.** Naming it `tokens` emits `dist/tokens.d.ts` beside the `dist/tokens/` directory; TS resolves file over directory and silently types `FOUNDATION_THEME` as `any` for every consumer (issue #1556; guarded by `check-dist.mjs`, explained in `vite.config.ts`).
- **`lib/node.ts` is the React-free, CSS-free entry** so the CLI and token-engine can resolve tokens without pulling UI. Adding a new V2 component means adding its token factory here too.
- `lib/main.ts` opens with a side effect (`patchResizeObserver()`) despite `"sideEffects": false`.
- Raw source is published (`"./lib/*": "./lib/*"` and `files: ["dist", "lib"]`).

### Build gates

Both run automatically; both fail builds for non-obvious reasons.

- **`scripts/check-circular.mjs`** — madge over `lib/`, fails on any cycle outside four allowlisted mutually-recursive pairs (Menu↔SubMenu, MultiSelect, MultiSelectV2, DataTable↔PivotTableModal). ESLint enforces the same rule as an error via `import-x/no-cycle` with `maxDepth: Infinity` (issue #1473), disabled only for tests and stories. To fix a cycle: extract shared types to a leaf module, import concrete paths instead of barrels, and never import `lib/main.ts` from inside `lib/`.
- **`scripts/check-dist.mjs`** — runs post-build. Rejects `dist/X.js` sitting beside `dist/X/`; asserts `FOUNDATION_THEME` doesn't type as `any`; loads `dist/main.js` under a JSDOM shim and verifies every compound static is declared correctly (issue #1576). If a new dependency touches a browser global at module load, extend the shim block in that script.

## Testing

- **Import `render` from `__tests__/test-utils`, never from `@testing-library/react` directly.** The custom render wraps in `ThemeProvider` and returns a pre-configured `user` (`userEvent`). That module also exports `MockIcon`, builders, assertions, and perf helpers.
- Accessibility tests are separate `<Component>.accessibility.test.tsx` files using `jest-axe`. `pnpm test:a11y` selects them with `--testNamePattern 'accessibility|Accessibility'`, so **the describe/test name must contain "Accessibility"** — the filename alone is not enough.
- `vitest.setup.ts` mocks `ResizeObserver`, `IntersectionObserver`, `matchMedia` (always `matches: false`), `window.scrollTo`, and `CSS.supports`.
- **Vitest concurrency** (`packages/blend/vitest.config.ts`): `pool: 'threads'`; local runs cap `maxWorkers: 6` (CI keeps vitest's default). Timeouts are 15s/10s (test/hook) everywhere — not CI-only. Too many concurrent jsdom workers cause suite-only flakes (`passes alone, times out in suite`).
- **Performance tests are a separate vitest project.** `*.performance.test.tsx` files are excluded from the `unit` project and run in the `performance` project after it (`sequence.groupOrder: 1`), single-threaded. Wall-clock assertions must not race other files.
- Performance assertions use environment-aware thresholds from `test-utils/performance.ts` (CI multiplies budgets). Don't hardcode millisecond values.
- **CodeEditorV2 tests** mock `@monaco-editor/react` via `__tests__/mocks/monaco-editor-react.tsx` — they assert wrapper chrome, not Monaco internals. Reuse that mock if you add more CodeEditor tests.
- `initTokens` (`lib/context/initComponentTokens.ts`) memoizes by foundation/componentTokens reference + theme value so identical `ThemeProvider` mounts reuse the resolved token object.
- Fuller detail: `packages/blend/__tests__/TESTING_GUIDE.md`.

## Branches, commits, releases

Flow is `feature branch → dev → staging → main`. This workspace targets `origin/dev`; open PRs with `gh pr create --base dev`.

Commits are conventional and enforced by commitlint on `commit-msg`: types `build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test`, lowercase type, **header max 82 chars**.

CI (`.github/workflows/ci.yml`) runs on push and PR to `main` and `dev` only — not `staging`. Jobs: `format:check` → `check:circular` → `pnpm build`, then coverage and a11y in parallel, plus a `pkg-pr-new` preview publish. Note the root `pnpm lint` is not run directly; lint reaches CI only through `packages/blend`'s build script.

Releases are manual `workflow_dispatch` runs with confirmation strings: `create-beta-release` + `publish-beta-npm` from `staging` (beta dist-tag), then `promote-to-stable` + `publish-stable-npm` from `main` (latest tag). Details in `docs/RELEASE_WORKFLOW.md`.

## Further reading

`DESIGN.md` (visual language, full color/type/spacing spec), `CONTRIBUTING.md`, `APP_GUIDE.md` (consumer integration), `BLEND_TOKEN_STUDIO.md` (token engine + CLI), `DEPLOYMENT_GUIDE.md`, `FIGMA_CODE_CONNECT.md`.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill. If a referenced skill is unavailable, continue with the best available workflow.

Key routing rules:

- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
