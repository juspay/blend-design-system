'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { XIcon, ListIcon, CaretDownIcon } from '@phosphor-icons/react/dist/ssr'
import { Drawer } from 'vaul'
import { motion, AnimatePresence } from 'motion/react'
import { GitHubIcon, FigmaIcon } from '../../icons'
import {
    EXTERNAL_LINKS,
    ROUTES,
    HEADER_NAV_LINKS,
} from '../../lib/constants/links'
import { cn } from '@/lib/utils/cn'
import ThemeToggle from '../ui/ThemeToggle/ThemeToggle'
import VersionToggle from '../ui/VersionToggle'
import SearchTrigger from '../ui/SearchTrigger'

const PRIMARY_NAV_LABELS = ['Docs', 'Storybook']
const MORE_NAV_LABELS = ['Blogs', 'Changelog', 'Showcase']
const MOBILE_NAV_LABELS = [
    'Docs',
    'Storybook',
    'Blogs',
    'Changelog',
    'Showcase',
]

const MORE_META: Record<string, { desc: string }> = {
    Docs: {
        desc: 'Documentation for Blend and related tools',
    },
    Storybook: {
        desc: 'Component library and examples',
    },
    Blogs: {
        desc: 'Guides & updates from the team',
    },
    Changelog: {
        desc: "What's new with Blend",
    },
    Showcase: {
        desc: 'Built with Blend by the community',
    },
}

// Derived once at module level — never changes
const primaryLinks = HEADER_NAV_LINKS.filter((l) =>
    PRIMARY_NAV_LABELS.includes(l.label)
)
const moreLinks = HEADER_NAV_LINKS.filter((l) =>
    MORE_NAV_LABELS.includes(l.label)
)
const mobileLinks = HEADER_NAV_LINKS.filter((l) =>
    MOBILE_NAV_LABELS.includes(l.label)
)

function NavLink({
    href,
    external,
    label,
    isActive,
}: {
    href: string
    external?: boolean
    label: string
    isActive: boolean
}) {
    return (
        <Link
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={cn(
                'text-sm transition-colors p-1',
                isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
            )}
        >
            {label}
        </Link>
    )
}

function IconBar() {
    return (
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
    )
}

export default function Navbar() {
    const pathname = usePathname()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [moreOpen, setMoreOpen] = useState(false)

    const isMoreActive = moreLinks.some(
        (l) => pathname === l.href || pathname.startsWith(l.href + '/')
    )

    return (
        <header className="lg:max-w-5xl xl:max-w-6xl 2xl:max-w-360 mx-auto relative z-100">
            <div className="mx-auto px-4 sm:px-6.25 py-5 h-15 flex items-center justify-between border-x border-border">
                <div className="flex items-center gap-4">
                    <Link
                        href={ROUTES.home}
                        className="flex items-center font-semibold text-foreground"
                        aria-label="Home"
                    >
                        Blend
                    </Link>
                    <VersionToggle />
                </div>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    <nav className="flex items-center gap-3">
                        {primaryLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                {...link}
                                isActive={
                                    pathname === link.href ||
                                    pathname.startsWith(link.href + '/')
                                }
                            />
                        ))}

                        {/* More dropdown */}
                        <div
                            className="relative group"
                            onMouseEnter={() => setMoreOpen(true)}
                            onMouseLeave={() => setMoreOpen(false)}
                        >
                            {/* Invisible bridge fills the mt gap so hover doesn't break */}
                            <div className="absolute top-full left-0 right-0 h-3.5" />

                            <button
                                className={cn(
                                    'flex items-center gap-1 text-sm transition-colors p-1 select-none cursor-default',
                                    isMoreActive || moreOpen
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-foreground'
                                )}
                                aria-expanded={moreOpen}
                                aria-haspopup="true"
                                onFocus={() => setMoreOpen(true)}
                            >
                                More
                                <motion.span
                                    animate={{ rotate: moreOpen ? 180 : 0 }}
                                    transition={{
                                        duration: 0.22,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="flex items-center"
                                >
                                    <CaretDownIcon size={12} weight="bold" />
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {moreOpen && (
                                    <motion.div
                                        key="more-dropdown"
                                        initial={{
                                            opacity: 0,
                                            y: -10,
                                            scale: 0.95,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1,
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y: -6,
                                            scale: 0.97,
                                        }}
                                        transition={{
                                            duration: 0.25,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3.5 w-64 origin-top"
                                    >
                                        <div className="relative bg-background border border-border shadow-xl shadow-black/5 overflow-hidden mt-0.5">
                                            {moreLinks.map((link, i) => {
                                                const isActive =
                                                    pathname === link.href ||
                                                    pathname.startsWith(
                                                        link.href + '/'
                                                    )
                                                const meta =
                                                    MORE_META[link.label]
                                                return (
                                                    <motion.div
                                                        key={link.href}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 5,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            delay: i * 0.045,
                                                            duration: 0.18,
                                                            ease: [
                                                                0.16, 1, 0.3, 1,
                                                            ],
                                                        }}
                                                        className="border-b border-border/60 last:border-b-0"
                                                    >
                                                        <Link
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
                                                                setMoreOpen(
                                                                    false
                                                                )
                                                            }
                                                            className={cn(
                                                                'group flex items-center gap-3 px-3.5 py-3 transition-all duration-150',
                                                                isActive
                                                                    ? 'bg-primary/5 text-primary'
                                                                    : 'text-foreground hover:bg-primary/3'
                                                            )}
                                                        >
                                                            <span className="flex flex-col gap-1.5 min-w-0">
                                                                <span className="text-sm font-medium leading-none tracking-wide text-foreground/90">
                                                                    {link.label}
                                                                </span>
                                                                {meta?.desc && (
                                                                    <span
                                                                        className={cn(
                                                                            'text-xs tracking-wide leading-none',
                                                                            isActive
                                                                                ? 'text-primary/60'
                                                                                : 'text-muted-foreground'
                                                                        )}
                                                                    >
                                                                        {
                                                                            meta.desc
                                                                        }
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </Link>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>

                    <IconBar />
                    <SearchTrigger />
                    <ThemeToggle />
                </div>

                {/* Mobile */}
                <div className="flex md:hidden items-center gap-2">
                    <IconBar />
                    <SearchTrigger />
                    <ThemeToggle />

                    <Drawer.Root
                        open={isDrawerOpen}
                        onOpenChange={setIsDrawerOpen}
                        direction="right"
                    >
                        <Drawer.Trigger asChild>
                            <button
                                className="p-2 border border-border text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Open menu"
                            >
                                <ListIcon size={18} />
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
                                                <XIcon size={18} />
                                            </button>
                                        </Drawer.Close>
                                    </div>
                                    <nav className="flex flex-col p-4 gap-1">
                                        {mobileLinks.map((link) => {
                                            const isActive =
                                                pathname === link.href ||
                                                pathname.startsWith(
                                                    link.href + '/'
                                                )
                                            const meta = MORE_META[link.label]
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
                                                        setIsDrawerOpen(false)
                                                    }
                                                    className={cn(
                                                        'flex items-center gap-3 text-sm transition-colors p-3 rounded-md',
                                                        isActive
                                                            ? 'text-primary bg-primary/5'
                                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                                    )}
                                                >
                                                    <span className="flex flex-col gap-0.5">
                                                        <span className="font-medium text-foreground">
                                                            {link.label}
                                                        </span>
                                                        {meta?.desc && (
                                                            <span className="text-xs text-muted-foreground">
                                                                {meta.desc}
                                                            </span>
                                                        )}
                                                    </span>
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
