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
            <div className="2xl:text-[length:var(--subheading-font-size)] xl:text-[length:var(--subheading-font-size-xl)] lg:text-[length:var(--subheading-font-size-lg)] md:text-[length:var(--subheading-font-size-md)] sm:text-[length:var(--subheading-font-size-sm)] xs:text-[length:var(--subheading-font-size-xs)] text-[length:var(--subheading-font-size-xxs)] lg:tracking-[var(--subheading-letter-spacing)] md:tracking-[var(--subheading-letter-spacing-md)] sm:tracking-[var(--subheading-letter-spacing-sm)] tracking-[var(--subheading-letter-spacing-xs)] uppercase bg-[image:var(--components-heading-gradient)] bg-clip-text">
                <p className="text-transparent">{text}</p>
            </div>
        </div>
    )
}
