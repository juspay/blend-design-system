'use client'

import { useState } from 'react'
import { TabButtons } from './TabButtons'

export const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState('tokenizer')

    const handleTabSelection = (label: string) => {
        setSelectedTab(label)
    }
    return (
        <div
            className=" text-[var(--design-system-heading-background)] opacity-[0.5] w-[636.975px] py-3 flex justify-center relative"
            style={{
                borderRadius: '83px',
                background:
                    'linear-gradient(90deg, rgba(153, 153, 153, 0.5), rgba(255, 255, 255, 0.5), rgba(153, 153, 153, 0.5))',
                padding: '1px',
            }}
        >
            <div className="w-full h-full rounded-[83px] bg-black flex items-center  py-3 px-4 justify-between">
                <TabButtons
                    label="tokenizer"
                    selected={selectedTab}
                    text="Tokenizer"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="components"
                    selected={selectedTab}
                    text="Components"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="documentation"
                    selected={selectedTab}
                    text="Documentation"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="playground"
                    selected={selectedTab}
                    text="Playground"
                    handleTabSelection={handleTabSelection}
                />
                <TabButtons
                    label="blogs"
                    selected={selectedTab}
                    text="Blogs"
                    handleTabSelection={handleTabSelection}
                />
            </div>
        </div>
    )
}
