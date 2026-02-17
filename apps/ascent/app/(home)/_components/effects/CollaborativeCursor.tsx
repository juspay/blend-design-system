'use client'

import { motion } from 'motion/react'
import { useRef } from 'react'
import CursorIcon from '../icons/CursorIcon'

export interface CollaborativeCursorProps {
    name: string
    color: 'blue' | 'red' | 'green' | 'purple'
    x: number
    y: number
    delay?: number
    comment?: string
    direction?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'none'
    animateFrom?: { x: number; y: number }
}

const colorMap = {
    blue: {
        bg: 'bg-blue-500',
        text: 'text-white',
        tail: 'border-b-blue-500',
        cursor: '#3B82F6',
    },
    red: {
        bg: 'bg-red-500',
        text: 'text-white',
        tail: 'border-b-red-500',
        cursor: '#FF6467',
    },
    green: {
        bg: 'bg-green-500',
        text: 'text-white',
        tail: 'border-b-green-500',
        cursor: '#22C55E',
    },
    purple: {
        bg: 'bg-purple-500',
        text: 'text-white',
        tail: 'border-b-purple-500',
        cursor: '#A855F7',
    },
}

let filterIdCounter = 0

export default function CollaborativeCursor({
    name,
    color,
    x,
    y,
    delay = 0,
    comment,
    direction = 'left',
    animateFrom,
}: CollaborativeCursorProps) {
    const colors = colorMap[color]

    const filterIdRef = useRef<string | null>(null)
    if (!filterIdRef.current) {
        filterIdCounter++
        filterIdRef.current = `filter0_d_${color}_${filterIdCounter}`
    }
    const filterId = filterIdRef.current

    const getTransform = () => {
        if (name === 'Vimal') {
            return 'rotate(-280deg)'
        }
        if (name === 'You') {
            return 'rotate(0deg)'
        }

        switch (direction) {
            case 'right':
                return 'rotate(0deg)'
            case 'left':
                return 'rotate(180deg)'
            case 'up':
                return 'rotate(-90deg)'
            case 'down':
                return 'rotate(90deg)'
            case 'up-left':
                return 'rotate(-135deg)'
            case 'none':
                return 'rotate(0deg)'
            default:
                return 'rotate(180deg)'
        }
    }

    const hasAnimation = animateFrom !== undefined

    return (
        <motion.div
            className="absolute pointer-events-none z-30"
            initial={{
                x: hasAnimation ? animateFrom.x - x : 0,
                y: hasAnimation ? animateFrom.y - y : 0,
                opacity: 0,
            }}
            animate={{
                x: 0,
                y: 0,
                opacity: 1,
            }}
            transition={{
                delay,
                duration: hasAnimation ? 0.8 : 0.3,
                ease: 'easeOut',
            }}
            style={{
                left: `${x}px`,
                top: `${y}px`,
                translateX: '-50%',
                translateY: '-50%',
            }}
        >
            <div className="relative">
                <CursorIcon
                    color={colors.cursor}
                    filterId={filterId}
                    style={{
                        transform: getTransform(),
                        transformOrigin: 'center',
                    }}
                />
                {comment ? (
                    <div
                        className={`absolute -right-4 top-0 ${colors.bg} ${colors.text} px-4 py-2 rounded-b-2xl rounded-tr-2xl text-xs font-medium whitespace-nowrap shadow-md relative`}
                    >
                        {comment}
                    </div>
                ) : name ? (
                    <div
                        className={`absolute top-4 ${
                            name === 'Vimal'
                                ? '-left-11'
                                : 'left-8 -translate-x-1/2'
                        } ${colors.bg} ${colors.text} px-2 py-1 rounded text-xs font-medium whitespace-nowrap shadow-sm border border-gray-50`}
                    >
                        {name}
                    </div>
                ) : null}
            </div>
        </motion.div>
    )
}
