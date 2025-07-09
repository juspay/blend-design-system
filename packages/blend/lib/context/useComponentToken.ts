import { SearchInputTokensType } from "../components/Inputs/SearchInput/searchInput.tokens";
import { TextAreaTokensType } from "../components/Inputs/TextArea/textarea.token";
import { TagTokensType } from "../components/Tags/tag.tokens";
import { RadioTokensType } from "../components/Radio/radio.token";
import { SwitchTokensType } from "../components/Switch/switch.token";
import { CheckboxTokensType } from "../components/Checkbox/checkbox.token";
import { TabsTokensType } from "../components/Tabs/tabs.token";
import { ComponentTokenType, useTheme } from "./ThemeContext";
import { TextInputTokensType } from "../components/Inputs/TextInput/textInput.tokens";
import { NumberInputTokensType } from "../components/Inputs/NumberInput/numberInput.tokens";
import { AlertTokenType } from "../components/Alert/alert.tokens";
import { OTPInputTokensType } from "../components/Inputs/OTPInput/otpInput.tokens";
import { TooltipTokensType } from "../components/Tooltip/tooltip.tokens";
import { UnitInputTokensType } from "../components/Inputs/UnitInput/unitInput.tokens";
import { MultiValueInputTokensType } from "../components/Inputs/MultiValueInput/multiValueInput.tokens";
import { DropdownInputTokensType } from "../components/Inputs/DropdownInput/dropdownInput.tokens";
import { ButtonTokensType } from "../components/ButtonV2/button.tokens";
import { ModalTokensType } from "../components/Modal/modal.tokens";
import { BreadcrumbTokenType } from "../components/Breadcrumb/breadcrumb.tokens";
import { PopoverTokenType } from "../components/Popover/popover.tokens";
import { MenuTokensType } from "../components/Menu/menu.tokens";
import { MultiSelectTokensType } from "../components/MultiSelect/multiSelect.tokens";
import { TableTokenType } from "../components/DataTable/dataTable.tokens";
import { CalendarTokenType } from "../components/DateRangePicker/dateRangePicker.tokens";
import { AccordionTokenType } from "../components/Accordion/accordion.tokens";
import { StatCardTokenType } from "../components/StatCard/statcard.tokens";

export const useComponentToken = (
  component: keyof ComponentTokenType,
):
  | SearchInputTokensType
  | TagTokensType
  | TextAreaTokensType
  | TextInputTokensType
  | NumberInputTokensType
  | AlertTokenType
  | RadioTokensType
  | OTPInputTokensType
  | UnitInputTokensType
  | MultiValueInputTokensType
  | SwitchTokensType
  | CheckboxTokensType
  | TabsTokensType
  | TooltipTokensType
  | DropdownInputTokensType
  | ButtonTokensType
  | ModalTokensType
  | BreadcrumbTokenType
  | PopoverTokenType
  | MenuTokensType
  | MultiSelectTokensType
  | TableTokenType
  | CalendarTokenType 
  | AccordionTokenType 
  | StatCardTokenType=> {
  const { componentTokens } = useTheme();
  switch (component) {
    case "TOOLTIP":
      return componentTokens.TOOLTIP;
    case "TEXT_INPUT":
      return componentTokens.TEXT_INPUT;
    case "NUMBER_INPUT":
      return componentTokens.NUMBER_INPUT;
    case "ALERT":
      return componentTokens.ALERT;
    case "OTP_INPUT":
      return componentTokens.OTP_INPUT;
    case "TAGS":
      return componentTokens.TAGS;
    case "SEARCH_INPUT":
      return componentTokens.SEARCH_INPUT;
    case "TEXT_AREA":
      return componentTokens.TEXT_AREA;
    case "RADIO":
      return componentTokens.RADIO;
    case "SWITCH":
      return componentTokens.SWITCH;
    case "CHECKBOX":
      return componentTokens.CHECKBOX;
    case "TABS":
      return componentTokens.TABS;
    case "DROPDOWN_INPUT":
      return componentTokens.DROPDOWN_INPUT;
    case "BUTTON":
      return componentTokens.BUTTON;
    case "MODAL":
      return componentTokens.MODAL;
    case "BREADCRUMB":
      return componentTokens.BREADCRUMB;
    case "POPOVER":
      return componentTokens.POPOVER;
    case "MENU":
      return componentTokens.MENU;
    case "MULTI_SELECT":
      return componentTokens.MULTI_SELECT;
    case "TABLE":
      return componentTokens.TABLE;
    case "CALENDAR":
      return componentTokens.CALENDAR;
    case "ACCORDION":
      return componentTokens.ACCORDION;
    case "UNIT_INPUT":
      return componentTokens.UNIT_INPUT;
    case "MULTI_VALUE_INPUT":
      return componentTokens.MULTI_VALUE_INPUT;
    case "STAT_CARD":
      return componentTokens.STAT_CARD;
    default:
      throw new Error(`Unknown component token: ${component}`);
  }
};
