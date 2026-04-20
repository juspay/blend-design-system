# Documentation System

This folder contains all the MDX documentation files for the project.

## How to Use

1. **Create MDX Files**: Add `.mdx` files to this folder (`app/docs/content/`)
2. **Automatic Routing**: Files are automatically available at `/docs/[filename]`
3. **Custom Components**: Use custom components defined in `mdx-components.tsx`

## Available Routes

- `/docs` - Documentation index page
- `/docs/getting-started` - Getting started guide
- `/docs/components` - Components documentation
- `/docs/advanced` - Advanced features

## Custom Components

### Callout

Use the Callout component to highlight important information:

```mdx
<Callout type="info">This is an informational callout.</Callout>

<Callout type="warning">This is a warning callout.</Callout>

<Callout type="success">This is a success callout.</Callout>

<Callout type="error">This is an error callout.</Callout>
```

## File Naming

- Use kebab-case for filenames (e.g., `getting-started.mdx`)
- The filename becomes the URL slug
- Avoid spaces and special characters

## Adding New Documentation

1. Create a new `.mdx` file in this folder (`app/docs/content/`)
2. Use standard Markdown syntax
3. Add custom components as needed
4. The file will automatically appear in the docs index
