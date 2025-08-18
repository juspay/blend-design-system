'use client'

import { useState } from 'react'
import { Tabs } from './Tabs'
import { InfoBtn } from './InfoBtn'
import { ComponentCards } from './ComponentCards'
import { BlendBorderHeading } from './BlendBorderHeading'
import { Separator } from './Separator'

export const TabsSection = () => {
    const [selectedTab, setSelectedTab] = useState('tokenizer')

    const handleTabSelection = (label: string) => {
        setSelectedTab(label)
    }
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-50 justify-center items-center">
                <Tabs
                    selectedTab={selectedTab}
                    handleTabSelection={handleTabSelection}
                />
                <BlendBorderHeading text="Tokenizer" />
            </div>
            <div className="mt-25 text-[var(--intro-text-color)] text-[36px] font-[300] text-center opacity-80">
                <p>
                    The Tokeniser lets you apply your brand’s styles—like
                    colors, fonts, and spacing—
                </p>
                <p>across our app effortlessly.</p>
            </div>
            <div className="mt-20 flex flex-col items-center justify-center">
                <InfoBtn text="Learn more" />
            </div>
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
                <Separator className="my-50" />
                <BlendBorderHeading text="Documentation" />
            </div>
        </div>
    )
}
