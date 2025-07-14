export declare const useDebounce: <Args extends unknown[]>(
    fn: (...args: Args) => void,
    delay: number
) => (...args: Args) => void
