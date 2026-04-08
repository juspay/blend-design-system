'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Sun, Moon, ArrowLeft, Play, GitBranch } from 'lucide-react'
import {
    useBranch,
    useVersions,
    usePublishVersion,
} from '@/frontend/hooks/use-studio'
import { TokenEditor } from '@/frontend/components/studio/TokenEditor'
import { ComponentShowcase } from '@/frontend/components/studio/ComponentShowcase'
import {
    resolveBrandTokens,
    type BrandConfig,
} from '@blend-design/token-engine'

export default function EditorPage() {
    const params = useParams()
    const router = useRouter()
    const branchId = decodeURIComponent(params.branchId as string)

    const { branch, loading, error, updateBranch } = useBranch(branchId)
    const { versions } = useVersions(branchId)
    const { publishVersion, loading: publishing } = usePublishVersion(branchId)

    const [localConfig, setLocalConfig] = useState<BrandConfig | null>(null)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [saving, setSaving] = useState(false)
    const [showPublishModal, setShowPublishModal] = useState(false)

    useEffect(() => {
        if (branch && !localConfig) {
            setLocalConfig(branch.brandConfig)
        }
    }, [branch, localConfig])

    const componentTokens = useMemo(() => {
        if (!localConfig) return null
        return resolveBrandTokens(localConfig, theme) as unknown as Record<
            string,
            unknown
        >
    }, [localConfig, theme])

    const handleSave = async () => {
        if (!localConfig) return
        setSaving(true)
        try {
            await updateBranch({ brandConfig: localConfig })
        } catch (error) {
            console.error('Failed to save:', error)
        } finally {
            setSaving(false)
        }
    }

    const handleReset = () => {
        if (branch) {
            setLocalConfig(branch.brandConfig)
        }
    }

    const handlePublish = async (version: string, changelog?: string) => {
        if (!localConfig) return

        try {
            await publishVersion({
                version,
                brandConfig: localConfig,
                changelog,
            })
            setShowPublishModal(false)
        } catch (error) {
            console.error('Failed to publish:', error)
        }
    }

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500">Loading...</div>
            </div>
        )
    }

    if (error || !branch) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-2">
                        {error || 'Branch not found'}
                    </p>
                    <button
                        onClick={() => router.push('/studio')}
                        className="text-blue-600 hover:underline"
                    >
                        Back to Branches
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/studio')}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">
                            {branch.name}
                        </h1>
                        <p className="text-sm text-gray-500 font-mono">
                            {branch.brandId}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setTheme('light')}
                            className={`p-1.5 rounded ${
                                theme === 'light' ? 'bg-white shadow-sm' : ''
                            }`}
                        >
                            <Sun className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setTheme('dark')}
                            className={`p-1.5 rounded ${
                                theme === 'dark' ? 'bg-white shadow-sm' : ''
                            }`}
                        >
                            <Moon className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => setShowPublishModal(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                        <Play className="w-4 h-4" />
                        Publish
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="w-1/2 border-r border-gray-200 overflow-hidden">
                    {localConfig && (
                        <TokenEditor
                            brandConfig={localConfig}
                            onChange={setLocalConfig}
                            onSave={handleSave}
                            onReset={handleReset}
                            saving={saving}
                        />
                    )}
                </div>

                <div className="w-1/2 overflow-hidden bg-gray-50">
                    <ComponentShowcase
                        componentTokens={componentTokens}
                        theme={theme}
                    />
                </div>
            </div>

            {showPublishModal && (
                <PublishModal
                    currentVersion={branch.latestVersion}
                    onClose={() => setShowPublishModal(false)}
                    onPublish={handlePublish}
                    loading={publishing}
                />
            )}
        </div>
    )
}

function PublishModal({
    currentVersion,
    onClose,
    onPublish,
    loading,
}: {
    currentVersion: string | null
    onClose: () => void
    onPublish: (version: string, changelog?: string) => void
    loading: boolean
}) {
    const [version, setVersion] = useState(
        currentVersion
            ? `${currentVersion
                  .split('.')
                  .map((n, i) => (i === 2 ? String(Number(n) + 1) : n))
                  .join('.')}`
            : '1.0.0'
    )
    const [changelog, setChangelog] = useState('')

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Publish Version
                    </h2>
                </div>

                <div className="p-4 space-y-4">
                    {currentVersion && (
                        <p className="text-sm text-gray-500">
                            Current version:{' '}
                            <span className="font-mono">{currentVersion}</span>
                        </p>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Version
                        </label>
                        <input
                            type="text"
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            placeholder="1.0.0"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Changelog (optional)
                        </label>
                        <textarea
                            value={changelog}
                            onChange={(e) => setChangelog(e.target.value)}
                            placeholder="Describe the changes..."
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() =>
                                onPublish(version, changelog || undefined)
                            }
                            disabled={loading || !version}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? 'Publishing...' : 'Publish'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
