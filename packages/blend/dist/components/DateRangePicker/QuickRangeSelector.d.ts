import { DateRangePreset } from './types';
type QuickRangeSelectorProps = {
    isOpen: boolean;
    onToggle: () => void;
    activePreset: DateRangePreset;
    onPresetSelect: (preset: DateRangePreset) => void;
    excludeCustom?: boolean;
    className?: string;
    disableFutureDates?: boolean;
    disablePastDates?: boolean;
};
declare const QuickRangeSelector: import('react').ForwardRefExoticComponent<QuickRangeSelectorProps & import('react').RefAttributes<HTMLDivElement>>;
export default QuickRangeSelector;
