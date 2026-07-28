import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { ThemeProvider } from '@juspay/blend-design-system'
import { resolveBrandTokens } from '@juspay/blend-design-system/tokens'
import { useBranchWithMock } from '@/frontend/hooks/use-studio'
import { ComponentShowcase } from '@/components/studio/ComponentShowcase'
import { ThemeToggle } from '@/components/shared/ThemeToggle'
import { useTheme } from '@/contexts/ThemeContext'
import { useState, useMemo } from 'react'
import {
    ArrowLeft,
    PencilSimple,
    Copy,
    Check,
    Spinner,
    WarningCircle,
} from '@phosphor-icons/react'
import { normalizeReturnPath } from '@/lib/return-path'

export const Route = createFileRoute('/studio/preview/$branchId')({
    component: PreviewPage,
    validateSearch: (search: Record<string, unknown>) => ({
        from: normalizeReturnPath(search.from),
    }),
})

function PreviewPage() {
    const { branchId } = Route.useParams()
    const { from } = Route.useSearch()
    const navigate = useNavigate()
    const { branch, loading, error } = useBranchWithMock(branchId)
    const { theme: globalTheme } = useTheme()
    const [copied, setCopied] = useState(false)

    const componentTokens = useMemo(() => {
        if (!branch?.brandConfig) return null
        try {
            return resolveBrandTokens(branch.brandConfig, globalTheme)
        } catch {
            return null
        }
    }, [branch, globalTheme])

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleBack = () => {
        if (typeof window !== 'undefined' && window.history.length > 1) {
            window.history.back()
            return
        }

        navigate({ to: from ?? '/studio' })
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <Spinner className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-sm text-gray-500">Loading preview…</p>
                </div>
            </div>
        )
    }

    if (error || !branch) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <WarningCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="font-medium text-gray-900 mb-1">
                        Branch not found
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        {error || `No branch with ID "${branchId}"`}
                    </p>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← Back to Studio
                    </button>
                </div>
            </div>
        )
    }

    const primaryColor =
        branch.brandConfig?.colors?.primary?.['500'] || '#3B82F6'

    return (
        <RequireAuth>
            <div className="h-screen flex flex-col overflow-hidden">
                {/* ── Header ── */}
                <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200 shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleBack}
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>

                        {/* Color dot + name */}
                        <div
                            className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                            style={{ backgroundColor: primaryColor }}
                        />
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">
                                    {branch.name}
                                </span>
                                {branch.latestVersion && (
                                    <span className="px-2 py-0.5 text-xs font-mono bg-blue-50 text-blue-700 rounded-full">
                                        v{branch.latestVersion}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 font-mono">
                                {branchId}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <ThemeToggle />

                        <button
                            onClick={handleCopyLink}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            {copied ? (
                                <Check className="w-4 h-4 text-green-600" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                            {copied ? 'Copied!' : 'Copy Link'}
                        </button>

                        <Link
                            to="/studio/editor/$branchId"
                            params={{ branchId }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <PencilSimple className="w-4 h-4" />
                            Edit Tokens
                        </Link>
                    </div>
                </header>

                {/* ── Preview Area ── */}
                <div
                    className={`flex-1 overflow-y-auto ${globalTheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
                >
                    {componentTokens ? (
                        <ThemeProvider
                            theme={globalTheme}
                            componentTokens={componentTokens}
                        >
                            <div className="max-w-5xl mx-auto p-6">
                                <ComponentShowcase theme={globalTheme} />
                            </div>
                        </ThemeProvider>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center gap-3">
                                <Spinner className="w-8 h-8 animate-spin text-blue-600" />
                                <p className="text-sm text-gray-500">
                                    Resolving tokens…
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </RequireAuth>
    )
}
