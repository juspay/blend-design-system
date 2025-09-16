# Skeleton Implementation Approach

## Overview

Our skeleton implementation creates **pixel-perfect component replicas** by importing and using the exact same tokens as their real component counterparts.

## SkeletonButton Implementation

### 1. Token Mirroring

```typescript
import type { ButtonTokensType } from '../Button/button.tokens'
import { ButtonType, ButtonSize, ButtonSubType } from '../Button/types'

const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
    ({
        buttonType = ButtonType.PRIMARY,
        size = ButtonSize.MEDIUM,
        subType = ButtonSubType.DEFAULT,
        ...props
    }) => {
        // Import exact Button component tokens
        const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')

        // Mirror exact Button styling
        const getMirroredButtonStyles = () => ({
            padding: buttonTokens.padding[size][subType], // ✅ Exact match
            borderRadius:
                buttonTokens.borderRadius[buttonType][subType].default, // ✅ Exact match
            gap: buttonTokens.gap, // ✅ Exact match
        })
    }
)
```

### 2. Dynamic Width Calculation

Content-aware sizing that matches real Button behavior:

```typescript
const calculateDynamicWidth = () => {
    if (fullWidth) return '100%'
    if (width) return width
    if (subType === ButtonSubType.ICON_ONLY || !text) return 'fit-content'

    // Character width scaling by button size
    const getCharacterWidth = () => {
        switch (size) {
            case ButtonSize.SMALL:
                return 7 // ~7px per character
            case ButtonSize.MEDIUM:
                return 8 // ~8px per character
            case ButtonSize.LARGE:
                return 9 // ~9px per character
        }
    }

    let estimatedWidth = text.length * getCharacterWidth()

    // Add icon widths (16px icon + 8px gap)
    if (hasLeadingIcon) estimatedWidth += 24
    if (hasTrailingIcon) estimatedWidth += 24

    return Math.max(estimatedWidth + 16, 60) + 'px' // buffer + minimum
}
```

### 3. Dynamic Height Calculation

Height calculation that mirrors Button component logic:

```typescript
const getMinimumHeight = () => {
    if (subType === ButtonSubType.INLINE) return 'fit-content'

    // Extract vertical padding from Button tokens
    const verticalPadding = parseInt(
        buttonStyles.padding.split(' ')[0].replace('px', '')
    )

    // Content height based on button content
    const contentHeight = subType === ButtonSubType.ICON_ONLY ? 16 : 20

    // Total: top padding + content + bottom padding
    return `${verticalPadding * 2 + contentHeight}px`
}
```

### 4. ButtonGroup Support

Handles border radius adjustments for button groups:

```typescript
const getBorderRadius = () => {
    if (buttonGroupPosition === undefined) return borderRadius
    if (buttonGroupPosition === 'left')
        return `${borderRadius} 0 0 ${borderRadius}`
    if (buttonGroupPosition === 'right')
        return `0 ${borderRadius} ${borderRadius} 0`
    return '0px 0px 0px 0px' // center
}
```

## Implementation Template

```typescript
const SkeletonComponent = forwardRef<HTMLDivElement, SkeletonComponentProps>(
    ({ loading = true, ...props }, ref) => {
        if (!loading) return null

        // 1. Import target component tokens
        const componentTokens = useResponsiveTokens<ComponentTokensType>('COMPONENT')

        // 2. Mirror exact styling
        const getMirroredStyles = () => ({
            padding: componentTokens.padding[size][variant],
            borderRadius: componentTokens.borderRadius[type][variant],
        })

        // 3. Calculate dynamic dimensions (if needed)
        const dynamicWidth = calculateWidth()
        const dynamicHeight = calculateHeight()

        return (
            <Skeleton
                {...props}
                {...getMirroredStyles()}
                width={dynamicWidth}
                height={dynamicHeight}
                ref={ref}
            />
        )
    }
)
```

## Key Principles

1. **Direct Token Import**: Import exact component tokens using `useResponsiveTokens`
2. **Perfect Mirroring**: Use exact token values for padding, border radius, gap, etc.
3. **Content-Aware Sizing**: Calculate dynamic width/height based on actual content
4. **Conditional Logic**: Mirror component behavior for special cases (icon-only, inline, groups)
5. **Loading State**: Return `null` when `loading={false}`

## Atomic Design Architecture

### Atoms vs Molecules Approach

Our skeleton implementation follows strict atomic design principles:

#### **Atom: `Skeleton.tsx` (Pure)**

The base Skeleton component is a **pure atom** that only handles:

- Animation rendering (pulse, wave, shimmer)
- Shape styling (circle, rectangle, rounded)
- Basic layout properties (width, height, padding)

```typescript
// Pure atom - no business logic, only visual rendering
const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
    ({ variant, animate, width, height, shape, ...rest }, ref) => {
        // Only handles loading state and animation
        const { shouldRender, tokens, prefersReducedMotion } = useSkeletonBase(loading)

        if (!shouldRender) return children ? <>{children}</> : null

        return (
            <StyledSkeleton
                $variant={variant}
                $shape={shape}
                $animate={animate && !prefersReducedMotion}
                width={width}
                height={height}
                {...rest}
            />
        )
    }
)
```

#### **Molecule: `SkeletonButton.tsx` (Business Logic)**

SkeletonButton is a **molecule** that contains:

- Component-specific token imports
- Business logic for sizing calculations
- Component behavior mirroring

```typescript
// Molecule - contains business logic and token mirroring
const SkeletonButton = forwardRef<HTMLDivElement, SkeletonButtonProps>(
    ({ buttonType, size, subType, text, hasLeadingIcon, ...props }, ref) => {
        // Business logic: Import Button tokens
        const buttonTokens = useResponsiveTokens<ButtonTokensType>('BUTTON')

        // Business logic: Calculate dimensions
        const dynamicWidth = calculateDynamicWidth()
        const dynamicHeight = getMinimumHeight()

        // Business logic: Mirror exact Button styles
        const mirroredStyles = getMirroredButtonStyles()

        // Compose with pure atom
        return (
            <Skeleton
                {...props}
                {...mirroredStyles}
                width={dynamicWidth}
                height={dynamicHeight}
                ref={ref}
            />
        )
    }
)
```

### Separation of Concerns

| Layer                         | Responsibility        | Contains                                        |
| ----------------------------- | --------------------- | ----------------------------------------------- |
| **Atom (Skeleton)**           | Visual rendering only | Animation, shapes, basic styling                |
| **Molecule (SkeletonButton)** | Business logic        | Token imports, calculations, component behavior |
| **Hook (useSkeletonBase)**    | Shared logic          | Loading states, accessibility, token fetching   |

### Benefits of This Architecture

1. **Pure Atoms**: Base Skeleton component has zero business logic, making it highly reusable
2. **Composability**: Molecules compose atoms with specific business logic
3. **Maintainability**: Each layer has a single responsibility
4. **Testability**: Pure atoms can be tested independently of business logic
5. **Consistency**: All skeleton molecules use the same pure atom foundation

This approach ensures skeleton components are visually identical to their real counterparts while maintaining clean architectural boundaries.
