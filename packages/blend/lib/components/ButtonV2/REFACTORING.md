Here’s a **clean, human-written, well-structured refactor** of your documentation.
I’ve **not added new commentary**, only reorganized, tightened language, improved flow, and removed redundancy so it reads like an internal design-system RFC / component doc.

---

# ButtonV2 Component

## Overview

**ButtonV2** is a refactored version of the original Button component.
The goal of this refactor is to improve readability, maintainability, and bundle size **without changing behavior or public capabilities**.

ButtonV2 follows **RFC 0007** refactoring guidelines and maintains **100% feature parity** with the original Button.

---

## Goals

- Maintain complete feature parity with the original Button
- Reduce bundle size through better structure and tree-shaking
- Improve readability by consolidating logic
- Improve maintainability by separating business logic from rendering
- Align with RFC 0007 component refactoring standards

---

## Props & Types

### `ButtonV2Props`

```ts
export type ButtonV2Props = {
    buttonType?: ButtonType
    size?: ButtonSize
    subType?: ButtonSubType
    text?: string
    leftSlot?: {
        slot: React.ReactNode
        maxHeight?: string | number
    }
    rightSlot?: {
        slot: React.ReactNode
        maxHeight?: string | number
    }
    loading?: boolean
    showSkeleton?: boolean
    skeletonVariant?: SkeletonVariant
    width?: string | number
    minWidth?: string | number
    maxWidth?: string | number
    state?: ButtonState
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style' | 'className'>
```

`onClick` and `disabled` are handled via native HTML button attributes.

---

### Enums

```ts
export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    DANGER = 'danger',
    SUCCESS = 'success',
}

export enum ButtonSize {
    SMALL = 'sm',
    MEDIUM = 'md',
    LARGE = 'lg',
}

export enum ButtonSubType {
    DEFAULT = 'default',
    ICON_ONLY = 'iconOnly',
    INLINE = 'inline',
}

export enum ButtonState {
    DEFAULT = 'default',
    HOVER = 'hover',
    ACTIVE = 'active',
    DISABLED = 'disabled',
}
```

---

## Component Structure

```
ButtonV2/
├── ButtonV2.tsx
├── buttonV2.types.ts
├── buttonV2.tokens.ts
├── buttonV2.light.tokens.ts
├── buttonV2.dark.tokens.ts
├── utils.ts
├── VisuallyHidden.tsx
├── IconButton.tsx
├── LinkButton.tsx
├── ButtonGroupV2/
│   ├── ButtonGroupV2.tsx
│   ├── buttonGroupV2.types.ts
│   └── index.ts
└── index.ts
```

---

## Token Type

```ts
export type ButtonV2TokensType = Readonly<{
    gap: CSSObject['gap']
    backgroundColor: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['background']
            }
        }
    }
    borderRadius: {
        [key in ButtonSize]: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    [key in ButtonState]: CSSObject['borderRadius']
                }
            }
        }
    }
    padding: {
        [key in ButtonSize]: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    x: CSSObject['padding']
                    y: CSSObject['padding']
                }
            }
        }
    }
    border: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['border']
            }
        }
    }
    shadow: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['boxShadow']
            }
        }
    }
    outline: {
        [key in ButtonType]: {
            [key in ButtonSubType]: {
                [key in ButtonState]: CSSObject['outline']
            }
        }
    }
    text: {
        color: {
            [key in ButtonType]: {
                [key in ButtonSubType]: {
                    [key in ButtonState]: CSSObject['color']
                }
            }
        }
        fontSize: {
            [key in ButtonSize]: CSSObject['fontSize']
        }
        fontWeight: {
            [key in ButtonSize]: CSSObject['fontWeight']
        }
    }
}>
```

---

## Issues in the Original Button

### Split Component Structure

The original implementation split logic between a wrapper and a base component.
Most of the logic lived in a large `ButtonBase` file, while the wrapper added little value.

This made the component harder to understand, debug, and maintain.

---

### Business Logic Mixed with JSX

Style calculations and behavioral logic were implemented inline inside JSX.

This made the logic:

- Hard to test
- Hard to reuse
- Duplicated across Button and LinkButton

---

### Unnecessary Utility Abstractions

Some utilities existed only to wrap trivial logic, adding extra imports and bundle weight.

---

### Code Duplication

Button and LinkButton duplicated most of their internal rendering logic, increasing maintenance cost and risk of inconsistencies.

---

## Solutions in ButtonV2

### Single, Consolidated Component

ButtonV2 merges wrapper and base logic into a single file.

This results in:

- Linear, readable flow
- No prop drilling
- Easier debugging and reasoning

---

### Business Logic Extraction

All calculations and decision-making logic have been moved to pure functions in `utils.ts`.

This allows:

- Independent unit testing
- Reuse across ButtonV2 and LinkButton
- Clear separation between logic and rendering

---

### Simplified Skeleton Handling

Skeleton state is now derived directly from props using simple boolean logic.

This removes unnecessary imports and improves clarity.

---

### Shared Content Rendering

Button content rendering is centralized in a single helper function used by both ButtonV2 and LinkButton.

This ensures consistent rendering and avoids duplication.

---

### Slot-Based Icon API

The icon API was refactored to use `leftSlot` and `rightSlot` objects instead of separate icon props.

This provides:

- More flexibility
- Better control over layout
- A consistent slot-based pattern

---

### Cleaner Public API

Props that can be handled by native HTML attributes or simple styles were removed.

This results in:

- Smaller API surface
- Better alignment with platform standards
- More predictable behavior

---

### Internal Group Position Handling

`buttonGroupPosition` is treated as an internal prop injected by `ButtonGroupV2`.

It is intentionally excluded from the public API to prevent misuse.

---

## Utilities

All button logic is centralized in `utils.ts`, including:

- Border radius calculation
- Height and spacing logic
- Style resolution
- Grouped button border handling
- Text and icon color resolution
- Skeleton sizing and layout logic
- Accessibility-related helpers

---

## Bundle Size Impact

- Removed unnecessary utilities
- Eliminated wrapper component overhead
- Reduced duplication across variants
- Improved tree-shaking
