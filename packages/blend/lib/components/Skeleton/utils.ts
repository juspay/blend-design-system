/**
 * Simple utility function for skeleton state logic
 * Not a hook since it doesn't call any React hooks internally
 */
export function getSkeletonState(showSkeleton: boolean) {
    return {
        shouldShowSkeleton: showSkeleton,
        shouldShowContent: !showSkeleton,
    }
}

/**
 * Helper function for merging component props with skeleton props
 * Not a hook since it's just a pure utility function
 */
export function mergeSkeletonProps<TComponentProps, TSkeletonProps>(
    componentProps: TComponentProps,
    skeletonProps?: Partial<TSkeletonProps>
): TComponentProps & Partial<TSkeletonProps> {
    return { ...componentProps, ...skeletonProps }
}

/**
 * Common skeleton component props validation and defaults
 * Renamed from useSkeletonDefaults since it's not a hook
 */
export function getSkeletonDefaults<T extends Record<string, unknown>>(
    props: T,
    defaults: Partial<T>
): T {
    return { ...defaults, ...props }
}
