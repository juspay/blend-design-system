import type { ComponentTokenType } from '@juspay/blend-design-system'

/**
 * Blend's source exports `ComponentTokenOverrides`, but the built `dist` that
 * ascent consumes does not re-export it — only `ComponentTokenType`. Deriving
 * the deep-partial locally keeps this working against the published package
 * without needing a library change or a rebuild.
 */
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type BlendTokenOverrides = DeepPartial<ComponentTokenType>
