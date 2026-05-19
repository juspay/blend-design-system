'use client'

import {
    MagnifyingGlassIcon,
    XIcon,
    SlidersIcon,
    CheckIcon,
    ArrowDownIcon,
} from '@phosphor-icons/react/dist/ssr'
import { AnimatePresence, motion, Variants } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface SearchBarProps {
    onSearch?: (query: string) => void
    categories?: string[]
    selectedCategory?: string | null
    onCategoryChange?: (category: string | null) => void
}

const dropupVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 10,
        scale: 0.96,
        filter: 'blur(5px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            stiffness: 420,
            damping: 28,
            mass: 0.8,
        },
    },
    exit: {
        opacity: 0,
        y: 8,
        scale: 0.96,
        filter: 'blur(5px)',
        transition: {
            duration: 0.16,
            ease: [0.4, 0, 1, 1] as [number, number, number, number],
        },
    },
}

export default function SearchBar({
    onSearch,
    categories = [],
    selectedCategory = null,
    onCategoryChange,
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [dropupOpen, setDropupOpen] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const dropupRef = useRef<HTMLDivElement>(null)

    const expand = useCallback(() => {
        setIsExpanded(true)
        requestAnimationFrame(() => inputRef.current?.focus())
    }, [])

    const collapse = useCallback(() => {
        setIsExpanded(false)
        setSearchQuery('')
        onSearch?.('')
        inputRef.current?.blur()
    }, [onSearch])

    const closeDropup = useCallback(() => setDropupOpen(false), [])
    const toggleDropup = useCallback(() => setDropupOpen((v) => !v), [])

    const handleCategorySelect = useCallback(
        (cat: string | null) => {
            onCategoryChange?.(cat)
            setTimeout(closeDropup, 100)
        },
        [onCategoryChange, closeDropup]
    )

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                if (isExpanded) {
                    collapse()
                } else {
                    expand()
                }
            }
            if (e.key === 'Escape') {
                if (dropupOpen) closeDropup()
                else if (isExpanded) collapse()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isExpanded, dropupOpen, expand, collapse, closeDropup])

    useEffect(() => {
        const pointerDownPos = { x: 0, y: 0 }

        const handlePointerDown = (e: PointerEvent) => {
            pointerDownPos.x = e.clientX
            pointerDownPos.y = e.clientY
        }

        const handlePointerUp = (e: PointerEvent) => {
            const dx = e.clientX - pointerDownPos.x
            const dy = e.clientY - pointerDownPos.y
            if (Math.sqrt(dx * dx + dy * dy) > 5) return

            const target = e.target as HTMLElement

            if (dropupOpen && !dropupRef.current?.contains(target)) {
                closeDropup()
            }

            if (!isExpanded) return
            if (containerRef.current?.contains(target)) return
            if (target.closest('[data-showcase-card]')) return

            collapse()
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('pointerup', handlePointerUp)
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('pointerup', handlePointerUp)
        }
    }, [isExpanded, dropupOpen, collapse, closeDropup])

    const activeLabel = selectedCategory === null ? 'All' : selectedCategory

    return (
        <div
            className="pointer-events-auto"
            onPointerDown={(e) => e.stopPropagation()}
        >
            <div className="flex items-center gap-3 bg-background/85 backdrop-blur-xl border border-border/60 rounded-2xl px-2 sm:px-4 py-2 sm:py-3 shadow-xl">
                {/* Search input */}
                <motion.div
                    ref={containerRef}
                    animate={{ width: isExpanded ? 300 : 250 }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="flex items-center gap-2 border py-2.5 px-3.5 rounded-[10px] border-border/60 bg-background/90 cursor-text overflow-hidden"
                    onClick={expand}
                >
                    <MagnifyingGlassIcon
                        size={16}
                        className="text-muted-foreground shrink-0"
                    />

                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onSearch?.(searchQuery.trim())
                                inputRef.current?.blur()
                            }
                            if (e.key === 'Escape') collapse()
                        }}
                        onFocus={expand}
                        className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 min-w-0"
                    />

                    <AnimatePresence mode="wait" initial={false}>
                        {isExpanded && searchQuery ? (
                            <motion.button
                                key="clear"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.12 }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setSearchQuery('')
                                    onSearch?.('')
                                    inputRef.current?.focus()
                                }}
                                className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Clear search"
                            >
                                <XIcon size={14} />
                            </motion.button>
                        ) : (
                            <motion.div
                                key="shortcut"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.12 }}
                                aria-hidden="true"
                                className="flex items-center gap-1 text-sm text-muted-foreground px-2 shrink-0"
                            >
                                <span className="font-medium">&#8984;</span>
                                <span>+</span>
                                <span className="font-medium">K</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Category dropup — only renders if categories are provided */}
                {categories.length > 0 && (
                    <>
                        <div className="w-px h-6 bg-border/60 mx-1.5 hidden sm:block" />

                        <div ref={dropupRef} className="relative">
                            {/* Trigger pill */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    toggleDropup()
                                }}
                                aria-haspopup="listbox"
                                aria-expanded={dropupOpen}
                                className={`
                                    flex items-center gap-2 px-3.5 py-2 rounded-full text-sm
                                    border transition-colors duration-150 select-none
                                    ${
                                        dropupOpen
                                            ? 'border-border bg-muted text-foreground'
                                            : 'border-border/60 bg-background/90 text-foreground hover:bg-muted/60'
                                    }
                                `}
                            >
                                <SlidersIcon
                                    size={14}
                                    className="text-muted-foreground"
                                />
                                <span className="text-foreground/50">
                                    {activeLabel}
                                </span>
                                <motion.span
                                    animate={{ rotate: dropupOpen ? 180 : 0 }}
                                    transition={{
                                        duration: 0.22,
                                        ease: [0.4, 0, 0.2, 1] as [
                                            number,
                                            number,
                                            number,
                                            number,
                                        ],
                                    }}
                                    className="inline-flex"
                                >
                                    <ArrowDownIcon
                                        size={13}
                                        className="text-muted-foreground"
                                    />
                                </motion.span>
                            </button>

                            {/* Dropup panel */}
                            <AnimatePresence>
                                {dropupOpen && (
                                    <motion.div
                                        key="dropup"
                                        role="listbox"
                                        aria-label="Category filter"
                                        variants={dropupVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        style={{
                                            transformOrigin: 'bottom left',
                                        }}
                                        className="
                                            absolute bottom-[calc(100%+10px)] left-0 z-50
                                            min-w-50 rounded-xl
                                            bg-background backdrop-blur-xl
                                            border border-border/60
                                            shadow-xl shadow-black/10
                                            p-1.5 flex flex-col gap-0.5
                                        "
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                    >
                                        <p className="text-xxs uppercase tracking-widest text-muted-foreground px-2.5 pt-1 pb-1.5">
                                            Filter by
                                        </p>

                                        <CategoryItem
                                            label="All items"
                                            isActive={selectedCategory === null}
                                            onClick={() =>
                                                handleCategorySelect(null)
                                            }
                                        />

                                        <div className="h-px bg-border/40 mx-1.5 my-1" />

                                        {categories.map((cat) => (
                                            <CategoryItem
                                                key={cat}
                                                label={cat}
                                                isActive={
                                                    selectedCategory === cat
                                                }
                                                onClick={() =>
                                                    handleCategorySelect(cat)
                                                }
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

function CategoryItem({
    label,
    isActive,
    onClick,
}: {
    label: string
    isActive: boolean
    onClick: () => void
}) {
    return (
        <button
            role="option"
            aria-selected={isActive}
            onClick={onClick}
            className={`
                flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm
                transition-colors duration-100 text-left
                ${
                    isActive
                        ? 'bg-muted text-foreground font-medium'
                        : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                }
            `}
        >
            <span className="flex-1">{label}</span>
            <AnimatePresence initial={false}>
                {isActive && (
                    <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.12 }}
                    >
                        <CheckIcon size={13} className="text-foreground" />
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    )
}
