'use client'

import React, { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Sun, Moon, ArrowLeft, ExternalLink } from 'lucide-react'
import { useBranch, useVersions } from '@/frontend/hooks/use-studio'
import { ComponentShowcase } from '@/frontend/components/studio/ComponentShowcase'
import { resolveBrandTokens } from '@blend-design/token-engine'

export default function PreviewPage() {
    const params = useParams()
    const router = useRouter()
    const branchId = decodeURIComponent(params.branchId as string)

    const { branch, loading, error } = useBranch(branchId)
    const { versions } = useVersions(branchId)

    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [selectedVersion, setSelectedVersion] = useState<string | null>(null)

    const brandConfig = useMemo(() => {
        if (!branch) return null

        if (selectedVersion) {
            const version = versions.find((v) => v.version === selectedVersion)
            if (version) return version.brandConfig
        }

        return branch.brandConfig
    }, [branch, versions, selectedVersion])

    const componentTokens = useMemo(() => {
        if (!brandConfig) return null
        return resolveBrandTokens(brandConfig, theme) as unknown as Record<
            string,
            unknown
        >
    }, [brandConfig, theme])

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500">Loading preview...</div>
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
                    {versions.length > 0 && (
                        <select
                            value={selectedVersion || ''}
                            onChange={(e) =>
                                setSelectedVersion(e.target.value || null)
                            }
                            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm"
                        >
                            <option value="">Latest (Draft)</option>
                            {versions.map((v) => (
                                <option key={v.id} value={v.version}>
                                    v{v.version}
                                </option>
                            ))}
                        </select>
                    )}

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

                    <a
                        href={`/studio/editor/${encodeURIComponent(branch.brandId)}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-700"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Edit
                    </a>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <ComponentShowcase
                    componentTokens={componentTokens}
                    theme={theme}
                />
            </div>
        </div>
    )
}
