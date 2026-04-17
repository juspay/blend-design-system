export function getNestedValue(
    obj: Record<string, unknown>,
    path: string
): unknown {
    const parts = path.split('.')
    let current: unknown = obj
    for (const part of parts) {
        if (current && typeof current === 'object' && current !== null) {
            current = (current as Record<string, unknown>)[part]
        } else {
            return undefined
        }
    }
    return current
}

function safeClone<T>(obj: T): T {
    try {
        return structuredClone(obj)
    } catch {
        return JSON.parse(JSON.stringify(obj))
    }
}

export function setNestedValue(
    obj: Record<string, unknown>,
    path: string,
    value: unknown
): Record<string, unknown> {
    const parts = path.split('.')
    const result = safeClone(obj)
    let current = result as Record<string, unknown>
    for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i]
        if (!current[part] || typeof current[part] !== 'object') {
            current[part] = {}
        }
        current = current[part] as Record<string, unknown>
    }
    current[parts[parts.length - 1]] = value
    return result
}

export function removeNestedValue(
    obj: Record<string, unknown>,
    path: string
): Record<string, unknown> {
    const parts = path.split('.')
    if (parts.length === 0) return obj

    function removeRec(
        current: Record<string, unknown>,
        indices: string[]
    ): Record<string, unknown> {
        if (indices.length === 0) return current
        const [head, ...rest] = indices
        if (rest.length === 0) {
            const { [head]: _, ...remaining } = current
            return remaining
        }
        const child = current[head]
        if (child && typeof child === 'object' && !Array.isArray(child)) {
            const updated = removeRec(child as Record<string, unknown>, rest)
            if (Object.keys(updated).length === 0) {
                const { [head]: _, ...remaining } = current
                return remaining
            }
            return { ...current, [head]: updated }
        }
        return current
    }

    return removeRec(obj, parts)
}

/**
 * Set a value at a path, but also set it for ALL sibling variant keys.
 * e.g. set padding.top.sm.primary.default = "8px" ALSO sets
 * padding.top.sm.secondary.default, padding.top.sm.danger.default, etc.
 *
 * This is because padding is the same across variants - it only differs
 * by size, subtype, and direction.
 */
export function setNestedValueForAllVariants(
    obj: Record<string, unknown>,
    path: string,
    value: unknown,
    resolvedTokens: Record<string, unknown>
): Record<string, unknown> {
    let result = { ...obj }

    // Parse path like "sm.padding.top.primary.default"
    // We need to find which segment is the "variant" and iterate siblings
    const parts = path.split('.')

    // Walk the resolved tokens to find variant-level siblings
    // Variant keys in ButtonV2: primary, secondary, danger, success
    // We detect them by finding where the path diverges into multiple sibling keys
    // that match known variant names
    const VARIANT_KEYS = new Set([
        'primary',
        'secondary',
        'danger',
        'success',
        'default',
        'hover',
        'active',
        'disabled',
        'sm',
        'md',
        'lg',
    ])

    // Find which part index is the "variant" part by checking resolved tokens
    let walker: unknown = resolvedTokens
    let variantIndex = -1
    for (let i = 0; i < parts.length; i++) {
        if (walker && typeof walker === 'object') {
            const currentObj = walker as Record<string, unknown>
            const keys = Object.keys(currentObj)
            if (
                keys.length > 1 &&
                VARIANT_KEYS.has(parts[i]) &&
                i + 1 < parts.length
            ) {
                variantIndex = i
            }
            walker = currentObj[parts[i]]
        } else {
            break
        }
    }

    if (variantIndex === -1) {
        return setNestedValue(result, path, value)
    }

    // Get all sibling keys at the variant level
    let parent: unknown = resolvedTokens
    for (let i = 0; i < variantIndex; i++) {
        if (parent && typeof parent === 'object') {
            parent = (parent as Record<string, unknown>)[parts[i]]
        }
    }
    const siblingKeys = Object.keys(parent as Record<string, unknown>)

    // Set value for each sibling variant
    for (const key of siblingKeys) {
        const siblingPath = [...parts]
        siblingPath[variantIndex] = key
        result = setNestedValue(result, siblingPath.join('.'), value)
    }

    return result
}

/**
 * Collect all leaf paths in an object, returning dot-separated paths.
 */
export function collectLeafPaths(obj: unknown, prefix = ''): string[] {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return []
    const paths: string[] = []
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
        const path = prefix ? `${prefix}.${key}` : key
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            paths.push(...collectLeafPaths(value, path))
        } else {
            paths.push(path)
        }
    }
    return paths
}
