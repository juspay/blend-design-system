import { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import type { SingleSelectGroupProps } from './SingleSelectGroupProps.types'
import { flattenChildren } from '../../global-utils/GlobalUtils'
import { useMessages } from '../../i18n/useMessages'
import { DISPLAY_MESSAGES } from '../../i18n/catalog/display.messages'

const SingleSelectGroup = forwardRef<HTMLDivElement, SingleSelectGroupProps>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        const { m } = useMessages(DISPLAY_MESSAGES)
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
                aria-label={m('group.a11y.single-select-group')}
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
