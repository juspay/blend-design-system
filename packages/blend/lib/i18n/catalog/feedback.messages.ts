/**
 * Strings for Alert/AlertV2, Snackbar/SnackbarV2, Spinner and Skeleton.
 *
 * `{label}` in `alert.a11y.action` is the consumer's own action label.
 *
 * Zero imports, so this module stays tree-shakable in isolation.
 */
export const FEEDBACK_MESSAGES = {
    'alert.a11y.close': 'Close',
    'alert.a11y.action': '{label} action',
    'snackbar.a11y.close': 'Close notification',
    'spinner.label.loading': 'Loading',
    'skeleton.a11y.loading': 'Loading content',
    // SkeletonCard's placeholder buttons: invisible, but still in the
    // accessibility tree as disabled buttons.
    'skeleton.label.cancel': 'Cancel',
    'skeleton.label.confirm': 'Confirm',
} as const
