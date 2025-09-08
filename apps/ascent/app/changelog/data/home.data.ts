type HomeDataType = {
    id: string
    date: string
    heading: string
    paragraph: string
    link: string
}

const HomeData: HomeDataType[] = [
    {
        id: '2',
        date: 'September 5, 2024',
        heading: 'v0.0.15 - Stable',
        paragraph:
            'Enhanced the modal portal support, comprehensive chart improvements with timezone formatting, advanced data table features, and expanded component ecosystem including new Card component. Delivered significant UI/UX improvements across select components, tabs, popover, snackbar, and menu with better documentation and workflow updates.',
        link: '/changelog/v0.0.15',
    },
    {
        id: '1',
        date: 'August 28, 2024',
        heading: 'v0.0.14 - Stable',
        paragraph:
            'Enhanced core components with dynamic tabs, improved data tables, and richer select/sidebar features for better usability. Introduced new chart & stat card formatting (currency, percentage, number, date/time) with advanced props and display modes. Shipped updates to Figma Code Connect, OTP inputs, drawers, landing page, and documentation for improved consistency and developer experience.',
        link: '/changelog/v0.0.14',
    },
]

export default HomeData
