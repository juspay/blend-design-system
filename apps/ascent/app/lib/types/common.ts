/**
 * Shared types across all modules
 * Common type definitions for better consistency
 * Consolidated from app/shared/types/common.ts
 */

// Base metadata interface - used by all modules
export interface BaseMetadata {
    title: string
    description: string
    author: string
    siteUrl: string
    language: string
}

// Base configuration interface - common config pattern
export interface BaseConfig {
    title: string
    baseRoute: string
    contentPath: string
    maxWidth: string
    containerPadding: string
}

// Extended metadata for modules with additional fields
export interface ExtendedMetadata extends BaseMetadata {
    keywords?: string[]
    ogImage?: string
    twitterCard?: 'summary' | 'summary_large_image'
    canonical?: string
}

// Navigation item interface - used in layouts
export interface NavigationItem {
    label: string
    href: string
    external?: boolean
    ariaLabel?: string
    icon?: React.ReactNode
}

// Content frontmatter base interface
export interface BaseFrontmatter {
    title: string
    description: string
    author?: string
    publishDate?: string
    lastModified?: string
    draft?: boolean
}

// Layout configuration interface
export interface LayoutConfig {
    navbarHeight: string
    maxSearchWidth: string
    iconSize: number
    sidebarWidth?: string
}

// External URLs interface
export interface ExternalUrls {
    github: string
    storybook: string
    [key: string]: string
}

// Route configuration interface
export interface RouteConfig {
    home: string
    docs: string
    blog: string
    changelog: string
    [key: string]: string
}

// CSS classes interface for type safety
export interface CSSClasses {
    [key: string]: string
}

// Content paths interface
export interface ContentPaths {
    blogContent: string
    docsContent: string
    changelogContent: string
    [key: string]: string
}

// Search result interface - used across modules
export interface SearchResult {
    title: string
    description: string
    url: string
    type: 'blog' | 'docs' | 'changelog' | 'component'
    category?: string
    tags?: string[]
}

// Table of contents item interface
export interface TOCItem {
    id: string
    title: string
    level: number
    children?: TOCItem[]
}

// Component metadata interface - for docs
export interface ComponentMetadata {
    slug: string
    title: string
    description: string
    category?: string
    tags?: string[]
    status?: 'stable' | 'beta' | 'alpha' | 'deprecated'
}

// Blog post base interface
export interface BlogPostBase {
    slug: string
    title: string
    description: string
    author: string
    publishDate: string
    category: string
    tags: string[]
    featured?: boolean
    readTime?: string
}

// Changelog entry base interface
export interface ChangelogEntryBase {
    version: string
    date: string
    type: 'major' | 'minor' | 'patch'
    changes: ChangelogChange[]
}

// Changelog change interface
export interface ChangelogChange {
    type: 'added' | 'changed' | 'deprecated' | 'removed' | 'fixed' | 'security'
    description: string
    component?: string
    breaking?: boolean
}

// Generic API response interface
export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

// Validation result interface
export interface ValidationResult<T = any> {
    isValid: boolean
    errors: string[]
    warnings?: string[]
    data?: T
}

// File system item interface
export interface FileSystemItem {
    name: string
    path: string
    type: 'file' | 'directory'
    extension?: string
    size?: number
    lastModified?: Date
}

// Theme configuration interface
export interface ThemeConfig {
    mode: 'light' | 'dark' | 'system'
    primaryColor?: string
    secondaryColor?: string
    fontFamily?: string
}

// Performance metrics interface
export interface PerformanceMetrics {
    loadTime: number
    renderTime: number
    bundleSize: number
    cacheHitRate?: number
}

// App-specific types
export interface AppFeatures {
    analytics: boolean
    search: boolean
    darkMode: boolean
    keyboardNavigation: boolean
}

export interface AppEnvironment {
    isDevelopment: boolean
    isProduction: boolean
    buildTime?: string
}

export interface AppUIConfig {
    navbar: {
        height: string
        background: string
    }
    sidebar: {
        width: string
        background: string
    }
    content: {
        maxWidth: string
        padding: string
    }
    icons: {
        size: number
        strokeWidth: number
    }
}
