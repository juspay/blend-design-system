/**
 * External links used across the application
 */
export const EXTERNAL_LINKS = {
    github: 'https://github.com/juspay/blend-design-system',
    figma: 'https://www.figma.com/design/fHb0XUhWXZErq97C6N9uG3/Blend-Design-System',
    storybook: 'https://blend.juspay.design/storybook',
    privacyPolicy: 'https://juspay.io/privacy-policy',
    termsOfService: 'https://juspay.io/terms',
    // GitHub video: 'https://github.com/user-attachments/assets/VIDEO_ID'
    // Local video: Place your video file in public/videos/ and use path like '/videos/launch-video.mp4'
    // YouTube: 'https://www.youtube.com/watch?v=VIDEO_ID'
    // Vimeo: 'https://vimeo.com/VIDEO_ID'
    launchVideo:
        'https://firebasestorage.googleapis.com/v0/b/storybook-452807.firebasestorage.app/o/videos%2Fpublic%2Fdemos%2Flaunch_video.mp4?alt=media&token=bfeec020-b0e9-4216-842a-21db170f1e33',
} as const

/**
 * Internal routes
 */
export const ROUTES = {
    home: '/',
    docs: '/docs',
    blog: '/blog',
    blogWhyWeNamedItBlend: '/blog/why-we-named-it-blend',
    changelog: '/changelog',
} as const
