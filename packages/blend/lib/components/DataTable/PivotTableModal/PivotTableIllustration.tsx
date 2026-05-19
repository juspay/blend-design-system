/**
 * Pivot Table Illustration Component
 * Displays when no pivot configuration is set
 * Uses optimized PNG illustration with proper sizing
 */

// Import the pivot table illustration image
import pivotTableIllustration from './pivot-table-illustration.png'

export const PivotTableIllustration = () => {
    return (
        <img
            src={pivotTableIllustration}
            alt="Pivot table illustration"
            width={255}
            height={150}
            style={{
                objectFit: 'contain',
                objectPosition: 'center',
                userSelect: 'none',
                pointerEvents: 'none',
                display: 'block',
            }}
        />
    )
}

export default PivotTableIllustration
