import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { filterBlockedProps } from '../../utils/prop-helpers'
import { TimelineTokensType } from './timeline.token'
import TimelineLabel from './TimelineLabel'
import TimelineHeader from './TimelineHeader'
import TimelineSubstep from './TimelineSubstep'
import TimelineNode from './TimelineNode'
import TimelineShowMore from './TimelineShowMore'
import type { TimelineRootProps } from './types'

/**
 * Root container for the Timeline compound component.
 * Renders the continuous vertical line. Sub-components use tokens from theme.
 *
 * @example
 * ```tsx
 * <Timeline>
 *   <Timeline.Label date="JAN 15, 2025" />
 *   <Timeline.Header title="Payment Initiated" status={TimelineNodeStatus.SUCCESS} timestamp="4:00 PM">
 *     <Timeline.Substep title="Transaction Created" description="…" timestamp="4:00:04 PM" />
 *   </Timeline.Header>
 *   <Timeline.Node text="Approved." user={{ name: "Shweta" }} time="04:30 PM" status={TimelineNodeStatus.SUCCESS} />
 *   <Timeline.ShowMore count={12} label="Show All Comments (12+)" onShowMore={loadMore} />
 * </Timeline>
 * ```
 */
const TimelineRoot = forwardRef<HTMLDivElement, TimelineRootProps>(
    ({ children, className, ...rest }, ref) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const filteredProps = filterBlockedProps(rest)

        return (
            <Block
                ref={ref}
                position="relative"
                className={className}
                data-timeline="true"
                {...filteredProps}
            >
                <Block
                    position="absolute"
                    left={tokens.line.marginLeft}
                    top={0}
                    bottom={0}
                    width={tokens.line.width}
                    backgroundColor={tokens.line.backgroundColor}
                    data-timeline-line="true"
                />

                {children}
            </Block>
        )
    }
)

TimelineRoot.displayName = 'Timeline'

/**
 * Compound component — attach sub-components as static properties so
 * consumers only need a single import.
 *
 * ```tsx
 * import { Timeline } from '@blend/components/Timeline'
 *
 * <Timeline>
 *   <Timeline.Label … />
 *   <Timeline.Header … >
 *     <Timeline.Substep … />
 *   </Timeline.Header>
 *   <Timeline.Comment … />
 *   <Timeline.ShowMore … />
 * </Timeline>
 * ```
 */
const Timeline = Object.assign(TimelineRoot, {
    Label: TimelineLabel,
    Header: TimelineHeader,
    Substep: TimelineSubstep,
    Node: TimelineNode,
    ShowMore: TimelineShowMore,
})

export default Timeline
