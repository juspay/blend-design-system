import { ReactNode } from "react";

export enum DateRangePreset {
  CUSTOM = "custom",
  TODAY = "today",
  YESTERDAY = "yesterday",
  TOMORROW = "tomorrow",
  LAST_1_HOUR = "last1Hour",
  LAST_6_HOURS = "last6Hours",
  LAST_7_DAYS = "last7Days",
  LAST_30_DAYS = "last30Days",
  LAST_3_MONTHS = "last3Months",
  LAST_12_MONTHS = "last12Months",
  NEXT_7_DAYS = "next7Days",
  NEXT_30_DAYS = "next30Days",
  NEXT_3_MONTHS = "next3Months",
  NEXT_12_MONTHS = "next12Months",
}

export type DateRange = {
  startDate: Date;
  endDate: Date;
  showTimePicker?: boolean;
};

export type DateRangePickerProps = {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  showTimePicker?: boolean;
  showPresets?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  icon?: ReactNode;
  minDate?: Date;
  maxDate?: Date;
  dateFormat?: string;
  allowSingleDateSelection?: boolean;
  disableFutureDates?: boolean;
  disablePastDates?: boolean;
  triggerElement?: ReactNode;
};
