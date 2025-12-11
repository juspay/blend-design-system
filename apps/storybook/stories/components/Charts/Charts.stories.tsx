import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Charts,
    ChartType,
    ChartLegendPosition,
    NewNestedDataPoint,
    AxisType,
    AxisIntervalType,
    LegendsChangeType,
} from '@juspay/blend-design-system'
import {
    TrendingUp,
    Calendar,
    DollarSign,
    Users,
    Activity,
    BarChart3,
    PieChart,
    LineChart,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

// Disable ALL animations in Storybook for Charts
if (typeof window !== 'undefined') {
    const style = document.createElement('style')
    style.innerHTML = `
    /* Disable all Recharts animations */
    .recharts-wrapper,
    .recharts-wrapper *,
    .recharts-surface,
    .recharts-layer,
    .recharts-line-curve,
    .recharts-bar-rectangle,
    .recharts-pie-sector,
    .recharts-scatter-dots,
    .recharts-area-area,
    .recharts-radial-bar-sector,
    .recharts-funnel-trapezoid,
    .recharts-sankey-node,
    .recharts-sankey-link,
    .recharts-treemap-depth,
    .recharts-cartesian-axis,
    .recharts-cartesian-grid,
    .recharts-polar-grid,
    .recharts-legend-wrapper,
    .recharts-tooltip-wrapper,
    .recharts-brush,
    .recharts-reference-line,
    .recharts-reference-area,
    .recharts-reference-dot,
    .recharts-error-bar,
    .recharts-label,
    .recharts-label-list {
      animation: none !important;
      transition: none !important;
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
    
    /* Disable any growing/scaling animations */
    .recharts-wrapper * {
      transform-origin: initial !important;
    }
    
    /* Force immediate render for all chart elements */
    .recharts-surface > * {
      opacity: 1 !important;
    }
    
    /* Specifically disable the left-to-right growing animation */
    .recharts-bar-rectangle,
    .recharts-line-curve,
    .recharts-area-area {
      stroke-dasharray: none !important;
      stroke-dashoffset: 0 !important;
    }
    
    /* Disable any width/height animations that cause growing effect */
    .recharts-wrapper,
    .recharts-surface,
    .recharts-responsive-container {
      transition: none !important;
      animation: none !important;
    }
  `
    document.head.appendChild(style)

    // Also disable animations at the global level for Recharts
    if (window.requestAnimationFrame) {
        const originalRAF = window.requestAnimationFrame
        window.requestAnimationFrame = function (callback) {
            // For Recharts animations, execute immediately
            return originalRAF.call(this, function () {
                callback(Date.now())
            })
        }
    }
}

const meta: Meta<typeof Charts> = {
    title: 'Components/Charts',
    component: Charts,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `

A powerful and flexible charting component built on Recharts that supports multiple chart types with interactive legends and customizable styling.

## Features
- Multiple chart types (Line, Bar, Pie)
- Interactive legends with hover and click functionality
- Customizable colors and styling
- Flexible data structure supporting nested data points
- Custom tooltips with detailed information
- Header slots for additional content
- Responsive design with container queries
- Legend positioning options (top, right)

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible legends and interactive elements
- Screen reader support (VoiceOver/NVDA)
- Proper semantic structure and ARIA attributes
- Focus indicators visible on all interactive elements
- Touch targets meet Level AA requirement (24x24px minimum)
- Charts properly labeled with role="img" and descriptive aria-label

**Level AAA Compliance**: ⚠️ Partial
- ✅ **Compliant**: 1.3.4 Orientation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: Color contrast ratios should be verified using actual color values from theme tokens

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker

## Usage

\`\`\`tsx
import { Charts, ChartType, ChartLegendPosition } from '@juspay/blend-design-system';

const data = [
  {
    name: "Jan",
    data: {
      revenue: { primary: { label: "Revenue", val: 4000 } },
      profit: { primary: { label: "Profit", val: 2400 } }
    }
  },
  // ... more data points
];

<Charts
  chartType={ChartType.LINE}
  data={data}
  xAxis={{ label: 'Month', showLabel: true, show: true }}
  yAxis={{ label: 'Amount ($)', showLabel: true, show: true, type: AxisType.CURRENCY }}
  chartHeaderSlot={<h3>Monthly Revenue</h3>}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        chartType: {
            control: 'select',
            options: Object.values(ChartType),
            description:
                'The type of chart to render (Line, Bar, Pie, Scatter)',
        },
        data: {
            control: 'object',
            description: 'Array of nested data points for the chart',
        },
        colors: {
            control: 'object',
            description: 'Array of colors for the chart series',
        },
        legendPosition: {
            control: 'select',
            options: Object.values(ChartLegendPosition),
            description: 'Position of the legend relative to the chart',
        },
        stackedLegends: {
            control: 'boolean',
            description: 'Whether to show legends in a stacked layout',
        },
        stackedLegendsData: {
            control: 'object',
            description:
                'Data for stacked legends with value, delta, and change type',
        },
        barsize: {
            control: 'number',
            description: 'Size of bars in bar charts',
        },
        xAxis: {
            control: 'object',
            description:
                'X-axis configuration with label, type, formatting options',
        },
        yAxis: {
            control: 'object',
            description:
                'Y-axis configuration with label, type, formatting options',
        },
        noData: {
            control: 'object',
            description:
                'Configuration for no-data state with title, subtitle, slot, and button',
        },
        height: {
            control: 'number',
            description: 'Height of the chart in pixels',
        },
        showHeader: {
            control: 'boolean',
            description: 'Whether to show the chart header',
        },
        showCollapseIcon: {
            control: 'boolean',
            description: 'Whether to show the collapse/expand icon in header',
        },
        isExpanded: {
            control: 'boolean',
            description: 'Controlled state for chart expansion',
        },
        onExpandedChange: {
            action: 'expandedChanged',
            description: 'Callback fired when chart expansion state changes',
        },
        chartHeaderSlot: {
            control: false,
            description: 'React node to render in the chart header',
        },
        slot1: {
            control: false,
            description: 'First slot for header content',
        },
        slot2: {
            control: false,
            description: 'Second slot for header content',
        },
        slot3: {
            control: false,
            description: 'Third slot for header content',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Charts>

// Sample data generators
const generateMonthlyData = (): NewNestedDataPoint[] => [
    {
        name: 'Jan',
        data: {
            revenue: { primary: { label: 'Revenue', val: 4000 } },
            profit: { primary: { label: 'Profit', val: 2400 } },
            expenses: { primary: { label: 'Expenses', val: 1600 } },
        },
    },
    {
        name: 'Feb',
        data: {
            revenue: { primary: { label: 'Revenue', val: 3000 } },
            profit: { primary: { label: 'Profit', val: 1398 } },
            expenses: { primary: { label: 'Expenses', val: 1602 } },
        },
    },
    {
        name: 'Mar',
        data: {
            revenue: { primary: { label: 'Revenue', val: 2000 } },
            profit: { primary: { label: 'Profit', val: 800 } },
            expenses: { primary: { label: 'Expenses', val: 1200 } },
        },
    },
    {
        name: 'Apr',
        data: {
            revenue: { primary: { label: 'Revenue', val: 2780 } },
            profit: { primary: { label: 'Profit', val: 1908 } },
            expenses: { primary: { label: 'Expenses', val: 872 } },
        },
    },
    {
        name: 'May',
        data: {
            revenue: { primary: { label: 'Revenue', val: 1890 } },
            profit: { primary: { label: 'Profit', val: 800 } },
            expenses: { primary: { label: 'Expenses', val: 1090 } },
        },
    },
    {
        name: 'Jun',
        data: {
            revenue: { primary: { label: 'Revenue', val: 2390 } },
            profit: { primary: { label: 'Profit', val: 1200 } },
            expenses: { primary: { label: 'Expenses', val: 1190 } },
        },
    },
]

const generateCategoryData = (): NewNestedDataPoint[] => [
    {
        name: 'Electronics',
        data: {
            sales: { primary: { label: 'Sales', val: 35 } },
        },
    },
    {
        name: 'Clothing',
        data: {
            sales: { primary: { label: 'Sales', val: 25 } },
        },
    },
    {
        name: 'Food',
        data: {
            sales: { primary: { label: 'Sales', val: 20 } },
        },
    },
    {
        name: 'Books',
        data: {
            sales: { primary: { label: 'Sales', val: 12 } },
        },
    },
    {
        name: 'Other',
        data: {
            sales: { primary: { label: 'Sales', val: 8 } },
        },
    },
]

// Default story
export const Default: Story = {
    args: {
        chartType: ChartType.LINE,
        data: generateMonthlyData(),
        xAxis: {
            label: 'Month',
            showLabel: true,
            show: true,
        },
        yAxis: {
            label: 'Amount ($)',
            showLabel: true,
            show: true,
            type: AxisType.CURRENCY,
        },
        height: 400,
        showHeader: true,
        showCollapseIcon: true,
        legendPosition: ChartLegendPosition.TOP,
        chartHeaderSlot: (
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Monthly Financial Overview
            </div>
        ),
    },
}

// Line Chart
export const LineChartExample: Story = {
    render: () => (
        <div style={{ width: '800px', height: '500px' }}>
            <Charts
                chartType={ChartType.LINE}
                data={generateMonthlyData()}
                xAxis={{
                    label: 'Month',
                    showLabel: true,
                    show: true,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                colors={['#3b82f6', '#10b981', '#ef4444']}
                chartHeaderSlot={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <LineChart size={20} />
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Revenue Trends
                        </span>
                    </div>
                }
                slot1={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <TrendingUp size={16} color="#10b981" />
                        <span style={{ fontSize: '14px', color: '#10b981' }}>
                            +12.5%
                        </span>
                    </div>
                }
                slot2={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <Calendar size={16} />
                        <span style={{ fontSize: '14px' }}>Last 6 months</span>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Line chart showing trends over time with multiple data series.',
            },
        },
    },
}

// Bar Chart
export const BarChartExample: Story = {
    render: () => (
        <div style={{ width: '800px', height: '500px' }}>
            <Charts
                chartType={ChartType.BAR}
                data={generateMonthlyData()}
                xAxis={{
                    label: 'Month',
                    showLabel: true,
                    show: true,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                colors={['#8b5cf6', '#f59e0b', '#06b6d4']}
                chartHeaderSlot={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <BarChart3 size={20} />
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Monthly Comparison
                        </span>
                    </div>
                }
                slot1={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <DollarSign size={16} />
                        <span style={{ fontSize: '14px' }}>Total: $15,060</span>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Bar chart for comparing values across categories.',
            },
        },
    },
}

// Pie Chart
export const PieChartExample: Story = {
    render: () => (
        <div style={{ width: '600px', height: '500px' }}>
            <Charts
                chartType={ChartType.PIE}
                data={generateCategoryData()}
                colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']}
                chartHeaderSlot={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                    >
                        <PieChart size={20} />
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Sales by Category
                        </span>
                    </div>
                }
                slot1={
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                        }}
                    >
                        <Users size={16} />
                        <span style={{ fontSize: '14px' }}>5 Categories</span>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Pie chart showing proportional data distribution.',
            },
        },
    },
}

// Legend Positions
export const LegendPositions: Story = {
    render: () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ width: '800px', height: '500px' }}>
                <Charts
                    chartType={ChartType.LINE}
                    data={generateMonthlyData()}
                    xAxis={{
                        label: 'Month',
                        showLabel: true,
                        show: true,
                    }}
                    yAxis={{
                        label: 'Amount ($)',
                        showLabel: true,
                        show: true,
                        type: AxisType.CURRENCY,
                    }}
                    legendPosition={ChartLegendPosition.TOP}
                    chartHeaderSlot={
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                            Legend Position: Top
                        </span>
                    }
                />
            </div>
            <div style={{ width: '800px', height: '500px' }}>
                <Charts
                    chartType={ChartType.PIE}
                    data={generateCategoryData()}
                    legendPosition={ChartLegendPosition.RIGHT}
                    chartHeaderSlot={
                        <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                            Legend Position: Right (Pie Chart)
                        </span>
                    }
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different legend positioning options for various chart types.',
            },
        },
    },
}

// Custom Colors
export const CustomColors: Story = {
    render: () => (
        <div style={{ width: '800px', height: '500px' }}>
            <Charts
                chartType={ChartType.BAR}
                data={generateMonthlyData()}
                xAxis={{
                    label: 'Month',
                    showLabel: true,
                    show: true,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                colors={['#dc2626', '#059669', '#7c3aed']}
                chartHeaderSlot={
                    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Custom Color Scheme
                    </span>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Charts with custom color schemes for branding consistency.',
            },
        },
    },
}

// Complex Data Example
export const ComplexDataExample: Story = {
    render: () => {
        const complexData: NewNestedDataPoint[] = [
            {
                name: 'Q1',
                data: {
                    desktop: { primary: { label: 'Desktop', val: 186 } },
                    mobile: { primary: { label: 'Mobile', val: 305 } },
                    tablet: { primary: { label: 'Tablet', val: 237 } },
                    other: { primary: { label: 'Other', val: 73 } },
                },
            },
            {
                name: 'Q2',
                data: {
                    desktop: { primary: { label: 'Desktop', val: 305 } },
                    mobile: { primary: { label: 'Mobile', val: 400 } },
                    tablet: { primary: { label: 'Tablet', val: 287 } },
                    other: { primary: { label: 'Other', val: 90 } },
                },
            },
            {
                name: 'Q3',
                data: {
                    desktop: { primary: { label: 'Desktop', val: 237 } },
                    mobile: { primary: { label: 'Mobile', val: 375 } },
                    tablet: { primary: { label: 'Tablet', val: 250 } },
                    other: { primary: { label: 'Other', val: 85 } },
                },
            },
            {
                name: 'Q4',
                data: {
                    desktop: { primary: { label: 'Desktop', val: 273 } },
                    mobile: { primary: { label: 'Mobile', val: 420 } },
                    tablet: { primary: { label: 'Tablet', val: 290 } },
                    other: { primary: { label: 'Other', val: 95 } },
                },
            },
        ]

        return (
            <div style={{ width: '900px', height: '550px' }}>
                <Charts
                    chartType={ChartType.LINE}
                    data={complexData}
                    xAxis={{
                        label: 'Quarter',
                        showLabel: true,
                        show: true,
                    }}
                    yAxis={{
                        label: 'Users (thousands)',
                        showLabel: true,
                        show: true,
                        type: AxisType.NUMBER,
                    }}
                    colors={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']}
                    chartHeaderSlot={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Activity size={20} />
                            <span
                                style={{ fontSize: '18px', fontWeight: 'bold' }}
                            >
                                User Activity by Device Type
                            </span>
                        </div>
                    }
                    slot1={
                        <div
                            style={{
                                padding: '4px 8px',
                                background: '#e0f2fe',
                                borderRadius: '4px',
                                fontSize: '12px',
                                color: '#0369a1',
                            }}
                        >
                            Live Data
                        </div>
                    }
                    slot2={
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            Updated 5 mins ago
                        </div>
                    }
                    slot3={
                        <button
                            style={{
                                padding: '6px 12px',
                                borderRadius: '4px',
                                border: '1px solid #ccc',
                                background: 'white',
                                cursor: 'pointer',
                                fontSize: '14px',
                            }}
                        >
                            Export
                        </button>
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complex chart with multiple data series and rich header content.',
            },
        },
    },
}

// Interactive Features
export const InteractiveFeatures: Story = {
    render: () => (
        <div style={{ width: '800px', height: '500px' }}>
            <Charts
                chartType={ChartType.LINE}
                data={generateMonthlyData()}
                xAxis={{
                    label: 'Month',
                    showLabel: true,
                    show: true,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div>
                        <div
                            style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                            }}
                        >
                            Interactive Chart Features
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            • Click legend items to toggle series visibility
                            <br />
                            • Hover over legend items to highlight series
                            <br />• Hover over data points for detailed tooltips
                        </div>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstration of interactive features including legend interactions and tooltips.',
            },
        },
    },
}

// Empty State
export const EmptyState: Story = {
    render: () => (
        <div style={{ width: '800px', height: '500px' }}>
            <Charts
                chartType={ChartType.LINE}
                data={[]}
                xAxis={{
                    label: 'Time',
                    showLabel: true,
                    show: true,
                }}
                yAxis={{
                    label: 'Value',
                    showLabel: true,
                    show: true,
                    type: AxisType.NUMBER,
                }}
                chartHeaderSlot={
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div
                            style={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                marginBottom: '8px',
                            }}
                        >
                            No Data Available
                        </div>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            Data will appear here once available
                        </div>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Chart component with no data showing empty state.',
            },
        },
    },
}

// Responsive Example
export const ResponsiveExample: Story = {
    render: () => (
        <div style={{ width: '100%', maxWidth: '1200px', height: '600px' }}>
            <Charts
                chartType={ChartType.BAR}
                data={generateMonthlyData()}
                xAxis={{
                    label: 'Month',
                    showLabel: true,
                    show: true,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                chartHeaderSlot={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: '16px',
                        }}
                    >
                        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Responsive Chart Container
                        </span>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                            Resize the window to see responsive behavior
                        </div>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Chart that adapts to container size with responsive design.',
            },
        },
    },
}

export const SankeyChartExample: Story = {
    render: () => {
        const sankeyData: NewNestedDataPoint[] = [
            {
                name: 'payment-flow',
                data: {
                    sankeyData: {
                        primary: {
                            nodes: [
                                { id: 'Visa', name: 'Visa', color: '#1e3a8a' },
                                {
                                    id: 'Mastercard',
                                    name: 'Mastercard',
                                    color: '#1e3a8a',
                                },
                                {
                                    id: 'Out 3DS Scope',
                                    name: 'Out 3DS Scope',
                                    color: '#1e3a8a',
                                },
                                {
                                    id: 'In 3DS Scope',
                                    name: 'In 3DS Scope',
                                    color: '#1e3a8a',
                                },
                                {
                                    id: 'Received',
                                    name: 'Received',
                                    color: '#1e3a8a',
                                },
                                {
                                    id: 'Authorised',
                                    name: 'Authorised',
                                    color: '#1e3a8a',
                                },
                                {
                                    id: 'Failed',
                                    name: 'Failed',
                                    color: '#991b1b',
                                },
                            ],
                            links: [
                                {
                                    source: 'Visa',
                                    target: 'Out 3DS Scope',
                                    value: 165.0,
                                    color: 'rgba(59, 130, 246, 0.4)',
                                    hoverColor: 'rgba(59, 130, 246, 0.8)',
                                },
                                {
                                    source: 'Visa',
                                    target: 'In 3DS Scope',
                                    value: 78.0,
                                    color: 'rgba(59, 130, 246, 0.4)',
                                    hoverColor: 'rgba(59, 130, 246, 0.8)',
                                },
                                {
                                    source: 'Mastercard',
                                    target: 'Out 3DS Scope',
                                    value: 30.0,
                                    color: 'rgba(59, 130, 246, 0.4)',
                                    hoverColor: 'rgba(59, 130, 246, 0.8)',
                                },
                                {
                                    source: 'Mastercard',
                                    target: 'In 3DS Scope',
                                    value: 14.0,
                                    color: 'rgba(59, 130, 246, 0.4)',
                                    hoverColor: 'rgba(59, 130, 246, 0.8)',
                                },
                                {
                                    source: 'Out 3DS Scope',
                                    target: 'Received',
                                    value: 195.0,
                                    color: 'rgba(59, 130, 246, 0.4)',
                                    hoverColor: 'rgba(59, 130, 246, 0.8)',
                                },
                                {
                                    source: 'In 3DS Scope',
                                    target: 'Received',
                                    value: 92.0,
                                    color: 'rgba(59, 130, 246, 0.4)',
                                    hoverColor: 'rgba(59, 130, 246, 0.8)',
                                },
                                {
                                    source: 'Received',
                                    target: 'Authorised',
                                    value: 220.0,
                                    color: 'rgba(16, 185, 129, 0.4)',
                                    hoverColor: 'rgba(16, 185, 129, 0.8)',
                                },
                                {
                                    source: 'Received',
                                    target: 'Failed',
                                    value: 67.0,
                                    color: 'rgba(239, 68, 68, 0.4)',
                                    hoverColor: 'rgba(239, 68, 68, 0.9)',
                                },
                            ],
                        } as any,
                        aux: [],
                    },
                },
            },
        ]

        return (
            <div style={{ width: '900px', height: '600px' }}>
                <Charts
                    chartType={ChartType.SANKEY}
                    data={sankeyData}
                    height={500}
                    chartHeaderSlot={
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                            }}
                        >
                            <Activity size={20} />
                            <span
                                style={{ fontSize: '18px', fontWeight: 'bold' }}
                            >
                                Payment Card Flow
                            </span>
                        </div>
                    }
                    slot1={
                        <div
                            style={{
                                padding: '4px 8px',
                                background: '#dbeafe',
                                borderRadius: '4px',
                                fontSize: '12px',
                                color: '#1e40af',
                            }}
                        >
                            3DS Authentication
                        </div>
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Sankey diagram visualizing payment card flow through 3DS authentication with custom colors and hover effects. Shows flow from card types through authentication to authorization.',
            },
        },
    },
}

// Interactive Playground
export const InteractivePlayground: Story = {
    args: {
        chartType: ChartType.LINE,
        data: generateMonthlyData(),
        height: 400,
        showHeader: true,
        showCollapseIcon: true,
        stackedLegends: false,
        barsize: 30,
        legendPosition: ChartLegendPosition.TOP,
        xAxis: {
            label: 'Month',
            showLabel: true,
            show: true,
        },
        yAxis: {
            label: 'Amount ($)',
            showLabel: true,
            show: true,
            type: AxisType.CURRENCY,
        },
        chartHeaderSlot: (
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                Interactive Chart Playground
            </div>
        ),
        slot1: (
            <span style={{ color: '#10b981', fontSize: '14px' }}>+12.5%</span>
        ),
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive playground to experiment with all Charts props using the controls panel.',
            },
        },
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating WCAG 2.1 Level AA compliance
 */
export const Accessibility: Story = {
    render: () => {
        const monthlyData = generateMonthlyData()
        const categoryData = generateCategoryData()

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    padding: '20px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '8px',
                }}
            >
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: 700,
                        marginBottom: '16px',
                        color: '#1e293b',
                    }}
                >
                    Charts Component Accessibility Showcase
                </h2>
                <p
                    style={{
                        fontSize: '16px',
                        color: '#475569',
                        lineHeight: '1.6',
                        marginBottom: '24px',
                    }}
                >
                    Interactive examples demonstrating the Charts component's
                    accessibility features including keyboard navigation, legend
                    interactions, screen reader support, and proper ARIA
                    attributes across all chart types.
                </p>

                {/* WCAG Principle 1: Perceivable */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Perceivable Content & Chart Labeling
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        All charts are properly labeled with descriptive titles
                        and axis labels. Charts have role="img" and aria-label
                        attributes for screen reader support.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                        }}
                    >
                        <div style={{ width: '800px' }}>
                            <Charts
                                chartType={ChartType.LINE}
                                data={monthlyData}
                                height={400}
                                showHeader={true}
                                showCollapseIcon={true}
                                legendPosition={ChartLegendPosition.TOP}
                                xAxis={{
                                    label: 'Month',
                                    showLabel: true,
                                    show: true,
                                }}
                                yAxis={{
                                    label: 'Amount ($)',
                                    showLabel: true,
                                    show: true,
                                    type: AxisType.CURRENCY,
                                }}
                                chartHeaderSlot={
                                    <h3
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            margin: 0,
                                        }}
                                    >
                                        Monthly Financial Overview
                                    </h3>
                                }
                                slot1={
                                    <TrendingUp
                                        size={20}
                                        color="#10b981"
                                        aria-hidden="true"
                                    />
                                }
                                slot2={
                                    <span
                                        style={{
                                            color: '#10b981',
                                            fontSize: '14px',
                                        }}
                                    >
                                        +12.5%
                                    </span>
                                }
                            />
                        </div>
                        <div style={{ width: '600px' }}>
                            <Charts
                                chartType={ChartType.BAR}
                                data={monthlyData}
                                height={400}
                                showHeader={true}
                                showCollapseIcon={true}
                                legendPosition={ChartLegendPosition.TOP}
                                xAxis={{
                                    label: 'Month',
                                    showLabel: true,
                                    show: true,
                                }}
                                yAxis={{
                                    label: 'Sales Volume',
                                    showLabel: true,
                                    show: true,
                                    type: AxisType.NUMBER,
                                }}
                                chartHeaderSlot={
                                    <h3
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            margin: 0,
                                        }}
                                    >
                                        Sales Performance by Month
                                    </h3>
                                }
                                slot1={
                                    <BarChart3
                                        size={20}
                                        color="#3b82f6"
                                        aria-hidden="true"
                                    />
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Keyboard Navigation & Focus Management */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Keyboard Navigation & Legend Interactions
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        All interactive elements (legends, header buttons) are
                        keyboard accessible. Use Tab to navigate, Enter/Space to
                        toggle legend items, and Arrow keys for navigation.
                    </p>
                    <div style={{ width: '800px' }}>
                        <Charts
                            chartType={ChartType.LINE}
                            data={monthlyData}
                            height={400}
                            showHeader={true}
                            showCollapseIcon={true}
                            legendPosition={ChartLegendPosition.TOP}
                            stackedLegends={true}
                            stackedLegendsData={[
                                {
                                    value: 12000,
                                    delta: 12.5,
                                    changeType: LegendsChangeType.INCREASE,
                                },
                                {
                                    value: 8000,
                                    delta: 8.3,
                                    changeType: LegendsChangeType.INCREASE,
                                },
                                {
                                    value: 6000,
                                    delta: 5.2,
                                    changeType: LegendsChangeType.INCREASE,
                                },
                            ]}
                            xAxis={{
                                label: 'Month',
                                showLabel: true,
                                show: true,
                            }}
                            yAxis={{
                                label: 'Revenue ($)',
                                showLabel: true,
                                show: true,
                                type: AxisType.CURRENCY,
                            }}
                            chartHeaderSlot={
                                <h3
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        margin: 0,
                                    }}
                                >
                                    Revenue Trends with Interactive Legends
                                </h3>
                            }
                            slot1={
                                <DollarSign
                                    size={20}
                                    color="#10b981"
                                    aria-hidden="true"
                                />
                            }
                            slot2={
                                <span
                                    style={{
                                        color: '#10b981',
                                        fontSize: '14px',
                                    }}
                                >
                                    +12.5%
                                </span>
                            }
                        />
                    </div>
                </section>

                {/* Different Chart Types */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Chart Type Accessibility
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        All chart types (Line, Bar, Pie) are accessible with
                        proper labeling and keyboard navigation support.
                    </p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '24px',
                        }}
                    >
                        <div>
                            <Charts
                                chartType={ChartType.PIE}
                                data={categoryData}
                                height={350}
                                showHeader={true}
                                showCollapseIcon={true}
                                legendPosition={ChartLegendPosition.RIGHT}
                                xAxis={{
                                    show: false,
                                }}
                                yAxis={{
                                    show: false,
                                }}
                                chartHeaderSlot={
                                    <h3
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            margin: 0,
                                        }}
                                    >
                                        Sales by Category
                                    </h3>
                                }
                                slot1={
                                    <PieChart
                                        size={20}
                                        color="#8b5cf6"
                                        aria-hidden="true"
                                    />
                                }
                            />
                        </div>
                        <div>
                            <Charts
                                chartType={ChartType.BAR}
                                data={monthlyData}
                                height={350}
                                showHeader={true}
                                showCollapseIcon={true}
                                legendPosition={ChartLegendPosition.TOP}
                                barsize={40}
                                xAxis={{
                                    label: 'Month',
                                    showLabel: true,
                                    show: true,
                                }}
                                yAxis={{
                                    label: 'Value',
                                    showLabel: true,
                                    show: true,
                                    type: AxisType.NUMBER,
                                }}
                                chartHeaderSlot={
                                    <h3
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            margin: 0,
                                        }}
                                    >
                                        Monthly Comparison
                                    </h3>
                                }
                                slot1={
                                    <BarChart3
                                        size={20}
                                        color="#f59e0b"
                                        aria-hidden="true"
                                    />
                                }
                            />
                        </div>
                    </div>
                </section>

                {/* Header Actions Accessibility */}
                <section>
                    <h3
                        style={{
                            fontSize: '18px',
                            fontWeight: 600,
                            marginBottom: '16px',
                        }}
                    >
                        Header Actions & Collapse Functionality
                    </h3>
                    <p
                        style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            marginBottom: '16px',
                        }}
                    >
                        Header buttons and collapse icons are keyboard
                        accessible with proper focus indicators and ARIA labels.
                    </p>
                    <div style={{ width: '800px' }}>
                        <Charts
                            chartType={ChartType.LINE}
                            data={monthlyData}
                            height={400}
                            showHeader={true}
                            showCollapseIcon={true}
                            legendPosition={ChartLegendPosition.TOP}
                            xAxis={{
                                label: 'Month',
                                showLabel: true,
                                show: true,
                            }}
                            yAxis={{
                                label: 'Amount ($)',
                                showLabel: true,
                                show: true,
                                type: AxisType.CURRENCY,
                            }}
                            chartHeaderSlot={
                                <h3
                                    style={{
                                        fontSize: '18px',
                                        fontWeight: 'bold',
                                        margin: 0,
                                    }}
                                >
                                    Expandable Chart with Header Actions
                                </h3>
                            }
                            slot1={
                                <Activity
                                    size={20}
                                    color="#3b82f6"
                                    aria-hidden="true"
                                />
                            }
                            slot2={
                                <Calendar
                                    size={16}
                                    color="#6b7280"
                                    aria-hidden="true"
                                />
                            }
                            slot3={
                                <span
                                    style={{
                                        color: '#6b7280',
                                        fontSize: '12px',
                                    }}
                                >
                                    Last 6 months
                                </span>
                            }
                        />
                    </div>
                </section>

                <div
                    style={{
                        marginTop: '32px',
                        padding: '16px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '8px',
                        fontSize: '14px',
                        color: '#6b7280',
                    }}
                >
                    <p
                        style={{
                            margin: 0,
                            fontWeight: 600,
                            marginBottom: '8px',
                        }}
                    >
                        Accessibility notes:
                    </p>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        <li>
                            All chart containers have proper role="img" and
                            descriptive aria-label attributes
                        </li>
                        <li>
                            Legend items are keyboard accessible (Tab to focus,
                            Enter/Space to toggle)
                        </li>
                        <li>
                            Header buttons and collapse icons have visible focus
                            indicators
                        </li>
                        <li>
                            Chart tooltips are accessible and provide context
                            for data points
                        </li>
                        <li>
                            Axis labels are properly associated with chart data
                        </li>
                        <li>
                            Decorative icons (slot1, slot2, slot3) are marked
                            with aria-hidden="true"
                        </li>
                        <li>All text content is readable by screen readers</li>
                        <li>
                            Focus indicators are visible on all interactive
                            elements
                        </li>
                        <li>
                            Charts support both mouse and keyboard interactions
                        </li>
                    </ul>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Interactive examples demonstrating the Charts component's accessibility features including keyboard navigation, legend interactions, screen reader support, and proper ARIA attributes across all chart types.

### Accessibility Verification

1. **Storybook a11y addon**:
   - Open the Accessibility panel and verify there are no violations for these scenarios.
   - Pay special attention to chart labeling, legend accessibility, and focus indicators.

2. **Chromatic visual tests**:
   - Focus ring visibility on interactive elements
   - Legend states and interactions
   - Responsive behavior

3. **Manual testing**:
   - Navigate using keyboard only (Tab to focus on legends and interactive elements).
   - Use a screen reader (VoiceOver/NVDA) to confirm all charts, legends, and tooltips are announced.
   - Verify color contrast of text, axis labels, and legend items using contrast tools.
   - Test legend interactions with keyboard (Tab, Enter/Space).
   - Verify chart tooltips are accessible and provide meaningful data descriptions.
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('interactive'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
