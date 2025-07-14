import { DateRange } from './types';
type CalendarGridProps = {
    selectedRange: DateRange;
    onDateSelect: (range: DateRange) => void;
    today: Date;
    allowSingleDateSelection?: boolean;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
};
declare const CalendarGrid: import('react').ForwardRefExoticComponent<CalendarGridProps & import('react').RefAttributes<HTMLDivElement>>;
export default CalendarGrid;
