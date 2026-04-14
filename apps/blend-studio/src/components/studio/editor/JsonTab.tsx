/**
 * JsonTab
 *
 * Raw JSON editor for the brand configuration.
 * Provides direct JSON editing with validation and copy/paste support.
 */

import { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'
import type { EditorTabProps } from './types'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function JsonTab({ brand, onChange }: EditorTabProps) {
    const [text, setText] = useState(() => JSON.stringify(brand, null, 2))
    const [isValid, setIsValid] = useState(true)
    const [copied, setCopied] = useState(false)

    // Sync text when brand config changes from other tabs
    useEffect(() => {
        setText(JSON.stringify(brand, null, 2))
    }, [brand])

    const handleChange = (value: string) => {
        setText(value)
        try {
            const parsed = JSON.parse(value)
            onChange(() => parsed)
            setIsValid(true)
        } catch {
            setIsValid(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span
                    className={`text-xs font-medium ${
                        isValid ? 'text-green-600' : 'text-red-600'
                    }`}
                >
                    {isValid ? 'Valid JSON' : 'Invalid JSON'}
                </span>
                <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                >
                    {copied ? (
                        <Check className="w-3 h-3 text-green-600" />
                    ) : (
                        <Copy className="w-3 h-3" />
                    )}
                    {copied ? 'Copied' : 'Copy'}
                </button>
            </div>
            <textarea
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                spellCheck={false}
                className={`w-full h-[calc(100vh-280px)] min-h-64 px-3 py-2 text-xs font-mono border rounded-lg focus:outline-none focus:ring-2 resize-none ${
                    isValid
                        ? 'border-gray-200 focus:ring-blue-500'
                        : 'border-red-300 focus:ring-red-400'
                }`}
            />
        </div>
    )
}
