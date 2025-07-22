'use strict'
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              var desc = Object.getOwnPropertyDescriptor(m, k)
              if (
                  !desc ||
                  ('get' in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k]
                      },
                  }
              }
              Object.defineProperty(o, k2, desc)
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k
              o[k2] = m[k]
          })
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              })
          }
        : function (o, v) {
              o['default'] = v
          })
var __importStar =
    (this && this.__importStar) ||
    (function () {
        var ownKeys = function (o) {
            ownKeys =
                Object.getOwnPropertyNames ||
                function (o) {
                    var ar = []
                    for (var k in o)
                        if (Object.prototype.hasOwnProperty.call(o, k))
                            ar[ar.length] = k
                    return ar
                }
            return ownKeys(o)
        }
        return function (mod) {
            if (mod && mod.__esModule) return mod
            var result = {}
            if (mod != null)
                for (var k = ownKeys(mod), i = 0; i < k.length; i++)
                    if (k[i] !== 'default') __createBinding(result, mod, k[i])
            __setModuleDefault(result, mod)
            return result
        }
    })()
Object.defineProperty(exports, '__esModule', { value: true })
const express = __importStar(require('express'))
const firebase_admin_1 = require('../lib/firebase-admin')
const middleware_1 = require('../lib/middleware')
const npm_client_1 = require('../lib/npm-client')
const router = express.Router()
// GET /api/npm
router.get('/', middleware_1.authenticateRequest, async (req, res) => {
    try {
        const npmClient = new npm_client_1.NPMClient('blend-v1')
        // Fetch package stats
        const packageStats = await npmClient.getPackageStats()
        if (!packageStats) {
            throw new Error('Failed to fetch package stats')
        }
        // Fetch download trends (last 30 days)
        const downloadTrends = await npmClient.getDownloadTrends(30)
        // Fetch version history
        const versionHistory = await npmClient.getVersionHistory()
        // Fetch package size history
        const sizeHistory = await npmClient.getPackageSizeHistory()
        // Update Firebase Realtime Database
        const updates = {
            publishing: {
                current: {
                    version: packageStats.version,
                    publishedAt: packageStats.lastPublish,
                    size: packageStats.size,
                    dependencies: packageStats.dependencies,
                },
                downloads: {
                    daily: packageStats.downloads.daily,
                    weekly: packageStats.downloads.weekly,
                    monthly: packageStats.downloads.monthly,
                    total: packageStats.downloads.total,
                    lastUpdated: new Date().toISOString(),
                },
                versions: versionHistory.reduce((acc, version) => {
                    // Replace dots with underscores for Firebase compatibility
                    const versionKey = version.version.replace(/\./g, '_')
                    acc[versionKey] = {
                        version: version.version,
                        publishedAt: version.publishedAt,
                        publisher: version.publisher,
                        downloads: version.downloads,
                        changelog: version.changelog,
                        size: version.size,
                        breaking: version.breaking,
                    }
                    return acc
                }, {}),
                trends: {
                    downloads: downloadTrends,
                    size: sizeHistory,
                },
            },
        }
        // Save to Firebase
        const db = (0, firebase_admin_1.getAdminDatabase)()
        await db.ref('blend-monitor/publishing').set(updates.publishing)
        // Update activity log
        await db.ref(`blend-monitor/activity/recent/${Date.now()}`).set({
            type: 'npm_stats_updated',
            timestamp: new Date().toISOString(),
            version: packageStats.version,
        })
        res.json({
            success: true,
            data: {
                packageStats,
                downloadTrends,
                versionHistory: versionHistory.slice(0, 10), // Return only last 10 versions
                sizeHistory,
            },
        })
    } catch (error) {
        console.error('Error in NPM API:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to fetch NPM data',
            details: error instanceof Error ? error.message : 'Unknown error',
        })
    }
})
// POST /api/npm - refresh NPM data
router.post('/', middleware_1.authenticateRequest, async (req, res) => {
    try {
        const npmClient = new npm_client_1.NPMClient('blend-v1')
        // Fetch fresh data
        const packageStats = await npmClient.getPackageStats()
        if (!packageStats) {
            throw new Error('Failed to fetch package stats')
        }
        // Update activity log
        const db = (0, firebase_admin_1.getAdminDatabase)()
        await db.ref(`blend-monitor/activity/recent/${Date.now()}`).set({
            type: 'npm_data_refresh',
            timestamp: new Date().toISOString(),
            version: packageStats.version,
        })
        res.json({
            success: true,
            message: 'NPM data refresh triggered',
            currentVersion: packageStats.version,
        })
    } catch (error) {
        console.error('Error refreshing NPM data:', error)
        res.status(500).json({
            success: false,
            error: 'Failed to refresh NPM data',
        })
    }
})
exports.default = router
//# sourceMappingURL=npm.js.map
