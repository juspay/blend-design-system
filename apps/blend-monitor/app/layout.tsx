import '../polyfills'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/frontend/contexts/AuthContext'
import ClientLayout from '@/frontend/components/shared/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Blend Monitor - Design System Dashboard',
    description:
        'Monitor and track the Blend Design System components, usage, and NPM statistics',
}

// Force dynamic rendering for all pages to avoid SSR issues with Highcharts
export const dynamic = 'force-dynamic'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <ClientLayout>{children}</ClientLayout>
                </AuthProvider>
            </body>
        </html>
    )
}
