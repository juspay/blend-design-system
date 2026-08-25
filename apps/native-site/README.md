# Blend Native Site

Expo demo app for [`@juspay/blend-native`](../../packages/blend-native). Renders all Button variants to validate that tokens resolve correctly from `@juspay/blend-design-system/node` and CSS-string adapters translate them to RN styles.

## Running the app

```bash
# From repo root
pnpm install

# Start Expo dev server
cd apps/native-site
pnpm start

# Press:
#   i — open in iOS simulator
#   a — open in Android emulator
#   w — open in web browser
```

### Prerequisites

- Node.js 18+
- pnpm 10.21.0 (enforced via `engine-strict`)
- For iOS simulator: macOS + Xcode + Command Line Tools
- For Android emulator: Android Studio + AVD
- For web: any browser (uses `react-native-web`)

### Running on a physical device

```bash
# Install Expo Go on your phone, then:
pnpm start
# Scan the QR code with:
#   - Camera app (iOS)
#   - Expo Go app (Android)
```

## Folder structure

```
apps/native-site/
├── package.json          # Expo SDK 56, workspace deps on blend-native + blend
├── app.json              # Expo config (slug, icons, splash, iOS/Android bundle IDs)
├── babel.config.js       # babel-preset-expo only (no extra plugins)
├── metro.config.js       # pnpm symlink resolution + watchFolders for workspace packages
├── tsconfig.json         # Extends expo/tsconfig.base, path aliases for workspace packages
├── App.tsx               # Demo screen with all Button variants
└── assets/               # App icons and splash images (referenced by app.json)
```

### Key files

#### `metro.config.js`

Metro needs extra configuration to work with pnpm workspace symlinks:

- **`watchFolders`** — registers `packages/blend-native` and `packages/blend` as watch roots so Metro picks up source changes.
- **`unstable_enableSymlinks`** — enables following pnpm symlinks (standard since Metro 0.79).
- **`nodeModulesPaths`** — adds workspace-level `node_modules` so Metro can resolve shared dependencies.

Without this config, Metro fails to resolve `@juspay/blend-native` because pnpm symlinks it to `../../packages/blend-native`.

#### `App.tsx`

Demo screen organized into sections:

| Section                     | What it shows                                         |
| --------------------------- | ----------------------------------------------------- |
| Types                       | Primary (gradient), Secondary (flat), Danger, Success |
| Sizes                       | Small, Medium, Large                                  |
| States                      | Disabled, Loading                                     |
| SubTypes                    | Default, Inline                                       |
| Width — fixed (px)          | 80, 120, 200, 240px                                   |
| Width — percentage          | 50%, 75%, 100%                                        |
| Width — auto / fit-content  | Natural-content-width buttons                         |
| Width — min/max constraints | `minWidth`, `maxWidth`, both combined                 |

### Path aliases

`tsconfig.json` maps workspace packages to their source so both TypeScript and Metro resolve from the monorepo (no published packages needed during development):

```json
{
    "paths": {
        "@juspay/blend-native": ["../../packages/blend-native/src/index.ts"],
        "@juspay/blend-design-system/node": ["../../packages/blend/lib/node.ts"]
    }
}
```

## Dependencies

| Package                       | Version       | Purpose                             |
| ----------------------------- | ------------- | ----------------------------------- |
| `@juspay/blend-native`        | `workspace:*` | Native Button component             |
| `@juspay/blend-design-system` | `workspace:*` | Token system (via `/node` entry)    |
| `expo`                        | `~56.0.12`    | Expo SDK 56                         |
| `expo-linear-gradient`        | `~56.0.4`     | LinearGradient for gradient buttons |
| `react`                       | `19.2.3`      | React 19                            |
| `react-native`                | `0.85.3`      | React Native                        |
| `react-native-web`            | `~0.21.1`     | Web platform support                |
| `@expo/metro-runtime`         | `~56.0.20`    | Metro runtime helpers for web       |
| `react-dom`                   | `19.2.3`      | DOM renderer for web platform       |

## Troubleshooting

**Metro can't find `@juspay/blend-native`**

- Run `pnpm install` from repo root to link workspace packages.
- Clear Metro cache: `pnpm start --clear`.

**`Unable to resolve "react-native-web/dist/exports/AppRegistry"`**

- This means web deps are missing. Run `pnpm install` and ensure `react-native-web` + `react-dom` are in `package.json`.

**Expo SDK version mismatch warnings**

- Run `npx expo install --check` to auto-fix version mismatches.

**Gradient buttons appear invisible or render incorrectly**

- Ensure `expo-linear-gradient` is installed and the version matches your Expo SDK.
- Check that `parseBackground` in `cssStringAdapter.ts` is correctly parsing the gradient token string.

**TypeScript errors in `blend-native` source**

- Run `cd packages/blend-native && pnpm tsc --noEmit` to type-check the package independently.
- The app's `tsconfig.json` extends `expo/tsconfig.base` which may have different strictness settings.
