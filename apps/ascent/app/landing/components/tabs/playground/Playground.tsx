import React from 'react'
import { GradientHeadingBox } from '../../GradientHeadingBox'
import { InfoBtn } from '../../InfoBtn'
import Playground from '@/app/landing/icons/Playground'

export const PlaygroundComp = () => {
    return (
        <section className="w-[100vw] py-20 mt-50 min-h-[90vh] rounded-[200px] overflow-hidden border-t border-white/20 bg-white/5 px-50">
            <GradientHeadingBox
                text="playground"
                classes="w-[600px] tracking-[40px] text-center"
            />
            <div className="mt-40 flex">
                <div className="w-full flex flex-col gap-25">
                    <p className="text-wrap text-[36px] font-[300] text-[#9E9E9E]">
                        Interactive space to test and tweak component props in
                        real-time.
                    </p>
                    <InfoBtn text="Learn more" />
                </div>
                <div className="w-full">
                    <Playground />
                </div>
            </div>
        </section>
    )
}
