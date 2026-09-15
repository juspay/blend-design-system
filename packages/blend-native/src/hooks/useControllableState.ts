import { useCallback, useRef, useState } from 'react'

/**
 * Controlled/uncontrolled state pair — the `value`/`defaultValue`/`onChange`
 * contract Tabs, Accordion and the input components share. Internal.
 *
 * Controlled-ness follows the current render (a component may switch),
 * unlike web AccordionV2's mount-latched ref. The updater always notifies
 * `onChange`; it only writes local state while uncontrolled.
 */
export function useControllableState<T>(
    controlled: T | undefined,
    defaultValue: T,
    onChange?: (value: T) => void
): [T, (value: T) => void] {
    const [uncontrolled, setUncontrolled] = useState<T>(defaultValue)
    const isControlled = controlled !== undefined
    const onChangeRef = useRef(onChange)
    onChangeRef.current = onChange

    const value = isControlled ? (controlled as T) : uncontrolled

    const setValue = useCallback(
        (next: T) => {
            if (controlled === undefined) setUncontrolled(next)
            onChangeRef.current?.(next)
        },
        [controlled]
    )

    return [value, setValue]
}
