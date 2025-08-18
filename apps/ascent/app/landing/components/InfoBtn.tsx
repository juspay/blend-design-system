import { ChevronRight } from 'lucide-react'
import React from 'react'

export const InfoBtn = ({ text }: { text: string }) => {
    return (
        <button className="w-50 py-3 rounded-full text-[#B3B3B3] border-[1px] border-[var(--button-border)] flex justify-center items-center text-center  opacity-70 bg-[#FFFFFF2E]">
            {text} <ChevronRight />
        </button>
    )
}
