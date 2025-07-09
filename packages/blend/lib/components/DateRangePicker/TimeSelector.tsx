import { forwardRef, useMemo } from "react";
import { SingleSelect } from "../SingleSelect";
import {
  SelectMenuGroupType,
  SelectMenuVariant,
  SelectMenuSize,
  SelectMenuAlignment,
  SelectMenuSide,
} from "../Select";
import Block from "../Primitives/Block/Block";

type TimeSelectorProps = {
  value: string;
  onChange: (time: string) => void;
  className?: string;
};

const TimeSelector = forwardRef<HTMLDivElement, TimeSelectorProps>(
  ({ value, onChange }, ref) => {
    const formatTimeFor12Hour = (hour: number, minute: number): string => {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const formattedHour = displayHour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      return `${formattedHour}:${formattedMinute} ${period}`;
    };

    const timeSelectItems: SelectMenuGroupType[] = useMemo(() => {
      const options = [];
      for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
          const timeValue = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
          const display = formatTimeFor12Hour(h, m);
          options.push({
            value: timeValue,
            label: display,
          });
        }
      }
      return [{ items: options }];
    }, []);

    const getClosestTimeValue = (inputValue: string): string => {
      const [hour, minute] = inputValue.split(":").map(Number);
      const roundedMinute = Math.round(minute / 15) * 15;
      const finalMinute = roundedMinute === 60 ? 0 : roundedMinute;
      const finalHour = roundedMinute === 60 ? (hour + 1) % 24 : hour;
      return `${finalHour.toString().padStart(2, "0")}:${finalMinute.toString().padStart(2, "0")}`;
    };

    const selectedValue = getClosestTimeValue(value);

    const handleTimeSelect = (timeValue: string) => {
      onChange(timeValue);
    };

    return (
      <Block ref={ref} style={{ width: "118px", flexShrink: 0 }}>
        <SingleSelect
          items={timeSelectItems}
          selected={selectedValue}
          onSelect={handleTimeSelect}
          variant={SelectMenuVariant.CONTAINER}
          size={SelectMenuSize.MEDIUM}
          placeholder="Select time"
          alignment={SelectMenuAlignment.START}
          side={SelectMenuSide.BOTTOM}
          sideOffset={4}
          maxHeight={240}
          minWidth={100}
          label=""
        />
      </Block>
    );
  },
);

TimeSelector.displayName = "TimeSelector";

export default TimeSelector;
