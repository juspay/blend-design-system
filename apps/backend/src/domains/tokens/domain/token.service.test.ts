import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ValidationError } from '@/errors/AppError.js'

vi.mock('@/config/database.js', () => ({
    prisma: {
        tokenUpload: {
            create: vi.fn(),
            findMany: vi.fn(),
        },
    },
}))

vi.mock('@/utils/logger.js', () => ({
    logger: {
        info: vi.fn(),
        warn: vi.fn(),
        error: vi.fn(),
    },
}))

import { uploadToken } from './token.service.js'
import { prisma } from '@/config/database.js'

const mockedPrisma = vi.mocked(prisma, true)

const baseInput = {
    branchId: 'branch-1',
    fileName: 'brand.json',
    fileBuffer: Buffer.from('{}'),
    uploadedBy: 'user-1',
    uploadedByName: 'User One',
}

const validConfig = JSON.stringify({
    brandId: 'brand-1',
    name: 'Brand One',
    colors: { primary: { 500: '#0052cc' } },
})

describe('uploadToken hostile-document rejection', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('accepts a well-formed brand config', async () => {
        mockedPrisma.tokenUpload.create.mockResolvedValue({
            id: 'upload-1',
        } as any)

        const result = await uploadToken({
            ...baseInput,
            fileBuffer: Buffer.from(validConfig),
        })

        expect(result.success).toBe(true)
        expect(mockedPrisma.tokenUpload.create).toHaveBeenCalledTimes(1)
    })

    it('rejects prototype-pollution keys at any depth', async () => {
        // Raw JSON keeps __proto__ as an own key — exactly how a hostile
        // payload arrives over the wire. (An object literal would instead
        // set the prototype and silently drop the key.)
        const poisoned =
            '{"brandId":"brand-1","name":"Brand One",' +
            '"colors":{"primary":{"500":"#0052cc"}},' +
            '"__proto__":{"polluted":"true"}}'

        await expect(
            uploadToken({ ...baseInput, fileBuffer: Buffer.from(poisoned) })
        ).rejects.toMatchObject({
            code: 'VALIDATION_ERROR',
            message: expect.stringContaining('forbidden key'),
        })

        expect(mockedPrisma.tokenUpload.create).not.toHaveBeenCalled()
    })

    it('rejects prototype keys nested inside the config tree', async () => {
        const poisoned = JSON.stringify({
            brandId: 'brand-1',
            name: 'Brand One',
            colors: {
                primary: {
                    500: '#0052cc',
                    nested: { constructor: { prototype: {} } },
                },
            },
        })

        await expect(
            uploadToken({ ...baseInput, fileBuffer: Buffer.from(poisoned) })
        ).rejects.toMatchObject({
            code: 'VALIDATION_ERROR',
            message: expect.stringContaining('forbidden key'),
        })
    })

    it('rejects documents nested beyond the depth bound', async () => {
        let deep: Record<string, unknown> = { leaf: 1 }
        for (let i = 0; i < 40; i++) {
            deep = { level: deep }
        }
        const config = JSON.stringify({
            brandId: 'brand-1',
            name: 'Brand One',
            colors: { primary: { 500: '#0052cc' } },
            extras: deep,
        })

        await expect(
            uploadToken({ ...baseInput, fileBuffer: Buffer.from(config) })
        ).rejects.toMatchObject({
            code: 'VALIDATION_ERROR',
            message: expect.stringContaining('nesting depth'),
        })

        expect(mockedPrisma.tokenUpload.create).not.toHaveBeenCalled()
    })

    it('rejects documents exceeding the key-count bound', async () => {
        const colors: Record<string, unknown> = {
            primary: { 500: '#0052cc' },
        }
        for (let i = 0; i < 6000; i++) {
            colors[`token-${i}`] = '#000000'
        }

        const config = JSON.stringify({
            brandId: 'brand-1',
            name: 'Brand One',
            colors,
        })

        await expect(
            uploadToken({ ...baseInput, fileBuffer: Buffer.from(config) })
        ).rejects.toBeInstanceOf(ValidationError)
    })
})
