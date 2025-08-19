'use client'

import React, { useState, useRef, useEffect } from 'react'
import { DocumentationCardData } from '../../../data/documentation-card-data'
import { DocumentationCard } from './DocumentationCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const DocumentationCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0)
    const totalCards = DocumentationCardData.length
    const carouselRef = useRef<HTMLDivElement>(null)

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % totalCards)
    }

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards)
    }

    // This effect ensures the carousel always centers the active card
    useEffect(() => {
        if (carouselRef.current) {
            const cardWidth = 500 // Assuming a fixed width for the card
            const gap = 50 // Assuming a fixed gap
            // Correctly get the parent's width for centering
            const parentWidth =
                carouselRef.current.parentElement?.offsetWidth || 0
            const cardOffset = cardWidth / 2 // Offset to center the card itself
            const centerPosition = parentWidth / 2 // Center of the viewport
            const translateX = activeIndex * (cardWidth + gap) // Translation for all preceding cards
            const newOffset = centerPosition - translateX - cardOffset // Final translation to center the active card

            // This is the key change: apply transform to move the whole container
            carouselRef.current.style.transform = `translateX(${newOffset}px)`
        }
    }, [activeIndex])

    return (
        // New container to provide the necessary "breathing room"
        <div className="relative w-full overflow-hidden">
            {/* This is the visual centering container. It has overflow-visible by default. */}
            <div className="flex justify-center items-center mt-50">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ gap: '50px' }}
                >
                    {DocumentationCardData.map((data, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 transition-all duration-500 ease-in-out`}
                        >
                            <DocumentationCard
                                card={data}
                                style={
                                    index === activeIndex
                                        ? 'scale-110 opacity-100 rounded-[120px] bg-gradient-to-b from-[#FFFFFF1A] to-[#0000001A]'
                                        : 'scale-90 opacity-50'
                                }
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/* Navigation buttons */}
            <div className="flex gap-20 mt-24 w-full items-center justify-center">
                <button
                    onClick={handlePrev}
                    className="p-3 rounded-full border border-gray-500 hover:bg-white/10 transition-colors"
                >
                    <ChevronLeft className="text-white" />
                </button>
                <button
                    onClick={handleNext}
                    className="p-3 rounded-full border border-gray-500 hover:bg-white/10 transition-colors"
                >
                    <ChevronRight className="text-white" />
                </button>
            </div>
        </div>
    )
}
