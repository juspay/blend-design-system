/**
 * Strings for Inputs and InputsV2 (TextInput, MultiValueInput, SearchInput,
 * DropdownInput, UnitInput) and TextInputGroup.
 *
 * The V1 and V2 password toggles keep their own wording: V1 announces the
 * current state as well, V2 only the action. Both are kept verbatim rather
 * than unified, so English output does not change.
 *
 * ChatInputV2 lives under `InputsV2/` but has its own strings with ChatInput.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const INPUT_MESSAGES = {
    'input.placeholder.enter': 'Enter',
    'input.a11y.show-password': 'Show password',
    'input.a11y.hide-password': 'Hide password',
    'input.a11y.show-password-verbose':
        'Show password. Currently hiding password.',
    'input.a11y.hide-password-verbose':
        'Hide password. Currently showing password as plain text.',
    'input.a11y.password-group': '{label} input with visibility toggle',
    'input.a11y.password-group-unnamed':
        'Password input with visibility toggle',
    'input.a11y.remove-value': 'Remove {value}',
    'input.a11y.clear-search': 'Clear search',
    'input.a11y.increase': 'Increase {label}',
    'input.a11y.increase-value': 'Increase value',
    'input.a11y.decrease': 'Decrease {label}',
    'input.a11y.decrease-value': 'Decrease value',
    // NumberInput/NumberInputV2 range errors are rendered as the field's
    // error text. `{min}`/`{max}` are passed unformatted, as before.
    'input.error.range-between': 'Value must be between {min} and {max}',
    'input.error.range-min': 'Value must be at least {min}',
    'input.error.range-max': 'Value must be at most {max}',
    'input.error.invalid-value': 'Invalid value',
    'input.error.unit-too-long': 'Unit must be {max} characters or fewer.',
    'input.a11y.select-option': 'Select option',
    'input.label.number-input': 'Number Input',
    'input.a11y.text-input-group': 'TextInput group',
} as const
