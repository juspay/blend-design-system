import { useState } from 'react'
import SidebarV2 from '../../../../packages/blend/lib/components/SidebarV2/SidebarV2'
import { IndianRupee, Square, UserIcon } from 'lucide-react'
import { FOUNDATION_THEME } from '../../../../packages/blend/lib/tokens'

const SidebarV2Demo = () => {
    const [selected, setSelected] = useState('juspay')
    const secondarySidebarItems = [
        {
            label: 'Juspay',
            icon: (
                <IndianRupee
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'juspay',
            showInPanel: true, // Visible in panel
        },
        {
            label: 'Razorpay',
            icon: (
                <UserIcon
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'razorpay',
            showInPanel: true, // Visible in panel
        },
        {
            label: 'Stripe',
            icon: (
                <IndianRupee
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'stripe',
            showInPanel: true, // Visible in panel
        },
        {
            label: 'PayPal',
            icon: (
                <UserIcon
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'paypal',
            showInPanel: true, // Visible in panel
        },
        {
            label: 'Square',
            icon: (
                <Square
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'square',
            showInPanel: true, // Visible in panel
        },
        {
            label: 'Adyen',
            icon: (
                <IndianRupee
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'adyen',
            showInPanel: true, // Visible in panel
        },
        {
            label: 'Braintree',
            icon: (
                <UserIcon
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'braintree',
            showInPanel: false, // This will appear in overflow menu
        },
        {
            label: 'Worldpay',
            icon: (
                <IndianRupee
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'worldpay',
            showInPanel: false, // This will appear in overflow menu
        },
        // Additional tenants to demonstrate the three dot menu
        {
            label: 'Klarna',
            icon: (
                <UserIcon
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'klarna',
        },
        {
            label: 'Affirm',
            icon: (
                <IndianRupee
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'affirm',
        },
        {
            label: 'Afterpay',
            icon: (
                <UserIcon
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'afterpay',
        },
        {
            label: 'Sezzle',
            icon: (
                <IndianRupee
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'sezzle',
        },
        {
            label: 'Zip',
            icon: (
                <UserIcon
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'zip',
        },
        {
            label: 'Paymi',
            icon: (
                <IndianRupee
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'paymi',
        },
        {
            label: 'Mollie',
            icon: (
                <UserIcon
                    style={{ width: '20px', height: '20px' }}
                    color={FOUNDATION_THEME.colors.gray[600]}
                />
            ),
            value: 'mollie',
        },
    ]
    return (
        <SidebarV2
            secondarySidebar={{
                items: secondarySidebarItems,
                selected: selected,
                onSelect: (value) => setSelected(value),
            }}
        />
    )
}

export default SidebarV2Demo
