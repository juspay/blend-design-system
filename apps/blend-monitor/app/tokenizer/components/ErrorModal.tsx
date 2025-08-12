'use client'

import React from 'react'
import {
    Modal,
    Button,
    ButtonType,
    ButtonSize,
    Alert,
    AlertVariant,
} from 'blend-v1'
import { AlertTriangle } from 'lucide-react'

interface ErrorModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    message: string
}

export default function ErrorModal({
    isOpen,
    onClose,
    title,
    message,
}: ErrorModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            showCloseButton={true}
            closeOnBackdropClick={true}
            className="w-[450px]"
            primaryAction={{
                text: 'OK',
                onClick: onClose,
                buttonType: ButtonType.PRIMARY,
                size: ButtonSize.MEDIUM,
            }}
        >
            <div className="space-y-4">
                <Alert
                    variant={AlertVariant.ERROR}
                    heading="Action Not Allowed"
                    description={message}
                />

                <div className="p-4 bg-red-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-medium text-red-900 mb-1">
                                Why can't I delete this collection?
                            </h4>
                            <p className="text-xs text-red-700">
                                Default collections serve as the primary source
                                for design tokens. To delete this collection,
                                first set another collection as the default.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
