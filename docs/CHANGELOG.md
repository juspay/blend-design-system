# Changelog for v0.0.38-beta.1 (Beta)

> **Beta Release** - This is a pre-release version from the staging branch for testing purposes.

## 🚀 Features

- **menu-v1**: add controlled item selection (#1658) ([dde7672](https://github.com/juspay/blend-design-system/commit/dde7672))
- **directory**: add active-path highlighting (#1667) ([433ad7a](https://github.com/juspay/blend-design-system/commit/433ad7a))
- migration docs (#1669) ([620d8ae](https://github.com/juspay/blend-design-system/commit/620d8ae))
- **dropdown-input**: add dropDownPlaceholder prop (#1661) (#1662) ([55ec202](https://github.com/juspay/blend-design-system/commit/55ec202))
- add Spinner and EmptyState primitives (#1649) ([491c47e](https://github.com/juspay/blend-design-system/commit/491c47e))
- add inline SelectListV2 components (#1645) ([ccee95a](https://github.com/juspay/blend-design-system/commit/ccee95a))
- add DataTable dark theme support (#1647) ([7781bf0](https://github.com/juspay/blend-design-system/commit/7781bf0))
- **date-picker**: add month and year granularity (#1644) ([0dc6597](https://github.com/juspay/blend-design-system/commit/0dc6597))
- add DateRangePicker dark theme support (#1648) ([64eaae3](https://github.com/juspay/blend-design-system/commit/64eaae3))
- retrofit remaining v1 components for dark theme (#1643) ([6277ddc](https://github.com/juspay/blend-design-system/commit/6277ddc))
- add theme-aware component token support (#1646) ([16c0291](https://github.com/juspay/blend-design-system/commit/16c0291))
- **charts**: add funnel charts and tooltip formatters (#1650) ([967c264](https://github.com/juspay/blend-design-system/commit/967c264))
- add legacy dark theme tokens for Modal, Card, and Upload (#1642) ([4412e8a](https://github.com/juspay/blend-design-system/commit/4412e8a))
- add SingleDatePicker and TimePicker components (#1633) ([bb4b366](https://github.com/juspay/blend-design-system/commit/bb4b366))
- add whole-table DataTable export (#1630) ([c2ddade](https://github.com/juspay/blend-design-system/commit/c2ddade))
- add DataTable empty and error states (#1629) ([d78ec5f](https://github.com/juspay/blend-design-system/commit/d78ec5f))
- add controlled async search to select components (#1632) ([6e7de71](https://github.com/juspay/blend-design-system/commit/6e7de71))
- custom tooltip in charts v1 (#1631) ([c803be3](https://github.com/juspay/blend-design-system/commit/c803be3))
- **menu-v2**: add controlled item selection (#1628) ([f4da3c0](https://github.com/juspay/blend-design-system/commit/f4da3c0))
- add aggregate MultiSelect selection callbacks (#1624) ([6e776c9](https://github.com/juspay/blend-design-system/commit/6e776c9))

## 🐛 Bug Fixes

- load Monaco from installed package (#1668) ([f4e929e](https://github.com/juspay/blend-design-system/commit/f4e929e))
- **data-table**: address review feedback on useRowFlip config guards (#1653) ([6a70311](https://github.com/juspay/blend-design-system/commit/6a70311))
- **data-table**: guard useRowFlip against partial rowAnimationConfig (#1652) ([66f48b1](https://github.com/juspay/blend-design-system/commit/66f48b1))
- **test**: stop parallel vitest flakes and speed the blend suite (#1635) ([28a3b13](https://github.com/juspay/blend-design-system/commit/28a3b13))
- adding env check (#1619) ([9ef3e04](https://github.com/juspay/blend-design-system/commit/9ef3e04))
- removing the gray bg from data table (#1627) ([47debfb](https://github.com/juspay/blend-design-system/commit/47debfb))
- **Directory**: hierarchy-line elbow, label alignment, id-based identity, lazy-loading APIs (#1617) ([0699656](https://github.com/juspay/blend-design-system/commit/0699656))
- **snackbar**: make duration Infinity actually persist (#1622) ([79fe206](https://github.com/juspay/blend-design-system/commit/79fe206))
- resolve DataTable column filters from filterType and keep them reactive (#1623) ([bf36f58](https://github.com/juspay/blend-design-system/commit/bf36f58))
- fall back to current window when top frame is cross-origin (#1621) ([7c418ac](https://github.com/juspay/blend-design-system/commit/7c418ac))
- fixing charts tooltip content (#1610) ([debee43](https://github.com/juspay/blend-design-system/commit/debee43))

## 📚 Documentation

- WIP document TextInputGroup theme scope (#1655) ([14a7fe0](https://github.com/juspay/blend-design-system/commit/14a7fe0))

## 🔧 Chores

- **release**: v0.0.38-beta.0 [BETA #0] (#1671) ([370d01d](https://github.com/juspay/blend-design-system/commit/370d01d))

---

**Release Date**: 2026-08-19
**Commit Range**: v0.0.38-beta.0..HEAD
**Total Changes**: 33 commits

## Beta Installation

```bash
npm install @juspay/blend-design-system@beta
# or specific beta version
npm install @juspay/blend-design-system@0.0.38-beta.1
```

> **Note**: Beta versions are for testing only. Use stable versions in production.
