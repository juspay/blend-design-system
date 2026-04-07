'use client'
import { CopyIcon, CheckIcon } from '@phosphor-icons/react/dist/ssr'
import { useClipboard } from '@/hooks/useClipboard'

export default function CopyButton({ text }: { text: string }) {
    const { copied, copy } = useClipboard()

    const handleCopy = () => copy(text)

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-secondary rounded transition-colors text-muted-foreground"
        >
            {copied ? (
                <CheckIcon size={14} className="text-red-600" />
            ) : (
                <CopyIcon size={14} />
            )}
        </button>
    )
}
