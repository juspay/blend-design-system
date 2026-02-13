'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Card data for the showcase carousel */
const CARDS = [
    {
        id: 1,
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.5"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M7 7h10M7 12h10M7 17h6" />
            </svg>
        ),
        label: 'Documentation',
        color: 'bg-white',
    },
    {
        id: 2,
        icon: <span className="text-2xl font-bold text-green-600">S</span>,
        label: 'Shopify',
        color: 'bg-white',
    },
    {
        id: 3,
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#6B7280"
                strokeWidth="1.5"
            >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        ),
        label: 'Code',
        color: 'bg-white',
    },
    {
        id: 4,
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#6B7280">
                <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5zM12 2h3.5a3.5 3.5 0 110 7H12V2zM12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 11-7 0zM5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0zM5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" />
            </svg>
        ),
        label: 'Figma',
        color: 'bg-white',
    },
    {
        id: 5,
        icon: (
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="1.5"
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
            </svg>
        ),
        label: 'UI Kit',
        color: 'bg-white',
    },
]

export default function ShowcaseSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardHolderRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const section = sectionRef.current
        const cardHolder = cardHolderRef.current
        if (!section || !cardHolder) return

        const ctx = gsap.context(() => {
            // Animate card holder: scale up and translate as user scrolls
            gsap.fromTo(
                cardHolder,
                {
                    scale: 0.85,
                    y: 60,
                    opacity: 0.6,
                },
                {
                    scale: 1,
                    y: 0,
                    opacity: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 20%',
                        scrub: 1,
                    },
                }
            )

            // Stagger individual card animations
            const cards = cardsRef.current.filter(Boolean)
            cards.forEach((card, i) => {
                gsap.fromTo(
                    card,
                    {
                        y: 40 + i * 15,
                        opacity: 0,
                        scale: 0.9,
                        rotateY: -5 + i * 2,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotateY: 0,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: section,
                            start: `top ${75 - i * 5}%`,
                            end: `top ${35 - i * 5}%`,
                            scrub: 1,
                        },
                    }
                )
            })
        }, section)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="py-16 lg:py-24 border-x border-t border-b border-gray-200"
        >
            <div className="max-w-[1080px] mx-auto px-6">
                {/* Card Holder with envelope-like background */}
                <div
                    ref={cardHolderRef}
                    className="relative bg-gray-100 rounded-2xl overflow-hidden p-8 lg:p-16"
                >
                    {/* Envelope illustration background */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
                        <svg
                            className="w-[500px] h-[400px]"
                            viewBox="0 0 500 400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <rect
                                x="50"
                                y="80"
                                width="400"
                                height="260"
                                rx="8"
                            />
                            <path d="M50 80L250 220L450 80" />
                        </svg>
                    </div>

                    {/* Floating Cards */}
                    <div
                        className="relative z-10 flex items-end justify-center gap-4 lg:gap-6 min-h-[220px]"
                        style={{ perspective: '800px' }}
                    >
                        {CARDS.map((card, index) => {
                            // Alternate card heights for visual interest
                            const heightOffsets = [-8, -16, -24, -16, -8]
                            const rotations = [-4, -2, 0, 2, 4]

                            return (
                                <div
                                    key={card.id}
                                    ref={(el) => {
                                        cardsRef.current[index] = el
                                    }}
                                    className={`${card.color} rounded-xl shadow-lg border border-gray-200 flex flex-col items-center justify-center gap-3 p-4 lg:p-6 w-[80px] h-[100px] lg:w-[100px] lg:h-[130px] transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer`}
                                    style={{
                                        transform: `translateY(${heightOffsets[index]}px) rotate(${rotations[index]}deg)`,
                                    }}
                                >
                                    {card.icon}
                                    <span className="text-xs text-gray-500 font-medium text-center leading-tight hidden lg:block">
                                        {card.label}
                                    </span>
                                </div>
                            )
                        })}
                    </div>

                    {/* Bottom decorative gradient */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-linear-to-t from-gray-200/40 to-transparent pointer-events-none" />
                </div>
            </div>
        </section>
    )
}
