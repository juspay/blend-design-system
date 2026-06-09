import { useCallback, useEffect, useState } from 'react'
import {
    googleFontToAdded,
    readAddedSystemFonts,
    writeAddedSystemFonts,
    type AddedSystemFont,
} from '@/lib/added-system-fonts'
import type { GoogleFontFamily } from '@/lib/google-fonts'

export function useAddedSystemFonts(scopeId: string) {
    const [addedFonts, setAddedFonts] = useState<AddedSystemFont[]>(() =>
        readAddedSystemFonts(scopeId)
    )

    useEffect(() => {
        setAddedFonts(readAddedSystemFonts(scopeId))
    }, [scopeId])

    const addFont = useCallback(
        (font: GoogleFontFamily | AddedSystemFont) => {
            const entry = 'styles' in font ? googleFontToAdded(font) : font

            setAddedFonts((prev) => {
                const exists = prev.some(
                    (f) => f.family.toLowerCase() === entry.family.toLowerCase()
                )
                const next = exists
                    ? prev.map((f) =>
                          f.family.toLowerCase() === entry.family.toLowerCase()
                              ? entry
                              : f
                      )
                    : [...prev, entry]
                writeAddedSystemFonts(scopeId, next)
                return next
            })
        },
        [scopeId]
    )

    const removeFont = useCallback(
        (family: string) => {
            setAddedFonts((prev) => {
                const next = prev.filter(
                    (f) => f.family.toLowerCase() !== family.toLowerCase()
                )
                writeAddedSystemFonts(scopeId, next)
                return next
            })
        },
        [scopeId]
    )

    const isAdded = useCallback(
        (family: string) =>
            addedFonts.some(
                (f) => f.family.toLowerCase() === family.toLowerCase()
            ),
        [addedFonts]
    )

    return { addedFonts, addFont, removeFont, isAdded }
}
