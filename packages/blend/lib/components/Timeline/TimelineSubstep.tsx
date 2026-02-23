import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import type { TimelineSubstepProps } from './types'

/**
 * A leaf node rendered inside a TimelineHeader.
 * Shows an L-shaped connector to visually branch off from the parent header,
 * then a title row (with optional left/right slots) and an optional description.
 */
const TimelineSubstep = forwardRef<HTMLDivElement, TimelineSubstepProps>(
    ({ title, description, timestamp, leftSlot, rightSlot, ...rest }, ref) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')

        return (
            <Block
                ref={ref}
                position="relative"
                marginLeft={tokens.substep.marginLeft}
                paddingLeft={tokens.substep.paddingLeft}
                marginTop={tokens.substep.marginTop}
                marginBottom={tokens.substep.marginBottom}
                data-timeline-substep="true"
                {...rest}
            >
                {/* L-shaped connector — vertical leg + horizontal bottom leg */}
                <Block
                    position="absolute"
                    left={0}
                    top={0}
                    width={tokens.substep.connector.width}
                    height={tokens.substep.connector.height}
                    style={{
                        borderLeft: `1px solid ${tokens.substep.connector.borderColor}`,
                        borderBottom: `1px solid ${tokens.substep.connector.borderColor}`,
                        borderBottomLeftRadius: tokens.substep.connector
                            .borderRadius as string,
                    }}
                />

                {/* Title row */}
                <Block
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap="8px"
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap="6px"
                        flexGrow={1}
                    >
                        {leftSlot && <Block flexShrink={0}>{leftSlot}</Block>}
                        <Text
                            fontSize={tokens.substep.title.fontSize}
                            fontWeight={tokens.substep.title.fontWeight}
                            color={tokens.substep.title.color}
                        >
                            {title}
                        </Text>
                    </Block>

                    <Block
                        display="flex"
                        alignItems="center"
                        gap="6px"
                        flexShrink={0}
                    >
                        {timestamp && (
                            <Text
                                fontSize={tokens.substep.timestamp.fontSize}
                                color={tokens.substep.timestamp.color}
                            >
                                {timestamp}
                            </Text>
                        )}
                        {rightSlot && <Block flexShrink={0}>{rightSlot}</Block>}
                    </Block>
                </Block>

                {/* Optional description */}
                {description && (
                    <Text
                        fontSize={tokens.substep.description.fontSize}
                        color={tokens.substep.description.color}
                    >
                        {description}
                    </Text>
                )}
            </Block>
        )
    }
)

TimelineSubstep.displayName = 'Timeline.Substep'

export default TimelineSubstep
