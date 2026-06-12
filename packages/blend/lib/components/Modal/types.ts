import type { ReactNode } from 'react'
import type { ButtonProps } from '../Button'
import { SkeletonVariant } from '../Skeleton'

type ModalButtonAction = Omit<ButtonProps, 'buttonGroupPosition'>

type BodySkeletonProps = {
    show?: boolean
    width?: string
    height?: string
}

export type ModalSkeletonProps = {
    show?: boolean
    variant?: SkeletonVariant
    bodySkeletonProps?: BodySkeletonProps
}

export type ModalProps = {
    isOpen: boolean
    isCustom?: boolean
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
    skeleton?: ModalSkeletonProps
    maxWidth?: string
    maxHeight?: string
    minHeight?: string
}
