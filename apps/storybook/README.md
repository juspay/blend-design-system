# Blend Design System Storybook

This is the Storybook application for the Blend Design System, showcasing all components, design tokens, and usage examples.

## 🚀 Getting Started

### Development

To run Storybook in development mode:

```bash
# From the root of the monorepo
pnpm storybook:dev

# Or from this directory
pnpm storybook
```

This will start Storybook on `http://localhost:6006`

### Building

To build Storybook for production:

```bash
# From the root of the monorepo
pnpm storybook:build

# Or from this directory
pnpm build-storybook
```

### Preview

To preview the built Storybook:

```bash
# From the root of the monorepo
pnpm storybook:preview

# Or from this directory
pnpm preview-storybook
```

## 📁 Structure

```
apps/storybook/
├── .storybook/          # Storybook configuration
│   ├── main.ts          # Core configuration
│   ├── preview.ts       # Global decorators and parameters
│   └── manager.ts       # UI customization
├── stories/             # Story files
│   ├── components/      # Component stories
│   ├── foundations/     # Design system foundations
│   └── examples/        # Real-world examples
└── public/              # Static assets
```

## 🎨 What's Included

### Components

- All 34 Blend components with comprehensive examples
- Interactive controls for all props
- Multiple story variants (states, sizes, themes)
- Real-world usage examples

### Foundations

- Color palette and tokens
- Typography system
- Spacing and layout
- Design tokens documentation

### Examples

- Dashboard layouts
- Form patterns
- Common UI patterns

## 🔗 Links

- **Documentation**: [Link to your docs site]
- **Component Library**: `packages/blend`
- **Design Tokens**: Documented in foundations stories

## 🛠️ Development

### Adding New Stories

1. Create a new `.stories.tsx` file in the appropriate directory
2. Follow the existing story patterns
3. Use the MCP server to generate component documentation
4. Include comprehensive examples and controls

### Story Templates

We have three main story templates:

- **Simple Components**: Basic components with variants
- **Form Components**: Form-focused with validation examples
- **Complex Components**: Advanced components with multiple scenarios

## 🚀 Deployment

This Storybook is deployed using Firebase Hosting alongside the documentation site.

### Firebase Configuration

The Storybook is configured as a separate Firebase hosting target:

```json
{
  "hosting": [
    {
      "target": "storybook",
      "public": "storybook-static",
      "site": "your-storybook-site"
    }
  ]
}
```

### Deployment Commands

```bash
# Build and deploy
pnpm storybook:build
cd ../docs && pnpm deploy:storybook
```

## 📝 Contributing

1. Follow the existing story patterns
2. Include comprehensive prop controls
3. Add multiple story variants
4. Document usage examples
5. Test across different viewports

## 🎯 Best Practices

- **Comprehensive Coverage**: Include all component states and variants
- **Interactive Controls**: Make all props controllable via Storybook controls
- **Real Examples**: Show components in realistic contexts
- **Documentation**: Include detailed descriptions and usage guidelines
- **Accessibility**: Test and document accessibility features
