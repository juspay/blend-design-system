'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { showcaseData } from '@/lib/showcase-data'
import { CardTile } from './CardTile'
import { WelcomeCard } from './WelcomeCard'
import {
    CARD_WIDTH,
    CARD_HEIGHT,
    GRID_SPACING_X,
    GRID_SPACING_Y,
    BUFFER_SIZE,
    DRAG_THRESHOLD,
    FRICTION,
    MIN_VELOCITY,
    VELOCITY_HISTORY_SIZE,
    UPDATE_INTERVAL,
    type GradientCard,
    computeVisibleCards,
    smoothVelocity,
} from '@/lib/canvas-utils.ts '

//  Zoom constants
const MIN_ZOOM = 1
const MAX_ZOOM = 2.0
const ZOOM_WHEEL_FACTOR = 0.001 // per pixel of deltaY when Ctrl held
const ZOOM_PINCH_FACTOR = 0.01 // per unit of pinch-delta

interface DesktopShowcaseProps {
    query: string
    category?: string | null
    children: React.ReactNode
}

export function DesktopShowcase({
    query,
    category,
    children,
}: DesktopShowcaseProps) {
    const router = useRouter()
    const containerRef = useRef<HTMLDivElement>(null)
    const worldRef = useRef<HTMLDivElement>(null)

    const panRef = useRef({ x: 0, y: 0 })
    const zoomRef = useRef(1)

    const isDraggingRef = useRef(false)
    const dragOriginRef = useRef({ x: 0, y: 0 })
    const dragDistanceRef = useRef(0)
    const hasDraggedRef = useRef(false)

    const velocityRef = useRef({ x: 0, y: 0 })
    const lastPointerRef = useRef({ x: 0, y: 0, t: 0 })
    const inertiaRafRef = useRef<number | null>(null)

    const velHistoryRef = useRef<{ x: number; y: number }[]>([])
    const lastMoveTimeRef = useRef(0)

    const rafPendingRef = useRef(false)
    const pendingPanRef = useRef({ x: 0, y: 0 })

    const [cards, setCards] = useState<GradientCard[]>([])
    const viewSizeRef = useRef({ w: 0, h: 0 })
    const lastRegionRef = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 })

    // Pinch tracking
    const pinchActiveRef = useRef(false)
    const pinchLastDistRef = useRef(0)
    const pinchMidpointRef = useRef({ x: 0, y: 0 })

    // Apply combined transform
    const applyTransform = useCallback((x: number, y: number, z?: number) => {
        if (worldRef.current) {
            const scale = z ?? zoomRef.current
            worldRef.current.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`
            worldRef.current.style.transformOrigin = '0 0'
        }
    }, [])

    // ─── Zoom helper: zoom toward a viewport point ───────────────────────────
    const applyZoom = useCallback(
        (newZoom: number, originX: number, originY: number) => {
            newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, newZoom))
            const oldZoom = zoomRef.current

            // Adjust pan so the point under the cursor stays fixed
            const panX = panRef.current.x
            const panY = panRef.current.y

            // world-space point under cursor: (originX - panX) / oldZoom
            // after zoom: panX' = originX - worldPt * newZoom
            const worldPtX = (originX - panX) / oldZoom
            const worldPtY = (originY - panY) / oldZoom

            const newPanX = originX - worldPtX * newZoom
            const newPanY = originY - worldPtY * newZoom

            zoomRef.current = newZoom
            panRef.current = { x: newPanX, y: newPanY }
            pendingPanRef.current = { x: newPanX, y: newPanY }

            applyTransform(newPanX, newPanY, newZoom)
        },
        [applyTransform]
    )

    // Relevance-ranked matches
    const rankedCards = useMemo(() => {
        if (!query && !category) return null
        const q = query.toLowerCase()
        return showcaseData
            .filter((item) => {
                const matchesQuery =
                    !query ||
                    item.title.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q)
                const matchesCategory = !category || item.category === category
                return matchesQuery && matchesCategory
            })
            .map((item) => {
                const score =
                    item.title.toLowerCase() === q
                        ? 4
                        : item.title.toLowerCase().startsWith(q)
                          ? 3
                          : item.title.toLowerCase().includes(q)
                            ? 2
                            : 1
                return { ...item, score }
            })
            .sort((a, b) => b.score - a.score)
    }, [query, category])

    // Snap to center when query becomes active
    useEffect(() => {
        const { w, h } = viewSizeRef.current
        if (query || category) {
            const cx = Math.round(w / 2)
            const cy = Math.round(h / 2 - 80)
            panRef.current = { x: cx, y: cy }
            pendingPanRef.current = { x: cx, y: cy }
            applyTransform(cx, cy)
        } else {
            const VERTICAL_OFFSET = 80
            const initX = Math.round(w / 2 - CARD_WIDTH / 2)
            const initY = Math.round(h / 2 - CARD_HEIGHT / 2 - VERTICAL_OFFSET)
            panRef.current = { x: initX, y: initY }
            pendingPanRef.current = { x: initX, y: initY }
            applyTransform(initX, initY)
            syncCards(initX, initY)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- applyTransform and syncCards are stable callbacks; syncCards is declared below this effect
    }, [query, category])

    const syncCards = useCallback((panX: number, panY: number) => {
        const { w, h } = viewSizeRef.current
        if (w === 0) return

        const z = zoomRef.current

        // Convert viewport bounds to world space accounting for zoom
        const worldW = w / z
        const worldH = h / z
        const worldOffX = -panX / z
        const worldOffY = -panY / z

        const startX =
            Math.floor((worldOffX - CARD_WIDTH) / GRID_SPACING_X) - BUFFER_SIZE
        const startY =
            Math.floor((worldOffY - CARD_HEIGHT) / GRID_SPACING_Y) - BUFFER_SIZE
        const endX =
            Math.ceil((worldOffX + worldW) / GRID_SPACING_X) + BUFFER_SIZE
        const endY =
            Math.ceil((worldOffY + worldH) / GRID_SPACING_Y) + BUFFER_SIZE

        const r = lastRegionRef.current
        if (
            startX === r.startX &&
            startY === r.startY &&
            endX === r.endX &&
            endY === r.endY
        )
            return

        lastRegionRef.current = { startX, startY, endX, endY }
        setCards(computeVisibleCards(panX, panY, w, h, zoomRef.current))
    }, [])

    const stopInertia = useCallback(() => {
        if (inertiaRafRef.current !== null) {
            cancelAnimationFrame(inertiaRafRef.current)
            inertiaRafRef.current = null
        }
    }, [])

    const startInertia = useCallback(() => {
        stopInertia()
        let lastTime = performance.now()

        const step = (now: number) => {
            const dt = Math.min(now - lastTime, 64)
            lastTime = now

            const vx = velocityRef.current.x
            const vy = velocityRef.current.y

            if (Math.abs(vx) < MIN_VELOCITY && Math.abs(vy) < MIN_VELOCITY) {
                velocityRef.current = { x: 0, y: 0 }
                inertiaRafRef.current = null
                return
            }

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

    //  Resize observer
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const update = () => {
            viewSizeRef.current = { w: el.clientWidth, h: el.clientHeight }

            if (panRef.current.x === 0 && panRef.current.y === 0) {
                const { w, h } = viewSizeRef.current
                const VERTICAL_OFFSET = 80
                const initX = Math.round(w / 2 - CARD_WIDTH / 2)
                const initY = Math.round(
                    h / 2 - CARD_HEIGHT / 2 - VERTICAL_OFFSET
                )
                panRef.current = { x: initX, y: initY }
                pendingPanRef.current = { x: initX, y: initY }
                applyTransform(initX, initY)
            }

            syncCards(panRef.current.x, panRef.current.y)
        }

        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
        stopInertia()
    }, [syncCards, applyTransform, stopInertia])

    // Wheel
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const onWheel = (e: WheelEvent) => {
            e.preventDefault()
            stopInertia()

            // Trackpad two-finger scroll has meaningful horizontal movement; mouse wheel doesn't
            const isTrackpadPan = e.deltaMode === 0 && Math.abs(e.deltaX) > 1

            if (isTrackpadPan) {
                // Trackpad two-finger scroll → pan
                const nx = panRef.current.x - e.deltaX
                const ny = panRef.current.y - e.deltaY
                panRef.current = { x: nx, y: ny }
                applyTransform(nx, ny)
                syncCards(nx, ny)
            } else {
                // Mouse wheel or trackpad pinch → zoom toward cursor
                const delta = -e.deltaY * ZOOM_WHEEL_FACTOR
                const rect = el.getBoundingClientRect()
                applyZoom(
                    zoomRef.current + delta * zoomRef.current,
                    e.clientX - rect.left,
                    e.clientY - rect.top
                )
            }
        }

        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [applyTransform, applyZoom, syncCards, stopInertia])

    // Pointer move / up
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

            const rawVel = {
                x: (e.clientX - lastPointerRef.current.x) / dt,
                y: (e.clientY - lastPointerRef.current.y) / dt,
            }
            const history = velHistoryRef.current
            history.push(rawVel)
            if (history.length > VELOCITY_HISTORY_SIZE) history.shift()
            velocityRef.current = smoothVelocity(history)

            lastPointerRef.current = { x: e.clientX, y: e.clientY, t: now }
            lastMoveTimeRef.current = now

            panRef.current = { x: nx, y: ny }
            pendingPanRef.current = { x: nx, y: ny }
            scheduleDOMUpdate()
        }

        const onUp = (e: PointerEvent) => {
            if (!e.isPrimary) return
            if (!isDraggingRef.current) return
            isDraggingRef.current = false

            if (hasDraggedRef.current) {
                const staleness = performance.now() - lastMoveTimeRef.current
                if (staleness > 100) {
                    velocityRef.current = { x: 0, y: 0 }
                } else {
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

    // Touch pinch-to-zoom
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const dist = (t: TouchList) => {
            const dx = t[0].clientX - t[1].clientX
            const dy = t[0].clientY - t[1].clientY
            return Math.hypot(dx, dy)
        }

        const mid = (t: TouchList) => ({
            x: (t[0].clientX + t[1].clientX) / 2,
            y: (t[0].clientY + t[1].clientY) / 2,
        })

        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 2) {
                pinchActiveRef.current = true
                pinchLastDistRef.current = dist(e.touches)
                const m = mid(e.touches)
                const rect = el.getBoundingClientRect()
                pinchMidpointRef.current = {
                    x: m.x - rect.left,
                    y: m.y - rect.top,
                }
            }
        }

        const onTouchMove = (e: TouchEvent) => {
            if (!pinchActiveRef.current || e.touches.length !== 2) return
            e.preventDefault()

            const d = dist(e.touches)
            const delta = d - pinchLastDistRef.current
            pinchLastDistRef.current = d

            applyZoom(
                zoomRef.current + delta * ZOOM_PINCH_FACTOR,
                pinchMidpointRef.current.x,
                pinchMidpointRef.current.y
            )
        }

        const onTouchEnd = () => {
            pinchActiveRef.current = false
        }

        el.addEventListener('touchstart', onTouchStart, { passive: false })
        el.addEventListener('touchmove', onTouchMove, { passive: false })
        el.addEventListener('touchend', onTouchEnd)
        return () => {
            el.removeEventListener('touchstart', onTouchStart)
            el.removeEventListener('touchmove', onTouchMove)
            el.removeEventListener('touchend', onTouchEnd)
        }
    }, [applyZoom])

    const onPointerDown = useCallback(
        (e: React.PointerEvent<HTMLDivElement>) => {
            if (!e.isPrimary) return
            stopInertia()
            velocityRef.current = { x: 0, y: 0 }
            velHistoryRef.current = []
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
            lastMoveTimeRef.current = performance.now()
        },
        [stopInertia]
    )

    const handleCardClick = useCallback(
        (card: GradientCard) => {
            if (hasDraggedRef.current) return
            if (card.isWelcome) return
            if (!card.itemId) return
            router.push(`/showcase/${encodeURIComponent(card.itemId)}`)
        },
        [router]
    )

    //  Filtered layout
    const filteredLayout = useMemo(() => {
        if (!rankedCards) return null
        const showWelcome = rankedCards.length !== 1
        const slots: { x: number; y: number }[] = []

        let gx = 0,
            gy = 0
        let dx = 0,
            dy = -1
        const needed = rankedCards.length + (showWelcome ? 1 : 0)
        const maxSteps = needed * needed + 4

        for (let i = 0; slots.length < needed && i < maxSteps; i++) {
            const isOrigin = gx === 0 && gy === 0
            if (!isOrigin || !showWelcome) {
                slots.push({
                    x: gx * GRID_SPACING_X,
                    y: gy * GRID_SPACING_Y,
                })
            }
            if (
                gx === gy ||
                (gx < 0 && gx === -gy) ||
                (gx > 0 && gx === 1 - gy)
            ) {
                const tmp = dx
                dx = -dy
                dy = tmp
            }
            gx += dx
            gy += dy
        }

        return { showWelcome, slots, items: rankedCards }
    }, [rankedCards])

    return (
        <main
            ref={containerRef}
            className="relative w-full h-screen overflow-hidden cursor-grab active:cursor-grabbing select-none bg-surface"
            style={{ touchAction: 'none' }}
            onPointerDown={onPointerDown}
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 bg-background/60 backdrop-blur-[2px]"
                style={{ opacity: query || category ? 1 : 0 }}
            />

            <div
                ref={worldRef}
                className="absolute top-0 left-0 z-20"
                style={{
                    transform: 'translate3d(0px,0px,0) scale(1)',
                    transformOrigin: '0 0',
                    willChange: 'transform',
                }}
            >
                {filteredLayout ? (
                    <>
                        {filteredLayout.showWelcome && (
                            <WelcomeCard
                                style={{
                                    position: 'absolute',
                                    left: -CARD_WIDTH / 2,
                                    top: -CARD_HEIGHT / 2,
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                }}
                                animatedLogo
                            />
                        )}

                        {filteredLayout.items.map((item, idx) => {
                            const slot = filteredLayout.slots[idx]
                            if (!slot) return null
                            return (
                                <CardTile
                                    key={item.id}
                                    image={item.image}
                                    title={item.title}
                                    variant="filtered"
                                    style={{
                                        left: slot.x - CARD_WIDTH / 2,
                                        top: slot.y - CARD_HEIGHT / 2,
                                        width: CARD_WIDTH,
                                        height: CARD_HEIGHT,
                                    }}
                                    onClick={() => {
                                        if (hasDraggedRef.current) return
                                        router.push(
                                            `/showcase/${encodeURIComponent(item.id)}`
                                        )
                                    }}
                                />
                            )
                        })}
                    </>
                ) : (
                    cards.map((card) => {
                        if (card.isWelcome) {
                            return (
                                <WelcomeCard
                                    key="welcome-slot"
                                    style={{
                                        position: 'absolute',
                                        left: card.x,
                                        top: card.y,
                                        width: CARD_WIDTH,
                                        height: CARD_HEIGHT,
                                    }}
                                />
                            )
                        }

                        return (
                            <CardTile
                                key={card.id}
                                image={card.image}
                                title={card.title}
                                style={{
                                    left: card.x,
                                    top: card.y,
                                    width: CARD_WIDTH,
                                    height: CARD_HEIGHT,
                                }}
                                onClick={() => handleCardClick(card)}
                            />
                        )
                    })
                )}
            </div>

            {/* Children */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                {children}
            </div>
        </main>
    )
}
