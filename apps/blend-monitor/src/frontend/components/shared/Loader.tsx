'use client'

import React from 'react'

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
    const dotSize = {
        small: 'w-2 h-2',
        medium: 'w-3 h-3',
        large: 'w-4 h-4',
    }

    const textSize = {
        small: 'text-sm',
        medium: 'text-base',
        large: 'text-lg',
    }

    const content = (
        <div className="flex flex-col items-center justify-center">
            <div className="flex space-x-2">
                <div
                    className={`${dotSize[size]} bg-blue-600 rounded-full animate-pulse`}
                ></div>
                <div
                    className={`${dotSize[size]} bg-blue-600 rounded-full animate-pulse`}
                    style={{ animationDelay: '0.2s' }}
                ></div>
                <div
                    className={`${dotSize[size]} bg-blue-600 rounded-full animate-pulse`}
                    style={{ animationDelay: '0.4s' }}
                ></div>
            </div>

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
