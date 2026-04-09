import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { useAuth } from '@/contexts/AuthContext'
import { Button, ButtonType, ButtonSize } from '@juspay/blend-design-system'
import { Zap } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login')({
    component: LoginPage,
    validateSearch: (search: Record<string, unknown>) => {
        return {
            from: typeof search.from === 'string' ? search.from : undefined,
        }
    },
})

function LoginPage() {
    const { signInWithGoogle, isConfigured, user, loading } = useAuth()
    const search = Route.useSearch()
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (isConfigured && !loading && user) {
        return <Navigate to={search.from ?? '/studio'} replace />
    }

    if (!isConfigured) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
                        <div className="text-center mb-10">
                            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                                <Zap className="w-9 h-9" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Blend Token Studio
                            </h1>
                            <p className="text-base text-gray-600 mt-2">
                                Demo Mode
                            </p>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                                Authentication disabled. Firebase not
                                configured.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <Link to="/studio/test" className="block">
                                <Button
                                    text="Open Studio Test"
                                    buttonType={ButtonType.PRIMARY}
                                    size={ButtonSize.LARGE}
                                    fullWidth
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
                    <div className="text-center mb-10">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                            <Zap className="w-9 h-9" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Blend Token Studio
                        </h1>
                        <p className="text-base text-gray-600 mt-2">
                            Sign in to your account
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-sm text-red-600">{error}</p>
                        </div>
                    )}

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
                </div>
            </div>
        </div>
    )
}
