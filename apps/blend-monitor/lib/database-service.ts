import {
    query,
    withTransaction,
    SQL,
    DatabaseUser,
    DatabaseComponent,
    DatabaseActivityLog,
} from './database'
import {
    ComponentInfo,
    CoverageMetrics,
    PackageStats,
    Activity,
    UserRole,
} from '@/types'

export class DatabaseService {
    // ==================== USER MANAGEMENT ====================

    async createOrUpdateUser(
        firebaseUid: string,
        userData: {
            email: string
            displayName?: string
            photoURL?: string
            role?: string
        }
    ): Promise<DatabaseUser> {
        // Check if user exists
        const existingUser = await this.getUserByFirebaseUid(firebaseUid)

        if (existingUser) {
            // Update existing user
            const result = await query<DatabaseUser>(SQL.users.update, [
                firebaseUid,
                userData.displayName,
                userData.photoURL,
                new Date(),
            ])
            return result.rows[0]
        } else {
            // Create new user
            const result = await query<DatabaseUser>(SQL.users.create, [
                firebaseUid,
                userData.email,
                userData.displayName,
                userData.photoURL,
                userData.role || 'viewer',
                new Date(),
            ])
            return result.rows[0]
        }
    }

    async getUserByFirebaseUid(
        firebaseUid: string
    ): Promise<DatabaseUser | null> {
        const result = await query<DatabaseUser>(SQL.users.findByFirebaseUid, [
            firebaseUid,
        ])
        return result.rows[0] || null
    }

    async getUserByEmail(email: string): Promise<DatabaseUser | null> {
        const result = await query<DatabaseUser>(SQL.users.findByEmail, [email])
        return result.rows[0] || null
    }

    // User management methods
    async getAllUsers(limit?: number, offset?: number) {
        const limitClause = limit ? `LIMIT ${limit}` : ''
        const offsetClause = offset ? `OFFSET ${offset}` : ''

        const queryText = `
            SELECT 
                id, firebase_uid, email, display_name, photo_url, 
                role, is_active, created_at, last_login, updated_at
            FROM users 
            ORDER BY created_at DESC
            ${limitClause} ${offsetClause}
        `

        const result = await query<any>(queryText)
        return result.rows.map(this.mapUserRow)
    }

    async updateUserStatus(firebaseUid: string, isActive: boolean) {
        const queryText = `
            UPDATE users 
            SET is_active = $1, updated_at = NOW()
            WHERE firebase_uid = $2
            RETURNING id, firebase_uid, email, display_name, photo_url, 
                     role, is_active, created_at, last_login, updated_at
        `

        const result = await query<any>(queryText, [isActive, firebaseUid])
        return result.rows.length > 0 ? this.mapUserRow(result.rows[0]) : null
    }

    async updateUserDisplayName(firebaseUid: string, displayName: string) {
        const queryText = `
            UPDATE users 
            SET display_name = $1, updated_at = NOW()
            WHERE firebase_uid = $2
            RETURNING id, firebase_uid, email, display_name, photo_url, 
                     role, is_active, created_at, last_login, updated_at
        `

        const result = await query<any>(queryText, [displayName, firebaseUid])
        return result.rows.length > 0 ? this.mapUserRow(result.rows[0]) : null
    }

    async deleteUser(firebaseUid: string) {
        const queryText = `DELETE FROM users WHERE firebase_uid = $1`
        await query(queryText, [firebaseUid])
    }

    async updateUserRole(
        userId: string,
        newRole: string
    ): Promise<DatabaseUser> {
        const result = await query<DatabaseUser>(SQL.users.updateRole, [
            userId,
            newRole,
        ])
        return result.rows[0]
    }

    async getRoles(): Promise<UserRole[]> {
        const result = await query('SELECT * FROM roles ORDER BY name')
        return result.rows.map((row) => ({
            id: row.id,
            name: row.name,
            permissions: row.permissions,
            isCustom: row.is_custom,
        }))
    }

    // ==================== COMPONENT MANAGEMENT ====================

    async getComponents(): Promise<ComponentInfo[]> {
        const result = await query<DatabaseComponent>(SQL.components.list)
        return result.rows.map(this.mapDatabaseComponentToInfo)
    }

    async getComponentById(componentId: string): Promise<ComponentInfo | null> {
        const result = await query<DatabaseComponent>(SQL.components.findById, [
            componentId,
        ])
        return result.rows[0]
            ? this.mapDatabaseComponentToInfo(result.rows[0])
            : null
    }

    async upsertComponent(component: ComponentInfo): Promise<void> {
        await query(SQL.components.upsert, [
            component.id,
            component.name,
            component.path,
            component.category,
            component.hasStorybook,
            component.hasFigmaConnect,
            component.hasTests,
            component.lastModified ? new Date(component.lastModified) : null,
        ])
    }

    async batchUpsertComponents(components: ComponentInfo[]): Promise<void> {
        await withTransaction(async (client) => {
            for (const component of components) {
                await client.query(SQL.components.upsert, [
                    component.id,
                    component.name,
                    component.path,
                    component.category,
                    component.hasStorybook,
                    component.hasFigmaConnect,
                    component.hasTests,
                    component.lastModified
                        ? new Date(component.lastModified)
                        : null,
                ])
            }
        })
    }

    async getComponentCoverage(): Promise<CoverageMetrics> {
        const result = await query(SQL.components.coverage)
        const row = result.rows[0]

        return {
            total: parseInt(row.total_components),
            integrated: parseInt(row.integrated_components),
            percentage: parseFloat(row.percentage),
            lastUpdated: new Date().toISOString(),
        }
    }

    async getCoverageByCategory(): Promise<
        Record<string, { total: number; integrated: number }>
    > {
        const result = await query(SQL.components.coverageByCategory)
        const coverage: Record<string, { total: number; integrated: number }> =
            {}

        for (const row of result.rows) {
            coverage[row.category] = {
                total: parseInt(row.total),
                integrated: parseInt(row.integrated),
            }
        }

        return coverage
    }

    async saveCoverageMetrics(
        metrics: CoverageMetrics,
        byCategory: Record<string, any>
    ): Promise<void> {
        await query(
            `INSERT INTO coverage_metrics (total_components, integrated_components, percentage, category_breakdown)
             VALUES ($1, $2, $3, $4)`,
            [
                metrics.total,
                metrics.integrated,
                metrics.percentage,
                JSON.stringify(byCategory),
            ]
        )
    }

    // ==================== NPM PACKAGE STATS ====================

    async getPackageStats(): Promise<PackageStats | null> {
        try {
            const result = await query(
                'SELECT * FROM npm_package_stats ORDER BY created_at DESC LIMIT 1'
            )

            if (result.rows.length === 0) return null

            const row = result.rows[0]
            return {
                name: row.package_name || 'blend-v1',
                version: row.version || '0.0.0',
                downloads: {
                    daily: row.downloads_daily || 0,
                    weekly: row.downloads_weekly || 0,
                    monthly: row.downloads_monthly || 0,
                    total: row.downloads_total || 0,
                },
                size: {
                    unpacked: row.size_unpacked || 0,
                    gzipped: row.size_gzipped || 0,
                },
                dependencies: row.dependencies_count || 0,
                lastPublish: row.last_publish?.toISOString() || '',
            }
        } catch (error) {
            console.error('Error in getPackageStats:', error)
            // Return null instead of throwing to prevent 500 errors
            return null
        }
    }

    async savePackageStats(stats: PackageStats): Promise<void> {
        await query(
            `INSERT INTO npm_package_stats (
                package_name, version, downloads_daily, downloads_weekly, 
                downloads_monthly, downloads_total, size_unpacked, size_gzipped, 
                dependencies_count, last_publish
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [
                stats.name,
                stats.version,
                stats.downloads.daily,
                stats.downloads.weekly,
                stats.downloads.monthly,
                stats.downloads.total,
                stats.size.unpacked,
                stats.size.gzipped,
                stats.dependencies,
                stats.lastPublish ? new Date(stats.lastPublish) : null,
            ]
        )
    }

    async getDownloadTrends(
        days: number = 30
    ): Promise<Array<{ date: string; downloads: number }>> {
        try {
            const result = await query(
                `SELECT date, downloads FROM download_trends 
                 WHERE date >= CURRENT_DATE - INTERVAL '${days} days'
                 ORDER BY date ASC`
            )

            if (!result.rows || result.rows.length === 0) {
                return []
            }

            return result.rows.map((row) => ({
                date: row.date
                    ? row.date.toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0],
                downloads: row.downloads || 0,
            }))
        } catch (error) {
            console.error('Error in getDownloadTrends:', error)
            // Return empty array instead of throwing to prevent 500 errors
            return []
        }
    }

    async saveDownloadTrend(
        date: string,
        downloads: number,
        packageName: string = 'blend-v1'
    ): Promise<void> {
        await query(
            `INSERT INTO download_trends (date, downloads, package_name) 
             VALUES ($1, $2, $3) 
             ON CONFLICT (date, package_name) 
             DO UPDATE SET downloads = EXCLUDED.downloads`,
            [date, downloads, packageName]
        )
    }

    async getVersionHistory(): Promise<any[]> {
        try {
            const result = await query(
                'SELECT * FROM npm_versions ORDER BY published_at DESC'
            )

            if (!result.rows || result.rows.length === 0) {
                return []
            }

            return result.rows.map((row) => ({
                version: row.version || 'unknown',
                publishedAt: row.published_at
                    ? row.published_at.toISOString()
                    : new Date().toISOString(),
                publisher: row.publisher || 'unknown',
                downloads: row.downloads || 0,
                changelog: row.changelog || '',
                size: {
                    unpacked: row.size_unpacked || 0,
                    gzipped: row.size_gzipped || 0,
                },
                breaking: row.is_breaking || false,
            }))
        } catch (error) {
            console.error('Error in getVersionHistory:', error)
            // Return empty array instead of throwing to prevent 500 errors
            return []
        }
    }

    async saveVersionInfo(versionInfo: any): Promise<void> {
        await query(
            `INSERT INTO npm_versions (
                version, published_at, publisher, downloads, changelog,
                size_unpacked, size_gzipped, is_breaking, is_prerelease
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             ON CONFLICT (version) DO UPDATE SET
                downloads = EXCLUDED.downloads,
                changelog = COALESCE(EXCLUDED.changelog, npm_versions.changelog),
                size_unpacked = COALESCE(EXCLUDED.size_unpacked, npm_versions.size_unpacked),
                size_gzipped = COALESCE(EXCLUDED.size_gzipped, npm_versions.size_gzipped),
                updated_at = NOW()`,
            [
                versionInfo.version,
                new Date(versionInfo.publishedAt),
                versionInfo.publisher,
                versionInfo.downloads || 0,
                versionInfo.changelog,
                versionInfo.size?.unpacked,
                versionInfo.size?.gzipped,
                versionInfo.breaking || false,
                versionInfo.version.includes('-'),
            ]
        )
    }

    // Batch save version info with better conflict handling
    async batchSaveVersionInfo(
        versions: any[]
    ): Promise<{ saved: number; updated: number }> {
        let saved = 0
        let updated = 0

        for (const versionInfo of versions) {
            try {
                const result = await query(
                    `INSERT INTO npm_versions (
                        version, published_at, publisher, downloads, changelog,
                        size_unpacked, size_gzipped, is_breaking, is_prerelease
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                     ON CONFLICT (version) DO UPDATE SET
                        downloads = EXCLUDED.downloads,
                        changelog = COALESCE(EXCLUDED.changelog, npm_versions.changelog),
                        size_unpacked = COALESCE(EXCLUDED.size_unpacked, npm_versions.size_unpacked),
                        size_gzipped = COALESCE(EXCLUDED.size_gzipped, npm_versions.size_gzipped),
                        updated_at = NOW()
                     RETURNING (xmax = 0) AS inserted`,
                    [
                        versionInfo.version,
                        new Date(versionInfo.publishedAt),
                        versionInfo.publisher,
                        versionInfo.downloads || 0,
                        versionInfo.changelog,
                        versionInfo.size?.unpacked,
                        versionInfo.size?.gzipped,
                        versionInfo.breaking || false,
                        versionInfo.version.includes('-'),
                    ]
                )

                if (result.rows[0]?.inserted) {
                    saved++
                } else {
                    updated++
                }
            } catch (error) {
                console.error(
                    `Error saving version ${versionInfo.version}:`,
                    error
                )
            }
        }

        return { saved, updated }
    }

    // Check for new versions by comparing with latest in database
    async getLatestVersionFromDatabase(): Promise<string | null> {
        try {
            const result = await query(
                'SELECT version FROM npm_versions ORDER BY published_at DESC LIMIT 1'
            )
            return result.rows[0]?.version || null
        } catch (error) {
            console.error('Error getting latest version:', error)
            return null
        }
    }

    // Sync NPM data with database - comprehensive update
    async syncNPMData(): Promise<{
        versions: { saved: number; updated: number }
        trends: { saved: number }
        stats: { updated: boolean }
        errors: string[]
    }> {
        const errors: string[] = []
        const result = {
            versions: { saved: 0, updated: 0 },
            trends: { saved: 0 },
            stats: { updated: false },
            errors,
        }

        try {
            // Import NPMClient here to avoid circular dependencies
            const { NPMClient } = await import('@/lib/data/npm-client')
            const npmClient = new NPMClient('blend-v1')

            // Sync version history
            try {
                const versionHistory = await npmClient.getVersionHistory()
                if (versionHistory && versionHistory.length > 0) {
                    const versionResult =
                        await this.batchSaveVersionInfo(versionHistory)
                    result.versions = versionResult
                    console.log(
                        `Synced ${versionResult.saved + versionResult.updated} versions (${versionResult.saved} new, ${versionResult.updated} updated)`
                    )
                }
            } catch (error) {
                errors.push(
                    `Version sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
                )
            }

            // Sync download trends
            try {
                const downloadTrends = await npmClient.getDownloadTrends(30)
                if (downloadTrends && downloadTrends.length > 0) {
                    let trendsSaved = 0
                    for (const trend of downloadTrends) {
                        try {
                            await this.saveDownloadTrend(
                                trend.date,
                                trend.downloads
                            )
                            trendsSaved++
                        } catch (error) {
                            // Skip individual trend errors (likely duplicates)
                        }
                    }
                    result.trends.saved = trendsSaved
                    console.log(`Synced ${trendsSaved} download trends`)
                }
            } catch (error) {
                errors.push(
                    `Trends sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
                )
            }

            // Sync package stats
            try {
                const packageStats = await npmClient.getPackageStats()
                if (packageStats) {
                    await this.savePackageStats(packageStats)
                    result.stats.updated = true
                    console.log('Synced package stats')
                }
            } catch (error) {
                errors.push(
                    `Stats sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`
                )
            }

            // Log sync activity
            try {
                await this.logSystemActivity('npm_data_sync', {
                    ...result,
                    timestamp: new Date().toISOString(),
                })
            } catch (error) {
                console.warn('Could not log sync activity:', error)
            }
        } catch (error) {
            errors.push(
                `Sync initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`
            )
        }

        return result
    }

    // ==================== ACTIVITY LOGS ====================

    async logUserActivity(
        userId: string,
        action: string,
        details?: any,
        metadata?: any
    ): Promise<void> {
        await query(SQL.activity.log, [
            userId,
            action,
            details ? JSON.stringify(details) : null,
            metadata ? JSON.stringify(metadata) : null,
            new Date(),
        ])
    }

    async logSystemActivity(action: string, details?: any): Promise<void> {
        await query(SQL.activity.systemLog, [
            action,
            details ? JSON.stringify(details) : null,
            new Date(),
        ])
    }

    async getUserActivity(
        userId: string,
        limit: number = 50,
        offset: number = 0
    ) {
        const queryText = `
            SELECT 
                al.id, al.action, al.timestamp, al.details,
                u.display_name, u.email 
            FROM activity_logs al
            LEFT JOIN users u ON al.user_id = u.id
            WHERE al.user_id = $1
            ORDER BY al.timestamp DESC 
            LIMIT $2 OFFSET $3
        `

        const result = await query(queryText, [userId, limit, offset])
        return result.rows.map((row: any) => ({
            id: row.id,
            action: row.action,
            timestamp: row.timestamp,
            details: row.details,
            user: {
                display_name: row.display_name,
                email: row.email,
            },
        }))
    }

    async getRecentActivity(limit: number = 10): Promise<Activity[]> {
        const result = await query(SQL.activity.getRecentActivity, [limit])

        return result.rows.map((row) => ({
            id: row.id,
            type: row.action as any,
            timestamp: row.timestamp.toISOString(),
            user: row.display_name || row.email,
            details: row.details,
            component: row.details?.component,
            version: row.details?.version,
        }))
    }

    // ==================== HELPER METHODS ====================

    private mapDatabaseComponentToInfo(
        dbComponent: DatabaseComponent
    ): ComponentInfo {
        return {
            id: dbComponent.component_id,
            name: dbComponent.name,
            path: dbComponent.path,
            category: dbComponent.category,
            hasStorybook: dbComponent.has_storybook,
            hasFigmaConnect: dbComponent.has_figma_connect,
            hasTests: dbComponent.has_tests,
            lastModified:
                dbComponent.last_modified?.toISOString() ||
                new Date().toISOString(),
        }
    }

    private mapDatabaseActivityToActivity(
        dbActivity: DatabaseActivityLog
    ): Activity {
        return {
            id: dbActivity.id,
            type: dbActivity.action as any,
            timestamp: dbActivity.timestamp.toISOString(),
            details: dbActivity.details?.details,
            component: dbActivity.details?.component,
            version: dbActivity.details?.version,
            user: dbActivity.details?.user,
        }
    }

    private mapUserRow(row: any): DatabaseUser {
        return {
            id: row.id,
            firebase_uid: row.firebase_uid,
            email: row.email,
            display_name: row.display_name,
            photo_url: row.photo_url,
            role: row.role,
            is_active: row.is_active,
            created_at: row.created_at,
            last_login: row.last_login,
            updated_at: row.updated_at,
        }
    }
}

// Export singleton instance
export const databaseService = new DatabaseService()
