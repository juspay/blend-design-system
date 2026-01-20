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

## Design Decisions

### 1. Conditional Semantic HTML Rendering

**Decision**: Use `PrimitiveButton` for interactive tags and `Block` for non-interactive tags.

**Rationale**: Ensures proper semantic HTML and native browser behavior. Interactive tags should be actual `<button>` elements for better accessibility, keyboard navigation, and screen reader support.

```tsx
const TagElement = onClick ? PrimitiveButton : Block
```

### 2. Separate Skeleton Component

**Decision**: Extract skeleton rendering logic into a dedicated `TagSkeleton` component.

**Rationale**: Improves code organization and maintainability. Separates concerns between the main component logic and skeleton state handling.

```tsx
if (showSkeleton) {
    return <TagSkeleton {...props} />
}
```

### 3. Focus-Visible Styles for Accessibility

**Decision**: Use native focus-visible styles instead of custom animation effects for interactive states.

**Rationale**: Provides clear visual feedback for keyboard navigation while maintaining simplicity. Follows WCAG 2.4.7 Focus Visible guidelines.

```tsx
const FOCUS_VISIBLE_STYLES = {
    outline: '2px solid #0561E2',
    outlineOffset: '2px',
    boxShadow: '0 0 0 3px rgba(5, 97, 226, 0.1)',
} as const
```

### 4. Centralized Accessibility Utilities

**Decision**: Extract accessibility logic into utility functions (`getAccessibleName`, `createKeyboardHandler`).

**Rationale**: Improves code reusability, testability, and maintainability. Keeps the main component focused on rendering logic.

```tsx
const accessibleName = getAccessibleName(text, isInteractive, ariaPressed)
const handleKeyDown = createKeyboardHandler(isInteractive, onClick)
```

### 5. Tag Group Position for Border Radius

**Decision**: Use `tagGroupPosition` prop to adjust border radius when tags are grouped together.

**Rationale**: Enables seamless visual connection between adjacent tags in a group while maintaining individual tag functionality.

```tsx
borderRadius={getTagBorderRadius(
    size,
    subType,
    tagGroupPosition,
    tagTokens
)}
```

### 6. Pointer Events Handling for Interactive Tags

**Decision**: Set `pointerEvents: 'none'` on the container when interactive, delegating pointer handling to the button element.

**Rationale**: Prevents event conflicts and ensures proper click handling in nested interactive elements.

```tsx
pointerEvents={onClick ? 'none' : undefined}
```
