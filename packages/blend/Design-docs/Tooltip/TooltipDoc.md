# TooltipV2 Component Documentation

## Requirements

Create a scalable Tooltip component that can display:

- **Positioning**: Support for top, right, bottom, left placement with start/center/end alignment
- **Content**: String or ReactNode content with line-break formatting support
- **Sizes**: Small (sm) and Large (lg)
- **Optional Arrow**: Arrow indicator pointing to the trigger element
- **Slot**: Optional leading or trailing slot (e.g. icon) next to the content
- **Controlled / Uncontrolled**: Optional `open` prop for controlled visibility
- **Delay & Offset**: Configurable delay before show and distance from trigger
- **fullWidth**: Option to make trigger wrapper span full width (e.g. for menu items)
- **disableInteractive**: Option to close on pointer leave even when hovering tooltip
- **Accessibility**: Full ARIA support via Radix UI (role="tooltip", keyboard, focus)
- **Theme Support**: Light and dark theme variants via responsive tokens
- **Ref Forwarding**: Ref forwarded to native trigger or wrapper span

## Anatomy

```
                    ┌─────────────────────────────────────┐
                    │  [Slot]  Tooltip text content  [Slot] │
                    └─────────────────────────────────────┘
                                    ▲
                                    │ offset
                            ┌───────┴───────┐
                            │    Trigger    │
                            └───────────────┘
```

- **Trigger**: Child element that opens the tooltip on hover/focus (button, div, span, or custom component)
- **Content container**: Block with background, padding, border-radius, max-width from tokens
- **Slot (optional)**: Leading or trailing slot with `role="presentation"` and `aria-hidden="true"`
- **Text content**: Primary tooltip message (string or ReactNode), with word-break and overflow handling
- **Arrow (optional)**: SVG arrow filled with tooltip background color, `aria-hidden="true"`

## Props & Types

```typescript
export enum TooltipV2SlotDirection {
    LEFT = 'left',
    RIGHT = 'right',
}

export enum TooltipV2Side {
    TOP = 'top',
    RIGHT = 'right',
    LEFT = 'left',
    BOTTOM = 'bottom',
}

export enum TooltipV2Align {
    START = 'start',
    END = 'end',
    CENTER = 'center',
}

export enum TooltipV2Size {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
}

export type TooltipV2Props = {
    children: ReactNode
    content: ReactNode | string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    side?: TooltipV2Side
    align?: TooltipV2Align
    showArrow?: boolean
    size?: TooltipV2Size
    slot?: ReactNode
    slotDirection?: TooltipV2SlotDirection
    delayDuration?: number
    offset?: number
    maxWidth?: string
    fullWidth?: boolean
    disableInteractive?: boolean
}
```

## Final Token Type

```typescript
export type TooltipV2TokensType = {
    background: CSSObject['backgroundColor']
    borderRadius: {
        [key in TooltipV2Size]: CSSObject['borderRadius']
    }
    maxWidth: {
        [key in TooltipV2Size]: CSSObject['maxWidth']
    }
    padding: {
        [key in TooltipV2Size]: CSSObject['padding']
    }
    gap: {
        [key in TooltipV2Size]: CSSObject['gap']
    }
    text: {
        color: CSSObject['color']
        fontWeight: {
            [key in TooltipV2Size]: CSSObject['fontWeight']
        }
        fontSize: {
            [key in TooltipV2Size]: CSSObject['fontSize']
        }
        lineHeight: {
            [key in TooltipV2Size]: CSSObject['lineHeight']
        }
    }
}

export type ResponsiveTooltipV2Tokens = {
    [key in keyof BreakpointType]: TooltipV2TokensType
}
```

**Token Pattern**: `component.[target].CSSProp.[size].value` (e.g. `padding.[sm|lg]`, `text.fontSize.[sm|lg]`).

## Design Decisions

### 1. Radix UI Primitive for Accessibility

**Decision**: Build TooltipV2 on top of `@radix-ui/react-tooltip` (Provider, Root, Trigger, Portal, Content).

**Rationale**: Radix provides WCAG-compliant behavior out of the box: correct `role="tooltip"`, trigger–content association, keyboard support (Tab to focus, Enter/Space to open, Escape to close), and focus management. Avoids reinventing accessibility and reduces maintenance.

```tsx
<RadixTooltip.Provider delayDuration={delayDuration} disableHoverableContent={disableInteractive}>
    <RadixTooltip.Root open={open}>
        <RadixTooltip.Trigger asChild>{wrappedTrigger}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
            <AnimatedTooltipContent ... />
        </RadixTooltip.Portal>
    </RadixTooltip.Root>
</RadixTooltip.Provider>
```

### 2. Ref Forwarding to Trigger or Wrapper

**Decision**: Use `forwardRef` and forward the ref to the native trigger when the child is a DOM element (e.g. `button`, `div`), otherwise wrap the child in a `span` and attach the ref to that span.

**Rationale**: Allows parent components to focus or measure the trigger. Native triggers get the ref via `cloneElement`; custom components are wrapped so the ref still points to a DOM node for layout/focus.

```tsx
const isNativeElement =
    isValidElement(trigger) && typeof trigger.type === 'string'
const shouldWrapTrigger = !isNativeElement

const wrappedTrigger = shouldWrapTrigger ? (
    <span ref={ref} style={triggerStyle}>
        {trigger}
    </span>
) : isValidElement(trigger) && ref ? (
    cloneElement(trigger, { ref })
) : (
    trigger
)
```

### 3. Slot as Decorative with role="presentation" and aria-hidden

**Decision**: Render the optional slot inside a Block with `role="presentation"` and `aria-hidden="true"`, and support left/right placement via `slotDirection`.

**Rationale**: Keeps slot (e.g. icon) from being announced by screen readers while the main tooltip text remains the single source of accessible content. Aligns with WCAG 1.1.1 Non-text Content.

```tsx
<TooltipSlotBlock
    data-element="leading-icon"
    role="presentation"
    aria-hidden="true"
>
    {slot}
</TooltipSlotBlock>
```

### 4. Entry-Only Animation with Side-Aware Keyframes

**Decision**: Apply CSS animations only on open (side-aware keyframes for top/bottom/left/right). No exit animation for instant hide on pointer leave.

**Rationale**: Gives a clear, quick open animation without delaying disappearance when the user moves away. Uses `data-state` and `data-side` from Radix for side-specific keyframes and `will-change`/`transform` for performance.

```tsx
&[data-state='open'][data-side='top'] {
    animation: tooltip-show-top 350ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### 5. Content Rendering and Line Breaks

**Decision**: Use `formatTextWithLineBreaks` for string content so `\n` is rendered as line breaks; accept ReactNode for rich content.

**Rationale**: Supports multi-line copy and rich content (e.g. bold, links) while keeping text overflow under control with `wordBreak: 'break-word'` and `overflowWrap: 'anywhere'`.

```tsx
<PrimitiveText ...>
    {formatTextWithLineBreaks(content)}
</PrimitiveText>
```

### 6. fullWidth for Menu-Like Triggers

**Decision**: When `fullWidth={true}`, style the trigger wrapper with `display: flex` and `width: 100%` instead of `inline-flex` and `auto`.

**Rationale**: In sidebars or menus, the whole row should be the hover/focus target. fullWidth lets the trigger span the container so the entire row shows the tooltip.

### 7. Responsive Tokens via useResponsiveTokens

**Decision**: Resolve all visual properties (background, padding, borderRadius, maxWidth, gap, text.\*) from `useResponsiveTokens<TooltipV2TokensType>('TOOLTIPV2')` per breakpoint.

**Rationale**: Keeps TooltipV2 consistent with the design system’s theming and breakpoint model. Tokens are registered in ThemeContext and can vary by theme and viewport.
