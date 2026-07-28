'use client'

import dynamic from 'next/dynamic'

const CommandSearch = dynamic(() => import('../ui/CommandSearch'), {
    ssr: false,
})

export default function DeferredCommandSearch() {
    return <CommandSearch />
}
