export {}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string
                email: string
                role: string
                displayName: string
                organizationId?: string
                authMethod: 'jwt' | 'api_key'
            }
        }
    }
}
