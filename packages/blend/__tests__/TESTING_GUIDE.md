# Blend Design System Testing Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Testing Philosophy](#testing-philosophy)
3. [Test Structure](#test-structure)
4. [Testing Framework](#testing-framework)
5. [Test Types](#test-types)
6. [Writing Tests](#writing-tests)
7. [Test Utilities](#test-utilities)
8. [Best Practices](#best-practices)
9. [Running Tests](#running-tests)
10. [Continuous Integration](#continuous-integration)

## Introduction

This guide serves as the single source of truth for testing practices in the Blend Design System. It provides comprehensive guidelines for writing, organizing, and maintaining tests across all components and utilities.

## Testing Philosophy

### Core Principles

1. **Test Behavior, Not Implementation**
    - Focus on what the component does, not how it does it
    - Tests should survive refactoring without changes

2. **User-Centric Testing**
    - Test from the user's perspective
    - Prioritize integration tests over unit tests

3. **Maintainable Tests**
    - Tests should be easy to read and understand
    - Follow DRY principles with shared utilities

4. **Comprehensive Coverage**
    - Test all user interactions
    - Cover edge cases and error states
    - Ensure accessibility compliance

## Test Structure

```
__tests__/
├── components/           # Component tests
│   └── [Component]/
│       ├── [Component].test.tsx           # Main functionality tests
│       ├── [Component].accessibility.test.tsx  # Accessibility tests
│       └── [Component].performance.test.tsx    # Performance tests
├── hooks/               # Custom hook tests
└── test-utils/          # Shared test utilities
    ├── index.tsx        # Main exports and custom render
    ├── builders.ts      # Test data builders
    ├── constants.ts     # Test constants and thresholds
    ├── assertions.ts    # Custom assertions
    └── helpers.ts       # Test helper functions
```

## Testing Framework

### Core Dependencies

- **Vitest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **jest-axe**: Accessibility testing
- **@testing-library/user-event**: User interaction simulation

### Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts',
        coverage: {
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'test/'],
        },
    },
})
```

## Test Types

### 1. Functional Tests

Test the core functionality and behavior of components.

```typescript
describe('Component Functionality', () => {
    it('renders with required props', () => {
        // Test basic rendering
    })

    it('handles user interactions', () => {
        // Test click, keyboard, and other interactions
    })

    it('manages state correctly', () => {
        // Test state changes and effects
    })
})
```

### 2. Accessibility Tests

Ensure components meet WCAG standards and are usable by all.

```typescript
describe('Component Accessibility', () => {
    it('meets WCAG standards', async () => {
        // Test with jest-axe
    })

    it('supports keyboard navigation', () => {
        // Test keyboard interactions
    })

    it('provides proper ARIA attributes', () => {
        // Test ARIA labels, roles, etc.
    })
})
```

### 3. Performance Tests

Monitor and maintain component performance.

```typescript
describe('Component Performance', () => {
    it('renders within performance budget', () => {
        // Test render time
    })

    it('handles large datasets efficiently', () => {
        // Test with stress scenarios
    })

    it('avoids unnecessary re-renders', () => {
        // Test memoization and optimization
    })
})
```

### 4. Visual Regression Tests

Catch unintended visual changes (integrate with tools like Chromatic).

### 5. Integration Tests

Test components working together in realistic scenarios.

## Writing Tests

### Test Structure Pattern

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '../test-utils'
import { ComponentPropsBuilder } from '../test-utils/builders'

describe('Component Name', () => {
  // Setup
  let defaultProps: ComponentProps

  beforeEach(() => {
    defaultProps = new ComponentPropsBuilder().build()
  })

  describe('Rendering', () => {
    it('renders with default props', () => {
      render(<Component {...defaultProps} />)
      // Assertions
    })
  })

  describe('Interactions', () => {
    it('handles user actions', async () => {
      const { user } = render(<Component {...defaultProps} />)
      // User interactions and assertions
    })
  })

  describe('Edge Cases', () => {
    it('handles edge case scenario', () => {
      // Edge case testing
    })
  })
})
```

### Using Test Builders

```typescript
// Create test data with builders
const props = new ComponentPropsBuilder()
    .withVariant('primary')
    .withSize('large')
    .withDisabled()
    .build()

// Use factory for common scenarios
const props = ComponentTestFactory.disabled()
```

### Custom Assertions

```typescript
// Use custom assertions for common patterns
assertAccessibility(container)
assertKeyboardNavigable(element)
assertEventHandlerCalled(mockFn)
assertPerformanceWithinBudget(renderTime, threshold)
```

## Test Utilities

### Custom Render

All components should be rendered with the custom render function that includes necessary providers:

```typescript
import { render } from '../test-utils'

const { container, user } = render(<Component />)
```

### Test Data Builders

Use the builder pattern for creating test props:

```typescript
export class ComponentPropsBuilder {
    private props: ComponentProps = {}

    withVariant(variant: string) {
        this.props.variant = variant
        return this
    }

    build() {
        return this.props
    }
}
```

### Constants

Centralize test configuration:

```typescript
export const PERFORMANCE_THRESHOLDS = {
    render: {
        simple: 50, // ms
        complex: 100, // ms
    },
}

export const TEST_IDS = {
    component: {
        root: 'component-root',
        child: 'component-child',
    },
}
```

### Helpers

Create reusable test helpers:

```typescript
export function testAllVariants(
    Component: React.ComponentType,
    variants: string[]
) {
    variants.forEach((variant) => {
        it(`renders ${variant} variant`, () => {
            // Test logic
        })
    })
}
```

## Best Practices

### 1. Test Organization

- Group related tests using `describe` blocks
- Use clear, descriptive test names
- Follow the Arrange-Act-Assert pattern

### 2. Selector Strategies

Priority order for element selection:

1. Role queries (`getByRole`)
2. Label queries (`getByLabelText`)
3. Text queries (`getByText`)
4. Test IDs (`getByTestId`) - last resort

### 3. Async Testing

```typescript
// Wait for elements
await screen.findByRole('button')

// Wait for removal
await waitForElementToBeRemoved(() => screen.queryByText('Loading'))

// User events are async
await user.click(button)
```

### 4. Mocking

```typescript
// Mock modules
vi.mock('../utils/api')

// Mock functions
const mockFn = vi.fn()

// Spy on existing functions
const spy = vi.spyOn(object, 'method')
```

### 5. Cleanup

- Tests are automatically cleaned up between runs
- Use `beforeEach` for setup, not `afterEach` for cleanup
- Reset mocks in `beforeEach` if needed

### 6. Performance Considerations

- Use `screen` queries instead of `container` queries
- Avoid unnecessary re-renders in tests
- Use `waitFor` sparingly

## Running Tests

### Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Button.test.tsx

# Run tests matching pattern
npm test -- --grep "accessibility"
```

### Debugging

```bash
# Run tests in UI mode
npm test -- --ui

# Run with node inspector
npm test -- --inspect
```

### Environment Variables

```bash
# Run tests in CI mode
CI=true npm test

# Enable debug output
DEBUG=true npm test
```

## Continuous Integration

### CI Configuration

```yaml
# Example GitHub Actions
test:
    runs-on: ubuntu-latest
    steps:
        - uses: actions/checkout@v3
        - uses: actions/setup-node@v3
        - run: npm ci
        - run: npm test -- --coverage
        - uses: codecov/codecov-action@v3
```

### Performance Budgets

Tests fail if components exceed performance thresholds:

```typescript
const renderTime = await measureComponentPerformance(Component)
expect(renderTime).toBeLessThan(PERFORMANCE_THRESHOLDS.render.simple)
```

### Coverage Requirements

- Minimum 80% code coverage
- 100% coverage for critical paths
- Exclude generated files and types

## Troubleshooting

### Common Issues

1. **Flaky Tests**
    - Use `findBy` queries for async elements
    - Avoid arbitrary `setTimeout`
    - Mock external dependencies

2. **Performance Issues**
    - Profile slow tests with `--reporter=verbose`
    - Optimize test setup/teardown
    - Use test.concurrent for parallel execution

3. **Memory Leaks**
    - Ensure proper cleanup of subscriptions
    - Check for circular references
    - Monitor with `--logHeapUsage`

## Migration Guide

When adopting these testing practices:

1. Start with new components
2. Gradually refactor existing tests
3. Use codemods where possible
4. Update one test file at a time

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Jest-Axe](https://github.com/nickcolley/jest-axe)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

This guide is a living document. Update it as testing practices evolve and new patterns emerge.
