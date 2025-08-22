import React from 'react'
import { GradientHeadingBox } from '../../GradientHeadingBox'
import { InfoBtn } from '../../InfoBtn'
import Playground from '@/app/landing/icons/Playground'

export const PlaygroundComp = () => {
    return (
        <section className="w-screen py-20 mt-50 min-h-[var(--playground-min-height)] rounded-[var(--playground-border-radius)] overflow-hidden border-t border-white/20 bg-white/3 px-50">
            <GradientHeadingBox
                text="playground"
                classes="w-fit text-center tracking-[var(--tracking-double)]"
            />
            <div className="mt-40 flex">
                <div className="w-full flex flex-col gap-25">
                    <p className="text-wrap text-[36px] font-light text-[var(--gray-text)]">
                        Interactive space to test and tweak component props in
                        real-time.
                    </p>
                    <InfoBtn
                        text="Learn more"
                        href="https://juspay.design/storybook/"
                    />
                </div>
                <div className="w-full">
                    <Playground />
                </div>
            </div>
        </section>
    )
}
