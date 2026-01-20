import React, { forwardRef, Children, ReactElement } from 'react'
import Block from '../Block/Block'
import type { GroupProps } from './types'
import { GroupOrientation } from './types'
import { getGroupPosition, getGroupGap } from './utils'
const Group = forwardRef<HTMLDivElement, GroupProps>(
    (
        {
            children,
            stacked = false,
            orientation = GroupOrientation.HORIZONTAL,
            gap,
            alignItems = 'stretch',
            justifyContent,
            flexWrap = 'nowrap',
            role = 'group',
            'aria-label': ariaLabel,
            positionProp = 'groupPosition',
            ...restProps
        },
        ref
    ) => {
        const totalChildren = Children.count(children)
        const groupGap = getGroupGap(stacked, gap, orientation)
        const flexDirection =
            orientation === GroupOrientation.VERTICAL ? 'column' : 'row'

        if (!stacked) {
            return (
                <Block
                    ref={ref}
                    display="flex"
                    flexDirection={flexDirection}
                    alignItems={alignItems}
                    justifyContent={justifyContent}
                    flexWrap={flexWrap}
                    gap={groupGap}
                    role={role}
                    aria-label={ariaLabel}
                    data-group="true"
                    data-group-stacked="false"
                    data-group-orientation={orientation}
                    data-group-count={totalChildren}
                    {...restProps}
                >
                    {children}
                </Block>
            )
        }

        return (
            <Block
                ref={ref}
                display="flex"
                flexDirection={flexDirection}
                alignItems={alignItems}
                justifyContent={justifyContent}
                flexWrap={flexWrap}
                gap={groupGap}
                role={role}
                aria-label={ariaLabel}
                data-group="true"
                data-group-stacked="true"
                data-group-orientation={orientation}
                data-group-count={totalChildren}
                {...restProps}
            >
                {Children.map(children, (child, index) => {
                    if (!React.isValidElement(child)) return child

                    const position = getGroupPosition(
                        index,
                        totalChildren,
                        orientation
                    )

                    return React.cloneElement(
                        child as ReactElement<Record<string, unknown>>,
                        {
                            ...(child.props ?? {}),
                            key: child.key ?? index,
                            [positionProp]: position,
                        }
                    )
                })}
            </Block>
        )
    }
)

Group.displayName = 'Group'

export default Group
