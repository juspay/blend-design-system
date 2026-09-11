/**
 * Leaf module for the platform-neutral modal base props.
 *
 * `modalV2.types.ts` re-exports this, so web consumers are unaffected — but
 * `lib/node.ts` imports THIS file: `modalV2.types.ts` pulls the ButtonV2
 * and Skeleton barrels whose import graphs reach DOM-typed runtime modules,
 * which the React-free node entry must never see.
 */
export type ModalBaseProps = {
    isOpen: boolean
    onClose: () => void
    title?: string
    subtitle?: string
    showCloseButton?: boolean
    showHeader?: boolean
    showFooter?: boolean
    closeOnBackdropClick?: boolean
    showDivider?: boolean
}
