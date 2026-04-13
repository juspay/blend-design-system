import { prisma } from '@/config/database.js'
import type { GoogleUserInfo } from '../domain/auth.types.js'

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({
        where: { email },
    })
}

export const findUserByGoogleId = async (googleId: string) => {
    return prisma.user.findUnique({
        where: { googleId },
    })
}

export const findUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id },
    })
}

export const createUser = async (userData: GoogleUserInfo) => {
    return prisma.user.create({
        data: {
            email: userData.email,
            displayName: userData.displayName,
            photoUrl: userData.photoUrl,
            googleId: userData.googleId,
            role: 'viewer',
            isActive: true,
            lastLogin: new Date(),
        },
    })
}

export const updateUserLogin = async (userId: string) => {
    return prisma.user.update({
        where: { id: userId },
        data: { lastLogin: new Date() },
    })
}

export const storeRefreshToken = async (
    userId: string,
    tokenHash: string,
    expiresAt: Date
) => {
    return prisma.refreshToken.create({
        data: {
            userId,
            tokenHash,
            expiresAt,
        },
    })
}

export const findRefreshToken = async (tokenHash: string) => {
    return prisma.refreshToken.findUnique({
        where: { tokenHash },
    })
}

export const revokeRefreshToken = async (tokenHash: string) => {
    return prisma.refreshToken.deleteMany({
        where: { tokenHash },
    })
}

export const revokeAllUserRefreshTokens = async (userId: string) => {
    return prisma.refreshToken.deleteMany({
        where: { userId },
    })
}

export const cleanupExpiredTokens = async () => {
    return prisma.refreshToken.deleteMany({
        where: {
            expiresAt: {
                lt: new Date(),
            },
        },
    })
}
