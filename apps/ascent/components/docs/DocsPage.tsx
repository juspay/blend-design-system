import React from 'react'
import { PageBreadcrumb } from '@/components/Navigation/index'
import { WarningOctagonIcon } from '@phosphor-icons/react/dist/ssr'
import { DocsPageProps } from '@/lib/types'
import { GithubRoundedIcon, StoryBookIcon } from '@/icons'
import { AsideStyle } from '../layout'

interface ExtendedDocsPageProps extends DocsPageProps {
    mobileTrigger?: React.ReactNode
}

function DocsPage({
    metadata,
    content,
    breadcrumbItems,
    mobileTrigger,
}: ExtendedDocsPageProps) {
    return (
        <div className="flex flex-col mx-auto border-x border-border">
            <PageBreadcrumb
                items={breadcrumbItems}
                style={AsideStyle}
                mobileTrigger={mobileTrigger}
            />
            <div className="flex-1 gap-2">
                <article className="prose overflow-x-hidden">
                    <div className="py-11 px-6 md:px-10 border-b border-border">
                        <h1 className="scroll-m-20 text-4xl md:text-5xl tracking-tight lg:text-7xl xl:text-[86px] font-manrope font-medium text-primary">
                            {metadata.title}
                        </h1>
                    </div>
                    <div className="py-8 px-6 md:px-10">
                        <div className="flex flex-col gap-2">
                            <p className="text-foreground text-base md:text-justify md:leading-9 tracking-[-0.32px]">
                                {metadata.description}
                            </p>

                            <div className="w-full mt-2 flex flex-wrap items-center gap-4">
                                <a
                                    href={
                                        metadata.RepoFolderName &&
                                        metadata.RepoFolderName !== ''
                                            ? `https://github.com/juspay/blend-design-system/tree/main/packages/blend/lib/components/${metadata.RepoFolderName}`
                                            : 'https://github.com/juspay/blend-design-system'
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full xs:w-auto flex items-center gap-1.5 text-sm text-primary bg-secondary border border-border rounded-lg px-3 py-1 transition-colors hover:bg-muted"
                                    data-nav-content
                                >
                                    <GithubRoundedIcon
                                        width={15}
                                        height={15}
                                        className="text-primary stroke-3"
                                    />
                                    <span className="font-medium text-primary">
                                        View on GitHub
                                    </span>
                                </a>
                                <a
                                    href="https://github.com/juspay/blend-design-system/issues"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full xs:w-auto flex items-center gap-1.5 text-sm text-primary bg-secondary border border-border rounded-lg px-3 py-1 transition-colors hover:bg-muted"
                                    data-nav-content
                                >
                                    <WarningOctagonIcon className="w-3.5 h-3.5 text-primary stroke-3" />
                                    <span className="font-medium text-primary">
                                        Report an issue
                                    </span>
                                </a>
                                <a
                                    href={
                                        metadata.storybookLink &&
                                        metadata.storybookLink !== ''
                                            ? `https://blend.juspay.design/storybook/?path=/docs/${metadata.StorybookLink}`
                                            : 'https://blend.juspay.design/storybook/?path=/docs/components-accordion--docs'
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full xs:w-auto flex items-center gap-1.5 text-sm text-primary bg-secondary border border-border rounded-lg px-3 py-1 transition-colors hover:bg-muted"
                                    data-nav-content
                                >
                                    <StoryBookIcon width={13} height={13} />
                                    <span className="font-medium text-primary">
                                        View Storybook
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div>{content}</div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default DocsPage
