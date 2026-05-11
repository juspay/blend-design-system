export interface FeatureFlags {
    useMockData: boolean
    enableRealTimeSync: boolean
    enableNotifications: boolean
    apiBaseUrl: string
}

const DEFAULT_FLAGS: FeatureFlags = {
    useMockData:
        import.meta.env.VITE_USE_MOCK_DATA === 'true' ||
        (!import.meta.env.VITE_FIREBASE_API_KEY &&
            !import.meta.env.VITE_API_BASE_URL),
    enableRealTimeSync: import.meta.env.VITE_ENABLE_REALTIME_SYNC === 'true',
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
}

class FeatureFlagStore {
    private flags: FeatureFlags

    constructor() {
        const stored = localStorage.getItem('blend-feature-flags')
        this.flags = stored
            ? { ...DEFAULT_FLAGS, ...JSON.parse(stored) }
            : DEFAULT_FLAGS
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
