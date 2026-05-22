import { useState } from 'react'
import { Play, Spinner, X } from '@phosphor-icons/react'
import { incrementVersion, validateVersion } from '@/frontend/hooks/use-studio'
import {
    getSuggestedPublishVersion,
    getVersionInputClassName,
    VERSION_BUMP_TYPES,
} from '@/utils'

interface PublishModalProps {
    latestVersion: string | null | undefined
    onClose: () => void
    onPublish: (
        version: string,
        changelog: string,
        isBreaking: boolean,
        isPrerelease: boolean
    ) => Promise<void>
    loading: boolean
}

export function PublishModal({
    latestVersion,
    onClose,
    onPublish,
    loading,
}: PublishModalProps) {
    const suggested = getSuggestedPublishVersion(latestVersion)
    const [version, setVersion] = useState(suggested)
    const [changelog, setChangelog] = useState('')
    const [isBreaking, setIsBreaking] = useState(false)
    const [isPrerelease, setIsPrerelease] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const vValid = validateVersion(version)

    const handlePublish = async () => {
        if (loading || isSubmitting || !vValid.valid) return
        setIsSubmitting(true)
        try {
            await onPublish(version, changelog, isBreaking, isPrerelease)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-200 p-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Publish Version
                        </h2>
                        <p className="mt-0.5 text-sm text-gray-500">
                            Make this token branch available to teams
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4 p-6">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Version
                        </label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            placeholder="1.0.0"
                            className={`w-full rounded-lg border px-3 py-2 font-mono text-sm focus:outline-none focus:ring-2 ${getVersionInputClassName(vValid.valid)}`}
                        />
                        {!vValid.valid && (
                            <p className="mt-1 text-xs text-red-500">
                                {vValid.error}
                            </p>
                        )}

                        {latestVersion && (
                            <div className="mt-2 flex gap-2">
                                {VERSION_BUMP_TYPES.map((bump) => (
                                    <button
                                        key={bump}
                                        type="button"
                                        onClick={() =>
                                            setVersion(
                                                incrementVersion(
                                                    latestVersion,
                                                    bump
                                                )
                                            )
                                        }
                                        className="rounded-lg bg-gray-100 px-2 py-1 text-xs capitalize text-gray-600 hover:bg-gray-200"
                                    >
                                        {bump} (
                                        {incrementVersion(latestVersion, bump)})
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Changelog
                        </label>
                        <textarea
                            value={changelog}
                            onChange={(e) => setChangelog(e.target.value)}
                            placeholder="What's changed in this version?"
                            rows={3}
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isBreaking}
                                onChange={(e) =>
                                    setIsBreaking(e.target.checked)
                                }
                                className="h-4 w-4 rounded text-red-600"
                            />
                            <span className="text-sm text-gray-700">
                                Breaking change
                            </span>
                        </label>
                        <label className="flex cursor-pointer items-center gap-2">
                            <input
                                type="checkbox"
                                checked={isPrerelease}
                                onChange={(e) =>
                                    setIsPrerelease(e.target.checked)
                                }
                                className="h-4 w-4 rounded text-purple-600"
                            />
                            <span className="text-sm text-gray-700">
                                Pre-release
                            </span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 p-6">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={loading || isSubmitting}
                        className="rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handlePublish}
                        disabled={loading || isSubmitting || !vValid.valid}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading || isSubmitting ? (
                            <Spinner className="h-4 w-4 animate-spin" />
                        ) : (
                            <Play className="h-4 w-4" />
                        )}
                        Publish v{version}
                    </button>
                </div>
            </div>
        </div>
    )
}
