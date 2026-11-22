export interface FeatureFlags {
    useMockData: boolean
    enableRealTimeSync: boolean
    enableNotifications: boolean
    apiBaseUrl: string
}

/**
 * Demo mode is an explicit build-time opt-in that can never activate in a
 * production bundle (audit #15, CWE-602): `import.meta.env.PROD` is
 * statically replaced at build time, so `vite build` output has the mock
 * path dead-code-eliminated. Missing API env vars must not silently turn
 * a deployment into an unauthenticated mock app.
 */
export const IS_DEMO_BUILD =
    import.meta.env.VITE_USE_MOCK_DATA === 'true' && !import.meta.env.PROD

const DEFAULT_FLAGS: FeatureFlags = {
    useMockData: IS_DEMO_BUILD,
    enableRealTimeSync: import.meta.env.VITE_ENABLE_REALTIME_SYNC === 'true',
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
}

class FeatureFlagStore {
    private flags: FeatureFlags

    constructor() {
        const stored = localStorage.getItem('blend-feature-flags')
        const parsed = stored ? JSON.parse(stored) : null
        const overrides: Partial<FeatureFlags> =
            parsed && typeof parsed === 'object' ? parsed : {}
        // Auth bypass and API origin must not be switchable from the browser in production
        if (!import.meta.env.DEV) {
            delete overrides.useMockData
            delete overrides.apiBaseUrl
        }
        this.flags = { ...DEFAULT_FLAGS, ...overrides }
    }

    get(): FeatureFlags {
        return { ...this.flags }
    }

    set(flags: Partial<FeatureFlags>) {
        this.flags = { ...this.flags, ...flags }
        localStorage.setItem('blend-feature-flags', JSON.stringify(this.flags))
        window.dispatchEvent(
            new CustomEvent('featureFlagsChanged', { detail: this.flags })
        )
    }

    reset() {
        this.flags = { ...DEFAULT_FLAGS }
        localStorage.removeItem('blend-feature-flags')
        window.dispatchEvent(
            new CustomEvent('featureFlagsChanged', { detail: this.flags })
        )
    }
}

export const featureFlags = new FeatureFlagStore()
