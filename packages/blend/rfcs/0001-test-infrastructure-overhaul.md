# RFC 0001: Test Infrastructure Overhaul

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-08

## Summary

Establish modern testing infrastructure for the Blend Design System by consolidating test files, implementing environment-aware performance testing, and achieving 95% code coverage across all components.

## Motivation

### Problem Statement

- Only 4 of 43+ components have functional tests
- Tests split across multiple files (functional, accessibility, performance)
- Mixed testing patterns (fireEvent vs userEvent)
- No automated accessibility testing in CI/CD
- Inconsistent test organization

### Goals

- Achieve 95% code coverage
- Consolidate test files (3 → 1 per component)
- Modernize testing patterns (userEvent, semantic queries)
- Implement environment-aware performance testing
- Add automated accessibility testing in CI/CD

### Non-Goals

- Changing component APIs
- End-to-end testing with Playwright
- Visual regression testing
- React Server Components testing

## Proposed Solution

### Key Changes

1. **Unified Test Files**: Merge functional, accessibility, and performance tests
2. **Modern Testing Patterns**: Replace fireEvent with userEvent, use semantic queries
3. **Enhanced Test Utilities**: Form factories, responsive utilities, theme utilities
4. **Automated Accessibility**: CI/CD integration with jest-axe
5. **Environment-Aware Performance**: Adaptive thresholds for CI/local/production

### Technical Details

#### Unified Test File Structure

```
Button/
├── Button.test.tsx
└── README.md
```

#### Test File Template

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, assertPerformanceWithContext, measureRenderTime } from '@/test-utils'
import { ComponentPropsBuilder } from '@/test-utils/builders'
import { axe } from 'jest-axe'
import Component from '@/components/Component'

function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}

describe('Component', () => {
    let defaultProps: ComponentProps

    beforeEach(() => {
        defaultProps = new ComponentPropsBuilder().build()
    })

    describe('Rendering', () => {
        it('renders with default props', () => {
            render(<Component {...defaultProps} />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })
    })

    describe('User Interactions', () => {
        it('handles click events', async () => {
            const handleClick = vi.fn()
            const { user } = render(<Component onClick={handleClick} />)
            await user.click(screen.getByRole('button'))
            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })

    describe('Keyboard Navigation', () => {
        it('activates with Enter key', async () => {
            const handleClick = vi.fn()
            const { user } = render(<Component onClick={handleClick} />)
            await user.tab()
            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalled()
        })
    })

    describe('Accessibility', () => {
        it('meets WCAG 2.2 AA standards', async () => {
            const { container } = render(<Component {...defaultProps} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })

    describe('Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(<Component {...defaultProps} />)
            assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
        })
    })
})
```

#### Minimum Test Requirements

Every component MUST include:

- **Rendering**: Default props, variants, empty states, long content
- **User Interactions**: Click, keyboard navigation, form integration
- **State Management**: Controlled/uncontrolled behavior
- **Accessibility**: WCAG 2.2 AA compliance (jest-axe), ARIA attributes, keyboard nav
- **Performance**: Initial render, updates, cleanup
- **Edge Cases**: Empty data, special characters, large datasets

#### Test Factories

```typescript
// test-utils/factories/button-factory.ts
export const ButtonTestFactory = {
    primary: () => ({
        text: 'Primary Button',
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM,
    }),
    disabled: () => ({
        text: 'Disabled Button',
        disabled: true,
    }),
}
```

#### Modern Testing Patterns

```typescript
// ✅ Use userEvent (not fireEvent)
const { user } = render(<Component />)
await user.click(button)

// ✅ Use semantic queries (priority order)
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Email address')
screen.getByText('Welcome')
screen.getByTestId('submit-button') // Last resort

// ✅ Test behavior (not implementation)
it('displays initial value', () => {
    render(<Component initialValue="test" />)
    expect(screen.getByText('test')).toBeInTheDocument()
})
```

## Alternatives Considered

### Option 1: Keep Separate Test Files

Maintain current structure with separate `.test.tsx`, `.accessibility.test.tsx`, and `.performance.test.tsx` files.

**Why not chosen**: Single source of truth reduces file switching, easier to understand coverage.

### Option 2: Add Tests Without Standards

Incrementally add tests without establishing strict requirements.

**Why not chosen**: Inconsistent patterns become harder to maintain long-term.

### Option 3: Switch to Jest

Change from Vitest to Jest.

**Why not chosen**: Vitest is modern, fast, and working well. No compelling reason to switch.

## Impact Analysis

### Breaking Changes

**None** - Only affects test infrastructure, not component APIs.

### Backward Compatibility

**Fully compatible** - Existing component usage unchanged.

### Performance Impact

- **Test execution**: Slightly slower due to increased tests, offset by Vitest's parallel execution
- **Runtime**: No impact

### Bundle Size Impact

**Zero** - Test code not included in production bundles.

### Migration Effort

**Medium** (~10 weeks) - Refactor existing tests, write new tests for 39 components.

## Migration Guide

### Before: Split test files

```typescript
// Button.test.tsx
describe('Button', () => { /* ... */ })

// Button.accessibility.test.tsx
describe('Button Accessibility', () => {
    it('is accessible', async () => {
        const { container } = render(<Button />)
        expect(await axe(container)).toHaveNoViolations()
    })
})
```

### After: Unified test file

```typescript
// Button.test.tsx
describe('Button', () => {
    describe('Accessibility', () => {
        it('meets WCAG 2.2 AA standards', async () => {
            const { container } = render(<Button />)
            expect(await axe(container)).toHaveNoViolations()
        })
    })
})
```

## Implementation Plan

**Phase 1: Foundation (Weeks 1-2)**

- Update test utilities with new helpers
- Create test factories for common patterns
- Establish test file template
- Update TESTING_GUIDE.md

**Phase 2: High-Priority Components (Weeks 3-4)**

- Components: TextInput, TextArea, NumberInput, DropdownInput, MultiSelect, SingleSelect
- Write comprehensive tests
- Integrate accessibility checks
- Add performance benchmarks

**Phase 3: Medium-Priority Components (Weeks 5-6)**

- Components: Modal, Drawer, Popover, Alert, Snackbar, Breadcrumb, Tabs, Stepper

**Phase 4: Low-Priority Components (Weeks 7-8)**

- Components: Accordion, Avatar, Card, ProgressBar, Slider, Menu, Sidebar, DataTable, Charts

**Phase 5: Cleanup & Optimization (Week 9)**

- Refactor existing tests to new structure
- Remove redundant test files
- Fix flaky tests

**Phase 6: Documentation & Training (Week 10)**

- Complete test documentation
- Conduct team training
- Update contribution guidelines

## Risks and Mitigations

### Risk 1: Time Overrun

**Likelihood**: Medium
**Impact**: High
**Mitigation**: Prioritize high-impact components, use test factories, parallelize work

### Risk 2: Team Adoption

**Likelihood**: Medium
**Impact**: High
**Mitigation**: Comprehensive training, pair programming, clear documentation

## Success Metrics

- [ ] 95% code coverage
- [ ] 40/43 components (93%) have complete test suites
- [ ] 2,000+ total tests
- [ ] 100% test pass rate
- [ ] Full suite runs under 5 minutes

## Unresolved Questions

1. Timeline: 10 weeks vs compressed 6 weeks with larger team?
2. Priority: Which components based on usage metrics?
3. CI/CD: Enforce coverage thresholds immediately or gradually?

## Related RFCs

- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0007](./0007-component-refactoring-standards.md) - Component Refactoring Standards

## References

- [React Testing Library](https://testing-library.com/react) - Best practices
- [Vitest Documentation](https://vitest.dev/) - Test runner
- [jest-axe](https://github.com/nickcolley/jest-axe) - Accessibility testing
- [React 18+ Testing](https://react.dev/learn/writing-tests) - Official React docs
- [Kent C. Dodds Testing Blog](https://kentcdodds.com/blog/?tag=testing) - Best practices
- [Component Library Testing](https://kentcdodds.com/blog/component-library-testing) - Latest strategies

---

**Discussion**: [Link to GitHub issue or discussion]
