'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useBranches, useCreateBranch } from '@/frontend/hooks/use-studio'
import { BranchList } from '@/frontend/components/studio/BranchList'
import { CreateBranchModal } from '@/frontend/components/studio/CreateBranchModal'

export default function StudioPage() {
    const router = useRouter()
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const { branches, loading, refetch } = useBranches({
        filters: searchQuery ? { search: searchQuery } : undefined,
        sortBy: 'updatedAt',
        sortOrder: 'desc',
    })

    const { createBranch, loading: creating } = useCreateBranch()

    const handleCreateBranch = async (input: {
        brandId: string
        name: string
        description?: string
    }) => {
        const branch = await createBranch(input)
        if (branch) {
            setShowCreateModal(false)
            router.push(`/studio/editor/${encodeURIComponent(branch.brandId)}`)
        }
    }

    return (
        <div className="h-full">
            <div className="p-6 border-b border-gray-200 bg-white">
                <h1 className="text-2xl font-bold text-gray-900">
                    Token Studio
                </h1>
                <p className="text-gray-500 mt-1">
                    Create and manage design token branches for your brand
                </p>

                <div className="mt-4">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search branches..."
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <BranchList
                branches={branches}
                loading={loading}
                onCreateClick={() => setShowCreateModal(true)}
            />

            {showCreateModal && (
                <CreateBranchModal
                    onClose={() => setShowCreateModal(false)}
                    onSubmit={handleCreateBranch}
                    loading={creating}
                />
            )}
        </div>
    )
}
