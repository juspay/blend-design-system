import type { PrismaClient } from '@prisma/client'
import { mockDeep, type DeepMockProxy, mockReset } from 'jest-mock-extended'

export type MockPrismaClient = DeepMockProxy<PrismaClient>

export const createMockPrismaClient = (): MockPrismaClient => {
    return mockDeep<PrismaClient>()
}

export const resetMockPrismaClient = (mockPrisma: MockPrismaClient): void => {
    mockReset(mockPrisma)
}
