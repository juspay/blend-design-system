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
            className={`text-[var(--design-system-heading-background)] ${classes || ''} py-3 flex justify-center relative`}
            style={{
                borderRadius: '83px',
                background: 'var(--design-system-heading-border)',
                padding: '1px',
            }}
        >
            <div className="w-full h-full uppercase rounded-[83px] bg-black flex items-center justify-center opacity-80 p-2">
                <p className="text-center">{text}</p>
            </div>
        </div>
    )
}
