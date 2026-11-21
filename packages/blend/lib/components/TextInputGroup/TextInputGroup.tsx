import { forwardRef } from 'react'
import { Group } from '../Primitives/Group'
import { GroupOrientation } from '../Primitives/Group/types'
import type { TextInputGroupProps } from './TextInputGroupProps.types'
import { flattenChildren } from '../../global-utils/GlobalUtils'
import { useMessages } from '../../i18n/useMessages'
import { INPUT_MESSAGES } from '../../i18n/catalog/input.messages'

const TextInputGroup = forwardRef<HTMLDivElement, TextInputGroupProps>(
    ({ stacked = false, gap, children, ...restProps }, ref) => {
        const { m } = useMessages(INPUT_MESSAGES)
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
                aria-label={m('input.a11y.text-input-group')}
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

/** TextInputGroup owns layout/position composition only; it has no component-local color, border, background, or theme tokens, so it is excluded from the per-component dark-theme retrofit. */
TextInputGroup.displayName = 'TextInputGroup'

export default TextInputGroup
