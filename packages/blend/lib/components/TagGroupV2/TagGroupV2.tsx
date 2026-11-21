import React, { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import { TagGroupV2Props } from './TagGroupV2.types'
import { useMessages } from '../../i18n/useMessages'
import { DISPLAY_MESSAGES } from '../../i18n/catalog/display.messages'

const TagGroupV2 = forwardRef<HTMLDivElement, TagGroupV2Props>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        const { m } = useMessages(DISPLAY_MESSAGES)
        const totalChildren = React.Children.count(children)

        return (
            <Group
                ref={ref}
                stacked={stacked}
                gap={gap}
                orientation={GroupOrientation.HORIZONTAL}
                alignItems="stretch"
                positionProp="tagGroupPosition"
                aria-label={m('group.a11y.tag-group')}
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
