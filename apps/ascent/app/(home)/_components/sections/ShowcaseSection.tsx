'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { CardHolderFront } from '../icons/CardHolderFront'
import { CardHolderBack } from '../icons/CardHolderBack'
import { DocumentationCard } from '../icons/DocumentationCard'
import { StorybookCard } from '../icons/StorybookCard'
import { CodeCard } from '../icons/CodeCard'
import { FigmaCard } from '../icons/FigmaCard'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Link from 'next/link'
import { EXTERNAL_LINKS } from '../constants/links'

const CARDS = [
    {
        id: 'documentation',
        Component: DocumentationCard,
        rotate: -18,
        baseOffset: -120,
        finalOffset: -170,
        zIndex: 21,
        href: '/docs',
        type: 'internal',
    },
    {
        id: 'storybook',
        Component: StorybookCard,
        rotate: -6,
        baseOffset: -40,
        finalOffset: -60,
        zIndex: 22,
        href: EXTERNAL_LINKS.storybook,
        type: 'external',
    },
    {
        id: 'code',
        Component: CodeCard,
        rotate: 6,
        baseOffset: 40,
        finalOffset: 60,
        zIndex: 23,
        href: EXTERNAL_LINKS.github,
        type: 'external',
    },
    {
        id: 'figma',
        Component: FigmaCard,
        rotate: 18,
        baseOffset: 120,
        finalOffset: 170,
        zIndex: 24,
        href: EXTERNAL_LINKS.figma,
        type: 'external',
    },
]

const CARD_W = 225
const CARD_H = 257

export default function ShowcaseSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])
    const holderFrontRef = useRef<HTMLDivElement | null>(null)
    const holderBackRef = useRef<HTMLDivElement | null>(null)

    const setRef = (i: number) => (el: HTMLDivElement | null) => {
        cardsRef.current[i] = el
    }
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    once: true,
                },
                defaults: {
                    ease: 'expo.inOut',
                    duration: 1.35,
                },
            })
            cardsRef.current.forEach((card, i) => {
                if (!card) return
                const cfg = CARDS[i]

                tl.fromTo(
                    card,
                    {
                        x: cfg.finalOffset,

                        y: 70,
                        rotate: cfg.rotate * 0.4,
                        scale: 0.86,
                    },
                    {
                        y: -78,
                        rotate: cfg.rotate,
                        scale: 1,
                    },
                    i * 0.08
                )
            })

            tl.fromTo(holderFrontRef.current, { y: 70 }, { y: 120 }, 0)

            tl.fromTo(holderBackRef.current, { y: 55 }, { y: 90 }, 0.06)
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="border-t border-b border-gray-200">
            <div className="lg:mx-28 border-l border-r border-gray-200 h-[445px] relative overflow-hidden">
                <div
                    className="absolute bottom-0 left-0 right-0"
                    style={{ height: 420 }}
                >
                    <div
                        ref={holderBackRef}
                        className="absolute -bottom-[90px] left-1/2 -translate-x-1/2 z-0 pointer-events-none origin-bottom"
                    >
                        <CardHolderBack width={480} height={280} />
                    </div>

                    {CARDS.map((card, i) => {
                        const CardSvg = card.Component
                        return (
                            <div
                                key={card.id}
                                ref={setRef(i)}
                                className="absolute origin-bottom will-change-transform"
                                style={{
                                    bottom: 0,
                                    left: `calc(50% - ${CARD_W / 2}px)`,
                                    width: CARD_W,
                                    height: CARD_H,
                                    zIndex: card.zIndex,
                                }}
                            >
                                {card.type === 'internal' ? (
                                    <Link
                                        href={card.href}
                                        className="block w-full h-full transition-all duration-300 ease-out cursor-pointer hover:-translate-y-5 active:translate-y-0 active:scale-95"
                                    >
                                        <CardSvg
                                            width={CARD_W}
                                            height={CARD_H}
                                        />
                                    </Link>
                                ) : (
                                    <a
                                        href={card.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full h-full transition-all duration-300 ease-out cursor-pointer hover:-translate-y-5 active:translate-y-0 active:scale-95"
                                    >
                                        <CardSvg
                                            width={CARD_W}
                                            height={CARD_H}
                                        />
                                    </a>
                                )}
                            </div>
                        )
                    })}

                    <div
                        ref={holderFrontRef}
                        className="absolute -bottom-[65px] left-1/2 -translate-x-1/2 z-30 pointer-events-none origin-bottom"
                    >
                        <CardHolderFront width={480} height={250} />
                    </div>
                </div>
            </div>
        </section>
    )
}
