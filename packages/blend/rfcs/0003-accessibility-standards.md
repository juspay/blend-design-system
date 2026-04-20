# RFC 0003: Accessibility Standards

## Summary

Ensure all components meet WCAG 2.2 Level AA requirements through comprehensive keyboard navigation, ARIA support, screen reader optimization, and automated accessibility testing in CI/CD.

## Motivation

### Problem Statement

- Inconsistent WCAG 2.2 AA compliance
- Missing keyboard navigation in some components
- Insufficient ARIA support for complex components
- No automated accessibility testing in CI/CD
- Missing accessibility documentation

### Goals

- Achieve WCAG 2.2 Level AA compliance
- Implement comprehensive keyboard navigation
- Ensure proper ARIA support
- Add automated accessibility testing in CI/CD
- Create accessibility documentation for all components

### Non-Goals

- WCAG 2.2 AAA compliance (too restrictive for most applications)
- Mobile-specific accessibility (separate RFC)
- Sign language or braille support
- Third-party integration accessibility

## Proposed Solution

### Key Changes

1. **WCAG 2.2 Level AA Compliance**
2. **Keyboard Navigation for All Components**
3. **ARIA Attribute Standards**
4. **Automated Testing with jest-axe**
5. **Accessibility Documentation**

### WCAG 2.2 Level AA Requirements

#### Perceivable

- Images have meaningful alt text
- Content adaptable (proper heading hierarchy, semantic HTML)
- Text contrast ≥ 4.5:1 (normal), ≥ 3:1 (large 18pt+)
- Interactive elements contrast ≥ 3:1
- Focus indicators clearly visible

#### Operable

- All functionality keyboard accessible
- No keyboard traps
- Logical tab order
- No content flashing > 3 times per second
- Respect `prefers-reduced-motion`
- Touch targets ≥ 44x44px
- Multiple navigation methods

#### Understandable

- Default language identified
- Navigation and behavior consistent
- User notified before context changes
- Error identification and description
- Labels and instructions provided

#### Robust

- Compatible with assistive technologies
- Proper HTML semantics
- ARIA attributes used correctly

### Component Accessibility Requirements

#### Required for All Components

**Keyboard Navigation Tests**

```typescript
it('can be activated with Enter key', async () => {
    const { user } = render(<Button onClick={handleClick} />)
    await user.tab()
    await user.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalled()
})

it('can be activated with Space key', async () => {
    const { user } = render(<Button onClick={handleClick} />)
    await user.tab()
    await user.keyboard(' ')
    expect(handleClick).toHaveBeenCalled()
})
```

**Focus Management Tests**

```typescript
it('has visible focus indicator', () => {
    render(<Button />)
    const button = screen.getByRole('button')
    button.focus()
    expect(document.activeElement).toBe(button)
})
```

**ARIA Attributes Tests**

```typescript
it('has proper ARIA attributes when disabled', () => {
    render(<Button disabled />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-disabled', 'true')
})
```

#### Component-Specific Requirements

**Buttons**: Accessible name (text or aria-label), `aria-disabled`, `aria-busy`, icon-only requires `aria-label`

**Inputs**: Associated label, `aria-invalid`, `aria-describedby`, `aria-required`, help text linked

**Modals**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby`, trap focus, return focus

**Dropdowns/Menus**: `role="listbox"` or `role="menu"`, `aria-expanded`, `aria-controls`, close on Escape

**Tabs**: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel`, linked via `aria-controls`/`aria-labelledby`

**Accordions**: `role="button"`, `aria-expanded`, `aria-controls`, `aria-labelledby`

**Tooltips**: `aria-describedby` pointing to tooltip, `role="tooltip"`, keyboard accessible

**Tables**: `caption` or accessible name, `scope="col"`/`scope="row"`, `aria-sort`, accessible pagination

**Forms**: Labels for all inputs, required field markers, error messages via `aria-describedby`, keyboard submission

### Automated Accessibility Testing

#### CI/CD Integration

```yaml
name: Accessibility Tests
on:
    pull_request:
        paths: ['packages/blend/lib/components/**']
jobs:
    accessibility:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v4
            - uses: actions/setup-node@v4
            - run: npm ci
            - run: npm test -- --grep "accessibility"
            - run: npm run test:a11y
```

#### Jest-Axe Configuration

```typescript
// vitest.setup.ts
import { configureAxe } from 'jest-axe'

configureAxe({
    rules: {
        'color-contrast': { enabled: true },
        'label-title-only': { enabled: true },
        'heading-order': { enabled: true },
    },
    tags: {
        wcag2a: true,
        wcag2aa: true,
        wcag21aa: true,
        wcag22aa: true,
    },
})
```

### Visual Accessibility

#### Color Contrast

```typescript
export const checkContrast = (
    foreground: string,
    background: string,
    size: 'normal' | 'large'
): boolean => {
    const ratio = calculateContrastRatio(foreground, background)
    const minimum = size === 'normal' ? 4.5 : 3.0
    return ratio >= minimum
}
```

#### Focus Indicators

```css
*:focus-visible {
    outline: 2px solid #0000ff;
    outline-offset: 2px;
}

@media (prefers-contrast: high) {
    *:focus-visible {
        outline: 3px solid #000000;
        background: #ffff00;
    }
}
```

#### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

### Screen Reader Optimization

#### Semantic HTML

Use semantic elements:

- `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`
- Avoid: `<div role="navigation">`, `<div role="main">`
- Maintain proper heading hierarchy: `<h1>` → `<h2>` → `<h3>`

#### ARIA Live Regions

```typescript
// Toast notifications
<div role="alert" aria-live="polite" aria-atomic="true">
    {message}
</div>

// Critical alerts
<div role="alert" aria-live="assertive" aria-atomic="true">
    {message}
</div>
```

#### Skip Links

```typescript
<a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4"
>
    Skip to main content
</a>
```

## Alternatives Considered

### Option 1: WCAG 2.2 AAA Compliance

Maximum accessibility for government/education applications.

**Why not chosen**: Too restrictive. AA is industry standard with excellent accessibility without excessive constraints.

### Option 2: Manual Testing Only

No automated checks.

**Why not chosen**: Automated testing ensures consistent coverage and catches regressions early.

### Option 3: Accessibility Layer

Separate accessibility wrapper for components.

**Why not chosen**: Accessibility should be built-in, not optional add-on.

## Impact Analysis

### Breaking Changes

**Minimal** - Some components may need additional props for accessibility.

### Backward Compatibility

**Mostly compatible** - Accessibility features are additive.

### Performance Impact

**Negligible** - ARIA attributes lightweight, keyboard event handling fast.

### Bundle Size Impact

**Small increase** (~1-2KB) - Additional ARIA attributes, accessibility utilities.

### Migration Effort

**Medium** - Add accessibility tests, keyboard navigation, ARIA attributes.

## Migration Guide

### Step 1: Add Accessibility Tests

```typescript
import { axe } from 'jest-axe'

describe('Component Accessibility', () => {
    it('meets WCAG 2.2 AA standards', async () => {
        const { container } = render(<Component />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })
})
```

### Step 2: Add Keyboard Navigation

```typescript
const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
    }
}

return <button onClick={onClick} onKeyDown={onKeyDown}>...</button>
```

### Step 3: Add ARIA Attributes

```typescript
<div
    role="region"
    aria-labelledby={titleId}
    aria-describedby={descriptionId}
>
    <h2 id={titleId}>Title</h2>
    <p id={descriptionId}>Description</p>
</div>
```

## Implementation Plan

**Phase 1: Foundation (Weeks 1-2)**

- Set up jest-axe configuration
- Create accessibility test utilities
- Add accessibility testing to CI/CD
- Create accessibility documentation template
- Audit current components

**Phase 2: Core Components (Weeks 3-4)**

- Components: Button, Input, Checkbox, Radio, Switch, Select
- Add keyboard navigation, ARIA attributes, tests, documentation

**Phase 3: Interactive Components (Weeks 5-6)**

- Components: Modal, Dropdown, Menu, Tabs, Accordion, Tooltip
- Implement focus management, complex ARIA patterns

**Phase 4: Data Display Components (Weeks 7-8)**

- Components: Table, Card, List, ProgressBar, Carousel, Chart
- Ensure semantic HTML, add ARIA attributes

**Phase 5: Documentation & Training (Weeks 9-10)**

- Complete accessibility documentation
- Create guidelines and testing guide
- Conduct team training
- Create accessibility checklist
- Publish accessibility statement

## Risks and Mitigations

### Risk 1: Increased Development Time

**Likelihood**: Medium
**Impact**: Medium
**Mitigation**: Clear guidelines, examples, utilities, automated testing, gradual rollout

### Risk 2: Design Constraints

**Likelihood**: Medium
**Impact**: High
**Mitigation**: Work closely with design team, provide accessible design patterns, creative solutions

## Success Metrics

- [ ] 100% of components meet WCAG 2.2 AA standards
- [ ] 100% have keyboard navigation
- [ ] 100% have accessibility tests
- [ ] Zero jest-axe violations in CI/CD
- [ ] All components have accessibility documentation
- [ ] Accessibility audit score > 90%

## Unresolved Questions

1. Legacy browser support: IE11? (Most modern patterns don't support it)
2. Third-party components: How to handle accessibility?
3. Mobile accessibility: Separate RFC?
4. Automated tools: Integrate Lighthouse CI?
5. User testing: Plan for accessibility testing with assistive technology users?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0004](./0004-typography-system.md) - Typography System
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions

## References

- [WCAG 2.2 Overview](https://www.w3.org/WAI/WCAG22/quickref/) - Quick reference
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) - ARIA patterns
- [jest-axe](https://github.com/nickcolley/jest-axe) - Accessibility testing
- [Lighthouse Accessibility](https://developer.chrome.com/docs/lighthouse/accessibility/) - Automated audits
- [Inclusive Components](https://inclusive-components.design/) - Accessible patterns
- [Radix UI Accessibility](https://www.radix-ui.com/docs/primitives/overview/accessibility) - Component library
- [MUI Accessibility](https://mui.com/material-ui/guides/accessibility/) - Enterprise patterns
- [shadcn/ui Accessibility](https://ui.shadcn.com/docs/accessibility) - 2024 patterns

---
