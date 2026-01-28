# SnackbarV2 Component Documentation

## Requirements

Create a scalable toast notification component that can display:

- **Header**: Required primary text content
- **Description**: Optional secondary text content
- **Slot**: Variant-specific icon (Info, Success, Warning, Error) with configurable dimensions and colors
- **Action Button**: Optional primary action button with auto-dismiss control
- **Close Button**: Dismissible close button positioned at top-right with configurable size and padding
- **Multiple Variants**: Support for different semantic variants (info, success, warning, error)
- **Multiple Positions**: Support for different screen positions (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center)
- **Responsive Design**: Support for different breakpoints (sm, lg)
- **Accessibility**: Full ARIA support with proper roles and live regions
- **Theme Support**: Light and dark mode token support

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ [Slot]  [Header]                              [CloseButton] │
│          [Description] (optional)                           │
│          [Action Button] (optional)                         │
└─────────────────────────────────────────────────────────────┘
```

- **Container**: Main flex container with configurable background, border radius, padding, shadow, and max-width
- **Slot**: Variant-specific icon container with fixed dimensions, variant-based colors, and top/bottom padding
- **Main Container**: Flex container wrapping slot and content
- **Content Container**: Flex container for text and actions with column direction
- **Text Container**: Vertical flex container for header and description
- **Header**: Required paragraph text with variant-based color and typography tokens
- **Description**: Optional paragraph description with variant-based color and typography tokens
- **Action Container**: Container for primary action button
- **Close Button**: Dismissible button with X icon, positioned at top-right, 21x21px size with 4px padding on all sides

## Props & Types

```typescript
enum SnackbarV2Variant {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

enum SnackbarV2Position {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    TOP_CENTER = 'top-center',
    BOTTOM_CENTER = 'bottom-center',
}

type SnackbarV2Action = {
    label: string
    onClick: () => void
    autoDismiss?: boolean
}

type SnackbarV2Dimensions = {
    maxWidth?: CSSObject['maxWidth']
}

type SnackbarV2ToastOptions = {
    header: string
    description?: string
    variant?: SnackbarV2Variant
    onClose?: () => void
    actionButton?: SnackbarV2Action
    duration?: number
    position?: SnackbarV2Position
    maxWidth?: string | number
}

type SnackbarV2Props = {
    position?: SnackbarV2Position
    dismissOnClickAway?: boolean
    maxWidth?: string | number
}

type SnackbarV2ToastProps = {
    header: string
    description?: string
    variant: SnackbarV2Variant
    onClose?: () => void
    actionButton?: SnackbarV2Action
    toastId?: string | number
    maxWidth?: string | number
}
```

## Final Token Type

```typescript
type SnackbarV2TokensType = {
    backgroundColor: CSSObject['backgroundColor']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']
    maxWidth: CSSObject['maxWidth']
    slot: {
        height: CSSObject['height']
        width: CSSObject['width']
        color: {
            [key in SnackbarV2Variant]: CSSObject['color']
        }
        padding: {
            [key in SnackbarV2PaddingDirection]: CSSObject['padding']
        }
    }
    mainContainer: {
        gap: CSSObject['gap']
        content: {
            gap: CSSObject['gap']
            textContainer: {
                gap: CSSObject['gap']
                header: {
                    color: {
                        [key in SnackbarV2Variant]: CSSObject['color']
                    }
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                }
                description: {
                    color: {
                        [key in SnackbarV2Variant]: CSSObject['color']
                    }
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                }
            }
            actionContainer: {
                primaryAction: {
                    color: {
                        [key in SnackbarV2Variant]: CSSObject['color']
                    }
                    fontSize: CSSObject['fontSize']
                    fontWeight: CSSObject['fontWeight']
                    lineHeight: CSSObject['lineHeight']
                }
            }
        }
        closeButton: {
            height: CSSObject['height']
            color: {
                [key in SnackbarV2Variant]: CSSObject['color']
            }
            padding: {
                [key in SnackbarV2PaddingDirection]: CSSObject['padding']
            }
        }
    }
}

type ResponsiveSnackbarV2Tokens = {
    [key in keyof BreakpointType]: SnackbarV2TokensType
}
```

**Token Pattern**: `component.[target].CSSProp.[variant].[state].value`

## Design Decisions

### 1. Component Composition with Sub-Components

**Decision**: Extract rendering logic into separate sub-components (`SlotContainer`, `ActionButton`, `ActionsContainer`, `TextContainer`, `CloseButton`).

**Rationale**: Improves code organization, maintainability, and testability. Each sub-component has a single responsibility, making the code easier to understand and modify. This also enables better code reuse and separation of concerns.

```tsx
const SlotContainer = ({ slot, snackbarTokens }) => { ... }
const ActionButton = ({ action, variant, snackbarTokens, toastId }) => { ... }
const ActionsContainer = ({ actionButton, variant, snackbarTokens, toastId }) => { ... }
const TextContainer = ({ header, description, variant, snackbarTokens, headerId, descriptionId }) => { ... }
const CloseButton = ({ onClose, variant, snackbarTokens }) => { ... }
```

### 2. Variant-Based ARIA Role Assignment

**Decision**: Use `role="alert"` for error and warning variants, `role="status"` for info and success variants.

**Rationale**: Follows WCAG guidelines for live regions. Error and warning messages require immediate attention (assertive), while info and success messages are polite announcements. This ensures screen readers announce messages with appropriate urgency.

```tsx
const role =
    variant === SnackbarV2Variant.ERROR || variant === SnackbarV2Variant.WARNING
        ? 'alert'
        : 'status'
```

### 3. Dynamic ID Generation for Accessibility

**Decision**: Use React's `useId()` hook to generate unique IDs for header and description elements.

**Rationale**: Ensures proper ARIA relationships between the snackbar container and its content. The generated IDs are used in `aria-labelledby` and `aria-describedby` to create semantic connections for screen readers.

```tsx
const baseId = useId()
const idPrefix = toastId ? `snackbar-${toastId}` : baseId
const headerId = `${idPrefix}-header`
const descriptionId = description ? `${idPrefix}-description` : undefined
```

### 4. Token-Driven Icon Colors

**Decision**: Use variant-based color tokens from `slot.color[variant]` instead of hardcoded color values.

**Rationale**: Ensures consistent theming across light and dark modes. Icon colors are defined in tokens and can be easily adjusted per theme and variant. Matches the pattern used in the original Snackbar component.

```tsx
const iconColor = snackbarTokens.slot.color[variant]
```

### 5. Close Button Top-Right Alignment

**Decision**: Position close button at top-right corner using `alignItems="flex-start"` and `justifyContent="flex-end"` with fixed 21x21px dimensions.

**Rationale**: Provides consistent visual hierarchy and matches common UI patterns. The top-right position is the standard location for close buttons in toast notifications, making it intuitive for users.

```tsx
<PrimitiveButton
    alignItems="flex-start"
    justifyContent="flex-end"
    height={closeButtonSize}
    width={closeButtonSize}
>
```

### 6. Close Button Padding Structure

**Decision**: Use padding structure following ButtonV2 pattern with 4px padding on all sides, defined in tokens.

**Rationale**: Provides consistent spacing and follows the established design system patterns. Padding is defined in tokens to support responsive adjustments and theme variations.

```tsx
padding: {
    top: foundationToken.unit[4],
    bottom: foundationToken.unit[4],
    left: foundationToken.unit[4],
    right: foundationToken.unit[4],
}
```

### 7. Slot Padding for Icon Alignment

**Decision**: Apply 4px top and bottom padding to slot container, with 0px left and right padding.

**Rationale**: Ensures proper vertical alignment of icons with text content. The top/bottom padding compensates for icon positioning while maintaining horizontal alignment with the text.

```tsx
slot: {
    padding: {
        top: foundationToken.unit[4],
        bottom: foundationToken.unit[4],
        left: foundationToken.unit[0],
        right: foundationToken.unit[0],
    }
}
```

### 8. Line Height Tokens for Typography

**Decision**: Use lineHeight tokens for header (24px), description (20px), and action button (20px) with `addPxToValue` utility.

**Rationale**: Ensures consistent typography spacing across all text elements. Line heights are defined in tokens and converted to pixel values using the utility function to match the pattern used in AlertV2.

```tsx
lineHeight={addPxToValue(snackbarTokens.mainContainer.content.textContainer.header.lineHeight)}
```

### 9. Responsive Token System

**Decision**: Use `useResponsiveTokens` hook to fetch breakpoint-specific tokens.

**Rationale**: Enables responsive design by allowing different token values for different screen sizes (sm, lg). This provides flexibility in spacing, typography, and layout adjustments across breakpoints.

```tsx
const snackbarTokens = useResponsiveTokens<SnackbarV2TokensType>('SNACKBARV2')
```

### 10. Configurable MaxWidth with Token Default

**Decision**: Allow `maxWidth` to be passed as a prop, defaulting to token value `calc(100vw - 32px)` when not provided.

**Rationale**: Provides flexibility for different use cases while maintaining sensible defaults. Users can override the maxWidth for specific snackbars, but the default ensures snackbars don't overflow on small screens.

```tsx
maxWidth={maxWidth || snackbarTokens.maxWidth}
```

### 11. Slot Container with ARIA Hidden

**Decision**: Mark the slot container with `aria-hidden="true"` to prevent screen readers from announcing decorative icons.

**Rationale**: Icons in snackbars are decorative and the snackbar's semantic meaning is conveyed through text content. Hiding them from assistive technologies prevents redundant announcements.

```tsx
<Block data-element="icon" aria-hidden="true">
    {slot}
</Block>
```

### 12. Action Button Auto-Dismiss Control

**Decision**: Allow action buttons to control whether the snackbar dismisses automatically when clicked via `autoDismiss` property (defaults to `true`).

**Rationale**: Provides flexibility for different use cases. Some actions may require the snackbar to remain visible (e.g., "View Details"), while others should dismiss it (e.g., "Undo"). Defaults to dismissing for common cases while allowing override for special scenarios.

```tsx
onClick={() => {
    action.onClick()
    if (action.autoDismiss !== false && toastId) {
        sonnerToast.dismiss(toastId)
    }
}}
```

### 13. Forward Ref Support

**Decision**: Use `forwardRef` to allow parent components to access the underlying DOM element.

**Rationale**: Enables imperative DOM operations when needed (e.g., scrolling, focus management, measuring dimensions) while maintaining the declarative React pattern.

```tsx
const SnackbarV2 = forwardRef<HTMLDivElement, SnackbarV2Props>((props, ref) => {
    return <Block ref={ref} ... />
})
```

### 14. Separation of Toast Creation and Container Component

**Decision**: Split functionality into `SnackbarV2` (container component) and `addSnackbarV2` (toast creation function).

**Rationale**: Follows the pattern established by Sonner library. The container component (`SnackbarV2`) is placed once in the app root, while `addSnackbarV2` can be called from anywhere to trigger snackbars. This separation provides better developer experience and follows React best practices.

```tsx
;<SnackbarV2 position={SnackbarV2Position.BOTTOM_RIGHT} />

addSnackbarV2({
    header: 'Success!',
    description: 'Your changes have been saved.',
    variant: SnackbarV2Variant.SUCCESS,
})
```

### 15. Click-Away Dismissal with Event Delegation

**Decision**: Use event delegation on document to handle click-away dismissal, checking if the click target is within a snackbar element.

**Rationale**: Provides better UX by allowing users to dismiss snackbars by clicking outside. Uses `data-snackbar` attribute for reliable element detection. Properly cleans up event listeners to prevent memory leaks.

```tsx
useEffect(() => {
    if (!dismissOnClickAway) return

    const handleClickAway = (event: MouseEvent) => {
        const target = event.target as Node
        const clickedSnackbar = (target as Element)?.closest('[data-snackbar]')
        if (!clickedSnackbar) {
            sonnerToast.dismiss()
        }
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
}, [dismissOnClickAway])
```

### 16. Data Attributes for Testing and Tracking

**Decision**: Use `data-element` and `data-id` attributes on key interactive elements for testing and analytics.

**Rationale**: Provides reliable selectors for automated testing without relying on implementation details. `data-element` identifies element types (icon, header, description, close-button, primary-action), while `data-id` provides content-based identification. This follows testing best practices and enables better tracking.

```tsx
<Text data-element="header" data-id={header}>...</Text>
<PrimitiveButton data-element="close-button">...</PrimitiveButton>
<PrimitiveButton data-element="primary-action" data-id={action.label}>...</PrimitiveButton>
```

### 17. Focus-Visible Styles for Interactive Elements

**Decision**: Use custom `_focusVisible` styles for close button to provide clear keyboard navigation feedback.

**Rationale**: Ensures keyboard users have clear visual feedback when navigating through interactive elements. The focus styles use the same color as the close button for consistency.

```tsx
_focusVisible={{
    outline: `1px solid ${closeButtonColor}`,
}}
```
