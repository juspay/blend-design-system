import { figma } from '@figma/code-connect'
import { DateRangePicker, DateRangePreset } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR DATERANGEPICKER COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - placeholder → placeholder
 *    - showTimePicker → showTimePicker
 *    - showPresets → showPresets
 *
 * 2. SPECIAL MAPPINGS:
 *    - state=disabled (Figma) → isDisabled=true (Code) - Disabled state in Figma maps to isDisabled prop
 *    - preset (Figma) → value with preset dates (Code) - Preset selection maps to date range values
 *
 * 3. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state - Other interaction states (hover, focus, active) are handled automatically
 *    - showIcon - Icon is shown automatically when icon prop is provided
 *    - isOpen - Popover state is handled internally
 *
 * 4. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Current selected date range
 *    - onChange: Callback when date range changes
 *    - icon: Custom icon element
 *    - minDate: Minimum selectable date
 *    - maxDate: Maximum selectable date
 *    - dateFormat: Custom date format string
 *    - allowSingleDateSelection: Allow selecting single date
 *    - disableFutureDates: Disable future date selection
 *    - disablePastDates: Disable past date selection
 *    - triggerElement: Custom trigger element
 */

// Base DateRangePicker connection
figma.connect(
    DateRangePicker,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18797-292891&t=2L1Yl830ZKZjFcrt-11',
    {
        props: {
            // Note: The DateRangePicker Figma component doesn't expose properties
            // All props are code-only and configured in the implementation
        },

        example: () => (
            <DateRangePicker
                placeholder="Select date range"
                value={undefined}
                onChange={(range) => console.log(range)}
                showTimePicker={false}
                showPresets={false}
                allowSingleDateSelection={false}
                minDate={undefined}
                maxDate={undefined}
                disablePastDates={false}
                disableFutureDates={false}
                dateFormat="MMM dd, yyyy"
                icon={undefined}
                isDisabled={false}
                triggerElement={undefined}
            />
        ),

        imports: [
            "import { DateRangePicker } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/DateRangePicker',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-daterangepicker--docs',
            },
        ],
    }
)

/**
 * Example of DateRangePicker usage in code:
 *
 * // Basic usage
 * const [dateRange, setDateRange] = useState<DateRange>();
 *
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   placeholder="Select date range"
 * />
 *
 * // With time picker
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   showTimePicker={true}
 *   placeholder="Select date and time range"
 * />
 *
 * // With presets
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   showPresets={true}
 *   placeholder="Select or choose preset"
 * />
 *
 * // With custom icon
 * import { Calendar } from 'lucide-react';
 *
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   icon={<Calendar size={18} />}
 *   placeholder="Pick dates"
 * />
 *
 * // With date constraints
 * const today = new Date();
 * const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
 *
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   minDate={today}
 *   maxDate={nextMonth}
 *   placeholder="Select dates within next month"
 * />
 *
 * // Disable past dates
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   disablePastDates={true}
 *   placeholder="Select future dates only"
 * />
 *
 * // Allow single date selection
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   allowSingleDateSelection={true}
 *   placeholder="Select date or range"
 * />
 *
 * // Custom date format
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   dateFormat="dd/MM/yyyy"
 *   placeholder="DD/MM/YYYY - DD/MM/YYYY"
 * />
 *
 * // With custom trigger element
 * <DateRangePicker
 *   value={dateRange}
 *   onChange={setDateRange}
 *   triggerElement={
 *     <button className="custom-trigger">
 *       {dateRange ? `${dateRange.startDate} - ${dateRange.endDate}` : 'Select dates'}
 *     </button>
 *   }
 * />
 *
 * // Complete example with all features
 * const [reportDateRange, setReportDateRange] = useState<DateRange>({
 *   startDate: new Date(),
 *   endDate: new Date(new Date().setDate(new Date().getDate() + 7))
 * });
 *
 * <DateRangePicker
 *   value={reportDateRange}
 *   onChange={setReportDateRange}
 *   showTimePicker={true}
 *   showPresets={true}
 *   placeholder="Select report period"
 *   icon={<Calendar size={18} />}
 *   minDate={new Date(2024, 0, 1)}
 *   maxDate={new Date(2024, 11, 31)}
 *   dateFormat="MMM dd, yyyy HH:mm"
 * />
 *
 * // Handling preset selection
 * const handlePresetSelect = (preset: DateRangePreset) => {
 *   const now = new Date();
 *   let startDate: Date;
 *   let endDate: Date;
 *
 *   switch (preset) {
 *     case DateRangePreset.TODAY:
 *       startDate = new Date(now.setHours(0, 0, 0, 0));
 *       endDate = new Date(now.setHours(23, 59, 59, 999));
 *       break;
 *     case DateRangePreset.LAST_7_DAYS:
 *       endDate = new Date();
 *       startDate = new Date(now.setDate(now.getDate() - 7));
 *       break;
 *     // ... handle other presets
 *   }
 *
 *   setDateRange({ startDate, endDate });
 * };
 */
