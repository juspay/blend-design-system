import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/auth-callback/')({
    component: AuthCallbackPage,
})

function AuthCallbackPage() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        const error = params.get('error')

        if (token) {
            // Send token back to parent window (popup flow)
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'AUTH_SUCCESS', token },
                    window.location.origin
                )
            } else {
                // Direct navigation — store token in sessionStorage
                // as fallback; the httpOnly cookie is the primary auth
                sessionStorage.setItem('blend_auth_token', token)
                window.location.href = '/studio'
            }
        } else if (error) {
            if (window.opener) {
                window.opener.postMessage(
                    { type: 'AUTH_ERROR', error },
                    window.location.origin
                )
            }
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
