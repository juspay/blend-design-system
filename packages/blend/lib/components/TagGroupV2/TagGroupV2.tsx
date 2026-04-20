import React, { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import { TagGroupV2Props } from './TagGroupV2.types'

const TagGroupV2 = forwardRef<HTMLDivElement, TagGroupV2Props>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        const totalChildren = React.Children.count(children)

        return (
            <Group
                ref={ref}
                stacked={stacked}
                gap={gap}
                orientation={GroupOrientation.HORIZONTAL}
                alignItems="stretch"
                positionProp="tagGroupPosition"
                aria-label="Tag group"
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

TagGroupV2.displayName = 'TagGroupV2'

export default TagGroupV2
