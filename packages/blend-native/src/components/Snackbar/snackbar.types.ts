import type React from 'react'
import type { SnackbarV2Variant } from '@juspay/blend-design-system/node'

/**
 * Options for `addSnackbar` — the native port of web's `addSnackbarV2`.
 *
 * The web implementation is sonner-based; native rides the package's own
 * toast host, so the API is imperative-only and the stack is bottom-only.
 *
 * Deliberately omitted rather than accepted-and-ignored (compile errors):
 *
 * - `position` — the native stack is bottom-centred (documented
 *   divergence); web's six positions need a top outlet first.
 * - `dismissOnClickAway` / `hotkey` — pointer/keyboard concepts.
 * - `maxWidth` / `width` / `minWidth` — the outlet's horizontal insets
 *   govern toast width on a phone.
 */
export type SnackbarAction = {
    label: string
    onPress: () => void
    /** Keep the snackbar open after the action unless explicitly `false`. */
    autoDismiss?: boolean
}

export type SnackbarOptions = {
    /** Stable id replaces an existing snackbar in place. */
    id?: string
    header: string
    description?: string
    variant?: SnackbarV2Variant
    /** Replaces the variant icon. */
    slot?: React.ReactNode
    actionButton?: SnackbarAction
    onClose?: () => void
    /**
     * Auto-dismiss delay in ms. `Infinity` or `null` keeps the snackbar
     * until dismissed. `0` is NOT persistent (web parity — it warns in dev
     * and falls back to the default duration).
     */
    duration?: number | null
    testID?: string
}
