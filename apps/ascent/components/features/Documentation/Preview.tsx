'use client'
import React from 'react'

const Preview = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-80 border-[var(--code-border)] border-1 rounded-md p-4 mt-4 flex items-center justify-center">
            {children}
        </div>
    )
}

export default Preview
