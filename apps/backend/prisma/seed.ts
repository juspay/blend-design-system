import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // -----------------------------------------------------------------------
    // Organization
    // -----------------------------------------------------------------------
    const org = await prisma.organization.upsert({
        where: { slug: 'blend-studio' },
        update: {},
        create: {
            name: 'Blend Design Studio',
            slug: 'blend-studio',
        },
    })
    const orgId = org.id
    console.log(`  Created organization: ${org.name}`)

    // -----------------------------------------------------------------------
    // Users
    // -----------------------------------------------------------------------
    const admin = await prisma.user.upsert({
        where: { email: 'admin@blend.dev' },
        update: {},
        create: {
            email: 'admin@blend.dev',
            displayName: 'Admin User',
            role: 'admin',
            isActive: true,
        },
    })

    const designer = await prisma.user.upsert({
        where: { email: 'designer@blend.dev' },
        update: {},
        create: {
            email: 'designer@blend.dev',
            displayName: 'Design Team',
            role: 'editor',
            isActive: true,
        },
    })

    const viewer = await prisma.user.upsert({
        where: { email: 'viewer@blend.dev' },
        update: {},
        create: {
            email: 'viewer@blend.dev',
            displayName: 'View Only User',
            role: 'viewer',
            isActive: true,
        },
    })

    console.log(
        `  Created users: ${admin.email}, ${designer.email}, ${viewer.email}`
    )

    // -----------------------------------------------------------------------
    // Memberships
    // -----------------------------------------------------------------------
    await prisma.member.createMany({
        data: [
            { organizationId: orgId, userId: admin.id, role: 'admin' },
            { organizationId: orgId, userId: designer.id, role: 'editor' },
            { organizationId: orgId, userId: viewer.id, role: 'viewer' },
        ],
        skipDuplicates: true,
    })
    console.log('  Created memberships')

    // -----------------------------------------------------------------------
    // Tags
    // -----------------------------------------------------------------------
    const tags = await Promise.all([
        prisma.tag.upsert({
            where: { name: 'default' },
            update: {},
            create: { name: 'default' },
        }),
        prisma.tag.upsert({
            where: { name: 'dark-mode' },
            update: {},
            create: { name: 'dark-mode' },
        }),
        prisma.tag.upsert({
            where: { name: 'starter' },
            update: {},
            create: { name: 'starter' },
        }),
        prisma.tag.upsert({
            where: { name: 'v2' },
            update: {},
            create: { name: 'v2' },
        }),
        prisma.tag.upsert({
            where: { name: 'production' },
            update: {},
            create: { name: 'production' },
        }),
    ])
    console.log(`  Created ${tags.length} tags`)

    // -----------------------------------------------------------------------
    // Branches — generic, open-source friendly
    // -----------------------------------------------------------------------
    const branchIds = {
        blendDefault: randomUUID(),
        juspayDefault: randomUUID(),
        starterPurple: randomUUID(),
        starterGreen: randomUUID(),
    }

    const branches = await Promise.all([
        prisma.branch.create({
            data: {
                id: branchIds.blendDefault,
                organizationId: orgId,
                brandId: 'blend/default',
                name: 'Blend Default',
                description: 'Default Blend Design System theme — no overrides',
                status: 'published',
                visibility: 'public',
                createdBy: admin.id,
                createdByName: admin.displayName || 'Admin',
                brandConfig: {
                    brandId: 'blend/default',
                    name: 'Blend Default',
                    version: '1.0.0',
                    colors: {},
                },
                publishedVersions: 1,
                latestVersion: '1.0.0',
            },
        }),
        prisma.branch.create({
            data: {
                id: branchIds.juspayDefault,
                organizationId: orgId,
                brandId: 'juspay/default',
                name: 'Juspay Default',
                description:
                    'Juspay brand theme with blue primary — the default preset',
                status: 'published',
                visibility: 'team',
                createdBy: admin.id,
                createdByName: admin.displayName || 'Admin',
                brandConfig: {
                    brandId: 'juspay/default',
                    name: 'Juspay',
                    version: '1.0.0',
                    colors: {
                        primary: {
                            '300': '#93C5FD',
                            '400': '#60A5FA',
                            '500': '#3B82F6',
                            '600': '#2563EB',
                            '700': '#1D4ED8',
                            '800': '#1E40AF',
                        },
                    },
                },
                publishedVersions: 2,
                latestVersion: '1.2.0',
            },
        }),
        prisma.branch.create({
            data: {
                id: branchIds.starterPurple,
                organizationId: orgId,
                brandId: 'starter/purple',
                name: 'Starter Purple',
                description:
                    'Purple SaaS theme with rounded corners — great for dashboards',
                status: 'published',
                visibility: 'public',
                createdBy: designer.id,
                createdByName: designer.displayName || 'Designer',
                brandConfig: {
                    brandId: 'starter/purple',
                    name: 'Purple',
                    version: '1.0.0',
                    colors: {
                        primary: {
                            '300': '#DAB2FF',
                            '400': '#C27AFF',
                            '500': '#AD46FF',
                            '600': '#9810FA',
                            '700': '#8200DB',
                            '800': '#6E11B0',
                        },
                    },
                    radius: { '10': '20px', '12': '24px' },
                },
                publishedVersions: 1,
                latestVersion: '1.0.0',
            },
        }),
        prisma.branch.create({
            data: {
                id: branchIds.starterGreen,
                organizationId: orgId,
                brandId: 'starter/green',
                name: 'Starter Green',
                description: 'Green theme — still in draft',
                status: 'draft',
                visibility: 'private',
                createdBy: designer.id,
                createdByName: designer.displayName || 'Designer',
                brandConfig: {
                    brandId: 'starter/green',
                    name: 'Green',
                    version: '1.0.0',
                    colors: {
                        primary: {
                            '300': '#7BF1A8',
                            '400': '#00D492',
                            '500': '#00C951',
                            '600': '#00A63E',
                            '700': '#008236',
                            '800': '#016630',
                        },
                    },
                },
                publishedVersions: 0,
            },
        }),
    ])
    console.log(`  Created ${branches.length} branches`)

    // -----------------------------------------------------------------------
    // Branch Tags
    // -----------------------------------------------------------------------
    await Promise.all([
        prisma.branchTag.create({
            data: { branchId: branchIds.blendDefault, tagId: tags[0].id },
        }),
        prisma.branchTag.create({
            data: { branchId: branchIds.juspayDefault, tagId: tags[4].id },
        }),
        prisma.branchTag.create({
            data: { branchId: branchIds.starterPurple, tagId: tags[2].id },
        }),
        prisma.branchTag.create({
            data: { branchId: branchIds.starterGreen, tagId: tags[2].id },
        }),
    ])
    console.log('  Tagged branches')

    // -----------------------------------------------------------------------
    // Versions
    // -----------------------------------------------------------------------
    const versions = await Promise.all([
        prisma.branchVersion.create({
            data: {
                branchId: branchIds.blendDefault,
                version: '1.0.0',
                brandConfig: {
                    brandId: 'blend/default',
                    name: 'Blend Default',
                    version: '1.0.0',
                    colors: {},
                },
                changelog: 'Initial Blend default theme',
                publishedBy: admin.id,
                publishedByName: admin.displayName || 'Admin',
            },
        }),
        prisma.branchVersion.create({
            data: {
                branchId: branchIds.juspayDefault,
                version: '1.0.0',
                brandConfig: {
                    brandId: 'juspay/default',
                    name: 'Juspay',
                    version: '1.0.0',
                    colors: { primary: { '500': '#3B82F6' } },
                },
                changelog: 'Initial Juspay branding',
                publishedBy: admin.id,
                publishedByName: admin.displayName || 'Admin',
            },
        }),
        prisma.branchVersion.create({
            data: {
                branchId: branchIds.juspayDefault,
                version: '1.2.0',
                brandConfig: {
                    brandId: 'juspay/default',
                    name: 'Juspay',
                    version: '1.2.0',
                    colors: { primary: { '500': '#3B82F6' } },
                },
                changelog: 'Updated full color scale',
                publishedBy: admin.id,
                publishedByName: admin.displayName || 'Admin',
            },
        }),
        prisma.branchVersion.create({
            data: {
                branchId: branchIds.starterPurple,
                version: '1.0.0',
                brandConfig: {
                    brandId: 'starter/purple',
                    name: 'Purple',
                    version: '1.0.0',
                    colors: { primary: { '500': '#AD46FF' } },
                },
                changelog: 'Initial purple theme',
                publishedBy: designer.id,
                publishedByName: designer.displayName || 'Designer',
            },
        }),
    ])
    console.log(`  Created ${versions.length} versions`)

    // -----------------------------------------------------------------------
    // Snapshots
    // -----------------------------------------------------------------------
    const snapshots = await Promise.all([
        prisma.branchSnapshot.create({
            data: {
                branchId: branchIds.starterGreen,
                brandConfig: {
                    brandId: 'starter/green',
                    name: 'Green',
                    colors: { primary: { '500': '#00C951' } },
                },
                label: 'Manual save',
                isAutoSave: false,
                savedBy: designer.id,
                savedByName: designer.displayName || 'Designer',
            },
        }),
        prisma.branchSnapshot.create({
            data: {
                branchId: branchIds.starterGreen,
                brandConfig: {
                    brandId: 'starter/green',
                    name: 'Green',
                    colors: { primary: { '500': '#00D492' } },
                },
                label: 'Auto-save',
                isAutoSave: true,
                savedBy: designer.id,
                savedByName: designer.displayName || 'Designer',
            },
        }),
    ])
    console.log(`  Created ${snapshots.length} snapshots`)

    // -----------------------------------------------------------------------
    // Audit Logs
    // -----------------------------------------------------------------------
    await Promise.all([
        prisma.auditLog.create({
            data: {
                organizationId: orgId,
                action: 'branch_created',
                actorId: admin.id,
                actorEmail: admin.email,
                targetType: 'branch',
                targetId: branchIds.blendDefault,
                metadata: { name: 'Blend Default' },
            },
        }),
        prisma.auditLog.create({
            data: {
                organizationId: orgId,
                action: 'branch_created',
                actorId: admin.id,
                actorEmail: admin.email,
                targetType: 'branch',
                targetId: branchIds.juspayDefault,
                metadata: { name: 'Juspay Default' },
            },
        }),
        prisma.auditLog.create({
            data: {
                organizationId: orgId,
                action: 'branch_published',
                actorId: admin.id,
                actorEmail: admin.email,
                targetType: 'branch',
                targetId: branchIds.juspayDefault,
                metadata: { version: '1.2.0' },
            },
        }),
    ])
    console.log('  Created audit logs')

    console.log('\nSeed complete! Run `npm run db:studio` to browse data.')
}

main()
    .catch((e) => {
        console.error('Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
