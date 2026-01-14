import { X, Check } from 'lucide-react'
import {
    TagV2,
    TagV2Color,
    TagV2Size,
    TagV2SubType,
    TagV2Type,
} from '../../../TagV2'
const TagLightHouse = () => {
    return (
        <div className="flex flex-col gap-4">
            <TagV2
                text="TagV2"
                type={TagV2Type.SUBTLE}
                color={TagV2Color.PRIMARY}
                size={TagV2Size.SM}
                subType={TagV2SubType.SQUARICAL}
                leftSlot={<Check size={16} />}
                rightSlot={<X size={16} />}
            />
        </div>
    )
}

export default TagLightHouse
