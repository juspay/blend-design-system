import { forwardRef, useState, useMemo } from 'react'
import { SingleSelect } from '../../SingleSelect'
import { SelectMenuVariant, SelectMenuAlignment } from '../../SingleSelect'
import ButtonAccessibility from '../../Button/accessibility/ButtonAccessibility'
import CheckboxAccessibility from '../../Checkbox/accessibility/CheckboxAccessibility'
import RadioAccessibility from '../../Radio/accessibility/RadioAccessibility'

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
        name: 'Checkbox',
        displayName: 'Checkbox',
        component: CheckboxAccessibility,
    },
    {
        name: 'Radio',
        displayName: 'Radio',
        component: RadioAccessibility,
    },
    // Add more components here as they are added
    // Example:
    // {
    //     name: 'Input',
    //     displayName: 'Text Input',
    //     component: InputAccessibility,
    // },
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
