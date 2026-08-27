/**
 * Pure selection arithmetic for MultiSelect — vitest-covered, mirroring
 * web's gesture semantics: one callback per accepted gesture with the
 * complete resulting selection, `alwaysSelected` items immune to removal,
 * `maxSelections` capping additions.
 */

export type SelectionConstraints = {
    maxSelections?: number
    /** Values that can never be deselected. */
    alwaysSelected?: ReadonlySet<string>
}

/** Toggle one value; returns the same array reference when rejected. */
export function toggleSelection(
    values: string[],
    value: string,
    constraints: SelectionConstraints = {}
): string[] {
    const { maxSelections, alwaysSelected } = constraints
    if (values.includes(value)) {
        if (alwaysSelected?.has(value)) return values
        return values.filter((existing) => existing !== value)
    }
    if (maxSelections !== undefined && values.length >= maxSelections) {
        return values
    }
    return [...values, value]
}

export type SelectAllState = 'checked' | 'indeterminate' | 'unchecked'

/** Tri-state of the select-all row against the selectable values. */
export function resolveSelectAllState(
    values: string[],
    selectableValues: string[]
): SelectAllState {
    if (selectableValues.length === 0) return 'unchecked'
    const selected = new Set(values)
    const count = selectableValues.filter((value) => selected.has(value)).length
    if (count === 0) return 'unchecked'
    if (count === selectableValues.length) return 'checked'
    return 'indeterminate'
}

/**
 * Apply a select-all gesture: unchecked/indeterminate select everything
 * (respecting `maxSelections`); checked clears everything except
 * `alwaysSelected` values.
 */
export function applySelectAll(
    values: string[],
    selectableValues: string[],
    constraints: SelectionConstraints = {}
): string[] {
    const state = resolveSelectAllState(values, selectableValues)
    const { maxSelections, alwaysSelected } = constraints
    if (state === 'checked') {
        return values.filter(
            (value) =>
                alwaysSelected?.has(value) && selectableValues.includes(value)
        )
    }
    const next = [...values]
    for (const value of selectableValues) {
        if (next.includes(value)) continue
        if (maxSelections !== undefined && next.length >= maxSelections) break
        next.push(value)
    }
    return next
}
