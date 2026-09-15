# Blend Design System Testing Guide

**Single Source of Truth for All Testing Practices**

## Table of Contents

1. [Introduction](#introduction)
2. [Testing Philosophy](#testing-philosophy)
3. [Test Structure & Organization](#test-structure--organization)
4. [Testing Framework & Setup](#testing-framework--setup)
5. [Test Types](#test-types)
6. [Environment-Aware Performance Testing](#environment-aware-performance-testing)
7. [Test Utilities & Infrastructure](#test-utilities--infrastructure)
8. [Writing Tests](#writing-tests)
9. [Component Test Coverage](#component-test-coverage)
10. [Best Practices](#best-practices)
11. [Running Tests](#running-tests)
12. [Troubleshooting](#troubleshooting)
13. [Resources](#resources)

## Introduction

This guide serves as the **single source of truth** for all testing practices in the Blend Design System. It provides comprehensive guidelines for writing, organizing, and maintaining tests across all components, utilities, and performance scenarios.

## Testing Philosophy

### Core Principles

1. **Test Behavior, Not Implementation**
    - Focus on what the component does, not how it does it
    - Tests should survive refactoring without changes

2. **User-Centric Testing**
    - Test from the user's perspective
    - Prioritize integration tests over unit tests

3. **Environment-Aware Testing**
    - Tests adapt to different environments (local, CI, production)
    - Performance thresholds adjust automatically
    - Meaningful error messages with context

4. **Comprehensive Coverage**
    - Functional behavior testing
    - Accessibility compliance (WCAG 2.1 AA)
    - Performance benchmarks with regression detection
    - Edge cases and error states

5. **Maintainable Tests**
    - Consistent patterns across components
    - Shared utilities and builders
    - Clear documentation and examples

## Test Structure & Organization

```
__tests__/
├── TESTING_GUIDE.md                    # This file - single source of truth
├── PERFORMANCE_TESTING_GUIDE.md        # Detailed performance testing guide
├── PERFORMANCE_SOLUTION_SUMMARY.md     # Performance solution overview
├── components/                          # Component tests
│   ├── README.md                       # Component test overview
│   └── [Component]/
│       ├── [Component].test.tsx                 # Main functionality tests
│       ├── [Component].accessibility.test.tsx  # Accessibility tests
│       ├── [Component].performance.test.tsx    # Performance tests
│       └── README.md                           # Component-specific docs
├── hooks/                              # Custom hook tests
└── test-utils/                         # Shared test utilities
    ├── index.tsx                       # Main exports and custom render
    ├── builders.ts                     # Test data builders
    ├── constants.ts                    # Test constants and thresholds
    ├── assertions.ts                   # Custom assertions
    ├── performance.ts                  # Environment-aware performance utilities
    └── helpers.ts                      # Test helper functions
```

## Testing Framework & Setup

### Core Dependencies

- **Vitest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **jest-axe**: Accessibility testing
- **@testing-library/user-event**: User interaction simulation

### Configuration

Key settings in `packages/blend/vitest.config.ts` (see that file for the full config):

- `environment: 'jsdom'`, `setupFiles: './vitest.setup.ts'`, `pool: 'threads'`
- `testTimeout: 15000` / `hookTimeout: 10000` for both local and CI (avoids "passes alone, times out in suite")
- Local only: `maxWorkers: 6` — uncapped `(cores - 1)` workers starve concurrent jsdom environments
- Two vitest projects:
    - **`unit`** — all tests except `*.performance.test.tsx`
    - **`performance`** — only `*.performance.test.tsx`, runs after unit (`groupOrder: 1`), `singleThread: true`

Heavy third-party editors (e.g. Monaco) should be stubbed in component tests. CodeEditorV2 uses `__tests__/mocks/monaco-editor-react.tsx` via `vi.mock('@monaco-editor/react', ...)`.

## Test Types

### 1. Functional Tests (.test.tsx)

**Purpose**: Core component functionality and user interactions

**Common Test Areas**:

- Rendering with different props and states
- User interactions (click, keyboard, form submission)
- State management (controlled vs uncontrolled)
- Form integration and validation
- Content rendering and layout
- Edge cases and error handling

### 2. Accessibility Tests (.accessibility.test.tsx)

**Purpose**: WCAG 2.1 AA compliance and assistive technology support

**Common Test Areas**:

- ARIA compliance (roles, attributes, states)
- Keyboard navigation and focus management
- Screen reader support and announcements
- Label association and semantic structure
- High contrast and visual accessibility
- Form accessibility patterns

### 3. Performance Tests (.performance.test.tsx)

**Purpose**: Environment-aware performance benchmarks and optimization validation

These files run in the dedicated `performance` vitest project (after all unit tests, one file at a time in a single worker) so wall-clock assertions are not skewed by parallel suite load.

**Common Test Areas**:

- Initial render performance
- Re-render optimization
- Memory management and cleanup
- Event handler performance
- State change efficiency
- Stress testing with large datasets

## Environment-Aware Performance Testing

### Environment-Aware Performance Testing

Previously, performance tests used fixed thresholds which led to environment-dependent failures, false positives, and no regression detection.

The new approach provides adaptive thresholds that automatically adjust based on environment, regression detection, meaningful monitoring, and production insights.

### Environment Detection & Thresholds

#### Base Thresholds (Optimal Local Environment)

```typescript
const baseThresholds = {
    render: {
        simple: 25,
        complex: 50,
    },
    interaction: {
        click: 30,
        rapid: 100,
    },
    memory: {
        basic: 3,
        stress: 5,
    },
}
```

#### Environment Multipliers

- **Local Development**: 2.0x (50ms for simple renders)
- **CI/GitHub Actions**: 3.0x (75ms for simple renders)
- **Production**: 1.5x (37.5ms for simple renders)

### Usage Examples

**Fixed Thresholds (Problematic)**

```typescript
expect(renderTime).toBeLessThan(50)
```

**Environment-Aware (Robust)**

```typescript
assertPerformanceWithContext(
    renderTime,
    'render',
    'simple',
    getCurrentTestName()
)
// Local: 50ms threshold (25ms × 2.0)
// CI: 75ms threshold (25ms × 3.0)
// Production: 37.5ms threshold (25ms × 1.5)
```

#### Helper Function (Required in all performance tests)

```typescript
function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}
```

### Performance Categories & Metrics

**Valid Metric Combinations**

```typescript
assertPerformanceWithContext(time, 'render', 'simple', testName)
assertPerformanceWithContext(time, 'render', 'complex', testName)

assertPerformanceWithContext(time, 'interaction', 'click', testName)
assertPerformanceWithContext(time, 'interaction', 'rapid', testName)

assertPerformanceWithContext(time, 'memory', 'basic', testName)
assertPerformanceWithContext(time, 'memory', 'stress', testName)
```

## Test Utilities & Infrastructure

### Custom Render

All components should be rendered with the custom render function:

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

const props = new ComponentPropsBuilder()
    .withVariant('primary')
    .withSize('large')
    .withDisabled()
    .build()
```

### Test Factories

Pre-configured scenarios for common test cases:

```typescript
const props = ComponentTestFactory.disabled()
render(<Component {...props} />)
```

### Performance Utilities

```typescript
import { assertPerformanceWithContext, measureRenderTime } from '../../test-utils'

it('renders within performance budget', async () => {
    const renderTime = await measureRenderTime(<Component />)
    assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
})
```

## Writing Tests

### Test Structure Pattern

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, assertPerformanceWithContext } from '../test-utils'
import { ComponentPropsBuilder } from '../test-utils/builders'

function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}

describe('Component Name', () => {
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
        })
    })

    describe('Performance', () => {
        it('renders within performance budget', async () => {
            const renderTime = await measureRenderTime(<Component {...defaultProps} />)
            assertPerformanceWithContext(renderTime, 'render', 'simple', getCurrentTestName())
        })
    })

    describe('Accessibility', () => {
        it('meets WCAG standards', async () => {
            const { container } = render(<Component {...defaultProps} />)
            const results = await axe(container)
            expect(results).toHaveNoViolations()
        })
    })
})
```

## Component Test Coverage

### Completed Components

| Component       | Functional Tests | Accessibility Tests | Performance Tests | Total Tests   | Status      |
| --------------- | ---------------- | ------------------- | ----------------- | ------------- | ----------- |
| **Button**      | 46 tests         | 42 tests            | 32 tests          | **120 tests** | ✅ Complete |
| **Checkbox**    | 48 tests         | 40 tests            | 30 tests          | **118 tests** | ✅ Complete |
| **Radio**       | 45 tests         | 38 tests            | 28 tests          | **111 tests** | ✅ Complete |
| **RadioGroup**  | 42 tests         | -                   | -                 | **42 tests**  | ✅ Complete |
| **Switch**      | 46 tests         | 40 tests            | 30 tests          | **116 tests** | ✅ Complete |
| **SwitchGroup** | 42 tests         | 35 tests            | 32 tests          | **109 tests** | ✅ Complete |

### **Total Test Coverage: 616 tests with 97% pass rate**

### Performance Test Migration Status

| Component       | Environment-Aware | Import Fixed | Helper Added | Status      |
| --------------- | ----------------- | ------------ | ------------ | ----------- |
| **Button**      | ✅                | ✅           | ✅           | ✅ Complete |
| **Checkbox**    | ✅                | ✅           | ✅           | ✅ Complete |
| **Radio**       | ✅                | ✅           | ✅           | ✅ Complete |
| **RadioGroup**  | ✅                | ✅           | ✅           | ✅ Complete |
| **Switch**      | ✅                | ✅           | ✅           | ✅ Complete |
| **SwitchGroup** | 🔄                | ✅           | ✅           | 🔄 Partial  |

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
await screen.findByRole('button')

await waitForElementToBeRemoved(() => screen.queryByText('Loading'))

await user.click(button)
```

### 4. Performance Testing Best Practices

```typescript
assertPerformanceWithContext(time, 'render', 'simple', 'Button-primary-large')

assertPerformanceWithContext(time, 'render', 'simple', 'Button-basic')
assertPerformanceWithContext(time, 'render', 'complex', 'Button-with-icons')
assertPerformanceWithContext(time, 'interaction', 'click', 'Button-click')

assertPerformanceWithContext(time, 'render', 'simple', 'test1')
```

### 5. Environment Variables

Control behavior across environments:

```bash
npm test

CI=true npm test

NODE_ENV=production npm test

DEBUG_PERFORMANCE=true npm test
```

## Running Tests

### Commands

```bash
npm test

npm test -- --watch

npm test -- --coverage

npm test Button.test.tsx

npm test -- --grep "accessibility"

npm test -- performance

npm test __tests__/components/Button
```

### Environment-Specific Testing

```bash
CI=true npm test

NODE_ENV=production npm test

GITHUB_ACTIONS=true npm test
```

### Debugging

```bash
npm test -- --ui

npm test -- --inspect

DEBUG=true npm test
```

## Troubleshooting

### Common Issues

#### 1. "assertPerformanceWithContext is not defined"

**Solution**: Add import to test file:

```typescript
import { assertPerformanceWithContext } from '../../test-utils'
```

#### 2. "getCurrentTestName is not defined"

**Solution**: Add helper function to test file:

```typescript
function getCurrentTestName(): string {
    const testContext = expect.getState()
    return testContext.currentTestName || 'unknown-test'
}
```

#### 3. Performance tests failing with environment-aware thresholds

**Solution**: Check if thresholds need adjustment in `performance.ts`:

```typescript
const baseThresholds = {
    render: {
        simple: 25,
        complex: 50,
    },
    // ...
}
```

#### 4. Flaky Tests

- Use `findBy` queries for async elements
- Avoid arbitrary `setTimeout`
- Mock external dependencies

#### 5. Memory Leaks

- Ensure proper cleanup of subscriptions
- Check for circular references
- Monitor with `--logHeapUsage`

### Performance Test Debugging

```typescript
import { getPerformanceConfig } from '../../test-utils'

it('debug environment detection', () => {
    const config = getPerformanceConfig()
    console.log('Environment:', config.environment)
    console.log('Multiplier:', config.multiplier)
    console.log(
        'Threshold for simple render:',
        config.baseThresholds.render.simple * config.multiplier
    )
})
```

## Resources

### Documentation

- [Performance Testing Guide](./PERFORMANCE_TESTING_GUIDE.md) - Detailed performance testing
- [Performance Solution Summary](./PERFORMANCE_SOLUTION_SUMMARY.md) - Solution overview
- [Component Tests Overview](./components/README.md) - Component test documentation

### External Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Docs](https://testing-library.com/)
- [Jest-Axe](https://github.com/nickcolley/jest-axe)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Component-Specific Documentation

- [Button Tests](./components/Button/README.md)
- [Checkbox Tests](./components/Checkbox/README.md)
- [Radio Tests](./components/Radio/README.md)
- [Switch Tests](./components/Switch/README.md)

---

## Migration Guide

When adopting these testing practices:

1. **Start with new components**
2. **Use environment-aware performance testing** for all new tests
3. **Gradually refactor existing tests** to use shared utilities
4. **Update one test file at a time**
5. **Follow the established patterns** in this guide

## Continuous Integration

### CI Configuration

```yaml
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
const renderTime = await measureRenderTime(Component)
assertPerformanceWithContext(
    renderTime,
    'render',
    'simple',
    getCurrentTestName()
)
```

### Coverage Requirements

- Minimum 80% code coverage
- 100% coverage for critical paths
- Exclude generated files and types

---

**This guide is a living document. Update it as testing practices evolve and new patterns emerge.**

**Last Updated**: Performance testing migration completed with 97% test pass rate and environment-aware testing system.
