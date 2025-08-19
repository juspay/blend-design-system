import React from 'react'
import { BlendBorderHeading } from '../../BlendBorderHeading'
import { DocumentationCarousel } from './DocumentationCarousel'

export const Documentation = () => {
    return (
        <div>
            <div className="w-full flex items-center justify-center">
                <BlendBorderHeading text="documentation" />
            </div>
            <DocumentationCarousel />
        </div>
    )
}
