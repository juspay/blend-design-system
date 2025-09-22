import React, { useEffect, useRef, useState } from 'react'
import { BlendBorderHeading } from '../../BlendBorderHeading'
import { InfoBtn } from '../../InfoBtn'
import { useRive } from '@rive-app/react-canvas'

export const TokenizerComp = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeAnim, setActiveAnim] = useState('CLOSED VERSION')

    const { RiveComponent, rive } = useRive({
        src: '/design_system_website_V4.riv',
        animations: activeAnim,
        autoplay: true,
    })

    useEffect(() => {
        if (!containerRef.current) return

        let isVisible = false

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
            },
            { threshold: 0.3 }
        )

        observer.observe(containerRef.current)

        const handleScroll = () => {
            if (!isVisible || !containerRef.current) return

            const rect = containerRef.current.getBoundingClientRect()
            const windowHeight = window.innerHeight

            // calculate scroll percentage (0 → 1)
            const scrollProgress = Math.min(
                Math.max(
                    0,
                    (windowHeight - rect.top) / (rect.height + windowHeight)
                ),
                1
            )

            // map progress to animations
            if (scrollProgress < 0.15) {
                setActiveAnim('CLOSED VERSION')
            } else if (scrollProgress < 0.3) {
                setActiveAnim('open version')
            } else if (scrollProgress < 0.45) {
                setActiveAnim('card 1')
            } else if (scrollProgress < 0.6) {
                setActiveAnim('card 2')
            } else if (scrollProgress < 0.75) {
                // Play card 3 first
                setActiveAnim('card 3')

                // then trigger LOOP + COLOURED VERSION after delays
                setTimeout(() => rive?.play('LOOP'), 1000)
                setTimeout(() => rive?.play('COLOURED VERSION'), 2000)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [rive])

    // Play when activeAnim changes
    useEffect(() => {
        if (rive && activeAnim) {
            rive.play(activeAnim)
        }
    }, [rive, activeAnim])

    return (
        <div
            ref={containerRef}
            className="lg:mt-50 mt-25 flex flex-col items-center"
            style={{ height: '2000px' }}
        >
            <BlendBorderHeading text="Tokenizer" />
            <div className="mt-25 text-[var(--intro-text-color)] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg sm:text-xs text-[length:var(--text-xxs)] font-light text-center opacity-80">
                <p>
                    The Tokeniser lets you apply your brand’s styles—like
                    colors, fonts, and spacing—
                </p>
                <p>across our app effortlessly.</p>
            </div>
            <div className="w-full flex flex-col">
                <div
                    style={{
                        position: 'sticky',
                        top: 100,
                        width: '100%',
                        height: 600, // increased size
                    }}
                >
                    <RiveComponent style={{ width: '100%', height: '100%' }} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <InfoBtn
                    text="Learn more"
                    href="https://juspay.design/blog/theme-provider-token-architecture/"
                />
            </div>
        </div>
    )
}
