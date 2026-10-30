import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Charts,
    ChartType,
    ChartLegendPosition,
    NewNestedDataPoint,
    AxisType,
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
} from '../../../../.storybook/a11y.config'

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
        docsSubtitle:
            'A powerful and flexible charting component built on Recharts that supports multiple chart types with interactive legends and customizable styling.',
        docs: {
            description: {
                component: `
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

## Features
- Multiple chart types (Line, Bar, Pie, Funnel)
- Interactive legends with hover and click functionality
- Customizable colors and styling
- Flexible data structure supporting nested data points
- Custom tooltips with detailed information and formatter callbacks
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
            table: {
                type: {
                    summary: 'NewNestedDataPoint[]',
                    detail: `{
  name: string;           // Data point name/label
  data: {
    [key: string]: {      // Series name as key
      primary: {
        label: string;
        val: number;
      };
      aux?: Array<{
        label: string;
        val: number;
        type?: AxisType;
      }>;
    };
  };
}`,
                },
                category: 'Data',
            },
        },
        colors: {
            control: 'object',
            description: 'Array of colors for the chart series',
            table: {
                type: { summary: 'string[]' },
                category: 'Appearance',
            },
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
            table: {
                type: {
                    summary: 'StackedLegendsDataPoint[]',
                    detail: `{
  value: number;                    // The value to display
  delta: number;                    // The change delta value
  changeType: LegendsChangeType;    // 'increase' | 'decrease'
}`,
                },
                category: 'Data',
            },
        },
        barsize: {
            control: 'number',
            description: 'Size of bars in bar charts',
        },
        xAxis: {
            control: 'object',
            description:
                'X-axis configuration with label, type, formatting options',
            table: {
                type: {
                    summary: 'XAxisConfig',
                    detail: `{
  label?: string;                   // Axis label text
  showLabel?: boolean;              // Whether to show the label
  show?: boolean;                   // Whether to show the axis
  type?: AxisType;                  // 'dateTime' | 'currency' | 'percentage' | 'number'
  interval?: number | AxisIntervalType; // Tick interval
  tickFormatter?: (value) => string; // Custom tick formatter
  dateOnly?: boolean;               // Show date only (no time)
  useUTC?: boolean;                 // Use UTC for dates
  formatString?: string;            // Custom format string
  timeOnly?: boolean;               // Show time only
  showYear?: boolean;               // Show year in labels
  ticks?: (number | string)[];      // Custom tick values
  autoConsistentTicks?: boolean;    // Auto-generate consistent ticks
  maxTicks?: number;                // Max ticks/labels (category axes: default 12, halved on small screens)
  smartDateTimeFormat?: boolean;    // Smart date/time formatting
}`,
                },
                category: 'Axis',
            },
        },
        yAxis: {
            control: 'object',
            description:
                'Y-axis configuration with label, type, formatting options',
            table: {
                type: {
                    summary: 'YAxisConfig',
                    detail: `{
  label?: string;                   // Axis label text
  showLabel?: boolean;              // Whether to show the label
  show?: boolean;                   // Whether to show the axis
  type?: AxisType;                  // 'dateTime' | 'currency' | 'percentage' | 'number'
  interval?: number | AxisIntervalType; // Tick interval
  tickFormatter?: (value) => string; // Custom tick formatter
  dateOnly?: boolean;               // Show date only (no time)
  useUTC?: boolean;                 // Use UTC for dates
  formatString?: string;            // Custom format string
  timeOnly?: boolean;               // Show time only
  showYear?: boolean;               // Show year in labels
  ticks?: (number | string)[];      // Custom tick values
  autoConsistentTicks?: boolean;    // Auto-generate consistent ticks
  maxTicks?: number;                // Max ticks/labels (category axes: default 12, halved on small screens)
  smartDateTimeFormat?: boolean;    // Smart date/time formatting
}`,
                },
                category: 'Axis',
            },
        },
        noData: {
            control: 'object',
            description:
                'Configuration for no-data state with title, subtitle, slot, and button',
            table: {
                type: {
                    summary: 'NoDataProps',
                    detail: `{
  title?: string;                   // Title text for no-data state
  subtitle?: string;                // Subtitle/description text
  slot?: ReactNode;                 // Custom content slot
  button?: ButtonProps;             // Button configuration for action
}`,
                },
                category: 'State',
            },
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

const generateDenseCategoryData = (count = 30): NewNestedDataPoint[] =>
    Array.from({ length: count }, (_, i) => ({
        name: `Item ${i + 1}`,
        data: {
            revenue: { primary: { label: 'Revenue', val: 400 + i * 37 } },
        },
    }))

const generateFunnelData = (): NewNestedDataPoint[] => [
    {
        name: 'Visited landing page',
        data: {
            visitors: { primary: { label: 'Visitors', val: 10000 } },
        },
    },
    {
        name: 'Started checkout',
        data: {
            visitors: { primary: { label: 'Visitors', val: 6200 } },
        },
    },
    {
        name: 'Entered payment details',
        data: {
            visitors: { primary: { label: 'Visitors', val: 4100 } },
        },
    },
    {
        name: 'Completed purchase',
        data: {
            visitors: { primary: { label: 'Visitors', val: 2750 } },
        },
    },
]

// Default story
export const Default: Story = {
    render: () => (
        <div className="w-200 h-135">
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
                height={400}
                showHeader={true}
                showCollapseIcon={true}
                legendPosition={ChartLegendPosition.TOP}
                chartHeaderSlot={
                    <div className="text-lg font-bold">
                        Monthly Financial Overview
                    </div>
                }
            />
        </div>
    ),
}

// Line Chart
export const LineChartExample: Story = {
    render: () => (
        <div className="w-200 h-135">
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
                colors={[
                    { key: 'revenue', color: '#3b82f6' },
                    { key: 'profit', color: '#10b981' },
                    { key: 'expenses', color: '#ef4444' },
                ]}
                chartHeaderSlot={
                    <div className="flex items-center gap-2">
                        <LineChart size={20} />
                        <span className="text-lg font-bold">
                            Revenue Trends
                        </span>
                    </div>
                }
                slot1={
                    <div className="flex items-center gap-1">
                        <TrendingUp size={16} color="#10b981" />
                        <span className="text-sm text-emerald-500">+12.5%</span>
                    </div>
                }
                slot2={
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span className="text-sm">Last 6 months</span>
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
        <div className="w-200 h-135">
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
                colors={[
                    { key: 'revenue', color: '#8b5cf6' },
                    { key: 'profit', color: '#f59e0b' },
                    { key: 'expenses', color: '#06b6d4' },
                ]}
                chartHeaderSlot={
                    <div className="flex items-center gap-2">
                        <BarChart3 size={20} />
                        <span className="text-lg font-bold">
                            Monthly Comparison
                        </span>
                    </div>
                }
                slot1={
                    <div className="flex items-center gap-1">
                        <DollarSign size={16} />
                        <span className="text-sm">Total: $15,060</span>
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

// Dense Bar Chart — x-axis labels are automatically thinned to 12
export const DenseBarChartExample: Story = {
    render: () => (
        <div className="w-200 h-135">
            <Charts
                chartType={ChartType.BAR}
                data={generateDenseCategoryData(30)}
                xAxis={{
                    label: 'Category',
                    showLabel: true,
                    show: true,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                colors={[{ key: 'revenue', color: '#8b5cf6' }]}
                chartHeaderSlot={
                    <div className="flex items-center gap-2">
                        <BarChart3 size={20} />
                        <span className="text-lg font-bold">
                            30 Categories (auto-thinned)
                        </span>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Dense bar chart (30 categories) — x-axis labels are automatically thinned to at most 12 via `maxTicks`.',
            },
        },
    },
}

// Dense Bar Chart with a custom label budget
export const DenseBarChartMaxTicksExample: Story = {
    render: () => (
        <div className="w-200 h-135">
            <Charts
                chartType={ChartType.BAR}
                data={generateDenseCategoryData(30)}
                xAxis={{
                    label: 'Category',
                    showLabel: true,
                    show: true,
                    maxTicks: 5,
                }}
                yAxis={{
                    label: 'Amount ($)',
                    showLabel: true,
                    show: true,
                    type: AxisType.CURRENCY,
                }}
                colors={[{ key: 'revenue', color: '#06b6d4' }]}
                chartHeaderSlot={
                    <div className="flex items-center gap-2">
                        <BarChart3 size={20} />
                        <span className="text-lg font-bold">
                            30 Categories (maxTicks: 5)
                        </span>
                    </div>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Dense bar chart with `xAxis.maxTicks: 5` — only 5 x-axis labels are rendered.',
            },
        },
    },
}

// Pie Chart
export const PieChartExample: Story = {
    render: () => (
        <div className="w-150 h-125">
            <Charts
                chartType={ChartType.PIE}
                data={generateCategoryData()}
                colors={[
                    { key: 'Electronics', color: '#3b82f6' },
                    { key: 'Clothing', color: '#10b981' },
                    { key: 'Food', color: '#f59e0b' },
                    { key: 'Books', color: '#ef4444' },
                    { key: 'Other', color: '#8b5cf6' },
                ]}
                chartHeaderSlot={
                    <div className="flex items-center gap-2">
                        <PieChart size={20} />
                        <span className="text-lg font-bold">
                            Sales by Category
                        </span>
                    </div>
                }
                slot1={
                    <div className="flex items-center gap-1">
                        <Users size={16} />
                        <span className="text-sm">5 Categories</span>
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

// Funnel charts
export const FunnelChartPreviousBase: Story = {
    render: () => (
        <div className="w-200 h-135">
            <Charts
                chartType={ChartType.FUNNEL}
                data={generateFunnelData()}
                funnelConfig={{ percentageBase: 'previous' }}
                colors={[
                    { key: 'Visited landing page', color: '#00C951' },
                    { key: 'Started checkout', color: '#2B7FFF' },
                    { key: 'Entered payment details', color: '#FF8904' },
                    { key: 'Completed purchase', color: '#AD46FF' },
                ]}
                chartHeaderSlot={
                    <span className="text-lg font-bold">
                        Conversion Funnel · Previous Stage
                    </span>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Conversion funnel with each stage showing drop-off relative to the immediately previous stage.',
            },
        },
    },
}

export const FunnelChartFirstBase: Story = {
    render: () => (
        <div className="w-200 h-135">
            <Charts
                chartType={ChartType.FUNNEL}
                data={generateFunnelData()}
                funnelConfig={{ percentageBase: 'first' }}
                colors={[
                    { key: 'Visited landing page', color: '#00C951' },
                    { key: 'Started checkout', color: '#2B7FFF' },
                    { key: 'Entered payment details', color: '#FF8904' },
                    { key: 'Completed purchase', color: '#AD46FF' },
                ]}
                chartHeaderSlot={
                    <span className="text-lg font-bold">
                        Conversion Funnel · First Stage
                    </span>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Conversion funnel with each stage showing total drop-off relative to the first stage.',
            },
        },
    },
}

export const CustomTooltipFormatter: Story = {
    render: () => (
        <div className="w-200 h-135">
            <Charts
                chartType={ChartType.LINE}
                data={generateMonthlyData()}
                tooltip={{
                    labelFormatter: (axisValue) => `Period: ${axisValue}`,
                    formatter: ({ seriesName, value, dataIndex }) => (
                        <span
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <span>
                                {String(seriesName)} · point {dataIndex + 1}
                            </span>
                            <span>Value: {String(value)}</span>
                        </span>
                    ),
                }}
                xAxis={{ label: 'Month', show: true }}
                yAxis={{ label: 'Amount', show: true }}
                chartHeaderSlot={
                    <span className="text-lg font-bold">
                        Custom Multi-line Tooltip
                    </span>
                }
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Customizes the existing tooltip chrome with a ReactNode formatter and a formatted header.',
            },
        },
    },
}

// Legend Positions
export const LegendPositions: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div className="w-200 h-130">
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
                        <span className="text-base font-bold">
                            Legend Position: Top
                        </span>
                    }
                />
            </div>
            <div className="w-200 h-125">
                <Charts
                    chartType={ChartType.PIE}
                    data={generateCategoryData()}
                    legendPosition={ChartLegendPosition.RIGHT}
                    chartHeaderSlot={
                        <span className="text-base font-bold">
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
        <div className="w-200 h-135">
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
                colors={[
                    { key: 'revenue', color: '#dc2626' },
                    { key: 'profit', color: '#059669' },
                    { key: 'expenses', color: '#7c3aed' },
                ]}
                chartHeaderSlot={
                    <span className="text-lg font-bold">
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
            <div className="w-200 h-135">
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
                    colors={[
                        { key: 'desktop', color: '#3b82f6' },
                        { key: 'mobile', color: '#10b981' },
                        { key: 'tablet', color: '#f59e0b' },
                        { key: 'other', color: '#8b5cf6' },
                    ]}
                    chartHeaderSlot={
                        <div className="flex items-center gap-2">
                            <Activity size={20} />
                            <span className="text-lg font-bold">
                                User Activity by Device Type
                            </span>
                        </div>
                    }
                    slot1={
                        <div className="px-2 py-1 bg-sky-100 rounded text-xs text-sky-700">
                            Live Data
                        </div>
                    }
                    slot2={
                        <div className="text-sm text-gray-500">
                            Updated 5 mins ago
                        </div>
                    }
                    slot3={
                        <button className="px-3 py-1.5 rounded border border-gray-300 bg-white cursor-pointer text-sm">
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
        <div className="w-200 h-155">
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
                        <div className="text-lg font-medium mb-2">
                            Interactive Chart Features
                        </div>
                        <div className="text-sm text-gray-500 font-manrope tracking-wide leading-7">
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
        <div className="w-200 h-125">
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
                    <div className="text-center p-5">
                        <div className="text-lg font-bold mb-2">
                            No Data Available
                        </div>
                        <div className="text-sm text-gray-500">
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
        <div className="w-full max-w-300 h-150">
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
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <span className="text-lg font-bold">
                            Responsive Chart Container
                        </span>
                        <div className="text-sm text-gray-500">
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
            <div className="w-200 h-150">
                <Charts
                    chartType={ChartType.SANKEY}
                    data={sankeyData}
                    height={500}
                    chartHeaderSlot={
                        <div className="flex items-center gap-2">
                            <Activity size={20} />
                            <span className="text-lg font-bold">
                                Payment Card Flow
                            </span>
                        </div>
                    }
                    slot1={
                        <div className="px-2 py-1 bg-blue-100 rounded text-xs text-blue-800">
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

// ============================================================================
// Skeleton Loading State
// ============================================================================

export const SkeletonState: Story = {
    render: () => (
        <div className="flex flex-wrap gap-6 p-6 w-full">
            <div className="min-w-xs">
                <h4 className="text-base font-semibold mb-3">Pulse Variant</h4>
                <Charts
                    chartType={ChartType.LINE}
                    data={generateMonthlyData()}
                    height={300}
                    chartHeaderSlot="Loading Chart Data..."
                    skeleton={{ show: true, variant: 'pulse' }}
                    showHeader={true}
                />
            </div>

            <div className="min-w-xs">
                <h4 className="text-base font-semibold mb-3">Wave Variant</h4>
                <Charts
                    chartType={ChartType.BAR}
                    data={generateMonthlyData()}
                    height={300}
                    chartHeaderSlot="Loading Chart Data..."
                    skeleton={{ show: true, variant: 'wave' }}
                    showHeader={true}
                />
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates skeleton loading states for different chart types. Shows pulse and wave variants for Line, Bar, and Pie charts, with and without headers.',
            },
        },
        a11y: getA11yConfig('content'),
    },
}
