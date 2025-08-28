import Link from 'next/link'
import GradientBorderComponent from './GradientBorderWrapper'

const ChangeLogCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <article>
            <GradientBorderComponent
                thickness="p-[var(--pixel)]"
                borderColor="bg-[#191919]"
                width="w-full"
                rounded="rounded-[var(--rounded-50)]"
                bgColor="bg-black"
                className="p-14 flex flex-col gap-16 transition bg-gradient-to-b from-[#161616] to-[var(--documentation-card-gradient-to)]"
            >
                {children}
            </GradientBorderComponent>
        </article>
    )
}

export default ChangeLogCard
