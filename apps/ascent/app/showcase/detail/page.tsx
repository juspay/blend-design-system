import { SharedLayout } from '@/components'
import CardDetailContent from '../../../components/showcase/CardDetailContent'

export default function DetailPage() {
    return (
        <SharedLayout fullWidth showSideBorder={false} baseRoute="/showcase">
            <CardDetailContent />
        </SharedLayout>
    )
}
