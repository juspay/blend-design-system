'use client'

import { useRouter } from 'next/navigation'
import { PageBreadcrumb } from '@/components/Navigation/PageBreadCrumb'
import { showcaseData } from '@/lib/showcase-data'
import RelatedCardsRow from './RelatedCardsRow'
import {
    ArrowSquareRightIcon,
    ArrowSquareLeftIcon,
} from '@phosphor-icons/react/dist/ssr'

interface CardDetailContentProps {
    id: string
}

export default function CardDetailContent({ id }: CardDetailContentProps) {
    const router = useRouter()
    const item = showcaseData.find((d) => d.id === id)

    const currentIndex = item ? showcaseData.findIndex((d) => d.id === id) : -1
    const prevItem =
        currentIndex >= 0
            ? showcaseData[
                  (currentIndex - 1 + showcaseData.length) % showcaseData.length
              ]
            : null
    const nextItem =
        currentIndex >= 0
            ? showcaseData[(currentIndex + 1) % showcaseData.length]
            : null

    const navButtons =
        prevItem && nextItem ? (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => router.push(`/showcase/${prevItem.id}`)}
                    className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                    <div className="p-0.5">
                        <ArrowSquareLeftIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>Prev</span>
                </button>
                <button
                    onClick={() => router.push(`/showcase/${nextItem.id}`)}
                    className="flex items-center gap-1 px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                    <div className="p-0.5">
                        <ArrowSquareRightIcon className="w-3.5 h-3.5" />
                    </div>
                    <span>Next</span>
                </button>
            </div>
        ) : null

    if (!item) {
        return (
            <div>
                <PageBreadcrumb
                    items={[
                        { label: 'Showcase', href: '/showcase' },
                        { label: 'Not Found', href: '#' },
                    ]}
                    className="max-w-6xl mx-auto"
                    rightSection={navButtons}
                />
                <div className="max-w-5xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                        Not found
                    </h1>
                    <p className="text-muted-foreground">
                        The showcase item you are looking for does not exist.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <PageBreadcrumb
                items={[
                    { label: 'Showcase', href: '/showcase' },
                    { label: item.title, href: '#' },
                ]}
                rightSection={navButtons}
            />
            <div>
                <div className="w-full overflow-hidden border-b border-border/60 bg-muted">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-contain dark:invert dark:hue-rotate-180 dark:saturate-150 dark:brightness-105"
                        draggable={false}
                    />
                </div>
                {/* Header */}
                <div className="p-6 sm:p-10 flex flex-col gap-10">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-2xl font-medium text-primary">
                            {item.title}
                        </h1>
                        <p className="text-foreground/85 text-base text-justify max-w-5xl lg:leading-8 tracking-[-0.32px]">
                            {item.description}
                        </p>
                    </div>
                    {/* Component tags */}
                    {item.components.length > 0 && (
                        <div className="pb-8 flex flex-col gap-4">
                            <p className="text-foreground/90 tracking-[-0.32px]">
                                Components Used
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {item.components.map((component) => (
                                    <span
                                        key={component}
                                        className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-secondary/50 text-primary border border-border/60"
                                    >
                                        {component}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <RelatedCardsRow currentItem={item} items={showcaseData} />
            </div>
        </div>
    )
}
