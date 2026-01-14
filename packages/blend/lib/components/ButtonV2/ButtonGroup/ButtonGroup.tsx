import React, { forwardRef } from 'react'
import { Group } from '../../Primitives/Group'
import { GroupOrientation } from '../../Primitives/Group/types'
import type { ButtonGroupV2Props } from './types'

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupV2Props>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        const totalChildren = React.Children.count(children)

        return (
            <Group
                ref={ref}
                stacked={stacked}
                gap={gap}
                orientation={GroupOrientation.HORIZONTAL}
                alignItems="stretch"
                positionProp="buttonGroupPosition"
                aria-label="Button group"
                data-button-group="true"
                data-button-group-stacked={String(stacked)}
                data-button-group-count={totalChildren}
                {...restProps}
            >
                {children}
            </Group>
        )
    }
)

ButtonGroup.displayName = 'ButtonGroup'

export default ButtonGroup
