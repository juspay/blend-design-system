'use client'

import React from 'react'
import { StatCard, StatCardVariant, ChangeType } from 'blend-v1'

interface MetricCardProps {
    title: string
    value: string | number
    subtitle?: string
    trend?: number
    icon: React.ReactNode
    color?: 'primary' | 'success' | 'warning' | 'error'
}

export function MetricCard({
    title,
    value,
    subtitle,
    trend,
    icon,
    color = 'primary',
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
