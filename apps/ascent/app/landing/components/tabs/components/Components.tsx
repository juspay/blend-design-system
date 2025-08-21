import React from 'react'
import { InfoBtn } from '../../InfoBtn'
import { ComponentCards } from './ComponentCards'
import { GradientHeading } from '../../GradientHeading'

export const Components = () => {
    return (
        <div className="rounded-[100px] border-b w-full mb-50 ">
            <GradientHeading text="Components" classes="justify-center" />
            <div className="mt-50 flex items-center justify-center flex-col gap-14">
                <div className="text-[36px] text-[var(--intro-text-color)] opacity-80 font-[300] text-center">
                    <p>Accelerating design-to-dev handoff with robust, </p>
                    <p>token-driven components.</p>
                </div>
                <InfoBtn text="Explore" href="https://juspay.design/docs/" />
                <ComponentCards />
            </div>
        </div>
    )
}
