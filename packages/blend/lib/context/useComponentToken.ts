import type { SearchInputTokensType } from '../components/Inputs/SearchInput/searchInput.tokens'
import type { ResponsiveTextAreaTokens } from '../components/Inputs/TextArea/textarea.token'
import type { ResponsiveTagTokens } from '../components/Tags/tag.tokens'
import type { ResponsiveRadioTokens } from '../components/Radio/radio.token'
import type { ResponsiveSwitchTokens } from '../components/Switch/switch.token'
import type { ResponsiveCheckboxTokens } from '../components/Checkbox/checkbox.token'
import type { ResponsiveTabsTokens } from '../components/Tabs/tabs.token'
import { type ComponentTokenType, useTheme } from './ThemeContext'
import type { ResponsiveTextInputTokens } from '../components/Inputs/TextInput/textInput.tokens'
import type { ResponsiveNumberInputTokens } from '../components/Inputs/NumberInput/numberInput.tokens'
import type { ResponsiveAlertTokens } from '../components/Alert/alert.tokens'
import type { ResponsiveOTPInputTokens } from '../components/Inputs/OTPInput/otpInput.tokens'
import type { ResponsiveTooltipTokens } from '../components/Tooltip/tooltip.tokens'
import type { ResponsiveUnitInputTokens } from '../components/Inputs/UnitInput/unitInput.tokens'
import type { MultiValueInputTokensType } from '../components/Inputs/MultiValueInput/multiValueInput.tokens'
import type { ResponsiveDropdownInputTokens } from '../components/Inputs/DropdownInput/dropdownInput.tokens'
import type { ResponsiveButtonTokens } from '../components/Button/button.tokens'
import type { ModalTokensType } from '../components/Modal/modal.tokens'
import type { ResponsiveBreadcrumbTokens } from '../components/Breadcrumb/breadcrumb.tokens'
import type { PopoverTokenType } from '../components/Popover/popover.tokens'
import type { ResponsiveMenuTokensType } from '../components/Menu/menu.tokens'
import type { ResponsiveMultiSelectTokens } from '../components/MultiSelect/multiSelect.tokens'
import type { ResponsiveTableTokens } from '../components/DataTable/dataTable.tokens'
import type { ResponsiveCalendarTokens } from '../components/DateRangePicker/dateRangePicker.tokens'
import type { ResponsiveAccordionTokens } from '../components/Accordion/accordion.tokens'
import type { ResponsiveStatCardTokens } from '../components/StatCard/statcard.tokens'
import type { ProgressBarTokenType } from '../components/ProgressBar/progressbar.tokens'
import type { DrawerTokensType } from '../components/Drawer/drawer.tokens'
import { ResponsiveSingleSelectTokens } from '../components/SingleSelect/singleSelect.tokens'
import { ResponsiveChartTokens } from '../components/Charts/chart.tokens'
import { ResponsiveSnackbarTokens } from '../components/Snackbar/snackbar.tokens'

export const useComponentToken = (
    component: keyof ComponentTokenType
):
    | SearchInputTokensType
    | ResponsiveTagTokens
    | ResponsiveTextAreaTokens
    | ResponsiveTextInputTokens
    | ResponsiveNumberInputTokens
    | ResponsiveAlertTokens
    | ResponsiveRadioTokens
    | ResponsiveOTPInputTokens
    | ResponsiveUnitInputTokens
    | MultiValueInputTokensType
    | ResponsiveSwitchTokens
    | ResponsiveCheckboxTokens
    | ResponsiveTabsTokens
    | ResponsiveTooltipTokens
    | ResponsiveDropdownInputTokens
    | ResponsiveButtonTokens
    | ModalTokensType
    | ResponsiveBreadcrumbTokens
    | PopoverTokenType
    | ResponsiveMenuTokensType
    | ResponsiveMultiSelectTokens
    | ResponsiveSingleSelectTokens
    | ResponsiveTableTokens
    | ResponsiveCalendarTokens
    | ResponsiveAccordionTokens
    | ResponsiveStatCardTokens
    | ProgressBarTokenType
    | DrawerTokensType
    | ResponsiveChartTokens
    | ResponsiveSnackbarTokens => {
    const { componentTokens } = useTheme()
    switch (component) {
        case 'TOOLTIP':
            return componentTokens.TOOLTIP
        case 'TEXT_INPUT':
            return componentTokens.TEXT_INPUT
        case 'NUMBER_INPUT':
            return componentTokens.NUMBER_INPUT
        case 'ALERT':
            return componentTokens.ALERT
        case 'OTP_INPUT':
            return componentTokens.OTP_INPUT
        case 'TAGS':
            return componentTokens.TAGS
        case 'SEARCH_INPUT':
            return componentTokens.SEARCH_INPUT
        case 'TEXT_AREA':
            return componentTokens.TEXT_AREA
        case 'RADIO':
            return componentTokens.RADIO
        case 'SWITCH':
            return componentTokens.SWITCH
        case 'CHECKBOX':
            return componentTokens.CHECKBOX
        case 'TABS':
            return componentTokens.TABS
        case 'DROPDOWN_INPUT':
            return componentTokens.DROPDOWN_INPUT
        case 'BUTTON':
            return componentTokens.BUTTON
        case 'MODAL':
            return componentTokens.MODAL
        case 'BREADCRUMB':
            return componentTokens.BREADCRUMB
        case 'POPOVER':
            return componentTokens.POPOVER
        case 'MENU':
            return componentTokens.MENU
        case 'MULTI_SELECT':
            return componentTokens.MULTI_SELECT

        case 'TABLE':
            return componentTokens.TABLE
        case 'CALENDAR':
            return componentTokens.CALENDAR
        case 'ACCORDION':
            return componentTokens.ACCORDION
        case 'UNIT_INPUT':
            return componentTokens.UNIT_INPUT
        case 'MULTI_VALUE_INPUT':
            return componentTokens.MULTI_VALUE_INPUT
        case 'STAT_CARD':
            return componentTokens.STAT_CARD
        case 'PROGRESS_BAR':
            return componentTokens.PROGRESS_BAR
        case 'DRAWER':
            return componentTokens.DRAWER
        case 'SINGLE_SELECT':
            return componentTokens.SINGLE_SELECT
        case 'CHARTS':
            return componentTokens.CHARTS
        case 'SNACKBAR':
            return componentTokens.SNACKBAR
        default:
            throw new Error(`Unknown component token: ${component}`)
    }
}
