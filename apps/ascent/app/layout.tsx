import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
    display: 'swap',
})

const APP_NAME = 'Blend Design System'
const APP_DESCRIPTION =
    'Modern React component library and design system documentation'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const metadata: Metadata = {
    title: {
        template: `%s | ${APP_NAME}`,
        default: APP_NAME,
    },
    description: APP_DESCRIPTION,
    keywords: [
        'React',
        'Components',
        'Design System',
        'UI Library',
        'TypeScript',
        'Tailwind CSS',
        'Next.js',
        'Documentation',
        'Juspay',
        'Blend',
    ],
    authors: [
        {
            name: 'Juspay',
            url: 'https://juspay.in',
        },
    ],
    creator: 'Juspay',
    publisher: 'Juspay',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(APP_URL),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: APP_URL,
        siteName: APP_NAME,
        title: APP_NAME,
        description: APP_DESCRIPTION,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: APP_NAME,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: APP_NAME,
        description: APP_DESCRIPTION,
        images: ['/og-image.png'],
        creator: '@juspay',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#000000" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
                suppressHydrationWarning
            >
                {children}
            </body>
        </html>
    )
}
