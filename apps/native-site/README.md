# Blend Native Site

Expo demo app for [`blend-native`](../../packages/blend-native).

It renders every variant of every shipped native component so they can be
checked against the web originals: **Alert**, **Tag** and **Button**, each with
a light/dark toggle driven by a single `BlendNativeProvider`.

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

## Folder structure

```
apps/native-site/
├── App.tsx                     # provider, theme toggle, tab switcher
├── app.json                    # Expo config
├── metro.config.js             # pnpm symlink + workspace source resolution
├── babel.config.js
└── components/
    ├── AlertShowcase.tsx       # 7 types x 2 subTypes, actions, slots, wrapping
    ├── TagShowcase.tsx         # 3 types x 6 colors x 4 sizes x 2 subTypes
    ├── ButtonShowcase.tsx      # types, sizes, states, subTypes, widths
    ├── PlatformPreview.tsx     # web-only Mobile/Web switch + zoom
    ├── MobileFrame.web.tsx     # phone chrome for the browser target
    └── MobileFrame.native.tsx  # passthrough on native
```

`MobileFrame.web.tsx` / `MobileFrame.native.tsx` are a genuine platform split,
which is what Metro's `.web` / `.native` suffixes are for. Note that
`blend-native`'s own files deliberately do **not** use those suffixes — it has
no platform variants, and the suffix would advertise a split that does not
exist.

### Adding a showcase

1. Create `components/<Name>Showcase.tsx`.
2. Add it to the `Tab` union and the switch in `App.tsx`.
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
