'use client'

import React, { useState, useRef, useEffect } from 'react'
import { DocumentationCardData } from '../../../_data/documentation-card-data'
import { DocumentationCard } from './DocumentationCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const DocumentationCarousel = () => {
    const totalCards = DocumentationCardData.length
    const [activeIndex, setActiveIndex] = useState(
        totalCards % 2 == 0 ? totalCards / 2 : Math.floor(totalCards / 2) - 1
    )
    const carouselRef = useRef<HTMLDivElement>(null)

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % totalCards)
    }

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + totalCards) % totalCards)
    }

    const handleCardClick = (index: number) => {
        setActiveIndex(index)
    }

    // Function to get current card width based on screen size
    const getCurrentCardWidth = () => {
        if (typeof window === 'undefined') return 500 // SSR fallback

        const width = window.innerWidth

        // Match the breakpoints used in DocumentationCard
        if (width >= 1024) {
            // lg
            return 500 // --documentation-card-size
        } else if (width >= 768) {
            // md
            return 450 // --documentation-card-size-md
        } else if (width >= 640) {
            // sm
            return 400 // --documentation-card-size-sm
        } else {
            // xs
            return 350 // --documentation-card-size-xs
        }
    }

    // Function to get current gap based on screen size
    const getCurrentGap = () => {
        if (typeof window === 'undefined') return 50 // SSR fallback

        const width = window.innerWidth

        // You can make gap responsive too if needed
        if (width >= 1024) {
            // lg
            return 50
        } else if (width >= 768) {
            // md
            return 40
        } else if (width >= 640) {
            // sm
            return 30
        } else {
            // xs
            return 20
        }
    }

    useEffect(() => {
        if (carouselRef.current) {
            const cardWidth = getCurrentCardWidth()
            const gap = getCurrentGap()

            // The carousel container's own width is needed, not the parent's
            const carouselWidth = carouselRef.current.offsetWidth
            const cardAndGap = cardWidth + gap

            // Calculate the position of the active card
            const activeCardPosition = activeIndex * cardAndGap

            // Calculate the total translation needed to bring the active card to the center.
            // This centers the card within the carousel's visible area, not the parent's.
            const newOffset =
                carouselWidth / 2 - activeCardPosition - cardWidth / 2

            carouselRef.current.style.transform = `translateX(${newOffset}px)`
        }
    }, [activeIndex])

    // Add resize event listener to recalculate on window resize
    useEffect(() => {
        const handleResize = () => {
            if (carouselRef.current) {
                const cardWidth = getCurrentCardWidth()
                const gap = getCurrentGap()
                const carouselWidth = carouselRef.current.offsetWidth
                const cardAndGap = cardWidth + gap
                const activeCardPosition = activeIndex * cardAndGap
                const newOffset =
                    carouselWidth / 2 - activeCardPosition - cardWidth / 2

                carouselRef.current.style.transform = `translateX(${newOffset}px)`
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [activeIndex])

    return (
        // New container to provide the necessary "breathing room"
        <div className="relative overflow-hidden max-w-screen">
            {/* This is the visual centering container. It has overflow-visible by default. */}
            <div className="flex justify-center items-center mt-50">
                <div
                    ref={carouselRef}
                    className="flex transition-transform duration-500 ease-in-out gap-5 md:gap-10 lg:gap-[50px]"
                >
                    {DocumentationCardData.map((data, index) => (
                        <div
                            key={index}
                            className={`flex-shrink-0 transition-all duration-500 ease-in-out`}
                        >
                            <DocumentationCard
                                card={data}
                                index={index}
                                isActive={index === activeIndex}
                                onClick={handleCardClick}
                                style={
                                    index === activeIndex
                                        ? 'scale-110 opacity-100 rounded-[var(--documentation-card-border-radius)] bg-gradient-to-b from-[var(--documentation-card-gradient-from)] to-[var(--documentation-card-gradient-to)]'
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
