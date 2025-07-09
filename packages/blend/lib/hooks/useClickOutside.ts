import { useEffect, RefObject } from "react";

export function useClickOutside(
  refs: Array<RefObject<HTMLElement | null>> | RefObject<HTMLElement | null>,
  callback: () => void,
): void {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const refsArray = Array.isArray(refs) ? refs : [refs];

      const isOutside = refsArray.every((ref) => {
        return !ref.current || !ref.current.contains(event.target as Node);
      });

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [refs, callback]);
}

export default useClickOutside;
