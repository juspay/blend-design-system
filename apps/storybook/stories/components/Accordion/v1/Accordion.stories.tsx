import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionType,
    AccordionChevronPosition,
} from '@juspay/blend-design-system/deprecated/accordion'
import type { AccordionProps } from '@juspay/blend-design-system/deprecated/accordion'
import {
    User,
    Shield,
    Bell,
    CreditCard,
    HelpCircle,
    Lock,
    CheckCircle,
    Database,
    Monitor,
    Check,
    X,
} from 'lucide-react'
import { Checkbox } from '@juspay/blend-design-system/deprecated/checkbox'
import { Switch } from '@juspay/blend-design-system/deprecated/switch'
import {
    CHROMATIC_CONFIG,
    getA11yConfig,
} from '../../../../.storybook/a11y.config'

// ============================================================================
// Wrapper type — combines Accordion props with AccordionItem controls
// so argTypes can reference title, subtext, etc. without TS errors
// ============================================================================

type AccordionStoryProps = AccordionProps & {
    title: string
    subtext?: string
    leftSlot?: string
    rightSlot?: string
    subtextSlot?: string
    isDisabled?: boolean
    chevronPosition?: AccordionChevronPosition
    children?: string
    triggerSlot?: 'none' | 'checkbox' | 'switch' | 'renderProp'
    triggerSlotWidth?: number
}

const AccordionStory = (props: AccordionStoryProps) => <Accordion {...props} />
AccordionStory.displayName = 'Accordion'

// ============================================================================
// Meta Configuration
// ============================================================================

const meta: Meta<typeof AccordionStory> = {
    title: 'Components/Accordion',
    component: AccordionStory,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'An accordion component that allows users to show and hide sections of related content on a page.',
        docs: {
            description: {
                component: `

## Usage

\`\`\`tsx
import { Accordion, AccordionItem, AccordionType } from '@juspay/blend-design-system/deprecated/accordion';

<Accordion accordionType={AccordionType.BORDER}>
  <AccordionItem value="item-1" title="Section 1">
    Content for section 1
  </AccordionItem>
  <AccordionItem value="item-2" title="Section 2">
    Content for section 2
  </AccordionItem>
</Accordion>
\`\`\`

## Features
- Single or multiple item expansion
- Two visual styles: Border and No Border
- Chevron position customization (left or right)
- Support for icons and custom content in headers
- Disabled state for individual items
- Subtext and additional slots for complex layouts
- Smooth animations and transitions
- Keyboard navigation support
- Controlled and uncontrolled modes

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Proper ARIA attributes (aria-expanded, aria-controls)
- Semantic HTML structure with Radix UI primitives
- Comprehensive keyboard navigation (Arrow keys, Enter, Space, Tab)
- Screen reader support (VoiceOver/NVDA)
- Chevron icons marked with aria-hidden="true"
- Decorative slots properly handled
- Visible focus indicators for keyboard navigation
- Proper state management and announcements

**Level AAA Compliance**: ⚠️ Partial (7 out of 9 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 1.4.9 Images of Text, 2.1.3 Keyboard (No Exception), 2.2.3 No Timing, 2.2.4 Interruptions, 2.3.3 Animation from Interactions, 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA), 2.5.5 Target Size - Interactive elements (accordion triggers) may not meet 44x44px minimum
- ℹ️ **Not Applicable**: 3.3.6 Error Prevention (All) - application-dependent

**Touch Target Sizes**:
- Accordion triggers: ~40px height (meets AA 24px, may not meet AAA 44px depending on content)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **jest-axe**: Run \`pnpm test Accordion.accessibility\` (40+ tests covering WCAG 2.1 criteria)
- **Chromatic**: Visual regression for focus rings and states
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report
        `,
            },
        },
    },
    argTypes: {
        accordionType: {
            control: 'select',
            options: Object.values(AccordionType),
            description: 'Visual style of the accordion',
        },
        isMultiple: {
            control: 'boolean',
            description: 'Whether multiple items can be expanded at once',
        },
        defaultValue: {
            control: 'text',
            description: 'Default expanded item(s)',
        },
        value: {
            control: 'text',
            description: 'Controlled expanded item(s)',
        },
        onValueChange: {
            action: 'valueChanged',
            description: 'Callback when expanded items change',
        },
        // AccordionItem props exposed via the wrapper type
        title: {
            table: { category: 'AccordionItem' },
            control: 'text',
            description: 'Title text for accordion item',
        },
        subtext: {
            table: { category: 'AccordionItem' },
            control: 'text',
            description: 'Additional descriptive text below title',
        },
        leftSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: [
                'none',
                'user',
                'shield',
                'bell',
                'creditCard',
                'helpCircle',
                'lock',
            ],
            description: 'Icon to display on the left side',
        },
        rightSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: ['none', 'status', 'badge', 'button'],
            description: 'Content to display on the right side',
        },
        subtextSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: ['none', 'progressBar', 'chip', 'counter'],
            description: 'Custom content to display as subtext',
        },
        isDisabled: {
            table: { category: 'AccordionItem' },
            control: 'boolean',
            description: 'Whether the accordion item is disabled',
        },
        chevronPosition: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: Object.values(AccordionChevronPosition),
            description: 'Position of the chevron icon (left or right)',
        },
        children: {
            table: { category: 'AccordionItem' },
            control: 'text',
            description: 'Content to display when expanded',
        },
        triggerSlot: {
            table: { category: 'AccordionItem' },
            control: 'select',
            options: ['none', 'checkbox', 'switch', 'renderProp'],
            description:
                'Custom slot to replace the chevron (checkbox, switch, or render prop)',
        },
        triggerSlotWidth: {
            table: { category: 'AccordionItem' },
            control: 'number',
            description: 'Width of the trigger slot container in pixels',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AccordionStory>

// ============================================================================
// Helper Functions
// ============================================================================

const getLeftSlot = (slotType: string) => {
    switch (slotType) {
        case 'user':
            return <User size={20} color="#666" />
        case 'shield':
            return <Shield size={20} color="#666" />
        case 'bell':
            return <Bell size={20} color="#666" />
        case 'creditCard':
            return <CreditCard size={20} color="#666" />
        case 'helpCircle':
            return <HelpCircle size={20} color="#666" />
        case 'lock':
            return <Lock size={20} color="#666" />
        case 'none':
        default:
            return undefined
    }
}

const getRightSlot = (slotType: string) => {
    switch (slotType) {
        case 'status':
            return <span className="text-xs text-green-500">Active</span>
        case 'badge':
            return (
                <span className="text-[10px] px-1.5 py-0.5 bg-blue-500 text-white rounded">
                    NEW
                </span>
            )
        case 'button':
            return (
                <span className="text-xs text-blue-500 cursor-pointer underline">
                    Edit
                </span>
            )
        case 'none':
        default:
            return undefined
    }
}

const getSubtextSlot = (slotType: string) => {
    switch (slotType) {
        case 'progressBar':
            return (
                <div className="w-20 h-1 bg-gray-200 rounded-sm overflow-hidden">
                    <div className="w-[60%] h-full bg-blue-500" />
                </div>
            )
        case 'chip':
            return (
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded-xl border border-gray-300">
                    Premium
                </span>
            )
        case 'counter':
            return (
                <span className="text-[11px] font-semibold text-red-500">
                    3 items
                </span>
            )
        case 'none':
        default:
            return undefined
    }
}

const getTriggerSlot = (slotType: string) => {
    switch (slotType) {
        case 'renderProp':
            return ({
                isExpanded,
                toggle,
            }: {
                isExpanded: boolean
                toggle: () => void
            }) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        toggle()
                    }}
                    className={`w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center cursor-pointer text-sm font-bold ${
                        isExpanded
                            ? 'bg-blue-500 text-white'
                            : 'bg-transparent text-blue-500'
                    }`}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                >
                    {isExpanded ? <X size={14} /> : <Check size={14} />}
                </button>
            )
        case 'none':
        default:
            return undefined
    }
}

// ============================================================================
// Basic Variants
// ============================================================================

export const Default: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
        title: 'What is an accordion?',
        subtextSlot: 'none',
        isDisabled: false,
        chevronPosition: AccordionChevronPosition.RIGHT,
        children:
            'An accordion is a vertically stacked list of interactive headings that each reveal an associated section of content.',
        triggerSlot: 'none',
        triggerSlotWidth: undefined,
    },
    render: (args) => (
        <div className="w-150">
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                onValueChange={args.onValueChange}
            >
                <AccordionItem
                    value="item-1"
                    title={args.title}
                    subtext={args.subtext}
                    leftSlot={getLeftSlot(args.leftSlot ?? 'none')}
                    rightSlot={getRightSlot(args.rightSlot ?? 'none')}
                    subtextSlot={getSubtextSlot(args.subtextSlot ?? 'none')}
                    isDisabled={args.isDisabled}
                    chevronPosition={args.chevronPosition}
                    triggerSlot={getTriggerSlot(args.triggerSlot ?? 'none')}
                    triggerSlotWidth={args.triggerSlotWidth}
                >
                    <div className="p-4">{args.children}</div>
                </AccordionItem>
                <AccordionItem value="item-2" title="When should I use it?">
                    <div className="p-4">
                        Accordions are useful when you want to toggle between
                        hiding and showing large amounts of content, or when you
                        have limited space and need to organize content in a
                        compact way.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="How does it work?">
                    <div className="p-4">
                        Click on the accordion headers to expand or collapse the
                        content. By default, only one section can be open at a
                        time, but this can be configured to allow multiple
                        sections to be open simultaneously.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Default accordion with interactive controls. Use the controls panel to customize props.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Visual Styles
// ============================================================================

export const WithBorder: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div className="w-150">
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem value="item-1" title="Account Settings">
                    <div className="p-4">
                        Manage your account preferences, security settings, and
                        personal information.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Privacy & Security">
                    <div className="p-4">
                        Control your privacy settings, manage data sharing
                        preferences, and configure security options.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Notifications">
                    <div className="p-4">
                        Customize how and when you receive notifications about
                        account activity and updates.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with border style for a more defined visual separation.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const MultipleExpansion: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: true,
        defaultValue: ['item-1', 'item-2'],
    },
    render: (args) => (
        <div className="w-150">
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                defaultValue={args.defaultValue as string[]}
            >
                <AccordionItem value="item-1" title="First Section">
                    <div className="p-4">
                        This accordion allows multiple sections to be open at
                        the same time.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Second Section">
                    <div className="p-4">
                        Both this section and the first section can be expanded
                        simultaneously.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Third Section">
                    <div className="p-4">
                        Click any header to toggle its content without affecting
                        other sections.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion that allows multiple items to be expanded at once.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Content Variations
// ============================================================================

export const WithIcons: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div className="w-150">
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="profile"
                    title="Profile Settings"
                    leftSlot={<User size={20} color="#666" />}
                >
                    <div className="p-4">
                        Update your profile information, including name, email,
                        and avatar.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="security"
                    title="Security"
                    leftSlot={<Shield size={20} color="#666" />}
                >
                    <div className="p-4">
                        Manage your password, two-factor authentication, and
                        login sessions.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="notifications"
                    title="Notifications"
                    leftSlot={<Bell size={20} color="#666" />}
                >
                    <div className="p-4">
                        Configure email and push notification preferences.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="billing"
                    title="Billing"
                    leftSlot={<CreditCard size={20} color="#666" />}
                >
                    <div className="p-4">
                        View and manage your subscription, payment methods, and
                        invoices.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with icons for better visual context.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const WithSubtext: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div className="w-150">
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="basic"
                    title="Basic Plan"
                    subtext="$9/month • For individuals"
                    rightSlot={
                        <span className="text-sm text-green-500">
                            Current Plan
                        </span>
                    }
                >
                    <div className="p-4">
                        • 5 GB storage
                        <br />• Basic support
                        <br />• Access to core features
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="pro"
                    title="Pro Plan"
                    subtext="$29/month • For professionals"
                    rightSlot={
                        <span className="text-sm text-blue-500">Upgrade</span>
                    }
                >
                    <div className="p-4">
                        • 100 GB storage
                        <br />• Priority support
                        <br />• Advanced features
                        <br />• API access
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="enterprise"
                    title="Enterprise Plan"
                    subtext="Custom pricing • For teams"
                    rightSlot={
                        <span className="text-sm text-gray-500">
                            Contact Sales
                        </span>
                    }
                >
                    <div className="p-4">
                        • Unlimited storage
                        <br />• Dedicated support
                        <br />• Custom integrations
                        <br />• SLA guarantee
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion items with subtext for additional context.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const ChevronLeft: Story = {
    args: {
        accordionType: AccordionType.NO_BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div className="w-150">
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="item-1"
                    title="Documentation"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    <div className="p-4 pl-8">
                        Access comprehensive guides and API documentation.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="item-2"
                    title="Tutorials"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    <div className="p-4 pl-8">
                        Step-by-step tutorials to get you started quickly.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="item-3"
                    title="Examples"
                    chevronPosition={AccordionChevronPosition.LEFT}
                >
                    <div className="p-4 pl-8">
                        Real-world examples and best practices.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with chevron positioned on the left side.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// States
// ============================================================================

export const WithDisabledItems: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
    },
    render: (args) => (
        <div className="w-150">
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
            >
                <AccordionItem
                    value="available"
                    title="Available Feature"
                    leftSlot={<CheckCircle size={20} color="#22c55e" />}
                >
                    <div className="p-4">
                        This feature is available in your current plan.
                    </div>
                </AccordionItem>
                <AccordionItem
                    value="locked-1"
                    title="Premium Feature"
                    subtext="Requires Pro plan"
                    leftSlot={<Lock size={20} color="#999" />}
                    isDisabled
                >
                    <div className="p-4">This content is locked.</div>
                </AccordionItem>
                <AccordionItem
                    value="locked-2"
                    title="Enterprise Feature"
                    subtext="Requires Enterprise plan"
                    leftSlot={<Lock size={20} color="#999" />}
                    isDisabled
                >
                    <div className="p-4">This content is locked.</div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Accordion with disabled items to show locked or unavailable content.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Controlled
// ============================================================================

export const Controlled: Story = {
    render: function ControlledExample() {
        const [value, setValue] = React.useState<string>('item-2')

        return (
            <div className="w-150">
                <div className="mb-4">
                    <p>
                        Currently expanded: <strong>{value || 'none'}</strong>
                    </p>
                </div>
                <Accordion
                    accordionType={AccordionType.NO_BORDER}
                    value={value}
                    onValueChange={(newValue) => setValue(newValue as string)}
                >
                    <AccordionItem value="item-1" title="First Item">
                        <div className="p-4">
                            This is a controlled accordion. The expanded state
                            is managed externally.
                        </div>
                    </AccordionItem>
                    <AccordionItem value="item-2" title="Second Item">
                        <div className="p-4">
                            This item is expanded by default through the
                            controlled value prop.
                        </div>
                    </AccordionItem>
                    <AccordionItem value="item-3" title="Third Item">
                        <div className="p-4">
                            The parent component controls which item is
                            expanded.
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled accordion where the expanded state is managed externally.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Trigger Slot Patterns
// ============================================================================

export const TriggerSlotPatterns: Story = {
    render: function TriggerSlotPatternsExample() {
        // Pattern 1: Simple element state
        const [simpleChecked, setSimpleChecked] = React.useState<
            Record<string, boolean>
        >({
            'el-1': true,
            'el-2': false,
        })

        // Pattern 2: Independent selection state
        const [selectedTasks, setSelectedTasks] = React.useState<string[]>([])

        // Pattern 3: Feature toggle state
        const [features, setFeatures] = React.useState<string[]>([
            'feature-analytics',
        ])

        const toggleSelection = (id: string) => {
            setSelectedTasks((prev) =>
                prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
            )
        }

        const toggleFeature = (id: string) => {
            setFeatures((prev) =>
                prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
            )
        }

        return (
            <div className="w-150 flex flex-col gap-12">
                {/* Pattern 1: Simple Element */}
                <section>
                    <h4 className="mb-3 text-base font-semibold">
                        Pattern 1: Simple React Element
                    </h4>
                    <p className="mb-4 text-sm text-gray-500">
                        Pass Checkbox or Switch as a simple element. State is
                        managed externally.
                    </p>
                    <Accordion accordionType={AccordionType.BORDER} isMultiple>
                        <AccordionItem
                            value="el-1"
                            title="Checkbox Item"
                            triggerSlot={
                                <Checkbox
                                    checked={simpleChecked['el-1']}
                                    onCheckedChange={(checked) => {
                                        if (typeof checked === 'boolean') {
                                            setSimpleChecked((prev) => ({
                                                ...prev,
                                                'el-1': checked,
                                            }))
                                        }
                                    }}
                                />
                            }
                        >
                            <div className="p-4">
                                Simple checkbox as element
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="el-2"
                            title="Switch Item"
                            triggerSlot={
                                <Switch
                                    checked={simpleChecked['el-2']}
                                    onChange={() =>
                                        setSimpleChecked((prev) => ({
                                            ...prev,
                                            'el-2': !prev['el-2'],
                                        }))
                                    }
                                />
                            }
                        >
                            <div className="p-4">Simple switch as element</div>
                        </AccordionItem>
                    </Accordion>
                </section>

                {/* Pattern 2: Independent Selection + Expansion */}
                <section>
                    <h4 className="mb-3 text-base font-semibold">
                        Pattern 2: Independent Selection State
                    </h4>
                    <p className="mb-4 text-sm text-gray-500">
                        Selected: [{selectedTasks.join(', ') || 'none'}]
                    </p>
                    <Accordion accordionType={AccordionType.BORDER} isMultiple>
                        <AccordionItem
                            value="task-1"
                            title="Task 1"
                            subtext="Deploy pipeline"
                            leftSlot={<Database size={20} color="#666" />}
                            triggerSlot={
                                <Checkbox
                                    checked={selectedTasks.includes('task-1')}
                                    onCheckedChange={() =>
                                        toggleSelection('task-1')
                                    }
                                />
                            }
                        >
                            <div className="p-4">
                                CI/CD pipeline configuration
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="task-2"
                            title="Task 2"
                            subtext="Security review"
                            leftSlot={<Shield size={20} color="#666" />}
                            triggerSlot={
                                <Checkbox
                                    checked={selectedTasks.includes('task-2')}
                                    onCheckedChange={() =>
                                        toggleSelection('task-2')
                                    }
                                />
                            }
                        >
                            <div className="p-4">Security policy audit</div>
                        </AccordionItem>
                    </Accordion>
                </section>

                {/* Pattern 3: Feature Toggles */}
                <section>
                    <h4 className="mb-3 text-base font-semibold">
                        Pattern 3: Feature Toggles
                    </h4>
                    <Accordion accordionType={AccordionType.BORDER}>
                        <AccordionItem
                            value="feature-analytics"
                            title="Analytics Dashboard"
                            subtext={
                                features.includes('feature-analytics')
                                    ? 'Enabled'
                                    : 'Disabled'
                            }
                            leftSlot={<Monitor size={20} color="#666" />}
                            triggerSlot={
                                <Switch
                                    checked={features.includes(
                                        'feature-analytics'
                                    )}
                                    onChange={() =>
                                        toggleFeature('feature-analytics')
                                    }
                                />
                            }
                        >
                            <div className="p-4">
                                <ul className="pl-5">
                                    <li>Real-time metrics</li>
                                    <li>Custom reports</li>
                                </ul>
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            value="feature-security"
                            title="Advanced Security"
                            subtext={
                                features.includes('feature-security')
                                    ? 'Enabled'
                                    : 'Disabled'
                            }
                            leftSlot={<Lock size={20} color="#666" />}
                            triggerSlot={
                                <Switch
                                    checked={features.includes(
                                        'feature-security'
                                    )}
                                    onChange={() =>
                                        toggleFeature('feature-security')
                                    }
                                />
                            }
                        >
                            <div className="p-4">
                                <ul className="pl-5">
                                    <li>End-to-end encryption</li>
                                    <li>Audit logging</li>
                                </ul>
                            </div>
                        </AccordionItem>
                    </Accordion>
                </section>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Comprehensive examples of triggerSlot patterns: (1) Simple React elements with external state, (2) Independent selection state separate from expansion, (3) Feature toggles with Switch.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

// ============================================================================
// Default Value Story
// ============================================================================

export const DefaultValueMultiple: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: true,
        defaultValue: ['item-1', 'item-3'],
    },
    render: (args) => (
        <div className="w-150">
            <p className="mb-4 text-sm text-gray-500">
                Items 1 and 3 are expanded by default using the defaultValue
                prop with an array.
            </p>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                defaultValue={args.defaultValue as string[]}
            >
                <AccordionItem value="item-1" title="First Item (Default)">
                    <div className="p-4">
                        This item is expanded by default because defaultValue
                        includes &quot;item-1&quot;.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Second Item">
                    <div className="p-4">
                        This item is collapsed by default.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Third Item (Default)">
                    <div className="p-4">
                        This item is also expanded by default because
                        defaultValue includes &quot;item-3&quot;.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates defaultValue in multiple expansion mode. Pass an array of values to expand multiple items by default.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}

export const DefaultValueSingle: Story = {
    args: {
        accordionType: AccordionType.BORDER,
        isMultiple: false,
        defaultValue: 'item-2',
    },
    render: (args) => (
        <div className="w-150">
            <p className="mb-4 text-sm text-gray-500">
                Item 2 is expanded by default using the defaultValue prop.
            </p>
            <Accordion
                accordionType={args.accordionType}
                isMultiple={args.isMultiple}
                defaultValue={args.defaultValue}
            >
                <AccordionItem value="item-1" title="First Item">
                    <div className="p-4">
                        This is the first item, collapsed by default.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-2" title="Second Item (Default)">
                    <div className="p-4">
                        This item is expanded by default because defaultValue is
                        set to &quot;item-2&quot;. Works in uncontrolled mode.
                    </div>
                </AccordionItem>
                <AccordionItem value="item-3" title="Third Item">
                    <div className="p-4">
                        This is the third item, collapsed by default.
                    </div>
                </AccordionItem>
            </Accordion>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates defaultValue in single expansion mode. The accordion starts with the specified item expanded.',
            },
        },
        a11y: getA11yConfig('interactive'),
    },
}
