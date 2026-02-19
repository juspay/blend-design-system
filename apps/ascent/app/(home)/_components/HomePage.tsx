'use client'

import Header from './Header'
import HeroSection from './sections/HeroSection'
import DescriptionSection from './sections/DescriptionSection'
import BrandingDivider from './sections/BrandingDivider'
import DeveloperDesignerSections from './sections/DeveloperDesignerSections'
import LaunchVideoSection from './sections/LaunchVideoSection'
import ShowcaseSection from './sections/ShowcaseSection'
import PageFooter from './PageFooter'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-14">
                <div className="w-full border-x border-t border-gray-200 relative">
                    {/* <div className="border-l border-r border-gray-200"> */}
                    <HeroSection />

                    <DescriptionSection />
                    {/* </div> */}

                    <BrandingDivider />

                    <DeveloperDesignerSections />

                    <LaunchVideoSection />
                </div>

                <ShowcaseSection />
            </main>

            <PageFooter />
        </div>
    )
}
