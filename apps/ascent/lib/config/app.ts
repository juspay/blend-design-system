/**
 * Centralized application configuration
 * Single source of truth for app-level constants
 */

// Core application constants
export const APP_CONFIG = {
    name: 'Blend Design System',
    description:
        'Modern React component library and design system documentation',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    version: '0.1.0',

    // SEO and metadata
    keywords: [
        'React',
        'Components',
        'Design System',
        'UI Library',
        'TypeScript',
        'Tailwind CSS',
        'Next.js',
        'Documentation',
        'Juspay',
        'Blend',
    ] as string[],

    // Social and branding
    author: {
        name: 'Juspay',
        url: 'https://juspay.in',
        twitter: '@juspay',
    },

    // External links
    links: {
        github: 'https://github.com/juspay/blend-design-system',
        storybook: 'https://juspay.design/storybook',
        website: 'https://juspay.in',
    },

    // Environment settings
    env: {
        isDevelopment: process.env.NODE_ENV === 'development',
        isProduction: process.env.NODE_ENV === 'production',
        buildTime: process.env.NEXT_PUBLIC_BUILD_TIME,
    },

    // Feature flags
    features: {
        analytics: false, // Enable when ready
        search: true,
        darkMode: true,
        keyboardNavigation: true,
    },

    // UI configuration
    ui: {
        navbar: {
            height: 'var(--navbar-height)',
            background: 'var(--sidebar-background)',
        },
        sidebar: {
            width: '240px',
            background: 'var(--sidebar-background)',
        },
        content: {
            maxWidth: '80ch',
            padding: 'px-4 md:px-2',
        },
        icons: {
            size: 18,
            strokeWidth: 2,
        },
    },

    // Performance settings
    performance: {
        enableSWR: true,
        cacheTimeout: 5 * 60 * 1000, // 5 minutes
        debounceDelay: 300,
    },
} as const

// Derived configurations
export const METADATA_CONFIG = {
    title: {
        template: `%s | ${APP_CONFIG.name}`,
        default: APP_CONFIG.name,
    },
    description: APP_CONFIG.description,
    keywords: APP_CONFIG.keywords,
    authors: [
        {
            name: APP_CONFIG.author.name,
            url: APP_CONFIG.author.url,
        },
    ],
    creator: APP_CONFIG.author.name,
    publisher: APP_CONFIG.author.name,
    metadataBase: new URL(APP_CONFIG.url),

    // Open Graph
    openGraph: {
        type: 'website' as const,
        locale: 'en_US',
        url: APP_CONFIG.url,
        siteName: APP_CONFIG.name,
        title: APP_CONFIG.name,
        description: APP_CONFIG.description,
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: APP_CONFIG.name,
            },
        ],
    },

    // Twitter
    twitter: {
        card: 'summary_large_image' as const,
        title: APP_CONFIG.name,
        description: APP_CONFIG.description,
        images: ['/og-image.png'],
        creator: APP_CONFIG.author.twitter,
    },

    // Robots
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large' as const,
            'max-snippet': -1,
        },
    },
}

// Environment-specific configurations
export const getEnvironmentConfig = () => {
    if (APP_CONFIG.env.isDevelopment) {
        return {
            logging: true,
            debugMode: true,
            hotReload: true,
        }
    }

    if (APP_CONFIG.env.isProduction) {
        return {
            logging: false,
            debugMode: false,
            analytics: APP_CONFIG.features.analytics,
            compression: true,
        }
    }

    return {
        logging: false,
        debugMode: false,
    }
}

// Type exports for better TypeScript support
export type AppConfig = typeof APP_CONFIG
export type MetadataConfig = typeof METADATA_CONFIG
export type EnvironmentConfig = ReturnType<typeof getEnvironmentConfig>
