import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const InfoBtn = ({ text, href }: { text: string; href?: string }) => {
    return (
        <Link href={`${href}`} target="_blank" rel="noopener noreferrer">
            <button className="w-50 py-3 rounded-full text-[#B3B3B3] border-[1px] border-[var(--button-border)] flex justify-center items-center text-center  opacity-70 bg-white/10 hover:bg-white/20">
                {text} <ChevronRight />
            </button>
        </Link>
    )
}
