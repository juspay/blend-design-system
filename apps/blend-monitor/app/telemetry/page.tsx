/**
 * Telemetry Dashboard Page
 * View all collected component usage telemetry data
 */
import { Suspense } from 'react'
import TelemetryDashboard from '@/src/frontend/components/telemetry/TelemetryDashboard'
import TelemetryWrapper from '@/src/frontend/components/telemetry/TelemetryWrapper'

export const metadata = {
    title: 'Component Analytics - Blend Monitor',
    description:
        'Track component adoption and usage across applications with route-level deduplication',
}

export default function TelemetryPage() {
    return (
        <TelemetryWrapper>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Component Adoption Analyticsssss
                        </h1>
                        <p className="text-lg text-gray-600 mt-2">
                            Real-time component usage tracking with route-level deduplication
                        </p>
                    </div> */}

                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                                    <div className="text-lg text-gray-600">
                                        Loading component analytics...
                                    </div>
                                    <div className="text-sm text-gray-500 mt-2">
                                        Fetching adoption metrics with
                                        route-level deduplication...
                                    </div>
                                </div>
                            </div>
                        }
                    >
                        <TelemetryDashboard />
                    </Suspense>
                </div>
            </div>
        </TelemetryWrapper>
    )
}
