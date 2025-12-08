import { Tooltip } from '../../../Tooltip/Tooltip'
import { TooltipSlotDirection } from '../../../Tooltip/types'
import { Button, ButtonType } from '../../../Button'
import { Info } from 'lucide-react'

const TooltipLightHouse = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* Controlled Tooltip */}
            <Tooltip
                content="Always visible tooltip"
                open={true}
                slot={<Info size={16} color="white" />}
                slotDirection={TooltipSlotDirection.RIGHT}
            >
                <Button buttonType={ButtonType.SECONDARY} text="Controlled" />
            </Tooltip>
        </div>
    )
}

export default TooltipLightHouse
