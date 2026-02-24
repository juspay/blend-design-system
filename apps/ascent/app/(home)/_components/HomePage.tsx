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

            <main className="pt-18">
                <div className="w-full lg:border-x border-gray-200 relative">
                    <HeroSection />

                    <DescriptionSection />

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
