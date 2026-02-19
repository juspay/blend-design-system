'use client'
import React, { useState, useEffect, useMemo } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { highlight } from 'sugar-high'

type ComponentPreviewProps = {
    ts: string
    rescript?: string
    rescriptBinding?: string
    children: React.ReactNode
}

const ComponentPreview = ({
    ts,
    rescript,
    rescriptBinding,
    children,
}: ComponentPreviewProps) => {
    const tabs = useMemo(
        () =>
            [
                { id: 'ts', label: 'TypeScript', content: ts, available: !!ts },
                {
                    id: 'rescript',
                    label: 'Rescript',
                    content: rescript || '',
                    available: !!rescript,
                },
                {
                    id: 'rescriptBinding',
                    label: 'Rescript Binding',
                    content: rescriptBinding || '',
                    available: !!rescriptBinding,
                },
            ].filter((tab) => tab.available),
        [ts, rescript, rescriptBinding]
    )

    const [activeTab, setActiveTab] = useState(
        tabs.length > 0 ? tabs[0].id : 'ts'
    )

    useEffect(() => {
        if (tabs.length > 0 && !tabs.find((tab) => tab.id === activeTab)) {
            setActiveTab(tabs[0].id)
        }
    }, [activeTab, tabs])

    if (tabs.length === 0) {
        return (
            <div className="w-full min-h-80 border-[var(--code-border)] border-1 rounded-md my-4 flex flex-col items-center justify-center">
                <div className="w-full flex flex-1 min-h-60 items-center justify-center gap-4 p-6">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div
            data-component-preview
            className="w-full min-h-80 border-[var(--code-border)] border-1 rounded-2xl mb-10 mt-25 flex flex-col items-center justify-center overflow-clip"
        >
            <div className="w-full flex flex-1 min-h-60 items-center justify-center gap-4 debug bg-white p-6">
                {children}
            </div>
            <div className="w-full border-t border-[var(--code-border)]">
                <Tabs.Root
                    className="w-full"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <Tabs.List className="w-full h-10 border-b border-[var(--code-border)] px-2">
                        {tabs.map((tab) => (
                            <Tabs.Trigger
                                key={tab.id}
                                value={tab.id}
                                className="px-2 h-10 relative cursor-pointer data-[state=active]:text-[var(--foreground)] data-[state=inactive]:text-[var(--muted-foreground)] font-medium text-sm after:content-[''] after:block after:w-full after:h-[2px] after:bg-blue-500 after:absolute after:bottom-0 after:left-0 after:opacity-0 data-[state=active]:after:opacity-100 focus:outline-none"
                                data-nav-content
                            >
                                {tab.label}
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>

                    <div className="w-full p-2 bg-[var(--code-background)]">
                        {tabs.map((tab) => (
                            <Tabs.Content key={tab.id} value={tab.id}>
                                {Snippet(tab.content)}
                            </Tabs.Content>
                        ))}
                    </div>
                </Tabs.Root>
            </div>
        </div>
    )
}

export const Snippet = (code: string) => {
    const [isClient, setIsClient] = React.useState(false)
    const [highlighted, setHighlighted] = React.useState<string>('')

    React.useEffect(() => {
        setIsClient(true)
        // Only run highlighting on client side
        try {
            const result = highlight(code || '') || code || ''
            setHighlighted(result)
        } catch {
            setHighlighted(code || '')
        }
    }, [code])

    // For SSR, render plain text without dangerouslySetInnerHTML
    if (!isClient) {
        return (
            <div className="overflow-x-auto">
                <pre
                    data-code-snippet
                    className="p-2 block whitespace-pre-wrap break-words"
                >
                    {code || ''}
                </pre>
            </div>
        )
    }

    // Client-side: render with syntax highlighting
    return (
        <div className="overflow-x-auto">
            <pre
                data-code-snippet
                dangerouslySetInnerHTML={{ __html: highlighted || code || '' }}
                className="p-2 block whitespace-pre-wrap break-words"
            ></pre>
        </div>
    )
}

export default ComponentPreview
