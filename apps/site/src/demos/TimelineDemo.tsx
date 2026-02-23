import { useState } from 'react'
import {
    Timeline,
    TimelineNodeStatus,
} from '../../../../packages/blend/lib/components/Timeline'
import { Switch } from '../../../../packages/blend/lib/components/Switch'
import { SingleSelect } from '../../../../packages/blend/lib/components/SingleSelect'
import { useTheme } from '../../../../packages/blend/lib/context/ThemeContext'
import { Theme } from '../../../../packages/blend/lib/context/theme.enum'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// ---------------------------------------------------------------------------
// Demo data
// ---------------------------------------------------------------------------

type Comment = {
    id: string
    text: string
    user: { name: string; avatar?: string }
    timestamp: string
    status: TimelineNodeStatus
}

const INITIAL_COMMENTS: Comment[] = [
    {
        id: 'c1',
        text: 'Reviewed the transaction details — all fields look correct, amount matches the invoice.',
        user: { name: 'Shweta Yadav' },
        timestamp: '04:30 PM',
        status: TimelineNodeStatus.SUCCESS,
    },
    {
        id: 'c2',
        text: 'Risk flag raised for this merchant — please double-check before approving.',
        user: { name: 'Arjun Mehta' },
        timestamp: '04:45 PM',
        status: TimelineNodeStatus.WARNING,
    },
    {
        id: 'c3',
        text: 'Chargeback initiated by the customer. Escalating to disputes team.',
        user: { name: 'Priya Sharma' },
        timestamp: '05:10 PM',
        status: TimelineNodeStatus.ERROR,
    },
]

const HIDDEN_COMMENTS: Comment[] = [
    {
        id: 'c4',
        text: 'Dispute resolved in favour of the merchant after evidence review.',
        user: { name: 'Shweta Yadav' },
        timestamp: '06:00 PM',
        status: TimelineNodeStatus.SUCCESS,
    },
    {
        id: 'c5',
        text: 'Settlement completed. Funds transferred to merchant account.',
        user: { name: 'Rahul Gupta' },
        timestamp: '06:30 PM',
        status: TimelineNodeStatus.SUCCESS,
    },
    {
        id: 'c6',
        text: 'Monthly reconciliation note — this transaction was included in the batch.',
        user: { name: 'Arjun Mehta' },
        timestamp: '08:00 PM',
        status: TimelineNodeStatus.NEUTRAL,
    },
]

// ---------------------------------------------------------------------------
// Status badge helper (the purple/colored squares in the design image)
// ---------------------------------------------------------------------------

const StatusBadge = ({ color }: { color: string }) => (
    <span
        style={{
            display: 'inline-block',
            width: 16,
            height: 16,
            borderRadius: 4,
            backgroundColor: color,
            opacity: 0.7,
            flexShrink: 0,
        }}
    />
)

// ---------------------------------------------------------------------------
// Main demo
// ---------------------------------------------------------------------------

const TimelineDemo = () => {
    const { theme } = useTheme()

    // ---- Controls ----
    const [showSubstepSlots, setShowSubstepSlots] = useState(true)
    const [headerStatus, setHeaderStatus] = useState<TimelineNodeStatus>(
        TimelineNodeStatus.SUCCESS
    )

    // ---- "Show more" state ----
    const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS)
    const [hiddenCount, setHiddenCount] = useState(HIDDEN_COMMENTS.length)

    const handleShowMore = async () => {
        await sleep(1200) // simulate network latency
        setComments((prev) => [...prev, ...HIDDEN_COMMENTS])
        setHiddenCount(0)
    }

    const resetComments = () => {
        setComments(INITIAL_COMMENTS)
        setHiddenCount(HIDDEN_COMMENTS.length)
    }

    const isDark = theme === Theme.DARK
    const containerBg = isDark ? '#111827' : '#f9fafb'
    const borderColor = isDark ? '#374151' : '#e5e7eb'

    const statusOptions = [
        { value: TimelineNodeStatus.SUCCESS, label: 'Success (green)' },
        { value: TimelineNodeStatus.WARNING, label: 'Warning (orange)' },
        { value: TimelineNodeStatus.ERROR, label: 'Error (red)' },
        { value: TimelineNodeStatus.NEUTRAL, label: 'Neutral (gray)' },
    ]

    return (
        <div className="p-8 space-y-10">
            {/* Page header */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold">Timeline</h1>
                <p
                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    Composable timeline component with labels, headers, leaf
                    substeps, comments and async "show more" support.
                </p>
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* Controls                                                            */}
            {/* ------------------------------------------------------------------ */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Controls</h2>
                <div className="flex flex-wrap items-center gap-6">
                    <Switch
                        label="Show substep slots"
                        checked={showSubstepSlots}
                        onChange={() => setShowSubstepSlots((v) => !v)}
                    />
                    <SingleSelect
                        label="Header status"
                        items={[{ items: statusOptions }]}
                        selected={headerStatus}
                        onSelect={(v: string) =>
                            setHeaderStatus(v as TimelineNodeStatus)
                        }
                        placeholder="Select status"
                    />
                </div>
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Section 1 — Full timeline (labels + headers + substeps)             */}
            {/* ------------------------------------------------------------------ */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">Full Timeline</h2>
                <p
                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    Labels group headers. Headers contain leaf substeps. The
                    vertical line is always visible.
                </p>

                <div
                    style={{
                        background: containerBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 12,
                        padding: '24px 32px',
                        maxWidth: 640,
                    }}
                >
                    <Timeline>
                        {/* ---- Group 1 ---- */}
                        <Timeline.Label date="JAN 15, 2025" />

                        <Timeline.Header
                            title="Payment Initiated"
                            status={headerStatus}
                            timestamp="4:00 PM"
                        >
                            <Timeline.Substep
                                title="Transaction Created"
                                description="Geddit initiated the transaction on behalf of merchant."
                                timestamp="4:00:04 PM"
                                leftSlot={
                                    showSubstepSlots ? (
                                        <StatusBadge color="#a78bfa" />
                                    ) : undefined
                                }
                                rightSlot={
                                    showSubstepSlots ? (
                                        <StatusBadge color="#a78bfa" />
                                    ) : undefined
                                }
                            />
                            <Timeline.Substep
                                title="Gateway Selected"
                                description="Pinelabs chosen as preferred gateway based on Gateway score: 89"
                                timestamp="4:00:04 PM"
                                leftSlot={
                                    showSubstepSlots ? (
                                        <StatusBadge color="#6ee7b7" />
                                    ) : undefined
                                }
                                rightSlot={
                                    showSubstepSlots ? (
                                        <StatusBadge color="#6ee7b7" />
                                    ) : undefined
                                }
                            />
                        </Timeline.Header>

                        {/* ---- Group 2 ---- */}
                        <Timeline.Label date="JAN 23, 2025" />

                        <Timeline.Header
                            title="Pay / Start Triggered"
                            status={TimelineNodeStatus.SUCCESS}
                            timestamp="4:00 PM"
                        >
                            <Timeline.Substep
                                title="Pay Start Triggered"
                                description="Sub information about this step."
                                timestamp="4:00:04 PM"
                            />
                        </Timeline.Header>

                        <Timeline.Header
                            title="Gateway Response"
                            status={TimelineNodeStatus.WARNING}
                            timestamp="4:00 PM"
                        >
                            <Timeline.Substep
                                title="Status Check with PG"
                                description="PG approved the transaction."
                                timestamp="4:00:04 PM"
                            />
                            <Timeline.Substep
                                title="PG Webhook Received"
                                description="Information about this, maybe the webhook ID or event."
                                timestamp="4:00:04 PM"
                            />
                        </Timeline.Header>

                        <Timeline.Header
                            title="Webhook Informed"
                            status={TimelineNodeStatus.NEUTRAL}
                            timestamp="4:00 PM"
                        >
                            <Timeline.Substep
                                title="Merchant Notified"
                                description="Failure reason: insufficient funds."
                                timestamp="4:00:04 PM"
                            />
                        </Timeline.Header>
                    </Timeline>
                </div>
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Section 2 — Generic nodes (e.g. comments) + Show More              */}
            {/* ------------------------------------------------------------------ */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Generic nodes + Show more
                </h2>
                <p
                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    <Timeline.Node /> is generic (not comment-specific). You
                    control how many to show and pass the label to ShowMore
                    (e.g. &quot;Show All Comments (45+)&quot;). onShowMore can
                    reveal more from initial data or call an API; async shows a
                    spinner.
                </p>

                <div
                    style={{
                        background: containerBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 12,
                        padding: '24px 32px',
                        maxWidth: 640,
                    }}
                >
                    <Timeline>
                        {comments.map((c) => (
                            <Timeline.Node
                                key={c.id}
                                text={c.text}
                                user={c.user}
                                time={c.timestamp}
                                status={c.status}
                                maxLines={3}
                            />
                        ))}

                        {hiddenCount > 0 && (
                            <Timeline.ShowMore
                                count={hiddenCount}
                                label={`Show All Comments (${hiddenCount}+)`}
                                onShowMore={handleShowMore}
                            />
                        )}
                    </Timeline>
                </div>

                {hiddenCount === 0 && (
                    <button
                        className="text-sm underline opacity-60"
                        onClick={resetComments}
                    >
                        Reset demo
                    </button>
                )}
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Section 3 — Mixed (headers + inline comments)                      */}
            {/* ------------------------------------------------------------------ */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Mixed — Headers with Inline Comments
                </h2>
                <p
                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    Because the API is composable you can freely mix labels,
                    headers, substeps and comments in any order.
                </p>

                <div
                    style={{
                        background: containerBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 12,
                        padding: '24px 32px',
                        maxWidth: 640,
                    }}
                >
                    <Timeline>
                        <Timeline.Label date="JAN 23, 2025" />

                        <Timeline.Header
                            title="Refund Requested"
                            status={TimelineNodeStatus.WARNING}
                            timestamp="4:00 PM"
                        >
                            <Timeline.Substep
                                title="Customer Initiated Refund"
                                description="Reason: product not delivered."
                                timestamp="4:00:04 PM"
                            />
                        </Timeline.Header>

                        <Timeline.Node
                            text="Reviewed the refund request — all details match the original order. Approved."
                            user={{ name: 'Shweta Yadav' }}
                            time="04:30 PM"
                            status={TimelineNodeStatus.SUCCESS}
                        />

                        <Timeline.Node
                            text="Escalating to finance team for final settlement confirmation."
                            user={{ name: 'Arjun Mehta' }}
                            time="04:45 PM"
                            status={TimelineNodeStatus.NEUTRAL}
                        />

                        <Timeline.Header
                            title="Refund Processed"
                            status={TimelineNodeStatus.SUCCESS}
                            timestamp="5:00 PM"
                        >
                            <Timeline.Substep
                                title="Funds Reversed"
                                description="Amount credited back to customer's account within 3–5 business days."
                                timestamp="5:00:04 PM"
                            />
                        </Timeline.Header>

                        <Timeline.Node
                            text="Refund confirmation email sent to the customer automatically."
                            user={{ name: 'Priya Sharma' }}
                            time="05:10 PM"
                            status={TimelineNodeStatus.SUCCESS}
                        />

                        {/* Node with header row + datetime top-right */}
                        <Timeline.Node
                            title="Internal note"
                            datetime="05:15 PM"
                            text="Node can have a title and datetime on the first row; then text; then avatar + time below."
                            user={{ name: 'Rahul Gupta' }}
                            time="05:15 PM"
                            status={TimelineNodeStatus.NEUTRAL}
                        />
                    </Timeline>
                </div>
            </section>

            {/* ------------------------------------------------------------------ */}
            {/* Section 4 — Status variants showcase                               */}
            {/* ------------------------------------------------------------------ */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Status Indicator Variants
                </h2>
                <p
                    className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}
                >
                    All four status colours on both headers and comments.
                </p>

                <div
                    style={{
                        background: containerBg,
                        border: `1px solid ${borderColor}`,
                        borderRadius: 12,
                        padding: '24px 32px',
                        maxWidth: 640,
                    }}
                >
                    <Timeline>
                        <Timeline.Header
                            title="Success — payment completed"
                            status={TimelineNodeStatus.SUCCESS}
                            timestamp="4:00 PM"
                        />
                        <Timeline.Header
                            title="Warning — review required"
                            status={TimelineNodeStatus.WARNING}
                            timestamp="4:01 PM"
                        />
                        <Timeline.Header
                            title="Error — transaction failed"
                            status={TimelineNodeStatus.ERROR}
                            timestamp="4:02 PM"
                        />
                        <Timeline.Header
                            title="Neutral — no action needed"
                            status={TimelineNodeStatus.NEUTRAL}
                            timestamp="4:03 PM"
                        />

                        <Timeline.Label date="Comments" />

                        <Timeline.Node
                            text="Green dot — all good, nothing to action here."
                            user={{ name: 'Shweta Yadav' }}
                            time="04:10 PM"
                            status={TimelineNodeStatus.SUCCESS}
                        />
                        <Timeline.Node
                            text="Orange dot — this needs attention before the deadline."
                            user={{ name: 'Arjun Mehta' }}
                            time="04:15 PM"
                            status={TimelineNodeStatus.WARNING}
                        />
                        <Timeline.Node
                            text="Red dot — critical issue raised, escalation required immediately."
                            user={{ name: 'Priya Sharma' }}
                            time="04:20 PM"
                            status={TimelineNodeStatus.ERROR}
                        />
                        <Timeline.Node
                            text="Gray dot — informational note with no specific action required."
                            user={{ name: 'Rahul Gupta' }}
                            time="04:25 PM"
                            status={TimelineNodeStatus.NEUTRAL}
                        />
                    </Timeline>
                </div>
            </section>
        </div>
    )
}

export default TimelineDemo
