'use client'

import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Copy, Check, X, FileCode } from 'lucide-react'
import DitherCanvas from '../effects/DitherCanvas'
import CollaborativeCursor from '../effects/CollaborativeCursor'
import { FigmaIconSmall, DesignerIcon, ArrowRightIcon } from '../icons'

export default function DeveloperDesignerSections() {
    const [copied, setCopied] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isMoving, setIsMoving] = useState(false)
    const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const designerSectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!designerSectionRef.current) return

            const rect = designerSectionRef.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            setMousePosition({ x, y })
            setIsMoving(true)

            if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)

            moveTimeoutRef.current = setTimeout(() => {
                setIsMoving(false)
            }, 120)
        }

        const section = designerSectionRef.current
        if (!section) return

        section.addEventListener('mousemove', handleMouseMove)

        return () => {
            section.removeEventListener('mousemove', handleMouseMove)
            if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current)
        }
    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText('npm install @juspay/blend-design-system')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] border-t border-gray-200">
            <div className="lg:border-r border-gray-200 border-l lg:ml-28">
                <div className="border-b border-gray-200">
                    <div className="border-r border-gray-200 py-2 flex items-center gap-2.5 w-fit px-3">
                        <FileCode color="#A7A8AA" size={14} />
                        <span className="font-mono text-sm text-[#A7A8AA]">
                            developers.txt
                        </span>
                        <X size={14} color="#A7A8AA" />
                    </div>
                </div>

                <div className="p-6">
                    <div className="font-mono text-sm">
                        <div className="flex gap-4">
                            <div className="text-blue-300 select-none text-right w-4">
                                <div className="text-xs leading-7">1</div>
                                <div className="text-xs leading-7">2</div>
                                <div className="text-xs leading-7">3</div>
                                <div className="text-xs leading-7">4</div>
                                <div className="text-xs leading-7">5</div>
                            </div>

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
                                        className="bg-gray-100 hover:underline inline-flex items-center gap-1.5 px-1 rounded-md cursor-pointer"
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
            <span
                className="
          w-12 h-full
          border-r border-gray-200
          bg-[repeating-linear-gradient(135deg,#E0E0E0_0px,#E0E0E0_1px,transparent_1px,transparent_14px)]
        "
            />
            <div
                ref={designerSectionRef}
                className="relative overflow-hidden min-h-[400px] border-r border-gray-200 lg:mr-28 cursor-none"
            >
                <DitherCanvas className="opacity-60" />

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

                <div className="relative z-10 p-6 min-h-[400px] flex flex-col items-center justify-center">
                    <CollaborativeCursor
                        name="Vimal"
                        color="blue"
                        x={180}
                        y={110}
                        delay={0.3}
                        direction="up"
                        animateFrom={{ x: -50, y: -50 }}
                    />
                    <CollaborativeCursor
                        name=""
                        color="green"
                        x={620}
                        y={320}
                        delay={0.7}
                        comment="Can we add gradients?"
                        direction="none"
                        animateFrom={{ x: 820, y: 420 }}
                    />
                    {isMoving && (
                        <CollaborativeCursor
                            name="You"
                            color="red"
                            x={mousePosition.x}
                            y={mousePosition.y}
                            delay={0}
                            direction="up"
                        />
                    )}

                    <div className="w-full max-w-xs">
                        <div className="border border-gray-200 rounded-lg bg-white shadow-lg p-2">
                            <div className="flex items-center justify-between pb-3">
                                <span className="text-sm font-semibold text-gray-800">
                                    Blend Design System
                                </span>
                                <X
                                    size={14}
                                    className="text-gray-800 cursor-pointer"
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
                                className="flex items-center gap-2 justify-center w-full px-2 py-1.25 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <FigmaIconSmall width={14} height={14} />
                                <span className="text-sm font-medium text-gray-800">
                                    Figma File
                                </span>
                                <ArrowRightIcon width={14} height={14} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
