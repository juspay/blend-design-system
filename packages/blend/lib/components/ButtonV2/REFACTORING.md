# ButtonV2 Component Documentation

## Requirements

Create a scalable Button component that can display:

- **Text**: Primary button label
- **Left/Right Slots**: Optional icon or content slots with configurable max height
- **Multiple Variants**: Support for different visual styles (primary, secondary, danger, success)
- **Sizes**: sm, md, lg
- **Sub Types**: default, iconOnly, inline
- **States**: default, hover, active, disabled
- **Loading State**: Built-in loading spinner with accessibility support
- **Skeleton Loading**: Built-in skeleton state support
- **Button Groups**: Support for grouped buttons with border radius adjustments
- **Native HTML Props**: Full support for native button/anchor attributes (`onClick`, `disabled`, etc.)

## Anatomy

```
┌─────────────────────────────────────────┐
│  [LeftSlot]  Text Content  [RightSlot]  │
└─────────────────────────────────────────┘
```

**ButtonV2 Structure:**

- **Container**: Flex container with configurable padding, border, background, and border radius
- **Left Slot**: Optional ReactNode with maxHeight control for icons/content
- **Text**: Primary text content with size-based typography
- **Right Slot**: Optional ReactNode with maxHeight control for icons/content
- **Loading Spinner**: Replaces content when `loading={true}`

**File Structure:**

```
ButtonV2/
├── ButtonV2.tsx              # Main component with consolidated logic
├── buttonV2.types.ts          # Type definitions and enums
├── buttonV2.tokens.ts         # Token type definitions
├── buttonV2.light.tokens.ts   # Light theme token values
├── buttonV2.dark.tokens.ts    # Dark theme token values
├── utils.ts                  # Pure utility functions for logic
├── VisuallyHidden.tsx         # Accessibility helper
├── IconButton.tsx             # Icon-only button variant
├── LinkButton.tsx             # Link-styled button variant
├── ButtonGroupV2/
│   ├── ButtonGroupV2.tsx      # Button group component
│   ├── buttonGroupV2.types.ts # Group types
│   └── index.ts               # Group exports
└── index.ts                   # Main exports
```

## Props & Types

```typescript
type ButtonV2Props = {
    buttonType?: ButtonV2Type // 'primary' | 'secondary' | 'danger' | 'success'
    size?: ButtonV2Size // 'sm' | 'md' | 'lg'
    subType?: ButtonV2SubType // 'default' | 'iconOnly' | 'inline'
    text?: string // Button label text
    leftSlot?: {
        // Optional left slot with maxHeight control
        slot: ReactNode
        maxHeight?: string | number
    }
    rightSlot?: {
        // Optional right slot with maxHeight control
        slot: ReactNode
        maxHeight?: string | number
    }
    loading?: boolean // Shows loading spinner
    skeleton?: {
        // Skeleton configuration
        showSkeleton?: boolean
        skeletonVariant?: 'pulse' | 'wave' | 'shimmer'
    }
    buttonGroupPosition?: 'center' | 'left' | 'right' // For grouped buttons (border radius adjustment)
    width?: string | number // Button width
    minWidth?: string | number // Minimum button width
    maxWidth?: string | number // Maximum button width
    state?: ButtonV2State // 'default' | 'hover' | 'active' | 'disabled'
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>
```

**Enums:**

```typescript
export enum ButtonV2Type {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    SUCCESS = 'success',
}

export enum ButtonV2Size {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum ButtonV2SubType {
    DEFAULT = 'default',
    ICON_ONLY = 'iconOnly',
    INLINE = 'inline',
}

export enum ButtonV2State {
    DEFAULT = 'default',
    HOVER = 'hover',
    ACTIVE = 'active',
    DISABLED = 'disabled',
}

export enum PaddingDirection {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}
```

**Note:** `onClick` and `disabled` are handled via native HTML button attributes, not custom props.

## Final Token Type

```typescript
type ButtonV2TokensType = {
    gap: CSSObject['gap']
    backgroundColor: {
        [type in ButtonV2Type]: {
            [subType in ButtonV2SubType]: {
                [state in ButtonV2State]: CSSObject['background']
            }
        }
    }
    borderRadius: {
        [size in ButtonV2Size]: {
            [type in ButtonV2Type]: {
                [subType in ButtonV2SubType]: CSSObject['borderRadius']
            }
        }
    }
    padding: {
        [direction in PaddingDirection]: {
            [size in ButtonV2Size]: {
                [type in ButtonV2Type]: {
                    [subType in ButtonV2SubType]: CSSObject['padding']
                }
            }
        }
    }
    border: {
        [type in ButtonV2Type]: {
            [subType in ButtonV2SubType]: {
                [state in ButtonV2State]: CSSObject['border']
            }
        }
    }
    shadow: {
        [type in ButtonV2Type]: {
            [subType in ButtonV2SubType]: {
                [state in ButtonV2State]: CSSObject['boxShadow']
            }
        }
    }
    outline: {
        [type in ButtonV2Type]: {
            [subType in ButtonV2SubType]: {
                [state in ButtonV2State]: CSSObject['outline']
            }
        }
    }
    text: {
        color: {
            [type in ButtonV2Type]: {
                [subType in ButtonV2SubType]: {
                    [state in ButtonV2State]: CSSObject['color']
                }
            }
        }
        fontSize: { [size in ButtonV2Size]: CSSObject['fontSize'] }
        fontWeight: { [size in ButtonV2Size]: CSSObject['fontWeight'] }
        lineHeight: { [size in ButtonV2Size]: CSSObject['lineHeight'] }
    }
}
```

**Token Pattern**: `component.[target].CSSProp.[direction/size].[type].[subType].[state].value`

**Key Token Structure:**

- `padding`: Organized by direction first, then size, type, and subType for better organization
- `borderRadius`: Does not depend on state (same radius for default and disabled)
- `outline`: State-dependent for focus indication
- All style tokens follow consistent nesting: `[type].[subType].[state]`

## Design Decisions

### 1. Consolidated Component Structure

**Decision**: Merge `Button.tsx` (wrapper) and `ButtonBase.tsx` (base component) into a single `ButtonV2.tsx` file.

**Rationale**: The original Button component was split into a thin wrapper (`Button.tsx`) and a large base component (`ButtonBase.tsx`), which made the code harder to understand and maintain. Consolidating into a single file provides:

- Linear, readable flow
- No prop drilling
- Easier debugging and reasoning
- Reduced bundle size

**Before (Button):**

```tsx
// Button.tsx - just a thin wrapper
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props, ref) => {
        return <ButtonBase {...props} ref={ref} />
    }
)

// ButtonBase.tsx - all the actual logic (300+ lines)
export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
    (props, ref) => {
        // All button logic here...
    }
)
```

**After (ButtonV2):**

```tsx
// ButtonV2.tsx - consolidated component
const ButtonV2 = forwardRef<HTMLButtonElement, ButtonV2Props>((props, ref) => {
    // All button logic in one place
})
```

### 2. Business Logic Extraction

**Decision**: Extract all style calculations and decision-making logic into pure utility functions in `utils.ts`.

**Rationale**: Moving logic out of JSX improves testability, reusability, and maintainability. It also allows sharing logic between `ButtonV2` and `LinkButton`.

**Before (Button):**

```tsx
// Inline calculations in render
const borderRadius =
    buttonGroupPosition === 'left'
        ? `${tokens.borderRadius[size][buttonType][subType].default} 0 0 ${tokens.borderRadius[size][buttonType][subType].default}`
        : buttonGroupPosition === 'right'
          ? `0 ${tokens.borderRadius[size][buttonType][subType].default} ${tokens.borderRadius[size][buttonType][subType].default} 0`
          : tokens.borderRadius[size][buttonType][subType].default
```

**After (ButtonV2):**

```tsx
// utils.ts - testable, reusable functions
export function getBorderRadius(
    size: ButtonV2Size,
    buttonType: ButtonV2Type,
    subType: ButtonV2SubType,
    buttonGroupPosition: 'center' | 'left' | 'right' | undefined,
    tokens: ButtonV2TokensType
): string {
    const variantBorderRadius = String(
        tokens.borderRadius[size][buttonType][subType]
    )
    // ... logic
}
```

### 3. Shared Content Rendering

**Decision**: Centralize button content rendering in `renderButtonContent` helper function used by both `ButtonV2` and `LinkButton`.

**Rationale**: Eliminates code duplication and ensures consistent rendering across button variants.

**Before (Button):**

```tsx
// Same icon rendering logic duplicated in Button and LinkButton
{
    leadingIcon && (
        <Block as="span" contentCentered>
            {leadingIcon}
        </Block>
    )
}
{
    text && <Text>{text}</Text>
}
{
    trailingIcon && (
        <Block as="span" contentCentered>
            {trailingIcon}
        </Block>
    )
}
```

**After (ButtonV2):**

```tsx
// ButtonV2.tsx - centralized rendering
export function renderButtonContent({
    isLoading,
    isSkeleton,
    disabled,
    state,
    buttonType,
    subType,
    size,
    text,
    leftSlot,
    rightSlot,
    tokens,
}: RenderButtonContentProps) {
    // Centralized rendering logic for icons, text, and loading spinner
}

// Used in both ButtonV2 and LinkButton
{renderButtonContent({ ... })}
```

### 4. Slot-Based Icon API

**Decision**: Replace `leadingIcon`/`trailingIcon` props with `leftSlot`/`rightSlot` objects.

**Rationale**: Provides more flexibility with per-slot `maxHeight` control and establishes a consistent slot-based pattern.

**Before (Button):**

```tsx
<Button leadingIcon={<Icon />} trailingIcon={<Icon />} />
```

**After (ButtonV2):**

```tsx
<ButtonV2
    leftSlot={{ slot: <Icon />, maxHeight: '20px' }}
    rightSlot={{ slot: <Icon /> }}
/>
```

### 5. Simplified Skeleton Handling

**Decision**: Use nested `skeleton` prop object instead of separate `showSkeleton` and `skeletonVariant` props, and remove `getSkeletonState` utility.

**Rationale**: Groups related props together and simplifies the API. Direct boolean logic is clearer than utility wrappers.

**Before (Button):**

```tsx
const { shouldShowSkeleton } = getSkeletonState(showSkeleton)
<Button showSkeleton={true} skeletonVariant="pulse" />
```

**After (ButtonV2):**

```tsx
const isSkeleton = skeleton?.showSkeleton ?? false
<ButtonV2 skeleton={{ showSkeleton: true, skeletonVariant: 'pulse' }} />
```

### 6. Native HTML Props Support

**Decision**: Remove `onClick` and `disabled` from custom props and handle them as native HTML attributes.

**Rationale**: Aligns with platform standards and reduces API surface. Native attributes provide better TypeScript support and browser behavior.

**Before (Button):**

```tsx
type ButtonProps = {
    onClick?: (event: MouseEvent) => void
    disabled?: boolean
    // ... other props
}
```

**After (ButtonV2):**

```tsx
type ButtonV2Props = ButtonBaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>
// onClick and disabled come from React.ButtonHTMLAttributes
```

### 7. Cleaner Public API

**Decision**: Remove `justifyContent` and `fullWidth` props.

**Rationale**:

- `justifyContent` was always `'center'` - hardcoding reduces API surface
- `fullWidth` can be achieved with `width="100%"` or `width`, `minWidth`, `maxWidth` props for better control

**Before (Button):**

```tsx
<Button fullWidth justifyContent="center" />
```

**After (ButtonV2):**

```tsx
<ButtonV2 width="100%" />
// or
<ButtonV2 width={300} minWidth={200} maxWidth={400} />
```

### 8. Direction-Based Padding Structure

**Decision**: Restructure padding tokens from `padding[size][type][subType].{top, right, bottom, left}` to `padding[direction][size][type][subType]`.

**Rationale**: Organizing by direction first provides better structure and makes it easier to reason about padding values. This pattern is more scalable and aligns with CSS property organization.

**Before (Button):**

```ts
padding: {
    sm: {
        primary: {
            default: {
                top: '5px',
                right: '16px',
                bottom: '5px',
                left: '16px',
            }
        }
    }
}
```

**After (ButtonV2):**

```ts
padding: {
    top: {
        sm: {
            primary: {
                default: '5px'
            }
        }
    },
    right: {
        sm: {
            primary: {
                default: '16px'
            }
        }
    },
    // ... bottom and left
}
```

### 9. State-Independent Border Radius

**Decision**: Make `borderRadius` independent of state (same radius for default and disabled states).

**Rationale**: Border radius should remain consistent across all button states. Visual state changes are handled through background, border, and shadow tokens, not border radius.

**Token Structure:**

```ts
borderRadius: {
    [size in ButtonV2Size]: {
        [type in ButtonV2Type]: {
            [subType in ButtonV2SubType]: CSSObject['borderRadius']
        }
    }
}
```

### 10. Enum Naming Convention

**Decision**: Use `ButtonV2*` prefix for all enums (`ButtonV2Type`, `ButtonV2Size`, etc.) while maintaining backward compatibility through legacy exports.

**Rationale**: Clear naming distinguishes ButtonV2 from the original Button component. Legacy exports ensure existing code continues to work during migration.

```ts
export enum ButtonV2Type { ... }
export enum ButtonV2Size { ... }
// Legacy exports for backward compatibility
export const ButtonType = ButtonV2Type
export const ButtonSize = ButtonV2Size
```

## Utilities

All button logic is centralized in `utils.ts`:

- `getBorderRadius` - Border radius calculation with group position support
- `getSkeletonBorderRadius` - Skeleton border radius calculation
- `getButtonHeight` - Height calculation based on subType
- `getButtonStatus` - Status string for data attributes ('loading' | 'disabled' | 'enabled')
- `getButtonTabIndex` - Tab index logic for accessibility
- `getButtonStyles` - All style calculations (background, border, shadow, etc.)
- `getSkeletonWidth` - Skeleton width calculation
- `getIconMaxHeight` - Icon max height calculation with slot support
- `getIconColor` - Icon color resolution based on state
- `getTextColor` - Text color resolution based on state
- `getButtonPadding` - Padding value retrieval using direction-based structure
- `getButtonLineHeight` - Line height retrieval with fallback
- `getButtonBorderStyles` - Border styles for grouped buttons (individual border sides)

## Bundle Size Impact

- Removed unnecessary utilities (`getSkeletonState`)
- Eliminated wrapper component overhead (`Button.tsx` wrapper)
- Reduced duplication across variants (`renderButtonContent` shared function)
- Improved tree-shaking through better exports
- Consolidated component structure reduces overall file size
