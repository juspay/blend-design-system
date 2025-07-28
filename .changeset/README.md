# Changesets for Blend Design System

This repository uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs for the Blend Design System.

## Quick Start

### Creating a Changeset

When you make changes to the design system components, run:

```bash
pnpm changeset
```

This will prompt you to describe your changes and select the appropriate version bump.

### Design System Change Categories

When writing changeset descriptions, use these categories and emojis for consistency:

- **🎨 New Components**: Brand new components added to the design system
- **✨ Component Enhancements**: New props, variants, or functionality for existing components
- **🐛 Bug Fixes**: Component behavior fixes and corrections
- **💥 Breaking Changes**: API changes that require migration (use MAJOR version bump)
- **🔧 Design Tokens**: Updates to colors, spacing, typography, or other design tokens
- **📚 Documentation**: Documentation improvements and updates
- **🔒 Accessibility**: Accessibility improvements and fixes
- **⚡ Performance**: Component optimization and performance improvements

### Example Changeset Descriptions

Good examples:

```
🎨 New Components: Add DataTable component with sorting and filtering capabilities
✨ Component Enhancements: Add `variant` prop to Button component with new "ghost" option
🐛 Bug Fixes: Fix Checkbox focus ring visibility in dark mode
💥 Breaking Changes: Remove deprecated `size` prop from Avatar component, use `scale` instead
🔧 Design Tokens: Update primary color palette to meet WCAG AA contrast requirements
```

### Version Bump Guidelines

- **Major (💥)**: Breaking changes, removed props, changed APIs
- **Minor (✨🎨)**: New components, new props, new features
- **Patch (🐛📚🔒⚡)**: Bug fixes, documentation, accessibility improvements, performance

### Workflow

1. Make your changes to components in `packages/blend/`
2. Run `pnpm changeset` to create a changeset
3. Commit both your changes and the changeset file
4. Create a PR - the changeset will be included in the next release

### Release Process

Releases are automated via GitHub Actions:

1. Changesets creates a "Version Packages" PR
2. When merged, packages are automatically published to npm
3. Documentation site is updated with the new changelog

For more information, see the [Changesets documentation](https://github.com/changesets/changesets).
