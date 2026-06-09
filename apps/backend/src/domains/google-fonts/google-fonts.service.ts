import { env } from '@/config/index.js'
import { logger } from '@/utils/logger.js'

const GOOGLE_WEBFONTS_URL = 'https://www.googleapis.com/webfonts/v1/webfonts'
const CACHE_TTL_MS = 24 * 60 * 60 * 1000

export interface GoogleFontStyle {
    variant: string
    weight: number
    italic: boolean
}

export interface GoogleFontFamily {
    family: string
    category: string
    variants: string[]
    styles: GoogleFontStyle[]
}

interface GoogleWebfontsApiItem {
    family: string
    variants: string[]
    subsets: string[]
    category: string
}

interface GoogleWebfontsApiResponse {
    items: GoogleWebfontsApiItem[]
}

let cachedFonts: GoogleFontFamily[] | null = null
let cachedAt = 0

export function parseGoogleFontVariant(variant: string): GoogleFontStyle {
    const italic = variant.includes('italic')
    const weightPart = variant.replace('italic', '') || 'regular'
    const parsed = Number.parseInt(weightPart, 10)
    const weight =
        weightPart === 'regular' ? 400 : Number.isNaN(parsed) ? 400 : parsed

    return { variant, weight, italic }
}

function mapApiItem(item: GoogleWebfontsApiItem): GoogleFontFamily {
    const variants = item.variants ?? []
    return {
        family: item.family,
        category: item.category,
        variants,
        styles: variants.map(parseGoogleFontVariant),
    }
}

export async function listGoogleFonts(options?: {
    sort?: 'alpha' | 'date' | 'popularity' | 'style' | 'trending'
}): Promise<GoogleFontFamily[]> {
    const sort = options?.sort ?? 'popularity'
    const now = Date.now()

    if (cachedFonts && now - cachedAt < CACHE_TTL_MS) {
        return cachedFonts
    }

    const apiKey = env.GOOGLE_FONTS_API_KEY
    if (!apiKey) {
        throw new Error('GOOGLE_FONTS_API_KEY is not configured')
    }

    const url = new URL(GOOGLE_WEBFONTS_URL)
    url.searchParams.set('key', apiKey)
    url.searchParams.set('sort', sort)

    const response = await fetch(url.toString())
    if (!response.ok) {
        const body = await response.text().catch(() => '')
        logger.error(
            { status: response.status, body: body.slice(0, 500) },
            'Google Fonts API request failed'
        )
        throw new Error(`Google Fonts API returned ${response.status}`)
    }

    const data = (await response.json()) as GoogleWebfontsApiResponse
    cachedFonts = (data.items ?? []).map(mapApiItem)
    cachedAt = now

    return cachedFonts
}
