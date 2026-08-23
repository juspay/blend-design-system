import {
    AlertV2ActionPosition,
    type AlertV2TokensType,
} from '@juspay/blend-design-system/node'
import type { ViewStyle } from 'react-native'

/**
 * Native Alert layout helpers.
 *
 * Web computes these inline in the JSX of `AlertV2.tsx`. Pulling them out
 * makes the branching testable, and keeps the component readable given that
 * one prop reshapes four layout values at once.
 */

export type AlertLayout = {
    /** Direction the text block and actions flow in. */
    contentDirection: NonNullable<ViewStyle['flexDirection']>
    contentJustify: NonNullable<ViewStyle['justifyContent']>
    contentAlign: NonNullable<ViewStyle['alignItems']>
    /** Vertical alignment of the close button against the content. */
    closeAlign: NonNullable<ViewStyle['alignItems']>
}

/**
 * Resolve the layout for an action position.
 *
 * `BOTTOM` stacks the actions beneath the text and pins the close button to
 * the top; `RIGHT` runs everything on one line, vertically centred. Mirrors
 * the `actionPlacementBottom` branches in web `AlertV2.tsx`.
 */
export function getAlertLayout(position: AlertV2ActionPosition): AlertLayout {
    const isBottom = position === AlertV2ActionPosition.BOTTOM

    return {
        contentDirection: isBottom ? 'column' : 'row',
        contentJustify: isBottom ? 'space-between' : 'flex-start',
        contentAlign: isBottom ? 'flex-start' : 'center',
        closeAlign: isBottom ? 'flex-start' : 'center',
    }
}

/**
 * Whether to render the divider between the actions and the close button.
 *
 * Web's condition is `position === RIGHT && closeButton.show` — the separator
 * only makes sense when both sit on the same line. Extracted because the
 * two-term condition is easy to get subtly wrong, and it has a truth table
 * in the tests.
 */
export function shouldShowSeparator(
    position: AlertV2ActionPosition,
    closeButtonShown: boolean
): boolean {
    return position === AlertV2ActionPosition.RIGHT && closeButtonShown
}

/**
 * Resolve the accessible name for an action.
 * Mirrors web's `aria-label={`${action.text} action`}`.
 */
export function getActionAccessibilityLabel(
    text: string,
    override?: string
): string {
    return override ?? `${text} action`
}

/** Numeric size for the close icon, from the same token web uses. */
export function getCloseIconSize(tokens: AlertV2TokensType): number {
    const raw = tokens.mainContainer.closeButton.height
    const parsed =
        typeof raw === 'number' ? raw : Number.parseFloat(String(raw))
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 16
}
