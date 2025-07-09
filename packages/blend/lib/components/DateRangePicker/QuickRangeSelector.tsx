import { forwardRef } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { styled } from "styled-components";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DateRangePreset } from "./types";
import { getPresetLabel } from "./utils";
import { CalendarTokenType } from "./dateRangePicker.tokens";
import Block from "../Primitives/Block/Block";
import { useComponentToken } from "../../context/useComponentToken";
import PrimitiveButton from "../Primitives/PrimitiveButton/PrimitiveButton";

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

// const StyledTrigger = styled.button<{ $isOpen: boolean }>`
//   ${dateRangePickerTokens.quickRange.trigger}
//   width: 100%;
//   background: transparent;
//   padding: 8px 12px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;

//   &:focus {
//     outline: none;
//   }
// `;

const StyledItem = styled(DropdownMenu.Item)<{
  $isActive: boolean;
  $calendarToken: CalendarTokenType;
}>`
  ${(props) => props.$calendarToken.quickRange.item}
  ${(props) => props.$calendarToken.quickRange.item.text}
  ${(props) => props.$isActive && props.$calendarToken.quickRange.item.active}
`;

const StyledContent = styled(DropdownMenu.Content)<{
  $calendarToken: CalendarTokenType;
}>`
  ${(props) => props.$calendarToken.quickRange.content}
`;

const QuickRangeSelector = forwardRef<HTMLDivElement, QuickRangeSelectorProps>(
  (
    {
      isOpen,
      onToggle,
      activePreset,
      onPresetSelect,
      excludeCustom = false,
      className,
      disableFutureDates = false,
      disablePastDates = false,
    },
    ref,
  ) => {
    const calendarToken = useComponentToken("CALENDAR") as CalendarTokenType;
    const activePresetLabel = getPresetLabel(activePreset);

    const getFilteredPresets = () => {
      const pastPresets = [
        DateRangePreset.YESTERDAY,
        DateRangePreset.LAST_1_HOUR,
        DateRangePreset.LAST_6_HOURS,
        DateRangePreset.LAST_7_DAYS,
        DateRangePreset.LAST_30_DAYS,
        DateRangePreset.LAST_3_MONTHS,
        DateRangePreset.LAST_12_MONTHS,
      ];

      const futurePresets = [
        DateRangePreset.TOMORROW,
        DateRangePreset.NEXT_7_DAYS,
        DateRangePreset.NEXT_30_DAYS,
        DateRangePreset.NEXT_3_MONTHS,
        DateRangePreset.NEXT_12_MONTHS,
      ];

      const neutralPresets = [DateRangePreset.TODAY];

      let availablePresets = [...neutralPresets];

      if (!disablePastDates) {
        availablePresets = [...availablePresets, ...pastPresets];
      }

      if (!disableFutureDates) {
        availablePresets = [...availablePresets, ...futurePresets];
      }

      if (!excludeCustom) {
        availablePresets.push(DateRangePreset.CUSTOM);
      }

      return availablePresets;
    };

    const filteredPresets = getFilteredPresets();

    const handlePresetSelect = (preset: DateRangePreset) => {
      onPresetSelect(preset);
    };

    return (
      <Block
        position="relative"
        width={calendarToken.quickRange.width}
        ref={ref}
        className={className}
      >
        <DropdownMenu.Root open={isOpen} onOpenChange={onToggle}>
          <DropdownMenu.Trigger asChild>
            <PrimitiveButton style={{ ...calendarToken.quickRange.trigger }}>
              <Block
                as="span"
                color={calendarToken.quickRange.trigger.text.color}
                fontSize={calendarToken.quickRange.trigger.text.fontSize}
              >
                {activePresetLabel}
              </Block>
              {isOpen ? (
                <ChevronUp
                  size={calendarToken.quickRange.trigger.iconSize as number}
                  color={calendarToken.quickRange.trigger.text.color}
                />
              ) : (
                <ChevronDown
                  size={calendarToken.quickRange.trigger.iconSize as number}
                  color={calendarToken.quickRange.trigger.text.color}
                />
              )}
            </PrimitiveButton>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <StyledContent
              align="start"
              sideOffset={4}
              $calendarToken={calendarToken}
            >
              {filteredPresets.map((preset) => (
                <StyledItem
                  key={preset}
                  $isActive={preset === activePreset}
                  $calendarToken={calendarToken}
                  onSelect={() => handlePresetSelect(preset)}
                >
                  {getPresetLabel(preset)}
                </StyledItem>
              ))}
            </StyledContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </Block>
    );
  },
);

QuickRangeSelector.displayName = "QuickRangeSelector";

export default QuickRangeSelector;
