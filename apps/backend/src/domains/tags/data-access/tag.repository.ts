import { prisma } from '@/config/database.js'
import { logger } from '@/utils/logger.js'

export interface TagRow {
    id: string
    name: string
    createdAt: Date
}

export const createTag = async (name: string): Promise<TagRow> => {
    const tag = await prisma.tag.upsert({
        where: { name },
        update: {},
        create: { name },
    })
    return tag as unknown as TagRow
}

export const getTagById = async (id: string): Promise<TagRow | null> => {
    const tag = await prisma.tag.findUnique({ where: { id } })
    return tag as unknown as TagRow | null
}

export const getTagByName = async (name: string): Promise<TagRow | null> => {
    const tag = await prisma.tag.findUnique({ where: { name } })
    return tag as unknown as TagRow | null
}

export const listTags = async (
    options: { search?: string; limit?: number } = {}
): Promise<TagRow[]> => {
    const where: any = {}
    if (options.search) {
        where.name = { contains: options.search, mode: 'insensitive' }
    }

    const tags = await prisma.tag.findMany({
        where,
        orderBy: { name: 'asc' },
        take: options.limit || 100,
    })

    return tags as unknown as TagRow[]
}

export const deleteTag = async (id: string): Promise<boolean> => {
    await prisma.tag.delete({ where: { id } })
    logger.info({ tagId: id }, 'Tag deleted')
    return true
}
