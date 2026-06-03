import {
    ButtonV2,
    ButtonV2Size,
    ButtonV2SubType,
    ButtonV2Type,
} from '@juspay/blend-design-system'
import { CaretDownIcon, CaretUpIcon } from '@phosphor-icons/react'

const CollapsableHeader = ({
    title,
    isOpen,
    onToggle,
}: {
    title: string
    isOpen: boolean
    onToggle: () => void
}) => {
    return (
        <div
            className={`w-full flex items-center justify-between px-[16px] py-[12px] outline outline-1 outline-gray-200`}
        >
            <h3 className="font-medium text-gray-900 text-[14px] leading-[20px] inter-display">
                {title}
            </h3>
            <ButtonV2
                onClick={onToggle}
                buttonType={ButtonV2Type.SECONDARY}
                size={ButtonV2Size.MEDIUM}
                subType={ButtonV2SubType.INLINE}
                leftSlot={{
                    slot: isOpen ? (
                        <CaretUpIcon size={16} />
                    ) : (
                        <CaretDownIcon size={16} />
                    ),
                }}
            />
        </div>
    )
}

export default CollapsableHeader
