# ButtonV2 Component - Accessibility

## Overview

ButtonV2 is fully accessible and meets WCAG 2.2 Level AA standards. All accessibility features are implemented using shared utilities from `lib/utils/accessibility/`.

## Keyboard Navigation

- **Tab**: Focuses the button
- **Enter**: Activates the button
- **Space**: Activates the button

## ARIA Attributes

ButtonV2 automatically applies appropriate ARIA attributes:

- `aria-disabled`: Indicates when button is disabled
- `aria-label`: Provides accessible name for icon-only buttons (when provided)
- `aria-busy`: Indicates loading state
- `aria-live`: Announces loading state to screen readers

## Screen Reader Support

- Announces button text or aria-label
- Announces disabled state
- Announces loading state ("Loading, please wait")
- Icon-only buttons require `aria-label` prop (validated in development)

## Focus Management

- Button receives focus when tabbed to
- Focus visible with outline (from tokens)
- Disabled buttons have `tabIndex={-1}` (not focusable)
- Focus indicators meet WCAG 2.2 contrast requirements

## Color Contrast

- Meets WCAG 2.2 AA requirements
- Normal text: 4.5:1 minimum contrast
- Large text (18pt+): 3:1 minimum contrast
- All button variants tested for contrast compliance

## Icon-Only Buttons

Icon-only buttons **must** have an `aria-label` prop:

```tsx
// ✅ Correct
<ButtonV2
    subType={ButtonV2SubType.ICON_ONLY}
    leadingIcon={<Icon />}
    aria-label="Close dialog"
/>

// ❌ Incorrect - will show warning in development
<ButtonV2
    subType={ButtonV2SubType.ICON_ONLY}
    leadingIcon={<Icon />}
/>
```

## Loading State

When `loading={true}`, ButtonV2:

- Shows loading spinner
- Sets `aria-busy="true"`
- Announces "Loading, please wait" to screen readers
- Prevents interaction (click handler returns early)

## Disabled State

When `disabled={true}`, ButtonV2:

- Sets `aria-disabled="true"`
- Sets `tabIndex={-1}` (removes from tab order)
- Prevents all interactions
- Shows disabled visual state

## Examples

### Accessible Button with Text

```tsx
<ButtonV2
    buttonType={ButtonV2Type.PRIMARY}
    text="Submit Form"
    onClick={handleSubmit}
/>
```

### Accessible Icon-Only Button

```tsx
<ButtonV2
    buttonType={ButtonV2Type.SECONDARY}
    subType={ButtonV2SubType.ICON_ONLY}
    leadingIcon={<CloseIcon />}
    aria-label="Close modal"
    onClick={handleClose}
/>
```

### Accessible Loading Button

```tsx
<ButtonV2
    buttonType={ButtonV2Type.PRIMARY}
    text="Saving..."
    loading={true}
    onClick={handleSave}
/>
```

## Testing

All accessibility features are tested using:

- `jest-axe` for WCAG compliance
- Keyboard navigation tests
- Screen reader testing
- Focus management tests

See `ButtonV2.test.tsx` for complete test coverage.

## Related Documentation

- [RFC 0003: Accessibility Standards](../../../rfcs/0003-accessibility-standards.md)
- [Accessibility Utilities](../../../utils/accessibility/index.ts)
