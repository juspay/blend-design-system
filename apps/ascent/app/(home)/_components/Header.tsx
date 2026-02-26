'use client'

import Link from 'next/link'
import { JuspayLogo, GitHubIcon, FigmaIcon } from './icons'
import { EXTERNAL_LINKS, ROUTES } from './constants/links'

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-gray-200">
            <nav className="px-4 lg:px-6 flex items-center justify-between h-18 border-l border-r border-gray-200 mx-auto max-w-[1152px]">
                <Link
                    href={ROUTES.home}
                    className="flex items-center"
                    aria-label="Home"
                >
                    <JuspayLogo />
                </Link>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href={ROUTES.docs}
                            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            Docs
                        </Link>
                        <Link
                            href={ROUTES.blog}
                            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            Blogs
                        </Link>
                        <a
                            href={EXTERNAL_LINKS.storybook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
                        >
                            Storybook
                        </a>
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-lg px-1.5 py-0.5 bg-gray-50">
                        <a
                            href={EXTERNAL_LINKS.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 transition-colors p-1"
                            aria-label="GitHub"
                        >
                            <GitHubIcon />
                        </a>
                        <div className="w-px self-stretch bg-gray-200 mx-1 my-1" />
                        <a
                            href={EXTERNAL_LINKS.figma}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 transition-colors p-1"
                            aria-label="Figma"
                        >
                            <FigmaIcon />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}
