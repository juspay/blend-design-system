'use client'

import { TelemetryProvider } from '@juspay/blend-design-system'
import { ReactNode } from 'react'

interface TelemetryWrapperProps {
    children: ReactNode
}

export default function TelemetryWrapper({ children }: TelemetryWrapperProps) {
    return (
        <TelemetryProvider config={{ debug: true }}>
            {children}
        </TelemetryProvider>
    )
}
