import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import { expect, userEvent, within } from '@storybook/test'
import {
    Menu,
    MenuAlignment,
    MenuSide,
    MenuItemVariant,
    MenuItemActionType,
    MenuGroupType,
} from '@juspay/blend-design-system/deprecated/menu'
import {
    Button,
    ButtonType,
    ButtonSize,
} from '@juspay/blend-design-system/deprecated/button'
import {
    ChevronDown,
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
    Eye,
    Lock,
    Mail,
    Shield,
    Globe,
    Sun,
    Monitor,
    Check,
    X,
    Info,
    ChevronRight,
    Folder,
    Image,
    Upload,
    RefreshCw,
    Zap,
    Printer,
    Scissors,
    Paperclip,
    Database,
    Grid,
    List,
    Layout,
    MoreHorizontal,
    Star,
    ExternalLink,
    Clock,
    Phone,
    Palette,
    Code,
    Terminal,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'

const meta: Meta<typeof Menu> = {
    title: 'Components/Menu',
    component: Menu,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('navigation'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            "A versatile dropdown menu component built on top of Radix UI's DropdownMenu primitive.",
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Menu, MenuAlignment, MenuSide, MenuItemVariant, MenuItemActionType } from '@juspay/blend-design-system/deprecated/menu';

<Menu
  trigger={<Button text="Open Menu" />}
  items={menuItems}
  alignment={MenuAlignment.START}
  side={MenuSide.BOTTOM}
  enableSearch
  maxHeight={400}
/>
\`\`\`

## Features
- Multiple alignment and positioning options
- Search functionality for filtering menu items
- Grouped items with labels and separators
- Support for sub-labels and multiple slots (slot1, slot2, slot3, slot4)
- Action variants (default, action) with types (primary, danger)
- Disabled state support
- Sub-menu support for nested navigation
- Virtual scrolling for large lists
- Controlled item selection with checkmark or highlight styles
- Single-select radio or multi-select checkbox accessibility semantics
- \`closeOnSelect\` (default \`true\`) for controlled multi-select menus
- Modal mode for focus trapping
- Customizable dimensions (min/max width/height)
- Keyboard navigation and accessibility
- Collision detection and boundary awareness
- Tooltip support for menu items


## Accessibility

Built on Radix UI's DropdownMenu primitive for robust accessibility.

**WCAG Compliance**: 2.1 Level AA Fully Compliant

**Keyboard Navigation:**
- Enter / Space: Open menu and select items
- Arrow Up / Down: Navigate between items
- Arrow Right / Left: Open/close sub-menus
- Escape: Close menu and return focus
- Tab / Shift+Tab: Cycle focusable elements
- Home: Jump to first item
- End: Jump to last item

**ARIA Attributes:**
- Trigger: aria-haspopup, aria-expanded, aria-controls
- Menu: role="menu", aria-orientation
- Items without \`selected\`: role="menuitem", aria-disabled
- Selectable single-mode items: role="menuitemradio" with \`aria-checked\`
- Selectable multiple-mode items: role="menuitemcheckbox" with \`aria-checked\`
- Checkmark icons are decorative; submenu parents remain triggers and only leaves participate

**Controlled selection:**
- Set \`selected\` on every item that participates; omitting it preserves the legacy action item.
- \`Menu\` never changes \`selected\`. Rebuild the \`items\` array from consumer state in each \`onClick\` callback.
- \`closeOnSelect={false}\` is a menu-wide policy intended for multi-select workflows.

**Screen Readers:**
- Announces open/close state
- Reports item count and position
- SubLabels provide additional context

**Verification:**
- Storybook a11y addon: Check Accessibility panel
- Manual: Navigate using keyboard only
- Screen readers: VoiceOver, NVDA, JAWS
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
        selectionStyle: {
            control: { type: 'inline-radio' },
            options: ['checkmark', 'highlight'],
            description:
                'How selected items are indicated. Group-level selectionStyle overrides this value.',
            table: {
                type: { summary: "'checkmark' | 'highlight'" },
                category: 'Selection',
            },
        },
        selectionMode: {
            control: { type: 'inline-radio' },
            options: ['single', 'multiple'],
            description:
                'Accessibility cardinality for selected items. Group-level selectionMode overrides this value.',
            table: {
                type: { summary: "'single' | 'multiple'" },
                defaultValue: { summary: 'single' },
                category: 'Selection',
            },
        },
        closeOnSelect: {
            control: { type: 'boolean' },
            description:
                'When false, activating any leaf keeps this menu open. Defaults to true.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Selection',
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
        skeleton: {
            control: false,
            description:
                'Skeleton loading state configuration for the menu content',
            table: {
                type: { summary: 'MenuSkeletonProps' },
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
        <div className="flex gap-5 items-center">
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
        <div className="grid grid-cols-3 gap-5 items-center justify-items-center p-24">
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
                            <div className="text-xs text-gray-500">Admin</div>
                        ),
                        slot3: <Star size={14} className="text-yellow-400" />,
                        slot4: <ChevronRight size={16} />,
                    },
                    {
                        label: 'Premium Feature',
                        subLabel: 'Upgrade required',
                        slot1: <Zap size={16} className="text-yellow-400" />,
                        slot2: (
                            <span className="text-[10px] bg-yellow-400 text-white px-1.5 py-0.5 rounded">
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
                        slot2: <Clock size={14} className="text-gray-500" />,
                        slot3: (
                            <div className="text-xs text-gray-500">2.5 MB</div>
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
                            <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">
                                JD
                            </div>
                        ),
                        slot2: <div className="text-xs text-green-600">●</div>,
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
            <div className="flex flex-col gap-5 items-start">
                <div className="flex gap-2.5">
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

                <div className="text-sm text-gray-600">
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

export const SingleSelectCheckmark: Story = {
    render: function SingleSelectCheckmarkRender() {
        const [sortBy, setSortBy] = useState('name-asc')

        const options = [
            { id: 'name-asc', label: 'Name (A–Z)' },
            { id: 'name-desc', label: 'Name (Z–A)' },
            { id: 'date-newest', label: 'Date (newest)' },
            { id: 'date-oldest', label: 'Date (oldest)' },
        ]

        const items: MenuGroupType[] = [
            {
                label: 'Sort by',
                items: options.map((option) => ({
                    label: option.label,
                    selected: sortBy === option.id,
                    onClick: () => setSortBy(option.id),
                })),
            },
        ]

        return (
            <div className="flex flex-col gap-3">
                <Menu
                    trigger={
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text={`Sort: ${options.find((option) => option.id === sortBy)?.label}`}
                        />
                    }
                    items={items}
                    selectionStyle="checkmark"
                    selectionMode="single"
                />
                <p className="text-xs text-gray-600">
                    Controlled single-select sort picker. The consumer owns
                    <code>selected</code>; the menu closes by default after a
                    keyboard or pointer selection.
                </p>
            </div>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: /sort:/i })

        await userEvent.click(trigger)

        const nameDesc = await canvas.findByRole('menuitemradio', {
            name: /name \(z–a\)/i,
        })
        await expect(nameDesc).toHaveAttribute('aria-checked', 'false')

        const nameAsc = canvas.getByRole('menuitemradio', {
            name: /name \(a–z\)/i,
        })
        await expect(nameAsc).toHaveAttribute('aria-checked', 'true')

        await userEvent.keyboard('{ArrowDown}')
        await expect(nameDesc).toHaveFocus()
        await userEvent.keyboard('{Enter}')
        await expect(trigger).toHaveTextContent(/name \(z–a\)/i)
    },
    parameters: {
        docs: {
            description: {
                story: `Controlled single-select menu with \`selectionStyle="checkmark"\` and \`selectionMode="single"\`. Each item maps \`selected\` from consumer state; the default \`closeOnSelect\` behavior closes the menu after activation.`,
            },
        },
    },
}

export const MultiSelectHighlight: Story = {
    render: function MultiSelectHighlightRender() {
        const [views, setViews] = useState<string[]>(['grid', 'preview'])

        const options = [
            { id: 'list', label: 'List' },
            { id: 'grid', label: 'Grid' },
            { id: 'preview', label: 'Preview pane' },
            { id: 'sidebar', label: 'Sidebar' },
        ]

        const toggle = (id: string) => {
            setViews((previous) =>
                previous.includes(id)
                    ? previous.filter((value) => value !== id)
                    : [...previous, id]
            )
        }

        const items: MenuGroupType[] = [
            {
                label: 'Visible panels',
                items: options.map((option) => ({
                    label: option.label,
                    selected: views.includes(option.id),
                    onClick: () => toggle(option.id),
                })),
            },
        ]

        return (
            <div className="flex flex-col gap-3">
                <Menu
                    trigger={
                        <Button
                            buttonType={ButtonType.SECONDARY}
                            text="View options"
                        />
                    }
                    items={items}
                    selectionStyle="highlight"
                    selectionMode="multiple"
                    closeOnSelect={false}
                />
                <p className="text-xs text-gray-600">
                    Controlled multi-select view switcher with{' '}
                    <code>selectionStyle="highlight"</code>. The menu remains
                    open because <code>closeOnSelect</code> is false.
                </p>
                <div className="text-xs text-gray-600">
                    Active: <strong>{views.join(', ') || 'none'}</strong>
                </div>
            </div>
        )
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const trigger = canvas.getByRole('button', { name: /view options/i })

        await userEvent.click(trigger)

        const list = await canvas.findByRole('menuitemcheckbox', {
            name: /^list$/i,
        })
        const grid = canvas.getByRole('menuitemcheckbox', { name: /^grid$/i })

        await expect(list).toHaveAttribute('aria-checked', 'false')
        await expect(grid).toHaveAttribute('aria-checked', 'true')

        await userEvent.click(list)
        await expect(
            await canvas.findByRole('menuitemcheckbox', { name: /^list$/i })
        ).toHaveAttribute('aria-checked', 'true')
        await expect(
            canvas.getByRole('menuitemcheckbox', { name: /^grid$/i })
        ).toBeInTheDocument()
    },
    parameters: {
        docs: {
            description: {
                story: `Controlled multi-select menu with \`selectionStyle="highlight"\`, \`selectionMode="multiple"\`, and \`closeOnSelect={false}\`. Selection state remains fully controlled by the consumer.`,
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
        <div className="flex gap-5 items-center">
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
