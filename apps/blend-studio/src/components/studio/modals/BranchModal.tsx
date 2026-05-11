import type { ReactNode } from 'react'
import {
    Modal,
    ButtonV2,
    ButtonV2Type,
    ButtonV2Size,
} from '@juspay/blend-design-system'

interface BranchModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    subtitle?: string
    children: ReactNode
    cancelText?: string
    confirmText: string
    onConfirm: () => void
    confirmButtonType?: ButtonV2Type
    loading?: boolean
    minWidth?: string
}

export function BranchModal({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    cancelText = 'Cancel',
    confirmText,
    onConfirm,
    confirmButtonType = ButtonV2Type.PRIMARY,
    loading = false,
    minWidth = '520px',
}: BranchModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            subtitle={subtitle}
            showFooter={false}
            minWidth={minWidth}
        >
            <div className="space-y-5">
                {children}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
                    <ButtonV2
                        buttonType={ButtonV2Type.SECONDARY}
                        size={ButtonV2Size.SMALL}
                        text={cancelText}
                        onClick={onClose}
                    />
                    <ButtonV2
                        buttonType={confirmButtonType}
                        size={ButtonV2Size.SMALL}
                        text={confirmText}
                        onClick={onConfirm}
                        loading={loading}
                        disabled={loading}
                    />
                </div>
            </div>
        </Modal>
    )
}
