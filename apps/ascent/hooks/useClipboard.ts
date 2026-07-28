'use client'

import { useState, useCallback } from 'react'

interface UseClipboardOptions {
    timeout?: number
}

interface UseClipboardReturn {
    copied: boolean
    copy: (text: string) => void
}

export function useClipboard(
    options: UseClipboardOptions = {}
): UseClipboardReturn {
    const { timeout = 2000 } = options
    const [copied, setCopied] = useState(false)

    const copy = useCallback(
        (text: string) => {
            navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), timeout)
        },
        [timeout]
    )

    return { copied, copy }
}
