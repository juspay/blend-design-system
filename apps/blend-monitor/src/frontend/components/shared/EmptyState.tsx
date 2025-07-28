import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Button, ButtonSize, ButtonType } from 'blend-v1'

interface EmptyStateProps {
    icon: LucideIcon
    title: string
    description: string
    action?: {
        label: string
        onClick: () => void
    }
}

export default function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Icon className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {title}
            </h3>
            <p className="text-sm text-gray-600 text-center max-w-sm mb-6">
                {description}
            </p>
            {action && (
                <Button
                    text={action.label}
                    onClick={action.onClick}
                    buttonType={ButtonType.PRIMARY}
                    size={ButtonSize.MEDIUM}
                />
            )}
        </div>
    )
}
