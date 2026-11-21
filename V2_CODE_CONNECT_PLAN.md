# V2 Code Connect Integration Plan

## Overview

This document outlines the complete plan for migrating Blend Design System's Figma Code Connect integration from V1 to V2 components. It covers removal of all 28 existing V1 `.figma.tsx` files, creation of new V2 `.figma.tsx` files, and accurate prop mapping between Figma variants and V2 component APIs.

---

## Table of Contents

1. [Current State](#1-current-state)
2. [V1 File Removal](#2-v1-file-removal)
3. [V2 Component Inventory](#3-v2-component-inventory)
4. [Figma Node URL Reference](#4-figma-node-url-reference)
5. [Prop Mapping Tables](#5-prop-mapping-tables)
6. [New V2 `.figma.tsx` File Specifications](#6-new-v2-figmatsx-file-specifications)
7. [Components Without V1 Precedent](#7-components-without-v1-precedent)
8. [Components Excluded from Code Connect](#8-components-excluded-from-code-connect)
9. [File Placement Strategy](#9-file-placement-strategy)
10. [Validation & Publishing Workflow](#10-validation--publishing-workflow)
11. [Implementation Phases](#11-implementation-phases)

---

## 1. Current State

### What Exists

- **28 V1 `.figma.tsx` files** in `apps/storybook/stories/components/*/v1/`
- All reference Figma file `fHb0XUhWXZErq97C6N9uG3` (Blend Design System)
- All import V1 component names (`Button`, `Alert`, `Tag`, `Avatar`, etc.)
- `figma.config.json` includes paths: `apps/storybook/stories/**/*.figma.{ts,tsx}` and `packages/blend/lib/**/*.figma.{ts,tsx}`
- NPM scripts: `figma:validate`, `figma:publish`, `figma:unpublish`
- Dependency: `@figma/code-connect` `^1.3.4` (resolved to 1.4.2)

### Problems with V1 Integration

1. **Wrong generation** — V1 components are legacy; V2 is the current generation with dark mode support
2. **Incomplete coverage** — 17 of 32 Figma pages covered (~65%)
3. **Stale documentation** — `FIGMA_CODE_CONNECT.md` references flat file paths (`.../Button/Button.figma.tsx`) instead of actual `.../Button/v1/Button.figma.tsx`
4. **Import mismatch** — V1 files import `Button` but the library exports `ButtonV2`; V1 and V2 coexist in the package, but V1 is deprecated
5. **Snackbar excluded** — V1 Snackbar uses a provider pattern (`addSnackbar()`) that breaks Code Connect

---

## 2. V1 File Removal

### Files to Delete (28 total)

All files are in `apps/storybook/stories/components/*/v1/`:

| #   | Component       | File Path                                      |
| --- | --------------- | ---------------------------------------------- |
| 1   | Avatar          | `Avatar/v1/Avatar.figma.tsx`                   |
| 2   | AvatarGroup     | `AvatarGroup/v1/AvatarGroup.figma.tsx`         |
| 3   | Alert           | `Alert/v1/Alert.figma.tsx`                     |
| 4   | Breadcrumb      | `Breadcrumb/v1/Breadcrumb.figma.tsx`           |
| 5   | Button          | `Button/v1/Button.figma.tsx`                   |
| 6   | ButtonGroup     | `ButtonGroup/v1/ButtonGroup.figma.tsx`         |
| 7   | Charts          | `Charts/v1/Charts.figma.tsx`                   |
| 8   | Checkbox        | `Checkbox/v1/Checkbox.figma.tsx`               |
| 9   | DataTable       | `DataTable/v1/DataTable.figma.tsx`             |
| 10  | DateRangePicker | `DateRangePicker/v1/DateRangePicker.figma.tsx` |
| 11  | DropdownInput   | `DropdownInput/v1/DropdownInput.figma.tsx`     |
| 12  | Modal           | `Modal/v1/Modal.figma.tsx`                     |
| 13  | MultiValueInput | `MultiValueInput/v1/MultiValueInput.figma.tsx` |
| 14  | NumberInput     | `NumberInput/v1/NumberInput.figma.tsx`         |
| 15  | OTPInput        | `OTPInput/v1/OTPInput.figma.tsx`               |
| 16  | Popover         | `Popover/v1/Popover.figma.tsx`                 |
| 17  | Radio           | `Radio/v1/Radio.figma.tsx`                     |
| 18  | SearchInput     | `SearchInput/v1/SearchInput.figma.tsx`         |
| 19  | Sidebar         | `Sidebar/v1/Sidebar.figma.tsx`                 |
| 20  | SplitTag        | `SplitTag/v1/SplitTag.figma.tsx`               |
| 21  | StatCard        | `StatCard/v1/StatCard.figma.tsx`               |
| 22  | Switch          | `Switch/v1/Switch.figma.tsx`                   |
| 23  | Tabs            | `Tabs/v1/Tabs.figma.tsx`                       |
| 24  | Tags            | `Tags/v1/Tags.figma.tsx`                       |
| 25  | TextArea        | `TextArea/v1/TextArea.figma.tsx`               |
| 26  | TextInput       | `TextInput/v1/TextInput.figma.tsx`             |
| 27  | Tooltip         | `Tooltip/v1/Tooltip.figma.tsx`                 |
| 28  | UnitInput       | `UnitInput/v1/UnitInput.figma.tsx`             |

### Removal Steps

1. Delete all 28 files listed above
2. Run `pnpm figma:unpublish` to remove V1 mappings from Figma (optional — can also be done via Figma UI)
3. Verify with `pnpm figma:validate` that no orphaned references remain
4. Update `FIGMA_CODE_CONNECT.md` with new file paths

---

## 3. V2 Component Inventory

### V2 Components with V1 Code Connect Precedent (17 components)

These have existing V1 `.figma.tsx` files whose Figma node URLs and variant property names can be referenced:

| V2 Component      | Export Name                                              | V2 Types File                | V1 Precedent                  |
| ----------------- | -------------------------------------------------------- | ---------------------------- | ----------------------------- |
| ButtonV2          | `ButtonV2`                                               | `buttonV2.types.ts`          | Button                        |
| ButtonGroupV2     | `ButtonGroupV2`                                          | `ButtonGroupV2.tsx`          | ButtonGroup                   |
| AlertV2           | `AlertV2`                                                | `alertV2.types.ts`           | Alert                         |
| AvatarV2          | `AvatarV2`                                               | `avatarV2.types.ts`          | Avatar                        |
| BreadcrumbV2      | `BreadcrumbV2`                                           | `breadcrumbV2.types.ts`      | Breadcrumb                    |
| TagV2             | `TagV2`                                                  | `TagV2.types.ts`             | Tags                          |
| TagGroupV2        | `TagGroupV2`                                             | `TagGroupV2.types.ts`        | (new — SplitTag is different) |
| TabsV2            | `TabsV2`, `TabsV2List`, `TabsV2Trigger`, `TabsV2Content` | `tabsV2.types.ts`            | Tabs                          |
| TooltipV2         | `TooltipV2`                                              | `tooltipV2.types.ts`         | Tooltip                       |
| CheckboxV2        | `CheckboxV2`                                             | `checkboxV2.types.ts`        | Checkbox                      |
| RadioV2           | `RadioV2`                                                | `radioV2.types.ts`           | Radio                         |
| SwitchV2          | `SwitchV2`                                               | `switchV2.types.ts`          | Switch                        |
| TextInputV2       | `TextInputV2`                                            | `TextInputV2.types.ts`       | TextInput                     |
| TextAreaV2        | `TextAreaV2`                                             | `TextAreaV2.types.ts`        | TextArea                      |
| NumberInputV2     | `NumberInputV2`                                          | `numberInputV2.types.ts`     | NumberInput                   |
| SearchInputV2     | `SearchInputV2`                                          | `SearchInputV2.types.ts`     | SearchInput                   |
| OTPInputV2        | `OTPInputV2`                                             | `OTPInputV2.types.ts`        | OTPInput                      |
| MultiValueInputV2 | `MultiValueInputV2`                                      | `MultiValueInputV2.types.ts` | MultiValueInput               |
| ModalV2           | `ModalV2`                                                | `modalV2.base.types.ts`      | Modal                         |
| PopoverV2         | `PopoverV2`                                              | `popoverV2.base.types.ts`    | Popover                       |
| ChartsV2          | `ChartsV2`                                               | `chartsV2.types.ts`          | Charts                        |
| StatCardV2        | `StatCardV2`                                             | `statcardV2.types.ts`        | StatCard                      |
| SidebarV2         | `SidebarV2`                                              | `types.ts`                   | Sidebar                       |

### V2 Components Without V1 Precedent (10+ components)

These need Figma metadata retrieval to determine Figma-side variant properties:

| V2 Component   | Export Name                                               | V2 Types File             |
| -------------- | --------------------------------------------------------- | ------------------------- |
| AccordionV2    | `AccordionV2`, `AccordionV2Item`                          | `accordionV2.types.ts`    |
| CardV2         | `CardV2` + compound (CardV2Header, CardV2Body, etc.)      | `cardV2.types.ts`         |
| DrawerV2       | Vaul-based compound (DrawerV2Root, DrawerV2Content, etc.) | `types.ts`                |
| MenuV2         | `MenuV2`                                                  | `menuV2.types.ts`         |
| KeyValuePairV2 | `KeyValuePairV2`                                          | `keyValuePairV2.types.ts` |
| CodeEditorV2   | `CodeEditorV2`                                            | `codeEditorV2.types.ts`   |
| StepperV2      | `StepperV2`                                               | `stepperV2.base.types.ts` |
| ProgressBarV2  | `ProgressBarV2`                                           | `progressBarV2.types.ts`  |
| UploadV2       | `UploadV2`                                                | `UploadV2.types.ts`       |
| MultiSelectV2  | `MultiSelectV2`                                           | `multiSelectV2.types.ts`  |
| SingleSelectV2 | `SingleSelectV2`                                          | `singleSelectV2.types.ts` |
| ChatInputV2    | `ChatInputV2`                                             | (in InputsV2)             |

---

## 4. Figma Node URL Reference

All V2 `.figma.tsx` files will reference the same Figma file: `fHb0XUhWXZErq97C6N9uG3`

### Node URLs from V1 Files (reusable for V2)

These node IDs come from the V1 `.figma.tsx` files. The Figma component sets are the same physical nodes — V2 Code Connect will point to the same Figma component sets since the Figma file hasn't been split by generation.

| Figma Page                     | Node ID        | V1 Source File                                 |
| ------------------------------ | -------------- | ---------------------------------------------- |
| Buttons                        | `18797-271911` | `Button/v1/Button.figma.tsx`                   |
| Button Groups                  | `18797-274946` | `ButtonGroup/v1/ButtonGroup.figma.tsx`         |
| Alerts                         | `18797-179268` | `Alert/v1/Alert.figma.tsx`                     |
| Avatars                        | `18797-212273` | `Avatar/v1/Avatar.figma.tsx`                   |
| Breadcrumbs                    | `18805-493172` | `Breadcrumb/v1/Breadcrumb.figma.tsx`           |
| Tags                           | `18805-744952` | `Tags/v1/Tags.figma.tsx`                       |
| Tabs                           | `18805-733044` | `Tabs/v1/Tabs.figma.tsx`                       |
| Tooltip                        | `18805-751580` | `Tooltip/v1/Tooltip.figma.tsx`                 |
| Selectors (Checkbox)           | `18805-677129` | `Checkbox/v1/Checkbox.figma.tsx`               |
| Selectors (Radio)              | `18805-677515` | `Radio/v1/Radio.figma.tsx`                     |
| Selectors (Switch)             | `18805-677334` | `Switch/v1/Switch.figma.tsx`                   |
| Input Fields (TextInput)       | `18805-513588` | `TextInput/v1/TextInput.figma.tsx`             |
| Input Fields (TextArea)        | `18805-516369` | `TextArea/v1/TextArea.figma.tsx`               |
| Input Fields (NumberInput)     | `18805-515591` | `NumberInput/v1/NumberInput.figma.tsx`         |
| Input Fields (SearchInput)     | `18805-516575` | `SearchInput/v1/SearchInput.figma.tsx`         |
| Input Fields (OTPInput)        | `18805-516190` | `OTPInput/v1/OTPInput.figma.tsx`               |
| Input Fields (MultiValueInput) | `18805-516597` | `MultiValueInput/v1/MultiValueInput.figma.tsx` |
| Modal                          | `18805-635480` | `Modal/v1/Modal.figma.tsx`                     |
| Popovers                       | `18805-671615` | `Popover/v1/Popover.figma.tsx`                 |
| Charts                         | `18805-371955` | `Charts/v1/Charts.figma.tsx`                   |
| Stat Card                      | `18805-705102` | `StatCard/v1/StatCard.figma.tsx`               |
| Navigations (Sidebar)          | `18805-654676` | `Sidebar/v1/Sidebar.figma.tsx`                 |

### Figma Pages Needing Node ID Discovery

These pages have no V1 Code Connect file, so node IDs must be retrieved via `figma-remote_get_metadata`:

| Figma Page        | V2 Component(s)               | Action Needed         |
| ----------------- | ----------------------------- | --------------------- |
| Accordion         | AccordionV2                   | Get metadata for page |
| Cards             | CardV2                        | Get metadata for page |
| Code Block        | CodeEditorV2                  | Get metadata for page |
| Key Value Pair    | KeyValuePairV2                | Get metadata for page |
| Menu              | MenuV2                        | Get metadata for page |
| Progress Bar      | ProgressBarV2                 | Get metadata for page |
| Side Drawer       | DrawerV2                      | Get metadata for page |
| Stepper           | StepperV2                     | Get metadata for page |
| Dropdown          | MultiSelectV2, SingleSelectV2 | Get metadata for page |
| Bottom Drawer     | DrawerV2 (bottom variant)     | Get metadata for page |
| Timeline          | (no V2 yet)                   | Skip                  |
| Calendar          | (no V2 yet)                   | Skip                  |
| Helper components | (utility, not user-facing)    | Skip                  |
| Genius Components | (no V2 yet)                   | Skip                  |
| Data Table        | (V1 DataTable exists, no V2)  | Skip                  |
| Snackbar          | SnackbarV2                    | See exclusion section |

---

## 5. Prop Mapping Tables

### 5.1 ButtonV2

**Code exports**: `ButtonV2`, `ButtonV2Type`, `ButtonV2Size`, `ButtonV2SubType`, `ButtonV2State`

**Figma URL**: `node-id=18797-271911`

| Figma Property | Figma Values                               | V2 Code Prop   | V2 Enum Values                                              | Mapping Type     |
| -------------- | ------------------------------------------ | -------------- | ----------------------------------------------------------- | ---------------- |
| `text`         | string                                     | `text`         | string                                                      | Direct           |
| `buttonType`   | primary, secondary, danger, success        | `buttonType`   | `ButtonV2Type.PRIMARY`, `.SECONDARY`, `.DANGER`, `.SUCCESS` | Enum             |
| `size`         | sm, md, lg                                 | `size`         | `ButtonV2Size.SM`, `.MD`, `.LG`                             | Enum             |
| `subType`      | default, iconOnly, inline                  | `subType`      | `ButtonV2SubType.DEFAULT`, `.ICON_ONLY`, `.INLINE`          | Enum             |
| `state`        | default, hover, active, focussed, disabled | `disabled`     | boolean (only `disabled` → `true`)                          | State→Boolean    |
| `hasLeftIcon`  | boolean                                    | `leadingIcon`  | `figma.instance('leftIcon')` or `undefined`                 | Boolean→Instance |
| `hasRightIcon` | boolean                                    | `trailingIcon` | `figma.instance('rightIcon')` or `undefined`                | Boolean→Instance |

**Code-only props**: `loading`, `fullWidth`, `buttonGroupPosition`, `justifyContent`, `onClick`

**V1→V2 differences**: V1 uses `ButtonType`, `ButtonSize`, `ButtonSubType` (no V2 suffix). V2 uses `ButtonV2Type`, `ButtonV2Size`, `ButtonV2SubType`. V1 prop `leftIcon`/`rightIcon` → V2 prop `leadingIcon`/`trailingIcon`.

---

### 5.2 ButtonGroupV2

**Code exports**: `ButtonGroupV2`, `ButtonGroupV2Props`, `ButtonGroupPosition`

**Figma URL**: `node-id=18797-274946`

| Figma Property | Figma Values         | V2 Code Prop                     | Mapping Type                           |
| -------------- | -------------------- | -------------------------------- | -------------------------------------- |
| `stack`        | boolean              | `stacked`                        | Renamed boolean                        |
| `number`       | '2', '3', '4', '5'   | `children`                       | Enum→Children (static example buttons) |
| `size`         | small, medium, large | (applied to each ButtonV2 child) | Applied to children                    |

**V1→V2 differences**: V1 uses `ButtonGroup` + `Button` + `ButtonSize`. V2 uses `ButtonGroupV2` + `ButtonV2` + `ButtonV2Size`.

---

### 5.3 AlertV2

**Code exports**: `AlertV2`, `AlertV2Type`, `AlertV2SubType`, `AlertV2ActionPosition`

**Figma URL**: `node-id=18797-179268`

| Figma Property    | Figma Values                                              | V2 Code Prop      | V2 Enum Values                                                                            | Mapping Type     |
| ----------------- | --------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------- | ---------------- |
| `variant`         | primary, success, warning, error, purple, orange, neutral | `type`            | `AlertV2Type.PRIMARY`, `.SUCCESS`, `.WARNING`, `.ERROR`, `.PURPLE`, `.ORANGE`, `.NEUTRAL` | Renamed Enum     |
| `style`           | subtle, noFill                                            | `subType`         | `AlertV2SubType.SUBTLE`, `.NO_FILL`                                                       | Renamed Enum     |
| `actionPlacement` | bottom, right                                             | `actionPosition`  | `AlertV2ActionPosition.BOTTOM`, `.RIGHT`                                                  | Renamed Enum     |
| `heading`         | string                                                    | `title`           | string                                                                                    | Renamed          |
| `description`     | string                                                    | `description`     | string                                                                                    | Direct           |
| `hasMainIcon`     | boolean                                                   | `icon`            | `figma.instance('mainIcon')` or `undefined`                                               | Boolean→Instance |
| `actionButtons`   | '0', '1', '2'                                             | `primaryAction`   | `undefined` or `{label, onClick}`                                                         | Enum→Object      |
| `actionButtons`   | '0', '1', '2'                                             | `secondaryAction` | `undefined` or `{label, onClick}`                                                         | Enum→Object      |
| `hasCloseIcon`    | boolean                                                   | `onClose`         | `() => {}` or `undefined`                                                                 | Boolean→Callback |

**V1→V2 differences**: V1 uses `AlertVariant`/`AlertStyle`/`AlertActionPlacement` and props `variant`/`style`/`actionPlacement`/`heading`. V2 uses `AlertV2Type`/`AlertV2SubType`/`AlertV2ActionPosition` and props `type`/`subType`/`actionPosition`/`title`.

---

### 5.4 AvatarV2

**Code exports**: `AvatarV2`, `AvatarV2Size`, `AvatarV2Shape`, `AvatarV2Status`, `AvatarV2Variant`

**Figma URL**: `node-id=18797-212273`

| Figma Property    | Figma Values      | V2 Code Prop | V2 Enum Values                                     | Mapping Type   |
| ----------------- | ----------------- | ------------ | -------------------------------------------------- | -------------- |
| `type`            | circular, rounded | `shape`      | `AvatarV2Shape.CIRCULAR`, `.ROUNDED`               | Renamed Enum   |
| `size`            | sm, md, lg, xl    | `size`       | `AvatarV2Size.SM`, `.REGULAR`, `.MD`, `.LG`, `.XL` | Enum           |
| `notificationDot` | boolean           | `status`     | `AvatarV2Status.ONLINE` or `.NONE`                 | Boolean→Enum   |
| `placeholder`     | boolean           | `fallback`   | `figma.string('placeholderText')` or `undefined`   | Boolean→String |

**V1→V2 differences**: V1 uses `AvatarSize`/`AvatarShape` and prop `online`. V2 uses `AvatarV2Size`/`AvatarV2Shape` and prop `status` (enum, not boolean). V2 adds `AvatarV2Variant` (image/text/icon) and `AvatarV2Status` (none/online/offline/away/busy).

---

### 5.5 BreadcrumbV2

**Code exports**: `BreadcrumbV2`, `BreadcrumbV2Item`, `BreadcrumbV2List`, `BreadcrumbV2Separator`, etc.

**Figma URL**: `node-id=18805-493172`

| Figma Property | Figma Values    | V2 Code Prop                        | Mapping Type     |
| -------------- | --------------- | ----------------------------------- | ---------------- |
| `label`        | string          | `label` (on BreadcrumbV2Item)       | Direct           |
| `hasLeftSlot`  | boolean         | `leftSlot`                          | Boolean→Instance |
| `hasRightSlot` | boolean         | `rightSlot`                         | Boolean→Instance |
| `states`       | default, active | (last item is active by convention) | Figma-only       |

**V1→V2 differences**: V1 wraps items in `<Breadcrumb items={[...]} />`. V2 uses compound components: `<BreadcrumbV2List><BreadcrumbV2Item>...</BreadcrumbV2Item></BreadcrumbV2List>`.

---

### 5.6 TagV2

**Code exports**: `TagV2`, `TagV2Type`, `TagV2SubType`, `TagV2Color`, `TagV2Size`

**Figma URL**: `node-id=18805-744952`

| Figma Property | Figma Values                                      | V2 Code Prop | V2 Enum Values                                                                | Mapping Type     |
| -------------- | ------------------------------------------------- | ------------ | ----------------------------------------------------------------------------- | ---------------- |
| `text`         | string                                            | `text`       | string                                                                        | Direct           |
| `variant`      | noFill, attentive, subtle                         | `type`       | `TagV2Type.NO_FILL`, `.ATTENTIVE`, `.SUBTLE`                                  | Renamed Enum     |
| `size`         | xs, sm, md, lg                                    | `size`       | `TagV2Size.XS`, `.SM`, `.MD`, `.LG`                                           | Enum             |
| `color`        | neutral, primary, success, error, warning, purple | `color`      | `TagV2Color.NEUTRAL`, `.PRIMARY`, `.SUCCESS`, `.ERROR`, `.WARNING`, `.PURPLE` | Enum             |
| `shape`        | rounded, squarical                                | `subType`    | `TagV2SubType.ROUNDED`, `.SQUARICAL`                                          | Renamed Enum     |
| `hasLeftSlot`  | boolean                                           | `leftSlot`   | `figma.instance('leftSlot')` or `undefined`                                   | Boolean→Instance |
| `hasRightSlot` | boolean                                           | `rightSlot`  | `figma.instance('rightSlot')` or `undefined`                                  | Boolean→Instance |

**V1→V2 differences**: V1 uses `TagVariant`/`TagColor`/`TagSize`/`TagShape` and props `variant`/`shape`. V2 uses `TagV2Type`/`TagV2Color`/`TagV2Size`/`TagV2SubType` and props `type`/`subType`.

---

### 5.7 TabsV2

**Code exports**: `TabsV2`, `TabsV2List`, `TabsV2Trigger`, `TabsV2Content`, `TabsV2Variant`, `TabsV2Size`

**Figma URL**: `node-id=18805-733044`

| Figma Property | Figma Values                               | V2 Code Prop  | V2 Enum Values                                             | Mapping Type |
| -------------- | ------------------------------------------ | ------------- | ---------------------------------------------------------- | ------------ |
| `type`         | boxed, floating, underline, pills          | `variant`     | `TabsV2Variant.BOXED`, `.FLOATING`, `.UNDERLINE`, `.PILLS` | Renamed Enum |
| `size`         | sm, md, lg                                 | `size`        | `TabsV2Size.SM`, `.MD`, `.LG`                              | Enum         |
| `expanded`     | boolean                                    | `expanded`    | boolean                                                    | Direct       |
| `state`        | default, hover, active, focussed, disabled | (visual only) | Figma-only                                                 |

**V1→V2 differences**: V1 uses `TabsVariant`/`TabsSize` and component `TabsTrigger`. V2 uses `TabsV2Variant`/`TabsV2Size` and component `TabsV2Trigger`. V2 adds `pills` variant and `sm` size. V1 didn't have `sm` size.

---

### 5.8 TooltipV2

**Code exports**: `TooltipV2`, `TooltipV2Side`, `TooltipV2Align`, `TooltipV2Size`, `TooltipV2SlotDirection`

**Figma URL**: `node-id=18805-751580`

| Figma Property  | Figma Values                                                                           | V2 Code Prop                   | V2 Enum Values                          | Mapping Type      |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------ | --------------------------------------- | ----------------- |
| `size`          | sm, md                                                                                 | `size`                         | `TooltipV2Size.SM`, `.MD`, `.LG`        | Enum              |
| `arrow`         | topLeft, topCenter, topRight, right, bottomLeft, bottomCenter, bottomRight, left, none | `side` + `align` + `showArrow` | Decomposed via helper function          | String→Decomposed |
| `slotDirection` | left, right                                                                            | `slotDirection`                | `TooltipV2SlotDirection.LEFT`, `.RIGHT` | Enum              |
| `slot`          | instance                                                                               | `slot`                         | ReactNode                               | Instance          |

**V1→V2 differences**: V1 uses `TooltipSize`/`TooltipSide`/`TooltipAlign`/`TooltipSlotDirection`. V2 uses `TooltipV2Size`/`TooltipV2Side`/`TooltipV2Align`/`TooltipV2SlotDirection`. V2 adds `lg` size. The arrow→side/align/showArrow decomposition logic remains the same.

---

### 5.9 CheckboxV2

**Code exports**: `CheckboxV2`, `SelectorV2Size`, `CheckboxV2CheckedState`

**Figma URL**: `node-id=18805-677129`

| Figma Property | Figma Values                             | V2 Code Prop | V2 Enum Values                          | Mapping Type     |
| -------------- | ---------------------------------------- | ------------ | --------------------------------------- | ---------------- |
| `size`         | sm, md                                   | `size`       | `SelectorV2Size.SM`, `.MD`, `.LG`       | Enum             |
| `state`        | default, checked, intermediate, disabled | `checked`    | `false`, `true`, `'indeterminate'`      | Enum→Union       |
| `disabled`     | boolean                                  | `disabled`   | boolean                                 | Direct           |
| `label`        | string                                   | `value`      | string                                  | Renamed          |
| `subtext`      | string                                   | `subtext`    | string                                  | Direct           |
| `hasSlot`      | boolean                                  | `slot`       | `figma.instance('slot')` or `undefined` | Boolean→Instance |

**V1→V2 differences**: V1 uses `CheckboxSize`. V2 uses `SelectorV2Size` (shared across Checkbox/Radio/Switch). V2 adds `lg` size and `CheckboxV2CheckedState` enum.

---

### 5.10 RadioV2

**Code exports**: `RadioV2`, `SelectorV2Size`

**Figma URL**: `node-id=18805-677515`

| Figma Property | Figma Values | V2 Code Prop | V2 Enum Values                          | Mapping Type     |
| -------------- | ------------ | ------------ | --------------------------------------- | ---------------- |
| `size`         | sm, md       | `size`       | `SelectorV2Size.SM`, `.MD`, `.LG`       | Enum             |
| `enable`       | boolean      | `checked`    | boolean                                 | Renamed          |
| `disabled`     | boolean      | `disabled`   | boolean                                 | Direct           |
| `subtext`      | string       | `subtext`    | string                                  | Direct           |
| `hasSlot`      | boolean      | `slot`       | `figma.instance('slot')` or `undefined` | Boolean→Instance |

**V1→V2 differences**: V1 uses `RadioSize`. V2 uses `SelectorV2Size`. Same structure.

---

### 5.11 SwitchV2

**Code exports**: `SwitchV2`, `SelectorV2Size`

**Figma URL**: `node-id=18805-677334`

| Figma Property | Figma Values                                        | V2 Code Prop | V2 Enum Values                          | Mapping Type     |
| -------------- | --------------------------------------------------- | ------------ | --------------------------------------- | ---------------- |
| `size`         | sm, md                                              | `size`       | `SelectorV2Size.SM`, `.MD`, `.LG`       | Enum             |
| `state`        | checked, default, hover, active, focussed, disabled | `checked`    | boolean (only `checked` → `true`)       | State→Boolean    |
| `disabled`     | boolean                                             | `disabled`   | boolean                                 | Direct           |
| `label`        | string                                              | `label`      | string                                  | Direct           |
| `subtext`      | string                                              | `subtext`    | string                                  | Direct           |
| `hasSlot`      | boolean                                             | `slot`       | `figma.instance('slot')` or `undefined` | Boolean→Instance |

**V1→V2 differences**: V1 uses `SwitchSize`. V2 uses `SelectorV2Size`.

---

### 5.12 TextInputV2

**Code exports**: `TextInputV2`, `InputSizeV2`, `InputStateV2`

**Figma URL**: `node-id=18805-513588`

| Figma Property  | Figma Values                                      | V2 Code Prop  | V2 Enum Values                                                    | Mapping Type                  |
| --------------- | ------------------------------------------------- | ------------- | ----------------------------------------------------------------- | ----------------------------- |
| `size`          | md, lg                                            | `size`        | `InputSizeV2.SM`, `.MD`, `.LG`                                    | Enum                          |
| `label`         | string                                            | `label`       | string                                                            | Direct                        |
| `sublabel`      | string                                            | `subLabel`    | string                                                            | Renamed                       |
| `hintText`      | string                                            | `hintText`    | string                                                            | Direct                        |
| `placeholder`   | string                                            | `placeholder` | string                                                            | Direct (V1 mapped to `value`) |
| `showLeftSlot`  | boolean                                           | `leftSlot`    | `figma.instance('leftSlot')` or `undefined`                       | Boolean→Instance              |
| `showRightSlot` | boolean                                           | `rightSlot`   | `figma.instance('rightSlot')` or `undefined`                      | Boolean→Instance              |
| `state`         | default, hover, active, focussed, disabled, error | `state`       | `InputStateV2.DEFAULT`, `.HOVER`, `.FOCUS`, `.ERROR`, `.DISABLED` | Enum                          |
| `mandatory`     | boolean                                           | `required`    | boolean                                                           | Renamed                       |

**V1→V2 differences**: V1 uses `TextInputSize` and maps `placeholder` → `value`. V2 uses `InputSizeV2` and maps `placeholder` → `placeholder` (correct). V2 adds `sm` size and `InputStateV2` enum. V2 prop is `subLabel` (camelCase), V1 was `sublabel`.

---

### 5.13 TextAreaV2

**Code exports**: `TextAreaV2`, `InputSizeV2`, `InputStateV2`

**Figma URL**: `node-id=18805-516369`

| Figma Property | Figma Values                                      | V2 Code Prop             | Mapping Type |
| -------------- | ------------------------------------------------- | ------------------------ | ------------ |
| `label`        | string                                            | `label`                  | Direct       |
| `sublabel`     | string                                            | `subLabel`               | Renamed      |
| `hintText`     | string                                            | `hintText`               | Direct       |
| `placeholder`  | string                                            | `placeholder`            | Direct       |
| `state`        | disabled, error, default, hover, active, focussed | `state` (`InputStateV2`) | Enum         |
| `mandatory`    | boolean                                           | `required`               | Renamed      |

**V1→V2 differences**: Same as TextInputV2 — V2 uses `InputSizeV2`/`InputStateV2`, correct `placeholder` mapping, `subLabel` naming.

---

### 5.14 NumberInputV2

**Code exports**: `NumberInputV2`, `InputSizeV2`, `InputStateV2`, `NumberInputV2Direction`

**Figma URL**: `node-id=18805-515591`

| Figma Property | Figma Values                                      | V2 Code Prop             | Mapping Type |
| -------------- | ------------------------------------------------- | ------------------------ | ------------ |
| `size`         | md, lg                                            | `size` (`InputSizeV2`)   | Enum         |
| `label`        | string                                            | `label`                  | Direct       |
| `sublabel`     | string                                            | `subLabel`               | Renamed      |
| `hintText`     | string                                            | `hintText`               | Direct       |
| `placeholder`  | string                                            | `placeholder`            | Direct       |
| `state`        | error, default, hover, active, focussed, disabled | `state` (`InputStateV2`) | Enum         |

**V1→V2 differences**: V1 uses `NumberInputSize` and maps `placeholder` → `value` (then `Number(value)`). V2 uses `InputSizeV2` and maps `placeholder` → `placeholder`. V2 adds `NumberInputV2Direction` (horizontal/vertical for stepper buttons).

---

### 5.15 SearchInputV2

**Code exports**: `SearchInputV2`, `InputSizeV2`, `InputStateV2`

**Figma URL**: `node-id=18805-516575`

| Figma Property  | Figma Values                                      | V2 Code Prop             | Mapping Type     |
| --------------- | ------------------------------------------------- | ------------------------ | ---------------- |
| `placeholder`   | string                                            | `placeholder`            | Direct           |
| `showLeftSlot`  | boolean                                           | `leftSlot`               | Boolean→Instance |
| `showRightSlot` | boolean                                           | `rightSlot`              | Boolean→Instance |
| `state`         | error, default, hover, active, focussed, disabled | `state` (`InputStateV2`) | Enum             |

**V1→V2 differences**: V1 maps `placeholder` → `value`. V2 maps `placeholder` → `placeholder` (correct).

---

### 5.16 OTPInputV2

**Code exports**: `OTPInputV2`, `InputSizeV2`, `InputStateV2`

**Figma URL**: `node-id=18805-516190`

| Figma Property | Figma Values                                      | V2 Code Prop             | Mapping Type |
| -------------- | ------------------------------------------------- | ------------------------ | ------------ |
| `label`        | string                                            | `label`                  | Direct       |
| `sublabel`     | string                                            | `subLabel`               | Renamed      |
| `hintText`     | string                                            | `hintText`               | Direct       |
| `state`        | error, default, hover, active, focussed, disabled | `state` (`InputStateV2`) | Enum         |

**V1→V2 differences**: V1 notes `digits` Figma prop is not supported in code. V2 may support configurable digit count.

---

### 5.17 MultiValueInputV2

**Code exports**: `MultiValueInputV2`, `InputSizeV2`, `InputStateV2`

**Figma URL**: `node-id=18805-516597`

| Figma Property | Figma Values                                      | V2 Code Prop             | Mapping Type |
| -------------- | ------------------------------------------------- | ------------------------ | ------------ |
| `size`         | md, lg                                            | `size` (`InputSizeV2`)   | Enum         |
| `label`        | string                                            | `label`                  | Direct       |
| `sublabel`     | string                                            | `subLabel`               | Renamed      |
| `hintText`     | string                                            | `hintText`               | Direct       |
| `state`        | error, disabled, default, hover, active, focussed | `state` (`InputStateV2`) | Enum         |

---

### 5.18 ModalV2

**Code exports**: `ModalV2`

**Figma URL**: `node-id=18805-635480`

| Figma Property  | Figma Values | V2 Code Prop      | Mapping Type     |
| --------------- | ------------ | ----------------- | ---------------- |
| `title`         | string       | `title`           | Direct           |
| `subtitle`      | string       | `subtitle`        | Direct           |
| `showHeader`    | boolean      | `showHeader`      | Direct           |
| `showFooter`    | boolean      | `showFooter`      | Direct           |
| `hasCloseIcon`  | boolean      | `showCloseButton` | Renamed          |
| `hasHeaderSlot` | boolean      | `headerRightSlot` | Boolean→Instance |

**Code-only props**: `isOpen`, `onClose`, `closeOnBackdropClick`, `showDivider`, `children`

---

### 5.19 PopoverV2

**Code exports**: `PopoverV2`, `PopoverV2Size`, `PopoverV2Side`, `PopoverV2Align`

**Figma URL**: `node-id=18805-671615`

| Figma Property | Figma Values | V2 Code Prop      | V2 Enum Values                    | Mapping Type   |
| -------------- | ------------ | ----------------- | --------------------------------- | -------------- |
| `size`         | sm, md       | `size`            | `PopoverV2Size.SM`, `.MD`, `.LG`  | Enum           |
| `close`        | boolean      | `showCloseButton` | boolean                           | Renamed        |
| `actions`      | boolean      | (derived)         | —                                 | Figma-only     |
| `primary`      | boolean      | `primaryAction`   | `{label, onClick}` or `undefined` | Boolean→Object |
| `secondary`    | boolean      | `secondaryAction` | `{label, onClick}` or `undefined` | Boolean→Object |

**Code-only props**: `trigger`, `children`, `heading`, `description`, `side`, `align`, `open`, `onOpenChange`

---

### 5.20 ChartsV2

**Code exports**: `ChartsV2`

**Figma URL**: `node-id=18805-371955`

| Figma Property | Figma Values   | V2 Code Prop | Mapping Type |
| -------------- | -------------- | ------------ | ------------ |
| `type`         | line, bar, pie | `chartType`  | Renamed Enum |

**Code-only props**: `data`, `colors`, `xAxisLabel`, `yAxisLabel`, `slot1`, `slot2`, `slot3`, `chartHeaderSlot`, `legendPosition`, `metrics`

---

### 5.21 StatCardV2

**Code exports**: `StatCardV2`, `StatCardV2Variant`, `StatCardV2ChangeType`, `StatCardV2ArrowDirection`, `StatCardV2Alignment`

**Figma URL**: `node-id=18805-705102`

| Figma Property     | Figma Values                | V2 Code Prop | V2 Enum Values                                        | Mapping Type     |
| ------------------ | --------------------------- | ------------ | ----------------------------------------------------- | ---------------- |
| `type`             | line, progress, bar, number | `variant`    | `StatCardV2Variant.CHART`, `.PROGRESS_BAR`, `.NUMBER` | Renamed Enum     |
| `title`            | string                      | `title`      | string                                                | Direct           |
| `value`            | string                      | `value`      | string                                                | Direct           |
| `date`             | string                      | `subtitle`   | string                                                | Renamed          |
| `hasDelta`         | boolean                     | `change`     | `{value, type}` or `undefined`                        | Boolean→Object   |
| `hasSlot1`         | boolean                     | `titleIcon`  | `figma.instance('slot 1')` or `undefined`             | Boolean→Instance |
| `hasVisualisation` | boolean                     | `chartData`  | sample data or `undefined`                            | Boolean→Data     |

**V1→V2 differences**: V1 uses `StatCardVariant`/`ChangeType` with values `LINE`/`PROGRESS_BAR`/`BAR`/`NUMBER`. V2 uses `StatCardV2Variant` with values `CHART`/`PROGRESS_BAR`/`NUMBER` (no `BAR`). V2 adds `StatCardV2ArrowDirection` and `StatCardV2Alignment`.

---

### 5.22 SidebarV2

**Code exports**: `SidebarV2`, `SidebarV2StateChange`

**Figma URL**: `node-id=18805-654676`

| Figma Property     | Figma Values | V2 Code Prop | Mapping Type   |
| ------------------ | ------------ | ------------ | -------------- |
| `sidebarSecondary` | boolean      | `leftPanel`  | Boolean→Object |

**Code-only props**: `children`, `data`, `topbar`, `footer`, `sidebarTopSlot`, `sidebarCollapseKey`, `tenants`, `merchants`, `activeTenant`, `setActiveTenant`, `activeMerchant`, `setActiveMerchant`

**Note**: Sidebar is primarily code-driven; the Figma component represents visual structure only.

---

## 6. New V2 `.figma.tsx` File Specifications

### File Template

Each V2 `.figma.tsx` file follows this structure:

```tsx
import React from 'react'
import { figma } from '@figma/code-connect'
import {
    ComponentV2,
    ComponentV2Enum1,
    ComponentV2Enum2,
} from '@juspay/blend-design-system'

figma.connect(
    ComponentV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=XXXX-YYYYY',
    {
        props: {
            // Prop mappings using figma.enum, figma.string, figma.boolean, figma.instance
        },
        example: (
            {
                /* destructured props */
            }
        ) => <ComponentV2 /* props */ />,
        imports: ["import { ComponentV2 } from '@juspay/blend-design-system'"],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/ComponentV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-componentv2--docs',
            },
        ],
    }
)
```

### Key Differences from V1 Files

1. **Import names**: All imports use V2 names (`ButtonV2`, `AlertV2`, `TagV2`, etc.)
2. **Enum names**: All enums use V2 names (`ButtonV2Type`, `AlertV2Type`, `TagV2Type`, etc.)
3. **Prop names**: Updated to V2 API (`type` instead of `variant` for Alert/Tag, `leadingIcon`/`trailingIcon` instead of `leftIcon`/`rightIcon` for Button, `subLabel` instead of `sublabel` for inputs, `placeholder` → `placeholder` not → `value` for inputs)
4. **Size enums**: Use shared `InputSizeV2` for all inputs, `SelectorV2Size` for all selectors
5. **State enums**: V2 inputs use `InputStateV2` enum instead of extracting `error`/`disabled` booleans from Figma `state`

---

## 7. Components Without V1 Precedent

### 7.1 AccordionV2

**Enums**: `AccordionV2Type` (BORDER/NO_BORDER), `AccordionV2ChevronPosition` (LEFT/RIGHT)

**Figma page**: "Accordion" — needs node ID retrieval

**Expected Figma properties** (based on V2 types):

- `type` → `AccordionV2Type` (border/noBorder)
- `chevronPosition` → `AccordionV2ChevronPosition` (left/right)
- `title` → string
- `content` → string/instance
- `state` → expanded/collapsed (visual only)
- `hasIcon` → boolean → leadingIcon instance

### 7.2 CardV2

**Enums**: `CardV2Variant` (OUTLINED/ELEVATED/GHOST), `CardV2Orientation` (VERTICAL/HORIZONTAL), `CardV2Padding` (NONE/COMPACT/COMFORTABLE), `CardV2ActionPlacement` (BODY/FOOTER)

**Compound components**: CardV2Header, CardV2Body, CardV2Content, CardV2Footer, CardV2Media, CardV2Meta, CardV2Actions

**Figma page**: "Cards" — needs node ID retrieval

### 7.3 DrawerV2

**Structure**: Vaul-based compound (Root, Trigger, Portal, Overlay, Content, Title, Description, Close, Header)

**Figma page**: "Side Drawer" + "Bottom Drawer" — needs node ID retrieval

**Note**: DrawerV2 is a compound component; Code Connect should map to the compound structure, similar to how TabsV2 maps to TabsV2List + TabsV2Trigger.

### 7.4 MenuV2

**Enums**: `MenuV2Alignment` (START/CENTER/END), `MenuV2Side` (TOP/LEFT/RIGHT/BOTTOM), `MenuV2ItemVariant` (DEFAULT/ACTION), `MenuV2ItemActionType` (PRIMARY/DANGER)

**Figma page**: "Menu" — needs node ID retrieval

### 7.5 KeyValuePairV2

**Enums**: `KeyValuePairV2Size` (SM/MD/LG), `KeyValuePairV2StateType` (VERTICAL/HORIZONTAL)

**Figma page**: "Key Value Pair" — needs node ID retrieval

### 7.6 CodeEditorV2

**Enums**: `CodeEditorV2Variant` (DEFAULT/NO_GUTTER/DIFF), `MonacoTheme` (LIGHT/DARK)

**Figma page**: "Code Block" — needs node ID retrieval

### 7.7 StepperV2

**Enums**: `StepperV2StepStatus` (DEFAULT/COMPLETED/CURRENT/PENDING/DISABLED/SKIPPED), `StepperV2Type` (HORIZONTAL/VERTICAL)

**Figma page**: "Stepper" — needs node ID retrieval

### 7.8 ProgressBarV2

**Enums**: `ProgressBarV2Size` (SM/MD/LG), `ProgressBarV2Variant` (LINEAR/CIRCULAR), `ProgressBarV2Appearance` (SOLID/SEGMENTED)

**Figma page**: "Progress Bar" — needs node ID retrieval

### 7.9 UploadV2

**Enums**: `UploadState`, `UploadErrorReason`, `UploadDragState`, uses `InputSizeV2`

**Figma page**: Likely under "Input Fields" — needs node ID retrieval

### 7.10 MultiSelectV2 / SingleSelectV2

**Shared enums**: `SelectV2Alignment` (START/CENTER/END), `SelectV2Variant` (CONTAINER/NO_CONTAINER), `SelectV2Size` (SM/MD/LG), `SelectV2Side` (TOP/LEFT/RIGHT/BOTTOM)

**Figma page**: "Dropdown" — needs node ID retrieval

### 7.11 TagGroupV2

**Figma page**: Possibly under "Tags" — needs node ID retrieval

---

## 8. Components Excluded from Code Connect

### SnackbarV2

**Reason**: SnackbarV2 uses a provider pattern (`SnackbarV2Provider` + `addSnackbar()` / `useSnackbarV2()`). Code Connect requires rendering a component directly, but Snackbar is imperatively triggered. This causes "Error loading Code Connect" in Figma.

**V1 precedent**: V1 Snackbar was also excluded for the same reason.

**Recommendation**: Do not create a Code Connect file for SnackbarV2 unless the API changes to support direct rendering. If a Figma → code mapping is needed, consider using Code Connect's `naked` mode to document usage without a renderable example.

---

## 9. File Placement Strategy

### Recommended Location

Place V2 `.figma.tsx` files alongside V2 component source in `packages/blend/lib/components/`:

```
packages/blend/lib/components/
  ButtonV2/
    ButtonV2.tsx
    buttonV2.types.ts
    buttonV2.tokens.ts
    ...
    ButtonV2.figma.tsx          ← NEW
  AlertV2/
    AlertV2.tsx
    ...
    AlertV2.figma.tsx           ← NEW
  TagV2/
    TagV2.tsx
    ...
    TagV2.figma.tsx             ← NEW
```

### Rationale

1. `figma.config.json` already includes `packages/blend/lib/**/*.figma.{ts,tsx}` — no config change needed
2. Co-locating with source makes it easier to keep mappings in sync when props change
3. Removes dependency on `apps/storybook` for Code Connect (storybook stories and figma connects are separate concerns)
4. Follows the pattern of the `figma.config.json` include glob

### Alternative: Storybook Stories Directory

If co-location is undesirable, place in `apps/storybook/stories/components/*/v2/`:

```
apps/storybook/stories/components/
  Button/v2/
    ButtonV2.stories.tsx
    ButtonV2.figma.tsx          ← NEW
```

This mirrors the V1 pattern (`Button/v1/Button.figma.tsx`) but uses `v2/` subdirectory.

### Config Update (if needed)

The existing `figma.config.json` already covers both locations:

```json
{
    "include": [
        "apps/storybook/stories/**/*.figma.{ts,tsx}",
        "apps/storybook/stories/**/*.stories.{ts,tsx}",
        "packages/blend/lib/**/*.figma.{ts,tsx}"
    ]
}
```

No config change needed for either placement strategy.

---

## 10. Validation & Publishing Workflow

### Step 1: Remove V1 Files

```bash
# Delete all 28 V1 .figma.tsx files
rm apps/storybook/stories/components/Avatar/v1/Avatar.figma.tsx
rm apps/storybook/stories/components/AvatarGroup/v1/AvatarGroup.figma.tsx
# ... (all 28 files)
```

### Step 2: Unpublish V1 Mappings

```bash
pnpm figma:unpublish
```

This removes all existing Code Connect mappings from the Figma file.

### Step 3: Create V2 Files

Create all V2 `.figma.tsx` files per the specifications in Section 6.

### Step 4: Validate

```bash
pnpm figma:validate
```

This checks that all `.figma.tsx` files are syntactically valid and that all referenced Figma nodes exist.

### Step 5: Publish V2 Mappings

```bash
pnpm figma:publish
```

This uploads the V2 Code Connect mappings to Figma.

### Step 6: Verify in Figma

Open the Figma file and verify that:

1. Each component page shows the V2 code when a component instance is selected
2. Variant changes in Figma correctly update the code props
3. No "Error loading Code Connect" messages appear

---

## 11. Implementation Phases

### Phase 1: Removal (1 hour)

- Delete all 28 V1 `.figma.tsx` files
- Run `pnpm figma:unpublish`
- Verify clean state with `pnpm figma:validate`

### Phase 2: Core Components (4-6 hours)

Create V2 `.figma.tsx` files for components with V1 precedent and straightforward mappings:

| Priority | Component    | Complexity                      |
| -------- | ------------ | ------------------------------- |
| P0       | ButtonV2     | Low — direct enum mappings      |
| P0       | TagV2        | Low — direct enum mappings      |
| P0       | AlertV2      | Medium — action button mapping  |
| P0       | AvatarV2     | Low — renamed mappings          |
| P0       | CheckboxV2   | Low — state to checked mapping  |
| P0       | RadioV2      | Low — enable to checked mapping |
| P0       | SwitchV2     | Low — state to checked mapping  |
| P0       | TooltipV2    | Medium — arrow decomposition    |
| P0       | TabsV2       | Medium — compound component     |
| P0       | BreadcrumbV2 | Medium — compound component     |

### Phase 3: Input Components (3-4 hours)

| Priority | Component         | Complexity                    |
| -------- | ----------------- | ----------------------------- |
| P1       | TextInputV2       | Low — fix placeholder mapping |
| P1       | TextAreaV2        | Low — same as TextInput       |
| P1       | NumberInputV2     | Low — same pattern            |
| P1       | SearchInputV2     | Low — same pattern            |
| P1       | OTPInputV2        | Low — same pattern            |
| P1       | MultiValueInputV2 | Low — same pattern            |
| P1       | ButtonGroupV2     | Medium — children generation  |

### Phase 4: Overlay & Layout Components (3-4 hours)

| Priority | Component  | Complexity                              |
| -------- | ---------- | --------------------------------------- |
| P1       | ModalV2    | Medium — isOpen/onClose stubs           |
| P1       | PopoverV2  | Medium — action mapping                 |
| P1       | ChartsV2   | Medium — data stubs                     |
| P1       | StatCardV2 | Medium — variant-specific props         |
| P2       | SidebarV2  | High — data-driven, minimal Figma props |

### Phase 5: New Components (4-6 hours)

Requires Figma metadata retrieval first to discover node IDs and variant properties:

| Priority | Component      | Action Needed      |
| -------- | -------------- | ------------------ |
| P2       | AccordionV2    | Get Figma metadata |
| P2       | CardV2         | Get Figma metadata |
| P2       | ProgressBarV2  | Get Figma metadata |
| P2       | StepperV2      | Get Figma metadata |
| P2       | KeyValuePairV2 | Get Figma metadata |
| P2       | MenuV2         | Get Figma metadata |
| P2       | DrawerV2       | Get Figma metadata |
| P2       | CodeEditorV2   | Get Figma metadata |
| P3       | MultiSelectV2  | Get Figma metadata |
| P3       | SingleSelectV2 | Get Figma metadata |
| P3       | UploadV2       | Get Figma metadata |
| P3       | TagGroupV2     | Get Figma metadata |
| P3       | ChatInputV2    | Get Figma metadata |

### Phase 6: Documentation (1 hour)

- Update `FIGMA_CODE_CONNECT.md` with new file paths
- Document the V2 Code Connect patterns and conventions
- Add guidance for adding new V2 components to Code Connect

---

## Appendix A: Figma Property Name Reference

Common Figma property names observed across V1 files (these are the actual variant property names in the Figma file):

| Category            | Figma Properties                                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Size**            | `size` (values: sm, md, lg, xl)                                                                                                                                                                                                             |
| **State**           | `state` (values: default, hover, active, focussed, disabled, error)                                                                                                                                                                         |
| **Type/Variant**    | `buttonType`, `type`, `variant`                                                                                                                                                                                                             |
| **Shape**           | `type` (for Avatar: circular/rounded), `shape` (for Tag: rounded/squarical)                                                                                                                                                                 |
| **Sub-type**        | `subType`, `style` (for Alert: subtle/noFill)                                                                                                                                                                                               |
| **Color**           | `color`                                                                                                                                                                                                                                     |
| **Boolean toggles** | `hasLeftIcon`, `hasRightIcon`, `hasLeftSlot`, `hasRightSlot`, `hasMainIcon`, `hasCloseIcon`, `hasSlot`, `hasHeading`, `hasSubHeading`, `hasHeaderSlot`, `hasAction`, `hasContent`, `hasSubtext`, `hasDelta`, `hasSlot1`, `hasVisualisation` |
| **Visibility**      | `showLabel`, `showSublabel`, `showHint`, `showInfo`, `showLeftSlot`, `showRightSlot`, `showHeader`, `showFooter`                                                                                                                            |
| **Position**        | `actionPlacement`, `arrow`, `slotDirection`                                                                                                                                                                                                 |
| **Layout**          | `stack`, `expanded`, `number`                                                                                                                                                                                                               |
| **Form**            | `mandatory`, `placeholder`, `label`, `sublabel`, `hintText`, `subtext`                                                                                                                                                                      |
| **Content**         | `text`, `heading`, `description`, `title`, `subtitle`, `value`, `date`                                                                                                                                                                      |
| **Actions**         | `actionButtons` ('0'/'1'/'2'), `actions`, `primary`, `secondary`, `close`                                                                                                                                                                   |
| **Special**         | `notificationDot`, `placeholder` (Avatar), `enable` (Radio), `digits` (OTP)                                                                                                                                                                 |

## Appendix B: V2 Export Name Quick Reference

| V2 Component      | Export Name                                              | Key Enums                                                                                      |
| ----------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| ButtonV2          | `ButtonV2`                                               | `ButtonV2Type`, `ButtonV2Size`, `ButtonV2SubType`, `ButtonV2State`                             |
| ButtonGroupV2     | `ButtonGroupV2`                                          | `ButtonGroupPosition`                                                                          |
| AlertV2           | `AlertV2`                                                | `AlertV2Type`, `AlertV2SubType`, `AlertV2ActionPosition`                                       |
| AvatarV2          | `AvatarV2`                                               | `AvatarV2Size`, `AvatarV2Shape`, `AvatarV2Status`, `AvatarV2Variant`                           |
| BreadcrumbV2      | `BreadcrumbV2`, `BreadcrumbV2Item`, `BreadcrumbV2List`   | —                                                                                              |
| TagV2             | `TagV2`                                                  | `TagV2Type`, `TagV2SubType`, `TagV2Color`, `TagV2Size`                                         |
| TagGroupV2        | `TagGroupV2`                                             | —                                                                                              |
| TabsV2            | `TabsV2`, `TabsV2List`, `TabsV2Trigger`, `TabsV2Content` | `TabsV2Variant`, `TabsV2Size`                                                                  |
| TooltipV2         | `TooltipV2`                                              | `TooltipV2Side`, `TooltipV2Align`, `TooltipV2Size`, `TooltipV2SlotDirection`                   |
| CheckboxV2        | `CheckboxV2`                                             | `SelectorV2Size`, `CheckboxV2CheckedState`                                                     |
| RadioV2           | `RadioV2`                                                | `SelectorV2Size`                                                                               |
| SwitchV2          | `SwitchV2`                                               | `SelectorV2Size`                                                                               |
| TextInputV2       | `TextInputV2`                                            | `InputSizeV2`, `InputStateV2`                                                                  |
| TextAreaV2        | `TextAreaV2`                                             | `InputSizeV2`, `InputStateV2`                                                                  |
| NumberInputV2     | `NumberInputV2`                                          | `InputSizeV2`, `InputStateV2`, `NumberInputV2Direction`                                        |
| SearchInputV2     | `SearchInputV2`                                          | `InputSizeV2`, `InputStateV2`                                                                  |
| OTPInputV2        | `OTPInputV2`                                             | `InputSizeV2`, `InputStateV2`                                                                  |
| MultiValueInputV2 | `MultiValueInputV2`                                      | `InputSizeV2`, `InputStateV2`                                                                  |
| ModalV2           | `ModalV2`                                                | —                                                                                              |
| PopoverV2         | `PopoverV2`                                              | `PopoverV2Size`, `PopoverV2Side`, `PopoverV2Align`                                             |
| ChartsV2          | `ChartsV2`                                               | —                                                                                              |
| StatCardV2        | `StatCardV2`                                             | `StatCardV2Variant`, `StatCardV2ChangeType`, `StatCardV2ArrowDirection`, `StatCardV2Alignment` |
| SidebarV2         | `SidebarV2`                                              | `SidebarV2StateChange`                                                                         |
| AccordionV2       | `AccordionV2`, `AccordionV2Item`                         | `AccordionV2Type`, `AccordionV2ChevronPosition`                                                |
| CardV2            | `CardV2` + compound                                      | `CardV2Variant`, `CardV2Orientation`, `CardV2Padding`, `CardV2ActionPlacement`                 |
| DrawerV2          | Compound (vaul-based)                                    | —                                                                                              |
| MenuV2            | `MenuV2`                                                 | `MenuV2Alignment`, `MenuV2Side`, `MenuV2ItemVariant`, `MenuV2ItemActionType`                   |
| KeyValuePairV2    | `KeyValuePairV2`                                         | `KeyValuePairV2Size`, `KeyValuePairV2StateType`                                                |
| CodeEditorV2      | `CodeEditorV2`                                           | `CodeEditorV2Variant`, `MonacoTheme`                                                           |
| StepperV2         | `StepperV2`                                              | `StepperV2StepStatus`, `StepperV2Type`                                                         |
| ProgressBarV2     | `ProgressBarV2`                                          | `ProgressBarV2Size`, `ProgressBarV2Variant`, `ProgressBarV2Appearance`                         |
| UploadV2          | `UploadV2`                                               | `UploadState`, `UploadErrorReason`, `UploadDragState`, `InputSizeV2`                           |
| MultiSelectV2     | `MultiSelectV2`                                          | `SelectV2Alignment`, `SelectV2Variant`, `SelectV2Size`, `SelectV2Side`                         |
| SingleSelectV2    | `SingleSelectV2`                                         | `SelectV2Alignment`, `SelectV2Variant`, `SelectV2Size`, `SelectV2Side`                         |
| ChatInputV2       | `ChatInputV2`                                            | —                                                                                              |
