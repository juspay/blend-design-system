import React from 'react'
import Image from 'next/image'

// ParagraphBlock component
export const ParagraphBlock = ({
    paragraphText,
}: {
    paragraphText: string
}) => {
    return (
        <p className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-lg text-base font-light text-[var(--grey-500)]">
            {paragraphText}
        </p>
    )
}

// SubHeadingBlock component
export const SubHeadingBlock = ({
    subHeadingText,
}: {
    subHeadingText: string
}) => {
    return (
        <h2 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl text-lg text-[var(--grey-100)]">
            {subHeadingText}
        </h2>
    )
}

// HeadingBlock component
export const HeadingBlock = ({ headingText }: { headingText: string }) => {
    return (
        <h1 className="xl:text-[length:var(--text-56)] lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl text-xl text-[var(--grey-100)]">
            {headingText}
        </h1>
    )
}

// DateBadge component
export const DateBadge = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className="border-[length:var(--pixel)] border-[var(--grey-400)] bg-transparent text-[var(--grey-300)] lg:p-3 md:p-2 p-1 lg:text-base sm:text-sm text-xs rounded-[var(--rounded-46)] w-fit">
            {children}
        </span>
    )
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
                thickness="p-[var(--pixel)]"
                borderColor="bg-[var(--search-bar-to)]"
                width="w-full"
                rounded="rounded-[var(--rounded-50)]"
                bgColor="bg-black"
                className="lg:p-14 md:p-12 sm:p-10 xs:p-8 p-6 flex flex-col lg:gap-16 md:gap-12 sm:gap-10 gap-8 transition bg-gradient-to-b from-[#161616] to-[var(--documentation-card-gradient-to)]"
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
        <div className="w-[90vw] lg:-ml-30 md:-ml-22 sm:-ml-14 xs:-ml-8 -ml-5 object-cover rounded-br-[20vw]">
            <Image
                src={imageUrl}
                width={100}
                height={100}
                className="w-full rounded-br-[20vw] object-cover"
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
                ((hostname === 'www.youtube.com' ||
                    hostname === 'youtube.com') &&
                    urlObj.pathname.includes('/watch')) ||
                hostname === 'youtu.be'
            )
        } catch {
            return false
        }
    }

    // Function to extract YouTube video ID and create embed URL
    const getYouTubeEmbedUrl = (url: string) => {
        const regExp =
            /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
        const match = url.match(regExp)
        const videoId = match && match[2].length === 11 ? match[2] : null

        if (videoId) {
            const params = new URLSearchParams()
            if (autoPlay) params.append('autoplay', '1')
            if (muted) params.append('mute', '1')
            if (loop) params.append('loop', '1')
            if (!controls) params.append('controls', '0')

            return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
        }
        return null
    }

    // Function to detect if URL is a Vimeo video
    const isVimeoUrl = (url: string) => {
        try {
            const urlObj = new URL(url)
            const hostname = urlObj.hostname.toLowerCase()
            return hostname === 'vimeo.com' || hostname === 'www.vimeo.com'
        } catch {
            return false
        }
    }

    // Function to extract Vimeo video ID and create embed URL
    const getVimeoEmbedUrl = (url: string) => {
        const regExp = /vimeo\.com\/(\d+)/
        const match = url.match(regExp)
        const videoId = match ? match[1] : null

        if (videoId) {
            const params = new URLSearchParams()
            if (autoPlay) params.append('autoplay', '1')
            if (muted) params.append('muted', '1')
            if (loop) params.append('loop', '1')

            return `https://player.vimeo.com/video/${videoId}?${params.toString()}`
        }
        return null
    }

    const containerClasses =
        'w-[90vw] lg:-ml-30 md:-ml-22 sm:-ml-14 xs:-ml-8 -ml-5 rounded-br-[20vw]'
    const videoClasses = 'w-full rounded-br-[20vw] object-cover'

    // Handle YouTube videos
    if (isYouTubeUrl(videoUrl)) {
        const embedUrl = getYouTubeEmbedUrl(videoUrl)
        if (embedUrl) {
            return (
                <div className={containerClasses}>
                    <iframe
                        src={embedUrl}
                        className={`${videoClasses} aspect-video`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
                <div className={containerClasses}>
                    <iframe
                        src={embedUrl}
                        className={`${videoClasses} aspect-video`}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        title={altText}
                    />
                </div>
            )
        }
    }

    // Handle direct video files (mp4, webm, etc.)
    return (
        <div className={containerClasses}>
            <video
                src={videoUrl}
                className={videoClasses}
                autoPlay={autoPlay}
                controls={controls}
                muted={muted}
                loop={loop}
                preload="metadata"
                aria-label={altText}
            >
                <p className="text-[var(--grey-400)]">
                    Your browser does not support the video tag.
                    <a
                        href={videoUrl}
                        className="text-[var(--primary)] hover:underline"
                    >
                        Download the video
                    </a>
                </p>
            </video>
        </div>
    )
}
