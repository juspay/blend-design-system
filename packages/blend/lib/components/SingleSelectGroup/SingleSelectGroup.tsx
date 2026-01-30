import React, { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import type { SingleSelectGroup } from './SingleSelectGroup.types'
import { flattenChildren } from '../../global-utils/GlobalUtils'

const SingleSelectGroup = forwardRef<HTMLDivElement, SingleSelectGroup>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        const flatChildren = flattenChildren(children)
        const totalChildren = flatChildren.length

        return (
            <Group
                ref={ref}
                stacked={stacked}
                gap={gap}
                orientation={GroupOrientation.HORIZONTAL}
                alignItems="stretch"
                positionProp="singleSelectGroupPosition"
                aria-label="SingleSelect group"
                data-single-select-group="true"
                data-single-select-group-stacked={String(stacked)}
                data-single-select-group-count={totalChildren}
                {...restProps}
            >
                {flatChildren}
            </Group>
        )
    }
)

SingleSelectGroup.displayName = 'SingleSelectGroup'

export default SingleSelectGroup
