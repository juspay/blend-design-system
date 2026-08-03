export const getNextSelectionAfterToggle = (
    selectedValues: string[],
    value: string
): string[] => {
    if (selectedValues.includes(value)) {
        return selectedValues.filter((selectedValue) => selectedValue !== value)
    }

    return [...selectedValues, value]
}

export const getNextSelectionForScope = (
    selectedValues: string[],
    scopedValues: string[],
    selectAll: boolean
): string[] => {
    if (!selectAll) {
        const scopedValueSet = new Set(scopedValues)
        return selectedValues.filter((value) => !scopedValueSet.has(value))
    }

    const nextSelection = [...selectedValues]
    const selectedValueSet = new Set(selectedValues)

    scopedValues.forEach((value) => {
        if (!selectedValueSet.has(value)) {
            selectedValueSet.add(value)
            nextSelection.push(value)
        }
    })

    return nextSelection
}

/**
 * Narrows a Select All scope to what `maxSelections` still allows. Deselecting
 * is never capped, so callers only apply this on the select branch.
 */
export const clampScopeToMaxSelections = (
    selectedValues: string[],
    scopedValues: string[],
    maxSelections?: number
): string[] => {
    if (maxSelections === undefined) {
        return scopedValues
    }

    const selectedValueSet = new Set(selectedValues)
    const alreadySelected = scopedValues.filter((value) =>
        selectedValueSet.has(value)
    )
    const capacity = maxSelections - selectedValues.length

    if (capacity <= 0) {
        return alreadySelected
    }

    const additions = scopedValues
        .filter((value) => !selectedValueSet.has(value))
        .slice(0, capacity)

    return [...alreadySelected, ...additions]
}

/**
 * Emits the legacy per-item callbacks for a bulk gesture. Takes the already
 * resolved scope so the legacy calls and the aggregate snapshot can never
 * disagree about which values the gesture covers.
 */
export const emitLegacyScopeChanges = (
    selectAll: boolean,
    scopedValues: string[],
    selectedValues: string[],
    onChange?: (value: string) => void
): void => {
    if (!onChange) {
        return
    }

    if (selectAll) {
        const selectedValueSet = new Set(selectedValues)
        scopedValues.forEach((value) => {
            if (!selectedValueSet.has(value)) {
                onChange(value)
            }
        })
        return
    }

    const scopedValueSet = new Set(scopedValues)
    selectedValues.forEach((value) => {
        if (scopedValueSet.has(value)) {
            onChange(value)
        }
    })
}
