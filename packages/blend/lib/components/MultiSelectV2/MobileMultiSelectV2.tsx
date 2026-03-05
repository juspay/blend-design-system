import MobileMultiSelect from '../MultiSelect/MobileMultiSelect'
import {
    MultiSelectMenuAlignment,
    MultiSelectMenuSide,
    MultiSelectMenuSize,
    MultiSelectSelectionTagType,
    MultiSelectVariant,
} from '../MultiSelect/types'
import type { MultiSelectV2Props } from './types'

const MobileMultiSelectV2 = ({
    subLabel,
    helpIconText,
    minPopoverWidth,
    maxPopoverWidth,
    maxPopoverHeight,
    ...props
}: MultiSelectV2Props) => {
    return (
        <MobileMultiSelect
            {...props}
            sublabel={subLabel}
            helpIconHintText={helpIconText}
            minMenuWidth={minPopoverWidth}
            maxMenuWidth={maxPopoverWidth}
            maxMenuHeight={maxPopoverHeight}
            variant={props.variant as unknown as MultiSelectVariant}
            size={props.size as unknown as MultiSelectMenuSize}
            selectionTagType={
                props.selectionTagType as unknown as MultiSelectSelectionTagType
            }
            alignment={props.alignment as unknown as MultiSelectMenuAlignment}
            side={props.side as unknown as MultiSelectMenuSide}
        />
    )
}

MobileMultiSelectV2.displayName = 'MobileMultiSelectV2'

export default MobileMultiSelectV2
