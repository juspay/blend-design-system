import SplitTag from '../../../SplitTag/SplitTag'
import { TagColor, TagSize, TagShape, TagVariant } from '../../../Tags/types'
import {
    Check,
    X,
    AlertCircle,
    Info,
    Server,
    Package,
    GitBranch,
    Activity,
    TrendingUp,
    Shield,
    Award,
    DollarSign,
    Percent,
    Calendar,
    Clock,
    User,
} from 'lucide-react'

const SplitTagLightHouse = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Basic Examples */}
            <SplitTag
                primaryTag={{
                    text: 'Status',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Active',
                    color: TagColor.SUCCESS,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Version',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: '2.0.0',
                    color: TagColor.PRIMARY,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Priority',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'High',
                    color: TagColor.ERROR,
                }}
            />

            {/* With Icons */}
            <SplitTag
                primaryTag={{
                    text: 'Status',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Info size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'Online',
                    color: TagColor.SUCCESS,
                    leftSlot: <Check size={12} aria-hidden="true" />,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Build',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Package size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'Failed',
                    color: TagColor.ERROR,
                    leftSlot: <X size={12} aria-hidden="true" />,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Branch',
                    color: TagColor.NEUTRAL,
                    leftSlot: <GitBranch size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'main',
                    color: TagColor.PRIMARY,
                    rightSlot: <Shield size={12} aria-hidden="true" />,
                }}
            />

            {/* All Sizes */}
            <SplitTag
                primaryTag={{
                    text: 'Size',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'XS',
                    color: TagColor.PRIMARY,
                }}
                size={TagSize.XS}
            />

            <SplitTag
                primaryTag={{
                    text: 'Size',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'SM',
                    color: TagColor.PRIMARY,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Size',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'MD',
                    color: TagColor.PRIMARY,
                }}
                size={TagSize.MD}
            />

            <SplitTag
                primaryTag={{
                    text: 'Size',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'LG',
                    color: TagColor.PRIMARY,
                }}
                size={TagSize.LG}
            />

            {/* All Shapes */}
            <SplitTag
                primaryTag={{
                    text: 'Shape',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Squarical',
                    color: TagColor.PRIMARY,
                }}
                shape={TagShape.SQUARICAL}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Shape',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Rounded',
                    color: TagColor.PRIMARY,
                }}
                shape={TagShape.ROUNDED}
                size={TagSize.SM}
            />

            {/* All Colors */}
            <SplitTag
                primaryTag={{
                    text: 'Type',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Primary',
                    color: TagColor.PRIMARY,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Status',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Success',
                    color: TagColor.SUCCESS,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Alert',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Error',
                    color: TagColor.ERROR,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Level',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Warning',
                    color: TagColor.WARNING,
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Tag',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Purple',
                    color: TagColor.PURPLE,
                }}
            />

            {/* Interactive */}
            <SplitTag
                primaryTag={{
                    text: 'Environment',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Server size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'Production',
                    color: TagColor.SUCCESS,
                    leftSlot: <Check size={12} aria-hidden="true" />,
                    onClick: () => {
                        console.log('Environment clicked')
                    },
                }}
            />

            <SplitTag
                primaryTag={{
                    text: 'Build',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Package size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'v3.2.1',
                    color: TagColor.PRIMARY,
                    onClick: () => {
                        console.log('Build clicked')
                    },
                }}
            />

            {/* Real-world Examples */}
            <SplitTag
                primaryTag={{
                    text: 'API',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Operational',
                    color: TagColor.SUCCESS,
                    leftSlot: <Check size={12} aria-hidden="true" />,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Database',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Degraded',
                    color: TagColor.WARNING,
                    leftSlot: <AlertCircle size={12} aria-hidden="true" />,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'CDN',
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Offline',
                    color: TagColor.ERROR,
                    leftSlot: <X size={12} aria-hidden="true" />,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Score',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Award size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'A+',
                    color: TagColor.SUCCESS,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Speed',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Activity size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: '1.2s',
                    color: TagColor.PRIMARY,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Uptime',
                    color: TagColor.NEUTRAL,
                    leftSlot: <TrendingUp size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: '99.9%',
                    color: TagColor.SUCCESS,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Price',
                    color: TagColor.NEUTRAL,
                    leftSlot: <DollarSign size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: '$99/mo',
                    color: TagColor.PRIMARY,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Discount',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Percent size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: '20% OFF',
                    color: TagColor.ERROR,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Sprint',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Calendar size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'Week 3',
                    color: TagColor.PRIMARY,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Due',
                    color: TagColor.NEUTRAL,
                    leftSlot: <Clock size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: '2 days',
                    color: TagColor.ERROR,
                }}
                size={TagSize.SM}
            />

            <SplitTag
                primaryTag={{
                    text: 'Role',
                    color: TagColor.NEUTRAL,
                    leftSlot: <User size={12} aria-hidden="true" />,
                }}
                secondaryTag={{
                    text: 'Admin',
                    color: TagColor.ERROR,
                    leftSlot: <Shield size={12} aria-hidden="true" />,
                }}
                size={TagSize.SM}
            />

            {/* Comprehensive Examples */}
            <SplitTag
                primaryTag={{
                    text: 'Comprehensive',
                    color: TagColor.NEUTRAL,
                    variant: TagVariant.NO_FILL,
                    leftSlot: <Server size={12} aria-hidden="true" />,
                    onClick: () => {
                        console.log('Primary clicked')
                    },
                }}
                secondaryTag={{
                    text: 'SplitTag',
                    color: TagColor.SUCCESS,
                    variant: TagVariant.ATTENTIVE,
                    leftSlot: <Check size={12} aria-hidden="true" />,
                    onClick: () => {
                        console.log('Secondary clicked')
                    },
                }}
                size={TagSize.MD}
                shape={TagShape.ROUNDED}
            />
        </div>
    )
}

export default SplitTagLightHouse
