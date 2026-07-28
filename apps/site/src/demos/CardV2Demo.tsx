import { useState, type ReactNode } from 'react'
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    Bell,
    CalendarDays,
    CheckCircle2,
    Clock,
    CreditCard,
    Database,
    ExternalLink,
    FileText,
    ImageOff,
    Layers,
    LockKeyhole,
    Mail,
    MapPin,
    MoreHorizontal,
    PackageCheck,
    Paperclip,
    PieChart,
    ReceiptText,
    ShieldCheck,
    Sparkles,
    Smartphone,
    UploadCloud,
    Users,
    WalletCards,
    Zap,
} from 'lucide-react'
import {
    CardV2,
    CardV2ActionPlacement,
    CardV2Orientation,
    CardV2Padding,
    CardV2Variant,
} from '../../../../packages/blend/lib/components/CardV2'
import {
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
} from '../../../../packages/blend/lib/components/ButtonV2'
import {
    Badge,
    BadgeColor,
    BadgeSize,
} from '../../../../packages/blend/lib/components/Badge'
import {
    ProgressBar,
    ProgressBarSize,
    ProgressBarVariant,
} from '../../../../packages/blend/lib/components/ProgressBar'
import { SwitchV2 } from '../../../../packages/blend/lib/components/SelectorV2/SwitchV2'
import CheckboxV2 from '../../../../packages/blend/lib/components/SelectorV2/CheckboxV2/CheckboxV2'
import { SelectorV2Size } from '../../../../packages/blend/lib/components/SelectorV2/selectorV2.types'

const iconStyle = { width: 18, height: 18 }

const primaryAction = {
    text: 'Review',
    buttonType: ButtonV2Type.PRIMARY,
    size: ButtonV2Size.SMALL,
    rightSlot: { slot: <ArrowRight style={iconStyle} /> },
    onClick: () => console.log('CardV2 primary action'),
}

const secondaryAction = {
    text: 'Details',
    buttonType: ButtonV2Type.SECONDARY,
    size: ButtonV2Size.SMALL,
    onClick: () => console.log('CardV2 secondary action'),
}

const iconOnlyAction = {
    buttonType: ButtonV2Type.SECONDARY,
    size: ButtonV2Size.SMALL,
    subType: ButtonV2SubType.ICON_ONLY,
    'aria-label': 'More options',
    leftSlot: { slot: <MoreHorizontal style={iconStyle} /> },
    onClick: () => console.log('CardV2 icon action'),
}

const DemoSection = ({
    title,
    description,
    children,
}: {
    title: string
    description?: string
    children: ReactNode
}) => (
    <section className="space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && (
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
        </div>
        {children}
    </section>
)

const Pill = ({
    children,
    tone = 'gray',
}: {
    children: ReactNode
    tone?: 'gray' | 'green' | 'blue' | 'amber' | 'red'
}) => {
    const tones = {
        gray: 'bg-gray-100 text-gray-700 border-gray-200',
        green: 'bg-green-50 text-green-700 border-green-200',
        blue: 'bg-blue-50 text-blue-700 border-blue-200',
        amber: 'bg-amber-50 text-amber-700 border-amber-200',
        red: 'bg-red-50 text-red-700 border-red-200',
    }

    return (
        <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
        >
            {children}
        </span>
    )
}

const MediaBlock = ({
    tone = 'blue',
    icon,
    label,
}: {
    tone?: 'blue' | 'green' | 'purple' | 'amber'
    icon: ReactNode
    label: string
}) => {
    const tones = {
        blue: 'from-blue-500 to-cyan-400',
        green: 'from-emerald-500 to-lime-400',
        purple: 'from-violet-500 to-fuchsia-400',
        amber: 'from-amber-500 to-orange-400',
    }

    return (
        <div
            className={`flex h-full min-h-[72px] w-full items-center justify-center bg-gradient-to-br ${tones[tone]} text-white`}
        >
            <div className="flex flex-col items-center gap-2">
                {icon}
                <span className="text-xs font-semibold uppercase tracking-wide">
                    {label}
                </span>
            </div>
        </div>
    )
}

const ImageMedia = ({ src, alt }: { src: string; alt: string }) => (
    <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
    />
)

const MiniTable = () => (
    <div className="overflow-hidden rounded-md border border-gray-200">
        {[
            ['Gateway', 'Healthy', '99.98%'],
            ['Risk engine', 'Degraded', '97.20%'],
            ['Settlement', 'Healthy', '100%'],
        ].map(([name, status, value]) => (
            <div
                key={name}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-gray-100 px-3 py-2 text-sm last:border-b-0"
            >
                <span className="font-medium text-gray-800">{name}</span>
                <Pill tone={status === 'Healthy' ? 'green' : 'amber'}>
                    {status}
                </Pill>
                <span className="font-mono text-xs text-gray-500">{value}</span>
            </div>
        ))}
    </div>
)

const DebugList = ({
    items,
}: {
    items: Array<{
        label: string
        value: string
        tone?: 'gray' | 'green' | 'blue' | 'amber' | 'red'
    }>
}) => (
    <div className="grid gap-2 text-sm">
        {items.map((item) => (
            <div
                key={item.label}
                className="flex items-center justify-between gap-3 rounded-md border border-gray-100 bg-gray-50 px-3 py-2"
            >
                <span className="min-w-0 truncate text-gray-600">
                    {item.label}
                </span>
                <Pill tone={item.tone}>{item.value}</Pill>
            </div>
        ))}
    </div>
)

const InlineCode = ({ children }: { children: ReactNode }) => (
    <code className="rounded bg-gray-100 px-1.5 py-0.5 text-xs font-medium text-gray-700">
        {children}
    </code>
)

const SettingRow = ({
    title,
    description,
    control,
}: {
    title: string
    description: string
    control: ReactNode
}) => (
    <div className="flex items-start justify-between gap-4 rounded-md border border-gray-100 bg-white px-3 py-3">
        <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-0.5 text-xs leading-5 text-gray-500">
                {description}
            </p>
        </div>
        <div className="shrink-0">{control}</div>
    </div>
)

const TimelineItem = ({
    title,
    meta,
    tone = 'blue',
}: {
    title: string
    meta: string
    tone?: 'blue' | 'green' | 'amber' | 'red'
}) => {
    const tones = {
        blue: 'bg-blue-500',
        green: 'bg-green-500',
        amber: 'bg-amber-500',
        red: 'bg-red-500',
    }

    return (
        <div className="grid grid-cols-[12px_1fr] gap-3">
            <span
                className={`mt-1.5 h-3 w-3 rounded-full ${tones[tone]}`}
                aria-hidden="true"
            />
            <div>
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{meta}</p>
            </div>
        </div>
    )
}

const FileRow = ({
    name,
    meta,
    tone = 'gray',
}: {
    name: string
    meta: string
    tone?: 'gray' | 'green' | 'blue' | 'amber' | 'red'
}) => (
    <div className="flex items-center gap-3 rounded-md border border-gray-100 bg-white px-3 py-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-500">
            <Paperclip size={16} />
        </div>
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs text-gray-500">{meta}</p>
        </div>
        <Pill tone={tone}>Ready</Pill>
    </div>
)

const MetricTile = ({
    label,
    value,
    trend,
    tone = 'blue',
}: {
    label: string
    value: string
    trend?: string
    tone?: 'blue' | 'green' | 'amber' | 'red'
}) => {
    const tones = {
        blue: 'bg-blue-50 text-blue-700 border-blue-100',
        green: 'bg-green-50 text-green-700 border-green-100',
        amber: 'bg-amber-50 text-amber-700 border-amber-100',
        red: 'bg-red-50 text-red-700 border-red-100',
    }

    return (
        <div className={`rounded-md border p-3 ${tones[tone]}`}>
            <p className="text-xs font-medium opacity-80">{label}</p>
            <p className="mt-1 text-xl font-bold">{value}</p>
            {trend && <p className="mt-1 text-xs opacity-80">{trend}</p>}
        </div>
    )
}

const StepRow = ({
    step,
    title,
    status,
    active,
}: {
    step: string
    title: string
    status: string
    active?: boolean
}) => (
    <div
        className={`flex items-center gap-3 rounded-md border px-3 py-2 ${
            active ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-white'
        }`}
    >
        <span
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
            }`}
        >
            {step}
        </span>
        <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
                {title}
            </p>
            <p className="text-xs text-gray-500">{status}</p>
        </div>
    </div>
)

const CardV2Demo = () => {
    const [riskEnabled, setRiskEnabled] = useState(true)
    const [alertsEnabled, setAlertsEnabled] = useState(false)
    const [sendReceipt, setSendReceipt] = useState<boolean | 'indeterminate'>(
        true
    )
    const [saveCard, setSaveCard] = useState<boolean | 'indeterminate'>(false)
    const [activeMetric, setActiveMetric] = useState<
        'today' | 'week' | 'month'
    >('today')

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-10">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                        CardV2
                    </p>
                    <h2 className="mt-1 text-3xl font-bold text-gray-950">
                        Prop API and compound composition
                    </h2>
                    <p className="mt-2 max-w-3xl text-sm text-gray-600">
                        This page intentionally covers normal usage and awkward
                        edge cases: dense content, long copy, media layouts,
                        footer actions, skeletons, selected/interactive states,
                        and compound sections.
                    </p>
                </div>

                <DemoSection
                    title="Simple prop API"
                    description="Fast path for product cards, settings cards, and dashboards."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                        <CardV2
                            eyebrow="Payments"
                            title="Approval recovery"
                            subtitle="Smart retry strategy"
                            description="Recover failed attempts with smarter routing."
                            leadingSlot={<Zap style={iconStyle} />}
                            trailingSlot={<Pill tone="green">Live</Pill>}
                            actions={primaryAction}
                        />
                        <CardV2
                            variant={CardV2Variant.ELEVATED}
                            eyebrow="Risk"
                            title="Velocity rules"
                            subtitle="Updated 12 min ago"
                            description="Elevated card with two actions and health status."
                            trailingSlot={<Pill tone="amber">Review</Pill>}
                            actions={[primaryAction, secondaryAction]}
                        />
                        <CardV2
                            variant={CardV2Variant.GHOST}
                            title="Ghost card"
                            subtitle="Low emphasis"
                            description="Useful inside already-framed surfaces."
                            actions={secondaryAction}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Media and orientation"
                    description="Vertical media, horizontal media, and centered presentation."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
                        <CardV2
                            media={
                                <MediaBlock
                                    tone="blue"
                                    icon={<CreditCard size={30} />}
                                    label="Cards"
                                />
                            }
                            title="Tokenized card program"
                            subtitle="Vertical media"
                            description="Media sits above content at a compact height."
                            actions={primaryAction}
                        />
                        <CardV2
                            orientation={CardV2Orientation.HORIZONTAL}
                            media={
                                <MediaBlock
                                    tone="green"
                                    icon={<ShieldCheck size={28} />}
                                    label="Risk"
                                />
                            }
                            title="3DS routing policy"
                            subtitle="Horizontal media"
                            description="A fixed leading visual for scan-friendly rows."
                            actions={secondaryAction}
                        />
                        <CardV2
                            centered
                            variant={CardV2Variant.ELEVATED}
                            media={
                                <MediaBlock
                                    tone="purple"
                                    icon={<Sparkles size={30} />}
                                    label="AI"
                                />
                            }
                            title="Centered insight"
                            subtitle="Balanced layout"
                            description="Centered header, body, and actions."
                            actions={primaryAction}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Image cards"
                    description="Real image media with product, editorial, and horizontal layouts."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                        <CardV2
                            variant={CardV2Variant.ELEVATED}
                            media={
                                <ImageMedia
                                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&auto=format&fit=crop&q=80"
                                    alt="Person using a payment terminal"
                                />
                            }
                            mediaHeight="150px"
                            title="In-store acceptance"
                            subtitle="Terminal rollout"
                            description="A photo-led card for product stories, feature launches, and announcements."
                            trailingSlot={<Pill tone="blue">New</Pill>}
                            actions={[secondaryAction, primaryAction]}
                        />
                        <CardV2
                            media={
                                <ImageMedia
                                    src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&auto=format&fit=crop&q=80"
                                    alt="Credit card payment closeup"
                                />
                            }
                            mediaHeight="132px"
                            title="Card network update"
                            subtitle="Operational notice"
                            description="Short, image-backed update card with natural content height."
                            actionPlacement={CardV2ActionPlacement.FOOTER}
                            footer={
                                <span className="text-xs text-gray-500">
                                    2 min read
                                </span>
                            }
                            actions={primaryAction}
                        />
                        <CardV2
                            orientation={CardV2Orientation.HORIZONTAL}
                            media={
                                <ImageMedia
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80"
                                    alt="Dashboard on a laptop"
                                />
                            }
                            mediaWidth="112px"
                            mediaHeight="88px"
                            title="Dashboard snapshot"
                            subtitle="Horizontal image"
                            description="A compact horizontal card with an image thumbnail."
                            actions={secondaryAction}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Compound API"
                    description="Composable sections for cases where props are too limiting."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
                        <CardV2 variant={CardV2Variant.ELEVATED}>
                            <CardV2.Media>
                                <MediaBlock
                                    tone="amber"
                                    icon={<Activity size={30} />}
                                    label="Realtime"
                                />
                            </CardV2.Media>
                            <CardV2.Header
                                eyebrow="Observability"
                                title="Gateway health"
                                subtitle="Compound header + body + footer"
                                leadingSlot={<CheckCircle2 style={iconStyle} />}
                                trailingSlot={<Pill tone="green">Stable</Pill>}
                            />
                            <CardV2.Body description="A custom body can render any layout while still inheriting CardV2 spacing and typography tokens.">
                                <MiniTable />
                            </CardV2.Body>
                            <CardV2.Footer
                                divider
                                actions={[secondaryAction, primaryAction]}
                            >
                                <span className="text-xs text-gray-500">
                                    Last checked 32 seconds ago
                                </span>
                            </CardV2.Footer>
                        </CardV2>

                        <CardV2 maxWidth="520px">
                            <CardV2.Header
                                eyebrow="Onboarding"
                                title="Start with slots"
                                subtitle="Header can be used without media"
                            />
                            <CardV2.Body
                                description="The body supports custom children plus actions, which makes dense operational cards easier to compose."
                                actions={[primaryAction, iconOnlyAction]}
                            >
                                <div className="flex flex-wrap gap-2">
                                    <Pill tone="blue">KYC</Pill>
                                    <Pill tone="green">Ready</Pill>
                                    <Pill>Low friction</Pill>
                                </div>
                            </CardV2.Body>
                        </CardV2>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Real app patterns"
                    description="Common card shapes: settings, announcement, team member, and metric summary."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4">
                        <CardV2
                            title="Webhook retries"
                            subtitle="Developer setting"
                            description="Retry failed webhooks for 24 hours with exponential backoff."
                            leadingSlot={<Activity style={iconStyle} />}
                            trailingSlot={<Pill tone="green">Enabled</Pill>}
                            actions={secondaryAction}
                        />
                        <CardV2
                            variant={CardV2Variant.ELEVATED}
                            title="Q3 roadmap"
                            subtitle="Product update"
                            description="New fraud controls, settlement filters, and dashboard exports."
                            actionPlacement={CardV2ActionPlacement.FOOTER}
                            footer={<Pill tone="amber">Draft</Pill>}
                            actions={primaryAction}
                        />
                        <CardV2 centered>
                            <CardV2.Media width="88px" height="88px">
                                <ImageMedia
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80"
                                    alt="Profile portrait"
                                />
                            </CardV2.Media>
                            <CardV2.Header
                                title="Ananya Rao"
                                subtitle="Risk operations"
                            />
                            <CardV2.Body
                                centered
                                description="Owner for escalation policies."
                                actions={iconOnlyAction}
                            />
                        </CardV2>
                        <CardV2
                            padding={CardV2Padding.COMPACT}
                            title="Authorization"
                            subtitle="Today"
                            description="98.42%"
                            trailingSlot={<Pill tone="green">+2.1%</Pill>}
                            footer={
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full w-[82%] rounded-full bg-blue-500" />
                                </div>
                            }
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Footer actions and padding"
                    description="Actions can live in the body or footer; padding can be compact or removed."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                        <CardV2
                            title="Footer action placement"
                            subtitle="Separated by footer divider"
                            description="Good when content and final commands need stronger separation."
                            actionPlacement={CardV2ActionPlacement.FOOTER}
                            footer={
                                <span className="text-xs text-gray-500">
                                    4 rules affected
                                </span>
                            }
                            actions={[secondaryAction, primaryAction]}
                        />
                        <CardV2
                            padding={CardV2Padding.COMPACT}
                            title="Compact padding"
                            subtitle="Dense surfaces"
                            description="Useful in tables, drawers, side panels, and repeated grids."
                            trailingSlot={<Pill>Compact</Pill>}
                            actions={secondaryAction}
                        />
                        <CardV2 padding={CardV2Padding.NONE}>
                            <CardV2.Media>
                                <MediaBlock
                                    tone="blue"
                                    icon={<PackageCheck size={30} />}
                                    label="No padding"
                                />
                            </CardV2.Media>
                            <div className="p-4">
                                <CardV2.Meta
                                    title="Manual inner spacing"
                                    subtitle="Padding none"
                                />
                                <div className="mt-3">
                                    <CardV2.Actions actions={primaryAction} />
                                </div>
                            </div>
                        </CardV2>
                    </div>
                </DemoSection>

                <DemoSection
                    title="States and edge cases"
                    description="Interactive, selected, truncation, constrained height, skeleton, and minimal content."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
                        <CardV2
                            interactive
                            onClick={() => console.log('Interactive CardV2')}
                            title="Interactive card"
                            subtitle="Keyboard focusable"
                            description="Hover and focus states are tokenized. Click handlers pass through to the root."
                            trailingSlot={<ExternalLink style={iconStyle} />}
                        />
                        <CardV2
                            selected
                            interactive
                            title="Selected card"
                            subtitle="Selection state"
                            description="Selected state uses tokenized border and focus ring color."
                            trailingSlot={<Pill tone="blue">Selected</Pill>}
                        />
                        <CardV2
                            title="This card has a very long title that should wrap cleanly without pushing actions or trailing content out of the surface"
                            subtitle="Long subtitle text also wraps and should stay readable across narrow widths"
                            description="Descriptions can be verbose. This intentionally long paragraph checks wrapping, line height, and vertical rhythm when the content is longer than a typical product card description."
                            trailingSlot={<Pill tone="red">Long</Pill>}
                            actions={[secondaryAction, primaryAction]}
                        />
                        <CardV2
                            truncateTitle
                            title="This title is intentionally too long and should truncate with an ellipsis instead of wrapping into multiple lines"
                            subtitle="truncateTitle prop"
                            description="Use this for dense cards where title height must stay predictable."
                            trailingSlot={<Pill tone="blue">Truncated</Pill>}
                            actions={secondaryAction}
                        />
                        <CardV2 maxWidth="320px">
                            <CardV2.Header
                                truncateTitle
                                title="Compound header title truncates cleanly inside a narrow card"
                                subtitle="CardV2.Header"
                                trailingSlot={<Pill>Meta</Pill>}
                            />
                            <CardV2.Body description="The same behavior works through the compound API." />
                        </CardV2>
                        <CardV2
                            maxHeight="220px"
                            title="Constrained height"
                            subtitle="Scrollable body"
                            description="The body becomes scrollable when maxHeight is set. Below this paragraph is extra content to ensure overflow behavior is visible and usable."
                        >
                            <div className="space-y-2 text-sm text-gray-600">
                                {Array.from({ length: 8 }, (_, index) => (
                                    <p key={index}>
                                        Audit row {index + 1}: gateway retry,
                                        routing decision, and issuer response
                                        metadata.
                                    </p>
                                ))}
                            </div>
                        </CardV2>
                        <CardV2
                            title="Loading state"
                            subtitle="Skeleton"
                            skeleton={{ show: true, height: '130px' }}
                        />
                        <CardV2
                            title="Minimal card"
                            trailingSlot={<Pill>Title only</Pill>}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Centered alignment stress"
                    description="Centered cards with leading slots, trailing slots, footer content, media, and compound sections."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-4">
                        <CardV2
                            centered
                            title="Centered with status"
                            subtitle="Prop API"
                            description="The status pill should sit on the same center axis as the title, description, and action."
                            media={
                                <MediaBlock
                                    tone="purple"
                                    icon={<Sparkles size={30} />}
                                    label="Focus"
                                />
                            }
                            mediaWidth="96px"
                            mediaHeight="96px"
                            trailingSlot={<Pill tone="green">Online</Pill>}
                            actions={iconOnlyAction}
                        />
                        <CardV2 centered variant={CardV2Variant.ELEVATED}>
                            <CardV2.Media width="84px" height="84px">
                                <MediaBlock
                                    tone="green"
                                    icon={<Users size={28} />}
                                    label="Team"
                                />
                            </CardV2.Media>
                            <CardV2.Header
                                title="Compound centered"
                                subtitle="Header + body + footer"
                                trailingSlot={<Pill tone="blue">4 active</Pill>}
                            />
                            <CardV2.Body
                                centered
                                description="Every section should share one vertical center line."
                                actions={primaryAction}
                            />
                            <CardV2.Footer centered>
                                <Pill tone="green">Synced</Pill>
                            </CardV2.Footer>
                        </CardV2>
                        <CardV2
                            centered
                            leadingSlot={<LockKeyhole style={iconStyle} />}
                            title="Leading + trailing"
                            subtitle="Both slots"
                            description="Icon, title stack, chip, text, and buttons should not drift left or right."
                            trailingSlot={<Pill tone="amber">Restricted</Pill>}
                            actions={[secondaryAction, iconOnlyAction]}
                        />
                        <CardV2
                            centered
                            padding={CardV2Padding.COMPACT}
                            title="Compact centered"
                            subtitle="Short card"
                            description="Compact spacing should still look balanced."
                            trailingSlot={<Pill>Compact</Pill>}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Width, truncation, and wrapping"
                    description="Narrow cards, tiny cards, long words, and horizontal layouts that usually expose overflow bugs."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[260px_320px_1fr]">
                        <CardV2
                            maxWidth="260px"
                            truncateTitle
                            title="A very narrow title that must truncate instead of wrapping into a tower"
                            subtitle="260px max"
                            description="Small cards should keep a clean rhythm."
                            trailingSlot={<Pill tone="blue">Tiny</Pill>}
                            actions={secondaryAction}
                        />
                        <CardV2
                            maxWidth="320px"
                            title="Supercalifragilisticexpialidocious merchant configuration"
                            subtitle="Long unbroken word"
                            description="This intentionally awkward string checks whether long words stay inside the card surface."
                            trailingSlot={<Pill tone="red">Stress</Pill>}
                        />
                        <CardV2
                            orientation={CardV2Orientation.HORIZONTAL}
                            media={
                                <MediaBlock
                                    tone="amber"
                                    icon={<AlertTriangle size={28} />}
                                    label="Warn"
                                />
                            }
                            mediaWidth="84px"
                            mediaHeight="120px"
                            truncateTitle
                            title="Horizontal card with a very long operational incident title that should truncate cleanly"
                            subtitle="Media + long copy"
                            description="The media column should remain fixed while text and actions stay inside the available content width."
                            trailingSlot={<Pill tone="amber">P1</Pill>}
                            actions={[secondaryAction, primaryAction]}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Content density"
                    description="Tables, lists, nested custom content, and constrained scroll regions."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                        <CardV2
                            title="Gateway matrix"
                            subtitle="Custom children"
                            description="Dense child content should align with CardV2 text and actions."
                            actionPlacement={CardV2ActionPlacement.FOOTER}
                            footer={<Pill tone="green">Healthy</Pill>}
                            actions={secondaryAction}
                        >
                            <MiniTable />
                        </CardV2>
                        <CardV2
                            maxHeight="260px"
                            title="Scrollable audit trail"
                            subtitle="maxHeight set"
                            description="Body content should scroll without stretching the entire card."
                            actions={primaryAction}
                        >
                            <div className="space-y-2 text-sm text-gray-600">
                                {Array.from({ length: 12 }, (_, index) => (
                                    <div
                                        key={index}
                                        className="rounded-md border border-gray-100 bg-white px-3 py-2"
                                    >
                                        <span className="font-medium text-gray-800">
                                            Event {index + 1}
                                        </span>{' '}
                                        routing decision changed after issuer
                                        response metadata was received.
                                    </div>
                                ))}
                            </div>
                        </CardV2>
                        <CardV2
                            title="Nested content"
                            subtitle="Custom grid inside body"
                            description="Cards should not need nested cards for dense product summaries."
                        >
                            <DebugList
                                items={[
                                    {
                                        label: 'Authorization latency',
                                        value: '143ms',
                                        tone: 'green',
                                    },
                                    {
                                        label: 'Fallback route usage',
                                        value: '2.8%',
                                        tone: 'blue',
                                    },
                                    {
                                        label: 'Manual review queue',
                                        value: '18',
                                        tone: 'amber',
                                    },
                                ]}
                            />
                        </CardV2>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Media edge cases"
                    description="Missing images, icon-only visuals, panoramic media, square media, and no-media fallbacks."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-4">
                        <CardV2
                            media={
                                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                                    <ImageOff size={34} />
                                </div>
                            }
                            mediaHeight="110px"
                            title="Image fallback"
                            subtitle="Decorative placeholder"
                            description="Useful when product images are unavailable."
                            actions={secondaryAction}
                        />
                        <CardV2
                            media={
                                <MediaBlock
                                    tone="blue"
                                    icon={<Database size={30} />}
                                    label="Data"
                                />
                            }
                            mediaHeight="64px"
                            title="Short media"
                            subtitle="64px height"
                            description="Checks compact media height against body spacing."
                        />
                        <CardV2
                            media={
                                <ImageMedia
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80"
                                    alt="Analytics dashboard"
                                />
                            }
                            mediaHeight="220px"
                            title="Tall media"
                            subtitle="Large visual"
                            description="Tall images should look intentional, not like broken spacing."
                        />
                        <CardV2
                            orientation={CardV2Orientation.HORIZONTAL}
                            media={
                                <MediaBlock
                                    tone="green"
                                    icon={<WalletCards size={26} />}
                                    label="Pay"
                                />
                            }
                            mediaWidth="56px"
                            mediaHeight="56px"
                            title="Small horizontal media"
                            subtitle="Avatar-like"
                            description="Tiny media should align with text, not stretch the row."
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Semantic and interaction edge cases"
                    description="Cards inside list/grid semantics, disabled-looking actions, icon buttons, and root click behavior."
                >
                    <div
                        role="list"
                        className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3"
                    >
                        <CardV2
                            role="listitem"
                            title="List item role"
                            subtitle="Custom root semantics"
                            description="Consumers can override role when cards are rendered inside lists."
                            leadingSlot={<FileText style={iconStyle} />}
                            trailingSlot={<Pill>role</Pill>}
                        />
                        <CardV2
                            interactive
                            selected
                            title="Pressed semantics"
                            subtitle="Interactive selected"
                            description="Selected interactive cards expose pressed state and remain keyboard focusable."
                            leadingSlot={<CheckCircle2 style={iconStyle} />}
                            actions={iconOnlyAction}
                        />
                        <CardV2
                            title="Mixed actions"
                            subtitle="Primary + icon only + disabled"
                            description="Action wrapping should remain tidy with different button shapes."
                            actions={[
                                primaryAction,
                                iconOnlyAction,
                                {
                                    text: 'Disabled',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.SECONDARY,
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Cards with Blend controls"
                    description="Switches, checkboxes, badges, and progress bars inside CardV2 content, footer, and slots."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
                        <CardV2
                            title="Risk automation"
                            subtitle="Settings card"
                            description="Controls should keep their own alignment without stretching the card header."
                            leadingSlot={<ShieldCheck style={iconStyle} />}
                            trailingSlot={
                                <Badge
                                    text={riskEnabled ? 'On' : 'Off'}
                                    color={
                                        riskEnabled
                                            ? BadgeColor.SUCCESS
                                            : BadgeColor.NEUTRAL
                                    }
                                    size={BadgeSize.SM}
                                />
                            }
                        >
                            <div className="space-y-2">
                                <SettingRow
                                    title="Run velocity checks"
                                    description="Block suspicious bursts before authorization."
                                    control={
                                        <SwitchV2
                                            checked={riskEnabled}
                                            onCheckedChange={setRiskEnabled}
                                            size={SelectorV2Size.SM}
                                        />
                                    }
                                />
                                <SettingRow
                                    title="Notify policy owners"
                                    description="Send Slack and email updates for high-risk changes."
                                    control={
                                        <SwitchV2
                                            checked={alertsEnabled}
                                            onCheckedChange={setAlertsEnabled}
                                            size={SelectorV2Size.SM}
                                        />
                                    }
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            title="Checkout preferences"
                            subtitle="Form controls"
                            description="Checkbox labels can wrap while the card keeps consistent spacing."
                            actions={primaryAction}
                        >
                            <div className="grid gap-3 rounded-md border border-gray-100 bg-white p-3">
                                <CheckboxV2
                                    id="cardv2-send-receipt"
                                    label="Send receipt after successful payment"
                                    subLabel="Useful for B2B merchants and repeat customers."
                                    checked={sendReceipt}
                                    onCheckedChange={setSendReceipt}
                                    size={SelectorV2Size.SM}
                                />
                                <CheckboxV2
                                    id="cardv2-save-card"
                                    label="Save card for future payments"
                                    subLabel="Tests a second selector inside the same card body."
                                    checked={saveCard}
                                    onCheckedChange={setSaveCard}
                                    size={SelectorV2Size.SM}
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            title="Migration progress"
                            subtitle="ProgressBar component"
                            description="Progress indicators can sit in body and footer without extra divider noise."
                            footer={
                                <div className="w-full">
                                    <ProgressBar
                                        value={68}
                                        size={ProgressBarSize.SMALL}
                                        variant={ProgressBarVariant.SOLID}
                                    />
                                </div>
                            }
                            trailingSlot={
                                <Badge
                                    count={7}
                                    color={BadgeColor.PRIMARY}
                                    size={BadgeSize.SM}
                                />
                            }
                        >
                            <div className="space-y-3">
                                <ProgressBar
                                    value={68}
                                    size={ProgressBarSize.MEDIUM}
                                    variant={ProgressBarVariant.SEGMENTED}
                                    showLabel
                                />
                                <DebugList
                                    items={[
                                        {
                                            label: 'Merchants migrated',
                                            value: '1,842',
                                            tone: 'green',
                                        },
                                        {
                                            label: 'Pending configs',
                                            value: '126',
                                            tone: 'amber',
                                        },
                                    ]}
                                />
                            </div>
                        </CardV2>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Product usage patterns"
                    description="Notification cards, pricing cards, invoice summaries, timeline cards, file cards, and split content."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
                        <CardV2
                            title="Inbox digest"
                            subtitle="Notifications"
                            description="Badges and icon buttons in the same header should not fight for space."
                            leadingSlot={
                                <Badge
                                    count={12}
                                    color={BadgeColor.ALERT}
                                    size={BadgeSize.SM}
                                >
                                    <Bell size={20} />
                                </Badge>
                            }
                            trailingSlot={<Pill tone="red">12 unread</Pill>}
                            actions={iconOnlyAction}
                        >
                            <div className="grid gap-2 text-sm">
                                {[
                                    'Issuer timeout on route A',
                                    'KYC document uploaded',
                                    'Settlement batch closed',
                                ].map((message) => (
                                    <div
                                        key={message}
                                        className="flex items-center gap-2 rounded-md bg-gray-50 px-3 py-2 text-gray-700"
                                    >
                                        <Mail size={14} />
                                        <span className="min-w-0 truncate">
                                            {message}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardV2>

                        <CardV2
                            centered
                            variant={CardV2Variant.ELEVATED}
                            title="Scale plan"
                            subtitle="For growing teams"
                            description={
                                <span>
                                    <span className="text-3xl font-bold text-gray-950">
                                        $249
                                    </span>{' '}
                                    <span className="text-sm text-gray-500">
                                        / month
                                    </span>
                                </span>
                            }
                            trailingSlot={<Pill tone="blue">Popular</Pill>}
                            actions={[
                                {
                                    ...primaryAction,
                                    text: 'Choose plan',
                                },
                                secondaryAction,
                            ]}
                        >
                            <DebugList
                                items={[
                                    {
                                        label: 'Unlimited routing policies',
                                        value: 'Included',
                                        tone: 'green',
                                    },
                                    {
                                        label: 'Advanced risk controls',
                                        value: 'Included',
                                        tone: 'green',
                                    },
                                    {
                                        label: 'Dedicated support',
                                        value: 'SLA',
                                        tone: 'blue',
                                    },
                                ]}
                            />
                        </CardV2>

                        <CardV2
                            title="Invoice summary"
                            subtitle="Billing"
                            description="A card can hold financial rows and a footer action row."
                            leadingSlot={<ReceiptText style={iconStyle} />}
                            actionPlacement={CardV2ActionPlacement.FOOTER}
                            footer={
                                <span className="text-xs text-gray-500">
                                    Due Jul 31
                                </span>
                            }
                            actions={primaryAction}
                        >
                            <div className="space-y-2 text-sm">
                                {[
                                    ['Subtotal', '$12,400'],
                                    ['Tax', '$1,488'],
                                    ['Credits', '-$900'],
                                    ['Total', '$12,988'],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex justify-between gap-4"
                                    >
                                        <span className="text-gray-500">
                                            {label}
                                        </span>
                                        <span className="font-semibold text-gray-950">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardV2>

                        <CardV2
                            title="Deployment timeline"
                            subtitle="Activity"
                            description="Timeline content checks vertical spacing and left aligned dense content."
                            maxHeight="340px"
                        >
                            <div className="space-y-4">
                                <TimelineItem
                                    title="Policy approved"
                                    meta="Today, 10:24 AM"
                                    tone="green"
                                />
                                <TimelineItem
                                    title="Rules synced to gateway"
                                    meta="Today, 10:29 AM"
                                />
                                <TimelineItem
                                    title="Canary failed on APAC route"
                                    meta="Today, 10:42 AM"
                                    tone="amber"
                                />
                                <TimelineItem
                                    title="Rollback scheduled"
                                    meta="Today, 10:45 AM"
                                    tone="red"
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            title="Uploaded documents"
                            subtitle="File rows"
                            description="Rows with icons, truncated names, and status pills inside the body."
                            leadingSlot={<UploadCloud style={iconStyle} />}
                            actions={secondaryAction}
                        >
                            <div className="space-y-2">
                                <FileRow
                                    name="merchant-risk-review-final-v8.pdf"
                                    meta="PDF, 4.8 MB"
                                    tone="green"
                                />
                                <FileRow
                                    name="settlement-reconciliation-export.csv"
                                    meta="CSV, 812 KB"
                                    tone="blue"
                                />
                                <FileRow
                                    name="ownership-proof.png"
                                    meta="PNG, 1.2 MB"
                                    tone="amber"
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            orientation={CardV2Orientation.HORIZONTAL}
                            media={
                                <MediaBlock
                                    tone="blue"
                                    icon={<CreditCard size={28} />}
                                    label="POS"
                                />
                            }
                            mediaWidth="96px"
                            mediaHeight="180px"
                            title="Side-by-side detail"
                            subtitle="Horizontal + dense body"
                            description="Horizontal cards should handle dense content and action wrapping without media stretching."
                            actions={[primaryAction, secondaryAction]}
                        >
                            <DebugList
                                items={[
                                    {
                                        label: 'Terminals online',
                                        value: '184',
                                        tone: 'green',
                                    },
                                    {
                                        label: 'Stores degraded',
                                        value: '3',
                                        tone: 'amber',
                                    },
                                ]}
                            />
                        </CardV2>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Action overflow and awkward commands"
                    description="Many actions, long action labels, destructive actions, and footer action wrapping."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3">
                        <CardV2
                            title="Many body actions"
                            subtitle="Wrapping behavior"
                            description="Buttons should wrap without changing the card's text rhythm."
                            actions={[
                                primaryAction,
                                secondaryAction,
                                {
                                    text: 'Export',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.SECONDARY,
                                },
                                iconOnlyAction,
                            ]}
                        />
                        <CardV2
                            title="Long action labels"
                            subtitle="Button stress"
                            description="A very long action label should not overflow the card surface."
                            actions={[
                                {
                                    text: 'Approve routing configuration',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.PRIMARY,
                                },
                                {
                                    text: 'Request additional review',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.SECONDARY,
                                },
                            ]}
                        />
                        <CardV2
                            title="Danger zone"
                            subtitle="Destructive action"
                            description="Danger actions should align with secondary controls and not dominate the surface."
                            actionPlacement={CardV2ActionPlacement.FOOTER}
                            footer={<Pill tone="red">Irreversible</Pill>}
                            actions={[
                                {
                                    text: 'Disable',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.DANGER,
                                },
                                secondaryAction,
                            ]}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Analytics and KPI cards"
                    description="Dashboard cards with mini metrics, charts, badges, selectable ranges, and progress surfaces."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-4">
                        <CardV2
                            title="Revenue snapshot"
                            subtitle="Dashboard KPI"
                            description="A metric card with nested tiles and a quiet footer."
                            leadingSlot={<PieChart style={iconStyle} />}
                            trailingSlot={<Pill tone="green">+12.4%</Pill>}
                            footer={
                                <span className="text-xs text-gray-500">
                                    Updated 42 seconds ago
                                </span>
                            }
                        >
                            <div className="grid grid-cols-2 gap-2">
                                <MetricTile
                                    label="Gross"
                                    value="$84.2k"
                                    trend="+8.1%"
                                    tone="green"
                                />
                                <MetricTile
                                    label="Failed"
                                    value="$1.8k"
                                    trend="-2.4%"
                                    tone="red"
                                />
                                <MetricTile
                                    label="Refunded"
                                    value="$920"
                                    tone="amber"
                                />
                                <MetricTile
                                    label="Net"
                                    value="$81.4k"
                                    tone="blue"
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            title="Selectable range"
                            subtitle="Local tab-like controls"
                            description="Small controls inside body should not break card spacing."
                            actions={secondaryAction}
                        >
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 rounded-md border border-gray-200 bg-gray-50 p-1 text-xs font-medium">
                                    {(['today', 'week', 'month'] as const).map(
                                        (range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                onClick={() =>
                                                    setActiveMetric(range)
                                                }
                                                className={`rounded px-2 py-1.5 capitalize ${
                                                    activeMetric === range
                                                        ? 'bg-white text-blue-700 shadow-sm'
                                                        : 'text-gray-500'
                                                }`}
                                            >
                                                {range}
                                            </button>
                                        )
                                    )}
                                </div>
                                <MetricTile
                                    label="Authorization rate"
                                    value={
                                        activeMetric === 'today'
                                            ? '98.42%'
                                            : activeMetric === 'week'
                                              ? '97.86%'
                                              : '96.94%'
                                    }
                                    trend="Segmented by selected range"
                                    tone="blue"
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            centered
                            title="Circular progress"
                            subtitle="Centered KPI"
                            description="Circular progress should stay balanced with centered copy."
                            trailingSlot={<Pill tone="blue">68%</Pill>}
                            actions={primaryAction}
                        >
                            <div className="flex justify-center">
                                <ProgressBar
                                    value={68}
                                    variant={ProgressBarVariant.CIRCULAR}
                                    size={ProgressBarSize.LARGE}
                                    showLabel
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            orientation={CardV2Orientation.HORIZONTAL}
                            media={
                                <MediaBlock
                                    tone="green"
                                    icon={<Database size={26} />}
                                    label="DB"
                                />
                            }
                            mediaWidth="72px"
                            mediaHeight="160px"
                            title="Service health"
                            subtitle="Horizontal KPI"
                            description="A compact horizontal health card with metrics in the body."
                        >
                            <DebugList
                                items={[
                                    {
                                        label: 'Read latency',
                                        value: '21ms',
                                        tone: 'green',
                                    },
                                    {
                                        label: 'Write latency',
                                        value: '34ms',
                                        tone: 'green',
                                    },
                                    {
                                        label: 'Error budget',
                                        value: '82%',
                                        tone: 'blue',
                                    },
                                ]}
                            />
                        </CardV2>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Workflow and review cards"
                    description="Approvals, steppers, branchy actions, and cards that are expected to be read in order."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-3">
                        <CardV2
                            title="Approval request"
                            subtitle="Routing policy change"
                            description="Review cards need strong hierarchy and predictable action placement."
                            leadingSlot={<LockKeyhole style={iconStyle} />}
                            trailingSlot={
                                <Pill tone="amber">Needs approval</Pill>
                            }
                            actionPlacement={CardV2ActionPlacement.FOOTER}
                            footer={
                                <span className="text-xs text-gray-500">
                                    Requested by Aditi
                                </span>
                            }
                            actions={[
                                {
                                    text: 'Approve',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.SUCCESS,
                                },
                                {
                                    text: 'Reject',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.DANGER,
                                },
                            ]}
                        >
                            <DebugList
                                items={[
                                    {
                                        label: 'Before',
                                        value: 'Route A',
                                        tone: 'gray',
                                    },
                                    {
                                        label: 'After',
                                        value: 'Route B',
                                        tone: 'blue',
                                    },
                                    {
                                        label: 'Impact',
                                        value: '24 merchants',
                                        tone: 'amber',
                                    },
                                ]}
                            />
                        </CardV2>

                        <CardV2
                            title="Onboarding checklist"
                            subtitle="Stepper-like content"
                            description="Multiple rows with active state should fit naturally inside the body."
                        >
                            <div className="space-y-2">
                                <StepRow
                                    step="1"
                                    title="Business details"
                                    status="Completed"
                                />
                                <StepRow
                                    step="2"
                                    title="Bank account verification"
                                    status="In progress"
                                    active
                                />
                                <StepRow
                                    step="3"
                                    title="Risk review"
                                    status="Waiting"
                                />
                            </div>
                        </CardV2>

                        <CardV2
                            title="Exception queue"
                            subtitle="Batch operations"
                            description="Card with bulk actions, count badge, and dense queue rows."
                            trailingSlot={
                                <Badge
                                    count={18}
                                    color={BadgeColor.WARNING}
                                    size={BadgeSize.SM}
                                />
                            }
                            actions={[
                                {
                                    text: 'Assign',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.PRIMARY,
                                },
                                {
                                    text: 'Snooze',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.SECONDARY,
                                },
                            ]}
                        >
                            <DebugList
                                items={[
                                    {
                                        label: 'High priority',
                                        value: '5',
                                        tone: 'red',
                                    },
                                    {
                                        label: 'Medium priority',
                                        value: '9',
                                        tone: 'amber',
                                    },
                                    {
                                        label: 'Low priority',
                                        value: '4',
                                        tone: 'blue',
                                    },
                                ]}
                            />
                        </CardV2>
                    </div>
                </DemoSection>

                <DemoSection
                    title="Mobile and location-style cards"
                    description="Narrow app cards, maps/location summaries, compact media rows, and cards designed for small screens."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-[300px_300px_1fr]">
                        <CardV2
                            maxWidth="300px"
                            title="Mobile summary"
                            subtitle="One-column app card"
                            description="Tests copy, actions, and status inside a narrow mobile-like card."
                            leadingSlot={<Smartphone style={iconStyle} />}
                            trailingSlot={<Pill tone="green">Live</Pill>}
                            actions={primaryAction}
                        />
                        <CardV2
                            maxWidth="300px"
                            media={
                                <ImageMedia
                                    src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=700&auto=format&fit=crop&q=80"
                                    alt="Abstract city map"
                                />
                            }
                            mediaHeight="120px"
                            title="Store cluster"
                            subtitle="Mumbai region"
                            description="Image plus location metadata in a constrained card."
                            leadingSlot={<MapPin style={iconStyle} />}
                        >
                            <DebugList
                                items={[
                                    {
                                        label: 'Stores',
                                        value: '42',
                                        tone: 'blue',
                                    },
                                    {
                                        label: 'Offline',
                                        value: '2',
                                        tone: 'amber',
                                    },
                                ]}
                            />
                        </CardV2>
                        <CardV2
                            orientation={CardV2Orientation.HORIZONTAL}
                            media={
                                <MediaBlock
                                    tone="purple"
                                    icon={<CalendarDays size={26} />}
                                    label="SLA"
                                />
                            }
                            mediaWidth="68px"
                            mediaHeight="104px"
                            title="Upcoming maintenance window with very long title"
                            truncateTitle
                            subtitle="Jul 14, 02:00 AM"
                            description="Horizontal cards should remain readable in mixed-width grids."
                            trailingSlot={<Pill tone="amber">Scheduled</Pill>}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="State-specific content"
                    description="Empty, warning, error, success, and retry cards with different action choices."
                >
                    <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-4">
                        <CardV2
                            centered
                            title="No results"
                            subtitle="Empty state"
                            description="Try changing filters or creating a new rule."
                            media={
                                <MediaBlock
                                    tone="blue"
                                    icon={<FileText size={28} />}
                                    label="Empty"
                                />
                            }
                            mediaWidth="82px"
                            mediaHeight="82px"
                            actions={secondaryAction}
                        />
                        <CardV2
                            title="Partial outage"
                            subtitle="Warning state"
                            description="Issuer callbacks are delayed for a subset of merchants."
                            leadingSlot={<AlertTriangle style={iconStyle} />}
                            trailingSlot={<Pill tone="amber">Warning</Pill>}
                            actions={primaryAction}
                        />
                        <CardV2
                            title="Sync failed"
                            subtitle="Error state"
                            description="The gateway did not accept the latest policy payload."
                            leadingSlot={<AlertTriangle style={iconStyle} />}
                            trailingSlot={<Pill tone="red">Error</Pill>}
                            actions={[
                                {
                                    text: 'Retry sync',
                                    size: ButtonV2Size.SMALL,
                                    buttonType: ButtonV2Type.PRIMARY,
                                },
                                secondaryAction,
                            ]}
                        />
                        <CardV2
                            title="Policy published"
                            subtitle="Success state"
                            description="All routes have received the latest configuration."
                            leadingSlot={<CheckCircle2 style={iconStyle} />}
                            trailingSlot={<Pill tone="green">Success</Pill>}
                            actions={secondaryAction}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Minimal and unusual composition"
                    description="Empty-ish, media-only, body-only, footer-only, and compound pieces outside the common happy path."
                >
                    <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-5">
                        <CardV2 aria-label="Empty card" minHeight="120px" />
                        <CardV2
                            aria-label="Media only card"
                            padding={CardV2Padding.NONE}
                            media={
                                <MediaBlock
                                    tone="purple"
                                    icon={<Layers size={30} />}
                                    label="Only"
                                />
                            }
                            mediaHeight="140px"
                        />
                        <CardV2>
                            <CardV2.Body description="Body only compound card with no header." />
                        </CardV2>
                        <CardV2>
                            <CardV2.Footer actions={secondaryAction}>
                                <Pill tone="blue">Footer only</Pill>
                            </CardV2.Footer>
                        </CardV2>
                        <CardV2
                            title={
                                <span>
                                    Rich <InlineCode>ReactNode</InlineCode>{' '}
                                    title
                                </span>
                            }
                            subtitle={
                                <span>
                                    Subtitle with{' '}
                                    <InlineCode>inline</InlineCode> content
                                </span>
                            }
                            description={
                                <span>
                                    Description can also be a React node with{' '}
                                    <InlineCode>custom markup</InlineCode>.
                                </span>
                            }
                            trailingSlot={<Clock style={iconStyle} />}
                        />
                    </div>
                </DemoSection>

                <DemoSection
                    title="Dense comparison"
                    description="A final scan of all variants side-by-side with identical content."
                >
                    <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-3">
                        {[
                            CardV2Variant.OUTLINED,
                            CardV2Variant.ELEVATED,
                            CardV2Variant.GHOST,
                        ].map((variant) => (
                            <CardV2
                                key={variant}
                                variant={variant}
                                title={`${variant} variant`}
                                subtitle="Same content, different emphasis"
                                description="Compare border, shadow, background, footer divider, and action spacing."
                                footer={
                                    <Pill
                                        tone={
                                            variant === CardV2Variant.GHOST
                                                ? 'gray'
                                                : 'blue'
                                        }
                                    >
                                        {variant}
                                    </Pill>
                                }
                                actions={iconOnlyAction}
                                actionPlacement={CardV2ActionPlacement.FOOTER}
                            />
                        ))}
                    </div>
                </DemoSection>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                    <strong>Import paths:</strong> use the package barrel for
                    app code, or import directly from
                    <code className="mx-1 rounded bg-white px-1 py-0.5">
                        components/CardV2
                    </code>
                    while iterating in this workspace.
                </div>
            </div>
        </div>
    )
}

export default CardV2Demo
