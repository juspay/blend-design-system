import React from 'react'

export const BlendBorderHeading = ({ text }: { text: string }) => {
    return (
        <h2 className="border-1 py-2 w-fit uppercase text-[var(--design-system-heading-background)] border-transparent lg:text-[length:var(--tab-heading-font-size)] md:text-[length:var(--tab-heading-font-size-md)] sm:text-[length:var(--tab-heading-font-size-sm)] text-[length:var(--tab-heading-font-size-xs)] lg:tracking-[var(--tokenizer-heading-letter-spacing)] md:tracking-[var(--tokenizer-heading-letter-spacing-md)] sm:tracking-[var(--tokenizer-heading-letter-spacing-sm)] tracking-[var(--tokenizer-heading-letter-spacing-xs)] [border-image:linear-gradient(90deg,#121316,#B3B3B3,#050505)_1] opacity-60 flex justify-center">
            {text}
        </h2>
    )
}
