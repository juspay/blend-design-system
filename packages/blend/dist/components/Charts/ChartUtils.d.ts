import { NewNestedDataPoint, FlattenedDataPoint } from './types';
export declare function transformNestedData(data: NewNestedDataPoint[], selectedKeys?: string[]): FlattenedDataPoint[];
export declare function lightenHexColor(hex: string, amount?: number): string;
export declare const formatNumber: (value: number | string) => string;
export declare const capitaliseCamelCase: (text: string) => string;
