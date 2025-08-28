import Intro from './landing/components/Intro'
import { TabsSection } from './landing/components/tabs/TabsSection'

const page = () => {
    return (
        <div className=" [background:var(--landing-background)] flex flex-col items-center justify-center">
            <Intro />
            <TabsSection />
        </div>
    )
}

export default page
