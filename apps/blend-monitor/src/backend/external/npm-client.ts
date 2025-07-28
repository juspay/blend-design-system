import { PackageStats, VersionInfo, DownloadTrend } from '@/types'

export class NPMClient {
    private registryUrl: string
    private packageName: string

    constructor(packageName: string = 'blend-v1') {
        this.registryUrl =
            process.env.NPM_REGISTRY_API_URL || 'https://registry.npmjs.org'
        this.packageName = packageName
    }

    async getPackageStats(): Promise<PackageStats | null> {
        try {
            // Fetch package metadata
            const packageData = await this.fetchPackageData()

            // Fetch download stats
            const downloadStats = await this.fetchDownloadStats()

            if (!packageData || !downloadStats) {
                return null
            }

            const latestVersion = packageData['dist-tags']?.latest || ''
            const versionData = packageData.versions?.[latestVersion]

            return {
                name: this.packageName,
                version: latestVersion,
                downloads: {
                    daily: downloadStats.daily || 0,
                    weekly: downloadStats.weekly || 0,
                    monthly: downloadStats.monthly || 0,
                    total: downloadStats.total || 0,
                },
                size: {
                    unpacked: versionData?.dist?.unpackedSize || 0,
                    gzipped: versionData?.dist?.fileCount || 0,
                },
                dependencies: Object.keys(versionData?.dependencies || {})
                    .length,
                lastPublish: packageData.time?.[latestVersion] || '',
            }
        } catch (error) {
            console.error('Error fetching package stats:', error)
            return null
        }
    }

    async getVersionHistory(): Promise<VersionInfo[]> {
        try {
            const packageData = await this.fetchPackageData()

            if (!packageData || !packageData.versions) {
                return []
            }

            const versions: VersionInfo[] = []
            const versionNumbers = Object.keys(packageData.versions).reverse() // Latest first

            for (const version of versionNumbers.slice(0, 20)) {
                // Last 20 versions
                const versionData = packageData.versions[version]
                const publishTime = packageData.time?.[version]

                versions.push({
                    version,
                    publishedAt: publishTime || '',
                    publisher: versionData._npmUser?.name || 'unknown',
                    downloads: 0, // Will be updated with actual download count
                    changelog: this.extractChangelog(versionData),
                    size: {
                        unpacked: versionData.dist?.unpackedSize || 0,
                        gzipped: versionData.dist?.size || 0,
                    },
                    breaking: this.isBreakingChange(version),
                })
            }

            // Fetch download counts for each version
            await this.enrichVersionDownloads(versions)

            return versions
        } catch (error) {
            console.error('Error fetching version history:', error)
            return []
        }
    }

    async getDownloadTrends(days: number = 30): Promise<DownloadTrend[]> {
        try {
            const endDate = new Date()
            const startDate = new Date()
            startDate.setDate(startDate.getDate() - days)

            const start = startDate.toISOString().split('T')[0]
            const end = endDate.toISOString().split('T')[0]

            const response = await fetch(
                `https://api.npmjs.org/downloads/range/${start}:${end}/${this.packageName}`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch download trends')
            }

            const data = await response.json()

            return data.downloads.map((item: any) => ({
                date: item.day,
                downloads: item.downloads,
            }))
        } catch (error) {
            console.error('Error fetching download trends:', error)
            return []
        }
    }

    private async fetchPackageData(): Promise<any> {
        try {
            const response = await fetch(
                `${this.registryUrl}/${this.packageName}`
            )

            if (!response.ok) {
                throw new Error('Failed to fetch package data')
            }

            return await response.json()
        } catch (error) {
            console.error('Error fetching package data:', error)
            return null
        }
    }

    private async fetchDownloadStats(): Promise<any> {
        try {
            // Fetch different time ranges
            const [daily, weekly, monthly] = await Promise.all([
                this.fetchDownloadCount('last-day'),
                this.fetchDownloadCount('last-week'),
                this.fetchDownloadCount('last-month'),
            ])

            // Fetch total downloads (point count)
            const totalResponse = await fetch(
                `https://api.npmjs.org/downloads/point/2015-01-01:${new Date().toISOString().split('T')[0]}/${this.packageName}`
            )

            const totalData = totalResponse.ok
                ? await totalResponse.json()
                : { downloads: 0 }

            return {
                daily: daily?.downloads || 0,
                weekly: weekly?.downloads || 0,
                monthly: monthly?.downloads || 0,
                total: totalData?.downloads || 0,
            }
        } catch (error) {
            console.error('Error fetching download stats:', error)
            return {
                daily: 0,
                weekly: 0,
                monthly: 0,
                total: 0,
            }
        }
    }

    private async fetchDownloadCount(period: string): Promise<any> {
        try {
            const response = await fetch(
                `https://api.npmjs.org/downloads/point/${period}/${this.packageName}`
            )

            if (!response.ok) {
                return { downloads: 0 }
            }

            return await response.json()
        } catch (error) {
            console.error(`Error fetching ${period} downloads:`, error)
            return { downloads: 0 }
        }
    }

    private async enrichVersionDownloads(
        versions: VersionInfo[]
    ): Promise<void> {
        // NPM doesn't provide per-version download stats easily
        // We'll estimate based on publish dates and total downloads
        // This is a simplified approach

        const totalDownloads = await this.fetchDownloadStats()
        const totalCount = totalDownloads.total || 0

        // Distribute downloads based on version age (newer versions get more downloads)
        let remainingDownloads = totalCount
        const now = new Date().getTime()

        versions.forEach((version, index) => {
            const publishDate = new Date(version.publishedAt).getTime()
            const ageInDays = (now - publishDate) / (1000 * 60 * 60 * 24)

            // Estimate downloads (newer versions get more)
            const weight = Math.max(1, 100 - ageInDays)
            const estimatedDownloads = Math.floor(
                remainingDownloads * (weight / 100)
            )

            version.downloads = Math.max(estimatedDownloads, 10) // Minimum 10 downloads
            remainingDownloads -= version.downloads
        })
    }

    private extractChangelog(versionData: any): string {
        // Try to extract changelog from package.json or README
        // This is a placeholder - in real implementation, you might parse CHANGELOG.md
        return versionData.description || 'No changelog available'
    }

    private isBreakingChange(version: string): boolean {
        // Check if it's a major version change
        const parts = version.split('.')
        const major = parseInt(parts[0], 10)
        return major > 0 && parts[1] === '0' && parts[2] === '0'
    }

    // Get package size history
    async getPackageSizeHistory(): Promise<
        Array<{ version: string; size: number; date: string }>
    > {
        try {
            const packageData = await this.fetchPackageData()

            if (!packageData || !packageData.versions) {
                return []
            }

            const sizeHistory: Array<{
                version: string
                size: number
                date: string
            }> = []
            const versions = Object.keys(packageData.versions)
                .reverse()
                .slice(0, 10)

            for (const version of versions) {
                const versionData = packageData.versions[version]
                const publishTime = packageData.time?.[version]

                sizeHistory.push({
                    version,
                    size: versionData.dist?.unpackedSize || 0,
                    date: publishTime || '',
                })
            }

            return sizeHistory
        } catch (error) {
            console.error('Error fetching package size history:', error)
            return []
        }
    }
}
