# Storybook Story Writing Guide for Blend Design System

This document provides comprehensive guidelines for creating Storybook stories in the Blend Design System. Follow these patterns to ensure consistency across all component stories.

## Table of Contents

1. [File Structure & Naming](#file-structure--naming)
2. [Imports](#imports)
3. [Meta Configuration](#meta-configuration)
4. [Documentation Standards](#documentation-standards)
5. [ArgTypes Configuration](#argtypes-configuration)
6. [Stories Structure](#stories-structure)
7. [Accessibility Requirements](#accessibility-requirements)
8. [Testing Configuration](#testing-configuration)

---

## File Structure & Naming

### Location

- Place stories in `apps/storybook/stories/[category]/[Component]/[Component].stories.tsx`
- Category can be `components` or `foundations`

### Naming Convention

- Filename: `Component.stories.tsx` (PascalCase)
- Group multiple related component stories (e.g., `ButtonGroup.stories.tsx` alongside `Button.stories.tsx`)

---

## Imports

### Standard Import Order

```typescript
// 1. React and Storybook types
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

// 2. Component imports from design system
import { ComponentName, Enum1, Enum2 } from '@juspay/blend-design-system'

// 3. Icon imports (if needed)
import { IconName1, IconName2 } from 'lucide-react'

// 4. Internal utilities (always use these)
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
```

---

## Meta Configuration

### Basic Template

```typescript
const meta: Meta<typeof ComponentName> = {
    title: 'Components/[Category]/[ComponentName]',
    component: ComponentName,
    parameters: {
        // Layout: 'centered' for single components, 'padded' for inputs/forms, 'fullscreen' for modals/drawers
        layout: 'centered',

        // Always include a11y configuration
        a11y: getA11yConfig('interactive'), // or 'form', 'navigation', 'content'

        // Always include chromatic config
        chromatic: CHROMATIC_CONFIG,

        // Short subtitle shown below the title in docs
        docsSubtitle: 'Brief description of what this component does.',

        // Full documentation
        docs: {
            description: {
                component: `
## Usage
\`\`\`tsx
import { ComponentName, EnumName } from '@juspay/blend-design-system';

<ComponentName
  prop1="value"
  prop2={EnumName.VALUE}
/>
\`\`\`

## Features
- Feature one
- Feature two
- Feature three

## Accessibility
**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (list specific keys)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (list specific ones)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected)
- **jest-axe**: Run \`pnpm test ComponentName.accessibility\`
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA
                `,
            },
        },
    },
    argTypes: {
        // See ArgTypes Configuration section
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ComponentName>
```

### Title Patterns

- `'Components/Button/Button'` - Single component
- `'Components/Inputs/TextInput'` - Inputs grouped under Inputs
- `'Components/Data Display/Table'` - Data display components
- `'Foundations/Design Tokens'` - Foundation stories

---

## Documentation Standards

### Required Sections

Every component story must include:

1. **Usage**: Basic import and code example
2. **Features**: Bullet list of key capabilities
3. **Accessibility**: WCAG compliance status and specific features
4. **Verification**: How to test accessibility

### Optional Sections (for complex components)

5. **Variants**: Describe different visual variants
6. **Design Guidelines**: When to use different variants
7. **Technical Specifications**: Props interface details
8. **Use Cases**: Real-world application examples

### Accessibility Documentation Template

```markdown
## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant

- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (role, aria-label, aria-labelledby, etc.)
- Focus indicators visible on all interactive elements
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial (X out of Y applicable criteria)

- ✅ **Compliant**: List compliant criteria
- ❌ **Non-Compliant**: List non-compliant criteria with reasons
- ⚠️ **Application-Dependent**: Criteria that depend on usage
- ℹ️ **Not Applicable**: Criteria that don't apply

**Verification:**

- **Storybook a11y addon**: Check Accessibility panel (0 violations expected)
- **jest-axe**: Run `pnpm test ComponentName.accessibility`
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA
```

---

## ArgTypes Configuration

### Control Types

```typescript
argTypes: {
    // String/text props
    title: {
        control: { type: 'text' },
        description: 'Description of the prop',
        table: {
            type: { summary: 'string' },
            category: 'Content', // Group props by category
        },
    },

    // Enum/select props
    size: {
        control: { type: 'select' },
        options: Object.values(EnumName), // Use Object.values for enums
        description: 'Description of the prop',
        table: {
            type: { summary: 'EnumName' },
            defaultValue: { summary: 'EnumName.DEFAULT' },
            category: 'Appearance',
        },
    },

    // Boolean props
    disabled: {
        control: { type: 'boolean' },
        description: 'Description of the prop',
        table: {
            type: { summary: 'boolean' },
            defaultValue: { summary: 'false' },
            category: 'State',
        },
    },

    // Number props
    maxWidth: {
        control: { type: 'number' },
        description: 'Description of the prop',
    },

    // Object props
    config: {
        control: { type: 'object' },
        description: 'Description of the prop',
        table: {
            type: {
                summary: 'ConfigType',
                detail: `{\n  prop1: string;\n  prop2: number;\n}`,
            },
            category: 'Configuration',
        },
    },

    // ReactNode props (disable control)
    icon: {
        control: false, // Disable control for ReactNode
        description: 'Description of the prop. Pass a React element.',
        table: {
            type: { summary: 'React.ReactNode' },
            category: 'Content',
        },
    },

    // Conditional argTypes (show only when condition met)
    alignment: {
        control: { type: 'select' },
        options: ['left', 'center', 'right'],
        description: 'Only applies to specific variant',
        if: { arg: 'variant', eq: 'specific' }, // Show only when variant is 'specific'
    },

    // Actions
    onClick: {
        action: 'clicked',
        description: 'Click handler function',
    },
}
```

### Common Categories

- **Core**: Essential props (value, onChange)
- **Content**: Text content (label, placeholder, children)
- **Appearance**: Visual styling (size, color, variant)
- **State**: Component states (disabled, loading, error)
- **Validation**: Form validation (required, errorMessage)
- **Events**: Callback handlers (onClick, onChange, onBlur)
- **Slots**: Content slots for complex components
- **Actions**: Action configurations (primaryAction, secondaryAction)

---

## Stories Structure

### Default Story

Every component must have a Default story with full control support:

```typescript
export const Default: Story = {
    args: {
        // Default values for all props
        prop1: 'default value',
        prop2: EnumName.DEFAULT,
        disabled: false,
    },
    render: (args) => {
        // Optional: Transform args if needed
        const { iconName, ...restArgs } = args
        return <ComponentName {...restArgs} icon={getIcon(iconName)} />
    },
    parameters: {
        docs: {
            description: {
                story: 'Description of what this story demonstrates.',
            },
        },
    },
}
```

### Interactive Stories

For components with state, wrap in a component with useState:

```typescript
export const InteractiveExample: Story = {
    render: () => {
        const [state, setState] = useState(initialValue)

        return (
            <ComponentName
                value={state}
                onChange={(newValue) => setState(newValue)}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive example with state management.',
            },
        },
    },
}
```

### Variant Stories

Show all variants of a component:

```typescript
export const Variants: Story = {
    render: () => (
        <div className="flex gap-4">
            <ComponentName variant={Variant.PRIMARY} />
            <ComponentName variant={Variant.SECONDARY} />
            <ComponentName variant={Variant.DANGER} />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All available variants of the component.',
            },
        },
    },
}
```

### State Stories

Show different states (loading, disabled, error):

```typescript
export const States: Story = {
    render: () => (
        <div className="flex flex-col gap-4">
            <ComponentName text="Normal" />
            <ComponentName text="Loading" loading />
            <ComponentName text="Disabled" disabled />
        </div>
    ),
}
```

---

## Accessibility Requirements

### Always Include

1. **Import a11y config**:

    ```typescript
    import {
        getA11yConfig,
        CHROMATIC_CONFIG,
    } from '../../../.storybook/a11y.config'
    ```

2. **Apply a11y config in meta.parameters**:

    ```typescript
    parameters: {
        a11y: getA11yConfig('interactive'), // Choose appropriate type
        chromatic: CHROMATIC_CONFIG,
    }
    ```

3. **Choose the right a11y config type**:
    - `'interactive'` - Buttons, clickable elements
    - `'form'` - Inputs, checkboxes, radio buttons
    - `'navigation'` - Menus, tabs, breadcrumbs
    - `'content'` - Cards, alerts, modals (non-interactive content)
    - `'iconOnly'` - Icon-only buttons

### Story-Level A11y Overrides

For specific stories that need different a11y rules:

```typescript
export const SpecificStory: Story = {
    parameters: {
        a11y: {
            config: {
                rules: [
                    { id: 'button-name', enabled: true },
                    { id: 'color-contrast', enabled: false }, // Override for this story
                ],
            },
        },
    },
}
```

---

## Testing Configuration

### Chromatic Visual Regression

Always include chromatic config in meta:

```typescript
parameters: {
    chromatic: CHROMATIC_CONFIG, // Uses viewports: [375, 768, 1200]
}
```

For stories that shouldn't be snapshotted:

```typescript
export const NoSnapshotStory: Story = {
    parameters: {
        chromatic: { disableSnapshot: true },
    },
}
```

### Skeleton Loading States

Include skeleton state demonstrations for components that support them:

```typescript
export const SkeletonState: Story = {
    render: () => (
        <div className="flex flex-col gap-8 p-6">
            <div>
                <h4>Pulse Variant</h4>
                <ComponentName showSkeleton skeletonVariant="pulse" />
            </div>
            <div>
                <h4>Wave Variant</h4>
                <ComponentName showSkeleton skeletonVariant="wave" />
            </div>
        </div>
    ),
    parameters: {
        a11y: getA11yConfig('content'),
    },
}
```

---

## Common Patterns

### Helper Functions

Use helper functions for icon mapping:

```typescript
// At the top of the file, after imports
const getIcon = (iconType: string): React.ReactNode => {
    switch (iconType) {
        case 'plus': return <Plus size={16} />
        case 'download': return <Download size={16} />
        case 'none':
        default: return null
    }
}

// In argTypes
leadingIcon: {
    control: 'select',
    options: ['none', 'plus', 'download'],
    description: 'Icon to display',
}

// In render function
render: (args) => {
    const { leadingIcon, ...rest } = args
    return <ComponentName {...rest} leadingIcon={getIcon(leadingIcon)} />
}
```

### Controlled Component Pattern

For form components that need state:

```typescript
export const Controlled: Story = {
    render: function ControlledComponent(args) {
        const [value, setValue] = useState('')

        return (
            <ComponentName
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
}
```

### Multiple State Management

For stories with multiple related state values:

```typescript
export const MultipleStates: Story = {
    render: () => {
        const [states, setStates] = useState({
            field1: '',
            field2: '',
            field3: false,
        })

        const updateState = (key: string, value: any) => {
            setStates(prev => ({ ...prev, [key]: value }))
        }

        return (
            <>
                <Input
                    value={states.field1}
                    onChange={(e) => updateState('field1', e.target.value)}
                />
                <Checkbox
                    checked={states.field3}
                    onCheckedChange={(checked) => updateState('field3', checked)}
                />
            </>
        )
    },
}
```

---

## Complex Components Example

For complex components (like Card, Modal, Alert), include:

1. **Component description** in docs.description.component
2. **All variants** explained
3. **Use case examples** showing real-world usage
4. **Props interface** documentation

See existing stories like:

- `Card.stories.tsx` for slot-based components
- `Modal.stories.tsx` for overlay components
- `Alert.stories.tsx` for message components

---

## Quick Reference Checklist

Before submitting a story, verify:

- [ ] File follows naming convention: `Component.stories.tsx`
- [ ] All imports are correct and ordered properly
- [ ] Meta configuration includes:
    - [ ] Appropriate `title` with category
    - [ ] `layout` setting (centered/padded/fullscreen)
    - [ ] `a11y: getA11yConfig('appropriate-type')`
    - [ ] `chromatic: CHROMATIC_CONFIG`
    - [ ] `docsSubtitle` for brief description
    - [ ] Full docs.description.component with Usage, Features, Accessibility
- [ ] `tags: ['autodocs']` is set
- [ ] All props have argTypes defined with:
    - [ ] Correct control type
    - [ ] Description
    - [ ] Table type info
    - [ ] Appropriate category
- [ ] Default story exists with full control support
- [ ] Additional stories cover:
    - [ ] Variants
    - [ ] States (loading, disabled, error)
    - [ ] Different sizes
    - [ ] Skeleton states (if applicable)
- [ ] Story-level parameters include descriptions
- [ ] Accessibility documentation is comprehensive

---

## Current Components Reference

### Components (ignore V2 variants)

- Accordion, Alert, Avatar, Breadcrumb, Button, Card, Charts, Checkbox, CodeBlock
- DataTable, DateRangePicker, Drawer, DropdownInput, KeyValuePair, Menu, Modal
- MultiSelect, MultiValueInput, NumberInput, OTPInput, Popover, ProgressBar
- Radio, SearchInput, Sidebar, SingleSelect, Snackbar, StatCard, Stepper, Switch
- Tabs, Tags (SplitTag, Tags), TextArea, TextInput, Timeline, Tooltip, UnitInput, Upload

### Foundations

- Design Tokens, ThemeProvider

Refer to existing stories for patterns and examples.
