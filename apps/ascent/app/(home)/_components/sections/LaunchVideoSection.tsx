'use client'

import { useState, useRef, useEffect } from 'react'
import { EXTERNAL_LINKS } from '../constants/links'

export default function LaunchVideoSection() {
    const [isExpanded, setIsExpanded] = useState(false)
    const videoRef = useRef<HTMLVideoElement | null>(null)

    const videoUrl = EXTERNAL_LINKS.launchVideo

    const handleToggle = () => {
        setIsExpanded((prev) => {
            const next = !prev

            if (!next && videoRef.current) {
                videoRef.current.pause()
                videoRef.current.currentTime = 0
            }

            return next
        })
    }

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsExpanded(false)
                if (videoRef.current) {
                    videoRef.current.pause()
                    videoRef.current.currentTime = 0
                }
            }
        }

        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [])

    useEffect(() => {
        if (!videoRef.current) return
        if (isExpanded) {
            videoRef.current.play().catch(() => {})
        } else {
            videoRef.current.pause()
            videoRef.current.currentTime = 0
        }
    }, [isExpanded])

    if (!videoUrl) return null

    return (
        <div className="border-t border-gray-200 bg-gray-50 border-b">
            <button
                onClick={handleToggle}
                className="w-full flex items-center justify-center py-5 px-8 hover:bg-gray-100 transition-colors group"
            >
                <div className="inline-flex items-center gap-3 text-gray-500 group-hover:text-gray-800 transition-colors font-mono text-sm">
                    <span>🎉</span>
                    <span>Blend&apos;s Launch Video</span>
                    <span
                        className={`text-gray-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                        }`}
                    >
                        &rarr;
                    </span>
                </div>
            </button>

            <div
                className={`transition-all duration-300 ease-out overflow-hidden ${
                    isExpanded ? 'max-h-[900px]' : 'max-h-0'
                }`}
            >
                <div className="lg:px-44 pb-20 lg:pb-8 px-8">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                        <video
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            controls
                            preload="metadata"
                            playsInline
                            poster="/images/thumnail.png"
                        >
                            <source src={videoUrl} type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </div>
    )
}
