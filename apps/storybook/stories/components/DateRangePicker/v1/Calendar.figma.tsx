import React from 'react'
import { figma } from '@figma/code-connect'
import { DateRangePicker } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CALENDAR (WEB)
 *
 * This connects the "Calender (Web)" component set — the expanded calendar
 * popover that DateRangePicker renders — to the DateRangePicker component.
 *
 * PROP MAPPING DOCUMENTATION
 *
 * 1. MAPPED PROPERTIES:
 *    - state (Figma VARIANT withTimerange/withoutTimerange)
 *      → showDateTimePicker (Code boolean)
 *      - withTimerange    → true  (calendar shows start/end time inputs)
 *      - withoutTimerange → false (calendar hides time inputs)
 *
 * 2. FIGMA-ONLY PROPERTIES (not mapped):
 *    - variant (default/hover/singleDate/singleMonth/twoMonths/
 *      startTimeDropdown/endTimeDropdown): Runtime calendar display states
 *      (hover effect, single-date selected, month view, dropdown open).
 *      These are internal interaction states — no equivalent code prop.
 *    - keypad (Default): Mobile keypad variant — not applicable to web code.
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled DateRange ({ startDate: Date, endDate?: Date }).
 *    - onChange: Range selection callback.
 *    - showPresets: Shows the quick-filter preset dropdown.
 *    - disablePastDates: Prevents selecting dates before today.
 */

figma.connect(
    DateRangePicker,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18797-292891',
    {
        props: {
            showDateTimePicker: figma.enum('state', {
                withTimerange: true,
                withoutTimerange: false,
            }),
        },

        example: ({ showDateTimePicker }) => (
            <DateRangePicker
                value={{
                    startDate: new Date('2025-11-05'),
                    endDate: new Date('2025-11-20'),
                }}
                onChange={() => {}}
                showDateTimePicker={showDateTimePicker}
                showPresets
                disablePastDates
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
