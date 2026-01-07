# RFC 0002: Component Testing Standards

**Status**: Draft

**Authors**: Blend Design System Team

**Created**: 2026-01-07

**Updated**: 2026-01-07

## Summary

This RFC establishes comprehensive testing standards for all components in the Blend Design System. It defines the testing philosophy, mandatory test categories, test organization patterns, and best practices to ensure consistent, maintainable, and effective tests across the library.

## Motivation

### Problem Statement

Currently, component testing lacks standardized patterns and guidelines:

1. **Inconsistent Approaches**: Different developers use different testing patterns, making code reviews difficult
2. **Undefined Requirements**: No clear minimum requirements for what must be tested
3. **Mixed Patterns**: Tests mix old and new patterns (fireEvent vs userEvent, manual queries vs semantic queries)
4. **Poor Organization**: Test structure varies widely between components
5. **Missing Categories**: Many test categories (edge cases, integration, etc.) are consistently overlooked
6. **Unclear Expectations**: Developers don't know what constitutes a "complete" test suite

### Goals

- Establish clear, enforceable testing standards for all components
- Define minimum test requirements to ensure comprehensive coverage
- Provide consistent patterns and best practices
- Create guidelines for test organization and structure
- Enable efficient code reviews through standardized approaches
- Reduce cognitive load when writing or reviewing tests

### Non-Goals

- This RFC does NOT prescribe specific implementation details (those vary by component)
- This RFC does NOT cover E2E testing (handled separately)
- This RFC does NOT define specific test counts or coverage percentages (covered in RFC 0001)
- This RFC does NOT prescribe which testing tools to use (keeping Vitest, RTL, etc.)
- This RFC does NOT cover React Server Components (RSC) testing (separate consideration)
- This RFC does NOT include visual regression testing workflows (separate RFC)
- This RFC does NOT cover AI-assisted test generation (future exploration)

## Proposed Solution

### 1. Testing Philosophy

#### Core Principles

**Principle 1: Test Behavior, Not Implementation**

Tests should focus on what the component does from a user's perspective, not how it achieves it.

```typescript
// ❌ BAD: Tests implementation details
it('uses useState hook', () => {
    // Cannot verify this anyway, and shouldn't matter
})

it('has a state variable named isOpen', () => {
    // Implementation detail
})

// ✅ GOOD: Tests user-facing behavior
it('opens when the trigger is clicked', async () => {
    const { user } = render(<Dialog />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeVisible()
})
```

**Principle 2: Test Like a User**

Simulate real user interactions rather than programmatic events.

```typescript
// ❌ BAD: Programmatic event dispatching
fireEvent.click(button)
fireEvent.change(input, { target: { value: 'test' } })

// ✅ GOOD: User-like interactions
await user.click(button)
await user.type(input, 'test')
```

**Principle 3: Use Semantic Queries**

Prioritize queries that reflect how users perceive the UI.

```typescript
// Query priority (highest to lowest):
// 1. getByRole - Most robust, mirrors assistive tech
screen.getByRole('button', { name: 'Submit' })

// 2. getByLabelText - Directly tied to accessibility
screen.getByLabelText('Email address')

// 3. getByText - Matches visible text
screen.getByText('Welcome back')

// 4. getByTestId - Last resort, implementation-specific
screen.getByTestId('submit-button')
```

**Principle 4: One Assertion Per Test (Mostly)**

Each test should verify one behavior, though multiple related assertions are acceptable.

```typescript
// ❌ BAD: Tests multiple unrelated behaviors
it('handles user interactions', async () => {
    const handleClick = vi.fn()
    const handleChange = vi.fn()
    const { user } = render(<Component onClick={handleClick} onChange={handleChange} />)
    await user.click(button)
    await user.type(input, 'test')
    expect(handleClick).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalled()
})

// ✅ GOOD: One behavior per test
it('handles click events', async () => {
    const handleClick = vi.fn()
    const { user } = render(<Component onClick={handleClick} />)
    await user.click(button)
    expect(handleClick).toHaveBeenCalled()
})

it('handles input changes', async () => {
    const handleChange = vi.fn()
    const { user } = render(<Component onChange={handleChange} />)
    await user.type(input, 'test')
    expect(handleChange).toHaveBeenCalledWith('test')
})
```

**Principle 5: Arrange-Act-Assert Pattern**

Structure tests clearly: arrange the state, act on the component, assert the outcome.

```typescript
it('submits form with valid data', async () => {
    // ARRANGE: Set up the component and state
    const handleSubmit = vi.fn()
    const { user } = render(<Form onSubmit={handleSubmit} />)

    // ACT: Perform user actions
    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    // ASSERT: Verify the result
    expect(handleSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com'
    })
})
```

### 2. Mandatory Test Categories

Every component MUST include tests for the following categories:

#### Category 1: Rendering Tests

**Purpose**: Verify the component renders correctly with various configurations

**Required Tests**:

- [ ] Renders with default props
- [ ] Renders with all variant combinations (types, sizes, themes)
- [ ] Renders with children/content
- [ ] Renders when empty/null content is provided
- [ ] Renders with long content (text truncation, scrolling)
- [ ] Renders with special characters
- [ ] Renders with HTML content (if applicable)

**Example**:

```typescript
describe('Rendering', () => {
    it('renders with default props', () => {
        render(<Button />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders with all button types', () => {
        ButtonType.forEach((type) => {
            render(<Button buttonType={type} text={type} />)
            expect(screen.getByRole('button', { name: type })).toBeInTheDocument()
        })
    })

    it('renders empty state gracefully', () => {
        render(<List items={[]} />)
        expect(screen.getByText('No items')).toBeInTheDocument()
    })
})
```

#### Category 2: User Interaction Tests

**Purpose**: Verify the component responds correctly to user actions

**Required Tests**:

- [ ] Click interactions (buttons, links, etc.)
- [ ] Input interactions (typing, selection, etc.)
- [ ] Keyboard navigation (Tab, Enter, Space, Escape, Arrow keys)
- [ ] Mouse interactions (hover, drag-and-drop if applicable)
- [ ] Touch interactions (tap, swipe if applicable)
- [ ] Form submission (if applicable)
- [ ] Rapid/repeated interactions (debouncing, throttling)

**Example**:

```typescript
describe('User Interactions', () => {
    it('calls onClick when clicked', async () => {
        const handleClick = vi.fn()
        const { user } = render(<Button onClick={handleClick} />)
        await user.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('handles keyboard activation', async () => {
        const handleActivate = vi.fn()
        const { user } = render(<Button onClick={handleActivate} />)

        await user.tab()
        await user.keyboard('{Enter}')
        expect(handleActivate).toHaveBeenCalled()
    })

    it('debounces rapid clicks', async () => {
        const handleClick = vi.fn()
        const { user } = render(<Button onClick={handleClick} debounceMs={500} />)

        const button = screen.getByRole('button')
        await user.click(button)
        await user.click(button)
        await user.click(button)

        await waitFor(() => {
            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })
})
```

#### Category 3: State Management Tests

**Purpose**: Verify the component manages state correctly

**Required Tests**:

- [ ] Controlled component behavior (if applicable)
- [ ] Uncontrolled component behavior (if applicable)
- [ ] Default value handling
- [ ] Value updates
- [ ] Reset/clear functionality
- [ ] State persistence across re-renders

**Example**:

```typescript
describe('State Management', () => {
    it('works as controlled component', async () => {
        const handleChange = vi.fn()
        const { user } = render(<Input value="initial" onChange={handleChange} />)

        await user.type(screen.getByRole('textbox'), ' updated')
        expect(handleChange).toHaveBeenCalledWith('initial updated')
    })

    it('works as uncontrolled component', async () => {
        render(<Input defaultValue="initial" />)
        const input = screen.getByRole('textbox')

        await user.type(input, ' updated')
        expect(input).toHaveValue('initial updated')
    })
})
```

#### Category 4: Form Integration Tests

**Purpose**: Verify the component integrates properly with forms

**Required Tests** (for form components):

- [ ] onChange/onInput callbacks
- [ ] onBlur/onFocus callbacks
- [ ] Required field validation
- [ ] Pattern/validation constraint handling
- [ ] Error message display
- [ ] Disabled state in form context
- [ ] Integration with form libraries (React Hook Form, Formik)

**Example**:

```typescript
describe('Form Integration', () => {
    it('validates required field', async () => {
        const { result } = renderHook(() => useForm({
            mode: 'onBlur'
        }))

        const { user } = render(
            <form onSubmit={result.current.handleSubmit(() => {})}>
                <Controller
                    name="email"
                    control={result.current.control}
                    rules={{ required: 'Email is required' }}
                    render={({ field }) => <Input {...field} />}
                />
                <button type="submit">Submit</button>
            </form>
        )

        await user.click(screen.getByRole('button', { name: 'Submit' }))
        expect(screen.getByText('Email is required')).toBeInTheDocument()
    })
})
```

#### Category 5: Accessibility Tests

**Purpose**: Verify the component is accessible to all users

**Required Tests**:

- [ ] WCAG 2.1 AA compliance (jest-axe)
- [ ] Proper ARIA roles and attributes
- [ ] Keyboard navigation and focus management
- [ ] Visible focus indicators
- [ ] Proper labels and descriptions
- [ ] Screen reader announcements (if applicable)
- [ ] Color contrast (if applicable)
- [ ] Touch target size (minimum 44x44px for touch)

**Example**:

```typescript
describe('Accessibility', () => {
    it('meets WCAG 2.1 AA standards', async () => {
        const { container } = render(<Button text="Accessible" />)
        const results = await axe(container)
        expect(results).toHaveNoViolations()
    })

    it('has proper ARIA attributes when disabled', () => {
        render(<Button text="Disabled" disabled />)
        const button = screen.getByRole('button')
        expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('maintains keyboard focus', async () => {
        const { user } = render(<Button text="Focus" />)
        await user.tab()
        expect(document.activeElement).toBe(screen.getByRole('button'))
    })
})
```

#### Category 6: Performance Tests

**Purpose**: Verify the component performs efficiently

**Required Tests**:

- [ ] Initial render performance (using environment-aware thresholds)
- [ ] Re-render performance on prop changes
- [ ] Interaction performance (click, type, etc.)
- [ ] Memory cleanup on unmount
- [ ] Large dataset handling (if applicable)

**Example**:

```typescript
describe('Performance', () => {
    it('renders within performance budget', async () => {
        const renderTime = await measureRenderTime(<Button text="Quick" />)
        assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
    })

    it('updates efficiently on prop change', async () => {
        const { rerender } = render(<Button text="Initial" />)
        const updateTime = await measureRenderTime(
            rerender(<Button text="Updated" />)
        )
        assertPerformanceWithContext(updateTime, 'render', 'simple', getCurrentTestName())
    })
})
```

#### Category 7: Edge Case Tests

**Purpose**: Verify the component handles unusual scenarios gracefully

**Required Tests**:

- [ ] Empty/null data handling
- [ ] Very long text/content handling
- [ ] Special characters and unicode
- [ ] Large datasets (if applicable)
- [ ] Concurrent operations
- [ ] Rapid state changes
- [ ] Boundary conditions (min/max values, limits)
- [ ] Error states and recovery

**Example**:

```typescript
describe('Edge Cases', () => {
    it('handles empty data gracefully', () => {
        render(<List items={[]} />)
        expect(screen.getByText(/no items/i)).toBeInTheDocument()
    })

    it('handles very long text', () => {
        const longText = 'A'.repeat(1000)
        render(<Text>{longText}</Text>)
        expect(screen.getByText(longText)).toBeInTheDocument()
    })

    it('handles special characters', () => {
        render(<Input value="<script>alert('xss')</script>" />)
        expect(screen.getByDisplayValue(/script/i)).toBeInTheDocument()
    })
})
```

### 3. Test Organization Standards

#### File Structure

Each component should have a single test file organized with describe blocks:

```typescript
describe('ComponentName', () => {
    describe('Rendering', () => {
        // Rendering tests
    })

    describe('User Interactions', () => {
        // Interaction tests
    })

    describe('State Management', () => {
        // State tests
    })

    describe('Form Integration', () => {
        // Form tests (if applicable)
    })

    describe('Accessibility', () => {
        // Accessibility tests
    })

    describe('Performance', () => {
        // Performance tests
    })

    describe('Edge Cases', () => {
        // Edge case tests
    })
})
```

#### Test Naming Convention

Use descriptive test names that follow the pattern:

```
it('[verb] [what] when [condition]', () => {})
```

**Examples**:

- ✅ `'renders with default props'`
- ✅ `'calls onClick when clicked'`
- ✅ `'displays error message when validation fails'`
- ✅ `'prevents submission when form is invalid'`

❌ Bad examples:

- ❌ `'it works'`
- ❌ `'test 1'`
- ❌ `'button'`
- ❌ `'should render'`

### 4. Test Utilities and Helpers

#### Using Test Factories

Leverage pre-configured test factories for common scenarios:

```typescript
import { ButtonTestFactory } from '@/test-utils/factories/button-factory'

describe('Button', () => {
    it('renders primary button correctly', () => {
        const props = ButtonTestFactory.primary()
        render(<Button {...props} />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})
```

#### Using Builder Pattern

Use builders for complex prop configurations:

```typescript
import { ComponentPropsBuilder } from '@/test-utils/builders'

describe('Component', () => {
    it('renders with custom configuration', () => {
        const props = new ComponentPropsBuilder()
            .withVariant('primary')
            .withSize('large')
            .withDisabled()
            .build()

        render(<Component {...props} />)
    })
})
```

### 5. Async Testing Best Practices

#### Waiting for Elements

Use async queries and waitFor for dynamic content:

```typescript
// ✅ GOOD: Use findBy for async elements
it('shows loading then success message', async () => {
    const { user } = render(<AsyncComponent />)
    await user.click(screen.getByRole('button'))

    // Wait for success message to appear
    expect(await screen.findByText('Success!')).toBeInTheDocument()
})

// ✅ GOOD: Use waitFor for custom conditions
it('waits for data to load', async () => {
    render(<DataFetcher />)
    await waitFor(() => {
        expect(screen.getByText('Data loaded')).toBeInTheDocument()
    })
})
```

#### Avoid Arbitrary Delays

Never use setTimeout with fixed delays:

```typescript
// ❌ BAD: Arbitrary delay
it('shows modal', async () => {
    render(<Modal />)
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(screen.getByRole('dialog')).toBeVisible()
})

// ✅ GOOD: Wait for condition
it('shows modal', async () => {
    render(<Modal />)
    expect(await screen.findByRole('dialog')).toBeVisible()
})
```

### 6. Mocking Guidelines

#### Mock External Dependencies

Mock external services, not component internals:

```typescript
// ✅ GOOD: Mock external API
vi.mock('@/services/api', () => ({
    fetchData: vi.fn().mockResolvedValue({ data: 'test' }),
}))

// ❌ BAD: Mock component internals
vi.spyOn(Component.prototype, 'internalMethod')
```

#### Mock Third-Party Components

Simplify third-party components to essential behavior:

```typescript
// Mock complex third-party component
vi.mock('@third-party/chart', () => ({
    Chart: ({ data }: { data: any[] }) => (
        <div data-testid="chart">{data.length} points</div>
    )
}))
```

### 7. Test Isolation

Each test should be independent and not rely on other tests:

```typescript
// ❌ BAD: Tests depend on each other
let component: HTMLElement

it('renders initially', () => {
    component = render(<Component />).container
})

it('updates on click', () => {
    fireEvent.click(component.querySelector('button')!)
})

// ✅ GOOD: Each test is independent
it('renders initially', () => {
    render(<Component />)
    expect(screen.getByRole('button')).toBeInTheDocument()
})

it('updates on click', async () => {
    const { user } = render(<Component />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Updated')).toBeInTheDocument()
})
```

## Alternatives Considered

### Option 1: Strict Test Count Requirements

**Description**: Require a specific number of tests per component (e.g., minimum 20 tests).

**Pros**:

- Easy to measure compliance
- Ensures baseline coverage

**Cons**:

- Encourages low-quality tests just to meet quotas
- Doesn't account for component complexity differences
- Gaming the system possible

**Why not chosen**: Quality matters more than quantity. Categories-based approach is more meaningful.

### Option 2: Prescriptive Test Structure

**Description**: Require exact test structure with specific test names and order.

**Pros**:

- Consistent across all components
- Easy to review

**Cons**:

- Too rigid for diverse component types
- Doesn't allow for component-specific needs
- Reduces developer autonomy

**Why not chosen**: Balance between structure and flexibility is better.

### Option 3: Minimal Standards

**Description**: Only require basic rendering and interaction tests.

**Pros**:

- Faster to implement
- Lower barrier to entry

**Cons**:

- Insufficient coverage for edge cases
- Doesn't ensure quality
- Defeats purpose of comprehensive testing

**Why not chosen**: Comprehensive standards are necessary for a reliable library.

## Impact Analysis

### Breaking Changes

**None**. This RFC establishes standards without changing existing APIs.

### Backward Compatibility

**Fully backward compatible**. Existing components and tests remain functional.

### Developer Experience

**Significantly improved**:

- Clear expectations reduce ambiguity
- Consistent patterns speed up development
- Better code reviews with standard guidelines
- Easier onboarding for new team members

### Maintenance Effort

**Reduced long-term**:

- Standardized patterns are easier to maintain
- Shared utilities reduce duplication
- Clear documentation helps with updates

## Migration Guide

### For Existing Tests

Gradually update existing tests to conform to new standards:

1. **Review test coverage** against mandatory categories
2. **Add missing test categories**
3. **Update test patterns** (fireEvent → userEvent, etc.)
4. **Organize tests** with proper describe blocks
5. **Update test names** to follow convention

### For New Tests

Follow the standards from the start:

1. Use the test file template
2. Include all mandatory test categories
3. Follow naming conventions
4. Use test factories where available
5. Write descriptive test names

### Example Migration

**Before**:

```typescript
import { fireEvent } from '@testing-library/react'

describe('Button', () => {
    it('test 1', () => {
        render(<Button />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('test 2', () => {
        const handleClick = vi.fn()
        render(<Button onClick={handleClick} />)
        fireEvent.click(screen.getByRole('button'))
        expect(handleClick).toHaveBeenCalled()
    })
})
```

**After**:

```typescript
describe('Button', () => {
    describe('Rendering', () => {
        it('renders with default props', () => {
            render(<Button />)
            expect(screen.getByRole('button')).toBeInTheDocument()
        })
    })

    describe('User Interactions', () => {
        it('calls onClick when clicked', async () => {
            const handleClick = vi.fn()
            const { user } = render(<Button onClick={handleClick} />)
            await user.click(screen.getByRole('button'))
            expect(handleClick).toHaveBeenCalledTimes(1)
        })
    })
})
```

## Implementation Plan

### Phase 1: Documentation and Training (Week 1)

- [ ] Finalize this RFC
- [ ] Create test file template
- [ ] Create test factory library
- [ ] Document examples for each test category
- [ ] Conduct team training session

### Phase 2: Pilot Components (Week 2-3)

- [ ] Apply standards to 2-3 pilot components
- [ ] Gather feedback and refine standards
- [ ] Update based on learnings
- [ ] Create migration guide

### Phase 3: Rollout (Week 4-10)

- [ ] Apply standards to remaining components (following RFC 0001 phases)
- [ ] Update existing tests to conform
- [ ] Code review enforcement
- [ ] Continuous improvement

## Success Metrics

- [ ] 100% of new components follow standards
- [ ] 90% of existing components updated to standards
- [ ] Average test review time reduced by 30%
- [ ] Test flakiness rate below 1%
- [ ] Team satisfaction score > 8/10

## Unresolved Questions

1. **Enforcement**: Should we use ESLint rules or linter plugins to enforce some standards automatically?

2. **Code Review Checklist**: Should we create a formal code review checklist for tests?

3. **Exceptions**: How do we handle exceptions to the standards? Who approves them?

4. **Component-Specific Guidelines**: Should we create supplementary guides for complex component types (forms, tables, etc.)?

5. **Training Materials**: What format would be most effective for training (videos, workshops, docs)?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0004](./0004-typography-system.md) - Typography System
- [RFC 0005](./0005-token-naming-conventions.md) - Token Naming Conventions
- [RFC 0006](./0006-bundle-size-optimization.md) - Bundle Size Optimization
- [RFC 0007](./0007-component-refactoring-standards.md) - Component Refactoring Standards

## References

### External Resources

- [React Testing Library Documentation](https://testing-library.com/react) - Official RTL docs
- [Vitest Best Practices](https://vitest.dev/guide/) - Vitest guidelines
- [Kent C. Dodds - Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) - Testing anti-patterns
- [Testing Library Queries Priority](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-the-wrong-query) - Query selection guide
- [Web.dev Testing Guide](https://web.dev/test/) - Modern testing practices

### Industry Standards (2024-2025)

- [React 18+ Testing Documentation](https://react.dev/learn/writing-tests) - Official React testing guide
- [Modern Component Testing](https://kentcdodds.com/blog/component-library-testing) - Latest testing strategies
- [Vitest Best Practices 2024](https://vitest.dev/guide/why.html) - Modern Vitest patterns
- [Testing Library v14+ Guide](https://testing-library.com/docs/react-testing-library/intro/) - Latest RTL features
- [Playwright Component Testing](https://playwright.dev/docs/test-components) - Modern component testing
- [Vitest UI for Debugging](https://vitest.dev/guide/ui.html) - Interactive test debugging
- [Component-Driven Development](https://www.componentdriven.org/) - Modern workflow
- [React 19 Testing Patterns](https://react.dev/learn/testing-your-code) - Latest React patterns
- [Radix UI Testing Guide](https://www.radix-ui.com/docs/primitives/utilities/testing) - Component library testing
- [MUI Testing Best Practices](https://mui.com/material-ui/guides/testing/) - Enterprise patterns
- [Chakra UI Testing](https://chakra-ui.com/guides/testing) - Modern component testing
- [shadcn/ui Testing](https://ui.shadcn.com/docs/testing) - 2024 patterns
- [GitHub Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices) - Modern practices
- [Web.dev Testing Guide](https://web.dev/test/) - Modern web testing

---

**Discussion**: [Link to GitHub issue or discussion]
