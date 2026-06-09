import { featureFlags } from '@/lib/feature-flags'
import type { GoogleFontFamily } from '@/lib/google-fonts'

interface GoogleFontsListResponse {
    fonts: GoogleFontFamily[]
    total: number
}

interface ApiSuccessResponse<T> {
    success: true
    data: T
}

interface ApiErrorResponse {
    success: false
    error: { message: string; code?: string }
}

export class GoogleFontsApiError extends Error {
    constructor(
        message: string,
        public readonly code?: string
    ) {
        super(message)
        this.name = 'GoogleFontsApiError'
    }
}

export async function fetchGoogleFonts(options?: {
    sort?: 'alpha' | 'popularity' | 'date' | 'style' | 'trending'
}): Promise<GoogleFontFamily[]> {
    const flags = featureFlags.get()
    const baseUrl = flags.apiBaseUrl || ''
    const params = new URLSearchParams()
    if (options?.sort) params.set('sort', options.sort)

    const query = params.toString() ? `?${params.toString()}` : ''
    const url = `${baseUrl}/api/google-fonts${query}`

    const response = await fetch(url, { credentials: 'include' })
    const data = (await response.json()) as
        | ApiSuccessResponse<GoogleFontsListResponse>
        | ApiErrorResponse

    if (!response.ok || !data.success) {
        const err = data as ApiErrorResponse
        throw new GoogleFontsApiError(
            err.error?.message || `HTTP ${response.status}`,
            err.error?.code
        )
    }

    return data.data.fonts
}
