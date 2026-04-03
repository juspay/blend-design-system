'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GitHubIcon, FigmaIcon } from '../../icons'
import { EXTERNAL_LINKS, ROUTES, HEADER_NAV_LINKS } from '../../constants/links'
import { cn } from '@/lib/utils/cn'
import { MoonIcon, SunIcon } from 'lucide-react'

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
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors border border-border"
                        aria-label={
                            isDark
                                ? 'Switch to light mode'
                                : 'Switch to dark mode'
                        }
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
