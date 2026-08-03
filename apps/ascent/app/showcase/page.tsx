import { Suspense } from 'react'
import SharedLayout from '@/components/layout/SharedLayout'
import { AsideStyle } from '@/components/layout/AsideStyle'
import { PageBreadcrumb } from '@/components/Navigation/PageBreadCrumb'
import Showcase from '@/components/showcase/Showcase'

function Page() {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Showcase', href: '/showcase' },
    ]
    return (
        <SharedLayout fullWidth showSideBorder={false} baseRoute="/showcase">
            <PageBreadcrumb
                items={breadcrumbItems}
                style={AsideStyle}
                className="lg:pl-15!"
            />
            <Suspense fallback={null}>
                <Showcase />
            </Suspense>
        </SharedLayout>
    )
}

export default Page
