import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import AvatarV2 from '../AvatarV2/AvatarV2'
import { AvatarV2Size } from '../AvatarV2/avatarV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import { TimelineNodeStatus } from './types'
import type { TimelineNodeProps } from './types'

/**
 * Generic timeline leaf node (not comment-specific).
 * Layout:
 *   Row 1: leftSlot | title | headerRightSlot, and top-right: datetimeLeftSlot | datetime | datetimeRightSlot
 *   Row 2: text or children (body)
 *   Row 3: avatar (AvatarV2) + user name + time
 */
const TimelineNode = forwardRef<HTMLDivElement, TimelineNodeProps>(
    (
        {
            title,
            leftSlot,
            headerRightSlot,
            datetime,
            datetimeLeftSlot,
            datetimeRightSlot,
            text,
            maxLines = 3,
            user,
            time,
            status = TimelineNodeStatus.NEUTRAL,
            children,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const dotColor = tokens.statusColors[status]
        const body = text ?? (typeof children === 'string' ? children : null)
        const hasBody = Boolean(
            body || (children && typeof children !== 'string')
        )

        return (
            <Block
                ref={ref}
                position="relative"
                paddingLeft={tokens.layout.gutter}
                marginBottom={tokens.node.marginBottom}
                data-timeline-node="true"
                {...rest}
            >
                {/* Status dot */}
                <Block
                    position="absolute"
                    left={tokens.layout.circleOffset}
                    top={tokens.node.circle.topOffset}
                    width={tokens.node.circle.size}
                    height={tokens.node.circle.size}
                    borderRadius="50%"
                    backgroundColor={dotColor}
                    flexShrink={0}
                />

                {/* Row 1: header + header right slot; top-right: datetime group */}
                <Block
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    gap="8px"
                    marginBottom={
                        hasBody ? tokens.node.text.marginBottom : undefined
                    }
                >
                    <Block
                        display="flex"
                        alignItems="center"
                        gap="8px"
                        flexGrow={1}
                        minWidth={0}
                    >
                        {leftSlot && <Block flexShrink={0}>{leftSlot}</Block>}
                        {title != null && title !== '' && (
                            <Text
                                fontSize={tokens.node.header.fontSize}
                                fontWeight={tokens.node.header.fontWeight}
                                color={tokens.node.header.color}
                            >
                                {title}
                            </Text>
                        )}
                        {headerRightSlot && (
                            <Block flexShrink={0}>{headerRightSlot}</Block>
                        )}
                    </Block>

                    <Block
                        display="flex"
                        alignItems="center"
                        gap="6px"
                        flexShrink={0}
                    >
                        {datetimeLeftSlot && (
                            <Block flexShrink={0}>{datetimeLeftSlot}</Block>
                        )}
                        {datetime != null && datetime !== '' && (
                            <Text
                                fontSize={tokens.node.datetime.fontSize}
                                color={tokens.node.datetime.color}
                            >
                                {datetime}
                            </Text>
                        )}
                        {datetimeRightSlot && (
                            <Block flexShrink={0}>{datetimeRightSlot}</Block>
                        )}
                    </Block>
                </Block>

                {/* Row 2: text or children */}
                {hasBody && (
                    <Block
                        marginBottom={
                            user || time
                                ? tokens.node.text.marginBottom
                                : undefined
                        }
                    >
                        {body != null ? (
                            <Text
                                fontSize={tokens.node.text.fontSize}
                                color={tokens.node.text.color}
                                // lineHeight={tokens.node.text.lineHeight}
                                style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: maxLines,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {body}
                            </Text>
                        ) : (
                            children
                        )}
                    </Block>
                )}

                {/* Row 3: avatar + user name + time */}
                {(user || time) && (
                    <Block display="flex" alignItems="center">
                        {user && (
                            <>
                                <AvatarV2
                                    src={user.avatar}
                                    fallbackText={
                                        user.fallbackText ?? user.name
                                    }
                                    size={AvatarV2Size.SM}
                                    width={tokens.node.avatar.size}
                                    height={tokens.node.avatar.size}
                                />
                                <Text
                                    fontSize={tokens.node.user.fontSize}
                                    color={tokens.node.user.color}
                                    style={{
                                        marginLeft: tokens.node.user
                                            .marginLeft as string,
                                    }}
                                >
                                    {user.name}
                                </Text>
                                {time != null && time !== '' && (
                                    <>
                                        <Block
                                            width={tokens.node.separator.size}
                                            height={tokens.node.separator.size}
                                            borderRadius="50%"
                                            backgroundColor={
                                                tokens.node.separator.color
                                            }
                                            marginLeft={
                                                tokens.node.separator.marginX
                                            }
                                            marginRight={
                                                tokens.node.separator.marginX
                                            }
                                        />
                                        <Text
                                            fontSize={tokens.node.time.fontSize}
                                            color={tokens.node.time.color}
                                        >
                                            {time}
                                        </Text>
                                    </>
                                )}
                            </>
                        )}
                        {!user && time != null && time !== '' && (
                            <Text
                                fontSize={tokens.node.time.fontSize}
                                color={tokens.node.time.color}
                            >
                                {time}
                            </Text>
                        )}
                    </Block>
                )}
            </Block>
        )
    }
)

TimelineNode.displayName = 'Timeline.Node'

export default TimelineNode
