interface HomeDataType {
    id: string
    date: string
    heading: string
    paragraph: string
    link: string
}

const HomeData: HomeDataType[] = [
    {
        id: '1',
        date: 'August 28, 2025',
        heading: 'v0.0.14 - Stable',
        paragraph:
            'Enhanced core components with dynamic tabs, improved data tables, and richer select/sidebar features for better usability. Introduced new chart & stat card formatting (currency, percentage, number, date/time) with advanced props and display modes. Shipped updates to Figma Code Connect, OTP inputs, drawers, landing page, and documentation for improved consistency and developer experience.',
        link: '/changelog/v0.0.14',
    },
]

export default HomeData
