import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import { TimelineNodeStatus } from './types'
import type { TimelineSubstepProps } from './types'

const CONNECTOR_PATH = 'M0.5 0.5V1.5C0.5 7.02285 4.97715 11.5 10.5 11.5H21.5'

const TimelineSubstep = forwardRef<HTMLDivElement, TimelineSubstepProps>(
    (
        {
            title,
            description,
            timestamp,
            rightSlot,
            datetimeLeftSlot,
            datetimeRightSlot,
            isNestedUnderHeader = false,
            showIndicator = true,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const { substep, track } = tokens
        const { connector, circle } = substep
        const showDot = !isNestedUnderHeader && showIndicator
        const dotColor = tokens.statusColors[TimelineNodeStatus.NEUTRAL]

        const hasTitleRow =
            (title != null && title !== '') ||
            rightSlot != null ||
            datetimeLeftSlot != null ||
            (timestamp != null && timestamp !== '') ||
            datetimeRightSlot != null

        return (
            <Block
                ref={ref}
                position="relative"
                marginTop={substep.marginTop}
                marginBottom={substep.marginBottom}
                data-timeline-substep="true"
                {...rest}
            >
                {showDot && (
                    <Block
                        position="absolute"
                        left={circle.left}
                        top={0}
                        width={circle.width}
                        height={circle.height}
                        borderRadius="50%"
                        backgroundColor={dotColor}
                        flexShrink={0}
                    />
                )}

                <Block
                    position="absolute"
                    left={track.left}
                    top={0}
                    width={connector.width}
                    height={connector.height}
                    style={{
                        overflow: 'visible',
                    }}
                >
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 22 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                    >
                        <path
                            d={CONNECTOR_PATH}
                            stroke={connector.strokeColor}
                            strokeLinecap="round"
                        />
                    </svg>
                </Block>

                <Block marginLeft={substep.marginLeft}>
                    {hasTitleRow && (
                        <Block
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            gap={substep.gap}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                gap={substep.title.gap}
                                flexGrow={1}
                                minWidth={0}
                            >
                                <Text
                                    fontSize={substep.title.fontSize}
                                    fontWeight={substep.title.fontWeight}
                                    color={substep.title.color}
                                >
                                    {title}
                                </Text>
                                {rightSlot != null && (
                                    <Block flexShrink={0}>{rightSlot}</Block>
                                )}
                            </Block>

                            <Block
                                display="flex"
                                alignItems="center"
                                gap={substep.timestamp.gap}
                                flexShrink={0}
                            >
                                {datetimeLeftSlot != null && (
                                    <Block flexShrink={0}>
                                        {datetimeLeftSlot}
                                    </Block>
                                )}
                                {timestamp != null && timestamp !== '' && (
                                    <Text
                                        fontSize={substep.timestamp.fontSize}
                                        color={substep.timestamp.color}
                                    >
                                        {timestamp}
                                    </Text>
                                )}
                                {datetimeRightSlot != null && (
                                    <Block flexShrink={0}>
                                        {datetimeRightSlot}
                                    </Block>
                                )}
                            </Block>
                        </Block>
                    )}

                    {description != null && description !== '' && (
                        <Block
                            marginTop={
                                hasTitleRow
                                    ? substep.description.marginTop
                                    : undefined
                            }
                        >
                            <Text
                                fontSize={substep.description.fontSize}
                                color={substep.description.color}
                            >
                                {description}
                            </Text>
                        </Block>
                    )}
                </Block>
            </Block>
        )
    }
)

TimelineSubstep.displayName = 'Timeline.Substep'

export default TimelineSubstep
