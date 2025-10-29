# WorkflowCanvas Component

A powerful workflow visualization component built on top of React Flow, providing a token-based themeable canvas for creating node-based workflows.

## Architecture

The component follows a **component-specific CSS approach** for better maintainability and tree-shaking:

```
WorkflowCanvas/
├── WorkflowCanvas.tsx           # Main component
├── WorkflowCanvas.css           # Component-specific CSS overrides
├── workflow.tokens.ts           # Token definitions for theming
├── types.ts                     # TypeScript type definitions
├── nodes/                       # Custom node components
├── edges/                       # Custom edge components
└── WorkflowControls.tsx         # Control panel component
```

## CSS Scoping Strategy

### Problem Solved

Previously, the component used `!important` flags to override ReactFlow's default styles globally, which caused issues when:

1. The consuming app already uses ReactFlow elsewhere
2. Multiple WorkflowCanvas instances existed in the same app
3. The consuming app had different styling requirements for ReactFlow

### Solution

The component now uses **scoped CSS** with the `.blend-workflow-canvas` class:

```css
/* Only affects WorkflowCanvas instances, not other ReactFlow usage */
.blend-workflow-canvas .react-flow__node {
    cursor: pointer;
    padding: 0;
    border: none;
    /* ... */
}
```

**Benefits:**

- ✅ No `!important` flags needed
- ✅ Doesn't affect other ReactFlow instances in the app
- ✅ Clean separation of concerns
- ✅ Better CSS specificity management

## ReactFlow CSS Import

**Important:** This component **imports** `reactflow/dist/style.css` internally to ensure proper functionality.

### CSS Architecture

The component uses a hybrid approach:

1. **ReactFlow Base CSS**: Imported globally for core functionality
2. **Scoped Overrides**: Custom styles in `WorkflowCanvas.css` scoped to `.blend-workflow-canvas`

This means:

- ✅ ReactFlow's base styles are available (required for proper rendering)
- ✅ Our custom node/edge styles only affect WorkflowCanvas instances
- ✅ Other ReactFlow instances in your app won't be affected by our overrides

### For Consuming Applications

No additional CSS imports needed! Just use the component:

```tsx
import { WorkflowCanvas } from '@juspay/blend-design-system'

// WorkflowCanvas handles all CSS internally
;<WorkflowCanvas nodes={nodes} edges={edges} />
```

**Note**: If you're already using ReactFlow elsewhere in your app and have imported `reactflow/dist/style.css`, there's no conflict - the CSS will simply be imported once.

## Usage Example

```tsx
import { WorkflowCanvas } from '@juspay/blend-design-system'
import type { BlendNode, BlendEdge } from '@juspay/blend-design-system'

const MyWorkflow = () => {
    const nodes: BlendNode[] = [
        {
            id: '1',
            type: 'input',
            position: { x: 0, y: 0 },
            data: { label: 'Start' },
        },
    ]

    const edges: BlendEdge[] = []

    return (
        <WorkflowCanvas
            nodes={nodes}
            edges={edges}
            height="600px"
            width="100%"
            showControls
            showMinimap
        />
    )
}
```

## Styling Philosophy

1. **Token-based theming**: All colors, sizes, and spacing use the theme token system
2. **Scoped overrides**: CSS overrides are scoped to `.blend-workflow-canvas`
3. **No global pollution**: Doesn't affect other ReactFlow instances
4. **Component-specific CSS**: Keeps styles colocated with the component

## Migration Guide

If you were using an older version with global CSS conflicts:

### Before

```tsx
// Old version had global !important overrides
<WorkflowCanvas className="my-custom-class" {...props} />
// ^ This would conflict with other ReactFlow instances
```

### After

```tsx
// New version uses scoped CSS
<WorkflowCanvas {...props} />
// ^ Works alongside other ReactFlow instances without conflicts
```

**Note:** The `className` prop has been removed as it's not needed with the token system.

## Technical Details

### Removed `className` Prop

The component previously accepted a `className` prop but never used it meaningfully. Since the component uses:

- Token-based theming via `useResponsiveTokens`
- Scoped CSS via `.blend-workflow-canvas`
- Styled-components for dynamic styling

...custom className overrides were not compatible with the design system's approach and have been removed.

### CSS Specificity

The scoped CSS uses natural specificity without `!important`:

```css
/* Specificity: 0-2-0 (2 classes) */
.blend-workflow-canvas .react-flow__node {
}

/* This is higher than ReactFlow's base styles */
.react-flow__node {
} /* Specificity: 0-1-0 */
```

This ensures our styles take precedence while remaining maintainable and predictable.
