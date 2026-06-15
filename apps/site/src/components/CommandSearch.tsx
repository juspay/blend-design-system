import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Search, Command as CommandIcon } from 'lucide-react'
import { Modal } from '@juspay/blend-design-system'

interface DemoItem {
    id: string
    label: string
    version: 'v1' | 'v2'
}

interface CommandSearchProps {
    items: DemoItem[]
    onSelect: (demoId: string, isV2: boolean) => void
}

function score(query: string, text: string): number {
    const q = query.toLowerCase().trim()
    const t = text.toLowerCase()
    if (!q) return 1
    if (t === q) return 100
    if (t.startsWith(q)) return 80
    if (t.includes(q)) return 60
    return 0
}

export function CommandSearch({ items, onSelect }: CommandSearchProps) {
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)
    const inputRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setOpen((o) => !o)
            }
        }
        const openFromExternal = () => setOpen(true)

        document.addEventListener('keydown', down)
        window.addEventListener('open-command-search', openFromExternal)
        return () => {
            document.removeEventListener('keydown', down)
            window.removeEventListener('open-command-search', openFromExternal)
        }
    }, [])

    const filtered = useMemo(() => {
        const q = query.trim()
        if (!q) return items.slice(0, 16)
        return items
            .map((d) => ({
                ...d,
                s: Math.max(score(q, d.label), score(q, d.id)),
            }))
            .filter((d) => d.s > 0)
            .sort((a, b) => b.s - a.s)
    }, [query, items])

    const v1Items = useMemo(
        () => filtered.filter((d) => d.version === 'v1'),
        [filtered]
    )
    const v2Items = useMemo(
        () => filtered.filter((d) => d.version === 'v2'),
        [filtered]
    )
    const flatItems = useMemo(
        () => [...v1Items, ...v2Items],
        [v1Items, v2Items]
    )

    useEffect(() => {
        setSelectedIndex(0)
    }, [query])

    useEffect(() => {
        if (open) {
            inputRef.current?.focus()
        }
    }, [open])

    const handleSelect = useCallback(
        (item: DemoItem) => {
            onSelect(item.id, item.version === 'v2')
            setOpen(false)
            setQuery('')
        },
        [onSelect]
    )

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((i) => (i + 1) % flatItems.length)
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex(
                    (i) => (i - 1 + flatItems.length) % flatItems.length
                )
            } else if (e.key === 'Enter') {
                e.preventDefault()
                const item = flatItems[selectedIndex]
                if (item) handleSelect(item)
            } else if (e.key === 'Escape') {
                setOpen(false)
            }
        },
        [flatItems, selectedIndex, handleSelect]
    )

    useEffect(() => {
        const el = listRef.current?.querySelector(
            '[data-selected="true"]'
        ) as HTMLElement | null
        if (el) {
            el.scrollIntoView({ block: 'nearest' })
        }
    }, [selectedIndex])

    return (
        <Modal
            isOpen={open}
            onClose={() => {
                setOpen(false)
                setQuery('')
            }}
            isCustom={true}
            showCloseButton={false}
            closeOnBackdropClick={true}
        >
            <div onKeyDown={handleKeyDown}>
                <div className="flex items-center border-b border-gray-200 px-4 w-170">
                    <Search className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search demos..."
                        className="flex-1 bg-transparent h-12 outline-none text-sm"
                        autoFocus
                    />
                    <kbd className="px-2 py-1 text-xs font-mono text-gray-500 rounded border border-gray-200 shrink-0">
                        ESC
                    </kbd>
                </div>

                <div
                    ref={listRef}
                    className="max-h-[50vh] overflow-y-auto py-2"
                >
                    {flatItems.length === 0 && (
                        <div className="py-4 px-4 text-sm text-gray-500 text-center">
                            No demos found.
                        </div>
                    )}

                    {v1Items.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                V1 Demos
                            </div>
                            {v1Items.map((item, idx) => {
                                const isSelected = idx === selectedIndex
                                return (
                                    <div
                                        key={`v1-${item.id}`}
                                        onClick={() => handleSelect(item)}
                                        data-selected={isSelected}
                                        className={`flex items-center py-2 px-4 text-sm cursor-pointer ${
                                            isSelected
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {item.label}
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {v2Items.length > 0 && (
                        <div>
                            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                V2 Demos
                            </div>
                            {v2Items.map((item, idx) => {
                                const globalIdx = v1Items.length + idx
                                const isSelected = globalIdx === selectedIndex
                                return (
                                    <div
                                        key={`v2-${item.id}`}
                                        onClick={() => handleSelect(item)}
                                        data-selected={isSelected}
                                        className={`flex items-center py-2 px-4 text-sm cursor-pointer ${
                                            isSelected
                                                ? 'bg-blue-50 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        {item.label}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>

                <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 rounded-b-xl">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{flatItems.length} demos</span>
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1">
                                <CommandIcon className="w-3 h-3" />K
                            </span>
                            <span>↑↓ navigate</span>
                            <span>↵ select</span>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CommandSearch
