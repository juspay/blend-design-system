import { DocumentationCardType } from '../../../types/documentation-card-type'
import { InfoBtn } from '../../InfoBtn'
import React from 'react'

export const DocumentationCard = ({
    card,
    index,
    isActive,
    onClick,
    style,
}: {
    card: DocumentationCardType
    index: number
    isActive: boolean
    onClick: (index: number) => void
    style: string
}) => {
    const handleCardClick = (e: React.MouseEvent) => {
        // Prevent click if the target is the "Learn more" button or its children
        const target = e.target as HTMLElement
        if (target.closest('a') || target.closest('button')) {
            return
        }
        onClick(index)
    }

    return (
        <div
            onClick={handleCardClick}
            className={`lg:w-[var(--documentation-card-size)] md:w-[var(--documentation-card-size-md)] sm:w-[var(--documentation-card-size-sm)] w-[var(--documentation-card-size-xs)] rounded-[var(--documentation-card-rounded-xs)] lg:rounded-[var(--documentation-card-rounded)] md:rounded-[var(--documentation-card-rounded-md)] sm:rounded-[var(--documentation-card-rounded-sm)] border border-[rgba(255,255,255,0.20)] text-white/50 flex flex-col items-center justify-center lg:py-20 lg:px-10 md:py-16 md:px-8 sm:py-12 sm:px-6 py-10 px-5 transition-all duration-500 ease-in-out cursor-pointer hover:border-white/30 ${style} ${!isActive ? 'hover:opacity-70' : ''}`}
        >
            <h3 className="uppercase text-4 lg:mb-14 md:mb-10 sm:mb-8 mb-6 font-light">
                {card.heading}
            </h3>
            <p className="text-wrap text-center lg:text-2xl md:text-xl sm:text-sm xs:text-xs text-[length:var(--text-xxs)] font-[400]">
                {card.content}
            </p>
            <div className="lg:mt-10 md:mt-8 sm:mt-6 mt-4">
                <InfoBtn text="Learn more" href={card.link} />
            </div>
        </div>
    )
}
