import HorizonatlLine from './HorizonatlLine'
import { StepperType } from './types'
import VerticalLine from './VerticalLine'

const StepperLine = ({
    stepperType = StepperType.HORIZONTAL,
    color = '#CACFD8',
}: {
    stepperType?: StepperType
    color?: string
}) => {
    if (stepperType === StepperType.VERTICAL) {
        return <VerticalLine color={color} />
    }

    return <HorizonatlLine color={color} />
}

export default StepperLine
