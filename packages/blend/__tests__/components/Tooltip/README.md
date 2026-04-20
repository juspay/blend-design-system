# Tooltip Component Test Documentation

This document provides a comprehensive overview of the test suite for the Tooltip component, detailing what is being tested and the expected outcomes.

## Test Files Overview

### 1. Tooltip.test.tsx

**Purpose**: Tests core functionality, user interactions, and component behavior  
**Test Count**: 44 tests  
**Focus**: Functional testing of tooltip states, positioning, and content rendering

### 2. Tooltip.accessibility.test.tsx

**Purpose**: Ensures WCAG compliance and accessibility standards  
**Test Count**: 29 tests  
**Focus**: Screen reader support, keyboard navigation, ARIA attributes

### 3. Tooltip.performance.test.tsx

**Purpose**: Validates performance benchmarks and optimization  
**Test Count**: 34 tests  
**Focus**: Render times, show/hide efficiency, memory management

---

## Detailed Test Coverage

### Tooltip.test.tsx - Functional Tests

#### **Rendering Tests**

- **What we test**: Basic rendering with different content types and configurations
- **Expected outcomes**:
    - Tooltip renders with string and ReactNode content
    - Trigger elements (button, div, span, icon) work correctly
    - Content appears on hover with proper timing
    - Slot content (icons) displays in correct positions (left/right)
    - Empty and null content is handled gracefully

#### **Tooltip Positioning**

- **What we test**: All positioning combinations and alignment options
- **Expected outcomes**:
    - Four sides (top, right, bottom, left) position correctly
    - Three alignments (start, center, end) work with each side
    - Default positioning (top, center) applies when not specified
    - Offset values adjust tooltip distance from trigger
    - Arrow display can be toggled on/off

#### **Size Variants and Styling**

- **What we test**: Different tooltip sizes and visual configurations
- **Expected outcomes**:
    - Small and large size variants apply appropriate dimensions
    - Default size (small) applies when not specified
    - Arrow visibility can be controlled independently
    - Token-based styling applies correctly
    - Z-index layering works for proper stacking

#### **State Management**

- **What we test**: Controlled vs uncontrolled tooltip behavior
- **Expected outcomes**:
    - Controlled tooltips respect open prop (true/false)
    - Uncontrolled tooltips show/hide on hover/focus automatically
    - Delay duration affects timing of tooltip appearance
    - Multiple tooltips on same page coordinate properly
    - Dynamic content updates while tooltip is visible

#### **Trigger Interactions**

- **What we test**: Various trigger element types and interaction methods
- **Expected outcomes**:
    - Hover interactions show/hide tooltips appropriately
    - Focus interactions work for keyboard navigation
    - Different trigger elements (buttons, divs, spans) work consistently
    - Icon triggers maintain proper interaction areas
    - Rapid hover/unhover cycles are handled gracefully

#### **Content and Layout**

- **What we test**: Content rendering and layout behavior
- **Expected outcomes**:
    - String content displays correctly
    - Complex ReactNode content renders properly
    - Very long content wraps within maximum width constraints
    - Slot content (icons) positions correctly relative to text
    - Content updates dynamically when props change

### Tooltip.accessibility.test.tsx - Accessibility Tests

#### **WCAG Compliance**

- **What we test**: WCAG 2.1 AA standards compliance
- **Expected outcomes**:
    - No accessibility violations detected by jest-axe
    - Proper tooltip role and ARIA attributes
    - Semantic HTML structure maintained
    - All tooltip configurations pass accessibility tests

#### **Keyboard Navigation**

- **What we test**: Full keyboard accessibility
- **Expected outcomes**:
    - Tab navigation reaches tooltip triggers
    - Focus shows tooltips automatically
    - Blur hides tooltips appropriately
    - Escape key closes tooltips
    - Focus management works correctly across multiple tooltips

#### **Screen Reader Support**

- **What we test**: Assistive technology compatibility
- **Expected outcomes**:
    - Tooltip content is announced when shown
    - Dynamic content changes are communicated
    - Complex content structure is properly conveyed
    - Tooltip purpose and context are clear
    - State changes provide appropriate feedback

#### **ARIA Relationships**

- **What we test**: Proper ARIA attribute usage and relationships
- **Expected outcomes**:
    - Tooltip role is correctly applied
    - Trigger-tooltip relationships are established
    - Existing aria-describedby attributes are preserved
    - Multiple labeling methods work together
    - ARIA attributes update correctly with state changes

#### **Focus Management**

- **What we test**: Focus behavior and visual indicators
- **Expected outcomes**:
    - Focus remains on trigger element when tooltip shows
    - Tooltips don't trap focus inappropriately
    - Focus indicators are visible and meet contrast requirements
    - Focus moves logically between elements
    - Controlled tooltips maintain proper focus behavior

#### **Mobile and Touch Accessibility**

- **What we test**: Touch interaction and mobile accessibility
- **Expected outcomes**:
    - Touch interactions work appropriately
    - Touch target sizes meet minimum requirements
    - Mobile screen readers work correctly
    - Gesture navigation is supported

#### **Internationalization**

- **What we test**: Multi-language and RTL support
- **Expected outcomes**:
    - Right-to-left text direction works correctly
    - Long translated content is handled properly
    - Cultural text patterns are supported
    - Content scaling works with different languages

### Tooltip.performance.test.tsx - Performance Tests

#### **Render Performance**

- **What we test**: Initial rendering speed and efficiency
- **Expected outcomes**:
    - Simple tooltips render within performance budget
    - Complex tooltips (with slots, custom positioning) render efficiently
    - Multiple tooltips render without performance degradation
    - All positioning combinations maintain consistent performance

#### **Show/Hide Performance**

- **What we test**: Interaction response times and efficiency
- **Expected outcomes**:
    - Tooltip show animations complete within timing budget
    - Tooltip hide animations are smooth and responsive
    - Rapid show/hide cycles don't cause performance issues
    - Controlled state changes are processed efficiently

#### **Re-render Optimization**

- **What we test**: Component update efficiency and optimization
- **Expected outcomes**:
    - Stable props don't trigger unnecessary re-renders
    - Content changes update efficiently
    - Prop changes (positioning, size) complete quickly
    - Complex content updates maintain performance

#### **Memory Management**

- **What we test**: Memory usage and cleanup efficiency
- **Expected outcomes**:
    - Components unmount without memory leaks
    - Event listeners are properly cleaned up
    - Multiple mount/unmount cycles remain efficient
    - Tooltip provider memory is managed correctly

#### **Token Resolution Performance**

- **What we test**: Design token processing efficiency
- **Expected outcomes**:
    - Responsive tokens resolve quickly
    - Token caching works across multiple instances
    - Size-specific tokens are processed efficiently
    - Theme changes don't cause performance issues

#### **Complex Scenarios Performance**

- **What we test**: Real-world usage performance
- **Expected outcomes**:
    - Nested tooltip scenarios perform well
    - Dynamic content updates are efficient
    - Form integration maintains performance
    - Large numbers of tooltips scale appropriately

#### **Stress Testing**

- **What we test**: Performance under heavy load
- **Expected outcomes**:
    - Large numbers of tooltips render efficiently
    - Rapid interactions maintain responsiveness
    - Memory pressure is handled gracefully
    - Performance remains consistent over time

---

## Test Data and Builders

### TooltipTestFactory

**Purpose**: Pre-configured test scenarios  
**Available scenarios**:

- `default()` - Basic tooltip configuration
- `controlled()` - Controlled tooltip with open prop
- `withSlot()` - Tooltip with icon slot
- `complex()` - Full-featured tooltip with all options
- `allSides()` - All positioning sides
- `allSizes()` - All size variants
- `longContent()` - Tooltip with very long content

---

## Radix UI Integration Considerations

### Duplicate Content Pattern

**What this means**: Radix UI creates duplicate content for accessibility  
**Testing impact**: Tests must account for multiple instances of the same content

```typescript
// Correct pattern for Radix UI tooltips
await waitFor(() => {
    expect(screen.getAllByText('Tooltip content')).toHaveLength(2)
})
```

### CSS-Based Hiding

**What this means**: Radix UI hides tooltips with CSS rather than removing from DOM  
**Testing impact**: Hidden tooltips may still exist in DOM with specific styles

```typescript
// Check for visual hiding rather than DOM removal
const tooltip = screen.queryByRole('tooltip')
if (tooltip) {
    expect(tooltip).toHaveStyle('overflow: hidden')
    expect(tooltip).toHaveStyle('width: 1px')
}
```

### Performance Implications

**What this means**: Radix UI adds complexity that affects performance benchmarks  
**Testing impact**: Performance thresholds account for portal rendering and state management

- Render performance ~30% slower due to portal rendering
- Interaction performance includes animation and timing delays
- Memory usage higher due to provider patterns

---

## Performance Benchmarks

| Test Category  | Threshold | Measurement             |
| -------------- | --------- | ----------------------- |
| Simple Render  | 60ms      | Time to first paint     |
| Complex Render | 120ms     | Full component render   |
| Show Animation | 70ms      | Hover to visible        |
| Hide Animation | 35ms      | Unhover to hidden       |
| State Change   | 12ms      | Controlled prop updates |
| Memory Usage   | Stable    | No leaks over time      |

---

## Common Test Patterns

### Testing Tooltip Display

```typescript
it('shows tooltip on hover', async () => {
  const { user } = render(
    <Tooltip content="Hover tooltip">
      <button>Hover me</button>
    </Tooltip>
  )

  const trigger = screen.getByRole('button')
  await user.hover(trigger)

  await waitFor(() => {
    expect(screen.getAllByText('Hover tooltip')).toHaveLength(2)
  })
})
```

### Testing Controlled State

```typescript
it('respects controlled open prop', () => {
  render(
    <Tooltip content="Always visible" open={true}>
      <button>Controlled trigger</button>
    </Tooltip>
  )

  expect(screen.getAllByText('Always visible')).toHaveLength(2)
})
```

### Testing Accessibility

```typescript
it('meets WCAG standards', async () => {
  const { container, user } = render(
    <Tooltip content="Accessible tooltip">
      <button>Trigger button</button>
    </Tooltip>
  )

  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Testing Performance

```typescript
it('renders within performance budget', async () => {
  const renderTime = await measureRenderTime(
    <Tooltip content="Performance test">
      <button>Performance trigger</button>
    </Tooltip>
  )

  assertPerformanceWithContext(
    renderTime,
    'render',
    'simple',
    getCurrentTestName()
  )
})
```

---

## Special Considerations

### Tooltip vs Other Components

| Component | Purpose             | Trigger Method | Content Type       |
| --------- | ------------------- | -------------- | ------------------ |
| Tooltip   | Contextual help     | Hover/focus    | Brief explanations |
| Popover   | Interactive content | Click          | Rich content/forms |
| Modal     | Primary focus       | Click/action   | Complex interfaces |
| Alert     | Status messages     | Programmatic   | Notifications      |

### Content Guidelines

- **Brief and helpful**: Tooltips should provide concise, useful information
- **Non-essential**: Content should supplement, not replace, primary UI
- **Accessible**: All content must be available through other means
- **Responsive**: Content should work across different screen sizes

### Positioning Strategy

- **Smart defaults**: Top-center positioning works for most cases
- **Collision detection**: Radix UI automatically adjusts positioning
- **Consistent spacing**: Offset values maintain visual consistency
- **Arrow alignment**: Arrows point to trigger element appropriately

### Performance Optimization

- **Lazy rendering**: Tooltips only render when needed
- **Event delegation**: Efficient event handling for multiple tooltips
- **Memory management**: Proper cleanup prevents memory leaks
- **Token caching**: Design tokens are cached for performance

---

## Current Test Status

| Test Type         | Count | Status       | Notes                                       |
| ----------------- | ----- | ------------ | ------------------------------------------- |
| **Functional**    | 44    | ✅ 100% Pass | Complete coverage of core functionality     |
| **Accessibility** | 29    | ✅ 100% Pass | Full WCAG 2.1 AA compliance                 |
| **Performance**   | 34    | ⚠️ 88% Pass  | 4 tests need Radix UI threshold adjustments |
| **Total**         | 107   | ✅ 96% Pass  | Production-ready with minor optimizations   |

### Recent Improvements

- **Radix UI Compatibility**: Updated all tests to handle Radix UI patterns
- **Environment-Aware Performance**: Adaptive thresholds for different environments
- **Build Quality**: Resolved all TypeScript errors and build issues
- **Test Patterns**: Enhanced examples and documentation

---

## Maintenance Guidelines

1. **Adding New Tests**: Follow established patterns and use consistent assertions
2. **Performance Tests**: Account for Radix UI complexity in thresholds
3. **Accessibility Tests**: Test both simple and complex content scenarios
4. **Radix UI Updates**: Monitor for changes in Radix UI behavior patterns
5. **Documentation**: Update this file when adding new test categories

---

## Related Documentation

- [Testing Guide](../../TESTING_GUIDE.md) - Overall testing philosophy and setup
- [Tooltip Component](../../../lib/components/Tooltip/) - Component implementation
- [Test Utilities](../../test-utils/) - Shared testing utilities and helpers
- [Performance Testing Guide](../../PERFORMANCE_TESTING_GUIDE.md) - Performance testing patterns
- [Accessibility Testing](../../TESTING_GUIDE.md#accessibility) - Accessibility testing approaches
