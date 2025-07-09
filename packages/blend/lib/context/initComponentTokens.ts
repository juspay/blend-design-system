import { getAlertTokens } from "../components/Alert/alert.tokens";
import { getNumberInputTokens } from "../components/Inputs/NumberInput/numberInput.tokens";
import { getSearchInputTokens } from "../components/Inputs/SearchInput/searchInput.tokens";
import { getTextAreaTokens } from "../components/Inputs/TextArea/textarea.token";
import { getTextInputTokens } from "../components/Inputs/TextInput/textInput.tokens";
import { getTagTokens } from "../components/Tags/tag.tokens";
import { getRadioTokens } from "../components/Radio/radio.token";
import { getSwitchTokens } from "../components/Switch/switch.token";
import { getCheckboxTokens } from "../components/Checkbox/checkbox.token";
import { getTabsTokens } from "../components/Tabs/tabs.token"; // Added TABS
import { ThemeType } from "../tokens";
import { ComponentTokenType } from "./ThemeContext";
import { getOTPInputTokens } from "../components/Inputs/OTPInput/otpInput.tokens";
import { getTooltipTokens } from "../components/Tooltip/tooltip.tokens";
import { getUnitInputTokens } from "../components/Inputs/UnitInput/unitInput.tokens";
import { getMultiValueInputTokens } from "../components/Inputs/MultiValueInput/multiValueInput.tokens";
import { getDropdownInputTokens } from "../components/Inputs/DropdownInput/dropdownInput.tokens";
import { getButtonTokens } from "../components/ButtonV2/button.tokens";
import { getModalComponentTokens } from "../components/Modal/modal.tokens";
import { getBreadcrumbTokens } from "../components/Breadcrumb/breadcrumb.tokens";
import { getPopoverTokens } from "../components/Popover/popover.tokens";
import { getMenuTokens } from "../components/Menu/menu.tokens";
import { getMultiSelectTokens } from "../components/MultiSelect/multiSelect.tokens";
import { getTableToken } from "../components/DataTable/dataTable.tokens";
import { getCalendarToken } from "../components/DateRangePicker/dateRangePicker.tokens";
import { getAccordionToken } from "../components/Accordion/accordion.tokens";
import { getStatCardToken } from "../components/StatCard/statcard.tokens";

const initTokens = (
  componentTokens: ComponentTokenType,
  foundationTokens: ThemeType,
): Required<ComponentTokenType> => {
  return {
    TAGS: componentTokens.TAGS ?? getTagTokens(foundationTokens),
    SEARCH_INPUT:
      componentTokens.SEARCH_INPUT ?? getSearchInputTokens(foundationTokens),
    TEXT_AREA: componentTokens.TEXT_AREA ?? getTextAreaTokens(foundationTokens),
    RADIO: componentTokens.RADIO ?? getRadioTokens(foundationTokens),
    SWITCH: componentTokens.SWITCH ?? getSwitchTokens(foundationTokens),
    TEXT_INPUT:
      componentTokens.TEXT_INPUT ?? getTextInputTokens(foundationTokens),
    NUMBER_INPUT:
      componentTokens.NUMBER_INPUT ?? getNumberInputTokens(foundationTokens),
    ALERT: componentTokens.ALERT ?? getAlertTokens(foundationTokens),
    OTP_INPUT: componentTokens.OTP_INPUT ?? getOTPInputTokens(foundationTokens),
    TOOLTIP: componentTokens.TOOLTIP ?? getTooltipTokens(foundationTokens),
    UNIT_INPUT:
      componentTokens.UNIT_INPUT ?? getUnitInputTokens(foundationTokens),
    MULTI_VALUE_INPUT:
      componentTokens.MULTI_VALUE_INPUT ??
      getMultiValueInputTokens(foundationTokens),
    DROPDOWN_INPUT:
      componentTokens.DROPDOWN_INPUT ??
      getDropdownInputTokens(foundationTokens),
    CHECKBOX: componentTokens.CHECKBOX ?? getCheckboxTokens(foundationTokens),
    TABS: componentTokens.TABS ?? getTabsTokens(foundationTokens),
    BUTTON: componentTokens.BUTTON ?? getButtonTokens(foundationTokens),
    MODAL: componentTokens.MODAL ?? getModalComponentTokens(foundationTokens),
    BREADCRUMB:
      componentTokens.BREADCRUMB ?? getBreadcrumbTokens(foundationTokens),
    POPOVER: componentTokens.POPOVER ?? getPopoverTokens(foundationTokens),
    MENU: componentTokens.MENU ?? getMenuTokens(foundationTokens),
    MULTI_SELECT:
      componentTokens.MULTI_SELECT ?? getMultiSelectTokens(foundationTokens),
    TABLE: componentTokens.TABLE ?? getTableToken(foundationTokens),
    CALENDAR: componentTokens.CALENDAR ?? getCalendarToken(foundationTokens),
    ACCORDION: componentTokens.ACCORDION ?? getAccordionToken(foundationTokens),
    STAT_CARD: componentTokens.STAT_CARD ?? getStatCardToken(foundationTokens),
  };
};

export default initTokens;
