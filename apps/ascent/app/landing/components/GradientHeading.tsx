import React from 'react'

export const GradientHeading = ({
    text,
    classes,
}: {
    text: string
    classes?: string
}) => {
    return (
        <div className={`mt-50 flex items-center ${classes}`}>
            <div className="text-[length:var(--subheading-font-size)] tracking-[80px] uppercase bg-[image:var(--components-heading-gradient)]  bg-clip-text">
                <p className="text-transparent">{text}</p>
            </div>
        </div>
    )
}
