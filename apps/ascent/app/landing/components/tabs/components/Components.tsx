import React from 'react'
import { InfoBtn } from '../../InfoBtn'
import { ComponentCards } from './ComponentCards'
import { GradientHeading } from '../../GradientHeading'

export const Components = () => {
    return (
        <div className=" border-b w-full mb-50 ">
            <GradientHeading text="Components" classes="justify-center" />
            <div className="lg:mt-50 md:mt-25 sm:mt-18 mt-15 flex items-center justify-center flex-col gap-14">
                <div className="text-[var(--intro-text-color)] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg sm:text-xs text-[length:var(--text-xxs)] opacity-80 font-light text-center">
                    <p>Accelerating design-to-dev handoff with robust, </p>
                    <p>token-driven components.</p>
                </div>
                <InfoBtn text="Explore" href="https://juspay.design/docs/" />
                <ComponentCards />
            </div>
        </div>
    )
}
