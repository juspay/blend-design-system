import { Metadata } from 'next'
import { ComponentsGrid } from '@/components/features/Components'

export const metadata: Metadata = {
    title: 'Components - Blend',
    description: 'Explore the complete collection of Blend UI components',
}

export default function ComponentsPage() {
    return (
        <>
            <ComponentsGrid />
        </>
    )
}
