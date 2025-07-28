'use client'

import React, { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Loader from '../../components/shared/Loader'

// Dynamically import the component to avoid SSR issues
const CodeConnectContent = dynamic(
    () => import('../../components/dashboard/CodeConnectContent'),
    {
        loading: () => (
            <Loader fullScreen size="large" text="Loading components..." />
        ),
        ssr: false,
    }
)

export default function CodeConnectPage() {
    return <CodeConnectContent />
}
