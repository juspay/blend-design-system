import React from 'react'
import { figma } from '@figma/code-connect'
import {
    DateRangePicker,
    DateRangePickerSize,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR DATERANGEPICKER
 *
 * PROP MAPPING DOCUMENTATION
 *
 * 1. RENAMED MAPPINGS:
 *    - size (Figma VARIANT lg/md/sm) → size (Code DateRangePickerSize enum)
 *      - lg → DateRangePickerSize.LARGE
 *      - md → DateRangePickerSize.MEDIUM
 *      - sm → DateRangePickerSize.SMALL
 *    - hasQuickFilter (Figma BOOLEAN) → showPresets (Code)
 *      Controls the quick-filter / preset-range dropdown visibility.
 *
 * 2. FIGMA-ONLY PROPERTIES (not mapped):
 *    - state (Figma VARIANT default/dateFilterExpanded/calenderExpanded):
 *      Represents the runtime open state of the picker UI:
 *      - default: trigger is closed
 *      - dateFilterExpanded: quick-filter dropdown is open
 *      - calenderExpanded: calendar popover is open
 *      In code, these are internal interaction states managed by the
 *      component — no equivalent prop is needed.
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - value: Controlled DateRange ({ startDate: Date, endDate?: Date }).
 *    - onChange: Range selection callback.
 *    - showDateTimePicker: Enables the time picker panel.
 */

figma.connect(
    DateRangePicker,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=18797-295546',
    {
        props: {
            size: figma.enum('size', {
                lg: DateRangePickerSize.LARGE,
                md: DateRangePickerSize.MEDIUM,
                sm: DateRangePickerSize.SMALL,
            }),

            showPresets: figma.boolean('hasQuickFilter'),
        },

        example: ({ size, showPresets }) => (
            <DateRangePicker
                value={{
                    startDate: new Date('2025-11-05'),
                    endDate: new Date('2025-11-20'),
                }}
                onChange={() => {}}
                size={size}
                showPresets={showPresets}
                showDateTimePicker
            />
        ),

        imports: [
            "import { DateRangePicker, DateRangePickerSize } from '@juspay/blend-design-system'",
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
