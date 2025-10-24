import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Menu,
    MenuAlignment,
    MenuSide,
    MenuItemVariant,
    MenuItemActionType,
    MenuGroupType,
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system'
import {
    ChevronDown,
    Building,
    Type,
    DollarSign,
    TrendingUp,
    User,
    Settings,
    LogOut,
    CreditCard,
    HelpCircle,
    FileText,
    Download,
    Copy,
    Trash2,
    Edit,
    Save,
    Plus,
    Search,
    Filter,
    SortAsc,
    Eye,
    Lock,
    Mail,
    Bell,
    Shield,
    Key,
    Globe,
    Sun,
    Monitor,
    Check,
    X,
    Info,
    ChevronRight,
    Home,
    BarChart,
    Users,
    Calendar,
    Folder,
    Image,
    Video,
    Music,
    Archive,
    Upload,
    RefreshCw,
    Zap,
    Tag,
    Hash,
    Volume2,
    Printer,
    Scissors,
    Paperclip,
    Database,
    Package,
    Grid,
    List,
    Layout,
    MoreHorizontal,
    Star,
    Heart,
    Share,
    Bookmark,
    ExternalLink,
    Clock,
    MapPin,
    Phone,
    Palette,
    Code,
    Terminal,
} from 'lucide-react'

const meta: Meta<typeof Menu> = {
    title: 'Components/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A versatile dropdown menu component built on top of Radix UI's DropdownMenu primitive. Provides a flexible and accessible way to display contextual actions and options.

## Features
- Multiple alignment and positioning options
- Search functionality for filtering menu items
- Grouped items with labels and separators
- Support for sub-labels and multiple slots (slot1, slot2, slot3, slot4)
- Action variants (default, action) with types (primary, danger)
- Disabled state support
- Sub-menu support for nested navigation
- Virtual scrolling for large lists
- Modal mode for focus trapping
- Customizable dimensions (min/max width/height)
- Keyboard navigation and accessibility
- Collision detection and boundary awareness
- Tooltip support for menu items

## Usage

\`\`\`tsx
import { Menu, MenuAlignment, MenuSide, MenuItemVariant, MenuItemActionType } from '@juspay/blend-design-system';

<Menu
  trigger={<Button text="Open Menu" />}
  items={menuItems}
  alignment={MenuAlignment.START}
  side={MenuSide.BOTTOM}
  enableSearch
  maxHeight={400}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        trigger: {
            control: false,
            description: 'React element that triggers the menu when clicked',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Core',
            },
        },
        items: {
            control: false,
            description: 'Array of menu group objects containing menu items',
            table: {
                type: { summary: 'MenuGroupType[]' },
                category: 'Core',
            },
        },
        open: {
            control: { type: 'boolean' },
            description:
                'Controls the open state of the menu (controlled mode)',
            table: {
                type: { summary: 'boolean' },
                category: 'State',
            },
        },
        onOpenChange: {
            action: 'open-changed',
            description: 'Callback fired when the menu open state changes',
            table: {
                type: { summary: '(open: boolean) => void' },
                category: 'Events',
            },
        },
        asModal: {
            control: { type: 'boolean' },
            description:
                'Whether to render the menu as a modal (focus trapping)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        alignment: {
            control: { type: 'select' },
            options: Object.values(MenuAlignment),
            description: 'Horizontal alignment of the menu relative to trigger',
            table: {
                type: { summary: 'MenuAlignment' },
                defaultValue: { summary: 'MenuAlignment.CENTER' },
                category: 'Positioning',
            },
        },
        side: {
            control: { type: 'select' },
            options: Object.values(MenuSide),
            description: 'Side where the menu appears relative to trigger',
            table: {
                type: { summary: 'MenuSide' },
                defaultValue: { summary: 'MenuSide.BOTTOM' },
                category: 'Positioning',
            },
        },
        sideOffset: {
            control: { type: 'number', min: 0, max: 50 },
            description: 'Distance in pixels between trigger and menu',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '8' },
                category: 'Positioning',
            },
        },
        alignOffset: {
            control: { type: 'number', min: -100, max: 100 },
            description: 'Offset in pixels along the alignment axis',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Positioning',
            },
        },
        maxHeight: {
            control: { type: 'number', min: 100, max: 800 },
            description: 'Maximum height of the menu content in pixels',
            table: {
                type: { summary: 'number' },
                category: 'Dimensions',
            },
        },
        minHeight: {
            control: { type: 'number', min: 50, max: 400 },
            description: 'Minimum height of the menu content in pixels',
            table: {
                type: { summary: 'number' },
                category: 'Dimensions',
            },
        },
        maxWidth: {
            control: { type: 'number', min: 150, max: 600 },
            description: 'Maximum width of the menu content in pixels',
            table: {
                type: { summary: 'number' },
                category: 'Dimensions',
            },
        },
        minWidth: {
            control: { type: 'number', min: 100, max: 400 },
            description: 'Minimum width of the menu content in pixels',
            table: {
                type: { summary: 'number' },
                category: 'Dimensions',
            },
        },
        enableSearch: {
            control: { type: 'boolean' },
            description: 'Whether to show a search input for filtering items',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search',
            },
        },
        searchPlaceholder: {
            control: { type: 'text' },
            description: 'Placeholder text for the search input',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Search' },
                category: 'Search',
            },
        },
        enableVirtualScrolling: {
            control: { type: 'boolean' },
            description:
                'Enable virtual scrolling for large lists (performance)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Performance',
            },
        },
        virtualItemHeight: {
            control: { type: 'number', min: 20, max: 80 },
            description: 'Height of each virtual scroll item in pixels',
            table: {
                type: {
                    summary:
                        'number | ((item: MenuItemType, index: number) => number)',
                },
                defaultValue: { summary: '40' },
                category: 'Performance',
            },
        },
        virtualOverscan: {
            control: { type: 'number', min: 1, max: 20 },
            description: 'Number of items to render outside of visible area',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '5' },
                category: 'Performance',
            },
        },
        virtualScrollThreshold: {
            control: { type: 'number', min: 10, max: 200 },
            description:
                'Minimum number of items before virtual scrolling kicks in',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '50' },
                category: 'Performance',
            },
        },
        collisonBoundaryRef: {
            control: false,
            description:
                'Element or array of elements that act as collision boundaries',
            table: {
                type: { summary: 'Element | null | Array<Element | null>' },
                category: 'Advanced',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menu>

// Sample menu data
const basicMenuItems: MenuGroupType[] = [
    {
        label: 'Account',
        items: [
            {
                label: 'Profile',
                subLabel: 'Manage your profile',
                slot1: <User size={16} />,
                onClick: () => console.log('Profile clicked'),
            },
            {
                label: 'Settings',
                subLabel: 'Preferences and configuration',
                slot1: <Settings size={16} />,
                onClick: () => console.log('Settings clicked'),
            },
            {
                label: 'Billing',
                subLabel: 'Manage billing and subscriptions',
                slot1: <CreditCard size={16} />,
                onClick: () => console.log('Billing clicked'),
            },
        ],
    },
    {
        showSeparator: true,
        items: [
            {
                label: 'Help & Support',
                slot1: <HelpCircle size={16} />,
                onClick: () => console.log('Help clicked'),
            },
            {
                label: 'Logout',
                slot1: <LogOut size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
                onClick: () => console.log('Logout clicked'),
            },
        ],
    },
]

const fileMenuItems: MenuGroupType[] = [
    {
        label: 'File Operations',
        items: [
            {
                label: 'New File',
                slot1: <Plus size={16} />,
                slot4: <span>⌘N</span>,
            },
            {
                label: 'Open',
                slot1: <Folder size={16} />,
                slot4: <span>⌘O</span>,
            },
            {
                label: 'Save',
                slot1: <Save size={16} />,
                slot4: <span>⌘S</span>,
            },
            {
                label: 'Save As...',
                slot1: <Save size={16} />,
                slot4: <span>⌘⇧S</span>,
            },
        ],
    },
    {
        label: 'Export',
        showSeparator: true,
        items: [
            { label: 'Export as PDF', slot1: <FileText size={16} /> },
            { label: 'Export as Image', slot1: <Image size={16} /> },
            { label: 'Download', slot1: <Download size={16} /> },
        ],
    },
    {
        showSeparator: true,
        items: [
            {
                label: 'Delete File',
                slot1: <Trash2 size={16} />,
                variant: MenuItemVariant.ACTION,
                actionType: MenuItemActionType.DANGER,
            },
        ],
    },
]

// Default story
export const Default: Story = {
    render: function DefaultMenu(args) {
        return (
            <Menu
                {...args}
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Open Menu"
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={basicMenuItems}
            />
        )
    },
    args: {
        alignment: MenuAlignment.START,
        side: MenuSide.BOTTOM,
        sideOffset: 8,
        alignOffset: 0,
        asModal: false,
        enableSearch: false,
    },
}

// Different alignments
export const Alignments: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Start"
                    />
                }
                items={basicMenuItems}
                alignment={MenuAlignment.START}
                side={MenuSide.BOTTOM}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Center"
                    />
                }
                items={basicMenuItems}
                alignment={MenuAlignment.CENTER}
                side={MenuSide.BOTTOM}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="End"
                    />
                }
                items={basicMenuItems}
                alignment={MenuAlignment.END}
                side={MenuSide.BOTTOM}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Menu with different horizontal alignments: start, center, and end.',
            },
        },
    },
}

// Different sides
export const Sides: Story = {
    render: () => (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '20px',
                alignItems: 'center',
                justifyItems: 'center',
                padding: '100px',
            }}
        >
            <div></div>
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Top"
                    />
                }
                items={basicMenuItems}
                side={MenuSide.TOP}
            />
            <div></div>

            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Left"
                    />
                }
                items={basicMenuItems}
                side={MenuSide.LEFT}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.MEDIUM}
                        text="Center"
                    />
                }
                items={basicMenuItems}
                side={MenuSide.BOTTOM}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Right"
                    />
                }
                items={basicMenuItems}
                side={MenuSide.RIGHT}
            />

            <div></div>
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Bottom"
                    />
                }
                items={basicMenuItems}
                side={MenuSide.BOTTOM}
            />
            <div></div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Menu positioned on different sides: top, right, bottom, and left.',
            },
        },
    },
}

// With search functionality
export const WithSearch: Story = {
    render: () => {
        const searchableItems: MenuGroupType[] = [
            {
                label: 'File Operations',
                items: [
                    { label: 'Create New File', slot1: <Plus size={16} /> },
                    { label: 'Open File', slot1: <Folder size={16} /> },
                    { label: 'Save File', slot1: <Save size={16} /> },
                    { label: 'Save As...', slot1: <Save size={16} /> },
                    { label: 'Export PDF', slot1: <FileText size={16} /> },
                    { label: 'Print Document', slot1: <Printer size={16} /> },
                    { label: 'Close File', slot1: <X size={16} /> },
                ],
            },
            {
                label: 'Edit Operations',
                showSeparator: true,
                items: [
                    { label: 'Cut Text', slot1: <Scissors size={16} /> },
                    { label: 'Copy Text', slot1: <Copy size={16} /> },
                    { label: 'Paste Content', slot1: <Paperclip size={16} /> },
                    { label: 'Find and Replace', slot1: <Search size={16} /> },
                    { label: 'Select All', slot1: <Check size={16} /> },
                    { label: 'Undo Action', slot1: <RefreshCw size={16} /> },
                ],
            },
            {
                label: 'View Options',
                showSeparator: true,
                items: [
                    { label: 'Zoom In', slot1: <Plus size={16} /> },
                    { label: 'Zoom Out', slot1: <X size={16} /> },
                    { label: 'Full Screen', slot1: <Monitor size={16} /> },
                    { label: 'Grid View', slot1: <Grid size={16} /> },
                    { label: 'List View', slot1: <List size={16} /> },
                    { label: 'Toggle Layout', slot1: <Layout size={16} /> },
                ],
            },
        ]

        return (
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Searchable Menu"
                        leadingIcon={<Search size={16} />}
                    />
                }
                items={searchableItems}
                enableSearch
                searchPlaceholder="Search actions..."
                maxHeight={400}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Menu with search functionality to filter through many items. Type to filter items across all groups.',
            },
        },
    },
}

// Menu item variants and action types
export const ItemVariants: Story = {
    render: () => {
        const variantItems: MenuGroupType[] = [
            {
                label: 'Default Items',
                items: [
                    {
                        label: 'Regular Item',
                        subLabel: 'Standard menu item',
                        slot1: <Info size={16} />,
                        variant: MenuItemVariant.DEFAULT,
                    },
                    {
                        label: 'With Tooltip',
                        slot1: <HelpCircle size={16} />,
                        tooltip: 'This item has a helpful tooltip',
                    },
                    {
                        label: 'Disabled Item',
                        slot1: <Lock size={16} />,
                        disabled: true,
                    },
                ],
            },
            {
                label: 'Action Items',
                showSeparator: true,
                items: [
                    {
                        label: 'Primary Action',
                        subLabel: 'Important action',
                        slot1: <Star size={16} />,
                        variant: MenuItemVariant.ACTION,
                        actionType: MenuItemActionType.PRIMARY,
                    },
                    {
                        label: 'Delete Item',
                        subLabel: 'This action cannot be undone',
                        slot1: <Trash2 size={16} />,
                        variant: MenuItemVariant.ACTION,
                        actionType: MenuItemActionType.DANGER,
                    },
                ],
            },
        ]

        return (
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Item Variants"
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={variantItems}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Menu showing different item variants: default, action (primary/danger), disabled, and with tooltips.',
            },
        },
    },
}

// Multiple slots demonstration
export const MultipleSlots: Story = {
    render: () => {
        const multiSlotItems: MenuGroupType[] = [
            {
                label: 'Rich Menu Items',
                items: [
                    {
                        label: 'User Profile',
                        subLabel: 'View and edit profile',
                        slot1: <User size={16} />,
                        slot2: (
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                Admin
                            </div>
                        ),
                        slot3: <Star size={14} style={{ color: '#FFD700' }} />,
                        slot4: <ChevronRight size={16} />,
                    },
                    {
                        label: 'Premium Feature',
                        subLabel: 'Upgrade required',
                        slot1: <Zap size={16} style={{ color: '#FFD700' }} />,
                        slot2: (
                            <span
                                style={{
                                    fontSize: '10px',
                                    background: '#FFD700',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '4px',
                                }}
                            >
                                PRO
                            </span>
                        ),
                        slot3: <Lock size={14} />,
                        slot4: <ExternalLink size={16} />,
                    },
                    {
                        label: 'Recent Document',
                        subLabel: 'Last modified 2 hours ago',
                        slot1: <FileText size={16} />,
                        slot2: <Clock size={14} style={{ color: '#666' }} />,
                        slot3: (
                            <div style={{ fontSize: '12px', color: '#666' }}>
                                2.5 MB
                            </div>
                        ),
                        slot4: <MoreHorizontal size={16} />,
                    },
                ],
            },
            {
                label: 'Contact Information',
                showSeparator: true,
                items: [
                    {
                        label: 'John Doe',
                        subLabel: 'john.doe@company.com',
                        slot1: (
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    background: '#007bff',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '10px',
                                }}
                            >
                                JD
                            </div>
                        ),
                        slot2: (
                            <div style={{ fontSize: '12px', color: '#28a745' }}>
                                ●
                            </div>
                        ),
                        slot3: <Phone size={14} />,
                        slot4: <Mail size={16} />,
                    },
                ],
            },
        ]

        return (
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Multiple Slots"
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={multiSlotItems}
                minWidth={300}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Menu demonstrating the use of multiple slots (slot1, slot2, slot3, slot4) for rich content layout.',
            },
        },
    },
}

// Sub-menu support
export const WithSubMenus: Story = {
    render: () => {
        const subMenuItems: MenuGroupType[] = [
            {
                label: 'File Operations',
                items: [
                    {
                        label: 'New',
                        slot1: <Plus size={16} />,
                        slot4: <ChevronRight size={16} />,
                        subMenu: [
                            {
                                label: 'Document',
                                slot1: <FileText size={16} />,
                            },
                            {
                                label: 'Spreadsheet',
                                slot1: <Database size={16} />,
                            },
                            {
                                label: 'Presentation',
                                slot1: <Monitor size={16} />,
                            },
                            { label: 'Folder', slot1: <Folder size={16} /> },
                        ],
                    },
                    {
                        label: 'Recent Files',
                        slot1: <Clock size={16} />,
                        slot4: <ChevronRight size={16} />,
                        subMenu: [
                            {
                                label: 'Document_Final.pdf',
                                slot1: <FileText size={16} />,
                            },
                            {
                                label: 'Budget_2024.xlsx',
                                slot1: <Database size={16} />,
                            },
                            {
                                label: 'Presentation_Draft.pptx',
                                slot1: <Monitor size={16} />,
                            },
                        ],
                    },
                ],
            },
            {
                label: 'Tools',
                showSeparator: true,
                items: [
                    {
                        label: 'Developer Tools',
                        slot1: <Code size={16} />,
                        slot4: <ChevronRight size={16} />,
                        subMenu: [
                            { label: 'Console', slot1: <Terminal size={16} /> },
                            { label: 'Network', slot1: <Globe size={16} /> },
                            {
                                label: 'Performance',
                                slot1: <TrendingUp size={16} />,
                            },
                            { label: 'Security', slot1: <Shield size={16} /> },
                        ],
                    },
                    {
                        label: 'Themes',
                        slot1: <Palette size={16} />,
                        slot4: <ChevronRight size={16} />,
                        subMenu: [
                            { label: 'Light Theme', slot1: <Sun size={16} /> },
                            {
                                label: 'Dark Theme',
                                slot1: <Monitor size={16} />,
                            },
                            { label: 'Auto', slot1: <Eye size={16} /> },
                        ],
                    },
                ],
            },
        ]

        return (
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Sub Menus"
                        trailingIcon={<ChevronDown size={16} />}
                    />
                }
                items={subMenuItems}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Menu with nested sub-menus for hierarchical navigation. Hover over items with arrows to reveal sub-menus.',
            },
        },
    },
}

// Controlled menu state
export const ControlledState: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    alignItems: 'flex-start',
                }}
            >
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text="Open Menu"
                        onClick={() => setIsOpen(true)}
                        disabled={isOpen}
                    />
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.SMALL}
                        text="Close Menu"
                        onClick={() => setIsOpen(false)}
                        disabled={!isOpen}
                    />
                </div>

                <Menu
                    trigger={
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            text={isOpen ? 'Menu is Open' : 'Menu is Closed'}
                            trailingIcon={<ChevronDown size={16} />}
                        />
                    }
                    items={basicMenuItems}
                    open={isOpen}
                    onOpenChange={setIsOpen}
                />

                <div style={{ fontSize: '14px', color: '#666' }}>
                    Menu State: {isOpen ? 'Open' : 'Closed'}
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Menu with controlled open state. External buttons can control whether the menu is open or closed.',
            },
        },
    },
}

// Large menu with virtual scrolling
export const VirtualScrolling: Story = {
    render: () => {
        // Generate a large list of items
        const generateLargeMenuItems = (): MenuGroupType[] => {
            const categories = ['Files', 'Actions', 'Tools', 'Settings', 'Help']
            const icons = [
                FileText,
                Edit,
                Settings,
                HelpCircle,
                Folder,
                Save,
                Copy,
                Trash2,
                Download,
                Upload,
            ]

            return categories.map((category, categoryIndex) => ({
                label: category,
                showSeparator: categoryIndex > 0,
                items: Array.from({ length: 20 }, (_, index) => ({
                    label: `${category} Item ${index + 1}`,
                    subLabel: `Description for ${category.toLowerCase()} item ${index + 1}`,
                    slot1: React.createElement(icons[index % icons.length], {
                        size: 16,
                    }),
                    onClick: () =>
                        console.log(`${category} Item ${index + 1} clicked`),
                })),
            }))
        }

        return (
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Large Menu (Virtual Scroll)"
                        leadingIcon={<List size={16} />}
                    />
                }
                items={generateLargeMenuItems()}
                enableSearch
                searchPlaceholder="Search through 100+ items..."
                enableVirtualScrolling
                virtualItemHeight={40}
                virtualOverscan={5}
                virtualScrollThreshold={20}
                maxHeight={400}
            />
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Menu with virtual scrolling enabled for performance with large lists (100+ items). Includes search functionality.',
            },
        },
    },
}

// Different dimensions
export const CustomDimensions: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Small Menu"
                    />
                }
                items={basicMenuItems}
                maxWidth={200}
                minWidth={150}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Large Menu"
                    />
                }
                items={fileMenuItems}
                maxWidth={400}
                minWidth={300}
                maxHeight={500}
            />
            <Menu
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        size={ButtonSize.MEDIUM}
                        text="Fixed Size"
                    />
                }
                items={basicMenuItems}
                minWidth={250}
                maxWidth={250}
                minHeight={200}
                maxHeight={200}
            />
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Menu with different dimension constraints: small, large, and fixed size.',
            },
        },
    },
}

// Modal mode
export const ModalMode: Story = {
    render: () => (
        <Menu
            trigger={
                <Button
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    text="Modal Menu"
                    leadingIcon={<Globe size={16} />}
                />
            }
            items={basicMenuItems}
            asModal
        />
    ),
    parameters: {
        docs: {
            description: {
                story: 'Menu rendered as a modal with focus trapping. Try tabbing to see focus management.',
            },
        },
    },
}
