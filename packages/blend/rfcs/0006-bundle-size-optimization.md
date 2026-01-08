# RFC 0006: Bundle Size Optimization

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-08

## Summary

Implement comprehensive bundle size optimization through code splitting, tree shaking, lazy loading, and modern build optimizations to reduce main bundle to <50KB gzipped and ensure fast load times.

## Motivation

### Problem Statement

- Large bundle size (>100KB gzipped)
- No code splitting (all components bundled together)
- No tree shaking (dead code not eliminated)
- No lazy loading (components loaded eagerly)
- Duplicate dependencies
- No bundle analysis or size budgets

### Goals

- Reduce main bundle size to <50KB gzipped
- Implement code splitting for components
- Enable tree shaking for all exports
- Implement lazy loading for heavy components
- Eliminate duplicate dependencies
- Establish bundle size budgets
- Implement bundle analysis in CI/CD

### Non-Goals

- HTTP/2 or HTTP/3 optimization (infrastructure concern)
- CDN optimization (separate RFC)
- Server-side rendering optimization (separate RFC)
- Image optimization (handled separately)

## Proposed Solution

### Key Changes

1. **Bundle Size Budgets**
2. **Code Splitting Strategy**
3. **Tree Shaking Configuration**
4. **Lazy Loading**
5. **CI/CD Integration**

### Bundle Size Budgets

```typescript
export const bundleBudgets = {
    main: {
        maxSize: 50, // KB gzipped
        warning: 40, // KB gzipped
        gzip: true,
    },
    componentChunk: {
        maxSize: 20, // KB gzipped per chunk
        warning: 15, // KB gzipped
        gzip: true,
    },
    vendor: {
        maxSize: 100, // KB gzipped
        warning: 80, // KB gzipped
        gzip: true,
    },
    totalPage: {
        maxSize: 200, // KB gzipped
        warning: 150, // KB gzipped
        gzip: true,
    },
}
```

### Code Splitting Strategy

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
                        if (id.includes('react') || id.includes('react-dom')) {
                            return 'vendor-react'
                        }
                        if (id.includes('@radix-ui')) {
                            return 'vendor-radix'
                        }
                        return 'vendor-other'
                    }
                },
            },
        },
    },
})
```

### Lazy Loading

```typescript
// Route-based splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Settings = lazy(() => import('./pages/Settings'))

// Wrap with Suspense boundary
<Suspense fallback={<LoadingSpinner />}>
    <Dashboard />
</Suspense>

// Feature-based splitting
const RichTextEditor = lazy(() => import('./components/RichTextEditor'))
const DataTable = lazy(() => import('./components/DataTable'))
```

### Tree Shaking Configuration

```typescript
// package.json
{
    "sideEffects": [
        "./lib/**/*.css",
        "./lib/index.ts"
    ]
}

// Named exports (not default)
export { Button } from './Button'
export { ButtonSize } from './types'

// ES Module output
// tsconfig.json
{
    "compilerOptions": {
        "module": "ESNext",
        "moduleResolution": "bundler",
        "target": "ES2020"
    }
}
```

### Dependency Optimization

```typescript
// Externalize peer dependencies
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

// Bundle analyzer
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

### Import Optimization

```typescript
// ❌ BAD: Barrel file causes entire module to load
import { Button, Input, Modal } from '@/components'

// ✅ GOOD: Direct imports enable tree shaking
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
```

### Modern JavaScript Optimization

```typescript
// Target modern browsers
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

### CI/CD Integration

```yaml
# .github/workflows/bundle-check.yml
name: Bundle Size Check
on:
    pull_request:
        paths: ['packages/blend/**']
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

### Monitoring and Reporting

```typescript
// Generate bundle size report
const generateReport = () => {
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
```

## Alternatives Considered

### Option 1: Aggressive Code Splitting

Split every component and utility into its own chunk.

**Why not chosen**: Too many HTTP requests, increased overhead, poor caching. Balanced splitting more effective.

### Option 2: No Code Splitting

Bundle everything together.

**Why not chosen**: Large initial bundle, slow initial load, poor TTI. Modern best practices require code splitting.

### Option 3: Runtime Code Splitting

Split code at runtime using System.import().

**Why not chosen**: Slower initial split, more complex, poor preload opportunities. Build-time splitting faster and more predictable.

## Impact Analysis

### Breaking Changes

**Minimal** - Some components may need wrapping in Suspense, import statements may need updates.

### Backward Compatibility

**Mostly compatible** - Component APIs unchanged, usage patterns mostly same, better performance transparent.

### Performance Impact

**Significant improvement** - Faster initial load, smaller main bundle, better caching, lower bandwidth usage.

### Bundle Size Impact

**Significant reduction** - Main bundle ~50% reduction, overall page ~30% reduction, better tree shaking.

### Migration Effort

**Medium** (~8 weeks) - Configure code splitting, update imports, implement lazy loading, update components.

## Migration Guide

### Phase 1: Configure Code Splitting

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

### Phase 2: Update Imports

```typescript
// Before
import { Button, Input, Modal } from '@/components'

// After
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { Modal } from '@/components/Modal'
```

### Phase 3: Implement Lazy Loading

```typescript
// Before
import { HeavyComponent } from './components/HeavyComponent'

// After
const HeavyComponent = lazy(() => import('./components/HeavyComponent'))
```

## Implementation Plan

**Phase 1: Foundation (Weeks 1-2)**

- Set up bundle budgets
- Configure code splitting
- Install bundle analyzer
- Set up CI/CD checks
- Create monitoring dashboard

**Phase 2: Optimization Implementation (Weeks 3-5)**

- Enable tree shaking
- Optimize imports
- Implement lazy loading
- Optimize CSS
- Optimize dependencies
- Configure compression

**Phase 3: Component Updates (Weeks 6-7)**

- Update heavy components
- Add lazy loading
- Add Suspense boundaries
- Test loading performance
- Update documentation

**Phase 4: Monitoring & Reporting (Week 8)**

- Set up bundle monitoring
- Create size reports
- Set up alerts
- Document metrics
- Create dashboards

## Risks and Mitigations

### Risk 1: Too Many Chunks

**Likelihood**: Medium
**Impact**: Medium
**Mitigation**: Limit component chunks to >20KB, group small components, monitor HTTP request count, use HTTP/2 multiplexing

### Risk 2: Build Complexity

**Likelihood**: Medium
**Impact**: Low
**Mitigation**: Start with simple splitting, use proven tools, document configuration, provide examples

### Risk 3: Broken Imports

**Likelihood**: Low
**Impact**: High
**Mitigation**: Test all imports, use strict type checking, run build verification, monitor in production

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

1. HTTP/2 vs HTTP/3: Optimize specifically for HTTP/3?
2. Server Components: How does this affect React Server Components?
3. Micro-frontends: Support micro-frontend architecture?
4. Legacy browsers: Strategy for older browser support?
5. Monitoring tools: Which monitoring tools to prioritize?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0004](./0004-typography-system.md) - Typography System
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions

## References

- [Rollup Plugins](https://rollupjs.org/plugin/) - Rollup plugin ecosystem
- [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) - Bundle visualization
- [Rollup Plugin Visualizer](https://github.com/btd/rollup-plugin-visualizer) - Visualizer for Rollup
- [Bundlesize](https://github.com/siddharthkp/bundlesize) - Bundle size checker
- [Bundlephobia](https://bundlephobia.com/) - Package size analysis
- [Vite Build Optimization](https://vitejs.dev/guide/build.html) - Vite build guide
- [Rollup Tree Shaking](https://rollupjs.org/tricks/#tree-shaking) - Tree shaking guide
- [Web.dev Bundle Optimization](https://web.dev/fast/) - Performance optimization
- [Core Web Vitals](https://web.dev/vitals/) - Performance metrics
- [Next.js Bundle Optimization](https://nextjs.org/docs/app/building-your-application/optimizing) - Next.js guide
- [React Optimizations](https://react.dev/learn/render-and-commit/optimize-rendering) - React performance

---

**Discussion**: [Link to GitHub issue or discussion]
