import React from 'react'
import { figma } from '@figma/code-connect'
import { SidebarV2 } from '@juspay/blend-design-system'
import {
    Home,
    Settings,
    Users,
    BarChart,
    CreditCard,
    Building2,
    Zap,
} from 'lucide-react'

/**
 * FIGMA CODE CONNECT FOR SIDEBARV2 COMPONENT
 *
 * PROP MAPPING DOCUMENTATION
 *
 * Figma vs Code Property Differences:
 *
 * 1. RENAMED MAPPINGS:
 *    - sidebarSecondary (Figma) → secondarySidebar (Code)
 *      - V1 used leftPanel; V2 renames it to secondarySidebar
 *      - Expects a SecondarySidebarInfo object, not a boolean
 *
 * 2. FIGMA-ONLY PROPERTIES (not needed in code):
 *    - The Figma component primarily represents visual structure;
 *      most visual states (collapsed/expanded/intermediate) map to
 *      the controlled isExpanded / defaultIsExpanded props
 *
 * 3. CODE-ONLY PROPERTIES (not in Figma):
 *    - children: Main content area
 *    - data: Directory data for navigation structure
 *    - topbar: React node for topbar content
 *    - footer: Optional footer content
 *    - sidebarTopSlot: Top slot content for sidebar
 *    - sidebarCollapseKey: Key for sidebar collapse state
 *    - merchantInfo: Merchant selector configuration
 *    - rightActions: Topbar right-side actions
 *    - isExpanded / defaultIsExpanded: Controlled/initial sidebar expansion
 *    - onExpandedChange / onSidebarStateChange: Expansion callbacks
 *    - enableIntermediateState: Hover preview from collapsed sidebar
 *    - activeItem / onActiveItemChange / defaultActiveItem: Active item control
 *    - showHierarchyLines / hierarchyLineBorderRadius: Hierarchy line styling
 *    - enableVirtualization / virtualization: Performance options
 */

figma.connect(
    SidebarV2,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/-BETA--Dashboard-Design-System?node-id=29882-13577&t=2L1Yl830ZKZjFcrt-4',
    {
        props: {
            // Map Figma state variant to defaultIsExpanded
            // - expanded → defaultIsExpanded=true
            // - collapseSidebar → defaultIsExpanded=false
            // - intermediate → defaultIsExpanded=false (hover state, not persistent)
            defaultIsExpanded: figma.enum('state', {
                expanded: true,
                collapseSidebar: false,
                intermediate: false,
            }),
        },

        example: ({ defaultIsExpanded }) => (
            <SidebarV2
                defaultIsExpanded={defaultIsExpanded}
                secondarySidebar={{
                    items: [
                        {
                            label: 'Juspay',
                            icon: <Building2 className="w-4 h-4" />,
                            value: 'juspay',
                        },
                        {
                            label: 'Hyperswitch',
                            icon: <Zap className="w-4 h-4" />,
                            value: 'hyperswitch',
                        },
                    ],
                    selected: 'juspay',
                    onSelect: (value) => console.log('Selected:', value),
                }}
                data={[
                    {
                        label: 'Dashboard',
                        items: [
                            {
                                label: 'Home',
                                leftSlot: <Home className="w-4 h-4" />,
                                onClick: () => console.log('Navigate to Home'),
                            },
                            {
                                label: 'Analytics',
                                leftSlot: <BarChart className="w-4 h-4" />,
                                onClick: () =>
                                    console.log('Navigate to Analytics'),
                            },
                        ],
                    },
                    {
                        label: 'Management',
                        items: [
                            {
                                label: 'Users',
                                leftSlot: <Users className="w-4 h-4" />,
                                onClick: () => console.log('Navigate to Users'),
                            },
                            {
                                label: 'Roles',
                                leftSlot: <Settings className="w-4 h-4" />,
                                onClick: () => console.log('Navigate to Roles'),
                            },
                        ],
                    },
                    {
                        label: 'Payments',
                        items: [
                            {
                                label: 'Transactions',
                                leftSlot: <CreditCard className="w-4 h-4" />,
                                onClick: () =>
                                    console.log('Navigate to Transactions'),
                            },
                        ],
                    },
                ]}
            >
                <div>Main content goes here</div>
            </SidebarV2>
        ),

        imports: ["import { SidebarV2 } from '@juspay/blend-design-system'"],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/SidebarV2',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-sidebarv2--docs',
            },
        ],
    }
)
