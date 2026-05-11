export interface GoogleUserInfo {
    googleId: string
    email: string
    displayName?: string
    photoUrl?: string
}

export interface AuthTokens {
    accessToken: string
    refreshToken: string
    expiresIn: number
}

export interface JwtPayload {
    userId: string
    email: string
    role: string
    /** access / refresh = OAuth session; cli_export = short-lived token for `blend-studio login` */
    type?: 'access' | 'refresh' | 'cli_export'
}

export interface TokenPayload {
    userId: string
    email: string
    role: string
}

export interface AuthResponse {
    success: boolean
    data: {
        user: {
            id: string
            email: string
            displayName?: string | null
            photoUrl?: string | null
            role: string
        }
        tokens: {
            accessToken: string
            refreshToken: string
            expiresIn: number
        }
    }
}
