import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  StatCard,
  StatCardVariant,
  ChangeType,
  ChartDataPoint,
} from "blend-v1";
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Activity,
  Package,
  BarChart3,
  Target,
  Zap,
  Eye,
  AlertCircle,
  Settings,
  Filter,
  MoreVertical,
  Download,
  RefreshCw,
  Cpu,
  HardDrive,
  ShoppingBag,
} from "lucide-react";

const meta: Meta<typeof StatCard> = {
  title: "Components/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

A versatile statistics card component for displaying key metrics, KPIs, and data visualizations. Supports multiple variants including numbers, line charts, bar charts, and progress bars.

## Features
- Multiple display variants (Number, Line Chart, Bar Chart, Progress Bar)
- Change indicators with increase/decrease arrows
- Support for icons (title and action icons)
- Help tooltips for additional context
- Animated charts with hover tooltips
- Responsive design
- Automatic trend detection for line charts
- Customizable colors based on trends
- Progress bar with percentage display

## Usage

\`\`\`tsx
import { StatCard, StatCardVariant, ChangeType } from 'blend-v1';

<StatCard
  title="Total Revenue"
  value="$45,231"
  subtitle="Last 30 days"
  variant={StatCardVariant.LINE}
  change={{ value: 12.5, type: ChangeType.INCREASE }}
  chartData={revenueData}
  titleIcon={<DollarSign size={20} />}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title of the stat card",
    },
    value: {
      control: "text",
      description: "The main value to display",
    },
    subtitle: {
      control: "text",
      description: "Additional context or time period",
    },
    variant: {
      control: "select",
      options: Object.values(StatCardVariant),
      description: "The display variant of the stat card",
    },
    change: {
      control: "object",
      description: "Change indicator with value and type",
    },
    progressValue: {
      control: { type: "number", min: 0, max: 100 },
      description: "Progress percentage for progress bar variant",
    },
    helpIconText: {
      control: "text",
      description: "Tooltip text for the help icon",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

// Helper function to generate sample chart data
const generateChartData = (days: number, baseValue: number, variance: number): ChartDataPoint[] => {
  const data: ChartDataPoint[] = [];
  const today = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const value = baseValue + (Math.random() - 0.5) * variance;
    
    data.push({
      value: Math.round(value),
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      date: date.toISOString(),
    });
  }
  
  return data;
};

// Default story
export const Default: Story = {
  args: {
    title: "Total Revenue",
    value: "$45,231",
    subtitle: "Last 30 days",
    variant: StatCardVariant.NUMBER,
    change: {
      value: 12.5,
      type: ChangeType.INCREASE,
    },
    titleIcon: <DollarSign size={20} color="#10b981" />,
  },
};

// Number variant
export const NumberVariant: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 300px)", gap: "16px" }}>
      <StatCard
        title="Total Users"
        value="8,549"
        subtitle="Active users"
        variant={StatCardVariant.NUMBER}
        change={{ value: 23.1, type: ChangeType.INCREASE }}
        titleIcon={<Users size={24} color="#3b82f6" />}
        helpIconText="Total number of active users in the last 30 days"
      />
      <StatCard
        title="Revenue"
        value="$124.5K"
        subtitle="This month"
        variant={StatCardVariant.NUMBER}
        change={{ value: 8.2, type: ChangeType.DECREASE }}
        titleIcon={<DollarSign size={24} color="#10b981" />}
      />
      <StatCard
        title="Orders"
        value="1,429"
        subtitle="Completed"
        variant={StatCardVariant.NUMBER}
        change={{ value: 15.3, type: ChangeType.INCREASE }}
        titleIcon={<ShoppingCart size={24} color="#8b5cf6" />}
        actionIcon={<MoreVertical size={16} color="#6b7280" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Number variant displays a single metric with optional change indicator and icons.",
      },
    },
  },
};

// Line chart variant
export const LineChartVariant: Story = {
  render: () => {
    const revenueData = generateChartData(30, 5000, 1000);
    const visitorData = generateChartData(30, 1000, 200);
    const conversionData = generateChartData(30, 50, 20);

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 300px)", gap: "16px" }}>
        <StatCard
          title="Revenue"
          value="$45,231"
          subtitle="Last 30 days"
          variant={StatCardVariant.LINE}
          change={{ value: 12.5, type: ChangeType.INCREASE }}
          chartData={revenueData}
          titleIcon={<DollarSign size={16} color="#10b981" />}
          helpIconText="Total revenue from all sources"
        />
        <StatCard
          title="Visitors"
          value="28.4K"
          subtitle="Last 30 days"
          variant={StatCardVariant.LINE}
          change={{ value: 5.2, type: ChangeType.DECREASE }}
          chartData={visitorData}
          titleIcon={<Eye size={16} color="#3b82f6" />}
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          subtitle="Last 30 days"
          variant={StatCardVariant.LINE}
          change={{ value: 18.7, type: ChangeType.INCREASE }}
          chartData={conversionData}
          titleIcon={<Target size={16} color="#f59e0b" />}
          actionIcon={<Filter size={16} color="#6b7280" />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Line chart variant shows trends over time with interactive tooltips.",
      },
    },
  },
};

// Bar chart variant
export const BarChartVariant: Story = {
  render: () => {
    const salesData = generateChartData(12, 3000, 500);
    const ordersData = generateChartData(12, 150, 30);
    const productsData = generateChartData(12, 80, 15);

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 300px)", gap: "16px" }}>
        <StatCard
          title="Monthly Sales"
          value="$32,450"
          subtitle="This month"
          variant={StatCardVariant.BAR}
          change={{ value: 8.3, type: ChangeType.INCREASE }}
          chartData={salesData}
          titleIcon={<BarChart3 size={16} color="#10b981" />}
        />
        <StatCard
          title="Orders"
          value="156"
          subtitle="This month"
          variant={StatCardVariant.BAR}
          change={{ value: 12.1, type: ChangeType.DECREASE }}
          chartData={ordersData}
          titleIcon={<Package size={16} color="#8b5cf6" />}
          helpIconText="Number of completed orders"
        />
        <StatCard
          title="Products Sold"
          value="892"
          subtitle="This month"
          variant={StatCardVariant.BAR}
          change={{ value: 24.5, type: ChangeType.INCREASE }}
          chartData={productsData}
          titleIcon={<ShoppingBag size={16} color="#f59e0b" />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Bar chart variant displays data as vertical bars, ideal for comparing discrete values.",
      },
    },
  },
};

// Progress bar variant
export const ProgressBarVariant: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 300px)", gap: "16px" }}>
      <StatCard
        title="Storage Used"
        value="45.2 GB"
        subtitle="of 100 GB"
        variant={StatCardVariant.PROGRESS_BAR}
        progressValue={45}
        titleIcon={<HardDrive size={16} color="#3b82f6" />}
        helpIconText="Total storage usage across all files"
      />
      <StatCard
        title="Project Progress"
        value="78%"
        subtitle="12 of 15 tasks completed"
        variant={StatCardVariant.PROGRESS_BAR}
        progressValue={78}
        titleIcon={<Target size={16} color="#10b981" />}
        actionIcon={<Settings size={16} color="#6b7280" />}
      />
      <StatCard
        title="CPU Usage"
        value="32%"
        subtitle="4 cores active"
        variant={StatCardVariant.PROGRESS_BAR}
        progressValue={32}
        titleIcon={<Cpu size={16} color="#f59e0b" />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bar variant shows completion percentage with a visual progress indicator.",
      },
    },
  },
};

// With action icons
export const WithActionIcons: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 300px)", gap: "16px" }}>
      <StatCard
        title="Active Sessions"
        value="1,234"
        subtitle="Current users online"
        variant={StatCardVariant.NUMBER}
        change={{ value: 5.2, type: ChangeType.INCREASE }}
        titleIcon={<Activity size={24} color="#10b981" />}
        actionIcon={<RefreshCw size={16} color="#6b7280" style={{ cursor: "pointer" }} />}
      />
      <StatCard
        title="API Calls"
        value="45.2K"
        subtitle="Last 24 hours"
        variant={StatCardVariant.NUMBER}
        change={{ value: 12.8, type: ChangeType.DECREASE }}
        titleIcon={<Zap size={24} color="#f59e0b" />}
        actionIcon={<Download size={16} color="#6b7280" style={{ cursor: "pointer" }} />}
      />
      <StatCard
        title="Error Rate"
        value="0.12%"
        subtitle="Last hour"
        variant={StatCardVariant.NUMBER}
        change={{ value: 23.5, type: ChangeType.DECREASE }}
        titleIcon={<AlertCircle size={24} color="#ef4444" />}
        actionIcon={<MoreVertical size={16} color="#6b7280" style={{ cursor: "pointer" }} />}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Action icons provide quick access to related actions or menus.",
      },
    },
  },
};

// Dashboard example
export const DashboardExample: Story = {
  render: () => {
    const revenueData = generateChartData(30, 5000, 1000);
    const visitorData = generateChartData(30, 1000, 200);
    const salesData = generateChartData(12, 3000, 500);

    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 280px)", gap: "16px" }}>
        {/* Row 1 - Key Metrics */}
        <StatCard
          title="Total Revenue"
          value="$845.2K"
          subtitle="Year to date"
          variant={StatCardVariant.NUMBER}
          change={{ value: 22.5, type: ChangeType.INCREASE }}
          titleIcon={<DollarSign size={24} color="#10b981" />}
        />
        <StatCard
          title="Active Users"
          value="12,543"
          subtitle="Monthly active"
          variant={StatCardVariant.NUMBER}
          change={{ value: 8.3, type: ChangeType.INCREASE }}
          titleIcon={<Users size={24} color="#3b82f6" />}
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          subtitle="Last 30 days"
          variant={StatCardVariant.NUMBER}
          change={{ value: 5.1, type: ChangeType.DECREASE }}
          titleIcon={<Target size={24} color="#8b5cf6" />}
        />
        <StatCard
          title="Avg Order Value"
          value="$156.50"
          subtitle="Per transaction"
          variant={StatCardVariant.NUMBER}
          change={{ value: 12.8, type: ChangeType.INCREASE }}
          titleIcon={<ShoppingCart size={24} color="#f59e0b" />}
        />

        {/* Row 2 - Charts */}
        <StatCard
          title="Revenue Trend"
          value="$45,231"
          subtitle="Last 30 days"
          variant={StatCardVariant.LINE}
          change={{ value: 15.2, type: ChangeType.INCREASE }}
          chartData={revenueData}
          titleIcon={<TrendingUp size={16} color="#10b981" />}
        />
        <StatCard
          title="Site Traffic"
          value="28.4K"
          subtitle="Unique visitors"
          variant={StatCardVariant.LINE}
          change={{ value: 3.7, type: ChangeType.INCREASE }}
          chartData={visitorData}
          titleIcon={<Eye size={16} color="#3b82f6" />}
        />
        <StatCard
          title="Sales by Month"
          value="$32,450"
          subtitle="This month"
          variant={StatCardVariant.BAR}
          change={{ value: 18.9, type: ChangeType.INCREASE }}
          chartData={salesData}
          titleIcon={<BarChart3 size={16} color="#8b5cf6" />}
        />
        <StatCard
          title="Goal Progress"
          value="68%"
          subtitle="$68K of $100K"
          variant={StatCardVariant.PROGRESS_BAR}
          progressValue={68}
          titleIcon={<Target size={16} color="#f59e0b" />}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "A complete dashboard example showing various stat card configurations.",
      },
    },
  },
};
