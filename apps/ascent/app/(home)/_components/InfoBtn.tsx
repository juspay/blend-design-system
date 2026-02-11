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
    openSamePage = false,
}: {
    text: string
    href?: string
    onClick?: () => void
    style?: string
    openSamePage?: boolean
}) => {
    // If an href is provided, use a Link. Otherwise, use a regular button.
    if (href) {
        return (
            <Link
                href={href}
                target={`${openSamePage === true ? '_self' : '_blank'}`}
                rel="noopener noreferrer"
            >
                <button
                    onClick={onClick}
                    className={`lg:w-50 md:w-[var(--info-btn-width-md)] sm:w-[var(--info-btn-width-sm)] w-[var(--info-btn-width-xs)] lg:text-lg md:text-base sm:text-sm text-xs lg:py-3 md:py-2 py-1 rounded-full text-[var(--tab-btn-text-color)] border-[length:var(--padding-1-pixel)] border-[var(--button-border)] flex justify-center items-center text-center  opacity-70 bg-white/10 hover:bg-white/20 ${style}`}
                >
                    {text} <ChevronRight className="" />
                </button>
            </Link>
        )
    }

    return (
        <button
            onClick={onClick}
            className={`w-50 py-3 rounded-full text-[var(--tab-btn-text-color)] border-[length:var(--padding-1-pixel)] border-[var(--button-border)] flex justify-center items-center text-center opacity-70 bg-white/10 hover:bg-white/20 ${style}`}
        >
            {text}{' '}
            <ChevronRight className="lg:size-[var(--chevron-right-size)] md:size-[var(--chevron-right-size-md)] sm:size-[var(--chevron-right-size-sm)] size-[var(--chevron-right-size-xs)]" />
        </button>
    )
}
