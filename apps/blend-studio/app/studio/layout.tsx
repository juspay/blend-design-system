import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Token Studio — Blend',
    description: 'Design token editor and branch management',
}

export default function StudioLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
