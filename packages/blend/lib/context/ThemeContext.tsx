import { createContext, useContext } from 'react'
import { Theme } from './theme.enum'
import { FOUNDATION_THEME, type ThemeType } from '../tokens'
import type { ResponsiveSearchInputTokens } from '../components/Inputs/SearchInput/searchInput.tokens'
import type { ResponsiveTagTokens } from '../components/Tags/tag.tokens'
import type { ResponsiveTextAreaTokens } from '../components/Inputs/TextArea/textarea.token'
import type { ResponsiveRadioTokens } from '../components/Radio/radio.token'
import type { ResponsiveSwitchTokens } from '../components/Switch/switch.token'
import type { ResponsiveTextInputTokens } from '../components/Inputs/TextInput/textInput.tokens'
import type { ResponsiveNumberInputTokens } from '../components/Inputs/NumberInput/numberInput.tokens'
import type { ResponsiveAlertTokens } from '../components/Alert/alert.tokens'
import type { ResponsiveOTPInputTokens } from '../components/Inputs/OTPInput/otpInput.tokens'
import type { ResponsiveTooltipTokens } from '../components/Tooltip/tooltip.tokens'
import type { ResponsiveUnitInputTokens } from '../components/Inputs/UnitInput/unitInput.tokens'
import type { ResponsiveMultiValueInputTokens } from '../components/Inputs/MultiValueInput/multiValueInput.tokens'
import type { ResponsiveDropdownInputTokens } from '../components/Inputs/DropdownInput/dropdownInput.tokens'
import type { ResponsiveCheckboxTokens } from '../components/Checkbox/checkbox.token'
import type { ResponsiveTabsTokens } from '../components/Tabs/tabs.token'
import type { ResponsiveButtonTokens } from '../components/Button/button.tokens'
import type { ResponsiveButtonV2Tokens } from '../components/ButtonV2/buttonV2.tokens'
import type { ResponsiveModalTokens } from '../components/Modal/modal.tokens'
import type { ResponsiveBreadcrumbTokens } from '../components/Breadcrumb/breadcrumb.tokens'
import type { ResponsivePopoverTokens } from '../components/Popover/popover.tokens'
import type { ResponsiveMenuTokensType } from '../components/Menu/menu.tokens'
import type { ResponsiveMultiSelectTokens } from '../components/MultiSelect/multiSelect.tokens'
import type { ResponsiveSingleSelectTokens } from '../components/SingleSelect/singleSelect.tokens'
import type { ResponsiveTableTokens } from '../components/DataTable/dataTable.tokens'
import type { ResponsiveCalendarTokens } from '../components/DateRangePicker/dateRangePicker.tokens'
import type { ResponsiveAccordionTokens } from '../components/Accordion/accordion.tokens'
import type { ResponsiveStatCardTokens } from '../components/StatCard/statcard.tokens'
import {
    getProgressBarTokens,
    type ResponsiveProgressBarTokens,
} from '../components/ProgressBar/progressbar.tokens'
import type { ResponsiveDrawerTokens } from '../components/Drawer/drawer.tokens'
import type { ResponsiveChartTokens } from '../components/Charts/chart.tokens'
import type { ResponsiveSnackbarTokens } from '../components/Snackbar/snackbar.tokens'
import type { ResponsiveKeyValuePairTokens } from '../components/KeyValuePair/KeyValuePair.tokens'
import type { ResponsiveCardTokens } from '../components/Card/card.tokens'
import {
    getTopbarTokens,
    type ResponsiveTopbarTokens,
} from '../components/Topbar/topbar.tokens'
import type { ResponsiveAvatarTokens } from '../components/Avatar/avatar.tokens'
import type { ResponsiveAvatarGroupTokens } from '../components/AvatarGroup/avatarGroup.tokens'
import type { ResponsiveSidebarTokens } from '../components/Sidebar/sidebar.tokens'
import type { ResponsiveDirectoryTokens } from '../components/Directory/directory.tokens'
import type { ResponsiveUploadTokens } from '../components/Upload/upload.tokens'
import type { ResponsiveCodeBlockTokens } from '../components/CodeBlock/codeBlock.token'

import { getTagTokens } from '../components/Tags/tag.tokens'
import { getSearchInputTokens } from '../components/Inputs/SearchInput/searchInput.tokens'
import { getTextAreaTokens } from '../components/Inputs/TextArea/textarea.token'
import { getRadioTokens } from '../components/Radio/radio.token'
import { getSwitchTokens } from '../components/Switch/switch.token'
import { getTextInputTokens } from '../components/Inputs/TextInput/textInput.tokens'
import { getNumberInputTokens } from '../components/Inputs/NumberInput/numberInput.tokens'
import { getAlertTokens } from '../components/Alert/alert.tokens'
import { getOTPInputTokens } from '../components/Inputs/OTPInput/otpInput.tokens'
import { getTooltipTokens } from '../components/Tooltip/tooltip.tokens'
import { getUnitInputTokens } from '../components/Inputs/UnitInput/unitInput.tokens'
import { getMultiValueInputTokens } from '../components/Inputs/MultiValueInput/multiValueInput.tokens'
import { getDropdownInputTokens } from '../components/Inputs/DropdownInput/dropdownInput.tokens'
import { getCheckboxTokens } from '../components/Checkbox/checkbox.token'
import { getTabsTokens } from '../components/Tabs/tabs.token'
import { getButtonTokens } from '../components/Button/button.tokens'
import { getButtonV2Tokens } from '../components/ButtonV2/buttonV2.tokens'
import { getModalComponentTokens } from '../components/Modal/modal.tokens'
import { getBreadcrumbTokens } from '../components/Breadcrumb/breadcrumb.tokens'
import { getPopoverTokens } from '../components/Popover/popover.tokens'
import { getMenuTokens } from '../components/Menu/menu.tokens'
import { getMultiSelectTokens } from '../components/MultiSelect/multiSelect.tokens'
import { getSingleSelectTokens } from '../components/SingleSelect/singleSelect.tokens'
import { getTableToken } from '../components/DataTable/dataTable.tokens'
import { getCalendarToken } from '../components/DateRangePicker/dateRangePicker.tokens'
import { getAccordionToken } from '../components/Accordion/accordion.tokens'
import { getStatCardToken } from '../components/StatCard/statcard.tokens'
import { getDrawerComponentTokens } from '../components/Drawer/drawer.tokens'
import { getChartTokens } from '../components/Charts/chart.tokens'
import { getSnackbarTokens } from '../components/Snackbar/snackbar.tokens'
import { getKeyValuePairTokens } from '../components/KeyValuePair/KeyValuePair.tokens'
import { getCardTokens } from '../components/Card/card.tokens'
import {
    getSkeletonTokens,
    ResponsiveSkeletonTokens,
} from '../components/Skeleton/skeleton.tokens'
import { BREAKPOINTS } from '../breakpoints/breakPoints'
import { getAvatarTokens } from '../components/Avatar/avatar.tokens'
import { getAvatarGroupTokens } from '../components/AvatarGroup/avatarGroup.tokens'
import { getSidebarTokens } from '../components/Sidebar/sidebar.tokens'
import { getDirectoryTokens } from '../components/Directory/directory.tokens'
import {
    getMobileNavigationTokens,
    type ResponsiveMobileNavigationTokens,
} from '../components/Sidebar/SidebarMobile/mobile.tokens'
import { getUploadTokens } from '../components/Upload/upload.tokens'
import {
    getStepperTokens,
    ResponsiveStepperTokens,
} from '../components/Stepper/stepper.tokens'
import { getCodeBlockTokens } from '../components/CodeBlock/codeBlock.token'

import getChatInputTokens, {
    ResponsiveChatInputTokensType,
} from '../components/ChatInput/chatInput.tokens'
import {
    getTagV2Tokens,
    ResponsiveTagV2Tokens,
} from '../components/TagV2/tagV2.tokens'
import {
    getAlertV2Tokens,
    ResponsiveAlertV2Tokens,
} from '../components/AlertV2/alertV2.tokens'
import {
    getAccordionV2Tokens,
    ResponsiveAccordionV2Tokens,
} from '../components/AccordionV2/accordionV2.tokens'
import {
    getSnackbarV2Tokens,
    ResponsiveSnackbarV2Tokens,
} from '../components/SnackbarV2/snackbarV2.tokens'
import {
    getSwitchV2Tokens,
    ResponsiveSwitchV2Tokens,
} from '../components/SwitchV2/switchV2.tokens'
import {
    getAvatarV2Tokens,
    ResponsiveAvatarV2Tokens,
} from '../components/AvatarV2/avatarV2.tokens'
import {
    getTextInputV2Tokens,
    ResponsiveTextInputV2Tokens,
} from '../components/InputsV2/TextInputV2/TextInputV2.tokens'
import {
    getChartV2Tokens,
    ResponsiveChartV2Tokens,
} from '../components/ChartsV2/chartV2.tokens'

export type ComponentTokenType = {
    TAGS?: ResponsiveTagTokens
    SEARCH_INPUT?: ResponsiveSearchInputTokens
    TEXT_AREA?: ResponsiveTextAreaTokens
    RADIO?: ResponsiveRadioTokens
    SWITCH?: ResponsiveSwitchTokens
    TEXT_INPUT?: ResponsiveTextInputTokens
    NUMBER_INPUT?: ResponsiveNumberInputTokens
    ALERT?: ResponsiveAlertTokens
    OTP_INPUT?: ResponsiveOTPInputTokens
    TOOLTIP?: ResponsiveTooltipTokens
    UNIT_INPUT?: ResponsiveUnitInputTokens
    MULTI_VALUE_INPUT?: ResponsiveMultiValueInputTokens
    DROPDOWN_INPUT?: ResponsiveDropdownInputTokens
    CHECKBOX?: ResponsiveCheckboxTokens
    TABS?: ResponsiveTabsTokens
    BUTTON?: ResponsiveButtonTokens
    MODAL?: ResponsiveModalTokens
    BREADCRUMB?: ResponsiveBreadcrumbTokens
    POPOVER?: ResponsivePopoverTokens
    MENU?: ResponsiveMenuTokensType
    MULTI_SELECT?: ResponsiveMultiSelectTokens
    SINGLE_SELECT?: ResponsiveSingleSelectTokens
    TABLE?: ResponsiveTableTokens
    CALENDAR?: ResponsiveCalendarTokens
    ACCORDION?: ResponsiveAccordionTokens
    STAT_CARD?: ResponsiveStatCardTokens
    PROGRESS_BAR?: ResponsiveProgressBarTokens
    DRAWER?: ResponsiveDrawerTokens
    CHARTS?: ResponsiveChartTokens
    SNACKBAR?: ResponsiveSnackbarTokens
    STEPPER?: ResponsiveStepperTokens
    KEYVALUEPAIR?: ResponsiveKeyValuePairTokens
    CARD?: ResponsiveCardTokens
    SKELETON?: ResponsiveSkeletonTokens
    TOPBAR?: ResponsiveTopbarTokens
    AVATAR?: ResponsiveAvatarTokens
    AVATAR_GROUP?: ResponsiveAvatarGroupTokens
    SIDEBAR?: ResponsiveSidebarTokens
    DIRECTORY?: ResponsiveDirectoryTokens
    MOBILE_NAVIGATION?: ResponsiveMobileNavigationTokens
    UPLOAD?: ResponsiveUploadTokens
    CODE_BLOCK?: ResponsiveCodeBlockTokens
    CHAT_INPUT?: ResponsiveChatInputTokensType
    BUTTONV2?: ResponsiveButtonV2Tokens
    TAGV2?: ResponsiveTagV2Tokens
    ALERTV2?: ResponsiveAlertV2Tokens
    ACCORDIONV2?: ResponsiveAccordionV2Tokens
    SNACKBARV2?: ResponsiveSnackbarV2Tokens
    SWITCHV2?: ResponsiveSwitchV2Tokens
    AVATARV2?: ResponsiveAvatarV2Tokens
    TEXT_INPUTV2?: ResponsiveTextInputV2Tokens
    CHARTSV2?: ResponsiveChartV2Tokens
}

type ThemeContextType = {
    foundationTokens: ThemeType
    componentTokens: Required<ComponentTokenType>
    breakpoints: typeof BREAKPOINTS
    theme: Theme | string
}

const ThemeContext = createContext<ThemeContextType>({
    foundationTokens: FOUNDATION_THEME,
    componentTokens: {
        TAGS: getTagTokens(FOUNDATION_THEME, Theme.LIGHT),
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
        PROGRESS_BAR: getProgressBarTokens(FOUNDATION_THEME),
        DRAWER: getDrawerComponentTokens(FOUNDATION_THEME),
        CHARTS: getChartTokens(FOUNDATION_THEME),
        SNACKBAR: getSnackbarTokens(FOUNDATION_THEME),
        STEPPER: getStepperTokens(FOUNDATION_THEME),
        KEYVALUEPAIR: getKeyValuePairTokens(FOUNDATION_THEME),
        CARD: getCardTokens(FOUNDATION_THEME),
        TOPBAR: getTopbarTokens(FOUNDATION_THEME),
        SKELETON: getSkeletonTokens(FOUNDATION_THEME),
        AVATAR: getAvatarTokens(FOUNDATION_THEME),
        AVATAR_GROUP: getAvatarGroupTokens(FOUNDATION_THEME),
        SIDEBAR: getSidebarTokens(FOUNDATION_THEME),
        DIRECTORY: getDirectoryTokens(FOUNDATION_THEME),
        MOBILE_NAVIGATION: getMobileNavigationTokens(FOUNDATION_THEME),
        UPLOAD: getUploadTokens(FOUNDATION_THEME),
        CODE_BLOCK: getCodeBlockTokens(FOUNDATION_THEME),
        CHAT_INPUT: getChatInputTokens(FOUNDATION_THEME),
        BUTTONV2: getButtonV2Tokens(FOUNDATION_THEME),
        TAGV2: getTagV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
        ALERTV2: getAlertV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
        ACCORDIONV2: getAccordionV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
        SNACKBARV2: getSnackbarV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
        SWITCHV2: getSwitchV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
        AVATARV2: getAvatarV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
        TEXT_INPUTV2: getTextInputV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
        CHARTSV2: getChartV2Tokens(FOUNDATION_THEME, Theme.LIGHT),
    },
    breakpoints: BREAKPOINTS,
    theme: 'light',
})

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export default ThemeContext
