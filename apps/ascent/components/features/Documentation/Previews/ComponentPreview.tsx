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
            <div className="w-full min-h-80 border-code-border border rounded-md my-4 flex flex-col items-center justify-center">
                <div className="w-full flex flex-1 min-h-60 items-center justify-center gap-4 p-6">
                    {children}
                </div>
            </div>
        )
    }

    return (
        <div
            data-component-preview
            className="w-full min-h-80 border-code-border border rounded-2xl my-10 flex flex-col items-center justify-center overflow-clip"
        >
            <div className="w-full flex flex-1 min-h-60 items-center justify-center gap-4 bg-background p-6">
                {children}
            </div>
            <div className="w-full border-t border-code-border bg-code-background">
                <Tabs.Root
                    className="w-full"
                    value={activeTab}
                    onValueChange={setActiveTab}
                >
                    <Tabs.List className="w-full pt-4 pb-2.5 px-1.5 md:px-5 flex items-center gap-1">
                        <div className="px-1 py-0.5 bg-muted rounded-xl flex items-center gap-0 sm:gap-3">
                            {tabs.map((tab) => (
                                <Tabs.Trigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="px-3 h-7 rounded-lg cursor-pointer text-sm font-medium
                data-[state=active]:bg-background data-[state=active]:text-foreground
                data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700
                focus:outline-none transition-colors truncate line-clamp-1"
                                    data-nav-content
                                >
                                    {tab.label}
                                </Tabs.Trigger>
                            ))}
                        </div>
                    </Tabs.List>

                    <div className="w-full p-2 bg-code-background">
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
                    className="p-2 block whitespace-pre-wrap wrap-break-words"
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
                className="p-2 block whitespace-pre-wrap wrap-break-words"
            ></pre>
        </div>
    )
}

export default ComponentPreview
