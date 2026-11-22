# Figma Code Connect — Blend Design System

Figma Code Connect bridges design and development by showing production-ready code snippets in Figma's Dev Mode. When developers inspect a component in Figma, they see the generated code snippet with correct props, import statements, and links to GitHub and Storybook. Code comments, annotations, and descriptions are **not** visible in Figma — only generated code, imports, and links.

## Current Status

- **43 `.figma.tsx` files** published, covering 42 Figma component sets (MultiSelectV2 and SingleSelectV2 share one set).
- All files live in `apps/storybook/stories/components/<Component>/(v1|v2)/<Component>.figma.tsx`.
- V2 is the current generation. V1 files remain only for components that have no V2 replacement yet (`DateRangePicker`, `Calendar`, `DataTable`, `DropdownInput`, `UnitInput`, `Slider`, `Timeline`).
- `figma.config.json` is configured with correct include paths and `figmaFileUrl`.
- `@figma/code-connect` is installed; `figma:validate` / `figma:publish` / `figma:unpublish` scripts are in `package.json`.
- `.env` holds `FIGMA_ACCESS_TOKEN` (git-ignored; `.env.figma.example` is the template).
- All 42 Figma component sets carry descriptions + a single documentation link to `https://blend.juspay.design/docs/components/<slug>` (set via the Figma MCP, not Code Connect).

## Quick Start

### For New Components

```tsx
import React from 'react'
import { figma } from '@figma/code-connect'
import {
    YourComponentV2,
    YourComponentV2Size,
} from '@juspay/blend-design-system'

figma.connect(
    YourComponentV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=XXXX-YYYYY',
    {
        props: {
            text: figma.string('text'),
            size: figma.enum('size', {
                sm: YourComponentV2Size.SMALL,
                md: YourComponentV2Size.MEDIUM,
                lg: YourComponentV2Size.LARGE,
            }),
            disabled: figma.enum('state', {
                disabled: true,
                default: false,
                hover: false,
                active: false,
                focussed: false,
            }),
            leftSlot: figma.boolean('hasLeftIcon', {
                true: { slot: figma.instance('leftIcon') },
                false: undefined,
            }),
        },
        example: ({ text, size, disabled, leftSlot }) => (
            <YourComponentV2
                text={text}
                size={size}
                disabled={disabled}
                leftSlot={leftSlot}
            />
        ),
        imports: [
            "import { YourComponentV2, YourComponentV2Size } from '@juspay/blend-design-system'",
        ],
        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/YourComponentV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-yourcomponentv2--docs',
            },
        ],
    }
)
```

### Commands

```bash
pnpm figma:validate     # validate all .figma.tsx files
pnpm figma:publish      # publish to Figma
pnpm figma:unpublish    # remove mappings from Figma
```

## Setup

### File Structure

```
blend-design-system/
├── figma.config.json          # Code Connect configuration
├── .env                       # FIGMA_ACCESS_TOKEN (git-ignored)
├── .env.figma.example         # Template for the token
├── package.json               # figma:* scripts
└── apps/
    └── storybook/
        └── stories/
            └── components/    # .figma.tsx files here, in <Component>/(v1|v2)/ subdirs
```

### Initial Setup (already done in this repo)

1. `pnpm add -D @figma/code-connect -w`
2. Figma → Settings → Account → Personal access tokens → create token with scopes: **File content (read-only)** and **Code Connect (write)**.
3. `cp .env.figma.example .env` and add the token.

### figma.config.json

```json
{
    "codeConnect": {
        "include": [
            "apps/storybook/stories/**/*.figma.{ts,tsx}",
            "apps/storybook/stories/**/*.stories.{ts,tsx}",
            "packages/blend/lib/**/*.figma.{ts,tsx}"
        ],
        "exclude": [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "apps/ascent/**",
            "apps/site/**"
        ],
        "parser": "react"
    }
}
```

### Getting a Figma Component URL

1. Open the Figma file (`fHb0XUhWXZErq97C6N9uG3`).
2. Select the **component set** (not an instance).
3. Right-click → "Copy link to selection".
4. URL format: `https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=XXXX-YYYYY`

## Prop Mapping Guide

### Basic Types

```tsx
// String props
text: figma.string('text'),
placeholder: figma.string('Placeholder'),

// Boolean props
disabled: figma.boolean('disabled'),

// Enum props — map Figma variant values to code enum constants
size: figma.enum('size', {
    sm: ButtonV2Size.SMALL,
    md: ButtonV2Size.MEDIUM,
    lg: ButtonV2Size.LARGE,
}),

// figma.enum with boolean values (valid — used for state/disabled mappings)
disabled: figma.enum('state', {
    disabled: true,
    default: false,
    hover: false,
    active: false,
    focussed: false,
}),

// Instance props (for nested components / icons)
leftIcon: figma.instance('leftIcon'),
```

### Advanced Mappings

```tsx
// Conditional instance — boolean controls whether a slot is rendered
leftSlot: figma.boolean('hasLeftIcon', {
    true: { slot: figma.instance('leftIcon') }, // wrap in a slot object
    false: undefined,
}),

// Map one Figma enum to multiple code props
state: figma.enum('State', {
    Default: { disabled: false, loading: false },
    Disabled: { disabled: true, loading: false },
    Loading: { disabled: false, loading: true },
}),

// Handle Figma-only variants that have no code equivalent
subType: figma.enum('subType', {
    default: ButtonV2SubType.DEFAULT,
    iconOnly: ButtonV2SubType.ICON_ONLY,
    // 'plainIcon' exists in Figma but maps to DEFAULT — exclude from the map
    link: ButtonV2SubType.INLINE,
}),
```

### Conventions Used Across Blend's Code Connect

1. **V2 imports only** (for V2 components) — `ButtonV2`, `ButtonV2Type`, `ButtonV2Size`. Never import V1 names (`Button`, `ButtonType`) for V2 components.
2. **Shared size enums** — inputs share `InputSizeV2`; selectors (Checkbox/Radio/Switch) share `SelectorV2Size`.
3. **Figma-only visual states** (`hover`, `active`, `focussed`) map to nothing in code. Only `state=disabled` produces a code difference (a `disabled: true` boolean).
4. **Slot pattern** — when a Figma boolean toggles an icon instance, wrap it: `{ slot: figma.instance('iconName') }`. The unwrapped `figma.instance(...)` is used when the instance is always present.
5. **`figma.enum` with boolean values** is supported — used for `disabled` and similar binary toggles driven by a Figma state variant.
6. **Compound components** (TabsV2, DrawerV2, MenuV2, BreadcrumbV2, AccordionV2, StepperV2, ButtonGroupV2, TagGroupV2) publish multi-part snippets — compose the parts exactly as the snippet shows.

## Connected Components (Authoritative)

All 43 published `.figma.tsx` files. Node IDs are the actual values in the source files. Files marked V1 have no V2 replacement yet and are the canonical version of that component.

| #   | Component                                    | File                                             | Figma Node ID           | Code Exports / Enums                                                                                                                                                                                                 |
| --- | -------------------------------------------- | ------------------------------------------------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | ButtonV2                                     | `Button/v2/ButtonV2.figma.tsx`                   | `18797-271911`          | `ButtonV2`, `ButtonV2Type`, `ButtonV2Size`, `ButtonV2SubType`                                                                                                                                                        |
| 2   | ButtonGroupV2                                | `ButtonGroup/v2/ButtonGroupV2.figma.tsx`         | `18797-274946`          | `ButtonGroupV2` + `ButtonV2` children, `ButtonV2Size`                                                                                                                                                                |
| 3   | AlertV2                                      | `Alert/v2/AlertV2.figma.tsx`                     | `18797-179268`          | `AlertV2`, `AlertV2Type`, `AlertV2SubType`, `AlertV2ActionPosition`                                                                                                                                                  |
| 4   | AvatarV2                                     | `Avatar/v2/AvatarV2.figma.tsx`                   | `18797-212273`          | `AvatarV2`, `AvatarV2Shape`, `AvatarV2Size`, `AvatarV2Status`                                                                                                                                                        |
| 5   | CardV2                                       | `Card/v2/CardV2.figma.tsx`                       | `18797-316572`          | `CardV2`, `CardV2Orientation`                                                                                                                                                                                        |
| 6   | DrawerV2                                     | `Drawer/v2/DrawerV2.figma.tsx`                   | `18797-275741`          | `DrawerV2` + compound parts (`DrawerV2Header`, `DrawerV2Body`, `DrawerV2Footer`, `DrawerV2Title`, `DrawerV2Description`, `DrawerV2Content`, `DrawerV2Overlay`, `DrawerV2Portal`, `DrawerV2Close`, `DrawerV2Trigger`) |
| 7   | ChartsV2                                     | `Charts/v2/ChartsV2.figma.tsx`                   | `18805-371955`          | `ChartsV2`                                                                                                                                                                                                           |
| 8   | DataTable (V1)                               | `DataTable/v1/DataTable.figma.tsx`               | `18805-438276`          | `DataTable`, `ColumnType`                                                                                                                                                                                            |
| 9   | SingleSelectV2                               | `SingleSelect/v2/SingleSelectV2.figma.tsx`       | `18805-506903`          | `SingleSelectV2`, `SingleSelectV2Size`, `SingleSelectV2Variant`                                                                                                                                                      |
| 10  | MultiSelectV2                                | `MultiSelect/v2/MultiSelectV2.figma.tsx`         | `18805-506903` (shared) | `MultiSelectV2`, `MultiSelectV2Size`, `MultiSelectV2Variant`, `MultiSelectV2SelectionTagType`                                                                                                                        |
| 11  | TextInputV2                                  | `TextInput/v2/TextInputV2.figma.tsx`             | `18805-513588`          | `TextInputV2`, `InputSizeV2`                                                                                                                                                                                         |
| 12  | NumberInputV2                                | `NumberInput/v2/NumberInputV2.figma.tsx`         | `18805-515591`          | `NumberInputV2`, `InputSizeV2`                                                                                                                                                                                       |
| 13  | TextAreaV2                                   | `TextArea/v2/TextAreaV2.figma.tsx`               | `18805-516369`          | `TextAreaV2`                                                                                                                                                                                                         |
| 14  | SearchInputV2                                | `SearchInput/v2/SearchInputV2.figma.tsx`         | `18805-516575`          | `SearchInputV2`                                                                                                                                                                                                      |
| 15  | KeyValuePairV2                               | `KeyValuePair/v2/KeyValuePairV2.figma.tsx`       | `18805-533612`          | `KeyValuePairV2`, `KeyValuePairV2Size`, `KeyValuePairV2StateType`                                                                                                                                                    |
| 16  | MenuV2                                       | `Menu/v2/MenuV2.figma.tsx`                       | `18805-632109`          | `MenuV2`, `MenuV2ItemVariant`, `MenuV2ItemActionType`                                                                                                                                                                |
| 17  | ModalV2                                      | `Modal/v2/ModalV2.figma.tsx`                     | `18805-635480`          | `ModalV2`                                                                                                                                                                                                            |
| 18  | UploadV2                                     | `Upload/v2/UploadV2.figma.tsx`                   | `18805-635561`          | `UploadV2`, `UploadV2State`                                                                                                                                                                                          |
| 19  | PopoverV2                                    | `Popover/v2/PopoverV2.figma.tsx`                 | `18805-671615`          | `PopoverV2`, `PopoverV2Size`                                                                                                                                                                                         |
| 20  | CheckboxV2                                   | `Checkbox/v2/CheckboxV2.figma.tsx`               | `18805-677129`          | `CheckboxV2`, `SelectorV2Size`                                                                                                                                                                                       |
| 21  | SwitchV2                                     | `Switch/v2/SwitchV2.figma.tsx`                   | `18805-677334`          | `SwitchV2`, `SelectorV2Size`                                                                                                                                                                                         |
| 22  | RadioV2                                      | `Radio/v2/RadioV2.figma.tsx`                     | `18805-677515`          | `RadioV2`, `SelectorV2Size`                                                                                                                                                                                          |
| 23  | SnackbarV2                                   | `Snackbar/v2/SnackbarV2.figma.tsx`               | `18805-684467`          | `SnackbarV2` (via `StyledToast`), `SnackbarV2Variant`                                                                                                                                                                |
| 24  | StatCardV2                                   | `StatCard/v2/StatCardV2.figma.tsx`               | `18805-705102`          | `StatCardV2`, `StatCardV2Variant`, `StatCardV2ChangeType`, `StatCardV2ArrowDirection`                                                                                                                                |
| 25  | TabsV2                                       | `Tabs/v2/TabsV2.figma.tsx`                       | `18805-733044`          | `TabsV2`, `TabsV2List`, `TabsV2Trigger`, `TabsV2Content`, `TabsV2Variant`, `TabsV2Size`                                                                                                                              |
| 26  | TagV2                                        | `Tags/v2/TagV2.figma.tsx`                        | `18805-744952`          | `TagV2`, `TagV2Type`, `TagV2SubType`, `TagV2Color`, `TagV2Size`                                                                                                                                                      |
| 27  | TagGroupV2                                   | `Tags/v2/TagGroupV2.figma.tsx`                   | `18805-745529`          | `TagGroupV2` + `TagV2` children, `TagV2Type`, `TagV2SubType`, `TagV2Size`, `TagV2Color`                                                                                                                              |
| 28  | TooltipV2                                    | `Tooltip/v2/TooltipV2.figma.tsx`                 | `18805-751580`          | `TooltipV2`, `TooltipV2Size`, `TooltipV2Side`, `TooltipV2Align`, `TooltipV2SlotDirection`                                                                                                                            |
| 29  | ProgressBarV2                                | `ProgressBar/v2/ProgressBarV2.figma.tsx`         | `18805-776558`          | `ProgressBarV2`, `ProgressBarV2Size`, `ProgressBarV2Variant`, `ProgressBarV2Appearance`                                                                                                                              |
| 30  | Slider (V1)                                  | `Slider/v1/Slider.figma.tsx`                     | `18805-798503`          | `Slider`, `SliderSize`                                                                                                                                                                                               |
| 31  | StepperV2                                    | `StepperV2/StepperV2.figma.tsx`                  | `20382-12234`           | `StepperV2`, `StepperV2StepStatus`, `StepperV2Type`                                                                                                                                                                  |
| 32  | CodeEditorV2                                 | `CodeBlock/v2/CodeEditorV2.figma.tsx`            | `24732-6095`            | `CodeEditorV2`, `CodeEditorV2Variant`                                                                                                                                                                                |
| 33  | BreadcrumbV2                                 | `Breadcrumb/v2/BreadcrumbV2.figma.tsx`           | `29297-89271`           | `BreadcrumbV2`, `BreadcrumbV2Item`, `BreadcrumbV2Page`                                                                                                                                                               |
| 34  | DropdownInput (V1)                           | `DropdownInput/v1/DropdownInput.figma.tsx`       | `29491-10209`           | `DropdownInput`, `TextInputSize`, `DropdownPosition`                                                                                                                                                                 |
| 35  | UnitInput (V1)                               | `UnitInput/v1/UnitInput.figma.tsx`               | `29491-11103`           | `UnitInput`, `UnitInputSize`, `UnitPosition`                                                                                                                                                                         |
| 36  | OTPInputV2                                   | `OTPInput/v2/OTPInputV2.figma.tsx`               | `29491-12419`           | `OTPInputV2`                                                                                                                                                                                                         |
| 37  | MultiValueInputV2                            | `MultiValueInput/v2/MultiValueInputV2.figma.tsx` | `29491-12827`           | `MultiValueInputV2`, `InputSizeV2`, `TagSize`, `TagShape`, `TagVariant`                                                                                                                                              |
| 38  | SidebarV2                                    | `Sidebar/v2/SidebarV2.figma.tsx`                 | `29882-13577`           | `SidebarV2`                                                                                                                                                                                                          |
| 39  | ChatInputV2                                  | `ChatInputV2/ChatInputV2.figma.tsx`              | `30073-1916`            | `ChatInputV2`                                                                                                                                                                                                        |
| 40  | AccordionV2                                  | `Accordion/v2/AccordionV2.figma.tsx`             | `30350-53913`           | `AccordionV2`, `AccordionV2Item`, `AccordionV2Type`, `AccordionV2ChevronPosition`                                                                                                                                    |
| 41  | Timeline (V1)                                | `Timeline/v1/Timeline.figma.tsx`                 | `32190-52258`           | `Timeline`, `TimelineNodeStatus`                                                                                                                                                                                     |
| 42  | DateRangePicker (V1)                         | `DateRangePicker/v1/DateRangePicker.figma.tsx`   | `18797-295546`          | `DateRangePicker`, `DateRangePickerSize`                                                                                                                                                                             |
| 43  | Calendar (V1, DateRangePicker calendar view) | `DateRangePicker/v1/Calendar.figma.tsx`          | `18797-292891`          | `DateRangePicker`, `DateRangePickerSize`                                                                                                                                                                             |

### Notes on the table

- **SingleSelectV2 and MultiSelectV2 share Figma node `18805-506903`** — both `.figma.tsx` files publish to the same component set, so the dropdown set surfaces two code snippets.
- **DateRangePicker and Calendar are separate connects** for the same component family — `18797-295546` (trigger/picker) and `18797-292891` (calendar panel).
- **SnackbarV2 is connected via the `StyledToast` export**, not the provider API (`addSnackbar()`). The provider pattern can't render directly in a Code Connect example, so the styled toast component itself is the connect target.
- **V1 files** (`Slider`, `DropdownInput`, `UnitInput`, `DataTable`, `Timeline`, `DateRangePicker`, `Calendar`) are the canonical versions — no V2 replacement exists for these yet. Don't confuse them with deprecated V1 components that DO have V2 replacements (e.g. legacy `Button` → `ButtonV2`).

## Publishing

### Validate First

Always validate before publishing:

```bash
pnpm figma:validate
```

### Publish to Figma

With the token in `.env`:

```bash
set -a && source .env && set +a && npx figma connect publish --skip-validation --exit-on-unreadable-files
```

`--skip-validation` is used in CI because the local validate step runs separately; `--exit-on-unreadable-files` fails the build if a `.figma.tsx` file can't be parsed.

### What Happens

1. Validates/parses all `.figma.tsx` files matched by `figma.config.json`.
2. Uploads the mappings to Figma against file `fHb0XUhWXZErq97C6N9uG3`.
3. Components are visible in Figma Dev Mode immediately.

### Verify in Figma

1. Open the Figma file and switch to Dev Mode.
2. Select a component instance.
3. Confirm the V2 code snippet appears with correct props.
4. Change a Figma variant property and confirm the code props update.
5. No "Error loading Code Connect" messages should appear.

## Troubleshooting

### Code Connect Not Showing in Figma

- Ensure you're in Dev Mode.
- Refresh the Figma file.
- Verify the component URL points to a **component set**, not an instance.
- Re-run `pnpm figma:publish` and check the output for errors.

### Props Not Mapping

- Property names must match Figma's variant property names exactly (case-sensitive).
- Check the actual property names in Figma's Dev Mode or right panel.
- Enum values in the `figma.enum(...)` map must match Figma's variant option names.
- Figma-only visual states (`hover`, `active`, `focussed`) intentionally map to nothing — they don't produce code.

### "No Code Connect files found"

- Check `figma.config.json` `include` paths.
- Files must have `.figma.tsx` (or `.figma.ts`) extension.
- Files must live under `apps/storybook/stories/` or `packages/blend/lib/`.

### Publishing Errors

- Ensure `.env` exists with a valid `FIGMA_ACCESS_TOKEN`.
- Token needs scopes: **File content (read-only)** and **Code Connect (write)**.
- `--exit-on-unreadable-files` will fail the build on parse errors — fix the file, don't remove the flag.

### Debugging Tips

```tsx
// Log the props Figma sends to verify mapping
example: (props) => {
    console.log('Figma props:', props)
    return <ComponentV2 {...props} />
}
```

Validate a single file:

```bash
pnpm figma:validate path/to/file.figma.tsx
```

## Best Practices

1. **File organization** — keep `.figma.tsx` files in `apps/storybook/stories/components/<Component>/(v1|v2)/` next to the component's stories.
2. **V2 imports only** for V2 components — never import V1 names (`Button`, `ButtonType`) in a V2 connect file.
3. **Map all visual properties** from Figma. Handle Figma-only properties gracefully (map to `undefined` or omit).
4. **Keep Figma and code props in sync** — when a component's API changes, update the `.figma.tsx` file in the same PR.
5. **Validate before every publish.**
6. **Use enum constants, not string literals** — `ButtonV2Size.MEDIUM`, never `"md"`.
7. **Document complex mappings** with comments in the `.figma.tsx` file (comments are not visible in Figma, but help maintainers).

## Appendix A: Figma Property Name Reference

Common Figma variant property names observed across the Blend Figma file (these are the actual names used in `figma.enum(...)` / `figma.boolean(...)` / `figma.string(...)` calls):

| Category            | Figma Properties                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Size**            | `size` (values: sm, md, lg, xl)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **State**           | `state` (values: default, hover, active, focussed, disabled, error)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Type/Variant**    | `buttonType`, `type`, `variant`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **Shape**           | `type` (Avatar: circular/rounded), `shape` (Tag: rounded/squarical)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Sub-type**        | `subType`, `style` (Alert: subtle/noFill)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Color**           | `color`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Boolean toggles** | `hasLeftIcon`, `hasRightIcon`, `hasLeftSlot`, `hasRightSlot`, `hasMainIcon`, `hasCloseIcon`, `hasSlot`, `hasHeading`, `hasSubheading`, `hasHeaderSlot`, `hasAction`, `hasContent`, `hasSubtext`, `hasDelta`, `hasSlot1`, `hasSlot2`, `hasVisualisation`, `hasDescription`, `hasChevron`, `hasSubstep`, `hasSearch`, `hasFooter`, `hasTopSlot`, `hasBottomSlot`, `hasLabel`, `hasSubLabel`, `hasHint`, `hasHelp`, `hasClearButton`, `hasAttachment`, `hasAttachmentBar`, `hasTopQueries`, `hasGutter`, `hasHeader`, `hasCopyButton`, `hasHeaderLSlot`, `hasHeaderRSlot`, `hasKeySlot`, `hasValueText`, `hasTag`, `hasSubheader`, `hasDate`, `hasHelpIcon`, `hasQuickFilter` |
| **Visibility**      | `showLabel`, `showSublabel`, `showHint`, `showInfo`, `showLeftSlot`, `showRightSlot`, `showHeader`, `showFooter`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **Position**        | `actionPlacement`, `arrow`, `slotDirection`, `dropdownPosition`, `unitPosition`, `chevronPosition`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Layout**          | `stack`, `expanded`, `number`, `varient` (Card: vertical/horizontal)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Form**            | `mandatory`, `placeholder`, `label`, `sublabel`, `hintText`, `subtext`, `unitText`, `headerLabel`, `content`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Content**         | `text`, `heading`, `description`, `title`, `subtitle`, `value`, `date`, `subtextTitle`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| **Actions**         | `actionButtons` ('0'/'1'/'2'), `actions`, `primary`, `secondary`, `close`, `action`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Special**         | `notificationDot`, `placeholder` (Avatar), `enable` (Radio), `digits` (OTP), `footerType`, `selectionType`, `selectionStyle`, `actionType`, `icon` (Stepper), `status` (Stepper/Timeline), `number` (Stepper/ButtonGroup)                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

## Appendix B: V2 Export Name Quick Reference

Authoritative list of V2 component exports and their enums, verified against the actual `.figma.tsx` imports.

| Component         | Export                                                   | Enums                                                                        |
| ----------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| ButtonV2          | `ButtonV2`                                               | `ButtonV2Type`, `ButtonV2Size`, `ButtonV2SubType`                            |
| ButtonGroupV2     | `ButtonGroupV2` + `ButtonV2` children                    | `ButtonV2Size`, `ButtonV2Type`, `ButtonV2SubType`                            |
| AlertV2           | `AlertV2`                                                | `AlertV2Type`, `AlertV2SubType`, `AlertV2ActionPosition`                     |
| AvatarV2          | `AvatarV2`                                               | `AvatarV2Shape`, `AvatarV2Size`, `AvatarV2Status`                            |
| BreadcrumbV2      | `BreadcrumbV2`, `BreadcrumbV2Item`, `BreadcrumbV2Page`   | —                                                                            |
| TagV2             | `TagV2`                                                  | `TagV2Type`, `TagV2SubType`, `TagV2Color`, `TagV2Size`                       |
| TagGroupV2        | `TagGroupV2` + `TagV2` children                          | `TagV2Type`, `TagV2SubType`, `TagV2Color`, `TagV2Size`                       |
| TabsV2            | `TabsV2`, `TabsV2List`, `TabsV2Trigger`, `TabsV2Content` | `TabsV2Variant`, `TabsV2Size`                                                |
| TooltipV2         | `TooltipV2`                                              | `TooltipV2Size`, `TooltipV2Side`, `TooltipV2Align`, `TooltipV2SlotDirection` |
| CheckboxV2        | `CheckboxV2`                                             | `SelectorV2Size`                                                             |
| RadioV2           | `RadioV2`                                                | `SelectorV2Size`                                                             |
| SwitchV2          | `SwitchV2`                                               | `SelectorV2Size`                                                             |
| TextInputV2       | `TextInputV2`                                            | `InputSizeV2`                                                                |
| TextAreaV2        | `TextAreaV2`                                             | —                                                                            |
| NumberInputV2     | `NumberInputV2`                                          | `InputSizeV2`                                                                |
| SearchInputV2     | `SearchInputV2`                                          | —                                                                            |
| OTPInputV2        | `OTPInputV2`                                             | —                                                                            |
| MultiValueInputV2 | `MultiValueInputV2`                                      | `InputSizeV2`, `TagSize`, `TagShape`, `TagVariant`                           |
| ModalV2           | `ModalV2`                                                | —                                                                            |
| PopoverV2         | `PopoverV2`                                              | `PopoverV2Size`                                                              |
| ChartsV2          | `ChartsV2`                                               | —                                                                            |
| StatCardV2        | `StatCardV2`                                             | `StatCardV2Variant`, `StatCardV2ChangeType`, `StatCardV2ArrowDirection`      |
| SidebarV2         | `SidebarV2`                                              | —                                                                            |
| AccordionV2       | `AccordionV2`, `AccordionV2Item`                         | `AccordionV2Type`, `AccordionV2ChevronPosition`                              |
| CardV2            | `CardV2`                                                 | `CardV2Orientation`                                                          |
| DrawerV2          | `DrawerV2` + compound                                    | —                                                                            |
| MenuV2            | `MenuV2`                                                 | `MenuV2ItemVariant`, `MenuV2ItemActionType`                                  |
| KeyValuePairV2    | `KeyValuePairV2`                                         | `KeyValuePairV2Size`, `KeyValuePairV2StateType`                              |
| CodeEditorV2      | `CodeEditorV2`                                           | `CodeEditorV2Variant`                                                        |
| StepperV2         | `StepperV2`                                              | `StepperV2StepStatus`, `StepperV2Type`                                       |
| ProgressBarV2     | `ProgressBarV2`                                          | `ProgressBarV2Size`, `ProgressBarV2Variant`, `ProgressBarV2Appearance`       |
| UploadV2          | `UploadV2`                                               | `UploadV2State`                                                              |
| SingleSelectV2    | `SingleSelectV2`                                         | `SingleSelectV2Size`, `SingleSelectV2Variant`                                |
| MultiSelectV2     | `MultiSelectV2`                                          | `MultiSelectV2Size`, `MultiSelectV2Variant`, `MultiSelectV2SelectionTagType` |
| ChatInputV2       | `ChatInputV2`                                            | —                                                                            |
| SnackbarV2        | `SnackbarV2` (via `StyledToast`)                         | `SnackbarV2Variant`                                                          |

V1 components that remain canonical (no V2 replacement yet):

| Component       | Export            | Enums                               |
| --------------- | ----------------- | ----------------------------------- |
| DateRangePicker | `DateRangePicker` | `DateRangePickerSize`               |
| DataTable       | `DataTable`       | `ColumnType`                        |
| Slider          | `Slider`          | `SliderSize`                        |
| DropdownInput   | `DropdownInput`   | `TextInputSize`, `DropdownPosition` |
| UnitInput       | `UnitInput`       | `UnitInputSize`, `UnitPosition`     |
| Timeline        | `Timeline`        | `TimelineNodeStatus`                |

## Resources

- [Figma Code Connect Docs](https://www.figma.com/developers/code-connect)
- Example: `apps/storybook/stories/components/Button/v2/ButtonV2.figma.tsx`
- Figma file: `https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System`
