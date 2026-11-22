import React from 'react'
import { figma } from '@figma/code-connect'
import { Timeline, TimelineNodeStatus } from '@juspay/blend-design-system'

/**
 * FIGMA CODE CONNECT FOR TIMELINE
 *
 * The Figma "Timeline" component set at 32190:52258 contains 30 variant
 * symbols (count 1–10 × state top/intermediate/bottom) plus a separate
 * hasLabel boolean.
 *
 * Two figma.connect calls cover the hasLabel controlling structure:
 *   1. Base connect (hasLabel=true): includes Timeline.Label above the header
 *   2. Variant connect (hasLabel=false): omits the label
 *
 * PROP MAPPING DOCUMENTATION
 *
 * 1. FIGMA-ONLY PROPERTIES (not mapped to component props):
 *    - count (VARIANT 1–10): Number of visible timeline entries. The
 *      example shows two substeps as a representative sample; duplicate
 *      or remove Timeline.Substep children to match your data.
 *    - state (VARIANT top/intermediate/bottom): Design-time padding cue.
 *      In code the connector line and dots are computed by TimelineRoot
 *      automatically, so no equivalent prop is needed.
 *
 * 2. CODE-ONLY PROPERTIES (not in Figma):
 *    - status: TimelineNodeStatus enum (SUCCESS/WARNING/ERROR/NEUTRAL).
 *      Defaults to NEUTRAL; set per event in your data.
 *    - leftSlot, rightSlot, headerRightSlot: slot content.
 *    - Timeline.Node: comment-style entries with user avatar + time.
 *    - Timeline.ShowMore: "Show more" trigger.
 */

figma.connect(
    Timeline,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=32190-52258',
    {
        example: () => (
            <Timeline>
                <Timeline.Label text="JAN 15, 2025" />
                <Timeline.Header
                    title="Event created"
                    status={TimelineNodeStatus.SUCCESS}
                    timestamp="4:00 PM"
                >
                    <Timeline.Substep
                        title="Header"
                        description="Some 2-3 lines description can be here. More than this the lines will be truncated."
                        timestamp="4:00 PM"
                    />
                    <Timeline.Substep
                        title="Header"
                        description="Some 2-3 lines description can be here. More than this the lines will be truncated."
                        timestamp="4:00 PM"
                    />
                </Timeline.Header>
            </Timeline>
        ),

        imports: [
            "import { Timeline, TimelineNodeStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Timeline',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-timeline--docs',
            },
        ],
    }
)

figma.connect(
    Timeline,
    'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System?node-id=32190-52258',
    {
        variant: { hasLabel: false },

        example: () => (
            <Timeline>
                <Timeline.Header
                    title="Event created"
                    status={TimelineNodeStatus.SUCCESS}
                    timestamp="4:00 PM"
                >
                    <Timeline.Substep
                        title="Header"
                        description="Some 2-3 lines description can be here. More than this the lines will be truncated."
                        timestamp="4:00 PM"
                    />
                    <Timeline.Substep
                        title="Header"
                        description="Some 2-3 lines description can be here. More than this the lines will be truncated."
                        timestamp="4:00 PM"
                    />
                </Timeline.Header>
            </Timeline>
        ),

        imports: [
            "import { Timeline, TimelineNodeStatus } from '@juspay/blend-design-system'",
        ],

        links: [
            {
                name: 'GitHub',
                url: 'https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/Timeline',
            },
            {
                name: 'Storybook',
                url: 'https://blend.juspay.design/storybook/?path=/docs/components-timeline--docs',
            },
        ],
    }
)
