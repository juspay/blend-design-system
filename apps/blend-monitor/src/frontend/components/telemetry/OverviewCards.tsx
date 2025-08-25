import { StatCard, StatCardVariant } from '@juspay/blend-design-system'
import { Package, Globe, Layers, Folder, Star, Zap } from 'lucide-react'

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
                title="Components"
                value={overview.totalComponents}
                subtitle="Unique components tracked"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Package className="w-5 h-5 text-blue-600" />
                    </div>
                }
            />

            <StatCard
                title="Pages"
                value={overview.totalPages.toLocaleString()}
                subtitle="Unique pages with components"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-green-100 rounded-lg">
                        <Globe className="w-5 h-5 text-green-600" />
                    </div>
                }
            />

            <StatCard
                title="Compositions"
                value={overview.totalUniqueCompositions.toLocaleString()}
                subtitle="Unique component compositions"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-purple-100 rounded-lg">
                        <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                }
            />

            <StatCard
                title="Repositories"
                value={overview.totalRepositories}
                subtitle="Active repositories"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-orange-100 rounded-lg">
                        <Folder className="w-5 h-5 text-orange-600" />
                    </div>
                }
            />

            <StatCard
                title="Most Used Component"
                value={overview.mostUsedComponent}
                subtitle="Top component by usage"
                variant={StatCardVariant.NUMBER}
                titleIcon={
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                }
            />

            <StatCard
                title="Most Active Repository"
                value={overview.mostActiveRepository}
                subtitle="Top repo by page count"
                variant={StatCardVariant.LINE}
                titleIcon={
                    <div className="p-2 bg-red-100 rounded-lg">
                        <Zap className="w-5 h-5 text-red-600" />
                    </div>
                }
            />
        </div>
    )
}
