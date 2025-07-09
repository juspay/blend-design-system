import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Charts,
  ChartType,
  ChartLegendPosition,
  NewNestedDataPoint,
} from "blend-v1";
import {
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";

// Disable animations in Storybook
if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    .recharts-line-curve,
    .recharts-bar-rectangle,
    .recharts-pie-sector {
      animation: none !important;
      transition: none !important;
    }
    .recharts-layer {
      animation: none !important;
    }
  `;
  document.head.appendChild(style);
}

const meta: Meta<typeof Charts> = {
  title: "Components/Charts",
  component: Charts,
  parameters: {
    layout: "centered",
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

## Usage

\`\`\`tsx
import { Charts, ChartType, ChartLegendPosition } from 'blend-v1';

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
  xAxisLabel="Month"
  yAxisLabel="Amount ($)"
  chartHeaderSlot={<h3>Monthly Revenue</h3>}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    chartType: {
      control: "select",
      options: Object.values(ChartType),
      description: "The type of chart to render",
    },
    data: {
      control: "object",
      description: "Array of nested data points for the chart",
    },
    xAxisLabel: {
      control: "text",
      description: "Label for the X-axis",
    },
    yAxisLabel: {
      control: "text",
      description: "Label for the Y-axis",
    },
    colors: {
      control: "object",
      description: "Array of colors for the chart series",
    },
    legendPosition: {
      control: "select",
      options: Object.values(ChartLegendPosition),
      description: "Position of the legend relative to the chart",
    },
    chartHeaderSlot: {
      control: false,
      description: "React node to render in the chart header",
    },
    slot1: {
      control: false,
      description: "First slot for header content",
    },
    slot2: {
      control: false,
      description: "Second slot for header content",
    },
    slot3: {
      control: false,
      description: "Third slot for header content",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Charts>;

// Sample data generators
const generateMonthlyData = (): NewNestedDataPoint[] => [
  {
    name: "Jan",
    data: {
      revenue: { primary: { label: "Revenue", val: 4000 } },
      profit: { primary: { label: "Profit", val: 2400 } },
      expenses: { primary: { label: "Expenses", val: 1600 } },
    },
  },
  {
    name: "Feb",
    data: {
      revenue: { primary: { label: "Revenue", val: 3000 } },
      profit: { primary: { label: "Profit", val: 1398 } },
      expenses: { primary: { label: "Expenses", val: 1602 } },
    },
  },
  {
    name: "Mar",
    data: {
      revenue: { primary: { label: "Revenue", val: 2000 } },
      profit: { primary: { label: "Profit", val: 800 } },
      expenses: { primary: { label: "Expenses", val: 1200 } },
    },
  },
  {
    name: "Apr",
    data: {
      revenue: { primary: { label: "Revenue", val: 2780 } },
      profit: { primary: { label: "Profit", val: 1908 } },
      expenses: { primary: { label: "Expenses", val: 872 } },
    },
  },
  {
    name: "May",
    data: {
      revenue: { primary: { label: "Revenue", val: 1890 } },
      profit: { primary: { label: "Profit", val: 800 } },
      expenses: { primary: { label: "Expenses", val: 1090 } },
    },
  },
  {
    name: "Jun",
    data: {
      revenue: { primary: { label: "Revenue", val: 2390 } },
      profit: { primary: { label: "Profit", val: 1200 } },
      expenses: { primary: { label: "Expenses", val: 1190 } },
    },
  },
];

const generateCategoryData = (): NewNestedDataPoint[] => [
  {
    name: "Electronics",
    data: {
      sales: { primary: { label: "Sales", val: 35 } },
    },
  },
  {
    name: "Clothing",
    data: {
      sales: { primary: { label: "Sales", val: 25 } },
    },
  },
  {
    name: "Food",
    data: {
      sales: { primary: { label: "Sales", val: 20 } },
    },
  },
  {
    name: "Books",
    data: {
      sales: { primary: { label: "Sales", val: 12 } },
    },
  },
  {
    name: "Other",
    data: {
      sales: { primary: { label: "Sales", val: 8 } },
    },
  },
];

// Default story
export const Default: Story = {
  args: {
    chartType: ChartType.LINE,
    data: generateMonthlyData(),
    xAxisLabel: "Month",
    yAxisLabel: "Amount ($)",
    chartHeaderSlot: (
      <div style={{ fontSize: "18px", fontWeight: "bold" }}>
        Monthly Financial Overview
      </div>
    ),
  },
};

// Line Chart
export const LineChartExample: Story = {
  render: () => (
    <div style={{ width: "800px", height: "500px" }}>
      <Charts
        chartType={ChartType.LINE}
        data={generateMonthlyData()}
        xAxisLabel="Month"
        yAxisLabel="Amount ($)"
        colors={["#3b82f6", "#10b981", "#ef4444"]}
        chartHeaderSlot={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LineChart size={20} />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Revenue Trends
            </span>
          </div>
        }
        slot1={
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <TrendingUp size={16} color="#10b981" />
            <span style={{ fontSize: "14px", color: "#10b981" }}>+12.5%</span>
          </div>
        }
        slot2={
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Calendar size={16} />
            <span style={{ fontSize: "14px" }}>Last 6 months</span>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Line chart showing trends over time with multiple data series.",
      },
    },
  },
};

// Bar Chart
export const BarChartExample: Story = {
  render: () => (
    <div style={{ width: "800px", height: "500px" }}>
      <Charts
        chartType={ChartType.BAR}
        data={generateMonthlyData()}
        xAxisLabel="Month"
        yAxisLabel="Amount ($)"
        colors={["#8b5cf6", "#f59e0b", "#06b6d4"]}
        chartHeaderSlot={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <BarChart3 size={20} />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Monthly Comparison
            </span>
          </div>
        }
        slot1={
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <DollarSign size={16} />
            <span style={{ fontSize: "14px" }}>Total: $15,060</span>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Bar chart for comparing values across categories.",
      },
    },
  },
};

// Pie Chart
export const PieChartExample: Story = {
  render: () => (
    <div style={{ width: "600px", height: "500px" }}>
      <Charts
        chartType={ChartType.PIE}
        data={generateCategoryData()}
        colors={["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]}
        chartHeaderSlot={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <PieChart size={20} />
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Sales by Category
            </span>
          </div>
        }
        slot1={
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <Users size={16} />
            <span style={{ fontSize: "14px" }}>5 Categories</span>
          </div>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pie chart showing proportional data distribution.",
      },
    },
  },
};

// Legend Positions
export const LegendPositions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <div style={{ width: "800px", height: "500px" }}>
        <Charts
          chartType={ChartType.LINE}
          data={generateMonthlyData()}
          xAxisLabel="Month"
          yAxisLabel="Amount ($)"
          legendPosition={ChartLegendPosition.TOP}
          chartHeaderSlot={
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              Legend Position: Top
            </span>
          }
        />
      </div>
      <div style={{ width: "800px", height: "500px" }}>
        <Charts
          chartType={ChartType.PIE}
          data={generateCategoryData()}
          legendPosition={ChartLegendPosition.RIGHT}
          chartHeaderSlot={
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
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
        story: "Different legend positioning options for various chart types.",
      },
    },
  },
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <div style={{ width: "800px", height: "500px" }}>
      <Charts
        chartType={ChartType.BAR}
        data={generateMonthlyData()}
        xAxisLabel="Month"
        yAxisLabel="Amount ($)"
        colors={["#dc2626", "#059669", "#7c3aed"]}
        chartHeaderSlot={
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>
            Custom Color Scheme
          </span>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Charts with custom color schemes for branding consistency.",
      },
    },
  },
};

// Complex Data Example
export const ComplexDataExample: Story = {
  render: () => {
    const complexData: NewNestedDataPoint[] = [
      {
        name: "Q1",
        data: {
          desktop: { primary: { label: "Desktop", val: 186 } },
          mobile: { primary: { label: "Mobile", val: 305 } },
          tablet: { primary: { label: "Tablet", val: 237 } },
          other: { primary: { label: "Other", val: 73 } },
        },
      },
      {
        name: "Q2",
        data: {
          desktop: { primary: { label: "Desktop", val: 305 } },
          mobile: { primary: { label: "Mobile", val: 400 } },
          tablet: { primary: { label: "Tablet", val: 287 } },
          other: { primary: { label: "Other", val: 90 } },
        },
      },
      {
        name: "Q3",
        data: {
          desktop: { primary: { label: "Desktop", val: 237 } },
          mobile: { primary: { label: "Mobile", val: 375 } },
          tablet: { primary: { label: "Tablet", val: 250 } },
          other: { primary: { label: "Other", val: 85 } },
        },
      },
      {
        name: "Q4",
        data: {
          desktop: { primary: { label: "Desktop", val: 273 } },
          mobile: { primary: { label: "Mobile", val: 420 } },
          tablet: { primary: { label: "Tablet", val: 290 } },
          other: { primary: { label: "Other", val: 95 } },
        },
      },
    ];

    return (
      <div style={{ width: "900px", height: "550px" }}>
        <Charts
          chartType={ChartType.LINE}
          data={complexData}
          xAxisLabel="Quarter"
          yAxisLabel="Users (thousands)"
          colors={["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6"]}
          chartHeaderSlot={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Activity size={20} />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                User Activity by Device Type
              </span>
            </div>
          }
          slot1={
            <div
              style={{
                padding: "4px 8px",
                background: "#e0f2fe",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#0369a1",
              }}
            >
              Live Data
            </div>
          }
          slot2={
            <div style={{ fontSize: "14px", color: "#666" }}>
              Updated 5 mins ago
            </div>
          }
          slot3={
            <button
              style={{
                padding: "6px 12px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                background: "white",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Export
            </button>
          }
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complex chart with multiple data series and rich header content.",
      },
    },
  },
};

// Interactive Features
export const InteractiveFeatures: Story = {
  render: () => (
    <div style={{ width: "800px", height: "500px" }}>
      <Charts
        chartType={ChartType.LINE}
        data={generateMonthlyData()}
        xAxisLabel="Month"
        yAxisLabel="Amount ($)"
        chartHeaderSlot={
          <div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              Interactive Chart Features
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
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
        story:
          "Demonstration of interactive features including legend interactions and tooltips.",
      },
    },
  },
};

// Empty State
export const EmptyState: Story = {
  render: () => (
    <div style={{ width: "800px", height: "500px" }}>
      <Charts
        chartType={ChartType.LINE}
        data={[]}
        xAxisLabel="Time"
        yAxisLabel="Value"
        chartHeaderSlot={
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "8px",
              }}
            >
              No Data Available
            </div>
            <div style={{ fontSize: "14px", color: "#666" }}>
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
        story: "Chart component with no data showing empty state.",
      },
    },
  },
};

// Responsive Example
export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ width: "100%", maxWidth: "1200px", height: "600px" }}>
      <Charts
        chartType={ChartType.BAR}
        data={generateMonthlyData()}
        xAxisLabel="Month"
        yAxisLabel="Amount ($)"
        chartHeaderSlot={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              Responsive Chart Container
            </span>
            <div style={{ fontSize: "14px", color: "#666" }}>
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
        story: "Chart that adapts to container size with responsive design.",
      },
    },
  },
};
