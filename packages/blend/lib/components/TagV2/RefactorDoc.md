# TagV2 Component Documentation

## Requirements

Create a scalable Tag component that can display:

- **Text**: Primary content
- **Left/Right Slots**: Optional icon or content slots with configurable max height
- **Multiple Variants**: Support for different visual styles (noFill, attentive, subtle)
- **Sizes**: xs, sm, md, lg
- **Shapes**: rounded, squarical
- **Colors**: neutral, primary, success, error, warning, purple
- **Interactive States**: Support for clickable tags with proper accessibility
- **Skeleton Loading**: Built-in skeleton state support

## Anatomy

```
┌─────────────────────────────────────────
│  [LeftSlot]  Text Content  [RightSlot]  │
└─────────────────────────────────────────
```

![Tag Anantomy](./TagAnatomy.png)

- **Container**: Flex container with configurable padding, border, background
- **Left Slot**: Optional ReactNode with maxHeight control
- **Text**: Primary text content with size-based typography
- **Right Slot**: Optional ReactNode with maxHeight control

## Props & Types

```typescript
type TagV2Props = {
    text: string // Required text content
    size?: TagV2Size // 'xs' | 'sm' | 'md' | 'lg'
    type?: TagV2Type // 'noFill' | 'attentive' | 'subtle'
    subType?: TagV2SubType // 'rounded' | 'squarical'
    color?: TagV2Color // 'neutral' | 'primary' | 'success' | 'error' | 'warning' | 'purple'
    leftSlot?: {
        // Optional left slot with maxHeight
        slot: ReactNode
        maxHeight: CSSObject['maxHeight']
    }
    rightSlot?: {
        // Optional right slot with maxHeight
        slot: ReactNode
        maxHeight: CSSObject['maxHeight']
    }
    skeleton: {
        // Skeleton configuration
        showSkeleton?: boolean
        skeletonVariant?: 'pulse' | 'wave' | 'shimmer'
    }
    tagGroupPosition?: 'center' | 'left' | 'right' // For grouped tags (border radius adjustment)
    onClick?: (event: MouseEvent) => void // Makes tag interactive (renders as button)
} & Omit<
    React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>,
    'size' | 'className' | 'style'
>
```

## Final Token Type

```typescript
type TagV2TokensType = {
    border: {
        [type in TagV2Type]: {
            [color in TagV2Color]: CSSObject['border']
        }
    }
    borderRadius: {
        [size in TagV2Size]: {
            [subType in TagV2SubType]: CSSObject['borderRadius']
        }
    }
    backgroundColor: {
        [type in TagV2Type]: {
            [color in TagV2Color]: CSSObject['backgroundColor']
        }
    }
    height: {
        [size in TagV2Size]: CSSObject['height']
    }
    padding: {
        top: { [size in TagV2Size]: CSSObject['padding'] }
        bottom: { [size in TagV2Size]: CSSObject['padding'] }
        left: { [size in TagV2Size]: CSSObject['padding'] }
        right: { [size in TagV2Size]: CSSObject['padding'] }
    }
    gap: CSSObject['gap']
    leftSlot: {
        maxHeight: { [size in TagV2Size]: CSSObject['maxHeight'] }
    }
    rightSlot: {
        maxHeight: { [size in TagV2Size]: CSSObject['maxHeight'] }
    }
    text: {
        color: {
            [type in TagV2Type]: {
                [color in TagV2Color]: CSSObject['color']
            }
        }
        fontSize: { [size in TagV2Size]: CSSObject['fontSize'] }
        fontWeight: { [size in TagV2Size]: CSSObject['fontWeight'] }
        lineHeight: { [size in TagV2Size]: CSSObject['lineHeight'] }
    }
}
```

**Token Pattern**: `component.[target].CSSProp.[size].[variant/type].[subVariant/subType].[state].value`

## Problems in Previous Component & Solutions

### Problem 1: Component Architecture Complexity

**Issue**: Old `Tag` component used a separate `TagBase` component, creating unnecessary abstraction and making the code harder to follow.

```tsx
// Old: Two-component structure
<Tag> → <TagBase> → <Block>
```

**Solution**: TagV2 uses a single component with conditional rendering based on interactivity:

```tsx
// New: Single component with semantic HTML
const TagElement = onClick ? PrimitiveButton : Block
```

### Problem 2: Incorrect Semantic HTML

**Issue**: Old component always rendered as `<div>` even when interactive, using `role="button"` as a workaround.

```tsx
// Old: Always div with role attribute
<Block role={isInteractive ? 'button' : undefined} onClick={...} />
```

**Solution**: TagV2 renders actual `<button>` element when interactive, improving accessibility and browser behavior:

```tsx
// New: Proper semantic HTML
const TagElement = onClick ? PrimitiveButton : Block
<TagElement role={isInteractive ? 'button' : undefined} />
```

### Problem 3: Slot Configuration Limitations

**Issue**: Old component slots were simple `ReactNode` props with no control over sizing:

```tsx
// Old: No maxHeight control
leftSlot?: ReactNode
rightSlot?: ReactNode
```

**Solution**: TagV2 provides structured slot props with `maxHeight` control:

```tsx
// New: Structured slots with sizing
leftSlot?: {
    slot: ReactNode
    maxHeight: CSSObject['maxHeight']
}
```

### Problem 4: Mixed Concerns (Ripple Animation)

**Issue**: Old component mixed ripple animation logic directly in the main component, adding complexity:

```tsx
// Old: Ripple logic mixed in component
const { ripples, createRipple } = useRipple()
// ... ripple handling code ...
{
    showRipple && <RippleContainer ripples={ripples} />
}
```

**Solution**: TagV2 focuses on core functionality. Interactive states use native focus-visible styles:

```tsx
// New: Clean focus styles without animation complexity
const focusVisibleStyles = isInteractive ? FOCUS_VISIBLE_STYLES : undefined
_focusVisible = { focusVisibleStyles }
```

### Problem 5: Skeleton Logic Embedded

**Issue**: Old component had skeleton rendering logic mixed with main component logic:

```tsx
// Old: Skeleton logic in main component
if (shouldShowSkeleton) {
    return (
        <Skeleton>
            <TagBase isSkeleton />
        </Skeleton>
    )
}
```

**Solution**: TagV2 uses a dedicated `TagSkeleton` component for cleaner separation:

```tsx
// New: Separate skeleton component
if (showSkeleton) {
    return <TagSkeleton {...props} />
}
```

### Problem 6: Token Structure Organization

**Issue**: Old tokens had inconsistent structure and less granular control:

```tsx
// Old: Less organized padding
padding: { [size in TagSize]: CSSObject['padding'] }
```

**Solution**: TagV2 provides directional padding control:

```tsx
// New: Directional padding control
padding: {
    top: { [size in TagV2Size]: CSSObject['padding'] }
    bottom: { [size in TagV2Size]: CSSObject['padding'] }
    left: { [size in TagV2Size]: CSSObject['padding'] }
    right: { [size in TagV2Size]: CSSObject['padding'] }
}
```

### Problem 7: Naming Inconsistency

**Issue**: Old component used `splitTagPosition` which was less clear:

```tsx
// Old: Unclear naming
splitTagPosition?: 'left' | 'right'
```

**Solution**: TagV2 uses clearer `tagGroupPosition` with 'center' option:

```tsx
// New: Clearer naming with more options
tagGroupPosition?: 'center' | 'left' | 'right'
```

### Problem 8: Accessibility Handling

**Issue**: Old component had accessibility logic scattered throughout the component.

**Solution**: TagV2 centralizes accessibility in utility functions:

```tsx
// New: Centralized accessibility utilities
const accessibleName = getAccessibleName(text, isInteractive, ariaPressed)
const handleKeyDown = createKeyboardHandler(isInteractive, onClick)
```

## Key Improvements Summary

1. ✅ **Simpler Architecture**: Single component vs two-component structure
2. ✅ **Better Semantics**: Proper `<button>` element for interactive tags
3. ✅ **Enhanced Slots**: Structured props with maxHeight control
4. ✅ **Cleaner Code**: Separated skeleton component, removed ripple complexity
5. ✅ **Better Tokens**: More granular control with directional padding
6. ✅ **Improved Accessibility**: Centralized utilities and proper ARIA handling
7. ✅ **Clearer Naming**: More intuitive prop names
