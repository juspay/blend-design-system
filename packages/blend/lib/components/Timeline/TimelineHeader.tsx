import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import { TimelineNodeStatus } from './types'
import type { TimelineHeaderProps } from './types'

/**
 * A primary node on the timeline.
 * Renders a status-coloured dot on the vertical line, a title and optional
 * timestamp.  Pass `TimelineSubstep` elements as children to create leaf nodes.
 */
const TimelineHeader = forwardRef<HTMLDivElement, TimelineHeaderProps>(
    (
        {
            title,
            status = TimelineNodeStatus.NEUTRAL,
            timestamp,
            children,
            leftSlot,
            rightSlot,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const dotColor = tokens.statusColors[status]

        return (
            <Block
                ref={ref}
                position="relative"
                marginBottom={tokens.header.marginBottom}
                data-timeline-header="true"
                {...rest}
            >
                {/* ---- Header title row ---- */}
                <Block
                    position="relative"
                    display="flex"
                    alignItems="center"
                    paddingLeft={tokens.layout.gutter}
                    marginBottom={
                        children ? tokens.header.title.marginBottom : undefined
                    }
                >
                    {/* Status dot — absolutely centred on the vertical line */}
                    <Block
                        position="absolute"
                        left={tokens.layout.circleOffset}
                        top="50%"
                        style={{ transform: 'translateY(-50%)' }}
                        width={tokens.header.circle.size}
                        height={tokens.header.circle.size}
                        borderRadius="50%"
                        backgroundColor={dotColor}
                        flexShrink={0}
                    />

                    {leftSlot && (
                        <Block flexShrink={0} marginRight="8px">
                            {leftSlot}
                        </Block>
                    )}

                    <Text
                        fontSize={tokens.header.title.fontSize}
                        fontWeight={tokens.header.title.fontWeight}
                        color={tokens.header.title.color}
                        flexGrow={1}
                    >
                        {title}
                    </Text>

                    <Block
                        display="flex"
                        alignItems="center"
                        gap="8px"
                        flexShrink={0}
                        marginLeft="auto"
                        paddingLeft="8px"
                    >
                        {timestamp && (
                            <Text
                                fontSize={tokens.header.timestamp.fontSize}
                                color={tokens.header.timestamp.color}
                            >
                                {timestamp}
                            </Text>
                        )}
                        {rightSlot && <Block flexShrink={0}>{rightSlot}</Block>}
                    </Block>
                </Block>

                {/* ---- Substeps / children ---- */}
                {children && (
                    <Block paddingLeft={tokens.layout.gutter}>{children}</Block>
                )}
            </Block>
        )
    }
)

TimelineHeader.displayName = 'Timeline.Header'

export default TimelineHeader
