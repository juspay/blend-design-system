import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    MultiSelect,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
    MultiSelectMenuSize,
    MultiSelectMenuAlignment,
    MultiSelectMenuSide,
} from '@juspay/blend-design-system'
import {
    Palette,
    User,
    Briefcase,
    Zap,
    DollarSign,
    TrendingUp,
    BarChart3,
    FileText,
    Headphones,
    Settings,
    Shield,
    Eye,
    Download,
    Upload,
    Share2,
    Trash2,
    Edit,
    Plus,
    Users,
    Circle,
    Code,
    Database,
    Server,
    Cloud,
    Cpu,
    Layers,
    Archive,
    GitBranch,
    Target,
    Crown,
    Sparkles,
    RefreshCw,
    Brain,
    Link,
    Sliders,
    Lightbulb,
    LayoutDashboard,
    Bell,
    Printer,
    CheckSquare,
    Filter,
    Globe,
    Search,
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
        docs: {
            description: {
                component: `
A comprehensive multi-selection dropdown component that allows users to select multiple options from grouped lists.

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
  onChange={(value) => {
    if (value === '') {
      setSelectedValues([]);
    } else {
      setSelectedValues(prev => 
        prev.includes(value) 
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    }
  }}
  selectionTagType={MultiSelectSelectionTagType.COUNT}
  enableSearch
  enableSelectAll
/>
\`\`\`
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
                type: { summary: 'string[]' },
                category: 'Core',
            },
        },
        onChange: {
            action: 'selection-changed',
            description: 'Callback fired when selection changes',
            table: {
                type: { summary: '(selectedValue: string) => void' },
                category: 'Core',
            },
        },
        items: {
            control: { type: 'object' },
            description: 'Array of grouped menu items',
            table: {
                type: { summary: 'MultiSelectMenuGroupType[]' },
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
            <div style={{ width: '400px' }}>
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
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
            <div style={{ width: '400px' }}>
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
            <div style={{ width: '400px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontWeight: 500 }}>Filter by categories:</span>
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
            <div style={{ width: '400px' }}>
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
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
                    onChange={(value) => {
                        if (value === '') {
                            setSkills([])
                        } else if (typeof value === 'string') {
                            setSkills((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
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
                    onChange={(value) => {
                        if (value === '') {
                            setPermissions([])
                        } else if (typeof value === 'string') {
                            setPermissions((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
                    selectionTagType={MultiSelectSelectionTagType.COUNT}
                    hintText="Grant appropriate access levels for this user"
                />

                <MultiSelect
                    label="Interest Categories"
                    placeholder="Select areas of interest"
                    items={categoryItems}
                    selectedValues={categories}
                    onChange={(value) => {
                        if (value === '') {
                            setCategories([])
                        } else if (typeof value === 'string') {
                            setCategories((prev) =>
                                prev.includes(value)
                                    ? prev.filter((v) => v !== value)
                                    : [...prev, value]
                            )
                        }
                    }}
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
            <div style={{ width: '400px' }}>
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
            <div style={{ width: '400px' }}>
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

// Complex dashboard example
export const DashboardExample: Story = {
    render: () => {
        const [filters, setFilters] = useState<string[]>([
            'technology',
            'design',
        ])
        const [columns, setColumns] = useState<string[]>([
            'user.view',
            'user.edit',
        ])
        const [skills, setSkills] = useState<string[]>(['react', 'nodejs'])

        const filterItems: MultiSelectMenuGroupType[] = [
            {
                groupLabel: 'Status Filters',
                items: [
                    {
                        value: 'active',
                        label: 'Active',
                        slot1: (
                            <Circle size={16} style={{ color: '#10b981' }} />
                        ),
                    },
                    {
                        value: 'inactive',
                        label: 'Inactive',
                        slot1: (
                            <Circle size={16} style={{ color: '#ef4444' }} />
                        ),
                    },
                    {
                        value: 'pending',
                        label: 'Pending',
                        slot1: (
                            <Circle size={16} style={{ color: '#f59e0b' }} />
                        ),
                    },
                ],
            },
            {
                groupLabel: 'Department Filters',
                items: [
                    {
                        value: 'engineering',
                        label: 'Engineering',
                        slot1: <Code size={16} />,
                    },
                    {
                        value: 'design',
                        label: 'Design',
                        slot1: <Palette size={16} />,
                    },
                    {
                        value: 'product',
                        label: 'Product',
                        slot1: <Target size={16} />,
                    },
                    {
                        value: 'marketing',
                        label: 'Marketing',
                        slot1: <TrendingUp size={16} />,
                    },
                ],
            },
        ]

        const actionItems: MultiSelectMenuGroupType[] = [
            {
                items: [
                    {
                        value: 'export',
                        label: 'Export Data',
                        slot1: <Download size={16} />,
                    },
                    {
                        value: 'print',
                        label: 'Print Report',
                        slot1: <Printer size={16} />,
                    },
                    {
                        value: 'share',
                        label: 'Share Dashboard',
                        slot1: <Share2 size={16} />,
                    },
                    {
                        value: 'archive',
                        label: 'Archive Items',
                        slot1: <Archive size={16} />,
                    },
                ],
            },
        ]

        return (
            <div
                style={{
                    padding: '24px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '8px',
                    width: '800px',
                }}
            >
                <h3 style={{ marginBottom: '24px', color: '#1f2937' }}>
                    Analytics Dashboard Controls
                </h3>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 200px',
                        gap: '16px',
                        marginBottom: '24px',
                    }}
                >
                    <MultiSelect
                        label="Dashboard Filters"
                        placeholder="Apply filters"
                        items={filterItems}
                        selectedValues={filters}
                        onChange={(value) => {
                            if (value === '') {
                                setFilters([])
                            } else if (typeof value === 'string') {
                                setFilters((prev) =>
                                    prev.includes(value)
                                        ? prev.filter((v) => v !== value)
                                        : [...prev, value]
                                )
                            }
                        }}
                        size={MultiSelectMenuSize.SMALL}
                        selectionTagType={MultiSelectSelectionTagType.COUNT}
                        enableSearch
                    />

                    <MultiSelect
                        label="Visible Columns"
                        placeholder="Select columns"
                        items={permissionItems}
                        selectedValues={columns}
                        onChange={(value) => {
                            if (value === '') {
                                setColumns([])
                            } else if (typeof value === 'string') {
                                setColumns((prev) =>
                                    prev.includes(value)
                                        ? prev.filter((v) => v !== value)
                                        : [...prev, value]
                                )
                            }
                        }}
                        size={MultiSelectMenuSize.SMALL}
                        selectionTagType={MultiSelectSelectionTagType.COUNT}
                    />

                    <MultiSelect
                        label="Bulk Actions"
                        placeholder="Actions"
                        items={actionItems}
                        selectedValues={skills}
                        onChange={(value) => {
                            if (value === '') {
                                setSkills([])
                            } else if (typeof value === 'string') {
                                setSkills((prev) =>
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

                <div
                    style={{
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <div>
                            <p
                                style={{
                                    color: '#6b7280',
                                    fontSize: '14px',
                                    margin: 0,
                                }}
                            >
                                {filters.length > 0
                                    ? `${filters.length} filter${filters.length > 1 ? 's' : ''} applied`
                                    : 'No filters applied'}
                            </p>
                            <p
                                style={{
                                    color: '#6b7280',
                                    fontSize: '14px',
                                    margin: '4px 0 0 0',
                                }}
                            >
                                {columns.length} column
                                {columns.length !== 1 ? 's' : ''} visible
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Filter size={16} style={{ color: '#6b7280' }} />
                            <Search size={16} style={{ color: '#6b7280' }} />
                            <RefreshCw size={16} style={{ color: '#6b7280' }} />
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complex dashboard example with multiple MultiSelect components for filtering, column management, and bulk actions.',
            },
        },
    },
}
