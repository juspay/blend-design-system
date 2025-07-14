import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { DateRangePicker, Button, ButtonType, TextInput } from "blend-v1";

// Import types that might not be exported from main
type DateRange = {
  startDate: Date;
  endDate: Date;
  showTimePicker?: boolean;
};
import {
  Calendar,
  CalendarDays,
  Clock,
  Settings,
  Filter,
  TrendingUp,
  Download,
  BarChart,
  Users,
  DollarSign,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const meta: Meta<typeof DateRangePicker> = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    layout: "padded",
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
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

// Default story - Basic date range picker
export const Default: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return (
      <div style={{ width: "400px" }}>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select date range"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic DateRangePicker with default settings and controlled state management.",
      },
    },
  },
};

// Date range picker with time selection
export const WithTimePicker: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
      showTimePicker: true,
    });

    return (
      <div style={{ width: "450px" }}>
        <h4
          style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}
        >
          Date Range with Time Selection
        </h4>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          showTimePicker={true}
          showPresets={true}
          placeholder="Select date and time range"
          icon={React.createElement(Clock, { size: 16 })}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DateRangePicker with time selection enabled for precise date and time range selection.",
      },
    },
  },
};

// Date range picker with presets
export const WithPresets: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });

    return (
      <div style={{ width: "400px" }}>
        <h4
          style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}
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
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'DateRangePicker with quick preset ranges for common time periods like "Last 7 days", "Last 30 days", etc.',
      },
    },
  },
};

// Date range picker without presets
export const WithoutPresets: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return (
      <div style={{ width: "400px" }}>
        <h4
          style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}
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
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DateRangePicker with presets disabled, allowing only custom calendar-based date selection.",
      },
    },
  },
};

// Date range picker with constraints
export const WithConstraints: Story = {
  render: () => {
    const [pastRange, setPastRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });

    const [futureRange, setFutureRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    const [constrainedRange, setConstrainedRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "400px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            Min/Max Date Range
          </h4>
          <DateRangePicker
            value={constrainedRange}
            onChange={setConstrainedRange}
            minDate={new Date("2024-01-01")}
            maxDate={new Date("2024-12-31")}
            showPresets={true}
            placeholder="2024 data only"
            icon={React.createElement(Filter, { size: 16 })}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DateRangePicker with various date constraints: disable future dates, disable past dates, and min/max date boundaries.",
      },
    },
  },
};

// Single date selection mode
export const SingleDateSelection: Story = {
  render: () => {
    const [singleDate, setSingleDate] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(),
    });

    return (
      <div style={{ width: "400px" }}>
        <h4
          style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600" }}
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
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DateRangePicker configured for single date selection instead of date ranges.",
      },
    },
  },
};

// Custom trigger elements
export const CustomTriggers: Story = {
  render: () => {
    const [primaryRange, setPrimaryRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });

    const [secondaryRange, setSecondaryRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    const [analyticsRange, setAnalyticsRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "400px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
                leadingIcon={Calendar}
                trailingIcon={CalendarDays}
              />
            }
            showPresets={true}
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
                leadingIcon={CalendarDays}
              />
            }
            showPresets={true}
            showTimePicker={true}
          />
        </div>

        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
                leadingIcon={TrendingUp}
                trailingIcon={Filter}
              />
            }
            showPresets={true}
            disableFutureDates={true}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DateRangePicker with custom trigger elements including different button styles and dynamic content.",
      },
    },
  },
};

// Different states
export const DatePickerStates: Story = {
  render: () => {
    const [normalRange, setNormalRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const [disabledRange, setDisabledRange] = useState<DateRange>({
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      endDate: new Date(),
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "400px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DateRangePicker in different states: normal interactive state and disabled state.",
      },
    },
  },
};

// Custom date formatting
export const CustomFormatting: Story = {
  render: () => {
    const [usFormatRange, setUsFormatRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    const [isoFormatRange, setIsoFormatRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    const [customFormatRange, setCustomFormatRange] = useState<DateRange>({
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    });

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          width: "400px",
        }}
      >
        <div>
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
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
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "DateRangePicker with different date formatting options: US format, ISO format, and custom format.",
      },
    },
  },
};
