import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { fn } from '@storybook/test'
import {
    Timeline,
    TimelineNodeStatus,
} from '../../../../../packages/blend/lib/components/Timeline'
import {
    getA11yConfig,
    CHROMATIC_CONFIG,
} from '../../../.storybook/a11y.config'

const meta: Meta<typeof Timeline> = {
    title: 'Components/Timeline',
    component: Timeline,
    subcomponents: {
        Label: Timeline.Label,
        Header: Timeline.Header,
        Substep: Timeline.Substep,
        Node: Timeline.Node,
        ShowMore: Timeline.ShowMore,
    },
    parameters: {
        layout: 'centered',
        a11y: getA11yConfig('content'),
        chromatic: CHROMATIC_CONFIG,
        docs: {
            description: {
                component: `
Timeline displays a vertical sequence of events: labels, headers with substeps, and comment-style nodes.

## Features
- **Label** – Section divider (e.g. date)
- **Header** – Main event with optional status and timestamp; can contain **Substeps**
- **Substep** – Child step under a header (connector + title/description/timestamp)
- **Node** – Standalone item (e.g. comment) with optional avatar, user, time, body
- **ShowMore** – "Show more (N+)" to load more items

## Usage

\`\`\`tsx
import { Timeline, TimelineNodeStatus } from '@juspay/blend-design-system';

<Timeline>
  <Timeline.Label text="JAN 15, 2025" />
  <Timeline.Header title="Payment Initiated" timestamp="4:00 PM" status={TimelineNodeStatus.SUCCESS}>
    <Timeline.Substep title="Transaction Created" description="Initiated by Geddit." timestamp="4:00:04 PM" />
  </Timeline.Header>
  <Timeline.Node text="Comment here." user={{ name: 'Jane' }} time="04:30 PM" />
  <Timeline.ShowMore count={5} onShowMore={() => {}} />
</Timeline>
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Timeline>

export const Default: Story = {
    render: () => (
        <div style={{ maxWidth: 440 }}>
            <Timeline>
                <Timeline.Label text="JAN 15, 2025" />
                <Timeline.Header
                    title="Payment"
                    timestamp="4:00 PM"
                    status={TimelineNodeStatus.SUCCESS}
                    leftSlot={
                        <span style={{ fontSize: 12, color: '#666' }}>
                            #TXN-1
                        </span>
                    }
                    rightSlot={<span style={{ fontWeight: 600 }}>₹1,200</span>}
                >
                    <Timeline.Substep
                        title="Transaction Created"
                        description="Geddit initiated the transaction."
                        timestamp="4:00:04 PM"
                    />
                    <Timeline.Substep
                        title="Gateway Selected"
                        description="Razorpay."
                        timestamp="4:00:05 PM"
                        rightSlot={
                            <span style={{ fontSize: 12, opacity: 0.9 }}>
                                ID
                            </span>
                        }
                    />
                </Timeline.Header>
                <Timeline.Node
                    text="Some 2-3 lines comment can be here. More than this the lines will be truncated."
                    user={{ name: 'Shweta Yadav' }}
                    time="04:30 PM"
                />
                <Timeline.ShowMore count={45} onShowMore={fn()} />
            </Timeline>
        </div>
    ),
}

export const CommentsOnly: Story = {
    render: () => (
        <div style={{ maxWidth: 400 }}>
            <Timeline>
                <Timeline.Label text="Comments" />
                <Timeline.Node
                    text="First comment. Short."
                    user={{ name: 'Alex' }}
                    time="04:00 PM"
                />
                <Timeline.Node
                    text="Second comment with a bit more text to show wrapping."
                    user={{ name: 'Sam' }}
                    time="04:15 PM"
                />
                <Timeline.Node
                    text="Third comment."
                    user={{ name: 'Jordan' }}
                    time="04:30 PM"
                />
                <Timeline.ShowMore count={12} onShowMore={fn()} />
            </Timeline>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Timeline with only comment nodes (avatar + user + time).',
            },
        },
    },
}

export const StatusVariants: Story = {
    render: () => (
        <div style={{ maxWidth: 400 }}>
            <Timeline>
                <Timeline.Label text="JAN 23, 2025" />
                <Timeline.Header
                    title="Success"
                    timestamp="2:00 PM"
                    status={TimelineNodeStatus.SUCCESS}
                />
                <Timeline.Header
                    title="Warning"
                    timestamp="2:05 PM"
                    status={TimelineNodeStatus.WARNING}
                />
                <Timeline.Header
                    title="Error"
                    timestamp="2:10 PM"
                    status={TimelineNodeStatus.ERROR}
                />
                <Timeline.Header
                    title="Neutral"
                    timestamp="2:15 PM"
                    status={TimelineNodeStatus.NEUTRAL}
                />
            </Timeline>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Header status variants: success, warning, error, neutral.',
            },
        },
    },
}

export const ShowMoreDisabled: Story = {
    render: () => (
        <div style={{ maxWidth: 400 }}>
            <Timeline>
                <Timeline.Node
                    text="One comment."
                    user={{ name: 'User' }}
                    time="4:00 PM"
                />
                <Timeline.ShowMore count={10} />
            </Timeline>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Show More with no onShowMore is disabled.',
            },
        },
    },
}

export const Visual: Story = {
    render: () => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                maxWidth: 420,
            }}
        >
            <div>
                <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                    Full timeline
                </h3>
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                    <Timeline.Header
                        title="Payment Initiated"
                        timestamp="4:00 PM"
                        status={TimelineNodeStatus.SUCCESS}
                    >
                        <Timeline.Substep
                            title="Transaction Created"
                            description="Initiated."
                            timestamp="4:00:04 PM"
                        />
                    </Timeline.Header>
                    <Timeline.Node
                        text="A comment."
                        user={{ name: 'User' }}
                        time="04:30 PM"
                    />
                    <Timeline.ShowMore count={5} onShowMore={fn()} />
                </Timeline>
            </div>
            <div>
                <h3 style={{ marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
                    Comments only
                </h3>
                <Timeline>
                    <Timeline.Label text="Comments" />
                    <Timeline.Node
                        text="Comment one."
                        user={{ name: 'A' }}
                        time="4:00 PM"
                    />
                    <Timeline.Node
                        text="Comment two."
                        user={{ name: 'B' }}
                        time="4:05 PM"
                    />
                    <Timeline.ShowMore count={3} onShowMore={fn()} />
                </Timeline>
            </div>
        </div>
    ),
    parameters: {
        docs: { description: { story: 'Visual variants for regression.' } },
        chromatic: { ...CHROMATIC_CONFIG, delay: 300 },
    },
}
