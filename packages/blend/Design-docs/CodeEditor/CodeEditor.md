# CodeEditorV2 Component Documentation

## Requirements

Create a scalable code editor component that can display:

- **Editor**: Monaco-based single editor for code input/viewing
- **Diff mode**: Side-by-side or inline diff rendering (original vs modified)
- **Header**: Optional header with title and slots/actions
- **Line numbers**: Configurable gutter visibility
- **Sizing**: Configurable `minHeight`, `maxHeight`, `height` (and responsive tokens)
- **States**: Read-only and disabled modes
- **Accessibility**: Keyboard support and no obvious WCAG violations (axe validation)
- **Theme support**: Light/dark theme via Blend design tokens

## Anatomy

```
┌────────────────────────────────────────────────────────────────────┐
│  Header (optional)                                                 │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │  Title / left slot                    right slot / copy       │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                    │
│  Body                                                              │
│  ┌───────────┬──────────────────────────────────────────────────┐  │
│  │  Gutter   │  Monaco editor surface                            │  │
│  │  (lines)  │  - syntax highlighting                            │  │
│  │           │  - selection / cursor                             │  │
│  └───────────┴──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────┘
```

## Props & Types

Source: `packages/blend/lib/components/CodeEditorV2/codeEditorV2.types.ts`

```ts
export type CodeEditorV2Props = {
    value: string
    onChange?: (value: string) => void
    variant?: CodeEditorV2Variant
    showLineNumbers?: boolean
    showHeader?: boolean
    header?: string
    headerLeftSlot?: ReactNode
    headerRightSlot?: ReactNode
    showLeftIcon?: boolean
    showCopyButton?: boolean
    language?: SupportedLanguage
    placeholder?: string
    readOnly?: boolean
    disabled?: boolean
    className?: string
    onBlur?: () => void
    onFocus?: () => void
    autoFocus?: boolean
    diff?: boolean
    originalValue?: string
    renderSideBySide?: boolean
    width?: string | number
    maxWidth?: string | number
    minWidth?: string | number
    height?: string | number
    maxHeight?: string | number
    minHeight?: string | number
}
```

### Variants

```ts
export enum CodeEditorV2Variant {
    DEFAULT = 'default',
    NO_GUTTER = 'no-gutter',
    DIFF = 'diff',
}
```

## Token Type (High-level)

Source: `packages/blend/lib/components/CodeEditorV2/codeEditorV2.tokens.ts`

Key groups:

- **Container tokens**: `backgroundColor`, `border`, `borderRadius`, `boxShadow`
- **Header tokens**: `header.backgroundColor`, `header.borderBottom`, `header.padding`, `header.text`
- **Body tokens**:
    - `body.backgroundColor`
    - `body.gutter.*` (diff-aware using `DiffLineType`)
    - `body.highlightedLine.backgroundColor` (diff-aware using `DiffLineType`)
    - `body.syntax.*` (global syntax colors)

`DiffLineType` keys:

```ts
export enum DiffLineType {
    ADDED = 'added',
    REMOVED = 'removed',
    UNCHANGED = 'unchanged',
}
```

## Usage

### Basic editor

```tsx
import CodeEditorV2 from '@juspay/blend-design-system/CodeEditorV2'

export function Example() {
    return (
        <CodeEditorV2
            value={`console.log('hello')`}
            language="javascript"
            header="Example"
            showHeader
            showLineNumbers
        />
    )
}
```

### Controlled editor

```tsx
import React, { useState } from 'react'
import CodeEditorV2 from '@juspay/blend-design-system/CodeEditorV2'

export function Controlled() {
    const [value, setValue] = useState('const x = 1')
    return (
        <CodeEditorV2
            value={value}
            onChange={setValue}
            language="typescript"
            minHeight="280px"
        />
    )
}
```

### Diff editor

```tsx
import CodeEditorV2 from '@juspay/blend-design-system/CodeEditorV2'
import { CodeEditorV2Variant } from '@juspay/blend-design-system/CodeEditorV2/codeEditorV2.types'

export function DiffExample() {
    return (
        <CodeEditorV2
            variant={CodeEditorV2Variant.DIFF}
            diff
            originalValue={`console.log('old')`}
            value={`console.log('new')`}
            language="javascript"
            renderSideBySide
            header="Diff"
            showHeader
        />
    )
}
```

## Design Decisions

### 1. Monaco wrapper for token-driven theming

**Decision**: Use a dedicated Monaco wrapper (`MonacoEditorWrapper`) to translate Blend tokens into Monaco theme rules and editor options.

**Rationale**: Keeps Monaco-specific concerns isolated and allows the editor to react to theme/token changes without leaking Monaco APIs to the consumer.

### 2. Diff-specific visuals via `diffEditor.*` colors

**Decision**: Diff state is primarily communicated via background/gutter/overview colors (`diffEditor.*`), driven by `DiffLineType`.

**Rationale**: Monaco’s theming is global; per-line diff state is best represented via diff decorations rather than trying to vary token colors per diff line.

## Testing

- **Unit tests**: `packages/blend/__tests__/components/CodeEditorV2/CodeEditorV2.test.tsx`
- **Accessibility tests**: `packages/blend/__tests__/components/CodeEditorV2/CodeEditorV2.accessibility.test.tsx`
