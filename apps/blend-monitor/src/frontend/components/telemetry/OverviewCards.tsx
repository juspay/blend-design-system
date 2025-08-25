import { StatCard, StatCardVariant } from '@juspay/blend-design-system'
import { Package, Globe, Layers, Star } from 'lucide-react'

interface OverviewProps {
    overview: {
        totalComponents: number
        totalPages: number
        totalRepositories: number
        totalUniqueCompositions: number
        mostUsedComponent: string
        mostActiveRepository: string
    }
}

export function OverviewCards({ overview }: OverviewProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                title="Unique Components"
                value={overview.totalComponents}
                subtitle="Different components in use"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="w-5 h-5 text-blue-600" />
                    </div>
                }
            />

            <StatCard
                title="Total Pages"
                value={overview.totalPages.toLocaleString()}
                subtitle="Pages using components"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Globe className="w-5 h-5 text-green-600" />
                    </div>
                }
            />

            <StatCard
                title="Page Compositions"
                value={overview.totalUniqueCompositions.toLocaleString()}
                subtitle="Unique route compositions"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                }
            />

            <StatCard
                title="Most Popular"
                value={overview.mostUsedComponent}
                subtitle="Top component by adoption"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                }
            />
        </div>
    )
}
