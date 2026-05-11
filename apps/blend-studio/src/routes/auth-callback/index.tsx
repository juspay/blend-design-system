import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/auth-callback/')({
    component: AuthCallbackPage,
})

function AuthCallbackPage() {
    const hasHandledCallback = useRef(false)

    useEffect(() => {
        if (hasHandledCallback.current) return
        hasHandledCallback.current = true

        const params = new URLSearchParams(window.location.search)
        const error = params.get('error')

        // Drop sensitive query params from address bar immediately.
        window.history.replaceState({}, document.title, '/auth-callback')

        if (!error) {
            // Cookie-only auth flow: callback success is represented by the
            // backend setting httpOnly cookies before redirecting here.
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'AUTH_SUCCESS' },
                    window.location.origin
                )

                window.close()
                window.setTimeout(() => {
                    if (!window.closed) {
                        window.location.href = '/studio'
                    }
                }, 300)
            } else {
                window.location.href = '/studio'
            }
        } else if (error) {
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'AUTH_ERROR', error },
                    window.location.origin
                )
            }
            window.location.href = '/login?error=auth_failed'
        } else {
            // Malformed callback (missing token/error); keep users out of a
            // permanent loading state.
            window.location.href = '/login?error=invalid_callback'
        }
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Completing login...</p>
            </div>
        </div>
    )
}
