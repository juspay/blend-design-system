import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Popover,
    PopoverSize,
    Button,
    ButtonType,
    ButtonSize,
    TextInput,
    TextArea,
    Checkbox,
    Radio,
    SingleSelect,
} from '@juspay/blend-design-system'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import {
    Settings,
    User,
    Bell,
    HelpCircle,
    Info,
    AlertTriangle,
    CheckCircle,
    Edit,
    Trash2,
    Plus,
    Filter,
    Download,
    Share,
    Mail,
    Globe,
    Archive,
    Copy,
    Zap,
    Palette,
    Briefcase,
} from 'lucide-react'

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A comprehensive popover component for displaying contextual content, forms, and actions in an overlay positioned relative to a trigger element.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Popover, PopoverSize, Button } from '@juspay/blend-design-system';

<Popover
  trigger={<Button>Open Settings</Button>}
  heading="User Settings"
  description="Manage your account preferences"
  size={PopoverSize.MEDIUM}
  primaryAction={{
    text: "Save Changes",
    onClick: () => console.log("Saved!"),
    buttonType: ButtonType.PRIMARY
  }}
  secondaryAction={{
    text: "Cancel", 
    onClick: () => console.log("Cancelled")
  }}
>
  <div>Your settings form content here</div>
</Popover>
\`\`\`

## Features
- **Two Sizes**: Small and Medium variants for different use cases
- **Flexible Positioning**: Top, right, bottom, left placement with fine-tuned alignment
- **Header & Footer**: Optional structured header with title/description and action footer
- **Form Integration**: Perfect for settings panels, forms, and user input
- **Mobile Support**: Responsive drawer mode for better mobile experience
- **Accessibility**: Built on Radix UI with full keyboard navigation and screen reader support
- **Custom Content**: Support for any React content with flexible dimensions
- **Modal Mode**: Can behave as a modal for important interactions
- **Action Buttons**: Primary and secondary actions with full button customization

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Shift+Tab, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (role, aria-describedby when description provided)
- Focus management (focus moves to popover content when opened)
- Escape key closes popover
- Trigger element maintains focus relationship
- Color contrast ratios meet WCAG 2.1 Level AA standards (4.5:1 for normal text, 3:1 for large text)

**Level AAA Compliance**: ⚠️ Partial (3 out of 4 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA)
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Accessibility Features**:
- Popover content is properly associated with trigger via Radix UI's built-in ARIA attributes
- Heading and description are programmatically associated when provided
- Focus moves to popover content when opened (keyboard users)
- Escape key closes popover
- Click outside closes popover (when not in modal mode)
- Modal mode provides backdrop and focus trapping
- Close button is keyboard accessible
- Action buttons are keyboard accessible
- Portal rendering ensures proper DOM hierarchy for screen readers

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Keyboard Testing**: Tab to trigger, Enter/Space to open, Escape to close, verify focus management
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

        `,
            },
        },
    },
    argTypes: {
        heading: {
            control: { type: 'text' },
            description:
                'Header title text displayed at the top of the popover',
            table: {
                type: { summary: 'string' },
                category: 'Header',
            },
        },
        description: {
            control: { type: 'text' },
            description: 'Header description text displayed below the title',
            table: {
                type: { summary: 'string' },
                category: 'Header',
            },
        },
        trigger: {
            control: false,
            description: 'React element that triggers the popover when clicked',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Core',
            },
        },
        children: {
            control: false,
            description: 'Content to display inside the popover body',
            table: {
                type: { summary: 'React.ReactNode' },
                category: 'Core',
            },
        },
        size: {
            control: { type: 'select' },
            options: Object.values(PopoverSize),
            description:
                'Size variant of the popover affecting typography and spacing',
            table: {
                type: { summary: 'PopoverSize' },
                defaultValue: { summary: 'PopoverSize.MEDIUM' },
                category: 'Appearance',
            },
        },
        side: {
            control: { type: 'select' },
            options: ['top', 'right', 'bottom', 'left'],
            description: 'Preferred side of the trigger to render the popover',
            table: {
                type: { summary: '"top" | "right" | "bottom" | "left"' },
                defaultValue: { summary: '"bottom"' },
                category: 'Positioning',
            },
        },
        align: {
            control: { type: 'select' },
            options: ['start', 'center', 'end'],
            description: 'Alignment of the popover relative to the trigger',
            table: {
                type: { summary: '"start" | "center" | "end"' },
                defaultValue: { summary: '"center"' },
                category: 'Positioning',
            },
        },
        sideOffset: {
            control: { type: 'number', min: 0, max: 50 },
            description: 'Distance in pixels from the trigger element',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '8' },
                category: 'Positioning',
            },
        },
        alignOffset: {
            control: { type: 'number', min: -50, max: 50 },
            description: 'Offset in pixels from the alignment axis',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' },
                category: 'Positioning',
            },
        },
        minWidth: {
            control: { type: 'number', min: 200, max: 800 },
            description: 'Minimum width of the popover in pixels',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '300' },
                category: 'Dimensions',
            },
        },
        maxWidth: {
            control: { type: 'number', min: 300, max: 1000 },
            description: 'Maximum width of the popover in pixels',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '400' },
                category: 'Dimensions',
            },
        },
        showCloseButton: {
            control: { type: 'boolean' },
            description: 'Whether to show the close X button in the header',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Header',
            },
        },
        asModal: {
            control: { type: 'boolean' },
            description:
                'Whether the popover should behave as a modal with backdrop',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Behavior',
            },
        },
        useDrawerOnMobile: {
            control: { type: 'boolean' },
            description: 'Use drawer interface on mobile devices for better UX',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Responsive',
            },
        },
        avoidCollisions: {
            control: { type: 'boolean' },
            description:
                'Whether to automatically reposition to avoid viewport collisions',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
                category: 'Behavior',
            },
        },
        shadow: {
            control: { type: 'select' },
            options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
            description: 'Shadow intensity for the popover',
            table: {
                type: {
                    summary:
                        '"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"',
                },
                defaultValue: { summary: '"lg"' },
                category: 'Appearance',
            },
        },
        primaryAction: {
            control: false,
            description: 'Primary action button configuration',
            table: {
                type: { summary: 'PopoverActionType' },
                category: 'Actions',
            },
        },
        secondaryAction: {
            control: false,
            description: 'Secondary action button configuration',
            table: {
                type: { summary: 'PopoverActionType' },
                category: 'Actions',
            },
        },
        open: {
            control: { type: 'boolean' },
            description:
                'Controlled open state (when provided, component becomes controlled)',
            table: {
                type: { summary: 'boolean' },
                category: 'State',
            },
        },
        onOpenChange: {
            action: 'open-changed',
            description: 'Callback fired when the open state changes',
            table: {
                type: { summary: '(open: boolean) => void' },
                category: 'Events',
            },
        },
        onClose: {
            action: 'closed',
            description: 'Callback fired when the popover is closed',
            table: {
                type: { summary: '() => void' },
                category: 'Events',
            },
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

// Sample data for forms and selections
const notificationSettings = [
    { id: 'email', label: 'Email notifications', checked: true },
    { id: 'push', label: 'Push notifications', checked: false },
    { id: 'sms', label: 'SMS notifications', checked: true },
]

const privacyOptions = [
    { value: 'public', label: 'Public' },
    { value: 'friends', label: 'Friends only' },
    { value: 'private', label: 'Private' },
]

const countryItems = [
    {
        items: [
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
            { value: 'au', label: 'Australia' },
            { value: 'de', label: 'Germany' },
            { value: 'fr', label: 'France' },
        ],
    },
]

// Default story
export const Default: Story = {
    render: function DefaultPopover(args) {
        return (
            <Popover {...args}>
                <div className="p-4">
                    <p>
                        This is the default popover content. You can put any
                        React content here!
                    </p>
                </div>
            </Popover>
        )
    },
    args: {
        trigger: <Button text="Open Popover" />,
        heading: 'Default Popover',
        description: 'This is a simple popover with header and content',
        size: PopoverSize.MEDIUM,
        side: 'bottom',
        align: 'center',
        showCloseButton: true,
        asModal: false,
    },
}

// Different sizes
export const Sizes: Story = {
    render: () => {
        return (
            <div className="flex gap-5 items-center">
                <Popover
                    trigger={
                        <Button size={ButtonSize.SMALL} text="Small Popover" />
                    }
                    heading="Small Size"
                    description="Compact popover for quick actions"
                    size={PopoverSize.SMALL}
                >
                    <div className="p-3">
                        <p className="text-sm">
                            Small popover content with reduced padding and
                            typography.
                        </p>
                    </div>
                </Popover>

                <Popover
                    trigger={
                        <Button
                            size={ButtonSize.MEDIUM}
                            text="Medium Popover"
                        />
                    }
                    heading="Medium Size"
                    description="Standard popover for most use cases"
                    size={PopoverSize.MEDIUM}
                >
                    <div className="p-4">
                        <p>
                            Medium popover content with standard spacing and
                            typography.
                        </p>
                    </div>
                </Popover>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Popover comes in two sizes: Small for compact interfaces and Medium for standard use cases.',
            },
        },
    },
}

// Different positioning
export const Positioning: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-3 gap-10 p-15 place-items-center">
                <Popover
                    trigger={
                        <Button
                            leadingIcon={<Settings size={16} />}
                            text="Top"
                        />
                    }
                    heading="Top Positioned"
                    side="top"
                    align="center"
                >
                    <div className="p-4">
                        <p>This popover appears above the trigger button.</p>
                    </div>
                </Popover>

                <Popover
                    trigger={
                        <Button leadingIcon={<User size={16} />} text="Left" />
                    }
                    heading="Left Positioned"
                    side="left"
                    align="center"
                >
                    <div className="p-4">
                        <p>
                            This popover appears to the left of the trigger
                            button.
                        </p>
                    </div>
                </Popover>

                <Popover
                    trigger={
                        <Button leadingIcon={<Bell size={16} />} text="Right" />
                    }
                    heading="Right Positioned"
                    side="right"
                    align="center"
                >
                    <div className="p-4">
                        <p>
                            This popover appears to the right of the trigger
                            button.
                        </p>
                    </div>
                </Popover>

                <div></div>

                <Popover
                    trigger={
                        <Button
                            leadingIcon={<HelpCircle size={16} />}
                            text="Bottom"
                        />
                    }
                    heading="Bottom Positioned"
                    side="bottom"
                    align="center"
                >
                    <div className="p-4">
                        <p>This popover appears below the trigger button.</p>
                    </div>
                </Popover>

                <div></div>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Popover can be positioned on any side of the trigger: top, right, bottom, or left.',
            },
        },
    },
}

// With actions
export const WithActions: Story = {
    render: () => {
        const [isDeleted, setIsDeleted] = useState(false)

        if (isDeleted) {
            return (
                <div className="text-center p-5">
                    <CheckCircle size={48} className="text-emerald-500 mb-3" />
                    <p>Item deleted successfully!</p>
                    <Button
                        size={ButtonSize.SMALL}
                        onClick={() => setIsDeleted(false)}
                        text="Reset Demo"
                    />
                </div>
            )
        }

        return (
            <Popover
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Trash2 size={16} />}
                        text="Delete Item"
                    />
                }
                heading="Confirm Deletion"
                description="This action cannot be undone. Are you sure you want to delete this item?"
                primaryAction={{
                    text: 'Delete',
                    buttonType: ButtonType.DANGER,
                    onClick: () => setIsDeleted(true),
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonType.SECONDARY,
                }}
                side="top"
            >
                <div className="p-4">
                    <p className="text-gray-500 text-sm">
                        This will permanently remove the item from your account.
                    </p>
                </div>
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Popover with primary and secondary action buttons for confirmations and workflows.',
            },
        },
    },
}

// User profile popover
export const UserProfile: Story = {
    render: () => {
        const [user, setUser] = useState({
            name: 'John Doe',
            email: 'john.doe@example.com',
            status: 'online',
        })

        return (
            <Popover
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<User size={16} />}
                        text="View Profile"
                    />
                }
                heading="User Profile"
                maxWidth={350}
            >
                <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                            JD
                        </div>
                        <div>
                            <h4 className="m-0 font-semibold">{user.name}</h4>
                            <p className="m-0 text-gray-500 text-sm">
                                {user.email}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="text-xs text-emerald-500 capitalize">
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Button
                            size={ButtonSize.SMALL}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Edit size={14} />}
                            text="Edit Profile"
                        />
                        <Button
                            size={ButtonSize.SMALL}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Settings size={14} />}
                            text="Settings"
                        />
                        <Button
                            size={ButtonSize.SMALL}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<HelpCircle size={14} />}
                            text="Help & Support"
                        />
                    </div>
                </div>
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'User profile popover with avatar, status, and action menu.',
            },
        },
    },
}

// Settings form
export const SettingsForm: Story = {
    render: () => {
        const [settings, setSettings] = useState({
            displayName: 'John Doe',
            email: 'john.doe@example.com',
            bio: 'Product designer passionate about user experience.',
            country: 'us',
            privacy: 'friends',
            notifications: {
                email: true,
                push: false,
                sms: true,
            },
        })

        const handleSave = () => {
            console.log('Saving settings:', settings)
            alert('Settings saved successfully!')
        }

        return (
            <Popover
                trigger={
                    <Button
                        leadingIcon={<Settings size={16} />}
                        text="Account Settings"
                    />
                }
                heading="Account Settings"
                description="Manage your account preferences and privacy settings"
                maxWidth={450}
                primaryAction={{
                    text: 'Save Changes',
                    buttonType: ButtonType.PRIMARY,
                    onClick: handleSave,
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonType.SECONDARY,
                }}
            >
                <div className="p-5 flex flex-col gap-4">
                    <TextInput
                        label="Display Name"
                        value={settings.displayName}
                        onChange={(e) =>
                            setSettings((prev) => ({
                                ...prev,
                                displayName: e.target.value,
                            }))
                        }
                        placeholder="Enter your display name"
                    />

                    <TextInput
                        label="Email Address"
                        value={settings.email}
                        onChange={(e) =>
                            setSettings((prev) => ({
                                ...prev,
                                email: e.target.value,
                            }))
                        }
                        placeholder="Enter your email"
                    />

                    <TextArea
                        label="Bio"
                        value={settings.bio}
                        onChange={(e) =>
                            setSettings((prev) => ({
                                ...prev,
                                bio: e.target.value,
                            }))
                        }
                        placeholder="Tell us about yourself"
                        rows={3}
                    />

                    <SingleSelect
                        label="Country"
                        items={countryItems}
                        selected={settings.country}
                        onSelect={(value) =>
                            setSettings((prev) => ({ ...prev, country: value }))
                        }
                        placeholder="Select your country"
                    />

                    <div>
                        <label className="font-semibold mb-2 block">
                            Privacy Level
                        </label>
                        <div className="flex flex-col gap-2">
                            {privacyOptions.map((option) => (
                                <Radio
                                    key={option.value}
                                    name="privacy"
                                    value={option.value}
                                    checked={settings.privacy === option.value}
                                    onChange={(e) =>
                                        setSettings((prev) => ({
                                            ...prev,
                                            privacy: e.target.value,
                                        }))
                                    }
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold mb-2 block">
                            Notification Preferences
                        </label>
                        <div className="flex flex-col gap-2">
                            {notificationSettings.map((setting) => (
                                <Checkbox
                                    key={setting.id}
                                    checked={
                                        settings.notifications[
                                            setting.id as keyof typeof settings.notifications
                                        ]
                                    }
                                    onCheckedChange={(checked) =>
                                        setSettings((prev) => ({
                                            ...prev,
                                            notifications: {
                                                ...prev.notifications,
                                                [setting.id]: checked,
                                            },
                                        }))
                                    }
                                    label={setting.label}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complex settings form with various input types and form controls.',
            },
        },
    },
}

// Share dialog
export const ShareDialog: Story = {
    render: () => {
        const [shareUrl] = useState('https://example.com/shared-content/abc123')
        const [copied, setCopied] = useState(false)

        const handleCopy = () => {
            navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }

        const shareOptions = [
            { name: 'Email', icon: <Mail size={16} />, color: '#3b82f6' },
            { name: 'Twitter', icon: <Globe size={16} />, color: '#1da1f2' },
            {
                name: 'LinkedIn',
                icon: <Briefcase size={16} />,
                color: '#0077b5',
            },
            { name: 'Facebook', icon: <User size={16} />, color: '#1877f2' },
        ]

        return (
            <Popover
                trigger={
                    <Button
                        leadingIcon={<Share size={16} />}
                        buttonType={ButtonType.SECONDARY}
                        text="Share"
                    />
                }
                heading="Share Content"
                description="Share this content with others"
                maxWidth={380}
                side="top"
            >
                <div className="p-5">
                    <div className="mb-5">
                        <label className="block font-semibold mb-2 text-sm">
                            Share Link
                        </label>
                        <div className="flex gap-2 p-2 border border-gray-200 rounded-md bg-gray-50">
                            <input
                                value={shareUrl}
                                readOnly
                                className="flex-1 border-none bg-transparent text-sm outline-none"
                            />
                            <Button
                                size={ButtonSize.SMALL}
                                buttonType={
                                    copied
                                        ? ButtonType.SUCCESS
                                        : ButtonType.SECONDARY
                                }
                                leadingIcon={
                                    copied ? (
                                        <CheckCircle size={14} />
                                    ) : (
                                        <Copy size={14} />
                                    )
                                }
                                onClick={handleCopy}
                                text={copied ? 'Copied!' : 'Copy'}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold mb-3 text-sm">
                            Share via
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {shareOptions.map((option) => (
                                <Button
                                    key={option.name}
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.SECONDARY}
                                    leadingIcon={React.cloneElement(
                                        option.icon,
                                        { style: { color: option.color } }
                                    )}
                                    onClick={() =>
                                        console.log(`Share via ${option.name}`)
                                    }
                                    text={option.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Share dialog with copy-to-clipboard functionality and social sharing options.',
            },
        },
    },
}

// Filter popover
export const FilterPopover: Story = {
    render: () => {
        const [filters, setFilters] = useState({
            status: [] as string[],
            priority: [] as string[],
            assignee: '',
            dateRange: 'all',
        })

        const statusOptions = ['Active', 'Pending', 'Completed', 'Cancelled']
        const priorityOptions = ['Low', 'Medium', 'High', 'Critical']
        const assigneeOptions = [
            {
                items: [
                    { value: 'john', label: 'John Doe' },
                    { value: 'jane', label: 'Jane Smith' },
                    { value: 'mike', label: 'Mike Johnson' },
                    { value: 'sarah', label: 'Sarah Wilson' },
                ],
            },
        ]

        const activeFiltersCount =
            filters.status.length +
            filters.priority.length +
            (filters.assignee ? 1 : 0) +
            (filters.dateRange !== 'all' ? 1 : 0)

        const handleApplyFilters = () => {
            console.log('Applying filters:', filters)
        }

        const handleClearFilters = () => {
            setFilters({
                status: [],
                priority: [],
                assignee: '',
                dateRange: 'all',
            })
        }

        return (
            <Popover
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Filter size={16} />}
                        trailingIcon={
                            activeFiltersCount > 0 ? (
                                <span className="bg-blue-500 text-white rounded-full w-4.5 h-4.5 text-xs flex items-center justify-center">
                                    {activeFiltersCount}
                                </span>
                            ) : undefined
                        }
                        text="Filters"
                    />
                }
                heading="Filter Options"
                description="Customize your view with filters"
                maxWidth={350}
                primaryAction={{
                    text: 'Apply Filters',
                    buttonType: ButtonType.PRIMARY,
                    onClick: handleApplyFilters,
                }}
                secondaryAction={{
                    text: 'Clear All',
                    buttonType: ButtonType.SECONDARY,
                    onClick: handleClearFilters,
                }}
            >
                <div className="p-5 flex flex-col gap-5">
                    <div>
                        <label className="font-semibold mb-2 block text-sm">
                            Status
                        </label>
                        <div className="flex flex-col gap-2">
                            {statusOptions.map((status) => (
                                <Checkbox
                                    key={status}
                                    checked={filters.status.includes(status)}
                                    onCheckedChange={(checked) => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            status: checked
                                                ? [...prev.status, status]
                                                : prev.status.filter(
                                                      (s) => s !== status
                                                  ),
                                        }))
                                    }}
                                    label={status}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="font-semibold mb-2 block text-sm">
                            Priority
                        </label>
                        <div className="flex flex-col gap-2">
                            {priorityOptions.map((priority) => (
                                <Checkbox
                                    key={priority}
                                    checked={filters.priority.includes(
                                        priority
                                    )}
                                    onCheckedChange={(checked) => {
                                        setFilters((prev) => ({
                                            ...prev,
                                            priority: checked
                                                ? [...prev.priority, priority]
                                                : prev.priority.filter(
                                                      (p) => p !== priority
                                                  ),
                                        }))
                                    }}
                                    label={priority}
                                />
                            ))}
                        </div>
                    </div>

                    <SingleSelect
                        label="Assignee"
                        items={assigneeOptions}
                        selected={filters.assignee}
                        onSelect={(value) =>
                            setFilters((prev) => ({ ...prev, assignee: value }))
                        }
                        placeholder="Select assignee"
                    />

                    <div>
                        <label className="font-semibold mb-2 block text-sm">
                            Date Range
                        </label>
                        <div className="flex flex-col gap-2">
                            {[
                                { value: 'all', label: 'All time' },
                                { value: 'today', label: 'Today' },
                                { value: 'week', label: 'This week' },
                                { value: 'month', label: 'This month' },
                            ].map((range) => (
                                <Radio
                                    key={range.value}
                                    name="dateRange"
                                    value={range.value}
                                    checked={filters.dateRange === range.value}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            dateRange: e.target.value,
                                        }))
                                    }
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Complex filter popover with multiple filter types and active filter count indicator.',
            },
        },
    },
}

// Quick actions menu
export const QuickActionsMenu: Story = {
    render: () => {
        const quickActions = [
            { icon: <Plus size={16} />, label: 'New Document', shortcut: '⌘N' },
            { icon: <Edit size={16} />, label: 'Edit Profile', shortcut: '⌘E' },
            {
                icon: <Download size={16} />,
                label: 'Export Data',
                shortcut: '⌘D',
            },
            {
                icon: <Archive size={16} />,
                label: 'Archive Items',
                shortcut: '⌘A',
            },
            { icon: <Settings size={16} />, label: 'Settings', shortcut: '⌘,' },
        ]

        return (
            <Popover
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Zap size={16} />}
                        text="Quick Actions"
                    />
                }
                heading="Quick Actions"
                maxWidth={280}
                side="bottom"
                align="start"
            >
                <div className="p-2">
                    {quickActions.map((action, index) => (
                        <div
                            key={action.label}
                            className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors hover:bg-gray-50 ${index < quickActions.length - 1 ? 'border-b border-gray-100' : ''}`}
                            onClick={() =>
                                console.log(`Action: ${action.label}`)
                            }
                        >
                            <div className="flex items-center gap-3">
                                {action.icon}
                                <span className="text-sm font-medium">
                                    {action.label}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500 font-mono">
                                {action.shortcut}
                            </span>
                        </div>
                    ))}
                </div>
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Quick actions menu with keyboard shortcuts and hover states.',
            },
        },
    },
}

// Notification center
export const NotificationCenter: Story = {
    render: () => {
        const [notifications, setNotifications] = useState([
            {
                id: 1,
                type: 'info',
                title: 'System Update',
                message: 'A new system update is available.',
                time: '5 min ago',
                read: false,
            },
            {
                id: 2,
                type: 'success',
                title: 'Backup Complete',
                message: 'Your data has been successfully backed up.',
                time: '1 hour ago',
                read: false,
            },
            {
                id: 3,
                type: 'warning',
                title: 'Storage Almost Full',
                message: "You're using 85% of your storage space.",
                time: '2 hours ago',
                read: true,
            },
        ])

        const unreadCount = notifications.filter((n) => !n.read).length

        const getIcon = (type: string) => {
            switch (type) {
                case 'info':
                    return <Info size={16} className="text-blue-500" />
                case 'success':
                    return (
                        <CheckCircle size={16} className="text-emerald-500" />
                    )
                case 'warning':
                    return (
                        <AlertTriangle size={16} className="text-amber-500" />
                    )
                default:
                    return <Bell size={16} />
            }
        }

        const markAsRead = (id: number) => {
            setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
            )
        }

        return (
            <Popover
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Bell size={16} />}
                        trailingIcon={
                            unreadCount > 0 ? (
                                <span className="bg-red-500 text-white rounded-full w-4.5 h-4.5 text-xs flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            ) : undefined
                        }
                        text="Notifications"
                    />
                }
                heading="Notifications"
                description={`${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
                maxWidth={400}
                side="bottom"
                align="end"
            >
                <div className="max-h-75 overflow-y-auto">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 cursor-pointer ${notification.read ? 'bg-transparent' : 'bg-slate-50'}`}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div className="flex gap-3">
                                <div className="shrink-0 mt-0.5">
                                    {getIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4
                                            className={`m-0 text-sm ${notification.read ? 'font-normal' : 'font-semibold'}`}
                                        >
                                            {notification.title}
                                        </h4>
                                        {!notification.read && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                        )}
                                    </div>
                                    <p className="m-0 text-[13px] text-gray-500 leading-snug">
                                        {notification.message}
                                    </p>
                                    <span className="text-xs text-gray-400 mt-1 block">
                                        {notification.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {notifications.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        <Bell size={32} className="mb-2 opacity-50" />
                        <p>No notifications</p>
                    </div>
                )}
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Notification center with unread count, different notification types, and mark-as-read functionality.',
            },
        },
    },
}

// Modal mode
export const ModalMode: Story = {
    render: () => {
        const [isOpen, setIsOpen] = useState(false)

        return (
            <div className="text-center">
                <Popover
                    trigger={
                        <Button
                            buttonType={ButtonType.PRIMARY}
                            leadingIcon={<AlertTriangle size={16} />}
                            text="Important Notice"
                        />
                    }
                    heading="Important System Notice"
                    description="Please read this important information carefully"
                    asModal={true}
                    open={isOpen}
                    onOpenChange={setIsOpen}
                    primaryAction={{
                        text: 'I Understand',
                        buttonType: ButtonType.PRIMARY,
                        onClick: () => setIsOpen(false),
                    }}
                    showCloseButton={false}
                    maxWidth={500}
                >
                    <div className="p-5 text-left">
                        <div className="p-4 bg-amber-100 rounded-lg border border-amber-500 mb-4">
                            <h4 className="text-amber-800 mb-2">
                                Scheduled Maintenance
                            </h4>
                            <p className="text-amber-800 text-sm">
                                Our system will undergo scheduled maintenance on
                                Saturday, March 15th from 2:00 AM to 6:00 AM
                                EST.
                            </p>
                        </div>

                        <h4 className="mb-3">What to expect:</h4>
                        <ul className="pl-5 leading-relaxed">
                            <li>Service will be temporarily unavailable</li>
                            <li>All scheduled tasks will be paused</li>
                            <li>Data backup will occur automatically</li>
                            <li>
                                Normal operations will resume at 6:00 AM EST
                            </li>
                        </ul>

                        <p className="mt-4 text-sm text-gray-500">
                            We apologize for any inconvenience and appreciate
                            your understanding.
                        </p>
                    </div>
                </Popover>

                <p className="mt-4 text-gray-500 text-sm">
                    Click the button above to see modal mode with backdrop
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Popover in modal mode with backdrop overlay for important notifications.',
            },
        },
    },
}

// Custom content without header/footer
export const CustomContent: Story = {
    render: () => {
        const colorPalette = [
            '#ef4444',
            '#f97316',
            '#f59e0b',
            '#eab308',
            '#84cc16',
            '#22c55e',
            '#10b981',
            '#14b8a6',
            '#06b6d4',
            '#0ea5e9',
            '#3b82f6',
            '#6366f1',
            '#8b5cf6',
            '#a855f7',
            '#d946ef',
            '#ec4899',
            '#f43f5e',
        ]

        return (
            <Popover
                trigger={
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        leadingIcon={<Palette size={16} />}
                        text="Choose Color"
                    />
                }
                maxWidth={220}
            >
                <div className="p-4">
                    <h4 className="mb-3 text-sm font-semibold">
                        Select a color
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                        {colorPalette.map((color) => (
                            <button
                                key={color}
                                className="w-6 h-6 rounded border-2 border-gray-200 cursor-pointer transition-all hover:scale-110"
                                style={{
                                    backgroundColor: color,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = color
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor =
                                        '#e5e7eb'
                                }}
                                onClick={() =>
                                    console.log('Selected color:', color)
                                }
                            />
                        ))}
                    </div>
                    <div className="mt-3 p-2 bg-gray-50 rounded text-xs text-gray-500">
                        Click any color to select it
                    </div>
                </div>
            </Popover>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Custom popover content without header or footer - perfect for color pickers, palettes, or custom widgets.',
            },
        },
    },
}
