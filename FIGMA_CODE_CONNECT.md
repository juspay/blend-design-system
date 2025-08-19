# Figma Code Connect - Complete Guide

## Table of Contents

1. [Current Status](#current-status)
2. [Quick Start](#quick-start)
3. [Overview](#overview)
4. [Monorepo Setup](#monorepo-setup)
5. [Configuration](#configuration)
6. [Adding Code Connect to Components](#adding-code-connect-to-components)
7. [Prop Mapping Guide](#prop-mapping-guide)
8. [Component Examples](#component-examples)
9. [Publishing](#publishing)
10. [Troubleshooting](#troubleshooting)
11. [Best Practices](#best-practices)
12. [Migration Guide](#migration-guide)

## Current Status

### ✅ Setup Complete & Published

- **Configuration**: `figma.config.json` configured with correct include paths
- **Dependencies**: `@figma/code-connect` installed
- **Scripts**: Added to package.json (`figma:validate`, `figma:publish`, `figma:unpublish`)
- **Environment**: `.env` file created with Figma access token
- **Migration**: Updated repository URLs from old to new repo
- **Published**: All Code Connect files successfully published to Figma

### Existing Code Connect Components

1. Button - `apps/storybook/stories/components/Button/Button.figma.tsx`
2. ButtonGroupV2 - `apps/storybook/stories/components/Button/ButtonGroupV2.figma.tsx`
3. Breadcrumb - `apps/storybook/stories/components/Breadcrumb/Breadcrumb.figma.tsx`
4. Tags - `apps/storybook/stories/components/Tags/Tags.figma.tsx`
5. SplitTag - `apps/storybook/stories/components/Tags/SplitTag.figma.tsx`
6. Checkbox - `apps/storybook/stories/components/Checkbox/Checkbox.figma.tsx` ✅
7. Switch - `apps/storybook/stories/components/Switch/Switch.figma.tsx` ✅
8. Radio - `apps/storybook/stories/components/Radio/Radio.figma.tsx` ✅
9. Alert - `apps/storybook/stories/components/Alert/Alert.figma.tsx` ✅
10. Modal - `apps/storybook/stories/components/Modal/Modal.figma.tsx` ✅
11. StatCard - `apps/storybook/stories/components/StatCard/StatCard.figma.tsx` ✅
12. Tabs (TabsTrigger) - `apps/storybook/stories/components/Tabs/Tabs.figma.tsx` ✅
13. Avatar - `apps/storybook/stories/components/Avatar/Avatar.figma.tsx` ✅
14. AvatarGroup - `apps/storybook/stories/components/Avatar/AvatarGroup.figma.tsx` ✅
15. Popover - `apps/storybook/stories/components/Popover/Popover.figma.tsx` ✅
16. Tooltip - `apps/storybook/stories/components/Tooltip/Tooltip.figma.tsx` ✅
17. TextInput - `apps/storybook/stories/components/TextInput/TextInput.figma.tsx` ✅
18. DropdownInput - `apps/storybook/stories/components/TextInput/DropdownInput.figma.tsx` ✅
19. OTPInput - `apps/storybook/stories/components/TextInput/OTPInput.figma.tsx` ✅
20. TextArea - `apps/storybook/stories/components/TextInput/TextArea.figma.tsx` ✅
21. SearchInput - `apps/storybook/stories/components/TextInput/SearchInput.figma.tsx` ✅
22. NumberInput - `apps/storybook/stories/components/TextInput/NumberInput.figma.tsx` ✅
23. UnitInput - `apps/storybook/stories/components/TextInput/UnitInput.figma.tsx` ✅
24. MultiValueInput - `apps/storybook/stories/components/TextInput/MultiValueInput.figma.tsx` ✅
25. DateRangePicker - `apps/storybook/stories/components/DateRangePicker/DateRangePicker.figma.tsx` ✅
26. Charts - `apps/storybook/stories/components/Charts/Charts.figma.tsx` ✅
27. DataTable - `apps/storybook/stories/components/DataTable/DataTable.figma.tsx` ✅
28. Sidebar - `apps/storybook/stories/components/Sidebar/Sidebar.figma.tsx` ✅

## Quick Start

### For New Components

```typescript
import { figma } from '@figma/code-connect'
import { YourComponent } from 'blend-v1'

figma.connect(
  YourComponent,
  'YOUR_FIGMA_URL_HERE', // Right-click component → Copy link
  {
    props: {
      // Map your props here
      text: figma.string('text'),
      variant: figma.enum('variant', {
        'primary': 'primary',
        'secondary': 'secondary'
      }),
      disabled: figma.boolean('disabled'),
      icon: figma.boolean('hasIcon', {
        true: figma.instance('icon'),
        false: undefined
      })
    },
    example: ({ text, variant, disabled, icon }) => (
      <YourComponent
        text={text}
        variant={variant}
        disabled={disabled}
        icon={icon}
      />
    ),
    imports: ["import { YourComponent } from 'blend-v1'"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/YourComponent"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-yourcomponent--docs"
      }
    ]
  }
);
```

### Commands

```bash
# Validate Code Connect files
pnpm figma:validate

# Publish to Figma
pnpm figma:publish

# Remove from Figma
pnpm figma:unpublish
```

## Overview

Figma Code Connect bridges design and development by showing production-ready code snippets in Figma's Dev Mode. When developers inspect components, they see:

- Generated code snippet with correct props
- Import statements
- Links to GitHub and Storybook
- **NOT visible**: Code comments, annotations, or descriptions

## Monorepo Setup

### File Structure

```
blend-design-system/
├── figma.config.json          # Figma Code Connect configuration
├── .env                       # Your Figma access token (git ignored)
├── .env.figma.example         # Template for token
├── package.json               # Contains figma:* scripts
├── apps/
│   └── storybook/
│       └── stories/
│           └── components/    # .figma.tsx files here
└── packages/
    └── blend/
        └── lib/
            └── components/    # Or as separate .figma.tsx files
```

### Initial Setup

1. **Install Dependencies** (Already done)

    ```bash
    pnpm add -D @figma/code-connect -w
    ```

2. **Get Figma Access Token**
    - Go to Figma → Settings → Account → Personal access tokens
    - Create token with scopes: File content (read-only), Code Connect (write)
    - Add to `.env` file

3. **Environment Setup**
    ```bash
    # Copy example file
    cp .env.figma.example .env
    # Add your token to .env
    ```

## Configuration

### figma.config.json

```json
{
    "codeConnect": {
        "include": [
            "apps/storybook/stories/**/*.figma.{ts,tsx}",
            "apps/storybook/stories/**/*.stories.{ts,tsx}",
            "packages/blend/lib/**/*.figma.{ts,tsx}"
        ],
        "exclude": [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "apps/ascent/**",
            "apps/site/**"
        ],
        "parser": "react"
    }
}
```

### Package.json Scripts

```json
{
    "scripts": {
        "figma:validate": "figma connect validate",
        "figma:publish": "figma connect publish",
        "figma:unpublish": "figma connect unpublish"
    }
}
```

## Adding Code Connect to Components

### Location Options

1. **Separate .figma.tsx Files** (Recommended)

    ```
    apps/storybook/stories/components/Button/Button.figma.tsx
    ```

2. **In Storybook Stories**
    ```
    apps/storybook/stories/components/Button/Button.stories.tsx
    ```

### Getting Figma Component URL

1. Open Figma file
2. Select the component (not an instance)
3. Right-click → "Copy link to selection"
4. URL format: `https://www.figma.com/design/FILE_ID/FILE_NAME?node-id=NODE_ID`

## Prop Mapping Guide

### Basic Types

```typescript
// String props
text: figma.string('text'),
placeholder: figma.string('Placeholder'),

// Boolean props
disabled: figma.boolean('disabled'),
loading: figma.boolean('loading'),

// Enum props
size: figma.enum('size', {
  'Small': 'sm',
  'Medium': 'md',
  'Large': 'lg'
}),

// Instance props (for nested components)
leftIcon: figma.instance('Left Icon'),
rightIcon: figma.instance('Right Icon')
```

### Advanced Mappings

```typescript
// Conditional props - map boolean to component
icon: figma.boolean('hasIcon', {
  true: figma.instance('icon'),
  false: undefined
}),

// Map Figma state to multiple props
state: figma.enum('State', {
  'Default': { disabled: false, loading: false },
  'Disabled': { disabled: true, loading: false },
  'Loading': { disabled: false, loading: true }
}),

// Handle Figma-only variants
subType: figma.enum('subType', {
  'default': 'default',
  'iconOnly': 'icon-only',
  // 'plainIcon' exists in Figma but not in code - excluded
})
```

## Component Examples

### Button Component

```typescript
import { figma } from '@figma/code-connect'
import { Button, ButtonType, ButtonSize, ButtonSubType } from 'blend-v1'

figma.connect(
  Button,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=14667-834',
  {
    props: {
      text: figma.string('text'),

      buttonType: figma.enum('buttonType', {
        'primary': ButtonType.PRIMARY,
        'secondary': ButtonType.SECONDARY,
        'danger': ButtonType.DANGER,
        'success': ButtonType.SUCCESS
      }),

      size: figma.enum('size', {
        'sm': ButtonSize.SMALL,
        'md': ButtonSize.MEDIUM,
        'lg': ButtonSize.LARGE
      }),

      disabled: figma.enum('state', {
        'disabled': true,
        'default': false,
        'hover': false,
        'active': false,
        'focussed': false
      }),

      leftIcon: figma.boolean('hasLeftIcon', {
        true: figma.instance('leftIcon'),
        false: undefined
      }),

      rightIcon: figma.boolean('hasRightIcon', {
        true: figma.instance('rightIcon'),
        false: undefined
      })
    },

    example: ({ text, buttonType, size, disabled, leftIcon, rightIcon }) => (
      <Button
        text={text}
        buttonType={buttonType}
        size={size}
        disabled={disabled}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    ),

    imports: ["import { Button } from 'blend-v1'"],

    links: [
      {
        name: "GitHub",
        url: "https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Button"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-button-buttonv2--docs"
      }
    ]
  }
);
```

### Tag Component

```typescript
figma.connect(
  Tag,
  'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=2021-8332',
  {
    props: {
      text: figma.string('text'),

      variant: figma.enum('variant', {
        'subtle': 'subtle',
        'attentive': 'attentive',
        'noFill': 'no-fill'
      }),

      color: figma.enum('color', {
        'neutral': 'neutral',
        'primary': 'primary',
        'success': 'success',
        'error': 'error',
        'warning': 'warning',
        'purple': 'purple'
      }),

      size: figma.enum('size', {
        'xs': 'xs',
        'sm': 'sm',
        'md': 'md',
        'lg': 'lg'
      })
    },

    example: ({ text, variant, color, size }) => (
      <Tag
        text={text}
        variant={variant}
        color={color}
        size={size}
      />
    ),

    imports: ["import { Tag } from 'blend-v1'"],

    links: [
      {
        name: "GitHub",
        url: "https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Tags"
      },
      {
        name: "Storybook",
        url: "https://juspay.design/storybook/?path=/docs/components-tags--docs"
      }
    ]
  }
);
```

## Publishing

### Validate First

Always validate before publishing:

```bash
pnpm figma:validate
```

### Publish to Figma

```bash
pnpm figma:publish
```

### What Happens

1. Validates all Code Connect files
2. Uploads to Figma
3. Shows list of published components with their Figma URLs
4. Components are now visible in Figma Dev Mode

## Troubleshooting

### Common Issues

#### Code Connect Not Showing in Figma

- Ensure you're in Dev Mode
- Refresh the Figma file
- Verify component URL is correct (not an instance)
- Check publish was successful

#### Props Not Mapping

- Property names must match exactly (case-sensitive)
- Check Figma property names in Dev Mode
- Enum values must match Figma variants

#### "No Code Connect files found"

- Check `figma.config.json` includes correct paths
- Ensure files have `.figma.tsx` extension
- Verify files are in included directories

#### Publishing Errors

- Ensure `.env` file exists with valid token
- Token needs correct scopes
- Check network connectivity

### Debugging Tips

1. **Check Figma Properties**

    ```typescript
    example: (props) => {
      console.log('Figma props:', props);
      return <Component {...props} />;
    }
    ```

2. **Validate Individual Files**
    ```bash
    pnpm figma:validate path/to/file.figma.tsx
    ```

## Best Practices

1. **File Organization**
    - Keep `.figma.tsx` files next to component stories
    - Use consistent naming: `ComponentName.figma.tsx`

2. **Prop Mapping**
    - Map all visual properties from Figma
    - Handle Figma-only properties gracefully
    - Document complex mappings with comments

3. **Maintenance**
    - Update Code Connect when components change
    - Keep Figma and code props in sync
    - Validate before every publish

4. **Documentation**
    - Add comments explaining prop differences
    - Document Figma vs code discrepancies
    - Keep this guide updated

## Migration Guide

### Repository Migration

The repository migration has been completed. All Code Connect files now use the new repository URL:

- New: `https://github.com/juspay/blend-design-system`

### Adding to Existing Components

1. Create `.figma.tsx` file next to component
2. Copy template from Quick Start section
3. Update component import and props
4. Get Figma URL for component
5. Map all props
6. Validate and publish

## Known Issues

- **Auto-generated Links**: Manual links may be overridden
- **Links Point to Wrong Paths**: Known Code Connect limitation
- Only generated code, imports, and links visible in Figma (no comments)
- **Snackbar Component**: Not supported due to being a provider component that uses `addSnackbar()` function instead of direct component usage. Causes "Error loading Code Connect" in Figma.

## Resources

- [Figma Code Connect Docs](https://www.figma.com/developers/code-connect)
- [Example: Button.figma.tsx](apps/storybook/stories/components/Button/Button.figma.tsx)
