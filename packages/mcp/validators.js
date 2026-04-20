/**
 * Prop validation logic for Blend Design System components.
 * Reads component definitions from manifest.json via the manifest object passed in.
 */

/**
 * Finds the most similar prop name from a list of valid names using simple
 * edit-distance heuristics (prefix match, substring match, character overlap).
 * @param {string} inputName
 * @param {string[]} validNames
 * @returns {string|null}
 */
export function findSimilarPropName(inputName, validNames) {
    if (!validNames || validNames.length === 0) return null

    const lower = inputName.toLowerCase()

    // Exact prefix match (at least 2 chars)
    const prefixMatch = validNames.find(
        (n) =>
            lower.length >= 2 && n.toLowerCase().startsWith(lower.slice(0, 3))
    )
    if (prefixMatch) return prefixMatch

    // Substring match — input is a substring of a valid name or vice versa
    const subMatch = validNames.find(
        (n) =>
            n.toLowerCase().includes(lower) ||
            lower.includes(n.toLowerCase().slice(0, Math.max(3, n.length - 2)))
    )
    if (subMatch) return subMatch

    // Simple edit distance (Levenshtein) — pick the closest
    function editDistance(a, b) {
        const m = a.length
        const n = b.length
        const dp = Array.from({ length: m + 1 }, (_, i) =>
            Array.from({ length: n + 1 }, (_, j) =>
                i === 0 ? j : j === 0 ? i : 0
            )
        )
        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1]
                } else {
                    dp[i][j] =
                        1 +
                        Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
                }
            }
        }
        return dp[m][n]
    }

    let best = null
    let bestDist = Infinity
    for (const name of validNames) {
        const dist = editDistance(lower, name.toLowerCase())
        if (dist < bestDist) {
            bestDist = dist
            best = name
        }
    }

    // Only suggest if reasonably close (threshold: half the input length, max 4)
    const threshold = Math.min(4, Math.ceil(lower.length / 2))
    return bestDist <= threshold ? best : null
}

/**
 * Validates a set of props against the manifest for a given component.
 * @param {Object} manifest - The full manifest object
 * @param {string} componentName - Name of the component (case-insensitive lookup)
 * @param {Object} props - The props to validate
 * @returns {{ valid: boolean, errors: string[], warnings: string[], suggestions: string[] }}
 */
export function validateComponentUsage(manifest, componentName, props) {
    const errors = []
    const warnings = []
    const suggestions = []

    // 1. Find the component (case-insensitive)
    let resolvedName = null
    let component = null

    if (manifest.components) {
        if (manifest.components[componentName]) {
            resolvedName = componentName
            component = manifest.components[componentName]
        } else {
            const lower = componentName.toLowerCase()
            const key = Object.keys(manifest.components).find(
                (k) => k.toLowerCase() === lower
            )
            if (key) {
                resolvedName = key
                component = manifest.components[key]
            }
        }
    }

    if (!component) {
        const available = Object.keys(manifest.components || {})
            .slice(0, 10)
            .join(', ')
        errors.push(
            `Component '${componentName}' not found. Available components: ${available}`
        )
        return { valid: false, errors, warnings, suggestions }
    }

    // 2. Collect valid and required prop names
    const componentProps = Array.isArray(component.props) ? component.props : []
    const validPropNames = componentProps.map((p) => p.propName)
    const requiredPropNames = componentProps
        .filter((p) => p.required === true)
        .map((p) => p.propName)

    const inputProps = props && typeof props === 'object' ? props : {}
    let hasUnknownProps = false
    let hasEnumErrors = false

    // 3. Validate each prop in the input
    for (const [key, value] of Object.entries(inputProps)) {
        if (!validPropNames.includes(key)) {
            hasUnknownProps = true
            const suggestion = findSimilarPropName(key, validPropNames)
            const didYouMean = suggestion
                ? `. Did you mean '${suggestion}'?`
                : ''
            errors.push(`Unknown prop '${key}' on ${resolvedName}${didYouMean}`)
            continue
        }

        // 4. Check enum references (value contains '.' like ButtonType.PRIMARY)
        if (typeof value === 'string' && value.includes('.')) {
            const dotIndex = value.indexOf('.')
            const enumName = value.slice(0, dotIndex)
            const enumMember = value.slice(dotIndex + 1)

            const componentEnums = component.enums || {}

            if (componentEnums[enumName]) {
                const validMembers = Object.keys(componentEnums[enumName])
                if (!validMembers.includes(enumMember)) {
                    hasEnumErrors = true
                    const validList = validMembers
                        .map((m) => `${enumName}.${m}`)
                        .join(', ')
                    errors.push(
                        `Invalid enum value '${enumMember}' for ${enumName}. Valid values: ${validList}`
                    )
                }
            }
            // If enum name not found in manifest enums, we don't error —
            // it might be a valid dot-notation from another module or a nested value.
        }
    }

    // 5. Check for missing required props
    for (const requiredProp of requiredPropNames) {
        if (!(requiredProp in inputProps)) {
            warnings.push(`Required prop '${requiredProp}' is missing`)
        }
    }

    // 6. Add suggestions based on errors
    if (hasUnknownProps) {
        suggestions.push(
            `Use the 'get_blend_component_props' tool to see all valid props for ${resolvedName}.`
        )
    }

    if (hasEnumErrors) {
        const componentEnums = component.enums || {}
        const enumSummaries = Object.entries(componentEnums).map(
            ([enumName, members]) =>
                `${enumName}: ${Object.keys(members)
                    .map((m) => `${enumName}.${m}`)
                    .join(', ')}`
        )
        if (enumSummaries.length > 0) {
            suggestions.push(
                `Valid enum values for ${resolvedName}:\n${enumSummaries.join('\n')}`
            )
        }
        suggestions.push(
            `Use the 'get_component_variants' tool to see all enum variants for ${resolvedName}.`
        )
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings,
        suggestions,
    }
}
