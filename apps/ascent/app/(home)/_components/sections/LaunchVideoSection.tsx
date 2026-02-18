'use client'

import { useState, useMemo } from 'react'
import { EXTERNAL_LINKS } from '../constants/links'

type VideoType = 'local' | 'direct' | null

const isLocalVideo = (url: string): boolean => {
    return url.startsWith('/') || url.startsWith('./')
}

const getVideoInfo = (url: string): { url: string; type: VideoType } => {
    if (!url) return { url: '', type: null }

    if (isLocalVideo(url)) {
        return { url, type: 'local' }
    }

    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
    const hasVideoExtension = videoExtensions.some((ext) =>
        url.toLowerCase().includes(ext)
    )

    if (hasVideoExtension) {
        return { url, type: 'direct' }
    }

    return { url, type: null }
}

export default function LaunchVideoSection() {
    const [isExpanded, setIsExpanded] = useState(false)
    const videoUrl = EXTERNAL_LINKS.launchVideo

    const videoInfo = useMemo(
        () => (videoUrl ? getVideoInfo(videoUrl) : { url: '', type: null }),
        [videoUrl]
    )

    if (!videoInfo.url || !videoInfo.type) {
        return (
            <div className="flex items-center justify-center py-5 px-8 border-t border-gray-200 bg-gray-50">
                <a
                    href={videoUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-gray-500 hover:text-gray-800 transition-colors font-mono text-sm group"
                >
                    <span>🎉</span>
                    <span>Blend&apos;s Launch Video</span>
                    <span className="text-gray-400">&rarr;</span>
                </a>
            </div>
        )
    }

    return (
        <div className="border-t border-gray-200 bg-gray-50">
            <button
                onClick={() => setIsExpanded((prev) => !prev)}
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

            {isExpanded && (
                <div className="px-8 pb-8">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                        <video
                            src={videoInfo.url}
                            className="w-full h-full object-contain"
                            controls
                            preload="metadata"
                            playsInline
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
