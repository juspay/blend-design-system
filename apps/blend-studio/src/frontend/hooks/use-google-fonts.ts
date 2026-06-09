import { useQuery } from '@tanstack/react-query'
import { fetchGoogleFonts, GoogleFontsApiError } from '@/api/google-fonts'
import { featureFlags } from '@/lib/feature-flags'

export const googleFontsKeys = {
    all: ['google-fonts'] as const,
    list: (sort: string) => [...googleFontsKeys.all, sort] as const,
}

export function useGoogleFonts(sort: 'popularity' | 'alpha' = 'popularity') {
    const flags = featureFlags.get()
    const enabled = Boolean(flags.apiBaseUrl)

    const query = useQuery({
        queryKey: googleFontsKeys.list(sort),
        enabled,
        staleTime: 24 * 60 * 60 * 1000,
        gcTime: 24 * 60 * 60 * 1000,
        queryFn: () => fetchGoogleFonts({ sort }),
    })

    const error =
        query.error instanceof GoogleFontsApiError
            ? query.error.message
            : query.error instanceof Error
              ? query.error.message
              : null

    const notConfigured =
        query.error instanceof GoogleFontsApiError &&
        query.error.code === 'GOOGLE_FONTS_NOT_CONFIGURED'

    return {
        fonts: query.data ?? [],
        total: query.data?.length ?? 0,
        loading: query.isLoading || query.isFetching,
        error,
        notConfigured,
        isAvailable: enabled && !notConfigured && !error,
        refetch: query.refetch,
    }
}
