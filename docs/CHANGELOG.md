# Changelog for v0.0.37-beta.6 (Beta)

> **Beta Release** - This is a pre-release version from the staging branch for testing purposes.

## 🚀 Features

- added copy button in hovered state ([9d40c1c](https://github.com/juspay/blend-design-system/commit/9d40c1c))
- added slot support in verticle stepper ([5baae84](https://github.com/juspay/blend-design-system/commit/5baae84))

## 🐛 Bug Fixes

- eliminate circular dependencies across component library (#1473) (#1474) ([fdfea77](https://github.com/juspay/blend-design-system/commit/fdfea77))
- ui fixed ([e9e0c99](https://github.com/juspay/blend-design-system/commit/e9e0c99))
- restrict the text to only 2 letters ([3d540f4](https://github.com/juspay/blend-design-system/commit/3d540f4))
- badge added to sidebar V2 ([be1b4ad](https://github.com/juspay/blend-design-system/commit/be1b4ad))
- identifiers added in tenant ([49df336](https://github.com/juspay/blend-design-system/commit/49df336))
- Charts crashes when data is undefined is fixed (#1453) ([fddd2ee](https://github.com/juspay/blend-design-system/commit/fddd2ee))
- ChartV2 crashes when rendered without options resolved (#1455) ([a83d267](https://github.com/juspay/blend-design-system/commit/a83d267))
- AvatarGroup crashes when is undefined fixed (#1457) ([0a9f79b](https://github.com/juspay/blend-design-system/commit/0a9f79b))
- Breadcrumb crashes when is undefined fixed (#1459) ([6c60680](https://github.com/juspay/blend-design-system/commit/6c60680))
- Avatar / AvatarV2 latch the image-error state forever resolved (#1466) ([b5a589b](https://github.com/juspay/blend-design-system/commit/b5a589b))
- 3.2_Card_p_cannot_be_descendant_of_p (#1411) ([83f8ac9](https://github.com/juspay/blend-design-system/commit/83f8ac9))
- 3.7_Radio_isuue (#1413) ([619f44f](https://github.com/juspay/blend-design-system/commit/619f44f))
- statCard title font increased to 16 px (#1438) ([22b58bd](https://github.com/juspay/blend-design-system/commit/22b58bd))
- changes (#1463) ([3566d11](https://github.com/juspay/blend-design-system/commit/3566d11))
- Checkbox is forced-controlled — uncontrolled usage never toggles resolved (#1468) ([d588fd8](https://github.com/juspay/blend-design-system/commit/d588fd8))
- OTPInput (v1) ignores programmatic changes while enabled resolved (#1471) ([2cd936f](https://github.com/juspay/blend-design-system/commit/2cd936f))
- added break-word to prevent large value overflow ([9a09c9e](https://github.com/juspay/blend-design-system/commit/9a09c9e))
- Upload simulated-upload setInterval never cancelled on unmount resolved (#1478) ([79ce265](https://github.com/juspay/blend-design-system/commit/79ce265))
- ThemeProvider rebuilds all tokens + new context value every render resolved ([f729792](https://github.com/juspay/blend-design-system/commit/f729792))
- typo render issue fixed ([f0ad97e](https://github.com/juspay/blend-design-system/commit/f0ad97e))
- sync internal selection state when props change after mount ([ab442d6](https://github.com/juspay/blend-design-system/commit/ab442d6))
- clear focusFirstSubstep timeout on unmount ([32ff724](https://github.com/juspay/blend-design-system/commit/32ff724))
- cancel pending resize timer on unmount and debounce ([b73a3d4](https://github.com/juspay/blend-design-system/commit/b73a3d4))
- clear justOpened timeout on unmount ([6760fb8](https://github.com/juspay/blend-design-system/commit/6760fb8))
- cancel pending sort timer on unmount ([40f1156](https://github.com/juspay/blend-design-system/commit/40f1156))
- fixing codeblock copy timeout leaks ([97d223a](https://github.com/juspay/blend-design-system/commit/97d223a))
- modal not focusing inside drawer ([f4d4ce4](https://github.com/juspay/blend-design-system/commit/f4d4ce4))
- changes ([c7752f9](https://github.com/juspay/blend-design-system/commit/c7752f9))
- Directory crashes when directoryData is undefined fixed ([6c4a831](https://github.com/juspay/blend-design-system/commit/6c4a831))
- imporving more files better ux ([05a4644](https://github.com/juspay/blend-design-system/commit/05a4644))

## 🔧 Chores

- dev to staging (#1520) ([4a56b45](https://github.com/juspay/blend-design-system/commit/4a56b45))
- remove extra block from file list display ([c270ca2](https://github.com/juspay/blend-design-system/commit/c270ca2))
- Revert "dev to staging conflict new (#1509)" ([ab134a7](https://github.com/juspay/blend-design-system/commit/ab134a7))
- dev to staging conflict new (#1509) ([fbbb494](https://github.com/juspay/blend-design-system/commit/fbbb494))
- Fix/dev to staging conflict (#1508) ([a660828](https://github.com/juspay/blend-design-system/commit/a660828))
- dev to staging ( (#1504) ([cf811c9](https://github.com/juspay/blend-design-system/commit/cf811c9))
- **release**: v0.0.37-beta.5 [BETA #5] (#1500) ([bd1ec61](https://github.com/juspay/blend-design-system/commit/bd1ec61))
- staging to dev (#1503) ([3426e18](https://github.com/juspay/blend-design-system/commit/3426e18))
- Fix/use debounce unmount cleanup (#1487) ([22797fd](https://github.com/juspay/blend-design-system/commit/22797fd))

---

**Release Date**: 2026-06-15
**Commit Range**: v0.0.37-beta.5..HEAD
**Total Changes**: 41 commits

## Beta Installation

```bash
npm install @juspay/blend-design-system@beta
# or specific beta version
npm install @juspay/blend-design-system@0.0.37-beta.6
```

> **Note**: Beta versions are for testing only. Use stable versions in production.
