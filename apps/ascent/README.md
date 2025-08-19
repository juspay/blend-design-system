# Ascent - Blend Design System Documentation

A modern, optimized Next.js documentation site for the Blend Design System, featuring comprehensive component documentation, blog, and changelog functionality.

## 🚀 **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation site.

## 🏗️ **Architecture Overview**

### **Optimized Structure**

Ascent follows a modern, scalable architecture with centralized shared infrastructure:

```
apps/ascent/
├── app/                          # Next.js App Router
│   ├── lib/                      # 🆕 Centralized shared library
│   │   ├── config/              # App & module configurations
│   │   ├── styles/              # Shared CSS classes
│   │   ├── types/               # TypeScript definitions
│   │   └── index.ts             # Main exports
│   ├── components/              # Reusable UI components
│   │   ├── ui/                  # Base UI components
│   │   ├── layout/              # Layout components
│   │   └── features/            # Feature-specific components
│   ├── blog/                    # Blog module
│   ├── docs/                    # Documentation module
│   ├── changelog/               # Changelog module
│   └── layout.tsx               # Root layout with centralized config
├── src/lib/                     # Legacy utilities (being migrated)
├── public/                      # Static assets
└── scripts/                     # Build scripts
```

### **Key Optimizations**

✅ **Single Source of Truth**: All configuration centralized in `app/lib/config/`  
✅ **Enhanced TypeScript**: Comprehensive path aliases and type safety  
✅ **Consistent Styling**: Shared CSS classes across all modules  
✅ **Clean Imports**: Barrel exports for better developer experience  
✅ **Performance**: Optimized builds with reduced duplication

## 📚 **Modules**

### **Documentation (`/docs`)**

- Component documentation with live previews
- Interactive examples and code snippets
- Comprehensive API documentation
- Search functionality

### **Blog (`/blog`)**

- Technical articles and tutorials
- Design system insights
- Featured posts and categories
- MDX-powered content

### **Changelog (`/changelog`)**

- Version history and release notes
- Breaking changes documentation
- Component updates tracking
- Semantic versioning

## 🛠️ **Development**

### **Project Structure**

#### **Centralized Configuration**

```typescript
// app/lib/config/app.ts - App-level configuration
export const APP_CONFIG = {
    name: 'Blend Design System',
    description: '...',
    features: { search: true, darkMode: true },
    // ... comprehensive app settings
}

// app/lib/config/modules.ts - Module configurations
export const SHARED_ROUTES = { DOCS: '/docs', BLOG: '/blog' }
export const SHARED_EXTERNAL_URLS = { GITHUB: '...', STORYBOOK: '...' }
```

#### **Shared Styling**

```typescript
// app/lib/styles/classes.ts - Consistent CSS classes
export const SHARED_NAV_CLASSES = {
    BUTTON: 'p-2 rounded-md text-[var(--muted-foreground)] ...',
    LINK: 'flex items-center font-semibold ...',
}
```

#### **Type Safety**

```typescript
// app/lib/types/common.ts - Comprehensive types
export interface BaseMetadata {
    title: string
    description: string
}
export interface NavigationItem {
    label: string
    href: string
}
```

### **Enhanced Import Paths**

```typescript
// Clean, organized imports
import { APP_CONFIG, SHARED_ROUTES } from '@/lib/config'
import { SHARED_NAV_CLASSES } from '@/lib/styles'
import { BaseMetadata } from '@/lib/types'
import { SearchBar } from '@/components'
```

### **Available Scripts**

```bash
npm run dev          # Development server with hot reload
npm run build        # Production build with optimization
npm run start        # Start production server
npm run lint         # ESLint with strict rules
npm run lint:fix     # Auto-fix linting issues
```

### **Adding New Content**

#### **Blog Posts**

```bash
# Create new blog post
touch app/blog/content/my-new-post.mdx
```

```mdx
---
title: 'My New Blog Post'
description: 'Post description'
author: 'Author Name'
publishDate: '2024-01-15'
category: 'tutorial'
tags: ['react', 'design-system']
featured: false
---

# My New Blog Post

Content here...
```

#### **Documentation**

```bash
# Add component documentation
touch app/docs/content/components/my-component.mdx
```

#### **Changelog Entries**

```bash
# Add changelog entry
touch app/changelog/content/v1.0.0.mdx
```

## 🎨 **Customization**

### **App Configuration**

Modify `app/lib/config/app.ts` to customize:

- App name, description, and metadata
- Feature flags (search, analytics, dark mode)
- UI configuration (navbar, sidebar, icons)
- Performance settings

### **Styling**

Update `app/lib/styles/classes.ts` to modify:

- Navigation styling
- Layout patterns
- Content presentation
- Card components

### **Module Settings**

Each module has its own config file:

- `app/blog/config.ts` - Blog-specific settings
- `app/docs/config.ts` - Documentation settings
- `app/changelog/config.ts` - Changelog settings

## 🔧 **Technical Details**

### **Built With**

- **Next.js 15** - App Router with static export
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **MDX** - Markdown with React components
- **Lucide React** - Icon system
- **Sugar High** - Syntax highlighting

### **Performance Features**

- Static site generation (SSG)
- Optimized bundle splitting
- Image optimization
- Font optimization with Geist
- Search index pre-generation

### **Developer Experience**

- Hot reload development
- TypeScript path aliases
- ESLint with strict rules
- Comprehensive error handling
- Auto-generated search index

## 📖 **Documentation Standards**

### **File Naming**

- Use kebab-case: `my-component.mdx`
- Descriptive names: `button-group-usage.mdx`
- Avoid special characters

### **Frontmatter Requirements**

```yaml
---
title: 'Required - Clear, descriptive title'
description: 'Required - SEO-friendly description'
author: 'Required - Author name'
publishDate: 'Required - ISO date (YYYY-MM-DD)'
category: 'Required - Content category'
tags: ['optional', 'array', 'of', 'tags']
featured: false # Optional boolean
---
```

### **Content Guidelines**

- Use clear, concise language
- Include code examples
- Add interactive previews where possible
- Follow accessibility best practices

## 🚀 **Deployment**

### **Static Export**

The site is configured for static export:

```bash
npm run build  # Generates static files in 'out/' directory
```

### **Vercel Deployment**

```bash
# Deploy to Vercel
vercel --prod
```

### **Custom Deployment**

Serve the `out/` directory with any static hosting provider.

## 🔍 **Search Functionality**

The site includes a powerful search system:

- Pre-generated search index
- Real-time search across all content
- Keyboard navigation support
- Category filtering

Search index is automatically generated during build from all MDX content.

## 🎯 **Best Practices**

### **Performance**

- Use React.memo for expensive components
- Implement proper loading states
- Optimize images and assets
- Minimize bundle size

### **Accessibility**

- Semantic HTML structure
- Proper ARIA labels
- Keyboard navigation support
- Color contrast compliance

### **SEO**

- Comprehensive metadata
- Open Graph tags
- Twitter Card support
- Structured data

## 🤝 **Contributing**

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the established patterns
4. **Test thoroughly**: `npm run build` and `npm run lint`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### **Development Guidelines**

- Follow the established architecture patterns
- Use shared configurations and styles
- Add comprehensive TypeScript types
- Include proper documentation
- Test across all modules

## 📄 **License**

This project is part of the Blend Design System by Juspay.

## 🔗 **Links**

- **Live Site**: [Blend Design System](https://blend.juspay.in)
- **Storybook**: [Component Library](https://juspay.design/storybook)
- **GitHub**: [Source Code](https://github.com/juspay/blend-design-system)
- **Juspay**: [Company Website](https://juspay.in)

---

**Built with ❤️ by the Juspay Team**
