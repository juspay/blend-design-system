'use client'

import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import DitherCanvas from '../effects/DitherCanvas'
import CollaborativeCursor from '../effects/CollaborativeCursor'
import { FigmaIconSmall, DesignerIcon, ArrowRightIcon } from '../../../icons'
import { EXTERNAL_LINKS } from '@/lib/constants'
import Link from 'next/link'

export default function DesignerSection() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [isHovering, setIsHovering] = useState(false)
    const rafRef = useRef<number | null>(null)
    const designerSectionRef = useRef<HTMLDivElement>(null)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)')
        const update = () => setIsDesktop(mq.matches)
        update()
        mq.addEventListener('change', update)
        return () => mq.removeEventListener('change', update)
    }, [])

    useEffect(() => {
        const section = designerSectionRef.current
        if (!section) return

        const handleMouseMove = (e: MouseEvent) => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => {
                if (!designerSectionRef.current) return
                const rect = designerSectionRef.current.getBoundingClientRect()
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                })
            })
        }
        const handleMouseEnter = () => setIsHovering(true)
        const handleMouseLeave = () => {
            setIsHovering(false)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }

        section.addEventListener('mousemove', handleMouseMove)
        section.addEventListener('mouseenter', handleMouseEnter)
        section.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            section.removeEventListener('mousemove', handleMouseMove)
            section.removeEventListener('mouseenter', handleMouseEnter)
            section.removeEventListener('mouseleave', handleMouseLeave)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <div
            ref={designerSectionRef}
            className="relative overflow-hidden min-h-0 lg:min-h-100 border-t lg:border-t-0  border-border cursor-none px-6 lg:px-0 flex flex-col"
        >
            <DitherCanvas className="opacity-60" />

            <div className="relative z-10 border-b border-border bg-background/80 backdrop-blur-sm flex items-center">
                <span className="px-2.25">
                    <FigmaIconSmall width={14} height={14} />
                </span>
                <div className="border-x border-border py-2 flex items-center gap-2 w-fit px-3">
                    <DesignerIcon
                        width={12}
                        height={12}
                        className="text-muted-foreground"
                    />
                    <span className="text-sm text-muted-foreground">
                        Designers
                    </span>
                    <X size={14} className="text-muted-foreground" />
                </div>
            </div>

            <div className="relative z-10 p-6 min-h-62.5 lg:min-h-100 lg:h-full flex flex-col items-center justify-center">
                {isDesktop && (
                    <>
                        <CollaborativeCursor
                            name="Vimal"
                            color="blue"
                            x={130}
                            y={130}
                            delay={0.3}
                            direction="up"
                            animateFrom={{ x: -50, y: -50 }}
                        />
                        <CollaborativeCursor
                            name=""
                            color="green"
                            x={380}
                            y={320}
                            delay={0.7}
                            comment="Can we add gradients?"
                            direction="none"
                            animateFrom={{ x: 820, y: 420 }}
                        />
                        {isHovering && (
                            <CollaborativeCursor
                                name="You"
                                color="red"
                                x={mousePosition.x}
                                y={mousePosition.y}
                                delay={0}
                                direction="up"
                            />
                        )}
                    </>
                )}

                <div className="w-full max-w-64">
                    <div className="border border-border rounded-lg bg-background shadow-lg p-2">
                        <div className="flex items-center justify-between pb-3">
                            <span className="text-sm font-semibold text-foreground">
                                Blend Design System
                            </span>
                            <X size={14} className="text-muted-foreground" />
                        </div>
                        <div className="space-y-2 mb-6">
                            <div className="h-2.5 bg-secondary rounded w-4/5" />
                            <div className="h-2.5 bg-secondary rounded w-2/3" />
                            <div className="h-2.5 bg-secondary rounded w-1/2" />
                        </div>
                        <Link
                            href={EXTERNAL_LINKS.figma}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 justify-center w-full px-2 py-1.5 border border-border rounded-lg hover:bg-surface transition-colors"
                        >
                            <FigmaIconSmall width={14} height={14} />
                            <span className="text-sm font-medium text-foreground">
                                Figma File
                            </span>
                            <ArrowRightIcon width={14} height={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
