const ParagraphBlock = ({ paragraphText }: { paragraphText: string }) => {
    return (
        <p className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl xs:text-lg text-base font-light text-[var(--grey-500)]">
            {paragraphText}
        </p>
    )
}

export default ParagraphBlock
