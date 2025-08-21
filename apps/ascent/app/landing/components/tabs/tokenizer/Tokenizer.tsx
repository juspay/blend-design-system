import React from 'react'
import { BlendBorderHeading } from '../../BlendBorderHeading'
import { Tokenizer } from '@/app/landing/icons/Tokenizer'
import { InfoBtn } from '../../InfoBtn'

export const TokenizerComp = () => {
    return (
        <div className="mt-50 flex flex-col items-center">
            <BlendBorderHeading text="Tokenizer" />
            <div className="mt-25 text-[var(--intro-text-color)] text-[36px] font-[300] text-center opacity-80">
                <p>
                    The Tokeniser lets you apply your brand’s styles—like
                    colors, fonts, and spacing—
                </p>
                <p>across our app effortlessly.</p>
            </div>
            <div className="">
                <Tokenizer />
            </div>
            <div className="-mt-40 flex flex-col items-center justify-center">
                <InfoBtn
                    text="Learn more"
                    href="https://github.com/juspay/blend-design-system/wiki/Theme-Provider-&-Token-Architecture"
                />
            </div>
        </div>
    )
}
