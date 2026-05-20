import { WarningCircle } from '@phosphor-icons/react'

export function EditorLoadingScreen({ message }: { message: string }) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                <p className="text-sm text-gray-500">{message}</p>
            </div>
        </div>
    )
}

export function EditorErrorScreen({
    message,
    onBack,
}: {
    message: string
    onBack: () => void
}) {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <WarningCircle className="mx-auto mb-3 h-12 w-12 text-red-400" />
                <p className="mb-1 font-medium text-gray-900">
                    Failed to load branch
                </p>
                <p className="mb-4 text-sm text-gray-500">{message}</p>
                <button
                    type="button"
                    onClick={onBack}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Back to Studio
                </button>
            </div>
        </div>
    )
}
