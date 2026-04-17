import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'

export function TokenSection({
    title,
    defaultOpen = false,
    children,
}: {
    title: string
    defaultOpen?: boolean
    children: React.ReactNode
}) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
            >
                {open ? (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                ) : (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                )}
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    {title}
                </span>
            </button>
            {open && (
                <div className="p-3 border-t border-gray-100 bg-white">
                    {children}
                </div>
            )}
        </div>
    )
}
