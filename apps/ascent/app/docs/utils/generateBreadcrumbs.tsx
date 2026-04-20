export const formatSlug = (slug: string): string => {
    if (slug === 'getting-started') {
        return 'Getting Started'
    }

    return slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

export const generateBreadcrumbItems = (
    slugArray: string[],
    currentPageTitle: string
): Array<{ label: string; href: string }> => {
    const items: Array<{ label: string; href: string }> = []

    items.push({
        label: 'Home',
        href: '/docs',
    })

    if (slugArray.length === 0) {
        return items
    }

    let currentPath = '/docs'

    for (let i = 0; i < slugArray.length; i++) {
        const slug = slugArray[i]
        currentPath += `/${slug}`

        const label =
            i === slugArray.length - 1 ? currentPageTitle : formatSlug(slug)

        items.push({
            label,
            href: currentPath,
        })
    }

    return items
}
