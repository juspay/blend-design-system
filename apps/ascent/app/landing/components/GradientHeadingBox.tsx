import React from 'react'

export const GradientHeadingBox = ({
    text,
    classes,
}: {
    text: string
    classes?: string
}) => {
    return (
        <div
            className={` ${classes || ''} text-[var(--design-system-heading-background)] flex justify-center items-center relative bg-white/20 rounded-[var(--tab-bar-border-radius)] p-[var(--padding-1-pixel)]`}
        >
            <div className="w-full h-full uppercase rounded-[var(--tab-bar-border-radius)] bg-black flex items-center justify-center opacity-80 p-2">
                <span className="w-full text-center pl-5">{text}</span>
            </div>
        </div>
    )
}
