import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useBackendAuth } from '@/contexts/BackendAuthContext'
import { Button, ButtonType, ButtonSize } from '@juspay/blend-design-system'
import { Zap, Palette, Code, GitBranch, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { featureFlags } from '@/lib/feature-flags'

export const Route = createFileRoute('/login')({
    component: LoginPage,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            from: typeof search.from === 'string' ? search.from : undefined,
        }
    },
})

function LoginPage() {
    const { signInWithGoogle, user, loading } = useBackendAuth()
    const search = Route.useSearch()
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const flags = featureFlags.get()

    const handleLogin = async () => {
        setError(null)
        setIsSubmitting(true)
        try {
            await signInWithGoogle()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Login failed')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!loading && user) {
        const target =
            search.from && !search.from.includes('/login')
                ? search.from
                : '/studio'
        return <Navigate to={target} replace />
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Checking session...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                        <div className="text-center mb-8">
                            <div className="mx-auto h-14 w-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg mb-4">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Blend Token Studio
                            </h1>
                            <p className="text-gray-600 mt-2">
                                Design token management for your brand
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {flags.useMockData ? (
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                    <p className="text-sm text-blue-800 font-medium">
                                        Running in Demo Mode
                                    </p>
                                    <p className="text-xs text-blue-600 mt-1">
                                        No backend required. All data is stored
                                        locally.
                                    </p>
                                </div>
                                <Navigate to="/studio" replace />
                            </div>
                        ) : (
                            <Button
                                text={
                                    isSubmitting
                                        ? 'Signing in...'
                                        : 'Sign in with Google'
                                }
                                buttonType={ButtonType.PRIMARY}
                                size={ButtonSize.LARGE}
                                fullWidth
                                onClick={handleLogin}
                                disabled={isSubmitting}
                            />
                        )}

                        <p className="text-xs text-gray-400 text-center mt-6">
                            By signing in, you agree to our Terms of Service
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-600 to-purple-700 p-12 flex-col justify-center">
                <div className="max-w-lg">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Customize Blend for your brand
                    </h2>
                    <p className="text-blue-100 text-lg mb-8">
                        Token Studio lets you create, edit, and publish design
                        tokens for your brand without writing code.
                    </p>

                    <div className="space-y-4">
                        <FeatureItem
                            icon={Palette}
                            title="Visual Editor"
                            description="Pick colors, adjust border radius, and see live previews of all components"
                        />
                        <FeatureItem
                            icon={GitBranch}
                            title="Branches & Versions"
                            description="Create multiple branches for different brands or themes with version history"
                        />
                        <FeatureItem
                            icon={Code}
                            title="CLI Integration"
                            description="Pull tokens into your project with a single command"
                        />
                    </div>

                    <div className="mt-10 pt-8 border-t border-white/20">
                        <p className="text-blue-200 text-sm mb-4">
                            Quick start workflow:
                        </p>
                        <div className="flex items-center gap-3 text-white/90">
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium">
                                    1
                                </span>
                                <span className="text-sm">Create branch</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/50" />
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium">
                                    2
                                </span>
                                <span className="text-sm">
                                    Customize tokens
                                </span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-white/50" />
                            <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-medium">
                                    3
                                </span>
                                <span className="text-sm">Publish</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FeatureItem({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
}) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
                <h3 className="text-white font-semibold">{title}</h3>
                <p className="text-blue-200 text-sm">{description}</p>
            </div>
        </div>
    )
}
