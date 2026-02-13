'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Copy, Check, X } from 'lucide-react'
import { motion } from 'motion/react'
import DitherCanvas from '../effects/DitherCanvas'
import CollaborativeCursor from '../effects/CollaborativeCursor'

export default function DeveloperDesignerSections() {
    const [copied, setCopied] = useState(false)
    const [showCursors, setShowCursors] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => setShowCursors(false), 5000)
        return () => clearTimeout(timer)
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText('npm install @juspay/blend-design-system')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-b border-gray-200">
            {/* Developer Section - Left */}
            <div className="lg:border-r border-gray-200">
                {/* Tab Header */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 bg-gray-50/80">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-400"
                    >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                    </svg>
                    <span className="font-mono text-sm text-gray-600">
                        developers.txt
                    </span>
                    <button
                        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close tab"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Code Content */}
                <div className="p-6">
                    <div className="font-mono text-sm leading-7">
                        <div className="flex gap-4">
                            {/* Line Numbers */}
                            <div className="text-gray-300 select-none text-right w-6">
                                <div>1</div>
                                <div>2</div>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                            </div>

                            {/* Code Content */}
                            <div className="flex-1 text-gray-800">
                                <div className="font-semibold">For Devs</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">-</span>
                                    <span>Component Library</span>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-sans font-medium">
                                        The Intern
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">-</span>
                                    <span>
                                        Code Examples &amp; Best Practices
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">-</span>
                                    <span>Tokens</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-400">-</span>
                                    <a
                                        href="/docs"
                                        className="text-blue-600 hover:underline inline-flex items-center gap-1"
                                    >
                                        Developer Docs
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terminal */}
                <div className="border-t border-gray-200">
                    <div className="flex items-center gap-1 px-4 pt-3">
                        <button className="text-xs font-mono text-gray-400 px-2 py-1">
                            OUTPUT
                        </button>
                        <button className="text-xs font-mono text-gray-800 px-2 py-1 border-b-2 border-gray-800">
                            TERMINAL
                        </button>
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between">
                        <code className="text-sm font-mono text-green-700">
                            npm install @juspay/blend-design-system
                        </code>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600"
                            aria-label="Copy install command"
                        >
                            {copied ? (
                                <Check size={14} className="text-green-600" />
                            ) : (
                                <Copy size={14} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Designer Section - Right */}
            <div className="relative overflow-hidden min-h-[400px]">
                {/* Canvas Background */}
                <DitherCanvas className="opacity-60" />

                {/* Tab Header */}
                <div className="relative z-10 flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-gray-400"
                    >
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                    <span className="font-mono text-sm text-gray-600 flex items-center gap-1.5">
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="text-gray-400"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path d="M12 8v4M12 16h.01" />
                        </svg>
                        Designers
                    </span>
                    <button
                        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close tab"
                    >
                        <X size={14} />
                    </button>
                </div>

                {/* Designer Content */}
                <div className="relative z-10 p-6">
                    {/* Collaborative Cursors */}
                    {showCursors && (
                        <>
                            <CollaborativeCursor
                                name="Rishabh"
                                color="purple"
                                x={120}
                                y={80}
                                delay={0.5}
                            />
                            <CollaborativeCursor
                                name="You"
                                color="red"
                                x={280}
                                y={60}
                                delay={0.7}
                            />
                        </>
                    )}

                    {/* Figma Modal */}
                    <div className="mt-12 flex justify-center">
                        <div className="border border-gray-200 rounded-lg bg-white shadow-lg p-6 w-full max-w-xs">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                                <span className="text-sm font-medium text-gray-900">
                                    Blend Design System
                                </span>
                                <button
                                    className="text-gray-400 hover:text-gray-600"
                                    aria-label="Close modal"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Placeholder content lines */}
                            <div className="space-y-2 mb-5">
                                <div className="h-2.5 bg-gray-100 rounded w-full" />
                                <div className="h-2.5 bg-gray-100 rounded w-3/4" />
                            </div>

                            {/* Figma File Button */}
                            <a
                                href="https://www.figma.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between w-full px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="text-gray-700"
                                    >
                                        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v4.49c0 2.476-2.013 4.49-4.588 4.49zm0-7.51h3.117v3.019c0 1.665-1.355 3.019-3.019 3.019h-.098c-1.665 0-3.019-1.354-3.019-3.019 0-1.665 1.355-3.019 3.019-3.019zM8.148 15.02h4.588V8.981H8.148c-2.476 0-4.49 2.014-4.49 4.49s2.014 4.49 4.49 4.49v-2.941zm0 0" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-800">
                                        Figma File
                                    </span>
                                </div>
                                <ExternalLink
                                    size={14}
                                    className="text-gray-400"
                                />
                            </a>
                        </div>
                    </div>

                    {/* Chat Bubble */}
                    {showCursors && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.4 }}
                            className="absolute bottom-8 right-8 z-20"
                        >
                            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md relative">
                                <div className="absolute -top-2 left-4 w-0 h-0 border-l-6 border-r-6 border-b-8 border-transparent border-b-green-500" />
                                <p className="text-sm">Can we add gradients?</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
