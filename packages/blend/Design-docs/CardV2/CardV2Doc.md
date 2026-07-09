# CardV2 Component Documentation

## Requirements

Create a modern, composable Card component that improves on the original Card API while keeping the existing Card component untouched.

- **Simple prop API**: Common cards can be created with `title`, `subtitle`, `description`, `media`, `footer`, and `actions`.
- **Compound API**: Advanced layouts can be composed with `CardV2.Header`, `CardV2.Meta`, `CardV2.Media`, `CardV2.Body`, `CardV2.Content`, `CardV2.Actions`, `CardV2.Footer`, and `CardV2.Skeleton`.
- **Variants**: `outlined`, `elevated`, and `ghost` visual treatments.
- **Orientation**: Vertical cards for stacked content and horizontal cards for list rows or media-leading layouts.
- **Padding density**: `none`, `compact`, and `comfortable` spacing presets.
- **Media sizing**: Consumers can control media width, height, and minimum height without replacing the media slot.
- **Actions**: One or many `ButtonV2` actions can render in the body or footer.
- **State**: Supports interactive, selected, hover, and focus-visible states.
- **Skeleton**: Loading state hides card content and renders a tokenized skeleton.
- **Title truncation**: `truncateTitle` applies single-line ellipsis behavior for dense cards.
- **Scrollable body**: `maxHeight` defaults the body to scrollable content, with `scrollable={false}` available for clipping/custom overflow.
- **Accessibility**: Defaults to `role="region"`, switches to `role="button"` for interactive cards, and wires labels/descriptions with generated IDs.
- **Theme support**: All visual values are powered by responsive component tokens.

---

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│ [Media]                                                      │
│                                                              │
│ [LeadingSlot] [Eyebrow]                         [Trailing]   │
│               [Title]                                        │
│               [Subtitle]                                     │
│                                                              │
│ [Description]                                                │
│ [Children / custom content]                                  │
│ [Body actions]                                               │
│                                                              │
│ [Footer content]                                [Actions]     │
└──────────────────────────────────────────────────────────────┘
```

- **Root**: Tokenized container with variant, padding, state, width, height, and ARIA behavior.
- **Media** (`data-element="card-media"`): Optional visual area. Can be image, icon block, chart, logo, avatar, or any React node.
- **Header** (`data-element="card-header"`): Holds leading slot, meta content, and trailing slot.
- **Meta** (`data-element="card-meta"`): Stacks eyebrow, title, and subtitle.
- **Body** (`data-element="card-body"`): Holds description, children, and optional body actions.
- **Content** (`data-element="card-content"`): Wrapper for arbitrary body children.
- **Actions** (`data-element="card-actions"`): Renders one or more `ButtonV2` actions.
- **Footer** (`data-element="card-footer"`): Optional bottom row with separator and footer actions.
- **Skeleton**: Loading placeholder using the shared `Skeleton` component.

---

## Basic Usage

```tsx
import {
    CardV2,
    CardV2ActionPlacement,
    CardV2Orientation,
} from '@juspay/blend-design-system'
import { ButtonV2Size, ButtonV2Type } from '@juspay/blend-design-system'
;<CardV2
    title="Payment success"
    subtitle="Last 24 hours"
    description="Successful authorization attempts increased."
    actions={{
        text: 'Review',
        size: ButtonV2Size.SMALL,
        buttonType: ButtonV2Type.PRIMARY,
        onClick: () => {},
    }}
/>
```

## Compound Usage

```tsx
<CardV2>
    <CardV2.Header
        eyebrow="Operations"
        title="Manual review"
        subtitle="Queue health"
    />
    <CardV2.Body description="12 reviews need attention.">
        <span>Median age: 8 minutes</span>
    </CardV2.Body>
    <CardV2.Footer
        actions={{
            text: 'Open queue',
            size: ButtonV2Size.SMALL,
        }}
    >
        <span>Live</span>
    </CardV2.Footer>
</CardV2>
```

---

## Props

```ts
enum CardV2Variant {
    OUTLINED = 'outlined',
    ELEVATED = 'elevated',
    GHOST = 'ghost',
}

enum CardV2Orientation {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal',
}

enum CardV2Padding {
    NONE = 'none',
    COMPACT = 'compact',
    COMFORTABLE = 'comfortable',
}

enum CardV2ActionPlacement {
    BODY = 'body',
    FOOTER = 'footer',
}

type CardV2Props = {
    variant?: CardV2Variant
    orientation?: CardV2Orientation
    padding?: CardV2Padding
    title?: ReactNode
    truncateTitle?: boolean
    subtitle?: ReactNode
    description?: ReactNode
    eyebrow?: ReactNode
    media?: ReactNode
    mediaWidth?: CSSObject['width']
    mediaHeight?: CSSObject['height']
    mediaMinHeight?: CSSObject['minHeight']
    leadingSlot?: ReactNode
    trailingSlot?: ReactNode
    footer?: ReactNode
    actions?: ButtonV2Props | ButtonV2Props[]
    actionPlacement?: CardV2ActionPlacement
    centered?: boolean
    interactive?: boolean
    selected?: boolean
    skeleton?: CardV2SkeletonProps
    width?: CSSObject['width']
    minWidth?: CSSObject['minWidth']
    maxWidth?: CSSObject['maxWidth']
    height?: CSSObject['height']
    minHeight?: CSSObject['minHeight']
    maxHeight?: CSSObject['maxHeight']
    scrollable?: boolean
    children?: ReactNode
}
```

### Sub-components

```ts
CardV2.Header
CardV2.Meta
CardV2.Media
CardV2.Body
CardV2.Content
CardV2.Actions
CardV2.Footer
CardV2.Skeleton
```

Use the prop API for standard product cards. Use the compound API when the card needs custom ordering, multiple content sections, or explicit layout ownership.

---

## Accessibility

- Root cards default to `role="region"`.
- Interactive cards default to `role="button"` and `tabIndex={0}`.
- `title` receives a generated ID and is referenced by `aria-labelledby`.
- `aria-label` is used only when no title is available; CardV2 does not set `aria-label` and `aria-labelledby` at the same time.
- `description` receives a generated ID and is referenced by `aria-describedby`.
- If there is no description, `subtitle` is used for `aria-describedby`.
- Consumers can override `role`, `tabIndex`, and ARIA attributes when the card participates in a larger semantic structure.
- Media is treated as consumer-owned content. Images must include meaningful `alt` text or empty `alt=""` when decorative.
- Action buttons use the existing accessible `ButtonV2` behavior.

---

## Design Guidance

### Use CardV2 when

- Content needs a clear boundary and grouped interaction.
- A repeated list or dashboard item needs consistent spacing and action placement.
- A media, icon, chart, or avatar needs to sit with structured text.
- The title may be long and should truncate in dense layouts.

### Avoid CardV2 when

- A plain layout section would be enough.
- The content is already inside another card-like surface.
- The card only exists to create visual decoration without grouping related content.

### Layout guidance

- Prefer `padding="compact"` for dense operational lists and dashboards.
- Prefer `padding="comfortable"` for standalone cards and detail panels.
- Use `orientation="horizontal"` for scan-friendly rows with fixed leading media.
- Use `actionPlacement="footer"` when actions are secondary to the content or need a separated row.
- Use `truncateTitle` for table-like grids, list rows, or constrained cards where wrapping would make rows uneven.
- Use `scrollable={false}` with `maxHeight` when the parent or child content owns overflow behavior.
- Set `mediaWidth`, `mediaHeight`, and `mediaMinHeight` when using images so the card keeps predictable proportions.

---

## Token Model

CardV2 uses the `CARDV2` component token namespace. The `sm` token set is intentionally more compact than `lg`: smaller padding, gaps, media defaults, and type scale are used for narrow layouts.

```ts
type CardV2TokensType = {
    width: CSSObject['width']
    minWidth: CSSObject['minWidth']
    maxWidth: CSSObject['maxWidth']
    borderRadius: CSSObject['borderRadius']
    border: Record<CardV2Variant, CSSObject['border']>
    backgroundColor: Record<CardV2Variant, CSSObject['backgroundColor']>
    boxShadow: Record<CardV2Variant, CSSObject['boxShadow']>
    padding: Record<
        CardV2Padding,
        { x: CSSObject['padding']; y: CSSObject['padding'] }
    >
    layout: {
        gap: CSSObject['gap']
        mediaGap: Record<CardV2Orientation, CSSObject['gap']>
    }
    header: {
        gap: CSSObject['gap']
        eyebrow: CSSProperties
        title: CSSProperties
        subtitle: CSSProperties
    }
    body: {
        gap: CSSObject['gap']
        description: CSSProperties
    }
    media: {
        width: CSSObject['width']
        height: CSSObject['height']
        minHeight: CSSObject['minHeight']
        borderRadius: CSSObject['borderRadius']
        backgroundColor: CSSObject['backgroundColor']
    }
    footer: {
        gap: CSSObject['gap']
        paddingTop: CSSObject['paddingTop']
        borderTop: CSSObject['borderTop']
    }
    actions: {
        gap: CSSObject['gap']
    }
    state: {
        hover: {
            border: CSSObject['border']
            boxShadow: CSSObject['boxShadow']
        }
        focus: {
            outline: CSSObject['outline']
            outlineOffset: CSSObject['outlineOffset']
        }
        selected: {
            border: CSSObject['border']
            boxShadow: CSSObject['boxShadow']
        }
    }
}
```

---

## Testing Notes

CardV2 should be covered across:

- Prop rendering and compound rendering.
- Variant, padding, orientation, and media sizing behavior.
- Body and footer action placement.
- Interactive and selected state semantics.
- `truncateTitle` styles on prop and compound titles.
- `scrollable` default and opt-out behavior.
- Skeleton loading behavior.
- Axe accessibility checks for default, media/action, compound, and interactive examples.
