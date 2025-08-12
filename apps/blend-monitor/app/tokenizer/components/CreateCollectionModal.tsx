'use client'

import React, { useState, useEffect } from 'react'
import {
    Modal,
    Button,
    ButtonType,
    ButtonSize,
    TextInput,
    TextArea,
    Checkbox,
    Alert,
    AlertVariant,
} from 'blend-v1'
import { Plus, AlertTriangle } from 'lucide-react'

interface CreateCollectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSuccess: () => void
    existingCollections: Array<{ name: string; is_default: boolean }>
    currentUser?: { id: string }
}

interface FormData {
    name: string
    description: string
    is_active: boolean
    is_default: boolean
}

interface FormErrors {
    name?: string
    description?: string
    general?: string
}

export default function CreateCollectionModal({
    isOpen,
    onClose,
    onSuccess,
    existingCollections,
    currentUser,
}: CreateCollectionModalProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        is_active: true,
        is_default: false,
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showDefaultWarning, setShowDefaultWarning] = useState(false)

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: '',
                description: '',
                is_active: true,
                is_default: false,
            })
            setErrors({})
            setShowDefaultWarning(false)
        }
    }, [isOpen])

    // Show warning when setting as default
    useEffect(() => {
        const hasExistingDefault = existingCollections.some(
            (col) => col.is_default
        )
        setShowDefaultWarning(formData.is_default && hasExistingDefault)
    }, [formData.is_default, existingCollections])

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Collection name is required'
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Collection name must be at least 2 characters'
        } else if (formData.name.trim().length > 100) {
            newErrors.name = 'Collection name must be less than 100 characters'
        } else if (
            existingCollections.some(
                (col) =>
                    col.name.toLowerCase() ===
                    formData.name.trim().toLowerCase()
            )
        ) {
            newErrors.name = 'A collection with this name already exists'
        }

        // Description validation
        if (formData.description.trim().length > 500) {
            newErrors.description =
                'Description must be less than 500 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async () => {
        if (!validateForm()) {
            return
        }

        if (!currentUser?.id) {
            setErrors({ general: 'User authentication required' })
            return
        }

        setIsSubmitting(true)
        setErrors({})

        try {
            const response = await fetch('/api/foundation-collections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name.trim(),
                    description: formData.description.trim() || null,
                    is_active: formData.is_active,
                    is_default: formData.is_default,
                    created_by: currentUser.id,
                }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Failed to create collection')
            }

            // Success - close modal and refresh data
            onSuccess()
            onClose()
        } catch (error) {
            console.error('Error creating collection:', error)
            setErrors({
                general:
                    error instanceof Error
                        ? error.message
                        : 'Failed to create collection',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleInputChange = (
        field: keyof FormData,
        value: string | boolean
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Clear field-specific errors when user starts typing
        if (errors[field as keyof FormErrors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    const isFormValid =
        formData.name.trim().length >= 2 &&
        formData.name.trim().length <= 100 &&
        formData.description.trim().length <= 500 &&
        !existingCollections.some(
            (col) =>
                col.name.toLowerCase() === formData.name.trim().toLowerCase()
        )

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Foundation Collection"
            subtitle="Create a new collection to organize your foundation design tokens"
            showCloseButton={true}
            closeOnBackdropClick={!isSubmitting}
            className="w-[600px] max-h-[80vh]"
            primaryAction={{
                text: isSubmitting ? 'Creating...' : 'Create Collection',
                onClick: handleSubmit,
                disabled: isSubmitting || !isFormValid,
                loading: isSubmitting,
                leadingIcon: <Plus className="w-4 h-4" />,
                buttonType: ButtonType.PRIMARY,
                size: ButtonSize.MEDIUM,
            }}
            secondaryAction={{
                text: 'Cancel',
                onClick: onClose,
                disabled: isSubmitting,
                buttonType: ButtonType.SECONDARY,
                size: ButtonSize.MEDIUM,
            }}
        >
            <div className="space-y-6">
                {/* General Error */}
                {errors.general && (
                    <Alert
                        variant={AlertVariant.ERROR}
                        heading="Error"
                        description={errors.general}
                    />
                )}

                {/* Default Warning */}
                {showDefaultWarning && (
                    <Alert
                        variant={AlertVariant.WARNING}
                        heading="Default Collection"
                        description="Setting this as the default collection will unset the current default collection."
                    />
                )}

                {/* Collection Name */}
                <div className="space-y-2">
                    <TextInput
                        label="Collection Name"
                        placeholder="e.g., Brand Colors, Custom Theme"
                        value={formData.name}
                        onChange={(value) =>
                            handleInputChange(
                                'name',
                                typeof value === 'string'
                                    ? value
                                    : value.target.value
                            )
                        }
                        error={!!errors.name}
                        errorMessage={errors.name}
                        required
                        disabled={isSubmitting}
                        maxLength={100}
                    />
                    <p className="text-xs text-gray-500">
                        Choose a descriptive name for your token collection
                    </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <TextArea
                        label="Description"
                        placeholder="Describe the purpose and usage of this collection..."
                        value={formData.description}
                        onChange={(value) =>
                            handleInputChange(
                                'description',
                                typeof value === 'string'
                                    ? value
                                    : value.target.value
                            )
                        }
                        error={!!errors.description}
                        errorMessage={errors.description}
                        disabled={isSubmitting}
                        rows={3}
                        maxLength={500}
                    />
                    <p className="text-xs text-gray-500">
                        Optional description to help team members understand
                        this collection's purpose
                    </p>
                </div>

                {/* Settings */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Collection Settings
                    </h3>

                    <div className="space-y-3">
                        <Checkbox
                            checked={formData.is_active}
                            onCheckedChange={(checked) =>
                                handleInputChange('is_active', checked === true)
                            }
                            disabled={isSubmitting}
                        >
                            <div className="ml-2">
                                <div className="text-sm font-medium text-gray-900">
                                    Active Collection
                                </div>
                                <div className="text-xs text-gray-500">
                                    Active collections are available for use and
                                    export
                                </div>
                            </div>
                        </Checkbox>

                        <Checkbox
                            checked={formData.is_default}
                            onCheckedChange={(checked) =>
                                handleInputChange(
                                    'is_default',
                                    checked === true
                                )
                            }
                            disabled={isSubmitting}
                        >
                            <div className="ml-2">
                                <div className="text-sm font-medium text-gray-900">
                                    Set as Default
                                </div>
                                <div className="text-xs text-gray-500">
                                    The default collection is used as the
                                    primary token source
                                </div>
                            </div>
                        </Checkbox>
                    </div>
                </div>

                {/* Collection Info */}
                <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">
                        What happens next?
                    </h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                        <li>
                            • Your collection will be created and ready for
                            tokens
                        </li>
                        <li>
                            • You can add foundation tokens through the token
                            editor
                        </li>
                        <li>
                            • The collection will appear in your collections
                            list
                        </li>
                        <li>• You can modify settings later if needed</li>
                    </ul>
                </div>
            </div>
        </Modal>
    )
}
