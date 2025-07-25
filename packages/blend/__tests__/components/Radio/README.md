# Radio Component Test Documentation

This document provides a comprehensive overview of the test suite for the Radio component and RadioGroup component, detailing what is being tested and the expected outcomes.

## Test Files Overview

### Radio Component Tests

#### 1. Radio.test.tsx

**Purpose**: Tests individual radio button functionality and behavior  
**Test Count**: 45 tests  
**Focus**: Single radio button states, interactions, and form integration

#### 2. Radio.accessibility.test.tsx

**Purpose**: Ensures WCAG compliance for individual radio buttons  
**Test Count**: 38 tests  
**Focus**: Screen reader support, keyboard navigation, ARIA attributes

#### 3. Radio.performance.test.tsx

**Purpose**: Validates performance benchmarks for radio buttons  
**Test Count**: 28 tests  
**Focus**: Render times, re-render efficiency, memory management

### RadioGroup Component Tests

#### 4. RadioGroup.test.tsx

**Purpose**: Tests radio group functionality and coordination  
**Test Count**: 42 tests  
**Focus**: Group behavior, single selection enforcement, form integration

---

## Detailed Test Coverage

### Radio.test.tsx - Individual Radio Tests

#### **Rendering Tests**

- **What we test**: Basic rendering with different props and states
- **Expected outcomes**:
    - Radio renders with correct label content
    - Selected/unselected states display correctly
    - Size variants (small, medium) apply appropriate dimensions
    - Disabled state prevents interaction and shows visual feedback
    - Error state displays validation feedback
    - Required state indicates mandatory selection

#### **Radio States**

- **What we test**: All possible radio button states
- **Expected outcomes**:
    - Unselected state (default) allows user interaction
    - Selected state shows selection indicator
    - Disabled state prevents all interactions
    - Error state shows validation problems
    - Required state indicates mandatory fields
    - Focus state shows keyboard navigation

#### **Interactive Behavior**

- **What we test**: User interaction handling and state changes
- **Expected outcomes**:
    - Click events select the radio button
    - Label clicks also select the radio button
    - Keyboard interactions (Space, Arrow keys) work correctly
    - onChange callbacks receive correct values
    - Once selected, radio cannot be unselected by clicking
    - Only one radio in a group can be selected

#### **Form Integration**

- **What we test**: Radio behavior within forms
- **Expected outcomes**:
    - Form submission includes selected radio value
    - Name and value attributes work correctly
    - Form validation integrates properly
    - Form reset restores default values
    - Required validation prevents submission when no option selected

#### **Content and Layout**

- **What we test**: Label, subtext, and content rendering
- **Expected outcomes**:
    - Text labels display correctly
    - Complex label content (JSX) renders properly
    - Subtext provides additional context
    - Content layout maintains proper spacing
    - Icons and additional elements render correctly

### Radio.accessibility.test.tsx - Accessibility Tests

#### **ARIA Compliance**

- **What we test**: WCAG 2.1 AA standards compliance
- **Expected outcomes**:
    - No accessibility violations detected by jest-axe
    - Proper radio role and attributes
    - Correct aria-checked values for all states
    - Semantic HTML structure maintained

#### **Keyboard Navigation**

- **What we test**: Full keyboard accessibility
- **Expected outcomes**:
    - Tab navigation reaches radio groups
    - Arrow keys navigate within radio groups
    - Space key selects focused radio
    - Focus indicators are clearly visible
    - Disabled radios are not focusable

#### **Screen Reader Support**

- **What we test**: Assistive technology compatibility
- **Expected outcomes**:
    - Radio purpose is clearly announced
    - State changes are communicated immediately
    - Labels are properly associated
    - Group context is provided
    - Required status is communicated

#### **Label Association**

- **What we test**: Proper label-radio relationships
- **Expected outcomes**:
    - Labels are programmatically associated
    - Clicking labels activates radios
    - Multiple labeling methods work correctly
    - Complex labels maintain accessibility

### Radio.performance.test.tsx - Performance Tests

#### **Render Performance**

- **What we test**: Initial rendering speed
- **Expected outcomes**:
    - Simple radios render within 50ms
    - Complex radios render within 100ms
    - Multiple radios render efficiently
    - Performance scales linearly with complexity

#### **State Change Performance**

- **What we test**: Interaction response times
- **Expected outcomes**:
    - State changes complete within 10ms
    - Group updates are efficient
    - Controlled updates are fast
    - Batch updates work correctly

#### **Memory Management**

- **What we test**: Memory usage and cleanup
- **Expected outcomes**:
    - Components unmount without memory leaks
    - Event listeners are properly cleaned up
    - No circular references remain
    - Memory usage remains stable over time

### RadioGroup.test.tsx - Group Coordination Tests

#### **Group Behavior**

- **What we test**: Radio group coordination and management
- **Expected outcomes**:
    - Only one radio can be selected at a time
    - Selecting a radio deselects others in the group
    - Group maintains consistent state
    - Name attribute is applied to all radios in group
    - Value represents the selected radio's value

#### **Controlled vs Uncontrolled**

- **What we test**: Both controlled and uncontrolled group behavior
- **Expected outcomes**:
    - Controlled groups update when value prop changes
    - Uncontrolled groups maintain internal state
    - Default value sets initial selection
    - onChange callbacks provide correct group value

#### **Form Integration**

- **What we test**: Group behavior within forms
- **Expected outcomes**:
    - Form submission includes selected value
    - Group validation works correctly
    - Required groups prevent submission when empty
    - Form reset restores default selection

#### **Accessibility Integration**

- **What we test**: Group accessibility features
- **Expected outcomes**:
    - Fieldset and legend provide group context
    - Radio group role is properly applied
    - Keyboard navigation works across group
    - Screen readers announce group information

---

## Test Data and Builders

### RadioPropsBuilder

**Purpose**: Fluent API for creating individual radio test props

```typescript
// Example usage
const props = new RadioPropsBuilder()
    .withLabel('Option A')
    .withValue('option-a')
    .withChecked(true)
    .withSize(RadioSize.MEDIUM)
    .build()
```

### RadioGroupPropsBuilder

**Purpose**: Fluent API for creating radio group test props

```typescript
// Example usage
const props = new RadioGroupPropsBuilder()
    .withName('preferences')
    .withValue('option-a')
    .withLabel('User Preferences')
    .withRequired()
    .build()
```

### RadioTestFactory

**Purpose**: Pre-configured test scenarios  
**Available scenarios**:

- `default()` - Basic radio configuration
- `selected()` - Pre-selected state
- `disabled()` - Disabled state
- `required()` - Required field
- `withError()` - Error state
- `withSubtext()` - Additional context
- `complex()` - Full-featured radio
- `group()` - Radio group configuration

---

## Radio vs RadioGroup Behavior

### Individual Radio Behavior

- Can exist independently
- Maintains its own state when uncontrolled
- Requires manual coordination for mutual exclusion
- Suitable for single yes/no questions

### RadioGroup Behavior

- Manages multiple radio buttons
- Enforces single selection automatically
- Provides group context and labeling
- Handles form integration at group level
- Suitable for multiple choice questions

### State Management Comparison

| Aspect        | Individual Radio    | RadioGroup          |
| ------------- | ------------------- | ------------------- |
| Selection     | Manual coordination | Automatic exclusion |
| Form Value    | Individual values   | Single group value  |
| Validation    | Per radio           | Per group           |
| Accessibility | Individual context  | Group context       |
| Keyboard Nav  | Tab between radios  | Arrow within group  |

---

## Performance Benchmarks

| Test Category  | Threshold | Measurement              |
| -------------- | --------- | ------------------------ |
| Simple Render  | 50ms      | Time to first paint      |
| Complex Render | 100ms     | Full component render    |
| State Change   | 10ms      | Selection response time  |
| Group Update   | 15ms      | Multi-radio coordination |
| Memory Usage   | Stable    | No leaks over time       |

---

## Common Test Patterns

### Testing Radio Selection

```typescript
it('selects radio when clicked', async () => {
  const handleChange = vi.fn()
  const { user } = render(
    <Radio label="Option A" value="a" onChange={handleChange} />
  )

  const radio = screen.getByRole('radio')
  await user.click(radio)

  expect(radio).toBeChecked()
  expect(handleChange).toHaveBeenCalledWith(true)
})
```

### Testing RadioGroup Coordination

```typescript
it('allows only one selection in group', async () => {
  const { user } = render(
    <RadioGroup name="test-group" value="">
      <Radio label="Option A" value="a" />
      <Radio label="Option B" value="b" />
    </RadioGroup>
  )

  const radios = screen.getAllByRole('radio')

  await user.click(radios[0])
  expect(radios[0]).toBeChecked()
  expect(radios[1]).not.toBeChecked()

  await user.click(radios[1])
  expect(radios[0]).not.toBeChecked()
  expect(radios[1]).toBeChecked()
})
```

### Testing Keyboard Navigation

```typescript
it('supports arrow key navigation in group', async () => {
  const { user } = render(
    <RadioGroup name="nav-group">
      <Radio label="First" value="first" />
      <Radio label="Second" value="second" />
      <Radio label="Third" value="third" />
    </RadioGroup>
  )

  const radios = screen.getAllByRole('radio')
  radios[0].focus()

  await user.keyboard('{ArrowDown}')
  expect(radios[1]).toHaveFocus()

  await user.keyboard('{ArrowDown}')
  expect(radios[2]).toHaveFocus()
})
```

### Testing Accessibility

```typescript
it('meets WCAG standards for radio group', async () => {
  const { container } = render(
    <fieldset>
      <legend>Choose an option</legend>
      <RadioGroup name="accessible-group">
        <Radio label="Option 1" value="1" />
        <Radio label="Option 2" value="2" />
      </RadioGroup>
    </fieldset>
  )

  await assertAccessibility(container)
})
```

---

## Special Considerations

### Radio Button Behavior

- Once selected, individual radios cannot be unselected by clicking
- Only programmatic changes or form reset can unselect
- Use checkbox for toggleable single options

### RadioGroup Coordination

- All radios in a group must have the same `name` attribute
- Each radio should have a unique `value` attribute
- Group value represents the selected radio's value

### Keyboard Navigation

- Tab moves between radio groups
- Arrow keys move within a radio group
- Space selects the focused radio
- First radio in group receives initial focus

### Form Integration

- Only the selected radio's value is submitted
- Unselected radio groups submit no value
- Use `required` on the group, not individual radios

---

## Maintenance Guidelines

1. **Adding New Tests**: Follow established patterns and use builders
2. **Performance Tests**: Update thresholds if component complexity changes
3. **Accessibility Tests**: Test both individual and group scenarios
4. **Group Testing**: Ensure coordination between radios works correctly
5. **Documentation**: Update this file when adding new test categories

---

## Related Documentation

- [Testing Guide](../../TESTING_GUIDE.md) - Overall testing philosophy and setup
- [Radio Component](../../../lib/components/Radio/) - Component implementation
- [Test Utilities](../../test-utils/) - Shared testing utilities and helpers
- [Form Components](../../../lib/components/) - Related form components
- [Checkbox Tests](../Checkbox/README.md) - Similar component patterns
