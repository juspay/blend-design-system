/**
 * Pivot Table Illustration Component
 * Displays when no pivot configuration is set
 * Uses optimized PNG illustration with proper sizing
 */

// Import the pivot table illustration image
import pivotTableIllustration from './pivot-table-illustration.png'
import { DATA_TABLE_MESSAGES } from '../../../i18n/catalog/dataTable.messages'
import { useMessages } from '../../../i18n/useMessages'

export const PivotTableIllustration = () => {
    const { m } = useMessages(DATA_TABLE_MESSAGES)
    return (
        <img
            src={pivotTableIllustration}
            alt={m('data-table.a11y.pivot-illustration')}
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
