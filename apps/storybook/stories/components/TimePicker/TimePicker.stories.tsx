import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { TimePicker, TimePickerSize } from '@juspay/blend-design-system'
import type { TimeValue } from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof TimePicker> = {
    title: 'Components/TimePicker',
    component: TimePicker,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A time-of-day picker with hour/minute/second listbox columns, sharing its trigger with DateRangePicker and SingleDatePicker.',
        docs: {
            description: {
                component: `
## Usage
\`\`\`tsx
const [time, setTime] = useState<TimeValue>({ hours: 14, minutes: 30, seconds: 0 });

<TimePicker
  value={time}
  onChange={setTime}
  format="12h"
/>
\`\`\`

## Features:
- Canonical 24-hour \`TimeValue\` ({ hours, minutes, seconds }) regardless of display format
- \`format\` ('12h' | '24h') is display-only and never changes the stored value
- Optional seconds column via \`showSeconds\`
- Configurable minute granularity via \`minuteStep\`
- Min/max time clamping, with out-of-bounds options rendered disabled
- Controlled (pass \`value\`) or uncontrolled (omit \`value\`, read via \`onChange\`) usage
- Hidden form input via \`name\` for native form posts
- Error state with associated error message
- Disabled state support
- Accessible keyboard navigation
        `,
            },
        },
    },
    argTypes: {
        // Core Props
        value: {
            control: false,
            description:
                'Canonical 24-hour value. Omit for uncontrolled usage.',
            table: {
                type: { summary: 'TimeValue' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'time-changed',
            description: 'Called with a clamped, step-snapped canonical value.',
            table: {
                type: { summary: '(value: TimeValue) => void' },
                category: 'Core',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description:
                'Trigger text when there is no value. Defaults to a format-shaped hint.',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },

        // Time Configuration
        format: {
            control: { type: 'select' },
            options: ['12h', '24h'],
            description:
                'Display format only — never affects `value`. Defaults to `12h`.',
            table: {
                type: { summary: "'12h' | '24h'" },
                defaultValue: { summary: '12h' },
                category: 'Time Configuration',
            },
        },
        showSeconds: {
            control: { type: 'boolean' },
            description:
                'Adds a seconds column and shows seconds in the trigger.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Time Configuration',
            },
        },
        minuteStep: {
            control: { type: 'number', min: 1, max: 30 },
            description: 'Minute granularity of the minutes column.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '1' },
                category: 'Time Configuration',
            },
        },
        minTime: {
            control: false,
            description:
                'Inclusive lower bound. Out-of-bounds options render disabled.',
            table: {
                type: { summary: 'TimeValue' },
                category: 'Time Configuration',
            },
        },
        maxTime: {
            control: false,
            description:
                'Inclusive upper bound. Out-of-bounds options render disabled.',
            table: {
                type: { summary: 'TimeValue' },
                category: 'Time Configuration',
            },
        },

        // UI State
        disabled: {
            control: { type: 'boolean' },
            description: 'Disable the entire time picker',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'UI State',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Applies the error border to the trigger',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'UI State',
            },
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Rendered in a live region and linked to the trigger',
            table: {
                type: { summary: 'string' },
                category: 'UI State',
            },
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Size variant of the time picker',
            table: {
                type: { summary: 'TimePickerSize' },
                defaultValue: { summary: 'md' },
                category: 'UI State',
            },
        },

        // Advanced
        name: {
            control: { type: 'text' },
            description:
                'Emits a hidden input carrying "HH:mm" / "HH:mm:ss" for form posts.',
            table: {
                type: { summary: 'string' },
                category: 'Advanced',
            },
        },
        'aria-label': {
            control: { type: 'text' },
            description: 'Accessible label for the trigger',
            table: {
                type: { summary: 'string' },
                category: 'Advanced',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TimePicker>

// Default story - basic time picker (12h)
export const Default: Story = {
    render: function Default() {
        const [time, setTime] = useState<TimeValue>({
            hours: 14,
            minutes: 30,
            seconds: 0,
        })

        return (
            <div className="w-75">
                <TimePicker value={time} onChange={setTime} />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic TimePicker with default 12-hour display format and controlled state management.',
            },
        },
    },
}

// 24-hour format
export const TwentyFourHour: Story = {
    render: function TwentyFourHour() {
        const [time, setTime] = useState<TimeValue>({
            hours: 14,
            minutes: 30,
            seconds: 0,
        })

        return (
            <div className="w-75">
                <TimePicker value={time} onChange={setTime} format="24h" />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker displayed in 24-hour format. The stored value is identical to the 12-hour equivalent — only the trigger and columns render differently.',
            },
        },
    },
}

// With seconds
export const WithSeconds: Story = {
    render: function WithSeconds() {
        const [time, setTime] = useState<TimeValue>({
            hours: 9,
            minutes: 15,
            seconds: 45,
        })

        return (
            <div className="w-75">
                <TimePicker value={time} onChange={setTime} showSeconds />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker with a seconds column enabled via `showSeconds`.',
            },
        },
    },
}

// Minute step of 15
export const MinuteStep15: Story = {
    render: function MinuteStep15() {
        const [time, setTime] = useState<TimeValue>({
            hours: 10,
            minutes: 30,
            seconds: 0,
        })

        return (
            <div className="w-75">
                <TimePicker value={time} onChange={setTime} minuteStep={15} />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker with `minuteStep={15}`, restricting the minutes column to :00, :15, :30, :45.',
            },
        },
    },
}

// Min/max clamping
export const MinMaxClamping: Story = {
    render: function MinMaxClamping() {
        const [time, setTime] = useState<TimeValue>({
            hours: 12,
            minutes: 0,
            seconds: 0,
        })

        return (
            <div className="w-75">
                <TimePicker
                    value={time}
                    onChange={setTime}
                    minTime={{ hours: 9, minutes: 0, seconds: 0 }}
                    maxTime={{ hours: 17, minutes: 0, seconds: 0 }}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker restricted to business hours (9:00 AM - 5:00 PM) via `minTime`/`maxTime`. Options outside this range render disabled and selections are clamped into range.',
            },
        },
    },
}

// Disabled state
export const Disabled: Story = {
    render: function Disabled() {
        const [time, setTime] = useState<TimeValue>({
            hours: 14,
            minutes: 30,
            seconds: 0,
        })

        return (
            <div className="w-75">
                <TimePicker value={time} onChange={setTime} disabled />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker in a disabled state; the trigger cannot be opened.',
            },
        },
    },
}

// Error state
export const WithError: Story = {
    render: function WithError() {
        const [time, setTime] = useState<TimeValue | undefined>(undefined)

        return (
            <div className="w-75">
                <TimePicker
                    value={time}
                    onChange={setTime}
                    error
                    errorMessage="Please select a valid time"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker in an error state with an associated error message.',
            },
        },
    },
}

// Sizes
export const Sizes: Story = {
    render: function Sizes() {
        const [smTime, setSmTime] = useState<TimeValue>({
            hours: 14,
            minutes: 30,
            seconds: 0,
        })
        const [mdTime, setMdTime] = useState<TimeValue>({
            hours: 14,
            minutes: 30,
            seconds: 0,
        })
        const [lgTime, setLgTime] = useState<TimeValue>({
            hours: 14,
            minutes: 30,
            seconds: 0,
        })

        return (
            <div className="flex flex-col gap-6 w-75">
                <div>
                    <h4 className="text-sm font-semibold mb-3">Small</h4>
                    <TimePicker
                        value={smTime}
                        onChange={setSmTime}
                        size={TimePickerSize.SMALL}
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-3">Medium</h4>
                    <TimePicker
                        value={mdTime}
                        onChange={setMdTime}
                        size={TimePickerSize.MEDIUM}
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-3">Large</h4>
                    <TimePicker
                        value={lgTime}
                        onChange={setLgTime}
                        size={TimePickerSize.LARGE}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'TimePicker rendered at all three size variants: small, medium, and large.',
            },
        },
    },
}
