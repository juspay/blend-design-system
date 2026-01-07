# RFC 0004: Typography System

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-07

## Summary

This RFC establishes a comprehensive typography system for the Blend Design System based on modern design principles and 2024-2025 industry standards. It defines a modular scale, responsive typography, fluid typography, and a systematic approach to font sizing, line heights, and letter spacing that ensures consistency across all components and breakpoints.

## Motivation

### Problem Statement

Current typography implementation has several issues:

1. **Inconsistent Sizing**: Font sizes are arbitrary and don't follow a systematic scale
2. **No Modular Scale**: Typography doesn't follow a mathematical relationship
3. **Poor Responsiveness**: Fixed font sizes don't adapt well across devices
4. **Limited Type Scale**: Insufficient variety for different hierarchies
5. **No Fluid Typography**: Missing clamp() and viewport-based sizing
6. **Inconsistent Line Heights**: Line heights don't scale appropriately
7. **Poor Readability**: Letter spacing not optimized for different sizes
8. **Hard to Maintain**: Magic numbers scattered throughout the codebase

### Goals

- Establish a modular type scale based on a mathematical ratio
- Implement responsive typography with breakpoint-specific scales
- Adopt fluid typography using clamp() for smooth scaling
- Create a comprehensive type system with clear hierarchy
- Ensure optimal readability across all screen sizes
- Provide consistent line heights and letter spacing
- Make the system extensible and maintainable
- Support dark mode and high contrast modes

### Non-Goals

- This RFC does NOT cover font selection (handled in design system foundation)
- This RFC does NOT include variable fonts implementation (future consideration)
- This RFC does NOT cover non-Latin scripts (internationalization handled separately)
- This RFC does NOT include emoji or icon typography

## Proposed Solution

### 1. Modular Type Scale

Based on the Major Third (1.250) scale, which provides good readability and sufficient differentiation:

```typescript
// Base font size: 16px (1rem)

export type Scale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const typeScale: Record<
    Scale,
    { fontSize: string; lineHeight: string; letterSpacing: string }
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

### 2. Type Scale Categories

Semantic naming for clearer intent:

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
    // Caption
    caption: {
        fontSize: '0.75rem',
        fontWeight: 'regular',
        lineHeight: '1.33',
        letterSpacing: '0.03333em',
    },

    // Overline
    overline: {
        fontSize: '0.75rem',
        fontWeight: 'medium',
        lineHeight: '1.5',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
    },

    // Body
    bodySmall: {
        fontSize: '0.875rem',
        fontWeight: 'regular',
        lineHeight: '1.43',
        letterSpacing: '0.01071em',
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

    // Subtitles
    subtitle1: {
        fontSize: '1rem',
        fontWeight: 'medium',
        lineHeight: '1.75',
        letterSpacing: '0.00938em',
    },

    subtitle2: {
        fontSize: '0.875rem',
        fontWeight: 'medium',
        lineHeight: '1.57',
        letterSpacing: '0.00714em',
    },

    // Headings
    h6: {
        fontSize: '1.25rem',
        fontWeight: 'medium',
        lineHeight: '1.6',
        letterSpacing: '0.0075em',
    },

    h5: {
        fontSize: '1.5rem',
        fontWeight: 'medium',
        lineHeight: '1.33',
        letterSpacing: '0em',
    },

    h4: {
        fontSize: '2.125rem',
        fontWeight: 'medium',
        lineHeight: '1.17',
        letterSpacing: '0.00735em',
    },

    h3: {
        fontSize: '2.625rem',
        fontWeight: 'medium',
        lineHeight: '1.2',
        letterSpacing: '0em',
    },

    h2: {
        fontSize: '3rem',
        fontWeight: 'semibold',
        lineHeight: '1.17',
        letterSpacing: '-0.02em',
    },

    h1: {
        fontSize: '3.75rem',
        fontWeight: 'semibold',
        lineHeight: '1.13',
        letterSpacing: '-0.02em',
    },

    // Display
    displaySmall: {
        fontSize: '3.75rem',
        fontWeight: 'bold',
        lineHeight: '1.2',
        letterSpacing: '-0.02em',
    },

    displayMedium: {
        fontSize: '4.5rem',
        fontWeight: 'bold',
        lineHeight: '1.17',
        letterSpacing: '-0.02222em',
    },

    displayLarge: {
        fontSize: '6rem',
        fontWeight: 'bold',
        lineHeight: '1.1',
        letterSpacing: '-0.015em',
    },
}
```

### 3. Fluid Typography

Using `clamp()` for smooth scaling across viewport sizes:

```typescript
// Fluid typography utility
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

// Example usage
export const fluidTypography: Record<TypographyVariant, string> = {
    h1: fluid(36, 72), // 36px → 72px
    h2: fluid(32, 60), // 32px → 60px
    h3: fluid(28, 48), // 28px → 48px
    h4: fluid(24, 36), // 24px → 36px
    body: fluid(16, 18), // 16px → 18px
    bodyLarge: fluid(18, 20), // 18px → 20px
}
```

### 4. Responsive Breakpoint Scales

Scale adjustments for different breakpoints:

```typescript
export const breakpointScales = {
    mobile: {
        h1: { fontSize: '2.5rem', lineHeight: '1.2' },
        h2: { fontSize: '2rem', lineHeight: '1.25' },
        h3: { fontSize: '1.75rem', lineHeight: '1.3' },
    },
    tablet: {
        h1: { fontSize: '3.25rem', lineHeight: '1.15' },
        h2: { fontSize: '2.5rem', lineHeight: '1.2' },
        h3: { fontSize: '2rem', lineHeight: '1.25' },
    },
    desktop: {
        h1: { fontSize: '3.75rem', lineHeight: '1.13' },
        h2: { fontSize: '3rem', lineHeight: '1.17' },
        h3: { fontSize: '2.625rem', lineHeight: '1.2' },
    },
}
```

### 5. Font Weight Scale

Clear weight naming with specific values:

```typescript
export type FontWeight =
    | 'thin' // 100
    | 'extraLight' // 200
    | 'light' // 300
    | 'regular' // 400
    | 'medium' // 500
    | 'semiBold' // 600
    | 'bold' // 700
    | 'extraBold' // 800
    | 'black' // 900

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

### 6. Typography Tokens

Design token format for consistency:

```typescript
// tokens/typography.ts
export const typographyTokens = {
    // Base
    baseFontSize: '16px',
    baseLineHeight: 1.5,
    baseLetterSpacing: '0em',

    // Scale
    scale: typeScale,

    // Variants
    variants: typographyVariants,

    // Fluid
    fluid: fluidTypography,

    // Breakpoints
    breakpoints: breakpointScales,

    // Weights
    weights: fontWeights,

    // Line heights
    lineHeight: {
        tight: 1.1,
        snug: 1.25,
        normal: 1.5,
        relaxed: 1.75,
        loose: 2,
    },

    // Letter spacing
    letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
    },
}
```

### 7. Typography Component

```typescript
// components/Typography/Typography.tsx
interface TypographyProps {
    variant?: TypographyVariant
    scale?: Scale
    fontWeight?: FontWeight
    lineHeight?: string | number
    letterSpacing?: string
    color?: string
    gutterBottom?: boolean
    paragraph?: boolean
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
    noWrap?: boolean
    sx?: SystemStyleObject
    children: ReactNode
}

export const Typography: React.FC<TypographyProps> = ({
    variant = 'body',
    scale,
    fontWeight,
    lineHeight,
    letterSpacing,
    color = 'currentColor',
    gutterBottom = false,
    paragraph = false,
    align = 'inherit',
    noWrap = false,
    sx,
    children,
}) => {
    const styles = {
        fontFamily: 'var(--font-family-base)',
        fontSize: scale ? typeScale[scale].fontSize : typographyVariants[variant].fontSize,
        fontWeight: fontWeight || typographyVariants[variant].fontWeight,
        lineHeight: lineHeight || typographyVariants[variant].lineHeight,
        letterSpacing: letterSpacing || typographyVariants[variant].letterSpacing,
        color,
        textAlign: align,
        whiteSpace: noWrap ? 'nowrap' : 'normal',
        marginBottom: gutterBottom ? '0.5em' : 0,
        ...(paragraph && { marginTop: 0 }),
        ...sx,
    }

    const Tag = paragraph ? 'p' : determineTag(variant)

    return <Tag style={styles}>{children}</Tag>
}
```

### 8. Utility Classes

Tailwind-style utility classes for rapid development:

```typescript
// tailwind.config.ts
export default {
    theme: {
        extend: {
            fontSize: {
                xs: '0.75rem', // 12px
                sm: '0.875rem', // 14px
                base: '1rem', // 16px
                lg: '1.125rem', // 18px
                xl: '1.25rem', // 20px
                '2xl': '1.5rem', // 24px
                '3xl': '1.875rem', // 30px
                '4xl': '2.25rem', // 36px
                '5xl': '3rem', // 48px
                '6xl': '3.75rem', // 60px
                '7xl': '4.5rem', // 72px
                '8xl': '6rem', // 96px
                '9xl': '8rem', // 128px
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

### 9. Dark Mode Support

```typescript
// Dark mode typography adjustments
export const darkModeTypography = {
    // Slightly increase contrast in dark mode
    colors: {
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            disabled: 'rgba(255, 255, 255, 0.38)',
        },
    },

    // Slightly reduce letter spacing in dark mode
    letterSpacing: {
        h1: '-0.025em',
        h2: '-0.022em',
        h3: '-0.02em',
    },

    // Slightly increase line height in dark mode
    lineHeight: {
        body: '1.6',
        bodyLarge: '1.6',
    },
}
```

### 10. High Contrast Mode Support

```typescript
// High contrast mode
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

**Description**: Use the Perfect Fourth (1.333) musical scale for typography.

**Pros:**

- Larger differentiation between sizes
- Good for dramatic headings

**Cons:**

- Can be too large jumps
- May not work well for body text
- Less common in modern design systems

**Why not chosen**: The Major Third (1.250) scale provides better granularity and is more commonly used in modern design systems like Material Design and Apple's Human Interface Guidelines.

### Option 2: Fixed Pixel Values Only

**Description**: Use only fixed pixel values without fluid typography.

**Pros:**

- Simpler to implement
- More predictable
- Easier to debug

**Cons**:

- Poor responsiveness
- Breaks on unusual viewport sizes
- Doesn't take advantage of modern CSS

**Why not chosen**: Fluid typography provides better UX across devices and is now a best practice in 2024-2025.

### Option 3: Variable Fonts Only

**Description**: Use variable fonts exclusively and rely on font axes for scaling.

**Pros:**

- Fine-grained control
- Better performance (single font file)
- Infinite variation

**Cons**:

- Limited browser support for older browsers
- More complex implementation
- Requires variable font license

**Why not chosen**: Variable fonts are great but should complement, not replace, a systematic scale. We'll add them in a future RFC.

## Impact Analysis

### Breaking Changes

**Moderate breaking changes**:

- Existing font sizes will change
- Line heights may adjust
- Letter spacing will change
- Some components may need updates

### Backward Compatibility

**Partially compatible**:

- Can provide migration mapping
- Legacy class names can be aliased
- Gradual migration possible

### Performance Impact

**Negligible**:

- Token-based system is efficient
- No runtime calculations
- CSS variables for theme switching

### Bundle Size Impact

**Small increase** (~2KB):

- Typography tokens
- Utility classes
- Type definitions

### Developer Experience

**Significantly improved**:

- Clear system for typography choices
- Consistent output
- Better tooling support
- Easier to maintain

## Migration Guide

### Phase 1: Update Typography Tokens (Week 1)

```typescript
// Before
const typography = {
    h1: { fontSize: '48px', lineHeight: '1.2' },
    h2: { fontSize: '36px', lineHeight: '1.3' },
}

// After
import { typographyVariants } from '@/tokens/typography'

const typography = {
    h1: typographyVariants.h1,
    h2: typographyVariants.h2,
}
```

### Phase 2: Update Components (Week 2-4)

```typescript
// Before
<h1 className="text-4xl font-bold">Heading</h1>

// After
<Typography variant="h1">Heading</Typography>
```

### Phase 3: Update Utilities (Week 5)

```typescript
// Before
.className={clsx('text-lg', 'font-medium')}

// After
.className={clsx('text-xl', 'font-medium')}
```

## Implementation Plan

### Phase 1: Foundation (Week 1)

**Tasks**:

- [x] Create RFC and get team approval
- [ ] Define type scale and variants
- [ ] Create typography tokens
- [ ] Set up design token system
- [ ] Create Typography component
- [ ] Generate Tailwind utilities

**Deliverables**:

- Typography token system
- Typography component
- Utility classes

### Phase 2: Component Updates (Week 2-3)

**Tasks**:

- [ ] Update all components to use Typography component
- [ ] Update headings in all components
- [ ] Update body text in all components
- [ ] Update captions and overlines
- [ ] Test responsiveness

**Deliverables**:

- Updated components
- Responsive typography

### Phase 3: Documentation (Week 4)

**Tasks**:

- [ ] Create typography documentation
- [ ] Create usage guidelines
- [ ] Create examples for each variant
- [ ] Document dark mode support
- [ ] Create migration guide

**Deliverables**:

- Complete documentation
- Usage examples
- Migration guide

### Phase 4: Storybook Integration (Week 5)

**Tasks**:

- [ ] Create typography stories
- [ ] Create variant showcase
- [ ] Create responsive demos
- [ ] Create dark mode demos
- [ ] Create accessibility demos

**Deliverables**:

- Storybook stories
- Interactive demos

## Risks and Mitigations

### Risk 1: Breaking Existing Designs

**Likelihood**: High

**Impact**: High

**Mitigation**:

- Provide migration mapping
- Support legacy class names temporarily
- Update documentation first
- Coordinate with design team

### Risk 2: Browser Compatibility

**Likelihood**: Low

**Impact**: Medium

**Mitigation**:

- Test across supported browsers
- Provide fallbacks for older browsers
- Use CSS feature detection
- Document browser support

### Risk 3: Performance Degradation

**Likelihood**: Low

**Impact**: Low

**Mitigation**:

- Use CSS variables
- Minimize recalculations
- Optimize token size
- Profile performance

### Risk 4: Team Adoption

**Likelihood**: Medium

**Impact**: High

**Mitigation**:

- Comprehensive documentation
- Code examples
- Training sessions
- Pair programming
- Gradual rollout

## Success Metrics

- [ ] All components use new typography system
- [ ] Typography is fully responsive
- [ ] 100% coverage of type variants
- [ ] Dark mode fully supported
- [ ] Accessibility requirements met
- [ ] Bundle size increase < 3KB
- [ ] Team adoption rate > 90%

## Unresolved Questions

1. **Base Font Size**: Should we use 16px or 18px as the base? (16px is more common)

2. **Line Height Scale**: Should we use golden ratio (1.618) or a simpler scale?

3. **Mobile Scaling**: Should typography scale differently on very small screens (<375px)?

4. **Variable Fonts**: Should we prioritize variable fonts in a future RFC?

5. **Custom Scales**: Should we allow custom scales beyond the standard modular scale?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle Size Optimization

## References

### Typography Systems

- [Material Design Typography](https://m3.material.io/styles/typography/overview) - Material Design 3 typography
- [Apple HIG Typography](https://developer.apple.com/design/human-interface-guidelines/typography) - Apple guidelines
- [Atlassian Design System Typography](https://atlassian.design/foundations/typography/) - Atlassian's system
- [IBM Design Language Typography](https://www.ibm.com/design/language/typography/) - IBM's system
- [Salesforce Lightning Typography](https://www.lightningdesignsystem.com/design-tokens/typography/) - Salesforce system

### Modern Typography Practices

- [Fluid Typography](https://modern-fluid-typography.vercel.app/) - Clamp calculator
- [Type Scale Calculator](https://type-scale.com/) - Modular scale generator
- [Utopia Fluid Typography](https://utopia.fyi/type/calculator/) - Advanced calculator
- [CSS Tricks Fluid Typography](https://css-tricks.com/snippets/css/complete-guide-grid/) - Guide

### Accessibility

- [WCAG Typography Requirements](https://www.w3.org/WAI/WCAG22/quickref/#text-alternatives) - WCAG 2.2
- [WebAIM Typography](https://webaim.org/techniques/fonts/) - WebAIM guidelines
- [Readability Formulas](https://webfx.com/tools/read-able/) - Readability testing

### Industry Standards (2024-2025)

- [Radix UI Typography](https://www.radix-ui.com/docs/primitives/components/text) - Component typography
- [MUI Typography](https://mui.com/material-ui/react/typography/) - Enterprise patterns
- [Chakra UI Typography](https://chakra-ui.com/docs/components/text) - Modern approach
- [shadcn/ui Typography](https://ui.shadcn.com/docs/components/typography) - 2024 patterns
- [Tailwind Typography Plugin](https://tailwindcss.com/docs/typography-plugin) - Plugin documentation

### Learning Resources

- [Butterick's Practical Typography](https://practicaltypography.com/) - Online book
- [Typography Handbook](https://typographyhandbook.com/) - Comprehensive guide
- [Web Typography Masterclass](https://webtypography.netlify.app/) - Modern guide

---

**Discussion**: [Link to GitHub issue or discussion]
