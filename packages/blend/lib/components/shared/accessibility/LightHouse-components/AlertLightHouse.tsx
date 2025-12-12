import {
    Alert,
    AlertVariant,
    AlertStyle,
    AlertActionPlacement,
} from '../../../Alert'
import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

const AlertLightHouse = () => {
    return (
        <>
            {/* Primary Variant - Subtle */}
            <Alert
                heading="Primary Alert"
                description="This is a primary alert with subtle style."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
            />

            {/* Success Variant - Subtle */}
            <Alert
                heading="Success Alert"
                description="This is a success alert with subtle style."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.SUBTLE}
            />

            {/* Warning Variant - Subtle */}
            <Alert
                heading="Warning Alert"
                description="This is a warning alert with subtle style."
                variant={AlertVariant.WARNING}
                style={AlertStyle.SUBTLE}
            />

            {/* Error Variant - Subtle */}
            <Alert
                heading="Error Alert"
                description="This is an error alert with subtle style."
                variant={AlertVariant.ERROR}
                style={AlertStyle.SUBTLE}
            />

            {/* Purple Variant - Subtle */}
            <Alert
                heading="Purple Alert"
                description="This is a purple alert with subtle style."
                variant={AlertVariant.PURPLE}
                style={AlertStyle.SUBTLE}
            />

            {/* Orange Variant - Subtle */}
            <Alert
                heading="Orange Alert"
                description="This is an orange alert with subtle style."
                variant={AlertVariant.ORANGE}
                style={AlertStyle.SUBTLE}
            />

            {/* Neutral Variant - Subtle */}
            <Alert
                heading="Neutral Alert"
                description="This is a neutral alert with subtle style."
                variant={AlertVariant.NEUTRAL}
                style={AlertStyle.SUBTLE}
            />

            {/* Primary Variant - No Fill */}
            <Alert
                heading="Primary Alert"
                description="This is a primary alert with no fill style."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.NO_FILL}
            />

            {/* Success Variant - No Fill */}
            <Alert
                heading="Success Alert"
                description="This is a success alert with no fill style."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.NO_FILL}
            />

            {/* Warning Variant - No Fill */}
            <Alert
                heading="Warning Alert"
                description="This is a warning alert with no fill style."
                variant={AlertVariant.WARNING}
                style={AlertStyle.NO_FILL}
            />

            {/* Error Variant - No Fill */}
            <Alert
                heading="Error Alert"
                description="This is an error alert with no fill style."
                variant={AlertVariant.ERROR}
                style={AlertStyle.NO_FILL}
            />

            {/* With Icon */}
            <Alert
                heading="Alert with Icon"
                description="This alert has a custom icon."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                icon={<Info size={20} />}
            />

            {/* With Success Icon */}
            <Alert
                heading="Success Alert with Icon"
                description="This success alert has an icon."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.SUBTLE}
                icon={<CheckCircle size={20} />}
            />

            {/* With Warning Icon */}
            <Alert
                heading="Warning Alert with Icon"
                description="This warning alert has an icon."
                variant={AlertVariant.WARNING}
                style={AlertStyle.SUBTLE}
                icon={<AlertTriangle size={20} />}
            />

            {/* With Error Icon */}
            <Alert
                heading="Error Alert with Icon"
                description="This error alert has an icon."
                variant={AlertVariant.ERROR}
                style={AlertStyle.SUBTLE}
                icon={<XCircle size={20} />}
            />

            {/* With Primary Action */}
            <Alert
                heading="Alert with Primary Action"
                description="This alert has a primary action button."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                primaryAction={{
                    label: 'Action',
                    onClick: () => {
                        console.log('Primary action clicked')
                    },
                }}
            />

            {/* With Secondary Action */}
            <Alert
                heading="Alert with Secondary Action"
                description="This alert has a secondary action button."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                secondaryAction={{
                    label: 'Cancel',
                    onClick: () => {
                        console.log('Secondary action clicked')
                    },
                }}
            />

            {/* With Both Actions */}
            <Alert
                heading="Alert with Both Actions"
                description="This alert has both primary and secondary actions."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                primaryAction={{
                    label: 'Confirm',
                    onClick: () => {
                        console.log('Primary action clicked')
                    },
                }}
                secondaryAction={{
                    label: 'Cancel',
                    onClick: () => {
                        console.log('Secondary action clicked')
                    },
                }}
            />

            {/* With Close Button */}
            <Alert
                heading="Alert with Close Button"
                description="This alert has a close button."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                onClose={() => {
                    console.log('Alert closed')
                }}
            />

            {/* With Close and Actions - Right Placement */}
            <Alert
                heading="Alert with Close and Actions"
                description="This alert has actions and close button on the right."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                actionPlacement={AlertActionPlacement.RIGHT}
                primaryAction={{
                    label: 'Confirm',
                    onClick: () => {
                        console.log('Primary action clicked')
                    },
                }}
                onClose={() => {
                    console.log('Alert closed')
                }}
            />

            {/* With Close and Actions - Bottom Placement */}
            <Alert
                heading="Alert with Close and Actions"
                description="This alert has actions and close button at the bottom."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                actionPlacement={AlertActionPlacement.BOTTOM}
                primaryAction={{
                    label: 'Confirm',
                    onClick: () => {
                        console.log('Primary action clicked')
                    },
                }}
                onClose={() => {
                    console.log('Alert closed')
                }}
            />

            {/* Close Only - Bottom Placement */}
            <Alert
                heading="Alert with Close Only"
                description="This alert only has a close button at the bottom."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                onClose={() => {
                    console.log('Alert closed')
                }}
            />

            {/* Success with Icon and Actions */}
            <Alert
                heading="Success Alert"
                description="This success alert has an icon and actions."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.SUBTLE}
                icon={<CheckCircle size={20} />}
                primaryAction={{
                    label: 'View Details',
                    onClick: () => {
                        console.log('View details clicked')
                    },
                }}
                onClose={() => {
                    console.log('Alert closed')
                }}
            />

            {/* Warning with Icon and Actions */}
            <Alert
                heading="Warning Alert"
                description="This warning alert has an icon and actions."
                variant={AlertVariant.WARNING}
                style={AlertStyle.SUBTLE}
                icon={<AlertTriangle size={20} />}
                primaryAction={{
                    label: 'Learn More',
                    onClick: () => {
                        console.log('Learn more clicked')
                    },
                }}
                secondaryAction={{
                    label: 'Dismiss',
                    onClick: () => {
                        console.log('Dismiss clicked')
                    },
                }}
            />

            {/* Error with Icon and Actions */}
            <Alert
                heading="Error Alert"
                description="This error alert has an icon and actions."
                variant={AlertVariant.ERROR}
                style={AlertStyle.SUBTLE}
                icon={<XCircle size={20} />}
                primaryAction={{
                    label: 'Retry',
                    onClick: () => {
                        console.log('Retry clicked')
                    },
                }}
                secondaryAction={{
                    label: 'Cancel',
                    onClick: () => {
                        console.log('Cancel clicked')
                    },
                }}
                onClose={() => {
                    console.log('Alert closed')
                }}
            />

            {/* Long Description */}
            <Alert
                heading="Alert with Long Description"
                description="This is a very long description that demonstrates how the alert component handles longer text content. It should wrap properly and maintain good readability while showing all the necessary information to the user."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.SUBTLE}
                icon={<Info size={20} />}
                primaryAction={{
                    label: 'Read More',
                    onClick: () => {
                        console.log('Read more clicked')
                    },
                }}
            />

            {/* No Fill with Icon and Actions */}
            <Alert
                heading="No Fill Alert"
                description="This alert uses the no fill style with icon and actions."
                variant={AlertVariant.PRIMARY}
                style={AlertStyle.NO_FILL}
                icon={<Info size={20} />}
                primaryAction={{
                    label: 'Action',
                    onClick: () => {
                        console.log('Action clicked')
                    },
                }}
                onClose={() => {
                    console.log('Alert closed')
                }}
            />

            {/* All Variants with No Fill */}
            <Alert
                heading="Success No Fill"
                description="Success alert with no fill style."
                variant={AlertVariant.SUCCESS}
                style={AlertStyle.NO_FILL}
            />

            <Alert
                heading="Warning No Fill"
                description="Warning alert with no fill style."
                variant={AlertVariant.WARNING}
                style={AlertStyle.NO_FILL}
            />

            <Alert
                heading="Error No Fill"
                description="Error alert with no fill style."
                variant={AlertVariant.ERROR}
                style={AlertStyle.NO_FILL}
            />

            {/* Minimal Alert */}
            <Alert
                heading="Minimal Alert"
                description="This is a minimal alert with just heading and description."
                variant={AlertVariant.NEUTRAL}
                style={AlertStyle.SUBTLE}
            />
        </>
    )
}

export default AlertLightHouse
