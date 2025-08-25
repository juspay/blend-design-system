/**
 * Page Analytics Service
 *
 * @fileoverview Service for analytics using page composition data
 * Implements route-level deduplication as per requirements
 */

import { query } from './database'

// =====================================================
// TYPES AND INTERFACES
// =====================================================

export interface ComponentAdoption {
    componentName: string
    uniquePages: number
    totalInstances: number
    uniqueRepositories: number
    firstUsed: Date
    lastUsed: Date
    repositories: Array<{
        repositoryName: string
        pageCount: number
        instanceCount: number
    }>
}

export interface RepositoryUsage {
    repositoryName: string
    uniquePages: number
    totalComponents: number
    totalInstances: number
    firstUsage: Date
    lastUsage: Date
    components: Array<{
        componentName: string
        pageCount: number
        instanceCount: number
        lastUsed: Date
    }>
}

export interface DashboardOverview {
    totalUniquePages: number
    totalRepositories: number
    totalComponents: number
    totalInstances: number
    recentPages: Array<{
        repositoryName: string
        pageRoute: string
        componentCount: number
        lastUpdated: Date
    }>
    topComponents: Array<{
        componentName: string
        uniquePages: number
        totalInstances: number
        adoptionPercentage: number
    }>
    topRepositories: Array<{
        repositoryName: string
        uniquePages: number
        componentCount: number
        lastActive: Date
    }>
}

export interface ComponentVariant {
    componentName: string
    propsSignature: string
    sanitizedProps: Record<string, unknown>
    uniquePages: number
    totalInstances: number
    usagePercentage: number
}

// =====================================================
// PAGE ANALYTICS SERVICE CLASS
// =====================================================

export class PageAnalyticsService {
    /**
     * Get component adoption statistics across all repositories
     */
    async getComponentAdoption(
        componentName?: string
    ): Promise<ComponentAdoption[]> {
        try {
            // First check if we have any data
            const countResult = await query(
                'SELECT COUNT(*) as count FROM page_compositions'
            )
            if (parseInt(countResult.rows[0].count) === 0) {
                return []
            }

            let queryText = `
                SELECT 
                    comp_data.component_data->>'name' as component_name,
                    COUNT(DISTINCT pc.page_fingerprint) as unique_pages,
                    SUM((comp_data.component_data->>'instanceCount')::int) as total_instances,
                    COUNT(DISTINCT pc.repository_name) as unique_repositories,
                    MIN(pc.first_seen) as first_used,
                    MAX(pc.last_updated) as last_used
                FROM page_compositions pc,
                     jsonb_array_elements(pc.component_summary) comp_data(component_data)
                WHERE 1=1
            `

            const values: unknown[] = []
            let paramCount = 0

            if (componentName) {
                paramCount++
                queryText += ` AND comp_data.component_data->>'name' = $${paramCount}`
                values.push(componentName)
            }

            queryText += `
                GROUP BY comp_data.component_data->>'name'
                ORDER BY unique_pages DESC, total_instances DESC
            `

            const result = await query(queryText, values)

            // Get repository breakdown for each component
            const componentsWithRepos = await Promise.all(
                result.rows.map(async (row) => {
                    const repoQuery = `
                        SELECT 
                            pc.repository_name,
                            COUNT(DISTINCT pc.page_fingerprint) as page_count,
                            SUM((comp_data.component_data->>'instanceCount')::int) as instance_count
                        FROM page_compositions pc,
                             jsonb_array_elements(pc.component_summary) comp_data(component_data)
                        WHERE comp_data.component_data->>'name' = $1
                        GROUP BY pc.repository_name
                        ORDER BY page_count DESC
                    `

                    const repoResult = await query(repoQuery, [
                        row.component_name,
                    ])

                    return {
                        componentName: row.component_name,
                        uniquePages: parseInt(row.unique_pages),
                        totalInstances: parseInt(row.total_instances),
                        uniqueRepositories: parseInt(row.unique_repositories),
                        firstUsed: row.first_used,
                        lastUsed: row.last_used,
                        repositories: repoResult.rows.map((repo) => ({
                            repositoryName: repo.repository_name,
                            pageCount: parseInt(repo.page_count),
                            instanceCount: parseInt(repo.instance_count),
                        })),
                    }
                })
            )

            return componentsWithRepos
        } catch (error) {
            console.error('Error in getComponentAdoption:', error)
            return []
        }
    }

    /**
     * Get repository usage statistics
     */
    async getRepositoryUsage(
        repositoryName?: string
    ): Promise<RepositoryUsage[]> {
        try {
            // First check if we have any data
            const countResult = await query(
                'SELECT COUNT(*) as count FROM page_compositions'
            )
            if (parseInt(countResult.rows[0].count) === 0) {
                return []
            }

            let queryText = `
                SELECT 
                    pc.repository_name,
                    COUNT(DISTINCT pc.page_fingerprint) as unique_pages,
                    COUNT(DISTINCT comp_data.component_data->>'name') as total_components,
                    SUM((comp_data.component_data->>'instanceCount')::int) as total_instances,
                    MIN(pc.first_seen) as first_usage,
                    MAX(pc.last_updated) as last_usage
                FROM page_compositions pc,
                     jsonb_array_elements(pc.component_summary) comp_data(component_data)
                WHERE 1=1
            `

            const values: unknown[] = []
            let paramCount = 0

            if (repositoryName) {
                paramCount++
                queryText += ` AND pc.repository_name = $${paramCount}`
                values.push(repositoryName)
            }

            queryText += `
                GROUP BY pc.repository_name
                ORDER BY unique_pages DESC, total_components DESC
            `

            const result = await query(queryText, values)

            // Get component breakdown for each repository
            const repositoriesWithComponents = await Promise.all(
                result.rows.map(async (row) => {
                    const compQuery = `
                        SELECT 
                            comp_data.component_data->>'name' as component_name,
                            COUNT(DISTINCT pc.page_fingerprint) as page_count,
                            SUM((comp_data.component_data->>'instanceCount')::int) as instance_count,
                            MAX(pc.last_updated) as last_used
                        FROM page_compositions pc,
                             jsonb_array_elements(pc.component_summary) comp_data(component_data)
                        WHERE pc.repository_name = $1
                        GROUP BY comp_data.component_data->>'name'
                        ORDER BY page_count DESC
                    `

                    const compResult = await query(compQuery, [
                        row.repository_name,
                    ])

                    return {
                        repositoryName: row.repository_name,
                        uniquePages: parseInt(row.unique_pages),
                        totalComponents: parseInt(row.total_components),
                        totalInstances: parseInt(row.total_instances),
                        firstUsage: row.first_usage,
                        lastUsage: row.last_usage,
                        components: compResult.rows.map((comp) => ({
                            componentName: comp.component_name,
                            pageCount: parseInt(comp.page_count),
                            instanceCount: parseInt(comp.instance_count),
                            lastUsed: comp.last_used,
                        })),
                    }
                })
            )

            return repositoriesWithComponents
        } catch (error) {
            console.error('Error in getRepositoryUsage:', error)
            return []
        }
    }

    /**
     * Get dashboard overview with key metrics
     */
    async getDashboardOverview(): Promise<DashboardOverview> {
        try {
            // First check if we have any data
            const countResult = await query(
                'SELECT COUNT(*) as count FROM page_compositions'
            )
            if (parseInt(countResult.rows[0].count) === 0) {
                return {
                    totalUniquePages: 0,
                    totalRepositories: 0,
                    totalComponents: 0,
                    totalInstances: 0,
                    recentPages: [],
                    topComponents: [],
                    topRepositories: [],
                }
            }

            // Total statistics
            const totalStatsQuery = `
                SELECT 
                    COUNT(DISTINCT pc.page_fingerprint) as total_unique_pages,
                    COUNT(DISTINCT pc.repository_name) as total_repositories,
                    COUNT(DISTINCT comp_data.component_data->>'name') as total_components,
                    SUM((comp_data.component_data->>'instanceCount')::int) as total_instances
                FROM page_compositions pc,
                     jsonb_array_elements(pc.component_summary) comp_data(component_data)
            `

            // Recent pages
            const recentPagesQuery = `
                SELECT 
                    pc.repository_name,
                    pc.page_route,
                    jsonb_array_length(pc.component_summary) as component_count,
                    pc.last_updated
                FROM page_compositions pc
                ORDER BY pc.last_updated DESC
                LIMIT 10
            `

            // Top components by unique pages
            const topComponentsQuery = `
                SELECT 
                    comp_data.component_data->>'name' as component_name,
                    COUNT(DISTINCT pc.page_fingerprint) as unique_pages,
                    SUM((comp_data.component_data->>'instanceCount')::int) as total_instances
                FROM page_compositions pc,
                     jsonb_array_elements(pc.component_summary) comp_data(component_data)
                GROUP BY comp_data.component_data->>'name'
                ORDER BY unique_pages DESC
                LIMIT 10
            `

            // Top repositories by unique pages
            const topRepositoriesQuery = `
                SELECT 
                    pc.repository_name,
                    COUNT(DISTINCT pc.page_fingerprint) as unique_pages,
                    COUNT(DISTINCT comp_data.component_data->>'name') as component_count,
                    MAX(pc.last_updated) as last_active
                FROM page_compositions pc,
                     jsonb_array_elements(pc.component_summary) comp_data(component_data)
                GROUP BY pc.repository_name
                ORDER BY unique_pages DESC
                LIMIT 10
            `

            const [totalStats, recentPages, topComponents, topRepositories] =
                await Promise.all([
                    query(totalStatsQuery),
                    query(recentPagesQuery),
                    query(topComponentsQuery),
                    query(topRepositoriesQuery),
                ])

            const total = totalStats.rows[0]
            const totalPages = parseInt(total.total_unique_pages) || 0

            return {
                totalUniquePages: totalPages,
                totalRepositories: parseInt(total.total_repositories) || 0,
                totalComponents: parseInt(total.total_components) || 0,
                totalInstances: parseInt(total.total_instances) || 0,
                recentPages: recentPages.rows.map((row) => ({
                    repositoryName: row.repository_name,
                    pageRoute: row.page_route,
                    componentCount: parseInt(row.component_count),
                    lastUpdated: row.last_updated,
                })),
                topComponents: topComponents.rows.map((row) => ({
                    componentName: row.component_name,
                    uniquePages: parseInt(row.unique_pages),
                    totalInstances: parseInt(row.total_instances),
                    adoptionPercentage:
                        totalPages > 0
                            ? Math.round(
                                  (parseInt(row.unique_pages) / totalPages) *
                                      100
                              )
                            : 0,
                })),
                topRepositories: topRepositories.rows.map((row) => ({
                    repositoryName: row.repository_name,
                    uniquePages: parseInt(row.unique_pages),
                    componentCount: parseInt(row.component_count),
                    lastActive: row.last_active,
                })),
            }
        } catch (error) {
            console.error('Error getting dashboard overview:', error)
            // Return empty data instead of throwing
            return {
                totalUniquePages: 0,
                totalRepositories: 0,
                totalComponents: 0,
                totalInstances: 0,
                recentPages: [],
                topComponents: [],
                topRepositories: [],
            }
        }
    }

    /**
     * Get component variants (different prop combinations)
     */
    async getComponentVariants(
        componentName: string
    ): Promise<ComponentVariant[]> {
        try {
            // First check if we have any data
            const countResult = await query(
                'SELECT COUNT(*) as count FROM page_compositions'
            )
            if (parseInt(countResult.rows[0].count) === 0) {
                return []
            }

            const queryText = `
                SELECT 
                    comp_data.component_data->>'name' as component_name,
                    comp_data.component_data->>'propsSignature' as props_signature,
                    comp_data.component_data->'sanitizedProps' as sanitized_props,
                    COUNT(DISTINCT pc.page_fingerprint) as unique_pages,
                    SUM((comp_data.component_data->>'instanceCount')::int) as total_instances
                FROM page_compositions pc,
                     jsonb_array_elements(pc.component_summary) comp_data(component_data)
                WHERE comp_data.component_data->>'name' = $1
                GROUP BY 
                    comp_data.component_data->>'name',
                    comp_data.component_data->>'propsSignature',
                    comp_data.component_data->'sanitizedProps'
                ORDER BY unique_pages DESC, total_instances DESC
            `

            const result = await query(queryText, [componentName])
            const totalInstances = result.rows.reduce(
                (sum, row) => sum + parseInt(row.total_instances),
                0
            )

            return result.rows.map((row) => ({
                componentName: row.component_name,
                propsSignature: row.props_signature,
                sanitizedProps: row.sanitized_props || {},
                uniquePages: parseInt(row.unique_pages),
                totalInstances: parseInt(row.total_instances),
                usagePercentage:
                    totalInstances > 0
                        ? Math.round(
                              (parseInt(row.total_instances) / totalInstances) *
                                  100
                          )
                        : 0,
            }))
        } catch (error) {
            console.error('Error getting component variants:', error)
            return []
        }
    }

    /**
     * Get analytics for a specific repository
     */
    async getRepositoryAnalytics(
        repositoryName: string,
        days = 30
    ): Promise<{
        overview: RepositoryUsage
        dailyTrends: Array<{
            date: string
            uniquePages: number
            componentCount: number
        }>
    }> {
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - days)

        // Get repository overview
        const [repositoryOverview] =
            await this.getRepositoryUsage(repositoryName)

        if (!repositoryOverview) {
            throw new Error(`Repository ${repositoryName} not found`)
        }

        // Get daily trends
        const trendsQuery = `
            SELECT 
                DATE(pc.last_updated) as date,
                COUNT(DISTINCT pc.page_fingerprint) as unique_pages,
                COUNT(DISTINCT comp_data.component_data->>'name') as component_count
            FROM page_compositions pc,
                 jsonb_array_elements(pc.component_summary) comp_data(component_data)
            WHERE pc.repository_name = $1 AND pc.last_updated >= $2
            GROUP BY DATE(pc.last_updated)
            ORDER BY date DESC
        `

        const trendsResult = await query(trendsQuery, [
            repositoryName,
            cutoffDate,
        ])

        return {
            overview: repositoryOverview,
            dailyTrends: trendsResult.rows.map((row) => ({
                date: row.date.toISOString().split('T')[0],
                uniquePages: parseInt(row.unique_pages),
                componentCount: parseInt(row.component_count),
            })),
        }
    }
}

// Export singleton instance
export const pageAnalyticsService = new PageAnalyticsService()
