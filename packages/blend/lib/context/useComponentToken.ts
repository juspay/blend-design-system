import type { SearchInputTokensType } from '../components/Inputs/SearchInput/searchInput.tokens'
import type { TextAreaTokensType } from '../components/Inputs/TextArea/textarea.token'
import type { TagTokensType } from '../components/Tags/tag.tokens'
import type { ResponsiveRadioTokens } from '../components/Radio/radio.token'
import type { ResponsiveSwitchTokens } from '../components/Switch/switch.token'
import type { ResponsiveCheckboxTokens } from '../components/Checkbox/checkbox.token'
import type { TabsTokensType } from '../components/Tabs/tabs.token'
import { type ComponentTokenType, useTheme } from './ThemeContext'
import type { TextInputTokensType } from '../components/Inputs/TextInput/textInput.tokens'
import type { NumberInputTokensType } from '../components/Inputs/NumberInput/numberInput.tokens'
import type { AlertTokenType } from '../components/Alert/alert.tokens'
import type { OTPInputTokensType } from '../components/Inputs/OTPInput/otpInput.tokens'
import type { TooltipTokensType } from '../components/Tooltip/tooltip.tokens'
import type { UnitInputTokensType } from '../components/Inputs/UnitInput/unitInput.tokens'
import type { MultiValueInputTokensType } from '../components/Inputs/MultiValueInput/multiValueInput.tokens'
import type { DropdownInputTokensType } from '../components/Inputs/DropdownInput/dropdownInput.tokens'
import type { ResponsiveButtonTokens } from '../components/ButtonV2/button.tokens'
import type { ModalTokensType } from '../components/Modal/modal.tokens'
import type { BreadcrumbTokenType } from '../components/Breadcrumb/breadcrumb.tokens'
import type { PopoverTokenType } from '../components/Popover/popover.tokens'
import type { MenuTokensType } from '../components/Menu/menu.tokens'
import type { MultiSelectTokensType } from '../components/MultiSelect/multiSelect.tokens'
import type { TableTokenType } from '../components/DataTable/dataTable.tokens'
import type { CalendarTokenType } from '../components/DateRangePicker/dateRangePicker.tokens'
import type { AccordionTokenType } from '../components/Accordion/accordion.tokens'
import type { StatCardTokenType } from '../components/StatCard/statcard.tokens'

export const useComponentToken = (
    component: keyof ComponentTokenType
):
    | SearchInputTokensType
    | TagTokensType
    | TextAreaTokensType
    | TextInputTokensType
    | NumberInputTokensType
    | AlertTokenType
    | ResponsiveRadioTokens
    | OTPInputTokensType
    | UnitInputTokensType
    | MultiValueInputTokensType
    | ResponsiveSwitchTokens
    | ResponsiveCheckboxTokens
    | TabsTokensType
    | TooltipTokensType
    | DropdownInputTokensType
    | ResponsiveButtonTokens
    | ModalTokensType
    | BreadcrumbTokenType
    | PopoverTokenType
    | MenuTokensType
    | MultiSelectTokensType
    | TableTokenType
    | CalendarTokenType
    | AccordionTokenType
    | StatCardTokenType => {
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
        default:
            throw new Error(`Unknown component token: ${component}`)
    }
}
