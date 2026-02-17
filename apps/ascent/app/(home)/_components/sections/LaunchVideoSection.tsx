'use client'

import { useState } from 'react'
import { EXTERNAL_LINKS } from '../constants/links'

/**
 * Converts YouTube watch URL to embed URL
 */
const getYouTubeEmbedUrl = (url: string): string | null => {
    const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    const videoId = match && match[2].length === 11 ? match[2] : null

    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    }
    return null
}

/**
 * Converts Vimeo URL to embed URL
 */
const getVimeoEmbedUrl = (url: string): string | null => {
    const regExp = /vimeo\.com\/(\d+)/
    const match = url.match(regExp)
    const videoId = match ? match[1] : null

    if (videoId) {
        return `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`
    }
    return null
}

/**
 * Checks if URL is a GitHub user-attachments video
 */
const isGitHubVideo = (url: string): boolean => {
    return url.includes('github.com/user-attachments/assets')
}

/**
 * Checks if URL is a local video file (starts with / or relative path)
 */
const isLocalVideo = (url: string): boolean => {
    return url.startsWith('/') || url.startsWith('./')
}

/**
 * Detects video platform and returns appropriate URL/type
 */
const getVideoInfo = (
    url: string
): {
    url: string
    type: 'youtube' | 'vimeo' | 'github' | 'local' | 'direct' | null
} => {
    if (!url) return { url: '', type: null }

    // Check if it's a YouTube URL
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const embedUrl = getYouTubeEmbedUrl(url)
        return { url: embedUrl || url, type: embedUrl ? 'youtube' : null }
    }

    // Check if it's a Vimeo URL
    if (url.includes('vimeo.com')) {
        const embedUrl = getVimeoEmbedUrl(url)
        return { url: embedUrl || url, type: embedUrl ? 'vimeo' : null }
    }

    // Check if it's a GitHub video (CORS blocked - need to download and host locally)
    if (isGitHubVideo(url)) {
        return { url, type: 'github' }
    }

    // Check if it's a local video file
    if (isLocalVideo(url)) {
        return { url, type: 'local' }
    }

    // Assume it's a direct video URL (mp4, webm, etc.)
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
    const hasVideoExtension = videoExtensions.some((ext) =>
        url.toLowerCase().includes(ext)
    )

    if (hasVideoExtension || url.includes('video') || url.includes('media')) {
        return { url, type: 'direct' }
    }

    return { url, type: null }
}

export default function LaunchVideoSection() {
    const [isExpanded, setIsExpanded] = useState(false)
    const videoUrl = EXTERNAL_LINKS.launchVideo
    const videoInfo = videoUrl
        ? getVideoInfo(videoUrl)
        : { url: '', type: null }

    if (!videoInfo.url || !videoInfo.type) {
        // Fallback to link if no video URL is set
        return (
            <div className="flex items-center justify-center py-5 px-8 border-t border-gray-200 bg-gray-50">
                <a
                    href={videoUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-gray-500 hover:text-gray-800 transition-colors font-mono text-sm group"
                >
                    <span>🎉</span>
                    <span className="text-sm">Blend&apos;s Launch Video</span>
                    <span className="text-gray-400">&rarr;</span>
                </a>
            </div>
        )
    }

    return (
        <div className="border-t border-gray-200 bg-gray-50">
            {/* Header - Clickable to expand/collapse */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center py-5 px-8 hover:bg-gray-100 transition-colors group"
            >
                <div className="inline-flex items-center gap-3 text-gray-500 group-hover:text-gray-800 transition-colors font-mono text-sm">
                    <span>🎉</span>
                    <span className="text-sm">Blend&apos;s Launch Video</span>
                    <span
                        className={`text-gray-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-90' : ''
                        }`}
                    >
                        &rarr;
                    </span>
                </div>
            </button>

            {/* Video - Expandable */}
            {isExpanded && (
                <div className="px-8 pb-8">
                    {videoInfo.type === 'github' ? (
                        // GitHub videos blocked by CORS - show download instructions
                        <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center p-8 text-center">
                            <div className="mb-4">
                                <svg
                                    className="w-16 h-16 text-gray-400 mx-auto"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                Video Hosting Required
                            </h3>
                            <p className="text-sm text-gray-600 mb-4 max-w-md">
                                GitHub videos cannot be embedded directly due to
                                CORS restrictions. Please download the video and
                                place it in{' '}
                                <code className="bg-gray-200 px-1 rounded">
                                    public/videos/
                                </code>
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <a
                                    href={videoInfo.url}
                                    download
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900 transition-colors text-sm"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                        />
                                    </svg>
                                    Download Video
                                </a>
                                <a
                                    href={videoInfo.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors text-sm"
                                >
                                    Open in New Tab
                                </a>
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                After downloading, update{' '}
                                <code className="bg-gray-200 px-1 rounded">
                                    links.ts
                                </code>{' '}
                                to:{' '}
                                <code className="bg-gray-200 px-1 rounded">
                                    /videos/your-video.mp4
                                </code>
                            </p>
                        </div>
                    ) : videoInfo.type === 'youtube' ||
                      videoInfo.type === 'vimeo' ? (
                        // YouTube/Vimeo - use iframe
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                            <iframe
                                src={videoInfo.url}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Blend's Launch Video"
                            />
                        </div>
                    ) : (
                        // Local or direct video files - use HTML5 video element
                        <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                            <video
                                src={videoInfo.url}
                                className="w-full h-full object-contain"
                                controls
                                preload="metadata"
                                playsInline
                            >
                                <p className="text-gray-400 p-4">
                                    Your browser does not support the video tag.
                                    <a
                                        href={videoInfo.url}
                                        className="text-blue-500 hover:underline ml-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open video in new tab
                                    </a>
                                </p>
                            </video>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
