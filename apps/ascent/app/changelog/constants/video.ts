// Video URL validation patterns
export const VIDEO_URL_PATTERNS = {
    YOUTUBE: /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,
    VIMEO: /vimeo\.com\/(\d+)/,
} as const

// Video platform detection
export const VIDEO_PLATFORMS = {
    YOUTUBE_HOSTNAMES: [
        'www.youtube.com',
        'youtube.com',
        'youtu.be',
    ] as readonly string[],
    VIMEO_HOSTNAMES: ['vimeo.com', 'www.vimeo.com'] as readonly string[],
} as const

// Video embed URLs
export const VIDEO_EMBED_URLS = {
    YOUTUBE_BASE: 'https://www.youtube.com/embed',
    VIMEO_BASE: 'https://player.vimeo.com/video',
} as const

// Video iframe attributes
export const VIDEO_IFRAME_ATTRIBUTES = {
    YOUTUBE_ALLOW:
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
    VIMEO_ALLOW: 'autoplay; fullscreen; picture-in-picture',
} as const

// Video error messages
export const VIDEO_ERROR_MESSAGES = {
    UNSUPPORTED_BROWSER: 'Your browser does not support the video tag.',
    DOWNLOAD_LINK_TEXT: 'Download the video',
} as const

// Video parameter names
export const VIDEO_PARAMS = {
    AUTOPLAY: 'autoplay',
    MUTE: 'mute',
    MUTED: 'muted',
    LOOP: 'loop',
    CONTROLS: 'controls',
} as const
