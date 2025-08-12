'use client'

import React, { useState, useEffect } from 'react'
import {
    Modal,
    Button,
    ButtonType,
    ButtonSize,
    SingleSelect,
    Tag,
    TagVariant,
    TagColor,
    TagSize,
    Checkbox,
} from 'blend-v1'
import { Download, FileText, Code, Palette } from 'lucide-react'

interface ExportModalProps {
    isOpen: boolean
    onClose: () => void
    collections: any[]
    componentCollections: any[]
    availableCategories: string[]
    availableComponents: string[]
}

interface ExportOptions {
    format: 'json' | 'css' | 'scss' | 'js' | 'dtcg'
    includeFoundation: boolean
    includeComponents: boolean
    foundationCollections: string[]
    componentCollections: string[]
    categories: string[]
    components: string[]
    includeInactive: boolean
}

const formatOptions = [
    {
        groupLabel: 'Export Formats',
        items: [
            {
                label: 'JSON',
                value: 'json',
                description: 'Structured data for programmatic use',
            },
            {
                label: 'CSS Custom Properties',
                value: 'css',
                description: 'For direct CSS integration',
            },
            {
                label: 'SCSS Variables',
                value: 'scss',
                description: 'For Sass/SCSS workflows',
            },
            {
                label: 'JavaScript/TypeScript',
                value: 'js',
                description: 'For JS frameworks',
            },
            {
                label: 'DTCG Format',
                value: 'dtcg',
                description: 'Design Token Community Group standard',
            },
        ],
    },
]

const FormatIcon = ({ format }: { format: string }) => {
    switch (format) {
        case 'json':
            return <FileText className="w-4 h-4" />
        case 'css':
        case 'scss':
            return <Palette className="w-4 h-4" />
        case 'js':
        case 'dtcg':
            return <Code className="w-4 h-4" />
        default:
            return <FileText className="w-4 h-4" />
    }
}

export default function ExportModal({
    isOpen,
    onClose,
    collections,
    componentCollections,
    availableCategories,
    availableComponents,
}: ExportModalProps) {
    const [exportOptions, setExportOptions] = useState<ExportOptions>({
        format: 'json',
        includeFoundation: true,
        includeComponents: true,
        foundationCollections: [],
        componentCollections: [],
        categories: [],
        components: [],
        includeInactive: false,
    })

    const [isExporting, setIsExporting] = useState(false)

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setExportOptions({
                format: 'json',
                includeFoundation: true,
                includeComponents: true,
                foundationCollections: [],
                componentCollections: [],
                categories: [],
                components: [],
                includeInactive: false,
            })
        }
    }, [isOpen])

    const handleExport = async () => {
        try {
            setIsExporting(true)

            const response = await fetch('/api/tokens/export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    format: exportOptions.format,
                    options: exportOptions,
                    delivery: 'download',
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Export failed')
            }

            // Trigger download (client-side only)
            if (typeof window !== 'undefined') {
                const blob = await response.blob()
                const url = window.URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.style.display = 'none'
                a.href = url

                // Get filename from response headers
                const contentDisposition = response.headers.get(
                    'content-disposition'
                )
                const filename = contentDisposition
                    ? contentDisposition
                          .split('filename=')[1]
                          ?.replace(/"/g, '')
                    : `blend-tokens-${new Date().toISOString().split('T')[0]}.${exportOptions.format}`

                a.download = filename
                document.body.appendChild(a)
                a.click()
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
            }

            onClose()
        } catch (error) {
            console.error('Export error:', error)
            alert(
                `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        } finally {
            setIsExporting(false)
        }
    }

    const toggleFoundationCollection = (collectionName: string) => {
        setExportOptions((prev) => ({
            ...prev,
            foundationCollections: prev.foundationCollections.includes(
                collectionName
            )
                ? prev.foundationCollections.filter(
                      (name) => name !== collectionName
                  )
                : [...prev.foundationCollections, collectionName],
        }))
    }

    const toggleComponentCollection = (collectionName: string) => {
        setExportOptions((prev) => ({
            ...prev,
            componentCollections: prev.componentCollections.includes(
                collectionName
            )
                ? prev.componentCollections.filter(
                      (name) => name !== collectionName
                  )
                : [...prev.componentCollections, collectionName],
        }))
    }

    const toggleCategory = (category: string) => {
        setExportOptions((prev) => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter((cat) => cat !== category)
                : [...prev.categories, category],
        }))
    }

    const toggleComponent = (component: string) => {
        setExportOptions((prev) => ({
            ...prev,
            components: prev.components.includes(component)
                ? prev.components.filter((comp) => comp !== component)
                : [...prev.components, component],
        }))
    }

    const isExportDisabled =
        !exportOptions.includeFoundation && !exportOptions.includeComponents

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Export Tokens"
            subtitle="Configure your token export settings"
            showCloseButton={true}
            closeOnBackdropClick={true}
            className="w-[900px] max-h-[90vh]"
            primaryAction={{
                text: isExporting ? 'Exporting...' : 'Export',
                onClick: handleExport,
                disabled: isExporting || isExportDisabled,
                loading: isExporting,
                leadingIcon: <Download className="w-4 h-4" />,
                buttonType: ButtonType.PRIMARY,
                size: ButtonSize.MEDIUM,
            }}
            secondaryAction={{
                text: 'Cancel',
                onClick: onClose,
                disabled: isExporting,
                buttonType: ButtonType.SECONDARY,
                size: ButtonSize.MEDIUM,
            }}
        >
            <div className="space-y-8">
                {/* Export Format Section */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            Export Format
                        </h3>
                        <p className="text-xs text-gray-500">
                            Choose the format for your exported tokens
                        </p>
                    </div>
                    <SingleSelect
                        label=""
                        placeholder="Select format"
                        items={formatOptions}
                        selected={exportOptions.format}
                        onSelect={(value) =>
                            setExportOptions((prev) => ({
                                ...prev,
                                format: value as any,
                            }))
                        }
                    />
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                        <FormatIcon format={exportOptions.format} />
                        <span className="text-sm text-gray-600">
                            {
                                formatOptions[0].items.find(
                                    (item) =>
                                        item.value === exportOptions.format
                                )?.description
                            }
                        </span>
                    </div>
                </div>

                {/* Token Types Section */}
                <div className="space-y-4">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">
                            Token Types
                        </h3>
                        <p className="text-xs text-gray-500">
                            Select which types of tokens to include
                        </p>
                    </div>
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <Checkbox
                            checked={exportOptions.includeFoundation}
                            onCheckedChange={(checked) =>
                                setExportOptions((prev) => ({
                                    ...prev,
                                    includeFoundation: checked === true,
                                }))
                            }
                        >
                            <div className="ml-2">
                                <div className="text-sm font-medium text-gray-900">
                                    Foundation Tokens
                                </div>
                                <div className="text-xs text-gray-500">
                                    Core design tokens (colors, spacing,
                                    typography)
                                </div>
                            </div>
                        </Checkbox>
                        <Checkbox
                            checked={exportOptions.includeComponents}
                            onCheckedChange={(checked) =>
                                setExportOptions((prev) => ({
                                    ...prev,
                                    includeComponents: checked === true,
                                }))
                            }
                        >
                            <div className="ml-2">
                                <div className="text-sm font-medium text-gray-900">
                                    Component Tokens
                                </div>
                                <div className="text-xs text-gray-500">
                                    Component-specific design tokens
                                </div>
                            </div>
                        </Checkbox>
                        <Checkbox
                            checked={exportOptions.includeInactive}
                            onCheckedChange={(checked) =>
                                setExportOptions((prev) => ({
                                    ...prev,
                                    includeInactive: checked === true,
                                }))
                            }
                        >
                            <div className="ml-2">
                                <div className="text-sm font-medium text-gray-900">
                                    Include Inactive Tokens
                                </div>
                                <div className="text-xs text-gray-500">
                                    Include tokens that are currently disabled
                                </div>
                            </div>
                        </Checkbox>
                    </div>
                    {isExportDisabled && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm text-red-600">
                                Please select at least one token type to export
                            </p>
                        </div>
                    )}
                </div>

                {/* Foundation Collections Filter */}
                {exportOptions.includeFoundation && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Foundation Collections
                            </h3>
                            <p className="text-xs text-gray-500">
                                Filter by specific collections (leave empty to
                                include all)
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            {collections.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {collections.map((collection) => (
                                        <Tag
                                            key={collection.id}
                                            text={collection.name}
                                            variant={TagVariant.SUBTLE}
                                            color={
                                                exportOptions.foundationCollections.includes(
                                                    collection.name
                                                )
                                                    ? TagColor.PRIMARY
                                                    : TagColor.NEUTRAL
                                            }
                                            size={TagSize.SM}
                                            onClick={() =>
                                                toggleFoundationCollection(
                                                    collection.name
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No foundation collections available
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Categories Filter */}
                {exportOptions.includeFoundation && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Categories
                            </h3>
                            <p className="text-xs text-gray-500">
                                Filter by token categories (leave empty to
                                include all)
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            {availableCategories.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {availableCategories.map((category) => (
                                        <Tag
                                            key={category}
                                            text={
                                                category
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                category.slice(1)
                                            }
                                            variant={TagVariant.SUBTLE}
                                            color={
                                                exportOptions.categories.includes(
                                                    category
                                                )
                                                    ? TagColor.PRIMARY
                                                    : TagColor.NEUTRAL
                                            }
                                            size={TagSize.SM}
                                            onClick={() =>
                                                toggleCategory(category)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No categories available
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Component Collections Filter */}
                {exportOptions.includeComponents && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Component Collections
                            </h3>
                            <p className="text-xs text-gray-500">
                                Filter by component collections (leave empty to
                                include all)
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            {componentCollections.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {componentCollections.map((collection) => (
                                        <Tag
                                            key={collection.id}
                                            text={collection.name}
                                            variant={TagVariant.SUBTLE}
                                            color={
                                                exportOptions.componentCollections.includes(
                                                    collection.name
                                                )
                                                    ? TagColor.PRIMARY
                                                    : TagColor.NEUTRAL
                                            }
                                            size={TagSize.SM}
                                            onClick={() =>
                                                toggleComponentCollection(
                                                    collection.name
                                                )
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No component collections available
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* Components Filter */}
                {exportOptions.includeComponents && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 mb-1">
                                Components
                            </h3>
                            <p className="text-xs text-gray-500">
                                Filter by specific components (leave empty to
                                include all)
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            {availableComponents.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {availableComponents.map((component) => (
                                        <Tag
                                            key={component}
                                            text={component}
                                            variant={TagVariant.SUBTLE}
                                            color={
                                                exportOptions.components.includes(
                                                    component
                                                )
                                                    ? TagColor.PRIMARY
                                                    : TagColor.NEUTRAL
                                            }
                                            size={TagSize.SM}
                                            onClick={() =>
                                                toggleComponent(component)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No components available
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Modal>
    )
}
