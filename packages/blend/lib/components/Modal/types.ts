import type { ReactNode } from 'react'
import type { ButtonProps } from '../Button'

type ModalButtonAction = Omit<ButtonProps, 'buttonGroupPosition'>

export type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title?: string
    subtitle?: string
    children: ReactNode
    primaryAction?: ModalButtonAction
    secondaryAction?: ModalButtonAction
    showCloseButton?: boolean
    showHeader?: boolean
    showFooter?: boolean
    closeOnBackdropClick?: boolean
    customHeader?: ReactNode
    customFooter?: ReactNode
    headerRightSlot?: ReactNode
    showDivider?: boolean
    minWidth?: string
    useDrawerOnMobile?: boolean
}
