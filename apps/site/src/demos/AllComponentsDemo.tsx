import { useState } from 'react'
import { ThemeProvider } from '../../../../packages/blend/lib/context'
import ALT_FOUNDATION_TOKENS from '../themes/AIT_FOUNDATION_TOKENS'
import HDFC_COMPONENT_TOKENS from '../themes/HDFC_COMPONENT_TOKENS'

// Import key molecular components that showcase atoms
import ButtonDemo from './ButtonDemo'
import InputDemo from './TextInputDemo'
import SingleSelectDemo from './SingleSelectDemo'
import SingleSelectGroupDemo from './SingleSelectGroupDemo'
import MultiSelectGroupDemo from './MultiSelectGroupDemo'
import ModalDemo from './ModalDemo'
import DataTableDemo from './dataTableDemo'
import CardDemo from './CardDemo'

const AllComponentsDemo = () => {
    const [theme, _setTheme] = useState<'EULER' | 'JUSBIZ'>('EULER')

    const breakpoints = {
        sm: 480,
        lg: 1440,
    }

    const themeProps =
        theme === 'EULER'
            ? {}
            : {
                  foundationTokens: ALT_FOUNDATION_TOKENS,
                  componentTokens: HDFC_COMPONENT_TOKENS,
                  breakpoints: breakpoints,
              }

    const componentSections = [
        {
            title: 'Molecular Components',
            description:
                'Key components that showcase atomic design hierarchy - molecules containing atoms',
            color: '#e0f2fe',
            borderColor: '#0284c7',
            components: [
                {
                    name: 'Buttons',
                    component: <ButtonDemo />,
                    description:
                        'Atomic button elements with various states and variants',
                },
                {
                    name: 'Text Input',
                    component: <InputDemo />,
                    description:
                        'Input molecule with label, field, and validation atoms',
                },
                {
                    name: 'Single Select',
                    component: <SingleSelectDemo />,
                    description:
                        'Dropdown molecule with trigger, menu, and option atoms',
                },
                // {
                //     name: 'Single Select Group',
                //     component: <SingleSelectGroupDemo />,
                //     description:
                //         'Dropdown molecule with trigger, menu, and option atoms',
                // },
                {
                    name: 'Multi Select Group',
                    component: <MultiSelectGroupDemo />,
                    description:
                        'Dropdown molecule with trigger, menu, and option atoms',
                },
                {
                    name: 'Single Select Group',
                    component: <SingleSelectGroupDemo />,
                    description:
                        'Dropdown molecule with trigger, menu, and option atoms',
                },
                {
                    name: 'Cards',
                    component: <CardDemo />,
                    description:
                        'Card molecule containing text, button, and layout atoms',
                },
                {
                    name: 'Modal',
                    component: <ModalDemo />,
                    description:
                        'Overlay molecule with backdrop, content, and action atoms',
                },
            ],
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <ThemeProvider {...themeProps}>
                {/* Z-Index Testing Notice */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                        <h2 className="text-lg font-semibold text-blue-900 mb-2">
                            🔍 Z-Index Hierarchy Testing
                        </h2>
                        <p className="text-blue-800 text-sm mb-3">
                            This demo displays all components simultaneously to
                            test z-index hierarchy and identify potential
                            overlapping issues. Pay attention to:
                        </p>
                        <ul className="text-blue-800 text-sm space-y-1 ml-4">
                            <li>
                                • <strong>Modals</strong> should appear above
                                all other content
                            </li>
                            <li>
                                • <strong>Dropdowns/Popovers</strong> should
                                appear above cards and inputs
                            </li>
                            <li>
                                • <strong>Tooltips</strong> should appear above
                                most elements
                            </li>
                            <li>
                                • <strong>Snackbars</strong> should appear in a
                                consistent position
                            </li>
                            <li>
                                • <strong>Drawers</strong> should overlay
                                properly
                            </li>
                            <li>
                                • <strong>Sticky headers</strong> should
                                maintain proper layering
                            </li>
                        </ul>
                        <p className="text-blue-800 text-sm mt-3">
                            <strong>Test Actions:</strong> Try opening multiple
                            overlays simultaneously (modals, dropdowns,
                            popovers) to verify proper stacking order.
                        </p>
                    </div>

                    {/* Component Sections */}
                    <div className="space-y-12">
                        {componentSections.map((section, sectionIndex) => (
                            <div key={sectionIndex} className="space-y-6">
                                {/* Section Header */}
                                <div
                                    className="p-6 rounded-lg border-l-4"
                                    style={{
                                        backgroundColor: section.color,
                                        borderLeftColor: section.borderColor,
                                    }}
                                >
                                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                                        {section.title}
                                    </h2>
                                    <p className="text-gray-700 text-sm">
                                        {section.description}
                                    </p>
                                </div>

                                {/* Components Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {section.components.map(
                                        (comp, compIndex) => (
                                            <div
                                                key={compIndex}
                                                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                                            >
                                                {/* Component Header */}
                                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {comp.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {comp.description ||
                                                            `Section ${sectionIndex + 1}.${compIndex + 1} • Test overlays and interactions`}
                                                    </p>
                                                </div>

                                                {/* Component Content */}
                                                <div className="p-6">
                                                    {comp.component}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Data Table Section - Full Width */}
                        <div className="space-y-6">
                            <div
                                className="p-6 rounded-lg border-l-4"
                                style={{
                                    backgroundColor: '#f8fafc',
                                    borderLeftColor: '#475569',
                                }}
                            >
                                <h2 className="text-xl font-bold text-gray-900 mb-2">
                                    Complex Data Components
                                </h2>
                                <p className="text-gray-700 text-sm">
                                    Large, complex components that require full
                                    width display
                                </p>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Data Table
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Complex component with multiple overlays
                                        • Test dropdowns, modals, and filters
                                    </p>
                                </div>
                                <div className="p-6">
                                    <DataTableDemo />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 p-6 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            🧪 Testing Checklist
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">
                                    Overlay Components
                                </h4>
                                <ul className="space-y-1 text-gray-600">
                                    <li>□ Open multiple modals</li>
                                    <li>□ Test dropdown menus</li>
                                    <li>□ Trigger popovers</li>
                                    <li>□ Show tooltips</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">
                                    Interactive Elements
                                </h4>
                                <ul className="space-y-1 text-gray-600">
                                    <li>□ Click buttons and links</li>
                                    <li>□ Focus input fields</li>
                                    <li>□ Expand accordions</li>
                                    <li>□ Switch tabs</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-800 mb-2">
                                    Layout & Positioning
                                </h4>
                                <ul className="space-y-1 text-gray-600">
                                    <li>□ Scroll page content</li>
                                    <li>□ Resize browser window</li>
                                    <li>□ Test mobile responsiveness</li>
                                    <li>□ Check sticky positioning</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    )
}

export default AllComponentsDemo
