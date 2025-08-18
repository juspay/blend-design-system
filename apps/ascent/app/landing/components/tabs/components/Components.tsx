import React from 'react'
import { InfoBtn } from '../../InfoBtn'
import { ComponentCards } from './ComponentCards'

export const Components = () => {
    return (
        <div>
            <div className="mt-50 flex items-center justify-center">
                <div
                    className="text-8 tracking-[80px] uppercase"
                    style={{
                        background:
                            'linear-gradient(90deg, #68686880 0%, #D0D0D0 53%, #68686880 100%)',
                        backgroundClip: 'text',
                    }}
                >
                    <p className="text-transparent">Components</p>
                </div>
            </div>
            <div className="mt-50 flex items-center justify-center flex-col gap-14">
                <div className="text-[36px] text-[var(--intro-text-color)] opacity-80 font-[300] text-center">
                    <p>Accelerating design-to-dev handoff with robust, </p>
                    <p>token-driven components.</p>
                </div>
                <InfoBtn text="Explore" />
                <ComponentCards />
            </div>
        </div>
    )
}
