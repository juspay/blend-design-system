import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const chartsMeta: ComponentMeta = {
  componentName: "Charts",
  componentDescription:
    "A comprehensive charting component that supports line, bar, and pie charts with customizable styling and interactive features.",
  features: [
    "Multiple chart types (line, bar, pie)",
    "Interactive legends with hover effects",
    "Customizable colors and styling",
    "Flexible slot system for custom content",
    "Responsive design",
    "Custom tooltips",
    "Axis labeling support",
  ],
  usageExamples: [
    {
      title: "Basic Line Chart",
      description: "Simple line chart with data points",
      code: `<Charts
  chartType={ChartType.LINE}
  data={chartData}
  xAxisLabel="Month"
  yAxisLabel="Revenue"
  chartHeaderSlot="Monthly Revenue"
/>`,
    },
    {
      title: "Bar Chart with Custom Colors",
      description: "Bar chart with custom color scheme",
      code: `<Charts
  chartType={ChartType.BAR}
  data={chartData}
  colors={["#FF6B6B", "#4ECDC4", "#45B7D1"]}
  chartHeaderSlot="Sales by Category"
/>`,
    },
    {
      title: "Pie Chart with Legend",
      description: "Pie chart with right-positioned legend",
      code: `<Charts
  chartType={ChartType.PIE}
  data={pieData}
  legendPosition={ChartLegendPosition.RIGHT}
  chartHeaderSlot="Market Share"
/>`,
    },
  ],
  props: [
    {
      propName: "chartType",
      propType: "ChartType",
      typeDefinition: `enum ChartType {
        LINE = "line",
        BAR = "bar",
        PIE = "pie",
      }`,
      propDescription: "The type of chart to render",
      llmContext: "The type of chart to render",
      propDefault: "ChartType.LINE",
      category: "Configuration",
      required: false,
    },
    {
      propName: "data",
      propType: "NewNestedDataPoint[]",
      typeDefinition: `type NewNestedDataPoint = {
        name: string;
        data: {
          [key: string]: DataPoint;
        };
      }
      
      type DataPoint = {
        primary: {
          label: string;
          val: number;
        };
        aux?: {
          label: string;
          val: number;
        }[];
      };`,
      propDescription: "Array of data points for chart visualization",
      llmContext: "Array of data points for chart visualization",
      propDefault: "-",
      category: "Data",
      required: true,
    },
    {
      propName: "xAxisLabel",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Label for the X-axis",
      llmContext: "Label for the X-axis",
      propDefault: "-",
      category: "Labels",
      required: false,
    },
    {
      propName: "yAxisLabel",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Label for the Y-axis",
      llmContext: "Label for the Y-axis",
      propDefault: "-",
      category: "Labels",
      required: false,
    },
    {
      propName: "colors",
      propType: "string[]",
      typeDefinition: "string[]",
      propDescription: "Array of colors for chart elements",
      llmContext: "Array of colors for chart elements",
      propDefault: "DEFAULT_COLORS",
      category: "Styling",
      required: false,
    },
    {
      propName: "metrics",
      propType: "string[]",
      typeDefinition: "string[]",
      propDescription: "Array of metric names to display",
      llmContext: "Array of metric names to display",
      propDefault: "-",
      category: "Configuration",
      required: false,
    },
    {
      propName: "slot1",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "First slot for custom content in chart header",
      llmContext: "First slot for custom content in chart header",
      propDefault: "-",
      category: "Content",
      required: false,
    },
    {
      propName: "slot2",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Second slot for custom content in chart header",
      llmContext: "Second slot for custom content in chart header",
      propDefault: "-",
      category: "Content",
      required: false,
    },
    {
      propName: "slot3",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Third slot for custom content in chart header",
      llmContext: "Third slot for custom content in chart header",
      propDefault: "-",
      category: "Content",
      required: false,
    },
    {
      propName: "legendPosition",
      propType: "ChartLegendPosition",
      typeDefinition: `enum ChartLegendPosition {
        TOP = "top",
        RIGHT = "right",
      }`,
      propDescription: "Position of the chart legend",
      llmContext: "Position of the chart legend",
      propDefault: "ChartLegendPosition.TOP",
      category: "Layout",
      required: false,
    },
    {
      propName: "chartHeaderSlot",
      propType: "ReactNode",
      typeDefinition: "ReactNode",
      propDescription: "Custom content for the chart header",
      llmContext: "Custom content for the chart header",
      propDefault: "-",
      category: "Content",
      required: true,
    },
  ],
};

export default chartsMeta;
