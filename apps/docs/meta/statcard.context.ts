import type { ComponentMeta } from "@/components/ui/BlendTypeTable";

const statcardMeta: ComponentMeta = {
  componentName: "StatCard",
  componentDescription:
    "A versatile statistics card component that displays key metrics with various visualization options including charts, progress bars, and change indicators.",
  features: [
    "Multiple display variants (number, line chart, bar chart, progress bar)",
    "Change indicators with increase/decrease visualization",
    "Chart data visualization support",
    "Progress tracking with percentage display",
    "Icon support for titles and actions",
    "Help tooltips for additional context",
    "Responsive design",
  ],
  usageExamples: [
    {
      title: "Basic Number Card",
      description: "Simple stat card displaying a number value",
      code: `<StatCard
  title="Total Revenue"
  value="$125,000"
  variant={StatCardVariant.NUMBER}
/>`,
    },
    {
      title: "Card with Change Indicator",
      description: "Stat card showing positive change",
      code: `<StatCard
  title="Monthly Sales"
  value="$45,000"
  change={{ value: 12, type: ChangeType.INCREASE }}
  variant={StatCardVariant.NUMBER}
/>`,
    },
    {
      title: "Line Chart Card",
      description: "Stat card with embedded line chart",
      code: `<StatCard
  title="Website Traffic"
  value="12,543"
  variant={StatCardVariant.LINE}
  chartData={[
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1350 },
    { label: "Mar", value: 1543 }
  ]}
/>`,
    },
    {
      title: "Progress Bar Card",
      description: "Stat card with progress visualization",
      code: `<StatCard
  title="Goal Progress"
  value="75%"
  variant={StatCardVariant.PROGRESS_BAR}
  progressValue={75}
/>`,
    },
  ],
  props: [
    {
      propName: "title",
      propType: "string",
      typeDefinition: "string",
      propDescription: "The title of the stat card",
      llmContext: "The title of the stat card",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "value",
      propType: "string | number",
      typeDefinition: "string | number",
      propDescription: "The main value to display in the stat card",
      llmContext: "The main value to display in the stat card",
      propDefault: "-",
      category: "Content",
      required: true,
    },
    {
      propName: "change",
      propType: "StatCardChange",
      typeDefinition: `type StatCardChange = {
        value: number;
        type: ChangeType;
      }`,
      propDescription:
        "Change indicator showing increase or decrease with value",
      llmContext: "Change indicator showing increase or decrease with value",
      propDefault: "-",
      category: "Data",
      required: false,
    },
    {
      propName: "subtitle",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Optional subtitle text for the stat card",
      llmContext: "Optional subtitle text for the stat card",
      propDefault: "-",
      category: "Content",
      required: false,
    },
    {
      propName: "variant",
      propType: "StatCardVariant",
      typeDefinition: `enum StatCardVariant {
        LINE = "line",
        PROGRESS_BAR = "progress",
        BAR = "bar",
        NUMBER = "number",
      }`,
      propDescription: "The visual variant of the stat card",
      llmContext: "The visual variant of the stat card",
      propDefault: "StatCardVariant.NUMBER",
      category: "Appearance",
      required: true,
    },
    {
      propName: "chartData",
      propType: "ChartDataPoint[]",
      typeDefinition: `type ChartDataPoint = {
        value: number;
        label: string;
        date?: string;
      }`,
      propDescription: "Array of data points for chart visualization",
      llmContext: "Array of data points for chart visualization",
      propDefault: "-",
      category: "Data",
      required: false,
    },
    {
      propName: "progressValue",
      propType: "number",
      typeDefinition: "number",
      propDescription: "Progress value for progress bar variant (0-100)",
      llmContext: "Progress value for progress bar variant (0-100)",
      propDefault: "-",
      category: "Data",
      required: false,
    },
    {
      propName: "titleIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon to display next to the title",
      llmContext: "Icon to display next to the title",
      propDefault: "-",
      category: "Content",
      required: false,
    },
    {
      propName: "actionIcon",
      propType: "React.ReactNode",
      typeDefinition: "React.ReactNode",
      propDescription: "Icon for action button in the stat card",
      llmContext: "Icon for action button in the stat card",
      propDefault: "-",
      category: "Content",
      required: false,
    },
    {
      propName: "helpIconText",
      propType: "string",
      typeDefinition: "string",
      propDescription: "Text to display in help tooltip",
      llmContext: "Text to display in help tooltip",
      propDefault: "-",
      category: "Content",
      required: false,
    },
  ],
};

export default statcardMeta;
