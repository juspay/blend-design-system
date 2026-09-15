import { forwardRef } from 'react'
import type { ReactElement } from 'react'
import type { View as RNView, StyleProp, ViewStyle } from 'react-native'
import GroupView from '../shared/GroupView'
import type { ButtonNativeProps } from './button.types'

/**
 * Container for a row of Buttons — the native port of web's `ButtonGroupV2`.
 *
 * `stacked` joins members edge to edge and injects each child's
 * `buttonGroupPosition`; the Button itself collapses its radius
 * (`getButtonV2BorderRadius`) and shared borders (`groupBorderWidths`) from
 * that prop, exactly as when the prop is set by hand. Non-stacked renders a
 * spaced row and injects nothing — same as web.
 *
 * IconButton members work (their props keep `buttonGroupPosition`);
 * LinkButton members do not (no group support, matching web).
 */
export type ButtonGroupNativeProps = {
    /** Join members edge to edge, collapsing shared radii and borders. */
    stacked?: boolean
    /** Space between members when not stacked. Defaults to the web gap. */
    gap?: number | string
    children:
        | ReactElement<ButtonNativeProps>
        | ReactElement<ButtonNativeProps>[]
    /** Container label; the members stay individually reachable. */
    accessibilityLabel?: string
    testID?: string
    style?: StyleProp<ViewStyle>
}

const ButtonGroup = forwardRef<RNView, ButtonGroupNativeProps>(
    function ButtonGroup(
        { accessibilityLabel = 'Button group', ...rest },
        ref
    ) {
        return (
            <GroupView
                {...rest}
                ref={ref}
                positionProp="buttonGroupPosition"
                accessibilityLabel={accessibilityLabel}
            />
        )
    }
)

ButtonGroup.displayName = 'ButtonGroup'

export default ButtonGroup
