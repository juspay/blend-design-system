# RFC 0002: Component Testing Standards

## Summary

Establish comprehensive testing standards for all components, defining mandatory test categories, consistent patterns, and best practices to ensure maintainable, effective tests across the library.

## Motivation

### Problem Statement

- Inconsistent testing patterns across components
- No clear minimum requirements for what must be tested
- Mixed patterns (fireEvent vs userEvent, manual vs semantic queries)
- Poor test organization
- Missing test categories (edge cases, integration)

### Goals

- Establish clear, enforceable testing standards
- Define minimum test requirements
- Provide consistent patterns and best practices
- Create guidelines for test organization

### Non-Goals

- Specific implementation details (vary by component)
- E2E testing (handled separately)
- Specific test counts or coverage percentages
- React Server Components testing
- Visual regression testing
- AI-assisted test generation

## Proposed Solution

### Key Changes

1. **Five Core Testing Principles**
2. **Seven Mandatory Test Categories**
3. **Standard Test Organization**
4. **Modern Testing Patterns**

### Testing Principles

#### Principle 1: Test Behavior, Not Implementation

```typescript
// ❌ Tests implementation
it('uses useState hook', () => {})

// ✅ Tests behavior
it('opens when trigger is clicked', async () => {
    const { user } = render(<Dialog />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeVisible()
})
```

#### Principle 2: Test Like a User

```typescript
// ❌ Programmatic events
fireEvent.click(button)

// ✅ User-like interactions
await user.click(button)
```

#### Principle 3: Use Semantic Queries

```typescript
// Query priority (highest to lowest):
screen.getByRole('button', { name: 'Submit' })
screen.getByLabelText('Email address')
screen.getByText('Welcome')
screen.getByTestId('submit-button') // Last resort
```

#### Principle 4: One Assertion Per Test

```typescript
// ❌ Tests multiple behaviors
it('handles user interactions', async () => {
    await user.click(button)
    await user.type(input, 'test')
    expect(handleClick).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalled()
})

// ✅ One behavior per test
it('handles click events', async () => {
    await user.click(button)
    expect(handleClick).toHaveBeenCalled()
})
```

#### Principle 5: Arrange-Act-Assert Pattern

```typescript
it('submits form with valid data', async () => {
    // ARRANGE
    const { user } = render(<Form onSubmit={handleSubmit} />)

    // ACT
    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.click(screen.getByRole('button', { name: 'Submit' }))

    // ASSERT
    expect(handleSubmit).toHaveBeenCalledWith({ name: 'John Doe' })
})
```

### Mandatory Test Categories

#### Category 1: Rendering Tests

- Renders with default props
- Renders with all variant combinations
- Renders with children/content
- Renders empty/null content gracefully
- Renders with long content
- Renders with special characters

#### Category 2: User Interaction Tests

- Click interactions
- Input interactions
- Keyboard navigation (Tab, Enter, Space, Escape, Arrow keys)
- Form submission
- Rapid/repeated interactions

#### Category 3: State Management Tests

- Controlled component behavior
- Uncontrolled component behavior
- Default value handling
- Value updates
- Reset/clear functionality

#### Category 4: Form Integration Tests (for form components)

- onChange/onInput callbacks
- onBlur/onFocus callbacks
- Required field validation
- Error message display
- Integration with form libraries

#### Category 5: Accessibility Tests

- WCAG 2.2 AA compliance (jest-axe)
- Proper ARIA roles and attributes
- Keyboard navigation and focus management
- Visible focus indicators
- Screen reader announcements

#### Category 6: Performance Tests

- Initial render performance (environment-aware thresholds)
- Re-render performance on prop changes
- Interaction performance
- Memory cleanup on unmount

#### Category 7: Edge Case Tests

- Empty/null data handling
- Very long text/content handling
- Special characters and unicode
- Large datasets
- Concurrent operations
- Error states and recovery

### Test Organization Standards

```typescript
describe('ComponentName', () => {
    describe('Rendering', () => {
        /* ... */
    })
    describe('User Interactions', () => {
        /* ... */
    })
    describe('State Management', () => {
        /* ... */
    })
    describe('Form Integration', () => {
        /* ... */
    })
    describe('Accessibility', () => {
        /* ... */
    })
    describe('Performance', () => {
        /* ... */
    })
    describe('Edge Cases', () => {
        /* ... */
    })
})
```

### Test Naming Convention

```
it('[verb] [what] when [condition]', () => {})
```

✅ Good: `'renders with default props'`, `'calls onClick when clicked'`
❌ Bad: `'it works'`, `'test 1'`, `'should render'`

## Alternatives Considered

### Option 1: Strict Test Count Requirements

Require a specific number of tests per component.

**Why not chosen**: Quality > quantity. Categories-based approach more meaningful.

### Option 2: Prescriptive Test Structure

Require exact test structure with specific test names.

**Why not chosen**: Too rigid. Balance between structure and flexibility better.

### Option 3: Minimal Standards

Only require basic rendering and interaction tests.

**Why not chosen**: Insufficient coverage. Comprehensive standards necessary for reliability.

## Impact Analysis

### Breaking Changes

**None** - Establishes standards without changing existing APIs.

### Backward Compatibility

**Fully compatible** - Existing components and tests remain functional.

### Developer Experience

**Significantly improved** - Clear expectations, consistent patterns, faster development.

### Maintenance Effort

**Reduced long-term** - Standardized patterns easier to maintain.

## Migration Guide

### For Existing Tests

1. Review test coverage against mandatory categories
2. Add missing test categories
3. Update test patterns (fireEvent → userEvent)
4. Organize tests with proper describe blocks
5. Update test names to follow convention

### For New Tests

Follow the standards from the start using the test file template.

## Implementation Plan

**Phase 1: Documentation and Training (Week 1)**

- Finalize this RFC
- Create test file template
- Create test factory library
- Document examples for each test category
- Conduct team training session

**Phase 2: Pilot Components (Weeks 2-3)**

- Apply standards to 2-3 pilot components
- Gather feedback and refine standards
- Update based on learnings
- Create migration guide

**Phase 3: Rollout (Weeks 4-10)**

- Apply standards to remaining components (following RFC 0001 phases)
- Update existing tests to conform
- Code review enforcement

## Success Metrics

- [ ] 100% of new components follow standards
- [ ] 90% of existing components updated
- [ ] Average test review time reduced by 30%
- [ ] Test flakiness rate below 1%
- [ ] Team satisfaction score > 8/10

## Unresolved Questions

1. Enforcement: ESLint rules or linter plugins for automatic enforcement?
2. Code Review Checklist: Formal checklist for tests?
3. Exceptions: How to handle exceptions to standards? Who approves?

## Related RFCs

- [RFC 0001](./0001-test-infrastructure-overhaul.md) - Test Infrastructure Overhaul
- [RFC 0003](./0003-accessibility-standards.md) - Accessibility Standards
- [RFC 0007](./0007-component-refactoring-standards.md) - Component Refactoring Standards

## References

- [React Testing Library](https://testing-library.com/react) - Official RTL docs
- [Vitest Best Practices](https://vitest.dev/guide/) - Vitest guidelines
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library) - Anti-patterns
- [Query Selection Guide](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-the-wrong-query) - Query priority
- [React 18+ Testing](https://react.dev/learn/writing-tests) - Official React guide
- [Component Library Testing](https://kentcdodds.com/blog/component-library-testing) - Latest strategies

---

**Discussion**: [Link to GitHub issue or discussion]
