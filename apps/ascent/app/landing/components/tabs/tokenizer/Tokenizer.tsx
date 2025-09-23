import React, { RefObject, useEffect } from 'react'
import { BlendBorderHeading } from '../../BlendBorderHeading'
import { InfoBtn } from '../../InfoBtn'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

const STATE_MACHINE = 'State Machine 1' // must match Rive file
const SCROLL_INPUT = 'scroll' // must match input in Rive file

export const TokenizerComp = ({
    reference,
}: {
    reference: RefObject<HTMLDivElement | null>
}) => {
    const { RiveComponent, rive } = useRive({
        src: '/tokenizer2.riv',
        stateMachines: STATE_MACHINE,
        autoplay: true,
    })

    const scrollInput = useStateMachineInput(rive, STATE_MACHINE, SCROLL_INPUT)

    useEffect(() => {
        if (!reference.current) return

        let isVisible = false

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
            },
            { threshold: 0.3 }
        )

        observer.observe(reference.current)

        const handleScroll = () => {
            if (!isVisible || !reference.current || !scrollInput) return

            const rect = reference.current.getBoundingClientRect()
            const windowHeight = window.innerHeight

            const progress = Math.min(
                Math.max(
                    0,
                    (windowHeight - rect.top) / (rect.height + windowHeight)
                ),
                1
            )

            scrollInput.value = progress * 100
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [scrollInput, reference])

    return (
        <div className="lg:mt-50 mt-25 flex flex-col items-center relative">
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
                        width: '100%',
                        top: '150px',
                        height: '800px',
                        zIndex: 10,
                    }}
                >
                    <RiveComponent style={{ width: '100%', height: '100%' }} />
                </div>
                {/* Add spacer to ensure container has enough height for scrolling */}
                <div style={{ height: '100vh' }} />
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
