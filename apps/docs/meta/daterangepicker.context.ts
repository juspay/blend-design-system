import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const daterangepickerMeta: ComponentMeta = {
  componentName: "DateRangePicker",
  componentDescription:
    "A comprehensive date range picker component with calendar interface, time selection, preset ranges, and flexible configuration options for selecting date and time ranges.",
  features: [
    "Interactive calendar grid for date selection",
    "Optional time picker for precise time selection",
    "Quick preset ranges (today, yesterday, last 7 days, etc.)",
    "Custom date range selection",
    "Min/max date constraints",
    "Future/past date restrictions",
    "Single date selection mode",
    "Custom trigger element support",
    "Accessible keyboard navigation",
    "Customizable date formatting",
    "Disabled state support",
  ],
  usageExamples: [
    {
      title: "Basic Date Range Picker",
      description: "Simple date range picker with default settings",
      code: `const [dateRange, setDateRange] = useState({
  startDate: new Date(),
  endDate: new Date()
});

<DateRangePicker 
  value={dateRange}
  onChange={setDateRange}
  placeholder="Select date range"
/>`,
    },
    {
      title: "Date Range Picker with Time",
      description: "Date range picker with time selection enabled",
      code: `<DateRangePicker 
  value={selectedRange}
  onChange={handleRangeChange}
  showTimePicker={true}
  showPresets={true}
  placeholder="Select date and time range"
/>`,
    },
    {
      title: "Constrained Date Range Picker",
      description: "Date range picker with date constraints",
      code: `<DateRangePicker 
  value={dateRange}
  onChange={setDateRange}
  minDate={new Date('2024-01-01')}
  maxDate={new Date('2024-12-31')}
  disableFutureDates={true}
  showPresets={false}
/>`,
    },
    {
      title: "Custom Date Range Picker",
      description: "Date range picker with custom trigger and formatting",
      code: `<DateRangePicker 
  value={dateRange}
  onChange={setDateRange}
  triggerElement={
    <Button 
      text="Choose Dates" 
      leadingIcon={<CalendarIcon />}
    />
  }
  dateFormat="MM/dd/yyyy"
  allowSingleDateSelection={true}
/>`,
    },
  ],
  props: [
    {
      propName: "value",
      propType: "DateRange",
      typeDefinition: `type DateRange = {
        startDate: Date;
        endDate: Date;
        showTimePicker?: boolean;
      }`,
      propDescription: "The selected date range value",
      llmContext: "The selected date range value",
      propDefault: "undefined",
      category: "State",
      required: false,
    },
    {
      propName: "onChange",
      propType: "(range: DateRange) => void",
      typeDefinition: "(range: DateRange) => void",
      propDescription: "Callback fired when the date range changes",
      llmContext: "Callback fired when the date range changes",
      propDefault: "undefined",
      category: "Events",
      required: false,
    },
    {
      propName: "showTimePicker",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to show time selection in addition to date selection",
      llmContext:
        "Whether to show time selection in addition to date selection",
      propDefault: "false",
      category: "Features",
      required: false,
    },
    {
      propName: "showPresets",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to show quick preset range options",
      llmContext: "Whether to show quick preset range options",
      propDefault: "true",
      category: "Features",
      required: false,
    },
    {
      propName: "placeholder",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Placeholder text for the date range input",
      llmContext: "Placeholder text for the date range input",
      propDefault: "'Select date range'",
      category: "Content",
      required: false,
    },
    {
      propName: "isDisabled",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether the date range picker is disabled",
      llmContext: "Whether the date range picker is disabled",
      propDefault: "false",
      category: "State",
      required: false,
    },
    {
      propName: "className",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Additional CSS class names for the component",
      llmContext: "Additional CSS class names for the component",
      propDefault: "undefined",
      category: "Styling",
      required: false,
    },
    {
      propName: "icon",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom icon to display in the trigger element",
      llmContext: "Custom icon to display in the trigger element",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
    {
      propName: "minDate",
      propType: "Date",
      typeDefinition: "Date",
      propDescription: "Minimum selectable date",
      llmContext: "Minimum selectable date",
      propDefault: "undefined",
      category: "Constraints",
      required: false,
    },
    {
      propName: "maxDate",
      propType: "Date",
      typeDefinition: "Date",
      propDescription: "Maximum selectable date",
      llmContext: "Maximum selectable date",
      propDefault: "undefined",
      category: "Constraints",
      required: false,
    },
    {
      propName: "dateFormat",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Format string for displaying dates",
      llmContext: "Format string for displaying dates",
      propDefault: "'MM/dd/yyyy'",
      category: "Formatting",
      required: false,
    },
    {
      propName: "ariaLabel",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Accessibility label for the date range picker",
      llmContext: "Accessibility label for the date range picker",
      propDefault: "undefined",
      category: "Accessibility",
      required: false,
    },
    {
      propName: "allowSingleDateSelection",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription:
        "Whether to allow selecting a single date instead of a range",
      llmContext: "Whether to allow selecting a single date instead of a range",
      propDefault: "false",
      category: "Behavior",
      required: false,
    },
    {
      propName: "disableFutureDates",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to disable selection of future dates",
      llmContext: "Whether to disable selection of future dates",
      propDefault: "false",
      category: "Constraints",
      required: false,
    },
    {
      propName: "disablePastDates",
      propType: "boolean",
      typeDefinition: "boolean",
      propDescription: "Whether to disable selection of past dates",
      llmContext: "Whether to disable selection of past dates",
      propDefault: "false",
      category: "Constraints",
      required: false,
    },
    {
      propName: "triggerElement",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom trigger element to open the date range picker",
      llmContext: "Custom trigger element to open the date range picker",
      propDefault: "undefined",
      category: "Content",
      required: false,
    },
  ],
};

export default daterangepickerMeta;
