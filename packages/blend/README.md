# Blend Design System

A comprehensive React component library and design system by Juspay, built with TypeScript and styled-components.

[![npm version](https://badge.fury.io/js/@juspay%2Fblend-design-system.svg)](https://badge.fury.io/js/@juspay%2Fblend-design-system)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **50+ Production-ready Components** - Buttons, Forms, Navigation, Data Display, and more
- **TypeScript Support** - Full type safety and IntelliSense support
- **Accessible by Default** - Built with accessibility best practices using Radix UI primitives
- **Customizable Theming** - Flexible design tokens and theme system
- **Modern React** - Built for React 19+ with hooks and modern patterns
- **Tree Shakeable** - Import only what you need
- **Styled Components** - CSS-in-JS with full theming support

## 📦 Installation

```bash
npm install @juspay/blend-design-system
# or
yarn add @juspay/blend-design-system
# or
pnpm add @juspay/blend-design-system
```

## 🎯 Quick Start

```tsx
import React from 'react'
import { Button, Alert, ThemeProvider } from '@juspay/blend-design-system'
import '@juspay/blend-design-system/style.css'

function App() {
    return (
        <ThemeProvider>
            <div>
                <Alert variant="success">Welcome to Blend Design System!</Alert>
                <Button variant="primary" size="medium">
                    Get Started
                </Button>
            </div>
        </ThemeProvider>
    )
}

export default App
```

## 📚 Components

### Form Components

- **Button** - Primary, secondary, and various button styles
- **ButtonGroup** - Group related buttons together
- **Inputs** - Text, number, textarea, and specialized input components
- **Checkbox** - Accessible checkbox with custom styling
- **Radio** - Radio button groups
- **Switch** - Toggle switches
- **Slider** - Range and value sliders
- **SingleSelect** - Dropdown selection
- **MultiSelect** - Multiple option selection

### Navigation

- **Tabs** - Horizontal and vertical tab navigation
- **Breadcrumb** - Navigation breadcrumbs
- **Menu** - Dropdown and context menus
- **Sidebar** - Collapsible sidebar navigation

### Data Display

- **DataTable** - Feature-rich data tables with sorting, filtering
- **StatCard** - Statistical information cards
- **Charts** - Data visualization components
- **Avatar** - User profile pictures
- **AvatarGroup** - Multiple avatar display
- **Tags** - Label and category tags
- **SplitTag** - Tags with actions

### Feedback

- **Alert** - Success, error, warning, and info alerts
- **Modal** - Dialog and modal windows
- **Tooltip** - Contextual help tooltips
- **Snackbar** - Toast notifications
- **Popover** - Floating content containers

### Layout

- **Accordion** - Collapsible content sections
- **DateRangePicker** - Date range selection

## 🎨 Design Tokens

Blend includes a comprehensive set of design tokens for consistent styling:

```tsx
import { foundationToken } from '@juspay/blend-design-system'

// Colors
foundationToken.colors.primary[500] // #2B7FFF
foundationToken.colors.gray[100] // #F2F4F8

// Typography
foundationToken.fontSize.headingLG // 24px
foundationToken.fontWeight[600] // 600

// Spacing
foundationToken.spacing[16] // 16px
foundationToken.borderRadius[8] // 8px
```

## 🔧 Theming

Customize the design system to match your brand:

```tsx
import { ThemeProvider, createTheme } from '@juspay/blend-design-system'

const customTheme = createTheme({
    colors: {
        primary: {
            500: '#your-brand-color',
        },
    },
})

function App() {
    return <ThemeProvider theme={customTheme}>{/* Your app */}</ThemeProvider>
}
```

## 📖 Documentation

- **[Component Documentation](https://blend.juspay.design/)** - Complete component API and examples
- **[Storybook](https://blend.juspay.design/storybook/)** - Interactive component playground
- **[Design Guidelines](https://blend.juspay.design/guidelines)** - Design principles and usage guidelines

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/juspay/blend-design-system.git

# Install dependencies
pnpm install

# Start development
pnpm dev

# Build the library
pnpm build

# Run tests
pnpm test
```

## 📝 Contributing

We welcome contributions! Please see our [Contributing Guide](https://github.com/juspay/blend-design-system/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT © [Juspay Technologies](https://juspay.in)

## 🔗 Links

- **Homepage**: [https://blend.juspay.design/](https://blend.juspay.design/)
- **Repository**: [https://github.com/juspay/blend-design-system](https://github.com/juspay/blend-design-system)
- **Issues**: [https://github.com/juspay/blend-design-system/issues](https://github.com/juspay/blend-design-system/issues)
- **Storybook**: [https://blend.juspay.design/storybook/](https://blend.juspay.design/storybook/)

---

Built with ❤️ by the Juspay Design Team
