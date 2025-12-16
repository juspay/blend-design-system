import {
    Slider,
    SliderVariant,
    SliderSize,
    SliderValueType,
} from '../../../Slider'

const SliderLightHouse = () => {
    return (
        <>
            {/* Basic Slider - Primary */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
            />

            {/* Basic Slider - Secondary */}
            <Slider
                variant={SliderVariant.SECONDARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
            />

            {/* Small Size */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.SMALL}
                defaultValue={[50]}
            />

            {/* Medium Size */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
            />

            {/* Large Size */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.LARGE}
                defaultValue={[50]}
            />

            {/* With Value Labels - Top */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                labelPosition="top"
            />

            {/* With Value Labels - Bottom */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                labelPosition="bottom"
            />

            {/* With Value Labels - Inline */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                labelPosition="inline"
            />

            {/* Controlled Value */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                value={[75]}
                onValueChange={(values) => {
                    console.log('Value changed:', values)
                }}
            />

            {/* Range Slider - Two Thumbs */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[25, 75]}
            />

            {/* Range Slider with Labels */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[25, 75]}
                showValueLabels={true}
                labelPosition="top"
            />

            {/* Custom Min/Max */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                min={0}
                max={200}
            />

            {/* Custom Step */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                step={10}
            />

            {/* Disabled */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                disabled={true}
            />

            {/* With Value Format - Number */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                valueFormat={{
                    type: SliderValueType.NUMBER,
                }}
            />

            {/* With Value Format - Percentage */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                valueFormat={{
                    type: SliderValueType.PERCENTAGE,
                }}
            />

            {/* With Value Format - Decimal */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                valueFormat={{
                    type: SliderValueType.DECIMAL,
                    decimalPlaces: 2,
                }}
            />

            {/* With Value Format - Custom Prefix */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                valueFormat={{
                    type: SliderValueType.NUMBER,
                    prefix: '$',
                }}
            />

            {/* With Value Format - Custom Suffix */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                valueFormat={{
                    type: SliderValueType.NUMBER,
                    suffix: 'px',
                }}
            />

            {/* With Value Format - Custom Formatter */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                showValueLabels={true}
                valueFormat={{
                    type: SliderValueType.NUMBER,
                    formatter: (value) => `${value}%`,
                }}
            />

            {/* All Variants */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
            />
            <Slider
                variant={SliderVariant.SECONDARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
            />

            {/* All Sizes - Primary */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.SMALL}
                defaultValue={[50]}
            />
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
            />
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.LARGE}
                defaultValue={[50]}
            />

            {/* All Sizes - Secondary */}
            <Slider
                variant={SliderVariant.SECONDARY}
                size={SliderSize.SMALL}
                defaultValue={[50]}
            />
            <Slider
                variant={SliderVariant.SECONDARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
            />
            <Slider
                variant={SliderVariant.SECONDARY}
                size={SliderSize.LARGE}
                defaultValue={[50]}
            />

            {/* Zero Value */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[0]}
                showValueLabels={true}
            />

            {/* Maximum Value */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[100]}
                showValueLabels={true}
            />

            {/* Multiple Thumbs */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[20, 40, 60, 80]}
            />

            {/* Complex Example */}
            <Slider
                variant={SliderVariant.PRIMARY}
                size={SliderSize.MEDIUM}
                defaultValue={[50]}
                min={0}
                max={100}
                step={5}
                showValueLabels={true}
                labelPosition="top"
                valueFormat={{
                    type: SliderValueType.PERCENTAGE,
                }}
                onValueChange={(values) => {
                    console.log('Slider value changed:', values)
                }}
            />
        </>
    )
}

export default SliderLightHouse
