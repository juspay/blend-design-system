export function filterBlockedProps<T extends Record<string, unknown>>(
    props: T
): Omit<T, 'className' | 'style'> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { className, style, ...filtered } = props as T & {
        className?: string
        style?: React.CSSProperties
    }
    return filtered as Omit<T, 'className' | 'style'>
}
