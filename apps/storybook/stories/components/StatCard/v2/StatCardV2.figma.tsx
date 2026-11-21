import React from 'react'
import { figma } from '@figma/code-connect'
import {
    StatCardV2,
    StatCardV2Variant,
    StatCardV2ChangeType,
    StatCardV2ArrowDirection,
    type ChartV2Options,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR STATCARDV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - type (Figma) → variant (Code)
 *      - line → StatCardV2Variant.CHART
 *      - progress → StatCardV2Variant.PROGRESS_BAR
 *      - number → StatCardV2Variant.NUMBER
 *      - bar → StatCardV2Variant.CHART (fallback: V2 dropped the BAR variant)
 *    - date (Figma) → subtitle (Code)
 *    - hasDelta (Figma) → change (Code): maps to a structured object, not a bool
 *    - slot1 (Figma) → titleIcon (Code)
 *    - hasVisualisation (Figma) → options (Code): V2 has no `chartData` prop;
 *      the chart variant is driven by `options: ChartV2Options` (Highcharts).
 *
 * 2. DIRECT MAPPINGS (same in both):
 *    - title → title
 *    - value → value
 *
 * 3. SPECIAL MAPPINGS:
 *    - change (Code): When hasDelta is true, a `StatCardV2Change` object is
 *      provided. Its shape is { value: string, changeType:
 *      StatCardV2ChangeType, arrowDirection?: StatCardV2ArrowDirection }.
 *      NOTE: the V2 type field is `changeType` (not `type` as in V1), and
 *      `value` is a string.
 *    - options (Code): When type=line and hasVisualisation is true, a sample
 *      sparkline `ChartV2Options` is provided. V2 replaced V1's `chartData`
 *      array with a full Highcharts options object.
 *    - progressValue (Code): Provided for the PROGRESS_BAR variant.
 *
 * 4. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - state: Interaction state, not needed in code.
 *    - hasDate: Date visibility handled automatically (maps to `subtitle`).
 *    - hasHelpIcon: Help icon visibility handled automatically (maps to
 *      `helpIconText`).
 *    - hasSlot1: Handled by the slot1/titleIcon mapping.
 *    - hasSlot2, slot2: Not used in code.
 *
 * 5. CODE-ONLY PROPERTIES (not in Figma):
 *    - options: Highcharts options for the CHART variant (replaces chartData).
 *    - progressValue: Numeric value (0-100) for the PROGRESS_BAR variant.
 *    - actionIcon: ReactNode icon shown in the card header.
 *    - helpIconText: Tooltip text for the help icon.
 *    - valueTooltip: Tooltip for the value.
 *    - dropdownProps: SingleSelect props for a dropdown variant.
 *    - skeleton: Skeleton configuration.
 *    - showBorder: Toggle the card border.
 *    - width/maxWidth/minWidth/height: Dimension controls.
 */

// Sample sparkline options for the CHART variant
const sampleChartOptions: ChartV2Options = {
    chart: {
        backgroundColor: 'transparent',
        height: 50,
        spacingLeft: 0,
        spacingRight: 0,
        spacingTop: 0,
        spacingBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    legend: {
        enabled: false,
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false,
            },
        },
    },
    xAxis: {
        labels: {
            enabled: false,
        },
        gridLineWidth: 0,
        lineWidth: 0,
    },
    yAxis: {
        labels: {
            enabled: false,
        },
        gridLineWidth: 0,
        lineWidth: 0,
    },
    series: [
        {
            type: 'line',
            color: '#2563eb',
            data: [10, 20, 15, 25, 30],
        },
    ],
}

figma.connect(
    StatCardV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-705102&t=2L1Yl830ZKZjFcrt-11',
    {
        props: {
            // Renamed mapping: type (Figma) → variant (Code)
            variant: figma.enum('type', {
                line: StatCardV2Variant.CHART,
                progress: StatCardV2Variant.PROGRESS_BAR,
                bar: StatCardV2Variant.CHART, // V2 dropped BAR; fall back to CHART
                number: StatCardV2Variant.NUMBER,
            }),

            // Direct string mappings
            title: figma.string('title'),
            value: figma.string('value'),

            // Renamed mapping: date (Figma) → subtitle (Code)
            subtitle: figma.string('date'),

            // Renamed mapping: hasDelta (Figma) → change (Code object)
            // V2 change shape: { value: string, changeType, arrowDirection }
            change: figma.boolean('hasDelta', {
                true: {
                    value: '10%',
                    changeType: StatCardV2ChangeType.INCREASE,
                    arrowDirection: StatCardV2ArrowDirection.UP,
                },
                false: undefined,
            }),

            // Renamed mapping: slot1 (Figma) → titleIcon (Code)
            titleIcon: figma.boolean('hasSlot1', {
                true: figma.instance('slot 1'), // Property name with space
                false: undefined,
            }),

            // Renamed mapping: hasVisualisation (Figma) → options (Code)
            // V2 has no `chartData` prop; the chart variant uses Highcharts options.
            options: figma.enum('type', {
                line: figma.boolean('hasVisualisation', {
                    true: sampleChartOptions,
                    false: undefined,
                }),
                progress: undefined,
                bar: undefined,
                number: undefined,
            }),

            // Code-only: progress value for the PROGRESS_BAR variant
            progressValue: figma.enum('type', {
                line: undefined,
                progress: 75, // Default progress value
                bar: undefined,
                number: undefined,
            }),

            // Note: The following props are not mapped:
            // - actionIcon (not in Figma)
            // - helpIconText (not in Figma)
            // - valueTooltip (not in Figma)
        },

        example: ({
            variant,
            title,
            value,
            change,
            subtitle,
            options,
            progressValue,
            titleIcon,
        }) => (
            <StatCardV2
                variant={variant}
                title={title}
                value={value}
                change={change}
                subtitle={subtitle}
                options={options}
                progressValue={progressValue}
                titleIcon={titleIcon}
            />
        ),

        imports: [
            "import { StatCardV2, StatCardV2Variant, StatCardV2ChangeType, StatCardV2ArrowDirection } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/StatCardV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-statcardv2--docs',
            },
        ],
    }
)
