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
                fullScreen
            />
            <Showcase />
        </SharedLayout>
    )
}

export default Page
