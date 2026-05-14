'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { showcaseData } from '@/lib/showcase-data'
import SearchBar from './SearchBar'

interface GradientCard {
    id: string
    x: number
    y: number
    title: string
    image: string
    description: string
}

const CARD_WIDTH = 420
const CARD_HEIGHT = 280
const GRID_SPACING_X = 485
const GRID_SPACING_Y = 340
const BUFFER_SIZE = 2
const DRAG_THRESHOLD = 6
const FRICTION = 0.92
const MIN_VELOCITY = 0.3
// Doc 1 additions
const VELOCITY_HISTORY_SIZE = 5
const UPDATE_INTERVAL = 16 // ms — baseline frame time for velocity scaling

function getCardMeta(gx: number, gy: number) {
    const a = gx >= 0 ? 2 * gx : -2 * gx - 1
    const b = gy >= 0 ? 2 * gy : -2 * gy - 1
    let h = ((a + b) * (a + b + 1)) / 2 + b
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
    h = h ^ (h >>> 16)

    const idx = Math.abs(h) % showcaseData.length
    const item = showcaseData[idx]

    return {
        image: item.image,
        title: item.title,
        description: item.description,
    }
}

function computeVisibleCards(
    panX: number,
    panY: number,
    viewW: number,
    viewH: number
): GradientCard[] {
    const cards: GradientCard[] = []
    const startX =
        Math.floor((-panX - CARD_WIDTH) / GRID_SPACING_X) - BUFFER_SIZE
    const startY =
        Math.floor((-panY - CARD_HEIGHT) / GRID_SPACING_Y) - BUFFER_SIZE
    const endX = Math.ceil((viewW - panX) / GRID_SPACING_X) + BUFFER_SIZE
    const endY = Math.ceil((viewH - panY) / GRID_SPACING_Y) + BUFFER_SIZE

    for (let gx = startX; gx <= endX; gx++) {
        for (let gy = startY; gy <= endY; gy++) {
            const { image, title, description } = getCardMeta(gx, gy)
            cards.push({
                id: `card-${gx}-${gy}`,
                x: gx * GRID_SPACING_X,
                y: gy * GRID_SPACING_Y,
                image,
                title,
                description,
            })
        }
    }
    return cards
}

// ─── Doc 1: exponential recency-weighted velocity smoothing ───────────────────
function smoothVelocity(history: { x: number; y: number }[]): {
    x: number
    y: number
} {
    let totalWeight = 0
    const sum = history.reduce(
        (acc, v, i) => {
            const w = Math.pow(2, i) // 1, 2, 4, 8, 16 — most recent gets highest weight
            totalWeight += w
            return { x: acc.x + v.x * w, y: acc.y + v.y * w }
        },
        { x: 0, y: 0 }
    )
    return { x: sum.x / totalWeight, y: sum.y / totalWeight }
}

export default function Showcase() {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const worldRef = useRef<HTMLDivElement>(null)

    const panRef = useRef({ x: 0, y: 0 })
    const isDraggingRef = useRef(false)
    const dragOriginRef = useRef({ x: 0, y: 0 })
    const dragDistanceRef = useRef(0)
    const hasDraggedRef = useRef(false)

    const velocityRef = useRef({ x: 0, y: 0 })
    const lastPointerRef = useRef({ x: 0, y: 0, t: 0 })
    const inertiaRafRef = useRef<number | null>(null)

    // Doc 1: velocity history for smoothing
    const velHistoryRef = useRef<{ x: number; y: number }[]>([])
    // Doc 1: track last move time to detect stale velocity on pointer-up
    const lastMoveTimeRef = useRef(0)

    const rafPendingRef = useRef(false)
    const pendingPanRef = useRef({ x: 0, y: 0 })

    const [cards, setCards] = useState<GradientCard[]>([])
    const viewSizeRef = useRef({ w: 0, h: 0 })
    const lastRegionRef = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 })

    const applyTransform = useCallback((x: number, y: number) => {
        if (worldRef.current) {
            worldRef.current.style.transform = `translate3d(${x}px,${y}px,0)`
        }
    }, [])

    const syncCards = useCallback((panX: number, panY: number) => {
        const { w, h } = viewSizeRef.current
        if (w === 0) return

        const startX =
            Math.floor((-panX - CARD_WIDTH) / GRID_SPACING_X) - BUFFER_SIZE
        const startY =
            Math.floor((-panY - CARD_HEIGHT) / GRID_SPACING_Y) - BUFFER_SIZE
        const endX = Math.ceil((w - panX) / GRID_SPACING_X) + BUFFER_SIZE
        const endY = Math.ceil((h - panY) / GRID_SPACING_Y) + BUFFER_SIZE

        const r = lastRegionRef.current
        if (
            startX === r.startX &&
            startY === r.startY &&
            endX === r.endX &&
            endY === r.endY
        )
            return

        lastRegionRef.current = { startX, startY, endX, endY }
        setCards(computeVisibleCards(panX, panY, w, h))
    }, [])

    const stopInertia = useCallback(() => {
        if (inertiaRafRef.current !== null) {
            cancelAnimationFrame(inertiaRafRef.current)
            inertiaRafRef.current = null
        }
    }, [])

    const startInertia = useCallback(() => {
        stopInertia()
        // Doc 1: track time for frame-rate-independent friction
        let lastTime = performance.now()

        const step = (now: number) => {
            const dt = Math.min(now - lastTime, 64) // cap to avoid huge jump on tab restore
            lastTime = now

            const vx = velocityRef.current.x
            const vy = velocityRef.current.y

            if (Math.abs(vx) < MIN_VELOCITY && Math.abs(vy) < MIN_VELOCITY) {
                velocityRef.current = { x: 0, y: 0 }
                inertiaRafRef.current = null
                return
            }

            // Doc 1: time-based friction so feel is identical at 30fps and 120fps
            const decay = Math.pow(FRICTION, dt / UPDATE_INTERVAL)
            const scale = dt / UPDATE_INTERVAL

            const nx = panRef.current.x + vx * scale
            const ny = panRef.current.y + vy * scale
            panRef.current = { x: nx, y: ny }
            velocityRef.current = { x: vx * decay, y: vy * decay }

            applyTransform(nx, ny)
            syncCards(nx, ny)

            inertiaRafRef.current = requestAnimationFrame(step)
        }
        inertiaRafRef.current = requestAnimationFrame(step)
    }, [applyTransform, syncCards, stopInertia])

    const scheduleDOMUpdate = useCallback(() => {
        if (rafPendingRef.current) return
        rafPendingRef.current = true
        requestAnimationFrame(() => {
            rafPendingRef.current = false
            const { x, y } = pendingPanRef.current
            applyTransform(x, y)
            syncCards(x, y)
        })
    }, [applyTransform, syncCards])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const update = () => {
            viewSizeRef.current = { w: el.clientWidth, h: el.clientHeight }
            syncCards(panRef.current.x, panRef.current.y)
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [syncCards])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            stopInertia()
            const nx = panRef.current.x - e.deltaX
            const ny = panRef.current.y - e.deltaY
            panRef.current = { x: nx, y: ny }
            applyTransform(nx, ny)
            syncCards(nx, ny)
        }
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [applyTransform, syncCards, stopInertia])

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            if (!isDraggingRef.current || !e.isPrimary) return

            const nx = e.clientX - dragOriginRef.current.x
            const ny = e.clientY - dragOriginRef.current.y

            dragDistanceRef.current +=
                Math.abs(nx - panRef.current.x) +
                Math.abs(ny - panRef.current.y)
            if (dragDistanceRef.current > DRAG_THRESHOLD)
                hasDraggedRef.current = true

            const now = performance.now()
            const dt = Math.max(1, now - lastPointerRef.current.t)

            // Doc 1: accumulate per-frame velocity into history, then smooth
            const rawVel = {
                x: (e.clientX - lastPointerRef.current.x) / dt,
                y: (e.clientY - lastPointerRef.current.y) / dt,
            }
            const history = velHistoryRef.current
            history.push(rawVel)
            if (history.length > VELOCITY_HISTORY_SIZE) history.shift()
            velocityRef.current = smoothVelocity(history)

            lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now }
            lastMoveTimeRef.current = now // Doc 1: track for stale-velocity check

            panRef.current = { x: nx, y: ny }
            pendingPanRef.current = { x: nx, y: ny }
            scheduleDOMUpdate()
        }

        const onUp = (e: PointerEvent) => {
            if (!e.isPrimary) return
            if (!isDraggingRef.current) return
            isDraggingRef.current = false

            if (hasDraggedRef.current) {
                // Doc 1: if finger rested before lifting, discard velocity so grid doesn't drift
                const staleness = performance.now() - lastMoveTimeRef.current
                if (staleness > 100) {
                    velocityRef.current = { x: 0, y: 0 }
                } else {
                    // Scale px/ms → px/frame
                    velocityRef.current = {
                        x: velocityRef.current.x * UPDATE_INTERVAL,
                        y: velocityRef.current.y * UPDATE_INTERVAL,
                    }
                }
                startInertia()
            }

            setTimeout(() => {
                hasDraggedRef.current = false
                dragDistanceRef.current = 0
            }, 0)
        }

        window.addEventListener('pointermove', onMove)
        window.addEventListener('pointerup', onUp)
        return () => {
            window.removeEventListener('pointermove', onMove)
            window.removeEventListener('pointerup', onUp)
        }
    }, [scheduleDOMUpdate, startInertia])

    const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!e.isPrimary) return
            stopInertia()
            velocityRef.current = { x: 0, y: 0 }
            velHistoryRef.current = [] // Doc 1: reset history on new drag
            isDraggingRef.current = true
            hasDraggedRef.current = false
            dragDistanceRef.current = 0
            dragOriginRef.current = {
                x: e.clientX - panRef.current.x,
                y: e.clientY - panRef.current.y,
            }
            lastPointerRef.current = {
                x: e.clientX,
                y: e.clientY,
                t: performance.now(),
            }
            lastMoveTimeRef.current = performance.now() // Doc 1
        },
        [stopInertia]
    )

    const handleCardClick = useCallback(
        (card: GradientCard) => {
            if (hasDraggedRef.current) return
            router.push(
                `/showcase/detail?id=${encodeURIComponent(card.id)}&title=${encodeURIComponent(card.title)}`
            )
        },
        [router]
    )

    return (
        <main
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'none' }}
            onPointerDown={onPointerDown}
        >
            <div
                ref={worldRef}
                className="absolute top-0 left-0"
                style={{
                    transform: 'translate3d(0px,0px,0)',
                    willChange: 'transform',
                }}
            >
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onClick={() => handleCardClick(card)}
                        style={{
                            position: 'absolute',
                            left: card.x,
                            top: card.y,
                            width: CARD_WIDTH,
                            height: CARD_HEIGHT,
                            cursor: 'pointer',
                        }}
                    >
                        <div className="relative w-full h-full group hover:scale-110 duration-75 hover:shadow-lg transition-all ease-out overflow-hidden border border-border/60">
                            {/* Gradient fallback shown while image loads */}
                            <div className="absolute inset-0 bg-muted bg-[linear-gradient(90deg,transparent_0%,hsl(var(--muted-foreground)/0.08)_50%,transparent_100%)] bg-size-[200%_100%] animate-[skeleton-shimmer_1.6s_ease-in-out_infinite]" />
                            {/* Actual image */}
                            <img
                                src={card.image}
                                alt={card.title}
                                loading="lazy"
                                draggable={false}
                                className="absolute inset-0 w-full h-full object-cover"
                                onError={(e) => {
                                    ;(
                                        e.target as HTMLImageElement
                                    ).style.display = 'none'
                                }}
                            />
                            {/* Title overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-white via-white/40 to-transparent dark:from-black/70 dark:via-black/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2.5">
                                <p className="text-primary font-medium text-xs leading-snug font-manrope">
                                    {card.title}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Search Bar */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <SearchBar />
            </div>
        </main>
    )
}
