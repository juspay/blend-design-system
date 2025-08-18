import Intro from './components/Intro'
import { useState } from 'react'
import { TabsSection } from './components/tabs/TabsSection'

const page = () => {
    return (
        <div className=" [background:var(--landing-background)] flex flex-col items-center justify-center">
            <Intro />
            <TabsSection />
        </div>
    )
}

export default page
