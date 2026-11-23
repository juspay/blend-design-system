import {
    forwardRef,
    Children,
    cloneElement,
    isValidElement,
    type KeyboardEvent as ReactKeyboardEvent,
} from 'react'
import Block from '../Primitives/Block/Block'
import Text from '../Text/Text'
import { useResponsiveTokens } from '../../hooks/useResponsiveTokens'
import { TimelineTokensType } from './timeline.token'
import { TimelineNodeStatus } from './types'
import { triggerClickFromKeyboard } from './utils'
import TimelineSubstep from './TimelineSubstep'
import type { TimelineHeaderProps } from './types'

const TimelineHeader = forwardRef<HTMLDivElement, TimelineHeaderProps>(
    (
        {
            title,
            status = TimelineNodeStatus.NEUTRAL,
            timestamp,
            children,
            leftSlot,
            rightSlot,
            isSelectable = false,
            isSelected = false,
            onClick,
            onKeyDown: onKeyDownProp,
            ...rest
        },
        ref
    ) => {
        const tokens = useResponsiveTokens<TimelineTokensType>('TIMELINE')
        const { header, indicator, states } = tokens
        const dotColor = tokens.statusColors[status]

        // When selectable, the header row is the interactive target: hover,
        // click and keyboard activation apply to the row only so nested
        // substeps keep their own individual states.
        const rootProps = isSelectable
            ? rest
            : { ...rest, onClick, onKeyDown: onKeyDownProp }

        const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
            onKeyDownProp?.(event)
            if (isSelectable) triggerClickFromKeyboard(event, onClick)
        }

        const showStateBackground = isSelectable || isSelected

        const childrenWithNestedFlag = children
            ? Children.map(children, (child) =>
                  isValidElement(child) && child.type === TimelineSubstep
                      ? cloneElement(child, {
                            isNestedUnderHeader: true,
                        } as { isNestedUnderHeader: boolean })
                      : child
              )
            : null

        return (
            <Block
                ref={ref}
                position="relative"
                marginBottom={
                    children ? undefined : header.section.marginBottom
                }
                data-timeline-header="true"
                {...rootProps}
            >
                <Block
                    position="relative"
                    display="flex"
                    alignItems="center"
                    paddingLeft={header.row.paddingLeft}
                    paddingRight={header.row.paddingRight}
                    paddingTop={header.row.paddingY}
                    paddingBottom={header.row.paddingY}
                    marginBottom={
                        children ? header.row.marginBottom : undefined
                    }
                    data-timeline-header-row="true"
                    role={isSelectable ? 'button' : undefined}
                    tabIndex={isSelectable ? 0 : undefined}
                    cursor={isSelectable ? 'pointer' : undefined}
                    borderRadius={
                        showStateBackground ? states.borderRadius : undefined
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
                    onClick={isSelectable ? onClick : undefined}
                    onKeyDown={isSelectable ? handleKeyDown : undefined}
                >
                    <Block
                        position="absolute"
                        left={indicator.left}
                        top="50%"
                        style={{ transform: 'translateY(-50%)' }}
                        width={indicator.width}
                        height={indicator.height}
                        borderRadius="50%"
                        backgroundColor={dotColor}
                        flexShrink={0}
                        zIndex={2}
                    />

                    {leftSlot && (
                        <Block flexShrink={0} marginRight={header.row.gap}>
                            {leftSlot}
                        </Block>
                    )}

                    <Text
                        fontSize={header.title.fontSize}
                        fontWeight={header.title.fontWeight}
                        color={header.title.color}
                        style={{ flexGrow: 1 }}
                    >
                        {title}
                    </Text>

                    <Block
                        display="flex"
                        alignItems="center"
                        gap={header.timestamp.gap}
                        flexShrink={0}
                        marginLeft="auto"
                        paddingLeft={header.row.gap}
                    >
                        {timestamp != null && timestamp !== '' && (
                            <Text
                                fontSize={header.timestamp.fontSize}
                                color={header.timestamp.color}
                            >
                                {timestamp}
                            </Text>
                        )}
                        {rightSlot != null && (
                            <Block flexShrink={0}>{rightSlot}</Block>
                        )}
                    </Block>
                </Block>

                {childrenWithNestedFlag ? (
                    <Block
                        paddingLeft={0}
                        marginBottom={header.section.marginBottom}
                    >
                        {childrenWithNestedFlag}
                    </Block>
                ) : null}
            </Block>
        )
    }
)

TimelineHeader.displayName = 'Timeline.Header'

export default TimelineHeader
