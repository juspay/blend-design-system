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
        date: 'August 14, 2025',
        heading: 'v0.0.12 - Stable',
        paragraph:
            'The Primary Button component had an issue where the text became slightly misaligned whenever an icon was placed alongside it. This inconsistency was especially noticeable in cases where buttons contained both leading and trailing icons, making the layout feel visually off-balance and reducing readability.',
        link: '/changelog/v0.0.12',
    },
    {
        id: '2',
        date: 'July 28, 2025',
        heading: 'v0.0.11 - Enhancements',
        paragraph:
            'The Primary Button component had an issue where the text became slightly misaligned whenever an icon was placed alongside it. This inconsistency was especially noticeable in cases where buttons contained both leading and trailing icons, making the layout feel visually off-balance and reducing readability.',
        link: '/changelog/v0.0.11',
    },
]

export default HomeData
