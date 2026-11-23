import { forwardRef, type KeyboardEvent as ReactKeyboardEvent } from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import { TimelineNodeStatus } from './types'
import { parsePx, triggerClickFromKeyboard } from './utils'
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
            isSelectable = false,
            isSelected = false,
            onClick,
            onKeyDown: onKeyDownProp,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const { subsection, track, indicator, states } = tokens
        const { connector } = subsection
        const showDot = !isNestedUnderHeader && showIndicator
        const dotColor = tokens.statusColors[TimelineNodeStatus.NEUTRAL]

        const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
            onKeyDownProp?.(event)
            if (isSelectable) triggerClickFromKeyboard(event, onClick)
        }

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
                marginTop={subsection.marginTop}
                marginBottom={subsection.marginBottom}
                marginLeft={subsection.marginLeft}
                paddingRight={subsection.paddingRight}
                paddingTop={subsection.paddingY}
                paddingBottom={subsection.paddingY}
                data-timeline-substep="true"
                role={isSelectable ? 'button' : undefined}
                tabIndex={isSelectable ? 0 : undefined}
                cursor={isSelectable ? 'pointer' : undefined}
                borderRadius={
                    isSelectable || isSelected ? states.borderRadius : undefined
                }
                backgroundColor={
                    isSelected ? states.selected.backgroundColor : undefined
                }
                _hover={
                    isSelectable
                        ? {
                              backgroundColor: isSelected
                                  ? states.selected.backgroundColor
                                  : states.hover.backgroundColor,
                          }
                        : undefined
                }
                _focusVisible={
                    isSelectable
                        ? {
                              backgroundColor:
                                  states.focusVisible.backgroundColor,
                          }
                        : undefined
                }
                {...rest}
                onClick={onClick}
                onKeyDown={handleKeyDown}
            >
                {showDot && (
                    <Block
                        position="absolute"
                        left={
                            parsePx(indicator.left) -
                            parsePx(subsection.marginLeft)
                        }
                        top={parsePx(subsection.paddingY)}
                        width={indicator.width}
                        height={indicator.height}
                        borderRadius="50%"
                        backgroundColor={dotColor}
                        flexShrink={0}
                        zIndex={2}
                    />
                )}

                <Block
                    position="absolute"
                    left={parsePx(track.left) - parsePx(subsection.marginLeft)}
                    top={parsePx(subsection.paddingY)}
                    width={connector.width}
                    height={connector.height}
                    zIndex={2}
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
                            stroke={connector.color}
                            strokeLinecap="round"
                        />
                    </svg>
                </Block>

                <Block>
                    {hasTitleRow && (
                        <Block
                            display="flex"
                            alignItems="flex-end"
                            justifyContent="space-between"
                            flexWrap="wrap"
                            gap={subsection.titleRow.gap}
                        >
                            <Block
                                display="flex"
                                alignItems="center"
                                gap={subsection.title.gap}
                                flexGrow={1}
                                minWidth={0}
                            >
                                <Text
                                    fontSize={subsection.title.fontSize}
                                    fontWeight={subsection.title.fontWeight}
                                    color={subsection.title.color}
                                    style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        minWidth: 0,
                                    }}
                                >
                                    {title}
                                </Text>
                                {rightSlot != null && (
                                    <Block>{rightSlot}</Block>
                                )}
                            </Block>

                            <Block
                                display="flex"
                                alignItems="center"
                                gap={subsection.datetime.gap}
                                flexShrink={0}
                            >
                                {datetimeLeftSlot != null && (
                                    <Block flexShrink={0}>
                                        {datetimeLeftSlot}
                                    </Block>
                                )}
                                {timestamp != null && timestamp !== '' && (
                                    <Text
                                        fontSize={subsection.datetime.fontSize}
                                        color={subsection.datetime.color}
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
                                    ? subsection.description.marginTop
                                    : undefined
                            }
                        >
                            <Text
                                fontSize={subsection.description.fontSize}
                                color={subsection.description.color}
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
