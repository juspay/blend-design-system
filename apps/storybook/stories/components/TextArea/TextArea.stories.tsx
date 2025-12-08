import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { TextArea } from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof TextArea> = {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for interactive form controls
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A multi-line text input component for longer text content with support for labels, validation, resize controls, and error handling.

## Features
- Multi-line text input with configurable rows and columns
- Resize control options (none, both, horizontal, vertical, block, inline)
- Error state handling with custom messages
- Required field indication
- Label, sublabel, and hint text support
- Help tooltips with additional information
- Auto-focus support
- Disabled state support
- Form integration ready
- Accessible design with proper labeling

## Accessibility

- Uses native \`<textarea>\` element for proper semantics
- Labels are associated via \`label\`, \`sublabel\`, and \`name\` props
- Required state is visually indicated and exposed via \`required\` / \`aria-required\`
- Error state is exposed via error text and can be associated with textarea via \`InputFooter\`
- Focus styles and error shake patterns are keyboard-friendly
- Hint and help text provide additional instructions for users and assistive technologies
- Resize controls are accessible and keyboard-operable

**WCAG Compliance Target**: 2.0, 2.1, 2.2 Level A, AA, AAA (designed to support 2.2 as the latest version of WCAG [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)])

**Intended coverage:**
- **Perceivable**: Labels, hints, and error messages are visible and can be programmatically associated
- **Operable**: Fully keyboard operable (Tab / Shift+Tab focus, Enter for new lines, standard text editing)
- **Understandable**: Clear labels, inline help, and error messaging patterns
- **Robust**: Built with semantic HTML and ARIA-friendly props for screen readers

**Verification:**
- **Storybook a11y addon**: Use the Accessibility panel to check for violations (expected 0 for A/AA/AAA)
- **jest-axe tests**: Run \`pnpm test TextArea.accessibility\` to automate WCAG checks
- **Manual tests**: Verify with screen readers (VoiceOver/NVDA), keyboard-only navigation, and contrast tools

> Note: WCAG 2.2 builds on 2.1 and 2.0; content that conforms to 2.2 also conforms to earlier versions [[WCAG 2 Overview](https://www.w3.org/WAI/standards-guidelines/wcag/#versions)].

## Usage

\`\`\`tsx
import { TextArea } from '@juspay/blend-design-system';

<TextArea
  label="Description"
  placeholder="Enter your description..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  required
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        value: {
            control: { type: 'text' },
            description: 'Current value of the textarea',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the textarea value changes',
            table: {
                type: {
                    summary:
                        '(e: React.ChangeEvent<HTMLTextAreaElement>) => void',
                },
                category: 'Core',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when textarea is empty',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        rows: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Number of visible text rows',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
                category: 'Layout',
            },
        },
        cols: {
            control: { type: 'number', min: 10, max: 100 },
            description: 'Number of visible character columns',
            table: {
                type: { summary: 'number' },
                category: 'Layout',
            },
        },
        resize: {
            control: { type: 'select' },
            options: [
                'none',
                'both',
                'horizontal',
                'vertical',
                'block',
                'inline',
            ],
            description: 'Resize behavior of the textarea',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'vertical' },
                category: 'Layout',
            },
        },
        wrap: {
            control: { type: 'select' },
            options: [
                'normal',
                'nowrap',
                'pre',
                'pre-wrap',
                'pre-line',
                'break-spaces',
            ],
            description: 'Text wrapping behavior',
            table: {
                type: { summary: 'string' },
                category: 'Layout',
            },
        },
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the textarea',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label text displayed below the main label',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint text displayed below the textarea',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Tooltip text for the help icon',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is in error state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Error message displayed when in error state',
            table: {
                type: { summary: 'string' },
                category: 'Validation',
            },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is required (shows asterisk)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the textarea is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        autoFocus: {
            control: { type: 'boolean' },
            description: 'Whether the textarea should auto-focus on mount',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        onFocus: {
            action: 'focused',
            description: 'Callback fired when the textarea receives focus',
            table: {
                type: {
                    summary:
                        '(e: React.FocusEvent<HTMLTextAreaElement>) => void',
                },
                category: 'Events',
            },
        },
        onBlur: {
            action: 'blurred',
            description: 'Callback fired when the textarea loses focus',
            table: {
                type: {
                    summary:
                        '(e: React.FocusEvent<HTMLTextAreaElement>) => void',
                },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextArea>

// Default story
export const Default: Story = {
    render: function DefaultTextArea(args) {
        const [value, setValue] = useState('')

        return (
            <TextArea
                {...args}
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
        )
    },
    args: {
        label: 'Default Text Area',
        placeholder: 'Enter your text here...',
        rows: 4,
        disabled: false,
        required: false,
        error: false,
        resize: 'vertical',
    },
}

// Different sizes
export const DifferentSizes: Story = {
    render: () => {
        const [values, setValues] = useState({
            small: '',
            medium: '',
            large: '',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextArea
                    label="Small (3 rows)"
                    placeholder="Small textarea..."
                    rows={3}
                    value={values.small}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            small: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Medium (5 rows)"
                    placeholder="Medium textarea..."
                    rows={5}
                    value={values.medium}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            medium: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Large (8 rows)"
                    placeholder="Large textarea..."
                    rows={8}
                    value={values.large}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            large: e.target.value,
                        }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with different row counts: 3, 5, and 8 rows.',
            },
        },
    },
}

// Resize options
export const ResizeOptions: Story = {
    render: () => {
        const [values, setValues] = useState({
            none: '',
            vertical: '',
            horizontal: '',
            both: '',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextArea
                    label="No Resize"
                    placeholder="This textarea cannot be resized..."
                    rows={4}
                    resize="none"
                    value={values.none}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, none: e.target.value }))
                    }
                />
                <TextArea
                    label="Vertical Resize"
                    placeholder="This textarea can be resized vertically..."
                    rows={4}
                    resize="vertical"
                    value={values.vertical}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            vertical: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Horizontal Resize"
                    placeholder="This textarea can be resized horizontally..."
                    rows={4}
                    resize="horizontal"
                    value={values.horizontal}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            horizontal: e.target.value,
                        }))
                    }
                />
                <TextArea
                    label="Both Directions"
                    placeholder="This textarea can be resized in both directions..."
                    rows={4}
                    resize="both"
                    value={values.both}
                    onChange={(e) =>
                        setValues((prev) => ({ ...prev, both: e.target.value }))
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with different resize options: none, vertical, horizontal, and both.',
            },
        },
    },
}

// Error and validation states
export const ErrorStates: Story = {
    render: () => {
        const [values, setValues] = useState({
            required: '',
            tooShort: 'Short',
            valid: 'This is a valid description that meets all the requirements for the form field.',
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <TextArea
                    label="Required Field"
                    placeholder="This field is required..."
                    value={values.required}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            required: e.target.value,
                        }))
                    }
                    required
                    error={values.required === ''}
                    errorMessage={
                        values.required === '' ? 'This field is required' : ''
                    }
                    rows={3}
                />
                <TextArea
                    label="Minimum Length"
                    placeholder="Enter at least 10 characters..."
                    value={values.tooShort}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            tooShort: e.target.value,
                        }))
                    }
                    error={
                        values.tooShort.length > 0 &&
                        values.tooShort.length < 10
                    }
                    errorMessage={
                        values.tooShort.length > 0 &&
                        values.tooShort.length < 10
                            ? 'Minimum 10 characters required'
                            : ''
                    }
                    hintText={`${values.tooShort.length}/10 characters`}
                    rows={3}
                />
                <TextArea
                    label="Valid Description"
                    placeholder="Enter description..."
                    value={values.valid}
                    onChange={(e) =>
                        setValues((prev) => ({
                            ...prev,
                            valid: e.target.value,
                        }))
                    }
                    hintText="This description meets all requirements"
                    rows={3}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea showing different validation states: required, minimum length, and valid.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextArea
                label="Disabled Empty"
                placeholder="This textarea is disabled"
                value=""
                onChange={() => {}}
                rows={4}
                disabled
            />
            <TextArea
                label="Disabled With Content"
                value="This textarea is disabled and contains some content that cannot be edited."
                onChange={() => {}}
                rows={4}
                disabled
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'TextArea in disabled state, both empty and with content.',
            },
        },
    },
}

// With comprehensive labels
export const WithLabelsAndHints: Story = {
    render: () => {
        const [value, setValue] = useState('')
        const maxLength = 500

        return (
            <TextArea
                label="Project Description"
                sublabel="Detailed overview of your project"
                hintText={`${value.length}/${maxLength} characters`}
                helpIconHintText="Provide a comprehensive description that will help reviewers understand your project goals and methodology"
                placeholder="Describe your project in detail..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={6}
                maxLength={maxLength}
                required
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with comprehensive labeling: main label, sublabel, hint text with character count, and help tooltip.',
            },
        },
    },
}

// Auto-focus example
export const AutoFocus: Story = {
    render: () => {
        const [value, setValue] = useState('')

        return (
            <TextArea
                label="Auto-focused TextArea"
                placeholder="This textarea will auto-focus when the story loads..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={4}
                autoFocus
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TextArea with auto-focus enabled - it will receive focus when the component mounts.',
            },
        },
    },
}

// Accessibility-focused examples
export const Accessibility: Story = {
    render: () => {
        const [description, setDescription] = useState('')
        const [feedback, setFeedback] = useState('')
        const [disabledValue] = useState(
            'This field is disabled and cannot be edited'
        )
        const [keyboardText, setKeyboardText] = useState('')

        const descriptionError =
            description.length > 0 && description.length < 10
                ? 'Please enter at least 10 characters'
                : ''

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    padding: '24px',
                    maxWidth: '800px',
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Labels, Required Fields, and Hints
                    </h3>
                    <TextArea
                        label="Project Description"
                        sublabel="Provide a detailed overview of your project"
                        hintText="Enter at least 10 characters for a meaningful description"
                        placeholder="Describe your project..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        required
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Error Messaging and Validation
                    </h3>
                    <TextArea
                        label="Feedback"
                        placeholder="Enter your feedback..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={4}
                        error={!!descriptionError}
                        errorMessage={descriptionError}
                        hintText="Minimum 10 characters required"
                        required
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Disabled and Read-Only Contexts
                    </h3>
                    <TextArea
                        label="Disabled TextArea"
                        value={disabledValue}
                        onChange={() => {}}
                        rows={4}
                        disabled
                        hintText="Disabled fields are not focusable and do not submit values"
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Keyboard and Screen Reader Friendly Layout
                    </h3>
                    <TextArea
                        label="Comments"
                        sublabel="Use Tab to navigate, standard keyboard shortcuts for text editing"
                        hintText="You can use standard text editing shortcuts (Ctrl/Cmd+A, Ctrl/Cmd+C, etc.)"
                        placeholder="Enter your comments..."
                        value={keyboardText}
                        onChange={(e) => setKeyboardText(e.target.value)}
                        rows={5}
                        required
                        helpIconHintText="Keyboard shortcuts: Tab/Shift+Tab to navigate, standard text editing shortcuts work as expected"
                    />
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}
                    >
                        Character Count and Length Limits
                    </h3>
                    <TextArea
                        label="Review Notes"
                        sublabel="Maximum 500 characters"
                        hintText={`${keyboardText.length}/500 characters`}
                        placeholder="Enter review notes..."
                        value={keyboardText}
                        onChange={(e) => setKeyboardText(e.target.value)}
                        rows={4}
                        maxLength={500}
                        required
                    />
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating labeling, required indicators, error messaging, disabled state, keyboard navigation, and character limits.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to label / control associations, error messaging, and keyboard navigation.

2. **jest-axe tests**:
   - Add \`TextArea.accessibility.test.tsx\` mirroring TextInput's tests and run:
   \`\`\`bash
   pnpm test:a11y:file __tests__/components/Inputs/TextArea.accessibility.test.tsx
   \`\`\`
   - Validate WCAG 2.0, 2.1, 2.2 A, AA, and AAA success criteria for form fields (labels, errors, keyboard support, focus management).

3. **Manual testing**:
   - Navigate using keyboard only (Tab / Shift+Tab, standard text editing shortcuts).
   - Use a screen reader (VoiceOver/NVDA) to confirm labels, hints, and errors are announced.
   - Verify color contrast of text, borders, and focus styles using contrast tools.
   - Test resize functionality with keyboard and screen readers.
                `,
            },
        },
        a11y: {
            ...getA11yConfig('form'),
        },
    },
}
