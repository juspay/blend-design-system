import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    MultiSelect,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
    MultiSelectMenuSize,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import {
    createControlledAsyncSearchPlay,
    mockAsyncSearchItems,
    useMockAsyncSearch,
} from '../../selectAsyncSearchStory'
import {
    Palette,
    Briefcase,
    DollarSign,
    TrendingUp,
    BarChart3,
    FileText,
    Headphones,
    Settings,
    Shield,
    Eye,
    Upload,
    Trash2,
    Edit,
    Plus,
    Code,
    Database,
    Server,
    Cloud,
    Cpu,
    Layers,
    Archive,
    Sparkles,
    Brain,
    Link,
    Globe,
} from 'lucide-react'

// Local types for reference
type MultiSelectMenuItemType = {
    label: string
    value: string
    checked?: boolean
    subLabel?: string
    slot1?: React.ReactNode
    slot2?: React.ReactNode
    slot3?: React.ReactNode
    slot4?: React.ReactNode
    disabled?: boolean
    alwaysSelected?: boolean
    onClick?: () => void
    subMenu?: MultiSelectMenuItemType[]
    tooltip?: string | React.ReactNode
    disableTruncation?: boolean
}

type MultiSelectMenuGroupType = {
    groupLabel?: string
    items: MultiSelectMenuItemType[]
    showSeparator?: boolean
}

const meta: Meta<typeof MultiSelect> = {
    title: 'Components/MultiSelect',
    component: MultiSelect,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for form components
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A comprehensive multi-selection dropdown component that allows users to select multiple options from grouped lists.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { 
  MultiSelect, 
  MultiSelectSelectionTagType, 
  MultiSelectVariant,
  MultiSelectMenuSize 
} from '@juspay/blend-design-system';

const [selectedValues, setSelectedValues] = useState<string[]>([]);

<MultiSelect
  label="Select Skills"
  placeholder="Choose your skills"
  items={skillItems}
  selectedValues={selectedValues}
  onSelectionChange={setSelectedValues}
  selectionTagType={MultiSelectSelectionTagType.COUNT}
  enableSearch
  enableSelectAll
/>
\`\`\`

\`MultiSelect\` is controlled: pass the returned array back through
\`selectedValues\`. Prefer \`onSelectionChange\`, which fires once per user
gesture with the complete resulting selection. \`onChange\` is the legacy
per-item toggle callback and remains supported for compatibility.

## Features
- **Multiple Selection**: Select multiple items from grouped lists
- **Display Modes**: Show selected items as count or text list
- **Search & Filtering**: Built-in search functionality for large datasets
- **Select All**: Bulk selection with select all functionality
- **Advanced Controls**: Action buttons, max selections, and virtualization
- **Responsive Design**: Mobile drawer mode for better touch experience
- **Rich Content**: Support for icons, sub-labels, tooltips, and custom slots
- **Accessibility**: Full keyboard navigation and screen reader support
- **Form Integration**: Complete form validation and error handling
- **Performance**: Virtualization support for large datasets
- **Infinite Scroll**: Load more items as needed

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Arrow keys, Enter, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (aria-labelledby, aria-describedby, aria-invalid, aria-expanded, aria-controls, aria-multiselectable)
- Label association via htmlFor/id
- Error state communicated via aria-invalid
- Required state indicated with asterisk and aria-labelledby
- Touch targets meet Level AA requirement (24x24px minimum)

**Level AAA Compliance**: ⚠️ Partial (6 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.3.3 Animation from Interactions, 3.2.5 Change on Request, 2.5.5 Target Size Height (Small=50px, Medium=56px, Large=72px all exceed 44px)
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently designed for AA 4.5:1)
- ⚠️ **Verification Required**: 2.5.5 Target Size Width - height verified but width requires manual verification as it depends on content length
- ⚠️ **Application-Dependent**: 3.3.6 Error Prevention (All) - requires application-level confirmation patterns for critical actions
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Touch Target Sizes**:
- Small: 50px height (exceeds AAA 44px), width varies by content
- Medium: 56px height (exceeds AAA 44px), width varies by content
- Large: 72px height (exceeds AAA 44px), width varies by content

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test MultiSelect.accessibility\` (55+ tests covering WCAG 2.1 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker, verify touch target width in browser DevTools
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

        `,
            },
        },
    },
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the multi-select',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        sublabel: {
            control: { type: 'text' },
            description: 'Secondary label text for additional context',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        placeholder: {
            control: { type: 'text' },
            description: 'Placeholder text when no selection is made',
            table: {
                type: { summary: 'string' },
                category: 'Content',
            },
        },
        hintText: {
            control: { type: 'text' },
            description: 'Hint text displayed below the multi-select',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        helpIconHintText: {
            control: { type: 'text' },
            description: 'Tooltip text for the help icon',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        selectedValues: {
            control: { type: 'object' },
            description: 'Array of currently selected values',
            table: {
                type: {
                    summary: 'string[]',
                    detail: `Array of selected option values (matching the 'value' property of items).
Example: ['react', 'nodejs', 'postgresql']`,
                },
                category: 'Core',
            },
        },
        onChange: {
            action: 'selection-changed',
            description:
                'Legacy: per-item toggle callback. Prefer onSelectionChange.',
            table: {
                type: { summary: '(selectedValue: string) => void' },
                category: 'Core',
            },
        },
        onSelectionChange: {
            action: 'selection-snapshot-changed',
            description:
                'Recommended: full post-gesture selection, fired once per user gesture.',
            table: {
                type: { summary: '(selectedValues: string[]) => void' },
                category: 'Core',
            },
        },
        items: {
            control: { type: 'object' },
            description: 'Array of grouped menu items',
            table: {
                type: {
                    summary: 'MultiSelectMenuGroupType[]',
                    detail: `MultiSelectMenuGroupType: {
  groupLabel?: string;              // Optional group label
  items: MultiSelectMenuItemType[]; // Array of menu items
  showSeparator?: boolean;          // Show separator after group
}

MultiSelectMenuItemType: {
  value: string;                    // Unique identifier (required)
  label: string;                    // Display text (required)
  subLabel?: string;               // Secondary description text
  slot1?: ReactNode;               // Leading icon/content
  slot2?: ReactNode;               // Trailing icon/content
  disabled?: boolean;              // Disable this item
  href?: string;                   // Link URL (renders as anchor)
  onClick?: () => void;            // Click handler
  tooltip?: string | ReactNode;    // Tooltip content
}`,
                },
                category: 'Core',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(MultiSelectMenuSize),
            description: 'Size variant of the multi-select',
            table: {
                type: { summary: 'MultiSelectMenuSize' },
                defaultValue: { summary: 'MultiSelectMenuSize.MEDIUM' },
                category: 'Appearance',
            },
        },
        variant: {
            control: { type: 'select' },
            options: Object.values(MultiSelectVariant),
            description: 'Visual variant of the multi-select',
            table: {
                type: { summary: 'MultiSelectVariant' },
                defaultValue: { summary: 'MultiSelectVariant.CONTAINER' },
                category: 'Appearance',
            },
        },
        selectionTagType: {
            control: { type: 'select' },
            options: Object.values(MultiSelectSelectionTagType),
            description: 'How to display selected items (count or text)',
            table: {
                type: { summary: 'MultiSelectSelectionTagType' },
                defaultValue: { summary: 'MultiSelectSelectionTagType.COUNT' },
                category: 'Display',
            },
        },
        required: {
            control: { type: 'boolean' },
            description: 'Whether the field is required',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        disabled: {
            control: { type: 'boolean' },
            description: 'Whether the multi-select is disabled',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'State',
            },
        },
        enableSearch: {
            control: { type: 'boolean' },
            description: 'Enable search functionality in the dropdown',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Features',
            },
        },
        enableSelectAll: {
            control: { type: 'boolean' },
            description: 'Enable select all functionality',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Features',
            },
        },
        maxSelections: {
            control: { type: 'number' },
            description: 'Maximum number of selections allowed',
            table: {
                type: { summary: 'number' },
                category: 'Validation',
            },
        },
        useDrawerOnMobile: {
            control: { type: 'boolean' },
            description: 'Use drawer interface on mobile devices',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Responsive',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the multi-select is in error state',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation',
            },
        },
        errorMessage: {
            control: { type: 'text' },
            description: 'Error message displayed when in error state',
            table: {
                type: { summary: 'string' },
                category: 'Validation',
            },
        },
        skeleton: {
            control: { type: 'object' },
            description:
                'Skeleton loading configuration object. Controls the appearance and behavior of skeleton loading states while data is being fetched.',
            table: {
                type: {
                    summary:
                        '{ count?: number, show?: boolean, variant?: SkeletonVariant }',
                },
                defaultValue: {
                    summary: "{ count: 3, show: false, variant: 'pulse' }",
                },
                category: 'Loading',
            },
        },
        maxTriggerWidth: {
            control: { type: 'number' },
            description:
                'Maximum width constraint for the trigger button in pixels. Prevents the trigger from growing beyond this width.',
            table: {
                type: { summary: 'number' },
                category: 'Dimensions',
            },
        },
        minTriggerWidth: {
            control: { type: 'number' },
            description:
                'Minimum width constraint for the trigger button in pixels. Ensures the trigger maintains at least this width.',
            table: {
                type: { summary: 'number' },
                category: 'Dimensions',
            },
        },
        allowCustomValue: {
            control: { type: 'boolean' },
            description:
                'When true, allows users to enter custom values that are not in the predefined items list. Enables a special menu option for custom input.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Features',
            },
        },
        customValueLabel: {
            control: { type: 'text' },
            description:
                'Label text for the custom value option in the dropdown menu. Only visible when allowCustomValue is true.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"Specify"' },
                category: 'Content',
            },
        },
        showClearButton: {
            control: { type: 'boolean' },
            description:
                'Controls the visibility of the X icon (clear button) beside the multi-select trigger. When true, shows clear button when items are selected. When false, hides clear button. If not provided, defaults based on variant and selection state.',
            table: {
                type: { summary: 'boolean' },
                category: 'Behavior',
            },
        },
        onClearAllClick: {
            action: 'clear-all-clicked',
            description:
                "Callback function invoked when the X icon (clear button) is clicked. Provides a separate callback from onChange for handling clear actions (e.g., API calls). If not provided, falls back to onChange('').",
            table: {
                type: { summary: '() => void' },
                category: 'Behavior',
            },
        },
        onOpenChange: {
            action: 'open-change',
            description:
                'Callback function invoked when the dropdown menu or mobile drawer opens or closes. Receives a boolean indicating the new open state.',
            table: {
                type: { summary: '(open: boolean) => void' },
                category: 'Behavior',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MultiSelect>

// Sample data sets
const skillItems: MultiSelectMenuGroupType[] = [
    {
        groupLabel: 'Frontend Technologies',
        items: [
            { value: 'react', label: 'React', slot1: <Code size={16} /> },
            { value: 'vue', label: 'Vue.js', slot1: <Code size={16} /> },
            { value: 'angular', label: 'Angular', slot1: <Code size={16} /> },
            { value: 'svelte', label: 'Svelte', slot1: <Code size={16} /> },
            { value: 'nextjs', label: 'Next.js', slot1: <Code size={16} /> },
        ],
    },
    {
        groupLabel: 'Backend Technologies',
        items: [
            { value: 'nodejs', label: 'Node.js', slot1: <Server size={16} /> },
            { value: 'python', label: 'Python', slot1: <Server size={16} /> },
            { value: 'java', label: 'Java', slot1: <Server size={16} /> },
            { value: 'csharp', label: 'C#', slot1: <Server size={16} /> },
            { value: 'go', label: 'Go', slot1: <Server size={16} /> },
            { value: 'rust', label: 'Rust', slot1: <Server size={16} /> },
        ],
    },
    {
        groupLabel: 'Databases',
        items: [
            {
                value: 'postgresql',
                label: 'PostgreSQL',
                slot1: <Database size={16} />,
            },
            { value: 'mysql', label: 'MySQL', slot1: <Database size={16} /> },
            {
                value: 'mongodb',
                label: 'MongoDB',
                slot1: <Database size={16} />,
            },
            { value: 'redis', label: 'Redis', slot1: <Database size={16} /> },
            {
                value: 'elasticsearch',
                label: 'Elasticsearch',
                slot1: <Database size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Cloud & DevOps',
        items: [
            {
                value: 'aws',
                label: 'Amazon Web Services',
                slot1: <Cloud size={16} />,
            },
            {
                value: 'gcp',
                label: 'Google Cloud Platform',
                slot1: <Cloud size={16} />,
            },
            {
                value: 'azure',
                label: 'Microsoft Azure',
                slot1: <Cloud size={16} />,
            },
            { value: 'docker', label: 'Docker', slot1: <Layers size={16} /> },
            {
                value: 'kubernetes',
                label: 'Kubernetes',
                slot1: <Layers size={16} />,
            },
        ],
    },
]

const permissionItems: MultiSelectMenuGroupType[] = [
    {
        groupLabel: 'User Management',
        items: [
            {
                value: 'user.view',
                label: 'View Users',
                subLabel: 'Read-only access to user data',
                slot1: <Eye size={16} />,
            },
            {
                value: 'user.create',
                label: 'Create Users',
                subLabel: 'Add new users to the system',
                slot1: <Plus size={16} />,
            },
            {
                value: 'user.edit',
                label: 'Edit Users',
                subLabel: 'Modify existing user details',
                slot1: <Edit size={16} />,
            },
            {
                value: 'user.delete',
                label: 'Delete Users',
                subLabel: 'Remove users from the system',
                slot1: <Trash2 size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Content Management',
        items: [
            {
                value: 'content.view',
                label: 'View Content',
                subLabel: 'Read-only access to content',
                slot1: <FileText size={16} />,
            },
            {
                value: 'content.create',
                label: 'Create Content',
                subLabel: 'Add new content items',
                slot1: <Plus size={16} />,
            },
            {
                value: 'content.edit',
                label: 'Edit Content',
                subLabel: 'Modify existing content',
                slot1: <Edit size={16} />,
            },
            {
                value: 'content.publish',
                label: 'Publish Content',
                subLabel: 'Make content publicly visible',
                slot1: <Upload size={16} />,
            },
        ],
    },
    {
        groupLabel: 'System Administration',
        items: [
            {
                value: 'admin.settings',
                label: 'System Settings',
                subLabel: 'Modify system configuration',
                slot1: <Settings size={16} />,
            },
            {
                value: 'admin.backup',
                label: 'Backup & Recovery',
                subLabel: 'Manage system backups',
                slot1: <Archive size={16} />,
            },
            {
                value: 'admin.security',
                label: 'Security Settings',
                subLabel: 'Configure security policies',
                slot1: <Shield size={16} />,
            },
        ],
    },
]

const categoryItems: MultiSelectMenuGroupType[] = [
    {
        groupLabel: 'Business Categories',
        items: [
            {
                value: 'technology',
                label: 'Technology',
                slot1: <Cpu size={16} />,
            },
            { value: 'design', label: 'Design', slot1: <Palette size={16} /> },
            {
                value: 'business',
                label: 'Business',
                slot1: <Briefcase size={16} />,
            },
            {
                value: 'marketing',
                label: 'Marketing',
                slot1: <TrendingUp size={16} />,
            },
            { value: 'sales', label: 'Sales', slot1: <DollarSign size={16} /> },
            {
                value: 'support',
                label: 'Customer Support',
                slot1: <Headphones size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Innovation Areas',
        items: [
            {
                value: 'ai',
                label: 'Artificial Intelligence',
                slot1: <Brain size={16} />,
            },
            {
                value: 'blockchain',
                label: 'Blockchain',
                slot1: <Link size={16} />,
            },
            {
                value: 'iot',
                label: 'Internet of Things',
                slot1: <Globe size={16} />,
            },
            {
                value: 'cybersecurity',
                label: 'Cybersecurity',
                slot1: <Shield size={16} />,
            },
            {
                value: 'data-science',
                label: 'Data Science',
                slot1: <BarChart3 size={16} />,
            },
        ],
    },
]

// Default story
export const Default: Story = {
    render: function DefaultMultiSelect(args) {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <div className="w-100">
                <MultiSelect
                    {...args}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSelectedValues([])
                        } else if (typeof value === 'string') {
                            setSelectedValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                />
            </div>
        )
    },
    args: {
        label: 'Select Skills',
        placeholder: 'Choose your technical skills',
        items: skillItems,
        selectedValues: [],
        selectionTagType: MultiSelectSelectionTagType.COUNT,
        size: MultiSelectMenuSize.MEDIUM,
        variant: MultiSelectVariant.CONTAINER,
        enableSearch: true,
        enableSelectAll: false,
        required: false,
        disabled: false,
    },
}

// Selection display modes
export const SelectionDisplayModes: Story = {
    render: () => {
        const [countValues, setCountValues] = useState<string[]>([
            'react',
            'nodejs',
        ])
        const [textValues, setTextValues] = useState<string[]>([
            'design',
            'technology',
        ])

        return (
            <div className="flex flex-col gap-6 w-100">
                <MultiSelect
                    label="Count Display"
                    placeholder="Select skills"
                    items={skillItems}
                    selectedValues={countValues}
                    onChange={(value) => {
                        if (value === '') {
                            setCountValues([])
                        } else if (typeof value === 'string') {
                            setCountValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    helpIconHintText="Shows selected count in a compact format"
                />

                <MultiSelect
                    label="Text Display"
                    placeholder="Select categories"
                    items={categoryItems}
                    selectedValues={textValues}
                    onChange={(value) => {
                        if (value === '') {
                            setTextValues([])
                        } else if (typeof value === 'string') {
                            setTextValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    selectionTagType={MultiSelectSelectionTagType.TEXT}
                    helpIconHintText="Shows selected items as readable text"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiSelect supports two selection display modes: COUNT (compact) and TEXT (readable list).',
            },
        },
    },
}

// Different sizes
export const Sizes: Story = {
    render: () => {
        const [smallValues, setSmallValues] = useState<string[]>([])
        const [mediumValues, setMediumValues] = useState<string[]>([])
        const [largeValues, setLargeValues] = useState<string[]>([])

        return (
            <div className="flex flex-col gap-6 w-100">
                <MultiSelect
                    label="Small Size"
                    placeholder="Choose options"
                    items={skillItems}
                    selectedValues={smallValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSmallValues([])
                        } else if (typeof value === 'string') {
                            setSmallValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    size={MultiSelectMenuSize.SMALL}
                />

                <MultiSelect
                    label="Medium Size (Default)"
                    placeholder="Choose options"
                    items={skillItems}
                    selectedValues={mediumValues}
                    onChange={(value) => {
                        if (value === '') {
                            setMediumValues([])
                        } else if (typeof value === 'string') {
                            setMediumValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    size={MultiSelectMenuSize.MEDIUM}
                />

                <MultiSelect
                    label="Large Size"
                    placeholder="Choose options"
                    items={skillItems}
                    selectedValues={largeValues}
                    onChange={(value) => {
                        if (value === '') {
                            setLargeValues([])
                        } else if (typeof value === 'string') {
                            setLargeValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    size={MultiSelectMenuSize.LARGE}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiSelect comes in three sizes: Small (sm), Medium (md), and Large (lg).',
            },
        },
    },
}

// With search functionality
export const WithSearch: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <div className="w-100">
                <MultiSelect
                    label="Technologies"
                    placeholder="Search and select technologies"
                    items={skillItems}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSelectedValues([])
                        } else if (typeof value === 'string') {
                            setSelectedValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    enableSearch={true}
                    searchPlaceholder="Type to filter technologies..."
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    helpIconHintText="Start typing to filter the available options"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Enable search functionality to filter through large lists of options.',
            },
        },
    },
}

// With select all functionality
export const WithSelectAll: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <div className="w-100">
                <MultiSelect
                    label="User Permissions"
                    placeholder="Select permissions"
                    items={permissionItems}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSelectedValues([])
                        } else if (typeof value === 'string') {
                            setSelectedValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    enableSelectAll={true}
                    selectAllText="Grant All Permissions"
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    helpIconHintText="You can select all permissions at once"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Enable select all functionality for bulk selection of items.',
            },
        },
    },
}

// No container variant
export const NoContainer: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([
            'technology',
            'design',
        ])

        return (
            <div className="flex items-center gap-4">
                <span className="font-medium">Filter by categories:</span>
                <MultiSelect
                    label="Categories"
                    placeholder="All categories"
                    items={categoryItems}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSelectedValues([])
                        } else if (typeof value === 'string') {
                            setSelectedValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    variant={MultiSelectVariant.NO_CONTAINER}
                    size={MultiSelectMenuSize.SMALL}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'No container variant for inline filtering and toolbar usage.',
            },
        },
    },
}

// Maximum selections
export const MaxSelections: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([
            'react',
            'nodejs',
        ])
        const maxCount = 3

        return (
            <div className="w-100">
                <MultiSelect
                    label="Top 3 Skills"
                    sublabel={`Select up to ${maxCount} primary skills`}
                    placeholder="Choose your top skills"
                    items={skillItems}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSelectedValues([])
                        } else if (typeof value === 'string') {
                            setSelectedValues((prev) => {
                                const newValues = prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                                return newValues.slice(0, maxCount)
                            })
                        }
                    }}
                    maxSelections={maxCount}
                    selectionTagType={MultiSelectSelectionTagType.TEXT}
                    hintText={`${selectedValues.length}/${maxCount} skills selected`}
                    error={selectedValues.length === 0}
                    errorMessage={
                        selectedValues.length === 0
                            ? 'Please select at least one skill'
                            : ''
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Limit the maximum number of selections with validation feedback.',
            },
        },
    },
}

// Error states
export const ErrorStates: Story = {
    render: () => {
        const [requiredValues, setRequiredValues] = useState<string[]>([])
        const [validValues, setValidValues] = useState<string[]>([
            'react',
            'nodejs',
        ])

        return (
            <div className="flex flex-col gap-6 w-100">
                <MultiSelect
                    label="Required Skills"
                    sublabel="Required field"
                    placeholder="Select required skills"
                    items={skillItems}
                    selectedValues={requiredValues}
                    onChange={(value) => {
                        if (value === '') {
                            setRequiredValues([])
                        } else if (typeof value === 'string') {
                            setRequiredValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    required
                    error={requiredValues.length === 0}
                    errorMessage={
                        requiredValues.length === 0
                            ? 'Please select at least one skill'
                            : ''
                    }
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                />

                <MultiSelect
                    label="Valid Selection"
                    placeholder="Working correctly"
                    items={skillItems}
                    selectedValues={validValues}
                    onChange={(value) => {
                        if (value === '') {
                            setValidValues([])
                        } else if (typeof value === 'string') {
                            setValidValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    hintText="This field is working correctly"
                    selectionTagType={MultiSelectSelectionTagType.TEXT}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiSelect in error and valid states with appropriate feedback.',
            },
        },
    },
}

// Disabled state
export const DisabledState: Story = {
    render: () => {
        return (
            <div className="flex flex-col gap-6 w-100">
                <MultiSelect
                    label="Disabled Empty"
                    placeholder="Cannot interact"
                    items={skillItems}
                    selectedValues={[]}
                    onChange={() => {}}
                    disabled
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                />

                <MultiSelect
                    label="Disabled with Selection"
                    placeholder="Has selections but disabled"
                    items={skillItems}
                    selectedValues={['react', 'nodejs', 'postgresql']}
                    onChange={() => {}}
                    disabled
                    selectionTagType={MultiSelectSelectionTagType.TEXT}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiSelect in disabled state, both empty and with selections.',
            },
        },
    },
}

// Form integration
export const FormIntegration: Story = {
    render: () => {
        const [skills, setSkills] = useState<string[]>([])
        const [permissions, setPermissions] = useState<string[]>([])
        const [categories, setCategories] = useState<string[]>([])

        return (
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '500px',
                }}
            >
                <MultiSelect
                    label="Technical Skills"
                    sublabel="Required - Select your primary skills"
                    placeholder="Choose your technical expertise"
                    items={skillItems}
                    selectedValues={skills}
                    onSelectionChange={setSkills}
                    required
                    enableSearch
                    enableSelectAll
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    error={skills.length === 0}
                    errorMessage={
                        skills.length === 0
                            ? 'Please select at least one skill'
                            : ''
                    }
                    helpIconHintText="Select the technologies you're proficient in"
                />

                <MultiSelect
                    label="User Permissions"
                    placeholder="Assign user permissions"
                    items={permissionItems}
                    selectedValues={permissions}
                    onSelectionChange={setPermissions}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    hintText="Grant appropriate access levels for this user"
                />

                <MultiSelect
                    label="Interest Categories"
                    placeholder="Select areas of interest"
                    items={categoryItems}
                    selectedValues={categories}
                    onSelectionChange={setCategories}
                    selectionTagType={MultiSelectSelectionTagType.TEXT}
                    helpIconHintText="This helps us personalize your experience"
                />
            </form>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiSelect integrated into a form with validation and different configurations.',
            },
        },
    },
}

// With custom slot
export const WithCustomSlot: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <div className="w-100">
                <MultiSelect
                    label="Feature Selection"
                    placeholder="Enable features"
                    items={categoryItems}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSelectedValues([])
                        } else if (typeof value === 'string') {
                            setSelectedValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    slot={<Sparkles size={16} />}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    helpIconHintText="Premium features with special icon"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiSelect with custom slot for additional branding or context.',
            },
        },
    },
}

// Action buttons
export const WithActionButtons: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([
            'react',
            'nodejs',
        ])

        return (
            <div className="w-100">
                <MultiSelect
                    label="Batch Operations"
                    placeholder="Select items for batch operations"
                    items={skillItems}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (value === '') {
                            setSelectedValues([])
                        } else if (typeof value === 'string') {
                            setSelectedValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    showActionButtons
                    primaryAction={{
                        text: 'Apply Changes',
                        onClick: (values) =>
                            alert(`Applied changes to: ${values.join(', ')}`),
                        disabled: selectedValues.length === 0,
                    }}
                    secondaryAction={{
                        text: 'Cancel',
                        onClick: () => setSelectedValues([]),
                    }}
                    helpIconHintText="Use action buttons to apply changes in bulk"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'MultiSelect with action buttons for batch operations and confirmations.',
            },
        },
    },
}

// Clear button control
export const ClearButtonControl: Story = {
    render: () => {
        const [hiddenClearSelected, setHiddenClearSelected] = useState<
            string[]
        >(['react', 'nodejs'])
        const [callbackClearSelected, setCallbackClearSelected] = useState<
            string[]
        >(['react', 'nodejs', 'postgresql'])

        return (
            <div className="flex flex-col gap-6 w-100">
                <MultiSelect
                    label="Hidden Clear Button"
                    sublabel="Clear button hidden - use Apply/Reset buttons"
                    placeholder="Select filters"
                    items={skillItems}
                    selectedValues={hiddenClearSelected}
                    onChange={(value) => {
                        if (value === '') {
                            setHiddenClearSelected([])
                        } else if (typeof value === 'string') {
                            setHiddenClearSelected((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    showClearButton={false}
                    showActionButtons
                    primaryAction={{
                        text: 'Apply Filters',
                        onClick: (values) =>
                            alert(
                                `API Call: Applied filters: ${values.join(', ')}`
                            ),
                    }}
                    secondaryAction={{
                        text: 'Reset',
                        onClick: () => {
                            setHiddenClearSelected([])
                            alert('API Call: Reset filters')
                        },
                    }}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    helpIconHintText="Clear button is hidden. Use Apply/Reset buttons for API calls."
                />

                <MultiSelect
                    label="Clear Button with Separate Callback"
                    sublabel="X icon triggers separate callback"
                    placeholder="Select filters"
                    items={permissionItems}
                    selectedValues={callbackClearSelected}
                    onChange={(value) => {
                        if (value === '') {
                            setCallbackClearSelected([])
                        } else if (typeof value === 'string') {
                            setCallbackClearSelected((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    showClearButton={true}
                    onClearAllClick={() => {
                        alert(
                            'API Call: Clear button clicked - clearing filters'
                        )
                        setCallbackClearSelected([])
                    }}
                    showActionButtons
                    primaryAction={{
                        text: 'Apply',
                        onClick: (values) =>
                            alert(
                                `API Call: Apply button clicked: ${values.join(', ')}`
                            ),
                    }}
                    secondaryAction={{
                        text: 'Reset',
                        onClick: () => {
                            alert('API Call: Reset button clicked')
                            setCallbackClearSelected([])
                        },
                    }}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    helpIconHintText="X icon has separate callback from Apply button. Perfect for analytics filters."
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Control the visibility and behavior of the X icon (clear button). Use showClearButton to hide/show the button, and onClearAllClick for a separate callback when the X icon is clicked. Perfect for analytics filters where API calls should only happen on explicit actions.',
            },
        },
    },
}

export const WithMenuFooter: Story = {
    render: () => {
        const [selectedValues, setSelectedValues] = useState<string[]>([])

        return (
            <div className="w-100">
                <MultiSelect
                    label="Skills"
                    placeholder="Select skills"
                    items={skillItems}
                    selectedValues={selectedValues}
                    onChange={(value) => {
                        if (Array.isArray(value)) {
                            setSelectedValues(value)
                        } else {
                            setSelectedValues((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    enableSearch
                    menuFooter={
                        <div
                            style={{
                                padding: '12px 16px',
                                borderTop: '1px solid #e5e7eb',
                            }}
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    alert('Open the "Create new" modal here')
                                }
                                style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    background: 'transparent',
                                    border: '1px dashed #d1d5db',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    color: '#374151',
                                    fontWeight: 500,
                                }}
                            >
                                + Create new skill
                            </button>
                        </div>
                    }
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Renders custom content (e.g. a "Create new" button) pinned at the bottom of the menu via the `menuFooter` prop. The footer is not selectable and stays visible even when the list is empty.',
            },
        },
    },
}

const ControlledAsyncSearchExample = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    const search = useMockAsyncSearch()

    return (
        <MultiSelect
            label="Find people"
            placeholder="Select people"
            selectedValues={selectedValues}
            onSelectionChange={setSelectedValues}
            {...search}
        />
    )
}

export const ControlledAsyncSearch: Story = {
    render: () => <ControlledAsyncSearchExample />,
    play: createControlledAsyncSearchPlay(
        'button',
        /find people/i,
        /find people/i
    ),
    parameters: {
        docs: {
            description: {
                story: 'Controlled search debounces a mock API request. The consumer owns the query and supplies already-filtered items.',
            },
        },
    },
}

export const ControlledSearchLoading: Story = {
    args: {
        label: 'Find people',
        placeholder: 'Select people',
        items: mockAsyncSearchItems,
        selectedValues: [],
        searchText: 'ada',
        isSearchLoading: true,
    },
}

export const ControlledSearchEmpty: Story = {
    args: {
        label: 'Find people',
        placeholder: 'Select people',
        items: [],
        selectedValues: [],
        searchText: '',
        emptyStateText: 'Start typing to search',
    },
}
