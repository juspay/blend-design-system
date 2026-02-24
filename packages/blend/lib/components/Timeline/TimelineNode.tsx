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
        const { subsection, indicator } = tokens
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
                paddingLeft={subsection.paddingLeft}
                marginBottom={subsection.marginBottom}
                data-timeline-node="true"
                style={{ minWidth: 0 }}
                {...rest}
            >
                <Block
                    position="absolute"
                    left={indicator.left}
                    top={subsection.rootIndicator.top}
                    width={indicator.width}
                    height={indicator.height}
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
                        gap={subsection.headerRow.gap}
                        marginBottom={
                            hasBody
                                ? subsection.description.marginBottom
                                : undefined
                        }
                    >
                        <Block
                            display="flex"
                            alignItems="center"
                            gap={subsection.headerRow.gap}
                            flexGrow={1}
                            minWidth={0}
                        >
                            {title != null && title !== '' && (
                                <Text
                                    fontSize={subsection.title.fontSize}
                                    fontWeight={subsection.title.fontWeight}
                                    color={subsection.title.color}
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
                            gap={subsection.datetimeGroup.gap}
                            flexShrink={0}
                        >
                            {datetimeLeftSlot != null && (
                                <Block flexShrink={0}>{datetimeLeftSlot}</Block>
                            )}
                            {datetime != null && datetime !== '' && (
                                <Text
                                    fontSize={subsection.datetime.fontSize}
                                    color={subsection.datetime.color}
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
                            user || time
                                ? subsection.description.marginBottom
                                : undefined
                        }
                        style={{ minWidth: 0 }}
                    >
                        {body != null ? (
                            <Text
                                fontSize={subsection.description.fontSize}
                                color={subsection.description.color}
                                // lineHeight={subsection.description.lineHeight}
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
                        marginTop={subsection.avatar.marginTop}
                    >
                        {user && (
                            <>
                                <AvatarV2
                                    src={user.avatar}
                                    fallbackText={
                                        user.fallbackText ?? user.name
                                    }
                                    size={AvatarV2Size.SM}
                                    width={subsection.avatar.width}
                                    height={subsection.avatar.height}
                                    {...avatarProps}
                                />
                                <Text
                                    fontSize={subsection.user.fontSize}
                                    color={subsection.user.color}
                                    style={{
                                        marginLeft: subsection.user
                                            .marginLeft as string,
                                    }}
                                >
                                    {user.name}
                                </Text>
                                {time != null && time !== '' && (
                                    <>
                                        <Block
                                            width={subsection.separator.width}
                                            height={subsection.separator.height}
                                            borderRadius="50%"
                                            backgroundColor={
                                                subsection.separator.color
                                            }
                                            marginLeft={
                                                subsection.separator.marginLeft
                                            }
                                            marginRight={
                                                subsection.separator.marginRight
                                            }
                                        />
                                        <Text
                                            fontSize={subsection.time.fontSize}
                                            color={subsection.time.color}
                                        >
                                            {time}
                                        </Text>
                                    </>
                                )}
                            </>
                        )}
                        {!user && time != null && time !== '' && (
                            <Text
                                fontSize={subsection.time.fontSize}
                                color={subsection.time.color}
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
