'use client'
import { Timeline, TimelineNodeStatus } from '@juspay/blend-design-system'
import React from 'react'
import ComponentPreview from '@/components/features/Documentation/Previews/ComponentPreview'

const TimelinePreview = () => {
    const tsCode = `import { Timeline, TimelineNodeStatus } from '@juspay/blend-design-system'

function MyComponent() {
    return (
        <Timeline>
            <Timeline.Label text="JAN 15, 2025" />
            <Timeline.Header
                title="Payment captured"
                status={TimelineNodeStatus.SUCCESS}
                timestamp="10:30 AM"
            >
                <Timeline.Substep
                    title="Webhook delivered"
                    description="The merchant endpoint returned 200."
                    timestamp="10:31 AM"
                />
            </Timeline.Header>
            <Timeline.Node
                title="Internal note"
                text="Risk review completed successfully."
                time="10:45 AM"
            />
        </Timeline>
    )
}`

    return (
        <ComponentPreview ts={tsCode}>
            <div className="w-full max-w-lg">
                <Timeline>
                    <Timeline.Label text="JAN 15, 2025" />
                    <Timeline.Header
                        title="Payment captured"
                        status={TimelineNodeStatus.SUCCESS}
                        timestamp="10:30 AM"
                    >
                        <Timeline.Substep
                            title="Webhook delivered"
                            description="The merchant endpoint returned 200."
                            timestamp="10:31 AM"
                        />
                    </Timeline.Header>
                    <Timeline.Node
                        title="Internal note"
                        text="Risk review completed successfully."
                        time="10:45 AM"
                    />
                </Timeline>
            </div>
        </ComponentPreview>
    )
}

export default TimelinePreview
