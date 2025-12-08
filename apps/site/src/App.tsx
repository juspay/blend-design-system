import {
    Menu,
    Button,
    ButtonType,
    MenuAlignment,
    MenuSide,
    MenuItemVariant,
    MenuItemActionType,
} from '../../../packages/blend/lib/main'
import type { MenuGroupType } from '../../../packages/blend/lib/components/Menu/types'
import {
    User,
    Settings,
    LogOut,
    Edit,
    Trash2,
    Plus,
    FileText,
    Star,
    Heart,
    Video,
    Music,
    Image,
    Folder,
    Lock,
    Save,
    RefreshCw,
    Bell,
    Copy,
    ChevronDown,
} from 'lucide-react'

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
    },
    {
        label: 'Danger Actions',
        items: [
            {
                label: 'Delete',
                subLabel: 'Permanently delete',
                slot1: <Trash2 size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
                onClick: () => console.log('Delete clicked'),
            },
        ],
    },
]

const nestedMenuItems: MenuGroupType[] = [
    {
        items: [
            {
                label: 'New',
                slot1: <Plus size={16} />,
                subMenu: [
                    {
                        label: 'Document',
                        slot1: <FileText size={16} />,
                        onClick: () => console.log('New document'),
                    },
                    {
                        label: 'Folder',
                        slot1: <Folder size={16} />,
                        onClick: () => console.log('New folder'),
                    },
                ],
            },
            {
                label: 'Media',
                slot1: <Image size={16} />,
                subMenu: [
                    {
                        label: 'Image',
                        slot1: <Image size={16} />,
                        onClick: () => console.log('Image'),
                    },
                    {
                        label: 'Video',
                        slot1: <Video size={16} />,
                        onClick: () => console.log('Video'),
                    },
                    {
                        label: 'Music',
                        slot1: <Music size={16} />,
                        onClick: () => console.log('Music'),
                    },
                ],
            },
        ],
    },
]

const slotVariationItems: MenuGroupType[] = [
    {
        items: [
            {
                label: 'Item with Slot 1',
                slot1: <Star size={16} />,
                onClick: () => console.log('Slot 1'),
            },
            {
                label: 'Item with Slot 2',
                slot2: <Heart size={16} />,
                onClick: () => console.log('Slot 2'),
            },
            {
                label: 'Item with Multiple Slots',
                slot1: <User size={16} />,
                slot2: <Settings size={16} />,
                slot3: <Bell size={16} />,
                onClick: () => console.log('Multiple slots'),
            },
        ],
    },
]

const searchMenuItems: MenuGroupType[] = [
    {
        items: Array.from({ length: 20 }, (_, i) => ({
            label: `Item ${i + 1}`,
            slot1: <FileText size={16} />,
            onClick: () => console.log(`Item ${i + 1} clicked`),
        })),
    },
]

const disabledMenuItems: MenuGroupType[] = [
    {
        items: [
            {
                label: 'Enabled Item',
                slot1: <Edit size={16} />,
                onClick: () => console.log('Enabled clicked'),
            },
            {
                label: 'Disabled Item',
                slot1: <Lock size={16} />,
                disabled: true,
                onClick: () => console.log('Disabled clicked'),
            },
            {
                label: 'Another Enabled',
                slot1: <Copy size={16} />,
                onClick: () => console.log('Another enabled'),
            },
        ],
    },
]

const groupedMenuItems: MenuGroupType[] = [
    {
        label: 'File',
        items: [
            {
                label: 'New',
                slot1: <Plus size={16} />,
                onClick: () => console.log('New'),
            },
            {
                label: 'Open',
                slot1: <Folder size={16} />,
                onClick: () => console.log('Open'),
            },
            {
                label: 'Save',
                slot1: <Save size={16} />,
                onClick: () => console.log('Save'),
            },
        ],
    },
    {
        label: 'Edit',
        items: [
            {
                label: 'Copy',
                slot1: <Copy size={16} />,
                onClick: () => console.log('Copy'),
            },
            {
                label: 'Paste',
                slot1: <FileText size={16} />,
                onClick: () => console.log('Paste'),
            },
        ],
        showSeparator: true,
    },
    {
        label: 'View',
        items: [
            {
                label: 'Refresh',
                slot1: <RefreshCw size={16} />,
                onClick: () => console.log('Refresh'),
            },
        ],
        showSeparator: true,
    },
]

function App() {
    return (
        <>
            <Menu
                trigger={
                    <Button
                        text="Basic Menu"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
            />
            <Menu
                trigger={
                    <Button
                        text="Action Menu"
                        buttonType={ButtonType.PRIMARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={actionMenuItems}
            />
            <Menu
                trigger={
                    <Button
                        text="Nested Sub-menus"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={nestedMenuItems}
                maxWidth={280}
            />
            <Menu
                trigger={
                    <Button
                        text="Slot Variations"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={slotVariationItems}
            />
            <Menu
                trigger={
                    <Button
                        text="With Search"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={searchMenuItems}
                enableSearch={true}
                searchPlaceholder="Search items..."
            />
            <Menu
                trigger={
                    <Button
                        text="Disabled Items"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={disabledMenuItems}
            />
            <Menu
                trigger={
                    <Button
                        text="Grouped Items"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={groupedMenuItems}
            />
            <Menu
                trigger={
                    <Button
                        text="Top Alignment"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
                side={MenuSide.TOP}
                alignment={MenuAlignment.CENTER}
            />
            <Menu
                trigger={
                    <Button
                        text="Right Side"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
                side={MenuSide.RIGHT}
                alignment={MenuAlignment.START}
            />
            <Menu
                trigger={
                    <Button
                        text="Left Side"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
                side={MenuSide.LEFT}
                alignment={MenuAlignment.END}
            />
            <Menu
                trigger={
                    <Button
                        text="Start Alignment"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
                alignment={MenuAlignment.START}
            />
            <Menu
                trigger={
                    <Button
                        text="End Alignment"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
                alignment={MenuAlignment.END}
            />
            <Menu
                trigger={
                    <Button
                        text="Custom Max Height"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={searchMenuItems}
                maxHeight={200}
            />
            <Menu
                trigger={
                    <Button
                        text="Custom Width"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
                minWidth={300}
                maxWidth={400}
            />
            <Menu
                trigger={
                    <Button
                        text="Modal Menu"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
                asModal={true}
            />
            <Menu
                trigger={
                    <Button
                        text="Virtual Scrolling"
                        buttonType={ButtonType.SECONDARY}
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={searchMenuItems}
                enableVirtualScrolling={true}
                virtualScrollThreshold={10}
                maxHeight={300}
            />
        </>
    )
}

export default App
