import { type ThemeType } from '../tokens'
import {
    type ComponentTokenOverrides,
    type ComponentTokenType,
} from './ThemeContext'
import { Theme } from './theme.enum'
import { getAlertTokens } from '../components/Alert/alert.tokens'
import { getNumberInputTokens } from '../components/Inputs/NumberInput/numberInput.tokens'
import { getSearchInputTokens } from '../components/Inputs/SearchInput/searchInput.tokens'
import { getTextAreaTokens } from '../components/Inputs/TextArea/textarea.token'
import { getTextInputTokens } from '../components/Inputs/TextInput/textInput.tokens'
import { getTagTokens } from '../components/Tags/tag.tokens'
import { getRadioTokens } from '../components/Radio/radio.token'
import { getSwitchTokens } from '../components/Switch/switch.token'
import { getCheckboxTokens } from '../components/Checkbox/checkbox.token'
import { getTabsTokens } from '../components/Tabs/tabs.token'
import { getOTPInputTokens } from '../components/Inputs/OTPInput/otpInput.tokens'
import { getTooltipTokens } from '../components/Tooltip/tooltip.tokens'
import { getUnitInputTokens } from '../components/Inputs/UnitInput/unitInput.tokens'
import { getMultiValueInputTokens } from '../components/Inputs/MultiValueInput/multiValueInput.tokens'
import { getDropdownInputTokens } from '../components/Inputs/DropdownInput/dropdownInput.tokens'
import { getModalComponentTokens } from '../components/Modal/modal.tokens'
import { getModalV2Tokens } from '../components/ModalV2/modalV2.tokens'
import { getBreadcrumbTokens } from '../components/Breadcrumb/breadcrumb.tokens'
import { getPopoverTokens } from '../components/Popover/popover.tokens'
import { getMenuTokens } from '../components/Menu/menu.tokens'
import { getMultiSelectTokens } from '../components/MultiSelect/multiSelect.tokens'
import { getSingleSelectTokens } from '../components/SingleSelect/singleSelect.tokens'
import { getTableToken } from '../components/DataTable/dataTable.tokens'
import { getCalendarToken } from '../components/DateRangePicker/dateRangePicker.tokens'
import { getTimePickerTokens } from '../components/TimePicker/timePicker.tokens'
import { getAccordionToken } from '../components/Accordion/accordion.tokens'
import { getStatCardToken } from '../components/StatCard/statcard.tokens'
import { getDrawerComponentTokens } from '../components/Drawer/drawer.tokens'
import { getChartTokens } from '../components/Charts/chart.tokens'
import { getSnackbarTokens } from '../components/Snackbar/snackbar.tokens'
import { getStepperTokens } from '../components/Stepper/stepper.tokens'
import { getKeyValuePairTokens } from '../components/KeyValuePair/KeyValuePair.tokens'
import { getCardTokens } from '../components/Card/card.tokens'
import { getCardV2Tokens } from '../components/CardV2/cardV2.tokens'
import { getSkeletonTokens } from '../components/Skeleton/skeleton.tokens'
import { getSpinnerTokens } from '../components/Spinner/spinner.tokens'
import { getEmptyStateTokens } from '../components/EmptyState/emptyState.tokens'
import { getTopbarTokens } from '../components/Topbar/topbar.tokens'
import { getTopbarV2Tokens } from '../components/TopbarV2/topbarV2.tokens'
import { getAvatarTokens } from '../components/Avatar/avatar.tokens'
import { getAvatarGroupTokens } from '../components/AvatarGroup/avatarGroup.tokens'
import { getProgressBarTokens } from '../components/ProgressBar/progressbar.tokens'
import { getSidebarTokens } from '../components/Sidebar/sidebar.tokens'
import { getDirectoryTokens } from '../components/Directory/directory.tokens'
import { getMobileNavigationTokens } from '../components/Sidebar/SidebarMobile/mobile.tokens'
import { getMobileNavigationV2Tokens } from '../components/SidebarV2/SidebarV2MobileNavigation/mobile.tokens'
import { getUploadTokens } from '../components/Upload/upload.tokens'
import { getCodeBlockTokens } from '../components/CodeBlock/codeBlock.token'
import getChatInputTokens from '../components/ChatInput/chatInput.tokens'
import { getButtonTokens } from '../components/Button/button.tokens'
import { getButtonV2Tokens } from '../components/ButtonV2/buttonV2.tokens'
import { getTagV2Tokens } from '../components/TagV2/tagV2.tokens'
import { getAlertV2Tokens } from '../components/AlertV2'
import { getAccordionV2Tokens } from '../components/AccordionV2'
import { getSnackbarV2Tokens } from '../components/SnackbarV2'
import { getSwitchV2Tokens } from '../components/SelectorV2/SwitchV2/switchV2.tokens'
import { getSingleSelectV2Tokens } from '../components/SingleSelectV2/singleSelectV2.tokens'
import { getMultiSelectV2Tokens } from '../components/MultiSelectV2/multiSelectV2.tokens'
import { getKeyValuePairV2Tokens } from '../components/KeyValuePairV2/keyValuePairV2.tokens'
import { getAvatarV2Tokens } from '../components/AvatarV2/avatarV2.tokens'
import { getTextInputV2Tokens } from '../components/InputsV2/TextInputV2/TextInputV2.tokens'
import { getChartV2Tokens } from '../components/ChartsV2/chartV2.tokens'
import { getTimelineTokens } from '../components/Timeline/timeline.token'
import { getCheckboxV2Tokens } from '../components/SelectorV2/CheckboxV2/checkboxV2.tokens'
import { getStatCardV2Tokens } from '../components/StatCardV2/statcardV2.tokens'
import { getTooltipV2Tokens } from '../components/TooltipV2/tooltipV2.tokens'
import { getRadioV2Tokens } from '../components/SelectorV2/RadioV2/radioV2.tokens'
import { getPopoverV2Tokens } from '../components/PopoverV2/popoverV2.token'
import { getSidebarV2Tokens } from '../components/SidebarV2/sidebarV2.tokens'
import { getTabsV2Tokens } from '../components/TabsV2/tabsV2.tokens'
import { getMenuV2Tokens } from '../components/MenuV2/menuV2.tokens'
import { getBreadcrumbV2Tokens } from '../components/BreadcrumbV2/breadcrumbV2.tokens'
import { getCodeEditorV2Tokens } from '../components/CodeEditorV2/codeEditorV2.tokens'
import { getProgressBarV2Tokens } from '../components/ProgressBarV2/progressBarV2.tokens'
import { getMultiValueInputV2Tokens } from '../components/InputsV2/MultiValueInputV2/MultiValueInputV2.tokens'
import { getNumberInputV2Tokens } from '../components/InputsV2/NumberInputV2/numberInputV2.tokens'
import { getTextAreaV2Tokens } from '../components/InputsV2/TextAreaV2/TextAreaV2.tokens'
import { getSearchInputV2Tokens } from '../components/InputsV2/SearchInputV2/SearchInputV2.tokens'
import { getOTPInputV2Tokens } from '../components/InputsV2/OTPInputV2/OTPInputV2.tokens'
import { getBadgeTokens } from '../components/Badge/badge.tokens'
import { getStepperV2Tokens } from '../components/StepperV2/stepperV2.tokens'
import { getButtonGroupTokens } from '../components/ButtonGroup/buttonGroup.tokens'

import { getChatInputV2Tokens } from '../components/InputsV2/ChatInputV2/ChatInputV2.tokens'
import { getChatInputV2MobileTokens } from '../components/InputsV2/ChatInputV2/ChatInputV2Mobile.tokens'
import { getUploadV2Tokens } from '../components/InputsV2/UploadV2/UploadV2.tokens'
import { getSliderTokens } from '../components/Slider/slider.tokens'
import { getSelectTokens } from '../components/Select/select.tokens'
import { mergeTokenTree } from './mergeTokenTree'

const mergeTokens = <T>(defaults: T, overrides: unknown): T =>
    mergeTokenTree(defaults, overrides) as T

const computeTokens = (
    componentTokens: ComponentTokenOverrides,
    foundationTokens: ThemeType,
    theme: Theme | string = Theme.LIGHT
): Required<ComponentTokenType> => {
    return {
        TAGS: mergeTokens(
            getTagTokens(foundationTokens, theme),
            componentTokens.TAGS
        ),
        SEARCH_INPUT: mergeTokens(
            getSearchInputTokens(foundationTokens),
            componentTokens.SEARCH_INPUT
        ),
        TEXT_AREA: mergeTokens(
            getTextAreaTokens(foundationTokens),
            componentTokens.TEXT_AREA
        ),
        RADIO: mergeTokens(
            getRadioTokens(foundationTokens),
            componentTokens.RADIO
        ),
        SWITCH: mergeTokens(
            getSwitchTokens(foundationTokens),
            componentTokens.SWITCH
        ),
        TEXT_INPUT: mergeTokens(
            getTextInputTokens(foundationTokens),
            componentTokens.TEXT_INPUT
        ),
        NUMBER_INPUT: mergeTokens(
            getNumberInputTokens(foundationTokens),
            componentTokens.NUMBER_INPUT
        ),
        ALERT: mergeTokens(
            getAlertTokens(foundationTokens),
            componentTokens.ALERT
        ),
        OTP_INPUT: mergeTokens(
            getOTPInputTokens(foundationTokens),
            componentTokens.OTP_INPUT
        ),
        TOOLTIP: mergeTokens(
            getTooltipTokens(foundationTokens),
            componentTokens.TOOLTIP
        ),
        UNIT_INPUT: mergeTokens(
            getUnitInputTokens(foundationTokens, theme),
            componentTokens.UNIT_INPUT
        ),
        MULTI_VALUE_INPUT: mergeTokens(
            getMultiValueInputTokens(foundationTokens),
            componentTokens.MULTI_VALUE_INPUT
        ),
        DROPDOWN_INPUT: mergeTokens(
            getDropdownInputTokens(foundationTokens, theme),
            componentTokens.DROPDOWN_INPUT
        ),
        CHECKBOX: mergeTokens(
            getCheckboxTokens(foundationTokens),
            componentTokens.CHECKBOX
        ),
        TABS: mergeTokens(
            getTabsTokens(foundationTokens),
            componentTokens.TABS
        ),
        BUTTON: mergeTokens(
            getButtonTokens(foundationTokens),
            componentTokens.BUTTON
        ),
        KEYVALUEPAIR: mergeTokens(
            getKeyValuePairTokens(foundationTokens),
            componentTokens.KEYVALUEPAIR
        ),
        MODAL: mergeTokens(
            getModalComponentTokens(foundationTokens, theme),
            componentTokens.MODAL
        ),
        MODALV2: mergeTokens(
            getModalV2Tokens(foundationTokens, theme),
            componentTokens.MODALV2
        ),
        BREADCRUMB: mergeTokens(
            getBreadcrumbTokens(foundationTokens),
            componentTokens.BREADCRUMB
        ),
        POPOVER: mergeTokens(
            getPopoverTokens(foundationTokens),
            componentTokens.POPOVER
        ),
        MENU: mergeTokens(
            getMenuTokens(foundationTokens),
            componentTokens.MENU
        ),
        MENU_V2: mergeTokens(
            getMenuV2Tokens(foundationTokens, theme),
            componentTokens.MENU_V2
        ),
        MULTI_SELECT: mergeTokens(
            getMultiSelectTokens(foundationTokens),
            componentTokens.MULTI_SELECT
        ),
        SINGLE_SELECT: mergeTokens(
            getSingleSelectTokens(foundationTokens),
            componentTokens.SINGLE_SELECT
        ),
        TABLE: mergeTokens(
            getTableToken(foundationTokens, theme),
            componentTokens.TABLE
        ),
        CALENDAR: mergeTokens(
            getCalendarToken(foundationTokens, theme),
            componentTokens.CALENDAR
        ),
        TIME_PICKER: mergeTokens(
            getTimePickerTokens(foundationTokens, theme),
            componentTokens.TIME_PICKER
        ),
        ACCORDION: mergeTokens(
            getAccordionToken(foundationTokens),
            componentTokens.ACCORDION
        ),
        STAT_CARD: mergeTokens(
            getStatCardToken(foundationTokens),
            componentTokens.STAT_CARD
        ),
        PROGRESS_BAR: mergeTokens(
            getProgressBarTokens(foundationTokens),
            componentTokens.PROGRESS_BAR
        ),
        DRAWER: mergeTokens(
            getDrawerComponentTokens(foundationTokens),
            componentTokens.DRAWER
        ),
        CHARTS: mergeTokens(
            getChartTokens(foundationTokens),
            componentTokens.CHARTS
        ),
        SNACKBAR: mergeTokens(
            getSnackbarTokens(foundationTokens),
            componentTokens.SNACKBAR
        ),
        STEPPER: mergeTokens(
            getStepperTokens(foundationTokens),
            componentTokens.STEPPER
        ),
        CARD: mergeTokens(
            getCardTokens(foundationTokens, theme),
            componentTokens.CARD
        ),
        CARDV2: mergeTokens(
            getCardV2Tokens(foundationTokens, theme),
            componentTokens.CARDV2
        ),
        SKELETON: mergeTokens(
            getSkeletonTokens(foundationTokens, theme),
            componentTokens.SKELETON
        ),
        SPINNER: mergeTokens(
            getSpinnerTokens(foundationTokens, theme),
            componentTokens.SPINNER
        ),
        EMPTY_STATE: mergeTokens(
            getEmptyStateTokens(foundationTokens, theme),
            componentTokens.EMPTY_STATE
        ),
        TOPBAR: mergeTokens(
            getTopbarTokens(foundationTokens),
            componentTokens.TOPBAR
        ),
        TOPBARV2: mergeTokens(
            getTopbarV2Tokens(foundationTokens, theme),
            componentTokens.TOPBARV2
        ),
        AVATAR: mergeTokens(
            getAvatarTokens(foundationTokens),
            componentTokens.AVATAR
        ),
        AVATAR_GROUP: mergeTokens(
            getAvatarGroupTokens(foundationTokens, theme),
            componentTokens.AVATAR_GROUP
        ),
        SIDEBAR: mergeTokens(
            getSidebarTokens(foundationTokens),
            componentTokens.SIDEBAR
        ),
        DIRECTORY: mergeTokens(
            getDirectoryTokens(foundationTokens, theme),
            componentTokens.DIRECTORY
        ),
        MOBILE_NAVIGATION: mergeTokens(
            getMobileNavigationTokens(foundationTokens, theme),
            componentTokens.MOBILE_NAVIGATION
        ),
        MOBILE_NAVIGATION_V2: mergeTokens(
            getMobileNavigationV2Tokens(foundationTokens, theme),
            componentTokens.MOBILE_NAVIGATION_V2
        ),
        UPLOAD: mergeTokens(
            getUploadTokens(foundationTokens, theme),
            componentTokens.UPLOAD
        ),
        CODE_BLOCK: mergeTokens(
            getCodeBlockTokens(foundationTokens, theme),
            componentTokens.CODE_BLOCK
        ),
        BUTTON_GROUP: mergeTokens(
            getButtonGroupTokens(foundationTokens, theme),
            componentTokens.BUTTON_GROUP
        ),
        CHAT_INPUT: mergeTokens(
            getChatInputTokens(foundationTokens),
            componentTokens.CHAT_INPUT
        ),
        CHAT_INPUTV2: mergeTokens(
            getChatInputV2Tokens(foundationTokens, theme),
            componentTokens.CHAT_INPUTV2
        ),
        CHAT_INPUTV2_MOBILE: mergeTokens(
            getChatInputV2MobileTokens(foundationTokens, theme),
            componentTokens.CHAT_INPUTV2_MOBILE
        ),
        BUTTONV2: mergeTokens(
            getButtonV2Tokens(foundationTokens, theme),
            componentTokens.BUTTONV2
        ),
        TAGV2: mergeTokens(
            getTagV2Tokens(foundationTokens, theme),
            componentTokens.TAGV2
        ),
        ALERTV2: mergeTokens(
            getAlertV2Tokens(foundationTokens, theme),
            componentTokens.ALERTV2
        ),
        ACCORDIONV2: mergeTokens(
            getAccordionV2Tokens(foundationTokens, theme),
            componentTokens.ACCORDIONV2
        ),
        SNACKBARV2: mergeTokens(
            getSnackbarV2Tokens(foundationTokens, theme),
            componentTokens.SNACKBARV2
        ),
        SWITCHV2: mergeTokens(
            getSwitchV2Tokens(foundationTokens, theme),
            componentTokens.SWITCHV2
        ),
        SINGLE_SELECT_V2: mergeTokens(
            getSingleSelectV2Tokens(foundationTokens, theme),
            componentTokens.SINGLE_SELECT_V2
        ),
        MULTI_SELECT_V2: mergeTokens(
            getMultiSelectV2Tokens(foundationTokens, theme),
            componentTokens.MULTI_SELECT_V2
        ),
        BREADCRUMBV2: mergeTokens(
            getBreadcrumbV2Tokens(foundationTokens, theme),
            componentTokens.BREADCRUMBV2
        ),
        AVATARV2: mergeTokens(
            getAvatarV2Tokens(foundationTokens, theme),
            componentTokens.AVATARV2
        ),
        TEXT_INPUTV2: mergeTokens(
            getTextInputV2Tokens(foundationTokens, theme),
            componentTokens.TEXT_INPUTV2
        ),
        TEXT_AREA_V2: mergeTokens(
            getTextAreaV2Tokens(foundationTokens, theme),
            componentTokens.TEXT_AREA_V2
        ),
        CHARTSV2: mergeTokens(
            getChartV2Tokens(foundationTokens, theme),
            componentTokens.CHARTSV2
        ),
        TIMELINE: mergeTokens(
            getTimelineTokens(foundationTokens, theme),
            componentTokens.TIMELINE
        ),
        CHECKBOXV2: mergeTokens(
            getCheckboxV2Tokens(foundationTokens, theme),
            componentTokens.CHECKBOXV2
        ),
        KEYVALUEPAIRV2: mergeTokens(
            getKeyValuePairV2Tokens(foundationTokens, theme),
            componentTokens.KEYVALUEPAIRV2
        ),
        STATCARDV2: mergeTokens(
            getStatCardV2Tokens(foundationTokens, theme),
            componentTokens.STATCARDV2
        ),
        TOOLTIPV2: mergeTokens(
            getTooltipV2Tokens(foundationTokens, theme),
            componentTokens.TOOLTIPV2
        ),
        RADIOV2: mergeTokens(
            getRadioV2Tokens(foundationTokens, theme),
            componentTokens.RADIOV2
        ),
        POPOVERV2: mergeTokens(
            getPopoverV2Tokens(foundationTokens, theme),
            componentTokens.POPOVERV2
        ),
        SIDEBARV2: mergeTokens(
            getSidebarV2Tokens(foundationTokens, theme),
            componentTokens.SIDEBARV2
        ),
        TABSV2: mergeTokens(
            getTabsV2Tokens(foundationTokens, theme),
            componentTokens.TABSV2
        ),
        CODEEDITORV2: mergeTokens(
            getCodeEditorV2Tokens(foundationTokens, theme),
            componentTokens.CODEEDITORV2
        ),
        PROGRESS_BARV2: mergeTokens(
            getProgressBarV2Tokens(foundationTokens, theme),
            componentTokens.PROGRESS_BARV2
        ),
        MULTI_VALUE_INPUT_V2: mergeTokens(
            getMultiValueInputV2Tokens(foundationTokens, theme),
            componentTokens.MULTI_VALUE_INPUT_V2
        ),
        NUMBER_INPUT_V2: mergeTokens(
            getNumberInputV2Tokens(foundationTokens, theme),
            componentTokens.NUMBER_INPUT_V2
        ),
        OTP_INPUTV2: mergeTokens(
            getOTPInputV2Tokens(foundationTokens, theme),
            componentTokens.OTP_INPUTV2
        ),
        BADGE: mergeTokens(
            getBadgeTokens(foundationTokens, theme),
            componentTokens.BADGE
        ),
        SEARCH_INPUT_V2: mergeTokens(
            getSearchInputV2Tokens(foundationTokens, theme),
            componentTokens.SEARCH_INPUT_V2
        ),
        STEPPERV2: mergeTokens(
            getStepperV2Tokens(foundationTokens, theme),
            componentTokens.STEPPERV2
        ),
        UPLOADV2: mergeTokens(
            getUploadV2Tokens(foundationTokens, theme),
            componentTokens.UPLOADV2
        ),
        SLIDER: mergeTokens(
            getSliderTokens(foundationTokens, theme),
            componentTokens.SLIDER
        ),
        SELECT: mergeTokens(
            getSelectTokens(foundationTokens, theme),
            componentTokens.SELECT
        ),
    }
}

/**
 * Resolving the full token set runs ~90 token factories, so identical inputs
 * are memoised. Object inputs are matched by reference (they are module-scope
 * singletons in practice), the theme by value. Resolved tokens are never
 * mutated by consumers, so sharing one object across mounts is safe.
 */
const NO_COMPONENT_TOKENS: ComponentTokenOverrides = {}

const tokenCache = new WeakMap<
    ThemeType,
    WeakMap<
        ComponentTokenOverrides,
        Map<Theme | string, Required<ComponentTokenType>>
    >
>()

const initTokens = (
    componentTokens: ComponentTokenOverrides,
    foundationTokens: ThemeType,
    theme: Theme | string = Theme.LIGHT
): Required<ComponentTokenType> => {
    const componentTokensKey = componentTokens ?? NO_COMPONENT_TOKENS

    let byComponentTokens = tokenCache.get(foundationTokens)
    if (!byComponentTokens) {
        byComponentTokens = new WeakMap()
        tokenCache.set(foundationTokens, byComponentTokens)
    }

    let byTheme = byComponentTokens.get(componentTokensKey)
    if (!byTheme) {
        byTheme = new Map()
        byComponentTokens.set(componentTokensKey, byTheme)
    }

    const cached = byTheme.get(theme)
    if (cached) return cached

    const resolved = computeTokens(componentTokensKey, foundationTokens, theme)
    byTheme.set(theme, resolved)
    return resolved
}

export default initTokens
