import React, { useState, useRef } from 'react'
import Menu from '../../../../packages/blend/lib/components/Menu/Menu'
import {
    MenuAlignment,
    MenuSide,
    MenuItemV2Variant,
    MenuItemV2ActionType,
} from '../../../../packages/blend/lib/components/Menu/types'
import type { MenuV2GroupType } from '../../../../packages/blend/lib/components/Menu/types'
import { Button } from '../../../../packages/blend/lib/components/Button'
import { ButtonType } from '../../../../packages/blend/lib/components/Button/types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import {
    User,
    Settings,
    LogOut,
    Edit,
    Trash2,
    Plus,
    Download,
    Share,
    FileText,
    Star,
    Heart,
    Camera,
    Video,
    Music,
    Image,
    Folder,
    Lock,
    Save,
    Printer,
    Search,
    Filter,
    ArrowUpDown,
    RefreshCw,
    Home,
    Bell,
    Globe,
    Shield,
} from 'lucide-react'

// Sample data for comprehensive testing
const basicMenuItems: MenuV2GroupType[] = [
    {
        items: [
            {
                label: 'Profile',
                slot1: <User size={16} />,
                onClick: () => console.log('Profile clicked'),
            },
            {
                label: 'Settings',
                slot1: <Settings size={16} />,
                slot2: (
                    <Text fontSize={12} color="gray">
                        ⌘,
                    </Text>
                ),
                onClick: () => console.log('Settings clicked'),
            },
            {
                label: 'Sign Out',
                slot1: <LogOut size={16} />,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.DANGER,
                onClick: () => console.log('Sign out clicked'),
            },
        ],
    },
]

const actionMenuItems: MenuV2GroupType[] = [
    {
        label: 'Primary Actions',
        items: [
            {
                label: 'Create New',
                subLabel: 'Start a new project',
                slot1: <Plus size={16} />,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.PRIMARY,
                onClick: () => console.log('Create new clicked'),
            },
            {
                label: 'Save Project',
                subLabel: 'Save current work',
                slot1: <Save size={16} />,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.PRIMARY,
                onClick: () => console.log('Save clicked'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Danger Actions',
        items: [
            {
                label: 'Delete',
                subLabel: 'Permanently remove',
                slot1: <Trash2 size={16} />,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.DANGER,
                onClick: () => console.log('Delete clicked'),
            },
            {
                label: 'Reset All',
                subLabel: 'Clear all data',
                slot1: <RefreshCw size={16} />,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.DANGER,
                onClick: () => console.log('Reset clicked'),
            },
        ],
    },
]

const nestedMenuItems: MenuV2GroupType[] = [
    {
        items: [
            {
                label: 'File Management',
                slot1: <Folder size={16} />,
                subMenu: [
                    {
                        label: 'Recent Files',
                        slot1: <FileText size={16} />,
                        onClick: () => console.log('Recent files'),
                    },
                    {
                        label: 'Import',
                        slot1: <Download size={16} />,
                        subMenu: [
                            {
                                label: 'From Computer',
                                onClick: () =>
                                    console.log('Import from computer'),
                            },
                            {
                                label: 'From Cloud',
                                onClick: () => console.log('Import from cloud'),
                            },
                            {
                                label: 'From URL',
                                onClick: () => console.log('Import from URL'),
                            },
                        ],
                    },
                    {
                        label: 'Export',
                        slot1: <Share size={16} />,
                        subMenu: [
                            {
                                label: 'As PDF',
                                onClick: () => console.log('Export as PDF'),
                            },
                            {
                                label: 'As Image',
                                onClick: () => console.log('Export as image'),
                            },
                            {
                                label: 'As Text',
                                onClick: () => console.log('Export as text'),
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Media',
                slot1: <Camera size={16} />,
                subMenu: [
                    {
                        label: 'Photos',
                        slot1: <Image size={16} />,
                        onClick: () => console.log('Photos'),
                    },
                    {
                        label: 'Videos',
                        slot1: <Video size={16} />,
                        onClick: () => console.log('Videos'),
                    },
                    {
                        label: 'Audio',
                        slot1: <Music size={16} />,
                        onClick: () => console.log('Audio'),
                    },
                ],
            },
        ],
    },
]

const searchableMenuItems: MenuV2GroupType[] = [
    {
        label: 'Navigation',
        items: [
            {
                label: 'Home',
                subLabel: 'Go to homepage',
                slot1: <Home size={16} />,
                onClick: () => console.log('Home'),
            },
            {
                label: 'Profile',
                subLabel: 'View your profile',
                slot1: <User size={16} />,
                onClick: () => console.log('Profile'),
            },
            {
                label: 'Settings',
                subLabel: 'Configure app',
                slot1: <Settings size={16} />,
                onClick: () => console.log('Settings'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Actions',
        items: [
            {
                label: 'Create Project',
                subLabel: 'Start new work',
                slot1: <Plus size={16} />,
                onClick: () => console.log('Create project'),
            },
            {
                label: 'Edit Content',
                subLabel: 'Modify existing',
                slot1: <Edit size={16} />,
                onClick: () => console.log('Edit content'),
            },
            {
                label: 'Share Items',
                subLabel: 'Send to others',
                slot1: <Share size={16} />,
                onClick: () => console.log('Share items'),
            },
            {
                label: 'Download Files',
                subLabel: 'Save locally',
                slot1: <Download size={16} />,
                onClick: () => console.log('Download files'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Tools',
        items: [
            {
                label: 'Search',
                subLabel: 'Find content',
                slot1: <Search size={16} />,
                onClick: () => console.log('Search'),
            },
            {
                label: 'Filter',
                subLabel: 'Narrow results',
                slot1: <Filter size={16} />,
                onClick: () => console.log('Filter'),
            },
            {
                label: 'Sort',
                subLabel: 'Organize items',
                slot1: <ArrowUpDown size={16} />,
                onClick: () => console.log('Sort'),
            },
            {
                label: 'Print',
                subLabel: 'Create hard copy',
                slot1: <Printer size={16} />,
                onClick: () => console.log('Print'),
            },
        ],
    },
]

const disabledMenuItems: MenuV2GroupType[] = [
    {
        label: 'Available Actions',
        items: [
            {
                label: 'Edit Profile',
                slot1: <User size={16} />,
                onClick: () => console.log('Edit profile'),
            },
            {
                label: 'View Settings',
                slot1: <Settings size={16} />,
                onClick: () => console.log('View settings'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Restricted Actions',
        items: [
            {
                label: 'Admin Panel',
                subLabel: 'Requires permissions',
                slot1: <Shield size={16} />,
                disabled: true,
                onClick: () => console.log('Should not fire'),
            },
            {
                label: 'Delete Account',
                subLabel: 'Permanent action',
                slot1: <Trash2 size={16} />,
                disabled: true,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.DANGER,
                onClick: () => console.log('Should not fire'),
            },
            {
                label: 'Locked Feature',
                subLabel: 'Coming soon',
                slot1: <Lock size={16} />,
                disabled: true,
                onClick: () => console.log('Should not fire'),
            },
        ],
    },
]

const slotVariationItems: MenuV2GroupType[] = [
    {
        label: 'Single Slot Examples',
        items: [
            {
                label: 'Only Left Icon',
                slot1: <Star size={16} />,
                onClick: () => console.log('Left icon only'),
            },
            {
                label: 'Only Right Content',
                slot2: (
                    <Text fontSize={12} color="gray">
                        ⌘K
                    </Text>
                ),
                onClick: () => console.log('Right content only'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Multiple Slot Examples',
        items: [
            {
                label: 'Left + Right',
                slot1: <Heart size={16} />,
                slot2: (
                    <Text fontSize={12} color="gray">
                        ♥
                    </Text>
                ),
                onClick: () => console.log('Left + Right'),
            },
            {
                label: 'All Four Slots',
                slot1: <Bell size={16} />,
                slot2: (
                    <Text fontSize={12} color="blue">
                        New
                    </Text>
                ),
                slot3: <Globe size={16} />,
                slot4: (
                    <Text fontSize={12} color="gray">
                        ⌘N
                    </Text>
                ),
                onClick: () => console.log('All slots'),
            },
        ],
    },
]

const longContentItems: MenuV2GroupType[] = [
    {
        label: 'Long Content Examples',
        items: [
            {
                label: 'This is a very long menu item label that demonstrates text wrapping behavior',
                subLabel:
                    'And this is an equally long subtitle that provides additional context and information about the menu item action',
                slot1: <FileText size={16} />,
                onClick: () => console.log('Long content item'),
            },
            {
                label: 'Another lengthy menu option',
                subLabel:
                    'With detailed description that explains what this action will do when selected',
                slot1: <Settings size={16} />,
                onClick: () => console.log('Another long item'),
            },
        ],
    },
]

export const MenuDemo: React.FC = () => {
    const [isModalMenuOpen, setIsModalMenuOpen] = useState(false)
    const [isControlledMenuOpen, setIsControlledMenuOpen] = useState(false)
    const boundaryRef = useRef<HTMLDivElement>(null)

    return (
        <Block padding="32px" backgroundColor="gray.50" minHeight="100vh">
            {/* Header */}
            <Block marginBottom="32px">
                <Block marginBottom="8px">
                    <Text fontSize={36} fontWeight="bold">
                        Menu Component - Complete Variations
                    </Text>
                </Block>
                <Text fontSize={16} color="gray.600">
                    Comprehensive demonstration of all Menu component features,
                    props, and variations
                </Text>
            </Block>

            {/* 1. Basic Menu Types */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        1. Basic Menu Types
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Different content structures and basic functionality
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Basic Menu"
                            />
                        }
                        items={basicMenuItems}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Action Menu"
                            />
                        }
                        items={actionMenuItems}
                    />

                    <Menu
                        trigger={<Button text="Nested Sub-menus" />}
                        items={nestedMenuItems}
                        maxWidth={280}
                    />

                    <Menu
                        trigger={<Button text="Slot Variations" />}
                        items={slotVariationItems}
                    />
                </Block>
            </Block>

            {/* 2. Alignment Variations */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        2. Alignment Options
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        How the menu aligns relative to its trigger element
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Start Aligned"
                            />
                        }
                        items={basicMenuItems}
                        alignment={MenuAlignment.START}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Center Aligned"
                            />
                        }
                        items={basicMenuItems}
                        alignment={MenuAlignment.CENTER}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="End Aligned"
                            />
                        }
                        items={basicMenuItems}
                        alignment={MenuAlignment.END}
                    />
                </Block>
            </Block>

            {/* 3. Side Positioning */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        3. Side Positioning
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Which side of the trigger the menu appears on
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={<Button text="Top Side" />}
                        items={basicMenuItems}
                        side={MenuSide.TOP}
                    />

                    <Menu
                        trigger={<Button text="Bottom Side" />}
                        items={basicMenuItems}
                        side={MenuSide.BOTTOM}
                    />

                    <Menu
                        trigger={<Button text="Left Side" />}
                        items={basicMenuItems}
                        side={MenuSide.LEFT}
                    />

                    <Menu
                        trigger={<Button text="Right Side" />}
                        items={basicMenuItems}
                        side={MenuSide.RIGHT}
                    />
                </Block>
            </Block>

            {/* 4. Size and Spacing */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        4. Size and Spacing Options
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Custom dimensions, offsets, and content sizing
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={<Button text="Custom Size" />}
                        items={actionMenuItems}
                        minWidth={320}
                        maxWidth={400}
                        maxHeight={250}
                    />

                    <Menu
                        trigger={<Button text="Compact Menu" />}
                        items={basicMenuItems}
                        minWidth={120}
                        maxWidth={180}
                    />

                    <Menu
                        trigger={<Button text="Custom Offsets" />}
                        items={basicMenuItems}
                        sideOffset={20}
                        alignOffset={15}
                    />

                    <Menu
                        trigger={<Button text="Long Content" />}
                        items={longContentItems}
                        maxWidth={400}
                    />
                </Block>
            </Block>

            {/* 5. Search Functionality */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        5. Search Functionality
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Built-in search with filtering capabilities
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Searchable Menu"
                            />
                        }
                        items={searchableMenuItems}
                        enableSearch={true}
                        searchPlaceholder="Search actions..."
                        maxHeight={400}
                        minWidth={280}
                    />

                    <Menu
                        trigger={<Button text="Custom Search Text" />}
                        items={searchableMenuItems}
                        enableSearch={true}
                        searchPlaceholder="Find what you need..."
                        maxHeight={350}
                    />
                </Block>
            </Block>

            {/* 6. Special States */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        6. Special States
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Disabled items, modal behavior, and controlled state
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Disabled Items"
                            />
                        }
                        items={disabledMenuItems}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Modal Menu"
                            />
                        }
                        items={actionMenuItems}
                        asModal={true}
                        open={isModalMenuOpen}
                        onOpenChange={setIsModalMenuOpen}
                    />

                    <Menu
                        trigger={<Button text="Controlled State" />}
                        items={basicMenuItems}
                        open={isControlledMenuOpen}
                        onOpenChange={setIsControlledMenuOpen}
                    />
                </Block>
            </Block>

            {/* 7. Edge Cases */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        7. Edge Cases
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Empty menus, single items, and boundary constraints
                    </Text>
                </Block>

                <Block
                    ref={boundaryRef}
                    display="flex"
                    gap="16px"
                    flexWrap="wrap"
                >
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.DANGER}
                                text="Empty Menu"
                            />
                        }
                        items={[]}
                    />

                    <Menu
                        trigger={<Button text="Single Item" />}
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Only Action',
                                        slot1: <Star size={16} />,
                                        onClick: () =>
                                            console.log('Single action'),
                                    },
                                ],
                            },
                        ]}
                    />

                    <Menu
                        trigger={<Button text="With Boundary" />}
                        items={actionMenuItems}
                        collisonBoundaryRef={boundaryRef.current}
                        maxHeight={200}
                    />
                </Block>
            </Block>

            {/* 8. Combined Features */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        8. Combined Features
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Multiple features working together
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Search + Custom Size"
                            />
                        }
                        items={searchableMenuItems}
                        enableSearch={true}
                        searchPlaceholder="Advanced search..."
                        minWidth={350}
                        maxWidth={450}
                        maxHeight={400}
                        sideOffset={10}
                        alignment={MenuAlignment.START}
                    />

                    <Menu
                        trigger={<Button text="Modal + Search + Actions" />}
                        items={[...actionMenuItems, ...searchableMenuItems]}
                        asModal={true}
                        enableSearch={true}
                        searchPlaceholder="Search all actions..."
                        maxHeight={500}
                        minWidth={300}
                        side={MenuSide.TOP}
                    />

                    <Menu
                        trigger={<Button text="All Features" />}
                        items={[...nestedMenuItems, ...actionMenuItems]}
                        enableSearch={true}
                        searchPlaceholder="Find anything..."
                        maxHeight={450}
                        minWidth={320}
                        maxWidth={400}
                        sideOffset={15}
                        alignOffset={5}
                        alignment={MenuAlignment.END}
                        side={MenuSide.BOTTOM}
                    />
                </Block>
            </Block>

            {/* Documentation */}
            <Block
                marginTop="48px"
                padding="32px"
                backgroundColor="white"
                borderRadius="12px"
                border="1px solid #e2e8f0"
            >
                <Block marginBottom="24px">
                    <Text fontSize={24} fontWeight="semibold">
                        Menu Component API Reference
                    </Text>
                </Block>

                <Block marginBottom="32px">
                    <Block marginBottom="16px">
                        <Text fontSize={18} fontWeight="medium">
                            Core Props
                        </Text>
                    </Block>
                    <Block marginLeft="16px">
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">trigger: ReactNode</Text>
                            <Text fontSize={14} color="gray.600">
                                The element that opens the menu when clicked
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                items: MenuV2GroupType[]
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Array of menu groups containing menu items
                            </Text>
                        </Block>
                    </Block>
                </Block>

                <Block marginBottom="32px">
                    <Block marginBottom="16px">
                        <Text fontSize={18} fontWeight="medium">
                            Positioning & Alignment
                        </Text>
                    </Block>
                    <Block marginLeft="16px">
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                alignment: MenuAlignment
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                START | CENTER | END - How menu aligns to
                                trigger
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">side: MenuSide</Text>
                            <Text fontSize={14} color="gray.600">
                                TOP | BOTTOM | LEFT | RIGHT - Which side menu
                                appears
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">sideOffset: number</Text>
                            <Text fontSize={14} color="gray.600">
                                Distance from trigger (default: 8px)
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">alignOffset: number</Text>
                            <Text fontSize={14} color="gray.600">
                                Alignment adjustment (default: 0)
                            </Text>
                        </Block>
                    </Block>
                </Block>

                <Block marginBottom="32px">
                    <Block marginBottom="16px">
                        <Text fontSize={18} fontWeight="medium">
                            Sizing & Layout
                        </Text>
                    </Block>
                    <Block marginLeft="16px">
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">maxHeight: number</Text>
                            <Text fontSize={14} color="gray.600">
                                Maximum menu height in pixels
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                minWidth / maxWidth: number
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Width constraints (default: 200-280px)
                            </Text>
                        </Block>
                    </Block>
                </Block>

                <Block marginBottom="32px">
                    <Block marginBottom="16px">
                        <Text fontSize={18} fontWeight="medium">
                            Behavior
                        </Text>
                    </Block>
                    <Block marginLeft="16px">
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">asModal: boolean</Text>
                            <Text fontSize={14} color="gray.600">
                                Opens as modal (blocks other interactions)
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                enableSearch: boolean
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Adds search input for filtering items
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                searchPlaceholder: string
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Placeholder text for search input
                            </Text>
                        </Block>
                    </Block>
                </Block>

                <Block marginBottom="32px">
                    <Block marginBottom="16px">
                        <Text fontSize={18} fontWeight="medium">
                            Menu Item Types
                        </Text>
                    </Block>
                    <Block marginLeft="16px">
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                variant: MenuItemV2Variant
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                DEFAULT | ACTION - Visual styling variant
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                actionType: MenuItemV2ActionType
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                PRIMARY | DANGER - Color scheme for actions
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">disabled: boolean</Text>
                            <Text fontSize={14} color="gray.600">
                                Disables interaction and changes visual state
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                subMenu: MenuItemV2Type[]
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Creates nested submenu (supports multiple
                                levels)
                            </Text>
                        </Block>
                    </Block>
                </Block>

                <Block>
                    <Block marginBottom="16px">
                        <Text fontSize={18} fontWeight="medium">
                            Advanced Features
                        </Text>
                    </Block>
                    <ul style={{ marginLeft: '32px', lineHeight: '1.8' }}>
                        <li>Unlimited nesting depth for submenus</li>
                        <li>
                            Real-time search filtering across all menu items
                        </li>
                        <li>Keyboard navigation support</li>
                        <li>
                            Accessibility features (ARIA labels, focus
                            management)
                        </li>
                        <li>Collision detection and automatic repositioning</li>
                        <li>
                            Support for custom slots (slot1-slot4) in menu items
                        </li>
                        <li>Group labeling and separators</li>
                        <li>Controlled and uncontrolled component patterns</li>
                    </ul>
                </Block>
            </Block>
        </Block>
    )
}

export default MenuDemo
