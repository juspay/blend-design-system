# Ascent - Blend Design System Documentation

> Modern Next.js documentation site with blog, docs, and changelog functionality

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open http://localhost:3000
```

## 📁 Project Structure

```
apps/ascent/
├── app/
│   ├── lib/                    # Shared utilities & configuration
│   │   ├── config/            # App & module configurations
│   │   ├── types/             # TypeScript definitions
│   │   ├── utils/             # Utility functions
│   │   └── styles/            # Shared CSS classes
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Base UI components
│   │   ├── layout/           # Layout components
│   │   ├── features/         # Feature-specific components
│   │   └── mdx/              # MDX components
│   ├── docs/                 # Documentation module
│   ├── blog/                 # Blog module
│   ├── changelog/            # Changelog module
│   └── layout.tsx            # Root layout
├── public/                   # Static assets
├── scripts/                  # Build scripts
└── mdx-components.tsx        # Global MDX components
```

## 🛠️ Development

### Available Scripts

```bash
pnpm dev             # Development server with hot reload
pnpm build           # Production build with static export
pnpm start           # Start production server
pnpm lint            # ESLint with strict rules
pnpm lint:fix        # Auto-fix linting issues
```

### Key Features

- **Static Site Generation** - Optimized for performance
- **MDX Support** - Markdown with React components
- **Search Functionality** - Real-time content search
- **TypeScript** - Full type safety
- **Responsive Design** - Mobile-first approach

## 📝 Adding Content

### Blog Posts

```bash
# Create new blog post
touch app/blog/content/my-post.mdx
```

```mdx
---
title: 'My Blog Post'
description: 'Post description'
author: 'Author Name'
publishDate: '2024-01-15'
category: 'tutorial'
tags: ['react', 'design-system']
featured: false
---

# My Blog Post

Content here...
```

### Documentation

```bash
# Add component documentation
touch app/docs/content/components/my-component.mdx
```

```mdx
---
title: 'My Component'
description: 'Component description'
category: 'components'
---

# My Component

Documentation content...
```

### Changelog Entries

```bash
# Add changelog entry
touch app/changelog/content/v1.0.0.mdx
```

```mdx
---
title: 'Version 1.0.0'
description: 'Release notes'
publishDate: '2024-01-15'
version: '1.0.0'
---

## What's New

- Feature 1
- Feature 2
```

## ⚙️ Configuration

### App Configuration

Edit `app/lib/config/app.ts`:

```typescript
export const APP_CONFIG = {
    name: 'Blend Design System',
    description: 'Modern React component library',
    features: {
        search: true,
        darkMode: true,
        analytics: false,
    },
}
```

### Module Settings

- `app/blog/config.ts` - Blog configuration
- `app/docs/config.ts` - Documentation settings
- `app/changelog/config.ts` - Changelog settings

### Styling

Shared CSS classes in `app/lib/styles/classes.ts`:

```typescript
export const SHARED_NAV_CLASSES = {
    BUTTON: 'p-2 rounded-md text-[var(--muted-foreground)]',
    LINK: 'flex items-center font-semibold',
}
```

## 🚀 Deployment

### Firebase Hosting

The Ascent app is deployed to Firebase Hosting alongside Storybook:

```bash
# Deploy to staging
npm run deploy:dev

# Deploy to production
npm run deploy:prod
```

**Live URLs:**

- **Production**: [https://juspay.design](https://juspay.design)
- **Staging**: [https://blend-staging.web.app](https://blend-staging.web.app)

### Manual Build

```bash
pnpm build  # Generates static files in 'out/' directory
```

### Architecture

- **Firebase Project**: `storybook-452807`
- **Path Routing**: `/` → Ascent docs, `/storybook` → Storybook
- **Static Export**: Next.js static site generation
- **Search Index**: Pre-generated at build time

## 🔍 Search

The site includes automatic search functionality:

- Search index generated during build
- Real-time search across all content
- Keyboard navigation support
- Results from docs, blog, and changelog

## 🧰 Tech Stack

- **Next.js 15** - App Router with static export
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **MDX** - Markdown with React components
- **Lucide React** - Icon system
- **Sugar High** - Syntax highlighting

## 🎯 Best Practices

### Performance

- Use React.memo for expensive components
- Optimize images and assets
- Minimize bundle size

### Content Guidelines

- Use clear, descriptive titles
- Include proper frontmatter
- Add code examples where relevant
- Follow accessibility best practices

### Development

- Follow TypeScript strict mode
- Use shared configurations and styles
- Add comprehensive type definitions
- Test across all modules

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following established patterns
4. Test: `pnpm build` and `pnpm lint`
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 🔗 Links

- **Live Site**: [Blend Design System](https://blend.juspay.in)
- **Storybook**: [Component Library](https://juspay.design/storybook)
- **GitHub**: [Source Code](https://github.com/juspay/blend-design-system)

---

**Built with ❤️ by the Juspay Team**
