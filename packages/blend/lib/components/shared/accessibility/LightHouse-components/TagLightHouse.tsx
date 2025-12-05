import Tag from '../../../Tags/Tag'
import { TagColor, TagShape, TagSize, TagVariant } from '../../../Tags/types'
import { X, Check, Star, Heart } from 'lucide-react'

const TagLightHouse = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Basic Tags */}
            <Tag text="Basic Tag" />
            <Tag text="Primary Tag" color={TagColor.PRIMARY} />
            <Tag text="Success Tag" color={TagColor.SUCCESS} />
            <Tag text="Error Tag" color={TagColor.ERROR} />
            <Tag text="Warning Tag" color={TagColor.WARNING} />
            <Tag text="Purple Tag" color={TagColor.PURPLE} />

            {/* Interactive Tags */}
            <Tag text="Interactive Tag" onClick={() => {}} />
            <Tag
                text="Removable Tag"
                rightSlot={<X size={12} aria-hidden="true" />}
                onClick={() => {}}
            />
            <Tag
                text="Selectable Tag"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.PRIMARY}
                onClick={() => {}}
            />

            {/* Tags with Icons */}
            <Tag
                text="Tag with Left Icon"
                leftSlot={<Star size={12} aria-hidden="true" />}
            />
            <Tag
                text="Tag with Right Icon"
                rightSlot={<Check size={12} aria-hidden="true" />}
            />
            <Tag
                text="Tag with Both Icons"
                leftSlot={<Heart size={12} aria-hidden="true" />}
                rightSlot={<X size={12} aria-hidden="true" />}
                onClick={() => {}}
            />

            {/* All Variants */}
            <Tag
                text="No Fill Variant"
                variant={TagVariant.NO_FILL}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Attentive Variant"
                variant={TagVariant.ATTENTIVE}
                color={TagColor.PRIMARY}
            />
            <Tag
                text="Subtle Variant"
                variant={TagVariant.SUBTLE}
                color={TagColor.PRIMARY}
            />

            {/* All Sizes */}
            <Tag text="Extra Small" size={TagSize.XS} />
            <Tag text="Small" size={TagSize.SM} />
            <Tag text="Medium" size={TagSize.MD} />
            <Tag text="Large" size={TagSize.LG} />

            {/* All Shapes */}
            <Tag text="Squarical Shape" shape={TagShape.SQUARICAL} />
            <Tag text="Rounded Shape" shape={TagShape.ROUNDED} />

            {/* Interactive Tags - All Sizes */}
            <Tag text="XS Interactive" size={TagSize.XS} onClick={() => {}} />
            <Tag text="SM Interactive" size={TagSize.SM} onClick={() => {}} />
            <Tag text="MD Interactive" size={TagSize.MD} onClick={() => {}} />
            <Tag text="LG Interactive" size={TagSize.LG} onClick={() => {}} />

            {/* All Colors - Interactive */}
            <Tag
                text="Neutral Interactive"
                color={TagColor.NEUTRAL}
                onClick={() => {}}
            />
            <Tag
                text="Primary Interactive"
                color={TagColor.PRIMARY}
                onClick={() => {}}
            />
            <Tag
                text="Success Interactive"
                color={TagColor.SUCCESS}
                onClick={() => {}}
            />
            <Tag
                text="Error Interactive"
                color={TagColor.ERROR}
                onClick={() => {}}
            />
            <Tag
                text="Warning Interactive"
                color={TagColor.WARNING}
                onClick={() => {}}
            />
            <Tag
                text="Purple Interactive"
                color={TagColor.PURPLE}
                onClick={() => {}}
            />

            {/* Split Tags */}
            <div className="flex">
                <Tag
                    text="Version"
                    splitTagPosition="left"
                    color={TagColor.NEUTRAL}
                />
                <Tag
                    text="2.0.0"
                    splitTagPosition="right"
                    color={TagColor.PRIMARY}
                />
            </div>

            {/* Tags with Custom aria-label */}
            <Tag
                text="Tag Text"
                aria-label="Custom accessible name for tag"
                onClick={() => {}}
            />

            {/* Multiple Tags Group */}
            <div className="flex gap-2 flex-wrap">
                <Tag text="React" color={TagColor.PRIMARY} onClick={() => {}} />
                <Tag
                    text="TypeScript"
                    color={TagColor.SUCCESS}
                    onClick={() => {}}
                />
                <Tag
                    text="JavaScript"
                    color={TagColor.WARNING}
                    onClick={() => {}}
                />
                <Tag text="CSS" color={TagColor.PURPLE} onClick={() => {}} />
                <Tag text="HTML" color={TagColor.ERROR} onClick={() => {}} />
            </div>
        </div>
    )
}

export default TagLightHouse
