import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import PrimitiveText from '../Primitives/PrimitiveText/PrimitiveText'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import type { TimelineLabelProps } from './types'

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

                <PrimitiveText
                    fontSize={tokens.label.fontSize}
                    fontWeight={tokens.label.fontWeight}
                    color={tokens.label.color}
                >
                    {date}
                </PrimitiveText>
            </Block>
        )
    }
)

TimelineLabel.displayName = 'Timeline.Label'

export default TimelineLabel
