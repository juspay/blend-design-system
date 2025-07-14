import { RefObject } from 'react'
export declare function useClickOutside(
    refs: Array<RefObject<HTMLElement | null>> | RefObject<HTMLElement | null>,
    callback: () => void
): void
export default useClickOutside
