import React from 'react'
import { GradientHeadingBox } from '../../GradientHeadingBox'
import { InfoBtn } from '../../InfoBtn'
import Playground from '@/app/(home)/_icons/Playground'

export const PlaygroundComp = () => {
    return (
        <section className="w-screen lg:py-20 md:py-18 sm:py-16 py-14 lg:mt-50 md:mt-40 sm:mt-36 mt-32 min-h-[var(--playground-min-height)] rounded-[var(--playground-border-radius-xxs)] lg:rounded-[var(--playground-border-radius)] md:rounded-[var(--playground-border-radius-md)] sm:rounded-[var(--playground-border-radius-sm)] xs:rounded-[var(--playground-border-radius-xs)] overflow-hidden border-t border-white/20 bg-white/3 lg:px-50 md:px-30 sm:px-15 px-8">
            <GradientHeadingBox
                text="playground"
                classes="w-fit text-center"
                tracking="tracking-[var(--tracking-double)]"
            />
            <div className="lg:mt-40 md:mt-36 sm:mt-30 xs:mt-16 mt-12 flex lg:flex-row flex-col ">
                <div className="w-full flex flex-col lg:gap-25 md:gap-20 sm:gap-16 gap-12">
                    <p className="text-wrap lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl text-lg font-light text-[var(--gray-text)]">
                        Interactive space to test and tweak component props in
                        real-time.
                    </p>
                    <InfoBtn
                        text="Learn more"
                        href="https://juspay.design/storybook/"
                    />
                </div>
                <div className="w-full max-w-6xl mx-auto">
                    <Playground />
                </div>
            </div>
        </section>
    )
}
