'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// Add an onClick prop to the component
export const InfoBtn = ({
    text,
    href,
    onClick,
    style,
}: {
    text: string
    href?: string
    onClick?: () => void
    style?: string
}) => {
    // If an href is provided, use a Link. Otherwise, use a regular button.
    if (href) {
        return (
            <Link href={href} target="_blank" rel="noopener noreferrer">
                <button
                    onClick={onClick}
                    className={`w-50 py-3 rounded-full text-[#B3B3B3] border-[1px] border-[var(--button-border)] flex justify-center items-center text-center  opacity-70 bg-white/10 hover:bg-white/20 ${style}`}
                >
                    {text} <ChevronRight />
                </button>
            </Link>
        )
    }

    return (
        <button
            onClick={onClick}
            className={`w-50 py-3 rounded-full text-[#B3B3B3] border-[1px] border-[var(--button-border)] flex justify-center items-center text-center  opacity-70 bg-white/10 hover:bg-white/20 ${style}`}
        >
            {text} <ChevronRight />
        </button>
    )
}
