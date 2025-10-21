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
    Tags,
} from '@juspay/blend-design-system'
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
    Calendar,
    Clock,
    MapPin,
    Mail,
    Phone,
    Globe,
    Search,
    Star,
    Heart,
    Bookmark,
    Flag,
    Archive,
    Copy,
    Eye,
    EyeOff,
    Lock,
    Unlock,
    Shield,
    Zap,
    Palette,
    Code,
    Briefcase,
    Target,
    TrendingUp,
    BarChart3,
    PieChart,
    Database,
    Server,
    Cloud,
    Layers,
    Cpu,
    Sliders,
} from 'lucide-react'

const meta: Meta<typeof Popover> = {
    title: 'Components/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
A comprehensive popover component for displaying contextual content, forms, and actions in an overlay positioned relative to a trigger element.

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
                <div style={{ padding: '16px' }}>
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
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Popover
                    trigger={
                        <Button size={ButtonSize.SMALL} text="Small Popover" />
                    }
                    heading="Small Size"
                    description="Compact popover for quick actions"
                    size={PopoverSize.SMALL}
                >
                    <div style={{ padding: '12px' }}>
                        <p style={{ fontSize: '14px' }}>
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
                    <div style={{ padding: '16px' }}>
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
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '40px',
                    padding: '60px',
                    placeItems: 'center',
                }}
            >
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
                    <div style={{ padding: '16px' }}>
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
                    <div style={{ padding: '16px' }}>
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
                    <div style={{ padding: '16px' }}>
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
                    <div style={{ padding: '16px' }}>
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
                <div style={{ textAlign: 'center', padding: '20px' }}>
                    <CheckCircle
                        size={48}
                        style={{ color: '#10b981', marginBottom: '12px' }}
                    />
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
                    buttonType: ButtonType.DESTRUCTIVE,
                    onClick: () => setIsDeleted(true),
                }}
                secondaryAction={{
                    text: 'Cancel',
                    buttonType: ButtonType.SECONDARY,
                }}
                side="top"
            >
                <div style={{ padding: '16px' }}>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
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
                <div style={{ padding: '16px' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            marginBottom: '16px',
                        }}
                    >
                        <div
                            style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '50%',
                                backgroundColor: '#3b82f6',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            JD
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontWeight: 600 }}>
                                {user.name}
                            </h4>
                            <p
                                style={{
                                    margin: 0,
                                    color: '#6b7280',
                                    fontSize: '14px',
                                }}
                            >
                                {user.email}
                            </p>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    marginTop: '4px',
                                }}
                            >
                                <div
                                    style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#10b981',
                                    }}
                                />
                                <span
                                    style={{
                                        fontSize: '12px',
                                        color: '#10b981',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {user.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                        }}
                    >
                        <Button
                            size={ButtonSize.SMALL}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Edit size={14} />}
                            style={{ justifyContent: 'flex-start' }}
                            text="Edit Profile"
                        />
                        <Button
                            size={ButtonSize.SMALL}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<Settings size={14} />}
                            style={{ justifyContent: 'flex-start' }}
                            text="Settings"
                        />
                        <Button
                            size={ButtonSize.SMALL}
                            buttonType={ButtonType.SECONDARY}
                            leadingIcon={<HelpCircle size={14} />}
                            style={{ justifyContent: 'flex-start' }}
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
                <div
                    style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
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
                        <label
                            style={{
                                fontWeight: 600,
                                marginBottom: '8px',
                                display: 'block',
                            }}
                        >
                            Privacy Level
                        </label>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
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
                                    label={option.label}
                                />
                            ))}
                        </div>
                    </div>

                    <div>
                        <label
                            style={{
                                fontWeight: 600,
                                marginBottom: '8px',
                                display: 'block',
                            }}
                        >
                            Notification Preferences
                        </label>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            {notificationSettings.map((setting) => (
                                <Checkbox
                                    key={setting.id}
                                    checked={
                                        settings.notifications[
                                            setting.id as keyof typeof settings.notifications
                                        ]
                                    }
                                    onChange={(checked) =>
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
                <div style={{ padding: '20px' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label
                            style={{
                                display: 'block',
                                fontWeight: 600,
                                marginBottom: '8px',
                                fontSize: '14px',
                            }}
                        >
                            Share Link
                        </label>
                        <div
                            style={{
                                display: 'flex',
                                gap: '8px',
                                padding: '8px',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                backgroundColor: '#f9fafb',
                            }}
                        >
                            <input
                                value={shareUrl}
                                readOnly
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '14px',
                                    outline: 'none',
                                }}
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
                        <label
                            style={{
                                display: 'block',
                                fontWeight: 600,
                                marginBottom: '12px',
                                fontSize: '14px',
                            }}
                        >
                            Share via
                        </label>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '8px',
                            }}
                        >
                            {shareOptions.map((option) => (
                                <Button
                                    key={option.name}
                                    size={ButtonSize.SMALL}
                                    buttonType={ButtonType.SECONDARY}
                                    leadingIcon={React.cloneElement(
                                        option.icon,
                                        { style: { color: option.color } }
                                    )}
                                    style={{ justifyContent: 'flex-start' }}
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
                                <span
                                    style={{
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '18px',
                                        height: '18px',
                                        fontSize: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
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
                <div
                    style={{
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                    }}
                >
                    <div>
                        <label
                            style={{
                                fontWeight: 600,
                                marginBottom: '8px',
                                display: 'block',
                                fontSize: '14px',
                            }}
                        >
                            Status
                        </label>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            {statusOptions.map((status) => (
                                <Checkbox
                                    key={status}
                                    checked={filters.status.includes(status)}
                                    onChange={(checked) => {
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
                        <label
                            style={{
                                fontWeight: 600,
                                marginBottom: '8px',
                                display: 'block',
                                fontSize: '14px',
                            }}
                        >
                            Priority
                        </label>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
                            {priorityOptions.map((priority) => (
                                <Checkbox
                                    key={priority}
                                    checked={filters.priority.includes(
                                        priority
                                    )}
                                    onChange={(checked) => {
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
                        <label
                            style={{
                                fontWeight: 600,
                                marginBottom: '8px',
                                display: 'block',
                                fontSize: '14px',
                            }}
                        >
                            Date Range
                        </label>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px',
                            }}
                        >
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
                                    label={range.label}
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
                <div style={{ padding: '8px' }}>
                    {quickActions.map((action, index) => (
                        <div
                            key={action.label}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '12px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s',
                                borderBottom:
                                    index < quickActions.length - 1
                                        ? '1px solid #f3f4f6'
                                        : 'none',
                            }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    '#f9fafb')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    'transparent')
                            }
                            onClick={() =>
                                console.log(`Action: ${action.label}`)
                            }
                        >
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                }}
                            >
                                {action.icon}
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}
                                >
                                    {action.label}
                                </span>
                            </div>
                            <span
                                style={{
                                    fontSize: '12px',
                                    color: '#6b7280',
                                    fontFamily: 'monospace',
                                }}
                            >
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
                    return <Info size={16} style={{ color: '#3b82f6' }} />
                case 'success':
                    return (
                        <CheckCircle size={16} style={{ color: '#10b981' }} />
                    )
                case 'warning':
                    return (
                        <AlertTriangle size={16} style={{ color: '#f59e0b' }} />
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
                                <span
                                    style={{
                                        backgroundColor: '#ef4444',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '18px',
                                        height: '18px',
                                        fontSize: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
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
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            style={{
                                padding: '16px',
                                borderBottom: '1px solid #f3f4f6',
                                backgroundColor: notification.read
                                    ? 'transparent'
                                    : '#f8fafc',
                                cursor: 'pointer',
                            }}
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div
                                    style={{ flexShrink: 0, marginTop: '2px' }}
                                >
                                    {getIcon(notification.type)}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '4px',
                                        }}
                                    >
                                        <h4
                                            style={{
                                                margin: 0,
                                                fontSize: '14px',
                                                fontWeight: notification.read
                                                    ? 400
                                                    : 600,
                                            }}
                                        >
                                            {notification.title}
                                        </h4>
                                        {!notification.read && (
                                            <div
                                                style={{
                                                    width: '8px',
                                                    height: '8px',
                                                    borderRadius: '50%',
                                                    backgroundColor: '#3b82f6',
                                                    flexShrink: 0,
                                                }}
                                            />
                                        )}
                                    </div>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: '13px',
                                            color: '#6b7280',
                                            lineHeight: '1.4',
                                        }}
                                    >
                                        {notification.message}
                                    </p>
                                    <span
                                        style={{
                                            fontSize: '12px',
                                            color: '#9ca3af',
                                            marginTop: '4px',
                                            display: 'block',
                                        }}
                                    >
                                        {notification.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {notifications.length === 0 && (
                    <div
                        style={{
                            padding: '32px',
                            textAlign: 'center',
                            color: '#6b7280',
                        }}
                    >
                        <Bell
                            size={32}
                            style={{ marginBottom: '8px', opacity: 0.5 }}
                        />
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
            <div style={{ textAlign: 'center' }}>
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
                    <div style={{ padding: '20px', textAlign: 'left' }}>
                        <div
                            style={{
                                padding: '16px',
                                backgroundColor: '#fef3c7',
                                borderRadius: '8px',
                                border: '1px solid #f59e0b',
                                marginBottom: '16px',
                            }}
                        >
                            <h4
                                style={{
                                    margin: '0 0 8px 0',
                                    color: '#92400e',
                                }}
                            >
                                Scheduled Maintenance
                            </h4>
                            <p
                                style={{
                                    margin: 0,
                                    color: '#92400e',
                                    fontSize: '14px',
                                }}
                            >
                                Our system will undergo scheduled maintenance on
                                Saturday, March 15th from 2:00 AM to 6:00 AM
                                EST.
                            </p>
                        </div>

                        <h4 style={{ marginBottom: '12px' }}>
                            What to expect:
                        </h4>
                        <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                            <li>Service will be temporarily unavailable</li>
                            <li>All scheduled tasks will be paused</li>
                            <li>Data backup will occur automatically</li>
                            <li>
                                Normal operations will resume at 6:00 AM EST
                            </li>
                        </ul>

                        <p
                            style={{
                                marginTop: '16px',
                                fontSize: '14px',
                                color: '#6b7280',
                            }}
                        >
                            We apologize for any inconvenience and appreciate
                            your understanding.
                        </p>
                    </div>
                </Popover>

                <p
                    style={{
                        marginTop: '16px',
                        color: '#6b7280',
                        fontSize: '14px',
                    }}
                >
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
                <div style={{ padding: '16px' }}>
                    <h4
                        style={{
                            margin: '0 0 12px 0',
                            fontSize: '14px',
                            fontWeight: 600,
                        }}
                    >
                        Select a color
                    </h4>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(6, 1fr)',
                            gap: '8px',
                        }}
                    >
                        {colorPalette.map((color) => (
                            <button
                                key={color}
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '4px',
                                    backgroundColor: color,
                                    border: '2px solid #e5e7eb',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'scale(1.1)'
                                    e.currentTarget.style.borderColor = color
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)'
                                    e.currentTarget.style.borderColor =
                                        '#e5e7eb'
                                }}
                                onClick={() =>
                                    console.log('Selected color:', color)
                                }
                            />
                        ))}
                    </div>
                    <div
                        style={{
                            marginTop: '12px',
                            padding: '8px',
                            backgroundColor: '#f9fafb',
                            borderRadius: '4px',
                            fontSize: '12px',
                            color: '#6b7280',
                        }}
                    >
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
