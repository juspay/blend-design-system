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
        docsSubtitle:
            'Timeline displays a vertical sequence of events: labels, headers with substeps, and comment-style nodes.',
        docs: {
            description: {
                component: `
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


## Features
- **Label** – Section divider (e.g. date)
- **Header** – Main event with optional status and timestamp; can contain **Substeps**
- **Substep** – Child step under a header (connector + title/description/timestamp)
- **Node** – Standalone item (e.g. comment) with optional avatar, user, time, body
- **ShowMore** – "Show more (N+)" to load more items

## Accessibility
- Semantic HTML structure with proper heading hierarchy
- ARIA labels for status indicators
- Keyboard navigable interactive elements
- Screen reader compatible timestamps with datetime attributes
- Color-coded status indicators with text alternatives

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
        <div className="max-w-[440px]">
            <Timeline>
                <Timeline.Label text="JAN 15, 2025" />
                <Timeline.Header
                    title="Payment"
                    timestamp="4:00 PM"
                    status={TimelineNodeStatus.SUCCESS}
                    leftSlot={
                        <span className="text-xs text-gray-500">#TXN-1</span>
                    }
                    rightSlot={<span className="font-semibold">₹1,200</span>}
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
                            <span className="text-xs opacity-90">ID</span>
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
        <div className="max-w-[400px]">
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
        <div className="max-w-[400px]">
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
        <div className="max-w-[400px]">
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

/**
 * Additional Timeline props not covered in other stories:
 *
 * ## Timeline.Node Additional Props
 *
 * - **maxLines**: number - Truncates long text after N lines with ellipsis
 * - **avatarProps**: Partial<Omit<AvatarV2Props, 'src' | 'fallbackText'>> - Custom avatar styling (size, shape, etc.)
 * - **datetime**: string - Machine-readable datetime (ISO format) for accessibility, distinct from display 'time'
 * - **title**: string - Adds a header/title above the comment text
 * - **status**: TimelineNodeStatus - Shows colored status indicator (SUCCESS, WARNING, ERROR, NEUTRAL)
 * - **datetimeLeftSlot** / **datetimeRightSlot**: ReactNode - Extra content rendered beside the timestamp
 * - **leftSlot** / **headerRightSlot**: ReactNode - Custom content in the node header area
 * - **children**: ReactNode - Additional content rendered below the text
 *
 * ## Timeline.ShowMore Additional Props
 *
 * - **label**: string - Custom button text (defaults to "Show more")
 * - **buttonProps**: Partial<Omit<ButtonV2Props, 'text' | 'onClick'>> - Custom button styling (variant, size, etc.)
 *
 * ## Timeline.Substep Additional Props
 *
 * - **datetimeLeftSlot** / **datetimeRightSlot**: ReactNode - Extra content rendered beside the timestamp
 *
 * ## Example Usage
 *
 * ```tsx
 * <Timeline.Node
 *   title="Status Update"
 *   text="The payment has been processed successfully."
 *   maxLines={2}
 *   status={TimelineNodeStatus.SUCCESS}
 *   user={{ name: 'John Doe', avatar: '/avatar.jpg' }}
 *   time="2:30 PM"
 *   datetime="2025-01-15T14:30:00Z"
 *   avatarProps={{ size: 'sm', shape: 'circle' }}
 *   datetimeRightSlot={<span>✓</span>}
 * >
 *   <button>View Details</button>
 * </Timeline.Node>
 *
 * <Timeline.ShowMore
 *   count={5}
 *   label="Load more comments"
 *   buttonProps={{ variant: 'secondary', size: 'sm' }}
 *   onShowMore={() => loadMore()}
 * />
 *
 * <Timeline.Substep
 *   title="Step completed"
 *   timestamp="3:00 PM"
 *   datetimeRightSlot={<Badge>Done</Badge>}
 * />
 * ```
 */

export const Visual: Story = {
    render: () => (
        <div className="flex flex-col gap-8 max-w-[420px]">
            <div>
                <h3 className="mb-3 text-sm font-semibold">Full timeline</h3>
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
                <h3 className="mb-3 text-sm font-semibold">Comments only</h3>
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
