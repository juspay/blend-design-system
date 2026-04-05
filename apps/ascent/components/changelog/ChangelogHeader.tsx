import React from 'react'
import { AsideStyle } from '../layout'
import { PageBreadcrumb } from '../Navigation'

interface ChangelogHeaderProps {
    version?: string
}

export default function ChangelogHeader({ version }: ChangelogHeaderProps) {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Changelog', href: '/changelog' },
        ...(version ? [{ label: version, href: `#${version}` }] : []),
    ]

    return (
        <div>
            <PageBreadcrumb items={breadcrumbItems} style={AsideStyle} />
            <div className="py-8 md:py-11 px-4 sm:px-6 border-b border-border">
                <h1 className="scroll-m-20 text-4xl sm:text-5xl md:text-6xl lg:text-[86px] tracking-tight font-manrope font-medium text-primary">
                    ChangeLog
                </h1>
            </div>
        </div>
    )
}
