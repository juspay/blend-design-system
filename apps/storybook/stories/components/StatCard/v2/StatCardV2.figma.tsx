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
 * The Figma StatCard component set only exposes three variant properties:
 * - display: 'web' | 'mobile' (not needed in code)
 * - type: 'progress' | 'line' | 'bar' | 'number' | 'Empty' |
 *   'noVisualisationData'
 * - state: 'hover' | 'default' (interaction state, not needed in code)
 *
 * 1. RENAMED MAPPINGS:
 *    - type (Figma) → variant (Code)
 *      - line → StatCardV2Variant.CHART
 *      - progress → StatCardV2Variant.PROGRESS_BAR
 *      - number → StatCardV2Variant.NUMBER
 *      - bar → StatCardV2Variant.CHART (fallback: V2 dropped the BAR variant)
 *      - Empty / noVisualisationData → undefined (no code equivalent)
 *
 * 2. HARDCODED DEFAULTS:
 *    - Text content (title, value, date/subtitle), delta, slots, and
 *      visualisation flags live inside nested text/instance layers that are
 *      not exposed as component properties, so they are provided as sensible
 *      defaults in the example below.
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - change: StatCardV2Change object — { value: string, changeType:
 *      StatCardV2ChangeType, arrowDirection?: StatCardV2ArrowDirection }.
 *      NOTE: the V2 type field is `changeType` (not `type` as in V1), and
 *      `value` is a string.
 *    - options: Highcharts options for the CHART variant (replaces V1's
 *      `chartData` array); a sample sparkline `ChartV2Options` is provided.
 *    - progressValue: Numeric value (0-100) for the PROGRESS_BAR variant.
 *    - titleIcon, actionIcon, helpIconText, valueTooltip, dropdownProps,
 *      skeleton, showBorder, width/maxWidth/minWidth/height: not mapped.
 */

// Sample line options for the CHART variant
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
            // NOTE: The Figma StatCard component only exposes display, type,
            // and state properties — text content (title, value, date), delta,
            // slots, and visualisation flags live inside nested text/instance
            // layers that are not exposed as component properties, so they are
            // provided as sensible defaults in the example below.
            variant: figma.enum('type', {
                line: StatCardV2Variant.CHART,
                progress: StatCardV2Variant.PROGRESS_BAR,
                bar: StatCardV2Variant.CHART, // V2 dropped BAR; fall back to CHART
                number: StatCardV2Variant.NUMBER,
                Empty: undefined,
                noVisualisationData: undefined,
            }),

            // Chart options for the CHART variant (code-only; sample data)
            options: figma.enum('type', {
                line: sampleChartOptions,
                progress: undefined,
                bar: undefined,
                number: undefined,
                Empty: undefined,
                noVisualisationData: undefined,
            }),

            // Progress value for the PROGRESS_BAR variant (code-only; sample)
            progressValue: figma.enum('type', {
                line: undefined,
                progress: 75,
                bar: undefined,
                number: undefined,
                Empty: undefined,
                noVisualisationData: undefined,
            }),
        },

        example: ({ variant, options, progressValue }) => (
            <StatCardV2
                variant={variant}
                title="Total Revenue"
                value="$ 1,25,000"
                change={{
                    value: '10%',
                    changeType: StatCardV2ChangeType.INCREASE,
                    arrowDirection: StatCardV2ArrowDirection.UP,
                }}
                subtitle="vs last month"
                options={options}
                progressValue={progressValue}
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

// Blend Design System Stat Card component set, 28877:52276.
// All variants resolve through the main set; its canvas symbols are instances.
figma.connect(
    StatCardV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=28877-52276',
    {
        props: {
            variant: figma.enum('type', {
                line: StatCardV2Variant.CHART,
                progress: StatCardV2Variant.PROGRESS_BAR,
                bar: StatCardV2Variant.CHART,
                number: StatCardV2Variant.NUMBER,
                Empty: StatCardV2Variant.NUMBER,
                noVisualisationData: StatCardV2Variant.CHART,
            }),

            title: figma.string('title'),

            // Empty omits all data so StatCardV2 renders its no-data layout.
            value: figma.enum('type', {
                line: figma.string('value'),
                progress: figma.string('value'),
                bar: figma.string('value'),
                number: figma.string('value'),
                Empty: undefined,
                noVisualisationData: figma.string('value'),
            }),

            subtitle: figma.boolean('hasDate', {
                true: figma.string('date'),
                false: undefined,
            }),

            change: figma.enum('type', {
                line: figma.boolean('hasDelta', {
                    true: {
                        value: '23.45%',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    },
                    false: undefined,
                }),
                progress: figma.boolean('hasDelta', {
                    true: {
                        value: '23.45%',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    },
                    false: undefined,
                }),
                bar: figma.boolean('hasDelta', {
                    true: {
                        value: '23.45%',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    },
                    false: undefined,
                }),
                number: figma.boolean('hasDelta', {
                    true: {
                        value: '23.45%',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    },
                    false: undefined,
                }),
                Empty: undefined,
                noVisualisationData: figma.boolean('hasDelta', {
                    true: {
                        value: '23.45%',
                        changeType: StatCardV2ChangeType.INCREASE,
                        arrowDirection: StatCardV2ArrowDirection.UP,
                    },
                    false: undefined,
                }),
            }),

            // StatCardV2 supplies the sparkline axes, dimensions, and theme.
            options: figma.enum('type', {
                line: {
                    series: [
                        {
                            type: 'line',
                            color: '#2563eb',
                            data: [10, 20, 15, 25, 30],
                        },
                    ],
                },
                progress: undefined,
                bar: {
                    series: [
                        {
                            type: 'bar',
                            color: '#2563eb',
                            data: [10, 20, 15, 25, 30],
                        },
                    ],
                },
                number: undefined,
                Empty: undefined,
                noVisualisationData: undefined,
            }),

            progressValue: figma.enum('type', {
                line: undefined,
                progress: 75,
                bar: undefined,
                number: undefined,
                Empty: undefined,
                noVisualisationData: undefined,
            }),

            helpIconText: figma.boolean('hasHelpIcon', {
                true: 'More information about this metric',
                false: undefined,
            }),

            titleIcon: figma.boolean('hasSlot1', {
                true: figma.instance('slot1'),
                false: undefined,
            }),

            actionIcon: figma.boolean('hasSlot2', {
                true: figma.instance('slot2'),
                false: undefined,
            }),
        },

        example: ({
            variant,
            title,
            value,
            subtitle,
            change,
            options,
            progressValue,
            helpIconText,
            titleIcon,
            actionIcon,
        }) => (
            <StatCardV2
                variant={variant}
                title={title}
                value={value}
                subtitle={subtitle}
                change={change}
                options={options}
                progressValue={progressValue}
                helpIconText={helpIconText}
                titleIcon={titleIcon}
                actionIcon={actionIcon}
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
