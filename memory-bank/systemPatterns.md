# System Patterns: Storybook Story Structure

## Story File Template Pattern

Based on `Button.stories.tsx`, each story file follows this structure:

### 1. Imports and Setup

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ComponentName, ComponentEnum1, ComponentEnum2 } from "blend-v1";
import { IconNames } from "lucide-react";
```

### 2. Meta Configuration

```typescript
const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName",
  component: ComponentName,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `# ComponentName Component\n\n[Description and features]`,
      },
    },
  },
  argTypes: {
    // Define controls for all props
  },
  tags: ["autodocs"],
};
```

### 3. Required Stories

1. **Default**: Basic usage with default props
2. **Playground**: Interactive controls for all props
3. **Variants**: Different types/sizes/states if applicable
4. **States**: Loading, disabled, error states if applicable
5. **WithIcons**: If component supports icons
6. **Examples**: Real-world usage scenarios

### 4. Story Structure

```typescript
export const StoryName: Story = {
  args: {
    // Default props
  },
  parameters: {
    docs: {
      description: {
        story: "Description of this story variant",
      },
    },
  },
};
```

## Component Analysis Pattern

For each component, extract from MDX documentation:

1. **Props Table**: All available props with types and descriptions
2. **Enum Values**: Available options for select controls
3. **Usage Examples**: Code snippets to adapt for stories
4. **Features**: Key capabilities to showcase in stories

## File Naming Convention

- File: `ComponentName.stories.tsx`
- Location: `apps/storybook/stories/components/` or `apps/storybook/stories/components/ComponentGroup/`
- Title: `'Components/ComponentName'` or `'Components/ComponentGroup/ComponentName'`

## Folder Organization Pattern

- **Related Components**: Group related components in shared folders
- **Example**: Button folder contains Button (v1), ButtonV2, ButtonGroup (v1), ButtonGroupV2
- **Structure**:
  ```
  apps/storybook/stories/components/Button/
  ├── Button.stories.tsx (title: 'Components/Button/Button (v1)')
  ├── ButtonV2.stories.tsx (title: 'Components/Button/ButtonV2')
  ├── ButtonGroup.stories.tsx (title: 'Components/Button/ButtonGroup (v1)')
  └── ButtonGroupV2.stories.tsx (title: 'Components/Button/ButtonGroupV2')
  ```
- **Benefits**: Logical grouping, easy comparison between versions, better navigation

## Control Types Mapping

- `string` → `'text'`
- `boolean` → `'boolean'`
- `enum` → `'select'` with options
- `number` → `'number'`
- `ReactNode` → `'object'` or custom

## Story Naming Conventions

- `Default` - Basic usage
- `Playground` - Interactive controls
- `[ComponentName]Types` - Different variants
- `[ComponentName]Sizes` - Size variations
- `[ComponentName]States` - State variations
- `WithIcons` - Icon examples
- `Loading` - Loading state
- `Disabled` - Disabled state
- `Examples` - Real-world usage
