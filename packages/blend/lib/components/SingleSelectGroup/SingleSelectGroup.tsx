import React, { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import type { SingleSelectGroup } from './SingleSelectGroup.types'

const SingleSelectGroup = forwardRef<HTMLDivElement, SingleSelectGroup>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        const totalChildren = React.Children.count(children)

        return (
            <Group
                ref={ref}
                stacked={stacked}
                gap={gap}
                orientation={GroupOrientation.HORIZONTAL}
                alignItems="stretch"
                positionProp="singleSelectGroupPosition"
                aria-label="SingleSelect group"
                data-tag-group="true"
                data-tag-group-stacked={String(stacked)}
                data-tag-group-count={totalChildren}
                {...restProps}
            >
                {children}
            </Group>
        )
    }
)

SingleSelectGroup.displayName = 'SingleSelectGroup'

export default SingleSelectGroup
