# Blog Module

A simplified, focused blog system for the Blend Design System documentation site.

## 📁 Structure

```
blog/
├── [...slug]/          # Dynamic blog post pages
├── content/            # Blog post MDX files
├── utils/              # Blog post utilities
├── config.ts           # Configuration using shared constants
├── types.ts            # Essential TypeScript types
├── utils.ts            # Core utility functions
├── index.ts            # Centralized exports
├── layout.tsx          # Blog layout component (uses shared icons)
├── page.tsx            # Blog listing page
└── README.md           # This documentation
```

## 🔗 Shared Infrastructure

The blog module now uses shared infrastructure for consistency:

- **Icons**: Uses shared icon components from `../components/ui/Icons`
- **Configuration**: Leverages shared constants from `../shared/config`
- **CSS Classes**: Uses shared styling from `../shared/styles`
- **Types**: Extends shared types from `../shared/types`

## 🚀 Quick Start

### Adding a Blog Post

1. Create a new `.mdx` file in the `content/` directory:

```bash
touch apps/ascent/app/blog/content/my-new-post.mdx
```

2. Add frontmatter:

```mdx
---
title: 'My New Blog Post'
description: 'A brief description'
author: 'Your Name'
publishDate: '2024-01-15'
tags: ['react', 'design-system']
category: 'tutorial'
featured: false
---

# My New Blog Post

Your content here...
```

### Using Blog Components

```tsx
import {
    BlogHeader,
    BlogPostGrid,
    getAllBlogPosts,
    formatDate,
} from '@/app/blog'

const posts = getAllBlogPosts()
```

## ⚙️ Configuration

Edit `config.ts` to customize behavior:

```typescript
export const BLOG_CONFIG = {
    maxWidth: 'max-w-6xl',
    containerPadding: 'px-6 py-8',
    featuredPostsLimit: 3,
    // ... other settings
}
```

## 🔧 Core Functions

### Blog Post Operations

```typescript
import { getAllBlogPosts, getBlogPost, getFeaturedBlogPosts } from '@/app/blog'

const allPosts = getAllBlogPosts()
const post = getBlogPost('my-post-slug')
const featured = getFeaturedBlogPosts()
```

### Utilities

```typescript
import {
    validateBlogPostFrontmatter,
    calculateReadingTime,
    formatDate,
    searchPosts,
} from '@/app/blog'

const { isValid, errors } = validateBlogPostFrontmatter(frontmatter)
const readTime = calculateReadingTime(content)
const formattedDate = formatDate('2024-01-15')
const results = searchPosts(posts, 'react')
```

## 📝 Types

```typescript
import type {
    BlogPost,
    BlogPostWithContent,
    BlogPostFrontmatter,
} from '@/app/blog'
```

## 🎨 Styling

CSS classes are defined in `config.ts`:

```typescript
export const CSS_CLASSES = {
    NAV_BUTTON: '...',
    NAV_LINK: '...',
}
```

## 🔍 Best Practices

### Frontmatter Requirements

```yaml
---
title: 'Required - Post title'
description: 'Required - SEO description'
author: 'Required - Author name'
publishDate: 'Required - ISO date string'
category: 'Required - Post category'
tags: ['optional', 'array']
featured: false # Optional boolean
---
```

### File Naming

- Use kebab-case: `my-blog-post.mdx`
- Keep names descriptive and SEO-friendly
- Avoid special characters

### Performance

- Components use React.memo for optimization
- Expensive operations are memoized
- Clean, focused codebase for better performance

## 🛠️ Development

### Adding Features

1. Add types to `types.ts`
2. Add configuration to `config.ts`
3. Implement utilities in `utils.ts`
4. Update exports in `index.ts`

### Testing

```bash
npm run type-check
npm run lint
npm run build
```

---

This simplified blog system focuses on essential functionality while maintaining clean, maintainable code.
