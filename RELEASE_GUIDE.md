# 🚀 Release Management Guide

This guide explains how to create releases and manage changelogs for the Blend Design System using our advanced changelog system.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Release Workflow](#release-workflow)
- [Changelog Management](#changelog-management)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🎯 Overview

Our changelog system provides a beautiful, interactive way to document releases with rich content including images, videos, and structured change categories. The system automatically parses markdown files and presents them in a modern timeline interface.

### Key Features

- **Rich Content Support**: Images, videos, code blocks, and formatted text
- **Structured Changes**: Categorized with emojis and color coding
- **Interactive UI**: Search, filter, and expand/collapse functionality
- **Responsive Design**: Works on all devices with dark mode support
- **Real-time Updates**: No build process required for changelog updates

## 🔧 Prerequisites

Before creating a release, ensure you have:

1. **Node.js & pnpm** installed
2. **Git** configured with proper access
3. **Changesets** set up in your project
4. **Development server** running for testing

```bash
# Verify your setup
node --version
pnpm --version
git --version

# Install dependencies if needed
pnpm install
```

## 📦 Release Workflow

### Step 1: Create a Changeset

Start by creating a changeset to track your changes:

```bash
# From the root directory
pnpm changeset
```

This will:

- Prompt you to select which packages have changed
- Ask for the type of change (major/minor/patch)
- Create a markdown file in `.changeset/` with your changes

**Example changeset selection:**

```
🦋  Which packages would you like to include? ...
✔ packages/blend
🦋  Which type of change is this for packages/blend? ...
✔ minor
🦋  What can you tell us about this change? ...
  ✨ Add new DataGrid component with advanced features
  🐛 Fix accessibility issues in Modal component
  🔧 Update design tokens for better consistency
```

### Step 2: Update the CHANGELOG.md File

Edit `packages/blend/CHANGELOG.md` and add a new version entry at the top. Follow this structure:

````markdown
## [1.3.0] - 2024-01-25

### New Feature Release

#### Introducing advanced data visualization and enhanced form components

We're excited to announce version 1.3.0 with powerful new components and significant improvements to existing ones.

![New Components Preview](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop)
_Preview of the new data visualization components_

#### What's New in v1.3.0

**🎨 New Components**

- **DataGrid**: Advanced data grid with sorting, filtering, and inline editing
- **ChartBuilder**: Interactive chart creation tool with multiple chart types
- **FormBuilder**: Drag-and-drop form builder with validation rules
- **NotificationCenter**: Centralized notification management system

**✨ Enhanced Components**

- Button component now supports loading states and progress indicators
- Modal redesigned with better accessibility and keyboard navigation
- Input components enhanced with real-time validation feedback
- Table component now supports virtual scrolling for large datasets

**🐛 Bug Fixes**

- Fixed memory leak in infinite scroll components
- Resolved z-index conflicts in nested modals
- Corrected color contrast issues in dark mode
- Fixed responsive breakpoint behavior in mobile layouts

**🔧 Design Tokens**

- Added new color palette for data visualization
- Introduced spacing tokens for dense layouts
- Enhanced typography scale for better readability
- New shadow system for elevated components

### Breaking Changes

> **Important**: This release contains breaking changes for the Table component.

- Table `onRowClick` prop is now `onRowSelect` for better semantics
- Chart component props restructured for better type safety
- Form validation API updated for better performance

### Migration Guide

```bash
# Update your package
npm install @juspay/blend-design-system@1.3.0

# Run the migration script
npx blend-migrate v1.3.0
```
````

For detailed migration instructions, see our [Migration Guide](https://blend.design/docs/migration/v1.3.0).

---

````

### Step 3: Update Package Version

Update the version in `packages/blend/package.json`:

```json
{
  "name": "@juspay/blend-design-system",
  "version": "1.3.0",
  // ... rest of the file
}
````

### Step 4: Build the Package

Build the blend package to ensure everything compiles correctly:

```bash
# Build the blend package
pnpm build:blend

# Verify the build was successful
ls packages/blend/dist/
```

### Step 5: Test the Changelog

Start the development server to verify your changelog looks correct:

```bash
# Start the ascent app
cd apps/ascent
pnpm run dev

# Visit http://localhost:3000/docs/changelog
# Verify your new entry appears correctly
```

### Step 6: Commit and Push Changes

```bash
# Add all changes
git add .

# Commit with a descriptive message
git commit -m "feat: release v1.3.0 with new data visualization components

- Add DataGrid, ChartBuilder, and FormBuilder components
- Enhance existing components with better accessibility
- Fix critical bugs and improve performance
- Update design tokens for better consistency"

# Push to your repository
git push origin main
```

### Step 7: Create a Release (Optional)

If you're using GitHub:

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.3.0`
4. Title: `v1.3.0 - New Feature Release`
5. Copy the changelog content from your markdown file
6. Publish the release

### Step 8: Publish to npm (if applicable)

```bash
# If you're publishing to npm
cd packages/blend
npm publish
```

## 📝 Changelog Management

### File Structure

The changelog system uses these files:

```
packages/blend/
├── CHANGELOG.md          # Main changelog file
└── package.json          # Package version

apps/ascent/
├── app/
│   ├── docs/
│   │   ├── changelog/
│   │   │   └── page.tsx  # Changelog page component
│   │   └── utils/
│   │       └── changelogUtils.ts  # Utility functions
│   └── components/
│       └── ChangelogViewer.tsx    # Main viewer component
```

### Markdown Format

The changelog parser supports these features:

#### Version Headers

```markdown
## [1.3.0] - 2024-01-25
```

#### Titles and Subtitles

```markdown
### New Feature Release

#### Introducing advanced data visualization
```

#### Images

```markdown
![Component Preview](https://example.com/image.jpg)
_Caption for the image_
```

#### Videos

```markdown
<video controls poster="https://example.com/poster.jpg">
  <source src="/videos/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
*Video caption*
```

#### Structured Changes

```markdown
**🎨 New Components**

- **Component Name**: Description of the component
- **Another Component**: Another description

**🐛 Bug Fixes**

- Fixed issue with component behavior
- Resolved accessibility problem
```

#### Code Blocks

````markdown
```bash
npm install @juspay/blend-design-system@1.3.0
```
````

````

#### Blockquotes
```markdown
> **Important**: This release contains breaking changes.
````

### Change Categories

Use these emojis for consistent categorization:

| Emoji | Category        | Description                             |
| ----- | --------------- | --------------------------------------- |
| 🎨    | New Component   | New components added                    |
| ✨    | Enhancement     | Improvements to existing components     |
| 🐛    | Bug Fix         | Bug fixes and corrections               |
| 💥    | Breaking Change | Breaking changes that require migration |
| 🔒    | Security        | Security-related changes                |
| ⚡    | Performance     | Performance improvements                |
| 📚    | Documentation   | Documentation updates                   |
| 🔧    | Design Tokens   | Design token changes                    |
| 📝    | Changes         | General changes                         |
| 🎭    | UI/UX           | User interface improvements             |
| 🔌    | API             | API changes                             |
| ⚙️    | Infrastructure  | Build and infrastructure changes        |

## 🎨 Advanced Features

### Image Management

#### Supported Formats

- **External URLs**: `https://images.unsplash.com/...`
- **Local images**: `/images/component-preview.jpg`
- **Relative paths**: `../../assets/screenshot.png`

#### Best Practices

- Use high-quality images (800x400px recommended)
- Include descriptive alt text
- Add captions for context
- Optimize images for web (compress if needed)

### Video Integration

#### Supported Formats

- **MP4**: Most compatible format
- **WebM**: Better compression for web
- **Poster images**: Thumbnail for video preview

#### Example

```markdown
<video controls poster="https://example.com/poster.jpg">
  <source src="/videos/component-demo.mp4" type="video/mp4">
  <source src="/videos/component-demo.webm" type="video/webm">
  Your browser does not support the video tag.
</video>
*Watch our 2-minute demo showcasing the new features*
```

### Interactive Elements

The changelog viewer includes:

- **Search functionality**: Find specific releases or content
- **Category filtering**: Filter by change type
- **Expand/collapse**: Show/hide detailed content
- **Responsive design**: Works on all screen sizes
- **Dark mode**: Automatic theme switching

## 🔧 Troubleshooting

### Common Issues

#### Changelog Not Updating

```bash
# Clear Next.js cache
cd apps/ascent
rm -rf .next
pnpm run dev
```

#### Build Errors

```bash
# Rebuild the blend package
pnpm build:blend

# Check for TypeScript errors
pnpm type-check
```

#### Import Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules
pnpm install
```

#### Image Not Loading

- Verify the image URL is accessible
- Check if the image format is supported
- Ensure proper CORS headers if using external images

### Debug Mode

Enable debug logging by adding to your changelog page:

```typescript
// Add this to see parsed data
console.log('Parsed changelog:', changelog)
```

## 📋 Best Practices

### Content Guidelines

1. **Be Descriptive**: Explain what changed and why
2. **Use Consistent Formatting**: Follow the established structure
3. **Include Visual Assets**: Screenshots and demos help users understand changes
4. **Categorize Properly**: Use the correct emoji categories
5. **Provide Migration Guides**: For breaking changes
6. **Keep It Concise**: Focus on user-facing changes

### Version Naming

Follow semantic versioning:

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.1.0 → 1.2.0): New features, backward compatible
- **Patch** (1.1.1 → 1.1.2): Bug fixes, backward compatible

### Release Frequency

- **Major releases**: Quarterly or when breaking changes are needed
- **Minor releases**: Monthly for new features
- **Patch releases**: Weekly for bug fixes

### Quality Checklist

Before publishing:

- [ ] All changes are documented in CHANGELOG.md
- [ ] Version number is updated in package.json
- [ ] Build passes without errors
- [ ] Changelog renders correctly in the UI
- [ ] Images and videos load properly
- [ ] Migration guide is provided for breaking changes
- [ ] Release notes are clear and comprehensive

## 🚀 Automation

### GitHub Actions (Optional)

You can automate parts of the release process:

```yaml
# .github/workflows/release.yml
name: Release

on:
    push:
        tags:
            - 'v*'

jobs:
    release:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: actions/setup-node@v3
              with:
                  node-version: '18'
            - run: pnpm install
            - run: pnpm build:blend
            - run: pnpm test
            - name: Create Release
              uses: actions/create-release@v1
              env:
                  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
              with:
                  tag_name: ${{ github.ref }}
                  release_name: Release ${{ github.ref }}
                  body: |
                      See the [changelog](https://blend.design/docs/changelog) for detailed information.
                  draft: false
                  prerelease: false
```

### Scripts

Add these scripts to your `package.json`:

```json
{
    "scripts": {
        "release:prepare": "pnpm changeset",
        "release:version": "pnpm changeset version",
        "release:publish": "pnpm changeset publish",
        "changelog:preview": "cd apps/ascent && pnpm run dev"
    }
}
```

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review the console for error messages
3. Verify your markdown syntax
4. Test with a simple changelog entry first
5. Open an issue with detailed error information

## 🎉 Conclusion

This changelog system provides a powerful way to document your releases with rich content and beautiful presentation. By following this guide, you'll create professional, informative release notes that help your users understand and adopt new features.

Remember: Good documentation is as important as good code. Take the time to write clear, comprehensive changelog entries that help your users succeed with your design system.
