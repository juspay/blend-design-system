import { showcaseData } from '@/lib/showcase-data'

//Constants
export const CARD_WIDTH = 420
export const CARD_HEIGHT = 280
export const GRID_SPACING_X = 485
export const GRID_SPACING_Y = 340
export const BUFFER_SIZE = 3
export const DRAG_THRESHOLD = 6
export const FRICTION = 0.92
export const MIN_VELOCITY = 0.3
export const VELOCITY_HISTORY_SIZE = 5
export const UPDATE_INTERVAL = 16

//Types
export interface GradientCard {
    id: string
    x: number
    y: number
    title: string
    image: string
    description: string
    itemId?: string
    isWelcome?: boolean
}

//Functions
export function getCardMeta(gx: number, gy: number) {
    const a = gx >= 0 ? 2 * gx : -2 * gx - 1
    const b = gy >= 0 ? 2 * gy : -2 * gy - 1
    let h = ((a + b) * (a + b + 1)) / 2 + b
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b)
    h = h ^ (h >>> 16)

    const idx = Math.abs(h) % showcaseData.length
    const item = showcaseData[idx]

    return {
        id: item.id,
        image: item.image,
        title: item.title,
        description: item.description,
    }
}

export function computeVisibleCards(
    panX: number,
    panY: number,
    viewW: number,
    viewH: number,
    zoom: number = 1
): GradientCard[] {
    const cards: GradientCard[] = []

    // Convert viewport bounds to world space
    const worldW = viewW / zoom
    const worldH = viewH / zoom
    const worldOffX = -panX / zoom
    const worldOffY = -panY / zoom

    const startX =
        Math.floor((worldOffX - CARD_WIDTH) / GRID_SPACING_X) - BUFFER_SIZE
    const startY =
        Math.floor((worldOffY - CARD_HEIGHT) / GRID_SPACING_Y) - BUFFER_SIZE
    const endX = Math.ceil((worldOffX + worldW) / GRID_SPACING_X) + BUFFER_SIZE
    const endY = Math.ceil((worldOffY + worldH) / GRID_SPACING_Y) + BUFFER_SIZE

    for (let gx = startX; gx <= endX; gx++) {
        for (let gy = startY; gy <= endY; gy++) {
            if (gx === 0 && gy === 0) {
                cards.push({
                    id: 'welcome-slot',
                    x: 0,
                    y: 0,
                    image: '',
                    title: '',
                    description: '',
                    isWelcome: true,
                })
                continue
            }

            const { id, image, title, description } = getCardMeta(gx, gy)
            cards.push({
                id: `card-${gx}-${gy}`,
                x: gx * GRID_SPACING_X,
                y: gy * GRID_SPACING_Y,
                image,
                title,
                description,
                itemId: id,
            })
        }
    }
    return cards
}

export function smoothVelocity(history: { x: number; y: number }[]): {
    x: number
    y: number
} {
    let totalWeight = 0
    const sum = history.reduce(
        (acc, v, i) => {
            const w = Math.pow(2, i)
            totalWeight += w
            return { x: acc.x + v.x * w, y: acc.y + v.y * w }
        },
        { x: 0, y: 0 }
    )
    return { x: sum.x / totalWeight, y: sum.y / totalWeight }
}
