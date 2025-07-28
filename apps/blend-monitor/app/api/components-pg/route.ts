import { NextResponse } from 'next/server'
import { databaseService } from '@/lib/database-service'
import { ComponentScanner } from '@/lib/scanners/component-scanner'
import { initializeDatabase } from '@/lib/database'

// GET /api/components-pg - Fetch components from PostgreSQL
export async function GET() {
    try {
        // Ensure database is initialized
        await initializeDatabase()

        const components = await databaseService.getComponents()
        const coverage = await databaseService.getComponentCoverage()
        const categories = await databaseService.getCoverageByCategory()

        return NextResponse.json({
            components,
            coverage,
            categories,
            lastUpdated: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error fetching components:', error)
        return NextResponse.json(
            {
                error: 'Failed to fetch components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// POST /api/components-pg - Scan and update components in PostgreSQL
export async function POST() {
    try {
        console.log('Starting component scan and database update...')

        // Ensure database is initialized
        await initializeDatabase()

        // Scan components from filesystem
        const scanner = new ComponentScanner()
        const components = await scanner.scanComponents()

        console.log(`Found ${components.length} components`)

        // Batch update components in PostgreSQL
        await databaseService.batchUpsertComponents(components)

        // Calculate and save coverage metrics
        const coverage = await databaseService.getComponentCoverage()
        const categories = await databaseService.getCoverageByCategory()

        // Save coverage snapshot for historical tracking
        await databaseService.saveCoverageMetrics(coverage, categories)

        // Log system activity
        await databaseService.logSystemActivity('component_scan', {
            componentsFound: components.length,
            coverage: coverage.percentage,
            timestamp: new Date().toISOString(),
        })

        console.log('Component scan completed successfully')

        return NextResponse.json({
            success: true,
            message: 'Components updated successfully',
            data: {
                components,
                coverage,
                categories,
                summary: {
                    total: components.length,
                    integrated: components.filter((c) => c.hasFigmaConnect)
                        .length,
                    withStorybook: components.filter((c) => c.hasStorybook)
                        .length,
                    withTests: components.filter((c) => c.hasTests).length,
                },
            },
        })
    } catch (error) {
        console.error('Error updating components:', error)
        return NextResponse.json(
            {
                error: 'Failed to update components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

// Additional endpoints for specific component operations

// GET /api/components-pg/coverage - Get coverage metrics
export async function getCoverage() {
    try {
        const coverage = await databaseService.getComponentCoverage()
        const categories = await databaseService.getCoverageByCategory()

        return NextResponse.json({
            coverage,
            categories,
            lastUpdated: new Date().toISOString(),
        })
    } catch (error) {
        console.error('Error fetching coverage:', error)
        return NextResponse.json(
            { error: 'Failed to fetch coverage data' },
            { status: 500 }
        )
    }
}

// GET /api/components-pg/[id] - Get specific component
export async function getComponent(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const component = await databaseService.getComponentById(id)

        if (!component) {
            return NextResponse.json(
                { error: 'Component not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ component })
    } catch (error) {
        console.error('Error fetching component:', error)
        return NextResponse.json(
            { error: 'Failed to fetch component' },
            { status: 500 }
        )
    }
}
