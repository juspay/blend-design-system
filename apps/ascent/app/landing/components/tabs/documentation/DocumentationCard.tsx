import { DocumentationCardType } from '../../../types/documentation-card-type'
import { InfoBtn } from '../../InfoBtn'
import React from 'react'

export const DocumentationCard = ({
    card,
    style,
}: {
    card: DocumentationCardType
    style: string
}) => {
    return (
        <div
            className={`w-[500px] rounded-[120px] border border-[rgba(255,255,255,0.20)] text-white/50 flex flex-col items-center justify-center py-[76px] px-10 transition-all duration-500 ease-in-out ${style}`}
        >
            <h3 className="uppercase text-4 mb-[56px] font-[300]">
                {card.heading}
            </h3>
            <p className="text-wrap text-center text-[24px] font-[400]">
                {card.content}
            </p>
            <div className="mt-10">
                <InfoBtn text="Learn more" href={card.link} />
            </div>
        </div>
    )
}
