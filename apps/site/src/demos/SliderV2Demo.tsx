import { useState } from 'react'
import Block from '../../../../packages/blend/lib/components/Primitives/Block/Block'
import { SliderV2 } from '../../../../packages/blend/lib/components/SliderV2'
import {
    SliderV2Size,
    SliderV2ValueType,
    SliderV2Variant,
} from '../../../../packages/blend/lib/components/SliderV2/SliderV2.types'
const SliderV2Demo = () => {
    const [horizontalValue, setHorizontalValue] = useState<number[]>([70])
    const [verticalValue, setVerticalValue] = useState<number[]>([40])
    const valueFormat = {
        type: SliderV2ValueType.PERCENTAGE,
        decimalPlaces: 1,
        prefix: 'Progress: ',
        suffix: ' done',
        showLabels: true,
        formatter: (sliderValue: number) =>
            `Progress: ${sliderValue.toFixed(1)}% done`,
    }
    return (
        <Block padding="150px">
            <Block width="220px" height="56px">
                <SliderV2
                    variant={SliderV2Variant.PRIMARY}
                    size={SliderV2Size.MD}
                    value={horizontalValue}
                    onValueChange={setHorizontalValue}
                    orientation="horizontal"
                    showValueLabels={true}
                    labelPosition="bottom"
                    valueFormat={valueFormat}
                    // step={5}
                />
            </Block>
            <Block width="56px" height="220px">
                <SliderV2
                    variant={SliderV2Variant.SECONDARY}
                    size={SliderV2Size.MD}
                    value={verticalValue}
                    onValueChange={setVerticalValue}
                    orientation="vertical"
                    showValueLabels={true}
                    labelPosition="inline"
                    valueFormat={valueFormat}
                />
            </Block>
            <p>Horizontal Value: {valueFormat.formatter(horizontalValue[0])}</p>
            <p>Vertical Value: {valueFormat.formatter(verticalValue[0])}</p>
        </Block>
    )
}

export default SliderV2Demo
