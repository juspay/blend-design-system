import React from 'react'
import { DocumentationCardData } from '../../../data/documentation-card-data'
import { DocumentationCard } from './DocumentationCard'

export const DocumentationCarousel = () => {
    return (
        <div>
            <div className="flex gap-[50px] justify-between items-end mt-50 ">
                {DocumentationCardData.map((data, key) => (
                    <DocumentationCard card={data} key={key} />
                ))}
            </div>
        </div>
    )
}
