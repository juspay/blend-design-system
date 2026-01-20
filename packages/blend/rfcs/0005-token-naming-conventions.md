# RFC 0005: Design Token Naming Conventions

## Summary

Establish consistent naming conventions for design tokens following the Design Tokens Community Group (DTCG) specification and 2024-2025 industry standards, improving maintainability, tooling support, and discoverability.

## Motivation

### Problem Statement

- Inconsistent naming (camelCase, kebab-case, PascalCase)
- No hierarchical organization
- Poor discoverability
- Tooling limitations
- No DTCG standard compliance
- Mixed semantic/primitive tokens
- No versioning strategy
- Poor documentation

### Goals

- Establish consistent naming following DTCG specification
- Create clear token hierarchy and structure
- Enable tooling support
- Improve token discoverability and maintainability
- Define semantic vs primitive token separation
- Establish token versioning strategy

### Non-Goals

- Define specific token values (handled in design system foundation)
- Cover token transformation formats (JSON, CSS, etc.)
- Include token validation schemas
- Cover token migration from existing systems

## Proposed Solution

### Key Changes

1. **DTCG Naming Convention**
2. **Hierarchical Token Structure**
3. **Token Categories**
4. **Theme-Specific Tokens**
5. **Token Versioning**

### Naming Convention Structure

```
{category}/{group}/{item}[/{modifier}][/{state}]
```

### Token Categories

```typescript
export type TokenCategory =
    | 'color' // Colors (background, text, border)
    | 'spacing' // Spacing (padding, margin, gap)
    | 'typography' // Typography (font size, weight, line height)
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

### Token Examples

#### Color Tokens

```typescript
export const colorTokens = {
    'color/brand/primary': '#0066CC',
    'color/brand/primary-hover': '#0052A3',
    'color/brand/secondary': '#6B7280',
    'color/surface/background': '#FFFFFF',
    'color/surface/background-alt': '#F9FAFB',
    'color/text/primary': '#111827',
    'color/text/secondary': '#6B7280',
    'color/text/disabled': '#D1D5DB',
    'color/border/default': '#E5E7EB',
    'color/border/focus': '#3B82F6',
    'color/status/success': '#10B981',
    'color/status/error': '#EF4444',
    'color/status/warning': '#F59E0B',
    'color/status/info': '#3B82F6',
}
```

#### Spacing Tokens

```typescript
export const spacingTokens = {
    'spacing/padding/0': '0px',
    'spacing/padding/1': '4px',
    'spacing/padding/2': '8px',
    'spacing/padding/3': '12px',
    'spacing/padding/4': '16px',
    'spacing/padding/6': '24px',
    'spacing/padding/8': '32px',
    'spacing/padding/12': '48px',
    'spacing/gap/1': '4px',
    'spacing/gap/2': '8px',
    'spacing/gap/4': '16px',
}
```

#### Typography Tokens

```typescript
export const typographyTokens = {
    'typography/font-family/base':
        'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    'typography/font-size/body': '1rem',
    'typography/font-size/h1': '3.75rem',
    'typography/font-weight/regular': '400',
    'typography/font-weight/semibold': '600',
    'typography/font-weight/bold': '700',
    'typography/line-height/normal': '1.5',
    'typography/letter-spacing/normal': '0em',
}
```

#### Border Tokens

```typescript
export const borderTokens = {
    'border/width/0': '0px',
    'border/width/1': '1px',
    'border/width/2': '2px',
    'border/radius/0': '0px',
    'border/radius/2': '4px',
    'border/radius/4': '8px',
    'border/radius/8': '16px',
    'border/radius/full': '9999px',
    'border/style/solid': 'solid',
    'border/style/dashed': 'dashed',
}
```

#### Shadow Tokens

```typescript
export const shadowTokens = {
    'shadow/1': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    'shadow/2':
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    'shadow/3':
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    'shadow/4':
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
}
```

### Token Usage in Components

```typescript
import { tokens } from '@/tokens'

export const Button = ({ variant = 'primary', size = 'medium' }) => {
    return (
        <button
            style={{
                backgroundColor: tokens[`color/brand/${variant}`],
                color: tokens[`color/text/on-${variant}`],
                padding: tokens[`spacing/padding/${size === 'medium' ? 3 : 2}`],
                borderRadius: tokens['border/radius/4'],
                fontSize: tokens['typography/font-size/body'],
                fontWeight: tokens['typography/font-weight/medium'],
            }}
        >
            {children}
        </button>
    )
}
```

### Theme-Specific Tokens

```typescript
export const lightTheme = {
    'color/surface/background': '#FFFFFF',
    'color/surface/background-alt': '#F9FAFB',
    'color/text/primary': '#111827',
    'color/text/secondary': '#6B7280',
    'color/border/default': '#E5E7EB',
}

export const darkTheme = {
    'color/surface/background': '#111827',
    'color/surface/background-alt': '#1F2937',
    'color/text/primary': '#F9FAFB',
    'color/text/secondary': '#D1D5DB',
    'color/border/default': '#374151',
}
```

### Token Type Definitions

```typescript
export type ColorToken =
    | `color/brand/${string}`
    | `color/surface/${string}`
    | `color/text/${string}`
    | `color/border/${string}`
    | `color/status/${string}`

export type SpacingToken =
    | `spacing/padding/${number}`
    | `spacing/margin/${number}`
    | `spacing/gap/${number}`

export type TypographyToken =
    | `typography/font-family/${string}`
    | `typography/font-size/${string}`
    | `typography/font-weight/${string}`
    | `typography/line-height/${string}`
    | `typography/letter-spacing/${string}`

export type DesignToken =
    | ColorToken
    | SpacingToken
    | TypographyToken
    | BorderToken
    | ShadowToken
```

### Token Validation

```typescript
export const validateToken = (name: string, value: any): boolean => {
    const pattern = /^[a-z]+\/[a-z]+\/[a-z0-9-]+(\/[a-z0-9-]+)*$/
    if (!pattern.test(name)) {
        console.warn(`Invalid token name: ${name}`)
        return false
    }

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

### Token Documentation

```typescript
/**
 * Brand Colors
 * Primary brand color for the Blend Design System.
 * Used for primary actions, links, and brand elements.
 *
 * @category color
 * @group brand
 * @usage Primary buttons, links, brand elements
 * @accessibility Meets WCAG 2.2 AA contrast requirements
 */
export const brandPrimary: ColorToken = 'color/brand/primary'
```

## Alternatives Considered

### Option 1: Flat Naming Convention

Use flat names like `primary-color`, `spacing-md`.

**Why not chosen**: Hierarchical naming provides better organization and tooling support. Industry standard.

### Option 2: camelCase Token Names

Use camelCase like `colorBrandPrimary`, `spacingPadding4`.

**Why not chosen**: Kebab-case with slashes more readable, follows DTCG spec, better tooling support.

### Option 3: Category Prefixes Only

Use simple prefixes like `c-brand-primary`, `s-padding-4`.

**Why not chosen**: Full hierarchical naming provides better organization and scalability.

## Impact Analysis

### Breaking Changes

**High** - All token names will change, all components need updates, consumer applications need updates.

### Backward Compatibility

**Not compatible** - Complete breaking change, requires migration.

### Performance Impact

**Negligible** - Token lookup fast, no runtime overhead, CSS variables efficient.

### Bundle Size Impact

**No change** - Token names not included in production bundle.

### Migration Effort

**High** (~12 weeks) - Migrate all tokens, update components, update CSS variables.

## Migration Guide

### Phase 1: Update Token Definitions

```typescript
// Before
const colors = {
    primary: '#0066CC',
    background: '#FFFFFF',
}

// After
const colorTokens = {
    'color/brand/primary': '#0066CC',
    'color/surface/background': '#FFFFFF',
}
```

### Phase 2: Update Components

```typescript
// Before
const Button = styled.button`
    background: ${colors.primary};
    padding: 16px;
`

// After
const Button = styled.button`
    background: ${tokens['color/brand/primary']};
    padding: ${tokens['spacing/padding/4']};
`
```

## Implementation Plan

**Phase 1: Foundation (Weeks 1-2)**

- Define naming convention
- Create token type definitions
- Set up token structure
- Create token validation utilities
- Set up token export formats

**Phase 2: Token Migration (Weeks 3-6)**

- Migrate all color tokens
- Migrate all spacing tokens
- Migrate all typography tokens
- Migrate all border/shadow tokens
- Create theme-specific tokens

**Phase 3: Component Updates (Weeks 7-10)**

- Update all components to use new tokens
- Update CSS variables
- Update Storybook stories
- Update documentation

**Phase 4: Tooling & Documentation (Weeks 11-12)**

- Create token explorer tool
- Generate token documentation
- Create migration guide
- Create token usage guidelines
- Train team on new system

## Risks and Mitigations

### Risk 1: Massive Breaking Change

**Likelihood**: High
**Impact**: High
**Mitigation**: Comprehensive migration guide, migration tools/scripts, support both old and new temporarily, coordinate with all consumers

### Risk 2: Team Adoption

**Likelihood**: Medium
**Impact**: High
**Mitigation**: Extensive training, code examples, migration assistance, gradual rollout

## Success Metrics

- [ ] 100% of tokens follow new naming convention
- [ ] All components updated
- [ ] Token explorer built
- [ ] Migration guide completed
- [ ] Team trained on new system
- [ ] Documentation complete
- [ ] Token validation automated

## Unresolved Questions

1. Token versioning: How to handle versioning across major versions?
2. Deprecation strategy: Process for deprecating old tokens?
3. Custom tokens: Should consumers define custom tokens?
4. Tooling priority: Which token tooling features to prioritize?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0004](./0004-typography-system.md) - Typography System
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle Size Optimization

## References

- [DTCG Format](https://tr.designtokens.org/format/) - Token format specification
- [DTCG Naming](https://tr.designtokens.org/naming/) - Naming conventions
- [Style Dictionary](https://amzn.github.io/style-dictionary/) - Token transformation tool
- [Salesforce Lightning Tokens](https://www.lightningdesignsystem.com/design-tokens/) - Salesforce system
- [Atlassian Design Tokens](https://atlassian.design/foundations/design-tokens/) - Atlassian system
- [IBM Carbon Tokens](https://carbondesignsystem.com/design-tokens/overview/) - IBM system
- [Radix UI Tokens](https://www.radix-ui.com/docs/theming/theme) - Component tokens
- [MUI System Tokens](https://mui.com/material-ui/customization/theming/) - Enterprise tokens
- [shadcn/ui Tokens](https://ui.shadcn.com/docs/theming) - 2024 patterns

---
