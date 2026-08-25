# @juspay/blend-native

React Native components for the [Blend Design System](https://github.com/juspay/blend-design-system).

This package consumes Blend's token system via the React-free `@juspay/blend-design-system/node` entry and translates CSS-string token values into React Native style objects. No `styled-components`, no DOM, no `window.addEventListener`.

## Architecture

```
@juspay/blend-design-system/node          ← React-free token entry (FOUNDATION_THEME, Theme, getXTokens factories, enums)
        │
        ▼
┌─────────────────────────────────────┐
│  adapters/                          │  ← CSS-string → RN style translation
│    cssStringAdapter.ts              │     parseDimension, parseBorder,
│    tokenResolver.ts                 │     parseBorderRadius, parseBoxShadow,
│                                     │     parseBackground
│  primitives/                        │  ← Native equivalents of web Primitives
│    Block.native.tsx                 │     (which use styled-components)
│    Pressable.native.tsx             │     Block → RN View
│    Text.native.tsx                  │     Pressable → RN Pressable + LinearGradient
│                                     │     Text → RN Text
│  components/                        │  ← Component implementations
│    Button/                          │     Button is the reference implementation
│      Button.native.tsx              │     Pattern scales to all V2 components
│      button.native.utils.ts         │
│      index.ts                       │
│                                     │
│  index.ts                           │  ← Public barrel export
│  native.types.ts                    │  ← Native prop types
└─────────────────────────────────────┘
```

### Why a separate package?

A POC originally added `.native.tsx` files directly inside `packages/blend/lib/components/ButtonV2/`. That worked in Expo but broke structural quality gates:

- Barrel imports pulled `styled-components` into RN bundles
- `useBreakPoints.ts` used DOM `window.addEventListener` (crashes on RN)
- The Vite build for web would have been polluted

`blend-native` is a sibling package that imports **only** from `@juspay/blend-design-system/node` — the React-free, CSS-free entry point. The web package stays 100% untouched.

### Token flow

```
getButtonV2Tokens(FOUNDATION_THEME, theme)
    │
    │ returns { sm: {...}, lg: {...} }   ← responsive token object
    ▼
resolveTokens(getButtonV2Tokens, theme, 'sm')
    │
    │ returns flat token object for 'sm' breakpoint
    │ (RN is always mobile → breakpoint is always 'sm')
    ▼
getButtonNativeStyles(isSkeleton, isDisabled, buttonType, subType, size, state, tokens, ...)
    │
    │ returns ButtonV2NativeStyles with CSS-string values
    │ (background, border, boxShadow, padding, gap, borderRadius)
    ▼
<Pressable background="linear-gradient(...)" border="1px solid #E1E4EA" .../>
    │
    │ cssStringAdapter parses each CSS string → ViewStyle
    ▼
RN Pressable + LinearGradient renders
```

### CSS-string adapter

Blend tokens emit CSS string values (`"6px"`, `"1px solid #E1E4EA"`, `"linear-gradient(180deg, #1A56DB -5%, #2563EB 107.5%)"`, `"0px 2px 8px 1px rgba(5,5,6,0.07)"`). RN's stylesheet engine accepts only numbers or platform-specific style objects. Every token value that touches layout or decoration is translated in `cssStringAdapter.ts`:

| Function            | Input                                         | Output                                                                  |
| ------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `parseDimension`    | `"6px"`, `"0"`                                | `6`, `0`                                                                |
| `parseBorder`       | `"1px solid #E1E4EA"`                         | `{ borderWidth: 1, borderColor: '#E1E4EA' }`                            |
| `parseBorderRadius` | `"10px"`, `"10px 0 0 10px"`                   | `10` or `{ borderTopLeftRadius: 10, ... }`                              |
| `parseBoxShadow`    | `"0px 2px 8px rgba(0,0,0,0.15)"`              | `{ shadowColor, shadowOffset, shadowOpacity, shadowRadius, elevation }` |
| `parseBackground`   | `"linear-gradient(180deg, #1A56DB, #2563EB)"` | `{ type: 'gradient', colors, locations, start, end }`                   |
| `parseBackground`   | `"#FFFFFF"`                                   | `{ type: 'flat', color: '#FFFFFF' }`                                    |
| `parseBackground`   | `"none"`                                      | `null`                                                                  |

All functions are pure and defensive — unparseable input returns a safe fallback rather than throwing.

### Primitives

| Primitive   | Replaces                                | Notes                                                                                                                                                                                               |
| ----------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Block`     | web `Block` (styled `div`)              | Wraps RN `View`, accepts layout props as CSS strings                                                                                                                                                |
| `Pressable` | web `PrimitiveButton` (styled `button`) | Wraps RN `Pressable`, handles `pressed`/`disabled`/`loading` states. Gradient backgrounds render via `<LinearGradient>` wrapper with negative-inset bleed to eliminate sub-pixel antialiasing gaps. |
| `Text`      | web `Text` (styled `span`)              | Wraps RN `Text`, maps `fontSize`/`fontWeight`/`color`/`lineHeight`/`textAlign`                                                                                                                      |

### Button component

The reference implementation. Imports only from:

- `@juspay/blend-design-system/node` — token factory + enums
- `../../adapters/*` — CSS-string → RN style translation
- `../../primitives/*` — native Block / Pressable / Text

Does **not** import from `blend`'s context/hooks/Primitives directories.

## Folder structure

```
packages/blend-native/
├── package.json              # @juspay/blend-native, publishes raw src/ (no build step)
├── tsconfig.json             # ES2020, no DOM lib, JSX react-jsx, strict
├── eslint.config.js          # Mirrors web config, no browser globals
└── src/
    ├── index.ts              # Public barrel: export { Button }, re-export enums
    ├── native.types.ts       # ButtonNativeProps = ButtonBaseProps & { onPress, disabled, testID, ... }
    ├── adapters/
    │   ├── cssStringAdapter.ts   # Pure CSS-string → RN style functions
    │   └── tokenResolver.ts      # resolveTokens() — no React hooks, no context
    ├── primitives/
    │   ├── Block.native.tsx      # RN View wrapper (layout props)
    │   ├── Pressable.native.tsx  # RN Pressable + LinearGradient (interactive surface)
    │   └── Text.native.tsx       # RN Text wrapper (typography props)
    └── components/
        └── Button/
            ├── Button.native.tsx         # The component (memoized token resolution)
            ├── button.native.utils.ts    # getButtonNativeStyles() style resolver
            └── index.ts                  # export { default as Button }
```

## Installation

```bash
pnpm add @juspay/blend-native @juspay/blend-design-system expo-linear-gradient react react-native
```

### Peer dependencies

| Package                       | Version    |
| ----------------------------- | ---------- |
| `@juspay/blend-design-system` | `>=0.0.37` |
| `expo-linear-gradient`        | `>=15.0.0` |
| `react`                       | `>=18.2.0` |
| `react-native`                | `>=0.74.0` |

## Usage

```tsx
import { Button, ButtonType, ButtonSize } from '@juspay/blend-native'

function Example() {
    return (
        <Button
            buttonType={ButtonType.PRIMARY}
            size={ButtonSize.SMALL}
            text="Press me"
            onPress={() => console.log('pressed')}
        />
    )
}
```

### Props

| Prop                 | Type                  | Default   | Description                                             |
| -------------------- | --------------------- | --------- | ------------------------------------------------------- |
| `buttonType`         | `ButtonType`          | `PRIMARY` | `PRIMARY`, `SECONDARY`, `DANGER`, `SUCCESS`             |
| `size`               | `ButtonSize`          | `SMALL`   | `SMALL`, `MEDIUM`, `LARGE`                              |
| `subType`            | `ButtonSubType`       | `DEFAULT` | `DEFAULT`, `INLINE`, `ICON_ONLY`                        |
| `state`              | `ButtonState`         | `DEFAULT` | `DEFAULT`, `HOVER`, `ACTIVE` (hover is no-op on native) |
| `text`               | `string`              | —         | Button label                                            |
| `leftSlot`           | `{ slot: ReactNode }` | —         | Leading icon/element                                    |
| `rightSlot`          | `{ slot: ReactNode }` | —         | Trailing icon/element                                   |
| `loading`            | `boolean`             | `false`   | Shows spinner, disables interaction                     |
| `disabled`           | `boolean`             | `false`   | Disabled state with token-driven styling                |
| `width`              | `string \| number`    | `'auto'`  | `"100%"`, `"auto"`, `"fit-content"`, `120` (px)         |
| `minWidth`           | `string \| number`    | —         | Minimum width constraint                                |
| `maxWidth`           | `string \| number`    | —         | Maximum width constraint                                |
| `onPress`            | `() => void`          | —         | Press handler                                           |
| `testID`             | `string`              | —         | Test ID                                                 |
| `accessibilityLabel` | `string`              | `text`    | Screen reader label                                     |
| `theme`              | `Theme`               | `LIGHT`   | `LIGHT` or `DARK`                                       |

## Development

```bash
# Type-check
pnpm tsc --noEmit

# Lint
pnpm lint
```

The package publishes raw TypeScript source (no build step). Metro transpiles TS directly — this is standard for RN libraries.

## Adding new components

Follow the Button pattern:

1. Ensure the token factory and enums are exported from `@juspay/blend-design-system/node` (edit `packages/blend/lib/node.ts` if needed).
2. Create `src/components/<Component>/` with:
    - `<Component>.native.tsx` — the component, calling `resolveTokens(getXTokens, theme, 'sm')`
    - `<component>.native.utils.ts` — style resolver returning `ViewStyle`/`TextStyle` objects
    - `index.ts` — barrel export
3. Add native prop types to `src/native.types.ts`.
4. Export from `src/index.ts`.

## Known limitations

- **Gradient percentage midpoints**: Token gradients use positions outside `[0,1]` (e.g. `-5%`, `107.5%`). RN's `<LinearGradient>` clamps `locations` to `[0,1]`, so gradients render as simple 2-stop fades.
- **Inset shadows dropped**: RN has no inset-shadow concept. `parseBoxShadow` returns `null` for inset declarations. Focus-ring shadows are parsed as outer shadows.
- **Hover is a no-op**: `ButtonState.HOVER` exists in the enum but native has no hover interaction. Tokens are only applied if the consumer explicitly sets `state={ButtonState.HOVER}`.
- **No `ThemeProvider`**: Native components resolve tokens via `resolveTokens()` — a plain function, not React context. Theme is passed as a prop per component.
