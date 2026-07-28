import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    CreditCard,
    MoreHorizontal,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    UserRound,
} from 'lucide-react'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../../.storybook/a11y.config'
import {
    CardV2,
    CardV2ActionPlacement,
    CardV2Orientation,
    CardV2Padding,
    CardV2Variant,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
} from '@juspay/blend-design-system'

const ImageMedia = ({ src, alt }: { src: string; alt: string }) => (
    <img
        src={src}
        alt={alt}
        style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
        }}
    />
)

const IconMedia = ({
    children,
    background,
}: {
    children: React.ReactNode
    background: string
}) => (
    <div
        style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background,
            color: '#ffffff',
        }}
    >
        {children}
    </div>
)

const Pill = ({
    children,
    tone = 'neutral',
}: {
    children: React.ReactNode
    tone?: 'neutral' | 'success' | 'warning' | 'info'
}) => {
    const colors = {
        neutral: ['#f3f4f6', '#374151', '#d1d5db'],
        success: ['#ecfdf3', '#067647', '#abefc6'],
        warning: ['#fff7ed', '#b45309', '#fed7aa'],
        info: ['#eff6ff', '#175cd3', '#bfdbfe'],
    }[tone]

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: 'fit-content',
                borderRadius: 999,
                border: `1px solid ${colors[2]}`,
                background: colors[0],
                color: colors[1],
                fontSize: 12,
                lineHeight: '16px',
                fontWeight: 600,
                padding: '2px 8px',
            }}
        >
            {children}
        </span>
    )
}

const StoryGrid = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 16,
            alignItems: 'start',
            width: 'min(1120px, 100%)',
        }}
    >
        {children}
    </div>
)

const MetricRow = ({ label, value }: { label: string; value: string }) => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: 14,
            color: '#4b5563',
        }}
    >
        <span>{label}</span>
        <strong style={{ color: '#111827' }}>{value}</strong>
    </div>
)

const meta: Meta<typeof CardV2> = {
    title: 'Components/CardV2',
    component: CardV2,
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('interactive'),
        chromatic: CHROMATIC_CONFIG,
        docsSubtitle:
            'A modern, composable card surface with prop and compound APIs, media slots, actions, states, skeletons, and title truncation.',
        docs: {
            description: {
                component: `
## Usage
\`\`\`tsx
import { CardV2, CardV2ActionPlacement } from '@juspay/blend-design-system';

<CardV2
  title="Payment success"
  subtitle="Last 24 hours"
  description="Successful authorization attempts increased."
  actions={{ text: 'Review', onClick: () => {} }}
/>
\`\`\`

## Features
- Simple prop API for common cards
- Compound subcomponents for custom composition
- Vertical and horizontal media layouts
- Body or footer action placement
- Interactive and selected states
- Skeleton loading state
- Single-line title truncation with \`truncateTitle\`
                `,
            },
        },
    },
    argTypes: {
        variant: {
            control: 'select',
            options: Object.values(CardV2Variant),
        },
        orientation: {
            control: 'select',
            options: Object.values(CardV2Orientation),
        },
        padding: {
            control: 'select',
            options: Object.values(CardV2Padding),
        },
        actionPlacement: {
            control: 'select',
            options: Object.values(CardV2ActionPlacement),
        },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        description: { control: 'text' },
        centered: { control: 'boolean' },
        interactive: { control: 'boolean' },
        selected: { control: 'boolean' },
        truncateTitle: { control: 'boolean' },
        media: { control: false },
        leadingSlot: { control: false },
        trailingSlot: { control: false },
        footer: { control: false },
        actions: { control: false },
        children: { control: false },
    },
    args: {
        variant: CardV2Variant.OUTLINED,
        orientation: CardV2Orientation.VERTICAL,
        padding: CardV2Padding.COMFORTABLE,
        title: 'Payment success',
        subtitle: 'Last 24 hours',
        description: 'Successful authorization attempts increased.',
    },
    tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CardV2>

export const Default: Story = {
    args: {
        actions: {
            text: 'Review',
            buttonType: ButtonV2Type.PRIMARY,
            size: ButtonV2Size.SMALL,
            rightSlot: { slot: <ArrowRight size={16} aria-hidden="true" /> },
        },
        style: { width: 360 },
    },
}

export const Variants: Story = {
    render: () => (
        <StoryGrid>
            <CardV2
                variant={CardV2Variant.OUTLINED}
                title="Outlined card"
                subtitle="Default surface"
                description="Use for most grouped product content."
            />
            <CardV2
                variant={CardV2Variant.ELEVATED}
                title="Elevated card"
                subtitle="Raised surface"
                description="Use when the card needs stronger separation."
            />
            <CardV2
                variant={CardV2Variant.GHOST}
                title="Ghost card"
                subtitle="Subtle grouping"
                description="Use inside quiet panels or dense layouts."
            />
        </StoryGrid>
    ),
}

export const WithMedia: Story = {
    render: () => (
        <StoryGrid>
            <CardV2
                title="Merchant owner"
                subtitle="Risk operations"
                description="Owner for escalation policies."
                media={
                    <ImageMedia
                        alt="Merchant owner"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=640&h=420&fit=crop"
                    />
                }
                mediaHeight="156px"
                actions={{
                    text: 'Open profile',
                    size: ButtonV2Size.SMALL,
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            />
            <CardV2
                title="Authorization health"
                subtitle="India cards"
                description="Approval rate improved after smart retry tuning."
                media={
                    <IconMedia background="linear-gradient(135deg, #175cd3, #06aed4)">
                        <TrendingUp size={36} aria-hidden="true" />
                    </IconMedia>
                }
                mediaHeight="132px"
                footer={<Pill tone="success">+4.8% today</Pill>}
            />
            <CardV2
                title="Risk policy"
                subtitle="SCA exemption"
                description="Fixed leading visual for scan-friendly rows."
                orientation={CardV2Orientation.HORIZONTAL}
                media={
                    <IconMedia background="linear-gradient(135deg, #16a34a, #84cc16)">
                        <ShieldCheck size={28} aria-hidden="true" />
                    </IconMedia>
                }
                mediaWidth="72px"
                mediaHeight="112px"
                actions={{
                    text: 'Details',
                    size: ButtonV2Size.SMALL,
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            />
        </StoryGrid>
    ),
}

export const CompoundComposition: Story = {
    render: () => (
        <CardV2 style={{ width: 420 }}>
            <CardV2.Header
                leadingSlot={
                    <IconMedia background="#111827">
                        <CreditCard size={20} aria-hidden="true" />
                    </IconMedia>
                }
                eyebrow="Settlement"
                title="Batch reconciliation"
                subtitle="Today, 4:30 PM"
                trailingSlot={<Pill tone="info">Running</Pill>}
            />
            <CardV2.Body description="Monitor the settlement batch before auto-close.">
                <div style={{ display: 'grid', gap: 8, width: '100%' }}>
                    <MetricRow label="Matched" value="2,430" />
                    <MetricRow label="Pending" value="18" />
                    <MetricRow label="Exceptions" value="3" />
                </div>
            </CardV2.Body>
            <CardV2.Footer
                divider
                actions={[
                    {
                        text: 'Inspect',
                        buttonType: ButtonV2Type.PRIMARY,
                        size: ButtonV2Size.SMALL,
                    },
                    {
                        'aria-label': 'More options',
                        subType: ButtonV2SubType.ICON_ONLY,
                        size: ButtonV2Size.SMALL,
                        leftSlot: {
                            slot: (
                                <MoreHorizontal size={16} aria-hidden="true" />
                            ),
                        },
                    },
                ]}
            >
                <Pill tone="warning">3 exceptions</Pill>
            </CardV2.Footer>
        </CardV2>
    ),
}

export const TruncatedTitle: Story = {
    render: () => (
        <StoryGrid>
            <CardV2
                style={{ width: 320 }}
                title="A very long routing configuration title that should stay on one line"
                truncateTitle
                subtitle="Prop API"
                description="The title truncates without forcing the card taller."
                trailingSlot={<Pill tone="success">Active</Pill>}
            />
            <CardV2 style={{ width: 320 }}>
                <CardV2.Header
                    title="A compound card title that also truncates inside the header"
                    truncateTitle
                    subtitle="Compound API"
                    trailingSlot={<Pill tone="info">Draft</Pill>}
                />
                <CardV2.Body description="Useful in card grids and list rows where height needs to remain predictable." />
            </CardV2>
        </StoryGrid>
    ),
}

export const ActionsAndStates: Story = {
    render: () => (
        <StoryGrid>
            <CardV2
                title="Selectable method"
                subtitle="Visa ending in 4242"
                description="Interactive selected card with focus-visible styling."
                interactive
                selected
                leadingSlot={<CheckCircle2 size={24} color="#16a34a" />}
                actions={{
                    text: 'Edit',
                    size: ButtonV2Size.SMALL,
                    buttonType: ButtonV2Type.SECONDARY,
                }}
            />
            <CardV2
                title="Footer actions"
                subtitle="Action placement"
                description="Footer actions are separated from the main body."
                footer={<Pill tone="neutral">Updated 2m ago</Pill>}
                actionPlacement={CardV2ActionPlacement.FOOTER}
                actions={[
                    {
                        text: 'Approve',
                        size: ButtonV2Size.SMALL,
                        buttonType: ButtonV2Type.PRIMARY,
                    },
                    {
                        text: 'Reject',
                        size: ButtonV2Size.SMALL,
                        buttonType: ButtonV2Type.DANGER,
                    },
                ]}
            />
            <CardV2
                title="Centered empty state"
                subtitle="No disputes"
                description="There are no open disputes for this merchant."
                centered
                media={
                    <IconMedia background="linear-gradient(135deg, #7c3aed, #2563eb)">
                        <Sparkles size={32} aria-hidden="true" />
                    </IconMedia>
                }
                mediaWidth="72px"
                mediaHeight="72px"
                actions={{
                    text: 'Create alert',
                    size: ButtonV2Size.SMALL,
                    buttonType: ButtonV2Type.PRIMARY,
                }}
            />
        </StoryGrid>
    ),
}

export const DensityAndSkeleton: Story = {
    render: () => (
        <StoryGrid>
            <CardV2
                padding={CardV2Padding.COMPACT}
                title="Compact card"
                subtitle="Dense operational list"
                description="Compact padding works for dashboards and repeated rows."
                leadingSlot={<BarChart3 size={20} color="#175cd3" />}
            />
            <CardV2
                padding={CardV2Padding.NONE}
                media={
                    <ImageMedia
                        alt="Dashboard preview"
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&h=360&fit=crop"
                    />
                }
                mediaHeight="180px"
            >
                <div style={{ padding: 16 }}>
                    <strong>Custom padded body</strong>
                    <p style={{ margin: '8px 0 0', color: '#4b5563' }}>
                        Use padding none when the child layout owns spacing.
                    </p>
                </div>
            </CardV2>
            <CardV2
                title="Loading card"
                description="Hidden while skeleton renders"
                skeleton={{ show: true, height: '120px' }}
            />
        </StoryGrid>
    ),
}

export const PeopleCards: Story = {
    render: () => (
        <StoryGrid>
            <CardV2
                title="Ananya Rao"
                subtitle="Risk operations"
                description="Owner for escalation policies."
                media={
                    <ImageMedia
                        alt="Ananya Rao"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=520&h=520&fit=crop"
                    />
                }
                mediaWidth="88px"
                mediaHeight="88px"
                centered
                trailingSlot={<Pill tone="success">Online</Pill>}
                actions={{
                    'aria-label': 'Open actions',
                    subType: ButtonV2SubType.ICON_ONLY,
                    size: ButtonV2Size.SMALL,
                    leftSlot: {
                        slot: <MoreHorizontal size={16} aria-hidden="true" />,
                    },
                }}
            />
            <CardV2
                title="Fraud review team"
                subtitle="6 reviewers active"
                description="Round-robin queue coverage across priority merchants."
                orientation={CardV2Orientation.HORIZONTAL}
                media={
                    <IconMedia background="#0f172a">
                        <UserRound size={28} aria-hidden="true" />
                    </IconMedia>
                }
                mediaWidth="72px"
                mediaHeight="72px"
                actions={{
                    text: 'Assign',
                    size: ButtonV2Size.SMALL,
                    buttonType: ButtonV2Type.PRIMARY,
                }}
            />
        </StoryGrid>
    ),
}
