'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.NPMClient = void 0
class NPMClient {
    constructor(packageName = 'blend-v1') {
        this.registryUrl =
            process.env.NPM_REGISTRY_API_URL || 'https://registry.npmjs.org'
        this.packageName = packageName
    }
    async getPackageStats() {
        var _a, _b, _c, _d, _e
        try {
            // Fetch package metadata
            const packageData = await this.fetchPackageData()
            // Fetch download stats
            const downloadStats = await this.fetchDownloadStats()
            if (!packageData || !downloadStats) {
                return null
            }
            const latestVersion =
                ((_a = packageData['dist-tags']) === null || _a === void 0
                    ? void 0
                    : _a.latest) || ''
            const versionData =
                (_b = packageData.versions) === null || _b === void 0
                    ? void 0
                    : _b[latestVersion]
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
                    unpacked:
                        ((_c =
                            versionData === null || versionData === void 0
                                ? void 0
                                : versionData.dist) === null || _c === void 0
                            ? void 0
                            : _c.unpackedSize) || 0,
                    gzipped:
                        ((_d =
                            versionData === null || versionData === void 0
                                ? void 0
                                : versionData.dist) === null || _d === void 0
                            ? void 0
                            : _d.fileCount) || 0,
                },
                dependencies: Object.keys(
                    (versionData === null || versionData === void 0
                        ? void 0
                        : versionData.dependencies) || {}
                ).length,
                lastPublish:
                    ((_e = packageData.time) === null || _e === void 0
                        ? void 0
                        : _e[latestVersion]) || '',
            }
        } catch (error) {
            console.error('Error fetching package stats:', error)
            return null
        }
    }
    async getVersionHistory() {
        var _a, _b, _c, _d
        try {
            const packageData = await this.fetchPackageData()
            if (!packageData || !packageData.versions) {
                return []
            }
            const versions = []
            const versionNumbers = Object.keys(packageData.versions).reverse() // Latest first
            for (const version of versionNumbers.slice(0, 20)) {
                // Last 20 versions
                const versionData = packageData.versions[version]
                const publishTime =
                    (_a = packageData.time) === null || _a === void 0
                        ? void 0
                        : _a[version]
                versions.push({
                    version,
                    publishedAt: publishTime || '',
                    publisher:
                        ((_b = versionData._npmUser) === null || _b === void 0
                            ? void 0
                            : _b.name) || 'unknown',
                    downloads: 0, // Will be updated with actual download count
                    changelog: this.extractChangelog(versionData),
                    size: {
                        unpacked:
                            ((_c = versionData.dist) === null || _c === void 0
                                ? void 0
                                : _c.unpackedSize) || 0,
                        gzipped:
                            ((_d = versionData.dist) === null || _d === void 0
                                ? void 0
                                : _d.size) || 0,
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
    async getDownloadTrends(days = 30) {
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
            return data.downloads.map((item) => ({
                date: item.day,
                downloads: item.downloads,
            }))
        } catch (error) {
            console.error('Error fetching download trends:', error)
            return []
        }
    }
    async fetchPackageData() {
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
    async fetchDownloadStats() {
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
                daily:
                    (daily === null || daily === void 0
                        ? void 0
                        : daily.downloads) || 0,
                weekly:
                    (weekly === null || weekly === void 0
                        ? void 0
                        : weekly.downloads) || 0,
                monthly:
                    (monthly === null || monthly === void 0
                        ? void 0
                        : monthly.downloads) || 0,
                total:
                    (totalData === null || totalData === void 0
                        ? void 0
                        : totalData.downloads) || 0,
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
    async fetchDownloadCount(period) {
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
    async enrichVersionDownloads(versions) {
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
    extractChangelog(versionData) {
        // Try to extract changelog from package.json or README
        // This is a placeholder - in real implementation, you might parse CHANGELOG.md
        return versionData.description || 'No changelog available'
    }
    isBreakingChange(version) {
        // Check if it's a major version change
        const parts = version.split('.')
        const major = parseInt(parts[0], 10)
        return major > 0 && parts[1] === '0' && parts[2] === '0'
    }
    // Get package size history
    async getPackageSizeHistory() {
        var _a, _b
        try {
            const packageData = await this.fetchPackageData()
            if (!packageData || !packageData.versions) {
                return []
            }
            const sizeHistory = []
            const versions = Object.keys(packageData.versions)
                .reverse()
                .slice(0, 10)
            for (const version of versions) {
                const versionData = packageData.versions[version]
                const publishTime =
                    (_a = packageData.time) === null || _a === void 0
                        ? void 0
                        : _a[version]
                sizeHistory.push({
                    version,
                    size:
                        ((_b = versionData.dist) === null || _b === void 0
                            ? void 0
                            : _b.unpackedSize) || 0,
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
exports.NPMClient = NPMClient
//# sourceMappingURL=npm-client.js.map
