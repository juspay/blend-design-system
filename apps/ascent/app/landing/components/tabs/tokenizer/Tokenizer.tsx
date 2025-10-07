import React, { RefObject, useEffect, useRef } from 'react'
import { BlendBorderHeading } from '../../BlendBorderHeading'
import { InfoBtn } from '../../InfoBtn'
import { useRive, useStateMachineInput } from '@rive-app/react-canvas'

const STATE_MACHINE = 'State Machine 1'
const SCROLL_INPUT = 'Number 1'

export const TokenizerComp = ({ reference }: { reference: RefObject<HTMLDivElement | null> }) => {
  const { RiveComponent, rive } = useRive({
    src: '/trial5_on_scroll_hero_animation.riv',
    stateMachines: STATE_MACHINE,
    autoplay: true,
  })
  
  const scrollInput = useStateMachineInput(rive, STATE_MACHINE, SCROLL_INPUT)
  const containerRef = useRef<HTMLDivElement | null>(null)
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

    const handleScroll = () => {
      if (!containerRef.current || !scrollInput) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const stickyTop = 150 // Match your sticky top value
      const stickyBottom = 150 // Match your sticky top value
      const stickyHeight = 800
      const bufferBefore = window.innerHeight * 0.1 // 10vh converted to pixels
      const bufferAfter = window.innerHeight * 0.3
      
      // Calculate progress with buffer zones
      let progress = 0
      
      const animationStartPoint = stickyTop - bufferBefore
      const animationEndPoint = stickyTop + stickyHeight - rect.height + bufferAfter + stickyBottom
      
      if (rect.top >= stickyTop) {
        // Before reaching sticky position - stay at 0
        progress = 0
      } else {
        // Calculate how far we are from the buffer start
        const scrolled = stickyTop - rect.top - bufferBefore
        const totalAnimationDistance = rect.height - stickyHeight - bufferBefore - bufferAfter
        
        if (scrolled <= 0) {
          // Still in the "before" buffer zone - hold at 0
          progress = 0
        } else if (scrolled >= totalAnimationDistance) {
          // Past the animation + in "after" buffer zone - hold at 100
          progress = 1
        } else {
          // Actively animating
          progress = scrolled / totalAnimationDistance
        }
      }
      
      const mappedValue = Math.round(Math.max(0, Math.min(100, progress * 100)))
      scrollInput.value = mappedValue
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollInput])

  return (
    <div 
      className="lg:mt-50 mt-25 flex flex-col items-center relative" 
      ref={reference}
    >
      <BlendBorderHeading text="Tokenizer" />
      <div className="mt-25 text-[var(--intro-text-color)] 2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg sm:text-xs text-[length:var(--text-xxs)] font-light text-center opacity-80">
        <p>
          The Tokeniser lets you apply your brand's styles—like colors, fonts, and spacing—
        </p>
        <p>across our app effortlessly.</p>
      </div>
      
      <div className="w-full flex flex-col" ref={containerRef}>
        {/* Buffer space before animation starts - holds at 0 */}
        <div style={{ height: '10vh' }} />
        
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
        
        {/* Spacer for scroll - this creates the scroll distance */}
        <div style={{ height: '300vh' }} />
        
        {/* Buffer space after animation - holds at 100 */}
        <div style={{ height: '30vh' }} />
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