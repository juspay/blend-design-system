import { getAlertTokens } from '../components/Alert/alert.tokens'
import { getNumberInputTokens } from '../components/Inputs/NumberInput/numberInput.tokens'
import { getSearchInputTokens } from '../components/Inputs/SearchInput/searchInput.tokens'
import { getTextAreaTokens } from '../components/Inputs/TextArea/textarea.token'
import { getTextInputTokens } from '../components/Inputs/TextInput/textInput.tokens'
import { getTagTokens } from '../components/Tags/tag.tokens'
import { getRadioTokens } from '../components/Radio/radio.token'
import { getSwitchTokens } from '../components/Switch/switch.token'
import { getCheckboxTokens } from '../components/Checkbox/checkbox.token'
import { getTabsTokens } from '../components/Tabs/tabs.token' // Added TABS
import { type ThemeType } from '../tokens'
import { type ComponentTokenType } from './ThemeContext'
import { Theme } from './ThemeProvider'
import { getOTPInputTokens } from '../components/Inputs/OTPInput/otpInput.tokens'
import { getTooltipTokens } from '../components/Tooltip/tooltip.tokens'
import { getUnitInputTokens } from '../components/Inputs/UnitInput/unitInput.tokens'
import { getMultiValueInputTokens } from '../components/Inputs/MultiValueInput/multiValueInput.tokens'
import { getDropdownInputTokens } from '../components/Inputs/DropdownInput/dropdownInput.tokens'
import { getButtonTokens } from '../components/Button/button.tokens'
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
import { getStepperTokens } from '../components/Stepper/stepper.tokens'
import { getKeyValuePairTokens } from '../components/KeyValuePair/KeyValuePair.tokens'
import { getCardTokens } from '../components/Card/card.tokens'
import { getSkeletonTokens } from '../components/Skeleton/skeleton.tokens'
import { getTopbarTokens } from '../components/Topbar/topbar.tokens'
import { getAvatarTokens } from '../components/Avatar/avatar.tokens'
import { getAvatarGroupTokens } from '../components/AvatarGroup/avatarGroup.tokens'
import { getProgressBarTokens } from '../components/ProgressBar/progressbar.tokens'
import { getSidebarTokens } from '../components/Sidebar/sidebar.tokens'
import { getDirectoryTokens } from '../components/Directory/directory.tokens'
import { getMobileNavigationTokens } from '../components/Sidebar/SidebarMobile/mobile.tokens'
import { getUploadTokens } from '../components/Upload/upload.tokens'
import { getCodeBlockTokens } from '../components/CodeBlock/codeBlock.token'
import { getWorkflowTokens } from '../components/WorkflowCanvas/workflow.tokens'

const initTokens = (
    componentTokens: ComponentTokenType,
    foundationTokens: ThemeType,
    theme: Theme | string = Theme.LIGHT
): Required<ComponentTokenType> => {
    return {
        TAGS: componentTokens.TAGS ?? getTagTokens(foundationTokens, theme),
        SEARCH_INPUT:
            componentTokens.SEARCH_INPUT ??
            getSearchInputTokens(foundationTokens),
        TEXT_AREA:
            componentTokens.TEXT_AREA ?? getTextAreaTokens(foundationTokens),
        RADIO: componentTokens.RADIO ?? getRadioTokens(foundationTokens),
        SWITCH: componentTokens.SWITCH ?? getSwitchTokens(foundationTokens),
        TEXT_INPUT:
            componentTokens.TEXT_INPUT ?? getTextInputTokens(foundationTokens),
        NUMBER_INPUT:
            componentTokens.NUMBER_INPUT ??
            getNumberInputTokens(foundationTokens),
        ALERT: componentTokens.ALERT ?? getAlertTokens(foundationTokens),
        OTP_INPUT:
            componentTokens.OTP_INPUT ?? getOTPInputTokens(foundationTokens),
        TOOLTIP: componentTokens.TOOLTIP ?? getTooltipTokens(foundationTokens),
        UNIT_INPUT:
            componentTokens.UNIT_INPUT ?? getUnitInputTokens(foundationTokens),
        MULTI_VALUE_INPUT:
            componentTokens.MULTI_VALUE_INPUT ??
            getMultiValueInputTokens(foundationTokens),
        DROPDOWN_INPUT:
            componentTokens.DROPDOWN_INPUT ??
            getDropdownInputTokens(foundationTokens),
        CHECKBOX:
            componentTokens.CHECKBOX ?? getCheckboxTokens(foundationTokens),
        TABS: componentTokens.TABS ?? getTabsTokens(foundationTokens),
        BUTTON: componentTokens.BUTTON ?? getButtonTokens(foundationTokens),
        KEYVALUEPAIR:
            componentTokens.KEYVALUEPAIR ??
            getKeyValuePairTokens(foundationTokens),
        MODAL:
            componentTokens.MODAL ?? getModalComponentTokens(foundationTokens),
        BREADCRUMB:
            componentTokens.BREADCRUMB ?? getBreadcrumbTokens(foundationTokens),
        POPOVER: componentTokens.POPOVER ?? getPopoverTokens(foundationTokens),
        MENU: componentTokens.MENU ?? getMenuTokens(foundationTokens),
        MULTI_SELECT:
            componentTokens.MULTI_SELECT ??
            getMultiSelectTokens(foundationTokens),
        SINGLE_SELECT:
            componentTokens.SINGLE_SELECT ??
            getSingleSelectTokens(foundationTokens),
        TABLE: componentTokens.TABLE ?? getTableToken(foundationTokens),
        CALENDAR:
            componentTokens.CALENDAR ?? getCalendarToken(foundationTokens),
        ACCORDION:
            componentTokens.ACCORDION ?? getAccordionToken(foundationTokens),
        STAT_CARD:
            componentTokens.STAT_CARD ?? getStatCardToken(foundationTokens),
        PROGRESS_BAR:
            componentTokens.PROGRESS_BAR ??
            getProgressBarTokens(foundationTokens),
        DRAWER:
            componentTokens.DRAWER ??
            getDrawerComponentTokens(foundationTokens),
        CHARTS: componentTokens.CHARTS ?? getChartTokens(foundationTokens),
        SNACKBAR:
            componentTokens.SNACKBAR ?? getSnackbarTokens(foundationTokens),
        STEPPER: componentTokens.STEPPER ?? getStepperTokens(foundationTokens),
        CARD: componentTokens.CARD ?? getCardTokens(foundationTokens),
        SKELETON:
            componentTokens.SKELETON ?? getSkeletonTokens(foundationTokens),
        TOPBAR: componentTokens.TOPBAR ?? getTopbarTokens(foundationTokens),
        AVATAR: componentTokens.AVATAR ?? getAvatarTokens(foundationTokens),
        AVATAR_GROUP:
            componentTokens.AVATAR_GROUP ??
            getAvatarGroupTokens(foundationTokens),
        SIDEBAR: componentTokens.SIDEBAR ?? getSidebarTokens(foundationTokens),
        DIRECTORY:
            componentTokens.DIRECTORY ?? getDirectoryTokens(foundationTokens),
        MOBILE_NAVIGATION:
            componentTokens.MOBILE_NAVIGATION ??
            getMobileNavigationTokens(foundationTokens),
        UPLOAD: componentTokens.UPLOAD ?? getUploadTokens(foundationTokens),
        CODE_BLOCK:
            componentTokens.CODE_BLOCK ?? getCodeBlockTokens(foundationTokens),
        WORKFLOW_CANVAS:
            componentTokens.WORKFLOW_CANVAS ??
            getWorkflowTokens(foundationTokens),
    }
}

export default initTokens
