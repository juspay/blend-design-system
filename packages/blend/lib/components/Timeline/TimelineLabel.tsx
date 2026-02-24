import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import type { TimelineLabelProps } from './types'

const TimelineLabel = forwardRef<HTMLDivElement, TimelineLabelProps>(
    ({ text, date, ...rest }, ref) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const { label } = tokens
        const labelText = text ?? date ?? ''

        return (
            <Block
                ref={ref}
                position="relative"
                display="flex"
                alignItems="center"
                paddingLeft={label.paddingLeft}
                marginBottom={label.marginBottom}
                data-timeline-label="true"
                {...rest}
            >
                <Block
                    position="absolute"
                    left={label.circle.left}
                    top="50%"
                    style={{ transform: 'translateY(-50%)' }}
                    width={label.circle.width}
                    height={label.mask.height}
                    backgroundColor={label.mask.backgroundColor}
                />
                <Block
                    position="absolute"
                    left={label.circle.left}
                    top="50%"
                    style={{ transform: 'translateY(-50%)' }}
                    width={label.circle.width}
                    height={label.circle.height}
                    borderRadius="50%"
                    backgroundColor={label.circle.backgroundColor}
                    border={label.circle.border}
                    flexShrink={0}
                />

                <Text
                    fontSize={label.text.fontSize}
                    fontWeight={label.text.fontWeight}
                    color={label.text.color}
                >
                    {labelText}
                </Text>
            </Block>
        )
    }
)

TimelineLabel.displayName = 'Timeline.Label'

export default TimelineLabel
