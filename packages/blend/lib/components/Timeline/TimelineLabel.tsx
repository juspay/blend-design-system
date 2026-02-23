import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import type { TimelineLabelProps } from './types'

/**
 * A date / group separator label rendered on the vertical timeline line.
 * Displays a small hollow circle indicator and date text.
 */
const TimelineLabel = forwardRef<HTMLDivElement, TimelineLabelProps>(
    ({ date }, ref) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')

        return (
            <Block
                ref={ref}
                position="relative"
                display="flex"
                alignItems="center"
                paddingLeft={tokens.layout.gutter}
                marginBottom={tokens.label.marginBottom}
                data-timeline-label="true"
            >
                {/* Hollow circle centred on the vertical line */}
                <Block
                    position="absolute"
                    left={tokens.layout.circleOffset}
                    top="50%"
                    style={{ transform: 'translateY(-50%)' }}
                    width={tokens.label.circle.size}
                    height={tokens.label.circle.size}
                    borderRadius="50%"
                    backgroundColor={tokens.label.circle.backgroundColor}
                    border={tokens.label.circle.border}
                    flexShrink={0}
                />

                <Text
                    fontSize={tokens.label.fontSize}
                    fontWeight={tokens.label.fontWeight}
                    color={tokens.label.color}
                >
                    {date}
                </Text>
            </Block>
        )
    }
)

TimelineLabel.displayName = 'Timeline.Label'

export default TimelineLabel
