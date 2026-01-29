# SnackbarV2 Component Documentation

## Requirements

Create a scalable toast notification component that can display:

- **Header**: Required primary text content
- **Description**: Optional secondary text content
- **Slot**: Optional custom icon or ReactElement, with default variant-specific icons (Info, Success, Warning, Error)
- **Action Button**: Optional primary action button with auto-dismiss control
- **Close Button**: Dismissible close button positioned at top-right
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

- **Container**: Main flex container with configurable width, maxWidth, minWidth, background, border radius, padding, and shadow
- **Slot**: Optional icon container with fixed dimensions. Uses default variant-specific icon if custom slot not provided
- **Main Container**: Flex container wrapping slot and content
- **Content Container**: Flex container for text and actions with column direction
- **Text Container**: Vertical flex container for header and description
- **Header**: Required paragraph text with variant-based color and typography tokens
- **Description**: Optional paragraph description with variant-based color and typography tokens
- **Action Container**: Container for primary action button
- **Close Button**: Dismissible button with X icon, positioned at top-right

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
    width?: CSSObject['width']
    maxWidth?: CSSObject['maxWidth']
    minWidth?: CSSObject['minWidth']
}

type SnackbarV2ToastOptions = {
    header: string
    description?: string
    variant?: SnackbarV2Variant
    slot?: ReactElement
    onClose?: () => void
    actionButton?: SnackbarV2Action
    duration?: number
    position?: SnackbarV2Position
    width?: string | number
    maxWidth?: string | number
    minWidth?: string | number
}

type SnackbarV2Props = {
    position?: SnackbarV2Position
    dismissOnClickAway?: boolean
}

type SnackbarV2ToastProps = {
    header: string
    description?: string
    variant: SnackbarV2Variant
    slot?: ReactElement
    onClose?: () => void
    actionButton?: SnackbarV2Action
    toastId?: string | number
    width?: string | number
    maxWidth?: string | number
    minWidth?: string | number
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'slot' | 'className' | 'style'>
```

## Final Token Type

```typescript
type SnackbarV2TokensType = {
    width: CSSObject['width']
    maxWidth: CSSObject['maxWidth']
    minWidth: CSSObject['minWidth']
    backgroundColor: CSSObject['backgroundColor']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']
    slot: {
        height: CSSObject['height']
        width: CSSObject['width']
        color: {
            [key in SnackbarV2Variant]: CSSObject['color']
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

**Rationale**: Improves code organization, maintainability, and testability. Each sub-component has a single responsibility, making the code easier to understand and modify.

```tsx
const SlotContainer = ({ slot, snackbarTokens }) => { ... }
const ActionButton = ({ action, variant, snackbarTokens, toastId }) => { ... }
const ActionsContainer = ({ actionButton, variant, snackbarTokens, toastId }) => { ... }
const TextContainer = ({ header, description, variant, snackbarTokens, headerId, descriptionId }) => { ... }
const CloseButton = ({ onClose, variant, snackbarTokens }) => { ... }
```

### 2. Variant-Based ARIA Role Assignment

**Decision**: Use `role="alert"` for error and warning variants, `role="status"` for info and success variants.

**Rationale**: Follows WCAG guidelines for live regions. Error and warning messages require immediate attention (assertive), while info and success messages are polite announcements.

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

### 4. Custom Slot with Default Icon Fallback

**Decision**: Allow users to pass custom slot icon via `slot` prop, with default variant-specific icons used when not provided.

**Rationale**: Provides flexibility for custom branding while maintaining sensible defaults. Default icons are automatically selected based on variant, reducing boilerplate for common cases.

```tsx
const defaultSlot = <SnackbarV2Icon variant={variant} />
const iconSlot = slot ?? defaultSlot
```

### 5. Token-Driven Icon Colors

**Decision**: Use variant-based color tokens from `slot.color[variant]` instead of hardcoded color values.

**Rationale**: Ensures consistent theming across light and dark modes. Icon colors are defined in tokens and can be easily adjusted per theme and variant.

```tsx
const iconColor = snackbarTokens.slot.color[variant]
```

### 6. Close Button Dimensions

**Decision**: Use token-defined height for close button (22px), with icon size matching button height.

**Rationale**: Provides consistent sizing across breakpoints and themes. Button dimensions are defined in tokens to support responsive adjustments.

```tsx
const closeButtonHeight = snackbarTokens.mainContainer.closeButton.height
<X size={closeButtonHeight} />
```

### 7. Line Height Tokens for Typography

**Decision**: Use lineHeight tokens for header, description, and action button with `addPxToValue` utility.

**Rationale**: Ensures consistent typography spacing across all text elements. Line heights are defined in tokens and converted to pixel values using the utility function.

```tsx
lineHeight={addPxToValue(snackbarTokens.mainContainer.content.textContainer.header.lineHeight)}
```

### 8. Responsive Token System

**Decision**: Use `useResponsiveTokens` hook to fetch breakpoint-specific tokens.

**Rationale**: Enables responsive design by allowing different token values for different screen sizes (sm, lg). This provides flexibility in spacing, typography, and layout adjustments across breakpoints.

```tsx
const snackbarTokens = useResponsiveTokens<SnackbarV2TokensType>('SNACKBARV2')
```

### 9. Configurable Dimensions with Token Defaults

**Decision**: Allow `width`, `maxWidth`, and `minWidth` to be passed as props, defaulting to token values when not provided.

**Rationale**: Provides flexibility for different use cases while maintaining sensible defaults. Users can override dimensions for specific snackbars, but defaults ensure consistent sizing across the application.

```tsx
width={width || snackbarTokens.width}
maxWidth={maxWidth || snackbarTokens.maxWidth}
minWidth={minWidth || snackbarTokens.minWidth}
```

### 10. Slot Container with ARIA Hidden

**Decision**: Mark the slot container with `aria-hidden="true"` to prevent screen readers from announcing decorative icons.

**Rationale**: Icons in snackbars are decorative and the snackbar's semantic meaning is conveyed through text content. Hiding them from assistive technologies prevents redundant announcements.

```tsx
<Block data-element="icon" aria-hidden="true">
    {slot}
</Block>
```

### 11. Action Button Auto-Dismiss Control

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

### 12. Filter Blocked Props Utility

**Decision**: Use `filterBlockedProps` utility to prevent certain HTML attributes from being passed to the component.

**Rationale**: Prevents conflicts between component-specific props and native HTML attributes. Ensures that only valid and safe props are spread onto the underlying DOM element.

```tsx
const filteredProps = filterBlockedProps(rest)
{...filteredProps}
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

**Rationale**: Provides reliable selectors for automated testing without relying on implementation details. `data-element` identifies element types (icon, header, description, close-button, primary-action), while `data-id` provides content-based identification.

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
