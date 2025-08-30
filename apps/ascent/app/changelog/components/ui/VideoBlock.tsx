const VideoBlock = ({
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
        return url.includes('youtube.com/watch') || url.includes('youtu.be/')
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
        return url.includes('vimeo.com/')
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

export default VideoBlock
