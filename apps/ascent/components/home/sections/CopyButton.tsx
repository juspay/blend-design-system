'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-secondary rounded transition-colors text-muted-foreground"
        >
            {copied ? (
                <Check size={14} className="text-red-600" />
            ) : (
                <Copy size={14} />
            )}
        </button>
    )
}
