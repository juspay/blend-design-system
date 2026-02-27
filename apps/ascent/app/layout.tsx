import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { METADATA_CONFIG } from '@/lib/config'
import { GoogleAnalytics } from '@/app/components/GoogleAnalytics'
import './globals.css'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

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

export const metadata: Metadata = {
    ...METADATA_CONFIG,
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: '/',
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
                {GA_MEASUREMENT_ID ? (
                    <>
                        <Script
                            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                            strategy="afterInteractive"
                        />
                        <Script id="ga4-config" strategy="afterInteractive">
                            {`
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
                            `}
                        </Script>
                        <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
                    </>
                ) : null}
            </body>
        </html>
    )
}
