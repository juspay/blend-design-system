import { memo } from 'react'
import type { ViewStyle } from 'react-native'
import { X } from 'lucide-react-native'
import { Pressable } from '../../primitives/Pressable'
import { Slot } from '../../primitives/Slot'
import type { AlertCloseButton } from './alert.types'

/**
 * `Alert`'s close affordance.
 *
 * Renders lucide's `X` by default; a consumer icon supplied via
 * `closeButton.icon` goes through `Slot` so it is tinted the same way.
 *
 * The control is smaller than the 44pt minimum tap target, so it relies on the
 * `hitSlop` `Pressable` applies automatically.
 */

export type AlertCloseProps = {
    closeButton: AlertCloseButton
    color: string
    size: number
    alignSelf: ViewStyle['alignSelf']
    testID?: string
}

function AlertCloseImpl({
    closeButton,
    color,
    size,
    alignSelf,
    testID,
}: AlertCloseProps) {
    return (
        <Pressable
            onPress={closeButton.onPress}
            accessibilityRole="button"
            accessibilityLabel={closeButton.accessibilityLabel ?? 'Close'}
            testID={testID}
            alignSelf={alignSelf}
            alignItems="center"
            justifyContent="center"
        >
            {closeButton.icon ? (
                <Slot color={color}>{closeButton.icon}</Slot>
            ) : (
                <X size={size} color={color} />
            )}
        </Pressable>
    )
}

export const AlertClose = memo(AlertCloseImpl)
AlertClose.displayName = 'AlertClose'
