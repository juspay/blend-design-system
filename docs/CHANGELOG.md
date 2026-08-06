# Changelog for v0.0.38

> **Stable Release** - This version is production-ready and recommended for general use.

## 🚀 Features

- DateRangePicker now supports dark-theme styling across its trigger, calendar, presets, time controls, footer, and mobile drawer.
- DateRangePicker now resolves component tokens through ThemeProvider while preserving the existing light and no-theme output.

- **charts**: add showAllLegends prop (#1601) ([18b47e9](https://github.com/juspay/blend-design-system/commit/18b47e9))
- added virtualized directory (#1593) ([2239edd](https://github.com/juspay/blend-design-system/commit/2239edd))
- added lines support in directory (#1591) ([0b3356e](https://github.com/juspay/blend-design-system/commit/0b3356e))
- add search ranking and onEnter callback to MenuV2 (#1555) ([c34e2f5](https://github.com/juspay/blend-design-system/commit/c34e2f5))
- adding menu footer for the select component (#1549) ([6ade952](https://github.com/juspay/blend-design-system/commit/6ade952))
- added custom format in datatable (#1540) ([2787661](https://github.com/juspay/blend-design-system/commit/2787661))
- added copy button in hovered state ([9d40c1c](https://github.com/juspay/blend-design-system/commit/9d40c1c))
- added slot support in verticle stepper ([5baae84](https://github.com/juspay/blend-design-system/commit/5baae84))
- version toggler (#1393) ([df2db98](https://github.com/juspay/blend-design-system/commit/df2db98))
- add pivot table functionality to DataTable (#1349) ([61674be](https://github.com/juspay/blend-design-system/commit/61674be))
- automating changelog generation (#1387) ([5489aa0](https://github.com/juspay/blend-design-system/commit/5489aa0))
- add isRowSelectable functionality to DataTable (#1379) ([4c6e87b](https://github.com/juspay/blend-design-system/commit/4c6e87b))
- added badge component (#1368) ([b54c6a1](https://github.com/juspay/blend-design-system/commit/b54c6a1))
- adjust header height in DataTable based on subtext presence (#1334) ([4c1df90](https://github.com/juspay/blend-design-system/commit/4c1df90))
- implement expand diff view in CodeBlock (#1315) ([a732ded](https://github.com/juspay/blend-design-system/commit/a732ded))
- add TabsV2 component (#1283) ([3985459](https://github.com/juspay/blend-design-system/commit/3985459))
- added blend telemetry package (#1279) ([de8c98d](https://github.com/juspay/blend-design-system/commit/de8c98d))
- add DrawerV2 component and demo implementation (#1268) ([3bcff01](https://github.com/juspay/blend-design-system/commit/3bcff01))
- introduce MenuV2 with enhanced features and accessibility (#1249) ([92aef49](https://github.com/juspay/blend-design-system/commit/92aef49))
- provided valid button events support to single & multi select (#1253) ([0aef3f1](https://github.com/juspay/blend-design-system/commit/0aef3f1))
- add Shadow DOM support for MFE compatibility (#1243) ([9990b8a](https://github.com/juspay/blend-design-system/commit/9990b8a))

## 🧪 Tests

- Add dark desktop/mobile rendering coverage, mobile preset behavior coverage, and no-theme token regression coverage.

## 🐛 Bug Fixes

- fixed min max and customdisableDates and introduce maxRange (#1602) ([cf1867a](https://github.com/juspay/blend-design-system/commit/cf1867a))
- added search ranking and onEnter callback (#1597) ([afe34a5](https://github.com/juspay/blend-design-system/commit/afe34a5))
- added some new md files for v2 components (#1585) ([1da963c](https://github.com/juspay/blend-design-system/commit/1da963c))
- adding lable guard in all inputs (#1595) ([d19b29c](https://github.com/juspay/blend-design-system/commit/d19b29c))
- fixing custom preset label not coming in date picker (#1571) ([294cbce](https://github.com/juspay/blend-design-system/commit/294cbce))
- fixing the cards v2 and blocks (#1587) ([e4d1e1e](https://github.com/juspay/blend-design-system/commit/e4d1e1e))
- added a depreceation warning for the v1 components (#1583) ([26f8285](https://github.com/juspay/blend-design-system/commit/26f8285))
- fixing accordion animation of expand and collapse (#1570) ([097d5b1](https://github.com/juspay/blend-design-system/commit/097d5b1))
- adding-chartv2-stories (#1579) ([2c46bb2](https://github.com/juspay/blend-design-system/commit/2c46bb2))
- fixing esc not appearing in searchbar (#1581) ([8c64905](https://github.com/juspay/blend-design-system/commit/8c64905))
- type compound statics that reuse flat exports as typeof (#1576) (#1577) ([6ae5b4f](https://github.com/juspay/blend-design-system/commit/6ae5b4f))
- fixing ascent app (#1575) ([f75bbbb](https://github.com/juspay/blend-design-system/commit/f75bbbb))
- fixing the filter persisting in showcase (#1563) ([e258a02](https://github.com/juspay/blend-design-system/commit/e258a02))
- fixing the snackbar header getting truncated (#1547) ([8f6c8d6](https://github.com/juspay/blend-design-system/commit/8f6c8d6))
- fix the header getting overlapped in statCard (#1552) ([8d5c95d](https://github.com/juspay/blend-design-system/commit/8d5c95d))
- fixing date picker height (#1548) ([3cdbfa5](https://github.com/juspay/blend-design-system/commit/3cdbfa5))
- fixing animation of category button (#1560) ([4e4f7cd](https://github.com/juspay/blend-design-system/commit/4e4f7cd))
- rename tokens dist entry so it stops shadowing dist/tokens/ (#1556) (#1557) ([31cf95c](https://github.com/juspay/blend-design-system/commit/31cf95c))
- removing copy button for diff variant (#1536) ([36cb1a3](https://github.com/juspay/blend-design-system/commit/36cb1a3))
- removing the override of the datatable text size (#1537) ([734bf21](https://github.com/juspay/blend-design-system/commit/734bf21))
- use explicit flat return types for useSkeletonBase and getTruncatedText (#1534) ([18b5dc7](https://github.com/juspay/blend-design-system/commit/18b5dc7))
- fixing the header (#1529) ([0dc031e](https://github.com/juspay/blend-design-system/commit/0dc031e))
- adding overlow hidden in the card component (#1528) ([fe6f938](https://github.com/juspay/blend-design-system/commit/fe6f938))
- fixed the statcard border ([ec36207](https://github.com/juspay/blend-design-system/commit/ec36207))
- added border below tabs v2 in underline variant ([0c50356](https://github.com/juspay/blend-design-system/commit/0c50356))
- fixed the animation in sidebar (#1507) ([64374a3](https://github.com/juspay/blend-design-system/commit/64374a3))
- fixing the cmdk coming empty (#1516) ([483ad4e](https://github.com/juspay/blend-design-system/commit/483ad4e))
- statcard tooltip not visible in mobile view (#1517) ([e871f39](https://github.com/juspay/blend-design-system/commit/e871f39))
- fixed charts v1 axis type overlapping (#1513) ([65f22a4](https://github.com/juspay/blend-design-system/commit/65f22a4))
- adding path and cmdk support (#1519) ([02b29c9](https://github.com/juspay/blend-design-system/commit/02b29c9))
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
- new typography flow added (#1449) ([b78016b](https://github.com/juspay/blend-design-system/commit/b78016b))
- cancel pending sort timer on unmount ([40f1156](https://github.com/juspay/blend-design-system/commit/40f1156))
- fixing codeblock copy timeout leaks ([97d223a](https://github.com/juspay/blend-design-system/commit/97d223a))
- fix the heading in the center (#1476) ([cd007a5](https://github.com/juspay/blend-design-system/commit/cd007a5))
- modal not focusing inside drawer ([f4d4ce4](https://github.com/juspay/blend-design-system/commit/f4d4ce4))
- changes ([c7752f9](https://github.com/juspay/blend-design-system/commit/c7752f9))
- Directory crashes when directoryData is undefined fixed ([6c4a831](https://github.com/juspay/blend-design-system/commit/6c4a831))
- update studio deploy workflow file (#1448) ([f976e2f](https://github.com/juspay/blend-design-system/commit/f976e2f))
- imporving more files better ux ([05a4644](https://github.com/juspay/blend-design-system/commit/05a4644))
- fixed the border not coming in sidebar intermediate state (#1423) ([d3c5923](https://github.com/juspay/blend-design-system/commit/d3c5923))
- fixing main imports (#1427) ([a1e32f0](https://github.com/juspay/blend-design-system/commit/a1e32f0))
- topbar have two merchantinfo fixed (#1397) ([0d2e336](https://github.com/juspay/blend-design-system/commit/0d2e336))
- code block working properly in code Editor (#1360) ([94e6bc3](https://github.com/juspay/blend-design-system/commit/94e6bc3))
- storybook updation and setting up tailwind for it (#1356) ([ce626b5](https://github.com/juspay/blend-design-system/commit/ce626b5))
- updating the storybooks of some components (#1344) ([2c11f17](https://github.com/juspay/blend-design-system/commit/2c11f17))
- Directory token wiring, Text fontSize, select group label margin (#1298) ([3af2c01](https://github.com/juspay/blend-design-system/commit/3af2c01))
- drawer overlay is same as modal overlay (#1290) ([08a1c80](https://github.com/juspay/blend-design-system/commit/08a1c80))
- statcard heading alignment issue (#1276) ([b159245](https://github.com/juspay/blend-design-system/commit/b159245))
- implemented the new ui of blogs (#1270) ([22c7a50](https://github.com/juspay/blend-design-system/commit/22c7a50))
- fixed breakpoint calculation for responsive view (#1229) ([7e090a8](https://github.com/juspay/blend-design-system/commit/7e090a8))

## ♻️ Code Refactoring

- modal v2 added (#1377) ([1774caf](https://github.com/juspay/blend-design-system/commit/1774caf))
- cards v2 component (#1573) ([b19dd8d](https://github.com/juspay/blend-design-system/commit/b19dd8d))
- collapse redundant PresetsConfig union members (#1479) (#1482) ([6007394](https://github.com/juspay/blend-design-system/commit/6007394))
- improve tbody key computation in DataTable (#1380) ([1632072](https://github.com/juspay/blend-design-system/commit/1632072))
- nesting from sort options (#1406) ([86e9a99](https://github.com/juspay/blend-design-system/commit/86e9a99))
- dropdown added to textinput (#1369) ([51ff397](https://github.com/juspay/blend-design-system/commit/51ff397))
- enhance scroll locking logic in useScrollLock hook (#1348) ([f8d6853](https://github.com/juspay/blend-design-system/commit/f8d6853))
- searchinput refactored (#1366) ([59ee48d](https://github.com/juspay/blend-design-system/commit/59ee48d))
- OTPInput2 added (#1332) ([d2f1b67](https://github.com/juspay/blend-design-system/commit/d2f1b67))
- enhance DataTable row expansion logic and styling (#1314) ([6270dc4](https://github.com/juspay/blend-design-system/commit/6270dc4))
- update fontWeight in KeyValuePair tokens from 600 to 500 (#1313) ([7e03756](https://github.com/juspay/blend-design-system/commit/7e03756))
- update Sidebar for improved menu handling (#1278) ([2aec65b](https://github.com/juspay/blend-design-system/commit/2aec65b))

## 📚 Documentation

- updated the docs for v1 components (#1302) ([d93b147](https://github.com/juspay/blend-design-system/commit/d93b147))

## 👷 CI/CD

- add per-PR preview publishes via pkg.pr.new (#1357) (#1358) ([7acdba2](https://github.com/juspay/blend-design-system/commit/7acdba2))

## 🔧 Chores

- Add optional row FLIP animation with spring/bezier config (#1435) ([0675a23](https://github.com/juspay/blend-design-system/commit/0675a23))
- Refactor/upload v2 (#1386) ([5768b22](https://github.com/juspay/blend-design-system/commit/5768b22))
- **release**: v0.0.37-beta.8 [BETA #8] (#1568) ([5caad1a](https://github.com/juspay/blend-design-system/commit/5caad1a))
- **release**: v0.0.37-beta.7 [BETA #7] (#1545) ([2e58277](https://github.com/juspay/blend-design-system/commit/2e58277))
- **release**: v0.0.37-beta.6 [BETA #6] (#1521) ([05bf173](https://github.com/juspay/blend-design-system/commit/05bf173))
- dev to staging (#1520) ([4a56b45](https://github.com/juspay/blend-design-system/commit/4a56b45))
- remove extra block from file list display ([c270ca2](https://github.com/juspay/blend-design-system/commit/c270ca2))
- Revert "dev to staging conflict new (#1509)" ([ab134a7](https://github.com/juspay/blend-design-system/commit/ab134a7))
- dev to staging conflict new (#1509) ([fbbb494](https://github.com/juspay/blend-design-system/commit/fbbb494))
- Fix/dev to staging conflict (#1508) ([a660828](https://github.com/juspay/blend-design-system/commit/a660828))
- dev to staging ( (#1504) ([cf811c9](https://github.com/juspay/blend-design-system/commit/cf811c9))
- **release**: v0.0.37-beta.5 [BETA #5] (#1500) ([bd1ec61](https://github.com/juspay/blend-design-system/commit/bd1ec61))
- staging to dev (#1503) ([3426e18](https://github.com/juspay/blend-design-system/commit/3426e18))
- Fix/use debounce unmount cleanup (#1487) ([22797fd](https://github.com/juspay/blend-design-system/commit/22797fd))
- dev to staging (#1447) ([5ffa67c](https://github.com/juspay/blend-design-system/commit/5ffa67c))
- Add approval flow and add csrf token (#1429) ([ceb6eb9](https://github.com/juspay/blend-design-system/commit/ceb6eb9))
- Feature/new design for showcase (#1437) ([3be99b9](https://github.com/juspay/blend-design-system/commit/3be99b9))
- **release**: v0.0.37-beta.4 [BETA #4] ([c8c342d](https://github.com/juspay/blend-design-system/commit/c8c342d))
- dev to staging (#1430) ([c720106](https://github.com/juspay/blend-design-system/commit/c720106))
- Feature/showcase page (#1421) ([cd4ebaa](https://github.com/juspay/blend-design-system/commit/cd4ebaa))
- Feat/blent studio design implementation (#1415) ([f4e9c12](https://github.com/juspay/blend-design-system/commit/f4e9c12))
- dev to staging (#1407) ([8e1a579](https://github.com/juspay/blend-design-system/commit/8e1a579))
- sync changelog (#1405) ([ad1db6c](https://github.com/juspay/blend-design-system/commit/ad1db6c))
- **release**: v0.0.37-beta.3 [BETA #3] ([291afb2](https://github.com/juspay/blend-design-system/commit/291afb2))
- Add date column type in table and total row (#1367) ([6952937](https://github.com/juspay/blend-design-system/commit/6952937))
- Add v2 export in main (#1395) ([9ed8d3d](https://github.com/juspay/blend-design-system/commit/9ed8d3d))
- Feat tokenizer (#1370) ([7f5848e](https://github.com/juspay/blend-design-system/commit/7f5848e))
- **blend-telemetry**: migrate to ESM, fix ERR_REQUIRE_ESM with chalk v5 (#1388) ([ea24081](https://github.com/juspay/blend-design-system/commit/ea24081))
- 1250 refactor sidebar v2 (#1299) ([0bc72d2](https://github.com/juspay/blend-design-system/commit/0bc72d2))
- Side navigation expand state of last menu item (#1381) ([f5c5514](https://github.com/juspay/blend-design-system/commit/f5c5514))
- Refactor/stepper v2 (#1306) ([bcf0421](https://github.com/juspay/blend-design-system/commit/bcf0421))
- Refactor/chat input v2 (#1363) ([155ec11](https://github.com/juspay/blend-design-system/commit/155ec11))
- Refactor/unit number input (#1354) ([03ecee0](https://github.com/juspay/blend-design-system/commit/03ecee0))
- Feat/added sm variant in tab (#1364) ([121fe2a](https://github.com/juspay/blend-design-system/commit/121fe2a))
- Refactor/text area v2 (#1336) ([fac0cda](https://github.com/juspay/blend-design-system/commit/fac0cda))
- Refactor/number input v2 (#1312) ([80a5902](https://github.com/juspay/blend-design-system/commit/80a5902))
- **release**: v0.0.37-beta.2 [BETA #2] ([d4b2985](https://github.com/juspay/blend-design-system/commit/d4b2985))
- Refactor/multivalueinput v2 (#1317) ([2f2f461](https://github.com/juspay/blend-design-system/commit/2f2f461))
- **release**: v0.0.37-beta.1 [BETA #1] ([267871f](https://github.com/juspay/blend-design-system/commit/267871f))
- dev to staging (#1322) ([a4f7403](https://github.com/juspay/blend-design-system/commit/a4f7403))
- Refactor/progressbar v2 (#1285) ([f093148](https://github.com/juspay/blend-design-system/commit/f093148))
- Fix sidebar item handling (#1303) ([3c032b0](https://github.com/juspay/blend-design-system/commit/3c032b0))
- Implement virtual scrolling for filter in DataTable (#1280) ([9dbb84c](https://github.com/juspay/blend-design-system/commit/9dbb84c))
- Refactor/code editor v2 (#1262) ([e715462](https://github.com/juspay/blend-design-system/commit/e715462))
- Refactor/breadcrumb v2 (#1199) ([fd67698](https://github.com/juspay/blend-design-system/commit/fd67698))
- 1235 refactor statcard v2 (#1247) ([fb4d556](https://github.com/juspay/blend-design-system/commit/fb4d556))
- **release**: v0.0.37-beta.0 [BETA #0] ([7c49141](https://github.com/juspay/blend-design-system/commit/7c49141))
- Fix dateRangePicker issues (#1265) ([55d8a0f](https://github.com/juspay/blend-design-system/commit/55d8a0f))
- **release**: v0.0.36 [STABLE] ([5d85cdb](https://github.com/juspay/blend-design-system/commit/5d85cdb))

---

**Release Date**: 2026-08-06
**Commit Range**: v0.0.37..HEAD
**Total Changes**: 1 commit

## Installation

```bash
npm install @juspay/blend-design-system@latest
# or specific version
npm install @juspay/blend-design-system@0.0.38
```

---
