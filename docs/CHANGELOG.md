# Changelog for v0.0.31-beta (Beta)

> **Beta Release** - This is a pre-release version from the staging branch for testing purposes.

## 🚀 Features

- Added a prop in numberInput to prevent entry of neg value (#851) ([fa7a3bc](../../commit/fa7a3bc))
- add timezone support to DateRangePicker (#847) ([2995703](../../commit/2995703))
- add maxHeight to charts legend dropdown (#841) ([199ad5a](../../commit/199ad5a))
- enhance ButtonGroup with different stacking (#833) ([6bf338b](../../commit/6bf338b))
- upload file error state file name added and Data Table hide column manager on no Data (#808) ([b5403e2](../../commit/b5403e2))
- enhance CodeEditor with customizable header slots and icon visibility (#825) ([5b2acf2](../../commit/5b2acf2))
- enhance SingleSelect and multiselect with Tooltip integration (#820) ([dbb5a6d](../../commit/dbb5a6d))
- add autoFocus prop to CodeEditor (#815) ([9b854f2](../../commit/9b854f2))
- add description tooltip support to DataTable component (#794) ([506852f](../../commit/506852f))

## 🐛 Bug Fixes

- corrected the height for single/multi-select (#850) ([d3bfb4b](../../commit/d3bfb4b))
- api call example for dropdown (#846) ([4b2c74b](../../commit/4b2c74b))
- wrap state update calls in requestAnimationFrame (#848) ([aaa5235](../../commit/aaa5235))
- created separate div for switch and sublable (#843) ([95f3662](../../commit/95f3662))
- removed overflow from drawerbase (#842) ([ad6b18c](../../commit/ad6b18c))
- update Card component padding handling for CUSTOM variant (#821) ([164021f](../../commit/164021f))
- update error message display in ErrorState of upload (#822) ([5fc9973](../../commit/5fc9973))
- input field disabled lable fixed (#817) ([5f26ded](../../commit/5f26ded))
- added conditional virtual list to single select (#811) ([745a6d8](../../commit/745a6d8))
- improve Checkbox component checked state handling (#805) ([c96ff27](../../commit/c96ff27))
- update Tag component styles for better alignment and sizing (#798) ([6f5a8ca](../../commit/6f5a8ca))

## ♻️ Code Refactoring

- enhance NumberInput with input sanitization (#859) ([0f1196c](../../commit/0f1196c))
- update Snackbar component layout and structure (#855) ([706c0c0](../../commit/706c0c0))
- chart legend data handling by removing capitalisation (#856) ([339f0f3](../../commit/339f0f3))

## 🔧 Chores

- Migrate from blend-v1 to @juspay/blend-design-system (#858) ([c455dd2](../../commit/c455dd2))
- Add scroll lock for dropdowns inside modals (#849) ([5990640](../../commit/5990640))
- Bug fix/otp input (#845) ([ffdd2dd](../../commit/ffdd2dd))
- Bug fix/issues (#839) ([09cbb15](../../commit/09cbb15))
- Fix table height and update rows sync with api for pagination (#838) ([2de9da5](../../commit/2de9da5))
- Fix/multiselect placeholder color (#827) ([39372dd](../../commit/39372dd))
- Enhance TableHeader component layout and tooltip handling (#816) ([09548ae](../../commit/09548ae))
- fix stat card mismatch between delta colorsign and graph color (#800) ([fddc85d](../../commit/fddc85d))
- **release**: v0.0.30 [STABLE] ([21129a5](../../commit/21129a5))
- **release**: v0.0.30-beta [BETA] ([af7acf6](../../commit/af7acf6))

---

**Release Date**: 2025-12-22
**Commit Range**: v0.0.30-beta..HEAD
**Total Changes**: 33 commits

## Beta Installation

```bash
npm install @juspay/blend-design-system@beta
# or specific beta version
npm install @juspay/blend-design-system@0.0.31-beta
```

> **Note**: Beta versions are for testing only. Use stable versions in production.
