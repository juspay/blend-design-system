# Blend Native Site

Expo demo app for [`blend-native`](../../packages/blend-native).

Every component the library ships gets two views of it, sharing one
light/dark toggle driven by a single `BlendNativeProvider`:

- **Preview** — one instance, a panel of controls that reach every variant
  and combination, and the JSX for whatever is currently on screen.
- **Gallery** — the dense every-variant grid, which is what catches
  regressions.

A **side drawer** picks the component; a **native bottom bar** picks the view.
The selection is shared, so moving between Preview and Gallery keeps you on
the same component.

Open the drawer with the hamburger. Edge-swipe also works, **except on
Android devices using gesture navigation**, where the system claims the left
edge for its own back gesture and closes the app instead. That is the OS
winning a gesture race, not a bug in the drawer, and it is why the hamburger
is always present rather than being hidden on touch targets.

This app is not a showcase for its own sake — it is the **verification vehicle
for the library**. Several bugs in `blend-native` were invisible to the test
suite and to `react-native-web`, and only appeared on a real simulator. See
[Why you must check on a simulator](#why-you-must-check-on-a-simulator).

## Running it

```bash
pnpm install                # from the repo root
pnpm build:blend            # required — see the note below

cd apps/native-site
pnpm start                  # then press i / a / w
pnpm test                   # the playground's pure layer (snippet + options)
```

`pnpm build:blend` is not optional. `blend-native` imports tokens from
`@juspay/blend-design-system/node`, which resolves to that package's **built**
`dist/`. If you have just changed `packages/blend/lib/node.ts`, the new exports
are missing until you rebuild, and the failure looks like an unrelated
`undefined is not an object` at runtime.

| Key | Target                                        |
| --- | --------------------------------------------- |
| `i` | iOS simulator (Expo Go)                       |
| `a` | Android emulator or device — **see the note** |
| `w` | Browser, via `react-native-web`               |

### Prerequisites

| For              | You need                                    |
| ---------------- | ------------------------------------------- |
| iOS simulator    | macOS, Xcode, Command Line Tools            |
| Android emulator | Android Studio + an AVD, `ANDROID_HOME` set |
| Android device   | The above, plus **JDK 17** for a dev build  |
| Web              | Any browser                                 |

### On the web target

The browser build wraps the app in a phone frame by default, so it reads like
a device rather than a full-width page. A **Mobile / Web** switch in the
bottom-right toggles that, with zoom controls beside it. Native builds are
unaffected — `MobileFrame.native.tsx` is a passthrough.

## Running on a physical device

### iOS

Expo Go works. `pnpm start`, then scan the QR with the Camera app.

### Android — Expo Go will probably not work

**The Play Store version of Expo Go is often behind this project's Expo SDK.**
At the time of writing the Play Store serves Expo Go **54.x** while this app is
on SDK **56**, and Expo Go refuses to open a project whose SDK it does not
match:

```
Project is incompatible with this version of Expo Go
```

There is no Play Store update to fix that. Build the app instead — which is a
better test anyway, since it is the real native runtime rather than a sandbox:

```bash
# 1. Enable Developer options on the phone (tap Build number 7x),
#    turn on USB debugging, connect the cable, accept the prompt.
adb devices                        # must list your device as `device`

# 2. Let the phone reach Metro over the cable.
adb reverse tcp:8081 tcp:8081

# 3. Build, install and launch. First build ~2 min; later ones are cached.
cd apps/native-site
npx expo run:android
```

`expo run:android` generates `android/` via prebuild. That directory is
gitignored and safe to delete; keeping it makes subsequent builds much faster.

## Capturing what you see

Screenshots are the fastest way to compare against the web original, and the
only way to review a change asynchronously.

```bash
# iOS simulator
xcrun simctl io booted screenshot out.png

# Android emulator or device
adb shell screencap -p /sdcard/s.png && adb pull /sdcard/s.png out.png
```

### Capturing a pressed state

Press feedback — the Android ripple, the iOS scale — only exists while the
finger is down, so a plain screenshot never shows it. Hold the touch open with
`motionevent`, capture, then release:

```bash
adb shell input motionevent DOWN 620 740
adb shell screencap -p /sdcard/p.png
adb shell input motionevent UP 620 740
adb pull /sdcard/p.png press.png
```

**`adb shell input swipe` does not work for this**, even with identical start
and end coordinates — Android reads it as a fling and the page scrolls instead
of the control being pressed.

## Why you must check on a simulator

`react-native-web` is convenient but it is _not_ React Native. Every one of
these shipped green on the browser target and was broken on a device:

| Bug                                      | Cause                                                                                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Tag labels sheared off their descenders  | Fixed `height` + vertical padding left a content box shorter than the line height. CSS lets the line box overflow harmlessly; RN clips it. |
| Long Alert descriptions ran off the edge | **Yoga defaults `flexShrink` to 0 where CSS defaults it to 1**, so the text box sized to its content and never wrapped.                    |
| Press feedback looked wrong on Android   | Only the iOS scale transform was applied; Android expects a ripple.                                                                        |

The unit suites could not catch any of them: they verify a resolved style
object, not what reached the screen. Render tests (`pnpm --filter
blend-native test:render`) now cover behaviour and accessibility, but
**visual correctness still needs eyes on a device.**

The bottom bar is a third platform check on top of those two: it is a real
`UIVisualEffectView` on iOS 26 through `expo-glass-effect`, a Material 3
navigation bar on Android, and a plain bordered bar on the web. Below iOS 26
the glass API is absent, so the iOS file falls back to an opaque surface —
a translucent bar with no material behind it would leave the labels sitting
unreadably on the scroll content. Checking one platform tells you nothing
about the other two.

## Folder structure

```
apps/native-site/
├── App.tsx                        # provider, drawer, app bar, tab bar
├── app.json                       # Expo config
├── metro.config.js                # pnpm symlink + workspace source resolution
├── babel.config.js
├── playground/
│   ├── types.ts                   # ComponentSpec, Control — the contract
│   ├── snippet.ts                 # props -> JSX string (pure, unit-tested)
│   ├── snippet.test.ts
│   ├── chrome.ts                  # the harness palette, deliberately not Blend's
│   ├── Playground.tsx             # stage + controls + snippet + reset
│   ├── Gallery.tsx                # wraps a showcase as the second view
│   ├── AppBar.tsx                 # title, hamburger, theme toggle
│   ├── ComponentDrawer.tsx        # the grouped component list
│   ├── tabBar.shared.ts           # props the three tab bars all satisfy
│   ├── PlaygroundTabBar.tsx       # default / web
│   ├── PlaygroundTabBar.ios.tsx   # Liquid Glass (expo-glass-effect)
│   ├── PlaygroundTabBar.android.tsx  # Material 3 navigation bar
│   ├── controls/                  # Segmented, Select, Toggle, Text, Panel
│   └── specs/                     # one file per component + the registry
└── components/                    # the showcases, now the Gallery view
    ├── AlertShowcase.tsx       # 7 types x 2 subTypes, actions, slots, wrapping
    ├── TagShowcase.tsx         # 3 types x 6 colors x 4 sizes x 2 subTypes
    ├── ButtonShowcase.tsx      # types, sizes, states, subTypes, widths
    ├── InputShowcase.tsx       # TextInput sizes, slots, states
    ├── LoadingShowcase.tsx     # Skeleton, Spinner, ProgressBar
    ├── DisplayShowcase.tsx     # Avatar, Card, KeyValuePair
    ├── SheetShowcase.tsx       # BottomSheet
    ├── PlatformPreview.tsx     # web-only Mobile/Web switch + zoom
    ├── MobileFrame.web.tsx     # phone chrome for the browser target
    └── MobileFrame.native.tsx  # passthrough on native
```

### Two rules the harness depends on

**The control chrome is plain React Native, never `blend-native`.** The
playground is the instrument used to inspect the library, so it has to keep
working when the library does not — a control panel built out of the
components under test goes blank exactly when you need it. `chrome.ts` holds
its own palette for the same reason.

**Options come from the enums, not from hardcoded lists.**
`enumOptions(TagColor, 'TagColor')` rather than `['neutral', 'primary', ...]`,
so a colour added to the library shows up in the controls on its own. String
unions have no runtime object to enumerate, so `unionOptions` takes an
explicit list — and fails to compile if the union gains a member the list
does not have.

`MobileFrame.web.tsx` / `MobileFrame.native.tsx` are a genuine platform split,
which is what Metro's `.web` / `.native` suffixes are for. Note that
`blend-native`'s own files deliberately do **not** use those suffixes — it has
no platform variants, and the suffix would advertise a split that does not
exist.

### Adding a component

Write a spec and register it. There is no screen to add.

1. Create `playground/specs/<name>.spec.tsx`:

    ```tsx
    const spec: ComponentSpec<BadgeNativeProps> = {
        name: 'Badge',
        summary: 'One line on what is worth knowing.',
        mode: 'inline', // 'overlay' for things that present over the screen
        defaults: { text: 'New', variant: BadgeVariant.SUBTLE },
        controls: [
            {
                kind: 'segmented',
                key: 'variant',
                label: 'Variant',
                options: enumOptions(BadgeVariant, 'BadgeVariant'),
            },
            { kind: 'text', key: 'text', label: 'Text', always: true },
        ],
        render: (props) => <Badge {...props} />,
        gallery: BadgeShowcase, // optional; without it the Gallery tab hides
    }
    ```

2. Add it to a group in `playground/specs/index.ts`.

Notes that save time:

- `always: true` prints a prop in the snippet even at its default. Use it for
  props the component has no default for — without it the snippet reads
  `<Badge />`, which renders nothing.
- `hidden: true` drives the preview without printing. It is for
  playground-only props such as a family selector.
- A `segmented` control with more than four options is promoted to a picker
  automatically, so nobody has to remember to change `kind` when an enum grows.
- Toggle payloads that are objects must be **module-level constants** — the
  toggle decides it is on by comparing with `Object.is`, so an inline object
  would leave it permanently off.

### Adding a gallery

1. Create `components/<Name>Showcase.tsx` returning a `View` (the harness
   supplies the `ScrollView`).
2. Point a spec's `gallery` at it. Several specs may share one.
3. Lead with the case most likely to regress. `AlertShowcase` opens with a
   long wrapping description for exactly this reason.

## Troubleshooting

**`Project is incompatible with this version of Expo Go`**
See [Android — Expo Go will probably not work](#android--expo-go-will-probably-not-work). Build with `npx expo run:android`.

**Metro can't find `blend-native`**
Run `pnpm install` from the repo root to link workspace packages, then
`pnpm start --clear` to drop Metro's cache.

**A token or enum is `undefined` at runtime**
`packages/blend` has not been rebuilt since its `lib/node.ts` changed. Run
`pnpm build:blend`.

**`Request timed out` when starting Expo**
Expo's remote API is unreachable. Add `--offline`; everything here works
without it. Note `--offline` and `--localhost` are mutually exclusive.

**`Unable to resolve asset "./assets/icon.png"`**
Stale `app.json` asset references. Should already be removed — if it returns,
either add the file or drop the field.

**Gradient buttons look flat or invisible**
`expo-linear-gradient` is an _optional_ peer of `blend-native`; without it,
gradients fall back to their first colour. Install it, and check
`parseBackground` in `cssStringAdapter.ts` is parsing the token.

**TypeScript errors in `blend-native` source**
Type-check the package on its own: `pnpm --filter blend-native typecheck`.
This app's `tsconfig.json` extends `expo/tsconfig.base`, which has different
strictness settings.
