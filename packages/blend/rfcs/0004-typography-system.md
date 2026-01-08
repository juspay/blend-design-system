# RFC 0004: Typography System

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-08

## Summary

Establish a comprehensive typography system based on the Major Third (1.250) modular scale, including responsive/fluid typography, consistent line heights and letter spacing, with dark mode and high contrast support.

## Motivation

### Problem Statement

- Inconsistent font sizes (no systematic scale)
- No modular scale (arbitrary values)
- Poor responsiveness (fixed sizes don't adapt)
- Limited type scale variety
- No fluid typography
- Inconsistent line heights and letter spacing
- Magic numbers scattered throughout codebase

### Goals

- Establish modular type scale (Major Third 1.250)
- Implement responsive typography with breakpoint-specific scales
- Adopt fluid typography using clamp()
- Create comprehensive type system with clear hierarchy
- Ensure optimal readability across all screen sizes
- Support dark mode and high contrast modes

### Non-Goals

- Font selection (handled in design system foundation)
- Variable fonts implementation (future consideration)
- Non-Latin script support (internationalization separate)
- Emoji or icon typography

## Proposed Solution

### Key Changes

1. **Modular Type Scale** (Major Third 1.250)
2. **Responsive Breakpoint Scales**
3. **Fluid Typography with clamp()**
4. **Semantic Typography Variants**
5. **Typography Component**

### Modular Type Scale

```typescript
// Base font size: 16px (1rem)

export const typeScale: Record<
    Scale,
    {
        fontSize: string
        lineHeight: string
        letterSpacing: string
    }
> = {
    0: { fontSize: '0.75rem', lineHeight: '1', letterSpacing: '0.03333em' }, // 12px
    1: { fontSize: '0.875rem', lineHeight: '1.25', letterSpacing: '0.02857em' }, // 14px
    2: { fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0em' }, // 16px (base)
    3: { fontSize: '1.125rem', lineHeight: '1.4', letterSpacing: '-0.02222em' }, // 18px
    4: { fontSize: '1.25rem', lineHeight: '1.4', letterSpacing: '-0.02em' }, // 20px
    5: { fontSize: '1.5rem', lineHeight: '1.33333', letterSpacing: '-0.01em' }, // 24px
    6: { fontSize: '1.875rem', lineHeight: '1.2', letterSpacing: '-0.008em' }, // 30px
    7: {
        fontSize: '2.25rem',
        lineHeight: '1.22222',
        letterSpacing: '-0.00444em',
    }, // 36px
    8: { fontSize: '3rem', lineHeight: '1.16667', letterSpacing: '0em' }, // 48px
    9: {
        fontSize: '3.75rem',
        lineHeight: '1.13333',
        letterSpacing: '-0.00267em',
    }, // 60px
    10: {
        fontSize: '4.5rem',
        lineHeight: '1.11111',
        letterSpacing: '-0.00222em',
    }, // 72px
}
```

### Typography Variants

```typescript
export type TypographyVariant =
    | 'caption'
    | 'overline'
    | 'body-small'
    | 'body'
    | 'body-large'
    | 'subtitle-1'
    | 'subtitle-2'
    | 'h6'
    | 'h5'
    | 'h4'
    | 'h3'
    | 'h2'
    | 'h1'
    | 'display-small'
    | 'display-medium'
    | 'display-large'

export const typographyVariants: Record<
    TypographyVariant,
    {
        fontSize: string
        fontWeight: FontWeight
        lineHeight: string
        letterSpacing: string
    }
> = {
    caption: {
        fontSize: '0.75rem',
        fontWeight: 'regular',
        lineHeight: '1.33',
        letterSpacing: '0.03333em',
    },
    body: {
        fontSize: '1rem',
        fontWeight: 'regular',
        lineHeight: '1.5',
        letterSpacing: '0.00938em',
    },
    bodyLarge: {
        fontSize: '1.125rem',
        fontWeight: 'regular',
        lineHeight: '1.56',
        letterSpacing: '-0.01111em',
    },
    h1: {
        fontSize: '3.75rem',
        fontWeight: 'semibold',
        lineHeight: '1.13',
        letterSpacing: '-0.02em',
    },
    h2: {
        fontSize: '3rem',
        fontWeight: 'semibold',
        lineHeight: '1.17',
        letterSpacing: '-0.02em',
    },
    displayLarge: {
        fontSize: '6rem',
        fontWeight: 'bold',
        lineHeight: '1.1',
        letterSpacing: '-0.015em',
    },
}
```

### Fluid Typography

```typescript
export const fluid = (
    minFontSize: number,
    maxFontSize: number,
    minViewport: number = 320,
    maxViewport: number = 1280
): string => {
    const slope = (maxFontSize - minFontSize) / (maxViewport - minViewport)
    const yAxisIntersection = -minViewport * slope + minFontSize
    return `clamp(${minFontSize}px, ${yAxisIntersection}px + ${slope * 100}vw, ${maxFontSize}px)`
}

export const fluidTypography: Record<TypographyVariant, string> = {
    h1: fluid(36, 72),
    h2: fluid(32, 60),
    h3: fluid(28, 48),
    body: fluid(16, 18),
    bodyLarge: fluid(18, 20),
}
```

### Responsive Breakpoint Scales

```typescript
export const breakpointScales = {
    mobile: {
        h1: { fontSize: '2.5rem', lineHeight: '1.2' },
        h2: { fontSize: '2rem', lineHeight: '1.25' },
    },
    tablet: {
        h1: { fontSize: '3.25rem', lineHeight: '1.15' },
        h2: { fontSize: '2.5rem', lineHeight: '1.2' },
    },
    desktop: {
        h1: { fontSize: '3.75rem', lineHeight: '1.13' },
        h2: { fontSize: '3rem', lineHeight: '1.17' },
    },
}
```

### Font Weight Scale

```typescript
export type FontWeight =
    | 'thin'
    | 'extraLight'
    | 'light'
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'extraBold'
    | 'black'

export const fontWeights: Record<FontWeight, number> = {
    thin: 100,
    extraLight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
}
```

### Typography Component

```typescript
interface TypographyProps {
    variant?: TypographyVariant
    fontWeight?: FontWeight
    lineHeight?: string | number
    letterSpacing?: string
    color?: string
    gutterBottom?: boolean
    paragraph?: boolean
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    children: ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
    variant = 'body',
    fontWeight,
    lineHeight,
    letterSpacing,
    color = 'currentColor',
    gutterBottom = false,
    paragraph = false,
    align = 'inherit',
    children,
}) => {
    const styles = {
        fontFamily: 'var(--font-family-base)',
        fontSize: typographyVariants[variant].fontSize,
        fontWeight: fontWeight || typographyVariants[variant].fontWeight,
        lineHeight: lineHeight || typographyVariants[variant].lineHeight,
        letterSpacing: letterSpacing || typographyVariants[variant].letterSpacing,
        color,
        textAlign: align,
        marginBottom: gutterBottom ? '0.5em' : 0,
    }

    const Tag = paragraph ? 'p' : determineTag(variant)
    return <Tag style={styles}>{children}</Tag>
}
```

### Utility Classes

```typescript
// tailwind.config.ts
export default {
    theme: {
        extend: {
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '3.75rem',
                '7xl': '4.5rem',
                '8xl': '6rem',
            },
            lineHeight: {
                none: 1,
                tight: 1.25,
                snug: 1.375,
                normal: 1.5,
                relaxed: 1.625,
                loose: 2,
            },
            letterSpacing: {
                tighter: '-0.05em',
                tight: '-0.025em',
                normal: '0em',
                wide: '0.025em',
                wider: '0.05em',
                widest: '0.1em',
            },
        },
    },
}
```

### Dark Mode Support

```typescript
export const darkModeTypography = {
    colors: {
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
    },
    lineHeight: {
        body: '1.6',
        bodyLarge: '1.6',
    },
}
```

### High Contrast Mode Support

```css
@media (prefers-contrast: high) {
    :root {
        --text-primary: #000000;
        --text-secondary: #000000;
        --text-disabled: #666666;
    }
}
```

## Alternatives Considered

### Option 1: Perfect Fourth Scale (1.333)

Larger differentiation, good for dramatic headings.

**Why not chosen**: Major Third (1.250) provides better granularity, commonly used in Material Design and Apple HIG.

### Option 2: Fixed Pixel Values Only

Simpler, more predictable.

**Why not chosen**: Poor responsiveness. Fluid typography provides better UX across devices.

### Option 3: Variable Fonts Only

Fine-grained control, better performance.

**Why not chosen**: Variable fonts should complement, not replace systematic scale. Future RFC.

## Impact Analysis

### Breaking Changes

**Moderate** - Font sizes, line heights, and letter spacing will change.

### Backward Compatibility

**Partially compatible** - Migration mapping possible, legacy class names can be aliased.

### Performance Impact

**Negligible** - Token-based system efficient, CSS variables for theme switching.

### Bundle Size Impact

**Small increase** (~2KB) - Typography tokens, utility classes, type definitions.

### Migration Effort

**Medium** - Update typography tokens, components, utilities.

## Migration Guide

### Phase 1: Update Typography Tokens

```typescript
// Before
const typography = {
    h1: { fontSize: '48px', lineHeight: '1.2' },
}

// After
import { typographyVariants } from '@/tokens/typography'
const typography = {
    h1: typographyVariants.h1,
}
```

### Phase 2: Update Components

```typescript
// Before
<h1 className="text-4xl font-bold">Heading</h1>

// After
<Typography variant="h1">Heading</Typography>
```

## Implementation Plan

**Phase 1: Foundation (Week 1)**

- Define type scale and variants
- Create typography tokens
- Set up design token system
- Create Typography component
- Generate Tailwind utilities

**Phase 2: Component Updates (Weeks 2-3)**

- Update all components to use Typography component
- Update headings, body text, captions
- Test responsiveness

**Phase 3: Documentation (Week 4)**

- Create typography documentation
- Create usage guidelines
- Create examples for each variant
- Document dark mode support
- Create migration guide

**Phase 4: Storybook Integration (Week 5)**

- Create typography stories
- Create variant showcase
- Create responsive demos
- Create dark mode demos

## Risks and Mitigations

### Risk 1: Breaking Existing Designs

**Likelihood**: High
**Impact**: High
**Mitigation**: Migration mapping, legacy class names temporary support, update documentation first, coordinate with design team

### Risk 2: Team Adoption

**Likelihood**: Medium
**Impact**: High
**Mitigation**: Comprehensive documentation, code examples, training sessions, pair programming

## Success Metrics

- [ ] All components use new typography system
- [ ] Typography fully responsive
- [ ] 100% coverage of type variants
- [ ] Dark mode fully supported
- [ ] Accessibility requirements met
- [ ] Bundle size increase < 3KB
- [ ] Team adoption rate > 90%

## Unresolved Questions

1. Base font size: 16px or 18px? (16px more common)
2. Line height scale: Golden ratio (1.618) or simpler scale?
3. Mobile scaling: Different on very small screens (<375px)?
4. Variable fonts: Prioritize in future RFC?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions

## References

- [Material Design Typography](https://m3.material.io/styles/typography/overview) - Material Design 3
- [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography) - Apple guidelines
- [Atlassian Design System Typography](https://atlassian.design/foundations/typography/) - Atlassian system
- [IBM Design Language Typography](https://www.ibm.com/design/language/typography/) - IBM system
- [Fluid Typography](https://modern-fluid-typography.vercel.app/) - Clamp calculator
- [Type Scale Calculator](https://type-scale.com/) - Modular scale generator
- [Utopia Fluid Typography](https://utopia.fyi/type/calculator/) - Advanced calculator
- [Radix UI Typography](https://www.radix-ui.com/docs/primitives/components/text) - Component typography
- [MUI Typography](https://mui.com/material-ui/react/typography/) - Enterprise patterns
- [shadcn/ui Typography](https://ui.shadcn.com/docs/components/typography) - 2024 patterns

---

**Discussion**: [Link to GitHub issue or discussion]
