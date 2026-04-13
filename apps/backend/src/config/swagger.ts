import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { env } from './index.js'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blend Studio API',
            version: '0.1.0',
            description:
                'Production-ready Backend API for Blend Token Studio with Google OAuth, RBAC, Teams, and Token Management',
            contact: {
                name: 'Blend Team',
                email: 'support@blend.juspay.design',
            },
            license: {
                name: 'Private',
            },
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: 'Local Development',
            },
            {
                url: 'https://api.blend.juspay.design',
                description: 'Production',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        'Enter your JWT token in the format: Bearer <token>',
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            example: false,
                        },
                        error: {
                            type: 'object',
                            properties: {
                                code: {
                                    type: 'string',
                                },
                                message: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                        },
                        displayName: {
                            type: 'string',
                            nullable: true,
                        },
                        photoUrl: {
                            type: 'string',
                            nullable: true,
                        },
                        role: {
                            type: 'string',
                            enum: ['viewer', 'editor', 'admin', 'superadmin'],
                        },
                    },
                },
                Branch: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                        },
                        brandId: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
                        parentBranch: {
                            type: 'string',
                            nullable: true,
                        },
                        status: {
                            type: 'string',
                            enum: ['draft', 'published'],
                        },
                        brandConfig: {
                            type: 'object',
                            properties: {
                                brandId: { type: 'string' },
                                name: { type: 'string' },
                                version: { type: 'string' },
                                colors: { type: 'object' },
                                radius: { type: 'object' },
                            },
                        },
                        createdBy: {
                            type: 'string',
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                        },
                        publishedVersions: {
                            type: 'integer',
                        },
                    },
                },
            },
        },
        tags: [
            {
                name: 'Health',
                description: 'Health check endpoints',
            },
            {
                name: 'Authentication',
                description: 'Authentication and authorization endpoints',
            },
            {
                name: 'Branches',
                description: 'Token branch management and version control',
            },
        ],
    },
    apis: ['./src/**/*routes.ts', './src/**/*controller.ts', './src/server.ts'],
}

import type { Handler, RequestHandler } from 'express'

export const swaggerSpec = swaggerJsdoc(options)
export const swaggerUiHandler: Handler[] = swaggerUi.serve
export const swaggerUiSetup: RequestHandler = swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Blend Studio API Docs',
    swaggerOptions: {
        persistAuthorization: true,
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
    },
})
