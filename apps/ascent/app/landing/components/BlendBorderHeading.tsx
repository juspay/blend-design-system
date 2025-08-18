import React from 'react'

export const BlendBorderHeading = ({ text }: { text: string }) => {
    return (
        <div className="border-1 w-fit uppercase text-[var(--design-system-heading-background)] border-transparent p-3 text-3 tracking-[40px] [border-image:linear-gradient(90deg,#121316,#B3B3B3,#050505)_1] opacity-60 flex justify-center">
            {text}
        </div>
    )
}
