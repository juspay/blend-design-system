'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { User } from 'lucide-react'

export default function UserAvatar() {
    const { user } = useAuth()

    if (!user) return null

    return (
        <div className="relative">
            {user.photoURL ? (
                <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-colors"
                    referrerPolicy="no-referrer"
                />
            ) : (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                </div>
            )}
            {user.displayName && (
                <div className="absolute top-full right-0 mt-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                        {user.displayName}
                    </div>
                </div>
            )}
        </div>
    )
}
