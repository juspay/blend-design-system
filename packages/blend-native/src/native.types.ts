import type { ButtonBaseProps } from '@juspay/blend-design-system/node'

/**
 * Props for the native Button.
 *
 * Extends the web `ButtonBaseProps` (buttonType, size, subType, text, slots,
 * loading, state, width, etc.) but replaces DOM-specific event/html props with
 * RN-equivalent ones.
 *
 * - `onPress` replaces `onClick` (RN `Pressable` API).
 * - `disabled`, `testID`, `accessibilityLabel` are native-standard props.
 * - `justifyContent` is kept because the web component exposes it for
 *   leading/trailing slot alignment.
 */
export type ButtonNativeProps = ButtonBaseProps & {
    /** Called when the button is pressed (replaces web `onClick`). */
    onPress?: () => void
    /** Disables interaction and applies disabled tokens. */
    disabled?: boolean
    /** RN test ID (replaces web `data-testid`). */
    testID?: string
    /** Accessible label for screen readers. */
    accessibilityLabel?: string
    /** Flex alignment along the main axis — used for slot layout. */
    justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
}
