'use client'

import { CopyIcon, CheckIcon } from '@phosphor-icons/react/dist/ssr'
import { useClipboard } from '@/hooks/useClipboard'

interface CopyMarkdownButtonProps {
    rawMarkdown: string
}

export function CopyMarkdownButton({ rawMarkdown }: CopyMarkdownButtonProps) {
    const { copied, copy } = useClipboard()

    const handleCopy = () => copy(rawMarkdown)

    return (
        <button
            onClick={handleCopy}
            className="w-full xs:w-auto flex items-center gap-1.5 text-sm text-primary bg-secondary border border-border rounded-lg px-3 py-1 transition-colors hover:bg-muted cursor-pointer"
            data-nav-content
        >
            {copied ? (
                <CheckIcon className="w-3.5 h-3.5 text-green-500 stroke-3" />
            ) : (
                <CopyIcon className="w-3.5 h-3.5 text-primary stroke-3" />
            )}
            <span className="font-medium text-primary">
                {copied ? 'Copied!' : 'Copy Markdown'}
            </span>
        </button>
    )
}
