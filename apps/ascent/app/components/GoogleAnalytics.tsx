'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
    interface Window {
        dataLayer: unknown[]
        gtag: (...args: unknown[]) => void
    }
}

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
    const pathname = usePathname()

    useEffect(() => {
        if (typeof window === 'undefined' || !window.gtag) return
        window.gtag('event', 'page_view', {
            page_path: pathname ?? window.location.pathname,
            page_title: document.title,
        })
    }, [pathname])

    return null
}
