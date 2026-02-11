import Intro from './(home)/_components/Intro'
import { TabsSection } from './(home)/_components/tabs/TabsSection'

const page = () => {
    return (
        <div className=" [background:var(--landing-background)] flex flex-col items-center justify-center">
            <Intro />
            <TabsSection />
        </div>
    )
}

export default page
