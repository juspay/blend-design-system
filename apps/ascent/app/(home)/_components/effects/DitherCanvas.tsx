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

            for (let x = spacing / 2; x < w; x += spacing) {
                for (let y = spacing / 2; y < h; y += spacing) {
                    const dx = mouse.x - x
                    const dy = mouse.y - y
                    const d = Math.sqrt(dx * dx + dy * dy)

                    const spread = 140
                    const intensity = Math.max(0, 1 - d / spread)

                    const alpha = 0.25 + intensity * 0.55
                    const r = 0.9 + Math.pow(intensity, 1.5) * 0.9

                    ctx.fillStyle = `rgba(50, 50, 50, ${alpha})`

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
