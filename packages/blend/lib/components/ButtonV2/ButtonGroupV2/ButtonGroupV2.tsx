import React, { forwardRef } from 'react'
import { Group } from '../../Primitives/Group'
import { GroupOrientation } from '../../Primitives/Group/types'
import type { ButtonGroupV2Props } from './buttonGroupV2.types'
import { useMessages } from '../../../i18n/useMessages'
import { DISPLAY_MESSAGES } from '../../../i18n/catalog/display.messages'

const ButtonGroupV2 = forwardRef<HTMLDivElement, ButtonGroupV2Props>(
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
                positionProp="buttonGroupPosition"
                aria-label={m('group.a11y.button-group')}
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

ButtonGroupV2.displayName = 'ButtonGroupV2'

export default ButtonGroupV2
