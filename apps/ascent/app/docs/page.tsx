import React from 'react'
import Link from 'next/link'

// Hardcoded metadata for demo; in a real app, fetch or generate this from MDX frontmatter
const components = [
    {
        slug: 'button',
        title: 'Button',
        description:
            'The Button component is a fundamental UI element used for user interactions.',
    },
    {
        slug: 'button-group',
        title: 'Button Group V2',
        description:
            'The ButtonGroupV2 component is a container that groups multiple Button components together with flexible layout options and automatic positioning.',
    },
    {
        slug: 'alert',
        title: 'Alert',
        description:
            'The Alert component is a versatile notification element used to display important messages to users with multiple variants, styles, and interactive options.',
    },
    {
        slug: 'tag',
        title: 'Tag',
        description:
            'The Tag component is a versatile UI element used for displaying labels, categories, and status indicators with multiple variants, colors, and interactive options.',
    },
    {
        slug: 'split-tag',
        title: 'Split Tag',
        description:
            'The SplitTag component is a specialized tag variant that can be split into multiple sections, useful for displaying complex labels or status indicators.',
    },
    {
        slug: 'tabs',
        title: 'Tabs',
        description:
            'The Tabs component provides a way to organize content into multiple sections that can be switched between, with support for different styles and configurations.',
    },
    {
        slug: 'breadcrumb',
        title: 'Breadcrumb',
        description:
            "The Breadcrumb component provides navigation context by showing the current page's location within a site hierarchy, helping users understand where they are and navigate back.",
    },
    {
        slug: 'accordion',
        title: 'Accordion',
        description:
            'The Accordion component creates collapsible content sections that can expand and collapse, helping to organize information hierarchically and save screen space.',
    },
    // ...add more as needed
]

const page = () => {
    return (
        <div className="w-full flex-1 flex">
            <div className="flex-1 gap-2">
                <article className="prose py-10 max-w-[80ch] mx-auto overflow-x-hidden px-4 md:px-2">
                    <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl text-[var(--primary)] mb-2">
                        Components
                    </h1>
                    <p className="mt-2 text-[var(--muted-foreground)] mb-8">
                        Here you can find all the components available in the
                        library. We are working on adding more components.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 not-prose">
                        {components.map((comp) => (
                            <Link
                                key={comp.slug}
                                href={`/docs/components/${comp.slug}`}
                                className="group block relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--sidebar-item-hover)] hover:shadow-[0_1px_3px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-all duration-200"
                                data-nav-content
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-[var(--foreground)] transition-colors mb-2">
                                                {comp.title}
                                            </h3>
                                            <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                                                {comp.description}
                                            </p>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                className="text-[var(--muted-foreground)] transition-colors duration-200"
                                            >
                                                <path d="m9 18 6-6-6-6" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </article>
            </div>
            <div className="doc-toc-ctr max-w-[240px] w-full">
                <div className="sticky top-4">
                    {/* Empty TOC space to maintain layout consistency */}
                </div>
            </div>
        </div>
    )
}

export default page
