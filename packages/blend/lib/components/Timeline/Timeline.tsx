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

const Timeline = Object.assign(TimelineRoot, {
    Label: TimelineLabel,
    Header: TimelineHeader,
    Substep: TimelineSubstep,
    Node: TimelineNode,
    ShowMore: TimelineShowMore,
})

export default Timeline
