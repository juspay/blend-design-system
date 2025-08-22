'use client'

import React from 'react'
import {
    StatCard,
    StatCardVariant,
    ChangeType,
} from '@juspay/blend-design-system'

interface MetricCardProps {
    title: string
    value: string | number
    subtitle?: string
    trend?: number
    icon: React.ReactNode
}

export function MetricCard({
    title,
    value,
    subtitle,
    trend,
    icon,
}: MetricCardProps) {
    // Convert trend to StatCard format
    const change =
        trend !== undefined
            ? {
                  value: Math.abs(trend),
                  type: trend > 0 ? ChangeType.INCREASE : ChangeType.DECREASE,
              }
            : undefined

    return (
        <StatCard
            title={title}
            value={value}
            subtitle={subtitle}
            change={change}
            variant={StatCardVariant.NUMBER}
            titleIcon={icon}
        />
    )
}
