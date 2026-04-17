import React, { useState } from 'react'
import { X } from '@phosphor-icons/react'

interface CreateBranchModalProps {
    onClose: () => void
    onSubmit: (input: {
        brandId: string
        name: string
        description?: string
    }) => void
    loading: boolean
}

export function CreateBranchModal({
    onClose,
    onSubmit,
    loading,
}: CreateBranchModalProps) {
    const [brandId, setBrandId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)

        if (!brandId.includes('/')) {
            setError(
                'Branch ID must be in format: owner/slug (e.g., mycompany/retail)'
            )
            return
        }

        if (!name.trim()) {
            setError('Name is required')
            return
        }

        onSubmit({
            brandId: brandId.toLowerCase().replace(/[^a-z0-9/-]/g, '-'),
            name: name.trim(),
            description: description.trim() || undefined,
        })
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Create New Branch
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Branch ID
                        </label>
                        <input
                            type="text"
                            value={brandId}
                            onChange={(e) => setBrandId(e.target.value)}
                            placeholder="mycompany/retail"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Format: owner/slug (lowercase, alphanumeric,
                            hyphens)
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="My Company Retail"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description (optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Brand tokens for retail banking"
                            rows={2}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Branch'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
