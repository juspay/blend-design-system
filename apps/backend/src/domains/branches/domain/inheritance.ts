import type { BrandConfig } from './branch.types.js'

export interface TokenLockEntry {
    path: string
    reason?: string
}

export interface LockViolation {
    path: string
    parentValue: string
    childValue: string
    reason?: string
}

export interface InheritanceResult {
    mergedConfig: BrandConfig
    violations: LockViolation[]
    isClean: boolean
}

function getByPath(object: unknown, path: string): unknown {
    return path.split('.').reduce<unknown>((current, key) => {
        if (!current || typeof current !== 'object') {
            return undefined
        }
        return (current as Record<string, unknown>)[key]
    }, object)
}

function setByPath(object: unknown, path: string, value: unknown): void {
    if (!object || typeof object !== 'object') {
        return
    }

    const keys = path.split('.')
    if (keys.length === 0) return

    let current = object as Record<string, unknown>

    for (let index = 0; index < keys.length - 1; index++) {
        const key = keys[index]
        const existing = current[key]
        if (!existing || typeof existing !== 'object') {
            current[key] = {}
        }
        current = current[key] as Record<string, unknown>
    }

    current[keys[keys.length - 1]] = value
}

function deepMerge<T extends Record<string, unknown>>(
    base: T,
    override: Partial<T>
): T {
    const result: Record<string, unknown> = { ...base }
    for (const [key, value] of Object.entries(override)) {
        const baseValue = result[key]
        if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value) &&
            baseValue &&
            typeof baseValue === 'object' &&
            !Array.isArray(baseValue)
        ) {
            result[key] = deepMerge(
                baseValue as Record<string, unknown>,
                value as Partial<Record<string, unknown>>
            )
        } else {
            result[key] = value
        }
    }
    return result as T
}

export function validateAgainstLocks(
    parentConfig: BrandConfig,
    childConfig: BrandConfig,
    lockedPaths: TokenLockEntry[]
): LockViolation[] {
    return lockedPaths.reduce<LockViolation[]>((violations, lock) => {
        const parentValue = getByPath(parentConfig, lock.path)
        const childValue = getByPath(childConfig, lock.path)
        if (childValue !== undefined && childValue !== parentValue) {
            violations.push({
                path: lock.path,
                parentValue: String(parentValue ?? '(default)'),
                childValue: String(childValue),
                reason: lock.reason,
            })
        }
        return violations
    }, [])
}

export function resolveWithInheritance(
    parentConfig: BrandConfig,
    childConfig: BrandConfig,
    lockedPaths: TokenLockEntry[] = []
): InheritanceResult {
    const mergedDarkModeOverrides =
        parentConfig.darkModeOverrides || childConfig.darkModeOverrides
            ? {
                  colors: deepMerge(
                      (parentConfig.darkModeOverrides?.colors ?? {}) as Record<
                          string,
                          unknown
                      >,
                      (childConfig.darkModeOverrides?.colors ?? {}) as Record<
                          string,
                          unknown
                      >
                  ) as Record<string, unknown>,
                  radius: {
                      ...(parentConfig.darkModeOverrides?.radius ?? {}),
                      ...(childConfig.darkModeOverrides?.radius ?? {}),
                  },
                  shadows: {
                      ...(parentConfig.darkModeOverrides?.shadows ?? {}),
                      ...(childConfig.darkModeOverrides?.shadows ?? {}),
                  },
                  font: {
                      ...(parentConfig.darkModeOverrides?.font ?? {}),
                      ...(childConfig.darkModeOverrides?.font ?? {}),
                      ...(parentConfig.darkModeOverrides?.font?.weight ||
                      childConfig.darkModeOverrides?.font?.weight
                          ? {
                                weight: {
                                    ...(parentConfig.darkModeOverrides?.font
                                        ?.weight ?? {}),
                                    ...(childConfig.darkModeOverrides?.font
                                        ?.weight ?? {}),
                                },
                            }
                          : {}),
                  },
              }
            : undefined

    const mergedConfig: BrandConfig = {
        brandId: childConfig.brandId,
        name: childConfig.name,
        version: childConfig.version,
        colors: deepMerge(
            (parentConfig.colors ?? {}) as Record<string, unknown>,
            (childConfig.colors ?? {}) as Record<string, unknown>
        ) as BrandConfig['colors'],
        radius: {
            ...(parentConfig.radius ?? {}),
            ...(childConfig.radius ?? {}),
        },
        shadows: {
            ...(parentConfig.shadows ?? {}),
            ...(childConfig.shadows ?? {}),
        },
        font: {
            ...(parentConfig.font ?? {}),
            ...(childConfig.font ?? {}),
            ...(parentConfig.font?.weight || childConfig.font?.weight
                ? {
                      weight: {
                          ...(parentConfig.font?.weight ?? {}),
                          ...(childConfig.font?.weight ?? {}),
                      },
                  }
                : {}),
        },
        componentOverrides: deepMerge(
            (parentConfig.componentOverrides ?? {}) as Record<string, unknown>,
            (childConfig.componentOverrides ?? {}) as Record<string, unknown>
        ),
        darkModeOverrides: mergedDarkModeOverrides,
    }

    const violations = validateAgainstLocks(
        parentConfig,
        childConfig,
        lockedPaths
    )

    for (const lock of lockedPaths) {
        const parentValue = getByPath(parentConfig, lock.path)
        if (parentValue !== undefined) {
            setByPath(mergedConfig, lock.path, parentValue)
        }
    }

    return {
        mergedConfig,
        violations,
        isClean: violations.length === 0,
    }
}
