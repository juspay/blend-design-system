'use client'
import React, { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Check } from 'lucide-react'
import { highlight } from 'sugar-high'

const CodeBlock = ({ code, props }: { code: React.ReactNode; props: any }) => {
    const codeHTML = highlight(code as string)
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(codeHTML)
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 2000)
    }

    return (
        <div
            data-code-block
            className="relative w-full rounded-md border border-[var(--code-border)] py-3 px-2 overflow-auto bg-[var(--code-background)]"
        >
            <AnimatePresence initial={false} mode="wait">
                <motion.button
                    key={isCopied ? 'check' : 'copy'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-3 right-1 p-1 flex items-center justify-center text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer hover:text-gray-500 z-10"
                    onClick={copyToClipboard}
                    data-nav-content
                    aria-label={
                        isCopied ? 'Code copied' : 'Copy code to clipboard'
                    }
                >
                    {isCopied ? (
                        <Check
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
                            className="w-4 h-4 "
                        >
                            <path
                                d="M14.25 5.25H7.25C6.14543 5.25 5.25 6.14543 5.25 7.25V14.25C5.25 15.3546 6.14543 16.25 7.25 16.25H14.25C15.3546 16.25 16.25 15.3546 16.25 14.25V7.25C16.25 6.14543 15.3546 5.25 14.25 5.25Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <path
                                d="M2.80103 11.998L1.77203 5.07397C1.61003 3.98097 2.36403 2.96397 3.45603 2.80197L10.38 1.77297C11.313 1.63397 12.19 2.16297 12.528 3.00097"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                        </svg>
                    )}
                </motion.button>
            </AnimatePresence>
            <div className="overflow-x-auto bg-[var(--code-background)]">
                <code
                    dangerouslySetInnerHTML={{ __html: codeHTML }}
                    {...props}
                    className="p-2 block whitespace-pre-wrap break-words"
                ></code>
            </div>
        </div>
    )
}

export default CodeBlock
