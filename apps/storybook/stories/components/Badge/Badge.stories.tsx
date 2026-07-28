import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    Badge,
    BadgeSize,
    BadgeColor,
} from '../../../../../packages/blend/lib/components/Badge'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'
import { Bell, Mail, MessageSquare, User } from 'lucide-react'

const meta: Meta<typeof Badge> = {
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A versatile badge component for displaying counts, status indicators, and notifications.',
        docs: {
            description: {
                component: `
## Usage

\`\`\`tsx
import { Badge, BadgeSize, BadgeColor } from '@juspay/blend-design-system';

{/* Standalone badge with count */}
<Badge count={5} />

{/* Standalone badge with text */}
<Badge text="NEW" />

{/* Dot badge */}
<Badge />

{/* Badge positioned on a child element */}
<Badge count={3}>
  <Mail />
</Badge>

{/* Badge on circular element (circumference positioning) */}
<Badge count={5} isCircular>
  <Avatar />
</Badge>
\`\`\`

## Features
- **Standalone badges**: Display counts, text, or dot indicators
- **Positioned badges**: Attach badges to child elements with corner or circumference positioning
- **Multiple sizes**: Small, Medium, and Large
- **Multiple colors**: Alert, Neutral, Warning, Primary, and Success
- **Flexible positioning**: Top-right, top-left, bottom-right, bottom-left
- **Circular element support**: Special positioning on circular elements like avatars
- **Overflow handling**: Configurable maxCount with "99+" overflow display
- **Zero count handling**: Option to show or hide zero counts
- **Accessible by default**: role="status", aria-label support
- **Dark/light theme support**

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant

**Level AA Compliance**: Fully Compliant
- All Level A and Level AA criteria met
- Proper ARIA attributes (role="status", aria-label)
- Screen reader support (VoiceOver/NVDA)
- Sufficient color contrast for all color variants
- Touch targets meet minimum requirements

**Key Accessibility Features**:
- \`role="status"\` for live region announcements
- \`aria-label\` provides accessible text for counts, text content, or "Notification" for dots
- Overflow counts announce as "More than {maxCount}" for clarity
- Hidden badges are removed from DOM (not just visually hidden)

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected)
- **jest-axe**: Run \`pnpm test Badge.accessibility\`
- **Chromatic**: Visual regression for all variants
- **Manual**: Test with VoiceOver/NVDA
                `,
            },
        },
    },
    args: {
        count: undefined,
        maxCount: 99,
        size: BadgeSize.MD,
        color: BadgeColor.ALERT,
        text: undefined,
        showBadge: true,
        showZero: false,
    },
    argTypes: {
        count: {
            control: 'number',
            description: 'The count to display in the badge (for pill variant)',
        },
        maxCount: {
            control: 'number',
            description: 'Maximum count before showing "99+"',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '99' },
            },
        },
        size: {
            control: 'select',
            options: Object.values(BadgeSize),
            description: 'Size of the badge',
            table: {
                type: { summary: 'BadgeSize' },
                defaultValue: { summary: 'BadgeSize.MD' },
            },
        },
        color: {
            control: 'select',
            options: Object.values(BadgeColor),
            description: 'Color variant of the badge',
            table: {
                type: { summary: 'BadgeColor' },
                defaultValue: { summary: 'BadgeColor.ALERT' },
            },
        },
        text: {
            control: 'text',
            description: 'Custom text to display (overrides count)',
        },
        showBadge: {
            control: 'boolean',
            description: 'Whether to show the badge',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        showZero: {
            control: 'boolean',
            description: 'Whether to show zero count',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        position: {
            control: 'select',
            options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
            description: 'Position of badge when children is provided',
            table: {
                type: { summary: 'BadgePosition' },
                defaultValue: { summary: 'top-right' },
            },
        },
        offset: {
            control: 'object',
            description:
                'ptional offset for positioning [verticalOffset, horizontalOffset] in pixels',
            table: {
                type: { summary: '[number, number]' },
            },
        },
        isCircular: {
            control: 'boolean',
            description:
                'Whether the wrapped child element is circular (positions badge on circumference)',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        children: {
            control: false,
            description: 'Children element to wrap with badge positioning',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {
    args: {
        count: 5,
    },
}

export const Standalone: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">With Count</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} />
                    <Badge count={50} />
                    <Badge count={150} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">With Text</h3>
                <div className="flex gap-4 items-center">
                    <Badge text="NEW" />
                    <Badge text="BETA" />
                    <Badge text="99+" />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">Dot Badge</h3>
                <div className="flex gap-4 items-center">
                    <Badge />
                    <div className="relative flex items-center justify-center gap-0.5">
                        <Mail size={24} />
                        <Badge />
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Standalone badge variants: count, text, and dot.',
            },
        },
    },
}

export const Sizes: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">Small (SM)</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} size={BadgeSize.SM} />
                    <Badge text="NEW" size={BadgeSize.SM} />
                    <Badge size={BadgeSize.SM} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">Medium (MD)</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} size={BadgeSize.MD} />
                    <Badge text="NEW" size={BadgeSize.MD} />
                    <Badge size={BadgeSize.MD} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">Large (LG)</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} size={BadgeSize.LG} />
                    <Badge text="NEW" size={BadgeSize.LG} />
                    <Badge size={BadgeSize.LG} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All badge sizes with count, text, and dot variants.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 300,
        },
    },
}

export const Colors: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Alert (Default)
                </h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} color={BadgeColor.ALERT} />
                    <Badge text="NEW" color={BadgeColor.ALERT} />
                    <Badge color={BadgeColor.ALERT} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">Neutral</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} color={BadgeColor.NEUTRAL} />
                    <Badge text="BETA" color={BadgeColor.NEUTRAL} />
                    <Badge color={BadgeColor.NEUTRAL} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">Warning</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} color={BadgeColor.WARNING} />
                    <Badge text="PENDING" color={BadgeColor.WARNING} />
                    <Badge color={BadgeColor.WARNING} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">Primary</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} color={BadgeColor.PRIMARY} />
                    <Badge text="INFO" color={BadgeColor.PRIMARY} />
                    <Badge color={BadgeColor.PRIMARY} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">Success</h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} color={BadgeColor.SUCCESS} />
                    <Badge text="DONE" color={BadgeColor.SUCCESS} />
                    <Badge color={BadgeColor.SUCCESS} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'All color variants with count, text, and dot options.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 300,
        },
    },
}

export const WithChildren: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    On Icons (Top-right, default)
                </h3>
                <div className="flex gap-6 items-center">
                    <Badge count={5} size={BadgeSize.SM}>
                        <Mail size={24} />
                    </Badge>
                    <Badge count={100} size={BadgeSize.SM}>
                        <MessageSquare size={24} />
                    </Badge>
                    <Badge>
                        <Bell size={24} />
                    </Badge>
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">All Positions</h3>
                <div className="flex gap-6 items-center">
                    <Badge count={3} position="top-right">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                    </Badge>
                    <Badge count={3} position="top-left">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                    </Badge>
                    <Badge count={3} position="bottom-right">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                    </Badge>
                    <Badge count={3} position="bottom-left">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <Mail size={20} />
                        </div>
                    </Badge>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Badges positioned on child elements. Default is top-right.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 300,
        },
    },
}

export const CircularPositioning: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Circular Elements (Circumference Positioning)
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                    When isCircular is true, the badge is positioned on the
                    circumference at a 45-degree angle.
                </p>
                <div className="flex gap-6 items-center">
                    <Badge count={5} isCircular>
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white"></div>
                    </Badge>
                    <Badge count={3} isCircular position="top-left">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white"></div>
                    </Badge>
                    <Badge
                        isCircular
                        position="bottom-right"
                        size={BadgeSize.LG}
                    >
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white"></div>
                    </Badge>
                    <Badge
                        isCircular
                        position="bottom-left"
                        size={BadgeSize.LG}
                    >
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white"></div>
                    </Badge>
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Comparison: Corner vs Circumference
                </h3>
                <div className="flex gap-8 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <Badge count={5}>
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                <User size={20} />
                            </div>
                        </Badge>
                        <span className="text-xs text-gray-500">Corner</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Badge count={5} isCircular>
                            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                <User size={20} />
                            </div>
                        </Badge>
                        <span className="text-xs text-gray-500">
                            Circumference
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Special positioning for circular elements like avatars. Badge is placed on the circumference rather than the corner.',
            },
        },
        chromatic: {
            ...CHROMATIC_CONFIG,
            delay: 300,
        },
    },
}

export const OverflowHandling: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Default (maxCount: 99)
                </h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} />
                    <Badge count={99} />
                    <Badge count={100} />
                    <Badge count={999} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Custom maxCount (10)
                </h3>
                <div className="flex gap-4 items-center">
                    <Badge count={5} maxCount={10} />
                    <Badge count={10} maxCount={10} />
                    <Badge count={11} maxCount={10} />
                    <Badge count={50} maxCount={10} />
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Custom maxCount (999)
                </h3>
                <div className="flex gap-4 items-center">
                    <Badge count={500} maxCount={999} />
                    <Badge count={999} maxCount={999} />
                    <Badge count={1000} maxCount={999} />
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Count overflow handling. When count exceeds maxCount, displays "{maxCount}+".',
            },
        },
    },
}

export const ZeroHandling: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    showZero: false (default)
                </h3>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <Badge count={0}>
                            <Mail size={24} />
                        </Badge>
                        <span className="text-xs text-gray-500">Hidden</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Badge count={1}>
                            <Mail size={24} />
                        </Badge>
                        <span className="text-xs text-gray-500">Visible</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">showZero: true</h3>
                <div className="flex gap-4 items-center">
                    <div className="flex flex-col items-center gap-2">
                        <Badge count={0} showZero>
                            <Mail size={24} />
                        </Badge>
                        <span className="text-xs text-gray-500">Shows "0"</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <Badge count={1} showZero>
                            <Mail size={24} />
                        </Badge>
                        <span className="text-xs text-gray-500">Visible</span>
                    </div>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Control whether zero counts are displayed. By default, zero counts hide the badge.',
            },
        },
    },
}

export const ShowHide: Story = {
    render: () => {
        const [visible, setVisible] = React.useState(true)
        return (
            <div className="flex flex-col gap-6">
                <div className="flex gap-4 items-center">
                    <Badge count={5} showBadge={visible} size={BadgeSize.SM}>
                        <Mail size={24} />
                    </Badge>
                    <button
                        onClick={() => setVisible(!visible)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        {visible ? 'Hide Badge' : 'Show Badge'}
                    </button>
                </div>
                <p className="text-sm text-gray-500">
                    Click the button to toggle badge visibility.
                </p>
            </div>
        )
    },
    parameters: {
        docs: {
            description: {
                story: 'Toggle badge visibility with the showBadge prop. When false, the badge is not rendered.',
            },
        },
    },
}

export const CustomOffset: Story = {
    render: () => (
        <div className="flex flex-col gap-8">
            <div>
                <h3 className="mb-4 text-base font-semibold">Default Offset</h3>
                <Badge count={5}>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                    </div>
                </Badge>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Custom Offset [10, 10]
                </h3>
                <Badge count={5} offset={[10, 10]}>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                    </div>
                </Badge>
            </div>
            <div>
                <h3 className="mb-4 text-base font-semibold">
                    Custom Offset [-5, -5]
                </h3>
                <Badge count={5} offset={[-5, -5]}>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <Mail size={20} />
                    </div>
                </Badge>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Customize badge offset from the edge using the offset prop.',
            },
        },
    },
}
