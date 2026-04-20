'use client'

import React, { useEffect, useState } from 'react'
import { useAuth } from '@/frontend/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button, ButtonType, ButtonSize } from '@juspay/blend-design-system'
import { Zap, AlertCircle } from 'lucide-react'
import Loader from '@/frontend/components/shared/Loader'

export default function LoginPage() {
    const { user, loading, signInWithGoogle } = useAuth()
    const router = useRouter()
    const [error, setError] = useState<string | null>(null)
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (!loading && user) {
            setIsRedirecting(true)
            router.push('/')
        }
    }, [user, loading, router])

    const handleGoogleSignIn = async () => {
        setError(null)
        setIsSigningIn(true)
        try {
            await signInWithGoogle()
            // Show redirecting state after successful sign in
            setIsRedirecting(true)
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Failed to sign in with Google'
            )
            setIsSigningIn(false)
        }
    }

    if (loading || isRedirecting) {
        return (
            <Loader
                fullScreen
                size="large"
                text={
                    isRedirecting
                        ? 'Redirecting to dashboard...'
                        : 'Checking authentication...'
                }
            />
        )
    }

    // Show overlay loader when signing in
    if (isSigningIn) {
        return (
            <>
                <Loader
                    fullScreen
                    size="large"
                    text="Signing in with Google..."
                />
                <div className="opacity-50">
                    {/* Keep the page content visible but dimmed */}
                    <LoginContent
                        error={error}
                        isSigningIn={isSigningIn}
                        handleGoogleSignIn={handleGoogleSignIn}
                    />
                </div>
            </>
        )
    }

    return (
        <LoginContent
            error={error}
            isSigningIn={isSigningIn}
            handleGoogleSignIn={handleGoogleSignIn}
        />
    )
}

function LoginContent({
    error,
    isSigningIn,
    handleGoogleSignIn,
}: {
    error: string | null
    isSigningIn: boolean
    handleGoogleSignIn: () => Promise<void>
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-10">
                    {/* Logo and App Name inside card */}
                    <div className="text-center mb-10">
                        <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
                            <Zap className="w-9 h-9" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Blend Monitor
                        </h1>
                        <p className="text-base text-gray-600 mt-2">
                            Sign in to your account
                        </p>
                    </div>

                    {error && (
                        <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-red-800">
                                    Sign in failed
                                </p>
                                <p className="text-sm text-red-600 mt-1">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Full width Google button - Primary style */}
                    <Button
                        text="Sign in with Google"
                        buttonType={ButtonType.PRIMARY}
                        size={ButtonSize.LARGE}
                        fullWidth={true}
                        onClick={handleGoogleSignIn}
                        disabled={isSigningIn}
                        leadingIcon={
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path
                                    fill="#ffffff"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#ffffff"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#ffffff"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#ffffff"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                        }
                    />

                    <p className="text-center text-sm text-gray-500 mt-8">
                        By signing in, you agree to our Terms and Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}
