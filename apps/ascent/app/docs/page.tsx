import React from 'react'
import Link from 'next/link'

// Hardcoded metadata for demo; in a real app, fetch or generate this from MDX frontmatter
const components = [
    {
        slug: 'button',
        title: 'Button',
        description:
            'The Button component is a fundamental UI element used for user interactions.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="3" y="8" width="18" height="8" rx="2" />
            </svg>
        ),
        color: 'from-blue-500 to-blue-600',
    },
    {
        slug: 'button-group',
        title: 'Button Group V2',
        description:
            'The ButtonGroupV2 component is a container that groups multiple Button components together with flexible layout options and automatic positioning.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="2" y="8" width="6" height="8" rx="1" />
                <rect x="9" y="8" width="6" height="8" rx="1" />
                <rect x="16" y="8" width="6" height="8" rx="1" />
            </svg>
        ),
        color: 'from-purple-500 to-purple-600',
    },
    {
        slug: 'alert',
        title: 'Alert',
        description:
            'The Alert component is a versatile notification element used to display important messages to users with multiple variants, styles, and interactive options.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="m12 17 .01 0" />
            </svg>
        ),
        color: 'from-orange-500 to-red-500',
    },
    {
        slug: 'tag',
        title: 'Tag',
        description:
            'The Tag component is a versatile UI element used for displaying labels, categories, and status indicators with multiple variants, colors, and interactive options.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
            </svg>
        ),
        color: 'from-green-500 to-emerald-600',
    },
    {
        slug: 'split-tag',
        title: 'Split Tag',
        description:
            'The SplitTag component is a specialized tag variant that can be split into multiple sections, useful for displaying complex labels or status indicators.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                <path d="M7 7h.01" />
                <path d="M12 2v19" />
            </svg>
        ),
        color: 'from-teal-500 to-cyan-600',
    },
    {
        slug: 'tabs',
        title: 'Tabs',
        description:
            'The Tabs component provides a way to organize content into multiple sections that can be switched between, with support for different styles and configurations.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18" />
                <path d="M15 3v18" />
            </svg>
        ),
        color: 'from-indigo-500 to-blue-600',
    },
    {
        slug: 'breadcrumb',
        title: 'Breadcrumb',
        description:
            "The Breadcrumb component provides navigation context by showing the current page's location within a site hierarchy, helping users understand where they are and navigate back.",
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
                <path d="m6 9 6-6 6 6" />
            </svg>
        ),
        color: 'from-amber-500 to-orange-600',
    },
    {
        slug: 'accordion',
        title: 'Accordion',
        description:
            'The Accordion component creates collapsible content sections that can expand and collapse, helping to organize information hierarchically and save screen space.',
        icon: (
            <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 9h6" />
                <path d="M9 15h6" />
                <path d="M12 9v6" />
            </svg>
        ),
        color: 'from-pink-500 to-rose-600',
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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 not-prose">
                        {components.map((comp) => (
                            <Link
                                key={comp.slug}
                                href={`/docs/components/${comp.slug}`}
                                className="group block p-6 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--sidebar-item-hover)] transition-colors duration-200"
                                data-nav-content
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--muted)] flex items-center justify-center">
                                        <div className="text-[var(--muted-foreground)]">
                                            {comp.icon}
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
                                            {comp.title}
                                        </h3>
                                        <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">
                                            {comp.description}
                                        </p>
                                    </div>
                                    <div className="flex-shrink-0 opacity-40 group-hover:opacity-60 transition-opacity duration-200">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-[var(--muted-foreground)]"
                                        >
                                            <path d="m9 18 6-6-6-6" />
                                        </svg>
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
