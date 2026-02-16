'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Copy, Check, X, FileCode } from 'lucide-react'
import { motion } from 'motion/react'
import DitherCanvas from '../effects/DitherCanvas'
import CollaborativeCursor from '../effects/CollaborativeCursor'
import { FigmaIconSmall, DesignerIcon, ArrowRightIcon } from '../icons'

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
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-gray-200">
            <div className="lg:border-r border-gray-200 border-l ml-28">
                {/* Tab Header */}
                <div className="border-b border-gray-200">
                    <div className="border-r border-gray-200 py-2 flex items-center gap-2.5 w-fit px-3">
                        <FileCode color="#A7A8AA" size={14} />
                        <span className="font-mono text-sm text-[#A7A8AA]">
                            developers.txt
                        </span>
                        <X size={14} color="#A7A8AA" />
                    </div>
                </div>

                {/* Code Content */}
                <div className="p-6">
                    <div className="font-mono text-sm">
                        <div className="flex gap-4">
                            {/* Line Numbers - aligned with text */}
                            <div className="text-blue-300 select-none text-right w-4">
                                <div className="text-xs leading-7">1</div>
                                <div className="text-xs leading-7">2</div>
                                <div className="text-xs leading-7">3</div>
                                <div className="text-xs leading-7">4</div>
                                <div className="text-xs leading-7">5</div>
                            </div>

                            {/* Code Content */}
                            <div className="flex-1 text-gray-800 font-medium">
                                <div className="text-xs leading-7">
                                    For Devs
                                </div>
                                <div className="flex items-center gap-2 text-xs leading-7">
                                    <span className="text-gray-400">-</span>
                                    <span>Component Library</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs leading-7">
                                    <span className="text-gray-400">-</span>
                                    <span>
                                        Code Examples &amp; Best Practices
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs leading-7">
                                    <span className="text-gray-400">-</span>
                                    <span>Tokens</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs leading-7">
                                    <span className="text-gray-400">-</span>
                                    <a
                                        href="/docs"
                                        className="bg-gray-100 hover:underline inline-flex items-center gap-1.5 px-1 rounded-md"
                                    >
                                        <span className="underline">
                                            Developer Docs
                                        </span>
                                        <ExternalLink size={12} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terminal */}
                <div className="border-t border-gray-200">
                    <div className="flex items-center gap-1 px-3 pt-2">
                        <button className="text-xs font-mono text-gray-400 px-2 py-1">
                            OUTPUT
                        </button>
                        <button className="text-xs font-mono text-gray-800 px-2 py-1 border-b-2 border-gray-800">
                            TERMINAL
                        </button>
                    </div>
                    <div className="px-3 py-2 flex items-center gap-2">
                        <code className="text-sm font-mono text-red-700">
                            npm install <span className="text-gray-500">@</span>
                            juspay
                            <span className="text-gray-500">/</span>
                            blend
                            <span className="text-gray-500">-</span>
                            design
                            <span className="text-gray-500">-</span>
                            system
                        </code>
                        <button
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-400 hover:text-gray-600"
                            aria-label="Copy install command"
                        >
                            {copied ? (
                                <Check size={14} className="text-red-600" />
                            ) : (
                                <Copy size={14} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Designer Section - Right */}
            <div className="relative overflow-hidden min-h-[400px] border-r border-gray-200 mr-28">
                <DitherCanvas className="opacity-60" />

                {/* Tab Header */}
                <div className="relative z-10 border-b border-gray-200 bg-white/80 backdrop-blur-sm flex items-center">
                    <span className="px-2.25">
                        <FigmaIconSmall width={14} height={14} />
                    </span>
                    <div className="border-r border-l border-gray-200 py-2 flex items-center gap-2 w-fit px-3">
                        <DesignerIcon width={12} height={12} />
                        <span className="text-sm text-[#A7A8AA]">
                            Designers
                        </span>
                        <X size={14} color="#A7A8AA" />
                    </div>
                </div>

                {/* Designer Content */}
                <div className="relative z-10 p-6 min-h-[400px] flex flex-col items-center justify-center">
                    {/* Collaborative Cursors */}
                    {showCursors && (
                        <>
                            <CollaborativeCursor
                                name="John"
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

                    {/* Blend Design System Card - Centered */}
                    <div className="w-full max-w-xs">
                        <div className="border border-gray-200 rounded-lg bg-white shadow-lg p-2">
                            <div className="flex items-center justify-between pb-3">
                                <span className="text-sm font-semibold text-gray-800">
                                    Blend Design System
                                </span>
                                <X
                                    size={14}
                                    className="text-gray-800"
                                    aria-label="Close modal"
                                />
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="h-2.5 bg-gray-100 rounded w-4/5" />
                                <div className="h-2.5 bg-gray-100 rounded w-2/3" />
                                <div className="h-2.5 bg-gray-100 rounded w-1/2" />
                            </div>

                            <a
                                href="https://www.figma.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 justify-center w-full px-2 py-1.25 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                <FigmaIconSmall width={14} height={14} />
                                <span className="text-sm font-medium text-gray-800">
                                    Figma File
                                </span>
                                <ArrowRightIcon width={14} height={14} />
                            </a>
                        </div>
                    </div>

                    {showCursors && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.5, duration: 0.4 }}
                            className="absolute bottom-8 right-8 z-20"
                        >
                            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md relative">
                                <div className="absolute -top-2 left-4 w-0 h-0 border-l-[6px] border-r-[6px] border-b-8 border-transparent border-b-green-500" />
                                <p className="text-sm">Can we add gradients?</p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
