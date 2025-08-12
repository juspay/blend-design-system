'use client'

import React, { useState } from 'react'
import { MoreVertical, Check, Star } from 'lucide-react'

interface TestCollection {
    id: string
    name: string
    is_active: boolean
    is_default: boolean
}

export default function TestMenuPage() {
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
    const [collections, setCollections] = useState<TestCollection[]>([
        {
            id: '1',
            name: 'Test Collection',
            is_active: true,
            is_default: false,
        },
        {
            id: '2',
            name: 'Default Collection',
            is_active: true,
            is_default: true,
        },
    ])

    const handleSetActive = (collection: TestCollection) => {
        console.log('Set Active clicked for:', collection.name)
        setCollections((prev) =>
            prev.map((c) =>
                c.id === collection.id ? { ...c, is_active: !c.is_active } : c
            )
        )
        setOpenDropdownId(null)
    }

    const handleSetDefault = (collection: TestCollection) => {
        console.log('Set Default clicked for:', collection.name)
        setCollections((prev) =>
            prev.map((c) => ({
                ...c,
                is_default: c.id === collection.id,
            }))
        )
        setOpenDropdownId(null)
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-2xl font-bold mb-8">Three-Dot Menu Test</h1>

            <div className="space-y-4">
                {collections.map((collection) => (
                    <div
                        key={collection.id}
                        className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <h3 className="font-semibold text-gray-900">
                                    {collection.name}
                                </h3>
                                {collection.is_default && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                        Default
                                    </span>
                                )}
                                {collection.is_active && (
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        Active
                                    </span>
                                )}
                            </div>

                            {/* Three-dot menu */}
                            <div className="relative">
                                <button
                                    onClick={() =>
                                        setOpenDropdownId(
                                            openDropdownId === collection.id
                                                ? null
                                                : collection.id
                                        )
                                    }
                                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    <MoreVertical className="w-4 h-4 text-gray-500" />
                                </button>

                                {openDropdownId === collection.id && (
                                    <div className="absolute right-0 top-8 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault()
                                                e.stopPropagation()
                                                handleSetActive(collection)
                                            }}
                                            className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            <Check className="w-4 h-4 mr-2" />
                                            {collection.is_active
                                                ? 'Set Inactive'
                                                : 'Set Active'}
                                        </button>

                                        {!collection.is_default && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    handleSetDefault(collection)
                                                }}
                                                className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                <Star className="w-4 h-4 mr-2" />
                                                Set as Default
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
