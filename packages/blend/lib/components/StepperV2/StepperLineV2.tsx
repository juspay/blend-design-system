import HorizontalLineV2 from './HorizontalLineV2'
import { StepperV2Type } from './stepperV2.types'
import VerticalLineV2 from './VerticalLineV2'

const StepperLineV2 = ({
    stepperType = StepperV2Type.HORIZONTAL,
    color = '#CACFD8',
}: {
    stepperType?: StepperV2Type
    color?: string
}) => {
    if (stepperType === StepperV2Type.VERTICAL) {
        return <VerticalLineV2 color={color} />
    }

    return <HorizontalLineV2 color={color} />
}

export default StepperLineV2
