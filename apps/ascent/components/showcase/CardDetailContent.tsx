'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function CardDetailContent() {
    const searchParams = useSearchParams()

    const cardId = searchParams.get('id') || ''
    const title = searchParams.get('title') || 'Untitled'
    const gradient = searchParams.get('gradient') || 'from-gray-500 to-gray-600'

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <Link
                href="/showcase"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to showcase
            </Link>

            <div className="space-y-6">
                <h1 className="text-3xl font-bold">{title}</h1>

                <div
                    className={`w-full aspect-video rounded-2xl bg-linear-to-br ${gradient} shadow-2xl`}
                />

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-neutral-900 rounded-lg p-4">
                        <p className="text-neutral-500 mb-1">Card ID</p>
                        <p className="font-mono">{cardId}</p>
                    </div>
                    <div className="bg-neutral-900 rounded-lg p-4">
                        <p className="text-neutral-500 mb-1">Gradient</p>
                        <p className="font-mono">{gradient}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
