import { forwardRef } from 'react'
import type { View as RNView } from 'react-native'
import Button from './Button'
import type { LinkButtonNativeProps } from './button.types'

/**
 * Link-styled button — the native port of web's `LinkButton`.
 *
 * On web this is a parallel anchor implementation of the whole ButtonV2
 * style pipeline; on RN there is no anchor, so it is `Button` with
 * `accessibilityRole="link"`. Same BUTTONV2 tokens, every subType including
 * INLINE, no styling of its own.
 *
 * The role is passed through `Button`'s rest spread, which lands after its
 * explicit `accessibilityRole="button"` — the render test pins that order.
 */
const LinkButton = forwardRef<RNView, LinkButtonNativeProps>(
    function LinkButton(props, ref) {
        return <Button {...props} ref={ref} accessibilityRole="link" />
    }
)

LinkButton.displayName = 'LinkButton'

export default LinkButton
