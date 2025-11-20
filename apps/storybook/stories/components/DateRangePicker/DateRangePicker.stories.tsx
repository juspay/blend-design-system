import type { Meta, StoryObj } from '@storybook/react-vite'
import React, { useState } from 'react'
import {
    DateRangePicker,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'

// Import types that might not be exported from main
type DateRange = {
    startDate: Date
    endDate: Date
    showTimePicker?: boolean
}

import {
    Calendar,
    CalendarDays,
    Clock,
    Filter,
    TrendingUp,
    BarChart,
    AlertCircle,
} from 'lucide-react'

const meta: Meta<typeof DateRangePicker> = {
    title: 'Components/DateRangePicker',
    component: DateRangePicker,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
A comprehensive date range picker component with calendar interface, time selection, preset ranges, and flexible configuration options for selecting date and time ranges.

## Features:
- Interactive calendar grid for date selection
- Optional time picker for precise time selection
- Quick preset ranges (today, yesterday, last 7 days, etc.)
- Custom date range selection
- Min/max date constraints
- Future/past date restrictions
- Single date selection mode
- Custom trigger element support
- Accessible keyboard navigation
- Customizable date formatting
- Disabled state support

## Use Cases:
- Analytics dashboards and date filtering
- Report generation with time periods
- Event scheduling and booking systems
- Financial data analysis
- User activity tracking
- Content management systems

## Documentation
[View complete documentation →](http://localhost:3000/docs/components/DateRangePicker)
        `,
            },
        },
    },
    argTypes: {
        // Core Props
        value: {
            control: false,
            description: 'Current selected date range with start and end dates',
            table: {
                type: { summary: 'DateRange' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'date-range-changed',
            description: 'Callback fired when the selected date range changes',
            table: {
                type: { summary: '(range: DateRange) => void' },
                category: 'Core',
            },
        },
        onPresetSelection: {
            action: 'preset-selected',
            description: 'Callback fired when a preset is selected',
            table: {
                type: { summary: '(data: PresetSelectionData) => void' },
                category: 'Core',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description:
                'Placeholder text shown when no date range is selected',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },

        // Date Configuration Props
        showDateTimePicker: {
            control: { type: 'boolean' },
            description: 'Enable time selection in addition to date selection',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Date Configuration',
            },
        },
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
        dateFormat: {
            control: { type: 'text' },
            description: 'Format string for date display (e.g., DD/MM/YYYY)',
            table: {
                type: { summary: 'string' },
                category: 'Date Configuration',
            },
        },
        allowSingleDateSelection: {
            control: { type: 'boolean' },
            description:
                'Allow selecting a single date instead of requiring a range',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Date Configuration',
            },
        },

        // Preset Props
        showPresets: {
            control: { type: 'boolean' },
            description: 'Show quick preset options (today, last 7 days, etc.)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Presets',
            },
        },
        showPreset: {
            control: { type: 'boolean' },
            description: 'Alternative prop name for showing presets',
            table: {
                type: { summary: 'boolean' },
                category: 'Presets',
            },
        },

        // Restriction Props
        disableFutureDates: {
            control: { type: 'boolean' },
            description: 'Prevent selection of future dates',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Date Restrictions',
            },
        },
        disablePastDates: {
            control: { type: 'boolean' },
            description: 'Prevent selection of past dates',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Date Restrictions',
            },
        },
        hideFutureDates: {
            control: { type: 'boolean' },
            description: 'Hide future dates from calendar view',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Date Restrictions',
            },
        },
        hidePastDates: {
            control: { type: 'boolean' },
            description: 'Hide past dates from calendar view',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Date Restrictions',
            },
        },

        // UI Props
        isDisabled: {
            control: { type: 'boolean' },
            description: 'Disable the entire date range picker',
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
        maxMenuHeight: {
            control: { type: 'number', min: 200, max: 800 },
            description: 'Maximum height of the picker dropdown menu',
            table: {
                type: { summary: 'number' },
                category: 'UI State',
            },
        },

        // Mobile Props
        useDrawerOnMobile: {
            control: { type: 'boolean' },
            description: 'Use drawer interface on mobile devices',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Mobile',
            },
        },
        skipQuickFiltersOnMobile: {
            control: { type: 'boolean' },
            description: 'Hide quick filter presets on mobile',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Mobile',
            },
        },

        // Complex Props (disabled controls for complex objects)
        formatConfig: {
            control: false,
            description: 'Advanced date formatting configuration',
            table: {
                type: { summary: 'DateFormatConfig' },
                category: 'Advanced',
            },
        },
        triggerConfig: {
            control: false,
            description: 'Custom trigger element configuration',
            table: {
                type: { summary: 'TriggerConfig' },
                category: 'Advanced',
            },
        },
        customPresets: {
            control: false,
            description: 'Custom preset configurations',
            table: {
                type: { summary: 'PresetsConfig' },
                category: 'Advanced',
            },
        },
        customDisableDates: {
            control: false,
            description: 'Function to disable specific dates',
            table: {
                type: { summary: 'CustomDateDisableFunction' },
                category: 'Advanced',
            },
        },
        customRangeConfig: {
            control: false,
            description: 'Advanced range calculation configuration',
            table: {
                type: { summary: 'CustomRangeConfig' },
                category: 'Advanced',
            },
        },
        icon: {
            control: false,
            description: 'Custom icon element for the trigger',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Advanced',
            },
        },
        triggerElement: {
            control: false,
            description: 'Custom trigger element to replace default input',
            table: {
                type: { summary: 'ReactNode' },
                category: 'Advanced',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DateRangePicker>

// Default story - Basic date range picker
export const Default: Story = {
    render: () => {
        const [dateRange, setDateRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return (
            <div style={{ width: '400px' }}>
                <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    placeholder="Select date range"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Basic DateRangePicker with default settings and controlled state management.',
            },
        },
    },
}

// Date range picker with time selection
export const WithTimePicker: Story = {
    render: () => {
        const [dateRange, setDateRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
            showTimePicker: true,
        })

        return (
            <div style={{ width: '450px' }}>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    DateRangePicker with Time Picker
                </h4>
                <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    showDateTimePicker={true}
                    showPresets={true}
                    placeholder="Select date and time range"
                    icon={React.createElement(Clock, { size: 16 })}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker with time selection enabled for precise date and time range selection.',
            },
        },
    },
}

// Date range picker with floating tabs (mobile)
export const WithFloatingTabsMobile: Story = {
    render: () => {
        const [dateRange, setDateRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return (
            <div style={{ width: '450px' }}>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    DateRangePicker with Floating Tabs (Mobile)
                </h4>
                <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    showDateTimePicker={true}
                    useDrawerOnMobile={true}
                    placeholder="Select date range"
                    icon={React.createElement(Calendar, { size: 16 })}
                />
                <div
                    style={{
                        marginTop: '12px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    Note: Resize browser to mobile width (&lt;1024px) to see
                    floating tabs interface
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker with floating tabs interface optimized for mobile devices. Features a 4-column layout (Year, Month, Date, Time) with tab navigation.',
            },
        },
    },
}

// Date range picker with presets
export const WithPresets: Story = {
    render: () => {
        const [dateRange, setDateRange] = useState<DateRange>({
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(),
        })

        return (
            <div style={{ width: '400px' }}>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    With Quick Preset Ranges
                </h4>
                <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    showPresets={true}
                    placeholder="Choose time period"
                    icon={React.createElement(CalendarDays, { size: 16 })}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker with quick preset ranges for common time periods like "Last 7 days", "Last 30 days", etc.',
            },
        },
    },
}

// Date range picker without presets
export const WithoutPresets: Story = {
    render: () => {
        const [dateRange, setDateRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })

        return (
            <div style={{ width: '400px' }}>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Calendar Only (No Presets)
                </h4>
                <DateRangePicker
                    value={dateRange}
                    onChange={setDateRange}
                    showPresets={false}
                    placeholder="Custom date range selection"
                    icon={React.createElement(Calendar, { size: 16 })}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker with presets disabled, allowing only custom calendar-based date selection.',
            },
        },
    },
}

// Date range picker with constraints
export const WithConstraints: Story = {
    render: () => {
        const [pastRange, setPastRange] = useState<DateRange>({
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            endDate: new Date(),
        })

        const [futureRange, setFutureRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        })

        const [constrainedRange, setConstrainedRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Disable Future Dates
                    </h4>
                    <DateRangePicker
                        value={pastRange}
                        onChange={setPastRange}
                        disableFutureDates={true}
                        showPresets={true}
                        placeholder="Historical data only"
                        icon={React.createElement(BarChart, { size: 16 })}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Disable Past Dates
                    </h4>
                    <DateRangePicker
                        value={futureRange}
                        onChange={setFutureRange}
                        disablePastDates={true}
                        showPresets={true}
                        placeholder="Future events only"
                        icon={React.createElement(Calendar, { size: 16 })}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Min/Max Date Range
                    </h4>
                    <DateRangePicker
                        value={constrainedRange}
                        onChange={setConstrainedRange}
                        minDate={new Date('2024-01-01')}
                        maxDate={new Date('2024-12-31')}
                        showPresets={true}
                        placeholder="2024 data only"
                        icon={React.createElement(Filter, { size: 16 })}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker with various date constraints: disable future dates, disable past dates, and min/max date boundaries.',
            },
        },
    },
}

// Single date selection mode
export const SingleDateSelection: Story = {
    render: () => {
        const [singleDate, setSingleDate] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(),
        })

        return (
            <div style={{ width: '400px' }}>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Single Date Selection
                </h4>
                <DateRangePicker
                    value={singleDate}
                    onChange={setSingleDate}
                    allowSingleDateSelection={true}
                    showPresets={false}
                    placeholder="Pick a single date"
                    icon={React.createElement(CalendarDays, { size: 16 })}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker configured for single date selection instead of date ranges.',
            },
        },
    },
}

// UTC Timezone Preset Detection Demo
export const UTCPresetDetection: Story = {
    render: () => {
        // Example: UTC dates that should be detected as "Yesterday"
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        const [localYesterday, setLocalYesterday] = useState<DateRange>({
            startDate: new Date(
                yesterday.getFullYear(),
                yesterday.getMonth(),
                yesterday.getDate(),
                0,
                0,
                0,
                0
            ),
            endDate: new Date(
                yesterday.getFullYear(),
                yesterday.getMonth(),
                yesterday.getDate(),
                23,
                59,
                59,
                999
            ),
        })

        const [utcYesterday, setUtcYesterday] = useState<DateRange>({
            startDate: new Date('2025-09-27T18:30:00.000Z'),
            endDate: new Date('2025-09-28T18:29:59.000Z'),
        })

        return (
            <div style={{ width: '500px' }}>
                <h4
                    style={{
                        margin: '0 0 12px 0',
                        fontSize: '14px',
                        fontWeight: '600',
                    }}
                >
                    Timezone-Aware Preset Detection
                </h4>

                <div style={{ marginBottom: '20px' }}>
                    <p
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginBottom: '8px',
                        }}
                    >
                        Local timezone yesterday (should detect "Yesterday"
                        preset):
                    </p>
                    <DateRangePicker
                        value={localYesterday}
                        onChange={setLocalYesterday}
                        showPresets={true}
                        placeholder="Yesterday in local timezone"
                    />
                </div>

                <div>
                    <p
                        style={{
                            fontSize: '12px',
                            color: '#666',
                            marginBottom: '8px',
                        }}
                    >
                        UTC dates (2025-09-27T18:30:00.000Z to
                        2025-09-28T18:29:59.000Z):
                        <br />
                        Should also detect "Yesterday" preset despite being in
                        UTC
                    </p>
                    <DateRangePicker
                        value={utcYesterday}
                        onChange={setUtcYesterday}
                        showPresets={true}
                        placeholder="UTC yesterday dates"
                    />
                </div>

                <div
                    style={{
                        marginTop: '16px',
                        padding: '12px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '4px',
                        fontSize: '12px',
                    }}
                >
                    <strong>✅ Robust Preset Detection:</strong> The component
                    now correctly identifies presets like "Yesterday" regardless
                    of whether you pass local timezone or UTC dates. It checks
                    both timezone formats to ensure reliable detection for
                    library users worldwide.
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates robust preset detection that works with both UTC and local timezone dates. The component correctly identifies presets like "Yesterday" even when dates are provided in UTC format, solving the timezone detection issue.',
            },
        },
    },
}

// Custom trigger elements
export const CustomTriggers: Story = {
    render: () => {
        const [primaryRange, setPrimaryRange] = useState<DateRange>({
            startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(),
        })

        const [secondaryRange, setSecondaryRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        })

        const [analyticsRange, setAnalyticsRange] = useState<DateRange>({
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            endDate: new Date(),
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Primary Button Trigger
                    </h4>
                    <DateRangePicker
                        value={primaryRange}
                        onChange={setPrimaryRange}
                        triggerElement={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Select Date Range"
                                leadingIcon={React.createElement(Calendar, {
                                    size: 16,
                                })}
                                trailingIcon={React.createElement(
                                    CalendarDays,
                                    { size: 16 }
                                )}
                            />
                        }
                        showPresets={true}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Secondary Button Trigger
                    </h4>
                    <DateRangePicker
                        value={secondaryRange}
                        onChange={setSecondaryRange}
                        triggerElement={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Choose Dates"
                                leadingIcon={React.createElement(CalendarDays, {
                                    size: 16,
                                })}
                            />
                        }
                        showPresets={true}
                        showDateTimePicker={true}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Analytics Dashboard Style
                    </h4>
                    <DateRangePicker
                        value={analyticsRange}
                        onChange={setAnalyticsRange}
                        triggerElement={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text={`${analyticsRange.startDate.toLocaleDateString()} - ${analyticsRange.endDate.toLocaleDateString()}`}
                                leadingIcon={React.createElement(TrendingUp, {
                                    size: 16,
                                })}
                                trailingIcon={React.createElement(Filter, {
                                    size: 16,
                                })}
                            />
                        }
                        showPresets={true}
                        disableFutureDates={true}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker with custom trigger elements including different button styles and dynamic content.',
            },
        },
    },
}

// Different states
export const DatePickerStates: Story = {
    render: () => {
        const [normalRange, setNormalRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        const [disabledRange, setDisabledRange] = useState<DateRange>({
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            endDate: new Date(),
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Normal State
                    </h4>
                    <DateRangePicker
                        value={normalRange}
                        onChange={setNormalRange}
                        showPresets={true}
                        placeholder="Select date range"
                        icon={React.createElement(Calendar, { size: 16 })}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Disabled State
                    </h4>
                    <DateRangePicker
                        value={disabledRange}
                        onChange={setDisabledRange}
                        isDisabled={true}
                        showPresets={true}
                        placeholder="Date range locked"
                        icon={React.createElement(AlertCircle, { size: 16 })}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker in different states: normal interactive state and disabled state.',
            },
        },
    },
}

// Custom date formatting
export const CustomFormatting: Story = {
    render: () => {
        const [usFormatRange, setUsFormatRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        })

        const [isoFormatRange, setIsoFormatRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        })

        const [customFormatRange, setCustomFormatRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        US Format (MM/dd/yyyy)
                    </h4>
                    <DateRangePicker
                        value={usFormatRange}
                        onChange={setUsFormatRange}
                        dateFormat="MM/dd/yyyy"
                        showPresets={true}
                        placeholder="US date format"
                        icon={React.createElement(Calendar, { size: 16 })}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        ISO Format (yyyy-MM-dd)
                    </h4>
                    <DateRangePicker
                        value={isoFormatRange}
                        onChange={setIsoFormatRange}
                        dateFormat="yyyy-MM-dd"
                        showPresets={true}
                        placeholder="ISO date format"
                        icon={React.createElement(Calendar, { size: 16 })}
                    />
                </div>

                <div>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                        }}
                    >
                        Custom Format (dd MMM yyyy)
                    </h4>
                    <DateRangePicker
                        value={customFormatRange}
                        onChange={setCustomFormatRange}
                        dateFormat="dd MMM yyyy"
                        showPresets={true}
                        placeholder="Custom date format"
                        icon={React.createElement(Calendar, { size: 16 })}
                    />
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'DateRangePicker with different date formatting options: US format, ISO format, and custom format.',
            },
        },
    },
}
