import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    SingleDatePicker,
    DateRangePickerSize,
    DateFormatPreset,
} from '@juspay/blend-design-system'
import type {
    DateFormatConfig,
    TriggerConfig,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import { Calendar } from 'lucide-react'

const meta: Meta<typeof SingleDatePicker> = {
    title: 'Components/SingleDatePicker',
    component: SingleDatePicker,
    parameters: {
        layout: 'padded',
        a11y: getA11yConfig('form'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A single date picker with an optional time-of-day section, built on the same calendar and trigger primitives as DateRangePicker.',
        docs: {
            description: {
                component: `
## Usage
\`\`\`tsx
const [date, setDate] = useState<Date | undefined>(new Date());

<SingleDatePicker
  value={date}
  onChange={setDate}
  placeholder="Select date"
/>
\`\`\`

## Features:
- Interactive calendar grid for single date selection
- Optional time-of-day section (12h/24h, with or without seconds)
- Min/max date constraints
- Per-date disable predicate for custom disabled days
- **Timezone support**: IANA timezone strings drive "today" and trigger formatting
- Custom date formatting via \`dateFormat\` or \`formatConfig\`
- Custom trigger element support via \`triggerConfig.renderTrigger\`
- Inline clear affordance via \`allowClear\`
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
                'Committed value. `undefined` means "nothing selected".',
            table: {
                type: { summary: 'Date | undefined' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'date-changed',
            description:
                'Fired on Apply, and with `undefined` when the value is cleared.',
            table: {
                type: { summary: '(date: Date | undefined) => void' },
                category: 'Core',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text shown when no date is selected',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Select date' },
                category: 'Core',
            },
        },

        // Date Configuration
        minDate: {
            control: { type: 'date' },
            description: 'Minimum selectable date',
            table: {
                type: { summary: 'Date' },
                category: 'Date Configuration',
            },
        },
        maxDate: {
            control: { type: 'date' },
            description: 'Maximum selectable date',
            table: {
                type: { summary: 'Date' },
                category: 'Date Configuration',
            },
        },
        disableDates: {
            control: false,
            description:
                'Per-date predicate; disabled days are unclickable in the calendar',
            table: {
                type: { summary: '(date: Date) => boolean' },
                category: 'Date Configuration',
            },
        },
        dateFormat: {
            control: { type: 'text' },
            description: 'Format string for date display (e.g., dd/MM/yyyy)',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'dd/MM/yyyy' },
                category: 'Date Configuration',
            },
        },
        formatConfig: {
            control: false,
            description: 'Advanced date formatting configuration',
            table: {
                type: { summary: 'DateFormatConfig' },
                category: 'Date Configuration',
            },
        },
        timezone: {
            control: { type: 'text' },
            description:
                'IANA timezone string (e.g., "Asia/Tokyo") that drives "today" and the trigger\'s formatting',
            table: {
                type: { summary: 'string' },
                category: 'Date Configuration',
            },
        },

        // Time Configuration
        showTime: {
            control: { type: 'boolean' },
            description: 'Renders a time selector below the calendar',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Time Configuration',
            },
        },
        timeFormat: {
            control: { type: 'select' },
            options: ['12h', '24h'],
            description:
                'Display-only; the stored value is always a 24-hour `Date`',
            table: {
                type: { summary: "'12h' | '24h'" },
                defaultValue: { summary: '12h' },
                category: 'Time Configuration',
            },
        },
        showSeconds: {
            control: { type: 'boolean' },
            description: 'Adds a seconds column to the time selector',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Time Configuration',
            },
        },

        // UI State
        disabled: {
            control: { type: 'boolean' },
            description: 'Disable the entire date picker',
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
        allowClear: {
            control: { type: 'boolean' },
            description:
                'Renders the inline clear affordance inside the trigger',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'UI State',
            },
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'md', 'lg'],
            description: 'Size variant of the date picker',
            table: {
                type: { summary: 'DateRangePickerSize' },
                defaultValue: { summary: 'md' },
                category: 'UI State',
            },
        },

        // Advanced
        triggerConfig: {
            control: false,
            description: 'Custom trigger element configuration',
            table: {
                type: { summary: 'TriggerConfig' },
                category: 'Advanced',
            },
        },
        popoverConfig: {
            control: false,
            description:
                'Popover placement configuration (side, align, sideOffset)',
            table: {
                type: { summary: 'DateRangePickerPopoverConfig' },
                category: 'Advanced',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SingleDatePicker>

// Default story - basic single date picker
export const Default: Story = {
    render: function Default() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    placeholder="Select date"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic SingleDatePicker with default settings and controlled state management.',
            },
        },
    },
}

// With time selection (12h)
export const WithTime: Story = {
    render: function WithTime() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    showTime
                    timeFormat="12h"
                    placeholder="Select date and time"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker with a 12-hour time selector shown below the calendar.',
            },
        },
    },
}

// With time selection (24h) and seconds
export const WithTime24hAndSeconds: Story = {
    render: function WithTime24hAndSeconds() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    showTime
                    timeFormat="24h"
                    showSeconds
                    placeholder="Select date and time"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker with a 24-hour time selector including a seconds column.',
            },
        },
    },
}

// Min/max date range
export const MinMaxRange: Story = {
    render: function MinMaxRange() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    minDate={new Date('2024-01-01')}
                    maxDate={new Date('2024-12-31')}
                    placeholder="2024 dates only"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker constrained to a min/max date range (2024 only).',
            },
        },
    },
}

// Disabled dates (weekends)
export const DisabledDates: Story = {
    render: function DisabledDates() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        const disableWeekends = (candidate: Date) => {
            const day = candidate.getDay()
            return day === 0 || day === 6
        }

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    disableDates={disableWeekends}
                    placeholder="Weekdays only"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker with weekends disabled via a custom `disableDates` predicate.',
            },
        },
    },
}

// Allow clear
export const AllowClear: Story = {
    render: function AllowClear() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    allowClear
                    placeholder="Select date"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker with the inline clear affordance enabled, allowing the value to be reset to `undefined`.',
            },
        },
    },
}

// Error state
export const WithError: Story = {
    render: function WithError() {
        const [date, setDate] = useState<Date | undefined>(undefined)

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    error
                    errorMessage="Please select a valid date"
                    placeholder="Select date"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker in an error state with an associated error message.',
            },
        },
    },
}

// Disabled state
export const Disabled: Story = {
    render: function Disabled() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    disabled
                    placeholder="Select date"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker in a disabled state; the trigger cannot be opened.',
            },
        },
    },
}

// Custom formatting
export const CustomFormat: Story = {
    render: function CustomFormat() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        const formatConfig: DateFormatConfig = {
            preset: DateFormatPreset.LONG_SINGLE,
        }

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    formatConfig={formatConfig}
                    placeholder="Select date"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker using `formatConfig` to render the trigger with the `LONG_SINGLE` date format preset (e.g. "September 3rd, 2025").',
            },
        },
    },
}

// Timezone support
export const Timezone: Story = {
    render: function Timezone() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    timezone="Asia/Tokyo"
                    placeholder="Select date (JST)"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker with `timezone="Asia/Tokyo"`, so "today" and trigger formatting are calculated in that timezone rather than the system timezone.',
            },
        },
    },
}

// Custom trigger
export const CustomTrigger: Story = {
    render: function CustomTrigger() {
        const [date, setDate] = useState<Date | undefined>(new Date())

        const triggerConfig: TriggerConfig = {
            renderTrigger: ({
                isOpen,
                isDisabled,
                formattedValue,
                onClick,
            }) => (
                <button
                    type="button"
                    onClick={onClick}
                    disabled={isDisabled}
                    aria-expanded={isOpen}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid #d0d5dd',
                        background: '#fff',
                        cursor: isDisabled ? 'not-allowed' : 'pointer',
                    }}
                >
                    <Calendar size={16} />
                    {formattedValue || 'Pick a date'}
                </button>
            ),
        }

        return (
            <div className="w-100">
                <SingleDatePicker
                    value={date}
                    onChange={setDate}
                    triggerConfig={triggerConfig}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker with a fully custom trigger rendered via `triggerConfig.renderTrigger`.',
            },
        },
    },
}

// Sizes
export const Sizes: Story = {
    render: function Sizes() {
        const [smDate, setSmDate] = useState<Date | undefined>(new Date())
        const [mdDate, setMdDate] = useState<Date | undefined>(new Date())
        const [lgDate, setLgDate] = useState<Date | undefined>(new Date())

        return (
            <div className="flex flex-col gap-6 w-100">
                <div>
                    <h4 className="text-sm font-semibold mb-3">Small</h4>
                    <SingleDatePicker
                        value={smDate}
                        onChange={setSmDate}
                        size={DateRangePickerSize.SMALL}
                        placeholder="Select date"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-3">Medium</h4>
                    <SingleDatePicker
                        value={mdDate}
                        onChange={setMdDate}
                        size={DateRangePickerSize.MEDIUM}
                        placeholder="Select date"
                    />
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-3">Large</h4>
                    <SingleDatePicker
                        value={lgDate}
                        onChange={setLgDate}
                        size={DateRangePickerSize.LARGE}
                        placeholder="Select date"
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleDatePicker rendered at all three size variants: small, medium, and large.',
            },
        },
    },
}
