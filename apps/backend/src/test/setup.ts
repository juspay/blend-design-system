import { beforeEach, afterEach, vi } from 'vitest'

process.env.NODE_ENV = 'test'
process.env.DATABASE_URL ??=
    'postgresql://blend:blend_test_secret@localhost:5433/blend_studio_test'
process.env.GOOGLE_CLIENT_ID ??= 'test-google-client-id'
process.env.GOOGLE_CLIENT_SECRET ??= 'test-google-client-secret'
process.env.GOOGLE_REDIRECT_URI ??=
    'http://localhost:3001/api/v1/auth/google/callback'
process.env.JWT_SECRET ??= 'test-jwt-secret-that-is-at-least-32-chars'
process.env.JWT_EXPIRES_IN ??= '7d'
process.env.JWT_REFRESH_EXPIRES_IN ??= '30d'
process.env.JWT_CLI_EXPORT_EXPIRES_IN ??= '10m'
process.env.FRONTEND_URL ??= 'http://localhost:5173'
process.env.STUDIO_URL ??= 'http://localhost:3000'

beforeEach(() => {
    vi.clearAllMocks()
})

afterEach(() => {
    vi.restoreAllMocks()
})
