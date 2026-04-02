'use client'
import React from 'react'
import { useEffect, useState } from 'react'

const DynamicSnackbar = () => {
    const [BlendLib, setBlendLib] = useState<{
        Snackbar: React.ComponentType
    } | null>(null)

    useEffect(() => {
        import('@juspay/blend-design-system').then((mod) => {
            setBlendLib({ Snackbar: mod.Snackbar })
        })
    }, [])

    if (!BlendLib) return null
    const { Snackbar } = BlendLib
    return <Snackbar />
}

export default DynamicSnackbar
