import Link from 'next/link'
import GradientBorderComponent from './GradientBorderWrapper'

const ChangeLogCard = ({
    href,
    children,
}: {
    href: string
    children: React.ReactNode
}) => {
    return (
        <Link href={href} className="block">
            <article>
                <GradientBorderComponent
                    thickness="p-[var(--pixel)]"
                    borderColor="bg-[#191919]"
                    width="w-full"
                    rounded="rounded-[var(--rounded-50)]"
                    bgColor="bg-black"
                    className="p-14 flex flex-col gap-16 transition"
                >
                    {children}
                </GradientBorderComponent>
            </article>
        </Link>
    )
}

export default ChangeLogCard
