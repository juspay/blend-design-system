'use client'

import React, { useEffect } from 'react'
import { Keyboard } from 'lucide-react'

const FloatingShortcutsButton = () => {
    const showHelp = () => {
        // Trigger the help by simulating the '?' key press
        const event = new KeyboardEvent('keydown', {
            key: '?',
            bubbles: true,
            cancelable: true,
        })
        document.dispatchEvent(event)
    }

    return (
        <button
            onClick={showHelp}
            className="fixed bottom-6 right-6 z-50 bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            aria-label="Show keyboard shortcuts help"
            title="Keyboard Shortcuts (?)"
        >
            <Keyboard size={20} />
        </button>
    )
}

export default FloatingShortcutsButton
