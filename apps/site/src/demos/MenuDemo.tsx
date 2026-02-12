import React, { useState, useRef } from 'react'
import Menu from '../../../../packages/blend/lib/components/Menu/Menu'
import {
    MenuAlignment,
    MenuSide,
    MenuItemVariant,
    MenuItemActionType,
} from '../../../../packages/blend/lib/components/Menu/types'
import type { MenuGroupType } from '../../../../packages/blend/lib/components/Menu/types'
import {
    TooltipSide,
    TooltipSize,
} from '../../../../packages/blend/lib/components/Tooltip/types'
import { Button } from '../../../../packages/blend/lib/components/Button'
import { ButtonType } from '../../../../packages/blend/lib/components/Button/types'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import Text from '../../../../packages/blend/lib/components/Text/Text'
import { TextInput } from '../../../../packages/blend/lib/components/Inputs/TextInput'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { Modal } from '../../../../packages/blend/lib/components/Modal'
import { Popover } from '../../../../packages/blend/lib/components/Popover'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { MultiSelect } from '../../../../packages/blend/lib/components/MultiSelect'
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
    Mail,
    Phone,
    Calendar,
    Archive,
    Copy,
    Upload,
    Database,
    Zap,
    Turtle,
    Layers,
} from 'lucide-react'

// Sample data for comprehensive testing
const basicMenuItems: MenuGroupType[] = [
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
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
                onClick: () => console.log('Sign out clicked'),
            },
        ],
    },
]

const actionMenuItems: MenuGroupType[] = [
    {
        label: 'Primary Actions',
        items: [
            {
                label: 'Create New',
                subLabel: 'Start a new project',
                slot1: <Plus size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.PRIMARY,
                onClick: () => console.log('Create new clicked'),
            },
            {
                label: 'Save Project',
                subLabel: 'Save current work',
                slot1: <Save size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.PRIMARY,
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
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
                onClick: () => console.log('Delete clicked'),
            },
            {
                label: 'Reset All',
                subLabel: 'Clear all data',
                slot1: <RefreshCw size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
                onClick: () => console.log('Reset clicked'),
            },
        ],
    },
]

const nestedMenuItems: MenuGroupType[] = [
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

const searchableMenuItems: MenuGroupType[] = [
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
                label: 'Dashboard',
                subLabel: 'View analytics',
                slot1: <User size={16} />,
                onClick: () => console.log('Dashboard'),
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
            {
                label: 'Notifications',
                subLabel: 'View alerts',
                slot1: <Bell size={16} />,
                onClick: () => console.log('Notifications'),
            },
            {
                label: 'Help Center',
                subLabel: 'Get support',
                slot1: <Globe size={16} />,
                onClick: () => console.log('Help Center'),
            },
            {
                label: 'Documentation',
                subLabel: 'Read guides',
                slot1: <FileText size={16} />,
                onClick: () => console.log('Documentation'),
            },
            {
                label: 'API Reference',
                subLabel: 'Developer docs',
                slot1: <FileText size={16} />,
                onClick: () => console.log('API Reference'),
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
                label: 'Create Template',
                subLabel: 'Reusable structure',
                slot1: <Plus size={16} />,
                onClick: () => console.log('Create template'),
            },
            {
                label: 'Create Workspace',
                subLabel: 'Team collaboration',
                slot1: <Plus size={16} />,
                onClick: () => console.log('Create workspace'),
            },
            {
                label: 'Edit Content',
                subLabel: 'Modify existing',
                slot1: <Edit size={16} />,
                onClick: () => console.log('Edit content'),
            },
            {
                label: 'Edit Profile',
                subLabel: 'Update information',
                slot1: <Edit size={16} />,
                onClick: () => console.log('Edit profile'),
            },
            {
                label: 'Edit Settings',
                subLabel: 'Change preferences',
                slot1: <Edit size={16} />,
                onClick: () => console.log('Edit settings'),
            },
            {
                label: 'Share Items',
                subLabel: 'Send to others',
                slot1: <Share size={16} />,
                onClick: () => console.log('Share items'),
            },
            {
                label: 'Share Workspace',
                subLabel: 'Invite team members',
                slot1: <Share size={16} />,
                onClick: () => console.log('Share workspace'),
            },
            {
                label: 'Share Link',
                subLabel: 'Generate public link',
                slot1: <Share size={16} />,
                onClick: () => console.log('Share link'),
            },
            {
                label: 'Download Files',
                subLabel: 'Save locally',
                slot1: <Download size={16} />,
                onClick: () => console.log('Download files'),
            },
            {
                label: 'Download Backup',
                subLabel: 'Export all data',
                slot1: <Download size={16} />,
                onClick: () => console.log('Download backup'),
            },
            {
                label: 'Download Report',
                subLabel: 'Generate analytics',
                slot1: <Download size={16} />,
                onClick: () => console.log('Download report'),
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
                label: 'Advanced Search',
                subLabel: 'Complex queries',
                slot1: <Search size={16} />,
                onClick: () => console.log('Advanced Search'),
            },
            {
                label: 'Global Search',
                subLabel: 'Search everywhere',
                slot1: <Search size={16} />,
                onClick: () => console.log('Global Search'),
            },
            {
                label: 'Filter',
                subLabel: 'Narrow results',
                slot1: <Filter size={16} />,
                onClick: () => console.log('Filter'),
            },
            {
                label: 'Advanced Filter',
                subLabel: 'Multiple criteria',
                slot1: <Filter size={16} />,
                onClick: () => console.log('Advanced Filter'),
            },
            {
                label: 'Sort',
                subLabel: 'Organize items',
                slot1: <ArrowUpDown size={16} />,
                onClick: () => console.log('Sort'),
            },
            {
                label: 'Sort by Date',
                subLabel: 'Chronological order',
                slot1: <ArrowUpDown size={16} />,
                onClick: () => console.log('Sort by Date'),
            },
            {
                label: 'Sort by Name',
                subLabel: 'Alphabetical order',
                slot1: <ArrowUpDown size={16} />,
                onClick: () => console.log('Sort by Name'),
            },
            {
                label: 'Sort by Size',
                subLabel: 'File size order',
                slot1: <ArrowUpDown size={16} />,
                onClick: () => console.log('Sort by Size'),
            },
            {
                label: 'Print',
                subLabel: 'Create hard copy',
                slot1: <Printer size={16} />,
                onClick: () => console.log('Print'),
            },
            {
                label: 'Print Preview',
                subLabel: 'Check before printing',
                slot1: <Printer size={16} />,
                onClick: () => console.log('Print Preview'),
            },
            {
                label: 'Print Settings',
                subLabel: 'Configure printer',
                slot1: <Printer size={16} />,
                onClick: () => console.log('Print Settings'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Media & Files',
        items: [
            {
                label: 'Upload Image',
                subLabel: 'Add photos',
                slot1: <Image size={16} />,
                onClick: () => console.log('Upload Image'),
            },
            {
                label: 'Upload Video',
                subLabel: 'Add videos',
                slot1: <Video size={16} />,
                onClick: () => console.log('Upload Video'),
            },
            {
                label: 'Upload Audio',
                subLabel: 'Add music',
                slot1: <Music size={16} />,
                onClick: () => console.log('Upload Audio'),
            },
            {
                label: 'Upload Document',
                subLabel: 'Add files',
                slot1: <FileText size={16} />,
                onClick: () => console.log('Upload Document'),
            },
            {
                label: 'Manage Gallery',
                subLabel: 'Organize media',
                slot1: <Camera size={16} />,
                onClick: () => console.log('Manage Gallery'),
            },
            {
                label: 'Media Library',
                subLabel: 'Browse all media',
                slot1: <Folder size={16} />,
                onClick: () => console.log('Media Library'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Security & Privacy',
        items: [
            {
                label: 'Security Settings',
                subLabel: 'Manage security',
                slot1: <Shield size={16} />,
                onClick: () => console.log('Security Settings'),
            },
            {
                label: 'Privacy Controls',
                subLabel: 'Data protection',
                slot1: <Lock size={16} />,
                onClick: () => console.log('Privacy Controls'),
            },
            {
                label: 'Two-Factor Auth',
                subLabel: 'Extra security',
                slot1: <Shield size={16} />,
                onClick: () => console.log('Two-Factor Auth'),
            },
            {
                label: 'Password Manager',
                subLabel: 'Secure passwords',
                slot1: <Lock size={16} />,
                onClick: () => console.log('Password Manager'),
            },
            {
                label: 'Activity Log',
                subLabel: 'View login history',
                slot1: <FileText size={16} />,
                onClick: () => console.log('Activity Log'),
            },
        ],
    },
]

const disabledMenuItems: MenuGroupType[] = [
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
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
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

const slotVariationItems: MenuGroupType[] = [
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

const longContentItems: MenuGroupType[] = [
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

const tooltipMenuItems: MenuGroupType[] = [
    {
        label: 'Basic Tooltips',
        items: [
            {
                label: 'Profile Settings',
                slot1: <User size={16} />,
                onClick: () => console.log('Profile settings'),
                tooltip: 'Manage your account and preferences',
                tooltipProps: {
                    side: TooltipSide.RIGHT,
                    size: TooltipSize.LARGE,
                },
            },
            {
                label: 'Security',
                slot1: <Shield size={16} />,
                onClick: () => console.log('Security'),
                tooltip: 'Configure privacy and security settings',
                tooltipProps: {
                    side: TooltipSide.RIGHT,
                    size: TooltipSize.LARGE,
                },
            },
            {
                label: 'Notifications',
                slot1: <Bell size={16} />,
                onClick: () => console.log('Notifications'),
                tooltip: (
                    <div>
                        <strong>Notification Settings</strong>
                        <br />
                        • Email alerts
                        <br />
                        • Push notifications
                        <br />• SMS updates
                    </div>
                ),
                tooltipProps: {
                    side: TooltipSide.RIGHT,
                    size: TooltipSize.LARGE,
                },
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Advanced Tooltips',
        items: [
            {
                label: 'Data Export',
                subLabel: 'Export your data',
                slot1: <Download size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.PRIMARY,
                onClick: () => console.log('Data export'),
                tooltip:
                    'Download all your data in various formats (JSON, CSV, PDF)',
                tooltipProps: {
                    side: TooltipSide.RIGHT,
                    size: TooltipSize.LARGE,
                },
            },
            {
                label: 'Delete Account',
                subLabel: 'Permanently remove',
                slot1: <Trash2 size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
                onClick: () => console.log('Delete account'),
                tooltip: 'All your data will be permanently deleted',
                tooltipProps: {
                    side: TooltipSide.RIGHT,
                    size: TooltipSize.LARGE,
                },
            },
        ],
    },
]

export const MenuDemo: React.FC = () => {
    const [isModalMenuOpen, setIsModalMenuOpen] = useState(false)
    const [isControlledMenuOpen, setIsControlledMenuOpen] = useState(false)
    const [isModalWithDropdownOpen, setIsModalWithDropdownOpen] =
        useState(false)
    const [isPopoverWithDropdownOpen, setIsPopoverWithDropdownOpen] =
        useState(false)
    const [modalSingleSelectValue, setModalSingleSelectValue] = useState('')
    const [modalMultiSelectValues, setModalMultiSelectValues] = useState<
        string[]
    >([])
    const [popoverSingleSelectValue, setPopoverSingleSelectValue] = useState('')
    const [popoverMultiSelectValues, setPopoverMultiSelectValues] = useState<
        string[]
    >([])
    const boundaryRef = useRef<HTMLDivElement>(null)

    // Playground state
    const [playgroundAlignment, setPlaygroundAlignment] =
        useState<MenuAlignment>(MenuAlignment.CENTER)
    const [playgroundSide, setPlaygroundSide] = useState<MenuSide>(
        MenuSide.BOTTOM
    )
    const [playgroundMaxHeight, setPlaygroundMaxHeight] = useState(400)
    const [playgroundMinWidth, setPlaygroundMinWidth] = useState(200)
    const [playgroundMaxWidth, setPlaygroundMaxWidth] = useState(280)
    const [playgroundSideOffset, setPlaygroundSideOffset] = useState(8)
    const [playgroundAlignOffset, setPlaygroundAlignOffset] = useState(0)
    const [playgroundEnableSearch, setPlaygroundEnableSearch] = useState(false)
    const [playgroundSearchPlaceholder, setPlaygroundSearchPlaceholder] =
        useState('Search actions...')
    const [playgroundAsModal, setPlaygroundAsModal] = useState(false)

    const [playgroundShowSkeleton, setPlaygroundShowSkeleton] = useState(false)
    const [playgroundSkeletonCount, setPlaygroundSkeletonCount] = useState('3')

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

            {/* Playground Section */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        Menu Playground
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Test and adjust Menu component props interactively
                    </Text>
                </Block>

                <Block display="flex" gap="32px" flexWrap="wrap">
                    {/* Controls */}
                    <Block
                        width="400px"
                        display="flex"
                        flexDirection="column"
                        gap="16px"
                    >
                        <Text fontSize={18} fontWeight="medium">
                            Controls
                        </Text>

                        <Block display="flex" gap="16px">
                            <TextInput
                                label="Max Height"
                                type="number"
                                value={playgroundMaxHeight.toString()}
                                onChange={(e) =>
                                    setPlaygroundMaxHeight(
                                        Number(e.target.value)
                                    )
                                }
                                placeholder="400"
                            />
                            <TextInput
                                label="Min Width"
                                type="number"
                                value={playgroundMinWidth.toString()}
                                onChange={(e) =>
                                    setPlaygroundMinWidth(
                                        Number(e.target.value)
                                    )
                                }
                                placeholder="200"
                            />
                        </Block>

                        <Block display="flex" gap="16px">
                            <Switch
                                label="Show Skeleton"
                                checked={playgroundShowSkeleton}
                                onChange={() =>
                                    setPlaygroundShowSkeleton(
                                        !playgroundShowSkeleton
                                    )
                                }
                            />
                            <TextInput
                                label="Skeleton Count"
                                value={playgroundSkeletonCount.toString()}
                                onChange={(e) =>
                                    setPlaygroundSkeletonCount(e.target.value)
                                }
                                placeholder="Enter skeleton count"
                            />
                        </Block>

                        <Block display="flex" gap="16px">
                            <TextInput
                                label="Max Width"
                                type="number"
                                value={playgroundMaxWidth.toString()}
                                onChange={(e) =>
                                    setPlaygroundMaxWidth(
                                        Number(e.target.value)
                                    )
                                }
                                placeholder="280"
                            />
                            <TextInput
                                label="Side Offset"
                                type="number"
                                value={playgroundSideOffset.toString()}
                                onChange={(e) =>
                                    setPlaygroundSideOffset(
                                        Number(e.target.value)
                                    )
                                }
                                placeholder="8"
                            />
                        </Block>

                        <TextInput
                            label="Align Offset"
                            type="number"
                            value={playgroundAlignOffset.toString()}
                            onChange={(e) =>
                                setPlaygroundAlignOffset(Number(e.target.value))
                            }
                            placeholder="0"
                        />

                        <TextInput
                            label="Search Placeholder"
                            value={playgroundSearchPlaceholder}
                            onChange={(e) =>
                                setPlaygroundSearchPlaceholder(e.target.value)
                            }
                            placeholder="Search actions..."
                        />

                        <Block display="flex" gap="16px">
                            <Switch
                                label="Enable Search"
                                checked={playgroundEnableSearch}
                                onChange={setPlaygroundEnableSearch}
                            />
                            <Switch
                                label="As Modal"
                                checked={playgroundAsModal}
                                onChange={setPlaygroundAsModal}
                            />
                        </Block>

                        <Block marginBottom="8px">
                            <Text fontSize={14} fontWeight="medium">
                                Alignment
                            </Text>
                        </Block>
                        <Block display="flex" gap="8px">
                            <Button
                                text="Start"
                                buttonType={
                                    playgroundAlignment === MenuAlignment.START
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                onClick={() =>
                                    setPlaygroundAlignment(MenuAlignment.START)
                                }
                            />
                            <Button
                                text="Center"
                                buttonType={
                                    playgroundAlignment === MenuAlignment.CENTER
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                onClick={() =>
                                    setPlaygroundAlignment(MenuAlignment.CENTER)
                                }
                            />
                            <Button
                                text="End"
                                buttonType={
                                    playgroundAlignment === MenuAlignment.END
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                onClick={() =>
                                    setPlaygroundAlignment(MenuAlignment.END)
                                }
                            />
                        </Block>

                        <Block marginBottom="8px">
                            <Text fontSize={14} fontWeight="medium">
                                Side
                            </Text>
                        </Block>
                        <Block display="flex" gap="8px" flexWrap="wrap">
                            <Button
                                text="Top"
                                buttonType={
                                    playgroundSide === MenuSide.TOP
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                onClick={() => setPlaygroundSide(MenuSide.TOP)}
                            />
                            <Button
                                text="Bottom"
                                buttonType={
                                    playgroundSide === MenuSide.BOTTOM
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                onClick={() =>
                                    setPlaygroundSide(MenuSide.BOTTOM)
                                }
                            />
                            <Button
                                text="Left"
                                buttonType={
                                    playgroundSide === MenuSide.LEFT
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                onClick={() => setPlaygroundSide(MenuSide.LEFT)}
                            />
                            <Button
                                text="Right"
                                buttonType={
                                    playgroundSide === MenuSide.RIGHT
                                        ? ButtonType.PRIMARY
                                        : ButtonType.SECONDARY
                                }
                                onClick={() =>
                                    setPlaygroundSide(MenuSide.RIGHT)
                                }
                            />
                        </Block>
                    </Block>

                    {/* Preview */}
                    <Block width="400px">
                        <Block marginBottom="16px">
                            <Text fontSize={18} fontWeight="medium">
                                Preview
                            </Text>
                        </Block>

                        <Block
                            padding="24px"
                            backgroundColor="white"
                            borderRadius="8px"
                            border="1px solid #e2e8f0"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="200px"
                        >
                            <Menu
                                trigger={
                                    <Button
                                        data-selectbox-value="Interactive Menu"
                                        data-dropdown-for="Interactive Menu"
                                        data-value="Interactive Menu"
                                        data-custom-value="Interactive Menu"
                                        data-button-status="enabled"
                                        buttonType={ButtonType.PRIMARY}
                                        text="Interactive Menu"
                                    />
                                }
                                items={searchableMenuItems}
                                alignment={playgroundAlignment}
                                side={playgroundSide}
                                maxHeight={playgroundMaxHeight}
                                minWidth={playgroundMinWidth}
                                maxWidth={playgroundMaxWidth}
                                sideOffset={playgroundSideOffset}
                                alignOffset={playgroundAlignOffset}
                                enableSearch={playgroundEnableSearch}
                                searchPlaceholder={playgroundSearchPlaceholder}
                                asModal={playgroundAsModal}
                                skeleton={{
                                    count: parseInt(playgroundSkeletonCount),
                                    show: playgroundShowSkeleton,
                                    variant: 'pulse',
                                }}
                            />
                        </Block>

                        <Block
                            marginTop="16px"
                            padding="12px"
                            backgroundColor="blue.50"
                            borderRadius="6px"
                        >
                            <Text
                                fontSize={14}
                                fontWeight="medium"
                                color="blue.700"
                            >
                                Current Settings:
                            </Text>
                            <Text fontSize={12} color="blue.600">
                                Alignment: {playgroundAlignment} | Side:{' '}
                                {playgroundSide} | Search:{' '}
                                {playgroundEnableSearch
                                    ? 'Enabled'
                                    : 'Disabled'}{' '}
                                | Modal: {playgroundAsModal ? 'Yes' : 'No'}
                            </Text>
                        </Block>
                    </Block>
                </Block>
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

            {/* 5.3. Submenu Virtual Scrolling Demo - PERFORMANCE FIX */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        🚀 5.3. Submenu Virtual Scrolling - Performance Fix
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        NEW FEATURE: Virtual scrolling for large nested submenus
                        with instant opening time (1000+ items)
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="🚀 Huge Submenu (500 items + Search)"
                            />
                        }
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Large Dataset Submenu',
                                        subLabel: 'Click to test performance',
                                        slot1: <Database size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Search 500 items...',
                                        enableSubMenuVirtualScrolling: true,
                                        subMenuVirtualItemHeight: 45,
                                        subMenuVirtualOverscan: 10,
                                        subMenuVirtualScrollThreshold: 20,
                                        subMenu: Array.from(
                                            { length: 500 },
                                            (_, i) => ({
                                                label: `Item ${i + 1} - ${
                                                    i % 3 === 0
                                                        ? 'Category A'
                                                        : i % 3 === 1
                                                          ? 'Category B'
                                                          : 'Category C'
                                                }`,
                                                subLabel: `Submenu item ${
                                                    i + 1
                                                } of 500 with detailed description`,
                                                slot1:
                                                    i % 3 === 0 ? (
                                                        <FileText size={16} />
                                                    ) : i % 3 === 1 ? (
                                                        <Edit size={16} />
                                                    ) : (
                                                        <Star size={16} />
                                                    ),
                                                onClick: () =>
                                                    console.log(
                                                        `Submenu item ${i + 1}`
                                                    ),
                                            })
                                        ),
                                    },
                                ],
                            },
                        ]}
                        maxHeight={450}
                        maxWidth={380}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="⚡ Ultra Fast (1000 items + Search)"
                            />
                        }
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Massive List Submenu',
                                        subLabel: 'Performance optimized',
                                        slot1: <Zap size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Find in 1000 items...',
                                        enableSubMenuVirtualScrolling: true,
                                        subMenuVirtualItemHeight: 40,
                                        subMenuVirtualOverscan: 15,
                                        subMenuVirtualScrollThreshold: 10,
                                        subMenu: Array.from(
                                            { length: 1000 },
                                            (_, i) => ({
                                                label: `Quick Access ${i + 1}`,
                                                subLabel: `Fast virtual scrolling item ${i + 1}`,
                                                slot1:
                                                    i % 2 === 0 ? (
                                                        <Settings size={16} />
                                                    ) : (
                                                        <Folder size={16} />
                                                    ),
                                                onClick: () =>
                                                    console.log(
                                                        `Quick access ${i + 1}`
                                                    ),
                                            })
                                        ),
                                    },
                                ],
                            },
                        ]}
                        maxHeight={400}
                        maxWidth={360}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.DANGER}
                                text="🐌 Without Virtual Scrolling (100 items) - SLOW!"
                            />
                        }
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Regular Submenu',
                                        subLabel: 'Without optimization',
                                        slot1: <Turtle size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Search (slow)...',
                                        enableSubMenuVirtualScrolling: false,
                                        subMenu: Array.from(
                                            { length: 100 },
                                            (_, i) => ({
                                                label: `Slow Item ${i + 1}`,
                                                subLabel: `Regular rendering ${i + 1}/100`,
                                                slot1: <FileText size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        `Slow item ${i + 1}`
                                                    ),
                                            })
                                        ),
                                    },
                                ],
                            },
                        ]}
                        maxHeight={350}
                        maxWidth={340}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SUCCESS}
                                text="📊 Dynamic Heights (300 items + Search)"
                            />
                        }
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Variable Height Submenu',
                                        subLabel: 'Supports different sizes',
                                        slot1: <Layers size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Search dynamic list...',
                                        enableSubMenuVirtualScrolling: true,
                                        subMenuVirtualItemHeight: 50,
                                        subMenuVirtualOverscan: 8,
                                        subMenuVirtualScrollThreshold: 15,
                                        subMenu: Array.from(
                                            { length: 300 },
                                            (_, i) => ({
                                                label: `Dynamic Item ${i + 1}`,
                                                subLabel:
                                                    i % 4 === 0
                                                        ? `This is a very long description for item ${i + 1} that demonstrates how virtual scrolling handles variable heights gracefully`
                                                        : i % 4 === 1
                                                          ? `Medium length description for item ${i + 1}`
                                                          : `Short ${i + 1}`,
                                                slot1:
                                                    i % 4 === 0 ? (
                                                        <FileText size={16} />
                                                    ) : i % 4 === 1 ? (
                                                        <Edit size={16} />
                                                    ) : i % 4 === 2 ? (
                                                        <Star size={16} />
                                                    ) : (
                                                        <Heart size={16} />
                                                    ),
                                                onClick: () =>
                                                    console.log(
                                                        `Dynamic ${i + 1}`
                                                    ),
                                            })
                                        ),
                                    },
                                ],
                            },
                        ]}
                        maxHeight={420}
                        maxWidth={400}
                    />
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="green.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="green.700"
                        >
                            🚀 Performance Improvement Summary:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="green.600" lineHeight="1.6">
                        <strong>Problem Solved:</strong> Submenus with large
                        lists took time to open because all DOM nodes were
                        rendered upfront.
                        <br />
                        <strong>Solution:</strong> Virtual scrolling only
                        renders visible items (~20 items instead of 500/1000+).
                        <br />
                        <strong>Result:</strong> Submenus now open instantly,
                        regardless of dataset size.
                        <br />
                        <strong>Works With:</strong> Search functionality,
                        nested submenus, all existing features.
                    </Text>
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="blue.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="blue.700"
                        >
                            ⚙️ Configuration Props:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="blue.600" lineHeight="1.6">
                        • <strong>enableSubMenuVirtualScrolling:</strong>{' '}
                        Enable/disable virtual scrolling for submenu
                        <br />• <strong>subMenuVirtualItemHeight:</strong> Fixed
                        item height (default: 40px)
                        <br />• <strong>subMenuVirtualOverscan:</strong> Extra
                        items to render for smooth scroll (default: 5)
                        <br />• <strong>
                            subMenuVirtualScrollThreshold:
                        </strong>{' '}
                        Minimum items to activate (default: 50)
                        <br />• <strong>enableSubMenuSearch:</strong> Search
                        works seamlessly with virtual scrolling
                        <br />• <strong>subMenuSearchPlaceholder:</strong>{' '}
                        Custom placeholder text
                    </Text>
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="orange.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="orange.700"
                        >
                            🧪 How to Test:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="orange.600" lineHeight="1.6">
                        1. Click "🚀 Huge Submenu (500 items + Search)" - notice
                        instant opening
                        <br />
                        2. Hover over "Large Dataset Submenu" - submenu opens
                        instantly
                        <br />
                        3. Type in search box - instant filtering through 500
                        items
                        <br />
                        4. Compare with "🐌 Without Virtual Scrolling" - notice
                        the delay
                        <br />
                        5. Try "⚡ Ultra Fast (1000 items)" - still instant!
                        <br />
                        6. Test "📊 Dynamic Heights" - different item sizes work
                        perfectly
                    </Text>
                </Block>
            </Block>

            {/* 5.1. Virtual Scrolling Demo - NEW FEATURE */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        🚀 5.1. Virtual Scrolling Performance Demo
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        NEW FEATURE: High-performance virtual scrolling for
                        large datasets (1000+ items)
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="🎯 Virtual List (1000 items)"
                            />
                        }
                        items={[
                            {
                                label: 'Large Dataset Performance Test',
                                items: Array.from({ length: 1000 }, (_, i) => ({
                                    label: `Performance Item ${i + 1}`,
                                    subLabel: `Item ${i + 1} of 1000 - Virtual scrolling demo`,
                                    slot1: <FileText size={16} />,
                                    onClick: () =>
                                        console.log(`Clicked item ${i + 1}`),
                                })),
                            },
                        ]}
                        enableVirtualScrolling={true}
                        virtualItemHeight={50}
                        virtualScrollThreshold={50}
                        virtualOverscan={10}
                        maxHeight={400}
                        enableSearch={true}
                        searchPlaceholder="Search 1000 items..."
                        minWidth={350}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="📊 Dynamic Heights (500 items)"
                            />
                        }
                        items={[
                            {
                                label: 'Dynamic Height Test',
                                items: Array.from({ length: 500 }, (_, i) => ({
                                    label: `Dynamic Item ${i + 1}`,
                                    subLabel:
                                        i % 3 === 0
                                            ? `Long description for item ${i + 1} that demonstrates variable height content in virtual scrolling`
                                            : i % 3 === 1
                                              ? `Medium description for item ${i + 1}`
                                              : `Short ${i + 1}`,
                                    slot1: <Settings size={16} />,
                                    onClick: () =>
                                        console.log(`Dynamic item ${i + 1}`),
                                })),
                            },
                        ]}
                        enableVirtualScrolling={true}
                        virtualItemHeight={(item) => {
                            const subLabelLength = item.subLabel?.length || 0
                            return subLabelLength > 80
                                ? 70
                                : subLabelLength > 40
                                  ? 55
                                  : 45
                        }}
                        virtualScrollThreshold={20}
                        virtualOverscan={5}
                        maxHeight={350}
                        enableSearch={true}
                        searchPlaceholder="Search dynamic heights..."
                        minWidth={380}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SUCCESS}
                                text="⚡ Virtual List (2000 items)"
                            />
                        }
                        items={[
                            {
                                label: 'Virtual Scrolling (Fast)',
                                items: Array.from({ length: 2000 }, (_, i) => ({
                                    label: `Fast Item ${i + 1}`,
                                    subLabel: `Optimized virtual rendering ${i + 1}/2000`,
                                    slot1: <Star size={16} />,
                                    onClick: () =>
                                        console.log(`Fast item ${i + 1}`),
                                })),
                            },
                        ]}
                        enableVirtualScrolling={true}
                        virtualItemHeight={42}
                        virtualScrollThreshold={10}
                        virtualOverscan={15}
                        maxHeight={450}
                        enableSearch={true}
                        searchPlaceholder="Search 2000 items instantly..."
                        minWidth={320}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.DANGER}
                                text="🐌 Regular List (1000 items) - SLOW!"
                            />
                        }
                        items={[
                            {
                                label: 'Regular Scrolling (Slow)',
                                items: Array.from({ length: 1000 }, (_, i) => ({
                                    label: `Slow Item ${i + 1}`,
                                    subLabel: `Regular rendering ${i + 1}/1000 - DOM heavy`,
                                    slot1: <Settings size={16} />,
                                    onClick: () =>
                                        console.log(`Slow item ${i + 1}`),
                                })),
                            },
                        ]}
                        enableVirtualScrolling={false}
                        maxHeight={450}
                        enableSearch={true}
                        searchPlaceholder="Search 1000 items (will be slow)..."
                        minWidth={320}
                    />
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="green.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="green.700"
                        >
                            🚀 Virtual Scrolling Performance Benefits:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="green.600" lineHeight="1.6">
                        1. <strong>Memory Efficient:</strong> Only renders
                        visible items (DOM contains ~20 items instead of 1000+)
                        <br />
                        2. <strong>Smooth Scrolling:</strong> 60fps performance
                        even with massive datasets
                        <br />
                        3. <strong>Instant Search:</strong> Search functionality
                        works instantly across all items
                        <br />
                        4. <strong>Dynamic Heights:</strong> Supports variable
                        item heights with binary search optimization
                        <br />
                        5. <strong>Automatic Activation:</strong> Enables
                        automatically when item count exceeds threshold
                        <br />
                        6. <strong>Seamless Integration:</strong> Works with all
                        existing Menu features (search, submenus, etc.)
                    </Text>
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="blue.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="blue.700"
                        >
                            ⚙️ Virtual Scrolling Configuration:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="blue.600" lineHeight="1.6">
                        • <strong>enableVirtualScrolling:</strong>{' '}
                        Enable/disable virtual scrolling
                        <br />• <strong>virtualItemHeight:</strong> Fixed height
                        or function for dynamic heights
                        <br />• <strong>virtualScrollThreshold:</strong> Item
                        count threshold to activate (default: 50)
                        <br />• <strong>virtualOverscan:</strong> Extra items to
                        render for smooth scrolling (default: 5)
                        <br />• <strong>Automatic Detection:</strong> Activates
                        when total items greater then = threshold
                        <br />• <strong>Binary Search:</strong> O(log n)
                        performance for finding visible items
                    </Text>
                </Block>
            </Block>

            {/* 5.2. MaxHeight Scrolling Demo */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        📜 5.2. MaxHeight Scrolling Demonstration
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Demonstrating scrollable content that exceeds maxHeight
                        limits with extensive menu data
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="📜 Scrollable Menu (200px)"
                            />
                        }
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Extensive Submenu',
                                        slot1: <Folder size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Search 50+ items...',
                                        subMenu: [
                                            {
                                                label: 'Item 01 - First Entry',
                                                subLabel: 'Beginning of list',
                                                slot1: <FileText size={16} />,
                                                onClick: () =>
                                                    console.log('Item 01'),
                                            },
                                            {
                                                label: 'Item 02 - Second Entry',
                                                subLabel: 'Early in list',
                                                slot1: <FileText size={16} />,
                                                onClick: () =>
                                                    console.log('Item 02'),
                                            },
                                            {
                                                label: 'Item 03 - Third Entry',
                                                subLabel: 'Still near top',
                                                slot1: <Edit size={16} />,
                                                onClick: () =>
                                                    console.log('Item 03'),
                                            },
                                            {
                                                label: 'Item 04 - Fourth Entry',
                                                subLabel: 'Getting longer',
                                                slot1: <Share size={16} />,
                                                onClick: () =>
                                                    console.log('Item 04'),
                                            },
                                            {
                                                label: 'Item 05 - Fifth Entry',
                                                subLabel: 'More content',
                                                slot1: <Download size={16} />,
                                                onClick: () =>
                                                    console.log('Item 05'),
                                            },
                                            {
                                                label: 'Item 06 - Sixth Entry',
                                                subLabel: 'Keep scrolling',
                                                slot1: <Upload size={16} />,
                                                onClick: () =>
                                                    console.log('Item 06'),
                                            },
                                            {
                                                label: 'Item 07 - Seventh Entry',
                                                subLabel: 'More items below',
                                                slot1: <Save size={16} />,
                                                onClick: () =>
                                                    console.log('Item 07'),
                                            },
                                            {
                                                label: 'Item 08 - Eighth Entry',
                                                subLabel: 'Scroll to see more',
                                                slot1: <Copy size={16} />,
                                                onClick: () =>
                                                    console.log('Item 08'),
                                            },
                                            {
                                                label: 'Item 09 - Ninth Entry',
                                                subLabel: 'Many more items',
                                                slot1: <Archive size={16} />,
                                                onClick: () =>
                                                    console.log('Item 09'),
                                            },
                                            {
                                                label: 'Item 10 - Tenth Entry',
                                                subLabel: 'Double digits now',
                                                slot1: <Trash2 size={16} />,
                                                onClick: () =>
                                                    console.log('Item 10'),
                                            },
                                            {
                                                label: 'Item 11 - Eleventh Entry',
                                                subLabel: 'Getting quite long',
                                                slot1: <Settings size={16} />,
                                                onClick: () =>
                                                    console.log('Item 11'),
                                            },
                                            {
                                                label: 'Item 12 - Twelfth Entry',
                                                subLabel: 'Scroll is working',
                                                slot1: <User size={16} />,
                                                onClick: () =>
                                                    console.log('Item 12'),
                                            },
                                            {
                                                label: 'Item 13 - Thirteenth Entry',
                                                subLabel: 'Lucky number 13',
                                                slot1: <Star size={16} />,
                                                onClick: () =>
                                                    console.log('Item 13'),
                                            },
                                            {
                                                label: 'Item 14 - Fourteenth Entry',
                                                subLabel: 'Keep going down',
                                                slot1: <Heart size={16} />,
                                                onClick: () =>
                                                    console.log('Item 14'),
                                            },
                                            {
                                                label: 'Item 15 - Fifteenth Entry',
                                                subLabel: 'Halfway to 30',
                                                slot1: <Bell size={16} />,
                                                onClick: () =>
                                                    console.log('Item 15'),
                                            },
                                            {
                                                label: 'Item 16 - Sixteenth Entry',
                                                subLabel: 'More scrolling',
                                                slot1: <Globe size={16} />,
                                                onClick: () =>
                                                    console.log('Item 16'),
                                            },
                                            {
                                                label: 'Item 17 - Seventeenth Entry',
                                                subLabel: 'Still more content',
                                                slot1: <Shield size={16} />,
                                                onClick: () =>
                                                    console.log('Item 17'),
                                            },
                                            {
                                                label: 'Item 18 - Eighteenth Entry',
                                                subLabel: 'Lots of items',
                                                slot1: <Lock size={16} />,
                                                onClick: () =>
                                                    console.log('Item 18'),
                                            },
                                            {
                                                label: 'Item 19 - Nineteenth Entry',
                                                subLabel: 'Almost at 20',
                                                slot1: <Camera size={16} />,
                                                onClick: () =>
                                                    console.log('Item 19'),
                                            },
                                            {
                                                label: 'Item 20 - Twentieth Entry',
                                                subLabel: 'Round number!',
                                                slot1: <Video size={16} />,
                                                onClick: () =>
                                                    console.log('Item 20'),
                                            },
                                            {
                                                label: 'Item 21 - Twenty-first Entry',
                                                subLabel: 'Past 20 now',
                                                slot1: <Music size={16} />,
                                                onClick: () =>
                                                    console.log('Item 21'),
                                            },
                                            {
                                                label: 'Item 22 - Twenty-second Entry',
                                                subLabel: 'More and more',
                                                slot1: <Image size={16} />,
                                                onClick: () =>
                                                    console.log('Item 22'),
                                            },
                                            {
                                                label: 'Item 23 - Twenty-third Entry',
                                                subLabel: 'Keep scrolling',
                                                slot1: <Folder size={16} />,
                                                onClick: () =>
                                                    console.log('Item 23'),
                                            },
                                            {
                                                label: 'Item 24 - Twenty-fourth Entry',
                                                subLabel: 'Getting close to 25',
                                                slot1: <FileText size={16} />,
                                                onClick: () =>
                                                    console.log('Item 24'),
                                            },
                                            {
                                                label: 'Item 25 - Twenty-fifth Entry',
                                                subLabel: 'Quarter century!',
                                                slot1: <Edit size={16} />,
                                                onClick: () =>
                                                    console.log('Item 25'),
                                            },
                                            {
                                                label: 'Item 26 - Twenty-sixth Entry',
                                                subLabel: 'Past 25 now',
                                                slot1: <Share size={16} />,
                                                onClick: () =>
                                                    console.log('Item 26'),
                                            },
                                            {
                                                label: 'Item 27 - Twenty-seventh Entry',
                                                subLabel: 'Almost at 30',
                                                slot1: <Download size={16} />,
                                                onClick: () =>
                                                    console.log('Item 27'),
                                            },
                                            {
                                                label: 'Item 28 - Twenty-eighth Entry',
                                                subLabel: 'Two more to 30',
                                                slot1: <Upload size={16} />,
                                                onClick: () =>
                                                    console.log('Item 28'),
                                            },
                                            {
                                                label: 'Item 29 - Twenty-ninth Entry',
                                                subLabel: 'One more to 30',
                                                slot1: <Save size={16} />,
                                                onClick: () =>
                                                    console.log('Item 29'),
                                            },
                                            {
                                                label: 'Item 30 - Thirtieth Entry',
                                                subLabel: 'Thirty items!',
                                                slot1: <Copy size={16} />,
                                                onClick: () =>
                                                    console.log('Item 30'),
                                            },
                                            {
                                                label: 'Item 31 - Thirty-first Entry',
                                                subLabel: 'Beyond 30',
                                                slot1: <Archive size={16} />,
                                                onClick: () =>
                                                    console.log('Item 31'),
                                            },
                                            {
                                                label: 'Item 32 - Thirty-second Entry',
                                                subLabel: 'Still going',
                                                slot1: <Trash2 size={16} />,
                                                onClick: () =>
                                                    console.log('Item 32'),
                                            },
                                            {
                                                label: 'Item 33 - Thirty-third Entry',
                                                subLabel: 'More content',
                                                slot1: <Settings size={16} />,
                                                onClick: () =>
                                                    console.log('Item 33'),
                                            },
                                            {
                                                label: 'Item 34 - Thirty-fourth Entry',
                                                subLabel: 'Keep scrolling',
                                                slot1: <User size={16} />,
                                                onClick: () =>
                                                    console.log('Item 34'),
                                            },
                                            {
                                                label: 'Item 35 - Thirty-fifth Entry',
                                                subLabel: 'Lots of data',
                                                slot1: <Star size={16} />,
                                                onClick: () =>
                                                    console.log('Item 35'),
                                            },
                                            {
                                                label: 'Item 36 - Thirty-sixth Entry',
                                                subLabel: 'More items',
                                                slot1: <Heart size={16} />,
                                                onClick: () =>
                                                    console.log('Item 36'),
                                            },
                                            {
                                                label: 'Item 37 - Thirty-seventh Entry',
                                                subLabel: 'Still more',
                                                slot1: <Bell size={16} />,
                                                onClick: () =>
                                                    console.log('Item 37'),
                                            },
                                            {
                                                label: 'Item 38 - Thirty-eighth Entry',
                                                subLabel: 'Almost 40',
                                                slot1: <Globe size={16} />,
                                                onClick: () =>
                                                    console.log('Item 38'),
                                            },
                                            {
                                                label: 'Item 39 - Thirty-ninth Entry',
                                                subLabel: 'One more to 40',
                                                slot1: <Shield size={16} />,
                                                onClick: () =>
                                                    console.log('Item 39'),
                                            },
                                            {
                                                label: 'Item 40 - Fortieth Entry',
                                                subLabel: 'Forty items!',
                                                slot1: <Lock size={16} />,
                                                onClick: () =>
                                                    console.log('Item 40'),
                                            },
                                            {
                                                label: 'Item 41 - Forty-first Entry',
                                                subLabel: 'Beyond 40',
                                                slot1: <Camera size={16} />,
                                                onClick: () =>
                                                    console.log('Item 41'),
                                            },
                                            {
                                                label: 'Item 42 - Forty-second Entry',
                                                subLabel:
                                                    'Answer to everything',
                                                slot1: <Video size={16} />,
                                                onClick: () =>
                                                    console.log('Item 42'),
                                            },
                                            {
                                                label: 'Item 43 - Forty-third Entry',
                                                subLabel: 'More content',
                                                slot1: <Music size={16} />,
                                                onClick: () =>
                                                    console.log('Item 43'),
                                            },
                                            {
                                                label: 'Item 44 - Forty-fourth Entry',
                                                subLabel: 'Keep going',
                                                slot1: <Image size={16} />,
                                                onClick: () =>
                                                    console.log('Item 44'),
                                            },
                                            {
                                                label: 'Item 45 - Forty-fifth Entry',
                                                subLabel: 'Almost 50',
                                                slot1: <Folder size={16} />,
                                                onClick: () =>
                                                    console.log('Item 45'),
                                            },
                                            {
                                                label: 'Item 46 - Forty-sixth Entry',
                                                subLabel: 'Getting close',
                                                slot1: <FileText size={16} />,
                                                onClick: () =>
                                                    console.log('Item 46'),
                                            },
                                            {
                                                label: 'Item 47 - Forty-seventh Entry',
                                                subLabel: 'Three more',
                                                slot1: <Edit size={16} />,
                                                onClick: () =>
                                                    console.log('Item 47'),
                                            },
                                            {
                                                label: 'Item 48 - Forty-eighth Entry',
                                                subLabel: 'Two more',
                                                slot1: <Share size={16} />,
                                                onClick: () =>
                                                    console.log('Item 48'),
                                            },
                                            {
                                                label: 'Item 49 - Forty-ninth Entry',
                                                subLabel: 'One more to 50',
                                                slot1: <Download size={16} />,
                                                onClick: () =>
                                                    console.log('Item 49'),
                                            },
                                            {
                                                label: 'Item 50 - Fiftieth Entry',
                                                subLabel: 'Half a hundred!',
                                                slot1: <Upload size={16} />,
                                                onClick: () =>
                                                    console.log('Item 50'),
                                            },
                                        ],
                                    },
                                ],
                            },
                        ]}
                        maxHeight={200}
                        maxWidth={350}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="📋 Medium Scroll (300px)"
                            />
                        }
                        items={searchableMenuItems}
                        enableSearch={true}
                        searchPlaceholder="Search extensive list..."
                        maxHeight={300}
                        minWidth={320}
                    />

                    <Menu
                        trigger={<Button text="📄 Large Scroll (150px)" />}
                        items={[
                            ...searchableMenuItems,
                            ...actionMenuItems,
                            ...disabledMenuItems,
                        ]}
                        enableSearch={true}
                        searchPlaceholder="Search all items..."
                        maxHeight={150}
                        minWidth={280}
                    />
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="orange.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="orange.700"
                        >
                            🎯 MaxHeight Scrolling Test:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="orange.600" lineHeight="1.6">
                        1. Click "📜 Scrollable Menu (200px)" to see 50+ items
                        in a submenu with 200px height limit
                        <br />
                        2. Notice the scroll behavior - content scrolls smoothly
                        within the constrained height
                        <br />
                        3. Try the search functionality to filter through the
                        extensive list
                        <br />
                        4. Test different maxHeight values (150px, 200px, 300px)
                        to see the difference
                        <br />
                        5. Both main menus and submenus respect the same
                        maxHeight prop inheritance
                        <br />
                        6. Scroll works with mouse wheel, keyboard arrows, and
                        touch gestures
                    </Text>
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="purple.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="purple.700"
                        >
                            ⚙️ MaxHeight Implementation:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="purple.600" lineHeight="1.6">
                        • <strong>Prop Threading:</strong> maxHeight flows from
                        Menu → MenuItem → SubMenu
                        <br />• <strong>Consistent Behavior:</strong> Same
                        scrolling logic for main menus and submenus
                        <br />• <strong>Default Fallback:</strong> Uses
                        'var(--radix-popper-available-height)' when no maxHeight
                        specified
                        <br />• <strong>Clean Architecture:</strong> No
                        hardcoded values, all prop-driven
                        <br />• <strong>Search Integration:</strong> Search
                        input stays sticky at top during scroll
                        <br />• <strong>Responsive Design:</strong> Adapts to
                        different screen sizes and constraints
                    </Text>
                </Block>
            </Block>

            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        🆕 5.5. Submenu Search Functionality
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        NEW FEATURE: Search functionality within individual
                        submenus for better navigation
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="🔍 Searchable Submenus"
                            />
                        }
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Documents',
                                        slot1: <FileText size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Search documents...',
                                        subMenu: [
                                            {
                                                label: 'Recent Documents',
                                                subLabel: 'Last 7 days',
                                                slot1: <FileText size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Recent documents'
                                                    ),
                                            },
                                            {
                                                label: 'All Documents',
                                                subLabel: 'Complete library',
                                                slot1: <FileText size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'All documents'
                                                    ),
                                            },
                                            {
                                                label: 'Shared Documents',
                                                subLabel: 'Team collaboration',
                                                slot1: <Share size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Shared documents'
                                                    ),
                                            },
                                            {
                                                label: 'Draft Documents',
                                                subLabel: 'Work in progress',
                                                slot1: <Edit size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Draft documents'
                                                    ),
                                            },
                                            {
                                                label: 'Archived Documents',
                                                subLabel: 'Old files',
                                                slot1: <Archive size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Archived documents'
                                                    ),
                                            },
                                            {
                                                label: 'Template Documents',
                                                subLabel: 'Reusable templates',
                                                slot1: <Copy size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Template documents'
                                                    ),
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Communication',
                                        slot1: <Mail size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Search communication...',
                                        subMenu: [
                                            {
                                                label: 'Email',
                                                subLabel: 'Send messages',
                                                slot1: <Mail size={16} />,
                                                onClick: () =>
                                                    console.log('Email'),
                                            },
                                            {
                                                label: 'Phone',
                                                subLabel: 'Voice calls',
                                                slot1: <Phone size={16} />,
                                                onClick: () =>
                                                    console.log('Phone'),
                                            },
                                            {
                                                label: 'Calendar',
                                                subLabel: 'Schedule meetings',
                                                slot1: <Calendar size={16} />,
                                                enableSubMenuSearch: true,
                                                subMenuSearchPlaceholder:
                                                    'Search calendar...',
                                                subMenu: [
                                                    {
                                                        label: 'Today',
                                                        subLabel:
                                                            'Current day events',
                                                        onClick: () =>
                                                            console.log(
                                                                'Today'
                                                            ),
                                                    },
                                                    {
                                                        label: 'This Week',
                                                        subLabel:
                                                            'Weekly schedule',
                                                        onClick: () =>
                                                            console.log(
                                                                'This week'
                                                            ),
                                                    },
                                                    {
                                                        label: 'This Month',
                                                        subLabel:
                                                            'Monthly overview',
                                                        onClick: () =>
                                                            console.log(
                                                                'This month'
                                                            ),
                                                    },
                                                    {
                                                        label: 'Next Month',
                                                        subLabel:
                                                            'Future planning',
                                                        onClick: () =>
                                                            console.log(
                                                                'Next month'
                                                            ),
                                                    },
                                                    {
                                                        label: 'Recurring Events',
                                                        subLabel:
                                                            'Repeated meetings',
                                                        onClick: () =>
                                                            console.log(
                                                                'Recurring events'
                                                            ),
                                                    },
                                                    {
                                                        label: 'Meeting Templates',
                                                        subLabel:
                                                            'Predefined formats',
                                                        onClick: () =>
                                                            console.log(
                                                                'Meeting templates'
                                                            ),
                                                    },
                                                ],
                                            },
                                            {
                                                label: 'Video Conference',
                                                subLabel: 'Online meetings',
                                                slot1: <Video size={16} />,
                                                onClick: () =>
                                                    console.log(
                                                        'Video conference'
                                                    ),
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Media Library',
                                        slot1: <Camera size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Search media...',
                                        subMenu: [
                                            {
                                                label: 'Photos',
                                                subLabel: 'Image files',
                                                slot1: <Image size={16} />,
                                                onClick: () =>
                                                    console.log('Photos'),
                                            },
                                            {
                                                label: 'Videos',
                                                subLabel: 'Video files',
                                                slot1: <Video size={16} />,
                                                onClick: () =>
                                                    console.log('Videos'),
                                            },
                                            {
                                                label: 'Audio',
                                                subLabel: 'Sound files',
                                                slot1: <Music size={16} />,
                                                onClick: () =>
                                                    console.log('Audio'),
                                            },
                                            {
                                                label: 'Graphics',
                                                subLabel: 'Design assets',
                                                slot1: <Star size={16} />,
                                                onClick: () =>
                                                    console.log('Graphics'),
                                            },
                                        ],
                                    },
                                ],
                            },
                        ]}
                        maxWidth={300}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Mixed Search Types"
                            />
                        }
                        items={[
                            {
                                items: [
                                    {
                                        label: 'Searchable Submenu',
                                        slot1: <Search size={16} />,
                                        enableSubMenuSearch: true,
                                        subMenuSearchPlaceholder:
                                            'Type to search...',
                                        subMenu: [
                                            {
                                                label: 'Apple',
                                                subLabel: 'Fruit',
                                                onClick: () =>
                                                    console.log('Apple'),
                                            },
                                            {
                                                label: 'Banana',
                                                subLabel: 'Fruit',
                                                onClick: () =>
                                                    console.log('Banana'),
                                            },
                                            {
                                                label: 'Carrot',
                                                subLabel: 'Vegetable',
                                                onClick: () =>
                                                    console.log('Carrot'),
                                            },
                                            {
                                                label: 'Date',
                                                subLabel: 'Fruit',
                                                onClick: () =>
                                                    console.log('Date'),
                                            },
                                        ],
                                    },
                                    {
                                        label: 'Regular Submenu',
                                        slot1: <Folder size={16} />,
                                        subMenu: [
                                            {
                                                label: 'No Search Here',
                                                onClick: () =>
                                                    console.log('No search'),
                                            },
                                            {
                                                label: 'Regular Item',
                                                onClick: () =>
                                                    console.log('Regular'),
                                            },
                                        ],
                                    },
                                ],
                            },
                        ]}
                    />
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="green.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="green.700"
                        >
                            🎯 How to test submenu search:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="green.600" lineHeight="1.6">
                        1. Click "🔍 Searchable Submenus" above
                        <br />
                        2. Hover over "Documents", "Communication", or "Media
                        Library"
                        <br />
                        3. Notice the search input at the top of each submenu
                        <br />
                        4. Type to filter items in real-time (try "recent",
                        "draft", "video")
                        <br />
                        5. Search works on both labels and sublabels
                        <br />
                        6. Try nested search in Calendar submenu (hover
                        Communication → Calendar)
                        <br />
                        7. Each submenu has independent search state with max
                        height scrolling
                    </Text>
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="blue.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="blue.700"
                        >
                            ⚙️ Implementation Details:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="blue.600" lineHeight="1.6">
                        • <strong>enableSubMenuSearch: true</strong> - Enables
                        search in submenu
                        <br />• <strong>subMenuSearchPlaceholder</strong> -
                        Custom placeholder text
                        <br />• <strong>maxHeight: 400px</strong> - Automatic
                        scrolling for long lists
                        <br />• <strong>Independent state</strong> - Each
                        submenu has its own search
                        <br />• <strong>Recursive filtering</strong> - Works
                        with unlimited nesting depth
                        <br />• <strong>Real-time updates</strong> - Instant
                        filtering as you type
                    </Text>
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

            {/* 8. Tooltip Support */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        8. Tooltip Support
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        Menu items with contextual tooltips on hover - New
                        Feature!
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Basic Tooltips"
                            />
                        }
                        items={tooltipMenuItems}
                        maxWidth={280}
                    />

                    <Menu
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Tooltip + Search"
                            />
                        }
                        items={tooltipMenuItems}
                        enableSearch={true}
                        searchPlaceholder="Search settings..."
                        maxWidth={320}
                    />
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="blue.50"
                    borderRadius="8px"
                >
                    <Text fontSize={14} fontWeight="medium" color="blue.700">
                        💡 Tooltip Features:
                    </Text>
                    <Text fontSize={12} color="blue.600" lineHeight="1.6">
                        • String or React component content
                        <br />
                        • Customizable positioning (top, right, bottom, left)
                        <br />
                        • Multiple sizes and styling options
                        <br />
                        • Configurable delay and arrow display
                        <br />• Works with all menu item variants
                    </Text>
                </Block>
            </Block>

            {/* 9. Combined Features */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        9. Combined Features
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

            {/* 10. Modal/Popover Integration - Dropdown Interaction Lock Fix */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={28} fontWeight="semibold">
                        🔒 10. Modal/Popover Integration - Dropdown Fix
                    </Text>
                </Block>
                <Block marginBottom="24px">
                    <Text fontSize={14} color="gray.600">
                        NEW FIX: Dropdowns inside modals/popovers now properly
                        handle outside clicks. Clicking inside the modal/popover
                        (but outside the dropdown) no longer closes the dropdown
                        prematurely.
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Block>
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            text="Open Modal with Menu Dropdown"
                            onClick={() => setIsModalWithDropdownOpen(true)}
                        />
                        <Modal
                            isOpen={isModalWithDropdownOpen}
                            onClose={() => setIsModalWithDropdownOpen(false)}
                            title="Modal with Menu Dropdown"
                            subtitle="Open the menu dropdown and click anywhere inside this modal"
                            primaryAction={{
                                text: 'Save',
                                onClick: () =>
                                    setIsModalWithDropdownOpen(false),
                                buttonType: ButtonType.PRIMARY,
                            }}
                            secondaryAction={{
                                text: 'Cancel',
                                onClick: () =>
                                    setIsModalWithDropdownOpen(false),
                                buttonType: ButtonType.SECONDARY,
                            }}
                        >
                            <Block
                                padding="16px"
                                display="flex"
                                flexDirection="column"
                                gap="16px"
                            >
                                <Text fontSize={14} color="gray.600">
                                    Click the dropdowns below, then click
                                    anywhere inside this modal. The dropdowns
                                    should stay open! You can select items using
                                    checkboxes.
                                </Text>
                                <Menu
                                    trigger={
                                        <Button
                                            buttonType={ButtonType.SECONDARY}
                                            text="Open Menu in Modal"
                                        />
                                    }
                                    items={basicMenuItems}
                                    enableSearch={true}
                                    searchPlaceholder="Search options..."
                                />
                                <SingleSelect
                                    label="Select Option"
                                    placeholder="Choose an option"
                                    items={[
                                        {
                                            items: [
                                                {
                                                    label: 'Option 1',
                                                    value: '1',
                                                },
                                                {
                                                    label: 'Option 2',
                                                    value: '2',
                                                },
                                                {
                                                    label: 'Option 3',
                                                    value: '3',
                                                },
                                            ],
                                        },
                                    ]}
                                    selected={modalSingleSelectValue}
                                    onSelect={(value) => {
                                        setModalSingleSelectValue(value)
                                        console.log(
                                            'Modal SingleSelect:',
                                            value
                                        )
                                    }}
                                />
                                <MultiSelect
                                    label="Multi Select"
                                    placeholder="Choose multiple options"
                                    items={[
                                        {
                                            items: [
                                                {
                                                    label: 'Item A',
                                                    value: 'a',
                                                },
                                                {
                                                    label: 'Item B',
                                                    value: 'b',
                                                },
                                                {
                                                    label: 'Item C',
                                                    value: 'c',
                                                },
                                                {
                                                    label: 'Item D',
                                                    value: 'd',
                                                },
                                            ],
                                        },
                                    ]}
                                    selectedValues={modalMultiSelectValues}
                                    onChange={(value) => {
                                        setModalMultiSelectValues((prev) => {
                                            if (prev.includes(value)) {
                                                return prev.filter(
                                                    (v) => v !== value
                                                )
                                            } else {
                                                return [...prev, value]
                                            }
                                        })
                                        console.log(
                                            'Modal MultiSelect toggled:',
                                            value
                                        )
                                    }}
                                />
                            </Block>
                        </Modal>
                    </Block>

                    <Popover
                        heading="Popover with Select Dropdowns"
                        description="Test dropdowns inside popovers"
                        trigger={
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Open Popover with Dropdowns"
                            />
                        }
                        open={isPopoverWithDropdownOpen}
                        onOpenChange={setIsPopoverWithDropdownOpen}
                        primaryAction={{
                            text: 'Apply',
                            onClick: () => setIsPopoverWithDropdownOpen(false),
                            buttonType: ButtonType.PRIMARY,
                        }}
                        secondaryAction={{
                            text: 'Cancel',
                            onClick: () => setIsPopoverWithDropdownOpen(false),
                            buttonType: ButtonType.SECONDARY,
                        }}
                    >
                        <Block
                            padding="16px"
                            display="flex"
                            flexDirection="column"
                            gap="16px"
                        >
                            <Text fontSize={14} color="gray.600">
                                Open the dropdowns below, then click anywhere
                                inside this popover. They should stay open! You
                                can select items using checkboxes.
                            </Text>
                            <SingleSelect
                                label="Select Option"
                                placeholder="Choose an option"
                                items={[
                                    {
                                        items: [
                                            {
                                                label: 'Option 1',
                                                value: '1',
                                            },
                                            {
                                                label: 'Option 2',
                                                value: '2',
                                            },
                                            {
                                                label: 'Option 3',
                                                value: '3',
                                            },
                                        ],
                                    },
                                ]}
                                selected={popoverSingleSelectValue}
                                onSelect={(value) => {
                                    setPopoverSingleSelectValue(value)
                                    console.log('Popover SingleSelect:', value)
                                }}
                            />
                            <MultiSelect
                                label="Multi Select"
                                placeholder="Choose multiple options"
                                items={[
                                    {
                                        items: [
                                            {
                                                label: 'Item A',
                                                value: 'a',
                                            },
                                            {
                                                label: 'Item B',
                                                value: 'b',
                                            },
                                            {
                                                label: 'Item C',
                                                value: 'c',
                                            },
                                            {
                                                label: 'Item D',
                                                value: 'd',
                                            },
                                        ],
                                    },
                                ]}
                                selectedValues={popoverMultiSelectValues}
                                onChange={(value) => {
                                    setPopoverMultiSelectValues((prev) => {
                                        if (prev.includes(value)) {
                                            return prev.filter(
                                                (v) => v !== value
                                            )
                                        } else {
                                            return [...prev, value]
                                        }
                                    })
                                    console.log(
                                        'Popover MultiSelect toggled:',
                                        value
                                    )
                                }}
                            />
                        </Block>
                    </Popover>
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="green.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="green.700"
                        >
                            ✅ How to Test the Fix:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="green.600" lineHeight="1.6">
                        1. Click "Open Modal with Menu Dropdown" or "Open
                        Popover with Dropdowns" above
                        <br />
                        2. Open the SingleSelect or MultiSelect dropdown
                        <br />
                        3. ✅ Select items using checkboxes - they should work
                        correctly!
                        <br />
                        4. Click anywhere inside the modal/popover (but outside
                        the dropdown)
                        <br />
                        5. ✅ The dropdown should stay open (not close
                        prematurely)
                        <br />
                        6. Click outside the entire modal/popover to close both
                        <br />
                        7. Same behavior works with modals and popovers -
                        dropdowns respect parent container boundaries
                    </Text>
                </Block>

                <Block
                    marginTop="16px"
                    padding="16px"
                    backgroundColor="blue.50"
                    borderRadius="8px"
                >
                    <Block marginBottom="8px">
                        <Text
                            fontSize={14}
                            fontWeight="medium"
                            color="blue.700"
                        >
                            🔧 Technical Implementation:
                        </Text>
                    </Block>
                    <Text fontSize={12} color="blue.600" lineHeight="1.6">
                        • <strong>useDropdownInteractionLock:</strong> Updated
                        to allow pointer events on parent containers (modals,
                        popovers)
                        <br />• <strong>onInteractOutside:</strong> Added to
                        Menu, SingleSelectMenu, and MultiSelectMenu to prevent
                        closing when clicking inside parent containers
                        <br />• <strong>Parent Container Detection:</strong>
                        Checks for [data-modal], [data-popover],
                        [role="dialog"], and [data-radix-popover-content]
                        <br />• <strong>Scroll Lock Maintained:</strong> Still
                        prevents scrolling outside dropdowns while allowing
                        proper click detection
                        <br />• <strong>Generic Solution:</strong> Works with
                        all dropdown components (Menu, SingleSelect,
                        MultiSelect)
                    </Text>
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
                                items: MenuGroupType[]
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
                                variant: MenuItemVariant
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                DEFAULT | ACTION - Visual styling variant
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                actionType: MenuItemActionType
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
                                subMenu: MenuItemType[]
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Creates nested submenu (supports multiple
                                levels)
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                tooltip: string | ReactNode
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Tooltip content shown on hover (NEW!)
                            </Text>
                        </Block>
                        <Block marginBottom="12px">
                            <Text fontWeight="medium">
                                tooltipProps: TooltipProps
                            </Text>
                            <Text fontSize={14} color="gray.600">
                                Tooltip configuration (side, align, size,
                                showArrow, etc.)
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
