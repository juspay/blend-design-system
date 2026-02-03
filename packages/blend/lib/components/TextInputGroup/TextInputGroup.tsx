import { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import type { TextInputGroupProps } from './TextInputGroupProps.types'
import { flattenChildren } from '../../global-utils/GlobalUtils'

const TextInputGroup = forwardRef<HTMLDivElement, TextInputGroupProps>(
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
                positionProp="textInputGroupPosition"
                aria-label="TextInput group"
                data-text-input-group="true"
                data-text-input-group-stacked={String(stacked)}
                data-text-input-group-count={totalChildren}
                {...restProps}
            >
                {flatChildren}
            </Group>
        )
    }
)

TextInputGroup.displayName = 'TextInputGroup'

export default TextInputGroup
