const breadcrumbMeta = {
    componentName: 'Breadcrumb',
    componentDescription:
        "A navigation component that shows the user's current location within a hierarchical structure. Takes an items prop inline.",
    features: [
        'Hierarchical navigation display',
        'Accessible breadcrumb navigation',
        'Responsive layout',
        'Customizable breadcrumb items',
    ],
    usageExamples: [
        {
            title: 'Basic Breadcrumb',
            description: 'Breadcrumb with navigation items',
            code: `<Breadcrumb items={[
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Current Page", href: "/products/item" }
]} />`,
        },
    ],
    props: [],
}

export default breadcrumbMeta
