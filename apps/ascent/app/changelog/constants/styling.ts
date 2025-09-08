// Typography and text styling constants
export const TYPOGRAPHY_CLASSES = {
    PARAGRAPH:
        'xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-lg text-base font-light text-[var(--grey-500)]',
    SUB_HEADING:
        'xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl text-lg text-[var(--grey-100)]',
    HEADING:
        'xl:text-[length:var(--text-56)] lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl text-xl text-[var(--grey-100)]',
} as const

// Badge styling constants
export const BADGE_CLASSES = {
    DATE_BADGE:
        'border-[length:var(--pixel)] border-[var(--grey-400)] bg-transparent text-[var(--grey-300)] lg:p-3 md:p-2 p-1 lg:text-base sm:text-sm text-xs rounded-[var(--rounded-46)] w-fit',
} as const

// Media container styling constants
export const MEDIA_CLASSES = {
    CONTAINER:
        'w-[90vw] lg:-ml-30 md:-ml-22 sm:-ml-14 xs:-ml-8 -ml-5 rounded-br-[20vw]',
    MEDIA_ELEMENT: 'w-full rounded-br-[20vw] object-cover',
    VIDEO_IFRAME: 'w-full rounded-br-[20vw] object-cover aspect-video',
} as const

// Card styling constants
export const CARD_CLASSES = {
    CHANGELOG_CARD_INNER:
        'lg:p-14 md:p-12 sm:p-10 xs:p-8 p-6 flex flex-col lg:gap-16 md:gap-12 sm:gap-10 gap-8 transition bg-gradient-to-b from-[#161616] to-[var(--documentation-card-gradient-to)]',
} as const

// Gradient border wrapper default props
export const GRADIENT_BORDER_DEFAULTS = {
    THICKNESS: 'p-[var(--pixel)]',
    BORDER_COLOR: 'bg-[var(--search-bar-to)]',
    WIDTH: 'w-full',
    ROUNDED: 'rounded-[var(--rounded-50)]',
    BG_COLOR: 'bg-black',
} as const
