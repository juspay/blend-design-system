import { figma } from '@figma/code-connect'
import {
    Charts,
    ChartType,
    ChartLegendPosition,
} from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR CHARTS COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Mappings:
 *
 * 1. DIRECT MAPPINGS:
 *    - type (Figma) → chartType (Code) - Maps chart type selection
 *    - legendPosition → legendPosition (top, right)
 *
 * 2. SPECIAL MAPPINGS:
 *    - The Figma component represents the visual structure
 *    - Data, colors, and labels are code-only properties
 *
 * 3. FIGMA-ONLY PROPERTIES:
 *    - Visual states and hover effects are handled automatically
 *
 * 4. CODE-ONLY PROPERTIES:
 *    - data: Chart data array
 *    - colors: Custom color array
 *    - xAxisLabel: X-axis label text
 *    - yAxisLabel: Y-axis label text
 *    - slot1, slot2, slot3: Header slots
 *    - chartHeaderSlot: Custom header content
 *    - metrics: Metric keys to display
 */

// Base Charts connection
figma.connect(
    Charts,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        props: {
            // Map Figma 'type' property to code 'chartType' prop
            chartType: figma.enum('type', {
                line: ChartType.LINE,
                bar: ChartType.BAR,
                pie: ChartType.PIE,
            }),
        },

        example: ({ chartType }) => (
            <Charts
                chartType={chartType}
                legendPosition={ChartLegendPosition.TOP}
                data={[
                    {
                        name: 'Jan',
                        data: {
                            Revenue: {
                                primary: { label: 'Revenue', val: 4000 },
                            },
                            Profit: { primary: { label: 'Profit', val: 2400 } },
                        },
                    },
                    {
                        name: 'Feb',
                        data: {
                            Revenue: {
                                primary: { label: 'Revenue', val: 3000 },
                            },
                            Profit: { primary: { label: 'Profit', val: 1398 } },
                        },
                    },
                    {
                        name: 'Mar',
                        data: {
                            Revenue: {
                                primary: { label: 'Revenue', val: 2000 },
                            },
                            Profit: { primary: { label: 'Profit', val: 9800 } },
                        },
                    },
                ]}
                colors={['#8884d8', '#82ca9d']}
                xAxisLabel="Month"
                yAxisLabel="Amount ($)"
                slot1={<span>Total Revenue</span>}
                slot2={<span>$9,000</span>}
                slot3={<span>+12.5%</span>}
                chartHeaderSlot={null}
            />
        ),

        imports: [
            "import { Charts, ChartType, ChartLegendPosition } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Charts',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-charts--docs',
            },
        ],
    }
)

// Variant: Line Chart
figma.connect(
    Charts,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        variant: { type: 'line' },
        example: () => (
            <Charts
                chartType={ChartType.LINE}
                legendPosition={ChartLegendPosition.TOP}
                data={[
                    {
                        name: 'Jan',
                        data: {
                            Sales: { primary: { label: 'Sales', val: 4000 } },
                            Orders: { primary: { label: 'Orders', val: 2400 } },
                        },
                    },
                    {
                        name: 'Feb',
                        data: {
                            Sales: { primary: { label: 'Sales', val: 3000 } },
                            Orders: { primary: { label: 'Orders', val: 1398 } },
                        },
                    },
                    {
                        name: 'Mar',
                        data: {
                            Sales: { primary: { label: 'Sales', val: 2000 } },
                            Orders: { primary: { label: 'Orders', val: 9800 } },
                        },
                    },
                ]}
                colors={['#3b82f6', '#10b981']}
                xAxisLabel="Month"
                yAxisLabel="Value"
                chartHeaderSlot={null}
            />
        ),
    }
)

// Variant: Bar Chart
figma.connect(
    Charts,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        variant: { type: 'bar' },
        example: () => (
            <Charts
                chartType={ChartType.BAR}
                legendPosition={ChartLegendPosition.TOP}
                data={[
                    {
                        name: 'Q1',
                        data: {
                            'Product A': {
                                primary: { label: 'Product A', val: 4000 },
                            },
                            'Product B': {
                                primary: { label: 'Product B', val: 2400 },
                            },
                        },
                    },
                    {
                        name: 'Q2',
                        data: {
                            'Product A': {
                                primary: { label: 'Product A', val: 3000 },
                            },
                            'Product B': {
                                primary: { label: 'Product B', val: 1398 },
                            },
                        },
                    },
                    {
                        name: 'Q3',
                        data: {
                            'Product A': {
                                primary: { label: 'Product A', val: 2000 },
                            },
                            'Product B': {
                                primary: { label: 'Product B', val: 9800 },
                            },
                        },
                    },
                ]}
                colors={['#8b5cf6', '#f59e0b']}
                xAxisLabel="Quarter"
                yAxisLabel="Sales"
                chartHeaderSlot={null}
            />
        ),
    }
)

// Variant: Pie Chart
figma.connect(
    Charts,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=18805-371955&t=2L1Yl830ZKZjFcrt-11',
    {
        variant: { type: 'pie' },
        example: () => (
            <Charts
                chartType={ChartType.PIE}
                legendPosition={ChartLegendPosition.RIGHT}
                data={[
                    {
                        name: 'Desktop',
                        data: {
                            Usage: { primary: { label: 'Desktop', val: 45 } },
                        },
                    },
                    {
                        name: 'Mobile',
                        data: {
                            Usage: { primary: { label: 'Mobile', val: 35 } },
                        },
                    },
                    {
                        name: 'Tablet',
                        data: {
                            Usage: { primary: { label: 'Tablet', val: 20 } },
                        },
                    },
                ]}
                colors={['#0ea5e9', '#22c55e', '#eab308']}
                chartHeaderSlot={null}
            />
        ),
    }
)

/**
 * Example of Charts usage in code:
 *
 * // Basic Line Chart
 * const salesData = [
 *   {
 *     name: 'Jan',
 *     data: {
 *       'Revenue': { primary: { label: 'Revenue', val: 4000 } },
 *       'Profit': { primary: { label: 'Profit', val: 2400 } },
 *     }
 *   },
 *   // ... more data points
 * ];
 *
 * <Charts
 *   chartType={ChartType.LINE}
 *   data={salesData}
 *   colors={['#8884d8', '#82ca9d']}
 *   xAxisLabel="Month"
 *   yAxisLabel="Amount ($)"
 * />
 *
 * // With Header Slots
 * <Charts
 *   chartType={ChartType.BAR}
 *   data={salesData}
 *   slot1={<h3>Revenue Overview</h3>}
 *   slot2={<span className="metric">$45,231</span>}
 *   slot3={<span className="change">+12.5%</span>}
 *   legendPosition={ChartLegendPosition.TOP}
 * />
 *
 * // Custom Header
 * <Charts
 *   chartType={ChartType.PIE}
 *   data={marketShareData}
 *   chartHeaderSlot={
 *     <div className="custom-header">
 *       <h2>Market Share Distribution</h2>
 *       <p>Q4 2024</p>
 *     </div>
 *   }
 *   legendPosition={ChartLegendPosition.RIGHT}
 * />
 *
 * // With Custom Colors
 * <Charts
 *   chartType={ChartType.LINE}
 *   data={performanceData}
 *   colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444']}
 *   xAxisLabel="Time"
 *   yAxisLabel="Performance (%)"
 * />
 */
