
import React, { RefObject, useEffect, useRef } from 'react'
import { BlendBorderHeading } from '../../BlendBorderHeading'
import { InfoBtn } from '../../InfoBtn'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'
const STATE_MACHINE = 'State Machine 1'
const SCROLL_INPUT = 'Number 1'
export const TokenizerComp = ({
    reference,
}: {
    reference: RefObject<HTMLDivElement | null>
}) => {
    const { RiveComponent, rive } = useRive({
        src: '/newscrolling.riv',
        stateMachines: STATE_MACHINE,
        autoplay: true,
    })
    const scrollInput = useStateMachineInput(rive, STATE_MACHINE, SCROLL_INPUT)
    const containerRef = useRef<HTMLDivElement | null>(null)
    const rafIdRef = useRef<number | null>(null)
    const [isVisible, setIsVisible] = React.useState(false)
    // Intersection Observer
    useEffect(() => {
        if (!containerRef.current) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )
        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])
    // Scroll handler
    useEffect(() => {
        if (!scrollInput || !containerRef.current) return
        const stickyTop = 0
        const stickyHeight = 800
        const extraStickyScroll = 400 // Extra scroll distance to keep component sticky after animation completes
        const update = () => {
            rafIdRef.current = null
            if (!containerRef.current || !scrollInput) return
            const rect = containerRef.current.getBoundingClientRect()
            // Distance scrolled into the container after it hits stickyTop
            const startOffset = 300 // adjust this based on how early you want
            const scrolledInto = Math.max(0, stickyTop - rect.top + startOffset)
            const animationDistance = Math.max(1, rect.height - stickyHeight - extraStickyScroll)
            const progress = Math.max(0, Math.min(1, scrolledInto / animationDistance))
            const mappedValue = Math.round(progress * 100)
            scrollInput.value = mappedValue
        }
        const onScroll = () => {
            if (rafIdRef.current != null) return
            rafIdRef.current = window.requestAnimationFrame(update)
        }
        window.addEventListener('scroll', onScroll, { passive: true })
        update() // Initial sync
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafIdRef.current != null) {
                window.cancelAnimationFrame(rafIdRef.current)
            }
        }
    }, [scrollInput])
    return (
        <div
            className="lg:mt-50 mt-25 flex flex-col items-center relative"
            ref={reference}
        >
            <div style={{ position: 'relative', zIndex: 20, backgroundColor: 'var(--background-color, #000)' }}>
                <BlendBorderHeading text="Tokenizer" />
            </div>
            <div className="w-full flex flex-col" ref={containerRef}>
              <div className="mt-25 text-[var(--intro-text-color)] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg sm:text-xs text-[length:var(--text-xxs)] font-light text-center opacity-80" style={{ position: 'relative', zIndex: 20, backgroundColor: 'var(--background-color, #000)' }}>
                <p>
                    The Tokeniser lets you apply your brand's styles—like
                    colors, fonts, and spacing—
                </p>
                <p>across our app effortlessly.</p>
            </div>
                <div
                    style={{
                        position: 'sticky',
                        width: '100%',
                        top: 'calc(50vh - 400px)', // Center the 800px height component
                        height: '800px',
                        zIndex: 10,
                        marginTop: '-200px', // Pull it up behind the text
                    }}
                >
                    <RiveComponent style={{ width: '100%', height: '100%', outline: '0px solid red' }} />
                </div>
                {/* Spacer for scroll distance that drives the animation (no visible gap above) */}
                <div style={{ height: '150vh' }} />
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