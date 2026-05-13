import { PrismaClient } from '../src/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main(): Promise<void> {
    console.log('Seeding database...')

    // Create default roles
    const roles = await Promise.all([
        prisma.role.upsert({
            where: { id: 'admin' },
            update: {},
            create: {
                id: 'admin',
                name: 'Administrator',
                permissions: {
                    deployments: ['read', 'write', 'deploy', 'rollback'],
                    users: [
                        'read',
                        'write',
                        'delete',
                        'create',
                        'assign_roles',
                    ],
                    components: ['read', 'write'],
                    settings: ['read', 'write'],
                    teams: ['read', 'write', 'delete'],
                    branches: ['read', 'write', 'delete', 'publish'],
                },
                isCustom: false,
            },
        }),
        prisma.role.upsert({
            where: { id: 'developer' },
            update: {},
            create: {
                id: 'developer',
                name: 'Developer',
                permissions: {
                    deployments: ['read', 'deploy', 'rollback'],
                    components: ['read', 'write'],
                    users: ['read'],
                    teams: ['read'],
                    branches: ['read', 'write', 'publish'],
                },
                isCustom: false,
            },
        }),
        prisma.role.upsert({
            where: { id: 'editor' },
            update: {},
            create: {
                id: 'editor',
                name: 'Editor',
                permissions: {
                    deployments: ['read'],
                    components: ['read'],
                    users: ['read'],
                    teams: ['read'],
                    branches: ['read', 'write', 'publish'],
                },
                isCustom: false,
            },
        }),
        prisma.role.upsert({
            where: { id: 'viewer' },
            update: {},
            create: {
                id: 'viewer',
                name: 'Viewer',
                permissions: {
                    deployments: ['read'],
                    components: ['read'],
                    users: ['read'],
                    teams: ['read'],
                    branches: ['read'],
                },
                isCustom: false,
            },
        }),
    ])

    console.log(`Created ${roles.length} roles`)

    // Create default environments
    const environments = await Promise.all([
        prisma.environment.upsert({
            where: { name: 'production' },
            update: {},
            create: {
                name: 'production',
                status: 'unknown',
            },
        }),
        prisma.environment.upsert({
            where: { name: 'staging' },
            update: {},
            create: {
                name: 'staging',
                status: 'unknown',
            },
        }),
        prisma.environment.upsert({
            where: { name: 'development' },
            update: {},
            create: {
                name: 'development',
                status: 'unknown',
            },
        }),
    ])

    console.log(`Created ${environments.length} environments`)

    console.log('Seeding complete!')
}

main()
    .catch((e: unknown) => {
        console.error(e)
        process.exit(1)
    })
    .finally(() => {
        void prisma.$disconnect()
    })
