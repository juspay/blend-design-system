const SubHeadingBlock = ({ subHeadingText }: { subHeadingText: string }) => {
    return (
        <h1 className="xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl text-lg text-[var(--grey-100)]">
            {subHeadingText}
        </h1>
    )
}

export default SubHeadingBlock
