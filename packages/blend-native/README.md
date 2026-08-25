# @juspay/blend-native

React Native components for the [Blend Design System](https://github.com/juspay/blend-design-system).

This package consumes Blend's token system via the React-free `@juspay/blend-design-system/node` entry and translates CSS-string token values into React Native style objects. No `styled-components`, no DOM, no `window.addEventListener`.

## Architecture

```
@juspay/blend-design-system/node   ← React-free token entry
  FOUNDATION_THEME, Theme, BREAKPOINTS, mergeTokenTree,
  getXTokens factories, component enums
        │
        ▼
┌──────────────────────────────────────────────────────────┐
│  theme/          BlendNativeProvider + useNativeTokens    │
│                  (context, deep-merged overrides,         │
│                   breakpoint resolution)                  │
│                                                           │
│  adapters/       CSS-string → RN style translation        │
│                  cssStringAdapter, surfaceStyle           │
│                                                           │
│  primitives/     Block, Pressable, Text, Slot, Separator  │
│                                                           │
│  a11y/           live-region announcements                │
│                                                           │
│  components/     Alert, Button, Tag, shared/              │
└──────────────────────────────────────────────────────────┘
```

### Why a separate package?

A POC originally added native files directly inside `packages/blend/lib/components/ButtonV2/`. That worked in Expo but broke structural quality gates:

- Barrel imports pulled `styled-components` into RN bundles
- `useBreakPoints.ts` used DOM `window.addEventListener` (crashes on RN)
- The Vite build for web would have been polluted

`blend-native` is a sibling package that imports **only** from `@juspay/blend-design-system/node` — the React-free, CSS-free entry point. The web package stays untouched apart from additive exports.

### Token flow

```
<BlendNativeProvider theme componentTokens>
    │
    ▼
useNativeTokens<XTokensType>('TAGV2')
    │  1. look the slot up in nativeTokenRegistry
    │  2. call the factory → { sm: {...}, lg: {...} }
    │  3. mergeTokenTree(defaults, overrides)   ← shared with web
    │  4. pick the active breakpoint            ← useWindowDimensions
    ▼
flat token object
    │
    ▼
get<X>NativeStyles(...)  → CSS-string values per state
    │
    ▼
<Pressable background="linear-gradient(...)" border="1px solid #E1E4EA" />
    │  resolveSurfaceStyle → ViewStyle
    ▼
RN Pressable (+ LinearGradient when the background is a gradient)
```

`mergeTokenTree` is imported from the web package rather than reimplemented, so override semantics cannot drift between platforms.

### Theming

Theme and per-slot token overrides come from context, mirroring web's `ThemeProvider`:

```tsx
import { BlendNativeProvider, Theme } from '@juspay/blend-native'
;<BlendNativeProvider
    theme={Theme.DARK}
    componentTokens={{
        TAGV2: { sm: { gap: '8px' } },
    }}
>
    <App />
</BlendNativeProvider>
```

Overrides are deep-merged onto the active theme's defaults — supply only the paths you want to change and every untouched path keeps its light/dark value. Components also work with no provider mounted, falling back to light-theme defaults.

`theme` also accepts `'system'` (exported as `SYSTEM_THEME`), which follows the OS appearance via `useColorScheme` and re-renders when the user flips light/dark. `breakpoints` overrides the thresholds token resolution uses (`{ sm: 320, lg: 1024 }` by default — tablets resolve `lg`).

### Fonts

Web never applies Blend's font tokens — components inherit whatever the host document loads, and the consuming app supplies InterDisplay via `@font-face`. RN has no inheritance, so the provider is the inheritance mechanism: it resolves one family per role (`display` / `body` / `heading` / `mono`, defaulting to the foundation `font.family` tokens) and `Text` applies the `body` role by default.

Consumers must load the faces themselves (e.g. `expo-font`, or native asset linking) **under the exact token family name** (`InterDisplay`); until they do, the platform falls back to the system font (with a dev warning on iOS). Opt out or override per role:

```tsx
<BlendNativeProvider fontFamily="system" />              // platform fonts everywhere
<BlendNativeProvider fontFamily={{ mono: 'JetBrainsMono' }} />  // override one role
<BlendNativeProvider fontFamily={{ body: null }} />      // disable one role
```

Android note: static font files must be registered so numeric `fontWeight` values resolve within one family (the `expo-font` config plugin handles this); otherwise weights beyond regular/bold may not render.

### Font scaling

OS font scaling (Dynamic Type) is deliberately left **on** — the package policy is to respect it and let controls grow: components size with `minHeight`, never a fixed `height`, so scaled text expands the control instead of clipping. Consumers needing a cap can pass RN's own `maxFontSizeMultiplier` through to `Text`.

### CSS-string adapter

Blend tokens emit CSS strings (`"6px"`, `"1px solid #E1E4EA"`, `"linear-gradient(...)"`, `"0px 2px 8px rgba(5,5,6,0.07)"`). RN's stylesheet accepts only numbers or platform-specific objects, so every token value that touches layout or decoration is translated in `cssStringAdapter.ts`:

| Function            | Input                                         | Output                                                                  |
| ------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `parseDimension`    | `"6px"`, `"0"`                                | `6`, `0`                                                                |
| `parseSize`         | `"50%"`, `"auto"`, `"fit-content"`, `"24px"`  | `'50%'`, `'auto'`, `'auto'`, `24`                                       |
| `parseBorder`       | `"1px solid #E1E4EA"`                         | `{ borderWidth: 1, borderColor: '#E1E4EA' }`                            |
| `parseBorderRadius` | `"10px"`, `"10px 0 0 10px"`                   | `10` or `{ borderTopLeftRadius: 10, ... }`                              |
| `parseBoxShadow`    | `"0px 2px 8px rgba(0,0,0,0.15)"`              | `{ shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation }` |
| `parseBackground`   | `"linear-gradient(180deg, #1A56DB, #2563EB)"` | `{ type: 'gradient', colors, locations, start, end }`                   |
| `parseBackground`   | `"#FFFFFF"`                                   | `{ type: 'flat', color: '#FFFFFF' }`                                    |

All functions are pure and total — unparseable input returns a safe fallback rather than throwing. `parseSize` is deliberately strict: `parseFloat` would turn `"100%"` into `100`, which RN renders as 100 **pixels**.

`surfaceStyle.ts` composes those parsers into `resolveSurfaceStyle`, the single translation both `Block` and `Pressable` use.

### Primitives

| Primitive   | Replaces                                | Notes                                                                                                                                                  |
| ----------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Block`     | web `Block` (styled `div`)              | RN `View`. Has **no `color` prop** — web's `color` is a foreground value; use `backgroundColor` for fills and `Slot` for icon tinting.                 |
| `Pressable` | web `PrimitiveButton` (styled `button`) | RN `Pressable`. Handles pressed/disabled/loading. Gradients render via `<LinearGradient>` with a negative-inset bleed to avoid antialiasing gaps.      |
| `Text`      | web `Text` (styled `span`)              | RN `Text`, maps `fontSize`/`fontWeight`/`color`/`lineHeight`/`textAlign`                                                                               |
| `Slot`      | web `Block` used as an icon wrapper     | Tints icons explicitly (RN has no `currentColor`), honours per-slot `maxHeight`, and hides itself from screen readers when the parent also has a label |

`Block` and `Pressable` both derive their props from `SurfaceStyleProps`. That shared base is load-bearing: components that switch between the two depending on interactivity build one surface object for both, and a divergent prop set would silently vanish into `...rest` without TypeScript noticing.

## Folder structure

```
packages/blend-native/
├── package.json          # dual ESM+CJS build via react-native-builder-bob;
│                         # Metro consumes raw src/ via the react-native condition
├── tsconfig.json         # ES2020, no DOM lib, JSX react-jsx, strict
├── tsconfig.build.json   # declaration-only emit for bob's typescript target
├── eslint.config.js      # mirrors web config, no browser globals
├── vitest.config.ts      # covers the pure layer (see Testing)
├── jest.config.cjs       # RN preset for *.render.test.tsx (RNTL)
├── __tests__/
└── src/
    ├── index.ts                  # public barrel — the semver commitment
    ├── theme/
    │   ├── BlendNativeProvider.tsx   # context (theme, overrides, breakpoints, fonts)
    │   ├── useNativeTokens.ts        # slot → flat, override-merged tokens
    │   ├── nativeTokenRegistry.ts    # slot → factory (ONE file per new component)
    │   ├── useNativeBreakpoint.ts    # useWindowDimensions → 'sm' | 'lg'
    │   ├── breakpoint.ts             # pure width → label (RN-free, testable)
    │   ├── fonts.ts                  # pure role → family resolution (RN-free)
    │   └── systemTheme.ts            # pure 'system' → light/dark (RN-free)
    ├── adapters/
    │   ├── cssStringAdapter.ts       # pure CSS-string → RN value parsers
    │   └── surfaceStyle.ts           # composes them into a ViewStyle
    ├── a11y/
    │   ├── announcement.ts           # pure announcement composition
    │   └── useLiveRegion.ts          # iOS announceForAccessibility bridge
    ├── primitives/
    │   ├── Block.tsx  Pressable.tsx  Text.tsx  Slot.tsx  Separator.tsx
    │   ├── pressFeedback.ts          # ripple (Android) vs scale (elsewhere)
    │   ├── tintSlot.ts               # explicit icon tinting (no currentColor)
    │   └── touchTarget.ts            # 44pt hitSlop policy (RN-free, testable)
    └── components/
        ├── shared/
        │   └── group.ts              # grouped-control radius/border collapse
        ├── Alert/                    # Alert.tsx + AlertActions/AlertClose/AlertText
        ├── Button/
        │   ├── Button.tsx
        │   ├── button.types.ts
        │   ├── button.utils.ts
        │   └── index.ts
        └── Tag/                      # same shape as Button/
```

Files are named plainly. `.native.tsx` / `.ios.tsx` / `.web.tsx` are Metro **resolver directives** meaning "use this instead of the sibling", so they are reserved for genuine platform splits — this package has none.

## Installation

```bash
pnpm add @juspay/blend-native @juspay/blend-design-system react react-native
# only if you use gradient variants (Button primary):
pnpm add expo-linear-gradient
```

### Peer dependencies

| Package                       | Version    | Required                                          |
| ----------------------------- | ---------- | ------------------------------------------------- |
| `@juspay/blend-design-system` | `>=0.0.37` | yes                                               |
| `react`                       | `>=18.2.0` | yes                                               |
| `react-native`                | `>=0.74.0` | yes                                               |
| `expo-linear-gradient`        | `>=15.0.0` | **optional** — gradients fall back to a flat fill |

## Usage

```tsx
import {
    BlendNativeProvider,
    Button,
    ButtonType,
    Tag,
    TagType,
    TagColor,
} from '@juspay/blend-native'

function Example() {
    return (
        <BlendNativeProvider>
            <Button
                buttonType={ButtonType.PRIMARY}
                text="Press me"
                onPress={() => console.log('pressed')}
            />
            <Tag text="Beta" type={TagType.SUBTLE} color={TagColor.PRIMARY} />
        </BlendNativeProvider>
    )
}
```

### Button props

| Prop                 | Type                                 | Default   | Description                                             |
| -------------------- | ------------------------------------ | --------- | ------------------------------------------------------- |
| `buttonType`         | `ButtonType`                         | `PRIMARY` | `PRIMARY`, `SECONDARY`, `DANGER`, `SUCCESS`             |
| `size`               | `ButtonSize`                         | `SMALL`   | `SMALL`, `MEDIUM`, `LARGE`                              |
| `subType`            | `ButtonSubType`                      | `DEFAULT` | `DEFAULT`, `INLINE`, `ICON_ONLY`                        |
| `state`              | `ButtonState`                        | `DEFAULT` | `DEFAULT`, `HOVER`, `ACTIVE` (hover is no-op on native) |
| `text`               | `string`                             | —         | Button label                                            |
| `leftSlot`           | `{ slot, maxHeight? }`               | —         | Leading icon/element                                    |
| `rightSlot`          | `{ slot, maxHeight? }`               | —         | Trailing icon/element                                   |
| `loading`            | `boolean`                            | `false`   | Swaps content for a spinner; keeps its own chrome       |
| `disabled`           | `boolean`                            | `false`   | Disabled chrome + blocks presses                        |
| `width`              | `string \| number`                   | `'auto'`  | `"100%"`, `"auto"`, `"fit-content"`, `120`              |
| `minWidth`           | `string \| number`                   | —         | Minimum width constraint                                |
| `maxWidth`           | `string \| number`                   | —         | Maximum width constraint                                |
| `onPress`            | `(e: GestureResponderEvent) => void` | —         | Press handler                                           |
| `testID`             | `string`                             | —         | Test ID                                                 |
| `accessibilityLabel` | `string`                             | `text`    | Screen reader label                                     |

Plus any `PressableProps` (`onLongPress`, `onPressIn`, `hitSlop`, `accessibilityHint`, …) and a `style` escape hatch. Refs forward to the underlying `Pressable`.

### Tag props

| Prop                 | Type                                 | Default     | Description                                                   |
| -------------------- | ------------------------------------ | ----------- | ------------------------------------------------------------- |
| `text`               | `string`                             | — (req.)    | Tag label                                                     |
| `type`               | `TagType`                            | `SUBTLE`    | `NO_FILL`, `SUBTLE`, `ATTENTIVE`                              |
| `color`              | `TagColor`                           | `PRIMARY`   | `NEUTRAL`, `PRIMARY`, `SUCCESS`, `ERROR`, `WARNING`, `PURPLE` |
| `size`               | `TagSize`                            | `SM`        | `XS`, `SM`, `MD`, `LG`                                        |
| `subType`            | `TagSubType`                         | `SQUARICAL` | `SQUARICAL`, `ROUNDED` (pill)                                 |
| `leftSlot`           | `{ slot, maxHeight? }`               | —           | Leading icon/element                                          |
| `rightSlot`          | `{ slot, maxHeight? }`               | —           | Trailing icon/element                                         |
| `tagGroupPosition`   | `'left' \| 'center' \| 'right'`      | —           | Collapses the joined corners                                  |
| `onPress`            | `(e: GestureResponderEvent) => void` | —           | Supplying this makes the tag interactive                      |
| `pressed`            | `boolean \| 'mixed'`                 | —           | Toggle state (web's `aria-pressed`)                           |
| `accessibilityLabel` | `string`                             | derived     | Overrides the name built from `text` + `pressed`              |

### Alert props

| Prop                              | Type                                              | Default          | Description                                                                        |
| --------------------------------- | ------------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------- |
| `type`                            | `AlertType`                                       | `PRIMARY`        | `PRIMARY`, `SUCCESS`, `WARNING`, `ERROR`, `PURPLE`, `ORANGE`, `NEUTRAL`            |
| `subType`                         | `AlertSubType`                                    | `SUBTLE`         | `SUBTLE`, `NO_FILL`                                                                |
| `heading`                         | `string`                                          | —                | Alert heading                                                                      |
| `description`                     | `string`                                          | —                | Body text                                                                          |
| `slot`                            | `{ slot, maxHeight? }`                            | —                | Leading icon/element                                                               |
| `actions`                         | `{ position?, primaryAction?, secondaryAction? }` | bottom           | Action links; `position` is `BOTTOM` or `RIGHT`                                    |
| `closeButton`                     | `{ show?, onPress? }`                             | `{ show: true }` | Close affordance                                                                   |
| `announce`                        | `boolean`                                         | `true`           | Live-region announcement (imperative on iOS, `accessibilityLiveRegion` on Android) |
| `width` / `maxWidth` / `minWidth` | `string \| number`                                | token defaults   | Sizing overrides                                                                   |

## Development

```bash
pnpm --filter @juspay/blend-native typecheck
pnpm --filter @juspay/blend-native lint
pnpm --filter @juspay/blend-native test
```

`@juspay/blend-design-system/node` resolves to the workspace package, which serves built `dist/`. Run `pnpm build:blend` after changing `packages/blend/lib/node.ts`, or the new exports will be missing at runtime.

### Testing

Two runners, disjoint globs, both run by `pnpm test`:

- **vitest** (`test:unit`) covers the **pure** layer — adapters, surface resolution, per-component style/utility functions, breakpoint/theme/font resolution, and override merging. It runs with no RN runtime, because every `react-native` import in those modules is type-only and therefore erased.
- **jest + `@testing-library/react-native`** (`test:render`) covers `*.render.test.tsx` — what actually reaches the render tree: accessibility reachability, provider wiring (breakpoints, fonts, `theme="system"`), and regressions only a mounted component can catch.

**Verify visually on a simulator or device, not just the browser.** Several
bugs here were invisible under `react-native-web` and only appeared on a real
device — RN and CSS differ on clipping, `lineHeight`, overflow, and the default
value of `flexShrink`.

`apps/native-site` is the verification vehicle. Its
[README](../../apps/native-site/README.md) is the runbook: running on
simulators and physical devices for both platforms, capturing screenshots,
capturing pressed states, and the Expo Go SDK ceiling on Android.

## Verifying as a consumer

`apps/native-site` consumes this package through the workspace link (raw
`src/`), which is right for development but is **not** what npm consumers
receive. Before a release, smoke-test the publish artifact itself:

```bash
# 1. Build and pack — the tarball is byte-for-byte what npm publish uploads
pnpm --filter @juspay/blend-native build
pnpm --filter @juspay/blend-native pack --pack-destination /tmp

# 2. Point native-site at the tarball instead of the workspace:
#    - apps/native-site/package.json: "@juspay/blend-native": "file:/tmp/juspay-blend-native-<version>.tgz"
#    - apps/native-site/tsconfig.json: REMOVE the "@juspay/blend-native" paths entry
pnpm install --filter native-site

# 3. Consumer checks
pnpm --filter native-site typecheck        # published d.ts via the exports map
cd apps/native-site && npx expo export --platform android   # full Metro bundle
npx expo start                             # then verify on a simulator/device

# 4. Revert package.json + tsconfig.json to the workspace state and reinstall
```

The typecheck proves the `types` conditions resolve; the export proves Metro
resolves the `react-native` condition into the shipped `src/` and the whole
module graph (Reanimated worklets, gesture handler, portals) compiles.

## Publishing

`@juspay/blend-native` versions **independently** of
`@juspay/blend-design-system`; compatibility is declared through the peer
range. Publishing runs through the **Publish Native to NPM** workflow
(`.github/workflows/publish-native-npm.yml`), which gates on branch,
version format, a green lint/typecheck/test/build, and the peer-export
check below, before `npm publish`.

### Publish the web package first — always

This package imports its whole token system from
`@juspay/blend-design-system/node`. The workspace build always has the
newest exports, so **local checks and CI cannot tell you whether the
version consumers will install has them**. A new native component almost
always adds an export to `packages/blend/lib/node.ts`, and until a web
version containing it is on npm, publishing native ships a package that
crashes on first render with an unrelated `undefined`.

```bash
pnpm --filter @juspay/blend-native check:peer
```

resolves the floor version out of the declared peer range, fetches that
exact version from the registry, and asserts every value import exists in
it. Run it before any release; the publish workflow runs it too. When it
fails, the fix is always the same order:

1. Publish a `@juspay/blend-design-system` version whose `lib/node.ts`
   carries the new exports (its own beta workflow runs from `staging`).
2. Raise `peerDependencies["@juspay/blend-design-system"]` here to that
   version.
3. Re-run `check:peer` — then publish native.

### Beta

1. Bump `version` in `packages/blend-native/package.json` to `X.Y.Z-beta.N`
   (e.g. `0.0.1-beta.1`) in a PR and merge it to `dev`.
2. GitHub → Actions → **Publish Native to NPM** → Run workflow **from
   `dev`** (or `staging`), `dist_tag: beta`, type `PUBLISH` to confirm.
3. The workflow refuses a non-beta version, an already-published version,
   or a red check; on success it verifies the tag on the registry.
4. Consumers install with `npm install @juspay/blend-native@beta`.

### Stable

1. Bump `version` to plain `X.Y.Z` (drop the `-beta.N`) in a PR; land it on
   `main` through the usual `dev → staging → main` train.
2. Run the same workflow **from `main`**, `dist_tag: latest`, confirm
   `PUBLISH`. The workflow refuses `latest` from any other branch.
3. Consumers on `npm install @juspay/blend-native` now get this version.

Iterating a beta: bump to `-beta.N+1`, merge, run the workflow again — the
already-published gate makes re-running for a published version a no-op.

## Adding a new component

1. Ensure the token factory, its types, and its enums are exported from `@juspay/blend-design-system/node` (edit `packages/blend/lib/node.ts`), then `pnpm build:blend`.
2. Register the slot in `src/theme/nativeTokenRegistry.ts` — **the only file to touch** for wiring (web needs three files in lockstep).
3. Create `src/components/<Component>/` with `<Component>.tsx`, `<component>.types.ts`, `<component>.utils.ts`, `index.ts`.
4. Export from `src/index.ts`.
5. Add a variant-matrix test asserting no `NaN`/`undefined` reaches a style.

## Known limitations

- **Gradient percentage midpoints**: token gradients use positions outside `[0,1]` (e.g. `-5%`, `107.5%`). RN's `<LinearGradient>` clamps `locations` to `[0,1]`, so gradients render as simple 2-stop fades.
- **Inset shadows dropped**: RN has no inset-shadow concept. `parseBoxShadow` returns `null` for inset declarations; focus-ring shadows become outer shadows.
- **Hover is a no-op**: `ButtonState.HOVER` exists in the enum but native has no hover. Tokens apply only if the consumer explicitly sets `state={ButtonState.HOVER}`.
- **No skeleton**: web's `skeleton` prop has no native counterpart. It is `Omit`ted from the prop types rather than accepted and ignored, so passing it is a compile error.
- **Tag vertical padding is not applied**: the tokens pair a height with vertical padding that leaves a content box shorter than the text's line height. CSS lets the line box overflow harmlessly; RN clips it, shearing descenders. The height token is applied as `minHeight` (identical result at the default font scale, and the box grows under OS font scaling) and the inert vertical padding is dropped.
- **Not ported from web's ButtonV2 barrel**: `IconButton`, `LinkButton` and `ButtonGroupV2` have no native counterpart yet, and neither does `TagGroupV2` — only the per-control `tagGroupPosition` / `buttonGroupPosition` prop is supported.
- **Gradients in the ESM build**: the optional `expo-linear-gradient` peer is loaded with `require`, which exists under Metro, the CJS build, and bundlers that polyfill it (webpack). In a pure-ESM Node context the probe degrades and gradient surfaces render their first-stop flat fill.

Controls smaller than 44pt automatically receive a `hitSlop` so their tap target meets Apple HIG and Material guidance without changing their visual size; pass `minTouchTarget={0}` to opt out.
