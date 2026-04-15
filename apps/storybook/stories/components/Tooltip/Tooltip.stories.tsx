import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'
import {
    Tooltip,
    TooltipSide,
    TooltipAlign,
    TooltipSize,
    TooltipSlotDirection,
    Button,
    ButtonType,
} from '@juspay/blend-design-system'
import {
    Info,
    HelpCircle,
    Star,
    AlertTriangle,
    CheckCircle,
    Settings,
    Shield,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Tooltip> = {
    title: 'Components/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        // Use shared a11y config for interactive components
        a11y: getA11yConfig('interactive'),
        // Chromatic visual regression testing
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A flexible tooltip component for displaying contextual information on hover or focus with customizable positioning, sizing, and content slots.',
        docs: {
            description: {
                component: `

## Usage

\`\`\`tsx
import { Tooltip, TooltipSide, TooltipAlign, TooltipSize } from '@juspay/blend-design-system';

<Tooltip 
  content="This is a helpful tooltip"
  side={TooltipSide.TOP}
  size={TooltipSize.SMALL}
  showArrow={true}
>
  <Button text="Hover me" />
</Tooltip>
\`\`\`
## Features
- Multiple positioning options (top, right, bottom, left)
- Flexible alignment (start, center, end)
- Two sizes (small, large)
- Optional arrow indicator
- Custom content slots with directional placement
- Controlled and uncontrolled modes
- Customizable delay duration
- Offset positioning control
- Accessible design with proper ARIA attributes
- Keyboard navigation support

## Accessibility

**WCAG Compliance**: 2.1 Level AA Compliant | Partial AAA Compliance

**Level AA Compliance**: ✅ Fully Compliant
- All Level A and Level AA criteria met
- Keyboard accessible (Tab, Enter, Space, Escape)
- Screen reader support (VoiceOver/NVDA)
- Proper ARIA attributes (role, aria-expanded, aria-label)
- Tooltip content accessible to screen readers
- Focus management for keyboard users
- Hover and focus trigger support
- Color contrast ratios meet WCAG 2.1 Level AA standards (4.5:1 for normal text, 3:1 for large text)

**Level AAA Compliance**: ⚠️ Partial (3 out of 4 applicable criteria)
- ✅ **Compliant**: 1.4.8 Visual Presentation, 2.1.3 Keyboard (No Exception), 3.2.5 Change on Request
- ❌ **Non-Compliant**: 1.4.6 Contrast (Enhanced) - requires 7:1 contrast ratio (currently 4.5:1 for AA)
- ℹ️ **Not Applicable**: 2.2.3 No Timing, 2.2.4 Interruptions

**Accessibility Features**:
- Tooltip trigger is keyboard accessible (Tab to focus, Enter/Space to open, Escape to close)
- Tooltip content is announced to screen readers when opened
- Proper ARIA attributes (aria-expanded, aria-label on trigger)
- Radix UI provides built-in accessibility features
- Tooltip appears on both hover and focus for keyboard users
- Delay duration configurable to prevent accidental triggers
- Portal rendering ensures tooltip is accessible in DOM hierarchy

**Verification:**
- **Storybook a11y addon**: Check Accessibility panel (0 violations expected for AA compliance)
- **Manual**: Test with VoiceOver/NVDA, verify contrast ratios with WebAIM Contrast Checker
- **Keyboard Testing**: Tab to trigger, press Enter/Space to open tooltip, Escape to close
- **Full Report**: See Accessibility Dashboard for detailed WCAG 2.0, 2.1, 2.2 compliance report

        `,
            },
        },
    },
    argTypes: {
        content: {
            control: 'text',
            description: 'The content to display inside the tooltip',
        },
        open: {
            control: 'boolean',
            description: 'Controlled open state of the tooltip',
        },
        side: {
            control: 'select',
            options: Object.values(TooltipSide),
            description:
                'The side where the tooltip should appear relative to the trigger',
        },
        align: {
            control: 'select',
            options: Object.values(TooltipAlign),
            description: 'The alignment of the tooltip relative to the trigger',
        },
        showArrow: {
            control: 'boolean',
            description:
                'Whether to show an arrow pointing to the trigger element',
        },
        size: {
            control: 'select',
            options: Object.values(TooltipSize),
            description: 'Size variant of the tooltip',
        },
        slotDirection: {
            control: 'select',
            options: Object.values(TooltipSlotDirection),
            description: 'Direction of the slot content placement',
        },
        delayDuration: {
            control: { type: 'number', min: 0, max: 2000, step: 100 },
            description: 'Delay in milliseconds before the tooltip appears',
        },
        offset: {
            control: { type: 'number', min: 0, max: 50, step: 1 },
            description:
                'Distance in pixels between the tooltip and trigger element',
        },
        fullWidth: {
            control: 'boolean',
            description:
                'Whether the trigger wrapper should take full width (useful for menu items)',
        },
        disableInteractive: {
            control: 'boolean',
            description:
                'If true, the tooltip will close when the cursor moves away from the trigger element, even if hovering over the tooltip itself. This prevents the tooltip from blocking interaction with elements below it.',
        },
        children: {
            description:
                'The trigger element that will show the tooltip on hover/focus',
        },
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

// Default story
export const Default: Story = {
    args: {
        content: 'This is a helpful tooltip',
        side: TooltipSide.TOP,
        align: TooltipAlign.CENTER,
        showArrow: true,
        size: TooltipSize.SMALL,
        delayDuration: 300,
        offset: 5,
    },
    render: (args) => (
        <Tooltip {...args}>
            <Button text="Hover me" />
        </Tooltip>
    ),
}

// Tooltip positions
export const TooltipPositions: Story = {
    render: () => (
        <div className="grid grid-cols-3 grid-rows-3 gap-15 p-15 items-center justify-items-center">
            <div></div>
            <Tooltip
                content="Top tooltip"
                side={TooltipSide.TOP}
                showArrow={true}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Top" />
            </Tooltip>
            <div></div>

            <Tooltip
                content="Left tooltip"
                side={TooltipSide.LEFT}
                showArrow={true}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Left" />
            </Tooltip>
            <Tooltip
                content="Center tooltip - no arrow"
                side={TooltipSide.TOP}
                showArrow={false}
            >
                <Button buttonType={ButtonType.PRIMARY} text="Center" />
            </Tooltip>
            <Tooltip
                content="Right tooltip"
                side={TooltipSide.RIGHT}
                showArrow={true}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Right" />
            </Tooltip>

            <div></div>
            <Tooltip
                content="Bottom tooltip"
                side={TooltipSide.BOTTOM}
                showArrow={true}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Bottom" />
            </Tooltip>
            <div></div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips positioned on all four sides: top, right, bottom, left. Hover over each button to see the tooltip placement.',
            },
        },
    },
}

// Tooltip alignments
export const TooltipAlignments: Story = {
    render: () => (
        <div className="flex flex-col gap-10 p-10">
            <div className="flex justify-between items-center">
                <Tooltip
                    content="Start aligned tooltip"
                    side={TooltipSide.TOP}
                    align={TooltipAlign.START}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Start Align"
                    />
                </Tooltip>
                <Tooltip
                    content="Center aligned tooltip"
                    side={TooltipSide.TOP}
                    align={TooltipAlign.CENTER}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Center Align"
                    />
                </Tooltip>
                <Tooltip
                    content="End aligned tooltip"
                    side={TooltipSide.TOP}
                    align={TooltipAlign.END}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="End Align"
                    />
                </Tooltip>
            </div>

            <div className="flex justify-between items-center">
                <Tooltip
                    content="Start aligned (right)"
                    side={TooltipSide.RIGHT}
                    align={TooltipAlign.START}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Right Start"
                    />
                </Tooltip>
                <Tooltip
                    content="Center aligned (right)"
                    side={TooltipSide.RIGHT}
                    align={TooltipAlign.CENTER}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.PRIMARY}
                        text="Right Center"
                    />
                </Tooltip>
                <Tooltip
                    content="End aligned (right)"
                    side={TooltipSide.RIGHT}
                    align={TooltipAlign.END}
                    showArrow={true}
                >
                    <Button
                        buttonType={ButtonType.SECONDARY}
                        text="Right End"
                    />
                </Tooltip>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tooltip alignment options: start, center, and end. Hover to see how tooltips align relative to their trigger elements.',
            },
        },
    },
}

// Tooltip sizes
export const TooltipSizes: Story = {
    render: () => (
        <div className="flex gap-8 items-center">
            <Tooltip
                content="Small tooltip with concise information"
                size={TooltipSize.SMALL}
                showArrow={true}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Small Tooltip"
                />
            </Tooltip>
            <Tooltip
                content="Large tooltip with more detailed information and additional context that can span multiple lines"
                size={TooltipSize.LARGE}
                showArrow={true}
            >
                <Button buttonType={ButtonType.PRIMARY} text="Large Tooltip" />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different tooltip sizes: Small and Large. Hover to see the size difference and content capacity.',
            },
        },
    },
}

// Rich content tooltips
export const RichContentTooltips: Story = {
    render: () => (
        <div className="flex gap-6 items-center flex-wrap">
            <Tooltip
                content={
                    <div>
                        <strong>Pro Tip</strong>
                        <br />
                        Use keyboard shortcuts for faster navigation
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Rich Content"
                    leadingIcon={<Info size={16} />}
                />
            </Tooltip>

            <Tooltip
                content={
                    <div className="flex flex-col gap-1">
                        <div className="font-bold flex items-center gap-1">
                            <CheckCircle size={14} color="#10b981" />
                            Success
                        </div>
                        <div>Operation completed successfully</div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.RIGHT}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Status"
                    leadingIcon={<CheckCircle size={16} />}
                />
            </Tooltip>

            <Tooltip
                content={
                    <div>
                        <div className="text-amber-400 font-bold mb-1">
                            ⚠️ Warning
                        </div>
                        <div>This action cannot be undone</div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.BOTTOM}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Warning"
                    leadingIcon={<AlertTriangle size={16} />}
                />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips with rich HTML content including formatted text, icons, and structured layouts.',
            },
        },
    },
}

// Tooltips with slots
export const WithSlots: Story = {
    render: () => (
        <div className="flex gap-6 items-center flex-wrap">
            <Tooltip
                content="Upgrade to premium for advanced features"
                slot={<Star size={16} color="#fbbf24" />}
                slotDirection={TooltipSlotDirection.LEFT}
                size={TooltipSize.LARGE}
                showArrow={true}
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Premium Features"
                />
            </Tooltip>

            <Tooltip
                content="Get help and support documentation"
                slot={<HelpCircle size={16} color="#3b82f6" />}
                slotDirection={TooltipSlotDirection.RIGHT}
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.RIGHT}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Help Center" />
            </Tooltip>

            <Tooltip
                content="Security settings and privacy controls"
                slot={<Shield size={16} color="#10b981" />}
                slotDirection={TooltipSlotDirection.LEFT}
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.BOTTOM}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Security"
                    leadingIcon={<Settings size={16} />}
                />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips with custom content slots (icons) placed on the left or right side of the content.',
            },
        },
    },
}

// Controlled tooltip
export const ControlledTooltip: Story = {
    render: () => {
        const ControlledTooltipComponent = () => {
            const [isOpen, setIsOpen] = useState(false)
            const [manualOpen, setManualOpen] = useState(false)

            return (
                <div className="flex gap-6 items-center flex-col">
                    <div className="flex gap-6 items-center">
                        <Tooltip
                            content="This tooltip is controlled by hover state"
                            open={isOpen}
                            showArrow={true}
                            size={TooltipSize.LARGE}
                        >
                            <Button
                                buttonType={ButtonType.PRIMARY}
                                text="Hover Controlled"
                                onMouseEnter={() => setIsOpen(true)}
                                onMouseLeave={() => setIsOpen(false)}
                            />
                        </Tooltip>

                        <Tooltip
                            content="This tooltip is controlled by click state"
                            open={manualOpen}
                            showArrow={true}
                            size={TooltipSize.LARGE}
                            side={TooltipSide.RIGHT}
                        >
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="Click Controlled"
                                onClick={() => setManualOpen(!manualOpen)}
                            />
                        </Tooltip>
                    </div>

                    <div className="text-sm text-gray-500 text-center">
                        <div>Hover tooltip: {isOpen ? 'Open' : 'Closed'}</div>
                        <div>
                            Click tooltip: {manualOpen ? 'Open' : 'Closed'}
                        </div>
                    </div>
                </div>
            )
        }
        return <ControlledTooltipComponent />
    },
    parameters: {
        docs: {
            description: {
                story: 'Controlled tooltips with custom open/close logic. One responds to hover, another to clicks.',
            },
        },
    },
}

// Delay and timing
export const DelayAndTiming: Story = {
    render: () => (
        <div className="flex gap-6 items-center">
            <Tooltip
                content="Instant tooltip (no delay)"
                delayDuration={0}
                showArrow={true}
            >
                <Button buttonType={ButtonType.SECONDARY} text="No Delay" />
            </Tooltip>

            <Tooltip
                content="Fast tooltip (300ms delay)"
                delayDuration={300}
                showArrow={true}
            >
                <Button buttonType={ButtonType.PRIMARY} text="Fast" />
            </Tooltip>

            <Tooltip
                content="Slow tooltip (1000ms delay)"
                delayDuration={1000}
                showArrow={true}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Slow" />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different delay durations before tooltips appear: instant, fast (300ms), and slow (1000ms).',
            },
        },
    },
}

// Offset variations
export const OffsetVariations: Story = {
    render: () => (
        <div className="flex gap-8 items-center">
            <Tooltip
                content="Close to trigger (5px offset)"
                offset={5}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Close" />
            </Tooltip>

            <Tooltip
                content="Normal distance (15px offset)"
                offset={15}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button buttonType={ButtonType.PRIMARY} text="Normal" />
            </Tooltip>

            <Tooltip
                content="Far from trigger (30px offset)"
                offset={30}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Far" />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different offset distances between tooltip and trigger element: close (5px), normal (15px), and far (30px).',
            },
        },
    },
}

// Full width examples
export const FullWidthExamples: Story = {
    render: () => (
        <div className="flex flex-col gap-6 p-5 max-w-100">
            <div>
                <h3 className="mb-3 text-base font-bold">
                    Without fullWidth (default)
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                    Tooltip wrapper uses inline-flex, causing the trigger to
                    shrink to fit-content.
                </p>
                <div className="border border-gray-200 rounded-lg p-2 w-full">
                    <Tooltip
                        content="This tooltip is on a menu item"
                        showArrow={true}
                        side={TooltipSide.RIGHT}
                    >
                        <div className="p-3 bg-gray-100 rounded cursor-pointer">
                            Menu Item (fit-content width)
                        </div>
                    </Tooltip>
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-base font-bold">
                    With fullWidth={true}
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                    Tooltip wrapper uses flex with full width, allowing the
                    trigger to span the full container width.
                </p>
                <div className="border border-gray-200 rounded-lg p-2 w-full">
                    <Tooltip
                        content="This tooltip is on a full-width menu item"
                        showArrow={true}
                        side={TooltipSide.RIGHT}
                        fullWidth={true}
                    >
                        <div className="p-3 bg-gray-100 rounded cursor-pointer">
                            Menu Item (full width)
                        </div>
                    </Tooltip>
                </div>
            </div>

            <div>
                <h3 className="mb-3 text-base font-bold">
                    Comparison in Menu Context
                </h3>
                <p className="mb-4 text-sm text-gray-500">
                    Side-by-side comparison showing the difference in menu item
                    widths.
                </p>
                <div className="border border-gray-200 rounded-lg p-2 flex flex-col gap-1">
                    <Tooltip
                        content="Short tooltip"
                        showArrow={true}
                        side={TooltipSide.RIGHT}
                    >
                        <div className="p-3 bg-gray-100 rounded cursor-pointer">
                            Item 1 (default)
                        </div>
                    </Tooltip>
                    <Tooltip
                        content="This is a longer tooltip that shows the full width behavior"
                        showArrow={true}
                        side={TooltipSide.RIGHT}
                        fullWidth={true}
                    >
                        <div className="p-3 bg-blue-100 rounded cursor-pointer">
                            Item 2 (fullWidth)
                        </div>
                    </Tooltip>
                    <Tooltip
                        content="Another item with full width"
                        showArrow={true}
                        side={TooltipSide.RIGHT}
                        fullWidth={true}
                    >
                        <div className="p-3 bg-blue-100 rounded cursor-pointer">
                            Item 3 (fullWidth)
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the fullWidth prop which makes the tooltip trigger wrapper span full width. This is particularly useful for menu items where you want the entire item to be clickable and show a tooltip.',
            },
        },
    },
}
// Max width examples
export const MaxWidthExamples: Story = {
    render: () => (
        <div className="flex gap-8 items-center">
            <Tooltip
                content="This is a long tooltip content that will be constrained to a narrow width of 150px. It should wrap to multiple lines and demonstrate the maxWidth property in action."
                maxWidth="150px"
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button
                    buttonType={ButtonType.SECONDARY}
                    text="Narrow (150px)"
                />
            </Tooltip>

            <Tooltip
                content="This tooltip has a medium width constraint of 250px. It provides a good balance between readability and space efficiency for moderately long content."
                maxWidth="250px"
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button buttonType={ButtonType.PRIMARY} text="Medium (250px)" />
            </Tooltip>

            <Tooltip
                content="This tooltip demonstrates a wide width constraint of 400px, which allows for longer content to be displayed on fewer lines while maintaining good readability."
                maxWidth="400px"
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Wide (400px)" />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Different maxWidth constraints on tooltips: narrow (150px), medium (250px), and wide (400px).',
            },
        },
    },
}

// Form validation tooltips
export const FormValidationTooltips: Story = {
    render: () => (
        <div className="flex flex-col gap-6 p-5 max-w-100">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Email Address *</label>
                <div className="relative">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border-2 border-red-500 rounded-md text-sm"
                    />
                    <Tooltip
                        content={
                            <div>
                                <div className="font-bold text-red-500">
                                    Invalid Email Format
                                </div>
                                <div className="mt-1">
                                    Please enter a valid email address like:
                                    user@example.com
                                </div>
                            </div>
                        }
                        side={TooltipSide.RIGHT}
                        size={TooltipSize.LARGE}
                        showArrow={true}
                        slot={<AlertTriangle size={14} color="#ef4444" />}
                        slotDirection={TooltipSlotDirection.LEFT}
                    >
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="!"
                            />
                        </div>
                    </Tooltip>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Password *</label>
                <div className="relative">
                    <input
                        type="password"
                        placeholder="Enter your password"
                        className="w-full px-3 py-2 border-2 border-emerald-500 rounded-md text-sm"
                    />
                    <Tooltip
                        content={
                            <div>
                                <div className="font-bold text-emerald-500 flex items-center gap-1">
                                    <CheckCircle size={14} />
                                    Strong Password
                                </div>
                                <div className="mt-1">
                                    ✓ At least 8 characters
                                    <br />
                                    ✓ Contains uppercase letter
                                    <br />✓ Contains special character
                                </div>
                            </div>
                        }
                        side={TooltipSide.RIGHT}
                        size={TooltipSize.LARGE}
                        showArrow={true}
                    >
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <Button
                                buttonType={ButtonType.SECONDARY}
                                text="✓"
                            />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips used for form validation feedback showing error states and success confirmations.',
            },
        },
    },
}

// Feature announcements
export const FeatureAnnouncements: Story = {
    render: () => (
        <div className="flex gap-6 items-center flex-wrap">
            <Tooltip
                content={
                    <div>
                        <div className="font-bold text-blue-500 mb-2 flex items-center gap-1.5">
                            <span className="bg-blue-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                NEW
                            </span>
                            Dark Mode Available!
                        </div>
                        <div>
                            Switch to dark mode in settings for a better
                            night-time experience.
                            <br />
                            <span className="text-xs text-gray-500">
                                Click here to try it now →
                            </span>
                        </div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.BOTTOM}
                maxWidth="280px"
            >
                <Button
                    buttonType={ButtonType.PRIMARY}
                    text="Settings"
                    leadingIcon={<Settings size={16} />}
                />
            </Tooltip>

            <Tooltip
                content={
                    <div>
                        <div className="font-bold text-violet-600 mb-2 flex items-center gap-1.5">
                            <Star size={16} color="#fbbf24" />
                            Upgrade to Premium
                        </div>
                        <div>
                            Unlock advanced analytics, custom themes, and
                            priority support.
                            <br />
                            <span className="text-xs text-gray-500">
                                50% off for the first month!
                            </span>
                        </div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.TOP}
                maxWidth="300px"
                slot={
                    <span className="bg-violet-600 text-white px-1.5 py-0.5 rounded-xl text-[10px] font-bold">
                        PRO
                    </span>
                }
                slotDirection={TooltipSlotDirection.RIGHT}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Account" />
            </Tooltip>

            <Tooltip
                content={
                    <div>
                        <div className="font-bold text-emerald-600 mb-2">
                            🎉 Milestone Reached!
                        </div>
                        <div>
                            You've completed 100 tasks this month. Keep up the
                            great work!
                            <br />
                            <span className="text-xs text-gray-500">
                                View your achievement badge →
                            </span>
                        </div>
                    </div>
                }
                size={TooltipSize.LARGE}
                showArrow={true}
                side={TooltipSide.RIGHT}
                maxWidth="320px"
            >
                <Button buttonType={ButtonType.SECONDARY} text="Dashboard" />
            </Tooltip>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips used for feature announcements, promotions, and achievement notifications.',
            },
        },
    },
}
