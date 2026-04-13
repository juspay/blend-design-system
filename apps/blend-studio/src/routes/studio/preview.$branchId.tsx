import { createFileRoute, Link } from '@tanstack/react-router'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { ThemeProvider } from '@juspay/blend-design-system'
import { resolveBrandTokens } from '@blend-design/token-engine'
import { useBranchWithMock } from '@/frontend/hooks/use-studio'
import { ComponentShowcase } from '@/components/studio/ComponentShowcase'
import { useState, useMemo } from 'react'
import {
    ArrowLeft,
    Sun,
    Moon,
    Edit3,
    Copy,
    Check,
    Loader2,
    AlertCircle,
} from 'lucide-react'

export const Route = createFileRoute('/studio/preview/$branchId')({
    component: PreviewPage,
})

function PreviewPage() {
    const { branchId } = Route.useParams()
    const { branch, loading, error } = useBranchWithMock(branchId)
    const [theme, setTheme] = useState<'light' | 'dark'>('light')
    const [copied, setCopied] = useState(false)

    const componentTokens = useMemo(() => {
        if (!branch?.brandConfig) return null
        try {
            return resolveBrandTokens(branch.brandConfig, theme)
        } catch {
            return null
        }
    }, [branch, theme])

    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareUrl)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-sm text-gray-500">Loading preview…</p>
                </div>
            </div>
        )
    }

    if (error || !branch) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <p className="font-medium text-gray-900 mb-1">
                        Branch not found
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        {error || `No branch with ID "${branchId}"`}
                    </p>
                    <Link
                        to="/studio"
                        className="text-sm text-blue-600 hover:underline"
                    >
                        ← Back to Studio
                    </Link>
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
                        <Link
                            to="/studio"
                            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>

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
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setTheme('light')}
                                className={`p-1.5 rounded-md transition-colors ${theme === 'light' ? 'bg-white shadow-sm text-yellow-500' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Light mode"
                            >
                                <Sun className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`p-1.5 rounded-md transition-colors ${theme === 'dark' ? 'bg-white shadow-sm text-blue-500' : 'text-gray-400 hover:text-gray-600'}`}
                                title="Dark mode"
                            >
                                <Moon className="w-4 h-4" />
                            </button>
                        </div>

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
                            <Edit3 className="w-4 h-4" />
                            Edit Tokens
                        </Link>
                    </div>
                </header>

                {/* ── Brand Info Bar ── */}
                <div className="shrink-0 px-6 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-6 overflow-x-auto">
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-gray-400">Brand ID</span>
                        <span className="text-xs font-mono text-gray-700">
                            {branch.brandConfig?.brandId}
                        </span>
                    </div>
                    {branch.brandConfig?.font?.family && (
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-gray-400">Font</span>
                            <span className="text-xs font-mono text-gray-700">
                                {branch.brandConfig.font.family}
                            </span>
                        </div>
                    )}
                    {branch.brandConfig?.radius?.['8'] && (
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs text-gray-400">
                                Radius (8)
                            </span>
                            <span className="text-xs font-mono text-gray-700">
                                {branch.brandConfig.radius['8']}
                            </span>
                        </div>
                    )}

                    {/* Color swatches */}
                    <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                        <span className="text-xs text-gray-400 mr-1">
                            Primary
                        </span>
                        {[
                            '50',
                            '100',
                            '200',
                            '300',
                            '400',
                            '500',
                            '600',
                            '700',
                            '800',
                            '900',
                            '950',
                        ].map((shade) => {
                            const c =
                                branch.brandConfig?.colors?.primary?.[shade]
                            return c ? (
                                <div
                                    key={shade}
                                    className="w-5 h-5 rounded border border-black/10"
                                    style={{ backgroundColor: c }}
                                    title={`${shade}: ${c}`}
                                />
                            ) : null
                        })}
                    </div>
                </div>

                {/* ── Preview Area ── */}
                <div
                    className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
                >
                    {componentTokens ? (
                        <ThemeProvider
                            theme={theme}
                            componentTokens={componentTokens}
                        >
                            <div className="max-w-5xl mx-auto p-6">
                                <ComponentShowcase theme={theme} />
                            </div>
                        </ThemeProvider>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
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
