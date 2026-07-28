'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CheckIcon, CaretDownIcon } from '@phosphor-icons/react/dist/ssr'
import { highlight } from 'sugar-high'
import { useClipboard } from '@/hooks/useClipboard'

const COLLAPSED_LINE_LIMIT = 30

const CodeBlock = ({ code, props }: { code: React.ReactNode; props: any }) => {
    const codeHTML = highlight(code as string)
    const { copied, copy } = useClipboard()
    const [expanded, setExpanded] = useState(false)

    const lineCount = (code as string).split('\n').length
    const isCollapsible = lineCount > COLLAPSED_LINE_LIMIT
    const isCollapsed = isCollapsible && !expanded

    const copyToClipboard = () => copy(code as string)

    return (
        <div
            data-code-block
            className="relative w-full rounded-xl border border-code-border py-3 px-2 bg-code-background"
        >
            <AnimatePresence initial={false} mode="wait">
                <motion.button
                    key={copied ? 'check' : 'copy'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-3 right-1 p-1 flex items-center justify-center text-muted-foreground hover:bg-sidebar-item-hover rounded-md cursor-pointer hover:text-foreground z-10 transition-colors duration-200"
                    onClick={copyToClipboard}
                    data-nav-content
                    aria-label={
                        copied ? 'Code copied' : 'Copy code to clipboard'
                    }
                >
                    {copied ? (
                        <CheckIcon
                            size={14}
                            className="dark:text-green-500 text-green-600"
                        />
                    ) : (
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96197 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </motion.button>
            </AnimatePresence>

            <div
                className={
                    isCollapsed
                        ? 'relative overflow-hidden'
                        : 'relative overflow-visible'
                }
                style={
                    isCollapsed
                        ? { maxHeight: `${COLLAPSED_LINE_LIMIT * 1.5}rem` }
                        : undefined
                }
            >
                <div className="flex">
                    {/* Line numbers column - stays fixed, doesn't scroll */}
                    <div
                        aria-hidden="true"
                        className="select-none pr-4 pl-2 text-right mr-3 shrink-0 sticky left-0 bg-code-background"
                    >
                        {Array.from({ length: lineCount }, (_, i) => (
                            <div
                                key={i + 1}
                                className="text-nav-section-text-foreground text-sm leading-6 font-mono opacity-50"
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>

                    {/* Code column - only scrolls horizontally, never vertically */}
                    <div className="overflow-x-auto flex-1 min-w-0">
                        <code
                            dangerouslySetInnerHTML={{ __html: codeHTML }}
                            {...props}
                            className="block whitespace-pre min-w-max leading-6"
                        />
                    </div>
                </div>

                {/* Fade-out overlay when collapsed */}
                {isCollapsed && (
                    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-linear-to-t from-code-background to-transparent" />
                )}
            </div>

            {/* Show more / Show less control */}
            {isCollapsible && (
                <div className="flex justify-center pt-2 mt-1 border-t border-code-border">
                    <button
                        onClick={() => setExpanded((prev) => !prev)}
                        data-nav-content
                        className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 px-2 py-1 rounded-md hover:bg-sidebar-item-hover"
                    >
                        <span>
                            {expanded
                                ? 'Show less'
                                : `Show more (${lineCount - COLLAPSED_LINE_LIMIT} more lines)`}
                        </span>
                        <motion.span
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center"
                        >
                            <CaretDownIcon size={12} />
                        </motion.span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default CodeBlock
