import { Router } from 'express'
import { ComponentScanner } from '@/backend/scanners/component-scanner'
import { databaseService } from '@/backend/lib/database-service'
import { initializeDatabase } from '@/backend/lib/database'
import {
    authenticateBearer,
    hasPermission,
} from '@/backend/lib/auth-middleware'
import { asyncHandler } from '../utils/async-handler'

export const componentsRouter = Router()

componentsRouter.get(
    '/coverage',
    asyncHandler(async (_req, res) => {
        try {
            await initializeDatabase()
            const coverage = await databaseService.getComponentCoverage()
            const categories = await databaseService.getCoverageByCategory()
            res.json({
                coverage,
                categories,
                lastUpdated: new Date().toISOString(),
            })
        } catch (error) {
            console.error('Error fetching coverage:', error)
            res.status(500).json({ error: 'Failed to fetch coverage data' })
        }
    })
)

componentsRouter.get(
    '/components-pg',
    asyncHandler(async (req, res) => {
        try {
            await initializeDatabase()

            const user = await authenticateBearer(
                req.headers.authorization ?? null
            )
            if (!user || !hasPermission(user, 'components', 'read')) {
                res.status(user ? 403 : 401).json({
                    error: user
                        ? 'Insufficient permissions. Required: components:read'
                        : 'Authentication required',
                })
                return
            }

            const components = await databaseService.getComponents()
            const coverage = await databaseService.getComponentCoverage()
            const categories = await databaseService.getCoverageByCategory()

            res.json({
                components,
                coverage,
                categories,
                lastUpdated: new Date().toISOString(),
            })
        } catch (error) {
            console.error('Error fetching components:', error)
            res.status(500).json({
                error: 'Failed to fetch components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            })
        }
    })
)

componentsRouter.post(
    '/components-pg',
    asyncHandler(async (req, res) => {
        try {
            console.log('Starting component scan and database update...')
            await initializeDatabase()

            const user = await authenticateBearer(
                req.headers.authorization ?? null
            )
            if (!user || !hasPermission(user, 'components', 'write')) {
                res.status(user ? 403 : 401).json({
                    error: user
                        ? 'Insufficient permissions. Required: components:write'
                        : 'Authentication required',
                })
                return
            }

            const scanner = new ComponentScanner()
            const components = await scanner.scanComponents()
            await databaseService.batchUpsertComponents(components)

            const coverage = await databaseService.getComponentCoverage()
            const categories = await databaseService.getCoverageByCategory()
            await databaseService.saveCoverageMetrics(coverage, categories)

            await databaseService.logSystemActivity('component_scan', {
                componentsFound: components.length,
                coverage: coverage.percentage,
                timestamp: new Date().toISOString(),
            })

            res.json({
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
            res.status(500).json({
                error: 'Failed to update components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            })
        }
    })
)

componentsRouter.get(
    '/',
    asyncHandler(async (_req, res) => {
        try {
            await initializeDatabase()
            const components = await databaseService.getComponents()
            const coverage = await databaseService.getComponentCoverage()
            const categories = await databaseService.getCoverageByCategory()
            res.json({
                components,
                coverage,
                categories,
                lastUpdated: new Date().toISOString(),
            })
        } catch (error) {
            console.error('Error fetching components:', error)
            res.status(500).json({
                error: 'Failed to fetch components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            })
        }
    })
)

componentsRouter.post(
    '/',
    asyncHandler(async (_req, res) => {
        try {
            console.log('Starting component scan and database update...')
            await initializeDatabase()

            const scanner = new ComponentScanner()
            const components = await scanner.scanComponents()
            await databaseService.batchUpsertComponents(components)

            const coverage = await databaseService.getComponentCoverage()
            const categories = await databaseService.getCoverageByCategory()
            await databaseService.saveCoverageMetrics(coverage, categories)

            await databaseService.logSystemActivity('component_scan', {
                componentsFound: components.length,
                coverage: coverage.percentage,
                timestamp: new Date().toISOString(),
            })

            res.json({
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
            res.status(500).json({
                error: 'Failed to update components',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            })
        }
    })
)

componentsRouter.get(
    '/:id',
    asyncHandler(async (req, res) => {
        try {
            await initializeDatabase()
            const component = await databaseService.getComponentById(
                req.params.id
            )
            if (!component) {
                res.status(404).json({ error: 'Component not found' })
                return
            }
            res.json({ component })
        } catch (error) {
            console.error('Error fetching component:', error)
            res.status(500).json({ error: 'Failed to fetch component' })
        }
    })
)
