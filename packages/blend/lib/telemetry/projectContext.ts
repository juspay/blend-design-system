/**
 * Project context detection utilities
 *
 * @fileoverview Utilities for detecting project information from browser environment
 * @package @juspay/blend-design-system
 */

import { ProjectContext } from './types'
import { ORGANIZATION_PATTERNS, APP_TYPE_PATTERNS } from './constants'

/**
 * Extract organization from hostname or document
 * @param hostname - Current hostname
 * @param faviconUrl - Favicon URL for organization hints
 * @returns Detected organization name
 */
function detectOrganization(hostname: string, faviconUrl?: string): string {
    const lowerHostname = hostname.toLowerCase()
    const lowerFavicon = faviconUrl?.toLowerCase() || ''

    // Check hostname patterns
    for (const [org, patterns] of Object.entries(ORGANIZATION_PATTERNS)) {
        if (
            org !== 'external' &&
            patterns.some((pattern) => lowerHostname.includes(pattern))
        ) {
            return org
        }
    }

    // Check favicon for organization hints
    for (const [org, patterns] of Object.entries(ORGANIZATION_PATTERNS)) {
        if (
            org !== 'external' &&
            patterns.some((pattern) => lowerFavicon.includes(pattern))
        ) {
            return org
        }
    }

    return 'external'
}

/**
 * Detect application type from hostname and pathname
 * @param hostname - Current hostname
 * @param pathname - Current pathname
 * @returns Detected application type
 */
function detectAppType(hostname: string, pathname: string): string {
    const fullDomain = hostname.toLowerCase() + pathname.toLowerCase()

    for (const [appType, patterns] of Object.entries(APP_TYPE_PATTERNS)) {
        if (patterns.some((pattern) => fullDomain.includes(pattern))) {
            return appType
        }
    }

    return 'app'
}

/**
 * Generate repository name from detected organization and app type
 * @param organization - Detected organization
 * @param appType - Detected application type
 * @param hostname - Current hostname for fallback
 * @returns Generated repository name
 */
function generateRepositoryName(
    organization: string,
    appType: string,
    hostname: string
): string {
    // Handle development/staging environments
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
        return 'local-development'
    }

    if (hostname.includes('staging') || hostname.includes('dev')) {
        return 'staging-environment'
    }

    // Generate meaningful repository name
    if (organization === 'external') {
        if (appType === 'app') {
            // Use sanitized hostname as identifier
            return `external-app-${hostname.replace(/[^a-zA-Z0-9]/g, '-')}`
        }
        return `external-${appType}-app`
    }

    return `${organization}-${appType}`
}

/**
 * Extract project information from document metadata
 * @returns Project metadata from document
 */
function extractDocumentMetadata() {
    if (typeof document === 'undefined') {
        return { title: '', applicationName: '', faviconUrl: '' }
    }

    const title = document.title.toLowerCase()
    const metaName = document.querySelector('meta[name="application-name"]')
    const applicationName = metaName?.getAttribute('content') || ''

    const favicon = document.querySelector(
        'link[rel*="icon"]'
    ) as HTMLLinkElement
    const faviconUrl = favicon?.href || ''

    return { title, applicationName, faviconUrl }
}

/**
 * Get comprehensive project context from browser environment
 * @returns Complete project context information
 */
export function getProjectContext(): ProjectContext {
    if (typeof window === 'undefined') {
        return {
            pageUrl: '',
            pageRoute: '',
            domain: 'server',
            repositoryName: 'unknown',
            projectVersion: 'unknown',
        }
    }

    const { href, hostname, pathname, search, port } = window.location
    const { applicationName, faviconUrl } = extractDocumentMetadata()

    // Check for build-time injected package info
    let repositoryName = 'unknown'
    let projectVersion = 'unknown'
    let projectDescription: string | undefined

    if ((window as any).__PACKAGE_INFO__) {
        const packageInfo = (window as any).__PACKAGE_INFO__
        repositoryName = packageInfo.name || repositoryName
        projectVersion = packageInfo.version || projectVersion
        projectDescription = packageInfo.description
    }

    // Generate repository name if not available from package info
    if (repositoryName === 'unknown') {
        if (applicationName) {
            repositoryName = applicationName
        } else {
            const organization = detectOrganization(hostname, faviconUrl)
            const appType = detectAppType(hostname, pathname)
            repositoryName = generateRepositoryName(
                organization,
                appType,
                hostname
            )
        }
    }

    return {
        pageUrl: href,
        pageRoute: pathname + search,
        domain: hostname + (port ? `:${port}` : ''),
        repositoryName,
        projectVersion,
        projectDescription,
    }
}
