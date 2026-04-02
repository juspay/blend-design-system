'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GitHubIcon, FigmaIcon } from '../../../icons'
import {
    EXTERNAL_LINKS,
    ROUTES,
    HEADER_NAV_LINKS,
} from '../../../constants/links'
import { cn } from '@/lib/utils/cn'

export default function Navbar() {
    const pathname = usePathname()
    const [isDark, setIsDark] = useState(false)

    useEffect(() => {
        const root = document.documentElement
        setIsDark(root.classList.contains('dark'))
    }, [])

    const toggleTheme = () => {
        const root = document.documentElement
        const newIsDark = !isDark
        setIsDark(newIsDark)
        if (newIsDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }

    return (
        <header className="max-w-360 mx-auto">
            <div className="mx-auto px-6.25 py-5 h-15 flex items-center justify-between border-x border-border">
                <Link
                    href={ROUTES.home}
                    className="flex items-center font-semibold text-foreground"
                    aria-label="Home"
                >
                    Blend
                </Link>

                <div className="flex items-center gap-4">
                    <nav className="flex items-center gap-3">
                        {HEADER_NAV_LINKS.map((link) => {
                            const isActive =
                                pathname === link.href ||
                                pathname.startsWith(link.href + '/')

                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    target={
                                        link.external ? '_blank' : undefined
                                    }
                                    rel={
                                        link.external
                                            ? 'noopener noreferrer'
                                            : undefined
                                    }
                                    className={cn(
                                        'text-sm transition-colors p-1',
                                        isActive
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    )}
                                >
                                    {link.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="flex items-center border border-border px-1.5 py-0.5">
                        <Link
                            href={EXTERNAL_LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                            aria-label="GitHub"
                        >
                            <GitHubIcon />
                        </Link>
                        <div className="w-px h-4 bg-border mx-2" />
                        <Link
                            href={EXTERNAL_LINKS.figma}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors p-1"
                            aria-label="Figma"
                        >
                            <FigmaIcon />
                        </Link>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {isDark ? (
                            <SunIcon className="w-4 h-4" />
                        ) : (
                            <MoonIcon className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    )
}

function SunIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
        </svg>
    )
}

function MoonIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
    )
}
