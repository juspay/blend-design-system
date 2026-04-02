# ProgressBarV2 Component Documentation

Design and implementation notes for the **ProgressBarV2** component (`packages/blend/lib/components/ProgressBarV2`). It replaces the older ProgressBar API with a clearer separation between **layout** and **track style**.

## Requirements

- **Value & range**: `value` with optional `min` / `max` (default `0`–`100`); values are clamped to the range for display and ARIA.
- **Geometry (`variant`)**: Horizontal **linear** bar or **circular** ring.
- **Appearance (`appearance`)**: **Solid** (continuous track) or **segmented** (striped linear track; circular uses a **dashed track** with a **solid** progress arc on top—see Design Decisions).
- **Sizes**: `sm`, `md`, `lg` for bar height / ring diameter and stroke width.
- **Optional label**: `showLabel` shows a rounded percentage next to (linear) or centered in (circular) the control; decorative for AT (`aria-hidden`) when the progressbar exposes the value.
- **Accessibility**: `role="progressbar"`, `aria-valuenow` / `aria-valuemin` / `aria-valuemax`, naming via `aria-label` or `aria-labelledby`, sensible default label when omitted.
- **Theming**: Responsive tokens keyed by `sm` / `lg` breakpoints; light and dark token files.
- **DOM attributes**: Native `HTMLDivElement` props allowed except blocked `className` / `style` (tokens drive visuals).

## Anatomy

### Linear

```
┌────────────────────────────────────────────────────────────┐
│  [■■■■■■■■■■░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]   45%        │
│   └─ fill (appearance)    └─ empty / segmented pattern    │
└────────────────────────────────────────────────────────────┘
```

- **Container**: Flex row, full width, `role="progressbar"`.
- **Track**: Rounded container; empty area uses solid fill or segmented background image for `appearance="segmented"`.
- **Fill**: Width driven by percentage of `value` in `[min, max]`.
- **Label** (optional): Text span with percentage; hidden from screen readers when present (value comes from `aria-valuenow`).

### Circular

```
        ╭──────────╮
       ╱   40%      ╲
      │   ◠────◡     │
       ╲  track+arc ╱
        ╰──────────╯
```

- **SVG**: `aria-hidden="true"`; two circles (track + progress) or dashed track + solid arc for segmented.
- **Label** (optional): Absolutely centered over the ring.

## Props & Types

```typescript
export enum ProgressBarV2Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

/** Bar geometry: horizontal track vs circular ring. */
export enum ProgressBarV2Variant {
    LINEAR = 'linear',
    CIRCULAR = 'circular',
}

/** Fill / stroke style for track (and stroke colors for circular). */
export enum ProgressBarV2Appearance {
    SOLID = 'solid',
    SEGMENTED = 'segmented',
}

export type ProgressBarV2Props = {
    value: number
    size?: ProgressBarV2Size
    variant?: ProgressBarV2Variant
    appearance?: ProgressBarV2Appearance
    showLabel?: boolean
    min?: number
    max?: number
} & Omit<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>
```

**Defaults**: `variant = LINEAR`, `appearance = SOLID`, `size = MD`, `min = 0`, `max = 100`, `showLabel = false`.

## Final Token Type

```typescript
export type ProgressBarV2TokenType = {
    linear: {
        height: { [key in ProgressBarV2Size]: CSSObject['height'] }
        fill: {
            backgroundColor: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundColor']
            }
            borderRadius: {
                [key in ProgressBarV2Appearance]: CSSObject['borderRadius']
            }
        }
        empty: {
            backgroundColor: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundColor']
            }
            backgroundImage: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundImage']
            }
            backgroundSize: {
                [key in ProgressBarV2Appearance]: CSSObject['backgroundSize']
            }
        }
        borderRadius: {
            [key in ProgressBarV2Appearance]: CSSObject['borderRadius']
        }
        gap: CSSObject['gap']
    }
    circular: {
        size: { [key in ProgressBarV2Size]: CSSObject['width'] }
        strokeWidth: { [key in ProgressBarV2Size]: number }
        stroke: { [key in ProgressBarV2Appearance]: CSSObject['stroke'] }
        background: { [key in ProgressBarV2Appearance]: CSSObject['stroke'] }
        dashArray: { [key in ProgressBarV2Appearance]: string }
    }
    label: {
        fontSize: CSSObject['fontSize']
        fontWeight: CSSObject['fontWeight']
        color: CSSObject['color']
    }
    transition: string
}

export type ResponsiveProgressBarV2Tokens = {
    [key in keyof BreakpointType]: ProgressBarV2TokenType
}
```

**Registration**: `useResponsiveTokens('PROGRESS_BARV2')` with `initComponentTokens` / theme context.

**Token pattern**: `linear.*` keyed by `ProgressBarV2Appearance` where fill/empty differ; `circular.dashArray[segmented]` drives dash length/gap for the **track** (parsed in code for consistent rhythm with the progress arc).

## Design Decisions

### 1. `variant` vs `appearance`

**Decision**: Split **geometry** (`LINEAR` | `CIRCULAR`) from **track style** (`SOLID` | `SEGMENTED`).

**Rationale**: Avoids overloading a single enum (`solid` / `segmented` / `circular`). Any combination is valid: e.g. circular + segmented track with solid arc, linear + segmented stripes.

### 2. Segmented circular: dashed track, solid progress arc

**Decision**: For `appearance="segmented"` on circular, the **background** circle uses `stroke-dasharray` from tokens (e.g. `"4 2"`). The **foreground** progress uses the same math as solid circular: full circumference dash + offset, `stroke-linecap="round"`.

**Rationale**: Matches product mockups: ticked/segmented **track**, smooth **value** arc. A dashed progress stroke made “filled” segments read as scattered; a single arc reads as true completion.

### 3. Subcomponents

**Decision**: `ProgressBarV2` delegates to `LinearProgressBarV2` or `CircularProgressBarV2` after resolving tokens and ARIA.

**Rationale**: Keeps layout and SVG logic isolated; shared internal props (`ProgressBarV2InternalProps`) carry value, range, label flags, and tokens.

### 4. Accessibility defaults

**Decision**: If neither `aria-label` nor `aria-labelledby` is passed, generate `aria-label` like `Progress: {n}%` from clamped percentage.

**Rationale**: `progressbar` must have an accessible name; avoids silent controls in simple usages while allowing full override for i18n or context-specific strings.

### 5. Visible percentage vs ARIA

**Decision**: When `showLabel` is true, the percentage text is marked `aria-hidden="true"`.

**Rationale**: Prevents duplicate announcements; screen readers use `aria-valuenow` and min/max for the numeric state.

## Related

- **Storybook**: `apps/storybook/stories/components/ProgressBarV2/ProgressBarV2.stories.tsx`
- **Site demo**: `apps/site/src/demos/ProgressBarV2Demo.tsx`
- **Tests**: `__tests__/components/ProgressBarV2/ProgressBarV2.test.tsx`, `ProgressBarV2.accessibility.test.tsx`
