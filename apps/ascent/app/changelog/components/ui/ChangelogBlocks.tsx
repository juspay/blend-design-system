import React from 'react'
import Image from 'next/image'
import {
    TYPOGRAPHY_CLASSES,
    BADGE_CLASSES,
    MEDIA_CLASSES,
    CARD_CLASSES,
    GRADIENT_BORDER_DEFAULTS,
    VIDEO_URL_PATTERNS,
    VIDEO_PLATFORMS,
    VIDEO_EMBED_URLS,
    VIDEO_IFRAME_ATTRIBUTES,
    VIDEO_ERROR_MESSAGES,
    VIDEO_PARAMS,
} from '../../constants'

// ParagraphBlock component
export const ParagraphBlock = ({
    paragraphText,
}: {
    paragraphText: string
}) => {
    return <p className={TYPOGRAPHY_CLASSES.PARAGRAPH}>{paragraphText}</p>
}

// SubHeadingBlock component
export const SubHeadingBlock = ({
    subHeadingText,
}: {
    subHeadingText: string
}) => {
    return <h2 className={TYPOGRAPHY_CLASSES.SUB_HEADING}>{subHeadingText}</h2>
}

// HeadingBlock component
export const HeadingBlock = ({ headingText }: { headingText: string }) => {
    return <h1 className={TYPOGRAPHY_CLASSES.HEADING}>{headingText}</h1>
}

// DateBadge component
export const DateBadge = ({ children }: { children: React.ReactNode }) => {
    return <span className={BADGE_CLASSES.DATE_BADGE}>{children}</span>
}

// GradientBorderWrapper component
export const GradientBorderWrapper = ({
    children,
    thickness,
    borderColor,
    width,
    height,
    rounded,
    bgColor,
    className,
}: {
    children: React.ReactNode
    thickness: string
    borderColor: string
    width: string
    bgColor: string
    height?: string
    rounded?: string
    className?: string
}) => {
    return (
        <div
            className={`${thickness} ${borderColor} ${width} ${height} ${rounded}`}
        >
            <div className={`h-full w-full ${bgColor} ${rounded} ${className}`}>
                {children}
            </div>
        </div>
    )
}

// ChangeLogCard component
export const ChangeLogCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <article>
            <GradientBorderWrapper
                thickness={GRADIENT_BORDER_DEFAULTS.THICKNESS}
                borderColor={GRADIENT_BORDER_DEFAULTS.BORDER_COLOR}
                width={GRADIENT_BORDER_DEFAULTS.WIDTH}
                rounded={GRADIENT_BORDER_DEFAULTS.ROUNDED}
                bgColor={GRADIENT_BORDER_DEFAULTS.BG_COLOR}
                className={CARD_CLASSES.CHANGELOG_CARD_INNER}
            >
                {children}
            </GradientBorderWrapper>
        </article>
    )
}

// ImageBlock component
export const ImageBlock = ({
    imageUrl,
    altText,
}: {
    imageUrl: string
    altText: string
}) => {
    return (
        <div className={MEDIA_CLASSES.CONTAINER}>
            <Image
                src={imageUrl}
                width={100}
                height={100}
                className={MEDIA_CLASSES.MEDIA_ELEMENT}
                alt={altText}
            />
        </div>
    )
}

// VideoBlock component
export const VideoBlock = ({
    videoUrl,
    altText = 'Video content',
    autoPlay = false,
    controls = true,
    muted = true,
    loop = false,
}: {
    videoUrl: string
    altText?: string
    autoPlay?: boolean
    controls?: boolean
    muted?: boolean
    loop?: boolean
}) => {
    // Function to detect if URL is a YouTube video
    const isYouTubeUrl = (url: string) => {
        try {
            const urlObj = new URL(url)
            const hostname = urlObj.hostname.toLowerCase()
            return (
                (VIDEO_PLATFORMS.YOUTUBE_HOSTNAMES.includes(hostname) &&
                    urlObj.pathname.includes('/watch')) ||
                hostname === 'youtu.be'
            )
        } catch {
            return false
        }
    }

    // Function to extract YouTube video ID and create embed URL
    const getYouTubeEmbedUrl = (url: string) => {
        const match = url.match(VIDEO_URL_PATTERNS.YOUTUBE)
        const videoId = match && match[2].length === 11 ? match[2] : null

        if (videoId) {
            const params = new URLSearchParams()
            if (autoPlay) params.append(VIDEO_PARAMS.AUTOPLAY, '1')
            if (muted) params.append(VIDEO_PARAMS.MUTE, '1')
            if (loop) params.append(VIDEO_PARAMS.LOOP, '1')
            if (!controls) params.append(VIDEO_PARAMS.CONTROLS, '0')

            return `${VIDEO_EMBED_URLS.YOUTUBE_BASE}/${videoId}?${params.toString()}`
        }
        return null
    }

    // Function to detect if URL is a Vimeo video
    const isVimeoUrl = (url: string) => {
        try {
            const urlObj = new URL(url)
            const hostname = urlObj.hostname.toLowerCase()
            return VIDEO_PLATFORMS.VIMEO_HOSTNAMES.includes(hostname)
        } catch {
            return false
        }
    }

    // Function to extract Vimeo video ID and create embed URL
    const getVimeoEmbedUrl = (url: string) => {
        const match = url.match(VIDEO_URL_PATTERNS.VIMEO)
        const videoId = match ? match[1] : null

        if (videoId) {
            const params = new URLSearchParams()
            if (autoPlay) params.append(VIDEO_PARAMS.AUTOPLAY, '1')
            if (muted) params.append(VIDEO_PARAMS.MUTED, '1')
            if (loop) params.append(VIDEO_PARAMS.LOOP, '1')

            return `${VIDEO_EMBED_URLS.VIMEO_BASE}/${videoId}?${params.toString()}`
        }
        return null
    }

    // Handle YouTube videos
    if (isYouTubeUrl(videoUrl)) {
        const embedUrl = getYouTubeEmbedUrl(videoUrl)
        if (embedUrl) {
            return (
                <div className={MEDIA_CLASSES.CONTAINER}>
                    <iframe
                        src={embedUrl}
                        className={MEDIA_CLASSES.VIDEO_IFRAME}
                        allow={VIDEO_IFRAME_ATTRIBUTES.YOUTUBE_ALLOW}
                        allowFullScreen
                        title={altText}
                    />
                </div>
            )
        }
    }

    // Handle Vimeo videos
    if (isVimeoUrl(videoUrl)) {
        const embedUrl = getVimeoEmbedUrl(videoUrl)
        if (embedUrl) {
            return (
                <div className={MEDIA_CLASSES.CONTAINER}>
                    <iframe
                        src={embedUrl}
                        className={MEDIA_CLASSES.VIDEO_IFRAME}
                        allow={VIDEO_IFRAME_ATTRIBUTES.VIMEO_ALLOW}
                        allowFullScreen
                        title={altText}
                    />
                </div>
            )
        }
    }

    // Handle direct video files (mp4, webm, etc.)
    return (
        <div className={MEDIA_CLASSES.CONTAINER}>
            <video
                src={videoUrl}
                className={MEDIA_CLASSES.MEDIA_ELEMENT}
                autoPlay={autoPlay}
                controls={controls}
                muted={muted}
                loop={loop}
                preload="metadata"
                aria-label={altText}
            >
                <p className="text-[var(--grey-400)]">
                    {VIDEO_ERROR_MESSAGES.UNSUPPORTED_BROWSER}
                    <a
                        href={videoUrl}
                        className="text-[var(--primary)] hover:underline"
                    >
                        {VIDEO_ERROR_MESSAGES.DOWNLOAD_LINK_TEXT}
                    </a>
                </p>
            </video>
        </div>
    )
}
