import { useCallback, useRef, useState } from 'react'

type SearchValueUpdate = string | ((previous: string) => string)

export type UseSelectSearchControllerOptions = {
    controlledValue?: string
    onValueChange?: (value: string) => void
    explicitShow?: boolean
    existingSurfaceDefault: boolean
}

export const useSelectSearchController = ({
    controlledValue,
    onValueChange,
    explicitShow,
    existingSurfaceDefault,
}: UseSelectSearchControllerOptions) => {
    const [internalValue, setInternalValue] = useState('')
    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : internalValue
    const currentValueRef = useRef(value)
    currentValueRef.current = value

    const isSearchEnabled =
        explicitShow === false
            ? false
            : explicitShow === true
              ? true
              : isControlled || existingSurfaceDefault

    const dispatchUserValue = useCallback(
        (next: SearchValueUpdate) => {
            const nextValue =
                typeof next === 'function'
                    ? next(currentValueRef.current)
                    : next

            currentValueRef.current = nextValue
            if (!isControlled) setInternalValue(nextValue)
            onValueChange?.(nextValue)
        },
        [isControlled, onValueChange]
    )

    const resetUncontrolled = useCallback(() => {
        if (isControlled) return
        currentValueRef.current = ''
        setInternalValue('')
    }, [isControlled])

    return {
        value,
        isControlled,
        isSearchEnabled,
        shouldFilterInternally: !isControlled,
        valueForSearchBehavior: isSearchEnabled ? value : '',
        dispatchUserValue,
        resetUncontrolled,
    }
}
