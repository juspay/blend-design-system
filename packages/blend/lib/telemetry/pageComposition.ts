/**
 * Page Composition Manager for Blend Design System
 *
 * @fileoverview Manages page-level component composition tracking to eliminate
 * duplicate counting across multiple users on the same page
 * @package @juspay/blend-design-system
 */

import { ProjectContext } from './types'
import { getProjectContext } from './projectContext'
import { sanitizeProps } from './utils'

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface ComponentSummary {
    /** Component name (e.g., "Button", "Alert") */
    name: string
    /** Hash signature of component props */
    propsSignature: string
    /** Number of instances with this exact props configuration */
    instanceCount: number
    /** Sanitized props for this component configuration */
    sanitizedProps: Record<string, unknown>
}

export interface PageComposition {
    /** Unique fingerprint for this page + component combination */
    pageFingerprint: string
    /** Repository name from project context */
    repositoryName: string
    /** Current page route */
    pageRoute: string
    /** Deployment domain */
    domain: string
    /** All Blend components on this page */
    components: ComponentSummary[]
    /** Hash of the entire composition for change detection */
    compositionHash: string
    /** When this composition was detected */
    timestamp: number
    /** Project context information */
    projectContext: ProjectContext
}

export interface PageCompositionEvent {
    eventType: 'page_composition'
    pageComposition: PageComposition
    changeType:
        | 'new'
        | 'component_added'
        | 'component_removed'
        | 'props_changed'
    previousHash?: string
}

// =====================================================
// PAGE COMPOSITION MANAGER CLASS
// =====================================================

export class PageCompositionManager {
    private static instance: PageCompositionManager | null = null
    private components: Map<string, ComponentSummary> = new Map()
    private debounceTimer: NodeJS.Timeout | null = null
    private lastCompositionHash: string = ''
    private onCompositionChange:
        | ((event: PageCompositionEvent) => void)
        | null = null

    private constructor() {
        // Private constructor for singleton pattern
    }

    /**
     * Get singleton instance of PageCompositionManager
     */
    public static getInstance(): PageCompositionManager {
        if (!PageCompositionManager.instance) {
            PageCompositionManager.instance = new PageCompositionManager()
        }
        return PageCompositionManager.instance
    }

    /**
     * Set callback for composition change events
     */
    public setCompositionChangeHandler(
        handler: (event: PageCompositionEvent) => void
    ): void {
        this.onCompositionChange = handler
    }

    /**
     * Register a component instance on the current page
     */
    public registerComponent(
        componentName: string,
        props: Record<string, unknown>
    ): void {
        try {
            const sanitizedProps = sanitizeProps(props, componentName)
            const propsSignature = this.createPropsSignature(sanitizedProps)
            const componentKey = `${componentName}:${propsSignature}`

            const existing = this.components.get(componentKey)
            if (existing) {
                // Increment instance count for existing component+props combination
                existing.instanceCount++
            } else {
                // Add new component+props combination
                this.components.set(componentKey, {
                    name: componentName,
                    propsSignature,
                    instanceCount: 1,
                    sanitizedProps,
                })
            }

            // Schedule composition update with debouncing
            this.scheduleCompositionUpdate()
        } catch (error) {
            console.warn(
                'PageCompositionManager: Failed to register component',
                error
            )
        }
    }

    /**
     * Unregister a component instance from the current page
     */
    public unregisterComponent(
        componentName: string,
        props: Record<string, unknown>
    ): void {
        try {
            const sanitizedProps = sanitizeProps(props, componentName)
            const propsSignature = this.createPropsSignature(sanitizedProps)
            const componentKey = `${componentName}:${propsSignature}`

            const existing = this.components.get(componentKey)
            if (existing) {
                existing.instanceCount--

                // Remove component if no instances remain
                if (existing.instanceCount <= 0) {
                    this.components.delete(componentKey)
                }

                // Schedule composition update
                this.scheduleCompositionUpdate()
            }
        } catch (error) {
            console.warn(
                'PageCompositionManager: Failed to unregister component',
                error
            )
        }
    }

    /**
     * Get current page composition
     */
    public getCurrentComposition(): PageComposition {
        const projectContext = getProjectContext()
        const components = Array.from(this.components.values())
        const compositionHash = this.generateCompositionHash(components)
        const pageFingerprint = this.generatePageFingerprint(
            projectContext,
            compositionHash
        )

        return {
            pageFingerprint,
            repositoryName: projectContext.repositoryName || 'unknown',
            pageRoute: projectContext.pageRoute,
            domain: projectContext.domain,
            components,
            compositionHash,
            timestamp: Date.now(),
            projectContext,
        }
    }

    /**
     * Clear all registered components (useful for testing)
     */
    public clearComponents(): void {
        this.components.clear()
        this.lastCompositionHash = ''

        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer)
            this.debounceTimer = null
        }
    }

    /**
     * Get current component registry status
     */
    public getStatus(): {
        componentCount: number
        uniqueComponents: string[]
        totalInstances: number
        lastCompositionHash: string
    } {
        const components = Array.from(this.components.values())
        const uniqueComponents = [...new Set(components.map((c) => c.name))]
        const totalInstances = components.reduce(
            (sum, c) => sum + c.instanceCount,
            0
        )

        return {
            componentCount: this.components.size,
            uniqueComponents,
            totalInstances,
            lastCompositionHash: this.lastCompositionHash,
        }
    }

    // =====================================================
    // PRIVATE METHODS
    // =====================================================

    /**
     * Schedule composition update with debouncing
     */
    private scheduleCompositionUpdate(): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer)
        }

        // Wait for all components to register before sending composition
        this.debounceTimer = setTimeout(() => {
            this.processCompositionUpdate()
        }, 2000) // 2 second debounce to reduce excessive firing
    }

    /**
     * Process composition update and detect changes
     */
    private processCompositionUpdate(): void {
        try {
            const currentComposition = this.getCurrentComposition()
            const currentHash = currentComposition.compositionHash

            // Detect change type
            let changeType: PageCompositionEvent['changeType'] = 'new'

            if (this.lastCompositionHash) {
                if (this.lastCompositionHash === currentHash) {
                    // No change - don't send event
                    return
                }

                // Determine specific change type
                changeType = this.detectChangeType(
                    this.lastCompositionHash,
                    currentHash
                )
            }

            // Create composition event
            const event: PageCompositionEvent = {
                eventType: 'page_composition',
                pageComposition: currentComposition,
                changeType,
                previousHash: this.lastCompositionHash || undefined,
            }

            // Update last known hash
            this.lastCompositionHash = currentHash

            // Notify handler
            if (this.onCompositionChange) {
                this.onCompositionChange(event)
            }
        } catch (error) {
            console.warn(
                'PageCompositionManager: Failed to process composition update',
                error
            )
        }
    }

    /**
     * Create consistent hash signature from component props
     */
    private createPropsSignature(props: Record<string, unknown>): string {
        // Sort keys for consistent hashing
        const sortedKeys = Object.keys(props).sort()
        const propsString = sortedKeys
            .map((key) => `${key}:${props[key]}`)
            .join('|')

        // Simple but effective hash function
        let hash = 0
        for (let i = 0; i < propsString.length; i++) {
            const char = propsString.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convert to 32-bit integer
        }

        return Math.abs(hash).toString(36)
    }

    /**
     * Generate hash for entire page composition
     */
    private generateCompositionHash(components: ComponentSummary[]): string {
        // Sort components for consistent hashing
        const sortedComponents = components.slice().sort((a, b) => {
            const nameCompare = a.name.localeCompare(b.name)
            if (nameCompare !== 0) return nameCompare
            return a.propsSignature.localeCompare(b.propsSignature)
        })

        const compositionString = sortedComponents
            .map((c) => `${c.name}:${c.propsSignature}:${c.instanceCount}`)
            .join('|')

        // Hash the composition string
        let hash = 0
        for (let i = 0; i < compositionString.length; i++) {
            const char = compositionString.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash
        }

        return Math.abs(hash).toString(36)
    }

    /**
     * Generate unique page fingerprint
     */
    private generatePageFingerprint(
        projectContext: ProjectContext,
        compositionHash: string
    ): string {
        const repository = projectContext.repositoryName || 'unknown'
        const route = projectContext.pageRoute || '/'

        return `${repository}::${route}::${compositionHash}`
    }

    /**
     * Detect specific type of change between compositions
     */
    private detectChangeType(
        previousHash: string,
        currentHash: string
    ): PageCompositionEvent['changeType'] {
        // For now, we'll use a simple approach
        // In the future, we could store previous composition and do detailed comparison

        if (!previousHash) {
            return 'new'
        }

        if (previousHash !== currentHash) {
            // Could be component_added, component_removed, or props_changed
            // For simplicity, we'll call it props_changed for now
            return 'props_changed'
        }

        return 'props_changed'
    }

    /**
     * Cleanup resources
     */
    public destroy(): void {
        if (this.debounceTimer) {
            clearTimeout(this.debounceTimer)
            this.debounceTimer = null
        }

        this.components.clear()
        this.onCompositionChange = null
        this.lastCompositionHash = ''
    }
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

/**
 * Get the global page composition manager instance
 */
export function getPageCompositionManager(): PageCompositionManager {
    return PageCompositionManager.getInstance()
}

/**
 * Register a component with the page composition manager
 */
export function registerPageComponent(
    componentName: string,
    props: Record<string, unknown>
): void {
    const manager = getPageCompositionManager()
    manager.registerComponent(componentName, props)
}

/**
 * Unregister a component from the page composition manager
 */
export function unregisterPageComponent(
    componentName: string,
    props: Record<string, unknown>
): void {
    const manager = getPageCompositionManager()
    manager.unregisterComponent(componentName, props)
}
