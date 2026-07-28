# ModalV2 Component Documentation

## Requirements

Create a scalable ModalV2 component that can display:

- **Title**: Primary header text
- **Subtitle**: Optional descriptive text below the title
- **Content**: Flexible body content area
- **Action Buttons**: Primary and secondary action support with ButtonV2
- **Close Button**: Optional close button with X icon
- **Responsive**: Desktop modal and mobile drawer variants
- **Animations**: Smooth enter/exit transitions (300ms)
- **Skeleton Loading**: Built-in skeleton state for header, body, and footer
- **Accessibility**: Full ARIA support, keyboard navigation, focus management
- **Customizable**: Custom dimensions, dividers, and backdrop behavior

## Anatomy

```
┌──────────────────────────────────────────────────┐
│  Title                                  [X]      │
│  Subtitle                                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  Content Area                                    │
│  - Flexible content                              │
│  - Scrollable for long content                   │
│                                                  │
├──────────────────────────────────────────────────┤
│                                    [Cancel] [OK] │
└──────────────────────────────────────────────────┘
```

- **Header**: Contains title, subtitle, optional close button, and right slot
- **Body**: Flexible content area with scroll support for overflow
- **Footer**: Action buttons (primary and secondary)
- **Backdrop**: Semi-transparent overlay with click-to-close option
- **Portal**: Renders outside the main DOM tree for proper z-index

## Props & Types

```typescript
type ModalV2Props = {
    isOpen: boolean
    onClose: () => void
    title?: string
    subtitle?: string
    children: ReactNode
    primaryAction?: ModalV2ButtonAction
    secondaryAction?: ModalV2ButtonAction
    showCloseButton?: boolean
    closeOnBackdropClick?: boolean
    showDivider?: boolean
    isCustom?: boolean
    useDrawerOnMobile?: boolean
    minWidth?: string
    maxWidth?: string
    minHeight?: string
    maxHeight?: string
    skeleton?: ModalV2BodySkeletonProps
} & HTMLAttributes<HTMLDivElement>

type ModalV2ButtonAction = Omit<ButtonV2Props, 'buttonGroupPosition'>

type ModalV2BodySkeletonProps = {
    show?: boolean
    variant?: SkeletonVariant
    bodySkeletonProps?: {
        show?: boolean
        width?: string
        height?: string | number
    }
}
```

## Final Token Type

```typescript
type ModalV2TokensType = {
    boxShadow: CSSObject['boxShadow']
    borderRadius: CSSObject['borderRadius']
    overlay: {
        backgroundColor: CSSObject['backgroundColor']
    }
    header: {
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        borderBottom: CSSObject['border']
        backgroundColor: CSSObject['backgroundColor']
        text: {
            title: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
            subtitle: {
                color: CSSObject['color']
                fontSize: CSSObject['fontSize']
                fontWeight: CSSObject['fontWeight']
            }
        }
    }
    body: {
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        backgroundColor: CSSObject['backgroundColor']
    }
    footer: {
        paddingTop: CSSObject['paddingTop']
        paddingRight: CSSObject['paddingRight']
        paddingBottom: CSSObject['paddingBottom']
        paddingLeft: CSSObject['paddingLeft']
        borderTop: CSSObject['border']
        backgroundColor: CSSObject['backgroundColor']
        gap: CSSObject['gap']
    }
    closeButton: {
        color: CSSObject['color']
    }
    skeleton: {
        header: {
            gap: CSSObject['gap']
            paddingTop: CSSObject['paddingTop']
            paddingRight: CSSObject['paddingRight']
            paddingBottom: CSSObject['paddingBottom']
            paddingLeft: CSSObject['paddingLeft']
            borderBottom: CSSObject['border']
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
        }
        body: {
            gap: CSSObject['gap']
            width: CSSObject['width']
            height: CSSObject['height']
            borderRadius: CSSObject['borderRadius']
        }
    }
}
```

**Token Pattern**: `component.[target].CSSProp.[breakpoint].[state].value`

## Design Decisions

### 1. Separate Mobile and Desktop Variants

**Decision**: Implement `mobileModalV2.tsx` using DrawerV2 for mobile (< 1024px), while desktop uses the standard modal.

**Rationale**: Mobile devices benefit from bottom sheet interaction pattern which is more ergonomic for touch interfaces. DrawerV2 (based on Vaul) provides smooth swipe-to-dismiss gestures.

```tsx
const isMobile = innerWidth < 1024

if (isMobile && useDrawerOnMobile) {
    return <MobileModalV2 {...props} />
}
```

### 2. Portal Rendering for Proper Stacking

**Decision**: Use `createPortal` to render modal outside the main DOM tree into a dedicated portal container.

**Rationale**: Ensures modal appears above all other content regardless of parent z-index contexts. Prevents clipping by overflow: hidden ancestors.

```tsx
const portalContainer = getPortalContainer()
return createPortal(modalContent, portalContainer)
```

### 3. Animation System with CSS-in-JS

**Decision**: Use styled-components with CSS keyframe animations for enter/exit transitions.

**Rationale**: Provides smooth 300ms animations with proper easing curves. Separates animation logic from component state management.

```tsx
const AnimatedBackdrop = styled(Block)<{ $isAnimatingIn: boolean }>`
    ${({ $isAnimatingIn }) => modalBackdropAnimationsV2($isAnimatingIn)}
`

const AnimatedModalContent = styled(Block)<{ $isAnimatingIn: boolean }>`
    ${({ $isAnimatingIn }) => modalContentAnimationsV2($isAnimatingIn)}
`
```

### 4. ARIA Attributes for Accessibility

**Decision**: Implement comprehensive ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`.

**Rationale**: Ensures screen readers properly announce the modal dialog context. Follows WCAG 2.1 Level A requirements for accessible dialogs.

```tsx
<Block
    role="dialog"
    aria-modal="true"
    aria-labelledby={titleId}
    aria-describedby={subtitleId}
    aria-label={title || 'Modal dialog'}
>
```

### 5. ButtonV2 Integration

**Decision**: Use ButtonV2 for all interactive elements (close button, action buttons) instead of the deprecated Button component.

**Rationale**: Ensures consistency across the design system. ButtonV2 provides better token integration and accessibility features.

```tsx
<ButtonV2
    subType={ButtonV2SubType.INLINE}
    buttonType={ButtonV2Type.SECONDARY}
    leftSlot={{ slot: <XIcon size={16} aria-hidden="true" /> }}
    onClick={onClose}
    aria-label="Close modal"
/>
```

### 6. Skeleton State Support

**Decision**: Support skeleton loading states for header, body, and footer independently.

**Rationale**: Provides visual feedback during async operations. Allows fine-grained control over which parts of the modal show loading states.

```tsx
{skeleton?.show && skeleton?.bodySkeletonProps?.show ? (
    <ModalV2Skeleton modalTokens={modalTokens} bodySkeleton={...} />
) : (
    children
)}
```

### 7. Escape Key Handling

**Decision**: Implement global Escape key listener in `useModal` hook to close the modal.

**Rationale**: Provides standard keyboard shortcut for closing dialogs. Essential for accessibility and user experience.

```tsx
useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onClose()
        }
    }
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
}, [onClose])
```

### 8. Backdrop Click Configuration

**Decision**: Make backdrop click-to-close configurable via `closeOnBackdropClick` prop.

**Rationale**: Some modals (like important confirmations) should not close on accidental backdrop clicks. Gives developers control over the user experience.

```tsx
const handleBackdropClick = useCallback(() => {
    if (closeOnBackdropClick) {
        onClose()
    }
}, [closeOnBackdropClick, onClose])
```

### 9. Responsive Token System

**Decision**: Support responsive tokens with sm/lg breakpoints for different screen sizes.

**Rationale**: Modal appearance should adapt to screen size. Larger screens get more padding and shadows for better visual hierarchy.

```typescript
return {
    sm: {
        /* mobile styles */
    },
    lg: {
        /* desktop styles */
    },
}
```

### 10. Dark Theme Support

**Decision**: Implement separate dark theme tokens in `modalV2.dark.tokens.ts`.

**Rationale**: Proper dark mode support requires carefully chosen colors for backgrounds, borders, and text to maintain contrast ratios and visual hierarchy.

```typescript
backgroundColor: foundationToken.colors.gray[800] // Dark background
borderBottom: `1px solid ${foundationToken.colors.gray[700]}` // Subtle borders
text: {
    title: {
        color: foundationToken.colors.gray[100]
    }
} // Light text
```

## Accessibility Features

### WCAG 2.1 Compliance

- **1.3.1 Info and Relationships**: Semantic HTML with proper roles
- **2.1.1 Keyboard**: Full keyboard navigation support (Tab, Escape, Enter)
- **2.4.3 Focus Order**: Logical tab order through modal elements
- **2.4.7 Focus Visible**: Visible focus indicators on all interactive elements
- **4.1.2 Name, Role, Value**: Proper ARIA labeling and relationships

### Keyboard Navigation

| Key           | Action                                 |
| ------------- | -------------------------------------- |
| `Tab`         | Navigate to next focusable element     |
| `Shift + Tab` | Navigate to previous focusable element |
| `Enter`       | Activate focused button                |
| `Escape`      | Close the modal                        |

### Screen Reader Support

- Announces modal title when opened (`aria-labelledby`)
- Announces subtitle context (`aria-describedby`)
- Indicates modal state (`aria-modal="true"`)
- Close button has descriptive label ("Close modal")
- Action buttons have meaningful text labels

## Usage Examples

### Basic Modal

```tsx
import { ModalV2, ButtonV2Type } from '@juspay/blend-design-system'
import { useState } from 'react'

const [isOpen, setIsOpen] = useState(false)

<ModalV2
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Confirm Action"
    subtitle="Are you sure you want to proceed?"
    primaryAction={{
        text: 'Confirm',
        onClick: () => setIsOpen(false),
        buttonType: ButtonV2Type.PRIMARY,
    }}
    secondaryAction={{
        text: 'Cancel',
        onClick: () => setIsOpen(false),
        buttonType: ButtonV2Type.SECONDARY,
    }}
>
    <p>Modal content goes here</p>
</ModalV2>
```

### Danger Action

```tsx
<ModalV2
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Delete Item"
    subtitle="This action cannot be undone"
    primaryAction={{
        text: 'Delete',
        onClick: handleDelete,
        buttonType: ButtonV2Type.DANGER,
    }}
    secondaryAction={{
        text: 'Cancel',
        onClick: () => setIsOpen(false),
        buttonType: ButtonV2Type.SECONDARY,
    }}
>
    <p>Are you sure you want to delete this item?</p>
</ModalV2>
```

### With Skeleton Loading

```tsx
<ModalV2
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Loading Data"
    skeleton={{
        show: isLoading,
        variant: 'pulse',
        bodySkeletonProps: { show: true, width: '100%', height: 200 },
    }}
>
    {isLoading ? null : <DataContent />}
</ModalV2>
```

### Custom Size

```tsx
<ModalV2
    isOpen={isOpen}
    onClose={() => setIsOpen(false)}
    title="Custom Modal"
    minWidth="400px"
    maxWidth="600px"
    maxHeight="80vh"
    primaryAction={{
        text: 'Done',
        onClick: () => setIsOpen(false),
        buttonType: ButtonV2Type.PRIMARY,
    }}
>
    <p>Content with custom dimensions</p>
</ModalV2>
```
