import { Tag, TagVariant, TagColor, TagSize, TagShape } from '../../../Tags'
import { X, Check, AlertCircle } from 'lucide-react'

const TagLightHouse = () => {
    return (
        <>
            {/* Basic Tag - Subtle Primary */}
            <Tag
                text="Tag"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
            />

            {/* All Variants */}
            <Tag
                text="No Fill"
                variant={TagVariant.NO_FILL}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Attentive"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Subtle"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
            />

            {/* All Colors */}
            <Tag
                text="Neutral"
                variant={TagVariant.SUBTLE}
                color={TagColor.NEUTRAL}
            />
            <Tag
                text="Primary"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Success"
                variant={TagVariant.SUBTLE}
                color={TagColor.SUCCESS}
            />
            <Tag
                text="Error"
                variant={TagVariant.SUBTLE}
                color={TagColor.ERROR}
            />
            <Tag
                text="Warning"
                variant={TagVariant.SUBTLE}
                color={TagColor.WARNING}
            />
            <Tag
                text="Purple"
                variant={TagVariant.SUBTLE}
                color={TagColor.PURPLE}
            />

            {/* All Sizes */}
            <Tag
                text="XS"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.XS}
            />
            <Tag
                text="SM"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.SM}
            />
            <Tag
                text="MD"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.MD}
            />
            <Tag
                text="LG"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.LG}
            />

            {/* All Shapes */}
            <Tag
                text="Rounded"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                shape={TagShape.ROUNDED}
            />
            <Tag
                text="Squarical"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                shape={TagShape.SQUARICAL}
            />

            {/* With Left Slot */}
            <Tag
                text="With Icon"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                leftSlot={<Check size={14} />}
            />

            {/* With Right Slot */}
            <Tag
                text="Closable"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                rightSlot={<X size={14} />}
            />

            {/* With Both Slots */}
            <Tag
                text="Both Icons"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                leftSlot={<Check size={14} />}
                rightSlot={<X size={14} />}
            />

            {/* All Variants with Primary Color */}
            <Tag
                text="No Fill Primary"
                variant={TagVariant.NO_FILL}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Attentive Primary"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Subtle Primary"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
            />

            {/* All Variants with Success Color */}
            <Tag
                text="No Fill Success"
                variant={TagVariant.NO_FILL}
                color={TagColor.SUCCESS}
            />
            <Tag
                text="Attentive Success"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.SUCCESS}
            />
            <Tag
                text="Subtle Success"
                variant={TagVariant.SUBTLE}
                color={TagColor.SUCCESS}
            />

            {/* All Variants with Error Color */}
            <Tag
                text="No Fill Error"
                variant={TagVariant.NO_FILL}
                color={TagColor.ERROR}
            />
            <Tag
                text="Attentive Error"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.ERROR}
            />
            <Tag
                text="Subtle Error"
                variant={TagVariant.SUBTLE}
                color={TagColor.ERROR}
            />

            {/* All Variants with Warning Color */}
            <Tag
                text="No Fill Warning"
                variant={TagVariant.NO_FILL}
                color={TagColor.WARNING}
            />
            <Tag
                text="Attentive Warning"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.WARNING}
            />
            <Tag
                text="Subtle Warning"
                variant={TagVariant.SUBTLE}
                color={TagColor.WARNING}
            />

            {/* Split Tag - Left */}
            <Tag
                text="Split Left"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                splitTagPosition="left"
            />

            {/* Split Tag - Right */}
            <Tag
                text="Split Right"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                splitTagPosition="right"
            />

            {/* With Skeleton */}
            <Tag
                text="Loading Tag"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                showSkeleton={true}
                skeletonVariant="pulse"
            />

            {/* Long Text */}
            <Tag
                text="This is a very long tag text that demonstrates how the component handles longer content"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
            />

            {/* Complex Example */}
            <Tag
                text="Complex Tag"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.SUCCESS}
                size={TagSize.MD}
                shape={TagShape.ROUNDED}
                leftSlot={<Check size={16} />}
                rightSlot={<X size={16} />}
            />

            {/* All Color Combinations - Small */}
            <Tag
                text="Neutral"
                variant={TagVariant.SUBTLE}
                color={TagColor.NEUTRAL}
                size={TagSize.SM}
            />
            <Tag
                text="Primary"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.SM}
            />
            <Tag
                text="Success"
                variant={TagVariant.SUBTLE}
                color={TagColor.SUCCESS}
                size={TagSize.SM}
            />
            <Tag
                text="Error"
                variant={TagVariant.SUBTLE}
                color={TagColor.ERROR}
                size={TagSize.SM}
            />
            <Tag
                text="Warning"
                variant={TagVariant.SUBTLE}
                color={TagColor.WARNING}
                size={TagSize.SM}
            />
            <Tag
                text="Purple"
                variant={TagVariant.SUBTLE}
                color={TagColor.PURPLE}
                size={TagSize.SM}
            />

            {/* All Color Combinations - Medium */}
            <Tag
                text="Neutral"
                variant={TagVariant.SUBTLE}
                color={TagColor.NEUTRAL}
                size={TagSize.MD}
            />
            <Tag
                text="Primary"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.MD}
            />
            <Tag
                text="Success"
                variant={TagVariant.SUBTLE}
                color={TagColor.SUCCESS}
                size={TagSize.MD}
            />
            <Tag
                text="Error"
                variant={TagVariant.SUBTLE}
                color={TagColor.ERROR}
                size={TagSize.MD}
            />
            <Tag
                text="Warning"
                variant={TagVariant.SUBTLE}
                color={TagColor.WARNING}
                size={TagSize.MD}
            />
            <Tag
                text="Purple"
                variant={TagVariant.SUBTLE}
                color={TagColor.PURPLE}
                size={TagSize.MD}
            />

            {/* All Color Combinations - Large */}
            <Tag
                text="Neutral"
                variant={TagVariant.SUBTLE}
                color={TagColor.NEUTRAL}
                size={TagSize.LG}
            />
            <Tag
                text="Primary"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
                size={TagSize.LG}
            />
            <Tag
                text="Success"
                variant={TagVariant.SUBTLE}
                color={TagColor.SUCCESS}
                size={TagSize.LG}
            />
            <Tag
                text="Error"
                variant={TagVariant.SUBTLE}
                color={TagColor.ERROR}
                size={TagSize.LG}
            />
            <Tag
                text="Warning"
                variant={TagVariant.SUBTLE}
                color={TagColor.WARNING}
                size={TagSize.LG}
            />
            <Tag
                text="Purple"
                variant={TagVariant.SUBTLE}
                color={TagColor.PURPLE}
                size={TagSize.LG}
            />

            {/* No Fill Variant - All Colors */}
            <Tag
                text="Neutral"
                variant={TagVariant.NO_FILL}
                color={TagColor.NEUTRAL}
            />
            <Tag
                text="Primary"
                variant={TagVariant.NO_FILL}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Success"
                variant={TagVariant.NO_FILL}
                color={TagColor.SUCCESS}
            />
            <Tag
                text="Error"
                variant={TagVariant.NO_FILL}
                color={TagColor.ERROR}
            />
            <Tag
                text="Warning"
                variant={TagVariant.NO_FILL}
                color={TagColor.WARNING}
            />
            <Tag
                text="Purple"
                variant={TagVariant.NO_FILL}
                color={TagColor.PURPLE}
            />

            {/* Attentive Variant - All Colors */}
            <Tag
                text="Neutral"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.NEUTRAL}
            />
            <Tag
                text="Primary"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Success"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.SUCCESS}
            />
            <Tag
                text="Error"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.ERROR}
            />
            <Tag
                text="Warning"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.WARNING}
            />
            <Tag
                text="Purple"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.PURPLE}
            />

            {/* With Icons - Different Colors */}
            <Tag
                text="Success Tag"
                variant={TagVariant.SUBTLE}
                color={TagColor.SUCCESS}
                leftSlot={<Check size={14} />}
            />
            <Tag
                text="Error Tag"
                variant={TagVariant.SUBTLE}
                color={TagColor.ERROR}
                leftSlot={<AlertCircle size={14} />}
            />
            <Tag
                text="Warning Tag"
                variant={TagVariant.SUBTLE}
                color={TagColor.WARNING}
                leftSlot={<AlertCircle size={14} />}
            />
        </>
    )
}

export default TagLightHouse
