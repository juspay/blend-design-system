# SnackbarV2 Component Documentation

## Requirements

Create a scalable toast notification component that can:

- **Support variants**: `info`, `success`, `warning`, `error`
- **Support positions**: `top-left`, `top-right`, `bottom-left`, `bottom-right`, `top-center`, `bottom-center`
- **Handle content**: required header, optional description
- **Support actions**: optional action button with auto-dismiss control
- **Handle dismissal**: close button, auto-dismiss with configurable duration, click-away dismissal
- **Be accessible**: proper ARIA roles, keyboard operable, screen-reader friendly
- **Support stacking**: multiple snackbars can be displayed simultaneously
- **Be theme-aware**: support light and dark themes with responsive tokens

## Anatomy

```
┌─────────────────────────────────────────────────────────────┐
│ [Icon]  Header Text                          [Close Button] │
│          Description Text (optional)                         │
│          [Action Button] (optional)                          │
└─────────────────────────────────────────────────────────────┘
```

- **Container**: `Block` with tokens for background, border radius, padding, shadow, max-width
- **Icon Container**: Variant-specific icon (Info, Success, Warning, Error) with aria-hidden
- **Header**: Required text content with variant-based color and typography tokens
- **Description**: Optional text content with proper spacing and alignment
- **Action Button**: Optional interactive button with auto-dismiss behavior
- **Close Button**: Dismissible button with variant-based icon color

## Props & Types

```typescript
export enum SnackbarV2Variant {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export enum SnackbarV2Position {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    TOP_CENTER = 'top-center',
    BOTTOM_CENTER = 'bottom-center',
}

export type SnackbarV2Action = {
    label: string
    onClick: () => void
    autoDismiss?: boolean
}

export type SnackbarV2ToastOptions = {
    header: string
    description?: string
    variant?: SnackbarV2Variant
    onClose?: () => void
    actionButton?: SnackbarV2Action
    duration?: number
    position?: SnackbarV2Position
    maxWidth?: string | number
}

export type SnackbarV2Props = {
    position?: SnackbarV2Position
    dismissOnClickAway?: boolean
    maxWidth?: string | number
}

export type SnackbarV2ToastProps = {
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
export type SnackbarV2TokensType = {
    backgroundColor: CSSObject['backgroundColor']
    borderRadius: CSSObject['borderRadius']
    padding: CSSObject['padding']
    maxWidth: CSSObject['maxWidth']
    boxShadow: CSSObject['boxShadow']
    gap: CSSObject['gap']

    infoIcon: {
        color: {
            [key in SnackbarV2Variant]: CSSObject['color']
        }
        height: CSSObject['height' | 'width']
    }

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
            }
            description: {
                color: {
                    [key in SnackbarV2Variant]: CSSObject['color']
                }
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
        }
    }

    actions: {
        primaryAction: {
            color: {
                [key in SnackbarV2Variant]: CSSObject['color']
            }
            fontSize: CSSObject['fontSize']
            fontWeight: CSSObject['fontWeight']
        }
        closeButton: {
            height: CSSObject['height' | 'width']
            color: {
                [key in SnackbarV2Variant]: CSSObject['color']
            }
        }
    }
}
```

**Token Pattern**: `component.[target].CSSProp.[variant].value`

## Design Decisions

### 1. Component Composition with Sub-Components

**Decision**: Break down `StyledToast` into smaller, focused sub-components: `IconContainer`, `HeaderContainer`, `DescriptionContainer`, `ActionButton`, and `CloseButton`.

**Rationale**: Improves code readability, maintainability, and testability. Each sub-component has a single responsibility and can be tested independently. Makes the main component easier to understand and modify.

```tsx
<Block role={role} aria-labelledby={headerId} aria-describedby={descriptionId}>
    <Block display="flex" alignItems="center" justifyContent="space-between">
        <IconContainer variant={variant} />
        <HeaderContainer header={header} variant={variant} snackbarTokens={snackbarTokens} headerId={headerId} />
        <CloseButton onClose={onClose} variant={variant} snackbarTokens={snackbarTokens} />
    </Block>
    {description && <DescriptionContainer ... />}
    {actionButton && <ActionButton ... />}
</Block>
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

### 3. Proper ARIA Relationships

**Decision**: Use `aria-labelledby` and `aria-describedby` to establish relationships between the snackbar container and its content.

**Rationale**: Ensures screen readers can properly announce the snackbar content. The header is always present (labelledby), while description is optional (describedby only when present). Uses unique IDs based on toastId to avoid conflicts when multiple snackbars are displayed.

```tsx
const idPrefix = toastId ? `snackbar-${toastId}` : baseId
const headerId = `${idPrefix}-header`
const descriptionId = description ? `${idPrefix}-description` : undefined

<Block
    role={role}
    aria-labelledby={headerId}
    aria-describedby={descriptionId}
>
```

### 4. Token-Driven Styling with Responsive Support

**Decision**: Use `useResponsiveTokens` hook to access theme-aware, responsive tokens for all styling decisions.

**Rationale**: Ensures consistent styling across themes and breakpoints. Single source of truth for design tokens makes it easy to maintain and update styles. Supports both light and dark themes seamlessly.

```tsx
const snackbarTokens = useResponsiveTokens<SnackbarV2TokensType>('SNACKBARV2')
```

### 5. Configurable MaxWidth with Token Default

**Decision**: Allow `maxWidth` to be passed as a prop, defaulting to token values from foundation tokens when not provided.

**Rationale**: Provides flexibility for different use cases while maintaining sensible defaults. Users can override the maxWidth for specific snackbars (e.g., wider snackbars for longer content), but the default comes from the design system tokens (350px for sm, 420px for lg breakpoints). This follows the pattern established by other V2 components like AlertV2.

```tsx
maxWidth={maxWidth || snackbarTokens.maxWidth}
```

### 6. Decorative Icons with Proper Accessibility

**Decision**: Mark icons with `aria-hidden="true"` since they are decorative and the text content provides the accessible information.

**Rationale**: Prevents screen readers from announcing redundant information. The icon visual meaning is conveyed through the variant, and the text content provides the actual message. Follows WCAG 1.1.1 Non-text Content guidelines.

```tsx
<Block data-element="icon" aria-hidden="true">
    <SnackbarV2Icon variant={variant} />
</Block>
```

### 7. Action Button Auto-Dismiss Control

**Decision**: Allow action buttons to control whether the snackbar dismisses automatically when clicked via `autoDismiss` property (defaults to `true`).

**Rationale**: Provides flexibility for different use cases. Some actions may require the snackbar to remain visible (e.g., "View Details"), while others should dismiss it (e.g., "Undo"). Defaults to dismissing for common cases while allowing override for special scenarios.

```tsx
onClick={() => {
    actionButton.onClick()
    if (actionButton.autoDismiss !== false && toastId) {
        sonnerToast.dismiss(toastId)
    }
}}
```

### 8. Ref Forwarding for Parent Component Control

**Decision**: Use `forwardRef` to allow parent components to access the SnackbarV2 container element.

**Rationale**: Enables parent components to integrate with the snackbar container (e.g., for positioning, animation libraries, or testing). Maintains React best practices for component composition.

```tsx
const SnackbarV2 = forwardRef<HTMLDivElement, SnackbarV2Props>(
    ({ position, dismissOnClickAway }, ref) => {
        return (
            <Block ref={ref}>
                <Toaster position={position} ... />
            </Block>
        )
    }
)
```

### 9. Click-Away Dismissal with Event Delegation

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

### 10. Separation of Toast Creation and Container Component

**Decision**: Split functionality into `SnackbarV2` (container component) and `addSnackbarV2` (toast creation function).

**Rationale**: Follows the pattern established by Sonner library. The container component (`SnackbarV2`) is placed once in the app root, while `addSnackbarV2` can be called from anywhere to trigger snackbars. This separation provides better developer experience and follows React best practices.

```tsx
;<SnackbarV2 position={SnackbarV2Position.BOTTOM_RIGHT} />

addSnackbarV2({
    header: 'Success!',
    description: 'Your changes have been saved.',
    variant: SnackbarV2Variant.SUCCESS,
    maxWidth: 500,
})
```

### 11. Data Attributes for Testing and Tracking

**Decision**: Use `data-element` and `data-id` attributes on key interactive elements for testing and analytics.

**Rationale**: Provides reliable selectors for automated testing without relying on implementation details. `data-element` identifies element types (header, description, close-button, primary-action), while `data-id` provides content-based identification. This follows testing best practices and enables better tracking.

```tsx
<Text data-element="header" data-id={header}>...</Text>
<PrimitiveButton data-element="close-button">...</PrimitiveButton>
<PrimitiveButton data-element="primary-action" data-id={actionButton.label}>...</PrimitiveButton>
```

## Improvements Over Original Snackbar

### 1. Better Code Organization

- **Original**: Single large component with inline logic
- **V2**: Composed of smaller, focused sub-components
- **Benefit**: Easier to read, test, and maintain

### 2. Enhanced Type Safety

- **Original**: Less strict type definitions
- **V2**: Comprehensive TypeScript types with proper enums
- **Benefit**: Better IDE support and catch errors at compile time

### 3. Improved Accessibility

- **Original**: Basic ARIA support
- **V2**: Proper role assignment based on variant, better ARIA relationships
- **Benefit**: Better screen reader support and WCAG compliance

### 4. Ref Forwarding

- **Original**: No ref support
- **V2**: Full ref forwarding support
- **Benefit**: Better integration with parent components and testing

### 5. Token Architecture

- **Original**: Direct token usage
- **V2**: Responsive, theme-aware token system
- **Benefit**: Better support for multiple themes and breakpoints

### 6. Component Composition

- **Original**: Monolithic structure
- **V2**: Modular sub-components
- **Benefit**: Better code reusability and testability
