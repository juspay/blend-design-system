import { NextResponse } from 'next/server'
import { ComponentScanner } from '@/lib/scanners/component-scanner'
import { getAdminDatabase } from '@/lib/firebase-admin'

export async function GET() {
    try {
        // Initialize scanner
        const scanner = new ComponentScanner()

        // Scan components from file system
        const components = await scanner.scanComponents()

        // Calculate coverage metrics
        const total = components.length
        const integrated = components.filter((c) => c.hasFigmaConnect).length
        const percentage =
            total > 0 ? Math.round((integrated / total) * 100) : 0

        // Group by category
        const byCategory = components.reduce(
            (acc, component) => {
                if (!acc[component.category]) {
                    acc[component.category] = {
                        total: 0,
                        integrated: 0,
                        components: [],
                    }
                }

                acc[component.category].total++
                if (component.hasFigmaConnect) {
                    acc[component.category].integrated++
                }
                acc[component.category].components.push(component)

                return acc
            },
            {} as Record<string, any>
        )

        // Update Firebase Realtime Database
        const updates = {
            components: components.reduce(
                (acc, comp) => {
                    acc[comp.id] = {
                        info: {
                            name: comp.name,
                            category: comp.category,
                            path: comp.path,
                            lastModified: comp.lastModified,
                        },
                        integration: {
                            status: comp.hasFigmaConnect
                                ? 'active'
                                : 'not_integrated',
                            hasFigmaConnect: comp.hasFigmaConnect,
                            hasStorybook: comp.hasStorybook,
                            hasTests: comp.hasTests,
                            lastSync: new Date().toISOString(),
                        },
                    }
                    return acc
                },
                {} as Record<string, any>
            ),
            coverage: {
                summary: {
                    total,
                    integrated,
                    percentage,
                    lastUpdated: new Date().toISOString(),
                },
                byCategory: Object.entries(byCategory).reduce(
                    (acc, [category, data]: [string, any]) => {
                        acc[category] = {
                            total: data.total,
                            integrated: data.integrated,
                        }
                        return acc
                    },
                    {} as Record<string, any>
                ),
            },
        }

        // Save to Firebase using Admin SDK
        const db = getAdminDatabase()
        await db.ref('blend-monitor').set(updates)

        return NextResponse.json({
            success: true,
            data: {
                components,
                coverage: {
                    total,
                    integrated,
                    percentage,
                    byCategory,
                },
            },
        })
    } catch (error) {
        console.error('Error in components API:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// POST endpoint to trigger a rescan
export async function POST() {
    try {
        // Trigger component scan
        const scanner = new ComponentScanner()
        const components = await scanner.scanComponents()

        // Update activity log using Admin SDK
        const db = getAdminDatabase()
        await db.ref(`blend-monitor/activity/recent/${Date.now()}`).set({
            type: 'component_scan',
            timestamp: new Date().toISOString(),
            componentsFound: components.length,
        })

        return NextResponse.json({
            success: true,
            message: 'Component scan triggered',
            componentsFound: components.length,
        })
    } catch (error) {
        console.error('Error triggering scan:', error)
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to trigger scan',
            },
            { status: 500 }
        )
    }
}
