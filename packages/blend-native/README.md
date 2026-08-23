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
│  primitives/     Block, Pressable, Text, Slot             │
│                                                           │
│  components/     Button, Tag, shared/                     │
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
├── package.json          # publishes raw src/ (no build step — Metro transpiles TS)
├── tsconfig.json         # ES2020, no DOM lib, JSX react-jsx, strict
├── eslint.config.js      # mirrors web config, no browser globals
├── vitest.config.ts      # covers the pure layer (see Testing)
├── __tests__/
└── src/
    ├── index.ts                  # public barrel
    ├── theme/
    │   ├── BlendNativeProvider.tsx   # context
    │   ├── useNativeTokens.ts        # slot → flat, override-merged tokens
    │   ├── nativeTokenRegistry.ts    # slot → factory (ONE file per new component)
    │   ├── useNativeBreakpoint.ts    # useWindowDimensions → 'sm' | 'lg'
    │   └── breakpoint.ts             # pure width → label (RN-free, testable)
    ├── adapters/
    │   ├── cssStringAdapter.ts       # pure CSS-string → RN value parsers
    │   └── surfaceStyle.ts           # composes them into a ViewStyle
    ├── primitives/
    │   ├── Block.tsx
    │   ├── Pressable.tsx
    │   ├── Text.tsx
    │   └── Slot.tsx
    └── components/
        ├── shared/
        │   └── groupRadius.ts        # cross-component internals
        ├── Button/
        │   ├── Button.tsx
        │   ├── button.types.ts
        │   ├── button.utils.ts
        │   └── index.ts
        └── Tag/
            ├── Tag.tsx
            ├── tag.types.ts
            ├── tag.utils.ts
            └── index.ts
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

## Development

```bash
pnpm --filter @juspay/blend-native typecheck
pnpm --filter @juspay/blend-native lint
pnpm --filter @juspay/blend-native test
```

`@juspay/blend-design-system/node` resolves to the workspace package, which serves built `dist/`. Run `pnpm build:blend` after changing `packages/blend/lib/node.ts`, or the new exports will be missing at runtime.

### Testing

The suites cover the package's **pure** layer — adapters, surface resolution, per-component style/utility functions, breakpoint resolution, and override merging — and run under plain vitest with no RN runtime, because every `react-native` import in those modules is type-only and therefore erased.

Component render tests are not wired up yet: `@testing-library/react-native` needs a Jest + RN preset, a different toolchain from the vitest setup the rest of the monorepo uses.

**Verify visually on a simulator or device, not just the browser.** Several
bugs here were invisible under `react-native-web` and only appeared on a real
device — RN and CSS differ on clipping, `lineHeight`, overflow, and the default
value of `flexShrink`.

`apps/native-site` is the verification vehicle. Its
[README](../../apps/native-site/README.md) is the runbook: running on
simulators and physical devices for both platforms, capturing screenshots,
capturing pressed states, and the Expo Go SDK ceiling on Android.

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
- **Tag vertical padding is not applied**: the tokens pair a fixed `height` with vertical padding that leaves a content box shorter than the text's line height. CSS lets the line box overflow harmlessly; RN clips it, shearing descenders. `height` is treated as authoritative — which reproduces web's visual result exactly.
- **Not ported from web's ButtonV2 barrel**: `IconButton`, `LinkButton` and `ButtonGroupV2` have no native counterpart yet, and neither does `TagGroupV2` — only the per-control `tagGroupPosition` / `buttonGroupPosition` prop is supported.
- **No `react-native-builder-bob` build**: the package publishes raw TypeScript. Fine for Metro, not for other bundlers.

Controls smaller than 44pt automatically receive a `hitSlop` so their tap target meets Apple HIG and Material guidance without changing their visual size; pass `minTouchTarget={0}` to opt out.
