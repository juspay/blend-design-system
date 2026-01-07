# RFC 0001: Test Infrastructure Overhaul

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-07

## Summary

This RFC proposes a comprehensive overhaul of the Blend Design System's test infrastructure to establish industry-standard testing practices. The proposal includes consolidating test files, establishing minimum test requirements, modernizing testing patterns, and achieving 95% code coverage across all 43+ components in the library.

## Motivation

### Problem Statement

The Blend Design System currently faces several critical testing challenges:

1. **Inconsistent Coverage**: Only 4 out of 43+ components (9%) have functional tests. Most components only have accessibility tests.

2. **Fragmented Test Structure**: Tests are split across multiple files (`.test.tsx`, `.accessibility.test.tsx`, `.performance.test.tsx`) making it difficult to understand what's tested.

3. **Outdated Patterns**: Tests mix old and new patterns (fireEvent vs userEvent, manual DOM manipulation vs Testing Library queries), leading to fragile tests.

4. **Missing Critical Scenarios**: No tests for form integration, error states, edge cases, responsive behavior, dark mode, or internationalization.

5. **Performance Testing Limitations**: Performance tests don't consistently use environment-aware thresholds, causing CI failures.

6. **Poor Test Organization**: Lack of clear ownership and documentation makes it hard to understand what's tested and what's missing.

### Goals

- Achieve 95% code coverage across all components
- Establish unified test structure with comprehensive test suites
- Modernize testing patterns to follow React Testing Library best practices
- Implement environment-aware performance testing
- Create comprehensive test documentation for all components
- Reduce test maintenance burden through shared utilities and patterns

### Non-Goals

- This RFC does NOT propose changing the component APIs
- This RFC does NOT include end-to-end testing with Playwright (separate RFC)
- This RFC does NOT include visual regression testing (separate RFC)
- This RFC does NOT propose changing the testing framework (keeping Vitest)
- This RFC does NOT cover Server Components testing (React Server Components handled separately)
- This RFC does NOT include AI-assisted test generation workflows (future consideration)

## Proposed Solution

### Key Changes

1. **Consolidate Test Files**: Merge functional, accessibility, and performance tests into single test files per component
2. **Establish Minimum Test Requirements**: Define mandatory test categories for every component
3. **Modernize Testing Patterns**: Replace fireEvent with userEvent, use semantic queries
4. **Enhance Test Utilities**: Add form, responsive, and theme utilities with test factories
5. **Integrate Accessibility Checks**: Embed WCAG compliance checks within functional tests
6. **Standardize Performance Testing**: Environment-aware thresholds for all performance tests
7. **Improve Documentation**: Create README for each component's test suite

### Technical Details

#### 1. Unified Test File Structure

**Current Structure**:

```
Button/
├── Button.test.tsx
├── Button.accessibility.test.tsx
└── Button.performance.test.tsx
```

**Proposed Structure**:

```
Button/
├── Button.test.tsx
└── README.md
```

**Rationale**: Single source of truth reduces file switching, easier to understand coverage, better organization by feature.

#### 2. Test File Template

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@/test-utils'
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
        it('meets WCAG 2.1 AA standards', async () => {
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

    describe('Edge Cases', () => {
        it('handles empty data gracefully', () => {
            render(<Component data={[]} />)
            expect(screen.getByText(/no data/i)).toBeInTheDocument()
        })
    })
})
```

#### 3. Minimum Test Requirements

Every component MUST include tests for:

**A. Core Functionality**

- Renders with default props
- Renders with all variant combinations
- Handles all prop variations
- Renders empty/null states gracefully
- Handles long content appropriately

**B. User Interactions**

- All interactive elements are clickable
- Keyboard navigation (Tab, Enter, Space, Escape, Arrow keys)
- Mouse interactions (hover, click, double-click)
- Touch interactions (tap, swipe if applicable)

**C. Form Integration (if applicable)**

- Controlled component behavior
- Uncontrolled component behavior
- onChange/onInput callbacks
- Form validation integration
- React Hook Form/Formik integration

**D. States**

- Disabled state prevents interaction
- Loading state shows appropriate UI
- Error state displays error message
- Success/failure states work correctly

**E. Accessibility**

- WCAG 2.1 AA compliance (jest-axe)
- Proper ARIA attributes
- Full keyboard navigation
- Visible focus indicators
- Proper labels and descriptions
- Screen reader support

**F. Performance**

- Initial render within budget
- Efficient updates on prop changes
- Memory cleanup on unmount
- No layout thrashing

**G. Edge Cases**

- Empty data handling
- Special characters
- Large data sets
- Concurrent operations
- Rapid user interactions

#### 4. Enhanced Test Utilities

**New Utility: Form Utils**

```typescript
// test-utils/form-utils.ts
export const createFormControl = (props: FormControlProps) => ({
    name: props.name,
    control: props.control,
    defaultValue: props.defaultValue,
})

export const submitForm = async (formElement: HTMLElement) => {
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true })
    formElement.dispatchEvent(submitEvent)
}

export const validateField = async (fieldElement: HTMLElement) => {
    const blurEvent = new Event('blur', { bubbles: true })
    fieldElement.dispatchEvent(blurEvent)
}
```

**New Utility: Test Factories**

```typescript
// test-utils/factories/button-factory.ts
export const ButtonTestFactory = {
    primary: () => ({
        text: 'Primary Button',
        buttonType: ButtonType.PRIMARY,
        size: ButtonSize.MEDIUM
    }),

    secondary: () => ({
        text: 'Secondary Button',
        buttonType: ButtonType.SECONDARY,
        size: ButtonSize.MEDIUM
    }),

    disabled: () => ({
        text: 'Disabled Button',
        disabled: true
    }),

    withIcon: () => ({
        text: 'With Icon',
        leadingIcon: <MockIcon />
    }),

    loading: () => ({
        text: 'Loading',
        loading: true
    }),
}
```

**Usage Example**:

```typescript
describe('Button', () => {
    it('renders primary button correctly', () => {
        const props = ButtonTestFactory.primary()
        render(<Button {...props} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
```

#### 5. Modernized Testing Patterns

**Replace fireEvent with userEvent**:

```typescript
// ❌ Old pattern
import { fireEvent } from '@testing-library/react'
fireEvent.click(button)

// ✅ New pattern
const { user } = render(<Component />)
await user.click(button)
```

**Use semantic queries**:

```typescript
// Priority order:
// 1. getByRole (most robust)
screen.getByRole('button', { name: 'Submit' })

// 2. getByLabelText
screen.getByLabelText('Email address')

// 3. getByText
screen.getByText('Welcome')

// 4. getByTestId (last resort)
screen.getByTestId('submit-button')
```

**Test behavior, not implementation**:

```typescript
// ❌ Bad - Tests implementation
it('calls useState with initial value', () => {
    // Checking internal state
})

// ✅ Good - Tests behavior
it('displays initial value when mounted', () => {
    render(<Component initialValue="test" />)
    expect(screen.getByText('test')).toBeInTheDocument()
})
```

#### 6. Integrated Accessibility Testing

```typescript
describe('Component Accessibility', () => {
    it('is accessible with default props', async () => {
        const { container } = render(<Component {...defaultProps} />)
        expect(await axe(container)).toHaveNoViolations()
    })

    it('is accessible when disabled', async () => {
        const { container } = render(<Component {...defaultProps} disabled />)
        expect(await axe(container)).toHaveNoViolations()
    })

    it('maintains keyboard focus', async () => {
        const { user } = render(<Component {...defaultProps} />)
        await user.tab()
        expect(document.activeElement).toBe(screen.getByRole('button'))
    })
})
```

#### 7. Standardized Performance Testing

```typescript
function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}

describe('Component Performance', () => {
    it('renders quickly with default props', async () => {
        const renderTime = await measureRenderTime(<Component {...defaultProps} />)
        assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
    })

    it('updates efficiently on prop change', async () => {
        const { rerender } = render(<Component {...defaultProps} />)
        const updateTime = await measureRenderTime(
            rerender(<Component {...defaultProps} value="updated" />)
        )
        assertPerformanceWithContext(updateTime, 'render', 'simple', getCurrentTestName())
    })
})
```

### API Changes

No API changes to components. Only test infrastructure changes.

### Example Usage

```typescript
// Example: Complete test file for a Button component
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, assertPerformanceWithContext, measureRenderTime } from '@/test-utils'
import { ButtonTestFactory } from '@/test-utils/factories/button-factory'
import { axe } from 'jest-axe'
import Button from '@/components/Button/Button'

function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}

describe('Button', () => {
    describe('Rendering', () => {
        it('renders primary button', () => {
            const props = ButtonTestFactory.primary()
            render(<Button {...props} />)
            expect(screen.getByRole('button')).toHaveTextContent('Primary Button')
        })

        it('renders with icon', () => {
            const props = ButtonTestFactory.withIcon()
            render(<Button {...props} />)
            expect(screen.getByRole('button')).toBeInTheDocument()
            expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
        })
    })

    describe('User Interactions', () => {
        it('calls onClick when clicked', async () => {
            const handleClick = vi.fn()
            const { user } = render(<Button text="Click me" onClick={handleClick} />)
            await user.click(screen.getByRole('button'))
            expect(handleClick).toHaveBeenCalledTimes(1)
        })

        it('does not call onClick when disabled', async () => {
            const handleClick = vi.fn()
            const { user } = render(<Button text="Disabled" disabled onClick={handleClick} />)
            await user.click(screen.getByRole('button'))
            expect(handleClick).not.toHaveBeenCalled()
        })
    })

    describe('Accessibility', () => {
        it('meets WCAG standards', async () => {
            const { container } = render(<Button text="Accessible" />)
            expect(await axe(container)).toHaveNoViolations()
        })

        it('has proper keyboard navigation', async () => {
            const handleClick = vi.fn()
            const { user } = render(<Button text="Keyboard" onClick={handleClick} />)
            await user.tab()
            await user.keyboard('{Enter}')
            expect(handleClick).toHaveBeenCalled()
        })
    })

    describe('Performance', () => {
        it('renders within budget', async () => {
            const renderTime = await measureRenderTime(<Button text="Quick" />)
            assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
        })
    })
})
```

## Alternatives Considered

### Option 1: Keep Separate Test Files

**Description**: Maintain current structure with separate `.test.tsx`, `.accessibility.test.tsx`, and `.performance.test.tsx` files.

**Pros:**

- Smaller individual files
- Clear separation of concerns
- Can run specific test types independently

**Cons:**

- Difficult to understand complete test coverage
- More file switching during development
- Redundant setup code across files
- Harder to see relationships between tests

**Why not chosen**: The benefits of consolidation (single source of truth, easier navigation, reduced duplication) outweigh the advantages of separation.

### Option 2: Add Tests Gradually Without Standards

**Description**: Incrementally add tests to existing components without establishing strict standards or templates.

**Pros:**

- Less upfront effort
- Can adapt to each component's needs
- Faster to start

**Cons:**

- Inconsistent test patterns
- Harder to maintain long-term
- No clear baseline for quality
- Slower overall progress

**Why not chosen**: Without standards, tests would become inconsistent and harder to maintain, defeating the purpose of the overhaul.

### Option 3: Use Different Testing Framework

**Description**: Switch from Vitest to Jest or another testing framework.

**Pros:**

- Potentially better ecosystem support
- More mature tooling

**Cons:**

- Significant migration cost
- Loss of Vitest's performance benefits
- Team already familiar with Vitest
- Current setup works well

**Why not chosen**: Vitest is modern, fast, and working well. No compelling reason to switch.

## Impact Analysis

### Breaking Changes

**None**. This RFC only affects test infrastructure, not component APIs or public interfaces.

### Backward Compatibility

**Fully backward compatible**. Existing component usage remains unchanged. Only test files are affected.

### Performance Impact

- **Test Execution**: Slightly slower due to increased test count, but offset by Vitest's parallel execution
- **Build Time**: No impact on production builds
- **Runtime**: No impact on runtime performance

### Bundle Size Impact

**Zero impact**. Test code is not included in production bundles.

### Developer Experience

**Significantly improved**:

- Clearer test structure reduces confusion
- Test factories speed up test writing
- Better documentation improves onboarding
- Consistent patterns reduce cognitive load
- Comprehensive coverage increases confidence

### Migration Effort

**Medium effort** required:

- Existing test files need refactoring
- New tests need to be written for 39 components
- Test utilities need to be enhanced
- Documentation needs to be created

Estimated effort: ~10 weeks for full migration (see Implementation Plan).

## Migration Guide

### For Component Developers

**Before**: Writing tests across multiple files

```typescript
// Button.test.tsx
describe('Button', () => {
    it('renders', () => {
        /* ... */
    })
})

// Button.accessibility.test.tsx
describe('Button Accessibility', () => {
    it('is accessible', async () => {
        // ... axe tests
    })
})

// Button.performance.test.tsx
describe('Button Performance', () => {
    it('renders quickly', async () => {
        // ... performance tests
    })
})
```

**After**: Writing tests in a single file

```typescript
// Button.test.tsx
describe('Button', () => {
    describe('Rendering', () => {
        it('renders', () => { /* ... */ })
    })

    describe('Accessibility', () => {
        it('is accessible', async () => {
            const { container } = render(<Button />)
            expect(await axe(container)).toHaveNoViolations()
        })
    })

    describe('Performance', () => {
        it('renders quickly', async () => {
            const renderTime = await measureRenderTime(<Button />)
            assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
        })
    })
})
```

### Automatic Migration

**Codemods** can be created for:

- Merging test files
- Replacing fireEvent with userEvent
- Updating import statements
- Adding getCurrentTestName helper

Estimated effort: 1-2 weeks to develop codemods.

## Implementation Plan

### Phase 1: Foundation (Week 1-2)

**Duration**: 2 weeks

**Tasks**:

- [x] Create RFC and get team approval
- [ ] Update test utilities with new helpers (form-utils, responsive-utils, theme-utils)
- [ ] Create test factories for common patterns (button, input, select, etc.)
- [ ] Establish test file template
- [ ] Update TESTING_GUIDE.md with new standards
- [ ] Create component test README template

**Deliverables**:

- Enhanced test-utils package
- Updated testing guide
- Test templates and factories

### Phase 2: High-Priority Components (Week 3-4)

**Duration**: 2 weeks

**Components**: TextInput, TextArea, NumberInput, DropdownInput, MultiSelect, SingleSelect

**Tasks per component**:

- [ ] Write comprehensive functional tests
- [ ] Integrate accessibility checks
- [ ] Add performance benchmarks
- [ ] Test form integration
- [ ] Create test documentation (README.md)

**Deliverables**:

- 6 components with complete test suites
- ~400 new tests

### Phase 3: Medium-Priority Components (Week 5-6)

**Duration**: 2 weeks

**Components**: Modal, Drawer, Popover, Alert, Snackbar, Breadcrumb, Tabs, Stepper

**Tasks per component**:

- [ ] Write comprehensive functional tests
- [ ] Integrate accessibility checks
- [ ] Add performance benchmarks
- [ ] Test component interactions
- [ ] Create test documentation

**Deliverables**:

- 8 components with complete test suites
- ~500 new tests

### Phase 4: Low-Priority Components (Week 7-8)

**Duration**: 2 weeks

**Components**: Accordion, Avatar, Card, ProgressBar, Slider, Menu, Sidebar, DataTable, Charts, and others

**Tasks per component**:

- [ ] Write comprehensive functional tests
- [ ] Integrate accessibility checks
- [ ] Add performance benchmarks
- [ ] Create test documentation

**Deliverables**:

- 15+ components with complete test suites
- ~800 new tests

### Phase 5: Cleanup & Optimization (Week 9)

**Duration**: 1 week

**Tasks**:

- [ ] Refactor Button, Checkbox, Radio, Switch, Tooltip tests to new structure
- [ ] Remove redundant accessibility test files
- [ ] Consolidate split test files where appropriate
- [ ] Update all tests to use new utilities
- [ ] Remove deprecated patterns
- [ ] Fix flaky tests

**Deliverables**:

- Unified test structure
- Updated existing tests
- Removed redundancy

### Phase 6: Documentation & Training (Week 10)

**Duration**: 1 week

**Tasks**:

- [ ] Complete test documentation for all components
- [ ] Create video walkthrough of new testing patterns
- [ ] Conduct team training session
- [ ] Update contribution guidelines
- [ ] Create troubleshooting guide

**Deliverables**:

- Complete documentation
- Training materials
- Updated guidelines

## Risks and Mitigations

### Risk 1: Time Overrun

**Likelihood**: Medium

**Impact**: High

**Mitigation**:

- Prioritize high-impact components first
- Defer low-risk components if timeline extends
- Use test factories to accelerate test writing
- Parallelize work across team members

### Risk 2: Team Adoption

**Likelihood**: Medium

**Impact**: High

**Mitigation**:

- Provide comprehensive training
- Pair programming sessions for new patterns
- Clear documentation with examples
- Code reviews to enforce standards
- Gradual rollout to minimize disruption

### Risk 3: Maintenance Burden

**Likelihood**: Low

**Impact**: Medium

**Mitigation**:

- Automate where possible
- Use shared utilities and factories
- Keep tests simple and focused
- Regular test maintenance schedule
- Continuous monitoring of test health

### Risk 4: Performance Degradation

**Likelihood**: Low

**Impact**: Medium

**Mitigation**:

- Optimize test suite with parallel execution
- Implement test caching
- Use selective test execution during development
- Monitor test execution times
- Keep test isolation strong

## Success Metrics

We will measure success through:

- [ ] **Coverage**: 95% code coverage achieved
- [ ] **Completeness**: 40 out of 43 components (93%) have complete test suites
- [ ] **Test Count**: 2,000+ total tests
- [ ] **Pass Rate**: 100% test pass rate
- [ ] **Flaky Tests**: 0 flaky tests
- [ ] **Execution Time**: Full test suite runs under 5 minutes
- [ ] **Documentation**: All components have test READMEs
- [ ] **Team Adoption**: All team members trained on new patterns

## Unresolved Questions

1. **Timeline Flexibility**: Should we compress the timeline to 6 weeks with larger team, or extend to 12 weeks for quality?

2. **Component Priority**: Are there specific components that should be prioritized based on usage metrics?

3. **Test Factories Scope**: Which components need test factories, and can we auto-generate them?

4. **CI/CD Integration**: Should we block PRs based on coverage thresholds immediately or gradually ramp up?

5. **Performance Budgets**: Should we enforce performance budgets strictly or use them as warnings initially?

6. **Team Allocation**: How many developers should work on this project simultaneously?

## Related RFCs

- [RFC 0002](./0002-component-testing-standards.md) - Component Testing Standards
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0004](./0004-typography-system.md) - Typography System
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle Size Optimization
- [RFC 0007](./0007-component-refactoring-standards.md) - Component Refactoring Standards

## References

### Internal Documentation

- [TESTING_GUIDE.md](../__tests__/TESTING_GUIDE.md) - Current testing practices
- [TEST_CLEANUP_STRATEGY.md](../__tests__/TEST_CLEANUP_STRATEGY.md) - Detailed cleanup strategy
- [PERFORMANCE_TESTING_GUIDE.md](../__tests__/PERFORMANCE_TESTING_GUIDE.md) - Performance testing guide

### External Resources

- [React Testing Library Documentation](https://testing-library.com/react) - Best practices for testing React components
- [Vitest Documentation](https://vitest.dev/) - Test runner documentation
- [jest-axe Documentation](https://github.com/nickcolley/jest-axe) - Accessibility testing
- [Web Content Accessibility Guidelines (WCAG 2.1)](https://www.w3.org/WAI/WCAG21/quickref/) - Accessibility standards
- [Testing JavaScript Book](https://testingjavascript.com/) - Comprehensive testing guide
- [Kent C. Dodds Testing Blog](https://kentcdodds.com/blog/?tag=testing) - Testing best practices

### Industry Standards (2024-2025)

- [Modern Component Library Testing](https://kentcdodds.com/blog/component-library-testing) - Latest testing strategies
- [React 18+ Testing Patterns](https://react.dev/learn/writing-tests) - Official React testing documentation
- [Vitest Best Practices 2024](https://vitest.dev/guide/why.html) - Modern Vitest patterns
- [Testing Library v14+ Updates](https://testing-library.com/docs/react-testing-library/intro/) - Latest RTL features
- [Playwright Component Testing](https://playwright.dev/docs/test-components) - Modern component testing approach
- [Vitest UI Testing](https://vitest.dev/guide/ui.html) - Interactive test debugging
- [GitHub Actions Testing Best Practices](https://docs.github.com/en/actions/automating-builds-and-tests/about-continuous-integration) - CI/CD standards
- [Radix UI Testing Approach](https://www.radix-ui.com/docs/primitives/utilities/testing) - Component library testing
- [MUI Testing Guidelines](https://mui.com/material-ui/guides/testing/) - Enterprise component library testing
- [Chakra UI Testing Best Practices](https://chakra-ui.com/guides/testing) - Modern component testing
- [shadcn/ui Testing Approach](https://ui.shadcn.com/docs/testing) - 2024 component library patterns
- [Testing with React 19](https://react.dev/learn/testing-your-code) - Latest React testing patterns
- [Component-Driven Development](https://www.componentdriven.org/) - Modern development workflow
- [Open WCAG Testing Guide](https://www.w3.org/WAI/test-evaluate/test-planning/) - Accessibility testing standards
- [Performance Testing Standards](https://web.dev/performance-testing/) - Modern performance testing

## Appendix

### Appendix A: Current Test Coverage Snapshot

As of January 2026:

| Component Category | Total   | Functional Tests | Accessibility Tests | Performance Tests | Complete   |
| ------------------ | ------- | ---------------- | ------------------- | ----------------- | ---------- |
| Form Controls      | 12      | 3 (25%)          | 12 (100%)           | 3 (25%)           | 3 (25%)    |
| Layout             | 8       | 0 (0%)           | 8 (100%)            | 0 (0%)            | 0 (0%)     |
| Feedback           | 6       | 0 (0%)           | 6 (100%)            | 0 (0%)            | 0 (0%)     |
| Navigation         | 5       | 0 (0%)           | 5 (100%)            | 0 (0%)            | 0 (0%)     |
| Data Display       | 4       | 0 (0%)           | 4 (100%)            | 0 (0%)            | 0 (0%)     |
| Overlay            | 3       | 0 (0%)           | 3 (100%)            | 0 (0%)            | 0 (0%)     |
| Other              | 5+      | 1 (20%)          | 5+ (100%)           | 1 (20%)           | 1 (20%)    |
| **TOTAL**          | **43+** | **4 (9%)**       | **43+ (100%)**      | **4 (9%)**        | **4 (9%)** |

### Appendix B: Component Priority Matrix

**High Priority** (Critical form components):

- TextInput, TextArea, NumberInput, DropdownInput, MultiSelect, SingleSelect

**Medium Priority** (Frequently used components):

- Modal, Drawer, Popover, Alert, Snackbar, Breadcrumb, Tabs, Stepper

**Low Priority** (Simple/less used components):

- Accordion, Avatar, Card, ProgressBar, Slider, Menu, Sidebar, DataTable, Charts

### Appendix C: Test Factory Examples

```typescript
// test-utils/factories/input-factory.ts
export const InputTestFactory = {
    text: () => ({
        label: 'Text Input',
        type: 'text',
        placeholder: 'Enter text',
    }),

    email: () => ({
        label: 'Email',
        type: 'email',
        placeholder: 'email@example.com',
    }),

    password: () => ({
        label: 'Password',
        type: 'password',
        placeholder: '••••••••',
    }),

    disabled: () => ({
        label: 'Disabled',
        disabled: true,
    }),

    withError: () => ({
        label: 'With Error',
        error: 'This field is required',
    }),
}

// test-utils/factories/modal-factory.ts
export const ModalTestFactory = {
    basic: () => ({
        isOpen: true,
        title: 'Modal Title',
        children: <p>Modal content</p>,
    }),

    withActions: () => ({
        isOpen: true,
        title: 'Confirm Action',
        children: <p>Are you sure?</p>,
        actions: (
            <>
                <button>Cancel</button>
                <button>Confirm</button>
            </>
        ),
    }),
}
```

---

**Discussion**: [Link to GitHub issue or discussion]
