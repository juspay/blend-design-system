import { createContext, useContext } from "react";
import { FOUNDATION_THEME, ThemeType } from "../tokens";
import { TagTokensType } from "../components/Tags/tag.tokens";
import { getTagTokens } from "../components/Tags/tag.tokens";
import {
  getSearchInputTokens,
  SearchInputTokensType,
} from "../components/Inputs/SearchInput/searchInput.tokens";
import {
  getTextAreaTokens,
  TextAreaTokensType,
} from "../components/Inputs/TextArea/textarea.token";
import {
  RadioTokensType,
  getRadioTokens,
} from "../components/Radio/radio.token";
import {
  SwitchTokensType,
  getSwitchTokens,
} from "../components/Switch/switch.token";
import {
  getTextInputTokens,
  TextInputTokensType,
} from "../components/Inputs/TextInput/textInput.tokens";
import {
  getNumberInputTokens,
  NumberInputTokensType,
} from "../components/Inputs/NumberInput/numberInput.tokens";
import {
  AlertTokenType,
  getAlertTokens,
} from "../components/Alert/alert.tokens";
import {
  getOTPInputTokens,
  OTPInputTokensType,
} from "../components/Inputs/OTPInput/otpInput.tokens";
import {
  getTooltipTokens,
  TooltipTokensType,
} from "../components/Tooltip/tooltip.tokens";
import {
  getUnitInputTokens,
  UnitInputTokensType,
} from "../components/Inputs/UnitInput/unitInput.tokens";
import {
  getMultiValueInputTokens,
  MultiValueInputTokensType,
} from "../components/Inputs/MultiValueInput/multiValueInput.tokens";
import {
  DropdownInputTokensType,
  getDropdownInputTokens,
} from "../components/Inputs/DropdownInput/dropdownInput.tokens";
import {
  CheckboxTokensType,
  getCheckboxTokens,
} from "../components/Checkbox/checkbox.token";
import { TabsTokensType, getTabsTokens } from "../components/Tabs/tabs.token"; // Added TABS
import {
  ButtonTokensType,
  getButtonTokens,
} from "../components/ButtonV2/button.tokens";
import {
  getModalComponentTokens,
  ModalTokensType,
} from "../components/Modal/modal.tokens";
import {
  BreadcrumbTokenType,
  getBreadcrumbTokens,
} from "../components/Breadcrumb/breadcrumb.tokens";
import {
  getPopoverTokens,
  PopoverTokenType,
} from "../components/Popover/popover.tokens";
import { getMenuTokens, MenuTokensType } from "../components/Menu/menu.tokens";
import {
  getMultiSelectTokens,
  MultiSelectTokensType,
} from "../components/MultiSelect/multiSelect.tokens";
import { getTableToken, TableTokenType } from "../components/DataTable/dataTable.tokens";
import { CalendarTokenType, getCalendarToken } from "../components/DateRangePicker/dateRangePicker.tokens";
import { AccordionTokenType, getAccordionToken } from "../components/Accordion/accordion.tokens";
import { getStatCardToken, StatCardTokenType } from "../components/StatCard/statcard.tokens";

export type ComponentTokenType = {
  TAGS?: TagTokensType;
  SEARCH_INPUT?: SearchInputTokensType;
  TEXT_AREA?: TextAreaTokensType;
  RADIO?: RadioTokensType;
  SWITCH?: SwitchTokensType;
  TEXT_INPUT?: TextInputTokensType;
  NUMBER_INPUT?: NumberInputTokensType;
  ALERT?: AlertTokenType;
  OTP_INPUT?: OTPInputTokensType;
  TOOLTIP?: TooltipTokensType;
  UNIT_INPUT?: UnitInputTokensType;
  MULTI_VALUE_INPUT?: MultiValueInputTokensType;
  DROPDOWN_INPUT?: DropdownInputTokensType;
  CHECKBOX?: CheckboxTokensType;
  TABS?: TabsTokensType;
  BUTTON?: ButtonTokensType;
  MODAL?: ModalTokensType;
  BREADCRUMB?: BreadcrumbTokenType;
  POPOVER?: PopoverTokenType;
  MENU?: MenuTokensType;
  MULTI_SELECT?: MultiSelectTokensType;
  TABLE?: TableTokenType;
  CALENDAR?: CalendarTokenType;
  ACCORDION?: AccordionTokenType;
  STAT_CARD?: StatCardTokenType;
};

type ThemeContextType = {
  foundationTokens: ThemeType;
  componentTokens: Required<ComponentTokenType>;
};

const ThemeContext = createContext<ThemeContextType>({
  foundationTokens: FOUNDATION_THEME,
  componentTokens: {
    TAGS: getTagTokens(FOUNDATION_THEME),
    SEARCH_INPUT: getSearchInputTokens(FOUNDATION_THEME),
    TEXT_AREA: getTextAreaTokens(FOUNDATION_THEME),
    RADIO: getRadioTokens(FOUNDATION_THEME),
    SWITCH: getSwitchTokens(FOUNDATION_THEME),
    TEXT_INPUT: getTextInputTokens(FOUNDATION_THEME),
    NUMBER_INPUT: getNumberInputTokens(FOUNDATION_THEME),
    ALERT: getAlertTokens(FOUNDATION_THEME),
    OTP_INPUT: getOTPInputTokens(FOUNDATION_THEME),
    TOOLTIP: getTooltipTokens(FOUNDATION_THEME),
    UNIT_INPUT: getUnitInputTokens(FOUNDATION_THEME),
    MULTI_VALUE_INPUT: getMultiValueInputTokens(FOUNDATION_THEME),
    DROPDOWN_INPUT: getDropdownInputTokens(FOUNDATION_THEME),
    CHECKBOX: getCheckboxTokens(FOUNDATION_THEME),
    TABS: getTabsTokens(FOUNDATION_THEME),
    BUTTON: getButtonTokens(FOUNDATION_THEME),
    MODAL: getModalComponentTokens(FOUNDATION_THEME),
    BREADCRUMB: getBreadcrumbTokens(FOUNDATION_THEME),
    POPOVER: getPopoverTokens(FOUNDATION_THEME),
    MENU: getMenuTokens(FOUNDATION_THEME),
    MULTI_SELECT: getMultiSelectTokens(FOUNDATION_THEME),
    TABLE: getTableToken(FOUNDATION_THEME),
    CALENDAR: getCalendarToken(FOUNDATION_THEME),
    ACCORDION: getAccordionToken(FOUNDATION_THEME),
    STAT_CARD: getStatCardToken(FOUNDATION_THEME),
  },
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
