import { useState } from 'react'
import type { Branch } from '@blend-design/token-engine'
import { BranchModal } from './BranchModal'

interface ForkBranchModalProps {
    source: Branch
    onClose: () => void
    onFork: (name: string, slug: string) => void
    loading: boolean
}

export function ForkBranchModal({
    source,
    onClose,
    onFork,
    loading,
}: ForkBranchModalProps) {
    const [name, setName] = useState(`${source.name} (Copy)`)
    const [slug, setSlug] = useState(`${source.slug}-copy`)

    return (
        <BranchModal
            isOpen
            onClose={onClose}
            title="Fork Branch"
            subtitle={`Create a copy of "${source.name}"`}
            confirmText="Fork Branch"
            onConfirm={() => onFork(name, slug)}
            loading={loading}
            minWidth="460px"
        >
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Name
                </label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Slug
                </label>
                <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </BranchModal>
    )
}
