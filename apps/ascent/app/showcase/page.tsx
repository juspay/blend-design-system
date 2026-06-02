import { AsideStyle, PageBreadcrumb, SharedLayout } from '@/components'
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
            <Showcase />
        </SharedLayout>
    )
}

export default Page
