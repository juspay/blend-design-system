# RFC 0005: Design Token Naming Conventions

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-07

## Summary

This RFC establishes comprehensive naming conventions for design tokens in the Blend Design System. Following the Design Tokens Community Group (DTCG) specification and 2024-2025 industry standards, it defines a clear, consistent, and scalable naming structure that improves maintainability, enables tooling support, and ensures tokens are easy to discover and use.

## Motivation

### Problem Statement

Current token naming has several issues:

1. **Inconsistent Naming**: Tokens use different naming patterns (camelCase, kebab-case, PascalCase)
2. **No Structure**: Tokens lack hierarchical organization
3. **Poor Discoverability**: Hard to find related tokens
4. **Tooling Limitations**: Cannot leverage design token tools effectively
5. **No Standard Compliance**: Not following DTCG specification
6. **Semantic Gaps**: Mix of semantic and primitive tokens without clear distinction
7. **No Versioning Strategy**: Token updates may break consumers
8. **Poor Documentation**: Token intent and usage not documented

### Goals

- Establish a consistent naming convention following DTCG specification
- Create a clear token hierarchy and structure
- Enable tooling support for token management
- Improve token discoverability and maintainability
- Define semantic vs primitive token separation
- Establish token versioning strategy
- Provide clear documentation for all tokens
- Support multi-theme token management

### Non-Goals

- This RFC does NOT define specific token values (handled in design system foundation)
- This RFC does NOT cover token transformation formats (JSON, CSS, etc.)
- This RFC does NOT include token validation schemas
- This RFC does NOT cover token migration from existing systems

## Proposed Solution

### 1. Naming Convention Structure

Following DTCG specification with category-group-item-modifier pattern:

```
{category}/{group}/{item}[/{modifier}][/{state}]
```

#### Token Categories

```typescript
export type TokenCategory =
    | 'color' // Colors (background, text, border, etc.)
    | 'spacing' // Spacing (padding, margin, gap, etc.)
    | 'typography' // Typography (font size, weight, line height, etc.)
    | 'border' // Borders (width, radius, style)
    | 'shadow' // Shadows/elevation
    | 'radius' // Border radius
    | 'opacity' // Opacity values
    | 'transition' // Transitions and animations
    | 'z-index' // Z-index values
    | 'sizing' // Width, height, min/max values
    | 'breakpoint' // Responsive breakpoints
    | 'duration' // Time durations
    | 'motion' // Motion/animation tokens
```

### 2. Token Naming Examples

#### Color Tokens

```typescript
// Structure: color/{group}/{item}[/{modifier}][/{state}]

export const colorTokens = {
    // Brand colors
    'color/brand/primary': '#0066CC',
    'color/brand/primary-hover': '#0052A3',
    'color/brand/primary-active': '#003D7A',
    'color/brand/secondary': '#6B7280',

    // Semantic colors
    'color/surface/background': '#FFFFFF',
    'color/surface/background-alt': '#F9FAFB',
    'color/surface/background-elevated': '#FFFFFF',

    'color/text/primary': '#111827',
    'color/text/secondary': '#6B7280',
    'color/text/tertiary': '#9CA3AF',
    'color/text/disabled': '#D1D5DB',

    'color/text/on-primary': '#FFFFFF',
    'color/text/on-secondary': '#FFFFFF',

    'color/border/default': '#E5E7EB',
    'color/border/strong': '#D1D5DB',
    'color/border/focus': '#3B82F6',

    // Status colors
    'color/status/success': '#10B981',
    'color/status/success-bg': '#D1FAE5',
    'color/status/success-border': '#34D399',

    'color/status/error': '#EF4444',
    'color/status/error-bg': '#FEE2E2',
    'color/status/error-border': '#F87171',

    'color/status/warning': '#F59E0B',
    'color/status/warning-bg': '#FEF3C7',
    'color/status/warning-border': '#FBBF24',

    'color/status/info': '#3B82F6',
    'color/status/info-bg': '#DBEAFE',
    'color/status/info-border': '#60A5FA',
}
```

#### Spacing Tokens

```typescript
// Structure: spacing/{type}/{scale}

export const spacingTokens = {
    // Padding
    'spacing/padding/0': '0px',
    'spacing/padding/1': '4px',
    'spacing/padding/2': '8px',
    'spacing/padding/3': '12px',
    'spacing/padding/4': '16px',
    'spacing/padding/5': '20px',
    'spacing/padding/6': '24px',
    'spacing/padding/8': '32px',
    'spacing/padding/10': '40px',
    'spacing/padding/12': '48px',
    'spacing/padding/16': '64px',
    'spacing/padding/20': '80px',
    'spacing/padding/24': '96px',

    // Margin (reuses padding scale)
    'spacing/margin/0': '0px',
    'spacing/margin/1': '4px',
    'spacing/margin/2': '8px',
    'spacing/margin/3': '12px',
    'spacing/margin/4': '16px',

    // Gap
    'spacing/gap/0': '0px',
    'spacing/gap/1': '4px',
    'spacing/gap/2': '8px',
    'spacing/gap/3': '12px',
    'spacing/gap/4': '16px',

    // Semantic spacing
    'spacing/content/s': '16px',
    'spacing/content/m': '24px',
    'spacing/content/l': '32px',
    'spacing/content/xl': '48px',

    'spacing/component/s': '8px',
    'spacing/component/m': '16px',
    'spacing/component/l': '24px',
}
```

#### Typography Tokens

```typescript
// Structure: typography/{type}/{family|size|weight|line-height|letter-spacing}

export const typographyTokens = {
    // Font families
    'typography/font-family/base':
        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    'typography/font-family/mono': 'Fira Code, Consolas, monospace',

    // Font sizes (using scale)
    'typography/font-size/caption': '0.75rem',
    'typography/font-size/body-small': '0.875rem',
    'typography/font-size/body': '1rem',
    'typography/font-size/body-large': '1.125rem',
    'typography/font-size/h6': '1.25rem',
    'typography/font-size/h5': '1.5rem',
    'typography/font-size/h4': '2.125rem',
    'typography/font-size/h3': '2.625rem',
    'typography/font-size/h2': '3rem',
    'typography/font-size/h1': '3.75rem',
    'typography/font-size/display': '6rem',

    // Font weights
    'typography/font-weight/regular': '400',
    'typography/font-weight/medium': '500',
    'typography/font-weight/semibold': '600',
    'typography/font-weight/bold': '700',

    // Line heights
    'typography/line-height/tight': '1.1',
    'typography/line-height/snug': '1.25',
    'typography/line-height/normal': '1.5',
    'typography/line-height/relaxed': '1.75',
    'typography/line-height/loose': '2',

    // Letter spacing
    'typography/letter-spacing/tighter': '-0.05em',
    'typography/letter-spacing/tight': '-0.025em',
    'typography/letter-spacing/normal': '0em',
    'typography/letter-spacing/wide': '0.025em',
    'typography/letter-spacing/wider': '0.05em',
}
```

#### Border Tokens

```typescript
// Structure: border/{type}/{width}

export const borderTokens = {
    // Widths
    'border/width/0': '0px',
    'border/width/1': '1px',
    'border/width/2': '2px',
    'border/width/3': '3px',
    'border/width/4': '4px',

    // Radius
    'border/radius/0': '0px',
    'border/radius/1': '2px',
    'border/radius/2': '4px',
    'border/radius/3': '6px',
    'border/radius/4': '8px',
    'border/radius/6': '12px',
    'border/radius/8': '16px',
    'border/radius/12': '24px',
    'border/radius/16': '32px',
    'border/radius/20': '40px',
    'border/radius/full': '9999px',

    // Styles
    'border/style/solid': 'solid',
    'border/style/dashed': 'dashed',
    'border/style/dotted': 'dotted',
}
```

#### Shadow Tokens

```typescript
// Structure: shadow/{level}

export const shadowTokens = {
    'shadow/1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow/2':
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    'shadow/3':
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'shadow/4':
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    'shadow/5':
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',

    // Colored shadows
    'shadow/colored-primary': '0 4px 6px -1px rgba(0, 102, 204, 0.2)',
    'shadow/colored-success': '0 4px 6px -1px rgba(16, 185, 129, 0.2)',
    'shadow/colored-error': '0 4px 6px -1px rgba(239, 68, 68, 0.2)',
}
```

### 3. Token Type Definitions

```typescript
// tokens/types.ts

// Color token types
export type ColorToken =
    | `color/brand/${string}`
    | `color/surface/${string}`
    | `color/text/${string}`
    | `color/border/${string}`
    | `color/status/${string}`

// Spacing token types
export type SpacingToken =
    | `spacing/padding/${number}`
    | `spacing/margin/${number}`
    | `spacing/gap/${number}`
    | `spacing/${string}/${'s' | 'm' | 'l' | 'xl'}`

// Typography token types
export type TypographyToken =
    | `typography/font-family/${string}`
    | `typography/font-size/${string}`
    | `typography/font-weight/${string}`
    | `typography/line-height/${string}`
    | `typography/letter-spacing/${string}`

// Border token types
export type BorderToken =
    | `border/width/${number}`
    | `border/radius/${number | 'full'}`
    | `border/style/${string}`

// Shadow token types
export type ShadowToken = `shadow/${number | string}`

// All token types
export type DesignToken =
    | ColorToken
    | SpacingToken
    | TypographyToken
    | BorderToken
    | ShadowToken
    | `opacity/${string}`
    | `z-index/${string}`
    | `breakpoint/${string}`
    | `duration/${string}`
    | `motion/${string}`
```

### 4. Token Usage in Components

```typescript
// components/Button/Button.tsx
import { tokens } from '@/tokens'

export const Button = ({ variant = 'primary', size = 'medium' }) => {
    return (
        <button
            style={{
                // Use tokens instead of magic numbers
                backgroundColor: tokens[`color/brand/${variant}`],
                color: tokens[`color/text/on-${variant}`],
                padding: tokens[`spacing/padding/${size === 'medium' ? 3 : 2}`],
                borderRadius: tokens['border/radius/4'],
                fontSize: tokens['typography/font-size/body'],
                fontWeight: tokens['typography/font-weight/medium'],
                boxShadow: tokens['shadow/2'],
            }}
        >
            {children}
        </button>
    )
}
```

### 5. Theme-Specific Tokens

```typescript
// tokens/themes/light.ts
export const lightTheme = {
    'color/surface/background': '#FFFFFF',
    'color/surface/background-alt': '#F9FAFB',
    'color/text/primary': '#111827',
    'color/text/secondary': '#6B7280',
    'color/border/default': '#E5E7EB',
}

// tokens/themes/dark.ts
export const darkTheme = {
    'color/surface/background': '#111827',
    'color/surface/background-alt': '#1F2937',
    'color/text/primary': '#F9FAFB',
    'color/text/secondary': '#D1D5DB',
    'color/border/default': '#374151',
}

// tokens/themes/contrast.ts
export const highContrastTheme = {
    'color/surface/background': '#000000',
    'color/surface/background-alt': '#000000',
    'color/text/primary': '#FFFFFF',
    'color/text/secondary': '#FFFFFF',
    'color/border/default': '#FFFFFF',
}
```

### 6. Token Aliases

```typescript
// Create aliases for commonly used combinations
export const tokenAliases = {
    // Component-specific
    'button/primary-bg': 'color/brand/primary',
    'button/primary-text': 'color/text/on-primary',
    'button/primary-hover': 'color/brand/primary-hover',

    // Layout-specific
    'card/background': 'color/surface/background',
    'card/shadow': 'shadow/3',
    'card/radius': 'border/radius/4',

    // Typography-specific
    'heading/h1': {
        fontSize: 'typography/font-size/h1',
        fontWeight: 'typography/font-weight/semibold',
        lineHeight: 'typography/line-height/tight',
        letterSpacing: 'typography/letter-spacing/tight',
    },
}
```

### 7. Token Versioning

```typescript
// tokens/version.ts
export const tokenVersion = {
    major: 1,
    minor: 0,
    patch: 0,
    get full(): string {
        return `${this.major}.${this.minor}.${this.patch}`
    },
}

// Token change types
export type TokenChangeType =
    | 'add' // New token added
    | 'update' // Token value changed
    | 'remove' // Token removed
    | 'rename' // Token name changed
    | 'deprecate' // Token deprecated but not removed
```

### 8. Token Documentation

Each token must include documentation:

```typescript
// tokens/color/brand.ts
/**
 * Brand Colors
 *
 * Primary brand color for the Blend Design System.
 * Used for primary actions, links, and brand elements.
 *
 * @category color
 * @group brand
 * @usage Primary buttons, links, brand elements
 * @accessibility Meets WCAG 2.2 AA contrast requirements
 * @dark-mode-adjustment Lighten by 10% for dark backgrounds
 */
export const brandPrimary: ColorToken = 'color/brand/primary'
export const brandPrimaryHover: ColorToken = 'color/brand/primary-hover'
export const brandPrimaryActive: ColorToken = 'color/brand/primary-active'
```

### 9. Token Validation

```typescript
// tokens/validation.ts
export const validateToken = (name: string, value: any): boolean => {
    // Check naming convention
    const pattern = /^[a-z]+\/[a-z]+\/[a-z0-9-]+(\/[a-z0-9-]+)*$/
    if (!pattern.test(name)) {
        console.warn(`Invalid token name: ${name}`)
        return false
    }

    // Check value type based on category
    const category = name.split('/')[0]
    if (category === 'color' && !isValidColor(value)) {
        console.warn(`Invalid color value for token: ${name}`)
        return false
    }

    return true
}

export const isValidColor = (value: string): boolean => {
    return (
        /^#[0-9A-Fa-f]{6}$/.test(value) ||
        /^#[0-9A-Fa-f]{8}$/.test(value) ||
        /^rgba?\(.+\)$/.test(value) ||
        /^(hsl|hsla)\(.+\)$/.test(value)
    )
}
```

### 10. Token Export Formats

```typescript
// tokens/exports.ts
export const exportTokens = (format: 'css' | 'scss' | 'json' | 'ts') => {
    const tokens = getAllTokens()

    switch (format) {
        case 'css':
            return exportAsCSS(tokens)
        case 'scss':
            return exportAsSCSS(tokens)
        case 'json':
            return exportAsJSON(tokens)
        case 'ts':
            return exportAsTypeScript(tokens)
    }
}

const exportAsCSS = (tokens: Record<string, any>): string => {
    return Object.entries(tokens)
        .map(([name, value]) => {
            const cssVar = `--${name.replace(/\//g, '-')}`
            return `${cssVar}: ${value};`
        })
        .join('\n')
}
```

## Alternatives Considered

### Option 1: Flat Naming Convention

**Description**: Use flat names like `primary-color`, `spacing-md`, etc.

**Pros**:

- Simpler to write
- Shorter names
- No slashes

**Cons**:

- No hierarchy
- Hard to organize
- Poor discoverability
- No tooling support

**Why not chosen**: Hierarchical naming provides better organization and tooling support. It's the industry standard in 2024-2025.

### Option 2. camelCase Token Names

**Description**: Use camelCase like `colorBrandPrimary`, `spacingPadding4`.

**Pros**:

- Familiar to JavaScript developers
- No special characters

**Cons**:

- Harder to read
- No clear separation
- Poor tooling support
- Not DTCG compliant

**Why not chosen**: Kebab-case with slashes is more readable, follows DTCG spec, and has better tooling support.

### Option 3. Category Prefixes Only

**Description**: Use simple prefixes like `c-brand-primary`, `s-padding-4`.

**Pros**:

- Short names
- Clear category

**Cons**:

- No structure within categories
- Limited scalability
- Poor discoverability

**Why not chosen**: Full hierarchical naming provides better organization and scalability for a growing design system.

## Impact Analysis

### Breaking Changes

**High breaking changes**:

- All token names will change
- All components need updates
- Consumer applications need updates
- CSS variables will change

### Backward Compatibility

**Not compatible**:

- Complete breaking change
- Requires migration
- No automatic mapping possible

### Performance Impact

**Negligible**:

- Token lookup is fast
- No runtime overhead
- CSS variables are efficient

### Bundle Size Impact

**No change**:

- Token names are not included in production bundle
- Same number of tokens

### Developer Experience

**Significantly improved**:

- Clear token organization
- Better discoverability
- Tooling support
- Easier maintenance

## Migration Guide

### Phase 1: Update Token Definitions (Week 1)

```typescript
// Before
const colors = {
    primary: '#0066CC',
    primaryHover: '#0052A3',
    background: '#FFFFFF',
}

// After
const colorTokens = {
    'color/brand/primary': '#0066CC',
    'color/brand/primary-hover': '#0052A3',
    'color/surface/background': '#FFFFFF',
}
```

### Phase 2: Update Components (Week 2-4)

```typescript
// Before
const Button = styled.button`
    background: ${colors.primary};
    color: ${colors.white};
    padding: 16px;
`

// After
const Button = styled.button`
    background: ${tokens['color/brand/primary']};
    color: ${tokens['color/text/on-primary']};
    padding: ${tokens['spacing/padding/4']};
`
```

### Phase 3: Update CSS Variables (Week 5)

```css
/* Before */
:root {
    --primary-color: #0066cc;
    --spacing-md: 16px;
}

/* After */
:root {
    --color-brand-primary: #0066cc;
    --spacing-padding-4: 16px;
}
```

## Implementation Plan

### Phase 1: Foundation (Week 1-2)

**Tasks**:

- [x] Create RFC and get team approval
- [ ] Define naming convention
- [ ] Create token type definitions
- [ ] Set up token structure
- [ ] Create token validation utilities
- [ ] Set up token export formats

**Deliverables**:

- Naming convention specification
- Token type definitions
- Validation utilities

### Phase 2: Token Migration (Week 3-6)

**Tasks**:

- [ ] Migrate all color tokens
- [ ] Migrate all spacing tokens
- [ ] Migrate all typography tokens
- [ ] Migrate all border tokens
- [ ] Migrate all shadow tokens
- [ ] Create theme-specific tokens

**Deliverables**:

- All tokens migrated
- Theme support

### Phase 3: Component Updates (Week 7-10)

**Tasks**:

- [ ] Update all components to use new tokens
- [ ] Update CSS variables
- [ ] Update Storybook stories
- [ ] Update documentation
- [ ] Test all components

**Deliverables**:

- Updated components
- Updated documentation

### Phase 4: Tooling & Documentation (Week 11-12)

**Tasks**:

- [ ] Create token explorer tool
- [ ] Generate token documentation
- [ ] Create migration guide
- [ ] Create token usage guidelines
- [ ] Train team on new system

**Deliverables**:

- Token explorer
- Documentation
- Training materials

## Risks and Mitigations

### Risk 1: Massive Breaking Change

**Likelihood**: High

**Impact**: High

**Mitigation**:

- Provide comprehensive migration guide
- Create migration tools/scripts
- Support both old and new tokens temporarily
- Coordinate with all consumers

### Risk 2: Team Adoption

**Likelihood**: Medium

**Impact**: High

**Mitigation**:

- Extensive training
- Code examples
- Migration assistance
- Gradual rollout
- Pair programming

### Risk 3: Tooling Limitations

**Likelihood**: Low

**Impact**: Medium

**Mitigation**:

- Build custom tooling if needed
- Leverage DTCG tooling
- Use Style Dictionary
- Create token explorer

### Risk 4: Performance Degradation

**Likelihood**: Low

**Impact**: Low

**Mitigation**:

- Use CSS variables
- Optimize token lookup
- Profile performance
- Cache token values

## Success Metrics

- [ ] 100% of tokens follow new naming convention
- [ ] All components updated
- [ ] Token explorer built
- [ ] Migration guide completed
- [ ] Team trained on new system
- [ ] Documentation complete
- [ ] Token validation automated

## Unresolved Questions

1. **Token Versioning**: How do we handle token versioning across major versions?

2. **Deprecation Strategy**: What's the process for deprecating old tokens?

3. **Custom Tokens**: Should consumers be able to define custom tokens?

4. **Token Groups**: Should we allow custom token groups beyond the defined categories?

5. **Tooling Priority**: Which token tooling features should we prioritize?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0004](./0004-typography-system.md) - Typography System
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle Size Optimization

## References

### DTCG Specification

- [Design Tokens Community Group](https://design-tokens.github.io/community-group/) - DTCG home
- [DTCG Format](https://tr.designtokens.org/format/) - Token format specification
- [DTCG Naming](https://tr.designtokens.org/naming/) - Naming conventions

### Design Token Tools

- [Style Dictionary](https://amzn.github.io/style-dictionary/) - Token transformation tool
- [Theo](https://github.com/marcuswestin/theo) - Token management
- [Diez](https://diez.design/) - Token platform
- [Figma Tokens](https://help.figma.com/hc/en-us/articles/15024740706337-Design-tokens-in-Figma) - Figma integration
- [Tokens Studio](https://tokens.studio/) - Token management tool

### Industry Examples

- [Salesforce Lightning Tokens](https://www.lightningdesignsystem.com/design-tokens/) - Salesforce system
- [Atlassian Design Tokens](https://atlassian.design/foundations/design-tokens/) - Atlassian system
- [IBM Carbon Tokens](https://carbondesignsystem.com/design-tokens/overview/) - IBM system
- [Polaris Design Tokens](https://polaris.shopify.com/design/tokens/) - Shopify system

### Modern Practices (2024-2025)

- [Radix UI Tokens](https://www.radix-ui.com/docs/theming/theme) - Component tokens
- [MUI System Tokens](https://mui.com/material-ui/customization/theming/) - Enterprise tokens
- [Chakra UI Tokens](https://chakra-ui.com/docs/theming/theme) - Modern tokens
- [shadcn/ui Tokens](https://ui.shadcn.com/docs/theming) - 2024 patterns
- [Tailwind CSS Custom Properties](https://tailwindcss.com/docs/custom-properties) - CSS variables

### Learning Resources

- [Design Tokens Handbook](https://designtokensbook.com/) - Comprehensive guide
- [Building Design Systems](https://www.smashingmagazine.com/2021/03/building-design-systems-with-design-tokens/) - Smashing Magazine
- [Design Tokens 101](https://uxdesign.cc/design-tokens-101/) - Introduction guide

---

**Discussion**: [Link to GitHub issue or discussion]
