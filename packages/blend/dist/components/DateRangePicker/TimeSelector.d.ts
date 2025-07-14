type TimeSelectorProps = {
    value: string;
    onChange: (time: string) => void;
    className?: string;
};
declare const TimeSelector: import('react').ForwardRefExoticComponent<TimeSelectorProps & import('react').RefAttributes<HTMLDivElement>>;
export default TimeSelector;
