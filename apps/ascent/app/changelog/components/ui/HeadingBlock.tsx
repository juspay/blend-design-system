const HeadingBlock = ({ headingText }: { headingText: string }) => {
    return (
        <h1 className="xl:text-[56px] lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl text-xl text-[var(--grey-100)]">
            {headingText}
        </h1>
    )
}

export default HeadingBlock
