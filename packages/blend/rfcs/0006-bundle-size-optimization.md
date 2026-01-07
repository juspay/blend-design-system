# RFC 0006: Bundle Size Optimization

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-07

## Summary

This RFC establishes a comprehensive bundle size optimization strategy for the Blend Design System. Following 2024-2025 industry best practices, it defines techniques for minimizing bundle size through code splitting, tree shaking, lazy loading, and modern build optimizations to ensure fast load times and excellent performance.

## Motivation

### Problem Statement

Current bundle implementation has several performance issues:

1. **Large Bundle Size**: Main bundle is too large (>100KB gzipped)
2. **No Code Splitting**: All components bundled together
3. **No Tree Shaking**: Dead code not eliminated
4. **No Lazy Loading**: Components loaded eagerly
5. **Duplicate Dependencies**: Same libraries bundled multiple times
6. **No Bundle Analysis**: No visibility into what's in the bundle
7. **No Size Limits**: No enforced bundle size budgets
8. **Poor Loading Strategy**: Non-critical code blocking rendering

### Goals

- Reduce main bundle size to <50KB gzipped
- Implement code splitting for components
- Enable tree shaking for all exports
- Implement lazy loading for heavy components
- Eliminate duplicate dependencies
- Establish bundle size budgets
- Implement bundle analysis in CI/CD
- Optimize loading strategy for fast initial paint

### Non-Goals

- This RFC does NOT cover HTTP/2 or HTTP/3 optimization (infrastructure concern)
- This RFC does NOT include CDN optimization (separate RFC)
- This RFC does NOT cover server-side rendering optimization (separate RFC)
- This RFC does NOT include image optimization (handled separately)

## Proposed Solution

### 1. Bundle Size Budgets

Define strict size budgets for different bundle types:

```typescript
// budgets/bundle-sizes.ts
export const bundleBudgets = {
    // Main bundle - critical for initial render
    main: {
        maxSize: 50, // KB gzipped
        warning: 40, // KB gzipped
        gzip: true,
    },

    // Component chunks - loaded on demand
    componentChunk: {
        maxSize: 20, // KB gzipped per chunk
        warning: 15, // KB gzipped
        gzip: true,
    },

    // Vendor chunks - third-party libraries
    vendor: {
        maxSize: 100, // KB gzipped
        warning: 80, // KB gzipped
        gzip: true,
    },

    // Total page bundle - everything loaded on a page
    totalPage: {
        maxSize: 200, // KB gzipped
        warning: 150, // KB gzipped
        gzip: true,
    },
}
```

### 2. Code Splitting Strategy

#### Component-Level Splitting

```typescript
// vite.config.ts
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // Split each component into its own chunk
                    if (id.includes('/components/')) {
                        const componentName =
                            id.match(/components\/([^/]+)/)?.[1]
                        return `component-${componentName}`
                    }

                    // Vendor chunks
                    if (id.includes('node_modules')) {
                        // React and related
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react'
                        }

                        // Radix UI
                        if (id.includes('@radix-ui')) {
                            return 'vendor-radix'
                        }

                        // Other dependencies
                        return 'vendor-other'
                    }
                },
            },
        },
    },
})
```

#### Route-Based Splitting

```typescript
// Use React.lazy for route-based splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))
const Reports = lazy(() => import('./pages/Reports'))

// Wrap with Suspense boundary
<Suspense fallback={<LoadingSpinner />}>
    <Dashboard />
</Suspense>
```

#### Feature-Based Splitting

```typescript
// Split heavy features into separate bundles
const RichTextEditor = lazy(() => import('./components/RichTextEditor'))
const DatePicker = lazy(() => import('./components/DatePicker'))
const DataTable = lazy(() => import('./components/DataTable'))
```

### 3. Tree Shaking Configuration

#### Side Effects Configuration

```typescript
// package.json
{
    "sideEffects": [
        "./lib/**/*.css",
        "./lib/index.ts"
    ]
}
```

#### Named Exports

```typescript
// lib/components/Button/index.ts
// Use named exports instead of default for better tree shaking
export { Button } from './Button'
export { ButtonSize, ButtonType } from './types'
export { buttonStyles } from './styles'

// NOT: export default Button
```

#### ES Module Output

```typescript
// tsconfig.json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "bundler",
        "target": "ES2020"
    }
}
```

### 4. Dependency Optimization

#### Externalizing Dependencies

```typescript
// vite.config.ts
export default defineConfig({
    build: {
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
})
```

#### Bundle Analyzer

```typescript
// vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
    plugins: [
        visualizer({
            filename: 'dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
})
```

#### Duplicate Dependency Detection

```typescript
// scripts/check-duplicates.ts
import { execSync } from 'child_process'

const checkDuplicates = () => {
    try {
        execSync('npm ls', { stdio: 'inherit' })
        console.log('\nRun "npm dedupe" to remove duplicates')
    } catch (error) {
        console.error('Error checking dependencies:', error)
    }
}

checkDuplicates()
```

### 5. Import Optimization

#### Barrel File Optimization

```typescript
// Avoid barrel files that cause large bundle chunks
// Instead, use direct imports

// ❌ BAD: Barrel file causes entire module to load
import { Button, Input, Modal } from '@/components'

// ✅ GOOD: Direct imports enable tree shaking
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
```

#### Dynamic Imports

```typescript
// Load heavy components dynamically
const HeavyComponent = dynamic(
    () => import('./components/HeavyComponent'),
    {
        loading: () => <Skeleton />,
        ssr: false, // Disable SSR for client-only components
    }
)
```

### 6. CSS Optimization

#### CSS Modules with PurgeCSS

```typescript
// vite.config.ts
export default defineConfig({
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
})
```

#### Critical CSS Extraction

```typescript
// Extract critical CSS for initial render
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name]-[hash][extname]',
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js',
            },
        },
    },
})
```

#### Unused CSS Removal

```typescript
// Use purgecss to remove unused CSS
import PurgeCSS from '@fullhuman/postcss-purgecss'
import postcss from 'postcss'

export default {
    plugins: [
        PurgeCSS({
            content: ['./lib/**/*.tsx', './apps/**/*.{tsx,jsx}'],
            defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
            safelist: {
                standard: [/^:/],
                deep: [/^active/, /^aria-/, /^data-/],
            },
        }),
    ],
}
```

### 7. Modern JavaScript Optimization

#### Target Modern Browsers

```typescript
// vite.config.ts
export default defineConfig({
    build: {
        target: 'es2020',
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info'],
            },
        },
    },
})
```

#### Polyfill Strategy

```typescript
// Use modern APIs and polyfill only when needed
// Don't include polyfills for modern browsers

// vite.config.ts
export default defineConfig({
    build: {
        polyfillDynamicImport: false,
        rollupOptions: {
            output: {
                format: 'es',
            },
        },
    },
})
```

### 8. Asset Optimization

#### Image Optimization

```typescript
// Use modern image formats
import { defineConfig } from 'vite'

export default defineConfig({
    assetsInclude: ['**/*.webp', '**/*.avif'],
})
```

#### Font Optimization

```typescript
// Subset fonts and use WOFF2
// lib/tokens/fonts.ts
export const fonts = {
    primary: {
        woff2: '/fonts/Inter-Regular-subset.woff2',
        subset: 'latin',
        display: 'swap',
    },
}
```

### 9. CI/CD Integration

#### Bundle Size Checks

```yaml
# .github/workflows/bundle-check.yml
name: Bundle Size Check

on:
    pull_request:
        paths:
            - 'packages/blend/**'

jobs:
    bundle-check:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
            - run: npm ci
            - run: npm run build
            - name: Check bundle sizes
              run: npm run check-bundle-sizes
            - name: Upload bundle stats
              uses: actions/upload-artifact@v4
              with:
                  name: bundle-stats
                  path: dist/stats.html
```

#### Bundle Budget Enforcement

```typescript
// vite.config.ts
export default defineConfig({
    build: {
        rollupOptions: {
            onwarn(warning, warn) {
                // Ignore certain warnings
                if (warning.code === 'MODULE_NOT_FOUND') return

                // Fail build on budget violations
                if (warning.code === 'BUNDLE_SIZE_EXCEEDED') {
                    throw new Error(warning.message)
                }
            },
        },
    },
})
```

### 10. Monitoring and Reporting

#### Bundle Size Dashboard

```typescript
// scripts/report-bundle-sizes.ts
import { readFileSync } from 'fs'
import { join } from 'path'

interface BundleStats {
    name: string
    size: number
    gzipped: number
    chunk: string
}

const generateReport = () => {
    const statsPath = join(process.cwd(), 'dist/stats.html')
    const stats = readFileSync(statsPath, 'utf-8')

    // Parse stats and generate report
    const bundles: BundleStats[] = parseBundleStats(stats)

    console.table(
        bundles.map((b) => ({
            Name: b.name,
            Size: `${(b.size / 1024).toFixed(2)} KB`,
            Gzipped: `${(b.gzipped / 1024).toFixed(2)} KB`,
        }))
    )

    // Check against budgets
    bundles.forEach((bundle) => {
        const budget = getBudgetForBundle(bundle.name)
        if (bundle.gzipped > budget.maxSize * 1024) {
            console.error(`❌ ${bundle.name} exceeds budget`)
        }
    })
}

generateReport()
```

#### Bundle Size Alerts

```typescript
// scripts/alert-on-size.ts
export const alertOnBundleSize = (
    bundleName: string,
    actualSize: number,
    budget: number
): void => {
    const percentageOver = ((actualSize - budget) / budget) * 100

    if (actualSize > budget) {
        console.error(`
🚨 Bundle Size Alert: ${bundleName}
   Budget: ${(budget / 1024).toFixed(2)} KB
   Actual: ${(actualSize / 1024).toFixed(2)} KB
   Over: ${percentageOver.toFixed(1)}%
        `)

        // Fail CI in serious violations
        if (percentageOver > 20) {
            process.exit(1)
        }
    }
}
```

## Alternatives Considered

### Option 1: Aggressive Code Splitting

**Description**: Split every component and utility into its own chunk.

**Pros**:

- Maximum code splitting
- Very small individual chunks

**Cons**:

- Too many HTTP requests
- Increased overhead
- Poor caching

**Why not chosen**: Too much overhead outweighs benefits. Balanced splitting is more effective.

### Option 2: No Code Splitting

**Description**: Bundle everything together.

**Pros**:

- Simplest implementation
- Fewest requests
- Good caching

**Cons**:

- Large initial bundle
- Slow initial load
- Poor TTI

**Why not chosen**: Modern best practices require code splitting for performance.

### Option 3: Runtime Code Splitting

**Description**: Split code at runtime using System.import().

**Pros**:

- Dynamic based on user behavior
- Very flexible

**Cons**:

- Slower initial split
- More complex
- Poor preload opportunities

**Why not chosen**: Build-time splitting is faster and more predictable.

## Impact Analysis

### Breaking Changes

**Minimal breaking changes**:

- Some components may need wrapping in Suspense
- Import statements may need updates
- Build configuration changes

### Backward Compatibility

**Mostly compatible**:

- Component APIs unchanged
- Usage patterns mostly same
- Better performance transparent

### Performance Impact

**Significant improvement**:

- Faster initial load
- Smaller main bundle
- Better caching
- Lower bandwidth usage

### Bundle Size Impact

**Significant reduction**:

- Main bundle: ~50% reduction
- Overall page: ~30% reduction
- Better tree shaking

### Developer Experience

**Mixed impact**:

- More configuration complexity
- Better performance visibility
- Clearer size budgets
- Better debugging tools

## Migration Guide

### Phase 1: Configure Code Splitting (Week 1)

```typescript
// vite.config.ts
export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (id.includes('/components/')) {
                        const componentName =
                            id.match(/components\/([^/]+)/)?.[1]
                        return `component-${componentName}`
                    }
                },
            },
        },
    },
})
```

### Phase 2: Update Imports (Week 2-3)

```typescript
// Before
import { Button, Input, Modal } from '@/components'

// After
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
```

### Phase 3: Implement Lazy Loading (Week 4)

```typescript
// Before
import { HeavyComponent } from './components/HeavyComponent'

// After
const HeavyComponent = lazy(() => import('./components/HeavyComponent'))
```

## Implementation Plan

### Phase 1: Foundation (Week 1-2)

**Tasks**:

- [x] Create RFC and get team approval
- [ ] Set up bundle budgets
- [ ] Configure code splitting
- [ ] Install bundle analyzer
- [ ] Set up CI/CD checks
- [ ] Create monitoring dashboard

**Deliverables**:

- Bundle budgets
- Code splitting config
- CI/CD integration

### Phase 2: Optimization Implementation (Week 3-5)

**Tasks**:

- [ ] Enable tree shaking
- [ ] Optimize imports
- [ ] Implement lazy loading
- [ ] Optimize CSS
- [ ] Optimize dependencies
- [ ] Configure compression

**Deliverables**:

- Optimized builds
- Lazy loading components
- Optimized CSS

### Phase 3: Component Updates (Week 6-7)

**Tasks**:

- [ ] Update heavy components
- [ ] Add lazy loading
- [ ] Add Suspense boundaries
- [ ] Test loading performance
- [ ] Update documentation

**Deliverables**:

- Updated components
- Improved load times

### Phase 4: Monitoring & Reporting (Week 8)

**Tasks**:

- [ ] Set up bundle monitoring
- [ ] Create size reports
- [ ] Set up alerts
- [ ] Document metrics
- [ ] Create dashboards

**Deliverables**:

- Monitoring system
- Reports and alerts
- Documentation

## Risks and Mitigations

### Risk 1: Too Many Chunks

**Likelihood**: Medium

**Impact**: Medium

**Mitigation**:

- Limit component chunks to >20KB
- Group small components together
- Monitor HTTP request count
- Use HTTP/2 multiplexing

### Risk 2: Build Complexity

**Likelihood**: Medium

**Impact**: Low

**Mitigation**:

- Start with simple splitting
- Use proven tools
- Document configuration
- Provide examples

### Risk 3: Broken Imports

**Likelihood**: Low

**Impact**: High

**Mitigation**:

- Test all imports
- Use strict type checking
- Run build verification
- Monitor in production

### Risk 4: Performance Regression

**Likelihood**: Low

**Impact**: High

**Mitigation**:

- Set up performance monitoring
- Track Core Web Vitals
- Set up alerts
- Rollback capability

## Success Metrics

- [ ] Main bundle < 50KB gzipped
- [ ] Component chunks < 20KB gzipped
- [ ] Total page bundle < 200KB gzipped
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Zero bundle budget violations in CI

## Unresolved Questions

1. **HTTP/2 vs HTTP/3**: Should we optimize specifically for HTTP/3?

2. **Server Components**: How does this affect React Server Components?

3. **Micro-frontends**: Should we support micro-frontend architecture?

4. **Legacy Browsers**: What's our strategy for older browser support?

5. **Monitoring Tools**: Which monitoring tools should we prioritize?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0004](./0004-typography-system.md) - Typography System
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions

## References

### Bundle Optimization Tools

- [Rollup Plugins](https://rollupjs.org/plugin/) - Rollup plugin ecosystem
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) - Bundle visualization
- [Rollup Plugin Visualizer](https://github.com/btd/rollup-plugin-visualizer) - Visualizer for Rollup
- [Bundlesize](https://github.com/siddharthkp/bundlesize) - Bundle size checker
- [Bundlephobia](https://bundlephobia.com/) - Package size analysis

### Modern Best Practices (2024-2025)

- [Vite Build Optimization](https://vitejs.dev/guide/build.html) - Vite build guide
- [Rollup Tree Shaking](https://rollupjs.org/tricks/#tree-shaking) - Tree shaking guide
- [Web.dev Bundle Optimization](https://web.dev/fast/) - Performance optimization
- [Core Web Vitals](https://web.dev/vitals/) - Performance metrics

### Industry Examples

- [Next.js Bundle Optimization](https://nextjs.org/docs/app/building-your-application/optimizing) - Next.js guide
- [React Optimizations](https://react.dev/learn/render-and-commit/optimize-rendering) - React performance
- [MUI Bundle Size](https://mui.com/material-ui/guides/minimizing-bundle-size/) - MUI optimization
- [Ant Design Bundle Size](https://ant.design/docs/react/getting-started#optimize-build) - Ant Design guide
- [Radix UI Bundle Size](https://www.radix-ui.com/docs/primitives/overview/performance) - Radix performance

### Performance Metrics

- [Core Web Vitals](https://web.dev/vitals/) - Performance metrics
- [Lighthouse Performance](https://developers.google.com/web/tools/lighthouse/) - Performance audit
- [PageSpeed Insights](https://pagespeed.web.dev/) - Page analysis
- [WebPageTest](https://www.webpagetest.org/) - Advanced testing

### Learning Resources

- [Web Performance Optimization](https://web.dev/performance/) - Web.dev guide
- [Bundle Size Optimization](https://web.dev/fast/#reduce-javascript-execution-time) - JS optimization
- [Code Splitting Guide](https://web.dev/fast/#code-splitting) - Code splitting patterns

---

**Discussion**: [Link to GitHub issue or discussion]
