import { createContext, useContext } from 'react'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import {
    type ResponsiveTagTokens,
    getTagTokens,
} from '../components/Tags/tag.tokens'
import {
    getSearchInputTokens,
    type SearchInputTokensType,
} from '../components/Inputs/SearchInput/searchInput.tokens'
import {
    getTextAreaTokens,
    type ResponsiveTextAreaTokens,
} from '../components/Inputs/TextArea/textarea.token'
import {
    type ResponsiveRadioTokens,
    getRadioTokens,
} from '../components/Radio/radio.token'
import {
    type ResponsiveSwitchTokens,
    getSwitchTokens,
} from '../components/Switch/switch.token'
import {
    getTextInputTokens,
    type ResponsiveTextInputTokens,
} from '../components/Inputs/TextInput/textInput.tokens'
import {
    getNumberInputTokens,
    type ResponsiveNumberInputTokens,
} from '../components/Inputs/NumberInput/numberInput.tokens'
import {
    getAlertTokens,
    type ResponsiveAlertTokens,
} from '../components/Alert/alert.tokens'
import {
    getOTPInputTokens,
    type OTPInputTokensType,
} from '../components/Inputs/OTPInput/otpInput.tokens'
import {
    getTooltipTokens,
    type TooltipTokensType,
} from '../components/Tooltip/tooltip.tokens'
import {
    getUnitInputTokens,
    type ResponsiveUnitInputTokens,
} from '../components/Inputs/UnitInput/unitInput.tokens'
import {
    getMultiValueInputTokens,
    type MultiValueInputTokensType,
} from '../components/Inputs/MultiValueInput/multiValueInput.tokens'
import {
    getDropdownInputTokens,
    type ResponsiveDropdownInputTokens,
} from '../components/Inputs/DropdownInput/dropdownInput.tokens'
import {
    getCheckboxTokens,
    type ResponsiveCheckboxTokens,
} from '../components/Checkbox/checkbox.token'
import {
    ResponsiveTabsTokens,
    getTabsTokens,
} from '../components/Tabs/tabs.token' // Added TABS
import {
    type ResponsiveButtonTokens,
    getButtonTokens,
} from '../components/Button/button.tokens'
import {
    getModalComponentTokens,
    type ModalTokensType,
} from '../components/Modal/modal.tokens'
import {
    getBreadcrumbTokens,
    type ResponsiveBreadcrumbTokens,
} from '../components/Breadcrumb/breadcrumb.tokens'
import {
    getPopoverTokens,
    type PopoverTokenType,
} from '../components/Popover/popover.tokens'
import {
    getMenuTokens,
    type ResponsiveMenuTokensType,
} from '../components/Menu/menu.tokens'
import {
    getMultiSelectTokens,
    type ResponsiveMultiSelectTokens,
} from '../components/MultiSelect/multiSelect.tokens'
import {
    getTableToken,
    type TableTokenType,
} from '../components/DataTable/dataTable.tokens'
import {
    type CalendarTokenType,
    getCalendarToken,
} from '../components/DateRangePicker/dateRangePicker.tokens'
import {
    getAccordionToken,
    type ResponsiveAccordionTokens,
} from '../components/Accordion/accordion.tokens'
import {
    getStatCardToken,
    type StatCardTokenType,
} from '../components/StatCard/statcard.tokens'
import progressBarTokens, {
    type ProgressBarTokenType,
} from '../components/ProgressBar/progressbar.tokens'
import {
    getDrawerComponentTokens,
    type DrawerTokensType,
} from '../components/Drawer/drawer.tokens'
import { BREAKPOINTS, type BreakpointType } from '../breakpoints/breakPoints'
import {
    getSingleSelectTokens,
    ResponsiveSingleSelectTokens,
} from '../components/SingleSelect/singleSelect.tokens'

export type ComponentTokenType = {
    TAGS?: ResponsiveTagTokens
    SEARCH_INPUT?: SearchInputTokensType
    TEXT_AREA?: ResponsiveTextAreaTokens
    RADIO?: ResponsiveRadioTokens
    SWITCH?: ResponsiveSwitchTokens
    TEXT_INPUT?: ResponsiveTextInputTokens
    NUMBER_INPUT?: ResponsiveNumberInputTokens
    ALERT?: ResponsiveAlertTokens
    OTP_INPUT?: OTPInputTokensType
    TOOLTIP?: TooltipTokensType
    UNIT_INPUT?: ResponsiveUnitInputTokens
    MULTI_VALUE_INPUT?: MultiValueInputTokensType
    DROPDOWN_INPUT?: ResponsiveDropdownInputTokens
    CHECKBOX?: ResponsiveCheckboxTokens
    TABS?: ResponsiveTabsTokens
    BUTTON?: ResponsiveButtonTokens
    MODAL?: ModalTokensType
    BREADCRUMB?: ResponsiveBreadcrumbTokens
    POPOVER?: PopoverTokenType
    MENU?: ResponsiveMenuTokensType
    MULTI_SELECT?: ResponsiveMultiSelectTokens
    SINGLE_SELECT?: ResponsiveSingleSelectTokens
    TABLE?: TableTokenType
    CALENDAR?: CalendarTokenType
    ACCORDION?: ResponsiveAccordionTokens
    STAT_CARD?: StatCardTokenType
    PROGRESS_BAR?: ProgressBarTokenType
    DRAWER?: DrawerTokensType
}

type ThemeContextType = {
    foundationTokens: ThemeType
    componentTokens: Required<ComponentTokenType>
    breakpoints: BreakpointType
}

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
        SINGLE_SELECT: getSingleSelectTokens(FOUNDATION_THEME),
        TABLE: getTableToken(FOUNDATION_THEME),
        CALENDAR: getCalendarToken(FOUNDATION_THEME),
        ACCORDION: getAccordionToken(FOUNDATION_THEME),
        STAT_CARD: getStatCardToken(FOUNDATION_THEME),
        PROGRESS_BAR: progressBarTokens,
        DRAWER: getDrawerComponentTokens(FOUNDATION_THEME),
    },
    breakpoints: BREAKPOINTS,
})

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export default ThemeContext
