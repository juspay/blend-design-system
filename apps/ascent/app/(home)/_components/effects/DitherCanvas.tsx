'use client'

import { useRef, useEffect } from 'react'

interface DitherCanvasProps {
    className?: string
}

export default function DitherCanvas({ className = '' }: DitherCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const container = canvas.parentElement
        if (!container) return

        let w = container.clientWidth
        let h = container.clientHeight
        const dpr = window.devicePixelRatio || 1

        function resize() {
            if (!container || !canvas || !ctx) return
            w = container.clientWidth
            h = container.clientHeight

            if (w === 0 || h === 0) return

            canvas.width = w * dpr
            canvas.height = h * dpr
            canvas.style.width = w + 'px'
            canvas.style.height = h + 'px'
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }

        resize()

        // Use ResizeObserver for better container size tracking
        const resizeObserver = new ResizeObserver(() => {
            resize()
        })
        resizeObserver.observe(container)

        window.addEventListener('resize', resize)

        const mouse = { x: -9999, y: -9999 }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect()
            mouse.x = e.clientX - rect.left
            mouse.y = e.clientY - rect.top
        }

        window.addEventListener('mousemove', handleMouseMove)

        const spacing = 16
        let animationFrameId: number

        function render() {
            if (w === 0 || h === 0 || !ctx) {
                animationFrameId = requestAnimationFrame(render)
                return
            }

            ctx.clearRect(0, 0, w, h)

            for (let x = 0; x < w; x += spacing) {
                for (let y = 0; y < h; y += spacing) {
                    const d = Math.hypot(mouse.x - x, mouse.y - y)

                    const intensity = Math.max(0, 1 - d / 180)

                    const alpha = 0.15 + intensity * 0.6
                    const r = 0.7 + intensity * 1.6

                    ctx.fillStyle = `rgba(30, 30, 30, ${alpha})`

                    ctx.beginPath()
                    ctx.arc(x, y, r, 0, Math.PI * 2)
                    ctx.fill()
                }
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', handleMouseMove)
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            aria-hidden="true"
        />
    )
}
