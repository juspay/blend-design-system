'use client'

import {
    DesktopIcon,
    DeviceMobileSpeakerIcon,
    MagnifyingGlassIcon,
} from '@phosphor-icons/react/dist/ssr'
import { useState } from 'react'

type View = 'web' | 'mobile'

const VIEW_OPTIONS = [
    { view: 'web' as const, icon: DesktopIcon, label: 'Web' },
    { view: 'mobile' as const, icon: DeviceMobileSpeakerIcon, label: 'Mobile' },
]

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeView, setActiveView] = useState<View>('web')

    return (
        <div
            className="pointer-events-auto"
            onPointerDown={(e) => e.stopPropagation()}
        >
            <div className="flex items-center gap-3 bg-background/85 backdrop-blur-xl border border-border/60 rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex items-center gap-2 flex-1 border py-2.5 px-3.5 rounded-[10px] border-border/60 dark:border-border/95 bg-background/90">
                    <MagnifyingGlassIcon
                        size={16}
                        className="text-muted-foreground"
                    />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-32 sm:w-40"
                    />
                    <div
                        aria-hidden="true"
                        className="flex items-center gap-1 text-sm text-muted-foreground px-2"
                    >
                        <span className="font-medium">⌘</span>
                        <span>+</span>
                        <span className="font-medium">K</span>
                    </div>
                </div>

                <div className="w-px h-6 bg-border/60 mx-1.5" />

                <div className="flex items-center gap-1 bg-muted/50 rounded-xl p-1">
                    {VIEW_OPTIONS.map(({ view, icon: Icon, label }) => (
                        <button
                            key={view}
                            onClick={() => setActiveView(view)}
                            aria-pressed={activeView === view}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                                activeView === view
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            <Icon size={14} />
                            <span>{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
