import type { Metadata } from 'next'
import { Geist, Manrope } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'
import './globals.css'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const manrope = Manrope({
    variable: '--font-manrope',
    subsets: ['latin'],
})

export const metadata: Metadata = {
    title: {
        default: 'Blend Design System',
        template: '%s | Blend Design System',
    },
    description: 'Documentation for the Blend Design System.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${manrope.variable}`}
        >
            <body className="flex min-h-screen flex-col antialiased">
                <RootProvider theme={{ enabled: false }}>
                    {children}
                </RootProvider>
            </body>
        </html>
    )
}
