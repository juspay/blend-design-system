import { TrashIcon, WarningCircleIcon } from '@phosphor-icons/react'
import type { Branch } from '@blend-design/token-engine'
import { ButtonV2Type } from '@juspay/blend-design-system'
import { BranchModal } from './BranchModal'

interface DeleteBranchModalProps {
    branch: Branch
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

export function DeleteBranchModal({
    branch,
    onClose,
    onConfirm,
    loading,
}: DeleteBranchModalProps) {
    return (
        <BranchModal
            isOpen
            onClose={onClose}
            title="Delete Branch?"
            subtitle={`This will permanently delete "${branch.name}" and all its versions.`}
            confirmText="Delete Branch"
            onConfirm={onConfirm}
            confirmButtonType={ButtonV2Type.DANGER}
            loading={loading}
            minWidth="460px"
        >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto">
                <TrashIcon className="w-6 h-6 text-red-600" />
            </div>
            <p className="text-sm text-gray-500 text-center">
                This action cannot be undone.
            </p>
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <WarningCircleIcon className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800">
                    Deleting a branch will remove all associated tokens,
                    versions, and snapshots from the database.
                </p>
            </div>
        </BranchModal>
    )
}
