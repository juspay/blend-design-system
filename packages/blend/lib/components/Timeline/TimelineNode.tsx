import { forwardRef } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import AvatarV2 from '../AvatarV2/AvatarV2'
import { AvatarV2Size } from '../AvatarV2/avatarV2.types'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import { TimelineNodeStatus } from './types'
import type { TimelineNodeProps } from './types'

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
            avatarProps,
            children,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const { node } = tokens
        const dotColor = tokens.statusColors[status]
        const body = text ?? (typeof children === 'string' ? children : null)
        const hasBody = Boolean(
            body || (children && typeof children !== 'string')
        )

        const hasHeaderRow =
            (title != null && title !== '') ||
            headerRightSlot != null ||
            datetimeLeftSlot != null ||
            (datetime != null && datetime !== '') ||
            datetimeRightSlot != null

        return (
            <Block
                ref={ref}
                position="relative"
                paddingLeft={node.paddingLeft}
                marginBottom={node.marginBottom}
                data-timeline-node="true"
                style={{ minWidth: 0 }}
                {...rest}
            >
                <Block
                    position="absolute"
                    left={node.circle.left}
                    top={node.circle.top}
                    width={node.circle.width}
                    height={node.circle.height}
                    borderRadius="50%"
                    backgroundColor={dotColor}
                    flexShrink={0}
                />

                {hasHeaderRow && (
                    <Block
                        display="flex"
                        alignItems="flex-start"
                        justifyContent="space-between"
                        flexWrap="wrap"
                        gap={node.gap}
                        marginBottom={
                            hasBody ? node.text.marginBottom : undefined
                        }
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={node.gap}
                            flexGrow={1}
                            minWidth={0}
                        >
                            {title != null && title !== '' && (
                                <Text
                                    fontSize={node.header.fontSize}
                                    fontWeight={node.header.fontWeight}
                                    color={node.header.color}
                                >
                                    {title}
                                </Text>
                            )}
                            {headerRightSlot != null && (
                                <Block flexShrink={0}>{headerRightSlot}</Block>
                            )}
                        </Block>

                        <Block
                            display="flex"
                            alignItems="center"
                            gap={node.gapSmall}
                            flexShrink={0}
                        >
                            {datetimeLeftSlot != null && (
                                <Block flexShrink={0}>{datetimeLeftSlot}</Block>
                            )}
                            {datetime != null && datetime !== '' && (
                                <Text
                                    fontSize={node.datetime.fontSize}
                                    color={node.datetime.color}
                                >
                                    {datetime}
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

                {hasBody && (
                    <Block
                        marginBottom={
                            user || time ? node.text.marginBottom : undefined
                        }
                        style={{ minWidth: 0 }}
                    >
                        {body != null ? (
                            <Text
                                fontSize={node.text.fontSize}
                                color={node.text.color}
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

                {(user || time) && (
                    <Block
                        display="flex"
                        alignItems="center"
                        marginTop={node.avatar.marginTop}
                    >
                        {user && (
                            <>
                                <AvatarV2
                                    src={user.avatar}
                                    fallbackText={
                                        user.fallbackText ?? user.name
                                    }
                                    size={AvatarV2Size.SM}
                                    width={node.avatar.width}
                                    height={node.avatar.height}
                                    {...avatarProps}
                                />
                                <Text
                                    fontSize={node.user.fontSize}
                                    color={node.user.color}
                                    style={{
                                        marginLeft: node.user
                                            .marginLeft as string,
                                    }}
                                >
                                    {user.name}
                                </Text>
                                {time != null && time !== '' && (
                                    <>
                                        <Block
                                            width={node.separator.width}
                                            height={node.separator.height}
                                            borderRadius="50%"
                                            backgroundColor={
                                                node.separator.color
                                            }
                                            marginLeft={
                                                node.separator.marginLeft
                                            }
                                            marginRight={
                                                node.separator.marginRight
                                            }
                                        />
                                        <Text
                                            fontSize={node.time.fontSize}
                                            color={node.time.color}
                                        >
                                            {time}
                                        </Text>
                                    </>
                                )}
                            </>
                        )}
                        {!user && time != null && time !== '' && (
                            <Text
                                fontSize={node.time.fontSize}
                                color={node.time.color}
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
