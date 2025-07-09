import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import DateRangePicker from "./DateRangePicker";
import { DateRange } from "./types";
import { Calendar, Filter } from "lucide-react";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
# DateRangePicker Component

A powerful and flexible date range picker component with comprehensive features for selecting date ranges and time periods.

## Key Features

- **Date Range Selection**: Pick start and end dates with intuitive calendar interface
- **Time Selection**: Optional time picker for precise timestamp selection
- **Quick Presets**: Pre-defined ranges like "Last 7 days", "This month", etc.
- **Custom Trigger**: Use your own trigger element instead of default button
- **Single Date Mode**: Allow single date selection (same start and end date)
- **Date Restrictions**: Disable past or future dates as needed
- **Custom Formatting**: Configure date display format
- **Accessibility**: Full keyboard navigation and screen reader support

## Usage Examples

### Basic Usage
\`\`\`tsx
import { DateRangePicker } from '@your-org/component-library';
import { DateRange } from '@your-org/component-library/DateRangePicker';

const MyComponent = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
  });

  return (
    <DateRangePicker
      value={dateRange}
      onChange={setDateRange}
      showPresets={true}
    />
  );
};
\`\`\`

### With Time Selection
\`\`\`tsx
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  showTimePicker={true}
  dateFormat="dd/MM/yyyy HH:mm"
/>
\`\`\`

### Custom Trigger Element
\`\`\`tsx
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  triggerElement={
    <button className="custom-trigger">
      📅 {formatDateRange(dateRange)}
    </button>
  }
/>
\`\`\`

### Without Quick Presets
\`\`\`tsx
<DateRangePicker
  value={dateRange}
  onChange={setDateRange}
  showPresets={false}
/>
\`\`\`

## Data Structure

The DateRangePicker uses the following data structure:

\`\`\`tsx
type DateRange = {
  startDate: Date;
  endDate: Date;
  showTimePicker?: boolean;
};
\`\`\`

## Available Presets

- Today
- Yesterday / Tomorrow
- Last/Next 1 hour, 6 hours, 7 days, 30 days, 3 months, 12 months
- Custom (for manual selection)
        `,
      },
    },
  },
  argTypes: {
    value: {
      description: "Current date range value",
      control: false,
    },
    onChange: {
      description: "Callback when date range changes",
      control: false,
    },
    showTimePicker: {
      description: "Enable time selection",
      control: "boolean",
    },
    showPresets: {
      description: "Show quick range selector with presets",
      control: "boolean",
    },
    placeholder: {
      description: "Placeholder text for the trigger",
      control: "text",
    },
    isDisabled: {
      description: "Disable the date picker",
      control: "boolean",
    },
    dateFormat: {
      description: "Format for date display (dd/MM/yyyy, yyyy-MM-dd, etc.)",
      control: "text",
    },
    allowSingleDateSelection: {
      description: "Allow selecting same date for start and end",
      control: "boolean",
    },
    disableFutureDates: {
      description: "Disable future date selection",
      control: "boolean",
    },
    disablePastDates: {
      description: "Disable past date selection",
      control: "boolean",
    },
    triggerElement: {
      description: "Custom trigger element",
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Default Story
const DefaultComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Selected Range:</strong>
        <br />
        Start: {dateRange.startDate.toLocaleDateString()}
        <br />
        End: {dateRange.endDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export const Default: Story = {
  render: DefaultComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Basic DateRangePicker

The default DateRangePicker with:
- Quick preset selector on the left
- Calendar-based date selection
- Default date format (dd/MM/yyyy)
- Both past and future dates enabled

Try:
- Click presets like "Last 7 days" or "Next 30 days"
- Use the calendar to select custom ranges
- Notice how the trigger button updates with selected dates
        `,
      },
    },
  },
};

// With Time Selection
const WithTimeComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Selected Range with Time:</strong>
        <br />
        Start: {dateRange.startDate.toLocaleString()}
        <br />
        End: {dateRange.endDate.toLocaleString()}
      </div>
    </div>
  );
};

export const WithTimePicker: Story = {
  render: WithTimeComponent,
  args: {
    showPresets: true,
    showTimePicker: true,
    dateFormat: "dd/MM/yyyy HH:mm",
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DateRangePicker with Time Selection

Enhanced with time selection capabilities:
- Time pickers for start and end dates
- Hour and minute precision
- Time-aware presets (Last 1 hour, Last 6 hours)
- Updated date format to include time
- Toggle time selection on/off within the picker

Perfect for:
- Analytics dashboards requiring precise time ranges
- Scheduling applications
- Log analysis tools
- Any scenario requiring timestamp precision
        `,
      },
    },
  },
};

// Custom Trigger Element
const CustomTriggerComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    endDate: new Date(),
  });

  const formatDateRange = (range: DateRange) => {
    return `${range.startDate.toLocaleDateString()} - ${range.endDate.toLocaleDateString()}`;
  };

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker
        {...args}
        value={dateRange}
        onChange={setDateRange}
        triggerElement={
          <div
            style={{
              padding: "12px 16px",
              border: "2px solid #3b82f6",
              borderRadius: "8px",
              backgroundColor: "#eff6ff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#1e40af",
              fontWeight: "500",
              minWidth: "280px",
              transition: "all 0.2s ease",
            }}
          >
            <Calendar size={18} />
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600 }}>
                Custom Analytics Period
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8 }}>
                {formatDateRange(dateRange)}
              </div>
            </div>
          </div>
        }
      />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Custom Trigger Selected Range:</strong>
        <br />
        Start: {dateRange.startDate.toLocaleDateString()}
        <br />
        End: {dateRange.endDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export const CustomTrigger: Story = {
  render: CustomTriggerComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DateRangePicker with Custom Trigger

Demonstrates complete customization of the trigger element:
- Custom styled trigger with icon and descriptive text
- Multi-line content showing context and selected range
- Brand-consistent styling
- Hover and interaction states

Use cases:
- Dashboard widgets with branded styling
- Analytics panels with contextual information
- Form inputs that need to match design system
- Custom layouts requiring specific trigger appearance

The trigger can be any React element - buttons, divs, complex components, etc.
        `,
      },
    },
  },
};

// Without Quick Presets
const WithoutPresetsComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Selected Range (No Presets):</strong>
        <br />
        Start: {dateRange.startDate.toLocaleDateString()}
        <br />
        End: {dateRange.endDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export const WithoutPresets: Story = {
  render: WithoutPresetsComponent,
  args: {
    showPresets: false,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### DateRangePicker without Quick Presets

A minimal version without the preset selector:
- Clean, focused interface
- Calendar-only date selection
- Manual date input fields
- Reduced visual complexity

Perfect for:
- Simple date selection scenarios
- Space-constrained layouts
- Cases where specific presets aren't needed
- Custom implementations with external preset controls
        `,
      },
    },
  },
};

// Single Date Selection
const SingleDateComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(), // Same as start date
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Selected Date:</strong>
        <br />
        Date: {dateRange.startDate.toLocaleDateString()}
        {dateRange.startDate.getTime() !== dateRange.endDate.getTime() && (
          <>
            <br />
            End: {dateRange.endDate.toLocaleDateString()}
            <br />
            <em>(Range mode - different dates selected)</em>
          </>
        )}
      </div>
    </div>
  );
};

export const SingleDateSelection: Story = {
  render: SingleDateComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: true,
    disableFutureDates: false,
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Single Date Selection Mode

Allows selecting a single date (start and end are the same):
- Simplified interface when range isn't needed
- Auto-sets end date to match start date
- Can still be expanded to range if different dates are selected
- Useful for deadlines, birthdays, appointments

Features:
- Click same date twice to select single date
- Select different dates to create a range
- Presets work for single dates (Today, Yesterday, etc.)
- Time picker still available for single-date timestamps
        `,
      },
    },
  },
};

// Past Dates Only
const PastDatesOnlyComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    endDate: new Date(), // Today
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Selected Historical Range:</strong>
        <br />
        Start: {dateRange.startDate.toLocaleDateString()}
        <br />
        End: {dateRange.endDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export const PastDatesOnly: Story = {
  render: PastDatesOnlyComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: false,
    disableFutureDates: true,
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Past Dates Only

Restricts selection to historical dates only:
- Future dates are disabled in calendar
- Only shows past-related presets (Yesterday, Last 7 days, etc.)
- Today is still selectable as end date
- Perfect for historical data analysis

Common use cases:
- Analytics dashboards (historical data only)
- Report generation for completed periods
- Audit logs and transaction history
- Performance metrics over past periods
        `,
      },
    },
  },
};

// Future Dates Only
const FutureDatesOnlyComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Selected Future Range:</strong>
        <br />
        Start: {dateRange.startDate.toLocaleDateString()}
        <br />
        End: {dateRange.endDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export const FutureDatesOnly: Story = {
  render: FutureDatesOnlyComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: true,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Future Dates Only

Restricts selection to future dates only:
- Past dates are disabled in calendar
- Only shows future-related presets (Tomorrow, Next 7 days, etc.)
- Today is still selectable as start date
- Ideal for planning and scheduling

Common use cases:
- Event planning and scheduling
- Booking systems and reservations
- Project planning and deadlines
- Campaign scheduling
- Subscription and billing periods
        `,
      },
    },
  },
};

// Custom Date Format
const CustomFormatComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker {...args} value={dateRange} onChange={setDateRange} />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Selected Range (ISO Format):</strong>
        <br />
        Start: {dateRange.startDate.getFullYear()}-
        {(dateRange.startDate.getMonth() + 1).toString().padStart(2, "0")}-
        {dateRange.startDate.getDate().toString().padStart(2, "0")}
        <br />
        End: {dateRange.endDate.getFullYear()}-
        {(dateRange.endDate.getMonth() + 1).toString().padStart(2, "0")}-
        {dateRange.endDate.getDate().toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export const CustomDateFormat: Story = {
  render: CustomFormatComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "yyyy-MM-dd",
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Custom Date Format

Demonstrates custom date formatting:
- ISO format (yyyy-MM-dd) instead of default
- Format affects both display and input parsing
- Consistent formatting across all date displays
- Supports various date format patterns

Supported format patterns:
- \`dd/MM/yyyy\` - 25/12/2023
- \`MM/dd/yyyy\` - 12/25/2023  
- \`yyyy-MM-dd\` - 2023-12-25
- \`dd.MM.yyyy\` - 25.12.2023
- \`dd/MM/yyyy HH:mm\` - 25/12/2023 14:30

Perfect for:
- International applications with different date conventions
- API integrations requiring specific formats
- Compliance with regional date standards
        `,
      },
    },
  },
};

// Disabled State
const DisabledStateComponent = (args: Story["args"]) => {
  const [dateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  return (
    <div
      style={{
        minHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <DateRangePicker
        {...args}
        value={dateRange}
        onChange={() => {}} // No-op since disabled
      />

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f1f5f9",
          borderRadius: "8px",
          border: "1px solid #cbd5e1",
          fontSize: "14px",
          opacity: 0.7,
        }}
      >
        <strong>Disabled State:</strong>
        <br />
        The date picker is disabled and cannot be interacted with.
        <br />
        Current range: {dateRange.startDate.toLocaleDateString()} -{" "}
        {dateRange.endDate.toLocaleDateString()}
      </div>
    </div>
  );
};

export const DisabledState: Story = {
  render: DisabledStateComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: false,
    disableFutureDates: false,
    disablePastDates: false,
    isDisabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Disabled State

Shows the DateRangePicker in disabled state:
- Trigger button is visually disabled
- Click interactions are prevented
- Preset selector is also disabled
- Maintains visual layout while indicating unavailability

Use when:
- Form submission is in progress
- User lacks permission to modify dates
- Data is being loaded
- Conditional form states require temporary disabling
        `,
      },
    },
  },
};

// Complex Example with Integration
const ComplexIntegrationComponent = (args: Story["args"]) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  // Simulate API call when date range changes
  const handleDateRangeChange = async (newRange: DateRange) => {
    setDateRange(newRange);
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate mock data based on date range
    const days = Math.ceil(
      (newRange.endDate.getTime() - newRange.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const mockData = Array.from({ length: Math.min(days, 30) }, (_, i) => ({
      date: new Date(
        newRange.startDate.getTime() + i * 24 * 60 * 60 * 1000,
      ).toLocaleDateString(),
      value: Math.floor(Math.random() * 100) + 50,
    }));

    setData(mockData);
    setIsLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: 600 }}>
          📊 Analytics Dashboard
        </h3>
        <p style={{ margin: "0 0 20px 0", color: "#6b7280", fontSize: "14px" }}>
          Select a date range to load analytics data. This example shows how to
          integrate the DateRangePicker with data fetching and loading states.
        </p>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "20px",
          }}
        >
          <Filter size={16} color="#6b7280" />
          <span style={{ fontSize: "14px", fontWeight: 500, color: "#374151" }}>
            Date Range Filter:
          </span>
          <DateRangePicker
            {...args}
            value={dateRange}
            onChange={handleDateRangeChange}
            triggerElement={
              <div
                style={{
                  padding: "8px 12px",
                  border: "1px solid #d1d5db",
                  borderRadius: "6px",
                  backgroundColor: "#ffffff",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "14px",
                  minWidth: "200px",
                }}
              >
                <Calendar size={14} />
                {dateRange.startDate.toLocaleDateString()} -{" "}
                {dateRange.endDate.toLocaleDateString()}
              </div>
            }
          />
        </div>

        {isLoading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "2px dashed #d1d5db",
            }}
          >
            <div style={{ fontSize: "14px", color: "#6b7280" }}>
              ⏳ Loading data for selected period...
            </div>
          </div>
        ) : (
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
            }}
          >
            <h4
              style={{
                margin: "0 0 12px 0",
                fontSize: "16px",
                fontWeight: 600,
              }}
            >
              Data Points ({data.length} days)
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
                gap: "8px",
                maxHeight: "200px",
                overflow: "auto",
              }}
            >
              {data.map((item, index) => (
                <div
                  key={index}
                  style={{
                    padding: "8px",
                    backgroundColor: "#ffffff",
                    borderRadius: "4px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{item.date}</div>
                  <div style={{ color: "#3b82f6" }}>{item.value} units</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "16px",
          backgroundColor: "#f8fafc",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          fontSize: "14px",
        }}
      >
        <strong>Integration Example:</strong>
        <br />
        This shows how to integrate DateRangePicker with data fetching, loading
        states, and custom trigger styling for dashboard-like applications.
      </div>
    </div>
  );
};

export const ComplexIntegration: Story = {
  render: ComplexIntegrationComponent,
  args: {
    showPresets: true,
    showTimePicker: false,
    dateFormat: "dd/MM/yyyy",
    allowSingleDateSelection: false,
    disableFutureDates: true, // Analytics typically uses historical data
    disablePastDates: false,
    isDisabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: `
### Complex Dashboard Integration

Real-world example showing DateRangePicker integration:
- **Custom trigger styling** to match dashboard design
- **API integration** with loading states
- **Data visualization** based on selected range
- **Performance considerations** with debounced API calls
- **User feedback** with loading indicators

This pattern is common in:
- Analytics dashboards
- Reporting interfaces  
- Business intelligence tools
- Data visualization applications

Key integration patterns:
1. Custom trigger that fits your design system
2. Loading states during data fetching
3. Error handling for failed requests
4. Optimistic UI updates
5. Responsive data display based on selected range
        `,
      },
    },
  },
};
