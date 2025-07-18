import React, { useState } from 'react'
import Menu from './Menu'
import {
    MenuAlignment,
    MenuSide,
    MenuItemV2Variant,
    MenuItemV2ActionType,
    MenuV2GroupType,
} from './types'
import { ButtonV2 } from '../ButtonV2'
import { ButtonTypeV2 } from '../ButtonV2/types'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import {
    User,
    Settings,
    LogOut,
    Edit,
    Trash2,
    Plus,
    Download,
    Share,
    Copy,
    Archive,
    FileText,
    Mail,
    Phone,
    Calendar,
    Star,
    Heart,
} from 'lucide-react'

// Sample menu items with various configurations
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
        label: 'File Actions',
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
                label: 'Edit',
                subLabel: 'Modify existing file',
                slot1: <Edit size={16} />,
                onClick: () => console.log('Edit clicked'),
            },
            {
                label: 'Download',
                slot1: <Download size={16} />,
                slot2: (
                    <Text fontSize={12} color="gray">
                        ⌘D
                    </Text>
                ),
                onClick: () => console.log('Download clicked'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Sharing',
        items: [
            {
                label: 'Share',
                slot1: <Share size={16} />,
                onClick: () => console.log('Share clicked'),
            },
            {
                label: 'Copy Link',
                slot1: <Copy size={16} />,
                onClick: () => console.log('Copy link clicked'),
            },
        ],
        showSeparator: true,
    },
    {
        items: [
            {
                label: 'Archive',
                slot1: <Archive size={16} />,
                onClick: () => console.log('Archive clicked'),
            },
            {
                label: 'Delete',
                slot1: <Trash2 size={16} />,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.DANGER,
                onClick: () => console.log('Delete clicked'),
            },
        ],
    },
]

const subMenuItems: MenuV2GroupType[] = [
    {
        items: [
            {
                label: 'Documents',
                slot1: <FileText size={16} />,
                subMenu: [
                    {
                        label: 'Recent Documents',
                        slot1: <FileText size={16} />,
                        onClick: () => console.log('Recent documents'),
                    },
                    {
                        label: 'All Documents',
                        slot1: <FileText size={16} />,
                        onClick: () => console.log('All documents'),
                    },
                    {
                        label: 'Shared',
                        slot1: <Share size={16} />,
                        onClick: () => console.log('Shared documents'),
                    },
                ],
            },
            {
                label: 'Communication',
                slot1: <Mail size={16} />,
                subMenu: [
                    {
                        label: 'Email',
                        slot1: <Mail size={16} />,
                        onClick: () => console.log('Email'),
                    },
                    {
                        label: 'Phone',
                        slot1: <Phone size={16} />,
                        onClick: () => console.log('Phone'),
                    },
                    {
                        label: 'Calendar',
                        slot1: <Calendar size={16} />,
                        subMenu: [
                            {
                                label: 'Today',
                                onClick: () => console.log('Today'),
                            },
                            {
                                label: 'This Week',
                                onClick: () => console.log('This week'),
                            },
                            {
                                label: 'This Month',
                                onClick: () => console.log('This month'),
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Favorites',
                slot1: <Star size={16} />,
                slot2: <Heart size={16} />,
                onClick: () => console.log('Favorites'),
            },
        ],
    },
]

const searchableMenuItems: MenuV2GroupType[] = [
    {
        label: 'Actions',
        items: [
            {
                label: 'Create Project',
                subLabel: 'Start a new project',
                slot1: <Plus size={16} />,
                onClick: () => console.log('Create project'),
            },
            {
                label: 'Edit Profile',
                subLabel: 'Update your information',
                slot1: <Edit size={16} />,
                onClick: () => console.log('Edit profile'),
            },
            {
                label: 'View Settings',
                subLabel: 'Configure preferences',
                slot1: <Settings size={16} />,
                onClick: () => console.log('View settings'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'Files',
        items: [
            {
                label: 'Download Files',
                subLabel: 'Get your files',
                slot1: <Download size={16} />,
                onClick: () => console.log('Download files'),
            },
            {
                label: 'Share Document',
                subLabel: 'Send to others',
                slot1: <Share size={16} />,
                onClick: () => console.log('Share document'),
            },
            {
                label: 'Archive Old Files',
                subLabel: 'Clean up storage',
                slot1: <Archive size={16} />,
                onClick: () => console.log('Archive files'),
            },
        ],
    },
]

const disabledMenuItems: MenuV2GroupType[] = [
    {
        items: [
            {
                label: 'Available Action',
                slot1: <User size={16} />,
                onClick: () => console.log('Available action'),
            },
            {
                label: 'Disabled Action',
                slot1: <Settings size={16} />,
                disabled: true,
                onClick: () => console.log('This should not fire'),
            },
            {
                label: 'Another Available',
                slot1: <Download size={16} />,
                onClick: () => console.log('Another available'),
            },
            {
                label: 'Also Disabled',
                slot1: <Trash2 size={16} />,
                disabled: true,
                variant: MenuItemV2Variant.ACTION,
                actionType: MenuItemV2ActionType.DANGER,
                onClick: () => console.log('This should not fire either'),
            },
        ],
    },
]

export const MenuPlayground: React.FC = () => {
    const [isModalMenuOpen, setIsModalMenuOpen] = useState(false)

    return (
        <Block padding="24px" backgroundColor="gray.50" minHeight="100vh">
            <Block marginBottom="24px">
                <Text fontSize={32} fontWeight="bold">
                    Menu Component Playground
                </Text>
            </Block>

            {/* Basic Menu Examples */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={24} fontWeight="semibold">
                        Basic Menu Examples
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <ButtonV2 buttonType={ButtonTypeV2.SECONDARY}>
                                Basic Menu
                            </ButtonV2>
                        }
                        items={basicMenuItems}
                    />

                    <Menu
                        trigger={
                            <ButtonV2 buttonType={ButtonTypeV2.PRIMARY}>
                                Action Menu
                            </ButtonV2>
                        }
                        items={actionMenuItems}
                        maxHeight={300}
                    />

                    <Menu
                        trigger={<ButtonV2 text="With Sub-menus" />}
                        items={subMenuItems}
                        maxWidth={250}
                    />
                </Block>
            </Block>

            {/* Alignment & Side Examples */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={24} fontWeight="semibold">
                        Alignment & Side Variations
                    </Text>
                </Block>

                <Block
                    display="flex"
                    flexWrap="wrap"
                    gap="16px"
                    marginBottom="24px"
                >
                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.SECONDARY}
                                text="Start Aligned"
                            />
                        }
                        items={basicMenuItems}
                        alignment={MenuAlignment.START}
                    />

                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.SECONDARY}
                                text="Center Aligned"
                            />
                        }
                        items={basicMenuItems}
                        alignment={MenuAlignment.CENTER}
                    />

                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.SECONDARY}
                                text="End Aligned"
                            />
                        }
                        items={basicMenuItems}
                        alignment={MenuAlignment.END}
                    />
                </Block>

                <Block display="flex" flexWrap="wrap" gap="16px">
                    <Menu
                        trigger={<ButtonV2 text="Top Side" />}
                        items={basicMenuItems}
                        side={MenuSide.TOP}
                    />

                    <Menu
                        trigger={<ButtonV2 text="Bottom Side" />}
                        items={basicMenuItems}
                        side={MenuSide.BOTTOM}
                    />

                    <Menu
                        trigger={<ButtonV2 text="Left Side" />}
                        items={basicMenuItems}
                        side={MenuSide.LEFT}
                    />

                    <Menu
                        trigger={<ButtonV2 text="Right Side" />}
                        items={basicMenuItems}
                        side={MenuSide.RIGHT}
                    />
                </Block>
            </Block>

            {/* Search & Sizing Examples */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={24} fontWeight="semibold">
                        Search & Sizing Options
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.PRIMARY}
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
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.SECONDARY}
                                text="Custom Size"
                            />
                        }
                        items={actionMenuItems}
                        minWidth={320}
                        maxWidth={400}
                        maxHeight={250}
                    />

                    <Menu
                        trigger={<ButtonV2 text="Compact Menu" />}
                        items={basicMenuItems}
                        minWidth={150}
                        maxWidth={200}
                    />
                </Block>
            </Block>

            {/* Special Cases */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={24} fontWeight="semibold">
                        Special Cases
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.SECONDARY}
                                text="Disabled Items"
                            />
                        }
                        items={disabledMenuItems}
                    />

                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.PRIMARY}
                                text="Modal Menu"
                            />
                        }
                        items={actionMenuItems}
                        asModal={true}
                        open={isModalMenuOpen}
                        onOpenChange={setIsModalMenuOpen}
                    />

                    <Menu
                        trigger={<ButtonV2 text="Custom Offset" />}
                        items={basicMenuItems}
                        sideOffset={20}
                        alignOffset={10}
                    />
                </Block>
            </Block>

            {/* Edge Cases */}
            <Block marginBottom="48px">
                <Block marginBottom="16px">
                    <Text fontSize={24} fontWeight="semibold">
                        Edge Cases & Advanced
                    </Text>
                </Block>

                <Block display="flex" gap="16px" flexWrap="wrap">
                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.DANGER}
                                text="Empty Menu"
                            />
                        }
                        items={[]}
                    />

                    <Menu
                        trigger={
                            <ButtonV2
                                buttonType={ButtonTypeV2.SECONDARY}
                                text="Single Item"
                            />
                        }
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
                        trigger={<ButtonV2 text="Long Content" />}
                        items={[
                            {
                                label: 'Long Labels Section',
                                items: [
                                    {
                                        label: 'This is a very long menu item label that might wrap',
                                        subLabel:
                                            'With an equally long subtitle that provides additional context',
                                        slot1: <FileText size={16} />,
                                        onClick: () => console.log('Long item'),
                                    },
                                    {
                                        label: 'Another lengthy option',
                                        subLabel: 'More descriptive text here',
                                        slot1: <Settings size={16} />,
                                        onClick: () =>
                                            console.log('Another long item'),
                                    },
                                ],
                            },
                        ]}
                        maxWidth={350}
                    />
                </Block>
            </Block>

            {/* Usage Instructions */}
            <Block
                marginTop="48px"
                padding="24px"
                backgroundColor="white"
                borderRadius="8px"
            >
                <Block marginBottom="16px">
                    <Text fontSize={20} fontWeight="semibold">
                        Menu Component Usage Guide
                    </Text>
                </Block>

                <Block marginBottom="16px">
                    <Block marginBottom="8px">
                        <Text fontSize={16} fontWeight="medium">
                            Key Features:
                        </Text>
                    </Block>
                    <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
                        <li>Multiple alignment options (start, center, end)</li>
                        <li>Flexible positioning (top, bottom, left, right)</li>
                        <li>Built-in search functionality</li>
                        <li>Action variants (primary, danger)</li>
                        <li>Nested sub-menus support</li>
                        <li>Customizable sizing and spacing</li>
                        <li>Disabled state support</li>
                        <li>Modal and non-modal modes</li>
                    </ul>
                </Block>

                <Block>
                    <Block marginBottom="8px">
                        <Text fontSize={16} fontWeight="medium">
                            Props Overview:
                        </Text>
                    </Block>
                    <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
                        <li>
                            <code>trigger</code>: ReactNode that triggers the
                            menu
                        </li>
                        <li>
                            <code>items</code>: Array of menu groups with items
                        </li>
                        <li>
                            <code>enableSearch</code>: Enable search
                            functionality
                        </li>
                        <li>
                            <code>alignment</code>: Menu alignment relative to
                            trigger
                        </li>
                        <li>
                            <code>side</code>: Which side of trigger to show
                            menu
                        </li>
                        <li>
                            <code>asModal</code>: Open as modal (blocks
                            interaction)
                        </li>
                        <li>
                            <code>maxHeight/maxWidth</code>: Size constraints
                        </li>
                        <li>
                            <code>sideOffset/alignOffset</code>: Fine-tune
                            positioning
                        </li>
                    </ul>
                </Block>
            </Block>
        </Block>
    )
}

export default MenuPlayground
