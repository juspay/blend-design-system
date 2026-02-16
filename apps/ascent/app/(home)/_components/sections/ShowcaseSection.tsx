'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CardHolderFront } from '../icons/CardHolderFront'
import { CardHolderBack } from '../icons/CardHolderBack'
import { DocumentationCard } from '../icons/DocumentationCard'
import { StorybookCard } from '../icons/StorybookCard'
import { CodeCard } from '../icons/CodeCard'
import { FigmaCard } from '../icons/FigmaCard'

gsap.registerPlugin(ScrollTrigger)

const CARDS = [
    {
        id: 'documentation',
        Component: DocumentationCard,
        rotate: -14,
        xOffset: -180,
    },
    { id: 'storybook', Component: StorybookCard, rotate: -5, xOffset: -60 },
    { id: 'code', Component: CodeCard, rotate: 5, xOffset: 60 },
    { id: 'figma', Component: FigmaCard, rotate: 14, xOffset: 180 },
]

const CARD_W = 225
const CARD_H = 257

export default function ShowcaseSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const backHolderRef = useRef<HTMLDivElement | null>(null)
    const frontHolderRef = useRef<HTMLDivElement | null>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    const setRef = (i: number) => (el: HTMLDivElement | null) => {
        cardsRef.current[i] = el
    }

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const holderAnim = {
                scale: 0.82,
                y: 50,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scrub: true,
                },
            }

            gsap.fromTo(backHolderRef.current, { scale: 1, y: 0 }, holderAnim)
            gsap.fromTo(
                frontHolderRef.current,
                { scale: 1, y: 0 },
                { ...holderAnim }
            )

            cardsRef.current.forEach((card, i) => {
                if (!card) return
                const cfg = CARDS[i]

                gsap.fromTo(
                    card,
                    {
                        y: 100, // pushed down → mostly hidden behind holder
                        rotate: cfg.rotate * 0.3, // subtle rotation
                        scale: 0.7,
                        opacity: 0.5,
                    },
                    {
                        y: -90, // rises above holder
                        rotate: cfg.rotate, // full fan rotation
                        scale: 1,
                        opacity: 1,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 80%',
                            end: 'bottom 30%',
                            scrub: true,
                        },
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="border-t border-b border-gray-200">
            <div className="mx-28 border-l border-r border-gray-200 h-[445px] relative overflow-hidden">
                <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: 420 }}
                >
                    <div
                        ref={backHolderRef}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-0 pointer-events-none origin-bottom"
                    >
                        <CardHolderBack width={480} height={280} />
                    </div>

                    {CARDS.map((card, i) => {
                        const CardSvg = card.Component
                        return (
                            <div
                                key={card.id}
                                ref={setRef(i)}
                                className="absolute z-20 origin-bottom"
                                style={{
                                    bottom: 0,
                                    left: `calc(50% + ${card.xOffset}px - ${CARD_W / 2}px)`,
                                    width: CARD_W,
                                    height: CARD_H,
                                }}
                            >
                                <div className="w-full h-full transition-transform duration-300 cursor-pointer hover:-translate-y-3">
                                    <CardSvg width={CARD_W} height={CARD_H} />
                                </div>
                            </div>
                        )
                    })}

                    <div
                        ref={frontHolderRef}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none origin-bottom"
                    >
                        <CardHolderFront width={480} height={250} />
                    </div>
                </div>
            </div>
        </section>
    )
}
