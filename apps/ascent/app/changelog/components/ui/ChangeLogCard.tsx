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
                className="lg:p-14 md:p-12 sm:p-10 xs:p-8 p-6 flex flex-col lg:gap-16 md:gap-12 sm:gap-10 gap-8 transition bg-gradient-to-b from-[#161616] to-[var(--documentation-card-gradient-to)]"
            >
                {children}
            </GradientBorderComponent>
        </article>
    )
}

export default ChangeLogCard
