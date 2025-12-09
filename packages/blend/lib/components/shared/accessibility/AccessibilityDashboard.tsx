import { forwardRef, useState, useMemo } from 'react'
import { SingleSelect } from '../../SingleSelect'
import { SelectMenuVariant, SelectMenuAlignment } from '../../SingleSelect'
import ButtonAccessibility from '../../Button/accessibility/ButtonAccessibility'
import TextInputAccessibility from '../../Inputs/TextInput/accessibility/TextInputAccessibility'
import NumberInputAccessibility from '../../Inputs/NumberInput/accessibility/NumberInputAccessibility'
import UnitInputAccessibility from '../../Inputs/UnitInput/accessibility/UnitInputAccessibility'
import DropdownInputAccessibility from '../../Inputs/DropdownInput/accessibility/DropdownInputAccessibility'
import SearchInputAccessibility from '../../Inputs/SearchInput/accessibility/SearchInputAccessibility'
import OTPInputAccessibility from '../../Inputs/OTPInput/accessibility/OTPInputAccessibility'
import TextAreaAccessibility from '../../Inputs/TextArea/accessibility/TextAreaAccessibility'
import MultiValueInputAccessibility from '../../Inputs/MultiValueInput/accessibility/MultiValueInputAccessibility'
import CheckboxAccessibility from '../../Checkbox/accessibility/CheckboxAccessibility'
import RadioAccessibility from '../../Radio/accessibility/RadioAccessibility'
import SwitchAccessibility from '../../Switch/accessibility/SwitchAccessibility'
import SingleSelectAccessibility from '../../SingleSelect/accessibility/SingleSelectAccessibility'
import MultiSelectAccessibility from '../../MultiSelect/accessibility/MultiSelectAccessibility'
import StatCardAccessibility from '../../StatCard/accessibility/StatCardAccessibility'
import CardAccessibility from '../../Card/accessibility/CardAccessibility'
import ChartsAccessibility from '../../Charts/accessibility/ChartsAccessibility'
import AvatarAccessibility from '../../Avatar/accessibility/AvatarAccessibility'
import AvatarGroupAccessibility from '../../AvatarGroup/accessibility/AvatarGroupAccessibility'
import BreadcrumbAccessibility from '../../Breadcrumb/accessibility/BreadcrumbAccessibility'
import AlertAccessibility from '../../Alert/accessibility/AlertAccessibility'
import MenuAccessibility from '../../Menu/accessibility/MenuAccessibility'
import TagAccessibility from '../../Tags/accessibility/TagAccessibility'
import TooltipAccessibility from '../../Tooltip/accessibility/TooltipAccessibility'
import ModalAccessibility from '../../Modal/accessibility/ModalAccessibility'
import PopoverAccessibility from '../../Popover/accessibility/PopoverAccessibility'
import KeyValuePairAccessibility from '../../KeyValuePair/accessibility/KeyValuePairAccessibility'
import SnackbarAccessibility from '../../Snackbar/accessibility/SnackbarAccessibility'
import AccordionAccessibility from '../../Accordion/accessibility/AccordionAccessibility'
import TabsAccessibility from '../../Tabs/accessibility/TabsAccessibility'

export type ComponentAccessibilitySection = {
    name: string
    displayName: string
    component: React.ComponentType<Record<string, never>>
}

// Component registry - import all accessibility components here
const componentRegistry: ComponentAccessibilitySection[] = [
    {
        name: 'Button',
        displayName: 'Button',
        component: ButtonAccessibility,
    },
    {
        name: 'TextInput',
        displayName: 'Text Input',
        component: TextInputAccessibility,
    },
    {
        name: 'NumberInput',
        displayName: 'Number Input',
        component: NumberInputAccessibility,
    },
    {
        name: 'UnitInput',
        displayName: 'Unit Input',
        component: UnitInputAccessibility,
    },
    {
        name: 'DropdownInput',
        displayName: 'Dropdown Input',
        component: DropdownInputAccessibility,
    },
    {
        name: 'SearchInput',
        displayName: 'Search Input',
        component: SearchInputAccessibility,
    },
    {
        name: 'OTPInput',
        displayName: 'OTP Input',
        component: OTPInputAccessibility,
    },
    {
        name: 'TextArea',
        displayName: 'Text Area',
        component: TextAreaAccessibility,
    },
    {
        name: 'MultiValueInput',
        displayName: 'Multi Value Input',
        component: MultiValueInputAccessibility,
    },
    {
        name: 'Checkbox',
        displayName: 'Checkbox',
        component: CheckboxAccessibility,
    },
    {
        name: 'Radio',
        displayName: 'Radio',
        component: RadioAccessibility,
    },
    {
        name: 'Switch',
        displayName: 'Switch',
        component: SwitchAccessibility,
    },
    {
        name: 'SingleSelect',
        displayName: 'SingleSelect',
        component: SingleSelectAccessibility,
    },
    {
        name: 'MultiSelect',
        displayName: 'MultiSelect',
        component: MultiSelectAccessibility,
    },
    {
        name: 'StatCard',
        displayName: 'StatCard',
        component: StatCardAccessibility,
    },
    {
        name: 'Card',
        displayName: 'Card',
        component: CardAccessibility,
    },
    {
        name: 'Charts',
        displayName: 'Charts',
        component: ChartsAccessibility,
    },
    {
        name: 'Avatar',
        displayName: 'Avatar',
        component: AvatarAccessibility,
    },
    {
        name: 'AvatarGroup',
        displayName: 'AvatarGroup',
        component: AvatarGroupAccessibility,
    },
    {
        name: 'Breadcrumb',
        displayName: 'Breadcrumb',
        component: BreadcrumbAccessibility,
    },
    {
        name: 'Alert',
        displayName: 'Alert',
        component: AlertAccessibility,
    },
    {
        name: 'Menu',
        displayName: 'Menu',
        component: MenuAccessibility,
    },
    {
        name: 'Tag',
        displayName: 'Tag',
        component: TagAccessibility,
    },
    {
        name: 'Tooltip',
        displayName: 'Tooltip',
        component: TooltipAccessibility,
    },
    {
        name: 'Modal',
        displayName: 'Modal',
        component: ModalAccessibility,
    },
    {
        name: 'Popover',
        displayName: 'Popover',
        component: PopoverAccessibility,
    },
    {
        name: 'KeyValuePair',
        displayName: 'KeyValuePair',
        component: KeyValuePairAccessibility,
    },
    {
        name: 'Snackbar',
        displayName: 'Snackbar',
        component: SnackbarAccessibility,
    },
    {
        name: 'Accordion',
        displayName: 'Accordion',
        component: AccordionAccessibility,
    },
    {
        name: 'Tabs',
        displayName: 'Tabs',
        component: TabsAccessibility,
    },
    // Add more components here as they are added
]

export type AccessibilityDashboardProps = {
    className?: string
    defaultComponent?: string
}

const AccessibilityDashboard = forwardRef<
    HTMLDivElement,
    AccessibilityDashboardProps
>(({ className, defaultComponent = 'Button' }, ref) => {
    const [selectedComponent, setSelectedComponent] =
        useState<string>(defaultComponent)

    const selectedComponentInfo = useMemo(() => {
        return (
            componentRegistry.find((c) => c.name === selectedComponent) ||
            componentRegistry[0]
        )
    }, [selectedComponent])

    const componentOptions = useMemo(() => {
        return componentRegistry.map((component) => ({
            value: component.name,
            label: component.displayName,
        }))
    }, [])

    const ComponentSection = selectedComponentInfo?.component

    return (
        <div ref={ref} className={className}>
            <div className="space-y-6">
                {/* Component Selector */}
                {componentRegistry.length > 1 && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold">
                                Component Accessibility
                            </h2>
                            <div className="w-64">
                                <SingleSelect
                                    placeholder="Select Component"
                                    variant={SelectMenuVariant.NO_CONTAINER}
                                    alignment={SelectMenuAlignment.END}
                                    selected={selectedComponent}
                                    onSelect={(value) =>
                                        setSelectedComponent(value)
                                    }
                                    items={[
                                        {
                                            items: componentOptions,
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Render Selected Component Section */}
                {ComponentSection ? (
                    <ComponentSection />
                ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                        <p className="text-yellow-800 font-semibold mb-2">
                            No accessibility section available
                        </p>
                        <p className="text-yellow-700 text-sm">
                            Please select a component with an accessibility
                            section.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
})

AccessibilityDashboard.displayName = 'AccessibilityDashboard'

export default AccessibilityDashboard
