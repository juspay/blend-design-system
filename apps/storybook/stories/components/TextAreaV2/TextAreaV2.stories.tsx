import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { ThemeProvider } from '@juspay/blend-design-system'
import { TextAreaV2 } from '../../../../../packages/blend/lib/components/InputsV2/TextAreaV2'

const meta: Meta<typeof TextAreaV2> = {
    title: 'Components/Inputs/TextAreaV2',
    component: TextAreaV2,
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        ),
    ],
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Multi-line text field (V2) using \`TEXT_AREA_V2\` tokens, \`InputLabelsV2\`, and \`InputFooterV2\` — same Inputs V2 patterns as \`TextInputV2\` (no size variants or left/right slots).

## Features
- Label, sublabel, hint text, and optional help hint on the label (\`helpIconHintText\`)
- \`error: { show, message? }\`, \`required\`, \`disabled\`
- \`rows\`, \`resize\`, \`wrap\` — passed to the native \`<textarea>\`
- On small breakpoints, static labels are hidden and placeholder is cleared
- Forwarded \`ref\` attaches to the \`<textarea>\` element
- \`filterBlockedProps\` strips \`className\` / \`style\` from spread rest

## Accessibility

- Uses native \`<textarea>\`; labels associated via \`label\` and \`htmlFor\` / \`id\`
- Required: \`required\` and \`aria-required\`
- Error and hint linked via \`aria-describedby\` (\`id\`-based); error message uses \`role="alert"\` in the footer
- Focus styles align with TextInput V2 (\`FOCUS_RING_STYLES\`)
- **WCAG target**: 2.1 Level AA (supports 2.2)

**Verification:**
- **Storybook a11y addon**: Accessibility panel — expect 0 violations for A/AA
- **Manual**: Screen readers (VoiceOver/NVDA), keyboard-only navigation, contrast tools

## Usage

\`\`\`tsx
import { TextAreaV2 } from '@juspay/blend-design-system/...';

const [notes, setNotes] = useState('');

<TextAreaV2
  label="Notes"
  placeholder="Add details..."
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  rows={4}
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
            table: { type: { summary: 'string' }, category: 'Core' },
        },
        placeholder: {
            control: { type: 'text' },
            description:
                'Placeholder when empty (suppressed on small breakpoints in the component)',
            table: { type: { summary: 'string' }, category: 'Content' },
        },
        label: {
            control: { type: 'text' },
            description: 'Label text above the field',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label below the main label',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint text below the textarea',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Tooltip text for the label help icon',
            table: { type: { summary: 'string' }, category: 'Labels' },
        },
        rows: {
            control: { type: 'number', min: 1 },
            table: { type: { summary: 'number' }, category: 'Layout' },
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
            table: { type: { summary: 'string' }, category: 'Layout' },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Shows asterisk and sets aria-required',
            table: { type: { summary: 'boolean' }, category: 'Validation' },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Disables the textarea',
            table: { type: { summary: 'boolean' }, category: 'State' },
        },
        error: {
            control: { type: 'object' },
            description: 'Validation: { show: boolean; message?: string }',
            table: { type: { summary: 'object' }, category: 'Validation' },
        },
        autoFocus: {
            control: { type: 'boolean' },
            description: 'Focus the textarea on mount',
            table: { type: { summary: 'boolean' }, category: 'Behavior' },
        },
        onChange: {
            action: 'changed',
            table: {
                type: {
                    summary:
                        '(e: React.ChangeEvent<HTMLTextAreaElement>) => void',
                },
                category: 'Events',
            },
        },
        onFocus: {
            action: 'focused',
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
type Story = StoryObj<typeof TextAreaV2>

export const Default: Story = {
    render: function DefaultTextAreaV2(args) {
        const [value, setValue] = useState('')
        return (
            <TextAreaV2
                {...args}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value)
                    args.onChange?.(e)
                }}
            />
        )
    },
    args: {
        label: 'Description',
        placeholder: 'Enter a description…',
        rows: 4,
        disabled: false,
        required: false,
        error: { show: false, message: '' },
        resize: 'vertical',
    },
}

export const WithError: Story = {
    render: function WithErrorStory() {
        const [value, setValue] = useState('Too short')
        return (
            <TextAreaV2
                label="Bio"
                placeholder="Tell us about yourself"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                error={{
                    show: true,
                    message: 'Please enter at least 50 characters.',
                }}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Error state with `error: { show: true, message }` (footer shows the alert; hint is omitted when `error.show` is true).',
            },
        },
    },
}

export const Disabled: Story = {
    render: function DisabledStory() {
        const [value] = useState('Read-only content.')
        return (
            <TextAreaV2
                label="Comments"
                placeholder="Cannot edit"
                value={value}
                onChange={() => {}}
                disabled
                hintText="This field is disabled."
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled textarea.',
            },
        },
    },
}

export const Required: Story = {
    render: function RequiredStory() {
        const [value, setValue] = useState('')
        return (
            <TextAreaV2
                label="Feedback"
                sublabel="Required for submission"
                placeholder="Your feedback…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
                helpIconHintText="Feedback is reviewed by the product team."
                rows={5}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Required field with sublabel and help hint on the label.',
            },
        },
    },
}

export const ResizeNone: Story = {
    render: function ResizeNoneStory() {
        const [value, setValue] = useState('')
        return (
            <TextAreaV2
                label="Fixed size"
                placeholder="Resize locked"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                resize="none"
                rows={4}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: '`resize="none"` — user cannot drag-resize.',
            },
        },
    },
}

export const Tall: Story = {
    render: function TallStory() {
        const [value, setValue] = useState('')
        return (
            <TextAreaV2
                label="Long form"
                placeholder="Paste or write a long answer…"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={12}
                resize="vertical"
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Many rows with vertical resize.',
            },
        },
    },
}

export const AutoFocus: Story = {
    render: function AutoFocusStory() {
        const [value, setValue] = useState('')
        return (
            <TextAreaV2
                label="Auto-focused"
                placeholder="Starts focused"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
                hintText="The textarea requests focus on mount."
            />
        )
    },
    parameters: {
        chromatic: {
            ...CHROMATIC_CONFIG,
            disableSnapshot: true,
        },
        docs: {
            description: {
                story: '`autoFocus` — Chromatic snapshot disabled to avoid focus flake.',
            },
        },
    },
}
