import React from 'react'
import { Metadata } from 'next'
import { compileMDXFromSlug } from '@/lib/utils/mdx'
import { CHANGELOG_CONFIG } from './config'
import GradientBorderComponent from './components/ui/GradientBorderWrapper'
import { Search } from 'lucide-react'
import ChangeLogCard from './components/ui/ChangeLogCard'

export const metadata: Metadata = {
    title: 'Home - Changelog',
    description: CHANGELOG_CONFIG.defaultDescription,
}

async function getHomeContent() {
    return await compileMDXFromSlug(CHANGELOG_CONFIG.contentPath, 'home')
}

const ChangelogPage = async () => {
    const homeData = await getHomeContent()

    if (!homeData) {
        return (
            <div
                className={`${CHANGELOG_CONFIG.maxWidth} mx-auto ${CHANGELOG_CONFIG.containerPadding}`}
            >
                <h1 className="text-3xl font-bold text-[var(--foreground)] mb-4">
                    Changelog
                </h1>
                <p className="text-[var(--muted-foreground)]">
                    Error loading changelog content.
                </p>
            </div>
        )
    }

    const { content } = homeData

    return (
        // <div
        //     className={`${CHANGELOG_CONFIG.maxWidth} mx-auto ${CHANGELOG_CONFIG.containerPadding}`}
        // >
        // {/* <article className="prose prose-gray dark:prose-invert max-w-none">
        //     {content}
        // </article> */}

        <section className="p-30 rounded-[var(--rounded-100)] border-[length:var(--pixel)] border-[var(--changelog-border-color)] bg-linear-(--changelog-bg-color)">
            <header className="items-end flex justify-between ">
                <div>
                    <p className="text-[var(--grey-500)] text-xl">
                        Last Updated: August 14, 2025
                    </p>
                    <h1
                        id="changelog-heading"
                        className="text-[var(--grey-200)] text-[length:var(--text-64)]"
                    >
                        ChangeLogs
                    </h1>
                </div>
                <form role="search">
                    <GradientBorderComponent
                        thickness="p-[var(--pixel)]"
                        borderColor="bg-(--grey-500)"
                        width="w-96"
                        height="h-15"
                        rounded="rounded-full"
                        bgColor="bg-black"
                        className="relative"
                    >
                        <Search className="absolute top-5 left-4 text-[var(--grey-500)] size-5" />
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full h-full pl-12 pr-6 py-3 placeholder:text-[var(--grey-500)]"
                        />
                    </GradientBorderComponent>
                </form>
            </header>
            <div className="grid grid-cols-1 gap-18 w-full mt-39">
                <ChangeLogCard />
            </div>
        </section>
        // </div>
    )
}

export default ChangelogPage
