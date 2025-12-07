import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    SingleSelect,
    SelectMenuSize,
    SelectMenuVariant,
    SelectMenuAlignment,
    SelectMenuSide,
} from '@juspay/blend-design-system'
import { getA11yConfig, CHROMATIC_CONFIG } from '../../.storybook/a11y.config'
import {
    Globe,
    Palette,
    User,
    Clock,
    Briefcase,
    Flag,
    Zap,
    Camera,
    DollarSign,
    TrendingUp,
    BarChart3,
    FileText,
    Phone,
    Video,
    Settings,
    Shield,
    Eye,
    Check,
    AlertCircle,
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
    Brain,
    Link,
    Sliders,
    Lightbulb,
    Users,
    Bell,
    Mail,
    MapPin,
    Calendar,
    Building,
    Award,
    Star,
    Heart,
    Bookmark,
} from 'lucide-react'

// Local types for reference
type SelectMenuItemType = {
    label: string
    value: string
    checked?: boolean
    subLabel?: string
    slot1?: React.ReactNode
    slot2?: React.ReactNode
    slot3?: React.ReactNode
    slot4?: React.ReactNode
    disabled?: boolean
    onClick?: () => void
    subMenu?: SelectMenuItemType[]
    tooltip?: string | React.ReactNode
    disableTruncation?: boolean
}

type SelectMenuGroupType = {
    groupLabel?: string
    items: SelectMenuItemType[]
    showSeparator?: boolean
}

const meta: Meta<typeof SingleSelect> = {
    title: 'Components/SingleSelect',
    component: SingleSelect,
    parameters: {
        layout: 'padded',
        // Use shared a11y config for form components
        a11y: getA11yConfig('form'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
A comprehensive single selection dropdown component that allows users to select one option from grouped lists.

## Features
- **Single Selection**: Select one item from grouped lists with clear hierarchy
- **Search & Filtering**: Built-in search functionality for large datasets
- **Rich Content**: Support for icons, sub-labels, tooltips, and custom slots
- **Responsive Design**: Mobile drawer mode for better touch experience
- **Multiple Variants**: Container and no-container variants for different use cases
- **Form Integration**: Complete form validation, error handling, and labeling
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Virtualization support for large datasets
- **Infinite Scroll**: Load more items as needed
- **Custom Positioning**: Flexible alignment and positioning options

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Arrow keys, Enter, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (aria-labelledby, aria-describedby, aria-invalid, aria-expanded, aria-controls)
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
- **jest-axe**: Run \`pnpm test SingleSelect.accessibility\` (55+ tests covering WCAG 2.1 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker, verify touch target width in browser DevTools
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

## Usage

\`\`\`tsx
import { 
  SingleSelect, 
  SelectMenuSize, 
  SelectMenuVariant 
} from '@juspay/blend-design-system';

const [selected, setSelected] = useState<string>('');

<SingleSelect
  label="Select Country"
  placeholder="Choose a country"
  items={countryItems}
  selected={selected}
  onSelect={setSelected}
  enableSearch
  size={SelectMenuSize.MEDIUM}
  variant={SelectMenuVariant.CONTAINER}
/>
\`\`\`
        `,
            },
        },
    },
    argTypes: {
        label: {
            control: { type: 'text' },
            description: 'Label text displayed above the single select',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        subLabel: {
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
            description: 'Hint text displayed below the single select',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        helpIconText: {
            control: { type: 'text' },
            description: 'Tooltip text for the help icon',
            table: {
                type: { summary: 'string' },
                category: 'Labels',
            },
        },
        selected: {
            control: { type: 'text' },
            description: 'Currently selected value',
            table: {
                type: { summary: 'string' },
                category: 'Core',
            },
        },
        onSelect: {
            action: 'selection-changed',
            description: 'Callback fired when selection changes',
            table: {
                type: { summary: '(value: string) => void' },
                category: 'Core',
            },
        },
        items: {
            control: { type: 'object' },
            description: 'Array of grouped menu items',
            table: {
                type: { summary: 'SelectMenuGroupType[]' },
                category: 'Core',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(SelectMenuSize),
            description: 'Size variant of the single select',
            table: {
                type: { summary: 'SelectMenuSize' },
                defaultValue: { summary: 'SelectMenuSize.MEDIUM' },
                category: 'Appearance',
            },
        },
        variant: {
            control: { type: 'select' },
            options: Object.values(SelectMenuVariant),
            description: 'Visual variant of the single select',
            table: {
                type: { summary: 'SelectMenuVariant' },
                defaultValue: { summary: 'SelectMenuVariant.CONTAINER' },
                category: 'Appearance',
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
            description: 'Whether the single select is disabled',
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
                defaultValue: { summary: 'false' },
                category: 'Features',
            },
        },
        useDrawerOnMobile: {
            control: { type: 'boolean' },
            description: 'Use drawer interface on mobile devices',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Responsive',
            },
        },
        error: {
            control: { type: 'boolean' },
            description: 'Whether the single select is in error state',
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
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SingleSelect>

// Sample data sets
const countryItems: SelectMenuGroupType[] = [
    {
        groupLabel: 'North America',
        items: [
            {
                value: 'us',
                label: 'United States',
                subLabel: 'USA',
                slot1: <Flag size={16} />,
            },
            {
                value: 'ca',
                label: 'Canada',
                subLabel: 'CAN',
                slot1: <Flag size={16} />,
            },
            {
                value: 'mx',
                label: 'Mexico',
                subLabel: 'MEX',
                slot1: <Flag size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Europe',
        items: [
            {
                value: 'uk',
                label: 'United Kingdom',
                subLabel: 'GBR',
                slot1: <Flag size={16} />,
            },
            {
                value: 'de',
                label: 'Germany',
                subLabel: 'DEU',
                slot1: <Flag size={16} />,
            },
            {
                value: 'fr',
                label: 'France',
                subLabel: 'FRA',
                slot1: <Flag size={16} />,
            },
            {
                value: 'it',
                label: 'Italy',
                subLabel: 'ITA',
                slot1: <Flag size={16} />,
            },
            {
                value: 'es',
                label: 'Spain',
                subLabel: 'ESP',
                slot1: <Flag size={16} />,
            },
            {
                value: 'nl',
                label: 'Netherlands',
                subLabel: 'NLD',
                slot1: <Flag size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Asia Pacific',
        items: [
            {
                value: 'jp',
                label: 'Japan',
                subLabel: 'JPN',
                slot1: <Flag size={16} />,
            },
            {
                value: 'cn',
                label: 'China',
                subLabel: 'CHN',
                slot1: <Flag size={16} />,
            },
            {
                value: 'in',
                label: 'India',
                subLabel: 'IND',
                slot1: <Flag size={16} />,
            },
            {
                value: 'kr',
                label: 'South Korea',
                subLabel: 'KOR',
                slot1: <Flag size={16} />,
            },
            {
                value: 'au',
                label: 'Australia',
                subLabel: 'AUS',
                slot1: <Flag size={16} />,
            },
        ],
    },
]

const timezoneItems: SelectMenuGroupType[] = [
    {
        groupLabel: 'Americas',
        items: [
            {
                value: 'pst',
                label: 'Pacific Standard Time',
                subLabel: 'UTC-8',
                slot1: <Clock size={16} />,
            },
            {
                value: 'mst',
                label: 'Mountain Standard Time',
                subLabel: 'UTC-7',
                slot1: <Clock size={16} />,
            },
            {
                value: 'cst',
                label: 'Central Standard Time',
                subLabel: 'UTC-6',
                slot1: <Clock size={16} />,
            },
            {
                value: 'est',
                label: 'Eastern Standard Time',
                subLabel: 'UTC-5',
                slot1: <Clock size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Europe & Africa',
        items: [
            {
                value: 'gmt',
                label: 'Greenwich Mean Time',
                subLabel: 'UTC+0',
                slot1: <Clock size={16} />,
            },
            {
                value: 'cet',
                label: 'Central European Time',
                subLabel: 'UTC+1',
                slot1: <Clock size={16} />,
            },
            {
                value: 'eet',
                label: 'Eastern European Time',
                subLabel: 'UTC+2',
                slot1: <Clock size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Asia & Pacific',
        items: [
            {
                value: 'ist',
                label: 'India Standard Time',
                subLabel: 'UTC+5:30',
                slot1: <Clock size={16} />,
            },
            {
                value: 'cst_china',
                label: 'China Standard Time',
                subLabel: 'UTC+8',
                slot1: <Clock size={16} />,
            },
            {
                value: 'jst',
                label: 'Japan Standard Time',
                subLabel: 'UTC+9',
                slot1: <Clock size={16} />,
            },
            {
                value: 'aest',
                label: 'Australian Eastern Time',
                subLabel: 'UTC+10',
                slot1: <Clock size={16} />,
            },
        ],
    },
]

const departmentItems: SelectMenuGroupType[] = [
    {
        groupLabel: 'Engineering',
        items: [
            {
                value: 'frontend',
                label: 'Frontend Development',
                subLabel: 'UI/UX Development',
                slot1: <Globe size={16} />,
            },
            {
                value: 'backend',
                label: 'Backend Development',
                subLabel: 'Server & API Development',
                slot1: <Server size={16} />,
            },
            {
                value: 'mobile',
                label: 'Mobile Development',
                subLabel: 'iOS & Android Apps',
                slot1: <Phone size={16} />,
            },
            {
                value: 'devops',
                label: 'DevOps Engineering',
                subLabel: 'Infrastructure & Deployment',
                slot1: <Zap size={16} />,
            },
            {
                value: 'qa',
                label: 'Quality Assurance',
                subLabel: 'Testing & Validation',
                slot1: <Shield size={16} />,
            },
            {
                value: 'data',
                label: 'Data Engineering',
                subLabel: 'Data Pipeline & Analytics',
                slot1: <Database size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Business',
        items: [
            {
                value: 'sales',
                label: 'Sales',
                subLabel: 'Revenue Generation',
                slot1: <TrendingUp size={16} />,
            },
            {
                value: 'marketing',
                label: 'Marketing',
                subLabel: 'Brand & Growth',
                slot1: <BarChart3 size={16} />,
            },
            {
                value: 'hr',
                label: 'Human Resources',
                subLabel: 'People & Culture',
                slot1: <Users size={16} />,
            },
            {
                value: 'finance',
                label: 'Finance',
                subLabel: 'Financial Management',
                slot1: <DollarSign size={16} />,
            },
            {
                value: 'operations',
                label: 'Operations',
                subLabel: 'Business Operations',
                slot1: <Briefcase size={16} />,
            },
        ],
    },
    {
        groupLabel: 'Creative & Design',
        items: [
            {
                value: 'design',
                label: 'Product Design',
                subLabel: 'UI/UX Design',
                slot1: <Palette size={16} />,
            },
            {
                value: 'content',
                label: 'Content Strategy',
                subLabel: 'Content Creation & Strategy',
                slot1: <FileText size={16} />,
            },
            {
                value: 'video',
                label: 'Video Production',
                subLabel: 'Video Content Creation',
                slot1: <Video size={16} />,
            },
            {
                value: 'photography',
                label: 'Photography',
                subLabel: 'Visual Content Creation',
                slot1: <Camera size={16} />,
            },
        ],
    },
]

const statusItems: SelectMenuGroupType[] = [
    {
        groupLabel: 'Active States',
        items: [
            {
                value: 'active',
                label: 'Active',
                subLabel: 'Currently active',
                slot1: <Check size={16} style={{ color: '#10b981' }} />,
            },
            {
                value: 'in-progress',
                label: 'In Progress',
                subLabel: 'Work in progress',
                slot1: <Clock size={16} style={{ color: '#3b82f6' }} />,
            },
            {
                value: 'review',
                label: 'Under Review',
                subLabel: 'Pending review',
                slot1: <Eye size={16} style={{ color: '#f59e0b' }} />,
            },
        ],
    },
    {
        groupLabel: 'Inactive States',
        items: [
            {
                value: 'pending',
                label: 'Pending',
                subLabel: 'Awaiting action',
                slot1: <Clock size={16} style={{ color: '#f59e0b' }} />,
            },
            {
                value: 'suspended',
                label: 'Suspended',
                subLabel: 'Temporarily suspended',
                slot1: <AlertCircle size={16} style={{ color: '#ef4444' }} />,
            },
            {
                value: 'archived',
                label: 'Archived',
                subLabel: 'Moved to archive',
                slot1: <Archive size={16} style={{ color: '#6b7280' }} />,
            },
        ],
    },
]

const priorityItems: SelectMenuGroupType[] = [
    {
        items: [
            {
                value: 'critical',
                label: 'Critical Priority',
                subLabel: 'Immediate attention required',
                slot1: <AlertCircle size={16} style={{ color: '#ef4444' }} />,
            },
            {
                value: 'high',
                label: 'High Priority',
                subLabel: 'Important task',
                slot1: <AlertCircle size={16} style={{ color: '#f59e0b' }} />,
            },
            {
                value: 'medium',
                label: 'Medium Priority',
                subLabel: 'Standard task',
                slot1: <AlertCircle size={16} style={{ color: '#3b82f6' }} />,
            },
            {
                value: 'low',
                label: 'Low Priority',
                subLabel: 'Nice to have',
                slot1: <AlertCircle size={16} style={{ color: '#6b7280' }} />,
            },
        ],
    },
]

// Default story
export const Default: Story = {
    render: function DefaultSingleSelect(args) {
        const [selected, setSelected] = useState<string>(args.selected)

        // Update local state when args change
        React.useEffect(() => {
            setSelected(args.selected)
        }, [args.selected])

        return (
            <div style={{ width: '400px' }}>
                <SingleSelect
                    {...args}
                    selected={selected}
                    onSelect={setSelected}
                />
            </div>
        )
    },
    args: {
        label: 'Select Country',
        placeholder: 'Choose a country',
        items: countryItems,
        selected: '',
        size: SelectMenuSize.MEDIUM,
        variant: SelectMenuVariant.CONTAINER,
        enableSearch: false,
        required: false,
        disabled: false,
        useDrawerOnMobile: false,
    },
}

// With search functionality
export const WithSearch: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>('')

        return (
            <div style={{ width: '400px' }}>
                <SingleSelect
                    label="Select Country"
                    placeholder="Search and select a country"
                    items={countryItems}
                    selected={selected}
                    onSelect={setSelected}
                    enableSearch
                    searchPlaceholder="Type to search countries..."
                    helpIconText="Start typing to filter countries by name"
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

// Different sizes
export const Sizes: Story = {
    render: () => {
        const [selectedSmall, setSelectedSmall] = useState<string>('')
        const [selectedMedium, setSelectedMedium] = useState<string>('')
        const [selectedLarge, setSelectedLarge] = useState<string>('')

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
                <SingleSelect
                    label="Small Size"
                    placeholder="Choose department"
                    items={departmentItems}
                    selected={selectedSmall}
                    onSelect={setSelectedSmall}
                    size={SelectMenuSize.SMALL}
                />

                <SingleSelect
                    label="Medium Size (Default)"
                    placeholder="Choose department"
                    items={departmentItems}
                    selected={selectedMedium}
                    onSelect={setSelectedMedium}
                    size={SelectMenuSize.MEDIUM}
                />

                <SingleSelect
                    label="Large Size"
                    placeholder="Choose department"
                    items={departmentItems}
                    selected={selectedLarge}
                    onSelect={setSelectedLarge}
                    size={SelectMenuSize.LARGE}
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleSelect comes in three sizes: Small (sm), Medium (md), and Large (lg).',
            },
        },
    },
}

// No container variant
export const NoContainer: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>('frontend')

        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontWeight: 500 }}>Filter by department:</span>
                <SingleSelect
                    label="Department"
                    placeholder="All departments"
                    items={departmentItems}
                    selected={selected}
                    onSelect={setSelected}
                    variant={SelectMenuVariant.NO_CONTAINER}
                    size={SelectMenuSize.SMALL}
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

// Form integration
export const FormIntegration: Story = {
    render: () => {
        const [country, setCountry] = useState<string>('')
        const [timezone, setTimezone] = useState<string>('')
        const [department, setDepartment] = useState<string>('')
        const [status, setStatus] = useState<string>('')

        return (
            <form
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '500px',
                }}
            >
                <SingleSelect
                    label="Country"
                    subLabel="Required field"
                    placeholder="Select your country"
                    items={countryItems}
                    selected={country}
                    onSelect={setCountry}
                    required
                    error={country === ''}
                    errorMessage={
                        country === '' ? 'Please select a country' : ''
                    }
                    hintText="This will determine your default settings"
                />

                <SingleSelect
                    label="Timezone"
                    placeholder="Select your timezone"
                    items={timezoneItems}
                    selected={timezone}
                    onSelect={setTimezone}
                    enableSearch
                    helpIconText="Choose your local timezone for scheduling"
                />

                <SingleSelect
                    label="Department"
                    placeholder="Select your department"
                    items={departmentItems}
                    selected={department}
                    onSelect={setDepartment}
                    hintText="This can be changed later in settings"
                />

                <SingleSelect
                    label="Initial Status"
                    placeholder="Set initial status"
                    items={statusItems}
                    selected={status}
                    onSelect={setStatus}
                />
            </form>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleSelect integrated into a form with validation and different configurations.',
            },
        },
    },
}

// With custom slot
export const WithCustomSlot: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>('')

        const languageItems: SelectMenuGroupType[] = [
            {
                groupLabel: 'Popular Languages',
                items: [
                    {
                        value: 'en',
                        label: 'English',
                        subLabel: 'United States',
                        slot1: <Globe size={16} />,
                    },
                    {
                        value: 'es',
                        label: 'Spanish',
                        subLabel: 'España',
                        slot1: <Globe size={16} />,
                    },
                    {
                        value: 'fr',
                        label: 'French',
                        subLabel: 'France',
                        slot1: <Globe size={16} />,
                    },
                    {
                        value: 'de',
                        label: 'German',
                        subLabel: 'Deutschland',
                        slot1: <Globe size={16} />,
                    },
                ],
            },
            {
                groupLabel: 'Asian Languages',
                items: [
                    {
                        value: 'zh',
                        label: 'Chinese',
                        subLabel: '中文',
                        slot1: <Globe size={16} />,
                    },
                    {
                        value: 'ja',
                        label: 'Japanese',
                        subLabel: '日本語',
                        slot1: <Globe size={16} />,
                    },
                    {
                        value: 'ko',
                        label: 'Korean',
                        subLabel: '한국어',
                        slot1: <Globe size={16} />,
                    },
                    {
                        value: 'hi',
                        label: 'Hindi',
                        subLabel: 'हिन्दी',
                        slot1: <Globe size={16} />,
                    },
                ],
            },
        ]

        return (
            <div style={{ width: '400px' }}>
                <SingleSelect
                    label="Language Preference"
                    placeholder="Select your language"
                    items={languageItems}
                    selected={selected}
                    onSelect={setSelected}
                    slot={<Globe size={16} />}
                    helpIconText="Choose your preferred language for the interface"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleSelect with custom slot for additional branding or context.',
            },
        },
    },
}

// Error states
export const ErrorStates: Story = {
    render: () => {
        const [requiredValue, setRequiredValue] = useState<string>('')
        const [validValue, setValidValue] = useState<string>('frontend')

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    width: '400px',
                }}
            >
                <SingleSelect
                    label="Required Department"
                    subLabel="This field is required"
                    placeholder="Select a department"
                    items={departmentItems}
                    selected={requiredValue}
                    onSelect={setRequiredValue}
                    required
                    error={requiredValue === ''}
                    errorMessage={
                        requiredValue === '' ? 'Please select a department' : ''
                    }
                />

                <SingleSelect
                    label="Valid Selection"
                    placeholder="Working correctly"
                    items={departmentItems}
                    selected={validValue}
                    onSelect={setValidValue}
                    hintText="This field has a valid selection"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleSelect in error and valid states with appropriate feedback.',
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
                <SingleSelect
                    label="Disabled Empty"
                    placeholder="Cannot select"
                    items={countryItems}
                    selected=""
                    onSelect={() => {}}
                    disabled
                />

                <SingleSelect
                    label="Disabled with Value"
                    placeholder="Choose a country"
                    items={countryItems}
                    selected="us"
                    onSelect={() => {}}
                    disabled
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleSelect in disabled state, both empty and with selections.',
            },
        },
    },
}

// Priority selection example
export const PrioritySelection: Story = {
    render: () => {
        const [priority, setPriority] = useState<string>('')

        return (
            <div style={{ width: '400px' }}>
                <SingleSelect
                    label="Task Priority"
                    placeholder="Set priority level"
                    items={priorityItems}
                    selected={priority}
                    onSelect={setPriority}
                    helpIconText="Priority determines the urgency and importance of the task"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleSelect for priority selection with color-coded options.',
            },
        },
    },
}

// Complex task management example
export const TaskManagement: Story = {
    render: () => {
        const [project, setProject] = useState<string>('')
        const [assignee, setAssignee] = useState<string>('')
        const [priority, setPriority] = useState<string>('')
        const [status, setStatus] = useState<string>('')

        const projectItems: SelectMenuGroupType[] = [
            {
                groupLabel: 'Active Projects',
                items: [
                    {
                        value: 'web-redesign',
                        label: 'Website Redesign',
                        subLabel: 'Due in 2 weeks',
                        slot1: <Globe size={16} />,
                    },
                    {
                        value: 'mobile-app',
                        label: 'Mobile App v2.0',
                        subLabel: 'Due in 1 month',
                        slot1: <Phone size={16} />,
                    },
                    {
                        value: 'api-migration',
                        label: 'API Migration',
                        subLabel: 'Due in 3 weeks',
                        slot1: <Server size={16} />,
                    },
                ],
            },
            {
                groupLabel: 'Upcoming Projects',
                items: [
                    {
                        value: 'dashboard',
                        label: 'Analytics Dashboard',
                        subLabel: 'Starts next month',
                        slot1: <BarChart3 size={16} />,
                    },
                    {
                        value: 'crm',
                        label: 'CRM Integration',
                        subLabel: 'Q2 2024',
                        slot1: <Briefcase size={16} />,
                    },
                ],
            },
        ]

        const assigneeItems: SelectMenuGroupType[] = [
            {
                groupLabel: 'Development Team',
                items: [
                    {
                        value: 'john',
                        label: 'John Doe',
                        subLabel: 'Frontend Lead',
                        slot1: <User size={16} />,
                    },
                    {
                        value: 'jane',
                        label: 'Jane Smith',
                        subLabel: 'Backend Lead',
                        slot1: <User size={16} />,
                    },
                    {
                        value: 'mike',
                        label: 'Mike Johnson',
                        subLabel: 'Full Stack Developer',
                        slot1: <User size={16} />,
                    },
                ],
            },
            {
                groupLabel: 'Design Team',
                items: [
                    {
                        value: 'sarah',
                        label: 'Sarah Williams',
                        subLabel: 'UI/UX Lead',
                        slot1: <User size={16} />,
                    },
                    {
                        value: 'tom',
                        label: 'Tom Brown',
                        subLabel: 'Product Designer',
                        slot1: <User size={16} />,
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
                    width: '600px',
                }}
            >
                <h3 style={{ marginBottom: '24px', color: '#1f2937' }}>
                    Create New Task
                </h3>

                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <SingleSelect
                        label="Project"
                        placeholder="Select a project"
                        items={projectItems}
                        selected={project}
                        onSelect={setProject}
                        required
                        enableSearch
                        error={project === ''}
                        errorMessage={
                            project === '' ? 'Please select a project' : ''
                        }
                    />

                    <SingleSelect
                        label="Assignee"
                        placeholder="Assign to team member"
                        items={assigneeItems}
                        selected={assignee}
                        onSelect={setAssignee}
                        enableSearch
                        helpIconText="The person responsible for this task"
                    />

                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            gap: '16px',
                        }}
                    >
                        <SingleSelect
                            label="Priority"
                            placeholder="Set priority"
                            items={priorityItems}
                            selected={priority}
                            onSelect={setPriority}
                            required
                            error={priority === ''}
                            errorMessage={
                                priority === '' ? 'Please set priority' : ''
                            }
                        />

                        <SingleSelect
                            label="Status"
                            placeholder="Set initial status"
                            items={statusItems}
                            selected={status}
                            onSelect={setStatus}
                        />
                    </div>
                </form>

                <div
                    style={{
                        marginTop: '24px',
                        padding: '16px',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e5e7eb',
                    }}
                >
                    <h4 style={{ margin: '0 0 12px 0', color: '#374151' }}>
                        Task Summary
                    </h4>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'auto 1fr',
                            gap: '8px',
                            fontSize: '14px',
                        }}
                    >
                        <span style={{ color: '#6b7280' }}>Project:</span>
                        <span style={{ color: '#1f2937' }}>
                            {project || 'Not selected'}
                        </span>
                        <span style={{ color: '#6b7280' }}>Assignee:</span>
                        <span style={{ color: '#1f2937' }}>
                            {assignee || 'Unassigned'}
                        </span>
                        <span style={{ color: '#6b7280' }}>Priority:</span>
                        <span style={{ color: '#1f2937' }}>
                            {priority || 'Not set'}
                        </span>
                        <span style={{ color: '#6b7280' }}>Status:</span>
                        <span style={{ color: '#1f2937' }}>
                            {status || 'Not set'}
                        </span>
                    </div>
                </div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complex task management example with multiple SingleSelect components and real-time summary.',
            },
        },
    },
}

// Mobile drawer mode
export const MobileDrawerMode: Story = {
    render: () => {
        const [selected, setSelected] = useState<string>('')

        return (
            <div style={{ width: '400px' }}>
                <SingleSelect
                    label="Country (Mobile Drawer)"
                    placeholder="Select your country"
                    items={countryItems}
                    selected={selected}
                    onSelect={setSelected}
                    useDrawerOnMobile
                    enableSearch
                    helpIconText="On mobile devices, this will open as a drawer for better touch experience"
                />
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'SingleSelect with mobile drawer mode enabled for better mobile experience.',
            },
        },
    },
}

// ============================================================================
// Accessibility Testing
// ============================================================================

/**
 * Accessibility examples demonstrating keyboard navigation, ARIA attributes, error states, and focus management
 */
export const Accessibility: Story = {
    render: () => {
        const [keyboardSelected, setKeyboardSelected] = useState<string>('')
        const [errorSelected, setErrorSelected] = useState<string>('')
        const [requiredSelected, setRequiredSelected] = useState<string>('')
        const [disabledSelected, setDisabledSelected] = useState<string>('us')

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                    padding: '24px',
                    maxWidth: '800px',
                }}
            >
                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Keyboard Navigation
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Tab to focus, Arrow keys to navigate, Enter to select,
                        Escape to close
                    </p>
                    <div style={{ width: '400px' }}>
                        <SingleSelect
                            label="Keyboard Navigation Example"
                            placeholder="Use keyboard to navigate"
                            items={countryItems}
                            selected={keyboardSelected}
                            onSelect={setKeyboardSelected}
                            enableSearch
                            helpIconText="Tab to focus, Arrow keys to navigate menu items, Enter to select, Escape to close menu"
                        />
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Label Association & ARIA Attributes
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Labels properly associated via htmlFor/id. ARIA
                        attributes (aria-labelledby, aria-describedby) connect
                        labels, hints, and errors.
                    </p>
                    <div style={{ width: '400px' }}>
                        <SingleSelect
                            label="Country Selection"
                            subLabel="Required field"
                            placeholder="Select your country"
                            items={countryItems}
                            selected={keyboardSelected}
                            onSelect={setKeyboardSelected}
                            hintText="This will determine your default settings"
                            helpIconText="Choose your country for regional settings"
                        />
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Error State & Validation
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Error state communicated via aria-invalid="true" and
                        visual styling. Error message connected via
                        aria-describedby.
                    </p>
                    <div style={{ width: '400px' }}>
                        <SingleSelect
                            label="Required Department"
                            subLabel="This field is required"
                            placeholder="Select a department"
                            items={departmentItems}
                            selected={errorSelected}
                            onSelect={setErrorSelected}
                            required
                            error={errorSelected === ''}
                            errorMessage={
                                errorSelected === ''
                                    ? 'Please select a department'
                                    : ''
                            }
                        />
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Required Field Indicator
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Required fields indicated with asterisk (*) and
                        aria-labelledby connection. Screen readers announce
                        "required".
                    </p>
                    <div style={{ width: '400px' }}>
                        <SingleSelect
                            label="Timezone"
                            placeholder="Select your timezone"
                            items={timezoneItems}
                            selected={requiredSelected}
                            onSelect={setRequiredSelected}
                            required
                            hintText="Required for scheduling"
                        />
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Disabled State
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Disabled SingleSelect is not focusable and removed from
                        tab order. aria-disabled="true" communicates state to
                        screen readers.
                    </p>
                    <div style={{ width: '400px' }}>
                        <SingleSelect
                            label="Disabled Empty"
                            placeholder="Cannot select"
                            items={countryItems}
                            selected=""
                            onSelect={() => {}}
                            disabled
                        />
                        <div style={{ marginTop: '16px' }}>
                            <SingleSelect
                                label="Disabled with Value"
                                placeholder="Choose a country"
                                items={countryItems}
                                selected={disabledSelected}
                                onSelect={() => {}}
                                disabled
                            />
                        </div>
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Search Input Accessibility
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Search input has aria-label for screen reader
                        identification. Filtered results announced dynamically.
                    </p>
                    <div style={{ width: '400px' }}>
                        <SingleSelect
                            label="Search Countries"
                            placeholder="Type to search"
                            items={countryItems}
                            selected={keyboardSelected}
                            onSelect={setKeyboardSelected}
                            enableSearch
                            searchPlaceholder="Type to search countries..."
                            helpIconText="Start typing to filter countries by name"
                        />
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Focus Indicators
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Focus indicators visible with outlineOffset. Menu items
                        have focus styling. Check Chromatic for focus ring
                        visibility.
                    </p>
                    <div style={{ width: '400px' }}>
                        <SingleSelect
                            label="Focus Indicator Example"
                            placeholder="Tab to focus"
                            items={departmentItems}
                            selected={keyboardSelected}
                            onSelect={setKeyboardSelected}
                        />
                    </div>
                </section>

                <section>
                    <h3
                        style={{
                            marginBottom: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                        }}
                    >
                        Touch Target Size (AAA)
                    </h3>
                    <p
                        style={{
                            marginBottom: '12px',
                            fontSize: '14px',
                            color: '#6b7280',
                        }}
                    >
                        Height verified: Small (50px), Medium (56px), Large
                        (72px) all exceed AAA 44px requirement. Width requires
                        manual verification.
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '16px',
                            width: '400px',
                        }}
                    >
                        <SingleSelect
                            label="Small Size (50px height)"
                            placeholder="Small touch target"
                            items={departmentItems}
                            selected={keyboardSelected}
                            onSelect={setKeyboardSelected}
                            size={SelectMenuSize.SMALL}
                        />
                        <SingleSelect
                            label="Medium Size (56px height)"
                            placeholder="Medium touch target"
                            items={departmentItems}
                            selected={keyboardSelected}
                            onSelect={setKeyboardSelected}
                            size={SelectMenuSize.MEDIUM}
                        />
                        <SingleSelect
                            label="Large Size (72px height)"
                            placeholder="Large touch target"
                            items={departmentItems}
                            selected={keyboardSelected}
                            onSelect={setKeyboardSelected}
                            size={SelectMenuSize.LARGE}
                        />
                    </div>
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
Accessibility examples demonstrating keyboard navigation, ARIA attributes, error states, required fields, disabled states, search input accessibility, focus indicators, and touch target sizes.

## Accessibility Verification

**How to verify accessibility:**

1. **Storybook a11y addon** (Accessibility panel - bottom):
   - Check for violations (should be 0 for AA compliance)
   - Review passing tests (15+)
   - See real-time accessibility status

2. **jest-axe unit tests**:
   \`\`\`bash
   pnpm test SingleSelect.accessibility
   \`\`\`
   - 55+ automated tests
   - WCAG compliance verification
   - ARIA attribute validation
   - Keyboard navigation testing

3. **Chromatic visual tests**:
   \`\`\`bash
   pnpm chromatic
   \`\`\`
   - Focus ring visibility
   - State changes (error, disabled, required)
   - Responsive behavior
   - Menu open/close animations

4. **Manual testing**:
   - VoiceOver (macOS) or NVDA (Windows)
   - Keyboard navigation (Tab, Arrow keys, Enter, Escape)
   - Color contrast verification with WebAIM Contrast Checker
   - Touch target width verification in browser DevTools (console: \`getComputedStyle(element).width\`)

## Accessibility Report

**Current Status**: 
- ✅ **WCAG 2.1 Level AA**: Fully Compliant (0 violations)
- ⚠️ **WCAG 2.1 Level AAA**: Partial Compliance (6/9 applicable criteria compliant)

**AAA Compliance Details**:
- ✅ Compliant: Visual Presentation (1.4.8), Images of Text (1.4.9), Keyboard No Exception (2.1.3), Animation from Interactions (2.3.3), Change on Request (3.2.5), Target Size Height (2.5.5)
- ❌ Needs Improvement: Contrast Enhanced (1.4.6) - requires 7:1 ratio (currently 4.5:1 for AA)
- ⚠️ Verification Required: Target Size Width (2.5.5) - height verified but width requires manual verification
- 📋 See full accessibility report in Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 analysis
                `,
            },
        },
        // Enhanced a11y rules for accessibility story
        a11y: getA11yConfig('form'),
        // Extended delay for Chromatic to capture focus states
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 500,
        },
    },
}
