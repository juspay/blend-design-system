'use client'

import { motion } from 'motion/react'

export interface CollaborativeCursorProps {
    name: string
    color: 'blue' | 'red' | 'green' | 'purple'
    x: number
    y: number
    delay?: number
}

const colorMap = {
    blue: { bg: 'bg-blue-500', text: 'text-white' },
    red: { bg: 'bg-red-500', text: 'text-white' },
    green: { bg: 'bg-green-500', text: 'text-white' },
    purple: { bg: 'bg-purple-500', text: 'text-white' },
}

export default function CollaborativeCursor({
    name,
    color,
    x,
    y,
    delay = 0,
}: CollaborativeCursorProps) {
    const colors = colorMap[color]

    return (
        <motion.div
            className="absolute pointer-events-none z-30"
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                delay,
                duration: 0.3,
            }}
            style={{
                left: `${x}px`,
                top: `${y}px`,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            {/* Cursor Pointer */}
            <div className="relative">
                {/* Simple cursor arrow pointing up */}
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className={`${colors.text}`}
                >
                    <path d="M8 0L12 6H9V16H7V6H4L8 0Z" fill="currentColor" />
                </svg>
                {/* Label below cursor */}
                <div
                    className={`absolute top-5 left-1/2 -translate-x-1/2 ${colors.bg} ${colors.text} px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-sm`}
                >
                    {name}
                </div>
            </div>
        </motion.div>
    )
}
