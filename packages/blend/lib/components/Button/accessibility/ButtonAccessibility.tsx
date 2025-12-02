import { forwardRef } from 'react'
import AccessibilityDashboard from '../../shared/accessibility/AccessibilityDashboard'
import { buttonAccessibilityReport } from './ButtonAccessibilityReport'

export interface ButtonAccessibilityProps {
    className?: string
}

const ButtonAccessibility = forwardRef<
    HTMLDivElement,
    ButtonAccessibilityProps
>(({ className }, ref) => {
    return (
        <div ref={ref} className={className}>
            <div className="p-8 max-w-7xl mx-auto">
                <AccessibilityDashboard report={buttonAccessibilityReport} />
            </div>
        </div>
    )
})

ButtonAccessibility.displayName = 'ButtonAccessibility'

export default ButtonAccessibility
