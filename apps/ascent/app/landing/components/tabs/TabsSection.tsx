'use client'

import { useState } from 'react'
import { Tabs } from './Tabs'
import { BlendBorderHeading } from '../BlendBorderHeading'
import { Separator } from '../Separator'
import { TokenizerComp } from './tokenizer/Tokenizer'
import { Components } from './components/Components'
import { Documentation } from './documentation/Documentation'
import { PlaygroundComp } from './playground/Playground'
import { Blogs } from '../blogs/Blogs'
import { ConnectWithUs } from '../connect-with-us/ConnectWithUs'
import { Footer } from '../footer/Footer'

export const TabsSection = () => {
    const [selectedTab, setSelectedTab] = useState('tokenizer')

    const handleTabSelection = (label: string) => {
        setSelectedTab(label)
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col gap-50 justify-center items-center">
                <Tabs
                    selectedTab={selectedTab}
                    handleTabSelection={handleTabSelection}
                />
                {/* <Grid /> */}
            </div>
            <TokenizerComp />
            <Components />
            <Separator className="my-50" />
            <BlendBorderHeading text="documentation" />
            <Documentation />
            <PlaygroundComp />
            <Blogs />
            <ConnectWithUs />
            <Footer />
        </div>
    )
}
