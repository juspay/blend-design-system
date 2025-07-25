# Switch Component Test Documentation

This document provides a comprehensive overview of the test suite for the Switch component and SwitchGroup component, detailing what is being tested and the expected outcomes.

## Test Files Overview

### Switch Component Tests

#### 1. Switch.test.tsx

**Purpose**: Tests individual switch functionality and behavior  
**Test Count**: 46 tests  
**Focus**: Single switch states, interactions, and form integration

#### 2. Switch.accessibility.test.tsx

**Purpose**: Ensures WCAG compliance for individual switches  
**Test Count**: 40 tests  
**Focus**: Screen reader support, keyboard navigation, ARIA attributes

#### 3. Switch.performance.test.tsx

**Purpose**: Validates performance benchmarks for switches  
**Test Count**: 30 tests  
**Focus**: Render times, re-render efficiency, memory management

### SwitchGroup Component Tests

#### 4. SwitchGroup.test.tsx

**Purpose**: Tests switch group functionality and coordination  
**Test Count**: 42 tests  
**Focus**: Group behavior, multiple selection support, form integration

#### 5. SwitchGroup.accessibility.test.tsx

**Purpose**: Ensures WCAG compliance for switch groups  
**Test Count**: 35 tests  
**Focus**: Group accessibility, keyboard navigation, screen reader support

#### 6. SwitchGroup.performance.test.tsx

**Purpose**: Validates performance benchmarks for switch groups  
**Test Count**: 32 tests  
**Focus**: Group render times, coordination efficiency, memory management

---

## Detailed Test Coverage

### Switch.test.tsx - Individual Switch Tests

#### **Rendering Tests**

- **What we test**: Basic rendering with different props and states
- **Expected outcomes**:
    - Switch renders with correct label content
    - On/off states display correctly with appropriate visual indicators
    - Size variants (small, medium) apply appropriate dimensions
    - Disabled state prevents interaction and shows visual feedback
    - Error state displays validation feedback
    - Required state indicates mandatory fields

#### **Switch States**

- **What we test**: All possible switch states and transitions
- **Expected outcomes**:
    - Off state (default) allows user interaction
    - On state shows active indicator
    - Disabled state prevents all interactions
    - Error state shows validation problems
    - Required state indicates mandatory fields
    - Focus state shows keyboard navigation

#### **Interactive Behavior**

- **What we test**: User interaction handling and state changes
- **Expected outcomes**:
    - Click events toggle switch state
    - Label clicks also toggle the switch
    - Keyboard interactions (Space, Enter) work correctly
    - onChange callbacks receive correct boolean values
    - Controlled components update when props change
    - Uncontrolled components maintain internal state

#### **Form Integration**

- **What we test**: Switch behavior within forms
- **Expected outcomes**:
    - Form submission includes switch values (only when on)
    - Name and value attributes work correctly
    - Form validation integrates properly
    - Form reset restores default values
    - Required validation prevents submission when off

#### **Content and Layout**

- **What we test**: Label, subtext, and content rendering
- **Expected outcomes**:
    - Text labels display correctly
    - Complex label content (JSX) renders properly
    - Subtext provides additional context
    - Content layout maintains proper spacing
    - Icons and additional elements render correctly

### Switch.accessibility.test.tsx - Accessibility Tests

#### **ARIA Compliance**

- **What we test**: WCAG 2.1 AA standards compliance
- **Expected outcomes**:
    - No accessibility violations detected by jest-axe
    - Proper switch role and attributes
    - Correct aria-checked values for all states
    - Semantic HTML structure maintained

#### **Keyboard Navigation**

- **What we test**: Full keyboard accessibility
- **Expected outcomes**:
    - Tab navigation reaches all switches
    - Space and Enter keys toggle switch state
    - Focus indicators are clearly visible
    - Disabled switches are not focusable
    - Focus management works correctly

#### **Screen Reader Support**

- **What we test**: Assistive technology compatibility
- **Expected outcomes**:
    - Switch purpose is clearly announced
    - State changes are communicated immediately
    - Labels are properly associated
    - On/off states are clearly distinguished
    - Required status is communicated

#### **Label Association**

- **What we test**: Proper label-switch relationships
- **Expected outcomes**:
    - Labels are programmatically associated
    - Clicking labels activates switches
    - Multiple labeling methods work correctly
    - Complex labels maintain accessibility

### SwitchGroup Tests - Group Coordination

#### **Group Behavior (SwitchGroup.test.tsx)**

- **What we test**: Switch group coordination and management
- **Expected outcomes**:
    - Multiple switches can be selected simultaneously
    - Group maintains array of selected values
    - Name attribute is applied to all switches in group
    - Group value represents array of selected switch values
    - Individual switch states are coordinated properly

#### **Controlled vs Uncontrolled Groups**

- **What we test**: Both controlled and uncontrolled group behavior
- **Expected outcomes**:
    - Controlled groups update when value prop changes
    - Uncontrolled groups maintain internal state
    - Default value sets initial selections
    - onChange callbacks provide correct group value array

#### **Form Integration**

- **What we test**: Group behavior within forms
- **Expected outcomes**:
    - Form submission includes all selected values
    - Group validation works correctly
    - Required groups prevent submission when empty
    - Form reset restores default selections

#### **Group Accessibility (SwitchGroup.accessibility.test.tsx)**

- **What we test**: Group accessibility features
- **Expected outcomes**:
    - Group role is properly applied
    - Fieldset and legend provide group context
    - Keyboard navigation works across group
    - Screen readers announce group information
    - Individual switch accessibility is preserved

#### **Group Performance (SwitchGroup.performance.test.tsx)**

- **What we test**: Group coordination efficiency
- **Expected outcomes**:
    - Group renders efficiently with multiple switches
    - State coordination doesn't cause performance issues
    - Memory usage remains stable with large groups
    - Re-renders are optimized for group updates

---

## Test Data and Builders

### SwitchPropsBuilder

**Purpose**: Fluent API for creating individual switch test props

```typescript
// Example usage
const props = new SwitchPropsBuilder()
    .withLabel('Enable Notifications')
    .withChecked(true)
    .withSize(SwitchSize.MEDIUM)
    .withRequired()
    .build()
```

### SwitchGroupPropsBuilder

**Purpose**: Fluent API for creating switch group test props

```typescript
// Example usage
const props = new SwitchGroupPropsBuilder()
    .withName('features')
    .withValue(['feature1', 'feature3'])
    .withLabel('Feature Toggles')
    .withRequired()
    .build()
```

### SwitchTestFactory

**Purpose**: Pre-configured test scenarios  
**Available scenarios**:

- `default()` - Basic switch configuration
- `checked()` - Pre-checked state
- `disabled()` - Disabled state
- `required()` - Required field
- `withError()` - Error state
- `withSubtext()` - Additional context
- `complex()` - Full-featured switch

### SwitchGroupTestFactory

**Purpose**: Pre-configured group test scenarios  
**Available scenarios**:

- `default()` - Basic group configuration
- `controlled()` - Controlled group with values
- `uncontrolled()` - Uncontrolled with default values
- `disabled()` - Disabled group state
- `multipleSelected()` - Multiple switches selected
- `withoutLabel()` - Group without label
- `complex()` - Full-featured group

---

## Switch vs SwitchGroup Behavior

### Individual Switch Behavior

- Binary on/off state (like a light switch)
- Can exist independently
- Maintains its own state when uncontrolled
- Suitable for individual feature toggles

### SwitchGroup Behavior

- Manages multiple switch buttons
- Allows multiple simultaneous selections
- Provides group context and labeling
- Handles form integration at group level
- Suitable for feature sets or preference groups

### Comparison with Other Components

| Component   | Selection Type   | Form Value            | Use Case              |
| ----------- | ---------------- | --------------------- | --------------------- |
| Switch      | Binary toggle    | Boolean/value when on | Feature toggles       |
| SwitchGroup | Multiple toggles | Array of values       | Feature sets          |
| Checkbox    | Binary selection | Value when checked    | Form selections       |
| Radio       | Single selection | Single value          | Exclusive choices     |
| RadioGroup  | Single selection | Single value          | Exclusive choice sets |

---

## Performance Benchmarks

| Test Category  | Threshold | Measurement               |
| -------------- | --------- | ------------------------- |
| Simple Render  | 50ms      | Time to first paint       |
| Complex Render | 100ms     | Full component render     |
| State Change   | 10ms      | Toggle response time      |
| Group Update   | 15ms      | Multi-switch coordination |
| Memory Usage   | Stable    | No leaks over time        |

---

## Common Test Patterns

### Testing Switch Toggle

```typescript
it('toggles switch when clicked', async () => {
  const handleChange = vi.fn()
  const { user } = render(
    <Switch label="Enable Feature" onChange={handleChange} />
  )

  const switchElement = screen.getByRole('switch')
  await user.click(switchElement)

  expect(switchElement).toBeChecked()
  expect(handleChange).toHaveBeenCalledWith(true)
})
```

### Testing SwitchGroup Multiple Selection

```typescript
it('allows multiple selections in group', async () => {
  const handleChange = vi.fn()
  const { user } = render(
    <SwitchGroup name="features" onChange={handleChange}>
      <Switch label="Feature A" value="a" />
      <Switch label="Feature B" value="b" />
      <Switch label="Feature C" value="c" />
    </SwitchGroup>
  )

  const switches = screen.getAllByRole('switch')

  await user.click(switches[0])
  expect(handleChange).toHaveBeenCalledWith(['a'])

  await user.click(switches[2])
  expect(handleChange).toHaveBeenCalledWith(['a', 'c'])
})
```

### Testing Keyboard Navigation

```typescript
it('supports keyboard toggle', async () => {
  const { user } = render(
    <Switch label="Keyboard Switch" />
  )

  const switchElement = screen.getByRole('switch')
  switchElement.focus()

  await user.keyboard(' ')
  expect(switchElement).toBeChecked()

  await user.keyboard('{Enter}')
  expect(switchElement).not.toBeChecked()
})
```

### Testing Accessibility

```typescript
it('meets WCAG standards for switch group', async () => {
  const { container } = render(
    <SwitchGroup name="accessible-group" label="Accessibility Features">
      <Switch label="High Contrast" value="contrast" />
      <Switch label="Large Text" value="large-text" />
    </SwitchGroup>
  )

  await assertAccessibility(container)
})
```

---

## Special Considerations

### Switch vs Checkbox

- **Switch**: Immediate action (like turning on a light)
- **Checkbox**: Selection for later action (like form submission)
- **Visual**: Switches show on/off states, checkboxes show selected/unselected
- **Semantics**: Use `role="switch"` for switches, `role="checkbox"` for checkboxes

### SwitchGroup Coordination

- All switches in a group share the same `name` attribute
- Each switch should have a unique `value` attribute
- Group value is an array of selected switch values
- Unlike RadioGroup, multiple selections are allowed

### Form Integration

- Switches only submit values when in the "on" state
- SwitchGroup submits an array of values for selected switches
- Use hidden inputs if you need to guarantee form submission

### Accessibility Considerations

- Switches must have accessible labels
- State changes should be announced to screen readers
- Group context should be provided for switch groups
- Keyboard navigation should work consistently

---

## Maintenance Guidelines

1. **Adding New Tests**: Follow established patterns and use builders
2. **Performance Tests**: Update thresholds if component complexity changes
3. **Accessibility Tests**: Test both individual and group scenarios
4. **Group Testing**: Ensure multiple selection coordination works correctly
5. **Documentation**: Update this file when adding new test categories

---

## Related Documentation

- [Testing Guide](../../TESTING_GUIDE.md) - Overall testing philosophy and setup
- [Switch Component](../../../lib/components/Switch/) - Component implementation
- [Test Utilities](../../test-utils/) - Shared testing utilities and helpers
- [Form Components](../../../lib/components/) - Related form components
- [Checkbox Tests](../Checkbox/README.md) - Similar component patterns
- [Radio Tests](../Radio/README.md) - Contrasting selection patterns
