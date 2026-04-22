/**
 * Brand Config Validation
 *
 * Validates a brand config JSON before it enters the token engine.
 * Catches structural errors, invalid colors, and provides warnings
 * for potential accessibility issues.
 */

import { isValidHexColor } from './color-scale'
import { validatePaletteContrast } from './contrast'
import type {
    ValidationResult,
    ValidationError,
    ValidationWarning,
} from './types'

const VALID_COLOR_GROUPS = [
    'primary',
    'gray',
    'red',
    'green',
    'yellow',
    'orange',
    'purple',
]

const VALID_RADIUS_KEYS = [
    '0',
    '2',
    '4',
    '6',
    '8',
    '10',
    '12',
    '16',
    '20',
    'full',
]

const VALID_SHADOW_KEYS = [
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
    '2xl',
    'full',
    'focusPrimary',
    'focusError',
]

/**
 * Validate a brand config for correctness.
 *
 * Returns { valid: true } if the config is safe to pass to the token engine.
 * Returns errors for structural problems, warnings for potential issues.
 */
export function validateBrandConfig(config: unknown): ValidationResult {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // --- Structure checks ---

    if (!config || typeof config !== 'object') {
        errors.push({ path: '', message: 'Brand config must be a JSON object' })
        return { valid: false, errors, warnings }
    }

    const c = config as Record<string, unknown>

    // Required fields
    if (!c.brandId || typeof c.brandId !== 'string') {
        errors.push({
            path: 'brandId',
            message: 'brandId is required and must be a string',
        })
    } else if (!/^[a-z0-9][a-z0-9\-_/]*[a-z0-9]$/i.test(c.brandId)) {
        errors.push({
            path: 'brandId',
            message:
                'brandId must be alphanumeric with optional hyphens, underscores, and slashes (e.g. "my-brand/default")',
        })
    }

    if (!c.name || typeof c.name !== 'string') {
        errors.push({
            path: 'name',
            message: 'name is required and must be a string',
        })
    }

    if (!c.version || typeof c.version !== 'string') {
        errors.push({
            path: 'version',
            message:
                'version is required and must be a semver string (e.g. "1.0.0")',
        })
    }

    // --- Color validation ---

    if (c.colors !== undefined) {
        if (typeof c.colors !== 'object' || c.colors === null) {
            errors.push({ path: 'colors', message: 'colors must be an object' })
        } else {
            const colors = c.colors as Record<string, unknown>

            for (const [group, shades] of Object.entries(colors)) {
                if (!VALID_COLOR_GROUPS.includes(group)) {
                    warnings.push({
                        path: `colors.${group}`,
                        message: `Unknown color group "${group}". Valid groups: ${VALID_COLOR_GROUPS.join(', ')}`,
                    })
                    continue
                }

                if (typeof shades !== 'object' || shades === null) {
                    errors.push({
                        path: `colors.${group}`,
                        message: `colors.${group} must be an object of shade → hex pairs`,
                    })
                    continue
                }

                for (const [shade, value] of Object.entries(
                    shades as Record<string, unknown>
                )) {
                    if (typeof value !== 'string') {
                        errors.push({
                            path: `colors.${group}.${shade}`,
                            message: `Color value must be a string, got ${typeof value}`,
                        })
                    } else if (!isValidHexColor(value)) {
                        errors.push({
                            path: `colors.${group}.${shade}`,
                            message: `Invalid hex color "${value}". Expected #RGB or #RRGGBB format`,
                        })
                    }
                }

                // WCAG contrast check for complete color scales
                const validShades: Record<string, string> = {}
                for (const [shade, value] of Object.entries(
                    shades as Record<string, unknown>
                )) {
                    if (typeof value === 'string' && isValidHexColor(value)) {
                        validShades[shade] = value
                    }
                }
                if (Object.keys(validShades).length > 0) {
                    const violations = validatePaletteContrast(validShades, {
                        level: 'AA',
                    })
                    for (const v of violations) {
                        warnings.push({
                            path: `colors.${group}.${v.path}`,
                            message: `Contrast ratio ${v.ratio.toFixed(2)}:1 is below WCAG ${v.level} minimum of ${v.required}:1`,
                        })
                    }
                }
            }
        }
    }

    // --- Radius validation ---

    if (c.radius !== undefined) {
        if (typeof c.radius !== 'object' || c.radius === null) {
            errors.push({ path: 'radius', message: 'radius must be an object' })
        } else {
            for (const [key, value] of Object.entries(
                c.radius as Record<string, unknown>
            )) {
                if (!VALID_RADIUS_KEYS.includes(key)) {
                    warnings.push({
                        path: `radius.${key}`,
                        message: `Unknown radius key "${key}". Valid keys: ${VALID_RADIUS_KEYS.join(', ')}`,
                    })
                }

                if (typeof value !== 'string') {
                    errors.push({
                        path: `radius.${key}`,
                        message:
                            'Radius value must be a CSS string (e.g. "4px")',
                    })
                }
            }
        }
    }

    // --- Shadow validation ---

    if (c.shadows !== undefined) {
        if (typeof c.shadows !== 'object' || c.shadows === null) {
            errors.push({
                path: 'shadows',
                message: 'shadows must be an object',
            })
        } else {
            for (const [key, value] of Object.entries(
                c.shadows as Record<string, unknown>
            )) {
                if (!VALID_SHADOW_KEYS.includes(key)) {
                    warnings.push({
                        path: `shadows.${key}`,
                        message: `Unknown shadow key "${key}". Valid keys: ${VALID_SHADOW_KEYS.join(', ')}`,
                    })
                }

                if (typeof value !== 'string') {
                    errors.push({
                        path: `shadows.${key}`,
                        message: 'Shadow value must be a CSS string',
                    })
                }
            }
        }
    }

    // --- Component overrides validation ---

    if (c.componentOverrides !== undefined) {
        if (
            typeof c.componentOverrides !== 'object' ||
            c.componentOverrides === null
        ) {
            errors.push({
                path: 'componentOverrides',
                message: 'componentOverrides must be an object',
            })
        } else {
            const compOverrides = c.componentOverrides as Record<
                string,
                unknown
            >
            for (const [compKey, compConfig] of Object.entries(compOverrides)) {
                if (typeof compConfig !== 'object' || compConfig === null) {
                    errors.push({
                        path: `componentOverrides.${compKey}`,
                        message: 'Component override must be an object',
                    })
                    continue
                }

                const cc = compConfig as Record<string, unknown>

                if (cc.colors !== undefined) {
                    if (typeof cc.colors !== 'object' || cc.colors === null) {
                        errors.push({
                            path: `componentOverrides.${compKey}.colors`,
                            message: 'colors must be an object',
                        })
                    } else {
                        const colors = cc.colors as Record<string, unknown>
                        for (const [group, shades] of Object.entries(colors)) {
                            if (!VALID_COLOR_GROUPS.includes(group)) {
                                warnings.push({
                                    path: `componentOverrides.${compKey}.colors.${group}`,
                                    message: `Unknown color group "${group}"`,
                                })
                                continue
                            }
                            if (typeof shades === 'object' && shades !== null) {
                                for (const [shade, value] of Object.entries(
                                    shades as Record<string, unknown>
                                )) {
                                    if (
                                        typeof value === 'string' &&
                                        !isValidHexColor(value)
                                    ) {
                                        errors.push({
                                            path: `componentOverrides.${compKey}.colors.${group}.${shade}`,
                                            message: `Invalid hex color "${value}"`,
                                        })
                                    }
                                }
                            }
                        }
                    }
                }

                if (
                    cc.radius !== undefined &&
                    (typeof cc.radius !== 'object' || cc.radius === null)
                ) {
                    errors.push({
                        path: `componentOverrides.${compKey}.radius`,
                        message: 'radius must be an object',
                    })
                }

                if (
                    cc.shadows !== undefined &&
                    (typeof cc.shadows !== 'object' || cc.shadows === null)
                ) {
                    errors.push({
                        path: `componentOverrides.${compKey}.shadows`,
                        message: 'shadows must be an object',
                    })
                }
            }
        }
    }

    return { valid: errors.length === 0, errors, warnings }
}