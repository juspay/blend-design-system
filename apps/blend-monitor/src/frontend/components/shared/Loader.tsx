'use client'

import React from 'react'
import { PulseLoader } from 'react-spinners'

interface LoaderProps {
    size?: 'small' | 'medium' | 'large'
    text?: string
    fullScreen?: boolean
}

export default function Loader({
    size = 'medium',
    text = 'Loading...',
    fullScreen = false,
}: LoaderProps) {
    const loaderSize = {
        small: 8,
        medium: 12,
        large: 16,
    }

    const textSize = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    }

    const content = (
        <div className="flex flex-col items-center justify-center">
            <PulseLoader
                color="#2563eb"
                size={loaderSize[size]}
                margin={4}
                speedMultiplier={0.8}
            />

            {text && (
                <p
                    className={`mt-4 font-medium text-gray-600 ${textSize[size]}`}
                >
                    {text}
                </p>
            )}
        </div>
    )

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm">
                {content}
            </div>
        )
    }

    return content
}

// Skeleton loader for content
export function SkeletonLoader({ className = '' }: { className?: string }) {
    return (
        <div className={`animate-pulse ${className}`}>
            <div className="bg-gray-200 rounded h-full w-full"></div>
        </div>
    )
}

// Card skeleton loader
export function CardSkeleton() {
    return (
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center justify-between mb-4">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
    )
}
