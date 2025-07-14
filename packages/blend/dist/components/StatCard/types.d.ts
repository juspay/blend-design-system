import { ReactNode } from 'react';
export declare enum StatCardVariant {
    LINE = "line",
    PROGRESS_BAR = "progress",
    BAR = "bar",
    NUMBER = "number"
}
export declare enum ChangeType {
    INCREASE = "increase",
    DECREASE = "decrease"
}
export type ChartDataPoint = {
    value: number;
    label: string;
    date?: string;
};
export type StatCardChange = {
    value: number;
    type: ChangeType;
};
export type StatCardProps = {
    title: string;
    value: string | number;
    change?: StatCardChange;
    subtitle?: string;
    variant: StatCardVariant;
    chartData?: ChartDataPoint[];
    progressValue?: number;
    titleIcon?: ReactNode;
    actionIcon?: ReactNode;
    helpIconText?: string;
};
