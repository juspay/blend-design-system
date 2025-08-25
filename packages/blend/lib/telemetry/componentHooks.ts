/**
 * Component-specific telemetry hooks
 *
 * @fileoverview Pre-configured hooks for specific components
 * @package @juspay/blend-design-system
 */

import { useComponentPageTelemetry } from './newHooks'

/**
 * Telemetry hook specifically for Button component
 * Now uses page composition tracking for accurate adoption metrics
 *
 * @param props - All Button component props
 */
export function useButtonTelemetry(props: Record<string, unknown>) {
    return useComponentPageTelemetry('Button', props)
}

export function useButtonGroupTelemetry(props: Record<string, unknown>) {
    return useComponentPageTelemetry('ButtonGroup', props)
}

/**
 * Generic hook factory for creating component-specific telemetry hooks
 * Now uses page composition tracking instead of session-based tracking
 *
 * @param componentName - Name of the component
 * @returns Hook function for that component
 */
export function createComponentTelemetryHook(componentName: string) {
    return function useComponentSpecificTelemetry(
        props: Record<string, unknown>
    ) {
        return useComponentPageTelemetry(componentName, props)
    }
}

// Pre-configured hooks for all design system components

// Input Components (Priority 1)
export const useTextInputTelemetry = createComponentTelemetryHook('TextInput')
export const useSwitchTelemetry = createComponentTelemetryHook('Switch')
export const useCheckboxTelemetry = createComponentTelemetryHook('Checkbox')
export const useRadioTelemetry = createComponentTelemetryHook('Radio')
export const useDateRangePickerTelemetry =
    createComponentTelemetryHook('DateRangePicker')
export const useDropdownInputTelemetry =
    createComponentTelemetryHook('DropdownInput')
export const useMultiValueInputTelemetry =
    createComponentTelemetryHook('MultiValueInput')
export const useNumberInputTelemetry =
    createComponentTelemetryHook('NumberInput')
export const useOTPInputTelemetry = createComponentTelemetryHook('OTPInput')
export const useSearchInputTelemetry =
    createComponentTelemetryHook('SearchInput')
export const useTextAreaTelemetry = createComponentTelemetryHook('TextArea')
export const useUnitInputTelemetry = createComponentTelemetryHook('UnitInput')

// Select Components (Priority 1)
export const useDropdownTelemetry = createComponentTelemetryHook('Dropdown')
export const useSingleSelectTelemetry =
    createComponentTelemetryHook('SingleSelect')
export const useMultiSelectTelemetry =
    createComponentTelemetryHook('MultiSelect')
export const useSelectTelemetry = createComponentTelemetryHook('Select')

// Modal/Overlay Components (Priority 1)
export const useModalTelemetry = createComponentTelemetryHook('Modal')
export const useTooltipTelemetry = createComponentTelemetryHook('Tooltip')
export const usePopoverTelemetry = createComponentTelemetryHook('Popover')

// Data Components (Priority 2)
export const useDataTableTelemetry = createComponentTelemetryHook('DataTable')
export const useChartsTelemetry = createComponentTelemetryHook('Charts')
export const useTabsTelemetry = createComponentTelemetryHook('Tabs')
export const useAccordionTelemetry = createComponentTelemetryHook('Accordion')
export const useStatCardTelemetry = createComponentTelemetryHook('StatCard')

// Feedback Components (Priority 2)
export const useAlertTelemetry = createComponentTelemetryHook('Alert')
export const useSnackbarTelemetry = createComponentTelemetryHook('Snackbar')
export const useAvatarTelemetry = createComponentTelemetryHook('Avatar')
export const useAvatarGroupTelemetry =
    createComponentTelemetryHook('AvatarGroup')

// Layout Components (Priority 3)
export const useSidebarTelemetry = createComponentTelemetryHook('Sidebar')
export const useDrawerTelemetry = createComponentTelemetryHook('Drawer')
export const useMenuTelemetry = createComponentTelemetryHook('Menu')
export const useDirectoryTelemetry = createComponentTelemetryHook('Directory')

// UI Components (Priority 3)
export const useTagsTelemetry = createComponentTelemetryHook('Tags')
export const useSplitTagTelemetry = createComponentTelemetryHook('SplitTag')
export const useBreadcrumbTelemetry = createComponentTelemetryHook('Breadcrumb')
export const useProgressBarTelemetry =
    createComponentTelemetryHook('ProgressBar')
export const useSliderTelemetry = createComponentTelemetryHook('Slider')

// Utility function to get appropriate hook for any component
export function getTelemetryHookForComponent(componentName: string) {
    return createComponentTelemetryHook(componentName)
}
