import React from 'react'

export const Separator = ({ className }: { className: string }) => {
    return (
        <div
            className={`w-full [background:linear-gradient(90deg,#121316,#B3B3B3,#050505)] h-[1px] opacity-50 ${className}`}
        ></div>
    )
}
