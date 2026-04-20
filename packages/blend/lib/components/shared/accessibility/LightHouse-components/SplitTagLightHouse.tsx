import { SplitTag } from '../../../SplitTag'
import { TagColor, TagSize, TagShape, TagVariant } from '../../../Tags'
import { Check, X, AlertCircle } from 'lucide-react'

const SplitTagLightHouse = () => {
    return (
        <>
            {/* Basic SplitTag */}
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Secondary',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
            />

            {/* Small Size */}
            <SplitTag
                primaryTag={{
                    text: 'Small',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
                size={TagSize.SM}
            />

            {/* Medium Size */}
            <SplitTag
                primaryTag={{
                    text: 'Medium',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
                size={TagSize.MD}
            />

            {/* Large Size */}
            <SplitTag
                primaryTag={{
                    text: 'Large',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
                size={TagSize.LG}
            />

            {/* Rounded Shape */}
            <SplitTag
                primaryTag={{
                    text: 'Rounded',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Shape',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
                shape={TagShape.ROUNDED}
            />

            {/* Squarical Shape */}
            <SplitTag
                primaryTag={{
                    text: 'Squarical',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Shape',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
                shape={TagShape.SQUARICAL}
            />

            {/* With Primary Tag Only */}
            <SplitTag
                primaryTag={{
                    text: 'Primary Only',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
            />

            {/* All Primary Colors */}
            <SplitTag
                primaryTag={{
                    text: 'Neutral',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.NEUTRAL,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Success',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.SUCCESS,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.PRIMARY,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Error',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.ERROR,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.PRIMARY,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Warning',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.WARNING,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.PRIMARY,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Purple',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PURPLE,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.PRIMARY,
                }}
            />

            {/* All Secondary Colors */}
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Neutral',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.NEUTRAL,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Success',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Error',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.ERROR,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Warning',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.WARNING,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Purple',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.PURPLE,
                }}
            />

            {/* All Variants */}
            <SplitTag
                primaryTag={{
                    text: 'No Fill',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Attentive',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'No Fill',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Subtle',
                    variant: TagVariant.SUBTLE,
                    color: TagColor.SUCCESS,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Attentive',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Subtle',
                    variant: TagVariant.SUBTLE,
                    color: TagColor.SUCCESS,
                }}
            />

            {/* With Slots */}
            <SplitTag
                primaryTag={{
                    text: 'With Icon',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                    leftSlot: <Check size={14} />,
                }}
                secondaryTag={{
                    text: 'Tag',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Primary',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'With Icon',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                    rightSlot: <X size={14} />,
                }}
            />
            <SplitTag
                primaryTag={{
                    text: 'Both Icons',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                    leftSlot: <Check size={14} />,
                }}
                secondaryTag={{
                    text: 'Icons',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                    rightSlot: <X size={14} />,
                }}
            />

            {/* Complex Example */}
            <SplitTag
                primaryTag={{
                    text: 'Complex',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                    leftSlot: <Check size={16} />,
                }}
                secondaryTag={{
                    text: 'Example',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                    rightSlot: <AlertCircle size={16} />,
                }}
                size={TagSize.MD}
                shape={TagShape.ROUNDED}
            />

            {/* Long Text */}
            <SplitTag
                primaryTag={{
                    text: 'Very Long Primary Text',
                    variant: TagVariant.NO_FILL,
                    color: TagColor.PRIMARY,
                }}
                secondaryTag={{
                    text: 'Very Long Secondary Text',
                    variant: TagVariant.ATTENTIVE,
                    color: TagColor.SUCCESS,
                }}
            />
        </>
    )
}

export default SplitTagLightHouse
