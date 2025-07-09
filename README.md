# Blend Design System

A comprehensive design system for Juspay Dashboard that provides a consistent and scalable design language across all products and platforms.

## 🏗️ Monorepo Structure

This is a monorepo built with [Turborepo](https://turbo.build/repo) and [pnpm](https://pnpm.io/) workspaces, containing:

### 📦 Packages

- **`packages/blend`** - Core design system library (`blend-v1`)
  - React components built with Radix UI primitives
  - TypeScript support with full type definitions
  - Styled-components for styling
  - Comprehensive component library including:
    - **Form Components**: Button, ButtonGroup, Inputs, Checkbox, Radio, Switch, Select, MultiSelect, OTPInput, SearchInput, TextArea, NumberInput, UnitInput, DropdownInput, MultiValueInput
    - **Layout Components**: Accordion, Alert, Avatar, AvatarGroup, Breadcrumb, DataTable, Directory, Modal, Popover, Sidebar, Tabs
    - **Display Components**: Charts, StatCard, Tags, SplitTag, Text, Tooltip, GradientBlur
    - **Navigation**: Menu, DateRangePicker
    - **Feedback**: Snackbar

### 🚀 Apps

- **`apps/docs`** - Documentation site built with Next.js and Fumadocs
  - Component documentation and usage examples
  - Deployable to Firebase hosting
  - MDX-based content with interactive examples

- **`apps/storybook`** - Component development and testing environment
  - Interactive component playground
  - Visual testing and documentation
  - Component stories for all design system components

- **`apps/site`** - Demo site showcasing the design system
  - Live examples of all components
  - Built with Vite and React


### 🔧 Shared Configuration

- **`packages/eslint-config`** - Shared ESLint configuration
- **`packages/typescript-config`** - Shared TypeScript configuration
- **`packages/mcp`** - Meta content processing utilities

## 🛠️ Development

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.12.4 or higher)

### Installation

```bash
pnpm install
```

### Available Scripts

```bash
# Development
pnpm dev                    # Start all development servers
pnpm docs:dev              # Start documentation site only

# Building
pnpm build                 # Build all packages and apps
pnpm docs:build           # Build documentation site only

# Storybook
pnpm storybook            # Start Storybook development server
pnpm storybook:build      # Build Storybook for production
pnpm storybook:preview    # Preview built Storybook

# Code Quality
pnpm lint                 # Run linting across all packages
pnpm clean                # Clean all build artifacts

# Deployment
pnpm deploy:staging       # Deploy to staging environment
pnpm deploy:production    # Deploy to production environment
pnpm deploy:setup         # Setup Firebase hosting targets

# Package Management
pnpm changeset            # Create a new changeset
pnpm changeset:version    # Version packages based on changesets
pnpm release              # Build and publish packages
```

## 📚 Documentation

- **Component Documentation**: Visit the docs app for comprehensive component documentation
- **Storybook**: Interactive component playground and testing environment
- **Demo Site**: Live examples of all components in action

## 🎨 Design System Features

- **Accessibility**: Built on Radix UI primitives for excellent accessibility
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Theming**: Flexible theming system with design tokens
- **Responsive**: Mobile-first responsive design
- **Customizable**: Highly customizable components with consistent APIs
- **Performance**: Optimized for performance with tree-shaking support

## 🚀 Getting Started

1. **Install the package**:
   ```bash
   npm install blend-v1
   ```

2. **Import components**:
   ```tsx
   import { Button, Alert, Avatar } from 'blend-v1';
   ```

3. **Use components**:
   ```tsx
   function App() {
     return (
       <div>
         <Button variant={ButtonVariant.Secondary}>Click me</Button>
         <Alert>This is an info message</Alert>
         <Avatar src="/avatar.jpg" alt="User" />
       </div>
     );
   }
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details


