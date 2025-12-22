import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    DateRangePicker,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import {
    Calendar,
    CalendarDays,
    Clock,
    Filter,
    TrendingUp,
    BarChart,
    AlertCircle,
} from 'lucide-react'

type DateRange = {
    startDate: Date
    endDate: Date
    showTimePicker?: boolean
}

const meta: Meta<typeof DateRangePicker> = {
    title: 'Components/DateRangePicker',
    component: DateRangePicker,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for form components
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A comprehensive date range picker component with calendar interface, time selection, preset ranges, and flexible configuration options for selecting date and time ranges.

## Features:
- Interactive calendar grid for date selection
- Optional time picker for precise time selection
- Quick preset ranges (today, yesterday, last 7 days, etc.)
- **Timezone support** - IANA timezone strings for global applications
- Custom date range selection
- Min/max date constraints
- Future/past date restrictions
- Single date selection mode
- Custom trigger element support
- Accessible keyboard navigation
- Customizable date formatting
- Disabled state support
- Mobile-responsive design with drawer interface

## Accessibility

**WCAG Compliance**: 2.2 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space, Arrow keys, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (aria-expanded, aria-disabled, aria-label, aria-describedby, aria-invalid, aria-haspopup)
- Label association via htmlFor/id for date inputs
- Error identification and suggestions
- Focus management and logical focus order
- No keyboard traps
- Mobile-responsive with accessible drawer interface

**Level AAA Compliance**: ⚠️ Partial (6 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: 2.5.5 Target Size - Interactive elements (calendar day cells, time selectors, buttons) need 44x44px minimum for AAA
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires application-level confirmation patterns

**Touch Target Sizes**:
- Trigger button: Varies by size (meets AA 24px, verification needed for AAA 44px)
- Calendar day cells: ~32-40px (meets AA 24px, may not meet AAA 44px)
- Time selector inputs: ~118px width (meets AA 24px, verification needed for AAA 44px)
- Action buttons: Standard button sizes (meets AA 24px, verification needed for AAA 44px)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test DateRangePicker.accessibility\` (tests covering WCAG 2.0, 2.1, 2.2 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker, verify touch target sizes in browser DevTools
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Use Cases:
- Analytics dashboards and date filtering
- Report generation with time periods
- Event scheduling and booking systems
- Financial data analysis
- User activity tracking
- Content management systems

## Usage

\`\`\`tsx
const [dateRange, setDateRange] = useState({
  startDate: new Date(),
  endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
});

<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  showDateTimePicker={true}
  showPresets={true}
  placeholder="Select date range"
/>
\`\`\`

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
        timezone: {
            control: { type: 'text' },
            description:
                'IANA timezone string (e.g., "America/New_York", "Asia/Tokyo") for timezone-aware date operations. When provided, presets like "Yesterday" are calculated in this timezone.',
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

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating WCAG compliance features
 */
export const Accessibility: Story = {
    render: () => {
        const [dateRange, setDateRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

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
                            fontWeight: '600',
                        }}
                    >
                        ARIA Attributes
                    </h3>
                    <div style={{ width: '400px' }}>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            showDateTimePicker={true}
                            showPresets={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Trigger button has aria-expanded, aria-haspopup,
                            aria-label. Calendar cells have aria-label,
                            aria-selected, aria-disabled. Date inputs have
                            aria-describedby for errors.
                        </p>
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Keyboard Navigation
                    </h3>
                    <div style={{ width: '400px' }}>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            showDateTimePicker={true}
                            showPresets={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Tab to navigate, Enter/Space to activate trigger and
                            calendar cells, Arrow keys to navigate calendar,
                            Escape to close popover.
                        </p>
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Error Identification
                    </h3>
                    <div style={{ width: '400px' }}>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            showDateTimePicker={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Invalid dates show error state with aria-invalid and
                            error messages with role="alert" and aria-live.
                        </p>
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Label Association
                    </h3>
                    <div style={{ width: '400px' }}>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            showDateTimePicker={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Date inputs have labels ("Start", "End") associated
                            via htmlFor/id. Time inputs have aria-label.
                        </p>
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Focus Indicators
                    </h3>
                    <div style={{ width: '400px' }}>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            showDateTimePicker={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            All interactive elements have visible focus
                            indicators for keyboard navigation.
                        </p>
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Disabled State
                    </h3>
                    <div style={{ width: '400px' }}>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            isDisabled={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Disabled DateRangePicker has aria-disabled="true"
                            and is removed from tab order.
                        </p>
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Screen Reader Support
                    </h3>
                    <div style={{ width: '400px' }}>
                        <DateRangePicker
                            value={dateRange}
                            onChange={setDateRange}
                            showDateTimePicker={true}
                        />
                        <p
                            style={{
                                marginTop: '8px',
                                fontSize: '12px',
                                color: '#666',
                            }}
                        >
                            Calendar cells announce date, selection state, and
                            today indicator. Error messages are announced via
                            aria-live regions.
                        </p>
                    </div>
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating ARIA attributes, keyboard navigation, error identification, label association, focus indicators, disabled state, and screen reader support.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0)
   - Review passing tests (15+)
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test DateRangePicker.accessibility
   \`\`\`
   - 50+ automated tests
   - WCAG compliance verification
   - ARIA attribute validation
   - Keyboard navigation testing
   - Calendar grid accessibility testing

3. **Chromatic visual tests**:
   \`\`\`bash
   pnpm chromatic
   \`\`\`
   - Focus ring visibility
   - State changes
   - Responsive behavior

4. **Manual testing**:
   - VoiceOver (macOS) or NVDA (Windows)
   - Keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
   - Color contrast verification
   - Touch target size measurement

## Accessibility Report

**Current Status**:
- ✅ **WCAG 2.2 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.2 Level AAA**: Partial Compliance (6/9 applicable criteria compliant)

**AAA Compliance Details**:
- ✅ Compliant: Visual Presentation (1.4.8), Images of Text (1.4.9), Keyboard No Exception (2.1.3), No Timing (2.2.3), Interruptions (2.2.4), Change on Request (3.2.5)
- ❌ Needs Improvement: Contrast Enhanced (1.4.6) - requires 7:1 ratio, Target Size (2.5.5) - Interactive elements need 44x44px
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis

**Key Accessibility Features**:
- Proper ARIA attributes (aria-expanded, aria-disabled, aria-label, aria-describedby, aria-invalid, aria-haspopup, aria-selected)
- Semantic HTML structure (button, input elements)
- Comprehensive keyboard navigation (Tab, Enter, Space, Arrow keys, Escape)
- Calendar day cells keyboard accessible with Enter/Space
- Error identification and suggestions
- Label association via htmlFor/id
- Focus management and logical focus order
- No keyboard traps
- Mobile-responsive with accessible drawer interface
                    `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('form'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}

// Timezone support
export const TimezoneSupport: Story = {
    render: () => {
        const [nyRange, setNyRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        const [tokyoRange, setTokyoRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        const [londonRange, setLondonRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        const [sydneyRange, setSydneyRange] = useState<DateRange>({
            startDate: new Date(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    width: '100%',
                    maxWidth: '900px',
                }}
            >
                <div>
                    <h3
                        style={{
                            marginBottom: '16px',
                            fontSize: '18px',
                            fontWeight: '600',
                        }}
                    >
                        🌍 Timezone Support
                    </h3>
                    <p
                        style={{
                            marginBottom: '24px',
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                        }}
                    >
                        The DateRangePicker supports timezone-aware date/time
                        operations. When a timezone is specified, presets like
                        "Yesterday" or "Today" are calculated in that timezone,
                        ensuring global users see correct dates.
                    </p>
                </div>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(400px, 1fr))',
                        gap: '24px',
                    }}
                >
                    <div>
                        <h4
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            🗽 New York (America/New_York)
                        </h4>
                        <DateRangePicker
                            value={nyRange}
                            onChange={setNyRange}
                            timezone="America/New_York"
                            showDateTimePicker={true}
                            showPresets={true}
                            placeholder="Select date range (EST)"
                        />
                        {nyRange && (
                            <div
                                style={{
                                    marginTop: '8px',
                                    fontSize: '12px',
                                    color: '#666',
                                    padding: '8px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                }}
                            >
                                <div>
                                    <strong>Start:</strong>{' '}
                                    {nyRange.startDate.toLocaleString('en-US', {
                                        timeZone: 'America/New_York',
                                    })}
                                </div>
                                <div>
                                    <strong>End:</strong>{' '}
                                    {nyRange.endDate.toLocaleString('en-US', {
                                        timeZone: 'America/New_York',
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <h4
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            🗼 Tokyo (Asia/Tokyo)
                        </h4>
                        <DateRangePicker
                            value={tokyoRange}
                            onChange={setTokyoRange}
                            timezone="Asia/Tokyo"
                            showDateTimePicker={true}
                            showPresets={true}
                            placeholder="Select date range (JST)"
                        />
                        {tokyoRange && (
                            <div
                                style={{
                                    marginTop: '8px',
                                    fontSize: '12px',
                                    color: '#666',
                                    padding: '8px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                }}
                            >
                                <div>
                                    <strong>Start:</strong>{' '}
                                    {tokyoRange.startDate.toLocaleString(
                                        'en-US',
                                        {
                                            timeZone: 'Asia/Tokyo',
                                        }
                                    )}
                                </div>
                                <div>
                                    <strong>End:</strong>{' '}
                                    {tokyoRange.endDate.toLocaleString(
                                        'en-US',
                                        {
                                            timeZone: 'Asia/Tokyo',
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <h4
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            🇬🇧 London (Europe/London)
                        </h4>
                        <DateRangePicker
                            value={londonRange}
                            onChange={setLondonRange}
                            timezone="Europe/London"
                            showDateTimePicker={true}
                            showPresets={true}
                            placeholder="Select date range (GMT/BST)"
                        />
                        {londonRange && (
                            <div
                                style={{
                                    marginTop: '8px',
                                    fontSize: '12px',
                                    color: '#666',
                                    padding: '8px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                }}
                            >
                                <div>
                                    <strong>Start:</strong>{' '}
                                    {londonRange.startDate.toLocaleString(
                                        'en-US',
                                        {
                                            timeZone: 'Europe/London',
                                        }
                                    )}
                                </div>
                                <div>
                                    <strong>End:</strong>{' '}
                                    {londonRange.endDate.toLocaleString(
                                        'en-US',
                                        {
                                            timeZone: 'Europe/London',
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <h4
                            style={{
                                margin: '0 0 12px 0',
                                fontSize: '14px',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            🦘 Sydney (Australia/Sydney)
                        </h4>
                        <DateRangePicker
                            value={sydneyRange}
                            onChange={setSydneyRange}
                            timezone="Australia/Sydney"
                            showDateTimePicker={true}
                            showPresets={true}
                            placeholder="Select date range (AEDT/AEST)"
                        />
                        {sydneyRange && (
                            <div
                                style={{
                                    marginTop: '8px',
                                    fontSize: '12px',
                                    color: '#666',
                                    padding: '8px',
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px',
                                }}
                            >
                                <div>
                                    <strong>Start:</strong>{' '}
                                    {sydneyRange.startDate.toLocaleString(
                                        'en-US',
                                        {
                                            timeZone: 'Australia/Sydney',
                                        }
                                    )}
                                </div>
                                <div>
                                    <strong>End:</strong>{' '}
                                    {sydneyRange.endDate.toLocaleString(
                                        'en-US',
                                        {
                                            timeZone: 'Australia/Sydney',
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        marginTop: '16px',
                        padding: '16px',
                        backgroundColor: '#e8f4f8',
                        borderRadius: '8px',
                        border: '1px solid #b3d9e6',
                    }}
                >
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#0066cc',
                        }}
                    >
                        💡 How Timezone Support Works
                    </h4>
                    <ul
                        style={{
                            margin: 0,
                            paddingLeft: '20px',
                            fontSize: '13px',
                            color: '#333',
                            lineHeight: '1.8',
                        }}
                    >
                        <li>
                            <strong>Presets respect timezone:</strong>{' '}
                            "Yesterday" in Tokyo is different from "Yesterday"
                            in New York
                        </li>
                        <li>
                            <strong>Automatic conversion:</strong> Dates are
                            calculated and displayed in the specified timezone
                        </li>
                        <li>
                            <strong>Global-ready:</strong> Perfect for apps used
                            across different time zones
                        </li>
                        <li>
                            <strong>No dependencies:</strong> Uses native
                            JavaScript Intl API for timezone support
                        </li>
                    </ul>
                </div>

                <div
                    style={{
                        marginTop: '8px',
                        padding: '12px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '4px',
                        fontSize: '12px',
                        color: '#666',
                    }}
                >
                    <strong>Usage Example:</strong>
                    <pre
                        style={{
                            marginTop: '8px',
                            padding: '8px',
                            backgroundColor: '#fff',
                            borderRadius: '4px',
                            overflow: 'auto',
                            fontSize: '11px',
                        }}
                    >
                        {`<DateRangePicker
  timezone="Asia/Tokyo"
  value={dateRange}
  onChange={setDateRange}
  showDateTimePicker={true}
/>`}
                    </pre>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `Demonstrates timezone-aware date range selection. When a timezone is specified, all date operations (presets, formatting, calculations) respect that timezone. This ensures users from different parts of the world see dates relevant to their timezone.

**Key Features:**
- Presets like "Yesterday" are calculated in the specified timezone
- Date formatting displays dates in the target timezone
- Calendar operations respect timezone boundaries
- Uses native JavaScript Intl API (no external dependencies)

**Example:** If it's December 19, 2025 4:22 AM in New York (EST), selecting "Yesterday" will show December 18, 2025 00:00:00 EST to 23:59:59 EST, not the system timezone's yesterday.`,
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
