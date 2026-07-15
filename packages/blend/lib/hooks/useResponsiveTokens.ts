import { useContext } from 'react'
import ThemeContext, { type ComponentTokenType } from '../context/ThemeContext'
import { useBreakpoints } from './useBreakPoints'
import { useComponentToken } from '../context/useComponentToken'
import type { BreakpointType } from '../breakpoints/breakPoints'

const warnedV1Components = new Set<string>()

// Keep this map in sync with public v2 component exports in lib/main.ts.
const v1TokenReplacementMap: Partial<
    Record<keyof ComponentTokenType, { component: string; replacement: string }>
> = {
    ACCORDION: { component: 'Accordion', replacement: 'AccordionV2' },
    ALERT: { component: 'Alert', replacement: 'AlertV2' },
    AVATAR: { component: 'Avatar', replacement: 'AvatarV2' },
    BREADCRUMB: { component: 'Breadcrumb', replacement: 'BreadcrumbV2' },
    BUTTON: { component: 'Button', replacement: 'ButtonV2' },
    CARD: { component: 'Card', replacement: 'CardV2' },
    CHAT_INPUT: { component: 'ChatInput', replacement: 'ChatInputV2' },
    CHECKBOX: { component: 'Checkbox', replacement: 'CheckboxV2' },
    CHARTS: { component: 'Charts', replacement: 'ChartV2' },
    DRAWER: { component: 'Drawer', replacement: 'DrawerV2' },
    KEYVALUEPAIR: { component: 'KeyValuePair', replacement: 'KeyValuePairV2' },
    MENU: { component: 'Menu', replacement: 'MenuV2' },
    MULTI_SELECT: { component: 'MultiSelect', replacement: 'MultiSelectV2' },
    MULTI_VALUE_INPUT: {
        component: 'MultiValueInput',
        replacement: 'MultiValueInputV2',
    },
    NUMBER_INPUT: { component: 'NumberInput', replacement: 'NumberInputV2' },
    OTP_INPUT: { component: 'OTPInput', replacement: 'OTPInputV2' },
    POPOVER: { component: 'Popover', replacement: 'PopoverV2' },
    PROGRESS_BAR: { component: 'ProgressBar', replacement: 'ProgressBarV2' },
    RADIO: { component: 'Radio', replacement: 'RadioV2' },
    SEARCH_INPUT: { component: 'SearchInput', replacement: 'SearchInputV2' },
    SIDEBAR: { component: 'Sidebar', replacement: 'SidebarV2' },
    SINGLE_SELECT: { component: 'SingleSelect', replacement: 'SingleSelectV2' },
    SNACKBAR: { component: 'Snackbar', replacement: 'SnackbarV2' },
    STAT_CARD: { component: 'StatCard', replacement: 'StatCardV2' },
    STEPPER: { component: 'Stepper', replacement: 'StepperV2' },
    SWITCH: { component: 'Switch', replacement: 'SwitchV2' },
    TABS: { component: 'Tabs', replacement: 'TabsV2' },
    TAGS: { component: 'Tag', replacement: 'TagV2' },
    TEXT_AREA: { component: 'TextArea', replacement: 'TextAreaV2' },
    TEXT_INPUT: { component: 'TextInput', replacement: 'TextInputV2' },
    TOOLTIP: { component: 'Tooltip', replacement: 'TooltipV2' },
    TOPBAR: { component: 'Topbar', replacement: 'TopbarV2' },
}

const warnV1ComponentUsage = (component: string, replacement: string) => {
    if (warnedV1Components.has(component)) return

    warnedV1Components.add(component)
    console.warn(
        `[Blend] ${component} is a v1 component and will be deprecated soon. Blend v1 components will be removed soon. Please migrate to ${replacement}.`
    )
}

const warnV1TokenUsage = (component: keyof ComponentTokenType) => {
    const deprecation = v1TokenReplacementMap[component]
    if (!deprecation) return

    warnV1ComponentUsage(deprecation.component, deprecation.replacement)
}

export const useResponsiveTokens = <T>(component: keyof ComponentTokenType) => {
    const { breakpoints } = useContext(ThemeContext)
    const { breakPointLabel } = useBreakpoints(breakpoints)

    warnV1TokenUsage(component)

    const componentTokens = useComponentToken(component) as Record<
        keyof BreakpointType,
        T
    >

    if (!componentTokens) {
        throw new Error(
            `Component tokens for '${component}' are not defined. Make sure the component is properly registered in the theme provider and context.`
        )
    }

    const responsiveComponentTokens =
        componentTokens[breakPointLabel as keyof BreakpointType]

    return responsiveComponentTokens
}
