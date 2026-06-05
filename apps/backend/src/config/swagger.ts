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
                url: 'https://github.com/juspay/blend-design-system',
            },
            license: {
                name: 'Apache-2.0',
                url: 'https://opensource.org/licenses/Apache-2.0',
            },
        },
        servers: [
            {
                url: `http://localhost:${env.PORT}`,
                description: 'Local Development',
            },
            {
                url: 'https://api.blend.example.com',
                description: 'Production (configure via FRONTEND_URL env)',
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
                        branchSlug: {
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
                            enum: ['draft', 'published', 'archived'],
                        },
                        tokenConfig: {
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
            responses: {
                Unauthorized: {
                    description: 'Missing, invalid, or expired credentials',
                },
                Forbidden: {
                    description:
                        'Authenticated user does not have permission for this resource',
                },
                NotFound: {
                    description: 'Requested resource was not found',
                },
                ValidationError: {
                    description: 'Request validation failed',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Error',
                            },
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
            {
                name: 'Tokens',
                description: 'Token upload and retrieval endpoints',
            },
            {
                name: 'Organizations',
                description: 'Organization, membership, and policy management',
            },
            {
                name: 'Users',
                description: 'User profile and administration endpoints',
            },
            {
                name: 'Merge Requests',
                description: 'Branch merge approval workflow',
            },
            {
                name: 'Publish Requests',
                description: 'Branch publish approval workflow',
            },
            {
                name: 'API Keys',
                description: 'API key lifecycle for CLI and automation access',
            },
            {
                name: 'Tags',
                description: 'Branch tag management',
            },
            {
                name: 'Locks',
                description: 'Organization token lock governance',
            },
        ],
        paths: {
            '/api/v1/health': {
                get: {
                    tags: ['Health'],
                    summary: 'Check API and database readiness',
                    responses: {
                        200: {
                            description: 'Service health status',
                        },
                    },
                },
            },
            '/api/v1/branches': {
                get: {
                    tags: ['Branches'],
                    summary: 'List branches',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'query',
                            name: 'limit',
                            schema: { type: 'integer' },
                        },
                        {
                            in: 'query',
                            name: 'cursor',
                            schema: { type: 'string' },
                        },
                        {
                            in: 'query',
                            name: 'organizationId',
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'query',
                            name: 'status',
                            schema: {
                                type: 'string',
                                enum: ['draft', 'published', 'archived'],
                            },
                        },
                        {
                            in: 'query',
                            name: 'visibility',
                            schema: {
                                type: 'string',
                                enum: ['private', 'team', 'public'],
                            },
                        },
                        {
                            in: 'query',
                            name: 'search',
                            schema: { type: 'string' },
                        },
                        {
                            in: 'query',
                            name: 'tag',
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Branch list' },
                        401: { $ref: '#/components/responses/Unauthorized' },
                    },
                },
                post: {
                    tags: ['Branches'],
                    summary: 'Create a branch',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        201: { description: 'Branch created' },
                        400: { $ref: '#/components/responses/ValidationError' },
                        401: { $ref: '#/components/responses/Unauthorized' },
                    },
                },
            },
            '/api/v1/branches/{branchId}': {
                get: {
                    tags: ['Branches'],
                    summary: 'Get a branch',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Branch details' },
                        401: { $ref: '#/components/responses/Unauthorized' },
                        404: { $ref: '#/components/responses/NotFound' },
                    },
                },
                patch: {
                    tags: ['Branches'],
                    summary: 'Update a branch',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Branch updated' },
                        400: { $ref: '#/components/responses/ValidationError' },
                        401: { $ref: '#/components/responses/Unauthorized' },
                    },
                },
                delete: {
                    tags: ['Branches'],
                    summary: 'Delete a branch',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Branch deleted' },
                        401: { $ref: '#/components/responses/Unauthorized' },
                    },
                },
            },
            '/api/v1/branches/{branchId}/fork': {
                post: {
                    tags: ['Branches'],
                    summary: 'Fork a branch',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 201: { description: 'Branch forked' } },
                },
            },
            '/api/v1/branches/{branchId}/publish': {
                post: {
                    tags: ['Branches'],
                    summary: 'Publish a branch or create a publish request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Branch published' },
                        202: {
                            description: 'Publish request created for approval',
                        },
                    },
                },
            },
            '/api/v1/branches/{branchId}/protection': {
                patch: {
                    tags: ['Branches'],
                    summary: 'Update branch protection',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Protection updated' } },
                },
            },
            '/api/v1/branches/{branchId}/approval-settings': {
                get: {
                    tags: ['Branches'],
                    summary: 'Get effective branch approval settings',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'query',
                            name: 'context',
                            schema: {
                                type: 'string',
                                enum: ['merge', 'publish'],
                            },
                        },
                    ],
                    responses: { 200: { description: 'Approval settings' } },
                },
            },
            '/api/v1/branches/{branchId}/versions': {
                get: {
                    tags: ['Branches'],
                    summary: 'List branch versions',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Version list' } },
                },
            },
            '/api/v1/branches/{branchId}/resolve': {
                post: {
                    tags: ['Branches'],
                    summary: 'Resolve effective token config',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Resolved token config' },
                    },
                },
            },
            '/api/v1/branches/{branchId}/snapshots': {
                get: {
                    tags: ['Branches'],
                    summary: 'List branch snapshots',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Snapshot list' } },
                },
                post: {
                    tags: ['Branches'],
                    summary: 'Create branch snapshot',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 201: { description: 'Snapshot created' } },
                },
            },
            '/api/v1/branches/{branchId}/tags/{tagId}': {
                post: {
                    tags: ['Branches'],
                    summary: 'Attach a tag to a branch',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'path',
                            name: 'tagId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Tag attached' } },
                },
                delete: {
                    tags: ['Branches'],
                    summary: 'Remove a tag from a branch',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'branchId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'path',
                            name: 'tagId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Tag removed' } },
                },
            },
            '/api/v1/organizations': {
                get: {
                    tags: ['Organizations'],
                    summary: 'List organizations',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        200: { description: 'Organization list' },
                        403: { $ref: '#/components/responses/Forbidden' },
                    },
                },
                post: {
                    tags: ['Organizations'],
                    summary: 'Create an organization',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        201: { description: 'Organization created' },
                        403: { $ref: '#/components/responses/Forbidden' },
                    },
                },
            },
            '/api/v1/organizations/onboarding': {
                post: {
                    tags: ['Organizations'],
                    summary: 'Create first organization for current user',
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: 'Organization created' } },
                },
            },
            '/api/v1/organizations/{id}': {
                get: {
                    tags: ['Organizations'],
                    summary: 'Get organization details',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Organization details' },
                        403: { $ref: '#/components/responses/Forbidden' },
                        404: { $ref: '#/components/responses/NotFound' },
                    },
                },
                patch: {
                    tags: ['Organizations'],
                    summary: 'Update organization details',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Organization updated' },
                        403: { $ref: '#/components/responses/Forbidden' },
                    },
                },
            },
            '/api/v1/organizations/{id}/approval-settings': {
                patch: {
                    tags: ['Organizations'],
                    summary: 'Update organization approval settings',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Approval settings updated' },
                    },
                },
            },
            '/api/v1/organizations/{id}/members': {
                get: {
                    tags: ['Organizations'],
                    summary: 'List organization members',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        200: { description: 'Member list' },
                        403: { $ref: '#/components/responses/Forbidden' },
                    },
                },
                post: {
                    tags: ['Organizations'],
                    summary: 'Add organization member',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: {
                        201: { description: 'Member added' },
                        403: { $ref: '#/components/responses/Forbidden' },
                    },
                },
            },
            '/api/v1/organizations/{id}/members/{userId}': {
                delete: {
                    tags: ['Organizations'],
                    summary: 'Remove organization member',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'path',
                            name: 'userId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Member removed' } },
                },
            },
            '/api/v1/organizations/{id}/members/{userId}/role': {
                patch: {
                    tags: ['Organizations'],
                    summary: 'Update organization member role',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'path',
                            name: 'userId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Member role updated' } },
                },
            },
            '/api/v1/organizations/{id}/audit-logs': {
                get: {
                    tags: ['Organizations'],
                    summary: 'List organization audit logs',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'query',
                            name: 'action',
                            schema: { type: 'string' },
                        },
                        {
                            in: 'query',
                            name: 'targetType',
                            schema: { type: 'string' },
                        },
                        {
                            in: 'query',
                            name: 'targetId',
                            schema: { type: 'string' },
                        },
                        {
                            in: 'query',
                            name: 'actorId',
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Audit log list' },
                        403: { $ref: '#/components/responses/Forbidden' },
                    },
                },
            },
            '/api/v1/organizations/{organizationId}/locks': {
                get: {
                    tags: ['Locks'],
                    summary: 'List token locks',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'organizationId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Token lock list' } },
                },
                post: {
                    tags: ['Locks'],
                    summary: 'Create token lock',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'organizationId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 201: { description: 'Token locked' } },
                },
            },
            '/api/v1/organizations/{organizationId}/locks/{tokenPath}': {
                delete: {
                    tags: ['Locks'],
                    summary: 'Remove token lock',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'organizationId',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                        {
                            in: 'path',
                            name: 'tokenPath',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: { 200: { description: 'Token unlocked' } },
                },
            },
            '/api/v1/merge-requests': {
                get: {
                    tags: ['Merge Requests'],
                    summary: 'List merge requests',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'Merge request list' } },
                },
                post: {
                    tags: ['Merge Requests'],
                    summary: 'Create merge request',
                    security: [{ bearerAuth: [] }],
                    responses: {
                        201: { description: 'Merge request created' },
                    },
                },
            },
            '/api/v1/merge-requests/{id}': {
                get: {
                    tags: ['Merge Requests'],
                    summary: 'Get merge request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Merge request details' },
                    },
                },
            },
            '/api/v1/merge-requests/{id}/approve': {
                post: {
                    tags: ['Merge Requests'],
                    summary: 'Approve merge request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Merge request approved' },
                    },
                },
            },
            '/api/v1/merge-requests/{id}/reject': {
                post: {
                    tags: ['Merge Requests'],
                    summary: 'Reject merge request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Merge request rejected' },
                    },
                },
            },
            '/api/v1/merge-requests/{id}/merge': {
                post: {
                    tags: ['Merge Requests'],
                    summary: 'Execute approved merge request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: { 200: { description: 'Merge request merged' } },
                },
            },
            '/api/v1/merge-requests/{id}/cancel': {
                post: {
                    tags: ['Merge Requests'],
                    summary: 'Cancel merge request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Merge request cancelled' },
                    },
                },
            },
            '/api/v1/publish-requests': {
                get: {
                    tags: ['Publish Requests'],
                    summary: 'List publish requests',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'Publish request list' } },
                },
            },
            '/api/v1/publish-requests/{id}': {
                get: {
                    tags: ['Publish Requests'],
                    summary: 'Get publish request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Publish request details' },
                    },
                },
            },
            '/api/v1/publish-requests/{id}/approve': {
                post: {
                    tags: ['Publish Requests'],
                    summary: 'Approve publish request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Publish request approved' },
                    },
                },
            },
            '/api/v1/publish-requests/{id}/reject': {
                post: {
                    tags: ['Publish Requests'],
                    summary: 'Reject publish request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Publish request rejected' },
                    },
                },
            },
            '/api/v1/publish-requests/{id}/publish': {
                post: {
                    tags: ['Publish Requests'],
                    summary: 'Execute approved publish request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Publish request executed' },
                    },
                },
            },
            '/api/v1/publish-requests/{id}/cancel': {
                post: {
                    tags: ['Publish Requests'],
                    summary: 'Cancel publish request',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string' },
                        },
                    ],
                    responses: {
                        200: { description: 'Publish request cancelled' },
                    },
                },
            },
            '/api/v1/users': {
                get: {
                    tags: ['Users'],
                    summary: 'List users',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'User list' } },
                },
            },
            '/api/v1/users/{id}': {
                get: {
                    tags: ['Users'],
                    summary: 'Get user profile',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'User profile' } },
                },
                patch: {
                    tags: ['Users'],
                    summary: 'Update user profile',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'User updated' } },
                },
                delete: {
                    tags: ['Users'],
                    summary: 'Deactivate user',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'User deactivated' } },
                },
            },
            '/api/v1/tags': {
                get: {
                    tags: ['Tags'],
                    summary: 'List tags',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'Tag list' } },
                },
                post: {
                    tags: ['Tags'],
                    summary: 'Create tag',
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: 'Tag created' } },
                },
            },
            '/api/v1/tags/{id}': {
                delete: {
                    tags: ['Tags'],
                    summary: 'Delete tag',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'Tag deleted' } },
                },
            },
            '/api/v1/api-keys': {
                get: {
                    tags: ['API Keys'],
                    summary: 'List API keys',
                    security: [{ bearerAuth: [] }],
                    responses: { 200: { description: 'API key list' } },
                },
                post: {
                    tags: ['API Keys'],
                    summary: 'Create API key',
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: 'API key created' } },
                },
            },
            '/api/v1/api-keys/{id}': {
                delete: {
                    tags: ['API Keys'],
                    summary: 'Revoke API key',
                    security: [{ bearerAuth: [] }],
                    parameters: [
                        {
                            in: 'path',
                            name: 'id',
                            required: true,
                            schema: { type: 'string', format: 'uuid' },
                        },
                    ],
                    responses: { 200: { description: 'API key revoked' } },
                },
            },
        },
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
