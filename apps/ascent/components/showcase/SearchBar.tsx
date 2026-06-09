'use client'

import {
    MagnifyingGlassIcon,
    XIcon,
    CheckIcon,
    CaretDownIcon,
} from '@phosphor-icons/react/dist/ssr'
import * as Popover from '@radix-ui/react-popover'
import { AnimatePresence, motion, Variants } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface SearchBarProps {
    onSearch?: (query: string) => void
    categories?: string[]
    selectedCategories?: string[]
    onCategoryChange?: (categories: string[]) => void
}

const dropdownVariants: Variants = {
    hidden: {
        opacity: 0,
        y: 8,
        scale: 0.97,
        filter: 'blur(4px)',
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
        y: 6,
        scale: 0.97,
        filter: 'blur(4px)',
        transition: {
            duration: 0.14,
            ease: [0.4, 0, 1, 1] as [number, number, number, number],
        },
    },
}

export default function SearchBar({
    onSearch,
    categories = [],
    selectedCategories = [],
    onCategoryChange,
}: SearchBarProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

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

    const toggleCategory = useCallback(
        (cat: string) => {
            const next = selectedCategories.includes(cat)
                ? selectedCategories.filter((c) => c !== cat)
                : [...selectedCategories, cat]
            onCategoryChange?.(next)
        },
        [selectedCategories, onCategoryChange]
    )

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isTyping =
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement

            if ((e.key === 'f' || e.key === 'F') && !isTyping) {
                e.preventDefault()
                if (isExpanded) {
                    inputRef.current?.focus()
                } else {
                    expand()
                }
            }

            if (e.key === 'Escape') {
                if (dropdownOpen) {
                    setDropdownOpen(false)
                } else if (isExpanded) {
                    collapse()
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isExpanded, dropdownOpen, expand, collapse])

    // Click-outside to collapse search input only.
    // The dropdown click-outside is handled entirely by Radix Popover.
    useEffect(() => {
        if (!isExpanded) return

        const pointerDownPos = { x: 0, y: 0 }

        const handlePointerDown = (e: PointerEvent) => {
            pointerDownPos.x = e.clientX
            pointerDownPos.y = e.clientY
        }

        const handlePointerUp = (e: PointerEvent) => {
            const dx = e.clientX - pointerDownPos.x
            const dy = e.clientY - pointerDownPos.y
            // Ignore drags
            if (Math.sqrt(dx * dx + dy * dy) > 5) return

            const target = e.target as HTMLElement

            // Stay expanded if click is inside the search container,
            // the Radix popover content (rendered in a portal), or a showcase card
            if (containerRef.current?.contains(target)) return
            if (target.closest('[data-radix-popper-content-wrapper]')) return
            if (target.closest('[data-showcase-card]')) return

            collapse()
        }

        document.addEventListener('pointerdown', handlePointerDown)
        document.addEventListener('pointerup', handlePointerUp)
        return () => {
            document.removeEventListener('pointerdown', handlePointerDown)
            document.removeEventListener('pointerup', handlePointerUp)
        }
        // Only re-attach when isExpanded changes — collapse/expand are stable refs
    }, [isExpanded, collapse])

    const activeCount = selectedCategories.length
    const activeLabel =
        activeCount === 0
            ? 'Select category'
            : activeCount === 1
              ? selectedCategories[0]
              : `${activeCount} categories`

    return (
        <div className="pointer-events-auto w-full">
            <div className="flex items-center justify-between gap-2 bg-background dark:border border-border/80 rounded-2xl py-2.5 px-3 w-full shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
                {/* Search input */}
                <motion.div
                    ref={containerRef}
                    animate={{ width: isExpanded ? 220 : 180 }}
                    initial={false}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="flex items-center gap-2 border border-border/75 py-2 px-3 rounded-xl cursor-text overflow-hidden shrink-0 flex-1"
                    onClick={expand}
                >
                    <MagnifyingGlassIcon
                        size={15}
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
                                setIsExpanded(false)
                                inputRef.current?.blur()
                            }
                            if (e.key === 'Escape') collapse()
                        }}
                        onFocus={expand}
                        className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground flex-1 min-w-0"
                    />

                    {/* Fixed-size slot prevents height reflow during clear ↔ shortcut swap */}
                    <div className="shrink-0 flex items-center justify-center h-6 w-6">
                        <AnimatePresence mode="wait" initial={false}>
                            {isExpanded && searchQuery ? (
                                <motion.button
                                    key="clear"
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.6 }}
                                    transition={{ duration: 0.1 }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSearchQuery('')
                                        onSearch?.('')
                                        inputRef.current?.focus()
                                    }}
                                    className="text-muted-foreground hover:text-foreground transition-colors p-0.5 rounded-md hover:bg-border/40"
                                    aria-label="Clear search"
                                >
                                    <XIcon size={13} />
                                </motion.button>
                            ) : (
                                <motion.div
                                    key="shortcut"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.1 }}
                                    aria-hidden="true"
                                >
                                    <span className="flex items-center text-[11px] text-muted-foreground bg-secondary/50 border border-border/50 rounded-md px-1.5 py-0.5">
                                        F
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Divider */}
                {categories.length > 0 && (
                    <div className="w-px h-5 bg-border/90 shrink-0 mx-2" />
                )}

                {/* Filter — Radix Popover handles click-outside, focus trap, portal, a11y */}
                {categories.length > 0 && (
                    <Popover.Root
                        open={dropdownOpen}
                        onOpenChange={setDropdownOpen}
                    >
                        <Popover.Trigger asChild>
                            <button
                                aria-label="Filter by category"
                                className={`
                                    flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm border border-border/75
                                    transition-colors duration-150 select-none
                                    ${
                                        dropdownOpen
                                            ? 'bg-muted text-foreground'
                                            : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
                                    }
                                `}
                            >
                                <span className="hidden sm:inline text-foreground/50 text-[13px]">
                                    {activeLabel}
                                </span>

                                <AnimatePresence initial={false}>
                                    {activeCount > 0 && (
                                        <motion.span
                                            key="badge"
                                            initial={{ opacity: 0, scale: 0.6 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.6 }}
                                            transition={{ duration: 0.12 }}
                                            className="flex items-center justify-center text-xxs font-medium bg-foreground text-background rounded-full w-4 h-4 leading-none sm:hidden"
                                        >
                                            {activeCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                <motion.span
                                    animate={{ rotate: dropdownOpen ? 0 : 180 }}
                                    transition={{
                                        duration: 0.18,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="inline-flex"
                                >
                                    <CaretDownIcon
                                        size={12}
                                        className="text-muted-foreground"
                                    />
                                </motion.span>
                            </button>
                        </Popover.Trigger>

                        <AnimatePresence>
                            {dropdownOpen && (
                                <Popover.Portal forceMount>
                                    <Popover.Content
                                        side="top"
                                        align="end"
                                        sideOffset={16}
                                        alignOffset={-10}
                                        onOpenAutoFocus={(e) =>
                                            e.preventDefault()
                                        }
                                        asChild
                                    >
                                        <motion.div
                                            role="listbox"
                                            aria-label="Category filter"
                                            variants={dropdownVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            style={{
                                                transformOrigin: 'bottom right',
                                            }}
                                            className="
                                                z-50 min-w-60 rounded-xl
                                                bg-background dark:border dark:border-border
                                                shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]
                                                p-1.5 flex flex-col gap-0.5
                                            "
                                        >
                                            <p className="text-xxs uppercase tracking-widest text-muted-foreground px-2.5 pt-1 pb-1.5">
                                                Filter by
                                            </p>

                                            {categories.map((cat) => (
                                                <CategoryItem
                                                    key={cat}
                                                    label={cat}
                                                    isActive={selectedCategories.includes(
                                                        cat
                                                    )}
                                                    onClick={() =>
                                                        toggleCategory(cat)
                                                    }
                                                />
                                            ))}
                                        </motion.div>
                                    </Popover.Content>
                                </Popover.Portal>
                            )}
                        </AnimatePresence>
                    </Popover.Root>
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
            role="checkbox"
            aria-checked={isActive}
            onClick={onClick}
            className="
                flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-[13px]
                transition-colors duration-100 text-left text-foreground/75 hover:bg-muted/60 hover:text-foreground
            "
        >
            <span className="flex-1">{label}</span>
            <span
                className={`
                    shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors
                    ${isActive ? 'bg-foreground border-foreground' : 'border-border bg-transparent'}
                `}
            >
                <AnimatePresence initial={false}>
                    {isActive && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.1 }}
                        >
                            <CheckIcon size={10} className="text-background" />
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
        </button>
    )
}
