import { forwardRef, useEffect } from 'react'
import type { View as RNView } from 'react-native'
import { ButtonV2SubType } from '@juspay/blend-design-system/node'
import Button from './Button'
import type { IconButtonNativeProps } from './button.types'

/**
 * Icon-only button — the native port of web's `IconButton`.
 *
 * A thin wrapper over `Button`: the icon renders through `leftSlot` and
 * `subType` is forced to `ICON_ONLY`, which selects the square padding and
 * radius matrices from the BUTTONV2 tokens. No styling of its own.
 *
 * Divergence from web: the forced props are applied **after** the rest
 * spread. Web spreads rest last, so a stray `subType`/`leftSlot` that got
 * past the types could undo the icon-only shape at runtime; here it cannot.
 */

/** One warning per session — the portal.tsx dev-warning pattern. */
let warnedBlankLabel = false

const IconButton = forwardRef<RNView, IconButtonNativeProps>(
    function IconButton({ icon, accessibilityLabel, ...rest }, ref) {
        // Warned from an effect, not during render — a render-phase side
        // effect fires twice under StrictMode and breaks with concurrent
        // rendering (same reasoning as the portal's provider warning).
        useEffect(() => {
            if (
                typeof __DEV__ !== 'undefined' &&
                __DEV__ &&
                !warnedBlankLabel &&
                accessibilityLabel.trim() === ''
            ) {
                warnedBlankLabel = true
                console.warn(
                    '[blend-native] IconButton rendered with a blank ' +
                        'accessibilityLabel. Icon-only buttons have no text ' +
                        'fallback, so screen readers announce nothing.'
                )
            }
        }, [accessibilityLabel])

        return (
            <Button
                {...rest}
                ref={ref}
                subType={ButtonV2SubType.ICON_ONLY}
                text={undefined}
                leftSlot={{ slot: icon }}
                rightSlot={undefined}
                accessibilityLabel={accessibilityLabel}
            />
        )
    }
)

IconButton.displayName = 'IconButton'

export default IconButton
