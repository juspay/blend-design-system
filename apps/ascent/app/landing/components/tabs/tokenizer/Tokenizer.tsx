import React from 'react'
import { BlendBorderHeading } from '../../BlendBorderHeading'
import { Tokenizer } from '@/app/landing/icons/Tokenizer'
import { InfoBtn } from '../../InfoBtn'

export const TokenizerComp = () => {
    return (
        <div className="lg:mt-50 mt-25 flex flex-col items-center">
            <BlendBorderHeading text="Tokenizer" />
            <div className="mt-25 text-[var(--intro-text-color)] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg sm:text-xs text-[length:var(--text-xxs)]  font-light text-center opacity-80">
                <p>
                    The Tokeniser lets you apply your brand’s styles—like
                    colors, fonts, and spacing—
                </p>
                <p>across our app effortlessly.</p>
            </div>
            <div className="w-full max-w-6xl mx-auto">
                <Tokenizer />
            </div>
            <div className="-mt-40 flex flex-col items-center justify-center">
                <InfoBtn
                    text="Learn more"
                    href="https://juspay.design/blog/theme-provider-token-architecture/"
                />
            </div>
        </div>
    )
}
