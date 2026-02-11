import React from 'react'

export const GradientHeadingBox = ({
    text,
    classes,
    tracking,
}: {
    text: string
    classes?: string
    tracking?: string
}) => {
    return (
        <div
            className={` ${classes || ''} text-[var(--design-system-heading-background)] flex justify-center items-center relative bg-white/20 rounded-[var(--tab-bar-border-radius)] p-[var(--padding-1-pixel)]`}
        >
            <div className="w-full h-full uppercase rounded-[var(--tab-bar-border-radius)] bg-black flex items-center justify-center opacity-80 2xl:p-2 sm:p-1 p-[2px]">
                <span
                    className={`w-full text-center xl:pl-5 lg:pl-3 pl-2 lg:text-sm md:text-xs sm:text-[var(--gradient-heading-box-font-size-sm)] xs:text-[8px] text-[7px] ${tracking && tracking} `}
                >
                    {text}
                </span>
            </div>
        </div>
    )
}
