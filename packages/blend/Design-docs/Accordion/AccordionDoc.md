# AccordionV2 Component Documentation

## Requirements

Create a scalable accordion component that can display:

- **Title**: Required primary text content for each accordion item
- **Subtext**: Optional secondary text content displayed below title
- **Left Slot**: Optional icon or ReactElement displayed on the left side of the trigger
- **Right Slot**: Optional icon or ReactElement displayed on the right side of the trigger
- **Subtext Slot**: Optional custom ReactElement displayed as subtext (replaces subtext text on small screens)
- **Chevron Position**: Configurable chevron icon position (left or right)
- **Single or Multiple Selection**: Support for single item expansion (collapsible) or multiple item expansion
- **Controlled and Uncontrolled Modes**: Support for both controlled (value prop) and uncontrolled (defaultValue prop) usage
- **Two Visual Styles**: Support for border and no-border accordion types
- **Disabled State**: Individual items can be disabled
- **Responsive Design**: Support for different breakpoints (sm, lg) with adaptive styling
- **Accessibility**: Full ARIA support with proper roles, states, and keyboard navigation
- **Theme Support**: Light and dark mode token support

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ [Chevron] [LeftSlot] [Title] [RightSlot]                  │
│            [Subtext/SubtextSlot]                           │
├─────────────────────────────────────────────────────────────┤
│ [Separator] (BORDER type only)                             │
│ [Content]                                                   │
└─────────────────────────────────────────────────────────────┘
```

- **Container**: Main flex container with configurable width, border radius, and gap
- **Accordion Item**: Individual accordion section container with border and background styling
- **Trigger**: Clickable button element containing title, subtext, slots, and chevron
- **Chevron**: Animated icon indicating expand/collapse state (ChevronDown for right position, ChevronRight for left position)
- **Left Slot**: Optional icon container positioned before title (hidden when chevron is on left)
- **Title**: Required text content displayed as primary heading
- **Right Slot**: Optional content container positioned after title
- **Subtext**: Optional secondary text displayed below title (hidden on small screens when subtextSlot is provided)
- **Subtext Slot**: Optional custom ReactElement displayed as subtext (shown on all screen sizes)
- **Separator**: Horizontal divider rendered inside content area for BORDER type (only visible when expanded)
- **Content**: Expandable content area containing children elements

## Props & Types

```typescript
enum AccordionV2Type {
    BORDER = 'border',
    NO_BORDER = 'noBorder',
}

enum AccordionV2ChevronPosition {
    LEFT = 'left',
    RIGHT = 'right',
}

type AccordionV2ItemProps = {
    value: string
    title: string
    subtext?: string
    leftSlot?: ReactNode
    rightSlot?: ReactNode
    subtextSlot?: ReactNode
    children: ReactNode
    isDisabled?: boolean
    chevronPosition?: AccordionV2ChevronPosition
}

type AccordionV2Dimensions = {
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}

type AccordionV2Props = {
    children: ReactNode
    accordionType?: AccordionV2Type
    defaultValue?: string | string[]
    value?: string | string[]
    isMultiple?: boolean
    onValueChange?: (value: string | string[]) => void
} & AccordionV2Dimensions
```

## Final Token Type

```typescript
type AccordionV2State = 'default' | 'hover' | 'active' | 'disabled' | 'open'

type AccordionV2TokensType = {
    gap: {
        [key in AccordionV2Type]: CSSObject['gap']
    }
    borderRadius: {
        [key in AccordionV2Type]: CSSObject['borderRadius']
    }
    trigger: {
        content: {
            gap: CSSObject['gap']
        }
        backgroundColor: {
            [key in AccordionV2Type]: {
                [key in AccordionV2State]: CSSObject['backgroundColor']
            }
        }
        border: {
            [key in AccordionV2Type]: {
                [key in AccordionV2State]: CSSObject['border']
            }
        }
        padding: {
            [key in AccordionV2Type]: CSSObject['padding']
        }
        text: {
            title: {
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
                color: {
                    [key in AccordionV2State]: CSSObject['color']
                }
            }
            subtext: {
                fontSize: CSSObject['fontSize']
                gap: CSSObject['gap']
                color: {
                    [key in AccordionV2State]: CSSObject['color']
                }
            }
        }
    }
    separator: {
        color: {
            [key in AccordionV2Type]: CSSObject['color']
        }
    }
    chevron: {
        height: CSSObject['height']
        color: {
            [key in AccordionV2State]: CSSObject['color']
        }
    }
}

type ResponsiveAccordionV2Tokens = {
    [key in keyof BreakpointType]: AccordionV2TokensType
}
```

**Token Pattern**: `component.[target].CSSProp.[type].[state].value`

## Design Decisions

### 1. Inline Trigger Content Structure

**Decision**: Render trigger content directly inline within `AccordionV2Item` using `Block` and `PrimitiveText` primitives, following the same proven pattern as the original Accordion component.

**Rationale**: Ensures reliable single-click toggle behavior by keeping the trigger content structure simple and flat. When trigger content is extracted into separate components, click events can be intercepted or blocked, requiring pointer-event manipulation. By rendering content inline, all clicks naturally propagate to the Radix UI trigger element without any special handling. This approach is cleaner, more maintainable, and follows industry-standard patterns. The `AccordionV2Chevron` component is extracted for reusability but rendered directly within the trigger layout.

```tsx
<StyledAccordionTrigger>
    <Block
        display="flex"
        alignItems="flex-start"
        width="100%"
        position="relative"
    >
        {chevronPosition === LEFT && <Block>{/* Chevron */}</Block>}
        {leftSlot && chevronPosition !== LEFT && <Block>{leftSlot}</Block>}
        <Block flexGrow={chevronPosition === LEFT ? 1 : 0}>
            <Block>{/* Title and rightSlot */}</Block>
            {(subtext || subtextSlot) && <Block>{/* Subtext content */}</Block>}
        </Block>
        {chevronPosition === RIGHT && (
            <Block position="absolute">{/* Chevron */}</Block>
        )}
    </Block>
</StyledAccordionTrigger>
```

### 2. Radix UI Accordion Primitive Integration

**Decision**: Build on top of Radix UI's Accordion primitive for accessibility and behavior.

**Rationale**: Radix UI provides robust accessibility features, keyboard navigation, and ARIA attributes out of the box. This reduces implementation complexity and ensures WCAG compliance. The primitive handles focus management, state synchronization, and event handling correctly.

```tsx
<RadixAccordion.Root type="single" collapsible={true}>
    <RadixAccordion.Item value="item-1">
        <RadixAccordion.Trigger>...</RadixAccordion.Trigger>
        <RadixAccordion.Content>...</RadixAccordion.Content>
    </RadixAccordion.Item>
</RadixAccordion.Root>
```

### 3. Enhanced Children with Position Props

**Decision**: Automatically inject `isFirst`, `isLast`, `isIntermediate`, `accordionType`, and `currentValue` props into AccordionV2Item children using React.cloneElement.

**Rationale**: Enables items to apply position-specific styling (first-child, last-child, intermediate) without requiring manual prop passing. The parent component calculates these values once and distributes them, reducing prop drilling and ensuring consistency.

```tsx
const enhancedChildren = useMemo(() => {
    return React.Children.map(children, (child, index) => {
        const isFirst = index === 0
        const isLast = index === totalItems - 1
        const isIntermediate = !isFirst && !isLast

        return React.cloneElement(child, {
            ...child.props,
            isFirst,
            isLast,
            isIntermediate,
            accordionType,
            currentValue: value,
        })
    })
}, [children, accordionType, value])
```

### 4. Collapsible Single Selection Mode

**Decision**: Set `collapsible={true}` for single selection mode, allowing users to close an open item by clicking it again.

**Rationale**: Provides better UX by allowing users to collapse accordion items. Without collapsible mode, once an item is opened, users cannot close it without opening another item. This gives users full control over content visibility.

```tsx
<StyledAccordionRoot
    type="single"
    collapsible={true}
    value={value as string | undefined}
    onValueChange={onValueChange as ((value: string) => void) | undefined}
>
```

### 5. Flexbox Layout with Absolute Positioning for Right Chevron

**Decision**: Use flexbox layout for the main trigger content, with absolute positioning only for the right-side chevron icon.

**Rationale**: Matches the proven pattern from the original Accordion component. The right chevron is absolutely positioned (`position: absolute`, `right: 0`, `top: 0`, `height: 100%`) to remain aligned regardless of content height, while maintaining a clean flexbox layout for other elements. This approach has been validated in production and ensures reliable click behavior. The left chevron uses natural flex positioning without absolute positioning.

```tsx
<Block display="flex" alignItems="flex-start" width="100%" position="relative" gap={...}>
    {chevronPosition === LEFT && <Block flexShrink={0}>{/* Chevron */}</Block>}
    {showLeftSlot && <Block flexShrink={0}>{leftSlot}</Block>}
    <Block flexGrow={chevronPosition === LEFT ? 1 : 0}>{/* Content */}</Block>
    {chevronPosition === RIGHT && (
        <Block position="absolute" right={0} top={0} height="100%">
            {/* Chevron */}
        </Block>
    )}
</Block>
```

### 6. Conditional Left Slot Visibility

**Decision**: Hide leftSlot when chevron position is set to LEFT, as both occupy the same visual space.

**Rationale**: Prevents visual conflicts and maintains clean layout. When chevron is on the left, it takes priority and leftSlot is automatically hidden. This ensures consistent spacing and prevents overlapping elements.

```tsx
const isChevronLeft = chevronPosition === AccordionV2ChevronPosition.LEFT
const showLeftSlot = leftSlot && !isChevronLeft
```

### 7. Responsive Subtext Handling

**Decision**: Hide subtext text on small screens when subtextSlot is provided, but always show subtextSlot regardless of screen size.

**Rationale**: Provides flexibility for different screen sizes. On small screens, subtextSlot (which may contain icons or compact UI elements) is prioritized over text subtext to save space. On larger screens, both can be displayed together.

```tsx
{
    subtext && !isSmallScreen && <PrimitiveText>{subtext}</PrimitiveText>
}
{
    subtextSlot && <Block>{subtextSlot}</Block>
}
```

### 8. Separator Rendering for BORDER Type

**Decision**: Render horizontal separator (hr) inside content area only for BORDER type accordions, and only when content is expanded.

**Rationale**: Provides visual separation between trigger and content for BORDER type, improving visual hierarchy. The separator is inside the content area to maintain proper border radius styling on the trigger when expanded.

```tsx
{
    accordionType === AccordionV2Type.BORDER && (
        <StyledSeparator
            $accordionType={accordionType}
            $accordionToken={accordionTokens}
        />
    )
}
```

### 9. Animated Chevron with Rotation Transitions

**Decision**: Use ChevronDown icon for right position and ChevronRight icon for left position, with smooth rotation animations based on expand state via `transform: rotate()`.

**Rationale**: Provides clear visual feedback for expand/collapse state. Different base icons for different positions maintain visual consistency with common UI patterns. Rotation is achieved through CSS transitions on the transform property, creating smooth 180-degree (right chevron) or 90-degree (left chevron) rotations when the accordion state changes. The chevron is marked with `aria-hidden="true"` since it is decorative and state is already conveyed by the Radix trigger's aria-expanded attribute.

```tsx
const rotation = isExpanded
    ? position === AccordionV2ChevronPosition.RIGHT
        ? '180deg'
        : '90deg'
    : '0deg'

<Block transform={`rotate(${rotation})`} transition="transform 0.3s ease">
    {position === RIGHT ? <ChevronDown /> : <ChevronRight />}
</Block>
```

### 10. Small Screen Border Radius Adjustments

**Decision**: Apply different border radius rules for BORDER and NO_BORDER types on small screens to create connected item appearance.

**Rationale**: On small screens, accordion items should appear as a connected list rather than separate cards. For BORDER type, items lose individual border radius except for first and last. For NO_BORDER type, items get bottom borders and lose top borders except for the first item.

```tsx
...(props.$isSmallScreen &&
    props.$accordionType === AccordionV2Type.BORDER && {
        '&:first-child': {
            borderBottomLeftRadius: 'unset',
            borderBottomRightRadius: 'unset',
        },
        '&:last-child': {
            borderTop: 'none',
            borderTopLeftRadius: 'unset',
            borderTopRightRadius: 'unset',
        },
    })
```

### 11. Disabled State Styling with Type Variations

**Decision**: Apply different background colors for disabled items based on accordion type (BORDER vs NO_BORDER).

**Rationale**: Provides clear visual distinction for disabled items while maintaining consistency with the overall accordion style. BORDER type gets a distinct disabled background, while NO_BORDER type maintains subtle disabled styling.

```tsx
...(props.$isDisabled &&
    props.$accordionType === AccordionV2Type.BORDER && {
        backgroundColor: props.$accordionToken.trigger.backgroundColor[
            props.$accordionType
        ].disabled,
    })
```

### 12. Focus-Visible Styles for Keyboard Navigation

**Decision**: Use `:focus-visible` pseudo-class to show focus outline only when navigating via keyboard.

**Rationale**: Provides clear visual feedback for keyboard users without showing focus rings for mouse clicks. This improves accessibility while maintaining clean visual design for mouse users.

```tsx
'&:focus-visible': {
    outline: `2px solid ${FOUNDATION_THEME.colors.primary[500]}`,
    outlineOffset: FOUNDATION_THEME.unit[2],
}
```

### 13. Responsive Token System

**Decision**: Use `useResponsiveTokens` hook to fetch breakpoint-specific tokens.

**Rationale**: Enables responsive design by allowing different token values for different screen sizes (sm, lg). This provides flexibility in spacing, typography, and layout adjustments across breakpoints.

```tsx
const accordionTokens =
    useResponsiveTokens<AccordionV2TokensType>('ACCORDIONV2')
```

### 14. ARIA Hidden for Decorative Slots

**Decision**: Mark slot containers with `aria-hidden="true"` when slots don't have aria-label, preventing screen readers from announcing decorative icons.

**Rationale**: Icons in accordion triggers are typically decorative and the accordion's semantic meaning is conveyed through text content. Hiding them from assistive technologies prevents redundant announcements while allowing meaningful icons (with aria-label) to be announced.

```tsx
const getAriaHidden = (slot: React.ReactNode): boolean | undefined => {
    if (!React.isValidElement(slot)) return true
    const props = slot.props as Record<string, unknown>
    return props['aria-label'] ? undefined : true
}
```

### 15. Data Attributes for Testing and Tracking

**Decision**: Use `data-element` and `data-id` attributes on key elements for testing and analytics.

**Rationale**: Provides reliable selectors for automated testing without relying on implementation details. `data-element` identifies element types (accordion-item, accordion-item-header, accordion-item-subtext, chevron-icon, leading-icon, trailing-icon), while `data-id` provides content-based identification.

```tsx
<Block data-element="accordion-item" data-id={title}>
<PrimitiveText data-element="accordion-item-header" data-id={title}>
```

### 16. Forward Ref Support

**Decision**: Use `forwardRef` to allow parent components to access the underlying DOM element.

**Rationale**: Enables imperative DOM operations when needed (e.g., scrolling, focus management, measuring dimensions) while maintaining the declarative React pattern.

```tsx
const AccordionV2 = forwardRef<HTMLDivElement, AccordionV2Props>((props, ref) => {
    return <StyledAccordionRoot ref={ref} ... />
})

const AccordionV2Item = forwardRef<HTMLDivElement, AccordionV2ItemProps>((props, ref) => {
    return <StyledAccordionItem ref={ref} ... />
})
```

### 17. Content Animation with Reduced Motion Support

**Decision**: Use CSS animations for expand/collapse transitions with `prefers-reduced-motion` media query to disable animations for users who prefer reduced motion.

**Rationale**: Provides smooth visual feedback for expand/collapse actions while respecting user accessibility preferences. Animations are disabled when users have reduced motion preferences set in their system.

```tsx
@media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
}
```

### 18. Current Value Prop Injection

**Decision**: Pass `currentValue` prop to each AccordionV2Item to enable local expansion state calculation.

**Rationale**: Allows each item to determine its own expanded state without requiring external state management. Items can calculate `isExpanded` locally by checking if their value matches the current value (handling both string and array cases for single/multiple modes).

```tsx
const isExpanded = Array.isArray(currentValue)
    ? currentValue.includes(value)
    : currentValue === value
```
