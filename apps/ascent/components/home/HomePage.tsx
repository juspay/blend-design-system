import HeroSection from './sections/HeroSection'
import DescriptionSection from './sections/DescriptionSection'
import BrandingDivider from './sections/BrandingDivider'
import DeveloperDesignerSections from './sections/DeveloperDesignerSections'
import LaunchVideoSection from './sections/LaunchVideoSection'
import ShowcaseSection from './sections/ShowcaseSection'
import PageFooter from './PageFooter'
import { SharedLayout } from '@/components'

export default function HomePage() {
    return (
        <SharedLayout baseRoute="/">
            <main className="w-full relative">
                {/* max-w-5xl mx-auto lg:border-x border-border */}
                <HeroSection />
                <DescriptionSection />
                <BrandingDivider />
                <DeveloperDesignerSections />
                <LaunchVideoSection />
                <ShowcaseSection />
            </main>
            <PageFooter />
        </SharedLayout>
    )
}
