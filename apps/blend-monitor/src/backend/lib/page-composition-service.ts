/**
 * Page Composition Service
 *
 * @fileoverview Service for managing page-level component composition data
 * with global deduplication and change tracking
 */

import { query } from './database'

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface ComponentSummary {
    name: string
    propsSignature: string
    instanceCount: number
    sanitizedProps: Record<string, unknown>
}

export interface PageCompositionData {
    pageFingerprint: string
    repositoryName: string
    pageRoute: string
    domain: string
    compositionHash: string
    components: ComponentSummary[]
    changeType:
        | 'new'
        | 'component_added'
        | 'component_removed'
        | 'props_changed'
    previousHash?: string
    packageVersion: string
    sessionId: string
    environment: string
    timestamp: Date
    projectContext: {
        pageUrl: string
        pageRoute: string
        repositoryName?: string
        projectVersion?: string
        projectDescription?: string
        domain: string
    }
}

export interface PageCompositionResult {
    id: string
    action: 'created' | 'updated' | 'no_change'
    isFirstUsage: boolean
    changeCount: number
}

// =====================================================
// PAGE COMPOSITION SERVICE CLASS
// =====================================================

class PageCompositionService {
    /**
     * Upsert page composition with global deduplication
     */
    async upsertPageComposition(
        data: PageCompositionData
    ): Promise<PageCompositionResult> {
        try {
            // Check if this exact page composition already exists
            const existingComposition = await this.findByFingerprint(
                data.pageFingerprint
            )

            if (existingComposition) {
                // Check if composition actually changed
                if (
                    existingComposition.composition_hash ===
                    data.compositionHash
                ) {
                    // No change - just update last_seen
                    await this.updateLastSeen(data.pageFingerprint)

                    return {
                        id: existingComposition.id,
                        action: 'no_change',
                        isFirstUsage: false,
                        changeCount: existingComposition.change_count,
                    }
                } else {
                    // Composition changed - update existing record
                    const updatedComposition =
                        await this.updateComposition(data)

                    // Log the change
                    await this.logCompositionChange(
                        data,
                        existingComposition.composition_hash
                    )

                    return {
                        id: updatedComposition.id,
                        action: 'updated',
                        isFirstUsage: false,
                        changeCount: updatedComposition.change_count,
                    }
                }
            } else {
                // New composition - create record
                const newComposition = await this.createComposition(data)

                // Log as new composition
                await this.logCompositionChange(data, null)

                return {
                    id: newComposition.id,
                    action: 'created',
                    isFirstUsage: true,
                    changeCount: 1,
                }
            }
        } catch (error) {
            console.error('Error upserting page composition:', error)
            throw error
        }
    }

    /**
     * Find page composition by fingerprint
     */
    private async findByFingerprint(pageFingerprint: string) {
        const queryText = `
            SELECT * FROM page_compositions 
            WHERE page_fingerprint = $1
        `
        const result = await query(queryText, [pageFingerprint])
        return result.rows[0] || null
    }

    /**
     * Create new page composition record
     */
    private async createComposition(data: PageCompositionData) {
        // Generate repository_url from repository_name if it looks like a GitHub repo
        const repositoryUrl = data.repositoryName.includes('/')
            ? `https://github.com/${data.repositoryName}`
            : data.repositoryName

        const queryText = `
            INSERT INTO page_compositions (
                page_fingerprint,
                repository_name,
                repository_url,
                page_route,
                domain,
                composition_hash,
                components,
                component_summary,
                package_version,
                environment,
                project_context,
                first_seen,
                last_updated,
                change_count
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *
        `

        const values = [
            data.pageFingerprint,
            data.repositoryName,
            repositoryUrl,
            data.pageRoute,
            data.domain,
            data.compositionHash,
            JSON.stringify(data.components), // for backward compatibility
            JSON.stringify(data.components), // new component_summary field
            data.packageVersion,
            data.environment,
            JSON.stringify(data.projectContext),
            data.timestamp,
            data.timestamp,
            1,
        ]

        const result = await query(queryText, values)
        return result.rows[0]
    }

    /**
     * Update existing page composition record
     */
    private async updateComposition(data: PageCompositionData) {
        const queryText = `
            UPDATE page_compositions 
            SET 
                composition_hash = $1,
                component_summary = $2,
                package_version = $3,
                environment = $4,
                project_context = $5,
                last_updated = $6,
                change_count = change_count + 1
            WHERE page_fingerprint = $7
            RETURNING *
        `

        const values = [
            data.compositionHash,
            JSON.stringify(data.components),
            data.packageVersion,
            data.environment,
            JSON.stringify(data.projectContext),
            data.timestamp,
            data.pageFingerprint,
        ]

        const result = await query(queryText, values)
        return result.rows[0]
    }

    /**
     * Update last seen timestamp
     */
    private async updateLastSeen(pageFingerprint: string) {
        const queryText = `
            UPDATE page_compositions 
            SET last_updated = NOW()
            WHERE page_fingerprint = $1
        `
        await query(queryText, [pageFingerprint])
    }

    /**
     * Log composition change for historical tracking
     */
    private async logCompositionChange(
        data: PageCompositionData,
        previousHash: string | null
    ) {
        const queryText = `
            INSERT INTO composition_changes (
                page_fingerprint,
                change_type,
                previous_composition_hash,
                new_composition_hash,
                previous_components,
                new_components,
                package_version,
                environment,
                session_id,
                timestamp
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `

        const values = [
            data.pageFingerprint,
            data.changeType,
            previousHash,
            data.compositionHash,
            previousHash ? JSON.stringify([]) : null, // We don't have previous components data
            JSON.stringify(data.components),
            data.packageVersion,
            data.environment,
            data.sessionId,
            data.timestamp,
        ]

        await query(queryText, values)
    }

    /**
     * Get page composition analytics
     */
    async getCompositionAnalytics(
        filters: {
            repositoryName?: string
            pageRoute?: string
            componentName?: string
            startDate?: Date
            endDate?: Date
            limit?: number
        } = {}
    ) {
        let queryText = `
            SELECT 
                repository_name,
                page_route,
                composition_hash,
                component_summary,
                change_count,
                first_seen,
                last_updated
            FROM page_compositions
            WHERE 1=1
        `

        const values: unknown[] = []
        let paramCount = 0

        if (filters.repositoryName) {
            paramCount++
            queryText += ` AND repository_name = $${paramCount}`
            values.push(filters.repositoryName)
        }

        if (filters.pageRoute) {
            paramCount++
            queryText += ` AND page_route = $${paramCount}`
            values.push(filters.pageRoute)
        }

        if (filters.componentName) {
            paramCount++
            queryText += ` AND component_summary::text ILIKE $${paramCount}`
            values.push(`%"name":"${filters.componentName}"%`)
        }

        if (filters.startDate) {
            paramCount++
            queryText += ` AND first_seen >= $${paramCount}`
            values.push(filters.startDate)
        }

        if (filters.endDate) {
            paramCount++
            queryText += ` AND first_seen <= $${paramCount}`
            values.push(filters.endDate)
        }

        queryText += ` ORDER BY last_updated DESC`

        if (filters.limit) {
            paramCount++
            queryText += ` LIMIT $${paramCount}`
            values.push(filters.limit)
        }

        const result = await query(queryText, values)
        return result.rows
    }

    /**
     * Get component adoption statistics
     */
    async getComponentAdoption() {
        const queryText = `
            SELECT 
                repository_name,
                jsonb_array_elements(component_summary) ->> 'name' as component_name,
                COUNT(DISTINCT page_fingerprint) as unique_pages,
                SUM((jsonb_array_elements(component_summary) ->> 'instanceCount')::int) as total_instances
            FROM page_compositions
            GROUP BY repository_name, component_name
            ORDER BY unique_pages DESC, total_instances DESC
        `

        const result = await query(queryText)
        return result.rows
    }

    /**
     * Get composition change history
     */
    async getChangeHistory(pageFingerprint?: string, limit: number = 100) {
        let queryText = `
            SELECT 
                page_fingerprint,
                change_type,
                previous_hash,
                new_hash,
                changed_components,
                package_version,
                environment,
                timestamp
            FROM composition_changes
        `

        const values: unknown[] = []

        if (pageFingerprint) {
            queryText += ` WHERE page_fingerprint = $1`
            values.push(pageFingerprint)
            queryText += ` ORDER BY timestamp DESC LIMIT $2`
            values.push(limit)
        } else {
            queryText += ` ORDER BY timestamp DESC LIMIT $1`
            values.push(limit)
        }

        const result = await query(queryText, values)
        return result.rows
    }
}

// =====================================================
// SINGLETON EXPORT
// =====================================================

export const pageCompositionService = new PageCompositionService()
