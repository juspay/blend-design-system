import { SharedLayout } from '@/components'
import { showcaseData } from '@/lib/showcase-data'
import CardDetailContent from '../../../components/showcase/CardDetailContent'

export function generateStaticParams() {
    return showcaseData.map((item) => ({ id: item.id }))
}

export default async function DetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return (
        <SharedLayout baseRoute="/showcase">
            <CardDetailContent id={id} />
        </SharedLayout>
    )
}
