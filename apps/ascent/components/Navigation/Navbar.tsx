'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Drawer } from 'vaul'
import { GitHubIcon, FigmaIcon } from '../../icons'
import {
    EXTERNAL_LINKS,
    ROUTES,
    HEADER_NAV_LINKS,
} from '../../lib/constants/links'
import { cn } from '@/lib/utils/cn'
import ThemeToggle from '../ui/ThemeToggle/ThemeToggle'

export default function Navbar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = HEADER_NAV_LINKS.filter(
        (link) =>
            link.label === 'Docs' ||
            link.label === 'Blogs' ||
            link.label === 'Changelog' ||
            link.label === 'Storybook'
    )

    return (
        <header className="max-w-360 mx-auto relative z-100">
            <div className="mx-auto px-4 sm:px-6.25 py-5 h-15 flex items-center justify-between border-x border-border">
                <Link
                    href={ROUTES.home}
                    className="flex items-center font-semibold text-foreground"
                    aria-label="Home"
                >
                    Blend
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
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

                    <ThemeToggle />
                </div>

                {/* Mobile Navigation */}
                <div className="flex md:hidden items-center gap-2">
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
                    <ThemeToggle />
                    <Drawer.Root
                        open={isOpen}
                        onOpenChange={setIsOpen}
                        direction="right"
                    >
                        <Drawer.Trigger asChild>
                            <button
                                className="p-2 border border-border text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Open menu"
                            >
                                <Menu size={18} />
                            </button>
                        </Drawer.Trigger>
                        <Drawer.Portal>
                            <Drawer.Overlay className="fixed inset-0 bg-black/40 z-110" />
                            <Drawer.Content className="fixed inset-y-0 right-0 z-110 w-72 bg-background border-l border-border outline-none">
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between py-3.25 px-4 border-b border-border">
                                        <Drawer.Title className="font-semibold text-foreground">
                                            Menu
                                        </Drawer.Title>
                                        <Drawer.Close asChild>
                                            <button
                                                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                                                aria-label="Close menu"
                                            >
                                                <X size={18} />
                                            </button>
                                        </Drawer.Close>
                                    </div>
                                    <nav className="flex flex-col p-4 gap-1">
                                        {navLinks.map((link) => {
                                            const isActive =
                                                pathname === link.href ||
                                                pathname.startsWith(
                                                    link.href + '/'
                                                )

                                            return (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    target={
                                                        link.external
                                                            ? '_blank'
                                                            : undefined
                                                    }
                                                    rel={
                                                        link.external
                                                            ? 'noopener noreferrer'
                                                            : undefined
                                                    }
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                    className={cn(
                                                        'text-sm transition-colors p-3 rounded-md',
                                                        isActive
                                                            ? 'text-primary bg-primary/5'
                                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                                    )}
                                                >
                                                    {link.label}
                                                </Link>
                                            )
                                        })}
                                    </nav>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                </div>
            </div>
        </header>
    )
}
