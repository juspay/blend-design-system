'use client'

import React, { useState } from 'react'
import {
    Modal,
    Button,
    ButtonType,
    ButtonSize,
    Alert,
    AlertVariant,
} from 'blend-v1'
import { Trash2, AlertTriangle } from 'lucide-react'

interface DeleteCollectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    collection: {
        id: string
        name: string
        is_default: boolean
        token_count: string
    } | null
}

export default function DeleteCollectionModal({
    isOpen,
    onClose,
    onSuccess,
    collection,
}: DeleteCollectionModalProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [error, setError] = useState<string>('')

    const handleDelete = async () => {
        if (!collection) return

        setIsDeleting(true)
        setError('')

        try {
            const response = await fetch(
                `/api/foundation-collections?id=${collection.id}`,
                {
                    method: 'DELETE',
                }
            )

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete collection')
            }

            // Success - close modal and refresh data
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error deleting collection:', error)
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to delete collection'
            )
        } finally {
            setIsDeleting(false)
        }
    }

    const handleClose = () => {
        if (!isDeleting) {
            setError('')
            onClose()
        }
    }

    if (!collection) return null

    const tokenCount = parseInt(collection.token_count)
    const hasTokens = tokenCount > 0
    const isDefault = collection.is_default

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Delete Collection"
            subtitle={`Are you sure you want to delete "${collection.name}"?`}
            showCloseButton={true}
            closeOnBackdropClick={!isDeleting}
            className="w-[500px]"
            primaryAction={{
                text: isDeleting ? 'Deleting...' : 'Delete Collection',
                onClick: handleDelete,
                disabled: isDeleting,
                loading: isDeleting,
                leadingIcon: <Trash2 className="w-4 h-4" />,
                buttonType: ButtonType.SECONDARY,
                size: ButtonSize.MEDIUM,
            }}
            secondaryAction={{
                text: 'Cancel',
                onClick: handleClose,
                disabled: isDeleting,
                buttonType: ButtonType.SECONDARY,
                size: ButtonSize.MEDIUM,
            }}
        >
            <div className="space-y-4">
                {/* Error Alert */}
                {error && (
                    <Alert
                        variant={AlertVariant.ERROR}
                        heading="Error"
                        description={error}
                    />
                )}

                {/* Warning for default collection */}
                {isDefault && hasTokens && (
                    <Alert
                        variant={AlertVariant.WARNING}
                        heading="Cannot Delete Default Collection"
                        description="This is the default collection and contains tokens. Please set another collection as default before deleting this one."
                    />
                )}

                {/* Warning for collection with tokens */}
                {hasTokens && !isDefault && (
                    <Alert
                        variant={AlertVariant.WARNING}
                        heading="Collection Contains Tokens"
                        description={`This collection contains ${tokenCount} token${tokenCount !== 1 ? 's' : ''}. All tokens will be permanently deleted along with the collection.`}
                    />
                )}

                {/* Default collection warning */}
                {isDefault && !hasTokens && (
                    <Alert
                        variant={AlertVariant.WARNING}
                        heading="Default Collection"
                        description="This is the default collection. After deletion, you'll need to set another collection as default."
                    />
                )}

                {/* Confirmation message */}
                <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-1">
                                This action cannot be undone
                            </h4>
                            <p className="text-xs text-gray-600">
                                The collection "{collection.name}" and all its
                                associated data will be permanently removed from
                                the system.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Collection details */}
                <div className="border border-gray-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Collection Details
                    </h4>
                    <div className="space-y-1 text-xs text-gray-600">
                        <div className="flex justify-between">
                            <span>Name:</span>
                            <span className="font-medium">
                                {collection.name}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tokens:</span>
                            <span className="font-medium">{tokenCount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Status:</span>
                            <span className="font-medium">
                                {isDefault
                                    ? 'Default Collection'
                                    : 'Regular Collection'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
