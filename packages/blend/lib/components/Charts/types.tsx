import { ReactNode } from "react";
import { TooltipProps } from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export type DataPoint = {
  primary: {
    label: string;
    val: number;
  };
  aux?: {
    label: string;
    val: number;
  }[];
};

export enum ChartLegendPosition {
  TOP = "top",
  RIGHT = "right",
}

export enum ChartType {
  LINE = "line",
  BAR = "bar",
  PIE = "pie",
}

export type NewNestedDataPoint = {
  name: string;
  data: {
    [key: string]: DataPoint;
  };
};

export type RenderChartProps = {
  flattenedData: FlattenedDataPoint[];
  chartType: ChartType;
  hoveredKey: string | null;
  lineKeys: string[];
  colors: string[];
  setHoveredKey: (key: string | null) => void;
  xAxisLabel?: string;
  yAxisLabel?: string;
  data: NewNestedDataPoint[];
  selectedKeys: string[];
};

export type ChartsProps = {
  chartType?: ChartType;
  data: NewNestedDataPoint[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  colors?: string[];
  metrics?: string[];
  slot1?: ReactNode;
  slot2?: ReactNode;
  slot3?: ReactNode;
  legendPosition?: ChartLegendPosition;
  chartHeaderSlot: ReactNode;
};

export type FlattenedDataPoint = {
  name: string;
  [key: string]: number | string;
};

export type ChartHeaderProps = {
  slot1: React.ReactNode;
  slot2: React.ReactNode;
  slot3: React.ReactNode;
  chartHeaderSlot: ReactNode;
};

export type ChartLegendsProps = {
  chartContainerRef: React.RefObject<HTMLDivElement>;
  keys: string[];
  colors: string[];
  handleLegendClick: (key: string) => void;
  handleLegendEnter: (key: string) => void;
  handleLegendLeave: () => void;
  selectedKeys: string[];
  setSelectedKeys: (keys: string[]) => void;
  hoveredKey: string | null;
  activeKeys: string[] | null;
  stacked?: boolean;
};

export type CustomTooltipProps = TooltipProps<ValueType, NameType> & {
  hoveredKey: string | null;
  originalData: NewNestedDataPoint[];
  setHoveredKey: (key: string) => void;
  chartType: ChartType;
  selectedKeys: string[];
};
