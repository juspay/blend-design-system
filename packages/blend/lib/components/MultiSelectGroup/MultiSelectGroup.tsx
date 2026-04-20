import { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import type { MultiSelectGroupProps } from './MultiselectGroupProps.types'
// import { flattenChildren } from '../../global-utils/GlobalUtils'

const MultiSelectGroup = forwardRef<HTMLDivElement, MultiSelectGroupProps>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        // const flatChildren = flattenChildren(children)
        // const totalChildren = flatChildren.length
        // console.log(flatChildren,'flatChildren')

        return (
            <Group
                ref={ref}
                stacked={stacked}
                gap={gap}
                orientation={GroupOrientation.HORIZONTAL}
                alignItems="stretch"
                positionProp="multiSelectGroupPosition"
                aria-label="MultiSelect group"
                data-single-select-group="true"
                data-single-select-group-stacked={String(stacked)}
                // data-single-select-group-count={totalChildren}
                {...restProps}
            >
                {children}
            </Group>
        )
    }
)

MultiSelectGroup.displayName = 'MultiSelectGroup'

export default MultiSelectGroup
