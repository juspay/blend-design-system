import { createContext, useContext } from 'react'
import {
    getSearchInputTokens,
    type SearchInputTokensType,
} from '../components/Inputs/SearchInput/searchInput.tokens'
import {
    getTagTokens,
    type ResponsiveTagTokens,
} from '../components/Tags/tag.tokens'
import {
    getTextAreaTokens,
    type ResponsiveTextAreaTokens,
} from '../components/Inputs/TextArea/textarea.token'
import {
    getRadioTokens,
    type ResponsiveRadioTokens,
} from '../components/Radio/radio.token'
import {
    getSwitchTokens,
    type ResponsiveSwitchTokens,
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
    type ResponsiveOTPInputTokens,
} from '../components/Inputs/OTPInput/otpInput.tokens'
import {
    getTooltipTokens,
    type ResponsiveTooltipTokens,
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
    getTabsTokens,
    type ResponsiveTabsTokens,
} from '../components/Tabs/tabs.token'
import {
    getButtonTokens,
    type ResponsiveButtonTokens,
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
    getSingleSelectTokens,
    type ResponsiveSingleSelectTokens,
} from '../components/SingleSelect/singleSelect.tokens'
import {
    getTableToken,
    type ResponsiveTableTokens,
} from '../components/DataTable/dataTable.tokens'
import {
    getCalendarToken,
    type ResponsiveCalendarTokens,
} from '../components/DateRangePicker/dateRangePicker.tokens'
import {
    getAccordionToken,
    type ResponsiveAccordionTokens,
} from '../components/Accordion/accordion.tokens'
import {
    getStatCardToken,
    type ResponsiveStatCardTokens,
} from '../components/StatCard/statcard.tokens'
import type { ProgressBarTokenType } from '../components/ProgressBar/progressbar.tokens'
import {
    getDrawerComponentTokens,
    type DrawerTokensType,
} from '../components/Drawer/drawer.tokens'
import {
    getChartTokens,
    type ResponsiveChartTokens,
} from '../components/Charts/chart.tokens'
import {
    getSnackbarTokens,
    type ResponsiveSnackbarTokens,
} from '../components/Snackbar/snackbar.tokens'
import {
    getKeyValuePairTokens,
    type ResponsiveKeyValuePairTokens,
} from '../components/KeyValuePair/KeyValuePair.tokens'
import {
    getCardTokens,
    type ResponsiveCardTokens,
} from '../components/Card/card.tokens'
import type { ResponsiveTopbarTokens } from '../components/Topbar/topbar.tokens'

import { FOUNDATION_THEME, type ThemeType } from '../tokens'

import { getTopbarTokens } from '../components/Topbar/topbar.tokens'
import {
    getStepperTokens,
    ResponsiveStepperTokens,
} from '../components/Stepper/stepper.tokens'
import {
    getSkeletonTokens,
    ResponsiveSkeletonTokens,
} from '../components/Skeleton/skeleton.tokens'
import { BREAKPOINTS } from '../breakpoints/breakPoints'
import progressBarTokens from '../components/ProgressBar/progressbar.tokens'

export type ComponentTokenType = {
    TAGS?: ResponsiveTagTokens
    SEARCH_INPUT?: SearchInputTokensType
    TEXT_AREA?: ResponsiveTextAreaTokens
    RADIO?: ResponsiveRadioTokens
    SWITCH?: ResponsiveSwitchTokens
    TEXT_INPUT?: ResponsiveTextInputTokens
    NUMBER_INPUT?: ResponsiveNumberInputTokens
    ALERT?: ResponsiveAlertTokens
    OTP_INPUT?: ResponsiveOTPInputTokens
    TOOLTIP?: ResponsiveTooltipTokens
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
    TABLE?: ResponsiveTableTokens
    CALENDAR?: ResponsiveCalendarTokens
    ACCORDION?: ResponsiveAccordionTokens
    STAT_CARD?: ResponsiveStatCardTokens
    PROGRESS_BAR?: ProgressBarTokenType
    DRAWER?: DrawerTokensType
    CHARTS?: ResponsiveChartTokens
    SNACKBAR?: ResponsiveSnackbarTokens
    STEPPER?: ResponsiveStepperTokens
    KEYVALUEPAIR?: ResponsiveKeyValuePairTokens
    CARD?: ResponsiveCardTokens
    SKELETON?: ResponsiveSkeletonTokens
    TOPBAR?: ResponsiveTopbarTokens
}

type ThemeContextType = {
    foundationTokens: ThemeType
    componentTokens: Required<ComponentTokenType>
    breakpoints: typeof BREAKPOINTS
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
        CHARTS: getChartTokens(FOUNDATION_THEME),
        SNACKBAR: getSnackbarTokens(FOUNDATION_THEME),
        STEPPER: getStepperTokens(FOUNDATION_THEME),
        KEYVALUEPAIR: getKeyValuePairTokens(FOUNDATION_THEME),
        CARD: getCardTokens(FOUNDATION_THEME),
        TOPBAR: getTopbarTokens(FOUNDATION_THEME),
        SKELETON: getSkeletonTokens(FOUNDATION_THEME),
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
